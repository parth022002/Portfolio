import React, { useState, useEffect, useRef } from 'react';
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
  Cpu,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Check,
  Play,
  Pause
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
      summary: "ProctorShield is an intelligent online examination proctoring platform that monitors tests in real time using webcam and audio streams. It automatically flags if a student looks away, if multiple people enter the room, or if background conversations occur—ensuring complete academic integrity without expensive human invigilators.",
      highlights: [
        { title: "Multi-Face & Gaze Tracking", desc: "Instantly alerts if an unauthorized person appears on screen or if the student turns away from the examination window." },
        { title: "Sub-140ms Edge Inference", desc: "Lightweight computer vision runs directly with ultra-low latency and zero video buffering." },
        { title: "Automated Fraud Audit Trail", desc: "Generates institution-ready PDF compliance reports with timestamped infraction screenshots." }
      ]
    },
    nexspace: {
      summary: "NexSpace is an ultra-fast, modern social networking platform built for creator communities. Unlike bloated modern social media apps, NexSpace loads instantaneously with zero tracker scripts, and lets users share photos, join micro-communities, and chat in real time.",
      highlights: [
        { title: "98/100 Lighthouse Performance", desc: "Engineered on Next.js App Router for sub-65ms edge API responses and instant route changes." },
        { title: "Optimistic Feed Updates", desc: "Likes, comments, and posts appear instantly on the screen before the server response finishes." },
        { title: "Secure User Spaces", desc: "Built with robust JWT token authentication, granular permissions, and private upload vaults." }
      ]
    },
    "chat-with-pdf": {
      summary: "Chat With PDF turns massive PDF documents, contracts, and technical manuals into an interactive AI conversational assistant. Instead of skimming hundreds of pages, users can ask questions in plain English and receive instant, verifiable answers backed by exact page citations.",
      highlights: [
        { title: "Fast Document Ingestion", desc: "Extracts, chunks, and vectorizes 100-page complex PDF reports in just 3.2 seconds." },
        { title: "100% Grounded Citations", desc: "Every answer directly cites the exact page number and source paragraph to prevent hallucinations." },
        { title: "Semantic FAISS Search", desc: "Understands the conceptual meaning of your query even if you use different phrasing." }
      ]
    },
    "spotify-clone": {
      summary: "A full-scale commercial music streaming platform inspired by Spotify. It delivers continuous, zero-stutter audio playback as you browse albums, create customized playlists, and purchase premium monthly subscriptions via Stripe.",
      highlights: [
        { title: "Continuous Audio Stream", desc: "Redux global audio state with 3-track predictive preloading ensures songs never buffer." },
        { title: "Stripe Recurring Billing", desc: "Integrated subscription customer portal with real-time webhook validation." },
        { title: "Custom Playlist Studio", desc: "Create, save, and organize personalized song queues and favorite artist libraries." }
      ]
    },
    "echo-assistant": {
      summary: "EchoAssistant is a multimodal desktop voice assistant that automates computer tasks. Speak naturally into your microphone to launch desktop programs, search the web, compose emails, and control system volume and settings completely hands-free.",
      highlights: [
        { title: "High-Accuracy Voice Recognition", desc: "96.8% voice recognition accuracy tuned for natural everyday conversational speech." },
        { title: "Under-350ms OS Automation", desc: "Executes 40+ system commands, script automations, and file lookups in fractions of a second." },
        { title: "Visual Dashboard UI", desc: "Clean desktop interface showing live audio equalizer waves and speech transcripts." }
      ]
    },
    taskflow: {
      summary: "TaskFlow is an intuitive collaborative project management system designed for agile engineering teams. It organizes work into visual drag-and-drop Kanban boards, tracks sprint velocity, and keeps everyone aligned without messy spreadsheets.",
      highlights: [
        { title: "Drag-and-Drop Kanban Boards", desc: "Move tasks effortlessly across To-Do, In Progress, and Completed sprint lanes." },
        { title: "Role-Based Access Control", desc: "Granular user roles (Admin, Manager, Contributor) to keep projects secure and organized." },
        { title: "Sprint Analytics & Alerts", desc: "Sub-45ms database queries with automated notifications for upcoming deadlines." }
      ]
    },
    shoesavvy: {
      summary: "ShoeSavvy is an e-commerce shopping platform built for footwear brands. Customers can filter shoes by category, size, and price instantly, manage items in their cart, and checkout with guaranteed stock accuracy.",
      highlights: [
        { title: "Instant Category Filtering", desc: "Find the right footwear in seconds with live multi-attribute filtering without full page reloads." },
        { title: "ACID-Compliant Relational Cart", desc: "MySQL transactional integrity guarantees inventory is atomically updated during checkout." },
        { title: "Fast & Mobile Friendly", desc: "Optimized page load speed under 1.2 seconds across all mobile and desktop devices." }
      ]
    },
    vchat: {
      summary: "VChat is a secure, browser-to-browser real-time video conferencing application developed during an internship at CreArt Solutions. It connects teammates with encrypted audio and video using only a web browser, requiring zero downloads or plug-ins.",
      highlights: [
        { title: "Low-Latency Direct P2P Video", desc: "Direct WebRTC media streams with sub-80ms latency for smooth face-to-face communication." },
        { title: "One-Click Room Creation", desc: "Generate instant private meeting rooms and share dynamic links with attendees." },
        { title: "End-to-End Privacy", desc: "Media streams flow directly between peers without passing through intermediate recording servers." }
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

// Categorized Tech Stack Helper
const categorizeTechStack = (techs: string[]) => {
  const categories: { label: string; icon: string; techs: string[] }[] = [
    {
      label: "Frontend & UI",
      icon: "🎨",
      techs: techs.filter(t => /React|Next\.js|TailwindCSS|HTML|CSS|TypeScript|JavaScript|Framer Motion|Streamlit|Redux/i.test(t))
    },
    {
      label: "Backend & Systems",
      icon: "⚡",
      techs: techs.filter(t => /Python|Flask|Node\.js|Express|PHP|Apache|WebRTC|Eel/i.test(t))
    },
    {
      label: "AI, ML & Vectors",
      icon: "🧠",
      techs: techs.filter(t => /TensorFlow|OpenCV|LangChain|FAISS|OpenAI|Vector Search|SpeechRecognition|Pyttsx3/i.test(t))
    },
    {
      label: "Database & Cloud",
      icon: "💾",
      techs: techs.filter(t => /PostgreSQL|MongoDB|MySQL|SQLite|Supabase|Vercel|JWT|STUN/i.test(t))
    }
  ];

  const matched = new Set(categories.flatMap(c => c.techs));
  const other = techs.filter(t => !matched.has(t));
  if (other.length > 0) {
    categories.push({ label: "Tools & Protocols", icon: "🛠️", techs: other });
  }

  return categories.filter(c => c.techs.length > 0);
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenAIWithProject
}) => {
  if (!project) return null;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Gallery images with fallback
  const images = project.images && project.images.length > 0
    ? project.images
    : [project.img, '/hero.png'];
  const captions = project.imageCaptions || [];

  // Smooth Automatic horizontal slideshow advancing every 3.5 seconds
  useEffect(() => {
    if (!isPlaying || images.length <= 1) {
      setProgress(0);
      return;
    }

    const stepMs = 50;
    const totalMs = 3500;
    const increment = (stepMs / totalMs) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % images.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [isPlaying, images.length, currentSlide]);

  // Manual navigation that resets progress
  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + images.length) % images.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Body scroll lock while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard navigation: Left/Right arrows and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, currentSlide, onClose]);

  // Reset slide when project changes
  useEffect(() => {
    setCurrentSlide(0);
    setProgress(0);
    setIsPlaying(true);
  }, [project.id]);

  // Smooth scroll to section within modal
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && scrollContainerRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const details = getSimpleProjectDetails(project);
  const categorizedStack = categorizeTechStack(project.techStack);
  const linkedinUrl = project.linkedinUrl || PORTFOLIO_DATA.personal.linkedin;
  const githubUrl = project.githubUrl || PORTFOLIO_DATA.personal.github;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fade-in"
    >
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#090D16] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[94vh] flex flex-col glow-hover">
        
        {/* 1. Modal Top Header */}
        <div className="p-3.5 sm:p-6 border-b border-white/10 flex items-start sm:items-center justify-between gap-3 sm:gap-4 bg-zinc-950/80 backdrop-blur-md flex-shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-400 mb-1.5 font-mono">
              <span className="px-2 py-0.5 rounded-md bg-sky-950/80 text-sky-400 font-bold border border-sky-500/30">
                PROJECT {project.number}
              </span>
              {project.importanceLevel && (
                <span className={`px-2 py-0.5 rounded-md font-bold border ${
                  project.importanceLevel === 'Level 1'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                    : project.importanceLevel === 'Level 2'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                    : project.importanceLevel === 'Level 3'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    : 'bg-zinc-800 text-zinc-300 border-white/10'
                }`}>
                  {project.importanceLevel}
                </span>
              )}
              {project.projectType && (
                <span className={`px-2 py-0.5 rounded-md font-semibold border ${
                  project.projectType === 'ACADEMIC'
                    ? 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30'
                    : 'bg-zinc-900/80 text-zinc-400 border-white/10'
                }`}>
                  {project.projectType}
                </span>
              )}
              <span>/</span>
              <span className="text-zinc-300 font-medium">{project.category}</span>
              <span>/</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-950/70 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{project.status}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              {project.tagline}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors hover:scale-105 flex-shrink-0"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Quick Jump Navigation Bar (Sticky Anchors) */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-white/5 bg-zinc-950/60 flex items-center gap-2 overflow-x-auto text-xs font-semibold scrollbar-none flex-shrink-0">
          <button
            onClick={() => scrollToSection('sec-overview')}
            className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-sky-950/60 hover:text-sky-400 text-zinc-300 border border-white/5 hover:border-sky-500/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>📌</span>
            <span>Overview</span>
          </button>

          <button
            onClick={() => scrollToSection('sec-kpis')}
            className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-sky-950/60 hover:text-sky-400 text-zinc-300 border border-white/5 hover:border-sky-500/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>📊</span>
            <span>KPIs & Metrics</span>
          </button>

          <button
            onClick={() => scrollToSection('sec-techstack')}
            className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-sky-950/60 hover:text-sky-400 text-zinc-300 border border-white/5 hover:border-sky-500/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>🛠️</span>
            <span>Tech Stack</span>
          </button>

          <button
            onClick={() => scrollToSection('sec-architecture')}
            className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-sky-950/60 hover:text-sky-400 text-zinc-300 border border-white/5 hover:border-sky-500/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>🏗️</span>
            <span>Architecture</span>
          </button>

          <button
            onClick={() => scrollToSection('sec-skills')}
            className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-sky-950/60 hover:text-sky-400 text-zinc-300 border border-white/5 hover:border-sky-500/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>✅</span>
            <span>Verified Skills</span>
          </button>
        </div>

        {/* 3. Scrollable Body Content */}
        <div ref={scrollContainerRef} className="p-3.5 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 flex-1 text-xs sm:text-sm text-zinc-300">
          
          {/* A. AUTOMATIC HORIZONTAL SLIDESHOW WITH SMOOTH PROGRESS BAR */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/95 border border-white/10 shadow-2xl">
              
              {/* Continuous Auto-Advance Progress Bar at Top */}
              {images.length > 1 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 overflow-hidden z-20">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 transition-all duration-75 ease-linear"
                    style={{ width: isPlaying ? `${progress}%` : '100%' }}
                  />
                </div>
              )}

              {/* Seamless Horizontal Carousel Slider Track */}
              <div
                className="flex w-full h-full transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((imgUrl, idx) => (
                  <div key={idx} className="w-full h-full flex-shrink-0 relative bg-zinc-950">
                    <img
                      src={imgUrl}
                      alt={`${project.title} slide ${idx + 1}`}
                      className="w-full h-full object-cover object-top select-none"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/hero.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-black/30 pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Top-Right: Auto-Slide Status Toggle & Slide Counter */}
              <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                <button
                  onClick={togglePlay}
                  className="px-2.5 py-1 rounded-full bg-black/75 hover:bg-black/95 border border-white/15 backdrop-blur-md text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 transition-all shadow-lg hover:scale-105"
                  title={isPlaying ? "Pause Slideshow" : "Resume Slideshow"}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Play className="w-3 h-3 text-amber-400" />
                  )}
                  <span>{isPlaying ? 'Auto-Sliding' : 'Paused'}</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-sky-400 font-bold">{currentSlide + 1}</span>
                  <span className="text-zinc-500">/</span>
                  <span className="text-zinc-400">{images.length}</span>
                </button>
              </div>

              {/* Left Slide Arrow */}
              {images.length > 1 && (
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-xl z-20"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-sky-300" />
                </button>
              )}

              {/* Right Slide Arrow */}
              {images.length > 1 && (
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-xl z-20"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-sky-300" />
                </button>
              )}

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-20">
                <div className="px-3.5 py-1.5 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md text-xs text-zinc-200 font-medium flex items-center gap-2 shadow-lg truncate pointer-events-auto max-w-full">
                  <Layers className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span className="truncate">
                    {captions[currentSlide] || `${project.title} Interface & System Architecture`}
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
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-8 bg-sky-400 shadow-[0_0_8px_#38BDF8]'
                        : 'w-2 bg-white/25 hover:bg-white/50'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Interactive Thumbnail Gallery Strip Showing All Photos in Feature Project */}
            {images.length > 1 && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Project Gallery ({images.length} Photos)</span>
                  </span>
                  <span className="text-[11px] text-zinc-500">Click any photo to inspect</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
                  {images.map((thumbUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`relative flex-shrink-0 w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border transition-all duration-200 group/thumb ${
                        currentSlide === idx
                          ? 'ring-2 ring-sky-400 border-transparent scale-105 shadow-md shadow-sky-500/25'
                          : 'border-white/10 hover:border-sky-400/50 opacity-60 hover:opacity-100'
                      }`}
                      title={`View photo ${idx + 1}: ${captions[idx] || ''}`}
                    >
                      <img
                        src={thumbUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/hero.png';
                        }}
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/80 text-white/90">
                        {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* B. SECTION 1: OVERVIEW & STORY */}
          <div id="sec-overview" className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                  <span>📌</span>
                  <span>About The Project</span>
                </h3>
                <span className="text-zinc-500 text-xs font-mono">Executive Summary</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-200">
                {details.summary}
              </p>
            </div>

            {/* 3 Bullet Highlights */}
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                Key Features & Highlights
              </h3>
              <div className="space-y-3">
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

            {/* Side-by-Side: The Challenge vs Business Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/15 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <h4>The Challenge</h4>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                  {project.problemStatement}
                </p>
              </div>

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
          </div>

          {/* C. SECTION 2: KPIS & PERFORMANCE METRICS */}
          <div id="sec-kpis" className="space-y-3 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Key Performance Indicators (KPIs)</span>
              </h3>
              <span className="text-zinc-500 text-xs font-mono">Verified Benchmarks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.keyMetrics.map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-center hover:border-sky-500/30 transition-all">
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 font-mono">
                    {m.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* D. SECTION 3: TECH STACK & TECHNOLOGIES */}
          <div id="sec-techstack" className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>Technologies & Tech Stack ({project.techStack.length} Tools)</span>
              </h3>
              <span className="text-zinc-500 text-xs font-mono">Full Stack Tier</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categorizedStack.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 space-y-2.5">
                  <div className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.techs.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 text-sky-300 border border-sky-500/20 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E. SECTION 4: ARCHITECTURE & SYSTEM DESIGN */}
          <div id="sec-architecture" className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>System Architecture & Engineering Pipeline</span>
              </h3>
              <span className="text-zinc-500 text-xs font-mono">Production Schema</span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 font-mono text-xs text-zinc-300 space-y-3">
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 font-sans">
                {project.solutionArchitecture}
              </p>

              {/* 4-Step Pipeline Schema */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-white/5 text-xs space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sky-300">
                  <span className="text-sky-400 font-bold">1. Ingestion Layer:</span>
                  <span className="text-zinc-400">Client WebRTC / Next.js SPA / Real-Time WebSocket Handshake</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-300">
                  <span className="text-indigo-400 font-bold">2. Edge Gateway:</span>
                  <span className="text-zinc-400">ASGI Server / Edge Cache / JWT Auth & Rate Limiting</span>
                </div>
                <div className="flex items-center gap-2 text-violet-300">
                  <span className="text-violet-400 font-bold">3. Intelligence Layer:</span>
                  <span className="text-zinc-400">Quantized TensorFlow / OpenCV Vision / LangChain Vector Embeddings</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <span className="text-emerald-400 font-bold">4. Persistence & Audit:</span>
                  <span className="text-zinc-400">Relational PostgreSQL / Supabase / Tamper-Proof SQLite Logs</span>
                </div>
              </div>
            </div>
          </div>

          {/* F. SECTION 5: VERIFIED SKILLS & PRODUCTION AUDIT */}
          <div id="sec-skills" className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Technical Skills ({project.relatedSkills.length} Skills)</span>
              </h3>
              <span className="text-zinc-500 text-xs font-mono">Production Validated</span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-3">
              <div className="flex flex-wrap gap-2.5">
                {project.relatedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 text-zinc-200 text-xs font-mono border border-white/10 flex items-center gap-1.5 hover:border-emerald-500/40 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Production Certification Badge */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25 flex items-start gap-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-emerald-400">Audit & Production Verification Guarantee</div>
                <p className="text-zinc-300 leading-relaxed">
                  All metrics, latency benchmarks, security endpoints, and architectural assertions for <span className="text-white font-semibold">{project.title}</span> are validated against live source code repositories and deployed production endpoints.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. MODAL FOOTER: ACTION BUTTONS (Live Project, GitHub, LinkedIn, Ask AI) */}
        <div className="p-3.5 sm:p-6 border-t border-white/10 bg-zinc-950/90 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* 1. Live Project Button */}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-102"
                title="Open Deployed Live Project"
              >
                <BrowserRedirectIcon className="w-4 h-4" />
                <span>Live Project</span>
              </a>
            ) : (
              <span
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-900 text-zinc-500 border border-white/5 flex items-center justify-center gap-2 cursor-not-allowed"
                title="Deployment staging in progress"
              >
                <BrowserRedirectIcon className="w-4 h-4 opacity-40" />
                <span>Live Project</span>
              </span>
            )}

            {/* 2. GitHub Link Button */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-100 font-semibold transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-sky-500/40 hover:scale-102 shadow-sm"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Link</span>
            </a>

            {/* 3. LinkedIn Link Button */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/35 text-[#70B5F9] border border-[#0A66C2]/50 font-semibold transition-all flex items-center justify-center gap-2 hover:scale-102 shadow-sm"
              title="View LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn Link</span>
            </a>
          </div>

          {/* 4. Ask AI About This Project Button */}
          <button
            onClick={() => {
              onClose();
              onOpenAIWithProject(project);
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border border-violet-400/30 font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:scale-102 sm:ml-auto"
            title="Launch AI Copilot with deep project context"
          >
            <Sparkles className="w-4 h-4 text-violet-200" />
            <span className="truncate">Ask AI About {project.title}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
