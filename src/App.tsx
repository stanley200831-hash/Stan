import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, BookOpen, Clock, Heart, HelpCircle, RefreshCw } from "lucide-react";
import { Article, SavedArticle, HistoryItem, BottomTab } from "./types";
import { PRESET_ARTICLES } from "./data";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import ArticleView from "./components/ArticleView";
import ContentsView from "./components/ContentsView";
import HistoryView from "./components/HistoryView";
import SavedView from "./components/SavedView";
import LoadingScreen from "./components/LoadingScreen";

// A set of fascinating topics for the "Random Article" feature
const RANDOM_TOPICS = [
  "Albert Einstein",
  "SpaceX",
  "Olympic Games",
  "Mount Everest",
  "Renaissance",
  "Great Wall of China",
  "Leonardo da Vinci",
  "Black Hole",
  "Ancient Rome",
  "Artificial Intelligence",
  "Superconductivity",
  "Great Barrier Reef"
];

export default function App() {
  const [activeTab, setActiveTab] = useState<BottomTab>("article");
  const [activeArticle, setActiveArticle] = useState<Article>(PRESET_ARTICLES["fifa-world-cup"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Loading and search states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);

  // Local Storage persisted states
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  // Custom scrolling trigger states
  const [activeSectionScrollTrigger, setActiveSectionScrollTrigger] = useState<string>("");

  // 1. Initial State Seed & Loading on Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wikimobile_saved");
      if (saved) setSavedArticles(JSON.parse(saved));

      const hist = localStorage.getItem("wikimobile_history");
      if (hist) {
        setHistory(JSON.parse(hist));
      } else {
        // Seed history with FIFA World Cup as a welcoming starting record
        const seedHistory: HistoryItem[] = [
          {
            id: "fifa-world-cup-seed",
            query: "FIFA World Cup",
            timestamp: new Date().toISOString()
          }
        ];
        setHistory(seedHistory);
        localStorage.setItem("wikimobile_history", JSON.stringify(seedHistory));
      }

      const recents = localStorage.getItem("wikimobile_recent");
      if (recents) {
        setRecentSearches(JSON.parse(recents));
      } else {
        const seedRecents = ["FIFA World Cup", "Albert Einstein", "SpaceX", "Olympic Games"];
        setRecentSearches(seedRecents);
        localStorage.setItem("wikimobile_recent", JSON.stringify(seedRecents));
      }
    } catch (err) {
      console.error("Failed to load local storage data:", err);
    }
  }, []);

  // Save Bookmarks Helper
  const saveBookmarksToLocalStorage = (bookmarks: SavedArticle[]) => {
    setSavedArticles(bookmarks);
    localStorage.setItem("wikimobile_saved", JSON.stringify(bookmarks));
  };

  // 2. Perform Dynamic Wikipedia Search (via Express backend proxying Gemini AI)
  const handleSearch = async (query: string) => {
    if (!query || query.trim() === "") return;
    
    setErrorText(null);
    setIsLoading(true);
    setLoadingQuery(query);
    setActiveTab("article"); // Show the reading pane

    try {
      console.log(`[WikiMobile App] Dispatching API request for query: "${query}"`);
      const response = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to retrieve article content.");
      }

      const data = await response.json();
      if (!data.article) {
        throw new Error("No article structure was returned from the server.");
      }

      // Successfully retrieved article!
      setActiveArticle(data.article);

      // Append to chronological history logs (removing duplicates to place on top)
      const newHistoryItem: HistoryItem = {
        id: `${data.article.id}-${Date.now()}`,
        query: data.article.title,
        timestamp: new Date().toISOString()
      };
      
      const filteredHistory = history.filter(h => h.query.toLowerCase() !== data.article.title.toLowerCase());
      const updatedHistory = [newHistoryItem, ...filteredHistory].slice(0, 50); // limit to last 50
      setHistory(updatedHistory);
      localStorage.setItem("wikimobile_history", JSON.stringify(updatedHistory));

      // Append to autocomplete recent searches
      const filteredRecents = recentSearches.filter(q => q.toLowerCase() !== query.trim().toLowerCase());
      const updatedRecents = [query.trim(), ...filteredRecents].slice(0, 15);
      setRecentSearches(updatedRecents);
      localStorage.setItem("wikimobile_recent", JSON.stringify(updatedRecents));

    } catch (err: any) {
      console.error("[WikiMobile App] Search failed:", err);
      setErrorText(err.message || "An unexpected network error occurred.");
      
      // Auto-clear error after 6 seconds
      setTimeout(() => {
        setErrorText(null);
      }, 6000);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Bookmark Toggle
  const handleToggleSave = () => {
    const isAlreadySaved = savedArticles.some(a => a.id === activeArticle.id);
    if (isAlreadySaved) {
      const updated = savedArticles.filter(a => a.id !== activeArticle.id);
      saveBookmarksToLocalStorage(updated);
    } else {
      const newBookmark: SavedArticle = {
        id: activeArticle.id,
        title: activeArticle.title,
        description: activeArticle.description,
        savedAt: new Date().toISOString()
      };
      saveBookmarksToLocalStorage([...savedArticles, newBookmark]);
    }
  };

  const handleRemoveSavedArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the article
    const updated = savedArticles.filter(a => a.id !== id);
    saveBookmarksToLocalStorage(updated);
  };

  // 4. Random Article Selector
  const handleRandomArticle = () => {
    const currentIndex = RANDOM_TOPICS.findIndex(
      t => t.toLowerCase() === activeArticle.title.toLowerCase()
    );
    
    // Choose a random index distinct from current to ensure a fresh page
    let remainingTopics = RANDOM_TOPICS;
    if (currentIndex !== -1) {
      remainingTopics = RANDOM_TOPICS.filter((_, idx) => idx !== currentIndex);
    }

    const randomIndex = Math.floor(Math.random() * remainingTopics.length);
    const selectedTopic = remainingTopics[randomIndex];
    handleSearch(selectedTopic);
  };

  // 5. Section Selector outline navigation
  const handleSelectSection = (sectionTitle: string) => {
    setActiveSectionScrollTrigger(sectionTitle);
    setActiveTab("article");
  };

  const isCurrentArticleSaved = savedArticles.some(a => a.id === activeArticle.id);

  return (
    <div className="min-h-screen bg-[#faf9fa] text-gray-900 font-sans flex flex-col pb-20">
      
      {/* Top Header App Bar */}
      <Header
        onMenuToggle={() => setSidebarOpen(true)}
        onSearch={handleSearch}
        recentSearches={recentSearches}
      />

      {/* Slide-out Sidebar Drawer Overlay */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigateHome={() => handleSearch("FIFA World Cup")}
        onNavigateRandom={handleRandomArticle}
      />

      {/* Floating Temporary Error Toast notification */}
      <AnimatePresence>
        {errorText && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 left-4 right-4 z-50 bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg flex gap-3 items-start max-w-md mx-auto"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-red-800">Search Failed</h4>
              <p className="text-xs text-red-600 mt-1 leading-normal">{errorText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central Interactive canvas view */}
      <main className="flex-1 pt-14 px-4 pb-4">
        {isLoading ? (
          <LoadingScreen query={loadingQuery} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === "article" && (
              <ArticleView
                article={activeArticle}
                isSaved={isCurrentArticleSaved}
                onToggleSave={handleToggleSave}
                onLinkClick={handleSearch}
                activeSectionScrollTrigger={activeSectionScrollTrigger}
                onClearScrollTrigger={() => setActiveSectionScrollTrigger("")}
              />
            )}

            {activeTab === "contents" && (
              <ContentsView
                article={activeArticle}
                onSelectSection={handleSelectSection}
              />
            )}

            {activeTab === "history" && (
              <HistoryView
                history={history}
                onSelectQuery={handleSearch}
                onClearHistory={() => {
                  setHistory([]);
                  localStorage.removeItem("wikimobile_history");
                }}
              />
            )}

            {activeTab === "saved" && (
              <SavedView
                savedArticles={savedArticles}
                onSelectArticle={(id) => {
                  // Find locally if preset or trigger a fresh search
                  const preset = PRESET_ARTICLES[id];
                  if (preset) {
                    setActiveArticle(preset);
                    setActiveTab("article");
                  } else {
                    // Find saved title inside bookmarks list
                    const savedItem = savedArticles.find(a => a.id === id);
                    if (savedItem) {
                      handleSearch(savedItem.title);
                    }
                  }
                }}
                onRemoveArticle={handleRemoveSavedArticle}
              />
            )}
          </motion.div>
        )}
      </main>

      {/* Persistent Bottom Tabbed Capsule Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        savedCount={savedArticles.length}
      />
    </div>
  );
}
