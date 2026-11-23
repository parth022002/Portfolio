import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, Compass, ArrowRight, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA, JourneyItem } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');

  const experienceItems = PORTFOLIO_DATA.journey.experience;
  const educationItems = PORTFOLIO_DATA.journey.education;

  let currentItems: JourneyItem[] = [];
  if (activeTab === 'experience') {
    currentItems = experienceItems;
  } else if (activeTab === 'education') {
    currentItems = educationItems;
  } else {
    // Interleave or combine both
    currentItems = [...experienceItems, ...educationItems];
  }

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3 shadow-md">
          <Compass className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          <span>Professional & Academic Trajectory</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-sky-400 to-emerald-400">Journey</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          From foundational computer science academics to specialized industry internships.
        </p>

        {/* Journey View Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === 'all'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg shadow-rose-500/10'
                : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <span>All Milestones (4)</span>
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === 'experience'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg shadow-rose-500/10'
                : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience (2)</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === 'education'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg shadow-rose-500/10'
                : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education (2)</span>
          </button>
        </div>
      </motion.div>

      {/* Alternating Center Timeline (Conforming to Provided Reference Images) */}
      <div className="relative max-w-5xl mx-auto py-8">
        {/* Central Vertical Timeline Track */}
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2.5px] bg-gradient-to-b from-rose-400 via-sky-400 to-indigo-500 shadow-[0_0_12px_rgba(251,113,133,0.5)]" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12 sm:space-y-16"
          >
            {currentItems.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-center justify-between w-full"
                >
                  {/* Central Concentric Ring Node (From Reference) */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      className="w-7 h-7 rounded-full border-[3px] border-rose-400 bg-[#07090E] flex items-center justify-center shadow-[0_0_18px_rgba(251,113,133,0.85)] cursor-pointer"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Left Side (Even Index on Desktop) */}
                  <div
                    className={`w-full md:w-[46%] pl-12 md:pl-0 ${
                      isEven ? 'md:mr-auto md:text-right' : 'md:hidden'
                    }`}
                  >
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ y: -4 }}
                        className="p-6 sm:p-7 rounded-2xl bg-[#090E17]/90 border border-white/10 hover:border-rose-400/40 transition-all duration-300 shadow-xl backdrop-blur-md group"
                      >
                        {/* Title Pill (Styled like Reference Box) */}
                        <div className="inline-block px-4 py-2 rounded-xl bg-white text-zinc-950 font-bold text-sm sm:text-base shadow-lg tracking-tight mb-3 group-hover:bg-rose-400 group-hover:text-black transition-colors">
                          {item.title}
                        </div>

                        {/* Italicized Description or Institution */}
                        <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed mb-3">
                          {item.type === 'experience' ? item.description : item.organization}
                        </p>

                        {/* Coral/Rose Date Badge */}
                        <div className="text-rose-400 font-mono font-semibold text-xs sm:text-sm flex items-center gap-1.5 md:justify-end mb-2">
                          <Calendar className="w-3.5 h-3.5 text-rose-400" />
                          <span>{item.period}</span>
                        </div>

                        {/* Organization Tag Pill */}
                        <div className="inline-block px-3 py-1 rounded-lg bg-zinc-800/90 border border-white/10 text-zinc-200 text-xs font-semibold shadow-sm">
                          {item.organization}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side (Odd Index on Desktop) */}
                  <div
                    className={`w-full md:w-[46%] pl-12 md:pl-0 ${
                      !isEven ? 'md:ml-auto md:text-left' : 'hidden md:block'
                    }`}
                  >
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ y: -4 }}
                        className="p-6 sm:p-7 rounded-2xl bg-[#090E17]/90 border border-white/10 hover:border-rose-400/40 transition-all duration-300 shadow-xl backdrop-blur-md group"
                      >
                        {/* Title Pill (Styled like Reference Box) */}
                        <div className="inline-block px-4 py-2 rounded-xl bg-white text-zinc-950 font-bold text-sm sm:text-base shadow-lg tracking-tight mb-3 group-hover:bg-rose-400 group-hover:text-black transition-colors">
                          {item.title}
                        </div>

                        {/* Italicized Description or Institution */}
                        <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed mb-3">
                          {item.type === 'experience' ? item.description : item.organization}
                        </p>

                        {/* Coral/Rose Date Badge */}
                        <div className="text-rose-400 font-mono font-semibold text-xs sm:text-sm flex items-center gap-1.5 mb-2">
                          <Calendar className="w-3.5 h-3.5 text-rose-400" />
                          <span>{item.period}</span>
                        </div>

                        {/* Organization Tag Pill */}
                        <div className="inline-block px-3 py-1 rounded-lg bg-zinc-800/90 border border-white/10 text-zinc-200 text-xs font-semibold shadow-sm">
                          {item.organization}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
