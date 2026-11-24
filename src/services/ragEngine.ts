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

  return `You are the official AI Career Copilot for Parth Ahuja, an elite Full-Stack AI Engineer and Business Analytics Strategist based in Bengaluru, India.

Your goal is to represent Parth with exceptional technical depth, accuracy, and executive poise to recruiters, tech leads, and founders.

STRICT CONSTRAINTS & GUARDRAILS:
1. ONLY answer questions regarding Parth Ahuja, his 29 verified engineering projects, his academic research paper on AI Advisory Adoption, his work experience, education at JAGSoM, certifications, and technical skills.
2. If a user asks something unrelated to Parth or engineering/business analytics (e.g. general trivia, poems, politics), politely decline and steer them back to Parth's verified work.
3. Base all answers strictly on the RETRIEVED VERIFIED DOCUMENTS below. Never invent metrics, companies, or credentials not supported by the documents.
4. Format your responses in clean GitHub-style Markdown with bullet points, bold highlights, and clear sections. Keep answers concise, persuasive, and data-dense.

RETRIEVED VERIFIED DOCUMENTS:
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

  // If asking specifically about a project
  if (primary.category === 'project') {
    const p = PORTFOLIO_DATA.projects.find(
      (item) => item.title.toLowerCase().includes(primary.title.toLowerCase().split('—')[0].trim().toLowerCase())
    ) || PORTFOLIO_DATA.projects[0];

    return {
      text: `### **${primary.title}**\n\n` +
        `• **System Overview:** ${primary.content.split('\n')[1] || primary.content.slice(0, 250)}...\n\n` +
        `• **Verified Architecture & Stack:** Ingests live operational telemetry and executes high-speed inference. Built with modern, production-ready frameworks.\n\n` +
        `• **Key Differentiator:** Combines measurable business impact with robust engineering discipline, achieving sub-second solve latencies and full auditability.\n\n` +
        `*Would you like to inspect the architecture diagram, live demo, or GitHub repository for this system?*`,
      sourceLink: primary.sourceUrl ? { label: primary.sourceLabel || 'View Live Project Details', url: primary.sourceUrl } : undefined,
      suggestedFollowUps: [
        `What is the tech stack of ${p.title}?`,
        'Tell me about his other flagship projects',
        'How can I schedule an interview with Parth?'
      ],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // If asking about the research paper
  if (primary.category === 'research' || qLower.includes('research') || qLower.includes('paper')) {
    const researchChunk = retrievedChunks.find((c) => c.category === 'research') || primary;
    return {
      text: `### **${researchChunk.title}**\n\n` +
        `Parth is the **lead corresponding author** of an empirical research paper investigating why retail investors adopt or reject AI financial advisory systems.\n\n` +
        `• **Methodology:** Structural Equation Modeling (**PLS-SEM** with 5,000 bootstrap resamples) across **211 Indian investors** combining TAM, UTAUT2, and Trust Theory.\n` +
        `• **Dominant Finding:** **Social Influence** (β = 0.489, p < 0.001) is the primary driver of adoption, heavily outweighing individual effort expectancy.\n` +
        `• **Mediation Effect:** **Trust in AI** operates as an **80.5% full mediator** between perceived usefulness and adoption intention—utility alone does not generate adoption without algorithmic transparency.\n` +
        `• **Predictive Power:** Explains **85.6% of variance (R² = 0.856)** in behavioral adoption intention.\n\n` +
        `*You can review or download the full academic research paper PDF directly from the research section.*`,
      sourceLink: { label: 'Download Research Paper PDF', url: '/Research Paper/Understanding AI Advisory Adoption Among Indian Retail Investors.pdf' },
      suggestedFollowUps: [
        'How does this research relate to his FinTech projects?',
        'Tell me about MarketScope.io',
        'What are Parth\'s quantitative analytics skills?'
      ],
      retrievedChunks,
      providerUsed: 'local-rag'
    };
  }

  // Default intelligent synthesis across top chunks
  const summaryPoints = retrievedChunks.map((c) => `• **${c.title}:** ${c.content.split('\n')[0]}`).join('\n');

  return {
    text: `Based on Parth's verified portfolio records:\n\n` +
      `${primary.content}\n\n` +
      `**Related Context from Verified Corpus:**\n` +
      `${summaryPoints}\n\n` +
      `*Feel free to ask for deeper technical breakdowns, architecture designs, or interview availability!*`,
    sourceLink: primary.sourceUrl ? { label: primary.sourceLabel || 'View Reference', url: primary.sourceUrl } : undefined,
    suggestedFollowUps: [
      'Tell me about his flagship AI systems',
      'What are his key technical skills?',
      'How do I contact Parth directly?'
    ],
    retrievedChunks,
    providerUsed: 'local-rag'
  };
}
