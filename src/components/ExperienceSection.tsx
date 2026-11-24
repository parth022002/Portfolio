import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, Compass, ArrowRight, MapPin, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { PORTFOLIO_DATA, JourneyItem } from '../data/portfolioData';

interface ExperienceSectionProps {
  onSelectProjectById?: (id: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onSelectProjectById
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');

  const experienceItems = PORTFOLIO_DATA.journey.experience;
  const educationItems = PORTFOLIO_DATA.journey.education;

  // Render a single journey card
  const renderCard = (item: JourneyItem, index: number, accentColor: 'rose' | 'sky') => {
    const isExperience = item.type === 'experience';
    const borderAccent = accentColor === 'rose' ? 'hover:border-rose-400/50' : 'hover:border-sky-400/50';
    const badgeBg = accentColor === 'rose' ? 'bg-rose-950/70 text-rose-300 border-rose-500/30' : 'bg-sky-950/70 text-sky-300 border-sky-500/30';
    const dotColor = accentColor === 'rose' ? 'bg-rose-400' : 'bg-sky-400';

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className={`relative p-6 sm:p-7 rounded-2xl bg-[#090E18]/85 border border-white/10 ${borderAccent} transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between group`}
      >
        {/* Glow ambient background on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
          accentColor === 'rose' ? 'from-rose-500/5' : 'from-sky-500/5'
        } via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

        <div className="relative z-10 space-y-4">
          {/* Card Top Pill Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Period Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono font-semibold text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{item.period}</span>
            </div>

            {/* Status / Highlight Badge */}
            {item.badge && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeBg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
                <span>{item.badge}</span>
              </span>
            )}
          </div>

          {/* Title & Organization */}
          <div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors">
              {item.title}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-zinc-400 font-medium">
              <span className="flex items-center gap-1 text-zinc-300 font-semibold">
                <Building2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span>{item.organization}</span>
              </span>
              {item.location && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <MapPin className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                    <span>{item.location}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Lead Summary */}
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Bullet Point Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-white/5">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                Key Contributions & Scope:
              </div>
              <ul className="space-y-2">
                {item.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="text-xs text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0 mt-1.5 shadow-sm`} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills / Tech Stack Chips */}
          {item.skills && item.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900/90 text-zinc-300 font-mono text-[11px] border border-white/5 group-hover:border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Optional Action Button linking to related project */}
        {item.relatedProjectId && onSelectProjectById && (
          <div className="relative z-10 pt-4 mt-4 border-t border-white/5 flex items-center justify-end">
            <button
              onClick={() => onSelectProjectById(item.relatedProjectId!)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-sky-500 text-zinc-300 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm group/btn"
            >
              <span>Explore Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Anchor alias to support both #journey and #experience */}
      <span id="experience" className="absolute -top-20 pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3 shadow-md">
          <Compass className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          <span>Professional Trajectory & Academic Pedigree</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-sky-400 to-emerald-400">Journey</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          From computer engineering fundamentals to high-impact industry internships and postgraduate product & business analytics strategy.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
              activeTab === 'all'
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <span>All Milestones (6)</span>
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
              activeTab === 'experience'
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Internships (3)</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
              activeTab === 'education'
                ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/25 scale-105'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education (3)</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content Layout */}
      <AnimatePresence mode="wait">
        {activeTab === 'all' && (
          <motion.div
            key="all-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start"
          >
            {/* Left Track: Internships & Industry Experience */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-sm">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Industry Internships
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Production implementations, analytics & mobile development
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {experienceItems.map((item, idx) => renderCard(item, idx, 'rose'))}
              </div>
            </div>

            {/* Right Track: Academic Pedigree & Degrees */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Academic Education
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Postgraduate management, computer engineering & foundations
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {educationItems.map((item, idx) => renderCard(item, idx, 'sky'))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div
            key="experience-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {experienceItems.map((item, idx) => renderCard(item, idx, 'rose'))}
          </motion.div>
        )}

        {activeTab === 'education' && (
          <motion.div
            key="education-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {educationItems.map((item, idx) => renderCard(item, idx, 'sky'))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
