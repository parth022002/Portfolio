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
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA, JourneyItem } from '../data/portfolioData';

interface ExperienceSectionProps {
  onSelectProjectById?: (id: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onSelectProjectById
}) => {
  const [activeTab, setActiveTab] = useState<'parallel' | 'experience' | 'education'>('parallel');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  const experienceItems = PORTFOLIO_DATA.journey.experience;
  const educationItems = PORTFOLIO_DATA.journey.education;

  // Toggle individual card expansion
  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle all cards expansion
  const toggleAllExpanded = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const updated: Record<string, boolean> = {};
    [...experienceItems, ...educationItems].forEach((item) => {
      updated[item.id] = nextState;
    });
    setExpandedCards(updated);
  };

  // Render individual compact card
  const renderCompactCard = (
    item: JourneyItem,
    accentColor: 'rose' | 'sky',
    isExpanded: boolean,
    onToggle: () => void
  ) => {
    const isRose = accentColor === 'rose';
    const borderHover = isRose ? 'hover:border-rose-400/50' : 'hover:border-sky-400/50';
    const glowShadow = isRose
      ? 'hover:shadow-[0_0_25px_rgba(251,113,133,0.15)]'
      : 'hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]';
    const dotColor = isRose ? 'bg-rose-400' : 'bg-sky-400';
    const dotGlow = isRose
      ? 'shadow-[0_0_8px_rgba(251,113,133,0.8)]'
      : 'shadow-[0_0_8px_rgba(56,189,248,0.8)]';

    // Extract year for futuristic watermark (e.g., '26, '23, '20)
    const yearMatch = item.period.match(/\b(20\d{2})\b/);
    const watermarkYear = yearMatch ? `'${yearMatch[1].slice(2)}` : '';

    return (
      <div
        className={`relative p-5 sm:p-6 rounded-2xl bg-[#090E17]/85 border border-white/10 ${borderHover} transition-all duration-300 shadow-lg backdrop-blur-md ${glowShadow} overflow-hidden group`}
      >
        {/* Subtle Watermark Year in Background */}
        {watermarkYear && (
          <span className="absolute top-2 right-4 font-mono text-4xl sm:text-5xl font-black text-white/[0.03] group-hover:text-white/[0.07] transition-colors pointer-events-none select-none">
            {watermarkYear}
          </span>
        )}

        {/* Top Meta Line: Period & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 relative z-10">
          <div
            className={`font-mono font-semibold text-xs flex items-center gap-1.5 ${
              isRose ? 'text-rose-400' : 'text-sky-400'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{item.period}</span>
          </div>

          {item.badge && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
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

        {/* Title & Organization Header */}
        <div className="relative z-10 mb-2">
          <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors">
            {item.title}
          </h4>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-zinc-300 font-medium">
            <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
              {item.type === 'experience' ? (
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

        {/* 1-Line Punchy Overview */}
        <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed mb-3 relative z-10">
          "{item.description}"
        </p>

        {/* Core Skills Chips (Top 5) */}
        <div className="flex flex-wrap gap-1 mb-2 relative z-10">
          {item.skills.slice(0, 5).map((s, si) => (
            <span
              key={si}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 font-mono text-[10px] border border-white/5"
            >
              {s}
            </span>
          ))}
          {item.skills.length > 5 && !isExpanded && (
            <span className="px-1.5 py-0.5 text-[10px] text-zinc-400 font-mono">
              +{item.skills.length - 5}
            </span>
          )}
        </div>

        {/* Expandable Details Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pt-3 border-t border-white/5 space-y-3 relative z-10"
            >
              {/* Detailed Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Key Deliverables & Scope:
                  </div>
                  <ul className="space-y-1.5">
                    {item.highlights.map((h, hi) => (
                      <li key={hi} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${dotGlow} flex-shrink-0 mt-1.5`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Remaining Skills when expanded */}
              {item.skills.length > 5 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                    All Domain Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.skills.map((s, si) => (
                      <span
                        key={si}
                        className="px-2 py-0.5 rounded-md bg-white/[0.06] text-zinc-200 font-mono text-[10px] border border-white/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Project Action Button */}
              {item.relatedProjectId && onSelectProjectById && (
                <div className="pt-1">
                  <button
                    onClick={() => onSelectProjectById(item.relatedProjectId!)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${
                      isRose
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
          )}
        </AnimatePresence>

        {/* Quick Expand/Collapse Button */}
        {item.highlights && item.highlights.length > 0 && (
          <button
            onClick={onToggle}
            className={`w-full mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono font-medium ${
              isRose ? 'text-rose-400 hover:text-rose-300' : 'text-sky-400 hover:text-sky-300'
            } transition-colors cursor-pointer relative z-10`}
          >
            <span>
              {isExpanded ? 'Hide Details' : `View ${item.highlights.length} Deliverables & Scope`}
            </span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    );
  };

  // Reusable Track with Connected Vertical Stem & Pulsing Nodes
  const renderTrack = (items: JourneyItem[], accentColor: 'rose' | 'sky') => {
    const isRose = accentColor === 'rose';

    return (
      <div className="relative pl-7 sm:pl-9">
        {/* Continuous Glowing Stem */}
        <div
          className={`absolute left-2.5 sm:left-3 top-3 bottom-3 w-[2px] ${
            isRose
              ? 'bg-gradient-to-b from-rose-500 via-rose-400 to-rose-600/40 shadow-[0_0_10px_rgba(251,113,133,0.5)]'
              : 'bg-gradient-to-b from-sky-500 via-sky-400 to-sky-600/40 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
          }`}
        />

        <div className="space-y-6">
          {items.map((item) => {
            const isExpanded = !!expandedCards[item.id];

            return (
              <div key={item.id} className="relative group">
                {/* Concentric Node Ring */}
                <div className="absolute -left-7 sm:-left-9 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      isRose
                        ? 'border-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.85)]'
                        : 'border-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.85)]'
                    } bg-[#07090E] flex items-center justify-center`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${isRose ? 'bg-rose-400' : 'bg-sky-400'} animate-pulse`}
                    />
                  </div>
                </div>

                {/* Horizontal Connector Tick */}
                <div
                  className={`absolute -left-4 sm:-left-5 top-6 w-4 sm:w-5 border-t border-dashed ${
                    isRose ? 'border-rose-400/50' : 'border-sky-400/50'
                  }`}
                />

                {renderCompactCard(item, accentColor, isExpanded, () => toggleCard(item.id))}
              </div>
            );
          })}
        </div>
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
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3 shadow-md">
          <Compass className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          <span>Professional & Academic Trajectory</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-sky-400 to-emerald-400">Journey</span>
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2">
          Compact dual-stream trajectory: industry internships running parallel to academic milestones.
        </p>

        {/* View Switcher Tabs & Quick Expand All Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
          <button
            onClick={() => setActiveTab('parallel')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
              activeTab === 'parallel'
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Dual Overview (6)</span>
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
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
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
              activeTab === 'education'
                ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/25 scale-105'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education (3)</span>
          </button>

          {/* Quick Expand All Toggle */}
          <button
            onClick={toggleAllExpanded}
            className="ml-0 sm:ml-2 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900/70 hover:bg-zinc-800 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            title={allExpanded ? 'Collapse All Details' : 'Expand All Details'}
          >
            {allExpanded ? (
              <Minimize2 className="w-3 h-3 text-rose-400" />
            ) : (
              <Maximize2 className="w-3 h-3 text-sky-400" />
            )}
            <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>
      </motion.div>

      {/* Main Track Display (Dramatically Reduced Height with Dual Columns on Desktop) */}
      <AnimatePresence mode="wait">
        {activeTab === 'parallel' && (
          <motion.div
            key="parallel-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          >
            {/* Left Column: Experience Rail */}
            <div>
              <div className="flex items-center gap-2.5 pb-3 mb-6 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-sm">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-wider uppercase font-mono">
                    EXPERIENCE
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Industry internships & analytics deployments
                  </p>
                </div>
              </div>
              {renderTrack(experienceItems, 'rose')}
            </div>

            {/* Right Column: Education Rail */}
            <div>
              <div className="flex items-center gap-2.5 pb-3 mb-6 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-wider uppercase font-mono">
                    EDUCATION
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Academic degrees & foundational STEM
                  </p>
                </div>
              </div>
              {renderTrack(educationItems, 'sky')}
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
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2.5 pb-3 mb-6 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-wider uppercase font-mono">
                  EXPERIENCE
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Industry internships & analytics deployments
                </p>
              </div>
            </div>
            {renderTrack(experienceItems, 'rose')}
          </motion.div>
        )}

        {activeTab === 'education' && (
          <motion.div
            key="education-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2.5 pb-3 mb-6 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-sm">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-wider uppercase font-mono">
                  EDUCATION
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Academic degrees & foundational STEM
                </p>
              </div>
            </div>
            {renderTrack(educationItems, 'sky')}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
