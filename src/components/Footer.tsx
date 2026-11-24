import React from 'react';
import { Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills & Evidence', href: '#evidence' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Research', href: '#research' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#05070B]/95 backdrop-blur-md text-zinc-400 text-xs py-12 px-4 sm:px-6 lg:px-8 pb-28 sm:pb-14 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-8">
        
        {/* Center: Resume Download Button + All Pages Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-4xl">
          {/* Resume Download Button */}
          <a
            href="/resume.pdf"
            download="Parth_Ahuja_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-sky-500/20 hover:scale-105 active:scale-95 flex items-center gap-2 group"
            title="Download Parth Ahuja's Resume (PDF)"
          >
            <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Résumé</span>
          </a>

          {/* Vertical Separator */}
          <span className="hidden sm:inline w-px h-5 bg-white/10" />

          {/* All Pages / Sections Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-zinc-300 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors py-1 hover:underline underline-offset-4 decoration-sky-400/50"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Center: Brand Identity & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-white/5 w-full max-w-2xl text-center">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center p-1 shadow-sm">
            <img src="/logo1.svg" alt="Parth Ahuja Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-zinc-200 font-bold text-sm tracking-tight">
              Parth Ahuja &copy; {new Date().getFullYear()}
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="text-[11px] text-zinc-500 font-mono">
              Full-Stack AI Engineer & Business Analytics Strategist
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
