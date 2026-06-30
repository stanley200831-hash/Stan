import { BookOpen, List, TableProperties } from "lucide-react";
import { Article } from "../types";

interface ContentsViewProps {
  article: Article;
  onSelectSection: (title: string) => void;
}

export default function ContentsView({ article, onSelectSection }: ContentsViewProps) {
  const { title, sections, resultsTable } = article;

  return (
    <div className="py-6 px-4 max-w-xl mx-auto font-sans">
      <div className="flex items-center gap-3 mb-6">
        <List className="w-6 h-6 text-blue-700" />
        <h2 className="font-serif text-2xl font-bold text-gray-950">Article Outline</h2>
      </div>
      
      <p className="text-sm text-gray-500 mb-6">
        Quickly navigate to different sections of the article <strong className="text-gray-800">"{title}"</strong>.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100">
        
        {/* Intro / Summary item */}
        <button
          onClick={() => onSelectSection("summary")}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50/50 hover:text-blue-700 group transition-all"
        >
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-blue-500 font-mono w-6 text-center">0</span>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                Introduction Summary
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-medium">Read intro</span>
        </button>

        {/* Dynamic sections */}
        {sections.map((sec, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSection(sec.title)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50/50 hover:text-blue-700 group transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-400 font-mono w-6 text-center">
                {idx + 1}
              </span>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                {sec.title}
              </span>
            </div>
            <span className="text-xs text-gray-400 font-medium">Section outline</span>
          </button>
        ))}

        {/* Results custom table section if exists */}
        {resultsTable && resultsTable.rows && (
          <button
            onClick={() => onSelectSection("Results")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50/50 hover:text-blue-700 group transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-400 font-mono w-6 text-center">
                {sections.length + 1}
              </span>
              <div className="flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                  Results Table
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-medium">Tabular dataset</span>
          </button>
        )}
      </div>

      <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-xl flex gap-3 items-start select-none">
        <span className="text-sm">💡</span>
        <p className="text-xs text-gray-500 leading-relaxed">
          Selecting a section will instantly bring you back to the article page and automatically scroll directly to the selected element.
        </p>
      </div>
    </div>
  );
}
