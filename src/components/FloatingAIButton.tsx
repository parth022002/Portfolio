import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface FloatingAIButtonProps {
  onClick: () => void;
}

const ROTATING_PROMPTS = [
  'Ask about my projects & business impact',
  'Ask about ProctorShield & AI architecture',
  'Ask about my Business Analytics background',
  'Ask about my internships & certifications',
];

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onClick }) => {
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Speech Bubble Prompt Callout */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        onClick={onClick}
        className="pointer-events-auto cursor-pointer select-none relative group/prompt"
      >
        <div className="px-3.5 py-2 rounded-2xl bg-[#0B0F19]/95 hover:bg-[#121828] border border-sky-500/30 hover:border-sky-400 text-zinc-200 text-xs shadow-2xl backdrop-blur-md flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 group-hover/prompt:shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          {/* Pulsing indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>

          <MessageSquare className="w-3.5 h-3.5 text-sky-400 shrink-0" />

          {/* Prompt text rotation with smooth fade */}
          <div className="h-4 overflow-hidden relative min-w-[210px] sm:min-w-[260px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={promptIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 font-medium text-zinc-300 text-[11px] sm:text-xs truncate block"
              >
                <strong className="text-white font-semibold">💡 </strong>
                {ROTATING_PROMPTS[promptIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider bg-sky-950/70 px-1.5 py-0.5 rounded border border-sky-500/30">
            Ask AI
            <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>

        {/* Speech bubble pointer / triangle */}
        <div className="w-2.5 h-2.5 bg-[#0B0F19] border-r border-b border-sky-500/30 rotate-45 absolute -bottom-1.5 right-7 pointer-events-none group-hover/prompt:border-sky-400 transition-colors" />
      </motion.div>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        aria-label="Ask Parth AI Copilot"
        className="pointer-events-auto relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 text-white font-semibold text-xs shadow-xl shadow-violet-900/40 hover:shadow-violet-600/60 border border-violet-400/40 transition-all duration-300 backdrop-blur-md cursor-pointer group"
      >
        {/* Radar ping effect */}
        <span className="absolute -inset-1 rounded-full bg-violet-500/20 animate-ping pointer-events-none" />

        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
        </div>

        <span className="tracking-wide font-bold">Ask Parth AI</span>

        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </motion.button>
    </div>
  );
};
