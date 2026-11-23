import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingAIButtonProps {
  onClick: () => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <button
        onClick={onClick}
        aria-label="Open AI Copilot"
        className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 text-white font-semibold text-xs shadow-xl shadow-violet-900/40 hover:shadow-violet-600/60 border border-violet-400/30 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
      >
        {/* Radar ping effect */}
        <span className="absolute -inset-1 rounded-full bg-violet-500/20 animate-ping pointer-events-none" />
        
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
        </div>
        
        <span className="tracking-wide">Ask Parth AI</span>
        
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>
    </div>
  );
};
