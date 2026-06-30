import { motion, AnimatePresence } from "motion/react";
import { Home, Shuffle, MapPin, LogIn, Settings, X, User } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome: () => void;
  onNavigateRandom: () => void;
  userEmail?: string;
}

export default function Sidebar({
  isOpen,
  onClose,
  onNavigateHome,
  onNavigateRandom,
  userEmail = "stanley200831@gmail.com"
}: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100]"
          />

          {/* Drawer body */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-72 bg-white z-[110] flex flex-col h-full border-r border-gray-200 shadow-2xl rounded-r-xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">
                  Wikipedia
                </h2>
                <p className="text-xs text-gray-400 font-mono">Mobile AI Edition</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 py-6 overflow-y-auto no-scrollbar px-4 space-y-1">
              <button
                onClick={() => {
                  onNavigateHome();
                  onClose();
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all text-left font-medium"
              >
                <Home className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                <span className="text-sm">Home</span>
              </button>

              <button
                onClick={() => {
                  onNavigateRandom();
                  onClose();
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all text-left font-medium"
              >
                <Shuffle className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Random Article</span>
              </button>

              <button
                onClick={() => {
                  alert("Showing nearby Wikipedia articles based on your location (Demo mode). Currently centering on standard global highlights.");
                  onClose();
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all text-left font-medium"
              >
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Nearby</span>
              </button>

              <hr className="my-4 border-gray-100" />

              {/* User Profiling Account Info */}
              <div className="px-4 py-3 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Logged In
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {userEmail}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">WikiMobile Contributor</p>
              </div>

              <div className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 cursor-not-allowed rounded-lg text-left text-xs">
                <Settings className="w-5 h-5 text-gray-300" />
                <span>Device Preferences: Auto</span>
              </div>
            </nav>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-center">
              <span className="text-xs text-gray-400">
                Powered by Gemini 3.5 Flash
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
