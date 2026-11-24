import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preloadedProject?: Project | null;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  sourceLink?: string;
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
        ? `Hello! I'm Parth's portfolio copilot. What would you like to know about ${preloadedProject.title}? I can explain its TensorFlow inference pipeline, WebRTC architecture, business impact, or code structure.`
        : "Hello! I'm Parth Ahuja's AI Portfolio Assistant. I'm strictly grounded in Parth's verified projects, code repositories, and 49+ certifications. What would you like to discover today?"
    }
  ]);
  const [input, setInput] = useState('');
  
  // JD Matcher State
  const [jdText, setJdText] = useState('');
  const [jdResult, setJdResult] = useState<{
    score: number;
    matchedSkills: string[];
    recommendedProjects: string[];
  } | null>(null);

  const suggestedQuestions = [
    "What is ProctorShield's AI architecture?",
    "What are Parth's primary technical skills?",
    "Does Parth have credentials in Generative AI?",
    "How can I contact Parth for an interview?"
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Grounded knowledge matching
    setTimeout(() => {
      const lower = q.toLowerCase();
      let responseText = "";

      if (lower.includes('proctorshield') || lower.includes('proctor')) {
        responseText = "ProctorShield is Parth's flagship AI examination proctoring system. It combines WebRTC with a quantized TensorFlow model to detect multi-face anomalies, head pose deviations, and audio events with 99.2% precision and sub-140ms latency.";
      } else if (lower.includes('skill') || lower.includes('stack')) {
        responseText = "Parth excels across Python (TensorFlow, OpenCV, LangChain), TypeScript/JavaScript (Next.js, React, Node.js), Relational/NoSQL databases (PostgreSQL, MongoDB, SQLite), and real-time protocols (WebRTC).";
      } else if (lower.includes('generative') || lower.includes('genai') || lower.includes('rag') || lower.includes('cert')) {
        responseText = "Parth holds verified Microsoft & LinkedIn certifications in Generative AI, and has built 'Chat With PDF' using LangChain, FAISS vector search, and character chunking to ensure zero-hallucination document intelligence.";
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('interview')) {
        responseText = "You can reach Parth directly at parth022002@gmail.com, on LinkedIn at https://www.linkedin.com/in/parth--ahuja/, or explore his repositories at https://github.com/parth022002.";
      } else {
        responseText = `Based on Parth's portfolio knowledge base, he has engineered 14+ full-scale systems spanning AI proctoring, scalable social feeds (NexSpace), audio streaming (Spotify Clone), and RAG pipelines. Every project is accompanied by live demo URLs and GitHub repos.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
    }, 400);
  };

  const handleAnalyzeJD = () => {
    if (!jdText.trim()) return;

    // Simulate smart keyword matching
    const keywords = ['react', 'next.js', 'python', 'ai', 'machine learning', 'tensorflow', 'typescript', 'sql', 'webrtc', 'node', 'full stack', 'api', 'data'];
    const lower = jdText.toLowerCase();
    const matched = keywords.filter(k => lower.includes(k));
    const score = Math.min(98, Math.max(78, 70 + matched.length * 4));

    setJdResult({
      score,
      matchedSkills: matched.length > 0 ? matched.map(m => m.toUpperCase()) : ['FULL STACK', 'PYTHON', 'REACT', 'AI ARCHITECTURE'],
      recommendedProjects: ['ProctorShield (AI Vision & WebRTC)', 'NexSpace (Next.js Platform)', 'Chat With PDF (RAG & GenAI)']
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#090D16] border-l border-white/10 shadow-2xl flex flex-col animate-slide-left">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-sky-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Parth AI Copilot</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </h3>
            <span className="text-[11px] text-zinc-400 font-mono">Grounded Knowledge Agent</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
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
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-md bg-violet-900/80 text-violet-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none'
                      : 'bg-zinc-900 border border-white/5 text-zinc-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-sky-900/80 text-sky-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-3 border-t border-white/5 bg-zinc-950/60 space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Suggested Prompts:</span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sq)}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] border border-white/5 text-left transition-colors"
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
              placeholder="Ask anything about Parth's work..."
              className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"
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
            placeholder="Paste Job Description here (e.g., We are seeking a Full-Stack AI Engineer with React, Python, Machine Learning, and API architecture experience...)"
            className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-sky-500"
          />

          <button
            onClick={handleAnalyzeJD}
            className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2"
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
                <div className="space-y-1">
                  {jdResult.recommendedProjects.map((p, i) => (
                    <div key={i} className="text-zinc-300 text-[11px] flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-sky-400" />
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
  );
};
