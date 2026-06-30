import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, BookmarkCheck, ChevronDown, Award, Globe, ExternalLink } from "lucide-react";
import { Article } from "../types";

interface ArticleViewProps {
  article: Article;
  isSaved: boolean;
  onToggleSave: () => void;
  onLinkClick: (query: string) => void;
  activeSectionScrollTrigger?: string;
  onClearScrollTrigger?: () => void;
}

// A helper to highlight and make notable terms interactive (simulate Wiki surfing)
function renderInteractiveText(text: string, onLinkClick: (q: string) => void) {
  // Common searchable keywords
  const keywords = [
    "FIFA World Cup",
    "FIFA",
    "association football",
    "men's national teams",
    "Fédération Internationale de Football Association",
    "World War II",
    "Uruguay",
    "Argentina",
    "Brazil",
    "France",
    "Germany",
    "Qatar",
    "Russia",
    "Scotland",
    "England",
    "Albert Einstein",
    "theory of relativity",
    "general relativity",
    "special relativity",
    "photoelectric effect",
    "quantum mechanics",
    "Nobel Prize in Physics",
    "E = mc²",
    "Elon Musk",
    "SpaceX",
    "Falcon 9",
    "Falcon Heavy",
    "Starlink",
    "Starship",
    "Mars",
    "Olympic Games",
    "International Olympic Committee",
    "IOC",
    "Olympia",
    "Ancient Olympic Games",
    "Pierre de Coubertin"
  ];

  // Create a regex that matches any of these keywords (longest first to avoid partial matching of shorter sub-words)
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  const regexStr = `(${sortedKeywords.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})`;
  const regex = new RegExp(regexStr, "gi");

  const parts = text.split(regex);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    const isKeyword = keywords.some(k => k.toLowerCase() === part.toLowerCase());
    if (isKeyword) {
      return (
        <span
          key={index}
          onClick={() => onLinkClick(part)}
          className="text-blue-600 hover:underline cursor-pointer font-medium select-text"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function ArticleView({
  article,
  isSaved,
  onToggleSave,
  onLinkClick,
  activeSectionScrollTrigger,
  onClearScrollTrigger
}: ArticleViewProps) {
  // Section expand/collapse state: default open the first section (e.g. History or Early life)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Reset expanded sections on article change, defaulting the first section to open
  useEffect(() => {
    if (article.sections && article.sections.length > 0) {
      setExpandedSections({
        [article.sections[0].title]: true
      });
    } else {
      setExpandedSections({});
    }
  }, [article.id]);

  // Handle active section scrolling trigger
  useEffect(() => {
    if (activeSectionScrollTrigger) {
      if (activeSectionScrollTrigger === "summary") {
        const element = document.getElementById("article-top");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Expand target section
        setExpandedSections((prev) => ({
          ...prev,
          [activeSectionScrollTrigger]: true
        }));
        
        // Scroll to the expanded section
        setTimeout(() => {
          const element = document.getElementById(`section-${activeSectionScrollTrigger}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
      
      // Clean up the trigger so it can be re-triggered later
      if (onClearScrollTrigger) {
        onClearScrollTrigger();
      }
    }
  }, [activeSectionScrollTrigger]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const { title, description, infobox, summary, sections, resultsTable } = article;

  return (
    <article id="article-top" className="py-4 px-1 max-w-3xl mx-auto font-sans pb-10">
      {/* Article Title & Subtitle */}
      <section className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-[32px] font-bold text-gray-950 tracking-tight leading-tight select-text">
              {title}
            </h1>
            <p className="text-sm italic text-gray-500 mt-1.5 leading-relaxed select-text">
              {description}
            </p>
          </div>
          
          {/* Star/Bookmark Trigger */}
          <button
            onClick={onToggleSave}
            className={`flex-shrink-0 p-2.5 rounded-full border transition-all active:scale-90 ${
              isSaved
                ? "bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100"
                : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            }`}
            title={isSaved ? "Saved" : "Save Article"}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 fill-amber-500" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>
        <div className="h-px bg-gray-200 w-full mt-4" />
      </section>

      {/* Infobox Component */}
      {infobox && (
        <section className="mb-6 select-none">
          <div className="bg-[#f5f3f4] border border-[#C8CCD1] rounded-xl overflow-hidden shadow-sm">
            
            {/* Infobox Wordmark/Logo */}
            <div className="p-4 flex flex-col items-center bg-[#efedee]">
              {infobox.wordmarkUrl ? (
                <img
                  src={infobox.wordmarkUrl}
                  alt={`${title} wordmark`}
                  referrerPolicy="no-referrer"
                  className="w-48 max-h-16 object-contain mb-4 filter drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                />
              ) : (
                <div className="flex items-center gap-2 mb-3 py-2">
                  <Award className="w-6 h-6 text-blue-700" />
                  <span className="font-serif text-lg font-bold tracking-tight text-gray-800">
                    {title} Reference
                  </span>
                </div>
              )}

              {/* Infobox Main Image */}
              {infobox.imageUrl && (
                <div className="border-t border-[#C8CCD1] w-full pt-4 text-center">
                  <img
                    src={infobox.imageUrl}
                    alt={infobox.imageCaption || title}
                    referrerPolicy="no-referrer"
                    className="w-40 h-auto max-h-56 mx-auto rounded-lg shadow-sm object-cover bg-white mb-2"
                  />
                  {infobox.imageCaption && (
                    <p className="text-center text-xs text-gray-500 px-4 mt-2 font-medium leading-normal">
                      {infobox.imageCaption}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Infobox Key-Value Rows */}
            <table className="w-full text-left border-collapse text-xs">
              <tbody>
                {infobox.rows.map((row, idx) => (
                  <tr key={idx} className="border-t border-[#EAECF0]">
                    <th className="p-2.5 font-semibold text-gray-700 bg-[#efedee] w-[35%] align-top leading-normal">
                      {row.label}
                    </th>
                    <td className="p-2.5 text-gray-900 bg-white leading-relaxed select-text">
                      {row.isLink ? (
                        <span
                          onClick={() => onLinkClick(row.value.split(" (")[0])}
                          className="text-blue-600 hover:underline cursor-pointer font-medium"
                        >
                          {row.value}
                        </span>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Article Summary Paragraphs */}
      <section className="mb-6 space-y-4">
        {summary.map((paragraph, idx) => (
          <p key={idx} className="text-[15px] text-gray-900 leading-relaxed tracking-normal select-text">
            {renderInteractiveText(paragraph, onLinkClick)}
          </p>
        ))}
      </section>

      {/* Accordion Sections */}
      <section className="space-y-3 mb-8">
        {sections.map((sec, idx) => {
          const isOpen = !!expandedSections[sec.title];

          return (
            <div key={idx} id={`section-${sec.title}`} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(sec.title)}
                className="flex items-center justify-between w-full py-4 text-left transition-colors hover:bg-gray-50 rounded-lg px-2 group focus:outline-none"
              >
                <span className="font-serif text-lg font-semibold text-gray-950 group-hover:text-blue-700 transition-colors">
                  {sec.title}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 group-hover:text-gray-600"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pt-2 px-2 text-[15px] text-gray-800 leading-relaxed space-y-4 whitespace-pre-line select-text">
                      {renderInteractiveText(sec.content, onLinkClick)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Results / Key Datasets Custom Section (Rendered as Table if present) */}
        {resultsTable && resultsTable.rows && resultsTable.rows.length > 0 && (
          <div id="section-Results" className="border-b border-gray-200">
            <button
              onClick={() => toggleSection("Results")}
              className="flex items-center justify-between w-full py-4 text-left transition-colors hover:bg-gray-50 rounded-lg px-2 group focus:outline-none"
            >
              <span className="font-serif text-lg font-semibold text-gray-950 group-hover:text-blue-700 transition-colors">
                Results
              </span>
              <motion.div
                animate={{ rotate: !!expandedSections["Results"] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 group-hover:text-gray-600"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {!!expandedSections["Results"] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pt-2 px-2 overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse text-sm rounded-xl overflow-hidden border border-gray-200">
                      <thead>
                        <tr className="bg-gray-100 text-gray-800 font-semibold border-b border-gray-200 text-xs">
                          {resultsTable.headers.map((header, idx) => (
                            <th key={idx} className="p-3">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {resultsTable.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-gray-50/50 bg-white text-gray-700 text-xs">
                            {resultsTable.headers.map((header, colIdx) => (
                              <td key={colIdx} className="p-3 align-middle select-text font-medium">
                                {header.toLowerCase() === "winners" || header.toLowerCase() === "winner" ? (
                                  <span
                                    onClick={() => onLinkClick(row[header])}
                                    className="text-blue-600 hover:underline cursor-pointer"
                                  >
                                    {row[header]}
                                  </span>
                                ) : (
                                  row[header]
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Footer Metadata */}
      <footer className="py-10 border-t border-gray-200 mt-10 text-center sm:text-left">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-medium text-gray-500 mb-6 select-none">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("WikiMobile Privacy Policy (Demo Mode)"); }}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            Privacy Policy
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("WikiMobile - A beautiful AI Wikipedia viewer synthesized by Gemini 3.5 Flash."); }}
            className="text-blue-600 hover:underline"
          >
            About Wikipedia
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("WikiMobile Disclaimers (Demo Mode)"); }}
            className="text-blue-600 hover:underline"
          >
            Disclaimers
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="mailto:stanley200831@gmail.com"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            Contact WikiMobile <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed max-w-xl select-none">
          Text is synthesized in real-time under creative consultation of Gemini AI. Original references licensed under Creative Commons Attribution-ShareAlike 4.0 License.
        </p>
      </footer>
    </article>
  );
}
