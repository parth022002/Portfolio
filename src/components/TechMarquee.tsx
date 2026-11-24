import React from 'react';
import { Sparkles, Briefcase, Rocket, Cpu, BookOpen, Award } from 'lucide-react';

interface TickerItem {
  type: 'ROLE' | 'PROJECT' | 'TECH' | 'RESEARCH' | 'MILESTONE';
  badge: string;
  label: string;
}

export const TechMarquee: React.FC = () => {
  const items: TickerItem[] = [
    // 1. Portfolio Milestone
    { 
      type: 'MILESTONE', 
      badge: 'VERIFIED REPO', 
      label: '29 Verified Systems • 20 Live Production Demos • 27 GitHub Repos' 
    },
    // 2. Primary Target Role
    { 
      type: 'ROLE', 
      badge: 'CAREER PROFILE', 
      label: 'Full-Stack AI Engineer' 
    },
    // 3. Flagship Project 1 (ProcuraX)
    { 
      type: 'PROJECT', 
      badge: 'FLAGSHIP AI', 
      label: 'ProcuraX • Agentic AI Supply Chain & Procurement Decision Intelligence' 
    },
    // 4. Agentic AI & Backend Tech Stack
    { 
      type: 'TECH', 
      badge: 'AGENTIC STACK', 
      label: 'Python • FastAPI • LangGraph Multi-Agent Systems • Neon Serverless Postgres' 
    },
    // 5. Specialization Role
    { 
      type: 'ROLE', 
      badge: 'CAREER PROFILE', 
      label: 'Agentic AI & Decision Intelligence Architect' 
    },
    // 6. Flagship Project 2 (MarketScope.io)
    { 
      type: 'PROJECT', 
      badge: 'FLAGSHIP QUANT', 
      label: 'MarketScope.io • AI Multi-Asset Investment Research & Valuation Engine' 
    },
    // 7. Academic Research Paper
    { 
      type: 'RESEARCH', 
      badge: 'RESEARCH STUDY', 
      label: 'Understanding AI Advisory Adoption Among Indian Retail Investors • UTAUT Econometric Study' 
    },
    // 8. Computer Vision Stack
    { 
      type: 'TECH', 
      badge: 'COMPUTER VISION', 
      label: 'PyTorch • OpenCV • MediaPipe Real-Time Facial Landmarks & Gaze Analysis' 
    },
    // 9. Flagship Project 3 (ProctorShield)
    { 
      type: 'PROJECT', 
      badge: 'FLAGSHIP VISION', 
      label: 'ProctorShield • Real-Time AI Remote Exam Proctoring & Multi-Face Invigilation' 
    },
    // 10. Vision / ML Role
    { 
      type: 'ROLE', 
      badge: 'CAREER PROFILE', 
      label: 'Computer Vision & Edge ML Specialist' 
    },
    // 11. Modern Full-Stack Architecture
    { 
      type: 'TECH', 
      badge: 'FRONTEND ARCH', 
      label: 'React 19 • Next.js 14 App Router • TypeScript • Tailwind CSS • Framer Motion' 
    },
    // 12. Featured GenAI Project (DocuMind AI)
    { 
      type: 'PROJECT', 
      badge: 'GENAI RAG', 
      label: 'DocuMind AI • Enterprise Document Intelligence & Hybrid Vector RAG' 
    },
    // 13. Strategy & Analytics Role
    { 
      type: 'ROLE', 
      badge: 'CAREER PROFILE', 
      label: 'Business Analytics & Data-Driven Product Strategist' 
    },
    // 14. High-Scale Platform (Notch)
    { 
      type: 'PROJECT', 
      badge: 'SCALE PLATFORM', 
      label: 'Notch • Real-Time High-Throughput Social Network & Forum Engine' 
    },
    // 15. Real-Time Streaming Stack
    { 
      type: 'TECH', 
      badge: 'REAL-TIME TECH', 
      label: 'WebSockets • WebRTC Low-Latency Live Audio/Video • Redis In-Memory Cache' 
    },
    // 16. E-Commerce Platform (ShoeSavvy)
    { 
      type: 'PROJECT', 
      badge: 'DIGITAL COMMERCE', 
      label: 'ShoeSavvy • Modern High-Conversion E-Commerce Platform' 
    },
    // 17. Dual Degree Pedigree
    { 
      type: 'MILESTONE', 
      badge: 'EDUCATION', 
      label: 'Dual Academic Background: PGDM in Business Analytics & B.E. in Computer Engineering' 
    },
    // 18. LegalTech Project (LawLab)
    { 
      type: 'PROJECT', 
      badge: 'LEGAL INTELLIGENCE', 
      label: 'LawLab • LegalTech Document Parsing & Automated Contract Risk Intelligence' 
    },
    // 19. Cloud & DevOps Stack
    { 
      type: 'TECH', 
      badge: 'CLOUD & DEVOPS', 
      label: 'Docker • CI/CD Automation • Serverless Cloud Deployment (Vercel & Railway)' 
    },
    // 20. Systems Architect Role
    { 
      type: 'ROLE', 
      badge: 'CAREER PROFILE', 
      label: 'Full-Lifecycle AI Solutions Architect' 
    },
  ];

  const getBadgeStyle = (type: TickerItem['type']) => {
    switch (type) {
      case 'ROLE':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30';
      case 'PROJECT':
        return 'bg-sky-950/70 text-sky-400 border-sky-500/30';
      case 'TECH':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/30';
      case 'RESEARCH':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/30';
      case 'MILESTONE':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-500/30';
    }
  };

  const getTypeIcon = (type: TickerItem['type']) => {
    switch (type) {
      case 'ROLE':
        return <Briefcase className="w-3 h-3 text-emerald-400" />;
      case 'PROJECT':
        return <Rocket className="w-3 h-3 text-sky-400" />;
      case 'TECH':
        return <Cpu className="w-3 h-3 text-purple-400" />;
      case 'RESEARCH':
        return <BookOpen className="w-3 h-3 text-amber-400" />;
      case 'MILESTONE':
        return <Award className="w-3 h-3 text-cyan-400" />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-3 border-y border-white/5 bg-[#06080D]/90 backdrop-blur-md select-none z-30 shadow-lg">
      {/* Edge Blur Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#07090E] via-[#07090E]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#07090E] via-[#07090E]/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track with Pause on Hover */}
      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] cursor-pointer items-center">
        {/* Double the array for seamless infinite looping */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-5 sm:px-6 whitespace-nowrap group transition-transform hover:scale-105"
          >
            {/* Category Tag Pill */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider border shadow-sm transition-colors ${getBadgeStyle(
                item.type
              )}`}
            >
              {getTypeIcon(item.type)}
              <span>{item.badge}</span>
            </span>

            {/* Item Title */}
            <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
              {item.label}
            </span>

            {/* Glowing Separator Symbol */}
            <span className="text-sky-400/50 font-bold text-xs ml-3 group-hover:text-sky-300 transition-colors">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
