import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  Linkedin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Cpu
} from 'lucide-react';
import { Project, PORTFOLIO_DATA } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenAIWithProject: (project: Project) => void;
}

// Browser Redirect Launch Icon Matching User Uploaded Sample Image
const BrowserRedirectIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" />
    <path d="M3 8h18" />
    <circle cx="5.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="8" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// Simple, plain-English project summaries and 3 bullet highlights
const getSimpleProjectDetails = (project: Project) => {
  const contentMap: Record<string, { summary: string; highlights: { title: string; desc: string }[] }> = {
    proctorshield: {
      summary: "ProctorShield is an intelligent online proctoring platform that monitors examinations in real time. It uses computer vision to detect if a student looks away, if another person enters the frame, or if suspicious background voices occur—automating test security without expensive human proctors.",
      highlights: [
        { title: "Multi-Face & Gaze Detection", desc: "Instantly alerts if an unauthorized person enters the camera or if the test-taker turns away." },
        { title: "Sub-140ms Real-Time Speed", desc: "Runs lightning-fast edge AI directly in the browser with zero video lag or stutter." },
        { title: "Automated Fraud Audit Trail", desc: "Generates tamper-proof institution integrity reports with timestamped screenshots." }
      ]
    },
    nexspace: {
      summary: "NexSpace is an ultra-fast social networking platform built for modern creator communities. Unlike bloated social apps with slow load times and heavy ads, NexSpace provides instant page transitions, real-time media feeds, and secure community channels.",
      highlights: [
        { title: "Blazing Fast Performance", desc: "Scored 98/100 on Google Lighthouse with sub-65ms edge API responses." },
        { title: "Instant Community Feed", desc: "Optimistic UI updates mean likes, comments, and posts appear on screen in milliseconds." },
        { title: "Modern & Secure", desc: "Built with Next.js App Router and token-based authentication protecting user accounts." }
      ]
    },
    "chat-with-pdf": {
      summary: "Chat With PDF transforms massive PDF reports, contracts, and manuals into an interactive AI assistant. Instead of skimming hundreds of pages, you can ask questions in plain English and receive instant, factual answers backed by exact page citations.",
      highlights: [
        { title: "Fast Document Ingestion", desc: "Parses, indexes, and vectorizes 100-page complex PDF documents in just 3.2 seconds." },
        { title: "100% Grounded Citations", desc: "Every answer directly cites the exact page number and source paragraph to prevent hallucinations." },
        { title: "Intelligent Semantic Search", desc: "Understands the contextual meaning of your query even if exact keywords differ." }
      ]
    },
    "spotify-clone": {
      summary: "A full-scale commercial music streaming platform inspired by Spotify. It delivers smooth, uninterrupted audio playback as you browse albums, create custom playlists, and manage premium monthly subscriptions via Stripe.",
      highlights: [
        { title: "Continuous Audio Stream", desc: "Smart 3-track predictive preloading ensures music never pauses or stutters between songs." },
        { title: "Stripe Subscription Billing", desc: "Automated customer billing portal with instant webhook access verification." },
        { title: "Personalized Playlists", desc: "Create, save, and organize personalized song queues and favorite artist libraries." }
      ]
    },
    "echo-assistant": {
      summary: "EchoAssistant is a multimodal desktop voice assistant that automates daily computer workflows. Speak naturally into your microphone to launch applications, search the web, compose emails, and control your system settings completely hands-free.",
      highlights: [
        { title: "High-Accuracy Voice Recognition", desc: "96.8% voice recognition accuracy tuned for natural everyday speech." },
        { title: "Under-350ms OS Automation", desc: "Executes 40+ system commands, script automations, and file lookups in fractions of a second." },
        { title: "Visual Dashboard UI", desc: "Clean desktop interface showing live audio equalizer waves and speech transcripts." }
      ]
    },
    taskflow: {
      summary: "TaskFlow is an intuitive collaborative task and project management system designed for agile teams. It organizes work into visual drag-and-drop Kanban boards, tracks sprint velocity, and keeps everyone aligned without messy spreadsheets.",
      highlights: [
        { title: "Drag-and-Drop Kanban Boards", desc: "Move tasks effortlessly across To-Do, In Progress, and Completed sprint lanes." },
        { title: "Role-Based Permissions", desc: "Clear user roles (Admin, Manager, Contributor) to keep projects secure and organized." },
        { title: "Sprint Analytics & Alerts", desc: "Real-time task query speeds (< 45ms) with automated notifications for upcoming deadlines." }
      ]
    },
    shoesavvy: {
      summary: "ShoeSavvy is an e-commerce shopping platform built for footwear brands. Customers can filter shoes by category, size, and price instantly, manage items in their cart, and checkout with guaranteed stock accuracy.",
      highlights: [
        { title: "Instant Category Filtering", desc: "Find the right footwear in seconds with live multi-attribute filtering." },
        { title: "ACID-Compliant Cart & Checkout", desc: "Relational database synchronization ensures inventory is atomically updated." },
        { title: "Fast & Mobile Friendly", desc: "Optimized page load speed under 1.2 seconds across all mobile and desktop devices." }
      ]
    },
    vchat: {
      summary: "VChat is a secure, browser-to-browser real-time video conferencing application developed during an internship at CreArt Solutions. It connects teammates with encrypted audio and video using only a web browser, requiring zero downloads or plug-ins.",
      highlights: [
        { title: "Low-Latency Direct P2P Video", desc: "Direct WebRTC media streams with sub-80ms latency for smooth face-to-face communication." },
        { title: "One-Click Room Creation", desc: "Generate instant private meeting rooms and share dynamic links with attendees." },
        { title: "End-to-End Privacy", desc: "Media streams flow directly between peers without passing through intermediate video servers." }
      ]
    }
  };

  return contentMap[project.id] || {
    summary: project.technicalSummary || project.tagline,
    highlights: (project.highlights || []).slice(0, 3).map((h, i) => ({
      title: `Key Feature ${i + 1}`,
      desc: h
    }))
  };
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenAIWithProject
}) => {
  if (!project) return null;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Gallery images with fallback
  const images = project.images && project.images.length > 0
    ? project.images
    : [project.img, '/hero.png'];
  const captions = project.imageCaptions || [];

  // Automatic slideshow advancing every 3.5 seconds
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  // Keyboard navigation: Left/Right arrows and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  // Reset slide on project switch
  useEffect(() => {
    setCurrentSlide(0);
    setIsPaused(false);
  }, [project.id]);

  const details = getSimpleProjectDetails(project);
  const linkedinUrl = project.linkedinUrl || PORTFOLIO_DATA.personal.linkedin;
  const githubUrl = project.githubUrl || PORTFOLIO_DATA.personal.github;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#0A0E17] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* 1. Simple Clean Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-zinc-950/70">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1 font-mono">
              <span className="px-2 py-0.5 rounded bg-sky-950/80 text-sky-400 font-bold border border-sky-500/30">
                PROJECT {project.number}
              </span>
              <span>/</span>
              <span className="text-zinc-300 font-medium">{project.category}</span>
              <span>/</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{project.status}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors hover:scale-105"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Scrollable Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-300">
          
          {/* A. AUTOMATIC SLIDESHOW WITH HOVER-PAUSE */}
          <div
            className="space-y-3"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-2xl group">
              {/* Animated Slideshow Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={images[currentSlide]}
                  alt={`${project.title} screenshot ${currentSlide + 1}`}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero.png';
                  }}
                />
              </AnimatePresence>

              {/* Gradient Scrim for Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

              {/* Top-Right: Auto-Slide Status & Counter */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-white/15 shadow-md flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                  <span>{isPaused ? 'Paused' : 'Auto'}</span>
                  <span>•</span>
                  <span className="text-sky-400 font-bold">{currentSlide + 1}</span>/{images.length}
                </span>
              </div>

              {/* Previous Slide Arrow */}
              {images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg group-hover:opacity-100 sm:opacity-80"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-sky-300" />
                </button>
              )}

              {/* Next Slide Arrow */}
              {images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev + 1) % images.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg group-hover:opacity-100 sm:opacity-80"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-sky-300" />
                </button>
              )}

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md text-xs text-zinc-200 font-medium flex items-center gap-2 shadow-lg truncate pointer-events-auto">
                  <Layers className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span className="truncate">
                    {captions[currentSlide] || `${project.title} Interface & View`}
                  </span>
                </div>
              </div>
            </div>

            {/* Clickable Slide Indicators / Dots */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-1">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-7 bg-sky-400 shadow-[0_0_8px_#38BDF8]'
                        : 'w-2 bg-white/25 hover:bg-white/50'
                    }`}
                    title={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* B. WHAT IS THIS PROJECT? (SIMPLE SUMMARY) */}
          <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-2.5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              About The Project
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-200">
              {details.summary}
            </p>
          </div>

          {/* C. 3 KEY HIGHLIGHTS */}
          <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Key Highlights & Features
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {details.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0 shadow-[0_0_8px_#38BDF8]" />
                  <div>
                    <span className="font-semibold text-white mr-1.5">{item.title}:</span>
                    <span className="text-zinc-300">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D. THE PROBLEM & THE SOLUTION (SIDE-BY-SIDE CARDS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* The Problem */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/15 border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                <AlertCircle className="w-4 h-4" />
                <h4>The Challenge</h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                {project.problemStatement}
              </p>
            </div>

            {/* The Solution & Impact */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/15 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <h4>Impact & Results</h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                {project.businessImpact}
              </p>
            </div>
          </div>

          {/* E. KEY PERFORMANCE METRICS */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Key Performance Results
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.keyMetrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 font-mono">
                    {m.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* F. TECHNOLOGIES USED */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/50 border border-white/10 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>Technologies Used</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 text-sky-300 border border-sky-500/20 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. MODAL FOOTER: ACTION BUTTONS (Live Project, GitHub, LinkedIn, Ask AI) */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-zinc-950/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* 1. Live Project */}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-102"
                title="Open Live Deployed Project"
              >
                <BrowserRedirectIcon className="w-4 h-4" />
                <span>Live Project</span>
              </a>
            ) : (
              <span
                className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-500 border border-white/5 flex items-center gap-2 cursor-not-allowed"
                title="Deployment staging in progress"
              >
                <BrowserRedirectIcon className="w-4 h-4 opacity-40" />
                <span>Live Project</span>
              </span>
            )}

            {/* 2. GitHub Link */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-100 font-semibold transition-all flex items-center gap-2 border border-white/10 hover:border-sky-500/40 hover:scale-102 shadow-sm"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Link</span>
            </a>

            {/* 3. LinkedIn Link */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/35 text-[#70B5F9] border border-[#0A66C2]/50 font-semibold transition-all flex items-center gap-2 hover:scale-102 shadow-sm"
              title="View LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn Link</span>
            </a>
          </div>

          {/* 4. Ask AI About This Project */}
          <button
            onClick={() => {
              onClose();
              onOpenAIWithProject(project);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border border-violet-400/30 font-semibold transition-all flex items-center gap-2 shadow-lg shadow-violet-500/25 hover:scale-102 ml-auto"
            title="Ask Parth AI about this project"
          >
            <Sparkles className="w-4 h-4 text-violet-200" />
            <span>Ask AI About {project.title}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
