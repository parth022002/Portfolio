import React from 'react';

export const TechMarquee: React.FC = () => {
  const items = [
    'GENERATIVE AI & RAG',
    'TENSORFLOW INFERENCE',
    'WEBRTC STREAMING',
    'NEXT.JS 14 APP ROUTER',
    'COMPUTER VISION',
    'BUSINESS ANALYTICS',
    'POSTGRESQL & FAISS',
    'DATA VISUALISATION',
    'LOW-LATENCY EDGE',
    'LANGCHAIN ENGINES',
  ];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-white/5 bg-[#07090E]/80 backdrop-blur-sm select-none my-6">
      {/* Edge Blur Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07090E] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07090E] to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {/* Double the array for seamless infinite looping */}
        {[...items, ...items, ...items].map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 px-6 font-mono text-xs tracking-wider text-zinc-400 hover:text-sky-300 transition-colors whitespace-nowrap"
          >
            <span>{tech}</span>
            <span className="text-sky-500 font-bold text-sm">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
