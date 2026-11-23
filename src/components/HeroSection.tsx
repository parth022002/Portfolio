import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, ArrowDown, Mail, Download, Sparkles, FolderGit2, Award, Calendar, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setShowSoundPrompt(false);
    }
  };

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-sky-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[450px] h-[300px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
        {/* Left Side: Animated Text & Story */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Top Status Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-zinc-300">Full-Stack AI Engineer & Business Analytics Strategist</span>
          </div>

          {/* Animated Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 animate-gradient">Production AI</span> & High-Impact Digital Products.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
            Hi, I'm <strong className="text-white font-semibold">Parth Ahuja</strong>. I bridge technical systems engineering (TensorFlow, WebRTC, Next.js, LangChain) with data-driven product strategy. Builder of 14+ end-to-end applications designed for verifiable performance, scale, and high-ROI automation.
          </p>

          {/* Action Buttons Cluster */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-sky-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-semibold text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur-md hover:scale-[1.02] active:scale-95"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>View Résumé</span>
            </a>

            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 font-semibold text-sm transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Side: AI Avatar Video Explainer */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 shadow-2xl backdrop-blur-md group">
            {/* Top Indicator Bar */}
            <div className="flex items-center justify-between px-3 py-2 text-xs text-zinc-400 mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-mono text-[11px] font-semibold text-zinc-200">AI Avatar • Parth Ahuja</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400">
                1080p Video Walkthrough
              </span>
            </div>

            {/* Video Container */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/90 border border-white/5">
              <video
                ref={videoRef}
                src="/intro.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                poster="/hero.png"
              />

              {/* Sound prompt banner */}
              {showSoundPrompt && (
                <div
                  onClick={toggleMute}
                  className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 hover:bg-black text-[11px] text-zinc-200 border border-white/15 backdrop-blur-md cursor-pointer animate-bounce flex items-center gap-1.5 shadow-lg"
                >
                  <VolumeX className="w-3.5 h-3.5 text-sky-400" />
                  <span>Tap for Sound 🔊</span>
                </div>
              )}

              {/* Video Overlay Controls */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 backdrop-blur-md transition-all shadow-md"
                  title={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 backdrop-blur-md transition-all shadow-md"
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              </div>
            </div>

            {/* Bottom Caption Pill */}
            <div className="px-3 pt-2 pb-1 text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Interactive Avatar Demo</span>
              <span className="text-sky-400 font-mono">v4.0 Spec Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Counters Strip (Updated to: Projects Done, Certificates, Experience, Repositories) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10 max-w-5xl mx-auto w-full">
        {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm text-center hover:border-white/10 transition-colors"
          >
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-sky-400 font-mono mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
