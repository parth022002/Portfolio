import React from 'react';
import { Briefcase, GraduationCap, Calendar, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ExperienceSectionProps {
  mode: 'business' | 'tech';
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ mode }) => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
          <span>Professional Trajectory</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Experience & <span className={mode === 'business' ? 'text-sky-400' : 'text-emerald-400 font-mono'}>Academic Foundations</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          From hands-on software engineering internships to capstone AI architecture delivery.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {PORTFOLIO_DATA.experience.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{item.role}</span>
                </h3>
                <div className="text-sm font-semibold text-sky-400 mt-0.5">
                  {item.company}
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-400 font-mono w-fit">
                <Calendar className="w-3 h-3" />
                <span>{item.period}</span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mt-3">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
              {item.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-zinc-300 border border-white/5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
