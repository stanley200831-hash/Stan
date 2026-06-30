import React, { useState, useEffect, useRef } from "react";
import { Menu, Search, X, BookOpen, Clock, ArrowRight } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
  onSearch: (query: string) => void;
  recentSearches: string[];
}

const PRESET_SUGGESTIONS = [
  "FIFA World Cup",
  "Albert Einstein",
  "SpaceX",
  "Olympic Games"
];

export default function Header({ onMenuToggle, onSearch, recentSearches }: HeaderProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus search input when active
  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsSearching(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setIsSearching(false);
    setShowSuggestions(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-50 flex items-center justify-between px-4 h-14 select-none shadow-sm">
        {isSearching ? (
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full h-full">
            <button
              type="button"
              onClick={() => {
                setIsSearching(false);
                setSearchQuery("");
                setShowSuggestions(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 flex-shrink-0"
              aria-label="Back"
            >
              <X className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search WikiMobile..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 absolute right-16"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <button
                onClick={onMenuToggle}
                className="text-gray-700 p-2 hover:bg-gray-100 transition-colors rounded-full"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="font-serif text-xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                WikiMobile
              </span>
            </div>
            <button
              onClick={() => setIsSearching(true)}
              className="text-gray-700 p-2 hover:bg-gray-100 transition-colors rounded-full"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </>
        )}
      </header>

      {/* Dynamic Search Autocomplete Overlay */}
      {isSearching && showSuggestions && (
        <div className="fixed top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-40 max-h-[80vh] overflow-y-auto divide-y divide-gray-100 font-sans">
          {/* Preset templates suggestions */}
          <div className="p-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Featured Articles
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(item)}
                  className="flex items-center gap-1.5 bg-blue-50/50 hover:bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full transition-all border border-blue-100/50 font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* User History searches */}
          {recentSearches.length > 0 && (
            <div className="p-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Recent Searches
              </span>
              <div className="space-y-1">
                {recentSearches.slice(0, 5).map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(query)}
                    className="w-full flex items-center justify-between py-2 text-left text-sm text-gray-600 hover:text-blue-600 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-300 group-hover:text-blue-400" />
                      <span>{query}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Guide tip */}
          <div className="p-4 bg-gray-50/70 text-xs text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span>Type any global query (e.g., "Mount Everest", "Renaissance") to synthesize via AI!</span>
          </div>
        </div>
      )}
    </div>
  );
}
