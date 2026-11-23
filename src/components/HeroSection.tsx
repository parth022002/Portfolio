import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowDown, Sparkles, Code2, ShieldCheck, ExternalLink, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  mode: 'business' | 'tech';
  setMode: (mode: 'business' | 'tech') => void;
  onOpenAI: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ mode, setMode, onOpenAI }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // Auto-hide sound hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
      setShowSoundHint(false);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Video / Graphic with Overlay Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          className="w-full h-full object-cover opacity-20 filter saturate-150 blur-[1px] scale-105 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/80 to-[#07090E]/60" />
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
          mode === 'business' ? 'bg-sky-600/15' : 'bg-emerald-500/15'
        }`} />
      </div>

      {/* Video Sound Toggle Floating Pill */}
      <div className="absolute top-20 right-6 z-20 flex items-center gap-2">
        {showSoundHint && (
          <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] rounded-full bg-zinc-800/90 text-zinc-300 border border-white/10 animate-bounce">
            Tap for sound 🔊
          </span>
        )}
        <button
          onClick={toggleSound}
          className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white backdrop-blur-md transition-all shadow-lg"
          title={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
        </button>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Top Status Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-medium mb-6 backdrop-blur-sm">
          <span className={`w-2 h-2 rounded-full ${mode === 'business' ? 'bg-sky-400' : 'bg-emerald-400'} animate-ping`} />
          <span className="text-zinc-300">
            {mode === 'business' 
              ? 'Executive Digital Product & AI Strategy' 
              : 'Full-Stack Software & Machine Learning Systems'}
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-mono text-[11px]">v4.0 Spec Ready</span>
        </div>

        {/* Dynamic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          {mode === 'business' ? (
            <>
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">High-ROI Systems</span> & Intelligent Products.
            </>
          ) : (
            <>
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono">Production AI</span> & Full-Stack Architectures.
            </>
          )}
        </h1>

        {/* Subtitle / Bio */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-zinc-300 mb-8 leading-relaxed font-normal">
          {mode === 'business' ? PORTFOLIO_DATA.personal.headlineBusiness : PORTFOLIO_DATA.personal.headlineTech}
        </p>

        {/* CTA Cluster */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg flex items-center gap-2 ${
              mode === 'business'
                ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold shadow-emerald-500/25'
            }`}
          >
            <span>Explore Verifiable Work</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenAI}
            className="px-6 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 border border-white/10 hover:border-violet-500/50 font-semibold text-sm transition-all duration-300 flex items-center gap-2 group backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-violet-400 group-hover:rotate-12 transition-transform" />
            <span>Consult Parth AI Copilot</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 hover:text-white border border-white/5 font-medium text-sm transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-zinc-400" />
            <span>Download Résumé</span>
          </a>
        </div>

        {/* Proof Strip (Stats Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-white/5">
          {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm text-center hover:border-white/10 transition-colors"
            >
              <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 ${
                mode === 'business' ? 'text-sky-400' : 'text-emerald-400 font-mono'
              }`}>
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 font-medium">
                {mode === 'business' ? stat.businessLabel : stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
