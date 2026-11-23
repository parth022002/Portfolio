import React, { useState } from 'react';
import { ExternalLink, Github, Play, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenVideo: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenVideo
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'AI & GenAI', 'Full Stack', 'Data & Real-time', 'E-commerce'];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Proven Production Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Engineering Work</span>
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl overflow-hidden border border-white/5 hover:border-sky-500/30 bg-[#0A0E17]/70 hover:bg-[#0A0E17] transition-all duration-300 flex flex-col justify-between glow-hover"
          >
            {/* Top Image Preview & Quick Actions */}
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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

                {/* Business Impact & Technical Highlights */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <p className="text-zinc-300 line-clamp-2 leading-relaxed">
                    <strong className="text-sky-300 font-semibold">Impact: </strong>
                    {project.businessImpact}
                  </p>
                  <p className="text-zinc-400 line-clamp-2 leading-relaxed">
                    <strong className="text-emerald-300 font-semibold font-mono">Tech: </strong>
                    {project.technicalSummary}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-zinc-300 border border-white/5"
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
            <div className="p-5 sm:p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="GitHub Code"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={() => onSelectProject(project)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-sky-400 hover:text-sky-300 hover:bg-sky-950/30 transition-all"
              >
                <span>Deep Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
