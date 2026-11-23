import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Aurora Mesh Gradient Blob 1 - Electric Cyan (Top-Left) */}
      <div
        className="absolute -top-32 -left-32 w-[680px] h-[680px] rounded-full blur-[140px] opacity-25 animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)',
          animationDuration: '18s',
        }}
      />

      {/* 2. Aurora Mesh Gradient Blob 2 - Cyber Violet/Indigo (Center-Right) */}
      <div
        className="absolute top-[35vh] -right-36 w-[620px] h-[620px] rounded-full blur-[150px] opacity-20 animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)',
          animationDuration: '24s',
          animationDelay: '-6s',
        }}
      />

      {/* 3. Aurora Mesh Gradient Blob 3 - Neon Emerald / Mint (Lower-Left / Skills) */}
      <div
        className="absolute top-[65vh] -left-36 w-[580px] h-[580px] rounded-full blur-[140px] opacity-15 animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(45, 212, 191, 0.12) 50%, transparent 75%)',
          animationDuration: '22s',
          animationDelay: '-12s',
        }}
      />

      {/* 4. Aurora Mesh Gradient Blob 4 - Rose Coral (Bottom / Journey) */}
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251, 113, 133, 0.35) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 75%)',
          animationDuration: '20s',
          animationDelay: '-4s',
        }}
      />

      {/* 5. Tactile SVG Noise/Grain Overlay (as seen on Vercel & Heron AI) */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
