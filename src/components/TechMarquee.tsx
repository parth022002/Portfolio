import React from 'react';
import { Sparkles, Briefcase, Code, Rocket } from 'lucide-react';

interface TickerItem {
  type: 'ROLE' | 'PROJECT' | 'SKILL';
  badge: string;
  label: string;
}

export const TechMarquee: React.FC = () => {
  const items: TickerItem[] = [
    // 1. Target Role
    { type: 'ROLE', badge: 'JOB PROFILE', label: 'Full-Stack AI Engineer' },
    // 2. Flagship Project
    { type: 'PROJECT', badge: 'FLAGSHIP PROJECT', label: 'ProctorShield • AI Real-Time Remote Exam Integrity' },
    // 3. Core Skill
    { type: 'SKILL', badge: 'CORE TECH', label: 'TensorFlow & PyTorch • Computer Vision & OpenCV' },
    // 4. Role
    { type: 'ROLE', badge: 'JOB PROFILE', label: 'Machine Learning & Edge Vision Specialist' },
    // 5. Featured Project
    { type: 'PROJECT', badge: 'FEATURED PROJECT', label: 'DocuMind AI • Enterprise GenAI RAG Search Engine' },
    // 6. Skill
    { type: 'SKILL', badge: 'REAL-TIME TECH', label: 'WebRTC Low-Latency Live Video & Audio Streaming' },
    // 7. Role
    { type: 'ROLE', badge: 'JOB PROFILE', label: 'AI Solutions Architect & Cloud Systems Engineer' },
    // 8. Production Project
    { type: 'PROJECT', badge: 'PRODUCTION APP', label: 'SocialConnect • Enterprise Full-Stack Network' },
    // 9. Skill
    { type: 'SKILL', badge: 'FULL STACK', label: 'Next.js 14 App Router • React 18 • TypeScript' },
    // 10. Role
    { type: 'ROLE', badge: 'STRATEGY', label: 'Business Analytics & Data-Driven Product Strategist' },
    // 11. Real-time Project
    { type: 'PROJECT', badge: 'STREAMING APP', label: 'SwiftStream • Real-Time Low-Latency Audio Engine' },
    // 12. Skill
    { type: 'SKILL', badge: 'AI ORCHESTRATION', label: 'LangChain • Vector Databases (FAISS) • HuggingFace' },
    // 13. E-commerce Project
    { type: 'PROJECT', badge: 'E-COMMERCE', label: 'QuickCart • High-Conversion Digital Retail Platform' },
    // 14. Skill
    { type: 'SKILL', badge: 'BACKEND & CLOUD', label: 'FastAPI • Node.js Microservices • Docker • CI/CD' },
  ];

  const getBadgeStyle = (type: TickerItem['type']) => {
    switch (type) {
      case 'ROLE':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30';
      case 'PROJECT':
        return 'bg-sky-950/70 text-sky-400 border-sky-500/30';
      case 'SKILL':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/30';
    }
  };

  const getTypeIcon = (type: TickerItem['type']) => {
    switch (type) {
      case 'ROLE':
        return <Briefcase className="w-3 h-3 text-emerald-400" />;
      case 'PROJECT':
        return <Rocket className="w-3 h-3 text-sky-400" />;
      case 'SKILL':
        return <Code className="w-3 h-3 text-purple-400" />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-3 border-b border-white/10 bg-[#06080D]/90 backdrop-blur-md select-none z-30 shadow-lg">
      {/* Edge Blur Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#07090E] via-[#07090E]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#07090E] via-[#07090E]/80 to-transparent z-10 pointer-events-none" />

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
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider border shadow-sm ${getBadgeStyle(
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
            <span className="text-sky-400/60 font-bold text-xs ml-3">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
