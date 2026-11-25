import { RAG_KNOWLEDGE_CORPUS, RAGDocumentChunk } from '../data/ragKnowledgeCorpus';
import { Project, PORTFOLIO_DATA } from '../data/portfolioData';

export interface RAGAnswerResult {
  text: string;
  sourceLink?: { label: string; url: string };
  suggestedFollowUps: string[];
  retrievedChunks: RAGDocumentChunk[];
  providerUsed: 'groq' | 'openrouter' | 'gemini' | 'local-rag';
}

/**
 * Tokenize and normalize query strings for semantic retrieval
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

/**
 * High-precision BM25 / TF-IDF style semantic retrieval engine
 * Matches user queries against the verified RAG knowledge corpus
 */
export function retrieveRelevantChunks(query: string, topK = 4): RAGDocumentChunk[] {
  const queryTokens = tokenize(query);
  const qLower = query.toLowerCase();

  const scored = RAG_KNOWLEDGE_CORPUS.map((chunk) => {
    let score = 0;

    // 1. Exact match on title or keywords
    if (qLower.includes(chunk.title.toLowerCase())) {
      score += 40;
    }

    for (const kw of chunk.keywords) {
      if (qLower.includes(kw.toLowerCase())) {
        score += 25;
      }
    }

    // 2. Token overlap with chunk title and keywords
    const chunkTokens = new Set([
      ...tokenize(chunk.title),
      ...chunk.keywords.flatMap((k) => tokenize(k))
    ]);

    for (const t of queryTokens) {
      if (chunkTokens.has(t)) {
        score += 8;
      }
      // Content substring match
      if (chunk.content.toLowerCase().includes(t)) {
        score += 2;
      }
    }

    // 3. Domain Concept Boosting
    if (
      (qLower.includes('procurax') || qLower.includes('supply chain') || qLower.includes('bom')) &&
      chunk.id === 'project-procurax'
    ) {
      score += 50;
    }
    if (
      (qLower.includes('marketscope') || qLower.includes('investment') || qLower.includes('valuation') || qLower.includes('dupont')) &&
      chunk.id === 'project-marketscope'
    ) {
      score += 50;
    }
    if (
      (qLower.includes('proctorshield') || qLower.includes('vision') || qLower.includes('proctor') || qLower.includes('exam')) &&
      chunk.id === 'project-proctorshield'
    ) {
      score += 50;
    }
    if (
      (qLower.includes('research') || qLower.includes('paper') || qLower.includes('adoption') || qLower.includes('utaut') || qLower.includes('pls-sem')) &&
      chunk.id === 'research-paper-ai-advisory'
    ) {
      score += 50;
    }
    if (
      (qLower.includes('canteen') || qLower.includes('wastage') || qLower.includes('food')) &&
      chunk.id === 'capstone-canteen-wastage'
    ) {
      score += 50;
    }
    if (
      (qLower.includes('metro') || qLower.includes('crowd') || qLower.includes('queue') || qLower.includes('yellow line')) &&
      chunk.id === 'capstone-metro-queue'
    ) {
      score += 50;
    }
    if (
      (qLower.includes('oasis') || qLower.includes('infobyte') || qLower.includes('intern')) &&
      chunk.id === 'internship-oasis-infobyte'
    ) {
      score += 50;
    }
    if (
      (qLower.includes('why') || qLower.includes('hire') || qLower.includes('role') || qLower.includes('interview')) &&
      chunk.id === 'why-hire-parth'
    ) {
      score += 40;
    }

    return { chunk, score };
  });

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  // Take topK scored items, fallback to top items if no match
  const results = scored.filter((item) => item.score > 0).slice(0, topK);
  if (results.length === 0) {
    return [RAG_KNOWLEDGE_CORPUS[0], RAG_KNOWLEDGE_CORPUS[1], RAG_KNOWLEDGE_CORPUS[2]];
  }
  return results.map((item) => item.chunk);
}

/**
 * Builds the strict, grounded System Prompt injecting retrieved RAG context
 */
export function buildRAGSystemPrompt(retrievedChunks: RAGDocumentChunk[]): string {
  const contextString = retrievedChunks
    .map((chunk, idx) => `### DOCUMENT [${idx + 1}]: ${chunk.title}\n${chunk.content}`)
    .join('\n\n---\n\n');

  return `You are Parth Ahuja answering directly in the first person ("I", "my work", "my research", "my architecture") as an elite Full-Stack AI Engineer and Business Analytics Strategist based in Bengaluru, India.

YOUR MISSION:
Answer questions from recruiters, hiring managers, tech leads, and founders as Parth himself. Your answers must feel like a thoughtful, articulate, high-caliber human engineer speaking naturally and confidently in an interview or technical conversation.

SPEAKING STYLE & HUMAN COMMUNICATION RULES:
1. ALWAYS speak in the first person ("I built...", "In my research paper...", "My architecture uses..."). NEVER talk about Parth in the third person or say "Based on Parth's records".
2. Write in smooth, continuous, human paragraphs. Avoid robotic bullet headers like "• System Overview:", "• Verified Architecture:", or "• Key Differentiator:". Instead, weave technical stack details, problem statements, and metrics into natural conversational sentences.
3. Be data-dense and technically precise: quote real metrics (e.g. 99.4% BOM accuracy, sub-140ms latency, R² = 0.856, 40% lead time reduction) and explain the engineering "why" behind your architectural decisions.
4. Keep the tone executive, confident, friendly, and articulate.
5. Base all answers strictly on the verified documents below. If a user asks something unrelated to your engineering work or background, politely decline and steer them back to your portfolio.

VERIFIED PORTFOLIO KNOWLEDGE:
=======================================
${contextString}
=======================================`;
}

/**
 * Intelligent Local Grounded RAG Synthesizer
 * Provides instant, zero-delay responses when no external LLM API key is present
 */
export function synthesizeLocalGroundedRAGAnswer(
  query: string,
  retrievedChunks: RAGDocumentChunk[],
  preloadedProject?: Project | null
): RAGAnswerResult {
  const primary = retrievedChunks[0];
  const qLower = query.toLowerCase();

  // 1. ProcuraX
  if (qLower.includes('procurax') || primary.id === 'project-procurax') {
    return {
      text: `In **ProcuraX**, I engineered an autonomous multi-agent procurement platform designed to tackle complex multi-tier supply chain disruptions before factory lines shut down.\n\nTraditional enterprise ERPs are purely passive record-keepers that only trigger alerts after inventory is already depleted. I architected ProcuraX using **LangGraph multi-agent state graphs**, **FastAPI**, and **Neon PostgreSQL**. The system continuously ingests live global trade and market feeds, predicts Bill-of-Materials exposure runways, and evaluates supplier switching costs against downtime penalties—optimizing mitigation plans in under **1.4 seconds** with **99.4% signal accuracy**.\n\nEvery decision packet is cryptographically recorded for complete human-in-the-loop auditability. Feel free to explore the live application or ask me about the agent state machine architecture!`,
      sourceLink: { label: 'Explore ProcuraX Live App', url: 'https://procurax-five.vercel.app/' },
      suggestedFollowUps: [],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // 2. MarketScope.io
  if (qLower.includes('marketscope') || qLower.includes('valuation') || qLower.includes('dupont') || primary.id === 'project-marketscope') {
    return {
      text: `I built **MarketScope.io** to solve a major pain point for equity analysts: the 15+ hours wasted manually pulling SEC filings, computing ratios, and scraping fragmented sentiment across multiple portals.\n\nI architected an institutional scoring engine that evaluates stocks on a 0-to-100 scale across Fundamental Quality (35%), Growth Momentum (25%), Technical Trend (20%), and Market Sentiment (20%). It also features automated discounted cash flow (DCF) models, interactive TradingView charts, and a full 3-stage and 5-stage **DuPont Return on Equity (ROE) decomposition** module to uncover the true operational and leverage drivers behind company performance.\n\nIt is built with React 19, TypeScript, and serverless Node.js APIs. You can test it live with real-time equity data!`,
      sourceLink: { label: 'Explore MarketScope.io Live', url: 'https://marketscope-two.vercel.app/' },
      suggestedFollowUps: [],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // 3. ProctorShield
  if (qLower.includes('proctor') || qLower.includes('vision') || primary.id === 'project-proctorshield') {
    return {
      text: `For **ProctorShield**, I engineered an edge-computed AI invigilation platform using **WebRTC**, **OpenCV**, and **MediaPipe** to uphold academic integrity in distributed remote examinations.\n\nInstead of saturating bandwidth by streaming raw high-definition video to cloud servers, ProctorShield executes multi-task neural networks directly on the client edge. It performs real-time face verification, head-pose tracking, gaze estimation, and acoustic anomaly detection with an end-to-end latency under **140 milliseconds**—supporting concurrent sessions without compromising student privacy.\n\nIt features automated suspicion scoring and comprehensive incident audit timelines for examiners. Feel free to inspect the live codebase!`,
      sourceLink: { label: 'View ProctorShield Source', url: 'https://github.com/parth022002/ProctorShield' },
      suggestedFollowUps: [],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // 4. Research Paper
  if (qLower.includes('research') || qLower.includes('paper') || qLower.includes('advisory') || primary.id === 'research-paper-ai-advisory') {
    return {
      text: `I am the primary and corresponding author of an empirical research paper investigating why Indian retail investors choose to adopt or reject AI-powered robo-advisory platforms.\n\nWe surveyed **211 retail investors** across major financial hubs and analyzed the data using Structural Equation Modeling (**PLS-SEM** with 5,000 bootstrap resamples) integrating TAM, UTAUT2, and Trust Theory. Our key finding revealed that **Social Influence** (β = 0.489, p < 0.001) is the dominant driver of adoption, and **Trust in AI** operates as an **80.5% full mediator** between perceived usefulness and adoption intention. In other words, superior utility alone will not drive adoption without algorithmic transparency.\n\nThe structural model explains **85.6% of the variance (R² = 0.856)** in adoption intention. You can read or download the complete published PDF directly in the research section!`,
      sourceLink: { label: 'Download Research Paper PDF', url: '/Research Paper/Understanding AI Advisory Adoption Among Indian Retail Investors.pdf' },
      suggestedFollowUps: [],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // 5. Chat with PDF / RAG
  if (qLower.includes('pdf') || qLower.includes('chat with pdf') || qLower.includes('rag')) {
    return {
      text: `In **Chat with PDF**, I developed an enterprise-grade retrieval-augmented generation engine using **LangChain**, **FAISS vector search**, and Python.\n\nThe system parses and vectorizes multi-hundred-page technical PDF documents in just over 3 seconds. It uses recursive semantic chunking and cosine similarity to ensure every answer is strictly grounded in the uploaded document with exact source citations, eliminating hallucinations.\n\nIt is ideal for research workflows and fast compliance checks across complex contracts and financial filings.`,
      sourceLink: { label: 'View Project Details', url: 'https://github.com/parth022002' },
      suggestedFollowUps: [],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // 6. OASIS Infobyte Internship
  if (qLower.includes('oasis') || qLower.includes('intern') || primary.id === 'internship-oasis-infobyte') {
    return {
      text: `During my Business Analytics internship at **OASIS Infobyte**, I engineered executive Tableau KPI dashboards and automated SQL extraction pipelines.\n\nI analyzed multi-million row retail datasets to identify customer churn triggers and optimize inventory replenishment across regional distribution nodes. By transforming complex transactional data into clear, interactive executive visual models, I helped leadership identify revenue bottlenecks and improve stock turnover by 18%.\n\nThis role solidified my approach to combining rigorous database optimization with executive product strategy.`,
      sourceLink: { label: 'Explore Internship Evidence', url: 'https://www.linkedin.com/in/parth--ahuja/' },
      suggestedFollowUps: [],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // 7. Why hire Parth / Background / Value Proposition
  if (qLower.includes('why hire') || qLower.includes('hire') || qLower.includes('who are you') || qLower.includes('about') || primary.id === 'parth-bio-overview' || primary.id === 'why-hire-parth') {
    return {
      text: `I bring a rare blend that connects deep engineering execution with quantitative business acumen: a Computer Engineering degree paired with a PGDM in Business Analytics from **JAGSoM, Bengaluru**.\n\nAcross **29 verified software deployments**, I have engineered autonomous multi-agent AI systems, edge-computed computer vision invigilation platforms, and quantitative investment valuation models. I write production-ready code in TypeScript, React 19, Next.js, Python, and FastAPI, while knowing how to model unit economics, analyze user retention, and ensure software delivers measurable business outcomes.\n\nWith 49 professional certifications and a published quantitative research paper, I can step in on day one and build reliable, scalable AI products for your team. I am actively interviewing for full-time engineering and product roles worldwide!`,
      sourceLink: { label: 'Connect on LinkedIn', url: 'https://www.linkedin.com/in/parth--ahuja/' },
      suggestedFollowUps: [],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // 8. Skills / Tech Stack
  if (qLower.includes('skill') || qLower.includes('tech stack') || qLower.includes('technologies')) {
    return {
      text: `My technical foundation spans three core areas: Full-Stack Engineering, Artificial Intelligence, and Business Analytics.\n\n• **Engineering & Frontend:** TypeScript, React 19, Next.js (App Router), Tailwind CSS, Node.js, and Redux Toolkit.\n• **AI, Vision & Backend:** Python, FastAPI, PyTorch, OpenCV, MediaPipe, LangChain, LangGraph, FAISS vector search, and WebRTC.\n• **Analytics & Infrastructure:** SQL, PostgreSQL (Neon), Tableau KPI dashboards, structural equation modeling (PLS-SEM), Docker, and Vercel serverless.\n\nEvery technology I adopt is chosen to ensure high throughput, sub-second latency, and clean maintainability in production.`,
      sourceLink: { label: 'Review GitHub Profile', url: 'https://github.com/parth022002' },
      suggestedFollowUps: [],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // 9. General Intelligent First-Person Human Synthesis
  return {
    text: `Regarding **${primary.title.split('—')[0].trim()}**, I engineered this system to bridge advanced computational capability with practical business impact.\n\n${primary.content.split('\n').filter(l => l.length > 30 && !l.includes('http') && !l.includes('Email:')).slice(0, 3).map(line => line.replace(/^[-*•]\s*/, '').replace(/Parth Ahuja\b/g, 'I').replace(/Parth\b/g, 'I').replace(/\bHe\b/g, 'I')).join(' ')}\n\nAcross all my work, I focus on clean architecture, sub-second execution speeds, and verifiable business value. Feel free to ask me for any deeper technical details, code references, or live demonstrations!`,
    sourceLink: primary.sourceUrl ? { label: primary.sourceLabel || 'View Verified Reference', url: primary.sourceUrl } : undefined,
    suggestedFollowUps: [],
    retrievedChunks,
    providerUsed: 'local-rag'
  };
}
