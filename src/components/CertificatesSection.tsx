import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, X, Award, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, Certificate } from '../data/portfolioData';

interface CertificatesSectionProps {
  mode: 'business' | 'tech';
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ mode }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories = ['All', 'AI & GenAI', 'Data Analytics', 'Software Engineering', 'Professional'];

  const filteredCerts = activeCategory === 'All'
    ? PORTFOLIO_DATA.certificates
    : PORTFOLIO_DATA.certificates.filter(c => c.category === activeCategory);

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Industry Credentials (16+)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certified <span className={mode === 'business' ? 'text-sky-400' : 'text-emerald-400 font-mono'}>Industry Competence</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Credentials awarded by Microsoft, LinkedIn, Google, Tata, and HackerRank validating practical capabilities in Generative AI, Data Analytics, and Software Architecture.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? mode === 'business'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-emerald-500 text-black font-mono font-bold shadow-md'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group cursor-pointer rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-white/5 hover:border-sky-500/30 overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/11] bg-zinc-950 overflow-hidden">
              <img
                src={cert.img}
                alt={cert.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/hero.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Issuer</span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="text-[11px] font-mono text-sky-400 font-semibold">
                {cert.issuer}
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                {cert.title}
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-zinc-400 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-5 pb-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
              <span>{cert.date}</span>
              <span className="text-sky-400 group-hover:underline flex items-center gap-1">
                <span>Inspect Proof</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#090D16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950">
              <div>
                <div className="text-xs text-sky-400 font-mono font-semibold">{selectedCert.issuer}</div>
                <h3 className="text-lg font-bold text-white">{selectedCert.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex items-center justify-center bg-black/60">
              <img
                src={selectedCert.img}
                alt={selectedCert.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-xl"
              />
            </div>

            <div className="p-4 border-t border-white/10 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 font-medium">Validated Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedCert.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 font-mono text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
