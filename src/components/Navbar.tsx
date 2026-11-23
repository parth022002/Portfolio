import React, { useState } from 'react';
import { Sparkles, Terminal, Briefcase, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  mode: 'business' | 'tech';
  setMode: (mode: 'business' | 'tech') => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mode, setMode, onOpenAI }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#07090E]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm tracking-wider transition-all duration-300 ${
              mode === 'business' 
                ? 'bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/20' 
                : 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-black shadow-lg shadow-emerald-500/20 font-mono'
            }`}>
              PA
            </div>
            <div>
              <span className="font-semibold text-white tracking-tight group-hover:text-sky-400 transition-colors">
                Parth Ahuja
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available for Hire</span>
              </div>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#evidence" className="hover:text-white transition-colors">Skills & Evidence</a>
          <a href="#certificates" className="hover:text-white transition-colors">Credentials</a>
          <a href="#experience" className="hover:text-white transition-colors">Journey</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Right Actions: Dual Mode Switcher + Ask AI */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dual Mode Switcher */}
          <div className="flex items-center p-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-medium">
            <button
              onClick={() => setMode('business')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 ${
                mode === 'business'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Business</span>
            </button>
            <button
              onClick={() => setMode('tech')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 ${
                mode === 'tech'
                  ? 'bg-emerald-500 text-black font-mono font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Engineer</span>
            </button>
          </div>

          {/* Ask AI Copilot Button */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-600/20 to-sky-600/20 hover:from-violet-600/30 hover:to-sky-600/30 border border-violet-500/30 text-xs font-medium text-violet-300 hover:text-white transition-all shadow-sm group"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400 group-hover:rotate-12 transition-transform" />
            <span>Ask Parth AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping"></span>
          </button>

          <a
            href="https://github.com/parth022002/Portfolio"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="GitHub Repository"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAI}
            className="p-2 rounded-lg bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI</span>
          </button>
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
        <div className="md:hidden border-b border-white/10 bg-[#0A0E17]/95 px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs text-zinc-400">View Mode:</span>
            <div className="flex items-center p-1 rounded-full bg-zinc-900 border border-white/10 text-xs">
              <button
                onClick={() => setMode('business')}
                className={`px-3 py-1 rounded-full ${mode === 'business' ? 'bg-sky-500 text-white' : 'text-zinc-400'}`}
              >
                Business
              </button>
              <button
                onClick={() => setMode('tech')}
                className={`px-3 py-1 rounded-full ${mode === 'tech' ? 'bg-emerald-500 text-black font-mono font-bold' : 'text-zinc-400'}`}
              >
                Tech
              </button>
            </div>
          </div>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white text-sm"
          >
            Projects (14+)
          </a>
          <a
            href="#evidence"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white text-sm"
          >
            Skills & Evidence Matrix
          </a>
          <a
            href="#certificates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white text-sm"
          >
            Credentials (16+)
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white text-sm"
          >
            Experience & Education
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white text-sm"
          >
            Contact Parth
          </a>
        </div>
      )}
    </header>
  );
};
