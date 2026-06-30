import { Clock, Trash2, ArrowRight, BookOpen } from "lucide-react";
import { HistoryItem } from "../types";

interface HistoryViewProps {
  history: HistoryItem[];
  onSelectQuery: (query: string) => void;
  onClearHistory: () => void;
}

export default function HistoryView({ history, onSelectQuery, onClearHistory }: HistoryViewProps) {
  return (
    <div className="py-6 px-4 max-w-xl mx-auto font-sans">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-blue-700" />
          <h2 className="font-serif text-2xl font-bold text-gray-950">Browsing History</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm select-none">
          <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-gray-800 mb-1">Your History is Empty</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
            As you search or click links inside articles, your browsing history will accumulate here for easy reference.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectQuery(item.query)}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 hover:border-blue-400 rounded-xl transition-all shadow-sm text-left hover:shadow-md group"
            >
              <div className="flex items-start gap-3.5 pr-4 truncate">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                    {item.query}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <p className="text-center text-[10px] text-gray-400 mt-6 select-none">
          All history remains localized inside your browser's client-side secure store.
        </p>
      )}
    </div>
  );
}
