import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle2, ArrowRight, ExternalLink, Github, Sparkles, X } from 'lucide-react';
import { PORTFOLIO_DATA, ResearchPaper } from '../data/portfolioData';

interface ResearchSectionProps {
  onSelectProjectById?: (id: string) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ onSelectProjectById }) => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Academic Rigor & Publications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Technical Working Papers</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            In-depth academic investigations evaluating quantized neural inference on the edge, low-latency WebRTC media streams, and zero-hallucination RAG embedding architectures.
          </p>
        </div>
      </div>

      {/* Research Papers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PORTFOLIO_DATA.researchPapers.map((paper) => (
          <div
            key={paper.id}
            className="p-6 sm:p-8 rounded-2xl bg-[#090E17]/80 hover:bg-[#090E17] border border-white/10 hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between shadow-xl glow-hover group"
          >
            <div className="space-y-4">
              {/* Domain & Date Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-sky-950/60 text-sky-400 border border-sky-500/20">
                  {paper.domain}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {paper.date}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                  {paper.title}
                </h3>
                <p className="text-xs font-medium text-zinc-400 mt-1">
                  {paper.subtitle}
                </p>
              </div>

              {/* Abstract Preview */}
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-white/5">
                <strong className="text-sky-400 font-mono text-[11px] uppercase block mb-1">Abstract:</strong>
                {paper.abstract}
              </p>

              {/* Key Methodology Chips */}
              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-500 block mb-2">Evaluated Methodology:</span>
                <div className="flex flex-wrap gap-1.5">
                  {paper.methodology.map((m, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-zinc-300 border border-white/5"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Empirical Findings */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono uppercase text-emerald-400 block mb-1">Key Empirical Findings:</span>
                {paper.keyFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-6 border-t border-white/5 mt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                {paper.githubUrl && (
                  <a
                    href={paper.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Implementation Code</span>
                  </a>
                )}
                {paper.relatedProjectId && onSelectProjectById && (
                  <button
                    onClick={() => onSelectProjectById(paper.relatedProjectId!)}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 border border-sky-500/20 font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span>View Project Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedPaper(paper)}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 font-medium transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Full Summary</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paper Detail Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#090D16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between bg-zinc-950">
              <div>
                <span className="text-xs font-mono text-sky-400">{selectedPaper.domain}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{selectedPaper.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">{selectedPaper.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedPaper(null)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-300 leading-relaxed">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-2">
                  Complete Abstract & Problem Statement
                </h4>
                <p className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-zinc-300 leading-relaxed">
                  {selectedPaper.abstract}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Detailed Methodology & Pipeline
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPaper.methodology.map((m, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="font-semibold text-white font-mono">{i + 1}. {m}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Benchmarked Findings & Verification
                </h4>
                <div className="space-y-2">
                  {selectedPaper.keyFindings.map((f, i) => (
                    <div key={i} className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-white/10 bg-zinc-950 flex items-center justify-between">
              {selectedPaper.githubUrl && (
                <a
                  href={selectedPaper.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Code</span>
                </a>
              )}
              <button
                onClick={() => setSelectedPaper(null)}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
