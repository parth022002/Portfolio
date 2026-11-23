import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Linkedin, Send, Sparkles, MessageSquare } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  mode: 'business' | 'tech';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ mode }) => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', roleType: 'Full-Time Engineering', message: '' });

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
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Outreach & Social Identity */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400">
            <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
            <span>Direct Inquiry & Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's Build Something <span className={mode === 'business' ? 'text-sky-400' : 'text-emerald-400 font-mono'}>Exceptional</span>.
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Whether you are discussing a full-time engineering opportunity, technical architecture consulting, or evaluating AI product integrations, I'd welcome a conversation.
          </p>

          {/* Email Quick-Copy Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-400">Primary Contact Email</span>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm sm:text-base font-mono font-bold text-white truncate">
                {PORTFOLIO_DATA.personal.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-all flex items-center gap-1.5 border border-white/10"
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
          </div>

          {/* Social Links Matrix */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/5 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>github.com/parth022002</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/5 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-md">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you! Your message has been logged. Parth will reply within 24 hours at the email provided.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-white font-medium hover:bg-zinc-700"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1.5 font-medium">Opportunity Type</label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white focus:outline-none focus:border-sky-500"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                    mode === 'business'
                      ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black font-mono shadow-emerald-500/25'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
