import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Send, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Tag, 
  ShieldCheck, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const targetEmail = PORTFOLIO_DATA.personal.email || 'parth022002@gmail.com';
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY || '0a76e059-cb46-45c7-adfc-de9375e322ea';

    try {
      let response: Response;

      // Check if user has configured Web3Forms access key in .env
      if (web3formsKey) {
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `New Portfolio Inquiry from ${formData.name}`,
            message: formData.message,
            from_name: formData.name
          })
        });
      } else {
        // Industry-standard FormSubmit AJAX endpoint (zero-signup direct forwarding)
        response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `Inquiry from ${formData.name}`,
            message: formData.message,
            _subject: `Portfolio Inquiry: ${formData.subject || formData.name}`,
            _template: 'table',
            _captcha: 'false'
          })
        });
      }

      const result = await response.json().catch(() => ({}));

      if (response.ok || result.success === 'true' || result.success === true) {
        setFormSubmitted(true);
      } else {
        throw new Error(result.message || 'Failed to dispatch form.');
      }
    } catch (err: any) {
      console.warn('Form direct transmission fallback triggered:', err);
      // If network is blocked (e.g. ad-blocker or CORS), fallback cleanly to mailto
      setErrorMessage('Direct transmission was blocked by network or ad-blocker. You can dispatch directly via your email client.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
    formData.subject || `Portfolio Inquiry from ${formData.name}`
  )}&body=${encodeURIComponent(
    `Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage Details:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-sky-600/10 via-indigo-600/10 to-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Split Grid: Hero-Style Left Side + Interactive Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-stretch relative z-10">
        {/* Left Side: Hero-Style Narrative & Profile Statement (Equal Height, No Card Container) */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-between h-full text-left py-1"
        >
          {/* Top Block: Status Pill, Headline & Narrative */}
          <div className="space-y-5">
            {/* Animated Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-semibold text-zinc-300 shadow-inner backdrop-blur-md"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              <span className="font-mono text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Get in Touch • Open to Collaboration
              </span>
            </motion.div>

            {/* Hero-Grade Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
            >
              Let's Connect &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Build The Future
              </span>.
            </motion.h2>

            {/* Expanded Narrative Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-xl"
            >
              Whether you are exploring high-impact AI/ML engineering, full-stack system architecture, quantitative product intelligence, or technical leadership roles—I am always excited to discuss transformative ideas and high-scale solutions.
            </motion.p>
          </div>

          {/* Middle Block: Floating Capability Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3 my-6 lg:my-0"
          >
            <div className="p-4 rounded-2xl bg-[#0D1322]/60 hover:bg-[#121A30]/80 border border-white/10 hover:border-sky-500/30 transition-all duration-300 flex items-start gap-3.5 backdrop-blur-md shadow-lg group">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white text-sm block">Swift Response Window</span>
                <span className="text-zinc-400 text-xs leading-relaxed mt-0.5 block">
                  Direct inquiries typically receive a detailed reply within 24 hours.
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1322]/60 hover:bg-[#121A30]/80 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex items-start gap-3.5 backdrop-blur-md shadow-lg group">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white text-sm block">Location & Flexibility</span>
                <span className="text-zinc-400 text-xs leading-relaxed mt-0.5 block">
                  Based in Bengaluru, India • Open to onsite, hybrid, and remote worldwide roles.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Block: Hero-Matching Social Profile Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-2 flex flex-wrap items-center gap-3"
          >
            <span className="text-xs font-mono text-zinc-400 font-semibold tracking-wider uppercase">
              CONNECT ACROSS PLATFORMS:
            </span>

            {/* GitHub Button */}
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#121620]/90 hover:bg-[#1A2234] border border-white/10 hover:border-white/30 text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group backdrop-blur-md cursor-pointer"
              title="GitHub Profile"
            >
              <img
                src="/icons/github.png"
                alt="GitHub"
                className="w-4 h-4 object-contain rounded-full shadow-sm"
              />
              <span className="tracking-tight text-white font-bold">GitHub</span>
            </a>

            {/* LinkedIn Button */}
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#121620]/90 hover:bg-[#1A2234] border border-white/10 hover:border-sky-500/40 text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group backdrop-blur-md cursor-pointer"
              title="LinkedIn Profile"
            >
              <img
                src="/icons/linkedin.png"
                alt="LinkedIn"
                className="w-4 h-4 object-contain rounded-[3px] shadow-sm"
              />
              <span className="tracking-tight text-white font-bold">LinkedIn</span>
            </a>

            {/* Linktree Button */}
            <a
              href={PORTFOLIO_DATA.personal.linktree}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#121620]/90 hover:bg-[#1A2234] border border-white/10 hover:border-emerald-500/40 text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group backdrop-blur-md cursor-pointer"
              title="Linktree Profile"
            >
              <img
                src="/icons/linktree.png"
                alt="Linktree"
                className="w-4 h-4 object-contain rounded-[4px] shadow-sm"
              />
              <span className="tracking-tight text-white font-bold">Linktree</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Elevated Interactive Message Dispatch Card (Equal Height) */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 h-full flex flex-col"
        >
          <div className="h-full flex flex-col justify-between p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0B1120]/95 via-[#080D18]/95 to-[#05080F]/95 border border-white/10 hover:border-sky-500/30 transition-all duration-300 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            {/* Top decorative gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 opacity-80" />

            {formSubmitted ? (
              <div className="h-full flex flex-col justify-center items-center py-12 text-center space-y-5 animate-fade-in my-auto">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-xl shadow-emerald-500/25">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>! Your message regarding <span className="text-sky-400 font-medium">"{formData.subject || 'Direct Collaboration'}"</span> has been transmitted directly to Parth's email.
                </p>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-zinc-400 max-w-sm mx-auto font-mono">
                  A response will be delivered to <span className="text-sky-400 font-semibold">{formData.email}</span> within 24 hours.
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 hover:text-white font-medium transition-all border border-white/10"
                  >
                    Open Mail App Backup
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-4 sm:space-y-5 text-xs">
                {/* Form Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>DIRECT MESSAGE DISPATCH</span>
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Encrypted & Direct</span>
                  </span>
                </div>

                {/* Error Banner if any */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <span>{errorMessage}</span>
                      <a 
                        href={mailtoUrl}
                        className="block text-sky-400 hover:underline font-semibold"
                      >
                        Click here to send directly via mail client →
                      </a>
                    </div>
                  </div>
                )}

                {/* Form Inputs Container with flexible vertical distribution */}
                <div className="space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-zinc-300 mb-1.5 font-medium flex items-center gap-1.5">
                        <User className="w-3 h-3 text-sky-400" />
                        <span>Your Name</span>
                        <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all text-xs disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1.5 font-medium flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-sky-400" />
                        <span>Your Email</span>
                        <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all text-xs disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1.5 font-medium flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-sky-400" />
                      <span>Subject / Discussion Topic</span>
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI Engineering Collaboration, Full-Stack Project, or Strategic Advisory"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all text-xs disabled:opacity-50"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-zinc-300 font-medium flex items-center gap-1.5">
                        <MessageSquare className="w-3 h-3 text-sky-400" />
                        <span>Message / Project Details</span>
                        <span className="text-sky-400">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {formData.message.length}/1000
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      required
                      maxLength={1000}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your team, tech stack, roadmap challenge, or the specific initiative you would like to collaborate on..."
                      className="w-full flex-1 min-h-[125px] px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all text-xs leading-relaxed resize-none disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-sky-500/25 text-xs sm:text-sm cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Direct Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
