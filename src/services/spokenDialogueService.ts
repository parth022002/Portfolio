/**
 * Spoken Dialogue Synthesizer
 * Converts AI technical RAG responses into smooth, first-person,
 * continuous human-like paragraphs as if Parth is personally speaking.
 */

// Curated high-impact spoken executive summaries for Parth's flagship achievements
const PRESET_HUMAN_DIALOGUES: Record<string, string> = {
  procurax:
    "In ProcuraX, I engineered an autonomous multi-agent AI procurement platform to solve complex multi-tier supply chain disruptions before factory lines halt. I architected LangGraph state graphs and FastAPI to predict Bill-of-Materials exposure and evaluate supplier switching costs in under one point four seconds with ninety-nine point four percent accuracy.",

  marketscope:
    "With MarketScope, I built an automated equity research platform that saves analysts fifteen hours per stock. I engineered four-pillar institutional scoring, automated discounted cash flow models, and three-stage and five-stage DuPont Return on Equity decomposition with real-time financial telemetry.",

  proctorshield:
    "For ProctorShield, I developed an edge-computed AI invigilation platform using WebRTC, OpenCV, and MediaPipe. It executes multi-task neural networks directly on the client to track face verification, gaze patterns, and acoustic anomalies at sub-one-hundred-forty millisecond latency without compromising student privacy.",

  research:
    "I am the lead author of an empirical research paper analyzing why Indian retail investors adopt AI robo-advisors. By studying two hundred eleven investors with structural equation modeling, I discovered that social influence is the primary catalyst and trust operates as an eighty percent full mediator between usefulness and adoption.",

  paper:
    "I am the lead author of an empirical research paper analyzing why Indian retail investors adopt AI robo-advisors. By studying two hundred eleven investors with structural equation modeling, I discovered that social influence is the primary catalyst and trust operates as an eighty percent full mediator between usefulness and adoption.",

  "chat-with-pdf":
    "In Chat with PDF, I built an enterprise-grade retrieval-augmented generation engine using LangChain and FAISS vector search. It parses, chunks, and vectorizes multi-hundred page documents in just over three seconds with cited, hallucination-free answers.",

  nexspace:
    "NexSpace is a high-performance modern social platform I built using Next.js App Router and TypeScript. I architected optimistic client-side UI mutations and edge routing that delivered sub-sixty-five millisecond responses and a ninety-eight out of one hundred Lighthouse score.",

  spotify:
    "In my Spotify Enterprise project, I engineered a high-fidelity streaming architecture featuring Redux Toolkit global audio state, three-track predictive preloading for zero playback stutter, and integrated automated Stripe customer billing.",

  oasis:
    "During my Business Analytics internship at OASIS Infobyte, I engineered interactive Tableau KPI executive dashboards and automated SQL extraction pipelines, transforming multi-million row datasets to optimize stock turnover and identify key revenue drivers.",

  hire:
    "As a Full-Stack AI Engineer with an analytics degree from JAGSoM, I combine deep technical expertise in computer vision, agentic workflows, and cloud architecture with sharp business strategy. Having built twenty-nine verified software systems and earned forty-nine professional certifications, I can immediately step in to build and scale production AI applications for your team.",

  skills:
    "My technical foundation spans Full-Stack Engineering, Generative AI, and Business Analytics. I build production systems using TypeScript, React nineteen, Next.js, and Python, paired with FastAPI, PyTorch, LangChain, FAISS, and WebRTC on the AI side, alongside SQL, Tableau, and financial modeling for business impact."
};

/**
 * Transforms any AI-generated response into a clean, human-like, continuous paragraph spoken in the first person.
 */
export function synthesizeHumanSpokenResponse(query: string, rawAnswer: string): string {
  const combined = `${query} ${rawAnswer}`.toLowerCase();

  // 1. Check for flagship matches across both query and answer content
  if (combined.includes('procurax')) return PRESET_HUMAN_DIALOGUES.procurax;
  if (combined.includes('marketscope') || combined.includes('dupont') || combined.includes('valuation')) return PRESET_HUMAN_DIALOGUES.marketscope;
  if (combined.includes('proctorshield') || combined.includes('proctor')) return PRESET_HUMAN_DIALOGUES.proctorshield;
  if (combined.includes('research') || combined.includes('paper') || combined.includes('advisory') || combined.includes('investor') || combined.includes('pls-sem')) return PRESET_HUMAN_DIALOGUES.research;
  if (combined.includes('pdf') || combined.includes('chat with pdf')) return PRESET_HUMAN_DIALOGUES['chat-with-pdf'];
  if (combined.includes('nexspace')) return PRESET_HUMAN_DIALOGUES.nexspace;
  if (combined.includes('spotify')) return PRESET_HUMAN_DIALOGUES.spotify;
  if (combined.includes('oasis') || combined.includes('internship')) return PRESET_HUMAN_DIALOGUES.oasis;
  if (combined.includes('why hire') || combined.includes('hire parth') || combined.includes('role') || combined.includes('who are you') || combined.includes('about')) return PRESET_HUMAN_DIALOGUES.hire;
  if (combined.includes('skill') || combined.includes('tech stack') || combined.includes('technologies')) return PRESET_HUMAN_DIALOGUES.skills;

  // 2. Dynamic transformer for arbitrary answers:
  // Convert 3rd-person prose, strip lists and bullets, and construct a continuous 1st-person paragraph
  let text = rawAnswer;

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');

  // Remove markdown headers
  text = text.replace(/#{1,6}\s+[^\n]+/g, '');

  // Remove bold / italics
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');

  // Convert bullet points to clean sentences
  text = text.replace(/^\s*[-*•]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');

  // Strip URLs and markdown links
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/https?:\/\/\S+/g, '');

  // Convert third-person to natural first-person
  text = text.replace(/\bParth Ahuja is\b/gi, 'I am');
  text = text.replace(/\bParth Ahuja has\b/gi, 'I have');
  text = text.replace(/\bParth Ahuja\b/gi, 'I');
  text = text.replace(/\bParth is\b/gi, 'I am');
  text = text.replace(/\bParth has\b/gi, 'I have');
  text = text.replace(/\bParth built\b/gi, 'I built');
  text = text.replace(/\bParth engineered\b/gi, 'I engineered');
  text = text.replace(/\bParth holds\b/gi, 'I hold');
  text = text.replace(/\bParth developed\b/gi, 'I developed');
  text = text.replace(/\bParth\b/gi, 'I');
  text = text.replace(/\bParth's\b/gi, 'my');
  text = text.replace(/\bHis\b/g, 'My');
  text = text.replace(/\bhis\b/g, 'my');
  text = text.replace(/\bHe has\b/g, 'I have');
  text = text.replace(/\bhe has\b/g, 'I have');
  text = text.replace(/\bHe is\b/g, 'I am');
  text = text.replace(/\bhe is\b/g, 'I am');
  text = text.replace(/\bHe\b/g, 'I');
  text = text.replace(/\bhe\b/g, 'I');
  text = text.replace(/\bHim\b/g, 'Me');
  text = text.replace(/\bhim\b/g, 'me');

  // Break into clean sentences
  const rawSentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && !s.startsWith('http') && !s.includes('|'));

  if (rawSentences.length === 0) {
    return "I have engineered twenty-nine verified systems across Generative AI, Full-Stack applications, and Business Analytics. Feel free to explore my projects or ask me about any specific technical design.";
  }

  // Take the top 2-3 most substantial sentences
  const selectedSentences = rawSentences.slice(0, 3);
  let humanParagraph = selectedSentences.join(' ');

  // Clean excess whitespace
  humanParagraph = humanParagraph.replace(/\s+/g, ' ').trim();

  return humanParagraph;
}
