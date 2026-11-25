import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink, X, CheckCircle2, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { PORTFOLIO_DATA, Certificate } from '../data/portfolioData';

export const CertificatesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Body scroll lock & Escape listener for Certificate Lightbox
  useEffect(() => {
    if (!selectedCert) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  const categories = ['All', 'AI & GenAI', 'Data Analytics', 'Software Engineering', 'Professional'];

  const filteredCerts = activeCategory === 'All'
    ? PORTFOLIO_DATA.certificates
    : PORTFOLIO_DATA.certificates.filter(c => c.category === activeCategory);

  const initialCount = 3;
  const displayedCerts = showAll ? filteredCerts : filteredCerts.slice(0, initialCount);
  const hasMore = filteredCerts.length > initialCount;

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Credentials (49+)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Certifications</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Credentials awarded by Google, Amazon, Microsoft, LinkedIn, Tata, HackerRank, Oracle, NVIDIA, and McKinsey validating practical capabilities in Generative AI, Data Analytics, Cloud Infrastructure, and Product Management.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid of Certificates with Staggered Scroll Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCerts.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setSelectedCert(cert)}
            className="group cursor-pointer rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-white/5 hover:border-sky-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-sky-500/10"
          >
            <div className="relative aspect-[16/11] bg-zinc-950 overflow-hidden">
              <img
                src={cert.img}
                alt={cert.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/hero.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20 flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Issuer</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
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
          </motion.div>
        ))}
      </div>

      {/* Centered See More / Show Less Button */}
      {hasMore && (
        <div className="flex justify-center mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <button
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setShowAll(true);
                }
              }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-500 hover:from-emerald-400 hover:via-teal-500 hover:to-sky-400 text-white font-bold text-sm transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer border border-emerald-400/40 group"
            >
              <span>{showAll ? 'Show Less (Top 3 Certificates)' : `See More Certificates (${filteredCerts.length - initialCount} Remaining)`}</span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </motion.div>
        </div>
      )}

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-3xl bg-[#090D16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-3.5 sm:p-5 border-b border-white/10 flex items-start justify-between bg-zinc-950 gap-4">
              <div>
                <div className="text-xs text-sky-400 font-mono font-semibold">{selectedCert.issuer}</div>
                <h3 id="cert-modal-title" className="text-lg font-bold text-white">{selectedCert.title}</h3>
                {selectedCert.description && (
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">{selectedCert.description}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate lightbox"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex-shrink-0"
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
