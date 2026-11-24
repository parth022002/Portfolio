import { PORTFOLIO_DATA, Project } from './portfolioData';

export interface CopilotResponse {
  text: string;
  suggestedFollowUps: string[];
  sourceLink?: { label: string; url: string };
}

export function getGroundedCopilotAnswer(
  query: string,
  preloadedProject?: Project | null
): CopilotResponse {
  const q = query.trim().toLowerCase();

  // If there's a preloaded project from user context
  if (preloadedProject && (q.includes('this project') || q.includes('it') || q.includes('architecture') || q.includes('impact') || q.includes('stack') || q.includes('metrics'))) {
    return {
      text: `**${preloadedProject.title}** (${preloadedProject.tagline})\n\n` +
        `• **Business Impact:** ${preloadedProject.businessImpact}\n` +
        `• **Architecture:** ${preloadedProject.solutionArchitecture}\n` +
        `• **Tech Stack:** ${preloadedProject.techStack.join(', ')}\n` +
        `• **Key Metrics:** ${preloadedProject.keyMetrics.map(m => `${m.label}: ${m.value}`).join(' | ')}`,
      suggestedFollowUps: [
        `What problem does ${preloadedProject.title} solve?`,
        'What other projects has Parth built?',
        "What are Parth's core technical skills?"
      ],
      sourceLink: preloadedProject.githubUrl
        ? { label: `View ${preloadedProject.title} on GitHub`, url: preloadedProject.githubUrl }
        : undefined
    };
  }

  // 1. SPECIFIC PROJECTS
  // ProctorShield
  if (q.includes('proctor') || q.includes('shield') || q.includes('exam')) {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === 'proctorshield')!;
    return {
      text: `**ProctorShield** is Parth's flagship AI examination integrity system.\n\n` +
        `• **Business Impact:** Eliminates high-cost human invigilator overhead by automating exam fraud detection across 1,000+ simultaneous test-takers with tamper-proof audit trails.\n` +
        `• **AI & System Architecture:** Real-time WebRTC media streams processed via quantized TensorFlow and OpenCV neural networks for head-pose estimation, multi-face verification, and audio anomaly detection with SQLite audit logging.\n` +
        `• **Key Metrics:** Sub-140ms detection latency, 99.2% face anomaly precision, and 45% bandwidth optimization.\n` +
        `• **Tech Stack:** Python, Flask, TensorFlow, OpenCV, WebRTC, TailwindCSS, SQLite.`,
      suggestedFollowUps: [
        'Tell me about NexSpace',
        'Tell me about Chat with PDF',
        "What is Parth's research paper on ProctorShield?"
      ],
      sourceLink: { label: 'Explore ProctorShield Repository', url: p.githubUrl || 'https://github.com/parth022002/ProctorShield' }
    };
  }

  // NexSpace
  if (q.includes('nexspace') || q.includes('social') || q.includes('community')) {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === 'nexspace')!;
    return {
      text: `**NexSpace** is a high-performance modern social platform built on Next.js App Router.\n\n` +
        `• **Business Impact:** Engineered for viral community engagement, instant media sharing, and frictionless micro-community interactions with sub-100ms render speeds.\n` +
        `• **Architecture:** Hybrid Static & Server-Rendered Next.js with optimistic client UI updates, JWT authentication, and edge asset caching on Vercel.\n` +
        `• **Key Metrics:** 98/100 Google Lighthouse performance score, 0.6s First Contentful Paint (FCP), and sub-65ms edge response latency.\n` +
        `• **Tech Stack:** Next.js, React, TypeScript, TailwindCSS, Framer Motion, Vercel.`,
      suggestedFollowUps: [
        'Tell me about ProctorShield',
        'Tell me about Spotify Clone',
        "What are Parth's frontend skills?"
      ],
      sourceLink: { label: 'Visit NexSpace Live Demo', url: p.liveUrl || 'https://nexspace.vercel.app/' }
    };
  }

  // Chat With PDF / RAG
  if (q.includes('pdf') || q.includes('chat with pdf') || q.includes('rag') || q.includes('vector') || q.includes('faiss') || q.includes('langchain')) {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === 'chat-with-pdf')!;
    return {
      text: `**Chat With PDF** is a context-grounded RAG (Retrieval-Augmented Generation) document intelligence system.\n\n` +
        `• **Business Impact:** Accelerates legal contract and complex document reviews from hours to seconds by querying 100+ page PDFs with exact citation verification.\n` +
        `• **Architecture:** PDF ingestion via PyPDF2 -> recursive character chunking -> OpenAI & HuggingFace vector embeddings -> FAISS similarity indexing -> grounded LLM synthesis with zero-hallucination guardrails.\n` +
        `• **Key Metrics:** Ingests 100 pages in 3.2 seconds, 100% grounded citations, sub-1.8s query response.\n` +
        `• **Tech Stack:** Python, Streamlit, LangChain, OpenAI API, FAISS vector search.`,
      suggestedFollowUps: [
        "What are Parth's Generative AI certifications?",
        'Tell me about EchoAssistant voice assistant',
        'How does Parth approach AI for business?'
      ],
      sourceLink: { label: 'View Chat With PDF on GitHub', url: p.githubUrl || 'https://github.com/parth022002/Chat-with-pdf' }
    };
  }

  // Spotify Clone
  if (q.includes('spotify') || q.includes('music') || q.includes('audio') || q.includes('stripe')) {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === 'spotify-clone')!;
    return {
      text: `**Spotify Enterprise Clone** is a full-scale music streaming and subscription platform.\n\n` +
        `• **Business Impact:** End-to-end commercial music platform with recurring Stripe subscription tiers, playlist management, and audio caching.\n` +
        `• **Architecture:** HTML5 Web Audio API wrapped in custom Redux Toolkit state controllers, relational schemas in PostgreSQL with Supabase row-level security (RLS), and Stripe webhook lifecycle sync.\n` +
        `• **Key Metrics:** Zero playback stutter, continuous 3-track predictive preload buffer, 100% idempotent Stripe webhooks.\n` +
        `• **Tech Stack:** Next.js, React, Redux Toolkit, PostgreSQL, Supabase, Stripe API, TailwindCSS.`,
      suggestedFollowUps: [
        'Tell me about TaskFlow',
        'Tell me about NexSpace',
        "What are Parth's database skills?"
      ],
      sourceLink: { label: 'Visit Spotify Clone Live Demo', url: p.liveUrl || 'https://spotify-music-for-me.vercel.app/' }
    };
  }

  // EchoAssistant / Voice Assistant
  if (q.includes('echo') || q.includes('voice') || q.includes('desktop') || q.includes('automation agent')) {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === 'echo-assistant')!;
    return {
      text: `**EchoAssistant** is a multimodal desktop voice assistant & OS automation agent.\n\n` +
        `• **Business Impact:** Automates repetitive daily workflows, application launches, system queries, and email drafting through natural voice commands.\n` +
        `• **Architecture:** Speech-to-text audio processing via PyAudio & SpeechRecognition -> NLP command dispatcher -> Eel framework WebSocket bridge connecting web UI to native Python OS automation APIs.\n` +
        `• **Key Metrics:** 96.8% voice recognition accuracy, sub-350ms command execution delay, 40+ supported OS tasks.\n` +
        `• **Tech Stack:** Python, Eel Framework, JavaScript, HTML5, SpeechRecognition, Pyttsx3.`,
      suggestedFollowUps: [
        'Tell me about ProctorShield',
        'Tell me about TaskFlow',
        "What are Parth's Python capabilities?"
      ],
      sourceLink: { label: 'View Voice Assistant on GitHub', url: p.githubUrl || 'https://github.com/parth022002/Voice-Assistant' }
    };
  }

  // TaskFlow / Kanban / MERN
  if (q.includes('taskflow') || q.includes('task') || q.includes('kanban') || q.includes('mern') || q.includes('agile sprint')) {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === 'taskflow')!;
    return {
      text: `**TaskFlow** is an enterprise cloud collaborative task platform.\n\n` +
        `• **Business Impact:** Improves cross-functional sprint velocity by 30% through clear milestone tracking, Kanban boards, and role-based access control (Admin, Manager, Member).\n` +
        `• **Architecture:** Node.js & Express REST API with indexed MongoDB aggregation pipelines, React drag-and-drop state transitions, and JWT security.\n` +
        `• **Key Metrics:** Sub-45ms task queries, supports 500+ active concurrent users.\n` +
        `• **Tech Stack:** MongoDB, Express.js, React, Node.js, JWT Auth, TailwindCSS.`,
      suggestedFollowUps: [
        'Tell me about ShoeSavvy',
        'Tell me about VChat',
        "What are Parth's project management credentials?"
      ],
      sourceLink: { label: 'View Task Manager on GitHub', url: p.githubUrl || 'https://github.com/parth022002/Task-Manager' }
    };
  }

  // ShoeSavvy / E-commerce / PHP MySQL
  if (q.includes('shoe') || q.includes('savvy') || q.includes('commerce') || q.includes('store')) {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === 'shoesavvy')!;
    return {
      text: `**ShoeSavvy** is a scalable full-stack footwear e-commerce engine.\n\n` +
        `• **Business Impact:** Frictionless digital storefront with dynamic multi-parameter filtering, ACID-compliant shopping cart, and relational inventory synchronization.\n` +
        `• **Architecture:** Normalized MySQL schema with indexing on brand and size, server-side session management with SQL injection safeguards and CSRF tokens.\n` +
        `• **Key Metrics:** Sub-1.2s page load speed, 3-step streamlined checkout, ACID-compliant transaction safety.\n` +
        `• **Tech Stack:** PHP, MySQL, JavaScript, HTML5, CSS3, Apache.`,
      suggestedFollowUps: [
        'Tell me about VChat',
        'Tell me about Spotify Clone',
        "What are Parth's database skills?"
      ],
      sourceLink: { label: 'Visit ShoeSavvy Storefront', url: p.liveUrl || 'https://shoesavvy.42web.io/' }
    };
  }

  // VChat / Video Calling
  if (q.includes('vchat') || q.includes('video call') || q.includes('conferenc') || q.includes('creart')) {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === 'vchat')!;
    return {
      text: `**VChat** is a peer-to-peer encrypted real-time video conferencing system developed during Parth's internship at CreArt Solutions.\n\n` +
        `• **Business Impact:** Empowers distributed enterprise teams with secure, zero-installation video conferences directly in any browser.\n` +
        `• **Architecture:** WebRTC RTCPeerConnection for direct peer-to-peer RTP media streaming, paired with PHP signaling endpoints, STUN/TURN NAT traversal, and dynamic room key generation.\n` +
        `• **Key Metrics:** Sub-80ms end-to-end P2P latency, adaptive jitter buffer, and dynamic bitrate adjustment.\n` +
        `• **Tech Stack:** WebRTC, PHP, JavaScript, HTML5, STUN/TURN.`,
      suggestedFollowUps: [
        'Tell me about the CreArt Solutions internship',
        'Tell me about ProctorShield',
        "What is Parth's background in WebRTC?"
      ],
      sourceLink: { label: 'View VChat Project Repository', url: p.githubUrl || 'https://github.com/parth022002/Internship' }
    };
  }

  // 2. OVERVIEW OF ALL PROJECTS
  if (q.includes('all projects') || q.includes('projects list') || q.includes('what projects') || q.includes('portfolio work') || q.includes('what has he built') || q.includes('show me his work') || q.includes('best projects')) {
    return {
      text: `Parth has architected **14+ production-ready systems** across AI, full-stack web, and real-time data:\n\n` +
        `1. **ProctorShield:** AI-powered online exam integrity system (<140ms latency, 99.2% precision, WebRTC + TensorFlow).\n` +
        `2. **NexSpace:** High-performance social network (Next.js, 98/100 Lighthouse, <65ms edge latency).\n` +
        `3. **Chat With PDF:** Context-grounded RAG system (LangChain, FAISS, zero-hallucination citations).\n` +
        `4. **Spotify Enterprise Clone:** Full audio streaming app with Redux and recurring Stripe payments.\n` +
        `5. **EchoAssistant:** Multimodal desktop voice automation assistant (Python, Eel, 96.8% accuracy).\n` +
        `6. **TaskFlow:** Agile collaborative Kanban sprint manager (MERN stack, JWT, RBAC).\n` +
        `7. **ShoeSavvy:** Relational footwear e-commerce engine (PHP, MySQL, ACID checkout).\n` +
        `8. **VChat:** Encrypted P2P video conferencing platform (WebRTC, PHP signaling, <80ms latency).`,
      suggestedFollowUps: [
        'What is ProctorShield?',
        'Tell me about Chat With PDF',
        "What is Parth's business analytics experience?"
      ]
    };
  }

  // 3. BUSINESS ANALYST / BUSINESS ANALYTICS / STRATEGY / ROI / BA
  if (q.includes('business analyst') || q.includes('business analytics') || q.includes('analytics') || q.includes('ba ') || q.includes(' ba') || q.includes('roi') || q.includes('kpi') || q.includes('requirements') || q.includes('stakeholder') || q.includes('product analyst') || q.includes('data analyst')) {
    return {
      text: `Parth specializes in **translating messy data and complex AI into executive decisions businesses can act on**:\n\n` +
        `• **Education:** Currently pursuing PGDM in Business Analytics at JAGSoM (2025–2027), paired with a B.E. in Computer Science (GTU, 2024).\n` +
        `• **Core Analytics Toolkit:** Python (Pandas, NumPy, Scikit-learn), SQL (PostgreSQL, MySQL), Tableau, Microsoft Excel (advanced modeling, pivot tables, VLOOKUP/XLOOKUP), Power BI, LangGraph, RAG.\n` +
        `• **BA Capabilities:** Requirements gathering (BRD/PRD), KPI framework definition, user story mapping, acceptance criteria, Agile sprint ceremonies, cross-functional stakeholder alignment, process automation.\n` +
        `• **Domain Knowledge:** Operations analytics, supply chain optimization (inventory turnover, demand forecasting, procurement risk), and product telemetry analytics.\n` +
        `• **Hands-on Proof:** At OASIS Infobyte, cleaned 5+ datasets (10,000+ records) and created executive Tableau KPI dashboards that replaced manual data pulls with decision-ready views.`,
      suggestedFollowUps: [
        'Tell me about the OASIS Infobyte internship',
        'What are his SQL and Tableau capabilities?',
        'What certifications does Parth have?'
      ]
    };
  }

  // 4. WORK EXPERIENCE & INTERNSHIPS
  // Oasis Infobyte
  if (q.includes('oasis') || q.includes('infobyte')) {
    const exp = PORTFOLIO_DATA.journey.experience.find(e => e.id.includes('oasis'))!;
    return {
      text: `**Data Analytics Intern @ OASIS INFOBYTE** (Feb 2026 – Mar 2026 | Remote):\n\n` +
        `• Cleaned and analyzed 5+ datasets (10,000+ records) using Python, SQL, and Excel to uncover operational trends and anomalies.\n` +
        `• Built interactive Tableau dashboards and automated Excel reports to track organizational KPIs, replacing manual data pulls with decision-ready executive views.\n` +
        `• Pinpointed workflow bottlenecks and presented structured process optimization and automation recommendations to guide non-technical leadership decisions.\n` +
        `• **Skills Applied:** Python, SQL, Tableau, Microsoft Excel, KPI Reporting, Process Optimization, Stakeholder Communication.`,
      suggestedFollowUps: [
        'Tell me about his CreArt Solutions internship',
        'Tell me about his Internsavy internship',
        "What are Parth's Business Analytics skills?"
      ]
    };
  }

  // CreArt Solutions
  if (q.includes('creart') || q.includes('php developer') || q.includes('php intern')) {
    const exp = PORTFOLIO_DATA.journey.experience.find(e => e.id.includes('creart'))!;
    return {
      text: `**PHP Web Developer Intern @ CreArt Solutions Pvt Ltd** (July 2023 – Aug 2023 | Remote):\n\n` +
        `• Developed 5 responsive modules for a client-facing video-calling web application (VChat) using PHP, JavaScript, HTML5/CSS3, and MySQL to meet client requirements.\n` +
        `• Optimized 10+ SQL database queries to boost backend application throughput and eliminate bottlenecks.\n` +
        `• Tested, debugged, and resolved 15+ UI and functional issues prior to production release.\n` +
        `• **Skills Applied:** PHP, MySQL, JavaScript, WebRTC, Query Optimization, Bug Resolution.`,
      suggestedFollowUps: [
        'Tell me about the VChat project',
        'Tell me about the OASIS Infobyte internship',
        "What are Parth's database skills?"
      ]
    };
  }

  // Internsavy
  if (q.includes('internsavy') || q.includes('android')) {
    const exp = PORTFOLIO_DATA.journey.experience.find(e => e.id.includes('internsavy'))!;
    return {
      text: `**Android Application Development Intern @ INTERNSAVY** (July 2023 | Remote):\n\n` +
        `• Built 3+ responsive native mobile features using Java and Android Studio.\n` +
        `• Tested and resolved 15+ bugs to boost app usability, performance, and stability.\n` +
        `• Collaborated in an Agile environment to refine sprint deliverables and consistently ship project milestones on schedule.\n` +
        `• **Skills Applied:** Android Development, Java, Android Studio, Mobile UI, Agile Methodologies, Bug Resolution.`,
      suggestedFollowUps: [
        'Tell me about the OASIS Infobyte internship',
        'Tell me about his education at JAGSoM',
        "What is Parth's full work experience?"
      ]
    };
  }

  // All experience overview
  if (q.includes('internship') || q.includes('experience') || q.includes('work history') || q.includes('career') || q.includes('job')) {
    return {
      text: `Parth has completed **3 verified industry internships** spanning analytics, full-stack systems, and mobile engineering:\n\n` +
        `1. **Data Analytics Intern @ OASIS INFOBYTE** (Feb–Mar 2026):\n` +
        `   Cleaned 5+ datasets (10,000+ rows) using Python & SQL; built executive Tableau KPI dashboards; delivered workflow optimization proposals.\n\n` +
        `2. **PHP Web Developer @ CreArt Solutions** (July–Aug 2023):\n` +
        `   Engineered 5 client-facing WebRTC video modules, optimized 10+ SQL queries, and resolved 15+ production bugs.\n\n` +
        `3. **Android Developer @ INTERNSAVY** (July 2023):\n` +
        `   Shipped 3+ native Android features in Java & Android Studio within Agile sprint cycles.`,
      suggestedFollowUps: [
        'Tell me about the OASIS Infobyte role in detail',
        "What is Parth's education background?",
        'What are his core technical skills?'
      ]
    };
  }

  // 5. EDUCATION & ACADEMIC BACKGROUND
  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('jagsom') || q.includes('gtu') || q.includes('school') || q.includes('study')) {
    return {
      text: `Parth's academic foundation bridges rigorous Computer Science engineering with executive Business Analytics:\n\n` +
        `1. **Post Graduate Diploma in Management (PGDM - Business Analytics)**\n` +
        `   • **Institution:** JAGSoM (Jagdish Sheth School of Management), Bengaluru (2025 – 2027)\n` +
        `   • **Focus:** Business Analytics, Product Strategy, KPI Frameworks, Technology Commercialization, Operations Analytics.\n\n` +
        `2. **Bachelor of Engineering (B.E. - Computer Science)**\n` +
        `   • **Institution:** Gujarat Technological University MU (2020 – 2024)\n` +
        `   • **Distinction:** Graduated with Distinction. Capstone Project: ProctorShield (AI invigilation platform).\n\n` +
        `3. **Higher Secondary School (Class XII - Science PCM & CS)**\n` +
        `   • **Institution:** Aditya Birla Higher Secondary School (2018 – 2020)\n` +
        `   • **Focus:** Mathematics, Physics, Chemistry, Computer Science Foundations.`,
      suggestedFollowUps: [
        'When is Parth available to join full-time?',
        'What certifications does he hold?',
        'What roles is Parth seeking?'
      ]
    };
  }

  // 6. AVAILABILITY, GRADUATION & ROLES
  if (q.includes('availab') || q.includes('graduat') || q.includes('when can he start') || q.includes('join') || q.includes('roles') || q.includes('hire') || q.includes('looking for') || q.includes('relocation') || q.includes('remote')) {
    return {
      text: `**Career Availability & Role Alignment:**\n\n` +
        `• **Graduation:** May 2027 from JAGSoM (PGDM Business Analytics).\n` +
        `• **Availability:** Available for full-time opportunities starting **May 2027** (open to internships and project engagements earlier).\n` +
        `• **Target Roles:** Business Analyst, Data Analyst, Product Analyst, AI & Analytics Strategist, Full-Stack AI Engineer.\n` +
        `• **Location Preferences:** India (Bengaluru, Mumbai, Delhi NCR, Pune, Hyderabad, Remote) · Open to Global Relocation.`,
      suggestedFollowUps: [
        'How can I contact Parth?',
        'Download or view resume',
        "What are Parth's strongest skills?"
      ]
    };
  }

  // 7. CERTIFICATIONS & CREDENTIALS
  if (q.includes('cert') || q.includes('credential') || q.includes('google project management') || q.includes('coursera') || q.includes('verified')) {
    return {
      text: `Parth holds **49+ verified professional certifications** across AI, Project Management, and Data Analytics:\n\n` +
        `• **Google Project Management Professional Certificate:** Complete 7-course specialisation covering Project Initiation, Planning, Execution, Agile/Scrum delivery, Stakeholder Management, and Real-World Capstone.\n` +
        `• **Generative AI & LLMs:** Verified certifications from Microsoft & LinkedIn in Generative AI, Prompt Engineering, and Document Retrieval.\n` +
        `• **Data Analytics & Engineering:** Verified credentials in Python, SQL, Tableau, Data Cleaning, and Statistical Modeling.\n` +
        `• Every certificate in Parth's portfolio is backed by verifiable credential IDs and issuance dates.`,
      suggestedFollowUps: [
        "What is Parth's project management experience?",
        'Tell me about Chat With PDF',
        'Tell me about ProctorShield'
      ]
    };
  }

  // 8. TECHNICAL SKILLS BREAKDOWN
  if (q.includes('python') || q.includes('sql') || q.includes('tableau') || q.includes('excel') || q.includes('tech stack') || q.includes('skills') || q.includes('react') || q.includes('webrtc') || q.includes('ai') || q.includes('programming')) {
    return {
      text: `Parth's skills span 5 primary categories:\n\n` +
        `• **Business & Analytics:** SQL, Python (Pandas, NumPy, Scikit-learn), Tableau, Microsoft Excel (Advanced Modeling, Pivot Tables), Power BI, KPI Tracking, Process Optimization.\n` +
        `• **AI & GenAI:** TensorFlow, OpenCV, LangChain, LangGraph, RAG (Retrieval-Augmented Generation), FAISS, Vector Search, HuggingFace, Prompt Engineering.\n` +
        `• **Web & Full-Stack:** React, Next.js (App Router), TypeScript, JavaScript, Node.js, Express, PHP, TailwindCSS, HTML5/CSS3.\n` +
        `• **Databases & DevOps:** PostgreSQL, MySQL, MongoDB, SQLite, Supabase, Vercel, Git/GitHub, REST APIs, WebRTC.\n` +
        `• **Product & Project Management:** Agile, Scrum, Jira, Sprint Planning, Requirements Gathering (BRD/PRD), User Stories, UAT.`,
      suggestedFollowUps: [
        'What projects showcase Python and AI?',
        'Tell me about his OASIS Infobyte internship',
        'What is ProctorShield?'
      ]
    };
  }

  // 9. RESEARCH PAPERS
  if (q.includes('research') || q.includes('paper') || q.includes('publication') || q.includes('capstone paper')) {
    const paper = PORTFOLIO_DATA.researchPapers[0];
    return {
      text: `**Research Paper:** *"AI-Powered Real-Time Remote Examination Integrity & Multi-Modal Behavioral Anomaly Detection"*\n\n` +
        `• **Abstract:** Evaluates a quantized TensorFlow neural architecture processing WebRTC video frames to detect multi-face anomalies, head pose deviations, and background audio interference in sub-140ms inference windows.\n` +
        `• **Key Findings:** 99.2% precision on secondary face detection without shadow false positives, 45% bandwidth overhead reduction using selective keyframe delta streaming, and <18% client CPU usage.\n` +
        `• **Related Project:** ProctorShield.`,
      suggestedFollowUps: [
        'Tell me about ProctorShield',
        'Tell me about Chat With PDF',
        "What are Parth's academic qualifications?"
      ],
      sourceLink: { label: 'Explore Research Repository', url: paper.githubUrl || 'https://github.com/parth022002/ProctorShield' }
    };
  }

  // 10. CONTACT, RESUME & SOCIAL LINKS
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('github') || q.includes('linktree') || q.includes('resume') || q.includes('cv') || q.includes('reach') || q.includes('message')) {
    return {
      text: `You can connect with Parth directly through multiple channels:\n\n` +
        `• **Email:** [parth022002@gmail.com](mailto:parth022002@gmail.com)\n` +
        `• **LinkedIn:** [linkedin.com/in/parth--ahuja](https://www.linkedin.com/in/parth--ahuja/)\n` +
        `• **GitHub:** [github.com/parth022002](https://github.com/parth022002)\n` +
        `• **Linktree:** [linktr.ee/parthahuja](https://linktr.ee/parthahuja)\n` +
        `• **Résumé:** [View / Download PDF Resume](/resume.pdf)\n\n` +
        `Parth typically responds within 24 hours.`,
      suggestedFollowUps: [
        'What are his target roles?',
        'What is his availability?',
        'Tell me about his best projects'
      ],
      sourceLink: { label: 'Connect on LinkedIn', url: 'https://www.linkedin.com/in/parth--ahuja/' }
    };
  }

  // 11. WHY HIRE PARTH / ELEVATOR PITCH
  if (q.includes('why hire') || q.includes('why parth') || q.includes('strengths') || q.includes('elevator pitch') || q.includes('summary') || q.includes('who is parth')) {
    return {
      text: `**Why Parth Ahuja stands out:**\n\n` +
        `1. **Dual Engineering + Business Acumen:** Holds a B.E. in Computer Science (with distinction) and is completing a PGDM in Business Analytics at JAGSoM. He doesn't just write code; he constructs the business case, KPI targets, and ROI model behind it.\n` +
        `2. **Proven Builder (14+ Projects):** Has designed and deployed production systems across AI proctoring (ProctorShield), RAG document retrieval (Chat with PDF), and edge platforms (NexSpace).\n` +
        `3. **Industry Experience:** 3 verified internships across data analytics (OASIS Infobyte), full-stack web (CreArt), and mobile (Internsavy).\n` +
        `4. **49+ Verified Certifications:** Certified by Google (Professional Project Management), Microsoft, and LinkedIn.`,
      suggestedFollowUps: [
        'Tell me about ProctorShield',
        'Tell me about the OASIS Infobyte internship',
        'How can I get in touch?'
      ]
    };
  }

  // DEFAULT GROUNDED FALLBACK WITH HIGH VALUE
  return {
    text: `Based on Parth's portfolio knowledge base, he is a **Business Analytics candidate at JAGSoM (Class of 2027)** with a **B.E. in Computer Science**.\n\n` +
      `He combines requirements gathering, KPI frameworks, and hands-on AI engineering (Python, SQL, Tableau, LangGraph, RAG) to build solutions across supply chain, operations, and product analytics.\n\n` +
      `He has engineered **14+ production systems** (including ProctorShield, NexSpace, and Chat With PDF) and completed **3 internships** (OASIS Infobyte, CreArt, Internsavy). What specific aspect would you like to explore?`,
    suggestedFollowUps: [
      'Tell me about ProctorShield',
      'Tell me about the OASIS Infobyte internship',
      "What are Parth's Business Analytics skills?",
      'How can I contact Parth?'
    ]
  };
}
