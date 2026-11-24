import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Layers, ChevronDown, ChevronUp, Plus, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
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

// Interactive Project Card supporting Multi-Photo In-Card Navigation
const ProjectCard: React.FC<{
  project: Project;
  idx: number;
  onSelectProject: (project: Project) => void;
}> = ({ project, idx, onSelectProject }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const images = project.images && project.images.length > 0 ? project.images : [project.img];
  const hasMultiple = images.length > 1;

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % images.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentPhoto = images[photoIndex] || project.img;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl overflow-hidden border border-white/5 hover:border-sky-500/40 bg-[#0A0E17]/80 hover:bg-[#0A0E17] transition-all duration-300 flex flex-col justify-between shadow-xl glow-hover"
    >
      {/* Top Image Preview & Quick Actions */}
      <div>
        <div
          className="relative aspect-[16/10] overflow-hidden bg-zinc-950 cursor-pointer"
          onClick={() => onSelectProject(project)}
        >
          <img
            src={currentPhoto}
            alt={`${project.title} - photo ${photoIndex + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/hero.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-black/30 pointer-events-none" />

          {/* Hover Arrows for Multi-Photo Projects */}
          {hasMultiple && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20 hover:scale-110 shadow-xl"
                title="Previous photo"
              >
                <ChevronLeft className="w-4 h-4 text-sky-300" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20 hover:scale-110 shadow-xl"
                title="Next photo"
              >
                <ChevronRight className="w-4 h-4 text-sky-300" />
              </button>

              {/* Bottom Dot Indicators on Image */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
                {images.slice(0, 8).map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      photoIndex === dotIdx ? 'w-5 bg-sky-400 shadow-[0_0_6px_#38BDF8]' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
                {images.length > 8 && (
                  <span className="text-[9px] text-white/80 font-mono pl-0.5">+{images.length - 8}</span>
                )}
              </div>
            </>
          )}

          {/* Top Badge Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-black/70 backdrop-blur-md text-white border border-white/10">
              {project.number}
            </span>
            {project.importanceLevel && (
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-md border ${
                project.importanceLevel === 'Level 1'
                  ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                  : project.importanceLevel === 'Level 2'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                  : project.importanceLevel === 'Level 3'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  : 'bg-zinc-900/80 text-zinc-300 border-white/10'
              }`}>
                {project.importanceLevel}
              </span>
            )}
            {project.projectType === 'ACADEMIC' && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                Academic
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900/80 backdrop-blur-md text-zinc-300 border border-white/10">
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6 space-y-3">
          <h3
            onClick={() => onSelectProject(project)}
            className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>{project.title}</span>
            <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/20">
              {project.status}
            </span>
          </h3>

          <p className="text-xs font-medium text-zinc-400 line-clamp-1">
            {project.tagline}
          </p>

          {/* 2 to 3 Bullet Points Description (Max 3 Points) */}
          <div className="space-y-2 pt-1 text-xs">
            {getProjectHighlights(project).map((point, i) => (
              <div key={i} className="flex items-start gap-2 text-zinc-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0 shadow-[0_0_6px_#38BDF8]" />
                <span className="line-clamp-2">{point}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-zinc-300 border border-white/5 group-hover:border-sky-500/20 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-500">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="p-4 sm:p-6 pt-3 border-t border-white/5 mt-4 flex items-center justify-between gap-2 sm:gap-3 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 1. GitHub Logo Link */}
          <a
            href={project.githubUrl || PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 hover:border-sky-500/40 transition-all hover:scale-110 shadow-sm flex items-center justify-center group/gh"
            title="View GitHub Repository"
          >
            <Github className="w-4 h-4 group-hover/gh:text-sky-400 transition-colors" />
          </a>

          {/* 2. Deployed Live Website Redirect Symbol */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 hover:text-sky-300 border border-sky-500/30 hover:border-sky-400 transition-all hover:scale-110 shadow-sm flex items-center justify-center group/live"
              title="Open Deployed Live Website"
            >
              <BrowserRedirectIcon className="w-4 h-4 group-hover/live:scale-110 transition-transform" />
            </a>
          ) : (
            <span
              className="p-2.5 rounded-xl bg-zinc-900/60 text-zinc-600 border border-white/5 flex items-center justify-center cursor-not-allowed"
              title="Deployment in progress"
            >
              <BrowserRedirectIcon className="w-4 h-4 opacity-40" />
            </span>
          )}

          {/* 3. LinkedIn Link */}
          {project.linkedinUrl && (
            <a
              href={project.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/30 text-[#70B5F9] border border-[#0A66C2]/40 hover:border-[#70B5F9] transition-all hover:scale-110 shadow-sm flex items-center justify-center group/li"
              title="View LinkedIn Project Post"
            >
              <Linkedin className="w-4 h-4 group-hover/li:text-[#70B5F9] transition-colors" />
            </a>
          )}
        </div>

        {/* Read Details Button */}
        <button
          onClick={() => onSelectProject(project)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 hover:text-white border border-white/10 hover:border-sky-500/30 transition-all hover:translate-x-0.5 shadow-sm"
        >
          <span>Read Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
        </button>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories = [
    { id: 'All', label: 'All Projects', count: PORTFOLIO_DATA.projects.length },
    { id: 'Level 1', label: '⭐ Level 1 Flagships', count: PORTFOLIO_DATA.projects.filter(p => p.importanceLevel === 'Level 1').length },
    { id: 'AI & GenAI', label: 'AI & GenAI', count: PORTFOLIO_DATA.projects.filter(p => p.category === 'AI & GenAI').length },
    { id: 'Business Analytics & Strategy', label: 'Business Analytics', count: PORTFOLIO_DATA.projects.filter(p => p.category === 'Business Analytics & Strategy').length },
    { id: 'Full Stack', label: 'Full Stack', count: PORTFOLIO_DATA.projects.filter(p => p.category === 'Full Stack').length },
    { id: 'E-commerce', label: 'E-commerce', count: PORTFOLIO_DATA.projects.filter(p => p.category === 'E-commerce').length },
    { id: 'ACADEMIC', label: '🎓 Academic', count: PORTFOLIO_DATA.projects.filter(p => p.projectType === 'ACADEMIC').length },
  ];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : activeCategory === 'Level 1'
    ? PORTFOLIO_DATA.projects.filter(p => p.importanceLevel === 'Level 1')
    : activeCategory === 'ACADEMIC'
    ? PORTFOLIO_DATA.projects.filter(p => p.projectType === 'ACADEMIC')
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory);

  const initialCount = 6;
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, initialCount);
  const hasMore = filteredProjects.length > initialCount;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Portfolio Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Projects</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Real-world systems combining deep technical architectures (TensorFlow, WebRTC, Next.js, LangChain) with measurable business impact.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setShowAll(false);
              }}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none ${
                activeCategory === cat.id ? 'bg-sky-600/80 text-white' : 'bg-white/5 text-zinc-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Dashboard: Positioned before all projects start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="w-full mb-10 sm:mb-12 p-4 sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-b from-[#0A0E17]/95 via-[#0C1527]/90 to-[#0A0E17]/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left glow-hover"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/30 text-xs font-mono text-sky-400 font-bold">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>PROJECT REPOSITORY DIRECTORY</span>
          </div>
          <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Total Projects: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-300">{PORTFOLIO_DATA.projects.length} Verified Systems</span>
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            Spanning Agentic AI Systems, Multi-Tier Supply Chain Decision Intelligence, Quantitative Asset Valuation Models, Computer Vision Invigilation, and High-Throughput Web Applications.
          </p>
        </div>

        {/* Quick Metrics Breakdown Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 text-xs font-mono flex-shrink-0 w-full lg:w-auto">
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/5 hover:border-sky-500/30 transition-all flex flex-col items-center justify-center">
            <span className="text-sky-400 font-extrabold text-lg">{PORTFOLIO_DATA.projects.filter(p => p.liveUrl).length}</span>
            <span className="text-[11px] text-zinc-400 font-sans mt-0.5">Live Demos</span>
          </div>
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col items-center justify-center">
            <span className="text-emerald-400 font-extrabold text-lg">{PORTFOLIO_DATA.projects.filter(p => p.githubUrl).length}</span>
            <span className="text-[11px] text-zinc-400 font-sans mt-0.5">GitHub Repos</span>
          </div>
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/5 hover:border-amber-500/30 transition-all flex flex-col items-center justify-center">
            <span className="text-amber-400 font-extrabold text-lg">{PORTFOLIO_DATA.projects.filter(p => p.importanceLevel === 'Level 1').length}</span>
            <span className="text-[11px] text-zinc-400 font-sans mt-0.5">Flagships (L1)</span>
          </div>
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col items-center justify-center">
            <span className="text-purple-400 font-extrabold text-lg">{PORTFOLIO_DATA.projects.filter(p => p.category === 'AI & GenAI').length}</span>
            <span className="text-[11px] text-zinc-400 font-sans mt-0.5">AI & GenAI</span>
          </div>
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col items-center justify-center">
            <span className="text-indigo-400 font-extrabold text-lg">{PORTFOLIO_DATA.projects.filter(p => p.projectType === 'ACADEMIC').length}</span>
            <span className="text-[11px] text-zinc-400 font-sans mt-0.5">Academic Studies</span>
          </div>
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col items-center justify-center">
            <span className="text-cyan-400 font-extrabold text-lg">100%</span>
            <span className="text-[11px] text-zinc-400 font-sans mt-0.5">Production Code</span>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid: Exactly 6 Projects initially (2 rows x 3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            idx={idx}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>

      {/* Centered Show More / Show Less Button */}
      {hasMore && (
        <div className="flex justify-center mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <button
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setShowAll(true);
                }
              }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-sky-500 hover:from-sky-400 hover:via-indigo-500 hover:to-sky-400 text-white font-bold text-sm transition-all duration-300 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer border border-sky-400/40 group"
            >
              <span>{showAll ? `Show Less (Top ${initialCount} Projects)` : `Show More Projects (${filteredProjects.length - initialCount} Remaining)`}</span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};
