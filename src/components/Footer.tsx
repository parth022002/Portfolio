import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#05070B] text-zinc-500 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center p-0.5">
            <img src="/logo1.svg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-zinc-300 font-semibold">Parth Ahuja &copy; {new Date().getFullYear()}</div>
            <div className="text-[11px] text-zinc-500">Full-Stack AI Engineer & Business Analytics Strategist</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-zinc-400">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#evidence" className="hover:text-white transition-colors">Evidence</a>
          <a href="#certificates" className="hover:text-white transition-colors">Credentials</a>
          <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href={PORTFOLIO_DATA.personal.linktree} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Linktree</a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
          title="Return to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
