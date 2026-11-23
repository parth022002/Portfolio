import React, { useState } from 'react';
import { Award, CheckCircle, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface SkillsEvidenceSectionProps {
  mode: 'business' | 'tech';
  onSelectProjectById: (id: string) => void;
}

export const SkillsEvidenceSection: React.FC<SkillsEvidenceSectionProps> = ({
  mode,
  onSelectProjectById
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string>("TensorFlow");

  // Find which category and projects link to this skill
  let linkedProjects: Project[] = [];
  PORTFOLIO_DATA.skillsConstellation.forEach(cat => {
    const s = cat.skills.find(item => item.name === selectedSkill);
    if (s) {
      linkedProjects = PORTFOLIO_DATA.projects.filter(p => s.projectIds.includes(p.id));
    }
  });

  return (
    <section id="evidence" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
          <Award className="w-3.5 h-3.5 text-sky-400" />
          <span>Verifiable Competency Graph</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Skills Grounded in <span className={mode === 'business' ? 'text-sky-400' : 'text-emerald-400 font-mono'}>Concrete Evidence</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          Never rely on arbitrary self-rated percentage bars. Select any capability below to inspect the exact production projects and verified credentials that substantiate it.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Columns: Skills Constellation */}
        <div className="lg:col-span-7 space-y-6">
          {PORTFOLIO_DATA.skillsConstellation.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3.5 flex items-center justify-between">
                <span>{cat.categoryName}</span>
                <span className="text-[11px] text-zinc-500 font-normal">Click to cross-reference</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => {
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => setSelectedSkill(skill.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 border ${
                        isSelected
                          ? mode === 'business'
                            ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                            : 'bg-emerald-500 text-black border-emerald-400 font-mono font-bold shadow-md shadow-emerald-500/20'
                          : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border-white/5'
                      }`}
                    >
                      <span>{skill.name}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                        isSelected ? 'bg-black/20 text-white' : 'bg-white/5 text-zinc-400'
                      }`}>
                        {skill.proofCount} proofs
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Evidence Inspector Panel */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-6 rounded-2xl bg-[#0B101D] border border-sky-500/30 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase">Evidence Inspector</span>
                <h4 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{selectedSkill}</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-white/5 text-xs text-zinc-300 font-mono border border-white/10">
                Verified
              </span>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                Direct Project Implementations:
              </h5>

              {linkedProjects.length > 0 ? (
                linkedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-sky-500/30 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
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
                        title="View Case Study"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-lg bg-zinc-900/40 text-xs text-zinc-400 italic">
                  Demonstrated across core architecture repositories and verified certifications.
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-zinc-300 space-y-1">
              <div className="font-semibold text-sky-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Audited Technical Rigor</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Skill competencies are continuously cross-checked with active GitHub commits, automated test coverage, and benchmark evaluation scores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
