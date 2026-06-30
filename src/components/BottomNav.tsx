import { BookOpen, List, History, Bookmark } from "lucide-react";
import { BottomTab } from "../types";

interface BottomNavProps {
  activeTab: BottomTab;
  onChangeTab: (tab: BottomTab) => void;
  savedCount: number;
}

export default function BottomNav({ activeTab, onChangeTab, savedCount }: BottomNavProps) {
  const tabs = [
    { id: "article" as BottomTab, label: "Article", icon: BookOpen },
    { id: "contents" as BottomTab, label: "Contents", icon: List },
    { id: "history" as BottomTab, label: "History", icon: History },
    { id: "saved" as BottomTab, label: "Saved", icon: Bookmark },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50 flex items-center justify-around px-4 select-none shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className="flex flex-col items-center justify-center w-16 h-full relative focus:outline-none transition-transform active:scale-95 group"
            aria-label={tab.label}
          >
            {/* Active Pill capsule background */}
            <div
              className={`flex items-center justify-center px-4 py-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100/75"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              
              {/* Badge for Saved articles count */}
              {tab.id === "saved" && savedCount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {savedCount}
                </span>
              )}
            </div>
            
            <span
              className={`text-[10px] mt-1 font-medium transition-colors ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
