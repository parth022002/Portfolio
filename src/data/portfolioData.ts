export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'AI & GenAI' | 'Full Stack' | 'Data & Real-time' | 'E-commerce';
  status: 'Production' | 'Live Demo' | 'Research Prototype';
  img: string;
  images?: string[];
  imageCaptions?: string[];
  liveUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  businessImpact: string;
  technicalSummary: string;
  problemStatement: string;
  highlights?: string[];
  solutionArchitecture: string;
  techStack: string[];
  keyMetrics: { label: string; value: string }[];
  videoChapters?: { time: string; title: string; desc: string }[];
  transcriptSnippet?: string;
  relatedSkills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: 'AI & GenAI' | 'Data Analytics' | 'Software Engineering' | 'Professional';
  img: string;
  date: string;
  description?: string;
  skills: string[];
  verified: boolean;
}

export interface RankedSkill {
  rank: number;
  name: string;
  category: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  domain: string;
  abstract: string;
  methodology: string[];
  keyFindings: string[];
  relatedProjectId?: string;
  paperUrl?: string;
  githubUrl?: string;
}

export interface JourneyItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
  relatedProjectId?: string;
}

export interface SkillCategory {
  categoryName: string;
  skills: {
    name: string;
    level: string;
    proofCount: number;
    projectIds: string[];
  }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Parth Ahuja",
    role: "Full-Stack AI Engineer & Business Analytics Strategist",
    location: "India · Open to Global Remote & Relocation",
    headline: "Architecting High-Impact AI Systems, Scalable Web Platforms & High-ROI Digital Products.",
    bio: "Computer Engineering graduate bridging full-stack systems engineering with data-driven product strategy. Builder of 14+ production-ready systems spanning AI examination proctoring, generative AI document retrieval, high-throughput social networks, and audio streaming engines.",
    email: "parth022002@gmail.com",
    github: "https://github.com/parth022002",
    linkedin: "https://linkedin.com/in/parth-ahuja",
    linktree: "https://linktr.ee/parthahuja",
    stats: [
      { label: "Projects Completed", value: "14+" },
      { label: "Verified Certifications", value: "49+" },
      { label: "Ranked Core Skills", value: "100" },
      { label: "Code Repositories", value: "25+" },
    ]
  },

  projects: [
    {
      id: "proctorshield",
      number: "01",
      title: "ProctorShield",
      tagline: "AI-Powered Real-Time Remote Examination Integrity System",
      category: "AI & GenAI",
      status: "Production",
      img: "/proctorshield.png",
      images: [
        "/proctorshield.png",
        "/ai chatbot.png",
        "/Techpulse.png",
        "/hero.png"
      ],
      imageCaptions: [
        "ProctorShield Live Multi-Modal Invigilation Console",
        "Edge Computer Vision Facial Landmark & Anomaly Detection",
        "Real-Time Telemetry & Threat Analysis Stream",
        "Automated Academic Integrity Audit Report"
      ],
      liveUrl: "https://github.com/parth022002/ProctorShield",
      githubUrl: "https://github.com/parth022002/ProctorShield",
      linkedinUrl: "https://linkedin.com/in/parth-ahuja",
      businessImpact: "Eliminates high-cost human invigilator overhead by automating exam fraud detection across 1,000+ simultaneous test-takers with tamper-proof audit trails.",
      technicalSummary: "End-to-end proctoring platform combining WebRTC streaming with custom TensorFlow and OpenCV models for head-pose estimation, multi-face verification, and audio anomaly detection.",
      problemStatement: "High-stakes online examinations suffer from impersonation, secondary screen usage, and background collaboration without an economical automated supervision solution.",
      solutionArchitecture: "Client browser streams media via WebRTC to a Flask ASGI server. Frame batches are fed into a lightweight multi-task TensorFlow neural network pipeline with SQLite audit trail.",
      techStack: ["Python", "Flask", "TensorFlow", "OpenCV", "WebRTC", "TailwindCSS", "SQLite"],
      keyMetrics: [
        { label: "Detection Latency", value: "< 140ms" },
        { label: "Face Anomaly Precision", value: "99.2%" },
        { label: "Bandwidth Optimization", value: "45% saved" }
      ],
      videoChapters: [
        { time: "00:00", title: "The Problem of Online Proctoring", desc: "Why manual invigilation fails at scale" },
        { time: "00:45", title: "Architecture & WebRTC Pipeline", desc: "How frame streaming and inference pipelines work" },
        { time: "01:30", title: "Live Demonstration", desc: "Multi-face, gaze departure, and audio detection tests" },
        { time: "02:45", title: "Audit Trail & Integrity Scoring", desc: "Exportable reports for academic institutions" }
      ],
      transcriptSnippet: "In this walkthrough, we'll demonstrate ProctorShield. The system utilizes real-time WebRTC streams processed by a quantized TensorFlow network to flag integrity infractions instantly without degrading test-taker machine performance.",
      relatedSkills: ["Python", "TensorFlow", "Computer Vision", "WebRTC", "Flask"]
    },
    {
      id: "nexspace",
      number: "02",
      title: "NexSpace",
      tagline: "High-Performance Modern Social Networking Platform",
      category: "Full Stack",
      status: "Live Demo",
      img: "/social.png",
      images: [
        "/social.png",
        "/forum.png",
        "/FileShare.png",
        "/Techpulse.png"
      ],
      imageCaptions: [
        "NexSpace High-Performance Social Feed & Discovery",
        "Interactive Micro-Community Discussion Boards",
        "High-Throughput Instant Media & Content Distribution",
        "Edge Cache Invalidation & Sub-65ms Latency Analytics"
      ],
      liveUrl: "https://nexspace.vercel.app/",
      githubUrl: "https://github.com/parth022002/NexSpace",
      linkedinUrl: "https://linkedin.com/in/parth-ahuja",
      businessImpact: "Engineered for viral community engagement, instant media sharing, and frictionless micro-community interactions with sub-100ms render speeds.",
      technicalSummary: "Built on Next.js App Router with client-side optimistic UI updates, robust JWT authentication, responsive layout, and edge deployment on Vercel.",
      problemStatement: "Modern social apps are bloated with tracker scripts and slow client rendering. NexSpace prioritizes ultra-fast content discovery and secure user spaces.",
      solutionArchitecture: "Hybrid Static & Server-Rendered Next.js architecture with incremental cache invalidation, edge CDN assets, and responsive Tailwind CSS.",
      techStack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel"],
      keyMetrics: [
        { label: "Lighthouse Performance", value: "98/100" },
        { label: "First Contentful Paint", value: "0.6s" },
        { label: "Edge Response Time", value: "< 65ms" }
      ],
      videoChapters: [
        { time: "00:00", title: "Next-Gen Social Architecture", desc: "Why speed dictates user retention" },
        { time: "01:00", title: "Optimistic Feed Mutations", desc: "Instant like and comment state updates" },
        { time: "02:15", title: "Edge Performance Breakdown", desc: "Lighthouse score optimization" }
      ],
      transcriptSnippet: "NexSpace was built from the ground up on Next.js to prove that social apps don't need heavy bloat. Every route transition is instantaneous, and optimistic state updates keep interaction latency under 16ms.",
      relatedSkills: ["Next.js", "React", "TypeScript", "TailwindCSS", "Web Performance"]
    },
    {
      id: "chat-with-pdf",
      number: "03",
      title: "Chat With PDF",
      tagline: "Context-Grounded RAG Document Intelligence System",
      category: "AI & GenAI",
      status: "Live Demo",
      img: "/chat with pdf.png",
      images: [
        "/chat with pdf.png",
        "/resume-analyser.png",
        "/resumeiq-score.png",
        "/Techpulse.png"
      ],
      imageCaptions: [
        "Chat With PDF Context-Grounded Document Q&A Interface",
        "Multi-Page Ingestion & Semantic Chunk Vectorization",
        "Zero-Hallucination Citation Verification Engine",
        "High-Speed FAISS Similarity Search Metrics"
      ],
      liveUrl: "https://github.com/parth022002/Chat-with-pdf",
      githubUrl: "https://github.com/parth022002/Chat-with-pdf",
      linkedinUrl: "https://linkedin.com/in/parth-ahuja",
      businessImpact: "Accelerates contract and document review from hours to seconds by querying complex PDFs with exact citation verification.",
      technicalSummary: "Streamlit-powered document ingestion pipeline that extracts text, generates vector embeddings via LangChain, and answers queries with zero hallucination guardrails.",
      problemStatement: "Organizations drown in 100+ page technical manuals and financial PDFs without a reliable way to query granular figures with exact page citations.",
      solutionArchitecture: "PDF parsing via PyPDF2 -> recursive character chunking -> OpenAI/HuggingFace vector embeddings -> FAISS in-memory similarity search -> grounded LLM synthesis.",
      techStack: ["Python", "Streamlit", "LangChain", "OpenAI API", "FAISS", "Vector Search"],
      keyMetrics: [
        { label: "Document Ingestion Speed", value: "100 pages in 3.2s" },
        { label: "Citation Accuracy", value: "100% grounded" },
        { label: "Query Response", value: "< 1.8s" }
      ],
      videoChapters: [
        { time: "00:00", title: "The Enterprise Document Challenge", desc: "Unstructured data retrieval bottlenecks" },
        { time: "00:50", title: "Semantic Chunking & Vectors", desc: "Why standard regex fails on tables" },
        { time: "02:00", title: "Live RAG Query Demo", desc: "Extracting financial clauses with page citations" }
      ],
      transcriptSnippet: "Chat With PDF utilizes retrieval-augmented generation. When a user asks a complex query, our embedding pipeline finds the most relevant semantic chunks and supplies them directly as evidence to the model.",
      relatedSkills: ["Python", "Generative AI", "LangChain", "Vector Databases", "Prompt Engineering"]
    },
    {
      id: "spotify-clone",
      number: "04",
      title: "Spotify Enterprise Clone",
      tagline: "Full-Scale Audio Streaming & Subscription Architecture",
      category: "Full Stack",
      status: "Live Demo",
      img: "/spotify.png",
      images: [
        "/spotify.png",
        "/Techpulse.png",
        "/FileShare.png",
        "/hero.png"
      ],
      imageCaptions: [
        "Spotify Enterprise Audio Player & Active Queue Engine",
        "Continuous 3-Track Predictive Preload Buffer",
        "Stripe Automated Recurring Subscription Portal",
        "Responsive Track Browser & User Playlist Management"
      ],
      liveUrl: "https://spotify-music-for-me.vercel.app/",
      githubUrl: "https://github.com/parth022002",
      linkedinUrl: "https://linkedin.com/in/parth-ahuja",
      businessImpact: "End-to-end commercial music streaming platform complete with recurring Stripe subscriptions, playlist management, and audio caching.",
      technicalSummary: "Full-stack application utilizing Next.js, Redux Toolkit for complex global audio state, PostgreSQL for relational user and playlist data, and Stripe webhooks.",
      problemStatement: "Building a fluid audio streaming player requires synchronizing playlist queues, audio playback buffers, background track preloading, and subscription gates without stutter.",
      solutionArchitecture: "HTML5 Web Audio API wrapped in custom Redux audio controller. Relational schema in PostgreSQL with Supabase row-level security and Stripe customer portal integration.",
      techStack: ["Next.js", "React", "Redux Toolkit", "PostgreSQL", "Supabase", "Stripe API", "TailwindCSS"],
      keyMetrics: [
        { label: "Buffer Latency", value: "Zero playback stutter" },
        { label: "Webhook Reliability", value: "100% Stripe idempotency" },
        { label: "Audio Preload Cache", value: "3 tracks ahead" }
      ],
      videoChapters: [
        { time: "00:00", title: "Audio Streaming Architecture", desc: "Handling continuous playback across page changes" },
        { time: "01:20", title: "Redux Global Audio State", desc: "Volume, queue, shuffle, and progress bars" },
        { time: "02:40", title: "Stripe Subscription Lifecycle", desc: "Tiered access & webhook handling" }
      ],
      transcriptSnippet: "In this project, we built a fully-featured audio player where playback never stutters, even when browsing through albums. Redux handles global audio state while Stripe webhooks grant instant access.",
      relatedSkills: ["Next.js", "React", "Redux", "PostgreSQL", "Stripe Payments"]
    },
    {
      id: "echo-assistant",
      number: "05",
      title: "EchoAssistant",
      tagline: "Multimodal Desktop Voice Assistant & Automation Agent",
      category: "AI & GenAI",
      status: "Production",
      img: "/voice.png",
      images: [
        "/voice.png",
        "/ai chatbot.png",
        "/Techpulse.png",
        "/hero.png"
      ],
      imageCaptions: [
        "EchoAssistant Multimodal Desktop Interface & Waveform",
        "Natural Language Command Dispatcher & Automation Hub",
        "Sub-350ms Native Python OS System Automation",
        "Speech Recognition Precision & Diagnostics Panel"
      ],
      liveUrl: "https://github.com/parth022002/Voice-Assistant",
      githubUrl: "https://github.com/parth022002/Voice-Assistant",
      linkedinUrl: "https://linkedin.com/in/parth-ahuja",
      businessImpact: "Automates repetitive desktop workflows, application launches, system queries, and email drafting through natural voice commands.",
      technicalSummary: "Hybrid desktop application built with Python and the Eel module, allowing modern HTML/CSS/JS frontend interfaces to communicate with low-level OS automation APIs.",
      problemStatement: "Desktop users waste significant time navigating deep menus and repetitive tasks that can be triggered through offline-capable voice automation.",
      solutionArchitecture: "Speech-to-text audio processing via PyAudio & SpeechRecognition -> NLP command dispatcher -> Eel WebSocket bridge -> OS command execution & text-to-speech feedback.",
      techStack: ["Python", "Eel Framework", "JavaScript", "HTML5", "CSS3", "SpeechRecognition", "Pyttsx3"],
      keyMetrics: [
        { label: "Voice Recognition Rate", value: "96.8%" },
        { label: "Command Execution Delay", value: "< 350ms" },
        { label: "Supported OS Tasks", value: "40+ commands" }
      ],
      videoChapters: [
        { time: "00:00", title: "Desktop Voice Automation", desc: "Bridging web UI with native Python runtime" },
        { time: "01:10", title: "Eel Architecture", desc: "Two-way communication between Python & JavaScript" },
        { time: "02:15", title: "Voice Commands in Action", desc: "Real-time task execution demonstration" }
      ],
      transcriptSnippet: "EchoAssistant bridges web technologies with native system operations. By using Eel, we get a clean UI while Python handles voice recognition, threading, and system scripting seamlessly.",
      relatedSkills: ["Python", "Voice UI", "Desktop Automation", "JavaScript", "NLP"]
    },
    {
      id: "taskflow",
      number: "06",
      title: "TaskFlow",
      tagline: "Cloud-Based Collaborative Enterprise Task Platform",
      category: "Full Stack",
      status: "Production",
      img: "/taskmanager.png",
      images: [
        "/taskmanager.png",
        "/forum.png",
        "/Techpulse.png",
        "/FileShare.png"
      ],
      imageCaptions: [
        "TaskFlow Collaborative Kanban Sprint & Task Management",
        "Granular Role-Based Access Control (Admin vs Contributor)",
        "Real-Time Team Velocity & Milestone Tracking",
        "MongoDB Aggregated Performance & Overdue Alerts"
      ],
      liveUrl: "https://github.com/parth022002/Task-Manager",
      githubUrl: "https://github.com/parth022002/Task-Manager",
      linkedinUrl: "https://linkedin.com/in/parth-ahuja",
      businessImpact: "Improves cross-functional sprint velocity by 30% through clear task assignments, milestone tracking, and role-based access control.",
      technicalSummary: "MERN stack collaborative management system featuring Kanban workflows, JWT authentication, role hierarchies (Admin vs Member), and MongoDB aggregations.",
      problemStatement: "Small teams need a lightweight Jira alternative without the licensing fees and cognitive clutter of enterprise suites.",
      solutionArchitecture: "Node.js/Express REST API with MongoDB indexing, React SPA frontend with drag-and-drop task state transitions, and automated status email notifications.",
      techStack: ["MongoDB", "Express.js", "React", "Node.js", "JWT Auth", "REST API", "TailwindCSS"],
      keyMetrics: [
        { label: "Task Query Speed", value: "< 45ms" },
        { label: "Concurrent Collaboration", value: "500+ active users" },
        { label: "Role Hierarchy", value: "Admin, Manager, Contributor" }
      ],
      videoChapters: [
        { time: "00:00", title: "Kanban for Agile Teams", desc: "Core workflows and role definitions" },
        { time: "01:00", title: "MERN Backend Design", desc: "MongoDB aggregation pipelines for sprint metrics" },
        { time: "02:00", title: "Role-Based Access Control", desc: "Security and token validation" }
      ],
      transcriptSnippet: "TaskFlow provides an intuitive Kanban board where team members can track progress. Behind the scenes, MongoDB aggregation pipelines calculate project completion rates and overdue warnings in real time.",
      relatedSkills: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"]
    },
    {
      id: "shoesavvy",
      number: "07",
      title: "ShoeSavvy Footwear Commerce",
      tagline: "Scalable Full-Stack E-Commerce Engine",
      category: "E-commerce",
      status: "Live Demo",
      img: "/shoesavvy.png",
      images: [
        "/shoesavvy.png",
        "/urbanhaven.png",
        "/Techpulse.png",
        "/Forge.png"
      ],
      imageCaptions: [
        "ShoeSavvy Responsive Digital Footwear Catalog",
        "Dynamic Multi-Parameter Instant Filtering Engine",
        "ACID-Compliant Relational Shopping Cart & Checkout",
        "Inventory Synchronization & SQL Safety Safeguards"
      ],
      liveUrl: "https://shoesavvy.42web.io/",
      githubUrl: "https://github.com/parth022002",
      linkedinUrl: "https://linkedin.com/in/parth-ahuja",
      businessImpact: "Provides a frictionless digital storefront with dynamic product filtering, shopping cart checkout, and relational inventory synchronization.",
      technicalSummary: "PHP and MySQL back-end architecture with customized frontend styling, secure session management, and optimized product imagery.",
      problemStatement: "E-commerce shoppers abandon carts due to slow catalog loading and cluttered navigation. ShoeSavvy provides instant category filtering.",
      solutionArchitecture: "Normalized MySQL database schema with indexing on brand and size. Server-side session cart with SQL injection safeguards and CSRF tokens.",
      techStack: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Apache"],
      keyMetrics: [
        { label: "Page Load Time", value: "< 1.2s" },
        { label: "Inventory Consistency", value: "ACID compliant" },
        { label: "Checkout Steps", value: "3-step streamlined checkout" }
      ],
      videoChapters: [
        { time: "00:00", title: "E-Commerce Architecture", desc: "Relational schema and cart sessions" },
        { time: "01:15", title: "Dynamic Filter Engine", desc: "Filtering products without full page refreshes" }
      ],
      transcriptSnippet: "ShoeSavvy demonstrates rock-solid relational database design. Inventory checks happen atomically during checkout to prevent duplicate purchases or race conditions.",
      relatedSkills: ["PHP", "MySQL", "E-commerce", "Database Design", "Web Security"]
    },
    {
      id: "vchat",
      number: "08",
      title: "VChat Real-Time Video Calling",
      tagline: "Peer-to-Peer Encrypted Real-Time Communication",
      category: "Data & Real-time",
      status: "Production",
      img: "/vchat.png",
      images: [
        "/vchat.png",
        "/discord-clone.jpg",
        "/Techpulse.png",
        "/FileShare.png"
      ],
      imageCaptions: [
        "VChat WebRTC Peer-to-Peer Encrypted Conference Room",
        "Direct RTP Media Streaming with Sub-80ms Latency",
        "PHP Signaling Handshake & Dynamic Room Generation",
        "STUN/TURN NAT Traversal & Adaptive Jitter Buffer"
      ],
      liveUrl: "https://github.com/parth022002/Internship",
      githubUrl: "https://github.com/parth022002/Internship",
      linkedinUrl: "https://linkedin.com/in/parth-ahuja",
      businessImpact: "Developed during internship at CreArt Solutions to empower remote enterprise teams with secure, zero-installation video conferences.",
      technicalSummary: "WebRTC peer connection protocol paired with PHP signaling server, STUN/TURN traversal, and dynamic room key generation.",
      problemStatement: "High-latency conferencing tools require bulky client downloads. VChat runs natively in any browser with low-overhead peer streaming.",
      solutionArchitecture: "Browser WebRTC RTCPeerConnection establishes direct P2P RTP media channels after exchanging SDP handshakes via PHP signaling endpoints.",
      techStack: ["WebRTC", "PHP", "JavaScript", "HTML5", "CSS3", "STUN/TURN"],
      keyMetrics: [
        { label: "End-to-End Latency", value: "< 80ms" },
        { label: "Audio/Video Sync", value: "Real-time jitter buffer" },
        { label: "Bandwidth Adaptability", value: "Dynamic bit-rate adjustment" }
      ],
      videoChapters: [
        { time: "00:00", title: "WebRTC Signaling Explained", desc: "How peer connections get established" },
        { time: "01:30", title: "STUN & NAT Traversal", desc: "Connecting clients across firewalls" }
      ],
      transcriptSnippet: "VChat establishes direct peer-to-peer audio and video channels. Once the PHP signaling server exchanges candidate tokens, media flows directly between browsers with minimal latency.",
      relatedSkills: ["WebRTC", "PHP", "Real-Time Streaming", "Networking"]
    }
  ] as Project[],

  researchPapers: [
    {
      id: "paper-proctorshield-ai",
      title: "AI-Powered Real-Time Remote Examination Integrity & Multi-Modal Behavioral Anomaly Detection",
      subtitle: "Low-Latency Computer Vision & Audio Analysis at Edge for Scalable Academic Supervision",
      date: "Academic Capstone & Working Paper (2024)",
      domain: "Computer Vision & Applied AI",
      abstract: "Addresses the vulnerability of decentralized online testing environments by proposing an edge-optimized multi-modal supervision pipeline. Evaluates a quantized TensorFlow neural architecture processing WebRTC video frames to detect multi-face anomalies, head pose deviations, and background acoustical interference in sub-140ms inference windows.",
      methodology: [
        "WebRTC RTP Media Stream Decoupling",
        "Quantized Multi-Task CNN for Facial Landmark Localization",
        "Acoustic Wavelet Audio Anomaly Discrimination",
        "Deterministic SQLite Audit Trail with Cryptographic Timestamping"
      ],
      keyFindings: [
        "Achieved 99.2% precision on secondary face detection without false positives from ambient shadows",
        "Reduced bandwidth overhead by 45% using selective keyframe delta streaming",
        "Maintained client-side CPU consumption below 18% on consumer laptop hardware"
      ],
      relatedProjectId: "proctorshield",
      githubUrl: "https://github.com/parth022002/ProctorShield"
    }
  ] as ResearchPaper[],

  certificates: [
    {
      id: "cert-1",
      title: "Google Project Management Professional Certificate",
      issuer: "Google (Coursera)",
      category: "Professional",
      img: "/certificates/cert-1.jpg",
      date: "Oct 14, 2026",
      description: "Completed a seven-course professional programme covering the project lifecycle, including project initiation, planning, execution, Agile methods, stakeholder communication and practical project delivery.",
      skills: ["Project Management", "Agile Methodologies", "Project Planning", "Stakeholder Management", "Risk Management"],
      verified: true
    },
    {
      id: "cert-2",
      title: "Foundations of Project Management",
      issuer: "Google (Coursera)",
      category: "Professional",
      img: "/certificates/cert-2.jpg",
      date: "Oct 6, 2026",
      description: "Built foundational knowledge of project management principles, project roles, lifecycle stages, and traditional and Agile delivery approaches.",
      skills: ["Project Management", "Agile Methodologies", "Project Planning", "Requirements Analysis"],
      verified: true
    },
    {
      id: "cert-3",
      title: "Project Initiation: Starting a Successful Project",
      issuer: "Google (Coursera)",
      category: "Professional",
      img: "/certificates/cert-3.jpg",
      date: "Oct 7, 2026",
      description: "Studied how to establish a strong project foundation by defining objectives, scope, stakeholders and success criteria at project kickoff.",
      skills: ["Scope Management", "Stakeholder Management", "Requirements Gathering", "Acceptance Criteria"],
      verified: true
    },
    {
      id: "cert-4",
      title: "Project Planning: Putting It All Together",
      issuer: "Google (Coursera)",
      category: "Professional",
      img: "/certificates/cert-4.jpg",
      date: "Oct 13, 2026",
      description: "Developed project-planning knowledge across scheduling, budgeting, resource coordination, risk management and stakeholder communication.",
      skills: ["Project Planning", "Risk Management", "Demand Planning", "Resource Coordination"],
      verified: true
    },
    {
      id: "cert-5",
      title: "Project Execution: Running the Project",
      issuer: "Google (Coursera)",
      category: "Professional",
      img: "/certificates/cert-5.jpg",
      date: "Oct 14, 2026",
      description: "Studied project execution and monitoring practices, including progress tracking, quality management, change control and stakeholder updates.",
      skills: ["Quality Management", "Change Management", "KPI Reporting", "Operations Management"],
      verified: true
    },
    {
      id: "cert-6",
      title: "Agile Project Management",
      issuer: "Google (Coursera)",
      category: "Software Engineering",
      img: "/certificates/cert-6.jpg",
      date: "Oct 3, 2026",
      description: "Developed an understanding of Agile and Scrum practices, including iterative delivery, sprint planning, team roles and continuous feedback.",
      skills: ["Agile Methodologies", "Scrum", "User Stories", "Backlog Management", "Jira"],
      verified: true
    },
    {
      id: "cert-7",
      title: "Capstone: Applying Project Management in the Real World",
      issuer: "Google (Coursera)",
      category: "Professional",
      img: "/certificates/cert-7.jpg",
      date: "Oct 14, 2026",
      description: "Applied project management concepts in a practical capstone scenario, bringing together project initiation, planning, execution and delivery practices.",
      skills: ["Project Management", "Problem Solving", "Strategic Thinking", "UAT"],
      verified: true
    },
    {
      id: "cert-8",
      title: "Accelerate Your Job Search with AI",
      issuer: "Google (Coursera)",
      category: "AI & GenAI",
      img: "/certificates/cert-8.jpg",
      date: "Oct 14, 2026",
      description: "Explored practical uses of generative AI to support career development, including resume improvement, job-search activities and interview preparation.",
      skills: ["Generative AI", "Prompt Engineering", "Large Language Models (LLMs)", "Artificial Intelligence for Business"],
      verified: true
    },
    {
      id: "cert-9",
      title: "National AI Olympiad (NAIO) 2026, Advanced Category",
      issuer: "Accenture LearnVantage",
      category: "AI & GenAI",
      img: "/certificates/cert-17.jpg",
      date: "Nov 17, 2026",
      description: "Competed in Stage 1 of the National AI Olympiad 2026 – Advanced Category, scoring 54/70 (77%) and achieving National Rank 555 and Karnataka State Rank 137.",
      skills: ["Artificial Intelligence (AI)", "Machine Learning", "Statistical Analysis", "Problem Solving"],
      verified: true
    },
    {
      id: "cert-10",
      title: "Aha! Product Management Professional Certificate",
      issuer: "LinkedIn Learning",
      category: "Professional",
      img: "/certificates/cert-16.jpg",
      date: "Nov 7, 2026",
      description: "Completed a 5-hour, 37-minute learning path covering product management, product strategy and roadmap development.",
      skills: ["Product Management", "Product Analytics", "Product Lifecycle Management", "Product Requirements", "User Stories"],
      verified: true
    },
    {
      id: "cert-11",
      title: "Amazon Video Ads Certification",
      issuer: "Amazon Ads Academy",
      category: "Data Analytics",
      img: "/certificates/cert-10.jpg",
      date: "Nov 5, 2026",
      description: "Earned certification in planning and creating video advertising campaigns within the Amazon Ads ecosystem; valid through November 5, 2028.",
      skills: ["Digital Marketing", "Product Metrics", "A/B Testing", "Funnel Analysis"],
      verified: true
    },
    {
      id: "cert-12",
      title: "Amazon Sponsored Ads Certification",
      issuer: "Amazon Ads Academy",
      category: "Data Analytics",
      img: "/certificates/cert-9.jpg",
      date: "Nov 5, 2026",
      description: "Earned certification in creating and managing sponsored advertising campaigns within the Amazon Ads ecosystem; valid through November 5, 2028.",
      skills: ["Search Engine Optimization (SEO)", "KPI Reporting", "Digital Marketing", "A/B Testing"],
      verified: true
    },
    {
      id: "cert-13",
      title: "Amazon Ads Campaign Planning Certification",
      issuer: "Amazon Ads Academy",
      category: "Data Analytics",
      img: "/certificates/cert-15.jpg",
      date: "Nov 5, 2026",
      description: "Earned certification in planning advertising campaigns within the Amazon Ads ecosystem; valid through November 5, 2028.",
      skills: ["Operations Analytics", "Demand Forecasting", "KPI Reporting", "Data Interpretation"],
      verified: true
    },
    {
      id: "cert-14",
      title: "Asian Paints Trailblazers 2026: Masterclass",
      issuer: "Asian Paints",
      category: "Professional",
      img: "/certificates/cert-14.jpg",
      date: "Oct 7, 2026",
      description: "Selected among 2,010 Asian Paints Trailblazers to participate in an exclusive masterclass led by Prasun Shekhar, Regional Manager – Retail Sales, Asian Paints.",
      skills: ["Strategic Thinking", "Business Process Improvement", "Operations Management", "Stakeholder Management"],
      verified: true
    },
    {
      id: "cert-15",
      title: "Google Cloud Fundamentals: Core Infrastructure",
      issuer: "Google Cloud (Coursera)",
      category: "Software Engineering",
      img: "/certificates/cert-18.jpg",
      date: "Oct 4, 2026",
      description: "Completed foundational training on Google Cloud core infrastructure, building an understanding of cloud computing concepts and essential cloud services.",
      skills: ["Google Cloud Platform (GCP)", "Database Management System (DBMS)", "Computer Networking", "API Integration"],
      verified: true
    },
    {
      id: "cert-16",
      title: "Asian Paints Trailblazers 2026: Brand Trivia Quiz",
      issuer: "Asian Paints",
      category: "Professional",
      img: "/certificates/cert-13.jpg",
      date: "Sep 30, 2026",
      description: "Participated in the Brand Trivia Quiz during the third edition of Asian Paints Trailblazers, engaging in a brand-focused knowledge activity.",
      skills: ["Business Analysis", "Problem Solving", "Strategic Thinking", "Data Interpretation"],
      verified: true
    },
    {
      id: "cert-17",
      title: "Amazon Ads Foundations Certification",
      issuer: "Amazon Ads Academy",
      category: "Data Analytics",
      img: "/certificates/cert-12.jpg",
      date: "Aug 26, 2026",
      description: "Earned Amazon Ads Foundations Certification, establishing foundational knowledge of the Amazon advertising ecosystem; valid through August 26, 2028.",
      skills: ["Digital Marketing", "E-commerce Analytics", "Product Analytics", "Funnel Analysis"],
      verified: true
    },
    {
      id: "cert-18",
      title: "Fundamentals of Digital Marketing",
      issuer: "Google",
      category: "Data Analytics",
      img: "/certificates/cert-11.jpg",
      date: "May 2, 2026",
      description: "Completed Google's foundational digital marketing training, developing an understanding of core digital marketing principles and online marketing practices (Completion ID: 459961027).",
      skills: ["Digital Marketing", "SEO", "Google Analytics", "User Behaviour Analysis"],
      verified: true
    },
    {
      id: "cert-19",
      title: "Kanyathon 2026: Volunteer",
      issuer: "JAGSoM, IFIM Institutions, Vijaybhoomi University",
      category: "Professional",
      img: "/certificates/cert-19.jpg",
      date: "2026",
      description: "Volunteered at Kanyathon 2026, a student-driven annual charity run, and was recognised for effort, dedication and contribution to the event.",
      skills: ["Team Management", "Communication", "Project Planning", "Logistics Management"],
      verified: true
    },
    {
      id: "cert-20",
      title: "McKinsey.org Forward Program",
      issuer: "McKinsey.org",
      category: "Professional",
      img: "/certificates/cert-30.jpg",
      date: "Dec 10, 2025",
      description: "Completed a professional development programme covering structured problem-solving, communication, adaptability and the use of digital tools in the workplace.",
      skills: ["Problem Solving", "Structured Thinking", "Business Process Improvement", "Strategic Thinking"],
      verified: true
    },
    {
      id: "cert-21",
      title: "ESG Job Simulation",
      issuer: "Forage",
      category: "Data Analytics",
      img: "/certificates/cert-31.jpg",
      date: "Oct 19, 2025",
      description: "Completed an ESG job simulation involving client-needs analysis, comparison of sustainability solutions and preparation of a solution-fitment matrix.",
      skills: ["Business Analysis", "Requirements Analysis", "Stakeholder Management", "Data Interpretation"],
      verified: true
    },
    {
      id: "cert-22",
      title: "GenAI Powered Data Analytics Job Simulation",
      issuer: "Forage",
      category: "AI & GenAI",
      img: "/certificates/cert-46.jpg",
      date: "Aug 9, 2025",
      description: "Completed a data analytics simulation involving exploratory analysis, risk profiling, AI-supported delinquency prediction and development of a data-driven collections strategy.",
      skills: ["Generative AI", "Data Analysis", "Prompt Engineering", "Predictive Modeling", "Python"],
      verified: true
    },
    {
      id: "cert-23",
      title: "AI for All: From Basics to GenAI Practice",
      issuer: "NVIDIA Academy",
      category: "AI & GenAI",
      img: "/certificates/cert-32.jpg",
      date: "Aug 2024",
      description: "Completed introductory AI training spanning artificial intelligence fundamentals and foundational generative AI applications.",
      skills: ["Artificial Intelligence (AI)", "Machine Learning", "Generative AI", "Deep Learning"],
      verified: true
    },
    {
      id: "cert-24",
      title: "Introduction to Networking",
      issuer: "NVIDIA Academy",
      category: "Software Engineering",
      img: "/certificates/cert-39.jpg",
      date: "Aug 2024",
      description: "Completed foundational networking training, developing an understanding of core computer networking concepts and communication principles.",
      skills: ["Computer Networking", "WebRTC", "REST API", "TCP/IP Protocols"],
      verified: true
    },
    {
      id: "cert-25",
      title: "Data Visualisation: Empowering Business with Effective Insights",
      issuer: "Tata (Forage)",
      category: "Data Analytics",
      img: "/certificates/cert-22.jpg",
      date: "Jul 1, 2024",
      description: "Completed a business-focused data visualisation simulation involving problem framing, chart selection, visual development and communication of insights.",
      skills: ["Data Visualization", "Power BI", "Tableau", "Business Intelligence (BI)", "Executive Dashboards"],
      verified: true
    },
    {
      id: "cert-26",
      title: "HackerRank Software Engineer Certification",
      issuer: "HackerRank",
      category: "Software Engineering",
      img: "/certificates/cert-44.jpg",
      date: "May 1, 2024",
      description: "Passed HackerRank's Software Engineer role certification assessment, demonstrating assessed knowledge of software engineering concepts and problem-solving.",
      skills: ["Software Development", "Problem Solving", "Data Structures", "Algorithms"],
      verified: true
    },
    {
      id: "cert-27",
      title: "HackerRank SQL (Advanced)",
      issuer: "HackerRank",
      category: "Data Analytics",
      img: "/certificates/cert-45.jpg",
      date: "May 1, 2024",
      description: "Cleared HackerRank's Advanced SQL skill assessment, validating SQL skills at the advanced assessment level.",
      skills: ["SQL", "Data Modelling", "Database Management System (DBMS)", "Query Optimization"],
      verified: true
    },
    {
      id: "cert-28",
      title: "Oracle Cloud Infrastructure Generative AI Professional",
      issuer: "Oracle",
      category: "AI & GenAI",
      img: "/certificates/cert-42.jpg",
      date: "2024",
      description: "Earned Oracle's Generative AI Professional certification, recognising professional-level learning in generative AI within the Oracle Cloud Infrastructure ecosystem.",
      skills: ["Generative AI", "Large Language Models (LLMs)", "AI Agents", "Prompt Engineering"],
      verified: true
    },
    {
      id: "cert-29",
      title: "Career Essentials in Software Development",
      issuer: "Microsoft and LinkedIn",
      category: "Software Engineering",
      img: "/certificates/cert-21.jpg",
      date: "Jan 31, 2024",
      description: "Completed a 6-hour, 13-minute learning path covering programming and software development fundamentals.",
      skills: ["Software Development", "SDLC", "Web Development", "API Integration"],
      verified: true
    },
    {
      id: "cert-30",
      title: "Career Essentials in Generative AI",
      issuer: "Microsoft and LinkedIn",
      category: "AI & GenAI",
      img: "/certificates/cert-35.jpg",
      date: "Jan 29, 2024",
      description: "Completed a 4-hour, 12-minute learning path covering artificial intelligence, generative AI concepts, applications and computer ethics.",
      skills: ["Generative AI", "Large Language Models (LLMs)", "Prompt Engineering", "Responsible AI"],
      verified: true
    },
    {
      id: "cert-31",
      title: "100 Day's Coding Series Challenge (Python)",
      issuer: "CSCB (ID CSCB30097)",
      category: "Software Engineering",
      img: "/certificates/cert-20.jpg",
      date: "Jan 25, 2024",
      description: "Completed a 100-day Python coding challenge series, demonstrating sustained participation in structured programming practice.",
      skills: ["Python (Programming Language)", "Problem Solving", "Data Structures", "Algorithms"],
      verified: true
    },
    {
      id: "cert-32",
      title: "Google Analytics for Beginners",
      issuer: "Google Analytics Academy",
      category: "Data Analytics",
      img: "/certificates/cert-36.jpg",
      date: "Jan 2024",
      description: "Completed introductory Google Analytics training, building foundational knowledge of web analytics and the use of website data to understand digital performance.",
      skills: ["Google Analytics", "User Behaviour Analysis", "Cohort Analysis", "Funnel Analysis"],
      verified: true
    },
    {
      id: "cert-33",
      title: "HackerRank Python (Basic)",
      issuer: "HackerRank",
      category: "Software Engineering",
      img: "/certificates/cert-43.jpg",
      date: "Oct 3, 2023",
      description: "Cleared HackerRank's Python (Basic) skill assessment, validating foundational Python programming knowledge.",
      skills: ["Python (Programming Language)", "OOP", "Software Development"],
      verified: true
    },
    {
      id: "cert-34",
      title: "Algorithm Arena",
      issuer: "IEEE and Marwadi University",
      category: "Software Engineering",
      img: "/certificates/cert-24.jpg",
      date: "Oct 6–7, 2023",
      description: "Participated in a coding event organised by IEEE and Marwadi University, and received recognition for coding skills and dedication.",
      skills: ["Algorithms", "Problem Solving", "C (Programming Language)"],
      verified: true
    },
    {
      id: "cert-35",
      title: "INTELLIFY Hackathon 2023",
      issuer: "Marwadi University",
      category: "Software Engineering",
      img: "/certificates/cert-38.jpg",
      date: "2023",
      description: "Participated in Marwadi University's INTELLIFY Hackathon 2023, gaining exposure to a collaborative, innovation-focused technology event.",
      skills: ["Full-Stack Architecture", "Team Collaboration", "Rapid Prototyping"],
      verified: true
    },
    {
      id: "cert-36",
      title: "HackerRank CSS",
      issuer: "HackerRank",
      category: "Software Engineering",
      img: "/certificates/cert-41.jpg",
      date: "Jul 20, 2023",
      description: "Cleared HackerRank's CSS skill assessment, demonstrating assessed knowledge of foundational web styling concepts.",
      skills: ["Cascading Style Sheets (CSS)", "HTML", "Web Development"],
      verified: true
    },
    {
      id: "cert-37",
      title: "TCS iON Career Edge: Young Professional",
      issuer: "TCS iON",
      category: "Professional",
      img: "/certificates/cert-23.jpg",
      date: "Jun 11–26, 2023",
      description: "Completed a professional development programme covering communication, presentations, resume writing, interview skills, business etiquette, accounting fundamentals and an introduction to AI.",
      skills: ["Communication", "Stakeholder Management", "Presentation Skills", "Business Analysis"],
      verified: true
    },
    {
      id: "cert-38",
      title: "Transformation Series SIG Workshop",
      issuer: "Marwadi University",
      category: "Professional",
      img: "/certificates/cert-47.jpg",
      date: "Feb 28 – Mar 1, 2023",
      description: "Completed a workshop covering teamwork, leadership, change management and goal-setting practices for personal and professional development.",
      skills: ["Team Management", "Leadership", "Change Management", "Problem Solving"],
      verified: true
    },
    {
      id: "cert-39",
      title: "Backend Web Development Bootcamp (JavaScript, Node.js, Express)",
      issuer: "DevTown, with MLSA and GDSC KIIT",
      category: "Software Engineering",
      img: "/certificates/cert-27.jpg",
      date: "Mar 2023",
      description: "Completed a seven-day backend web development bootcamp focused on JavaScript, Node.js and Express, gaining structured exposure to server-side development concepts.",
      skills: ["Node.js", "Express.js", "JavaScript", "REST API", "DBMS"],
      verified: true
    },
    {
      id: "cert-40",
      title: "Hotstar Clone Bootcamp (HTML, CSS, JavaScript)",
      issuer: "DevTown, AWS Community Builders",
      category: "Software Engineering",
      img: "/certificates/cert-26.jpg",
      date: "2023",
      description: "Completed a seven-day front-end development bootcamp, building a Hotstar-inspired interface using HTML, CSS and JavaScript.",
      skills: ["HTML", "Cascading Style Sheets (CSS)", "JavaScript", "Web Development"],
      verified: true
    },
    {
      id: "cert-41",
      title: "Tinder Clone Bootcamp (HTML and CSS)",
      issuer: "DevTown, GDSC KIIT",
      category: "Software Engineering",
      img: "/certificates/cert-28.jpg",
      date: "2023",
      description: "Completed a seven-day front-end development bootcamp, creating a Tinder-inspired user interface using HTML and CSS.",
      skills: ["HTML", "Cascading Style Sheets (CSS)", "Web Styling", "UI Development"],
      verified: true
    },
    {
      id: "cert-42",
      title: "Tinder Clone Bootcamp (HTML and CSS)",
      issuer: "Microsoft Learn Student Ambassadors",
      category: "Software Engineering",
      img: "/certificates/cert-29.jpg",
      date: "2023",
      description: "Completed a Microsoft Learn Student Ambassadors bootcamp involving the development of a Tinder-inspired interface using HTML and CSS.",
      skills: ["HTML", "Cascading Style Sheets (CSS)", "Responsive Design"],
      verified: true
    },
    {
      id: "cert-43",
      title: "Introduction to Git and GitHub",
      issuer: "Microsoft Learn Student Ambassadors",
      category: "Software Engineering",
      img: "/certificates/cert-25.jpg",
      date: "2023",
      description: "Completed an introductory Git and GitHub learning event, building foundational familiarity with version control and collaborative development workflows.",
      skills: ["Version Control", "GitHub", "Collaborative Workflows", "Software Development"],
      verified: true
    },
    {
      id: "cert-44",
      title: "Azadi ka Amrit Mahotsav Hackathon 2022, Regional Round",
      issuer: "SSIP and Gujarat Knowledge Society (Govt. of Gujarat)",
      category: "Software Engineering",
      img: "/certificates/cert-48.jpg",
      date: "Oct 7–8, 2022",
      description: "Represented Marwadi University as a team member in the regional round of the Azadi ka Amrit Mahotsav Hackathon 2022, held at RK University, Rajkot.",
      skills: ["Problem Solving", "Rapid Prototyping", "Teamwork", "Software Development"],
      verified: true
    },
    {
      id: "cert-45",
      title: "Har Ghar Tiranga: Craft Making Competition",
      issuer: "Marwadi University",
      category: "Professional",
      img: "/certificates/cert-37.jpg",
      date: "Aug 2–10, 2022",
      description: "Participated in Marwadi University's Har Ghar Tiranga craft-making competition as part of the national commemorative initiative.",
      skills: ["Creativity", "Visual Design", "Cultural Initiatives"],
      verified: true
    },
    {
      id: "cert-46",
      title: "Blood Donation Certificate",
      issuer: "PDU Govt. Medical College & Hospital, Rajkot",
      category: "Professional",
      img: "/certificates/cert-34.jpg",
      date: "Mar 15, 2022",
      description: "Recognised by the Blood Bank of PDU Government Medical College & Hospital, Rajkot, for voluntary blood donation.",
      skills: ["Community Service", "Social Responsibility"],
      verified: true
    },
    {
      id: "cert-47",
      title: "AI For All: AI Appreciate Stage",
      issuer: "Intel, CBSE, Digital India",
      category: "AI & GenAI",
      img: "/certificates/cert-33.jpg",
      date: "Aug 20, 2021",
      description: "Completed the AI Appreciate Stage of the AI For All national AI awareness programme, gaining introductory exposure to artificial intelligence concepts.",
      skills: ["Artificial Intelligence (AI)", "Machine Learning", "AI Ethics"],
      verified: true
    },
    {
      id: "cert-48",
      title: "Fundamentals of Digital Marketing",
      issuer: "Google Digital Unlocked (IAB Europe, The Open University)",
      category: "Data Analytics",
      img: "/certificates/cert-49.jpg",
      date: "Jun 1, 2021",
      description: "Passed the Fundamentals of Digital Marketing certification examination through Google Digital Unlocked, in collaboration with IAB Europe and The Open University.",
      skills: ["Digital Marketing", "SEO", "Google Analytics", "Search Engine Optimization (SEO)"],
      verified: true
    },
    {
      id: "cert-49",
      title: "Passport to Communication Skills",
      issuer: "Udemy",
      category: "Professional",
      img: "/certificates/cert-40.jpg",
      date: "Apr 8, 2021",
      description: "Completed a one-hour online course focused on foundational communication skills for personal and professional interactions.",
      skills: ["Communication", "Stakeholder Management", "Professional Presentation"],
      verified: true
    },
  ] as Certificate[],

  rankedSkills: [
    { rank: 1, name: "Business Analysis", category: "Business Analysis & Product Strategy" },
    { rank: 2, name: "Data Analysis", category: "Data Analytics & Business Intelligence" },
    { rank: 3, name: "SQL", category: "Data Analytics & Business Intelligence" },
    { rank: 4, name: "Microsoft Excel", category: "Data Analytics & Business Intelligence" },
    { rank: 5, name: "Requirements Gathering", category: "Business Analysis & Product Strategy" },
    { rank: 6, name: "Stakeholder Management", category: "Business Analysis & Product Strategy" },
    { rank: 7, name: "Power BI", category: "Data Analytics & Business Intelligence" },
    { rank: 8, name: "Python (Programming Language)", category: "AI, ML & Engineering" },
    { rank: 9, name: "Project Management", category: "Business Analysis & Product Strategy" },
    { rank: 10, name: "Business Intelligence (BI)", category: "Data Analytics & Business Intelligence" },
    { rank: 11, name: "Data Visualization", category: "Data Analytics & Business Intelligence" },
    { rank: 12, name: "Requirements Analysis", category: "Business Analysis & Product Strategy" },
    { rank: 13, name: "Agile Methodologies", category: "Business Analysis & Product Strategy" },
    { rank: 14, name: "Project Planning", category: "Business Analysis & Product Strategy" },
    { rank: 15, name: "Problem Solving", category: "Business Analysis & Product Strategy" },
    { rank: 16, name: "Product Analytics", category: "Business Analysis & Product Strategy" },
    { rank: 17, name: "Product Management", category: "Business Analysis & Product Strategy" },
    { rank: 18, name: "KPI Reporting", category: "Business Analysis & Product Strategy" },
    { rank: 19, name: "Statistical Analysis", category: "Data Analytics & Business Intelligence" },
    { rank: 20, name: "Data Interpretation", category: "Data Analytics & Business Intelligence" },
    { rank: 21, name: "Business Process Improvement", category: "Business Analysis & Product Strategy" },
    { rank: 22, name: "Business Process Mapping", category: "Business Analysis & Product Strategy" },
    { rank: 23, name: "Product Metrics", category: "Business Analysis & Product Strategy" },
    { rank: 24, name: "Strategic Thinking", category: "Business Analysis & Product Strategy" },
    { rank: 25, name: "Tableau", category: "Data Analytics & Business Intelligence" },
    { rank: 26, name: "Operations Analytics", category: "Operations & Supply Chain" },
    { rank: 27, name: "Supply Chain Analytics", category: "Operations & Supply Chain" },
    { rank: 28, name: "AI Agents", category: "AI, ML & Engineering" },
    { rank: 29, name: "Large Language Models (LLMs)", category: "AI, ML & Engineering" },
    { rank: 30, name: "API Integration", category: "Full-Stack Web & Software Engineering" },
    { rank: 31, name: "Generative AI", category: "AI, ML & Engineering" },
    { rank: 32, name: "Artificial Intelligence for Business", category: "AI, ML & Engineering" },
    { rank: 33, name: "Prompt Engineering", category: "AI, ML & Engineering" },
    { rank: 34, name: "Change Management", category: "Business Analysis & Product Strategy" },
    { rank: 35, name: "Product Requirements", category: "Business Analysis & Product Strategy" },
    { rank: 36, name: "User Stories", category: "Business Analysis & Product Strategy" },
    { rank: 37, name: "Acceptance Criteria", category: "Business Analysis & Product Strategy" },
    { rank: 38, name: "Jira", category: "Business Analysis & Product Strategy" },
    { rank: 39, name: "REST API", category: "Full-Stack Web & Software Engineering" },
    { rank: 40, name: "Data Cleaning", category: "Data Analytics & Business Intelligence" },
    { rank: 41, name: "Data Modelling", category: "Data Analytics & Business Intelligence" },
    { rank: 42, name: "Product Lifecycle Management", category: "Business Analysis & Product Strategy" },
    { rank: 43, name: "Operations Management", category: "Operations & Supply Chain" },
    { rank: 44, name: "Supply Chain Management", category: "Operations & Supply Chain" },
    { rank: 45, name: "Demand Forecasting", category: "Operations & Supply Chain" },
    { rank: 46, name: "Demand Planning", category: "Operations & Supply Chain" },
    { rank: 47, name: "Inventory Management", category: "Operations & Supply Chain" },
    { rank: 48, name: "Procurement Management", category: "Operations & Supply Chain" },
    { rank: 49, name: "Supplier Risk Management", category: "Operations & Supply Chain" },
    { rank: 50, name: "Logistics Management", category: "Operations & Supply Chain" },
    { rank: 51, name: "A/B Testing", category: "Data Analytics & Business Intelligence" },
    { rank: 52, name: "Cohort Analysis", category: "Data Analytics & Business Intelligence" },
    { rank: 53, name: "Funnel Analysis", category: "Data Analytics & Business Intelligence" },
    { rank: 54, name: "User Behaviour Analysis", category: "Data Analytics & Business Intelligence" },
    { rank: 55, name: "Backlog Management", category: "Business Analysis & Product Strategy" },
    { rank: 56, name: "BRD (Business Requirements Document)", category: "Business Analysis & Product Strategy" },
    { rank: 57, name: "FRD (Functional Requirements Document)", category: "Business Analysis & Product Strategy" },
    { rank: 58, name: "User Acceptance Testing (UAT)", category: "Business Analysis & Product Strategy" },
    { rank: 59, name: "Confluence", category: "Business Analysis & Product Strategy" },
    { rank: 60, name: "Communication", category: "Business Analysis & Product Strategy" },
    { rank: 61, name: "Team Management", category: "Business Analysis & Product Strategy" },
    { rank: 62, name: "Risk Management", category: "Business Analysis & Product Strategy" },
    { rank: 63, name: "Scope Management", category: "Business Analysis & Product Strategy" },
    { rank: 64, name: "Quality Management", category: "Business Analysis & Product Strategy" },
    { rank: 65, name: "Artificial Intelligence (AI)", category: "AI, ML & Engineering" },
    { rank: 66, name: "Machine Learning", category: "AI, ML & Engineering" },
    { rank: 67, name: "SaaS Application Development", category: "Full-Stack Web & Software Engineering" },
    { rank: 68, name: "Database Management System (DBMS)", category: "Databases, Cloud & DevOps" },
    { rank: 69, name: "PostgreSQL", category: "Databases, Cloud & DevOps" },
    { rank: 70, name: "MySQL", category: "Databases, Cloud & DevOps" },
    { rank: 71, name: "MongoDB", category: "Databases, Cloud & DevOps" },
    { rank: 72, name: "Google Cloud Platform (GCP)", category: "Databases, Cloud & DevOps" },
    { rank: 73, name: "Flask", category: "Full-Stack Web & Software Engineering" },
    { rank: 74, name: "Streamlit", category: "Full-Stack Web & Software Engineering" },
    { rank: 75, name: "Software Development", category: "Full-Stack Web & Software Engineering" },
    { rank: 76, name: "Next.js", category: "Full-Stack Web & Software Engineering" },
    { rank: 77, name: "React.js", category: "Full-Stack Web & Software Engineering" },
    { rank: 78, name: "Web Development", category: "Full-Stack Web & Software Engineering" },
    { rank: 79, name: "JavaScript", category: "Full-Stack Web & Software Engineering" },
    { rank: 80, name: "HTML", category: "Full-Stack Web & Software Engineering" },
    { rank: 81, name: "Cascading Style Sheets (CSS)", category: "Full-Stack Web & Software Engineering" },
    { rank: 82, name: "Java", category: "Full-Stack Web & Software Engineering" },
    { rank: 83, name: "PHP", category: "Full-Stack Web & Software Engineering" },
    { rank: 84, name: "Android Development", category: "Full-Stack Web & Software Engineering" },
    { rank: 85, name: "Firebase", category: "Databases, Cloud & DevOps" },
    { rank: 86, name: "Authentication & Authorization", category: "Databases, Cloud & DevOps" },
    { rank: 87, name: "Role-Based Access Control (RBAC)", category: "Databases, Cloud & DevOps" },
    { rank: 88, name: "Vercel", category: "Databases, Cloud & DevOps" },
    { rank: 89, name: "Prisma ORM", category: "Databases, Cloud & DevOps" },
    { rank: 90, name: "SQLite", category: "Databases, Cloud & DevOps" },
    { rank: 91, name: "Optical Character Recognition (OCR)", category: "AI, ML & Engineering" },
    { rank: 92, name: "Google Analytics", category: "Data Analytics & Business Intelligence" },
    { rank: 93, name: "Microsoft 365", category: "Databases, Cloud & DevOps" },
    { rank: 94, name: "Google Search Console", category: "Databases, Cloud & DevOps" },
    { rank: 95, name: "Search Engine Optimization (SEO)", category: "Databases, Cloud & DevOps" },
    { rank: 96, name: "Digital Marketing", category: "Databases, Cloud & DevOps" },
    { rank: 97, name: "WebRTC", category: "Full-Stack Web & Software Engineering" },
    { rank: 98, name: "Computer Networking", category: "Full-Stack Web & Software Engineering" },
    { rank: 99, name: "C (Programming Language)", category: "Full-Stack Web & Software Engineering" },
    { rank: 100, name: "Vibe Coding", category: "AI, ML & Engineering" },
  ] as RankedSkill[],

  skillsConstellation: [
    {
      categoryName: "Business Analysis & Product Strategy",
      skills: [
        { name: "Business Analysis", level: "Expert", proofCount: 6, projectIds: ["proctorshield", "nexspace", "shoesavvy"] },
        { name: "Requirements Gathering", level: "Expert", proofCount: 5, projectIds: ["proctorshield", "taskflow"] },
        { name: "Stakeholder Management", level: "Advanced", proofCount: 4, projectIds: ["proctorshield", "vchat"] },
        { name: "Agile Methodologies", level: "Expert", proofCount: 5, projectIds: ["taskflow", "nexspace"] },
        { name: "Product Management", level: "Advanced", proofCount: 4, projectIds: ["nexspace", "shoesavvy"] },
        { name: "KPI Reporting", level: "Expert", proofCount: 5, projectIds: ["proctorshield", "shoesavvy"] },
        { name: "User Stories & Acceptance Criteria", level: "Expert", proofCount: 4, projectIds: ["taskflow"] },
        { name: "Jira & Confluence", level: "Advanced", proofCount: 4, projectIds: ["taskflow"] },
      ]
    },
    {
      categoryName: "Data Analytics & Business Intelligence",
      skills: [
        { name: "Data Analysis", level: "Expert", proofCount: 6, projectIds: ["proctorshield", "shoesavvy", "nexspace"] },
        { name: "SQL (Advanced)", level: "Expert", proofCount: 6, projectIds: ["shoesavvy", "spotify-clone", "proctorshield"] },
        { name: "Microsoft Excel", level: "Advanced", proofCount: 4, projectIds: ["shoesavvy"] },
        { name: "Power BI", level: "Advanced", proofCount: 4, projectIds: ["shoesavvy", "taskflow"] },
        { name: "Business Intelligence (BI)", level: "Advanced", proofCount: 4, projectIds: ["proctorshield", "shoesavvy"] },
        { name: "Data Visualization", level: "Expert", proofCount: 5, projectIds: ["proctorshield", "chat-with-pdf"] },
        { name: "Statistical Analysis", level: "Proficient", proofCount: 3, projectIds: ["proctorshield"] },
        { name: "Tableau", level: "Proficient", proofCount: 3, projectIds: ["shoesavvy"] },
      ]
    },
    {
      categoryName: "Generative AI & Machine Learning",
      skills: [
        { name: "Generative AI", level: "Expert", proofCount: 5, projectIds: ["chat-with-pdf", "echo-assistant"] },
        { name: "Large Language Models (LLMs)", level: "Expert", proofCount: 4, projectIds: ["chat-with-pdf"] },
        { name: "Prompt Engineering", level: "Expert", proofCount: 5, projectIds: ["chat-with-pdf"] },
        { name: "AI Agents", level: "Advanced", proofCount: 3, projectIds: ["chat-with-pdf"] },
        { name: "TensorFlow", level: "Advanced", proofCount: 4, projectIds: ["proctorshield"] },
        { name: "OpenCV", level: "Advanced", proofCount: 3, projectIds: ["proctorshield"] },
        { name: "Python (Programming Language)", level: "Expert", proofCount: 6, projectIds: ["proctorshield", "chat-with-pdf", "echo-assistant"] },
        { name: "Machine Learning", level: "Advanced", proofCount: 4, projectIds: ["proctorshield"] },
      ]
    },
    {
      categoryName: "Full-Stack Web & Software Engineering",
      skills: [
        { name: "Next.js", level: "Expert", proofCount: 5, projectIds: ["nexspace", "spotify-clone"] },
        { name: "React.js", level: "Expert", proofCount: 6, projectIds: ["nexspace", "taskflow", "spotify-clone"] },
        { name: "TypeScript & JavaScript", level: "Expert", proofCount: 6, projectIds: ["nexspace", "taskflow"] },
        { name: "REST API", level: "Expert", proofCount: 6, projectIds: ["taskflow", "spotify-clone", "proctorshield"] },
        { name: "PHP", level: "Proficient", proofCount: 4, projectIds: ["shoesavvy", "vchat"] },
        { name: "WebRTC", level: "Proficient", proofCount: 3, projectIds: ["proctorshield", "vchat"] },
        { name: "HTML & CSS", level: "Expert", proofCount: 7, projectIds: ["nexspace", "proctorshield", "shoesavvy"] },
        { name: "TailwindCSS", level: "Expert", proofCount: 7, projectIds: ["nexspace", "proctorshield"] },
      ]
    },
    {
      categoryName: "Databases, Cloud & DevOps",
      skills: [
        { name: "PostgreSQL", level: "Advanced", proofCount: 4, projectIds: ["spotify-clone"] },
        { name: "MySQL", level: "Advanced", proofCount: 4, projectIds: ["shoesavvy"] },
        { name: "MongoDB", level: "Advanced", proofCount: 4, projectIds: ["taskflow"] },
        { name: "SQLite", level: "Proficient", proofCount: 3, projectIds: ["proctorshield"] },
        { name: "Google Cloud Platform (GCP)", level: "Proficient", proofCount: 3, projectIds: ["nexspace", "chat-with-pdf"] },
        { name: "Vercel", level: "Expert", proofCount: 5, projectIds: ["nexspace", "spotify-clone"] },
        { name: "Authentication & Authorization (RBAC)", level: "Advanced", proofCount: 4, projectIds: ["taskflow", "nexspace"] },
        { name: "Prisma ORM", level: "Advanced", proofCount: 4, projectIds: ["spotify-clone"] },
      ]
    },
    {
      categoryName: "Operations & Supply Chain",
      skills: [
        { name: "Operations Management", level: "Advanced", proofCount: 3, projectIds: ["shoesavvy"] },
        { name: "Operations Analytics", level: "Advanced", proofCount: 3, projectIds: ["shoesavvy"] },
        { name: "Supply Chain Management", level: "Advanced", proofCount: 3, projectIds: ["shoesavvy"] },
        { name: "Supply Chain Analytics", level: "Advanced", proofCount: 3, projectIds: ["shoesavvy"] },
        { name: "Demand Forecasting & Planning", level: "Proficient", proofCount: 3, projectIds: ["shoesavvy"] },
        { name: "Inventory Management", level: "Proficient", proofCount: 3, projectIds: ["shoesavvy"] },
        { name: "Procurement & Supplier Risk", level: "Proficient", proofCount: 3, projectIds: ["shoesavvy"] },
        { name: "Logistics Management", level: "Proficient", proofCount: 3, projectIds: ["shoesavvy"] },
      ]
    }
  ],

  journey: {
    experience: [
      {
        id: "creart-php-intern",
        type: "experience",
        title: "PHP Developer Intern",
        organization: "CreArt Solution",
        period: "27th July 2023 - 10th Aug 2023",
        description: "In this intern i have developed web based application using php frameworks and WebRTC real-time systems.",
        skills: ["PHP Frameworks", "Web Application", "WebRTC", "MySQL"],
        relatedProjectId: "vchat"
      },
      {
        id: "internsavy-android-intern",
        type: "experience",
        title: "Android Developer Intern",
        organization: "INTERNSAVY",
        period: "1st july 2023 - 27th July 2023",
        description: "In this Internship i have learned Android Development, UI components, and mobile lifecycle architecture.",
        skills: ["Android Development", "Java", "Mobile UI", "XML"]
      }
    ] as JourneyItem[],

    education: [
      {
        id: "marwadi-be-cse",
        type: "education",
        title: "BE - Computer Science",
        organization: "Marwadi Education Foundation - GTU",
        period: "2020 - 2024",
        description: "Graduated with comprehensive specialization in Software Engineering, Artificial Intelligence, and Distributed Database Architecture. Capstone: ProctorShield.",
        skills: ["Computer Science", "Artificial Intelligence", "Distributed Systems", "Algorithms"],
        relatedProjectId: "proctorshield"
      },
      {
        id: "aditya-birla-intermediate",
        type: "education",
        title: "INTERMEDIATE",
        organization: "Aditya Birla Higher Secondary School",
        period: "2018 - 2020",
        description: "Senior secondary education focused on Mathematics, Physics, Chemistry, and Foundations of Computer Science.",
        skills: ["Mathematics", "Physics", "Computer Science Foundations"]
      }
    ] as JourneyItem[]
  }
};
