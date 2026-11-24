import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ArrowRight, Sparkles, Search, Layers, ListOrdered, ShieldCheck, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA, Project, Certificate } from '../data/portfolioData';

interface SkillsEvidenceSectionProps {
  onSelectProjectById: (id: string) => void;
}

export const SkillsEvidenceSection: React.FC<SkillsEvidenceSectionProps> = ({
  onSelectProjectById
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string>("Business Analysis");
  const [viewMode, setViewMode] = useState<'domains' | 'top100'>('domains');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Find linked projects for the selected skill
  const linkedProjects: Project[] = useMemo(() => {
    const matchedProjectIds = new Set<string>();

    // Check in skillsConstellation
    PORTFOLIO_DATA.skillsConstellation.forEach(cat => {
      const s = cat.skills.find(item => item.name.toLowerCase() === selectedSkill.toLowerCase());
      if (s) {
        s.projectIds.forEach(id => matchedProjectIds.add(id));
      }
    });

    // Also check direct project relatedSkills
    PORTFOLIO_DATA.projects.forEach(p => {
      if (
        p.relatedSkills.some(rs => rs.toLowerCase().includes(selectedSkill.toLowerCase()) || selectedSkill.toLowerCase().includes(rs.toLowerCase())) ||
        p.techStack.some(ts => ts.toLowerCase().includes(selectedSkill.toLowerCase()) || selectedSkill.toLowerCase().includes(ts.toLowerCase()))
      ) {
        matchedProjectIds.add(p.id);
      }
    });

    return PORTFOLIO_DATA.projects.filter(p => matchedProjectIds.has(p.id));
  }, [selectedSkill]);

  // Find linked certificates for the selected skill
  const linkedCertificates: Certificate[] = useMemo(() => {
    const q = selectedSkill.toLowerCase().trim();
    return PORTFOLIO_DATA.certificates.filter(c => {
      const inSkills = c.skills.some(s => s.toLowerCase().includes(q) || q.includes(s.toLowerCase()));
      const inTitle = c.title.toLowerCase().includes(q);
      const inDesc = c.description ? c.description.toLowerCase().includes(q) : false;
      return inSkills || inTitle || inDesc;
    });
  }, [selectedSkill]);

  // Find ranked info if available
  const rankedInfo = useMemo(() => {
    return PORTFOLIO_DATA.rankedSkills?.find(
      s => s.name.toLowerCase() === selectedSkill.toLowerCase()
    );
  }, [selectedSkill]);

  // Categories for 100 skills filter
  const skillCategories = [
    'All',
    'Business Analysis & Product Strategy',
    'Data Analytics & Business Intelligence',
    'AI, ML & Engineering',
    'Full-Stack Web & Software Engineering',
    'Databases, Cloud & DevOps',
    'Operations & Supply Chain'
  ];

  // Filtered 100 skills
  const filteredRankedSkills = useMemo(() => {
    if (!PORTFOLIO_DATA.rankedSkills) return [];
    return PORTFOLIO_DATA.rankedSkills.filter(s => {
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(s.rank).includes(searchQuery.trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="evidence" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Anchor alias to support both #evidence and #skills */}
      <span id="skills" className="absolute -top-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
          <Award className="w-3.5 h-3.5 text-sky-400" />
          <span>Verifiable Competency Graph (100 Ranked Capabilities)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Skills Grounded in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Concrete Evidence</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          Never rely on arbitrary self-rated percentage bars. Select any of Parth's 100 ranked capabilities below to inspect the exact production code repositories and 49+ verified credentials that substantiate it.
        </p>

        {/* View Switcher: Core Domains vs Top 100 Skills */}
        <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900/90 border border-white/10 mt-6 shadow-lg">
          <button
            onClick={() => setViewMode('domains')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'domains'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>6 Core Strategic Domains</span>
          </button>
          <button
            onClick={() => setViewMode('top100')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'top100'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Top 100 Ranked Competencies</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Columns: Skills Constellation or Top 100 Ranked List */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          {viewMode === 'domains' ? (
            /* 6 Core Strategic Domains View */
            <div className="space-y-5">
              {PORTFOLIO_DATA.skillsConstellation.map((cat, catIdx) => (
                <div
                  key={catIdx}
                  className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors"
                >
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3.5 flex items-center justify-between">
                    <span className="text-sky-300/90">{cat.categoryName}</span>
                    <span className="text-[11px] text-zinc-500 font-normal">Click to cross-reference</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => {
                      const isSelected = selectedSkill.toLowerCase() === skill.name.toLowerCase();
                      return (
                        <motion.button
                          key={sIdx}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedSkill(skill.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 border ${
                            isSelected
                              ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/25 scale-105'
                              : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border-white/5'
                          }`}
                        >
                          <span>{skill.name}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                            isSelected ? 'bg-black/30 text-white font-bold' : 'bg-white/5 text-zinc-400'
                          }`}>
                            {skill.proofCount} proofs
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Top 100 Ranked Competencies View */
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm space-y-4">
              {/* Search and Category Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any of 100 skills (e.g., Business Analysis, SQL, Next.js, LLMs)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skillCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-zinc-800/50 text-zinc-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat === 'All' ? 'All (100)' : cat.replace('& Business Intelligence', '& BI').replace('& Product Strategy', '').replace('& Software Engineering', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of 100 Ranked Skills */}
              <div className="max-h-[560px] overflow-y-auto pr-1 space-y-2 scrollbar-thin">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredRankedSkills.map((s) => {
                    const isSelected = selectedSkill.toLowerCase() === s.name.toLowerCase();
                    return (
                      <motion.button
                        key={s.rank}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSkill(s.name)}
                        className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md shadow-emerald-500/10'
                            : 'bg-zinc-950/40 hover:bg-zinc-800/60 border-white/5 text-zinc-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold flex-shrink-0 ${
                            s.rank <= 10
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : s.rank <= 30
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              : 'bg-white/5 text-zinc-400'
                          }`}>
                            #{s.rank}
                          </span>
                          <span className="truncate font-semibold">{s.name}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono flex-shrink-0">
                          {s.category.split(' ')[0]}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {filteredRankedSkills.length === 0 && (
                  <div className="p-8 text-center text-xs text-zinc-500">
                    No skills found matching "{searchQuery}".
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Column: Evidence Inspector Panel with AnimatePresence */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 sticky top-24"
        >
          <div className="p-6 rounded-2xl bg-[#0B101D] border border-sky-500/30 shadow-2xl space-y-5 backdrop-blur-md">
            {/* Inspector Header */}
            <div className="flex items-start justify-between pb-3 border-b border-white/10 gap-3">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider">
                  Competency Evidence Inspector
                </span>
                <h4 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
                  <span>{selectedSkill}</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400 animate-pulse flex-shrink-0" />
                </h4>
                {rankedInfo && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                      Rank #{rankedInfo.rank} of 100
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {rankedInfo.category}
                    </span>
                  </div>
                )}
              </div>
              <span className="px-2.5 py-1 rounded bg-white/5 text-xs text-zinc-300 font-mono border border-white/10 flex-shrink-0">
                Verified
              </span>
            </div>

            {/* Direct Project Implementations */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center justify-between">
                <span>Production Project Deployments</span>
                <span className="text-[11px] text-sky-400 font-normal font-sans">
                  {linkedProjects.length} {linkedProjects.length === 1 ? 'project' : 'projects'}
                </span>
              </h5>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill + "-projects"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin"
                >
                  {linkedProjects.length > 0 ? (
                    linkedProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-sky-500/30 transition-all group hover:bg-zinc-900"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                              {p.tagline}
                            </div>
                          </div>
                          <button
                            onClick={() => onSelectProjectById(p.id)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-sky-500 hover:text-white text-zinc-400 transition-colors flex-shrink-0"
                            title="Read Project Details"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-xl bg-zinc-900/40 text-xs text-zinc-400 italic border border-white/5">
                      Applied across Parth's software engineering repositories, client systems, and analytical frameworks.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Verified Credentials Backing this Skill */}
            <div className="space-y-3 pt-1 border-t border-white/5">
              <h5 className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center justify-between">
                <span>Verified Credentials Backing</span>
                <span className="text-[11px] text-emerald-400 font-normal font-sans">
                  {linkedCertificates.length} {linkedCertificates.length === 1 ? 'credential' : 'credentials'}
                </span>
              </h5>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill + "-certs"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin"
                >
                  {linkedCertificates.length > 0 ? (
                    linkedCertificates.slice(0, 3).map((c) => (
                      <div
                        key={c.id}
                        className="p-2.5 rounded-xl bg-zinc-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center gap-3"
                      >
                        <div className="w-12 h-9 rounded-md overflow-hidden bg-zinc-900 border border-white/10 flex-shrink-0">
                          <img
                            src={c.img}
                            alt={c.title}
                            className="w-full h-full object-cover"
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
                    <div className="p-3 rounded-xl bg-zinc-900/40 text-xs text-zinc-400 italic border border-white/5 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Substantiated by Parth's accredited university coursework and technical certifications.</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {linkedCertificates.length > 3 && (
                <a
                  href="#certificates"
                  className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:underline pt-1"
                >
                  <span>View all {linkedCertificates.length} credentials in Certificates Wall</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Audited Technical Rigor Note */}
            <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-zinc-300 space-y-1">
              <div className="font-semibold text-sky-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
                <span>Audited Technical Rigor</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Skill competencies are continuously cross-checked with active GitHub commits, automated test coverage, and benchmark evaluation scores.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
