import React from 'react';
import { Briefcase, Terminal, Cpu, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface DualLensBannerProps {
  mode: 'business' | 'tech';
  setMode: (mode: 'business' | 'tech') => void;
}

export const DualLensBanner: React.FC<DualLensBannerProps> = ({ mode, setMode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-500 backdrop-blur-md ${
        mode === 'business'
          ? 'bg-gradient-to-r from-sky-950/30 via-slate-900/40 to-blue-950/30 border-sky-500/20 shadow-lg shadow-sky-950/20'
          : 'bg-gradient-to-r from-emerald-950/30 via-slate-900/40 to-cyan-950/30 border-emerald-500/20 shadow-lg shadow-emerald-950/20 font-mono'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              {mode === 'business' ? (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-sky-300 font-semibold">Active Perspective: Executive / Business Value</span>
                </>
              ) : (
                <>
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">Active Perspective: Senior AI & Systems Engineer</span>
                </>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {mode === 'business' 
                ? "Evaluating for Product ROI, Team Impact & Operational Scalability?"
                : "Inspecting Code Quality, Model Accuracy, Latency & Clean Architecture?"}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {mode === 'business'
                ? "This view highlights cost reduction, user adoption, time-to-market, and business process automation across all 14+ shipped systems."
                : "This view reveals component schemas, WebRTC streaming pipelines, quantized TensorFlow inferences, and GitHub commit histories."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setMode(mode === 'business' ? 'tech' : 'business')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                mode === 'business'
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-sky-300 border-sky-500/30 hover:border-sky-500'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-emerald-300 border-emerald-500/30 hover:border-emerald-500'
              }`}
            >
              <span>Switch to {mode === 'business' ? 'Engineering View' : 'Business View'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Real-time Telemetry Metrics Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{mode === 'business' ? 'Zero Hallucination Guardrails' : 'Grounded RAG Pipeline'}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <TrendingUp className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <span>{mode === 'business' ? '98% Positive Stakeholder Audit' : 'p99 Inference < 140ms'}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Cpu className="w-4 h-4 text-violet-400 flex-shrink-0" />
            <span>{mode === 'business' ? 'Enterprise Edge Reliability' : 'Edge SSR + Incremental Cache'}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{mode === 'business' ? 'Production Ready Status' : 'Git HEAD: Verified Passed'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
