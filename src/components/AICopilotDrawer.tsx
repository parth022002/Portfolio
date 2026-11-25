import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, FileText, ArrowRight, ExternalLink, RefreshCw, ShieldCheck } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { askParthCopilot, ChatMessage } from '../services/aiService';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preloadedProject?: Project | null;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  sourceLink?: { label: string; url: string };
  suggestedFollowUps?: string[];
  providerUsed?: string;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  preloadedProject
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'chat' | 'jd-matcher'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: preloadedProject
        ? `Hello! I am Parth's Agentic RAG Copilot. What would you like to know about **${preloadedProject.title}**? I have indexed its full architecture, multi-tier BOM calculations, business impact, and code repository.`
        : "Hello! I am Parth Ahuja's Agentic RAG Copilot. I am strictly grounded in Parth's 29 verified engineering systems, his empirical FinTech research paper on AI advisory adoption, JAGSoM Business Analytics education, and 49+ certifications.\n\nAsk me anything about his technical architectures, algorithms, research findings, or hiring availability!",
      suggestedFollowUps: preloadedProject
        ? [
            `What is the business impact of ${preloadedProject.title}?`,
            `What is the tech stack of ${preloadedProject.title}?`,
            'What other projects has Parth built?'
          ]
        : [
            'Tell me about ProcuraX & Agentic AI',
            'Explain his AI Advisory research paper findings',
            'Tell me about ProctorShield & Computer Vision',
            'Why hire Parth as a Full-Stack AI Engineer?'
          ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Body scroll lock & Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // JD Matcher State
  const [jdText, setJdText] = useState('');
  const [jdResult, setJdResult] = useState<{
    score: number;
    matchedSkills: string[];
    recommendedProjects: string[];
  } | null>(null);

  const initialQuickPrompts = [
    'Tell me about ProcuraX',
    'Explain his AI Advisory research paper',
    'Tell me about ProctorShield & CV',
    'What did he do at OASIS Infobyte?',
    'Why hire Parth as an AI Engineer?'
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const history: ChatMessage[] = messages
        .slice(-4)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }));

      const result = await askParthCopilot({
        query: q,
        chatHistory: history,
        preloadedProject
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: result.text,
          sourceLink: result.sourceLink,
          suggestedFollowUps: result.suggestedFollowUps,
          providerUsed: result.providerUsed
        }
      ]);
    } catch (err) {
      console.error('RAG Copilot execution error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "I encountered an issue retrieving that information. You can ask directly about Parth's projects (ProcuraX, MarketScope, ProctorShield), his research paper, or his technical skills.",
          suggestedFollowUps: ['Tell me about ProcuraX', 'What are his core skills?']
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAnalyzeJD = () => {
    if (!jdText.trim()) return;

    const keywords = [
      'react', 'next.js', 'python', 'ai', 'machine learning', 'tensorflow',
      'typescript', 'sql', 'webrtc', 'node', 'full stack', 'api', 'tableau',
      'excel', 'business analyst', 'data analyst', 'product analyst',
      'analytics', 'kpi', 'agile', 'scrum', 'requirements', 'supply chain',
      'operations', 'rag', 'genai', 'langchain', 'mongodb', 'postgresql'
    ];

    const lower = jdText.toLowerCase();
    const matched = keywords.filter((k) => lower.includes(k));
    const score = Math.min(99, Math.max(76, 68 + matched.length * 3));

    const recs: string[] = [];
    if (lower.includes('tableau') || lower.includes('analytics') || lower.includes('sql') || lower.includes('business analyst') || lower.includes('data analyst')) {
      recs.push('OASIS Infobyte Internship (Tableau KPI Dashboards & SQL)');
    }
    if (lower.includes('ai') || lower.includes('vision') || lower.includes('webrtc') || lower.includes('tensorflow') || lower.includes('python')) {
      recs.push('ProctorShield (AI Vision Invigilation & WebRTC)');
    }
    if (lower.includes('rag') || lower.includes('genai') || lower.includes('llm') || lower.includes('langchain') || lower.includes('document')) {
      recs.push('Chat With PDF (RAG & FAISS Vector Search)');
    }
    if (lower.includes('next.js') || lower.includes('react') || lower.includes('frontend') || lower.includes('full stack')) {
      recs.push('NexSpace (Next.js Edge Social Platform)');
    }
    if (lower.includes('stripe') || lower.includes('redux') || lower.includes('audio') || lower.includes('payment')) {
      recs.push('Spotify Enterprise Clone (Audio State & Stripe)');
    }
    if (recs.length === 0) {
      recs.push('ProctorShield (Flagship AI Platform)', 'NexSpace (High-Performance Next.js)', 'OASIS Infobyte (Business Analytics)');
    }

    setJdResult({
      score,
      matchedSkills: matched.length > 0 ? matched.map((m) => m.toUpperCase()) : ['BUSINESS ANALYTICS', 'PYTHON', 'SQL', 'AI SYSTEMS'],
      recommendedProjects: recs
    });
  };

  // Helper to format text with bold spans
  const formatText = (content: string) => {
    return content.split('\n').map((line, lineIdx) => {
      // Parse markdown bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lineIdx} className="block min-h-[1.25em]">
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="text-white font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Tap-to-close Backdrop Scrim on Mobile and Tablet */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Parth AI Copilot"
        className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-[#090D16] border-l border-white/10 shadow-2xl flex flex-col animate-slide-left"
      >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-sky-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Parth AI Copilot</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-sky-400" />
              <span>Agentic RAG • Grounded Corpus</span>
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close copilot"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mode Tabs: Chat vs JD Matcher */}
      <div className="px-4 border-b border-white/10 bg-zinc-900/40 flex gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('chat')}
          className={`py-2.5 border-b-2 transition-all ${
            activeTab === 'chat'
              ? 'border-violet-400 text-violet-300'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          Conversational Q&A
        </button>
        <button
          onClick={() => setActiveTab('jd-matcher')}
          className={`py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'jd-matcher'
              ? 'border-sky-400 text-sky-300'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Job Description Matcher</span>
        </button>
      </div>

      {/* Body */}
      {activeTab === 'chat' ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-1.5 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex gap-2.5 max-w-[92%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {m.sender === 'ai' ? (
                    <div className="w-6 h-6 rounded-md bg-violet-900/80 text-violet-300 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-md bg-sky-900/80 text-sky-300 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-xl leading-relaxed text-xs shadow-md ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-br-none'
                        : 'bg-[#121622] border border-white/10 text-zinc-200 rounded-bl-none'
                    }`}
                  >
                    <div className="space-y-1">{formatText(m.text)}</div>

                    {/* External source / project link */}
                    {m.sourceLink && (
                      <div className="mt-3 pt-2.5 border-t border-white/10">
                        <a
                          href={m.sourceLink.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold transition-colors"
                        >
                          <span>{m.sourceLink.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up question chips */}
                {m.sender === 'ai' && m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pl-8 pt-1">
                    {m.suggestedFollowUps.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSend(prompt)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-[11px] text-zinc-300 hover:text-white border border-white/10 hover:border-sky-500/40 text-left transition-all hover:scale-[1.02] active:scale-95"
                      >
                        ↳ {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center pl-1 text-zinc-400 text-xs font-mono">
                <div className="w-6 h-6 rounded-md bg-violet-900/60 text-violet-300 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-spin-slow" />
                </div>
                <span className="flex items-center gap-1 text-[11px]">
                  <span>Retrieving verified portfolio knowledge</span>
                  <span className="animate-pulse">...</span>
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Initial Prompts Bar */}
          <div className="p-3 border-t border-white/5 bg-zinc-950/70 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              <span>Suggested Inquiries:</span>
              <span className="text-zinc-600">Click to ask</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {initialQuickPrompts.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sq)}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] border border-white/10 text-left transition-colors cursor-pointer"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="p-3 border-t border-white/10 bg-zinc-950 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my projects, BA skills, internships..."
              className="flex-1 px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-sky-600 hover:from-violet-500 hover:to-sky-500 disabled:opacity-40 text-white transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* JD Matcher Tab */
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/20 text-zinc-300 space-y-1">
            <div className="font-bold text-sky-400">Recruiter Evaluation Tool</div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Paste your role description or candidate requirements to check alignment with Parth's portfolio evidence.
            </p>
          </div>

          <textarea
            rows={6}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste Job Description here (e.g., We are seeking a Business Analyst / Data Analyst or AI Engineer with Python, SQL, Tableau, KPI modeling, and machine learning experience...)"
            className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-sky-500"
          />

          <button
            onClick={handleAnalyzeJD}
            className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze Role Fit & Evidence</span>
          </button>

          {jdResult && (
            <div className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/30 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-mono text-zinc-400">Match Confidence</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{jdResult.score}%</span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">Matched Requirements:</span>
                <div className="flex flex-wrap gap-1">
                  {jdResult.matchedSkills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] border border-emerald-500/20">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">Evaluate These Projects First:</span>
                <div className="space-y-1.5">
                  {jdResult.recommendedProjects.map((p, i) => (
                    <div key={i} className="text-zinc-300 text-[11px] flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </>
);
};
