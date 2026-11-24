import React, { useState } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#07090E]/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Left: Logo 1 */}
        <div className="flex items-center gap-3 z-10">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              const heroEl = document.getElementById('hero');
              if (heroEl) {
                heroEl.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
            title="Go to Main / Hero Section"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 bg-zinc-900/80 flex items-center justify-center p-0.5 shadow-md shadow-sky-500/10 group-hover:border-sky-500/40 transition-all">
              {!logoError ? (
                <img
                  src="/logo1.png"
                  alt="Logo 1"
                  className="w-full h-full object-contain"
                  onError={() => {
                    setLogoError(true);
                  }}
                />
              ) : (
                <img
                  src="/logo1.svg"
                  alt="Logo 1"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
            </div>
            <div>
              <span className="font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors text-sm sm:text-base">
                Parth Ahuja
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for Opportunities</span>
              </div>
            </div>
          </a>
        </div>

        {/* Center: Navigation Tabs (Projects, Evidence & Skills, Certificates, Research Paper, Journey, Contact) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs sm:text-sm font-medium text-zinc-400 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#evidence" className="hover:text-white transition-colors">Evidence & Skills</a>
          <a href="#certificates" className="hover:text-white transition-colors">Certificates</a>
          <a href="#research" className="hover:text-white transition-colors">Research Paper</a>
          <a href="#journey" className="hover:text-white transition-colors">Journey</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Medium Screen Nav (md only) */}
        <nav className="hidden md:flex lg:hidden items-center gap-4 text-xs font-medium text-zinc-400 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#certificates" className="hover:text-white transition-colors">Certificates</a>
          <a href="#research" className="hover:text-white transition-colors">Research</a>
          <a href="#journey" className="hover:text-white transition-colors">Journey</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Right: GitHub, LinkedIn & Linktree Social Logos */}
        <div className="hidden md:flex items-center gap-2 z-10">
          {/* GitHub Logo */}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/30 flex items-center justify-center p-1.5 transition-all shadow-sm hover:scale-110 active:scale-95 group"
            title="GitHub Profile"
          >
            <img src="/icons/github.png" alt="GitHub" className="w-full h-full object-contain" />
          </a>

          {/* LinkedIn Logo */}
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-sky-500/40 flex items-center justify-center p-1.5 transition-all shadow-sm hover:scale-110 active:scale-95 group"
            title="LinkedIn Profile"
          >
            <img src="/icons/linkedin.png" alt="LinkedIn" className="w-full h-full object-contain rounded-[2px]" />
          </a>

          {/* Linktree Logo */}
          <a
            href={PORTFOLIO_DATA.personal.linktree}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 flex items-center justify-center p-1.5 transition-all shadow-sm hover:scale-110 active:scale-95 group"
            title="Linktree"
          >
            <img src="/icons/linktree.png" alt="Linktree" className="w-full h-full object-contain rounded-[3px]" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2 z-10">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center p-1"
          >
            <img src="/icons/github.png" alt="GitHub" className="w-full h-full object-contain" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0A0E17]/98 px-6 pt-3 pb-6 space-y-3">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white text-sm"
          >
            Projects (14+)
          </a>
          <a
            href="#evidence"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white text-sm"
          >
            Evidence & Skills
          </a>
          <a
            href="#certificates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white text-sm"
          >
            Certificates (49+)
          </a>
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white text-sm"
          >
            Research Paper (1)
          </a>
          <a
            href="#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white text-sm"
          >
            Journey & Experience
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white text-sm"
          >
            Contact Parth
          </a>

          <div className="pt-3 border-t border-white/10 flex items-center gap-4 text-zinc-400">
            <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs hover:text-white">
              <img src="/icons/github.png" alt="GitHub" className="w-4 h-4 object-contain" />
              <span>GitHub</span>
            </a>
            <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs hover:text-sky-400">
              <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4 object-contain rounded-[2px]" />
              <span>LinkedIn</span>
            </a>
            <a href={PORTFOLIO_DATA.personal.linktree} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs hover:text-emerald-400">
              <img src="/icons/linktree.png" alt="Linktree" className="w-4 h-4 object-contain rounded-[3px]" />
              <span>Linktree</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
