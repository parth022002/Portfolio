import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Eye, 
  Download, 
  ShieldCheck, 
  Cpu, 
  Award,
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResearchSectionProps {
  onSelectProjectById?: (id: string) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = () => {
  const paper = PORTFOLIO_DATA.researchPapers[0];
  const reportUrl = paper?.paperUrl || "/Research Paper/Understanding AI Advisory Adoption Among Indian Retail Investors.pdf";
  const downloadUrl = paper?.downloadUrl || reportUrl;

  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-600/10 via-indigo-600/10 to-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-14 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-semibold text-zinc-300 mb-4 shadow-inner">
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span>Academic & Applied FinTech Research</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">& Empirical Paper</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
          Quantitative investigation analyzing the structural and psychological mechanisms governing AI advisory adoption among Indian retail investors (TAM, UTAUT2 & PLS-SEM Framework).
        </p>
      </motion.div>

      {/* Main Research Report Card */}
      {paper && (
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0B1120]/95 via-[#080D18]/95 to-[#05080F]/95 border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300 shadow-2xl relative overflow-hidden backdrop-blur-xl group"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 opacity-80" />

            <div className="space-y-8">
              {/* Header Badges & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-sky-950/70 text-sky-400 border border-sky-500/30 flex items-center gap-1.5 shadow-sm">
                    <Cpu className="w-3.5 h-3.5 text-sky-400" />
                    <span>{paper.domain}</span>
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/25 flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>JAGSoM Empirical Study</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/[0.03] px-3 py-1 rounded-md border border-white/5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{paper.date}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-sky-300 transition-colors leading-snug tracking-tight">
                  {paper.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-zinc-400 mt-2.5 leading-relaxed">
                  {paper.subtitle}
                </p>
              </div>

              {/* Academic Affiliation & Authorship Box */}
              {(paper.institution || paper.authors) && (
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Authors & Affiliation</span>
                    <span className="font-semibold text-zinc-200">{paper.authors}</span>
                    <span className="text-[11px] text-zinc-400 block">{paper.institution}</span>
                  </div>
                  {paper.guides && (
                    <div className="space-y-1 sm:text-right flex-shrink-0">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Academic Supervisor</span>
                      <span className="font-medium text-sky-300">{paper.guides}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Executive Abstract */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed shadow-inner">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Executive Abstract & Theoretical Model</span>
                </div>
                <p className="text-zinc-300/90 leading-relaxed pt-1">
                  {paper.abstract}
                </p>
              </div>

              {/* Key Architecture & Methodologies */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                    Methodological Architecture & Research Design
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {paper.methodology.map((m, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.015, x: 2 }}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-300 flex items-start gap-2.5 transition-all hover:border-sky-500/30 hover:bg-white/[0.05]"
                    >
                      <span className="w-2 h-2 rounded-full bg-sky-400 mt-1 flex-shrink-0 animate-pulse" />
                      <span className="font-medium leading-relaxed">{m}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benchmark Statistics Grid */}
              {paper.stats && paper.stats.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                      Empirical Statistical Benchmarks (PLS-SEM)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {paper.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-emerald-950/15 border border-emerald-500/20 text-center space-y-1 hover:border-emerald-500/40 transition-colors"
                      >
                        <div className="text-lg sm:text-xl font-mono font-extrabold text-emerald-400">
                          {stat.value}
                        </div>
                        <div className="text-[11px] font-semibold text-zinc-200">
                          {stat.label}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                          {stat.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Validated Findings Checklist */}
              <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-2.5 text-xs">
                <span className="font-mono font-bold text-emerald-400 uppercase text-[11px] block tracking-wider">
                  Key Validated Empirical Discoveries:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                  {paper.keyFindings.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Strictly View & Download */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>PDF Document • 2.6 MB • 44 Pages • Full Academic Paper & Appendices</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  {/* View Report Button */}
                  <a
                    href={reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03] active:scale-[0.98] min-h-[44px]"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Report</span>
                  </a>

                  {/* Download Report Button */}
                  <a
                    href={downloadUrl}
                    download="Understanding_AI_Advisory_Adoption_Among_Indian_Retail_Investors.pdf"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-800/90 hover:bg-zinc-700/90 text-white border border-white/15 hover:border-white/30 font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:scale-[1.03] active:scale-[0.98] min-h-[44px]"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download Report</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
