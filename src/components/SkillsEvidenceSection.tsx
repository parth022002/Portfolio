import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, ArrowRight, Sparkles, Search, ExternalLink, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA, Project, Certificate } from '../data/portfolioData';

interface SkillsEvidenceSectionProps {
  onSelectProjectById: (id: string) => void;
}

export const SkillsEvidenceSection: React.FC<SkillsEvidenceSectionProps> = ({
  onSelectProjectById
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string>("Business Analysis");
  const [activeCategory, setActiveCategory] = useState<string>("Top 25 Core");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);

  // Normalized query helper
  const cleanStr = (s: string) => s.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();

  // Find linked projects for the selected skill
  const linkedProjects: Project[] = useMemo(() => {
    const q = cleanStr(selectedSkill);
    const matched = new Set<string>();

    // 1. Check in skillsConstellation
    PORTFOLIO_DATA.skillsConstellation?.forEach(cat => {
      const found = cat.skills.find(item => cleanStr(item.name) === q);
      if (found) {
        found.projectIds.forEach(id => matched.add(id));
      }
    });

    // 2. Check project relatedSkills and techStack
    PORTFOLIO_DATA.projects.forEach(p => {
      const inRelated = p.relatedSkills.some(rs => {
        const c = cleanStr(rs);
        return c.includes(q) || q.includes(c);
      });
      const inTech = p.techStack.some(ts => {
        const c = cleanStr(ts);
        return c.includes(q) || q.includes(c);
      });
      if (inRelated || inTech) {
        matched.add(p.id);
      }
    });

    return PORTFOLIO_DATA.projects.filter(p => matched.has(p.id));
  }, [selectedSkill]);

  // Find linked certificates for the selected skill
  const linkedCertificates: Certificate[] = useMemo(() => {
    const q = cleanStr(selectedSkill);
    return PORTFOLIO_DATA.certificates.filter(c => {
      const inSkills = c.skills.some(s => {
        const cs = cleanStr(s);
        return cs.includes(q) || q.includes(cs);
      });
      const inTitle = cleanStr(c.title).includes(q) || q.includes(cleanStr(c.title));
      const inDesc = c.description ? cleanStr(c.description).includes(q) : false;
      return inSkills || inTitle || inDesc;
    });
  }, [selectedSkill]);

  // Find ranked info if available
  const rankedInfo = useMemo(() => {
    return PORTFOLIO_DATA.rankedSkills?.find(
      s => cleanStr(s.name) === cleanStr(selectedSkill)
    );
  }, [selectedSkill]);

  // Categories list with concise, punchy labels
  const categories = [
    { id: "Top 25 Core", label: "⭐ Top 25 Core" },
    { id: "Business Analysis & Product Strategy", label: "Strategy & Product" },
    { id: "Data Analytics & Business Intelligence", label: "Data Analytics & BI" },
    { id: "AI, ML & Engineering", label: "AI & Machine Learning" },
    { id: "Full-Stack Web & Software Engineering", label: "Full-Stack & Web" },
    { id: "Databases, Cloud & DevOps", label: "Cloud & Databases" },
    { id: "Operations & Supply Chain", label: "Operations & Supply Chain" },
  ];

  // Filter skills based on category and search query
  const displayedSkills = useMemo(() => {
    const all = PORTFOLIO_DATA.rankedSkills || [];
    
    // If search query is present, search across all 100 skills
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return all.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.category.toLowerCase().includes(q) ||
        String(s.rank) === q
      );
    }

    // Filter by category
    if (activeCategory === "Top 25 Core") {
      return showAll ? all : all.slice(0, 25);
    }

    return all.filter(s => s.category === activeCategory);
  }, [activeCategory, searchQuery, showAll]);

  return (
    <section id="evidence" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <span id="skills" className="absolute -top-20 pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
          <Award className="w-3.5 h-3.5 text-sky-400" />
          <span>Verifiable Competency Graph (100 Skills)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Skills Grounded in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Concrete Evidence</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          Never rely on arbitrary self-rated percentage bars. Select any capability below to inspect the verified production codebases and 49+ credentials that substantiate it.
        </p>
      </motion.div>

      {/* Unified Search & Wrapped Category Bar (Zero horizontal scrollbars, zero cutoffs!) */}
      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        {/* Centered Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any of 100 skills (e.g. SQL, Python, Agile, Next.js)..."
            className="w-full pl-11 pr-10 py-2.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500/60 shadow-lg shadow-black/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400 hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Pills (Cleanly wrapped on all screen sizes, no cut-off!) */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id && !searchQuery;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Skills Cloud, Right Evidence Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Clean, Spacious Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-5"
        >
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/5 text-xs text-zinc-400">
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-zinc-300">
                {searchQuery ? `Search Results (${displayedSkills.length})` : activeCategory}
              </span>
              <span className="text-[11px] text-zinc-500">Click any skill to inspect evidence</span>
            </div>

            {/* Clean Flex-Wrap Chips Grid */}
            <div className="flex flex-wrap gap-2.5">
              {displayedSkills.map((s) => {
                const isSelected = cleanStr(selectedSkill) === cleanStr(s.name);
                return (
                  <motion.button
                    key={s.rank}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSkill(s.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-md shadow-sky-500/15 scale-105'
                        : 'bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-300 hover:text-white border-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                      s.rank <= 10
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : s.rank <= 25
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-white/5 text-zinc-400'
                    }`}>
                      #{s.rank}
                    </span>
                    <span>{s.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Empty Search State */}
            {displayedSkills.length === 0 && (
              <div className="py-12 text-center text-xs text-zinc-500">
                No capabilities found matching "{searchQuery}".
              </div>
            )}

            {/* Show More / Show Less Toggle */}
            {activeCategory === "Top 25 Core" && !searchQuery && (
              <div className="pt-6 mt-4 border-t border-white/5 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer shadow-md"
                >
                  <span>{showAll ? "Show Top 25 Only" : "Show All 100 Ranked Capabilities"}</span>
                  {showAll ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column (5 cols): The Sleek Evidence Inspector */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 sticky top-24"
        >
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0C1220] to-[#090D17] border border-sky-500/30 shadow-2xl space-y-6 backdrop-blur-md">
            {/* Inspector Header */}
            <div className="pb-4 border-b border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest font-semibold">
                  Evidence Inspector
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {selectedSkill}
              </h3>

              {rankedInfo && (
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950/80 text-sky-300 border border-sky-500/30">
                    Rank #{rankedInfo.rank} of 100
                  </span>
                  <span className="text-xs text-zinc-400">
                    {rankedInfo.category}
                  </span>
                </div>
              )}
            </div>

            {/* Real-World Project Deployments */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  Production Deployments
                </span>
                <span className="text-sky-400 text-[11px]">
                  {linkedProjects.length} {linkedProjects.length === 1 ? 'project' : 'projects'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill + "-proj"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  {linkedProjects.length > 0 ? (
                    linkedProjects.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl bg-zinc-900/70 border border-white/5 hover:border-sky-500/30 transition-all flex items-start justify-between gap-3 group"
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                            {p.tagline}
                          </p>
                        </div>
                        <button
                          onClick={() => onSelectProjectById(p.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-sky-500 text-zinc-400 hover:text-white text-[11px] font-semibold transition-all flex items-center gap-1 flex-shrink-0 cursor-pointer"
                          title="View Project Details"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-3.5 rounded-xl bg-zinc-900/30 text-xs text-zinc-400 italic border border-white/5">
                      Implemented across core engineering repositories, backend APIs, and product architectures.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Verified Credentials Backing */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  Verified Credentials
                </span>
                <span className="text-emerald-400 text-[11px]">
                  {linkedCertificates.length} {linkedCertificates.length === 1 ? 'credential' : 'credentials'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill + "-certs"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  {linkedCertificates.length > 0 ? (
                    linkedCertificates.slice(0, 2).map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-xl bg-zinc-900/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center gap-3"
                      >
                        <div className="w-12 h-9 rounded-md overflow-hidden bg-zinc-950 border border-white/10 flex-shrink-0">
                          <img
                            src={c.img}
                            alt={c.title}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/hero.png';
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-mono text-emerald-400 font-semibold truncate">
                            {c.issuer}
                          </div>
                          <div className="text-xs font-bold text-white truncate">
                            {c.title}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">
                            {c.date}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3.5 rounded-xl bg-zinc-900/30 text-xs text-zinc-400 italic border border-white/5 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Substantiated through accredited university engineering coursework and continuous technical delivery.</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {linkedCertificates.length > 2 && (
                <div className="pt-1">
                  <a
                    href="#certificates"
                    className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 font-medium transition-colors"
                  >
                    <span>View all {linkedCertificates.length} credentials in Certificates section</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Audited Technical Rigor Guarantee */}
            <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-zinc-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Skill competencies are audited against active GitHub commits, automated test coverage, and evaluated project deliverables.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
