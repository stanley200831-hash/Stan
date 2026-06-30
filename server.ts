import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { PRESET_ARTICLES } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined. Please add it to your Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Normalized lookup for presets
function findPreset(query: string) {
  const normalized = query.trim().toLowerCase();
  
  // Try exact ID match
  if (PRESET_ARTICLES[normalized]) {
    return PRESET_ARTICLES[normalized];
  }
  
  // Try matches inside titles or aliases
  for (const [id, article] of Object.entries(PRESET_ARTICLES)) {
    if (
      article.title.toLowerCase() === normalized ||
      normalized.includes(article.title.toLowerCase()) ||
      article.title.toLowerCase().includes(normalized)
    ) {
      return article;
    }
  }
  return null;
}

// API endpoint to search/generate a Wikipedia article
app.post("/api/article", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    // 1. Check presets first
    const preset = findPreset(query);
    if (preset) {
      console.log(`[WikiMobile Server] Serving preset article: ${preset.title}`);
      return res.json({ article: preset, isPreset: true });
    }

    // 2. Not a preset, generate via Gemini AI if key is present
    console.log(`[WikiMobile Server] Dynamic query received: "${query}". Calling Gemini API...`);
    
    let ai;
    try {
      ai = getAiClient();
    } catch (err: any) {
      console.warn("[WikiMobile Server] Gemini API Key not found. Falling back to structured mock creation.");
      // Create a beautiful realistic fallback article if API key is missing
      const slug = query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const title = query.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      const fallbackArticle = {
        id: slug,
        title: title,
        description: `Topic about ${title} (Demo Offline Mode)`,
        infobox: {
          imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=80",
          imageCaption: `${title} illustration`,
          rows: [
            { label: "Subject", value: title },
            { label: "Category", value: "General Knowledge" },
            { label: "Status", value: "Offline Demonstration" },
            { label: "Note", value: "Configure GEMINI_API_KEY to search anything!" }
          ]
        },
        summary: [
          `The ${title} is a subject of historical, cultural, and modern significance. This page is generated in demonstration mode because a Gemini API key was not detected in your server environment secrets.`,
          `To browse the complete, live, AI-powered Wikipedia for any topic, click on the Settings or Secrets button and add your GEMINI_API_KEY. Once added, WikiMobile will dynamically construct rich, detailed Wikipedia-style articles with infoboxes, multiple sections, and structured tables.`
        ],
        sections: [
          {
            title: "Overview",
            content: `Historically, ${title} has captured the attention of scholars, enthusiasts, and the public alike. Studies indicate its impact spans across multiple disciplines. For more detailed insights, configure a live Gemini key which will craft custom academic-style segments.`
          },
          {
            title: "Significance",
            content: `In the contemporary era, ${title} continues to influence global trends and discussions. From digital media to academic textbooks, understanding its nuances helps contextualize its broader social and intellectual relevance.`
          },
          {
            title: "Future Outlook",
            content: `As technology and communications evolve, the discourse surrounding ${title} is projected to undergo further development. Researchers suggest that future paradigms will build upon existing frameworks to establish new milestones.`
          }
        ],
        resultsTable: {
          headers: ["Attribute", "Value", "Relevance"],
          rows: [
            { "Attribute": "Type", "Value": "Dynamic Query", "Relevance": "Primary" },
            { "Attribute": "Language", "Value": "English", "Relevance": "Standard" },
            { "Attribute": "Interactive Search", "Value": "Enabled with API Key", "Relevance": "High" }
          ]
        }
      };
      return res.json({ article: fallbackArticle, isPreset: false, offline: true });
    }

    // Call Gemini with schema configuration
    const prompt = `You are a professional Wikipedia synthesizer. Create an authentic, highly detailed, beautifully structured Wikipedia article for the query: "${query}".
Deliver a short description, an infobox with relevant key-value metadata rows (e.g. Born, Died, Founder, Founded, Region, Population, Capital, etc. depending on what the topic is), a 2-paragraph introductory summary, and exactly 3 comprehensive historical/explanatory sections.
If relevant (e.g., historical events, sports, achievements, statistics, lists, company financials), include a 'resultsTable' representing a key structured dataset with headers and rows.
For infobox.imageUrl, provide a beautiful, relevant high-quality photography image from Unsplash. It MUST be a valid Unsplash image URL starting with "https://images.unsplash.com/photo-". Pick a specific photo ID that fits the topic.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "A url-safe slug of the topic" },
            title: { type: Type.STRING, description: "Official capitalized title" },
            description: { type: Type.STRING, description: "A brief, one-line sub-heading description of the entity (e.g. American author and historian)" },
            infobox: {
              type: Type.OBJECT,
              properties: {
                imageUrl: { type: Type.STRING, description: "A relevant, high-quality photography image from Unsplash (starting with https://images.unsplash.com/photo-)" },
                imageCaption: { type: Type.STRING, description: "A short, historical, or explanatory caption for the image" },
                rows: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING, description: "Label like Founder, Born, Population, Key people, etc." },
                      value: { type: Type.STRING, description: "The corresponding metadata value" },
                      isLink: { type: Type.BOOLEAN, description: "True if this points to a notable concept that could be a wiki page" }
                    },
                    required: ["label", "value"]
                  }
                }
              },
              required: ["rows"]
            },
            summary: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly two paragraphs summarizing the topic"
            },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Section title (e.g. History, Impact, Career, Biography)" },
                  content: { type: Type.STRING, description: "The section body text. High-quality, informative, 1-3 detailed paragraphs." }
                },
                required: ["title", "content"]
              }
            },
            resultsTable: {
              type: Type.OBJECT,
              properties: {
                headers: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                rows: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {},
                    description: "Object where properties are string keys corresponding to headers, and values are strings"
                  }
                }
              },
              required: ["headers", "rows"]
            }
          },
          required: ["id", "title", "description", "summary", "sections"]
        }
      }
    });

    const textContent = response.text;
    if (!textContent) {
      throw new Error("Empty response from Gemini AI");
    }

    const parsedArticle = JSON.parse(textContent.trim());
    return res.json({ article: parsedArticle, isPreset: false });

  } catch (error: any) {
    console.error("[WikiMobile Server] Error processing article request:", error);
    return res.status(500).json({ error: error.message || "Failed to generate article" });
  }
});

// Configure Vite or production static server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[WikiMobile Server] Running in DEVELOPMENT mode. Initializing Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[WikiMobile Server] Running in PRODUCTION mode. Serving static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[WikiMobile Server] Server running on http://localhost:${PORT}`);
  });
}

startServer();
