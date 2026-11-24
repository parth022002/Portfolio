import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, Compass, ArrowRight, MapPin, Sparkles, Building2 } from 'lucide-react';
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

  // Render individual card content for an alternating timeline node
  const renderCardContent = (item: JourneyItem, isEven: boolean, accentColor: 'rose' | 'sky') => {
    const isRose = accentColor === 'rose';
    const borderHover = isRose ? 'hover:border-rose-400/40' : 'hover:border-sky-400/40';
    const glowShadow = isRose ? 'group-hover:shadow-[0_0_30px_rgba(251,113,133,0.12)]' : 'group-hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]';
    const dotColor = isRose ? 'bg-rose-400' : 'bg-sky-400';
    const dotGlow = isRose ? 'shadow-[0_0_8px_rgba(251,113,133,0.8)]' : 'shadow-[0_0_8px_rgba(56,189,248,0.8)]';

    return (
      <motion.div
        initial={{ opacity: 0, x: isEven ? -25 : 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`relative p-6 sm:p-7 rounded-2xl bg-[#090E17]/80 border border-white/10 ${borderHover} transition-all duration-300 shadow-xl backdrop-blur-md ${glowShadow}`}
      >
        {/* Connector Arm to Central Stem (Desktop Only) */}
        <div
          className={`hidden md:block absolute ${
            isEven ? '-right-6' : '-left-6'
          } top-8 w-6 border-t-2 border-dashed ${
            isRose ? 'border-rose-400/50 group-hover:border-rose-400' : 'border-sky-400/50 group-hover:border-sky-400'
          } transition-colors pointer-events-none`}
        />

        {/* Top Meta Row: Date & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          {/* Coral/Rose or Sky Date (Echoing Reference Image) */}
          <div
            className={`font-mono font-semibold text-xs sm:text-sm flex items-center gap-1.5 ${
              isRose ? 'text-rose-400' : 'text-sky-400'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{item.period}</span>
          </div>

          {/* Status / Highlight Badge */}
          {item.badge && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                isRose
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
              <span>{item.badge}</span>
            </span>
          )}
        </div>

        {/* Role / Degree Title (Modern luminous typography, avoiding heavy box aesthetics) */}
        <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors mb-2">
          {item.title}
        </h4>

        {/* Organization & Location */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-semibold text-zinc-200">
            {item.type === 'experience' ? (
              <Building2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            ) : (
              <GraduationCap className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            )}
            <span>{item.organization}</span>
          </span>
          {item.location && (
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
              <MapPin className="w-3 h-3 text-zinc-500 flex-shrink-0" />
              <span>{item.location}</span>
            </span>
          )}
        </div>

        {/* Italic Lead Description */}
        <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed mb-4">
          "{item.description}"
        </p>

        {/* Bullet Point Highlights / Key Achievements */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-white/5 mb-4">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Key Contributions & Scope:
            </div>
            <ul className="space-y-2">
              {item.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="text-xs text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${dotGlow} flex-shrink-0 mt-1.5`} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {item.skills.map((s, si) => (
            <span
              key={si}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-zinc-300 font-mono text-[11px] border border-white/5 group-hover:border-white/10 transition-colors"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Related Project Action Button */}
        {item.relatedProjectId && onSelectProjectById && (
          <div className="pt-3">
            <button
              onClick={() => onSelectProjectById(item.relatedProjectId!)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl ${
                isRose
                  ? 'bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border-rose-500/30 shadow-rose-500/10'
                  : 'bg-sky-500/10 hover:bg-sky-500 text-sky-300 hover:text-white border-sky-500/30 shadow-sky-500/10'
              } border text-xs font-semibold transition-all shadow-md cursor-pointer`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Architecture</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  // Reusable Alternating Timeline Track (Matching Reference Image Layout)
  const renderTimelineTrack = (items: JourneyItem[], accentColor: 'rose' | 'sky') => {
    const isRose = accentColor === 'rose';

    return (
      <div className="relative max-w-5xl mx-auto py-6">
        {/* Central Vertical Glowing Line */}
        <div
          className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] ${
            isRose
              ? 'bg-gradient-to-b from-rose-500/80 via-rose-400 to-rose-600/60 shadow-[0_0_12px_rgba(251,113,133,0.5)]'
              : 'bg-gradient-to-b from-sky-500/80 via-sky-400 to-sky-600/60 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
          }`}
        />

        <div className="space-y-12 sm:space-y-16">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className="relative flex flex-col md:flex-row items-center justify-between w-full group"
              >
                {/* Central Concentric Pulsing Node (Matching Reference) */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center top-8 -translate-y-1/2">
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    className={`w-8 h-8 rounded-full border-2 ${
                      isRose
                        ? 'border-rose-400 shadow-[0_0_18px_rgba(251,113,133,0.85)]'
                        : 'border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.85)]'
                    } bg-[#07090E] flex items-center justify-center cursor-pointer transition-transform duration-200`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${isRose ? 'bg-rose-400' : 'bg-sky-400'} animate-pulse`}
                    />
                  </motion.div>
                </div>

                {/* Left Side (Even items on desktop) / Main Slot on Mobile */}
                <div
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    isEven ? 'md:mr-auto md:block' : 'md:hidden'
                  }`}
                >
                  {renderCardContent(item, isEven, accentColor)}
                </div>

                {/* Right Side (Odd items on desktop only) */}
                {!isEven && (
                  <div className="hidden md:block md:w-[45%] md:ml-auto">
                    {renderCardContent(item, isEven, accentColor)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
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
        viewport={{ once: true, margin: '-80px' }}
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

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
              activeTab === 'all'
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <span>All Journey (6)</span>
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
            <span>Experience (3)</span>
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

      {/* Main Alternating Timeline Display */}
      <AnimatePresence mode="wait">
        {activeTab === 'all' && (
          <motion.div
            key="all-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-20"
          >
            {/* Experience Section (Matching User Reference Image 1) */}
            <div>
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/10">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-mono">
                    EXPERIENCE
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Industry internships, production deployments & analytics
                  </p>
                </div>
              </div>
              {renderTimelineTrack(experienceItems, 'rose')}
            </div>

            {/* Education Section (Matching User Reference Image 2) */}
            <div>
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/10">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-mono">
                    EDUCATION
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Academic institutions, management & foundational STEM
                  </p>
                </div>
              </div>
              {renderTimelineTrack(educationItems, 'sky')}
            </div>
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div
            key="experience-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/10">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-mono">
                  EXPERIENCE
                </h3>
                <p className="text-xs text-zinc-400">
                  Industry internships, production deployments & analytics
                </p>
              </div>
            </div>
            {renderTimelineTrack(experienceItems, 'rose')}
          </motion.div>
        )}

        {activeTab === 'education' && (
          <motion.div
            key="education-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/10">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-mono">
                  EDUCATION
                </h3>
                <p className="text-xs text-zinc-400">
                  Academic institutions, management & foundational STEM
                </p>
              </div>
            </div>
            {renderTimelineTrack(educationItems, 'sky')}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
