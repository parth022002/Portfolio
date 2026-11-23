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
          <a href="#" className="flex items-center gap-2.5 group">
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

        {/* Center: Navigation Tabs (Projects, Evidence & Skills, Certificates, Research Papers, Journey, Contact) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs sm:text-sm font-medium text-zinc-400 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#evidence" className="hover:text-white transition-colors">Evidence & Skills</a>
          <a href="#certificates" className="hover:text-white transition-colors">Certificates</a>
          <a href="#research" className="hover:text-white transition-colors">Research Papers</a>
          <a href="#experience" className="hover:text-white transition-colors">Journey</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Medium Screen Nav (md only) */}
        <nav className="hidden md:flex lg:hidden items-center gap-4 text-xs font-medium text-zinc-400 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#certificates" className="hover:text-white transition-colors">Certificates</a>
          <a href="#research" className="hover:text-white transition-colors">Research</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Right: GitHub, LinkedIn & Linktree Social Logos */}
        <div className="hidden md:flex items-center gap-2 z-10">
          {/* GitHub Logo */}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-transparent hover:border-white/10 transition-all"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn Logo */}
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-zinc-400 hover:text-sky-400 hover:bg-zinc-800/80 border border-transparent hover:border-white/10 transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Linktree Logo */}
          <a
            href={PORTFOLIO_DATA.personal.linktree}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/80 border border-transparent hover:border-white/10 transition-all"
            title="Linktree"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="m13.736 5.853 4.005-4.117 2.325 2.38-4.117 4.005h5.908v3.305h-5.937l4.146 4.146-2.325 2.38-4.005-4.117v6.17h-3.472v-6.17l-4.005 4.117-2.325-2.38 4.146-4.146H2.147V8.121h5.908L3.938 4.116l2.325-2.38 4.005 4.117V0h3.468v5.853z"/>
            </svg>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2 z-10">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-white"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white"
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
            Certificates (16+)
          </a>
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white text-sm"
          >
            Research Papers (2+)
          </a>
          <a
            href="#experience"
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
            <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs hover:text-white">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs hover:text-sky-400">
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a href={PORTFOLIO_DATA.personal.linktree} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs hover:text-emerald-400">
              <span className="font-bold">🌳</span>
              <span>Linktree</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
