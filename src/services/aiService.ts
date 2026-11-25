import { retrieveRelevantChunks, buildRAGSystemPrompt, synthesizeLocalGroundedRAGAnswer, RAGAnswerResult } from './ragEngine';
import { Project } from '../data/portfolioData';
import { RAGDocumentChunk } from '../data/ragKnowledgeCorpus';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface CopilotQueryOptions {
  query: string;
  chatHistory?: ChatMessage[];
  preloadedProject?: Project | null;
}

/**
 * Dispatcher function for Parth's Agentic RAG Portfolio Copilot
 * Dynamically queries Groq, OpenRouter, or Gemini if keys exist,
 * otherwise falls back cleanly to the local Grounded RAG engine.
 */
export async function askParthCopilot(options: CopilotQueryOptions): Promise<RAGAnswerResult> {
  const { query, chatHistory = [], preloadedProject } = options;

  // 1. Retrieve the top relevant document chunks from verified portfolio corpus
  const retrievedChunks = retrieveRelevantChunks(query, 4);
  const systemPrompt = buildRAGSystemPrompt(retrievedChunks);

  // 2. Detect configured API keys from environment
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;
  const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Primary source link from top retrieved chunk
  const topSource = retrievedChunks[0]?.sourceUrl
    ? {
        label: retrievedChunks[0].sourceLabel || 'View Verified Source',
        url: retrievedChunks[0].sourceUrl
      }
    : undefined;

  // ----------------------------------------------------
  // A. GROQ CLOUD INFERENCE (Sub-Second Latency with 120B / 20B Models)
  // ----------------------------------------------------
  if (groqKey && groqKey.trim() !== '') {
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...chatHistory.slice(-4),
        { role: 'user', content: query }
      ];

      let res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqKey.trim()}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages,
          temperature: 0.3,
          max_tokens: 700
        })
      });

      // If 120b model encounters any issue or rate limit, automatically fallback to 20b
      if (!res.ok) {
        res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqKey.trim()}`
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-20b',
            messages,
            temperature: 0.3,
            max_tokens: 700
          })
        });
      }

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          return {
            text,
            sourceLink: topSource,
            suggestedFollowUps: generateSmartFollowUps(query, retrievedChunks),
            retrievedChunks,
            providerUsed: 'groq'
          };
        }
      }
    } catch (err) {
      console.warn('Groq inference fallback triggered:', err);
    }
  }

  // ----------------------------------------------------
  // B. OPENROUTER INFERENCE
  // ----------------------------------------------------
  if (openRouterKey && openRouterKey.trim() !== '') {
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...chatHistory.slice(-4),
        { role: 'user', content: query }
      ];

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openRouterKey.trim()}`
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct',
          messages,
          temperature: 0.3,
          max_tokens: 700
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          return {
            text,
            sourceLink: topSource,
            suggestedFollowUps: generateSmartFollowUps(query, retrievedChunks),
            retrievedChunks,
            providerUsed: 'openrouter'
          };
        }
      }
    } catch (err) {
      console.warn('OpenRouter inference fallback triggered:', err);
    }
  }

  // ----------------------------------------------------
  // C. GOOGLE GEMINI INFERENCE
  // ----------------------------------------------------
  if (geminiKey && geminiKey.trim() !== '') {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey.trim()}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUSER QUESTION: ${query}` }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 700
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            text,
            sourceLink: topSource,
            suggestedFollowUps: generateSmartFollowUps(query, retrievedChunks),
            retrievedChunks,
            providerUsed: 'gemini'
          };
        }
      }
    } catch (err) {
      console.warn('Gemini inference fallback triggered:', err);
    }
  }

  // ----------------------------------------------------
  // D. HIGH-PRECISION LOCAL GROUNDED RAG SYNTHESIZER
  // (Zero API key required, 100% reliable, zero downtime)
  // ----------------------------------------------------
  return synthesizeLocalGroundedRAGAnswer(query, retrievedChunks, preloadedProject);
}

/**
 * Dynamically computes relevant follow-up questions based on retrieved knowledge
 */
function generateSmartFollowUps(query: string, chunks: RAGDocumentChunk[]): string[] {
  const top = chunks[0];
  if (!top) return ['What are his core technical skills?', 'Tell me about ProcuraX', 'How can I contact Parth?'];

  if (top.category === 'project') {
    return [
      `What problem does ${top.title.split('—')[0]} solve?`,
      'Tell me about his other Level 1 projects',
      'What are Parth\'s full-stack & AI skills?'
    ];
  }
  if (top.category === 'research') {
    return [
      'What was the sample size and methodology?',
      'How does Trust mediate AI adoption in his paper?',
      'Tell me about MarketScope.io'
    ];
  }
  if (top.category === 'experience') {
    return [
      'What tools did he use at OASIS Infobyte?',
      'Tell me about College Canteen Wastage Optimization',
      'What is his education background at JAGSoM?'
    ];
  }

  return [
    'Tell me about ProcuraX and Supply Chain AI',
    'What are his key certifications?',
    'How do I schedule an interview with Parth?'
  ];
}
