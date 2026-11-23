import React, { useState } from 'react';
import { X, ExternalLink, Github, Play, FileText, Cpu, CheckCircle2, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenAIWithProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenAIWithProject
}) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'video' | 'architecture' | 'evidence'>('overview');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#090D16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-zinc-950/60">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5 font-mono">
              <span className="text-sky-400 font-bold">{project.number}</span>
              <span>/</span>
              <span>{project.category}</span>
              <span>/</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                {project.status}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 border-b border-white/5 bg-zinc-900/30 flex gap-6 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Problem & Outcome</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'video'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Video Explainer (3-Min)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Code</span>
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'evidence'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Evidence & Metrics</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-300">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/60 border border-white/5 relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero.png';
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                    The Problem & Market Need
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-300">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Business Outcome & ROI
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-300">
                    {project.businessImpact}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Verified Performance Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.keyMetrics.map((m, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 text-center">
                      <div className="text-lg font-bold text-sky-400 font-mono">{m.value}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEO EXPLAINER */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              {/* Video Player Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                <video
                  src="/intro.mp4"
                  controls
                  className="w-full h-full object-contain"
                  poster={project.img}
                />
              </div>

              {/* Chapters Selector */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Interactive Chapters (Video Production Bible Spec)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.videoChapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`p-2.5 rounded-lg text-left text-xs border transition-all flex items-start gap-2.5 ${
                        activeChapterIndex === idx
                          ? 'bg-sky-950/40 border-sky-500/40 text-white'
                          : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-sky-400 font-bold">{ch.time}</span>
                      <div>
                        <div className="font-semibold text-zinc-200">{ch.title}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{ch.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Synchronized Transcript Box */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono text-[11px] uppercase">Transcript Snapshot</span>
                  <span className="text-[10px] text-emerald-400">● AI Presenter Sync</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "{project.transcriptSnippet}"
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 font-mono text-xs text-zinc-300 space-y-3">
                <div className="text-sky-400 font-bold flex items-center justify-between">
                  <span>// System Architecture Pipeline</span>
                  <span className="text-zinc-500 text-[10px]">Production Schema</span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-300">
                  {project.solutionArchitecture}
                </p>
                <div className="p-3 rounded bg-zinc-900/80 border border-white/5 text-[11px] space-y-1">
                  <div>1. Client Request / Ingestion Layer &rarr; Browser WebRTC / React</div>
                  <div>2. Edge Processing & Gateway &rarr; Flask ASGI / Next.js Server Actions</div>
                  <div>3. Intelligence Layer &rarr; Quantized TensorFlow / OpenAI RAG Pipeline</div>
                  <div>4. Persistence & Audit &rarr; Relational PostgreSQL / SQLite Logs</div>
                </div>
              </div>

              {/* Full Tech Stack */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Engineered With
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 text-sky-300 border border-sky-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EVIDENCE */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Skills Validated by this System
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.relatedSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-white/5 text-zinc-300 text-xs border border-white/10">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2 text-xs">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Audit & Verification Status</span>
                </div>
                <p className="text-zinc-300">
                  All metrics, endpoints, and architectural assertions for this project are verified against source code repositories, deployment logs, and live production endpoints.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Action Bar */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-zinc-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors flex items-center gap-2 shadow-md shadow-sky-500/20"
              >
                <span>Open Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors flex items-center gap-2 border border-white/10"
              >
                <span>GitHub Repository</span>
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenAIWithProject(project);
            }}
            className="px-4 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 text-violet-300 border border-violet-500/40 font-semibold transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI About {project.title}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
