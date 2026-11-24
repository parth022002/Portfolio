import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Compass,
  ArrowRight,
  MapPin,
  Sparkles,
  Building2,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA, JourneyItem } from '../data/portfolioData';

interface ExperienceSectionProps {
  onSelectProjectById?: (id: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onSelectProjectById
}) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'all'>('experience');

  const experienceItems = PORTFOLIO_DATA.journey.experience;
  const educationItems = PORTFOLIO_DATA.journey.education;

  // Determine current active item set
  let currentItems: JourneyItem[] = [];
  if (activeTab === 'experience') {
    currentItems = experienceItems;
  } else if (activeTab === 'education') {
    currentItems = educationItems;
  } else {
    // Interleave or combine both chronologically
    currentItems = [
      experienceItems[0], // OASIS (2026)
      educationItems[0],  // JAGSoM (2025-2027)
      experienceItems[1], // CreArt (2023)
      experienceItems[2], // INTERNSAVY (2023)
      educationItems[1],  // GTU CSE (2020-2024)
      educationItems[2]   // Aditya Birla (2018-2020)
    ];
  }

  // Render individual timeline card
  const renderTimelineCard = (item: JourneyItem, index: number, isEven: boolean) => {
    const isExperience = item.type === 'experience';
    const accentColor = isExperience ? 'rose' : 'sky';
    const borderHover = isExperience ? 'hover:border-rose-400/40' : 'hover:border-sky-400/40';
    const glowShadow = isExperience
      ? 'hover:shadow-[0_0_30px_rgba(251,113,133,0.15)]'
      : 'hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]';
    const dotColor = isExperience ? 'bg-rose-400' : 'bg-sky-400';
    const dotGlow = isExperience
      ? 'shadow-[0_0_8px_rgba(251,113,133,0.8)]'
      : 'shadow-[0_0_8px_rgba(56,189,248,0.8)]';

    return (
      <div
        key={item.id}
        className="relative flex flex-col md:flex-row items-center justify-between w-full group mb-12 sm:mb-16 last:mb-0"
      >
        {/* Central Glowing Concentric Ring Node */}
        <div className="absolute left-3.5 sm:left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center top-7 md:top-8 -translate-y-1/2">
          <motion.div
            whileHover={{ scale: 1.25 }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 ${
              isExperience
                ? 'border-rose-400 shadow-[0_0_16px_rgba(251,113,133,0.85)]'
                : 'border-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.85)]'
            } bg-[#07090E] flex items-center justify-center cursor-pointer transition-transform duration-200`}
          >
            <div
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${dotColor} animate-pulse`}
            />
          </motion.div>
        </div>

        {/* Left Slot (Even items on desktop) & Main Slot on Mobile */}
        <div
          className={`w-full md:w-[45%] pl-10 sm:pl-12 md:pl-0 ${
            isEven ? 'md:mr-auto md:block' : 'md:hidden'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? -25 : 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`relative p-4 sm:p-6 md:p-7 rounded-2xl bg-[#090E17]/85 border border-white/10 ${borderHover} transition-all duration-300 shadow-xl backdrop-blur-md ${glowShadow}`}
          >
            {/* Desktop Connector Arm to Central Stem */}
            <div
              className={`hidden md:block absolute -right-6 top-8 w-6 border-t-2 border-dashed ${
                isExperience
                  ? 'border-rose-400/50 group-hover:border-rose-400'
                  : 'border-sky-400/50 group-hover:border-sky-400'
              } transition-colors pointer-events-none`}
            />

            {/* Top Meta Line: Period & Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div
                className={`font-mono font-semibold text-xs sm:text-sm flex items-center gap-1.5 ${
                  isExperience ? 'text-rose-400' : 'text-sky-400'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.period}</span>
              </div>

              {item.badge && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    isExperience
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
                  <span>{item.badge}</span>
                </span>
              )}
            </div>

            {/* Title & Organization Header */}
            <div className="mb-3">
              <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors">
                {item.title}
              </h4>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-zinc-300 font-medium">
                <span className="inline-flex items-center gap-1.5 text-zinc-200 font-semibold">
                  {isExperience ? (
                    <Building2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                  )}
                  <span>{item.organization}</span>
                </span>
                {item.location && (
                  <>
                    <span className="text-zinc-600">·</span>
                    <span className="flex items-center gap-1 text-zinc-400 text-xs">
                      <MapPin className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                      <span>{item.location}</span>
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Italic Lead Description */}
            <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed mb-4">
              "{item.description}"
            </p>

            {/* Bullet Point Highlights / Scope */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-white/5 mb-4">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  Key Achievements & Deliverables:
                </div>
                <ul className="space-y-2">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${dotGlow} flex-shrink-0 mt-2`} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills Chips */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {item.skills.map((s, si) => (
                <span
                  key={si}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-zinc-300 font-mono text-[11px] border border-white/5 group-hover:border-white/10 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Related Project Link */}
            {item.relatedProjectId && onSelectProjectById && (
              <div className="pt-3">
                <button
                  onClick={() => onSelectProjectById(item.relatedProjectId!)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl ${
                    isExperience
                      ? 'bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border-rose-500/30 shadow-rose-500/10'
                      : 'bg-sky-500/10 hover:bg-sky-500 text-sky-300 hover:text-white border-sky-500/30 shadow-sky-500/10'
                  } border text-xs font-semibold transition-all shadow-md cursor-pointer`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Slot (Odd items on desktop only) */}
        {!isEven && (
          <div className="hidden md:block md:w-[45%] md:ml-auto">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative p-4 sm:p-6 md:p-7 rounded-2xl bg-[#090E17]/85 border border-white/10 ${borderHover} transition-all duration-300 shadow-xl backdrop-blur-md ${glowShadow}`}
            >
              {/* Desktop Connector Arm to Central Stem */}
              <div
                className={`hidden md:block absolute -left-6 top-8 w-6 border-t-2 border-dashed ${
                  isExperience
                    ? 'border-rose-400/50 group-hover:border-rose-400'
                    : 'border-sky-400/50 group-hover:border-sky-400'
                } transition-colors pointer-events-none`}
              />

              {/* Top Meta Line: Period & Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div
                  className={`font-mono font-semibold text-xs sm:text-sm flex items-center gap-1.5 ${
                    isExperience ? 'text-rose-400' : 'text-sky-400'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>

                {item.badge && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      isExperience
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
                    <span>{item.badge}</span>
                  </span>
                )}
              </div>

              {/* Title & Organization Header */}
              <div className="mb-3">
                <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-zinc-300 font-medium">
                  <span className="inline-flex items-center gap-1.5 text-zinc-200 font-semibold">
                    {isExperience ? (
                      <Building2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    )}
                    <span>{item.organization}</span>
                  </span>
                  {item.location && (
                    <>
                      <span className="text-zinc-600">·</span>
                      <span className="flex items-center gap-1 text-zinc-400 text-xs">
                        <MapPin className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                        <span>{item.location}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Italic Lead Description */}
              <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed mb-4">
                "{item.description}"
              </p>

              {/* Bullet Point Highlights / Scope */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-white/5 mb-4">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    Key Achievements & Deliverables:
                  </div>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${dotGlow} flex-shrink-0 mt-2`} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {item.skills.map((s, si) => (
                  <span
                    key={si}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-zinc-300 font-mono text-[11px] border border-white/5 group-hover:border-white/10 transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Related Project Link */}
              {item.relatedProjectId && onSelectProjectById && (
                <div className="pt-3">
                  <button
                    onClick={() => onSelectProjectById(item.relatedProjectId!)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl ${
                      isExperience
                        ? 'bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border-rose-500/30 shadow-rose-500/10'
                        : 'bg-sky-500/10 hover:bg-sky-500 text-sky-300 hover:text-white border-sky-500/30 shadow-sky-500/10'
                    } border text-xs font-semibold transition-all shadow-md cursor-pointer`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Inspect Architecture</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Anchor alias to support both #journey and #experience */}
      <span id="experience" className="absolute -top-20 pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3 shadow-md">
          <Compass className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          <span>Professional & Academic Trajectory</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-sky-400 to-emerald-400">Journey</span>
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2">
          From foundational computer science academics to specialized industry internships.
        </p>

        {/* Minimalist Segmented Control Pill Bar */}
        <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center p-1 rounded-2xl sm:rounded-full bg-zinc-900/90 border border-white/10 mt-8 shadow-inner backdrop-blur-md max-w-full gap-1 sm:gap-0">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience (3)</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
              activeTab === 'education'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education (3)</span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-zinc-800 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All (6)</span>
          </button>
        </div>
      </motion.div>

      {/* Main Alternating Timeline Track */}
      <div className="relative max-w-5xl mx-auto py-4">
        {/* Central Vertical Glowing Line */}
        <div
          className={`absolute left-3.5 sm:left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] ${
            activeTab === 'education'
              ? 'bg-gradient-to-b from-sky-500 via-sky-400 to-sky-600/40 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
              : 'bg-gradient-to-b from-rose-500 via-sky-400 to-emerald-500/60 shadow-[0_0_12px_rgba(251,113,133,0.5)]'
          }`}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {currentItems.map((item, idx) => renderTimelineCard(item, idx, idx % 2 === 0))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
