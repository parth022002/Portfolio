import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Github, Linkedin, Send, MessageSquare } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', roleType: 'Full-Time AI / Full-Stack Role', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Outreach & Social Identity */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400">
            <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
            <span>Direct Inquiry & Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Exceptional</span>.
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Whether you are discussing a full-time engineering opportunity, technical architecture consulting, or evaluating AI product integrations, I'd welcome a conversation.
          </p>

          {/* Email Quick-Copy Card with Hover Scale */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3 shadow-lg hover:border-sky-500/30 transition-colors"
          >
            <span className="text-xs font-mono uppercase text-zinc-400">Primary Contact Email</span>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm sm:text-base font-mono font-bold text-white truncate">
                {PORTFOLIO_DATA.personal.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-all flex items-center gap-1.5 border border-white/10 hover:scale-105 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Social Links Matrix */}
          <div className="flex flex-wrap gap-3 pt-2">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-2.5 shadow-sm group"
            >
              <img src="/icons/github.png" alt="GitHub" className="w-5 h-5 object-contain group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-2.5 shadow-sm group"
            >
              <img src="/icons/linkedin.png" alt="LinkedIn" className="w-5 h-5 object-contain rounded-[3px] group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={PORTFOLIO_DATA.personal.linktree}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-2.5 shadow-sm group"
            >
              <img src="/icons/linktree.png" alt="Linktree" className="w-5 h-5 object-contain rounded-[4px] group-hover:scale-110 transition-transform" />
              <span>Linktree</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Contact Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-md shadow-2xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you! Your message has been received. Parth will reply within 24 hours at the email provided.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-white font-medium hover:bg-zinc-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1.5 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1.5 font-medium">Your Work Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1.5 font-medium">Opportunity Type</label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option>Full-Time AI / Full-Stack Role</option>
                    <option>Technical Contract / Consulting</option>
                    <option>Collaborative Research / Hackathon</option>
                    <option>General Tech Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1.5 font-medium">Message / Project Context</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, tech stack, or the project challenge you are addressing..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry</span>
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
