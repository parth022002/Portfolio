import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, ArrowDown, Mail, Download, Sparkles, ChevronDown } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);

  // Track whether the user has unmuted audio so we can automatically restore it when returning to Hero
  const wasUnmutedByUserRef = useRef(false);

  // Automatically mute video audio when scrolling away from hero, and resume when returning
  useEffect(() => {
    const section = document.getElementById('hero');
    let observer: IntersectionObserver | null = null;

    if (section && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!videoRef.current) return;

            // If hero is less than 35% visible, automatically mute audio
            if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
              if (!videoRef.current.muted) {
                videoRef.current.muted = true;
                setIsMuted(true);
              }
            } else if (entry.intersectionRatio >= 0.5) {
              // If back in hero section (>= 50% visible), resume audio if user enabled it
              if (wasUnmutedByUserRef.current && videoRef.current.muted) {
                videoRef.current.muted = false;
                setIsMuted(false);
                if (videoRef.current.paused) {
                  videoRef.current.play().catch(() => {});
                  setIsPlaying(true);
                }
              }
            }
          });
        },
        { threshold: [0, 0.1, 0.35, 0.5, 0.75] }
      );
      observer.observe(section);
    }

    const handleVisibilityChange = () => {
      if (!videoRef.current) return;
      if (document.hidden) {
        if (!videoRef.current.muted) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      } else {
        // Returned to tab: if in hero section and user had unmuted, restore audio
        if (wasUnmutedByUserRef.current && window.scrollY < 250) {
          videoRef.current.muted = false;
          setIsMuted(false);
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // 3D Card tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -14, y: x * 14 });
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      wasUnmutedByUserRef.current = !nextMuted;
      setShowSoundPrompt(false);
    }
  }, []);

  return (
    <section id="hero" className="relative pt-10 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
        {/* Left Side: Animated Text & Story with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1"
        >
          {/* Animated Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
          >
            Turning{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400">
              Data & AI
            </span>{' '}
            into Decisions That Move Business.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal"
          >
            Hi, I'm <strong className="text-white font-semibold">Parth Ahuja</strong>, a PGDM Business Analytics candidate with a B.E. in Computer Science. I build data-driven AI systems across supply chain, operations, and product analytics.
          </motion.p>

          {/* Action Buttons Cluster: Contact Me · View Résumé · See My Work */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="px-6 py-3.5 sm:py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 text-center min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 sm:py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md hover:scale-105 active:scale-95 text-center min-h-[44px]"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>View Résumé</span>
            </a>

            <a
              href="#projects"
              className="px-6 py-3.5 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 text-center min-h-[44px]"
            >
              <span>See My Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Social Profile Pill Buttons (Compact with Connect Label) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2"
          >
            <span className="text-xs font-mono text-zinc-400 font-semibold tracking-wider uppercase">Connect:</span>

            {/* GitHub Button */}
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#121620]/90 hover:bg-[#1A2234] border border-white/10 hover:border-white/30 text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group backdrop-blur-md cursor-pointer"
              title="GitHub Profile"
            >
              <img
                src="/icons/github.png"
                alt="GitHub"
                className="w-4 h-4 object-contain rounded-full shadow-sm"
              />
              <span className="tracking-tight text-white font-bold">GitHub</span>
            </a>

            {/* LinkedIn Button */}
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#121620]/90 hover:bg-[#1A2234] border border-white/10 hover:border-sky-500/40 text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group backdrop-blur-md cursor-pointer"
              title="LinkedIn Profile"
            >
              <img
                src="/icons/linkedin.png"
                alt="LinkedIn"
                className="w-4 h-4 object-contain rounded-[3px] shadow-sm"
              />
              <span className="tracking-tight text-white font-bold">LinkedIn</span>
            </a>

            {/* Linktree Button */}
            <a
              href={PORTFOLIO_DATA.personal.linktree}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#121620]/90 hover:bg-[#1A2234] border border-white/10 hover:border-emerald-500/40 text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group backdrop-blur-md cursor-pointer"
              title="Linktree Profile"
            >
              <img
                src="/icons/linktree.png"
                alt="Linktree"
                className="w-4 h-4 object-contain rounded-[4px] shadow-sm"
              />
              <span className="tracking-tight text-white font-bold">Linktree</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Interactive Avatar Video Card with Cursor Tilt (Appears first on phone view) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 35 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none order-1 lg:order-2"
          style={{ perspective: 1200 }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative rounded-2xl p-2.5 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/10 shadow-2xl backdrop-blur-md group hover:border-sky-500/30 transition-shadow duration-300"
          >
            {/* Top Indicator Bar with Animated Name & Equalizer */}
            <div className="flex items-center justify-between px-3 py-2 text-xs text-zinc-400 mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                <span className="font-mono text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 animate-pulse tracking-wide">
                  Parth Ahuja • AI Presenter
                </span>
              </div>

              {/* Soundwave Equalizer */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-400 text-[10px] font-mono">
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-sky-400 animate-pulse rounded-full" />
                  <span className="w-0.5 h-3 bg-emerald-400 animate-pulse delay-75 rounded-full" />
                  <span className="w-0.5 h-1.5 bg-indigo-400 animate-pulse delay-150 rounded-full" />
                  <span className="w-0.5 h-2.5 bg-violet-400 animate-pulse delay-100 rounded-full" />
                </div>
                <span>Live Audio</span>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/90 border border-white/5 shadow-inner">
              <video
                ref={videoRef}
                src="/parth%20intro.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                poster="/hero.png"
              >
                <source src="/parth%20intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

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
                  className="p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 backdrop-blur-md transition-all shadow-md hover:scale-110 active:scale-95"
                  title={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 backdrop-blur-md transition-all shadow-md hover:scale-110 active:scale-95"
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className="px-3 pt-2.5 pb-1 text-[11px] text-zinc-400 flex items-center justify-between">
              <span className="text-zinc-300 font-medium flex items-center gap-1.5 truncate">
                <span>🎥</span>
                <span className="text-white font-semibold">Executive Introduction & Portfolio Overview</span>
              </span>
              <span className="text-sky-400 font-mono font-semibold shrink-0 pl-2">
                Portfolio Tour
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Metric Counters Strip with Staggered Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 pt-8 border-t border-white/10 max-w-5xl mx-auto w-full"
      >
        {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm text-center hover:border-sky-500/30 transition-all duration-300"
          >
            <div className="text-xl sm:text-3xl font-extrabold tracking-tight text-sky-400 font-mono mb-1">
              {stat.value}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Luxury Animated Scroll Down Indicator Button (From Reference) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col items-center justify-center mt-12 sm:mt-16"
      >
        <button
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-center gap-2.5 text-zinc-500 hover:text-sky-400 transition-all duration-300 focus:outline-none cursor-pointer"
          title="Scroll to explore projects"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] font-bold text-zinc-400 group-hover:text-sky-300 transition-colors">
            Scroll To Explore
          </span>

          {/* Mouse Frame Silhouette with Animated Scrolling Bead */}
          <div className="w-5 h-8 rounded-full border-2 border-white/20 group-hover:border-sky-400 flex items-start justify-center p-1 transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]">
            <motion.div
              animate={{
                y: [0, 11, 0],
                opacity: [1, 0.25, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38BDF8]"
            />
          </div>

          <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 animate-bounce -mt-1 transition-colors" />
        </button>
      </motion.div>
    </section>
  );
};
