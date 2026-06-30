import React from "react";
import { Bookmark, Star, Trash2, ArrowRight } from "lucide-react";
import { SavedArticle } from "../types";

interface SavedViewProps {
  savedArticles: SavedArticle[];
  onSelectArticle: (id: string) => void;
  onRemoveArticle: (id: string, e: React.MouseEvent) => void;
}

export default function SavedView({ savedArticles, onSelectArticle, onRemoveArticle }: SavedViewProps) {
  return (
    <div className="py-6 px-4 max-w-xl mx-auto font-sans">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bookmark className="w-6 h-6 text-blue-700" />
          <h2 className="font-serif text-2xl font-bold text-gray-950">Saved Articles</h2>
        </div>
        {savedArticles.length > 0 && (
          <span className="bg-blue-100 text-blue-700 font-bold text-xs px-3 py-1 rounded-full select-none">
            {savedArticles.length} {savedArticles.length === 1 ? "Article" : "Articles"}
          </span>
        )}
      </div>

      {savedArticles.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm select-none">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Star className="w-6 h-6 fill-amber-400 stroke-none" />
          </div>
          <h3 className="text-sm font-bold text-gray-800 mb-1">No Saved Articles</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
            Click the bookmark icon at the top right of any article to save it here for fast reference.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 hover:border-blue-400 rounded-xl transition-all shadow-sm text-left hover:shadow-md cursor-pointer group"
            >
              <div className="flex items-start gap-3.5 pr-4 truncate">
                <div className="p-2 bg-amber-50 text-amber-500 rounded-lg flex-shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="truncate">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-400 italic truncate mt-0.5">
                    {article.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => onRemoveArticle(article.id, e)}
                  className="p-1.5 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-md transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
