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
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none max-w-[calc(100vw-2rem)]">
      {/* Speech Bubble Prompt Callout */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        onClick={onClick}
        className="pointer-events-auto cursor-pointer select-none relative group/prompt"
      >
        <div className="px-3.5 py-1.5 rounded-full bg-[#0B0F19]/90 hover:bg-[#121828] border border-sky-500/30 hover:border-sky-400 text-zinc-200 text-xs shadow-2xl backdrop-blur-md flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 group-hover/prompt:shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          {/* Pulsing indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>

          <MessageSquare className="w-3.5 h-3.5 text-sky-400 shrink-0" />

          {/* Prompt text rotation with smooth fade */}
          <div className="h-4 overflow-hidden relative min-w-[170px] xs:min-w-[200px] sm:min-w-[240px] text-left">
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

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider bg-sky-950/70 px-1.5 py-0.5 rounded-full border border-sky-500/30">
            Ask
            <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>

        {/* Speech bubble pointer / triangle aligned with round button */}
        <div className="w-2.5 h-2.5 bg-[#0B0F19] border-r border-b border-sky-500/30 rotate-45 absolute -bottom-1.5 right-6 pointer-events-none group-hover/prompt:border-sky-400 transition-colors" />
      </motion.div>

      {/* Main Round Floating AI Button with Multi-Tier Orbit Animations */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 6 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        aria-label="Open Parth AI Copilot"
        title="Open Parth AI Copilot"
        className="pointer-events-auto relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] transition-all duration-300"
      >
        {/* 1. Concentric Acoustic Radar Ping */}
        <span className="absolute -inset-2 rounded-full border border-sky-400/30 animate-ping opacity-60 pointer-events-none duration-1000" />
        <span className="absolute -inset-1 rounded-full bg-indigo-500/25 blur-sm animate-pulse pointer-events-none" />

        {/* 2. Continuous 360° Chromatic Light Aura Ring */}
        <div
          className="absolute -inset-1 rounded-full pointer-events-none transition-all duration-500 opacity-80 group-hover:opacity-100"
          style={{
            background: 'conic-gradient(from 0deg, #38bdf8, #818cf8, #c084fc, #f472b6, #38bdf8)',
            animation: 'spin 4s linear infinite',
            filter: 'blur(3px)'
          }}
        />

        {/* 3. Orbiting Satellite Micro-Star */}
        <div
          className="absolute -inset-1.5 pointer-events-none"
          style={{ animation: 'spin 3s linear infinite' }}
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8] border border-white" />
        </div>

        {/* 4. Glassmorphic Core Container */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-500 p-[2px] flex items-center justify-center shadow-inner overflow-hidden">
          {/* Inner holographic dark gradient backdrop */}
          <div className="w-full h-full rounded-full bg-[#0c101d] flex items-center justify-center relative group-hover:bg-[#11172a] transition-colors">
            {/* Ambient center flare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-indigo-500/20 to-sky-400/30 blur-sm pointer-events-none" />

            {/* AI Sparkles Logo Icon */}
            <Sparkles className="w-6 h-6 text-sky-300 group-hover:text-white transition-colors duration-300 animate-spin-slow drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]" />

            {/* Subtle holographic scanline */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[size:100%_3px] pointer-events-none opacity-20" />
          </div>
        </div>

        {/* 5. Live Online Status Jewel on Top-Right */}
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#090D16] shadow-[0_0_8px_#34d399] animate-pulse" />
      </motion.button>
    </div>
  );
};
