import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, BookOpen, Layers, CheckCircle2 } from "lucide-react";

interface LoadingScreenProps {
  query: string;
}

const STEPS = [
  { icon: Sparkles, text: "Initializing Wikipedia Page Synthesizer..." },
  { icon: BookOpen, text: "Consulting digital library archives..." },
  { icon: Layers, text: "Generating structured infobox metadata..." },
  { icon: Sparkles, text: "Formatting sections and summaries..." },
  { icon: CheckCircle2, text: "Polishing layout and wiki links..." },
];

export default function LoadingScreen({ query }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 mb-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full shadow-inner relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-r-2 border-blue-500 rounded-full"
        />
        <BookOpen className="w-8 h-8 text-blue-600" />
      </motion.div>

      <h2 className="text-2xl font-serif text-gray-900 mb-2 font-semibold">
        Synthesizing "{query}"
      </h2>
      <p className="text-sm text-gray-500 mb-8 max-w-sm">
        Our AI is drafting a customized Wikipedia-style article in real-time.
      </p>

      {/* Progress Steps List */}
      <div className="w-full max-w-sm space-y-3 bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-left mb-8">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-colors duration-300 ${
                isDone
                  ? "text-green-600 font-medium"
                  : isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-400"
              }`}
            >
              <div className="flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                  </motion.div>
                ) : (
                  <Icon className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <span className="text-sm">{step.text}</span>
            </div>
          );
        })}
      </div>

      {/* Pulsing Skeleton Preview */}
      <div className="w-full max-w-md space-y-4 opacity-40 select-none pointer-events-none">
        <div className="h-8 bg-gray-200 rounded w-2/3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="flex gap-4 pt-4">
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="w-1/3 h-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
