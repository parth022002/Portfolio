export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'AI & GenAI' | 'Full Stack' | 'Data & Real-time' | 'E-commerce';
  status: 'Production' | 'Live Demo' | 'Research Prototype';
  img: string;
  liveUrl?: string;
  githubUrl?: string;
  businessImpact: string;
  technicalSummary: string;
  problemStatement: string;
  solutionArchitecture: string;
  techStack: string[];
  keyMetrics: { label: string; value: string }[];
  videoChapters: { time: string; title: string; desc: string }[];
  transcriptSnippet: string;
  relatedSkills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: 'Microsoft & LinkedIn' | 'Tata' | 'Google' | 'HackerRank' | 'Intel & Others';
  category: 'AI & GenAI' | 'Data Analytics' | 'Software Engineering' | 'Professional';
  img: string;
  date: string;
  skills: string[];
  verified: boolean;
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
      { label: "Verified Certifications", value: "16+" },
      { label: "Years of Engineering", value: "4+" },
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
      liveUrl: "https://github.com/parth022002/ProctorShield",
      githubUrl: "https://github.com/parth022002/ProctorShield",
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
      liveUrl: "https://nexspace.vercel.app/",
      githubUrl: "https://github.com/parth022002/NexSpace",
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
      liveUrl: "https://github.com/parth022002/Chat-with-pdf",
      githubUrl: "https://github.com/parth022002/Chat-with-pdf",
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
      liveUrl: "https://spotify-music-for-me.vercel.app/",
      githubUrl: "https://github.com/parth022002",
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
      liveUrl: "https://github.com/parth022002/Voice-Assistant",
      githubUrl: "https://github.com/parth022002/Voice-Assistant",
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
      liveUrl: "https://github.com/parth022002/Task-Manager",
      githubUrl: "https://github.com/parth022002/Task-Manager",
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
      liveUrl: "https://shoesavvy.42web.io/",
      githubUrl: "https://github.com/parth022002",
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
      liveUrl: "https://github.com/parth022002/Internship",
      githubUrl: "https://github.com/parth022002/Internship",
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

  certificates: [
    {
      id: "cert-generative-ai",
      title: "Career Essentials in Generative AI",
      issuer: "Microsoft & LinkedIn",
      category: "AI & GenAI",
      img: "/4)CertificateOfCompletion_Career Essentials in Generative AI by Microsoft and LinkedIn-1.jpg",
      date: "Verified Credential",
      skills: ["Generative AI", "Large Language Models", "Prompt Engineering", "Responsible AI"],
      verified: true
    },
    {
      id: "cert-software-dev",
      title: "Career Essentials in Software Development",
      issuer: "Microsoft & LinkedIn",
      category: "Software Engineering",
      img: "/3)CertificateOfCompletion_Career Essentials in Software Development by Microsoft and LinkedIn.jpg",
      date: "Verified Credential",
      skills: ["Software Engineering", "SDLC", "System Architecture", "Programming Foundations"],
      verified: true
    },
    {
      id: "cert-tata-viz",
      title: "Data Visualisation: Empowering Business with Effective Insights",
      issuer: "Tata",
      category: "Data Analytics",
      img: "/2)Tata-Data Visualisation.jpg",
      date: "Verified Credential",
      skills: ["Data Visualisation", "Business Insights", "Executive Dashboards", "Data Storytelling"],
      verified: true
    },
    {
      id: "cert-genai-foundations",
      title: "Generative AI Foundations & Application",
      issuer: "Intel & Others",
      category: "AI & GenAI",
      img: "/1)generativeai.jpg",
      date: "Verified Credential",
      skills: ["Deep Learning", "Transformer Models", "AI Ethics", "Model Evaluation"],
      verified: true
    },
    {
      id: "cert-100-days-code",
      title: "100 Days Coding Series Challenge",
      issuer: "Intel & Others",
      category: "Software Engineering",
      img: "/5)100 Days Coding Series Challenge Certificate_Parth Ahuja-1.jpg",
      date: "Verified Credential",
      skills: ["Data Structures", "Algorithms", "Problem Solving", "Competitive Programming"],
      verified: true
    },
    {
      id: "cert-sql-advanced",
      title: "SQL Advanced Certification",
      issuer: "HackerRank",
      category: "Data Analytics",
      img: "/10)sql_advanced certificate-1.jpg",
      date: "Verified Credential",
      skills: ["Complex Joins", "Window Functions", "Query Optimization", "Schema Design"],
      verified: true
    },
    {
      id: "cert-python-basic",
      title: "Python Programming Certification",
      issuer: "HackerRank",
      category: "Software Engineering",
      img: "/8)python_basic certificate-1.jpg",
      date: "Verified Credential",
      skills: ["Python", "Object-Oriented Programming", "Functional Programming"],
      verified: true
    },
    {
      id: "cert-google-analytics",
      title: "Google Analytics for Beginners",
      issuer: "Google",
      category: "Data Analytics",
      img: "/15)Google Analytics for Beginners-1.jpg",
      date: "Verified Credential",
      skills: ["Web Analytics", "Funnel Tracking", "Conversion Optimization", "Audience Segmentation"],
      verified: true
    },
    {
      id: "cert-digital-marketing",
      title: "Fundamentals of Digital Marketing",
      issuer: "Google",
      category: "Data Analytics",
      img: "/14)Digital Marketing By Google-1.jpg",
      date: "Verified Credential",
      skills: ["SEO", "Conversion Strategy", "Content Distribution", "Digital Channels"],
      verified: true
    },
    {
      id: "cert-ai-appreciate",
      title: "AI Appreciation Certification",
      issuer: "Intel & Others",
      category: "AI & GenAI",
      img: "/12)AI_appreciate-1.jpg",
      date: "Verified Credential",
      skills: ["Machine Learning Concepts", "Neural Networks", "Data Preparation"],
      verified: true
    },
    {
      id: "cert-software-engineer",
      title: "Software Engineer Certification",
      issuer: "HackerRank",
      category: "Software Engineering",
      img: "/6)software_engineer certificate-1.jpg",
      date: "Verified Credential",
      skills: ["API Design", "Architecture", "Debugging", "Data Structures"],
      verified: true
    },
    {
      id: "cert-communication",
      title: "Passport to Communication Skill",
      issuer: "Intel & Others",
      category: "Professional",
      img: "/11)Passport to communication Skill-1.jpg",
      date: "Verified Credential",
      skills: ["Executive Communication", "Technical Presentation", "Stakeholder Alignment"],
      verified: true
    }
  ] as Certificate[],

  skillsConstellation: [
    {
      categoryName: "Generative AI & Machine Learning",
      skills: [
        { name: "TensorFlow", level: "Advanced", proofCount: 3, projectIds: ["proctorshield"] },
        { name: "LangChain / RAG", level: "Advanced", proofCount: 2, projectIds: ["chat-with-pdf"] },
        { name: "OpenCV", level: "Proficient", proofCount: 2, projectIds: ["proctorshield"] },
        { name: "Prompt Engineering", level: "Expert", proofCount: 4, projectIds: ["chat-with-pdf"] },
        { name: "Vector Databases (FAISS)", level: "Proficient", proofCount: 2, projectIds: ["chat-with-pdf"] },
      ]
    },
    {
      categoryName: "Full-Stack Web Architecture",
      skills: [
        { name: "Next.js & React", level: "Expert", proofCount: 5, projectIds: ["nexspace", "spotify-clone"] },
        { name: "TypeScript / JavaScript", level: "Expert", proofCount: 6, projectIds: ["nexspace", "taskflow"] },
        { name: "Tailwind CSS", level: "Expert", proofCount: 7, projectIds: ["nexspace", "proctorshield"] },
        { name: "Node.js & Express", level: "Advanced", proofCount: 4, projectIds: ["taskflow"] },
        { name: "PHP & WebRTC", level: "Proficient", proofCount: 3, projectIds: ["vchat", "shoesavvy"] },
      ]
    },
    {
      categoryName: "Data & Business Analytics",
      skills: [
        { name: "SQL (Advanced)", level: "Advanced", proofCount: 4, projectIds: ["spotify-clone", "shoesavvy"] },
        { name: "Data Visualisation", level: "Advanced", proofCount: 3, projectIds: ["proctorshield"] },
        { name: "Google Analytics & Metrics", level: "Proficient", proofCount: 2, projectIds: ["nexspace"] },
        { name: "Database Design (PostgreSQL / Mongo)", level: "Advanced", proofCount: 5, projectIds: ["spotify-clone", "taskflow"] },
      ]
    },
    {
      categoryName: "Engineering & DevOps",
      skills: [
        { name: "Git & GitHub CI/CD", level: "Advanced", proofCount: 8, projectIds: ["proctorshield", "nexspace"] },
        { name: "RESTful API Architecture", level: "Expert", proofCount: 6, projectIds: ["taskflow", "spotify-clone"] },
        { name: "Vercel Edge Deployment", level: "Expert", proofCount: 4, projectIds: ["nexspace", "spotify-clone"] },
        { name: "Security & JWT Auth", level: "Advanced", proofCount: 4, projectIds: ["taskflow", "nexspace"] },
      ]
    }
  ],

  experience: [
    {
      role: "Software Engineering Intern",
      company: "CreArt Solutions",
      period: "Jul 2023 - Aug 2023",
      description: "Spearheaded real-time peer-to-peer video streaming implementation (VChat) leveraging WebRTC and PHP. Engineered signaling exchange protocol and reduced media latency by 28%.",
      skills: ["WebRTC", "PHP", "JavaScript", "Network Traversal"]
    },
    {
      role: "Bachelor of Technology in Computer Engineering",
      company: "University Academic Program",
      period: "Graduated 2024",
      description: "Specialized in Artificial Intelligence, Distributed Systems, Database Management, and Software Engineering. Final Year Capstone: ProctorShield (Online AI Proctoring System).",
      skills: ["Computer Vision", "Machine Learning", "System Design", "Cloud Architecture"]
    }
  ]
};
