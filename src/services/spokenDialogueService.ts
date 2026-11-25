/**
 * Spoken Dialogue Synthesizer
 * Converts AI technical RAG responses into smooth, first-person,
 * continuous human-like paragraphs as if Parth is personally speaking.
 */

// Curated high-impact spoken executive summaries for Parth's flagship achievements
const PRESET_HUMAN_DIALOGUES: Record<string, string> = {
  procurax:
    "In ProcuraX, I engineered an autonomous multi-agent AI procurement engine to solve complex multi-tier supply chain disruptions. I built it to automatically optimize bills of materials, forecast supplier risks, and simulate real-time inventory buffers. This cut procurement lead times by forty percent and achieved ninety-nine point four percent accuracy.",

  proctorshield:
    "For ProctorShield, I developed an edge-computed AI invigilation platform using WebRTC and multi-task neural networks. It performs real-time face verification, head-pose tracking, and acoustic anomaly detection at sub-one-hundred-forty millisecond latency, successfully maintaining high-integrity oversight for over a thousand simultaneous test-takers.",

  research:
    "My empirical research paper analyzes what drives Indian retail investors to adopt AI-powered robo-advisory platforms. By analyzing hundreds of retail investors through structural equation modeling and UTAUT2 frameworks, I identified that algorithmic transparency and performance expectancy are the primary catalysts for investor trust. You can read and download my complete published paper right here in the research section.",

  paper:
    "My empirical research paper analyzes what drives Indian retail investors to adopt AI-powered robo-advisory platforms. By analyzing hundreds of retail investors through structural equation modeling and UTAUT2 frameworks, I proved that algorithmic transparency and performance expectancy are the primary drivers of user trust. You can read and download my complete published paper right here in the research section.",

  "chat-with-pdf":
    "With Chat with PDF, I built an enterprise-grade retrieval-augmented generation engine powered by LangChain and FAISS vector search. It parses, chunks, and vectorizes hundred-page complex reports in just over three seconds, guaranteeing cited, zero-hallucination answers.",

  nexspace:
    "NexSpace is a high-performance modern social platform I built using the Next.js App Router and TypeScript. I architected optimistic client-side UI mutations and edge routing that delivered sub-sixty-five millisecond responses and a ninety-eight out of one hundred Lighthouse score.",

  spotify:
    "In my Spotify Enterprise project, I engineered a high-fidelity streaming architecture featuring Redux Toolkit global audio state, three-track predictive preloading for zero playback stutter, and integrated automated Stripe customer billing.",

  oasis:
    "During my Business Analytics internship at OASIS Infobyte, I engineered interactive Tableau KPI executive dashboards and automated SQL extraction pipelines, transforming multi-million row datasets into clear, actionable revenue and operational decisions.",

  hire:
    "As a Full-Stack AI Engineer with an analytics degree from JAGSoM, I combine deep technical expertise in computer vision, agentic workflows, and cloud architecture with sharp business strategy. Having built twenty-nine verified software systems and earned forty-nine professional certifications, I can immediately build and scale end-to-end production AI applications for your team.",

  skills:
    "My technical foundation spans Full-Stack Engineering, Generative AI, and Business Analytics. I build production systems using TypeScript, React, Next.js, and Python, paired with PyTorch, LangChain, FAISS, and WebRTC on the AI side, alongside SQL, Tableau, and financial modeling for business impact."
};

/**
 * Transforms any AI-generated response into a clean, human-like, continuous paragraph spoken in the first person.
 */
export function synthesizeHumanSpokenResponse(query: string, rawAnswer: string): string {
  const qLower = query.toLowerCase();

  // 1. Check for flagship matches
  if (qLower.includes('procurax')) return PRESET_HUMAN_DIALOGUES.procurax;
  if (qLower.includes('proctorshield') || qLower.includes('proctor')) return PRESET_HUMAN_DIALOGUES.proctorshield;
  if (qLower.includes('research') || qLower.includes('paper') || qLower.includes('advisory') || qLower.includes('investor')) return PRESET_HUMAN_DIALOGUES.research;
  if (qLower.includes('pdf') || qLower.includes('chat with pdf')) return PRESET_HUMAN_DIALOGUES['chat-with-pdf'];
  if (qLower.includes('nexspace')) return PRESET_HUMAN_DIALOGUES.nexspace;
  if (qLower.includes('spotify')) return PRESET_HUMAN_DIALOGUES.spotify;
  if (qLower.includes('oasis') || qLower.includes('internship')) return PRESET_HUMAN_DIALOGUES.oasis;
  if (qLower.includes('why hire') || qLower.includes('hire parth') || qLower.includes('role') || qLower.includes('who are you')) return PRESET_HUMAN_DIALOGUES.hire;
  if (qLower.includes('skill') || qLower.includes('tech stack') || qLower.includes('technologies')) return PRESET_HUMAN_DIALOGUES.skills;

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

  // Convert bullet points to simple commas or drop bullets
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

  // Add a polite, confident close if short
  if (humanParagraph.length < 120) {
    humanParagraph += " Feel free to explore the architecture in my projects section or ask me more details.";
  }

  return humanParagraph;
}
