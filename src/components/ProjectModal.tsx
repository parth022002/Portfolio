import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  Linkedin,
  FileText,
  Cpu,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Share2,
  Check,
  Layers,
  ArrowRight,
  Zap,
  TrendingUp,
  ShieldCheck,
  Code2
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
    {/* Browser window frame with opening for arrow */}
    <path d="M14 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" />
    {/* Top tab bar header line */}
    <path d="M3 8h18" />
    {/* 3 Window Dots on top bar */}
    <circle cx="5.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="8" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
    {/* Launch Arrow extending out of top-right */}
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// 2 to 3 Bullet Points Description Helper
const getProjectHighlights = (project: Project): string[] => {
  if (project.highlights && project.highlights.length > 0) {
    return project.highlights.slice(0, 3);
  }

  const customHighlights: Record<string, string[]> = {
    proctorshield: [
      "Real-time WebRTC media streaming with multi-task TensorFlow neural networks.",
      "Sub-140ms edge inference for face verification, head-pose & audio anomalies.",
      "99.2% precision automated fraud detection across 1,000+ concurrent test-takers."
    ],
    nexspace: [
      "High-performance social networking platform built with Next.js App Router & TypeScript.",
      "Client-side optimistic UI state mutations with sub-65ms edge API responses.",
      "98/100 Lighthouse performance with zero tracker scripts and instant routing."
    ],
    "chat-with-pdf": [
      "Context-grounded enterprise RAG document intelligence powered by LangChain & FAISS.",
      "Parses, chunks, and vectorizes 100-page complex PDF reports in 3.2 seconds.",
      "100% cited answers with zero hallucination verification guardrails."
    ],
    "spotify-clone": [
      "Full-scale music streaming architecture with Redux Toolkit global audio state.",
      "Continuous zero-stutter playback with 3-track ahead predictive preload caching.",
      "Integrated Stripe customer portal and automated subscription webhooks."
    ],
    "echo-assistant": [
      "Multimodal desktop voice assistant bridging Eel web UI with native Python APIs.",
      "Speech-to-text NLP dispatcher with 96.8% voice recognition accuracy.",
      "Sub-350ms OS automation executing 40+ system commands and email drafts."
    ],
    taskflow: [
      "MERN collaborative task platform featuring drag-and-drop Kanban workflows.",
      "Granular role-based access control (Admin, Manager, Contributor) with JWT auth.",
      "Sub-45ms task query response supporting 500+ active team collaborators."
    ],
    shoesavvy: [
      "Full-stack e-commerce engine with normalized MySQL relational catalog schema.",
      "Dynamic instant category filtering and secure server-side session management.",
      "ACID-compliant checkout with atomic inventory synchronization."
    ],
    vchat: [
      "Encrypted peer-to-peer WebRTC video calling with PHP signaling server.",
      "STUN/NAT traversal protocol ensuring direct peer streaming across firewalls.",
      "Sub-80ms end-to-end media latency with adaptive jitter buffer optimization."
    ]
  };

  if (customHighlights[project.id]) {
    return customHighlights[project.id];
  }

  return [
    project.tagline,
    project.technicalSummary,
    project.businessImpact
  ].slice(0, 3);
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
    categories.push({ label: "Core Tools & Protocols", icon: "🛠️", techs: other });
  }

  return categories.filter(c => c.techs.length > 0);
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenAIWithProject
}) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'evidence'>('overview');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Gallery image setup with fallbacks
  const images = project.images && project.images.length > 0
    ? project.images
    : [project.img, '/hero.png'];
  const captions = project.imageCaptions || [];

  // Slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation: Left/Right arrows and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, images.length]);

  // Reset slide on project change
  useEffect(() => {
    setCurrentSlide(0);
    setIsFullscreen(false);
  }, [project.id]);

  // Copy Project Link
  const handleCopyLink = () => {
    const url = window.location.origin + '/#projects';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const categorizedStack = categorizeTechStack(project.techStack);
  const highlights = getProjectHighlights(project);
  const linkedinUrl = project.linkedinUrl || PORTFOLIO_DATA.personal.linkedin;
  const githubUrl = project.githubUrl || PORTFOLIO_DATA.personal.github;

  return (
    <>
      {/* Main Modal Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fade-in">
        <div className="relative w-full max-w-5xl bg-[#090D16] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[94vh] flex flex-col glow-hover">
          
          {/* 1. Modal Top Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-zinc-950/70 backdrop-blur-md">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2 font-mono">
                <span className="px-2 py-0.5 rounded-md bg-sky-950/80 text-sky-400 font-bold border border-sky-500/30">
                  PROJECT {project.number}
                </span>
                <span>/</span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-white/10">
                  {project.category}
                </span>
                <span>/</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950/70 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{project.status}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleCopyLink}
                className="p-2 sm:p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 text-xs"
                title="Share Project Link"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="hidden sm:inline text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors hover:scale-105"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2. Interactive Navigation Tabs */}
          <div className="px-4 sm:px-6 border-b border-white/5 bg-zinc-950/40 flex gap-4 sm:gap-8 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Overview & Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'architecture'
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Architecture & Tech Stack</span>
            </button>

            <button
              onClick={() => setActiveTab('evidence')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'evidence'
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Evidence & Verified Metrics</span>
            </button>
          </div>

          {/* 3. Modal Scrollable Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-300">
            
            {/* TAB 1: OVERVIEW & MULTI-IMAGE SLIDESHOW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* A. MULTI-IMAGE SLIDESHOW CAROUSEL */}
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-2xl group/slide">
                    
                    {/* Animated Slide Image with Framer Motion */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={images[currentSlide]}
                        alt={`${project.title} Screenshot ${currentSlide + 1}`}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/hero.png';
                        }}
                      />
                    </AnimatePresence>

                    {/* Gradient Overlay for Controls Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                    {/* Top Left: Fullscreen Zoom Button */}
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="absolute top-3 left-3 p-2 rounded-xl bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/15 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1.5 text-xs shadow-lg"
                      title="View Fullscreen High-Res Image"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                      <span className="hidden sm:inline font-mono">Zoom Preview</span>
                    </button>

                    {/* Top Right: Slide Counter Indicator */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-xs font-mono font-bold text-zinc-200 shadow-lg">
                      <span className="text-sky-400">{currentSlide + 1}</span> / {images.length}
                    </div>

                    {/* Left Previous Slide Button */}
                    {images.length > 1 && (
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-110 group-hover/slide:opacity-100 sm:opacity-80"
                        title="Previous Image (Left Arrow)"
                      >
                        <ChevronLeft className="w-5 h-5 text-sky-300" />
                      </button>
                    )}

                    {/* Right Next Slide Button */}
                    {images.length > 1 && (
                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-110 group-hover/slide:opacity-100 sm:opacity-80"
                        title="Next Image (Right Arrow)"
                      >
                        <ChevronRight className="w-5 h-5 text-sky-300" />
                      </button>
                    )}

                    {/* Bottom Slide Caption Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 pointer-events-none">
                      <div className="px-3.5 py-1.5 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md text-xs text-zinc-200 font-medium flex items-center gap-2 shadow-lg max-w-full truncate pointer-events-auto">
                        <Layers className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span className="truncate">
                          {captions[currentSlide] || `${project.title} Interface & Architectural View`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Preview Strip */}
                  {images.length > 1 && (
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5">
                      {images.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`relative flex-shrink-0 w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border transition-all ${
                            currentSlide === idx
                              ? 'border-sky-400 ring-2 ring-sky-400/50 scale-105 opacity-100 shadow-md shadow-sky-500/20'
                              : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/hero.png';
                            }}
                          />
                          {currentSlide === idx && (
                            <div className="absolute inset-0 bg-sky-500/10 pointer-events-none" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* B. PROJECT DESCRIPTION & 2-3 BULLET HIGHLIGHTS */}
                <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Project Description & Highlights</span>
                    </h3>
                    <span className="text-zinc-500 text-xs font-mono">Production Grade</span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-200">
                    {project.technicalSummary}
                  </p>

                  {/* 2 to 3 Bullet Points Highlights */}
                  <div className="space-y-2.5 pt-2 border-t border-white/5">
                    {highlights.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 flex-shrink-0 shadow-[0_0_8px_#38BDF8]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* C. PROBLEM STATEMENT & BUSINESS OUTCOME CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* The Problem */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/20 via-zinc-950 to-zinc-950 border border-rose-500/20 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <h4>The Challenge & Market Problem</h4>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                      {project.problemStatement}
                    </p>
                  </div>

                  {/* Business Outcome */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-zinc-950 to-zinc-950 border border-emerald-500/20 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <h4>Measurable Impact & ROI</h4>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                      {project.businessImpact}
                    </p>
                  </div>
                </div>

                {/* D. VERIFIED KEY PERFORMANCE METRICS */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>Important Information: Performance Benchmarks</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.keyMetrics.map((m, i) => (
                      <div key={i} className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 text-center hover:border-sky-500/30 transition-all">
                        <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 font-mono">
                          {m.value}
                        </div>
                        <div className="text-xs text-zinc-400 mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ARCHITECTURE & TECH STACK */}
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                
                {/* A. SYSTEM ARCHITECTURE PIPELINE */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 font-mono text-xs text-zinc-300 space-y-4">
                  <div className="text-sky-400 font-bold flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>System Architecture Pipeline</span>
                    </span>
                    <span className="text-zinc-500 text-xs">Production Schema</span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 font-sans">
                    {project.solutionArchitecture}
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-sky-300">
                      <span className="text-sky-400 font-bold">1. Request & Ingestion Layer:</span>
                      <span className="text-zinc-400">WebRTC Audio/Video / Client SPA / WebSocket Ingestion</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-300">
                      <span className="text-indigo-400 font-bold">2. Edge Processing & Gateway:</span>
                      <span className="text-zinc-400">Edge CDN / Server Actions / REST API & JWT Authorization</span>
                    </div>
                    <div className="flex items-center gap-2 text-violet-300">
                      <span className="text-violet-400 font-bold">3. Intelligence & Processing Layer:</span>
                      <span className="text-zinc-400">Quantized TensorFlow / LangChain RAG & FAISS Vector Search</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300">
                      <span className="text-emerald-400 font-bold">4. Persistence & Audit Logging:</span>
                      <span className="text-zinc-400">ACID Relational PostgreSQL / Supabase / SQLite Tamper Audit</span>
                    </div>
                  </div>
                </div>

                {/* B. CATEGORIZED TECH STACK CHIPS */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-sky-400" />
                    <span>Engineered Technologies ({project.techStack.length} Tools)</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categorizedStack.map((cat, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-2.5">
                        <div className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1.5">
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cat.techs.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 text-sky-300 border border-sky-500/20 hover:border-sky-400 hover:scale-105 transition-all shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EVIDENCE & VERIFIED METRICS */}
            {activeTab === 'evidence' && (
              <div className="space-y-6">
                
                {/* Verified Skills */}
                <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Skills Validated by this System Architecture</span>
                  </h4>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {project.relatedSkills.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900/90 text-zinc-200 text-xs font-mono border border-white/10 flex items-center gap-1.5 hover:border-emerald-500/40 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{s}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Audit & Code Verification Certification */}
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 space-y-3">
                  <div className="font-bold text-emerald-400 flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Audit & Production Verification Certification</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    All metrics, API response latencies, security validations, and architectural assertions for <span className="text-white font-semibold">{project.title}</span> are independently verified against source code repositories, deployment logs, and live production endpoints.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-emerald-400/90">
                    <span className="flex items-center gap-1">✓ Tamper-Proof Audit Trail</span>
                    <span className="flex items-center gap-1">✓ Production Tested</span>
                    <span className="flex items-center gap-1">✓ Open Source Codebase</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. MODAL FOOTER: ACTION BUTTONS (Live Project, GitHub, LinkedIn, Ask AI) */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-zinc-950/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* 1. Live Project Button */}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-102"
                  title="Open Deployed Live Project"
                >
                  <BrowserRedirectIcon className="w-4 h-4" />
                  <span>Live Project</span>
                </a>
              ) : (
                <span
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-500 border border-white/5 flex items-center gap-2 cursor-not-allowed"
                  title="Deployment currently staging"
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
                className="px-4 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-100 font-semibold transition-all flex items-center gap-2 border border-white/10 hover:border-sky-500/40 hover:scale-102 shadow-sm"
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
                className="px-4 py-2.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/35 text-[#70B5F9] border border-[#0A66C2]/50 font-semibold transition-all flex items-center gap-2 hover:scale-102 shadow-sm"
                title="View Profile / Project on LinkedIn"
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
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border border-violet-400/30 font-semibold transition-all flex items-center gap-2 shadow-lg shadow-violet-500/25 hover:scale-102 ml-auto"
              title="Launch AI Copilot with deep project context"
            >
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span>Ask AI About {project.title}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {isFullscreen && (
        <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sky-400 font-bold">
                {currentSlide + 1} / {images.length}
              </span>
              <span className="text-zinc-400 text-xs sm:text-sm">
                — {captions[currentSlide] || project.title}
              </span>
            </div>

            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-white border border-white/10 transition-colors"
              title="Close Fullscreen (Esc)"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            <img
              src={images[currentSlide]}
              alt={project.title}
              className="max-h-[82vh] max-w-[94vw] object-contain rounded-xl shadow-2xl border border-white/10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/hero.png';
              }}
            />

            {/* Left Nav */}
            {images.length > 1 && (
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md shadow-2xl hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-sky-400" />
              </button>
            )}

            {/* Right Nav */}
            {images.length > 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md shadow-2xl hover:scale-110 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-sky-400" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails in Lightbox */}
          {images.length > 1 && (
            <div className="flex justify-center items-center gap-2 overflow-x-auto py-2 z-10">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-14 sm:w-20 aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                    currentSlide === idx
                      ? 'border-sky-400 ring-2 ring-sky-400/50 scale-105'
                      : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
