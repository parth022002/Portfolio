import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
          <span>Professional Trajectory</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Academic Foundations</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          From hands-on software engineering internships to capstone AI architecture delivery.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-6 relative">
        {/* Glowing vertical connector line */}
        <div className="absolute left-6 top-8 bottom-8 w-[1.5px] bg-gradient-to-b from-sky-400 via-indigo-500 to-emerald-400 hidden sm:block opacity-30" />

        {PORTFOLIO_DATA.experience.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ x: 6 }}
            className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-sky-500/30 transition-all duration-300 backdrop-blur-sm relative sm:ml-8"
          >
            {/* Timeline node */}
            <div className="absolute -left-[39px] top-9 w-3.5 h-3.5 rounded-full bg-sky-400 border-2 border-black hidden sm:block shadow-[0_0_10px_rgba(56,189,248,0.8)]" />

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
                <Calendar className="w-3 h-3 text-sky-400" />
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};
