import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, ArrowRight, Layers, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenVideo: (project: Project) => void;
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

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenVideo
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories = ['All', 'AI & GenAI', 'Full Stack', 'Data & Real-time', 'E-commerce'];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory);

  const initialCount = 5;
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
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
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
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid with Staggered Scroll Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedProjects.map((project, idx) => (
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
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-black/30" />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-black/70 backdrop-blur-md text-white border border-white/10">
                    {project.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900/80 backdrop-blur-md text-zinc-300 border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Video Explainer Button on Hover */}
                <button
                  onClick={() => onOpenVideo(project)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-white text-xs font-medium border border-white/15 backdrop-blur-md flex items-center gap-1.5 shadow-lg group/btn transition-transform hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 text-sky-400 fill-sky-400 group-hover/btn:scale-110 transition-transform" />
                  <span>3-Min Explainer</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors flex items-center justify-between">
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
            <div className="p-5 sm:p-6 pt-3 border-t border-white/5 mt-4 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
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

                {/* 2. Deployed Live Website Redirect Symbol (Matches User Sample Image) */}
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
              </div>

              {/* Deep Case Study Button */}
              <button
                onClick={() => onSelectProject(project)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 hover:text-white border border-white/10 hover:border-sky-500/30 transition-all hover:translate-x-0.5 shadow-sm"
              >
                <span>Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>
          </motion.div>
        ))}

        {/* 6th Slot: Show More Interactive Card (Positioned Next to the 5th Project) */}
        {!showAll && hasMore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setShowAll(true)}
            className="group rounded-2xl border-2 border-dashed border-sky-500/30 hover:border-sky-400 bg-gradient-to-b from-[#0A0E17]/90 via-[#0C1527]/70 to-[#0A0E17]/90 hover:bg-[#0C1527] p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-xl glow-hover cursor-pointer relative overflow-hidden transition-all duration-300 min-h-[380px]"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-indigo-500/5 to-emerald-500/5 pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />

            {/* Top Badge */}
            <div className="relative z-10 w-full flex justify-between items-center text-xs">
              <span className="px-2.5 py-1 rounded-md font-mono font-bold bg-sky-950/70 text-sky-400 border border-sky-500/30">
                +{filteredProjects.length - initialCount} More
              </span>
              <span className="px-2.5 py-1 rounded-md font-medium bg-white/5 text-zinc-400 border border-white/5">
                Full Portfolio
              </span>
            </div>

            {/* Middle Call to Action */}
            <div className="relative z-10 space-y-4 my-auto py-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-500/40 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all duration-300">
                <Plus className="w-8 h-8 text-sky-400 group-hover:rotate-90 transition-transform duration-500" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight">
                  Show More Projects
                </h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed mx-auto">
                  Click to inspect all {filteredProjects.length} engineering applications spanning AI proctoring, enterprise RAG, streaming, and full-stack systems.
                </p>
              </div>
            </div>

            {/* Bottom Button Pill */}
            <div className="relative z-10 w-full pt-4 border-t border-white/5 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-all shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/40">
                <span>View All {filteredProjects.length} Projects</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Show Less Button at the end of the expanded project section */}
      {showAll && hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <button
            onClick={() => {
              setShowAll(false);
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2.5 backdrop-blur-md group cursor-pointer"
          >
            <span>Show Less (Show Top 5)</span>
            <ChevronUp className="w-4 h-4 text-zinc-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      )}
    </section>
  );
};
