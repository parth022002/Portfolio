import React from 'react';
import { Download, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#evidence' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Journey', href: '#journey' },
    { label: 'Research', href: '#research' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#05070B]/95 backdrop-blur-md text-zinc-400 text-xs py-10 px-4 sm:px-6 lg:px-8 pb-28 sm:pb-12 relative z-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Logo + Name on line 1, Reduced size Connect logos below */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-2.5">
            {/* Line 1: Logo & Name */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
              title="Return to Hero"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/15 ring-2 ring-sky-500/20 group-hover:ring-sky-500/60 shadow-md transition-all flex items-center justify-center flex-shrink-0 bg-zinc-900">
                <img
                  src="/parth-profile.jpg"
                  alt="Parth Ahuja"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-left">
                <span className="text-sm font-extrabold text-white tracking-tight group-hover:text-sky-400 transition-colors block leading-tight">
                  Parth Ahuja
                </span>
                <span className="text-[10px] text-zinc-400 font-mono block leading-normal mt-0.5">
                  Full-Stack AI Engineer
                </span>
              </div>
            </a>

            {/* Line 2: Connect Logos below (reduced compact size) */}
            <div className="flex items-center gap-2 pt-0.5">
              {/* GitHub */}
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-900/90 hover:bg-[#1A2234] border border-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 group"
                title="GitHub Profile"
              >
                <img src="/icons/github.png" alt="GitHub" className="w-3.5 h-3.5 object-contain rounded-full shadow-sm" />
              </a>

              {/* LinkedIn */}
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-900/90 hover:bg-[#1A2234] border border-white/10 hover:border-sky-500/40 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 group"
                title="LinkedIn Profile"
              >
                <img src="/icons/linkedin.png" alt="LinkedIn" className="w-3.5 h-3.5 object-contain rounded-[2px] shadow-sm" />
              </a>

              {/* Linktree */}
              <a
                href={PORTFOLIO_DATA.personal.linktree}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-900/90 hover:bg-[#1A2234] border border-white/10 hover:border-emerald-500/40 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 group"
                title="Linktree Profile"
              >
                <img src="/icons/linktree.png" alt="Linktree" className="w-3.5 h-3.5 object-contain rounded-[3px] shadow-sm" />
              </a>
            </div>
          </div>

          {/* Center Column: EXACTLY 2 Lines: Line 1 = All Page Names in one line, Line 2 = Download Resume Button */}
          <div className="md:col-span-6 flex flex-col items-center justify-center text-center gap-3">
            {/* Line 1: All page links in ONE single line */}
            <nav className="flex items-center justify-center gap-2.5 xs:gap-3.5 sm:gap-6 text-[11px] sm:text-xs font-medium text-zinc-300 whitespace-nowrap overflow-x-auto no-scrollbar max-w-full px-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors py-0.5 hover:underline underline-offset-4 decoration-sky-400/60"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Line 2: Download Resume Button */}
            <a
              href="/resume.pdf"
              download="Parth_Ahuja_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-105 active:scale-95 transition-all duration-200 group border border-white/10"
              title="Download Parth Ahuja's Résumé (PDF)"
            >
              <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Résumé</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono font-medium">PDF</span>
            </a>
          </div>

          {/* Right Column: Status & Location (Back to Top removed) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end text-center md:text-right gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-[11px] font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
              <span>Available for Roles & Projects</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
              <MapPin className="w-3 h-3 text-sky-400/70" />
              <span>Bengaluru, India • Remote Worldwide</span>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Bar: Brand Statement & Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-zinc-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Parth Ahuja. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Architecting High-Impact AI & Enterprise Systems</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
