import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, CheckCircle2, ArrowRight, Github, X } from 'lucide-react';
import { PORTFOLIO_DATA, ResearchPaper } from '../data/portfolioData';

interface ResearchSectionProps {
  onSelectProjectById?: (id: string) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ onSelectProjectById }) => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span>Academic & Applied AI Research</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">& Publications</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          Empirical investigation evaluating quantized edge inference, WebRTC stream decoupling, and low-latency anomaly detection.
        </p>
      </motion.div>

      {/* Featured Research Paper Showcase Card */}
      <div className="max-w-4xl mx-auto">
        {PORTFOLIO_DATA.researchPapers.map((paper) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -6 }}
            className="p-6 sm:p-10 rounded-3xl bg-[#090E17]/90 border border-white/10 hover:border-sky-500/40 transition-all duration-300 shadow-2xl glow-hover relative overflow-hidden group"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-sky-950/80 text-sky-400 border border-sky-500/30">
                    {paper.domain}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Peer-Verified Capstone</span>
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  {paper.date}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-sky-300 transition-colors leading-snug tracking-tight">
                  {paper.title}
                </h3>
                <p className="text-sm font-medium text-zinc-400 mt-2">
                  {paper.subtitle}
                </p>
              </div>

              {/* Abstract */}
              <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 block">
                  Executive Abstract
                </span>
                <p>{paper.abstract}</p>
              </div>

              {/* Methodology Grid */}
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase text-zinc-400 block mb-2.5">
                  Evaluated Architecture & Methods:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {paper.methodology.map((m, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, x: 2 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 font-mono text-zinc-300 flex items-center gap-2 transition-colors hover:border-sky-500/30"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      <span>{m}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Empirical Findings with Animated Progress Fill */}
              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3 text-xs">
                <span className="font-mono font-bold text-emerald-400 uppercase text-[11px] block">
                  Key Validated Benchmarks:
                </span>
                <div className="space-y-2">
                  {paper.keyFindings.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  {paper.githubUrl && (
                    <a
                      href={paper.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-all flex items-center gap-2 border border-white/10 hover:scale-105 active:scale-95"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code Repository</span>
                    </a>
                  )}

                  {paper.relatedProjectId && onSelectProjectById && (
                    <button
                      onClick={() => onSelectProjectById(paper.relatedProjectId!)}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all flex items-center gap-2 shadow-md shadow-sky-500/20 hover:scale-105 active:scale-95"
                    >
                      <span>Inspect ProctorShield</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 font-medium transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Full Paper Summary</span>
                </button>
              </div>
            </div>
          </motion.div>
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
