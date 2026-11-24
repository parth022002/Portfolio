import { PORTFOLIO_DATA } from './portfolioData';
import { COMPLETED_PROJECTS } from './projectsData';

export interface RAGDocumentChunk {
  id: string;
  category: 'bio' | 'project' | 'research' | 'experience' | 'skills' | 'education' | 'hire_me';
  title: string;
  keywords: string[];
  content: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export const RAG_KNOWLEDGE_CORPUS: RAGDocumentChunk[] = [
  // 1. BIO & PROFESSIONAL SUMMARY
  {
    id: 'parth-bio-overview',
    category: 'bio',
    title: 'Parth Ahuja — Profile, Target Roles & Value Proposition',
    keywords: ['parth ahuja', 'bio', 'who is', 'about', 'roles', 'background', 'summary', 'location', 'hire'],
    content: `Parth Ahuja is a Full-Stack AI Engineer and Business Analytics Strategist based in Bengaluru, India.
He bridges high-performance systems engineering (Python, FastAPI, LangGraph, React 19, Next.js, PyTorch, OpenCV) with quantitative data-driven product strategy.
He holds a dual background: a Post Graduate Diploma in Management (PGDM) in Business Analytics from Jagdish Sheth School of Management (JAGSoM, Bengaluru) and a Bachelor of Engineering (B.E.) in Computer Engineering.
Parth has architected and verified 29 production-grade engineering and analytics systems spanning Agentic AI decision intelligence, real-time computer vision exam invigilation, quantitative investment valuation models, and high-throughput web platforms.
He is open to full-time engineering and product roles worldwide (Onsite, Hybrid, and Remote in Bengaluru, India, or global relocation).
Email: parth022002@gmail.com | LinkedIn: https://www.linkedin.com/in/parth--ahuja/ | GitHub: https://github.com/parth022002 | Linktree: https://linktr.ee/parthahuja`,
    sourceUrl: 'https://www.linkedin.com/in/parth--ahuja/',
    sourceLabel: 'Parth Ahuja LinkedIn Profile'
  },

  // 2. ACADEMIC RESEARCH PAPER
  {
    id: 'research-paper-ai-advisory',
    category: 'research',
    title: 'Empirical Research Paper: Understanding AI Advisory Adoption Among Indian Retail Investors',
    keywords: ['research paper', 'study', 'ai advisory', 'robo advisory', 'retail investors', 'tam', 'utaut2', 'pls-sem', 'econometrics', 'trust', 'social influence', 'jagsom', 'fintech'],
    content: `Title: Understanding AI Advisory Adoption Among Indian Retail Investors: Evidence From Trust, Social Influence, and Risk Perceptions.
Authors: Parth Ahuja (Corresponding & Primary Author), Ishika Gupta, Shubham Jaiswal, Priyal Lahoti, Aditya Parashar, Rishu Raj.
Supervisor: Prof. Pooja Gupta | Institution: Jagdish Sheth School of Management (JAGSoM), Bengaluru.
Theoretical Framework: Synthesizes Technology Acceptance Model (TAM), Unified Theory of Acceptance and Use of Technology (UTAUT2), Trust Theory, and Risk Perception Theory.
Dataset & Sample: Empirical survey of 211 Indian retail investors across Tier-1, Tier-2, and metropolitan financial hubs; 147 active algorithmic/AI advisory platform users.
Methodology: Partial Least Squares Structural Equation Modeling (PLS-SEM) with 5,000 bootstrap resamples, backed by OLS Regression (F(6,140) = 139.7, p < 0.001) and Variance Accounted For (VAF) mediation testing.
Key Quantitative Findings:
1. Social Influence is the single dominant driver of adoption (β = 0.489, p < 0.001, t = 9.17), heavily overshadowing individual effort expectancy.
2. Trust in AI acts as an 80.5% full mediator between Perceived Usefulness and Behavioral Intention—proving that technological utility alone fails to drive adoption without institutional and algorithmic credibility.
3. Substantial explanatory power: R² = 0.856 (85.6% variance in adoption intention explained), significantly outperforming benchmark literature (e.g. Tai & Ku R² = 0.694).
4. Psychometric validity: Cronbach's α ≥ 0.901, Composite Reliability ≥ 0.902, SRMR = 0.048, and Statistical Power = 0.995.
Strategic Implication: FinTech robo-advisors must pivot from feature-centric marketing to community endorsement, algorithmic explainability, and verifiable fiduciary safeguards.`,
    sourceUrl: '/Research Paper/Understanding AI Advisory Adoption Among Indian Retail Investors.pdf',
    sourceLabel: 'Download Full Research Paper (PDF)'
  },

  // 3. FLAGSHIP 1: PROCURAX
  {
    id: 'project-procurax',
    category: 'project',
    title: 'ProcuraX — Agentic AI for Supply Chain & Procurement Decision Intelligence',
    keywords: ['procurax', 'agentic ai', 'supply chain', 'procurement', 'langgraph', 'fastapi', 'bom', 'disruption', 'decision intelligence', 'neon postgres', 'flagship'],
    content: `ProcuraX is Parth's Level 1 Flagship Agentic AI platform transforming enterprise supply chain resilience into autonomous decision intelligence.
Problem: Enterprise ERPs are passive record-keepers that trigger alerts only after inventory stockouts occur and factory production lines halt during geopolitical, weather, or supplier disruptions.
Solution Architecture:
- External shock ingestion worker polling real-time market and trade disruption feeds (GDELT, Marketaux, SEC 10-K/Q filings).
- Predictive disruption scoring model quantifying multi-tier Bill-of-Materials (BOM) inventory runway exposures.
- Constraint optimization engine that balances supplier switching costs against catastrophic line-down penalties ($100k+/hr).
- Hybrid RAG document verification cross-referencing supplier contracts and force majeure clauses.
- Cryptographic human-in-the-loop approval workflow generating immutable, auditable mitigation action packets.
Tech Stack: Python, FastAPI (ASGI), LangGraph multi-agent state graphs, Neon Serverless PostgreSQL, Hybrid RAG, React 19, TypeScript, Tailwind CSS.
Key Metrics: 99.4% disruption signal ingestion recall, < 1.4s optimization solve time, 100% auditable mitigation packets.
Live Demo: https://procurax-five.vercel.app/ | GitHub: https://github.com/parth022002/ProcuraX`,
    sourceUrl: 'https://procurax-five.vercel.app/',
    sourceLabel: 'ProcuraX Live Application'
  },

  // 4. FLAGSHIP 2: MARKETSCOPE.IO
  {
    id: 'project-marketscope',
    category: 'project',
    title: 'MarketScope.io — AI-Powered Multi-Asset Investment Research & Decision Support',
    keywords: ['marketscope', 'investment research', 'fintech', 'valuation', 'dupont', 'quantitative', 'stocks', 'financial modeling', 'tradingview', 'flagship'],
    content: `MarketScope.io is Parth's Level 1 Flagship quantitative investment intelligence platform serving retail and family office equity researchers.
Problem: Financial analysts waste 15+ hours per equity idea manually aggregating SEC filings, computing ratios, deconstructing ROE, and scraping sentiment across fragmented portals.
Solution Architecture:
- Institutional scoring engine computing a normalized 0-100 score across 4 pillars: Fundamental Quality (35%), Growth Momentum (25%), Technical Trend (20%), and Market Sentiment (20%).
- DuPont Analysis module performing 3-stage and 5-stage Return on Equity (ROE) decomposition (tax burden, interest burden, EBIT margin, asset turnover, financial leverage).
- Automated DCF valuation models, peer multiple comps (P/E, EV/EBITDA, P/FCF), interactive TradingView chart widgets, and real-time news sentiment.
- Virtual paper portfolio simulator with zero-capital risk testing.
Tech Stack: React 19, TypeScript, Node.js, Financial Modeling APIs, Chart.js, Tailwind CSS, Vercel Serverless.
Live Demo: https://marketscope-two.vercel.app/ | GitHub: https://github.com/parth022002/MarketScope.io`,
    sourceUrl: 'https://marketscope-two.vercel.app/',
    sourceLabel: 'MarketScope.io Live Platform'
  },

  // 5. FLAGSHIP 3: PROCTORSHIELD
  {
    id: 'project-proctorshield',
    category: 'project',
    title: 'ProctorShield — Real-Time Remote Exam Proctoring & Computer Vision Invigilation',
    keywords: ['proctorshield', 'computer vision', 'proctoring', 'exam integrity', 'opencv', 'mediapipe', 'webrtc', 'tensorflow', 'gaze tracking', 'face verification', 'flagship'],
    content: `ProctorShield is a Level 1 AI exam invigilation system delivering real-time academic integrity verification for distributed remote examinations.
Problem: Remote online examinations suffer from rampant impersonation, unauthorized physical resources, audio coaching, and multi-person collusion.
Technical Architecture:
- Real-time client-side edge computer vision inference running OpenCV and MediaPipe facial mesh models.
- Continuous multi-face detection, head-pose estimation (yaw, pitch, roll), and 3D gaze vector tracking to detect off-screen glances.
- Acoustic spectral analysis flagging ambient human speech frequencies while suppressing mechanical keyboard clicks.
- Sub-140ms edge inference with automated anomaly logging into an immutable tamper-evident examination timeline.
Tech Stack: Python, PyTorch, OpenCV, MediaPipe, WebRTC low-latency streaming, FastAPI, React, SQLite/PostgreSQL.
Key Metrics: 99.2% precision automated malpractice detection, sub-140ms edge latency, evaluated across 1,000+ test-taker simulations.
GitHub: https://github.com/parth022002/ProctorShield`,
    sourceUrl: 'https://github.com/parth022002/ProctorShield',
    sourceLabel: 'ProctorShield GitHub Repository'
  },

  // 6. FLAGSHIP 4: DOCUMIND AI
  {
    id: 'project-documind',
    category: 'project',
    title: 'DocuMind AI — Enterprise Multi-Document RAG Knowledge Engine & Vector Search',
    keywords: ['documind', 'rag', 'genai', 'vector database', 'langchain', 'faiss', 'pdf', 'document intelligence', 'embeddings'],
    content: `DocuMind AI is an enterprise-grade Retrieval-Augmented Generation (RAG) platform that ingests, parses, chunks, and semantically vectorizes dense technical documents, financial disclosures, and legal filings.
Capabilities:
- Dynamic PDF, Word, and text document chunking with metadata preservation.
- Dense semantic vector embeddings stored in FAISS / ChromaDB with cosine similarity search.
- LLM response generation with strict source citation (exact page numbers and paragraph excerpts), eliminating hallucination.
- Sub-3.2s end-to-end latency for parsing 100+ page complex PDFs.
Tech Stack: Python, LangChain, FAISS, Hugging Face Sentence Transformers, FastAPI, Streamlit / React.
GitHub: https://github.com/parth022002`,
    sourceUrl: 'https://github.com/parth022002',
    sourceLabel: 'Parth Ahuja GitHub'
  },

  // 7. FLAGSHIP 5: NOTCH
  {
    id: 'project-notch',
    category: 'project',
    title: 'Notch — Real-Time High-Throughput Social Network & Forum Engine',
    keywords: ['notch', 'social network', 'next.js', 'real-time', 'websockets', 'redis', 'full stack', 'forum'],
    content: `Notch is a high-throughput social collaboration and community discussion platform built with modern full-stack web standards.
Architecture:
- Next.js 14 App Router with Server Components for zero-bundle initial page delivery.
- Real-time live messaging and discussion thread updates via WebSockets and Redis Pub/Sub.
- Optimistic UI state mutations delivering sub-65ms perceived latency for posts, likes, and comment trees.
- Role-based security, cryptographic JWT authentication, and image asset pipeline with Cloudinary.
Tech Stack: Next.js 14, React 18, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL, Redis, Pusher WebSockets.
GitHub: https://github.com/parth022002`,
    sourceUrl: 'https://github.com/parth022002',
    sourceLabel: 'Parth Ahuja GitHub'
  },

  // 8. FLAGSHIP 6: SHOESAVVY
  {
    id: 'project-shoesavvy',
    category: 'project',
    title: 'ShoeSavvy — Modern AI-Enhanced Digital Commerce & High-Conversion Retail Engine',
    keywords: ['shoesavvy', 'ecommerce', 'retail', 'stripe', 'react', 'tailwind', 'conversion'],
    content: `ShoeSavvy is a modern digital commerce platform engineered for high conversion, sub-second product filtering, and seamless checkout flows.
Features:
- Instant client-side multifaceted faceted search (brand, price, size, color) with zero re-render lag.
- Fully integrated shopping cart with persistent localStorage state and Stripe payment gateway.
- Responsive mobile-first UI with accessible interactive galleries and rating breakdowns.
Tech Stack: React, TypeScript, Tailwind CSS, Node.js, Express, Stripe API.
GitHub: https://github.com/parth022002`,
    sourceUrl: 'https://github.com/parth022002',
    sourceLabel: 'Parth Ahuja GitHub'
  },

  // 9. FLAGSHIP 7: LAWLAB
  {
    id: 'project-lawlab',
    category: 'project',
    title: 'LawLab — LegalTech Document Intelligence & Automated Contract Risk Platform',
    keywords: ['lawlab', 'legaltech', 'contract analysis', 'risk detection', 'nlp', 'legal ai'],
    content: `LawLab is an AI-driven LegalTech platform designed to accelerate contract review, identify high-risk indemnification clauses, and flag compliance anomalies.
Capabilities:
- Automated contract clause extraction (liability caps, termination, IP rights, non-compete).
- Red-flag risk scoring engine highlighting predatory or non-standard contractual terms.
- Plain-English summarization translating complex legalese into executive decision points.
Tech Stack: Python, NLP, Spacy, Transformers, FastAPI, React, Tailwind CSS.
GitHub: https://github.com/parth022002`,
    sourceUrl: 'https://github.com/parth022002',
    sourceLabel: 'Parth Ahuja GitHub'
  },

  // 10. ACADEMIC CAPSTONE: CANTEEN WASTAGE OPTIMIZATION
  {
    id: 'capstone-canteen-wastage',
    category: 'experience',
    title: 'Business Analytics Capstone: College Canteen Wastage & Supply Optimization',
    keywords: ['canteen', 'wastage', 'operations', 'inventory', 'eoq', 'brd', 'jagsom', 'business analytics', 'food waste'],
    content: `Conducted at Jagdish Sheth School of Management (JAGSoM).
Project: College Canteen Inventory, Sales & Wastage Optimization System.
Overview: AS-IS operational flow audit of daily meal prep and ingredient spoilage. Identified ₹3.96 Lakh annual preventable perishable waste.
Deliverables:
- Comprehensive Business Requirements Document (BRD) and optimized TO-BE operational workflows.
- Economic Order Quantity (EOQ) inventory replenishment models aligned to weekly student meal attendance patterns.
- Executive KPI dashboard in Excel/Tableau tracking spoilage rates, inventory turnover, and daily cost per meal.
- Targeted >= 50% food waste reduction through streamlined 3-tier vendor replenishment controls.`,
    sourceUrl: 'https://www.linkedin.com/in/parth--ahuja/',
    sourceLabel: 'Parth Ahuja LinkedIn'
  },

  // 11. ACADEMIC CAPSTONE: BENGALURU METRO QUEUE ANALYSIS
  {
    id: 'capstone-metro-queue',
    category: 'experience',
    title: 'Operations Research: Bengaluru Metro Yellow Line Queue & Crowd Management',
    keywords: ['metro', 'bengaluru', 'yellow line', 'queue', 'crowd management', 'electronic city', 'operations research', 'throughput'],
    content: `Conducted at Jagdish Sheth School of Management (JAGSoM).
Project: Analysis of Queue & Crowd Management System in Bengaluru Metro Yellow Line (Electronic City Station).
Overview: Observational peak-hour passenger throughput audit across ticket counters, security frisking checkpoints, and platform dwell intervals.
Recommendations:
- Proposed digital QR and NFC ticketing adoption to cut ticket counter queues by 60%.
- Designed optimized physical serpentine queue layouts and dynamic peak-hour turnstile reallocation.
- Projected a 35% reduction in train dwell bottlenecks and 40% passenger queue time reduction with 100% capacity-demand compliance.`,
    sourceUrl: 'https://www.linkedin.com/in/parth--ahuja/',
    sourceLabel: 'Parth Ahuja LinkedIn'
  },

  // 12. INTERNSHIP: OASIS INFOBYTE
  {
    id: 'internship-oasis-infobyte',
    category: 'experience',
    title: 'OASIS Infobyte — Data Analytics Intern',
    keywords: ['oasis infobyte', 'internship', 'data analytics', 'tableau', 'sql', 'python', 'kpi dashboards', 'eda'],
    content: `Role: Data Analytics Intern at OASIS Infobyte.
Key Contributions:
- Conducted Exploratory Data Analysis (EDA) on structured datasets using Python (Pandas, NumPy, Matplotlib, Seaborn) and SQL.
- Designed and deployed interactive executive KPI dashboards in Tableau and Power BI tracking business health metrics, customer churn, and sales trends.
- Cleaned, normalized, and validated messy multi-source data pipelines, improving query latency and reporting reliability.
- Presented data-driven analytical insights to team leads to guide strategic operational decisions.`,
    sourceUrl: 'https://www.linkedin.com/in/parth--ahuja/',
    sourceLabel: 'Parth Ahuja Experience'
  },

  // 13. EDUCATION & CREDENTIALS
  {
    id: 'education-and-degrees',
    category: 'education',
    title: 'Education, Degrees & Academic Trajectory',
    keywords: ['education', 'degree', 'jagsom', 'bachelor of engineering', 'pgdm', 'business analytics', 'computer engineering', 'college', 'university'],
    content: `Parth Ahuja holds a dual interdisciplinary academic foundation:
1. Post Graduate Diploma in Management (PGDM) in Business Analytics:
   - Institution: Jagdish Sheth School of Management (JAGSoM), Bengaluru, India.
   - Focus: Quantitative Decision Intelligence, Econometrics, Predictive Modeling, FinTech Strategy, Big Data Analytics, Operations Research.
2. Bachelor of Engineering (B.E.) in Computer Engineering:
   - Focus: Data Structures & Algorithms, Distributed Systems, Database Management Systems (RDBMS & NoSQL), Artificial Intelligence, Computer Vision, Software Engineering.
This unique combination enables Parth to speak both languages fluently: technical system architecture and executive business ROI.`,
    sourceUrl: 'https://www.linkedin.com/in/parth--ahuja/',
    sourceLabel: 'Parth Ahuja LinkedIn'
  },

  // 14. TECHNICAL SKILLS & STACK INVENTORY
  {
    id: 'skills-technical-inventory',
    category: 'skills',
    title: 'Technical Skills, Frameworks, Libraries & Tools',
    keywords: ['skills', 'tech stack', 'python', 'fastapi', 'langgraph', 'langchain', 'react', 'next.js', 'typescript', 'pytorch', 'opencv', 'sql', 'docker', 'rag'],
    content: `Comprehensive technical competency inventory:
- Programming Languages: Python, TypeScript, JavaScript, SQL, HTML5, CSS3.
- AI, Machine Learning & GenAI: LangGraph (Agentic Workflows), LangChain, RAG (Retrieval-Augmented Generation), PyTorch, TensorFlow, OpenCV, MediaPipe, Sentence Transformers, Hugging Face, FAISS, ChromaDB.
- Web & Frontend: React 19, Next.js 14 (App Router), Tailwind CSS, Framer Motion, HTML5, WebSockets, WebRTC.
- Backend & Cloud Systems: FastAPI (ASGI), Node.js, Express, REST APIs, Microservices Architecture, Neon Serverless PostgreSQL, Supabase, Prisma ORM, MongoDB, Redis, Docker, Vercel, Railway.
- Business Analytics & Data Science: Econometric Modeling, PLS-SEM (SmartPLS), Tableau, Power BI, Advanced Excel (Financial Modeling, PivotTables, Solver), Pandas, NumPy, Scikit-Learn.
- Methodologies: Agile/Scrum, Business Requirements Documents (BRD), System Architecture Design, Test-Driven Development, CI/CD Pipelines.`,
    sourceUrl: 'https://github.com/parth022002',
    sourceLabel: 'Parth Ahuja GitHub'
  },

  // 15. CERTIFICATIONS
  {
    id: 'certifications-overview',
    category: 'skills',
    title: '49+ Verified Professional Certifications',
    keywords: ['certifications', 'certificates', 'credentials', 'microsoft', 'google', 'linkedin', 'hackerrank', 'tata', 'coursera'],
    content: `Parth has earned 49+ verified professional certifications across 4 core domains:
1. AI & Generative AI: Career Essentials in Generative AI by Microsoft and LinkedIn, AI Appreciate by Intel, Generative AI for Engineers.
2. Data Analytics & Business Intelligence: Tata Data Visualisation: Empowering Business with Effective Insights, Google Analytics for Beginners, Digital Marketing by Google, Advanced SQL, Python Basic by HackerRank.
3. Software Engineering: Software Engineer Certificate by HackerRank, Career Essentials in Software Development by Microsoft and LinkedIn, CSS Basics, 100 Days Coding Series Challenge.
4. Professional & Leadership: Passport to Communication Skills, Agility in Product Strategy.
All certificates are verified and showcased in the portfolio's dedicated interactive certificates section.`,
    sourceUrl: '#certificates',
    sourceLabel: 'Certificates Section in Portfolio'
  },

  // 16. WHY HIRE PARTH
  {
    id: 'why-hire-parth',
    category: 'hire_me',
    title: 'Why Hire Parth Ahuja? Key Differentiators for Engineering & Product Leaders',
    keywords: ['why hire', 'interview', 'hire me', 'strengths', 'value', 'leadership', 'differentiator', 'full stack ai engineer', 'product strategist'],
    content: `Why Parth Ahuja is an exceptional hire for High-Impact AI, Full-Stack Engineering, and Product Analytics teams:
1. Rare Dual Competency: Unlike pure software developers who lack financial business context, or pure business analysts who cannot code production systems, Parth bridges both. He writes production FastAPI/React/LangGraph code AND writes executive BRDs, econometric models, and unit economics analyses.
2. Proven Builder Track Record: He has shipped 29 verified systems, with 20 live production demos and 27 open-source GitHub repositories.
3. Rigorous Research Foundation: He is the lead author of an empirical FinTech research paper on AI advisory adoption with validated PLS-SEM modeling (R² = 85.6%).
4. Production-Grade Execution: All projects feature clean architectures, sub-150ms latencies, type safety (TypeScript, Pydantic), automated CI/CD, and responsive user experiences.
5. Immediate Availability: Ready to join high-caliber teams in Bengaluru, hybrid, or remote globally.`,
    sourceUrl: '#contact',
    sourceLabel: 'Contact Parth Directly'
  }
];
