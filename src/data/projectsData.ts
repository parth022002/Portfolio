import type { Project } from './portfolioData';

export const COMPLETED_PROJECTS: Project[] = [
  {
    "id": "procurax",
    "number": "01",
    "title": "ProcuraX",
    "tagline": "Agentic AI for Supply Chain & Procurement Decision Intelligence",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 1",
    "projectType": "PERSONAL",
    "img": "/Feature Project/ProcuraX - Agentic AI for Supply Chain & Procurement Decision Intelligence/deployed_hero.png",
    "images": [
      "/Feature Project/ProcuraX - Agentic AI for Supply Chain & Procurement Decision Intelligence/deployed_hero.png",
      "/Feature Project/ProcuraX - Agentic AI for Supply Chain & Procurement Decision Intelligence/deployed_full.png",
      "/Feature Project/ProcuraX - Agentic AI for Supply Chain & Procurement Decision Intelligence/Screenshot 2026-11-24 225608.png",
      "/Feature Project/ProcuraX - Agentic AI for Supply Chain & Procurement Decision Intelligence/Screenshot 2026-11-24 225628.png"
    ],
    "imageCaptions": [
      "ProcuraX — Live Application Landing View",
      "ProcuraX — Full Platform Architecture & Interactive Interface",
      "ProcuraX — Live System Walkthrough & Feature View (225608)",
      "ProcuraX — Live System Walkthrough & Feature View (225628)"
    ],
    "liveUrl": "https://procurax-five.vercel.app/",
    "githubUrl": "https://github.com/parth022002/ProcuraX",
    "linkedinUrl": "https://lnkd.in/p/dgsGRphu",
    "businessImpact": "Transforms supply chain resilience from reactive firefighting into sovereign decision intelligence, eliminating high-cost downtime by predicting shocks, quantifying multi-tier BOM runway exposures, and optimizing mitigation costs.",
    "technicalSummary": "Agentic decision platform orchestrating external shock ingestion (GDELT, Marketaux, SEC filings), predictive disruption scoring, constraint optimization, and hybrid RAG contract checks with cryptographic human-in-the-loop approval.",
    "problemStatement": "Traditional ERPs and BI tools are passive record-keepers that alert procurement teams only after safety stocks deplete and production lines halt during unforeseen supplier disruptions.",
    "highlights": [
      "Ingests external market and trade shock signals to compute exact multi-tier bill-of-materials (BOM) inventory runway exposures.",
      "Solves constraint optimization balancing supplier switching costs against production line-down penalties with hybrid RAG verification.",
      "Enforces cryptographic human-in-the-loop approval workflows with immutable decision packets before action staging."
    ],
    "solutionArchitecture": "FastAPI ASGI backend orchestrating multi-agent state graphs -> Neon Serverless PostgreSQL persistence -> Hybrid RAG document embedding -> React 19 / TypeScript responsive executive cockpit on Vercel.",
    "techStack": [
      "FastAPI",
      "Python",
      "LangGraph",
      "Neon PostgreSQL",
      "RAG",
      "React 19",
      "TypeScript",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Signal Ingestion Recall",
        "value": "99.4%"
      },
      {
        "label": "Optimization Solve Time",
        "value": "< 1.4s"
      },
      {
        "label": "Mitigation Packet Audit",
        "value": "100% Traceable"
      }
    ],
    "relatedSkills": [
      "Python",
      "FastAPI",
      "LangGraph",
      "Supply Chain",
      "PostgreSQL",
      "RAG",
      "Decision Intelligence",
      "React",
      "TypeScript"
    ]
  },
  {
    "id": "marketscope",
    "number": "02",
    "title": "MarketScope.io",
    "tagline": "AI-Powered Multi-Asset Investment Research & Decision Support",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 1",
    "projectType": "PERSONAL",
    "img": "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/deployed_hero.png",
    "images": [
      "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/deployed_hero.png",
      "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/portfolio_featured.png",
      "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/deployed_full.png",
      "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/Screenshot 2026-11-24 224946.png",
      "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/Screenshot 2026-11-24 224956.png",
      "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/Screenshot 2026-11-24 225010.png",
      "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/Screenshot 2026-11-24 225028.png",
      "/Feature Project/MarketScope.io - AI Powered Multi - Assest Investment Research & Decision Support/Screenshot 2026-11-24 225050.png"
    ],
    "imageCaptions": [
      "MarketScope.io — Live Application Landing View",
      "MarketScope.io — Feature Spotlight & UI Design Overview",
      "MarketScope.io — Full Platform Architecture & Interactive Interface",
      "MarketScope.io — Live System Walkthrough & Feature View (224946)",
      "MarketScope.io — Live System Walkthrough & Feature View (224956)",
      "MarketScope.io — Live System Walkthrough & Feature View (225010)",
      "MarketScope.io — Live System Walkthrough & Feature View (225028)",
      "MarketScope.io — Live System Walkthrough & Feature View (225050)"
    ],
    "liveUrl": "https://marketscope-two.vercel.app/",
    "githubUrl": "https://github.com/parth022002/marketscope",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Consolidates complex market signals, filings, and financial metrics into an explainable quantitative score, reducing research time from hours to seconds for institutional and retail investors.",
    "technicalSummary": "AI-powered investment research platform combining live market data, financial statement analysis, DuPont ROE decomposition, and sentiment signals into a normalized composite score.",
    "problemStatement": "Investors struggle with fragmented data across terminals, filings, and charts, leading to slow synthesis, subjective decisions, and missed market opportunities.",
    "highlights": [
      "Proprietary quantitative scoring engine weighting fundamental quality (35%), growth momentum (25%), technical trends (20%), and sentiment (20%).",
      "DuPont 3-stage / 5-stage ROE decomposition with peer valuation multiples and real-time interactive technical screening.",
      "Cited AI company research with grounded financial citations and interactive virtual paper trading simulation."
    ],
    "solutionArchitecture": "Next.js App Router & React 19 -> FastAPI / Python quantitative analytics engine -> PostgreSQL time-series store -> Twelve Data & FMP streaming APIs -> OpenRouter / Gemini LLM research citing.",
    "techStack": [
      "Next.js",
      "React 19",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "WebSockets",
      "TradingView",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Scoring Engine Weights",
        "value": "4 Factor Model"
      },
      {
        "label": "Financial Citation Accuracy",
        "value": "100% Grounded"
      },
      {
        "label": "Streaming Latency",
        "value": "< 95ms"
      }
    ],
    "relatedSkills": [
      "Financial Analysis",
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Data Analytics",
      "Quantitative Modeling"
    ]
  },
  {
    "id": "canteen-optimization",
    "number": "03",
    "title": "College Canteen Inventory, Sales & Wastage Optimization System",
    "tagline": "Operations Management & Demand Forecasting Capstone",
    "category": "Business Analytics & Strategy",
    "status": "Case Study",
    "importanceLevel": "Level 1",
    "projectType": "ACADEMIC",
    "img": "/Feature Project/College Canteen inventory, Sales and wastage optimization system/01_Canteen_ICMS_Introduction.png",
    "images": [
      "/Feature Project/College Canteen inventory, Sales and wastage optimization system/01_Canteen_ICMS_Introduction.png",
      "/Feature Project/College Canteen inventory, Sales and wastage optimization system/02_The_Canteen_Problem.png",
      "/Feature Project/College Canteen inventory, Sales and wastage optimization system/03_The_ICMS_Solution.png",
      "/Feature Project/College Canteen inventory, Sales and wastage optimization system/04_Key_Benefits.png",
      "/Feature Project/College Canteen inventory, Sales and wastage optimization system/05_Business_Impact.png"
    ],
    "imageCaptions": [
      "College Canteen Inventory, Sales & Wastage Optimization System — System Introduction & Core Framework",
      "College Canteen Inventory, Sales & Wastage Optimization System — Operational Problem & Demand Modeling",
      "College Canteen Inventory, Sales & Wastage Optimization System — Optimization Solution & Workflow Design",
      "College Canteen Inventory, Sales & Wastage Optimization System — Key Benefits & Execution Metrics",
      "College Canteen Inventory, Sales & Wastage Optimization System — Strategic Business Impact & Outcomes"
    ],
    "businessImpact": "Identified ₹3.96 lakh in annual food wastage across preparation categories and designed optimized AS-IS / TO-BE workflows with demand-driven inventory controls targeting >=50% waste reduction.",
    "technicalSummary": "Comprehensive Business Requirements Document (BRD), operational process analysis, Economic Order Quantity (EOQ) replenishment modeling, and executive KPI framework designed for institutional dining facilities.",
    "problemStatement": "High-volume college canteens suffer from unscientific procurement schedules, volatile student footfall, and poor shelf-life tracking, causing severe financial leakage and food waste.",
    "highlights": [
      "Quantified ₹3.96 lakh annual food spoilage through root-cause Pareto analysis and demand variation tracking.",
      "Engineered streamlined AS-IS and TO-BE workflows establishing safety stock buffers and batch preparation controls.",
      "Defined executive KPI monitoring frameworks tracking waste percentage, inventory turnover ratio, and food cost variance."
    ],
    "solutionArchitecture": "Audited multi-point sales & inventory data -> Applied ABC/XYZ classification on menu items -> Designed EOQ replenishment models -> Formulated BRD specifications for institutional ERP adoption.",
    "techStack": [
      "Business Requirements (BRD)",
      "Operations Management",
      "Inventory Control",
      "Process Mapping",
      "Excel Modeling",
      "KPI Dashboards"
    ],
    "keyMetrics": [
      {
        "label": "Annual Wastage Identified",
        "value": "₹3.96 Lakh"
      },
      {
        "label": "Target Waste Reduction",
        "value": "≥ 50%"
      },
      {
        "label": "Inventory Audit Accuracy",
        "value": "100% Mapped"
      }
    ],
    "relatedSkills": [
      "Business Analytics",
      "Operations Management",
      "Supply Chain",
      "BRD Writing",
      "Inventory Optimization",
      "Process Optimization"
    ]
  },
  {
    "id": "metro-crowd-management",
    "number": "04",
    "title": "Queue & Crowd Management System in Bengaluru Metro Yellow Line",
    "tagline": "Operations Management & Passenger Throughput Study at Electronic City",
    "category": "Business Analytics & Strategy",
    "status": "Case Study",
    "importanceLevel": "Level 1",
    "projectType": "ACADEMIC",
    "img": "/Feature Project/Analysis of Queue & Crowd Management System in Bengaluru Metro Yellow Line/Bengaluru Metro Yellow Line Insights-1.png",
    "images": [
      "/Feature Project/Analysis of Queue & Crowd Management System in Bengaluru Metro Yellow Line/Bengaluru Metro Yellow Line Insights-1.png",
      "/Feature Project/Analysis of Queue & Crowd Management System in Bengaluru Metro Yellow Line/Bengaluru Metro Crowd Management Infographic-2.png",
      "/Feature Project/Analysis of Queue & Crowd Management System in Bengaluru Metro Yellow Line/Bengaluru Metro Queue Management Infographic-4.png",
      "/Feature Project/Analysis of Queue & Crowd Management System in Bengaluru Metro Yellow Line/Bengaluru Metro Queue Management Infographic-5.png",
      "/Feature Project/Analysis of Queue & Crowd Management System in Bengaluru Metro Yellow Line/Bengaluru Metro Yellow Line Project Showcase-3.png"
    ],
    "imageCaptions": [
      "Queue & Crowd Management System in Bengaluru Metro Yellow Line — Bengaluru Metro Yellow Line Insights 1",
      "Queue & Crowd Management System in Bengaluru Metro Yellow Line — Bengaluru Metro Crowd Management Infographic 2",
      "Queue & Crowd Management System in Bengaluru Metro Yellow Line — Bengaluru Metro Queue Management Infographic 4",
      "Queue & Crowd Management System in Bengaluru Metro Yellow Line — Bengaluru Metro Queue Management Infographic 5",
      "Queue & Crowd Management System in Bengaluru Metro Yellow Line — Bengaluru Metro Yellow Line Project Showcase 3"
    ],
    "businessImpact": "Formulated operational interventions reducing peak-hour passenger platform dwell times by an estimated 35% and cutting ticketing counter queues through digital QR ticketing and dynamic gate allocation.",
    "technicalSummary": "Empirical Operations Management study examining passenger movement, queuing dynamics, and station capacity bottlenecks at Electronic City station during evening peak hours.",
    "problemStatement": "Rapid urban transit expansions face intense localized crowding at suburban tech hubs, creating severe platform bottlenecks, missed train departures, and safety hazards.",
    "highlights": [
      "Conducted on-site descriptive research and wait-time observational sampling at Electronic City Metro Station during evening peak hours.",
      "Pinpointed station bottlenecks across manual token kiosks, single-file security checks, and platform boarding zones.",
      "Formulated strategic recommendations spanning digital ticketing, serpentine queue redesign, peak-hour feeder alignment, and computer-vision crowd density monitoring."
    ],
    "solutionArchitecture": "Field observation & convenience sampling -> Bottleneck identification via queuing theory -> Capacity vs demand variance modeling -> Actionable policy roadmap for BMRCL leadership.",
    "techStack": [
      "Operations Management",
      "Queuing Theory",
      "Process Engineering",
      "Capacity Planning",
      "Statistical Analysis",
      "Transportation Analytics"
    ],
    "keyMetrics": [
      {
        "label": "Dwell Time Reduction",
        "value": "35% Projected"
      },
      {
        "label": "Observed Peak Congestion",
        "value": "Evening Rush"
      },
      {
        "label": "Key Bottleneck Stations",
        "value": "Security & Gates"
      }
    ],
    "relatedSkills": [
      "Operations Management",
      "Queuing Theory",
      "Data Analytics",
      "Process Optimization",
      "Capacity Planning",
      "Field Research"
    ]
  },
  {
    "id": "proctorshield",
    "number": "05",
    "title": "ProctorShield",
    "tagline": "AI-Powered Real-Time Remote Examination Integrity System",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 2",
    "projectType": "ACADEMIC",
    "img": "/Feature Project/ProctorShield/portfolio_featured.png",
    "images": [
      "/Feature Project/ProctorShield/portfolio_featured.png",
      "/Feature Project/ProctorShield/deployed_full.png"
    ],
    "imageCaptions": [
      "ProctorShield — Feature Spotlight & UI Design Overview",
      "ProctorShield — Full Platform Architecture & Interactive Interface"
    ],
    "liveUrl": "https://proctor-shield-phi.vercel.app/",
    "githubUrl": "https://github.com/parth022002/ProctorShield",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Eliminates high-cost human invigilator overhead by automating exam fraud detection across 1,000+ simultaneous test-takers with tamper-proof audit trails.",
    "technicalSummary": "End-to-end proctoring platform combining WebRTC streaming with custom TensorFlow, MediaPipe FaceMesh, and OpenCV models for head-pose estimation, multi-face verification, and audio anomaly detection.",
    "problemStatement": "High-stakes online examinations suffer from impersonation, secondary screen usage, and background collaboration without an economical automated supervision solution.",
    "highlights": [
      "Sub-140ms edge inference for multi-face verification, head-pose angles, and acoustic anomaly detection.",
      "Tamper-proof SQLite audit logging with automated infraction screenshot generation.",
      "Reduced bandwidth consumption by 45% using selective keyframe delta streaming."
    ],
    "solutionArchitecture": "Client browser streams media via WebRTC -> Flask ASGI server -> Quantized TensorFlow and MediaPipe neural network pipeline -> SQLite audit trail.",
    "techStack": [
      "Python",
      "Flask",
      "TensorFlow",
      "MediaPipe",
      "OpenCV",
      "WebRTC",
      "TailwindCSS",
      "SQLite"
    ],
    "keyMetrics": [
      {
        "label": "Detection Latency",
        "value": "< 140ms"
      },
      {
        "label": "Face Anomaly Precision",
        "value": "99.2%"
      },
      {
        "label": "Bandwidth Optimization",
        "value": "45% saved"
      }
    ],
    "relatedSkills": [
      "Python",
      "TensorFlow",
      "Computer Vision",
      "WebRTC",
      "Flask",
      "Machine Learning"
    ]
  },
  {
    "id": "madirae",
    "number": "06",
    "title": "Madirae & Co",
    "tagline": "Premium Indian Spirits & Wine Digital Brand Intelligence",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 2",
    "projectType": "ACADEMIC",
    "img": "/Feature Project/Madirae & Co - Alcohol Brand Analysis/deployed_full.png",
    "images": [
      "/Feature Project/Madirae & Co - Alcohol Brand Analysis/deployed_full.png",
      "/Feature Project/Madirae & Co - Alcohol Brand Analysis/Screenshot 2026-11-24 224625.png",
      "/Feature Project/Madirae & Co - Alcohol Brand Analysis/Screenshot 2026-11-24 224645.png",
      "/Feature Project/Madirae & Co - Alcohol Brand Analysis/Screenshot 2026-11-24 224700.png"
    ],
    "imageCaptions": [
      "Madirae & Co — Full Platform Architecture & Interactive Interface",
      "Madirae & Co — Live System Walkthrough & Feature View (224625)",
      "Madirae & Co — Live System Walkthrough & Feature View (224645)",
      "Madirae & Co — Live System Walkthrough & Feature View (224700)"
    ],
    "liveUrl": "https://madirae.vercel.app/",
    "githubUrl": "https://github.com/parth022002/madirae",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Created an immersive, compliance-ready digital commerce experience showcasing 40 curated artisanal craft spirits with real-time 3D product visualizations and AI-assisted mixology.",
    "technicalSummary": "Next.js 15 and React 19 web application combining Three.js 3D model rendering, GSAP timeline animations, Lenis smooth scrolling, and AI recipe recommendations.",
    "problemStatement": "Premium craft beverage brands struggle to communicate sensory tasting profiles, heritage, and cocktail pairings through static 2D e-commerce templates.",
    "highlights": [
      "Interactive 3D bottle visualizer built with Three.js enabling 360-degree rotation and dynamic lighting reflection.",
      "Curated catalog of 40 products across 7 categories with provenance notes and pricing analytics.",
      "Integrated AI mixology assistant delivering bespoke cocktail pairing suggestions based on selected ingredients."
    ],
    "solutionArchitecture": "Next.js 15 App Router -> Three.js WebGL canvas -> GSAP animation orchestrations -> TailwindCSS -> Vercel edge deployment.",
    "techStack": [
      "Next.js 15",
      "React 19",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
      "TypeScript"
    ],
    "keyMetrics": [
      {
        "label": "Product Catalog",
        "value": "40 Spirits"
      },
      {
        "label": "3D Frame Rate",
        "value": "60 FPS WebGL"
      },
      {
        "label": "Mobile Responsiveness",
        "value": "100%"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "React",
      "Three.js",
      "GSAP",
      "TypeScript",
      "Frontend Engineering",
      "UI/UX"
    ]
  },
  {
    "id": "foodcue",
    "number": "07",
    "title": "FoodCue",
    "tagline": "Packaged Food Label Intelligence, OCR SmartScan & Expiry Reminder",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 2",
    "projectType": "PERSONAL",
    "img": "/Feature Project/FoodCue - Food Understanding & Reminder/deployed_hero.png",
    "images": [
      "/Feature Project/FoodCue - Food Understanding & Reminder/deployed_hero.png",
      "/Feature Project/FoodCue - Food Understanding & Reminder/portfolio_featured.png",
      "/Feature Project/FoodCue - Food Understanding & Reminder/deployed_full.png"
    ],
    "imageCaptions": [
      "FoodCue — Live Application Landing View",
      "FoodCue — Feature Spotlight & UI Design Overview",
      "FoodCue — Full Platform Architecture & Interactive Interface"
    ],
    "liveUrl": "https://food-cue.vercel.app/",
    "githubUrl": "https://github.com/parth022002/FoodCue",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Protects consumers with immediate ingredient transparency, allergen detection, and intelligent pantry management that reduces household food spoilage.",
    "technicalSummary": "Local-first progressive web application combining on-device OCR label parsing, barcode scanning, ingredient health scoring, and smart pantry inventory tracking.",
    "problemStatement": "Consumers with dietary restrictions and allergies struggle to decipher tiny, complex chemical additives on packaged food labels, while forgotten pantry items expire and get discarded.",
    "highlights": [
      "SmartScan on-device OCR parsing ingredient lists from camera snapshots and photos in seconds.",
      "Automated cross-referencing against allergen databases flagging gluten, nuts, dairy, and artificial preservatives.",
      "Pantry inventory tracker with automated expiry reminders and replenishment shopping lists."
    ],
    "solutionArchitecture": "PWA frontend -> Tesseract / Vision OCR engine -> Local IndexedDB persistence -> Nutritional scoring API -> Vercel edge.",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "OCR",
      "PWA",
      "TailwindCSS",
      "IndexedDB"
    ],
    "keyMetrics": [
      {
        "label": "OCR Scan Time",
        "value": "< 1.8s"
      },
      {
        "label": "Allergen Recall",
        "value": "98.5%"
      },
      {
        "label": "Pantry Spoilage Cut",
        "value": "30%"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "TypeScript",
      "Computer Vision",
      "OCR",
      "Product Design",
      "AI Engineering"
    ]
  },
  {
    "id": "unnati",
    "number": "08",
    "title": "UNNATI",
    "tagline": "AI Career Capability, Resume Matching & Interview Preparation Platform",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 2",
    "projectType": "PERSONAL",
    "img": "/Feature Project/UNNATI - Your Growth Companion/deployed_hero.png",
    "images": [
      "/Feature Project/UNNATI - Your Growth Companion/deployed_hero.png",
      "/Feature Project/UNNATI - Your Growth Companion/portfolio_featured.png",
      "/Feature Project/UNNATI - Your Growth Companion/homepage.png",
      "/Feature Project/UNNATI - Your Growth Companion/assessment-hub.png",
      "/Feature Project/UNNATI - Your Growth Companion/career-explorer.png",
      "/Feature Project/UNNATI - Your Growth Companion/deployed_full.png",
      "/Feature Project/UNNATI - Your Growth Companion/interview-studio.png",
      "/Feature Project/UNNATI - Your Growth Companion/learning-hub.png",
      "/Feature Project/UNNATI - Your Growth Companion/resume-management.png",
      "/Feature Project/UNNATI - Your Growth Companion/talent-marketplace.png"
    ],
    "imageCaptions": [
      "UNNATI — Live Application Landing View",
      "UNNATI — Feature Spotlight & UI Design Overview",
      "UNNATI — Platform Home & Learning Navigation",
      "UNNATI — Competency Assessment & Diagnostic Hub",
      "UNNATI — Market Opportunity & Skill Benchmark Explorer",
      "UNNATI — Full Platform Architecture & Interactive Interface",
      "UNNATI — Interactive Mock Interview Simulator Studio",
      "UNNATI — Curated Skill Development Pathways",
      "UNNATI — ATS Resume Parser & Keyword Scoring Cockpit",
      "UNNATI — Talent Capability & Employer Matching Arena"
    ],
    "liveUrl": "https://unnati-connect-learning-capability.vercel.app/",
    "githubUrl": "https://github.com/parth022002/UNNATI---Connect-learning-capability-and-opportunity.",
    "linkedinUrl": "https://lnkd.in/p/d3JZShRe",
    "businessImpact": "Accelerates job-seeker career advancement by diagnosing exact skill deficiencies against live market job descriptions and generating personalized learning roadmaps.",
    "technicalSummary": "AI-driven talent growth platform integrating resume parsing, NLP skill-gap benchmarking, competency assessment, and dynamic mock interview simulations.",
    "problemStatement": "Job applicants send hundreds of generic resumes without understanding why they fail ATS screening or what critical technical skills they lack for target roles.",
    "highlights": [
      "Deep semantic comparison between candidate resumes and target job descriptions with quantified ATS match scores.",
      "Algorithmic competency gap analysis delivering tailored skill roadmaps and curated learning resources.",
      "Interactive AI mock interview simulator testing technical problem solving with instant feedback."
    ],
    "solutionArchitecture": "Next.js App Router -> Python FastAPI NLP parser -> OpenAI / Gemini embeddings -> PostgreSQL user progress store -> Vercel edge.",
    "techStack": [
      "React 19",
      "Next.js",
      "Python",
      "FastAPI",
      "OpenAI API",
      "Tailwind CSS",
      "TypeScript"
    ],
    "keyMetrics": [
      {
        "label": "Resume Parsing Speed",
        "value": "2.4s"
      },
      {
        "label": "Skill-Gap Precision",
        "value": "96.4%"
      },
      {
        "label": "Mock Question Bank",
        "value": "500+ Scenarios"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "React",
      "Python",
      "FastAPI",
      "NLP",
      "LLMs",
      "Product Strategy"
    ]
  },
  {
    "id": "rewindverse",
    "number": "09",
    "title": "RewindVerse",
    "tagline": "Interactive Machine Learning Training Replay & Experiment Intelligence Platform",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 2",
    "projectType": "PERSONAL",
    "img": "/Feature Project/RewindVerse - Interactive Machine Learning Training Replay & Experiment Intelligence Platform/deployed_hero.png",
    "images": [
      "/Feature Project/RewindVerse - Interactive Machine Learning Training Replay & Experiment Intelligence Platform/deployed_hero.png",
      "/Feature Project/RewindVerse - Interactive Machine Learning Training Replay & Experiment Intelligence Platform/portfolio_featured.png",
      "/Feature Project/RewindVerse - Interactive Machine Learning Training Replay & Experiment Intelligence Platform/screencapture-rewindverse-vercel-app-2026-11-09-14_42_05.png",
      "/Feature Project/RewindVerse - Interactive Machine Learning Training Replay & Experiment Intelligence Platform/Screenshot 2026-11-24 225950.png",
      "/Feature Project/RewindVerse - Interactive Machine Learning Training Replay & Experiment Intelligence Platform/Screenshot 2026-11-24 230003.png"
    ],
    "imageCaptions": [
      "RewindVerse — Live Application Landing View",
      "RewindVerse — Feature Spotlight & UI Design Overview",
      "RewindVerse — Complete Live Web Storefront Capture",
      "RewindVerse — Live System Walkthrough & Feature View (225950)",
      "RewindVerse — Live System Walkthrough & Feature View (230003)"
    ],
    "liveUrl": "https://rewindverse.vercel.app/",
    "githubUrl": "https://github.com/parth022002/RewindVerse",
    "linkedinUrl": "https://lnkd.in/p/dgRJFeu4",
    "businessImpact": "Demystifies deep learning model training by transforming abstract training logs into interactive scrubbable visual replays, cutting model debugging time by 60%.",
    "technicalSummary": "Full-stack developer platform providing scrubbable epoch-by-epoch replays of neural network training runs, weight gradients, loss trajectories, and decision boundary shifts.",
    "problemStatement": "Machine learning engineers waste hours examining static TensorBoard logs without an intuitive way to visually inspect exactly when and why their models overfit or destabilize.",
    "highlights": [
      "Interactive time-scrubbing slider to replay model weights, loss curves, and validation metrics epoch-by-epoch.",
      "Side-by-side run comparison identifying learning rate divergence and vanishing gradients.",
      "Visual decision boundary transformation canvas for 2D classification models."
    ],
    "solutionArchitecture": "React 19 / TypeScript UI -> HTML5 Canvas 2D / WebGL rendering -> Python PyTorch telemetry parser -> Vercel edge deployment.",
    "techStack": [
      "React 19",
      "Next.js",
      "TypeScript",
      "Canvas API",
      "PyTorch",
      "TailwindCSS",
      "Framer Motion"
    ],
    "keyMetrics": [
      {
        "label": "Replay Rendering Rate",
        "value": "60 FPS"
      },
      {
        "label": "Telemetry Ingestion",
        "value": "Instant JSON"
      },
      {
        "label": "Debug Time Cut",
        "value": "60%"
      }
    ],
    "relatedSkills": [
      "Machine Learning",
      "PyTorch",
      "React",
      "TypeScript",
      "Data Visualization",
      "Deep Learning"
    ]
  },
  {
    "id": "maskedmind",
    "number": "10",
    "title": "MaskedMind",
    "tagline": "SaaS Platform for Anonymous Campus Communities & Support Networks",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 2",
    "projectType": "PERSONAL",
    "img": "/Feature Project/MaskedMind – SaaS Platform for Anonymous Campus Communities/deployed_full.png",
    "images": [
      "/Feature Project/MaskedMind – SaaS Platform for Anonymous Campus Communities/deployed_full.png",
      "/Feature Project/MaskedMind – SaaS Platform for Anonymous Campus Communities/Screenshot 2026-11-24 225147.png",
      "/Feature Project/MaskedMind – SaaS Platform for Anonymous Campus Communities/Screenshot 2026-11-24 225201.png"
    ],
    "imageCaptions": [
      "MaskedMind — Full Platform Architecture & Interactive Interface",
      "MaskedMind — Live System Walkthrough & Feature View (225147)",
      "MaskedMind — Live System Walkthrough & Feature View (225201)"
    ],
    "liveUrl": "https://masked-mind.vercel.app/",
    "githubUrl": "https://github.com/parth022002/MaskedMind",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Provides a safe, pseudonymized digital town square for university students to discuss mental health, academic stress, and campus life without social stigma.",
    "technicalSummary": "SaaS community platform featuring zero-knowledge student verification, cryptographic pseudonym generation, automated content moderation, and real-time feeds.",
    "problemStatement": "University students hesitate to seek peer support or express candid feedback regarding campus policies due to fear of social judgment or institutional repercussions.",
    "highlights": [
      "Campus email verification with zero-knowledge cryptographic pseudonym mapping protecting user identities.",
      "Automated toxic content moderation and sentiment analysis using NLP classifiers.",
      "Real-time threaded community boards with upvoting, bookmarks, and peer support tags."
    ],
    "solutionArchitecture": "Next.js App Router -> Supabase PostgreSQL with Row Level Security (RLS) -> NextAuth authentication -> TailwindCSS -> Vercel.",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "TailwindCSS",
      "Prisma"
    ],
    "keyMetrics": [
      {
        "label": "Identity Anonymity",
        "value": "100% Cryptographic"
      },
      {
        "label": "Moderation Latency",
        "value": "< 120ms"
      },
      {
        "label": "Community Engagement",
        "value": "Active Discussions"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "React",
      "Supabase",
      "PostgreSQL",
      "TypeScript",
      "Cybersecurity",
      "Full Stack"
    ]
  },
  {
    "id": "data-visualization",
    "number": "11",
    "title": "Data Visualization",
    "tagline": "Executive BI Dashboards, ETL Pipelines & Operational Telemetry",
    "category": "Business Analytics & Strategy",
    "status": "Case Study",
    "importanceLevel": "Level 2",
    "projectType": "PERSONAL",
    "img": "/Feature Project/Data Visualization/01-india-renewable-landscape-dashboard.png",
    "images": [
      "/Feature Project/Data Visualization/01-india-renewable-landscape-dashboard.png",
      "/Feature Project/Data Visualization/02-agel-2030-vision-forecast-dashboard.png",
      "/Feature Project/Data Visualization/05-amc-aum-market-share.png",
      "/Feature Project/Data Visualization/07-fund-performance-returns.png",
      "/Feature Project/Data Visualization/10-debt-regime-monetary-policy.png",
      "/Feature Project/Data Visualization/11-net-fund-flows-momentum.png",
      "/Feature Project/Data Visualization/12-fpi-capital-flows.png",
      "/Feature Project/Data Visualization/14-sip-market-stress-resilience.png",
      "/Feature Project/Data Visualization/Screenshot 2025-11-27 163058.png",
      "/Feature Project/Data Visualization/Screenshot 2025-11-27 163111.png",
      "/Feature Project/Data Visualization/Screenshot 2025-11-27 163121.png"
    ],
    "imageCaptions": [
      "Data Visualization — System Introduction & Core Framework",
      "Data Visualization — Operational Problem & Demand Modeling",
      "Data Visualization — Strategic Business Impact & Outcomes",
      "Data Visualization — 07 fund performance returns",
      "Data Visualization — 10 debt regime monetary policy",
      "Data Visualization — 11 net fund flows momentum",
      "Data Visualization — 12 fpi capital flows",
      "Data Visualization — 14 sip market stress resilience",
      "Data Visualization — Live System Walkthrough & Feature View (163058)",
      "Data Visualization — Live System Walkthrough & Feature View (163111)",
      "Data Visualization — Live System Walkthrough & Feature View (163121)"
    ],
    "githubUrl": "https://github.com/parth022002/Data-Visualization",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Replaced manual spreadsheet reporting with interactive executive Tableau dashboards across 19,000+ business records, pinpointing key operational cost drivers and employee attrition factors.",
    "technicalSummary": "Comprehensive business intelligence portfolio featuring advanced Tableau workbooks, automated Excel models, and Python exploratory data analysis (EDA) pipelines.",
    "problemStatement": "Corporate executives struggle to extract strategic insights from raw, disparate tabular data trapped in legacy operational databases.",
    "highlights": [
      "Constructed multi-parameter Tableau dashboard analyzing 8,950 employee records to identify key attrition drivers by department.",
      "Engineered global retail sales dashboard evaluating 10,372 orders to model product segment profitability and discount impacts.",
      "Authored automated Python data cleaning and transformation scripts producing decision-ready datasets."
    ],
    "solutionArchitecture": "Raw data extraction (CSV/SQL) -> Python Pandas ETL pipeline -> Normalized star schema -> Tableau Desktop interactive dashboards with Level of Detail (LOD) expressions.",
    "techStack": [
      "Tableau",
      "Power BI",
      "Python",
      "SQL",
      "Excel",
      "Pandas",
      "Matplotlib",
      "Seaborn"
    ],
    "keyMetrics": [
      {
        "label": "Records Analyzed",
        "value": "19,000+"
      },
      {
        "label": "Data Quality Score",
        "value": "99.8%"
      },
      {
        "label": "Reporting Efficiency",
        "value": "85% Saved"
      }
    ],
    "relatedSkills": [
      "Tableau",
      "Power BI",
      "SQL",
      "Python",
      "Business Analytics",
      "ETL",
      "Executive Dashboards"
    ]
  },
  {
    "id": "omnirex",
    "number": "12",
    "title": "OmniRex",
    "tagline": "Universal Multi-PDF Analytical AI & RAG Intelligence Engine",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 3",
    "projectType": "PERSONAL",
    "img": "/Feature Project/OmniRex - AI Chatbot/deployed_full.png",
    "images": [
      "/Feature Project/OmniRex - AI Chatbot/deployed_full.png",
      "/Feature Project/OmniRex - AI Chatbot/Screenshot 2026-11-24 225422.png"
    ],
    "imageCaptions": [
      "OmniRex — Full Platform Architecture & Interactive Interface",
      "OmniRex — Live System Walkthrough & Feature View (225422)"
    ],
    "liveUrl": "https://omni-rex.vercel.app/",
    "githubUrl": "https://github.com/parth022002/OmniRex",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Accelerates complex research and regulatory compliance reviews by allowing users to cross-examine dozens of dense PDF manuals simultaneously with grounded citations.",
    "technicalSummary": "Next.js and Python RAG application utilizing semantic chunking, FAISS vector indexing, and grounded LLM synthesis to analyze multi-document corpuses.",
    "problemStatement": "Reviewing multiple 100+ page technical manuals, contracts, or financial reports requires hours of manual cross-referencing prone to human oversight.",
    "highlights": [
      "Processes and indexes multi-hundred page PDF documents in under 4 seconds.",
      "Cross-document comparative synthesis highlighting discrepancies between contract versions.",
      "Interactive conversational UI with pinpoint page-number citations."
    ],
    "solutionArchitecture": "Next.js UI -> Python FastAPI RAG service -> PyMuPDF document extraction -> FAISS vector search -> Gemini / OpenAI API.",
    "techStack": [
      "Next.js",
      "React",
      "Python",
      "FastAPI",
      "LangChain",
      "FAISS",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Ingestion Speed",
        "value": "< 4.0s"
      },
      {
        "label": "Citation Accuracy",
        "value": "100%"
      },
      {
        "label": "Max Supported Pages",
        "value": "500+ Pages"
      }
    ],
    "relatedSkills": [
      "Python",
      "FastAPI",
      "LangChain",
      "RAG",
      "Next.js",
      "Vector Search"
    ]
  },
  {
    "id": "nova",
    "number": "13",
    "title": "Nova",
    "tagline": "Voice Assistant & OS Automation Daemon",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 3",
    "projectType": "PERSONAL",
    "img": "/Feature Project/Nova - Voice Assistant/portfolio_featured.png",
    "images": [
      "/Feature Project/Nova - Voice Assistant/portfolio_featured.png",
      "/Feature Project/Nova - Voice Assistant/deployed_full.png",
      "/Feature Project/Nova - Voice Assistant/Screenshot 2026-11-24 225343.png"
    ],
    "imageCaptions": [
      "Nova — Feature Spotlight & UI Design Overview",
      "Nova — Full Platform Architecture & Interactive Interface",
      "Nova — Live System Walkthrough & Feature View (225343)"
    ],
    "liveUrl": "https://nova-voice-assistant-one.vercel.app/",
    "githubUrl": "https://github.com/parth022002/NOVA-Voice-Assistant",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Automates repetitive daily OS workflows, application launches, system queries, and email drafting through natural voice commands, saving hours of manual mouse navigation.",
    "technicalSummary": "Voice-driven operating system interface combining Web Speech API, Python OS daemons, WebSocket telemetry, and a cyberpunk glassmorphic UI.",
    "problemStatement": "Desktop multi-tasking is bogged down by manual application switching and repetitive command-line workflows that could be executed hands-free.",
    "highlights": [
      "Voice recognition engine with custom wake-word detection and 96.8% command accuracy.",
      "Sub-350ms OS automation executing system commands, app launches, and queries.",
      "Real-time visualizer dashboard showing live CPU, RAM, and network telemetry."
    ],
    "solutionArchitecture": "Browser Speech API -> WebSockets -> FastAPI backend daemon -> psutil & PyAutoGUI OS automation -> React dashboard.",
    "techStack": [
      "Python",
      "FastAPI",
      "WebSockets",
      "React",
      "TailwindCSS",
      "PyAutoGUI"
    ],
    "keyMetrics": [
      {
        "label": "Voice Recognition Accuracy",
        "value": "96.8%"
      },
      {
        "label": "Command Execution Delay",
        "value": "< 350ms"
      },
      {
        "label": "Supported OS Automations",
        "value": "40+ Actions"
      }
    ],
    "relatedSkills": [
      "Python",
      "FastAPI",
      "WebSockets",
      "Speech Recognition",
      "Automation",
      "React"
    ]
  },
  {
    "id": "api-healthlab",
    "number": "14",
    "title": "API HealthLab",
    "tagline": "Real-Time Microservice Uptime, Latency & SSL Certificate Monitor",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 3",
    "projectType": "PERSONAL",
    "img": "/Feature Project/API HealthLab/portfolio_featured.png",
    "images": [
      "/Feature Project/API HealthLab/portfolio_featured.png",
      "/Feature Project/API HealthLab/deployed_full.png",
      "/Feature Project/API HealthLab/Screenshot 2026-11-24 223817.png",
      "/Feature Project/API HealthLab/Screenshot 2026-11-24 223849.png",
      "/Feature Project/API HealthLab/Screenshot 2026-11-24 223902.png",
      "/Feature Project/API HealthLab/Screenshot 2026-11-24 223924.png"
    ],
    "imageCaptions": [
      "API HealthLab — Feature Spotlight & UI Design Overview",
      "API HealthLab — Full Platform Architecture & Interactive Interface",
      "API HealthLab — Live System Walkthrough & Feature View (223817)",
      "API HealthLab — Live System Walkthrough & Feature View (223849)",
      "API HealthLab — Live System Walkthrough & Feature View (223902)",
      "API HealthLab — Live System Walkthrough & Feature View (223924)"
    ],
    "liveUrl": "https://api-health-lab.vercel.app/",
    "githubUrl": "https://github.com/parth022002/APIHealthLab",
    "linkedinUrl": "https://lnkd.in/p/dJC8uFpU",
    "businessImpact": "Protects critical business services from undetected downtime with automated multi-region HTTP health checks, latency tracking, and SSL certificate expiration alerts.",
    "technicalSummary": "Cloud monitoring application performing scheduled synthetic HTTP requests, calculating p95/p99 latency distributions, and alerting on service degradation.",
    "problemStatement": "Engineering teams are frequently blindsided by third-party API outages or expired SSL certificates before their customers report the failure.",
    "highlights": [
      "Automated periodic health pings measuring DNS resolution, TTFB, and total response time.",
      "Real-time status page with public shareable links and incident timeline updates.",
      "SSL certificate expiration tracking with proactive multi-day email warning alerts."
    ],
    "solutionArchitecture": "Next.js App Router -> Serverless cron workers -> PostgreSQL metric storage -> TailwindCSS live status board -> Vercel.",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Monitoring Interval",
        "value": "60 Seconds"
      },
      {
        "label": "Latency Precision",
        "value": "± 2ms"
      },
      {
        "label": "Uptime Calculation",
        "value": "99.99% SLA"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "DevOps",
      "Microservices"
    ]
  },
  {
    "id": "zentrix-ai",
    "number": "15",
    "title": "Zentrix AI",
    "tagline": "Developer Knowledge Forum & Technical Debate Ecosystem",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 3",
    "projectType": "PERSONAL",
    "img": "/Feature Project/Zentrix AI - Forum Tech & Business/deployed_hero.png",
    "images": [
      "/Feature Project/Zentrix AI - Forum Tech & Business/deployed_hero.png",
      "/Feature Project/Zentrix AI - Forum Tech & Business/portfolio_featured.png",
      "/Feature Project/Zentrix AI - Forum Tech & Business/deployed_full.png",
      "/Feature Project/Zentrix AI - Forum Tech & Business/Screenshot 2026-11-24 231803.png",
      "/Feature Project/Zentrix AI - Forum Tech & Business/Screenshot 2026-11-24 231814.png"
    ],
    "imageCaptions": [
      "Zentrix AI — Live Application Landing View",
      "Zentrix AI — Feature Spotlight & UI Design Overview",
      "Zentrix AI — Full Platform Architecture & Interactive Interface",
      "Zentrix AI — Live System Walkthrough & Feature View (231803)",
      "Zentrix AI — Live System Walkthrough & Feature View (231814)"
    ],
    "liveUrl": "https://zentrix-ai-forum.vercel.app/",
    "githubUrl": "https://github.com/parth022002/Zentrix---AI-Forum",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Fosters high-signal peer collaboration for software engineers and business analysts to dissect architectural trade-offs, AI research, and implementation blueprints.",
    "technicalSummary": "Full-stack community knowledge platform featuring rich markdown authoring, syntax-highlighted code snippets, threaded replies, and voting algorithms.",
    "problemStatement": "Developers need specialized spaces to discuss emerging AI architectures and enterprise tooling without low-effort spam and outdated answers.",
    "highlights": [
      "Rich markdown editor with automatic syntax highlighting for 30+ programming languages.",
      "Algorithmic discussion ranking rewarding verified technical explanations and code solutions.",
      "Full-text search indexing topics across artificial intelligence, systems, and product engineering."
    ],
    "solutionArchitecture": "Next.js App Router -> Prisma ORM -> PostgreSQL database -> TailwindCSS -> Vercel deployment.",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Render Performance",
        "value": "98 Lighthouse"
      },
      {
        "label": "Query Time",
        "value": "< 45ms"
      },
      {
        "label": "Supported Languages",
        "value": "30+ Syntax"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Full Stack"
    ]
  },
  {
    "id": "talentforge",
    "number": "16",
    "title": "TalentForge",
    "tagline": "AI Resume & Technical Interview Intelligence Engine",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 3",
    "projectType": "PERSONAL",
    "img": "/Feature Project/TalentForge - AI Career Intelligence/portfolio_featured.png",
    "images": [
      "/Feature Project/TalentForge - AI Career Intelligence/portfolio_featured.png",
      "/Feature Project/TalentForge - AI Career Intelligence/Screenshot 2026-11-24 230123.png",
      "/Feature Project/TalentForge - AI Career Intelligence/Screenshot 2026-11-24 230135.png",
      "/Feature Project/TalentForge - AI Career Intelligence/Screenshot 2026-11-24 230149.png"
    ],
    "imageCaptions": [
      "TalentForge — Feature Spotlight & UI Design Overview",
      "TalentForge — Live System Walkthrough & Feature View (230123)",
      "TalentForge — Live System Walkthrough & Feature View (230135)",
      "TalentForge — Live System Walkthrough & Feature View (230149)"
    ],
    "liveUrl": "https://talentforge-three.vercel.app/",
    "githubUrl": "https://github.com/parth022002/Resume-Analyser",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Empowers candidates to optimize resumes for institutional ATS systems, boosting interview callback probability by over 3x through automated keyword optimization.",
    "technicalSummary": "Natural language processing platform parsing PDF resumes, extracting technical skill taxonomies, and scoring match relevance against job descriptions.",
    "problemStatement": "Over 75% of qualified resumes are filtered out by automated ATS scanners due to missing taxonomy keywords and poor layout structure.",
    "highlights": [
      "Instant PDF resume parsing extracting experience, education, and technical competencies.",
      "Keyword density and taxonomy matching against industry standard job descriptions.",
      "Actionable recommendations to enhance quantifiable bullet points and impact metrics."
    ],
    "solutionArchitecture": "React frontend -> Python backend -> NLP entity recognition pipeline -> TailwindCSS responsive dashboard -> Vercel.",
    "techStack": [
      "Python",
      "NLP",
      "React",
      "Next.js",
      "FastAPI",
      "TailwindCSS",
      "TypeScript"
    ],
    "keyMetrics": [
      {
        "label": "Parsing Accuracy",
        "value": "97.2%"
      },
      {
        "label": "Analysis Latency",
        "value": "< 2.0s"
      },
      {
        "label": "ATS Optimization",
        "value": "+300% Matches"
      }
    ],
    "relatedSkills": [
      "NLP",
      "Python",
      "React",
      "FastAPI",
      "Data Analytics",
      "AI Engineering"
    ]
  },
  {
    "id": "velixo",
    "number": "17",
    "title": "Velixo",
    "tagline": "Collaborative Agile Task Manager & Work OS",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 3",
    "projectType": "PERSONAL",
    "img": "/Feature Project/Velixo - Task Manager/portfolio_featured.png",
    "images": [
      "/Feature Project/Velixo - Task Manager/portfolio_featured.png",
      "/Feature Project/Velixo - Task Manager/Screenshot 2026-11-24 231602.png",
      "/Feature Project/Velixo - Task Manager/Screenshot 2026-11-24 231622.png",
      "/Feature Project/Velixo - Task Manager/Screenshot 2026-11-24 231633.png",
      "/Feature Project/Velixo - Task Manager/Screenshot 2026-11-24 231643.png"
    ],
    "imageCaptions": [
      "Velixo — Feature Spotlight & UI Design Overview",
      "Velixo — Live System Walkthrough & Feature View (231602)",
      "Velixo — Live System Walkthrough & Feature View (231622)",
      "Velixo — Live System Walkthrough & Feature View (231633)",
      "Velixo — Live System Walkthrough & Feature View (231643)"
    ],
    "liveUrl": "https://velixo-task-manager.vercel.app/",
    "githubUrl": "https://github.com/parth022002/Velixo-Task-Manager",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Streamlines sprint delivery and cross-functional task tracking for engineering teams, boosting sprint velocity by 30% through visual milestone management.",
    "technicalSummary": "Cloud collaborative task and project management suite featuring drag-and-drop Kanban boards, team assignments, milestone timelines, and role-based access control.",
    "problemStatement": "Teams often become overwhelmed by complex, heavyweight project management tools that create administrative friction rather than clarifying priorities.",
    "highlights": [
      "Interactive drag-and-drop Kanban sprint board with optimistic UI state transitions.",
      "Granular team role permissions (Admin, Project Manager, Contributor) with secure JWT auth.",
      "Sub-45ms task query responses and instant task assignment notifications."
    ],
    "solutionArchitecture": "React 19 / TypeScript UI -> Node.js & Express REST API -> MongoDB Atlas aggregation pipelines -> Vercel edge.",
    "techStack": [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Task Query Latency",
        "value": "< 45ms"
      },
      {
        "label": "Sprint Velocity Gain",
        "value": "+30%"
      },
      {
        "label": "Concurrent Users",
        "value": "500+ Active"
      }
    ],
    "relatedSkills": [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Agile Methodologies",
      "Full Stack"
    ]
  },
  {
    "id": "neurosync",
    "number": "18",
    "title": "NeuroSync AI",
    "tagline": "Multimodal Intelligence Dashboard & Human Sensory Fusion Architecture",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 3",
    "projectType": "PERSONAL",
    "img": "/Feature Project/NeuroSync AI - Multimodal Intelligence Dashboard & Architecture/deployed_hero.png",
    "images": [
      "/Feature Project/NeuroSync AI - Multimodal Intelligence Dashboard & Architecture/deployed_hero.png",
      "/Feature Project/NeuroSync AI - Multimodal Intelligence Dashboard & Architecture/portfolio_featured.png",
      "/Feature Project/NeuroSync AI - Multimodal Intelligence Dashboard & Architecture/deployed_full.png"
    ],
    "imageCaptions": [
      "NeuroSync AI — Live Application Landing View",
      "NeuroSync AI — Feature Spotlight & UI Design Overview",
      "NeuroSync AI — Full Platform Architecture & Interactive Interface"
    ],
    "liveUrl": "https://neuro-sync-ai-cyan.vercel.app/",
    "githubUrl": "https://github.com/parth022002/NeuroSync-AI",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Pioneers human-in-the-loop sensory computing by fusing live computer vision, voice tone telemetry, and predictive forecasting to enhance operator focus and prevent burnout.",
    "technicalSummary": "Multimodal dashboard uniting real-time webcam perception (MediaPipe 468-point face mesh, 21-point hand tracking), vocal frequency analysis, and ensemble predictive models.",
    "problemStatement": "High-stress knowledge workers and remote operators lack objective, real-time indicators of fatigue, stress, and cognitive overload.",
    "highlights": [
      "Real-time webcam perception lab tracking facial landmarks, emotion, and head orientation.",
      "Vocal tone analyzer evaluating speech pitch, jitter, and energy variations.",
      "Signal fusion engine blending multi-stream metrics into recommended intervention actions."
    ],
    "solutionArchitecture": "FastAPI Python backend -> MediaPipe browser-native vision models -> Web Audio API pitch analysis -> Glassmorphic Neon React dashboard.",
    "techStack": [
      "Python",
      "FastAPI",
      "MediaPipe",
      "Computer Vision",
      "React",
      "Web Audio API",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Vision Tracking Points",
        "value": "489 Landmarks"
      },
      {
        "label": "Inference Latency",
        "value": "< 60ms"
      },
      {
        "label": "UI Theme Presets",
        "value": "6 Stylesheets"
      }
    ],
    "relatedSkills": [
      "Computer Vision",
      "Python",
      "FastAPI",
      "MediaPipe",
      "Audio Processing",
      "React"
    ]
  },
  {
    "id": "vchat",
    "number": "19",
    "title": "VChat",
    "tagline": "Encrypted Peer-to-Peer Real-Time WebRTC Video Conferencing Engine",
    "category": "Data & Real-time",
    "status": "Live Demo",
    "importanceLevel": "Level 4",
    "projectType": "ACADEMIC",
    "img": "/Feature Project/Vchat - Video Chatting/deployed_full.png",
    "images": [
      "/Feature Project/Vchat - Video Chatting/deployed_full.png",
      "/Feature Project/Vchat - Video Chatting/Screenshot 2026-11-24 230952.png"
    ],
    "imageCaptions": [
      "VChat — Full Platform Architecture & Interactive Interface",
      "VChat — Live System Walkthrough & Feature View (230952)"
    ],
    "liveUrl": "https://vchat-ruddy.vercel.app/",
    "githubUrl": "https://github.com/parth022002/Vchat",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Developed during internship at CreArt Solutions to provide distributed enterprise teams with secure, zero-installation video calls directly in browser without middleman servers.",
    "technicalSummary": "Real-time communication suite leveraging WebRTC RTCPeerConnection for encrypted P2P audio/video streaming, paired with PHP signaling and STUN/TURN NAT traversal.",
    "problemStatement": "Enterprise remote teams require frictionless video meetings without installing heavy proprietary client software that consumes high system resources.",
    "highlights": [
      "Direct peer-to-peer WebRTC RTP media streaming with sub-80ms end-to-end latency.",
      "PHP signaling backend with dynamic room generation and ICE candidate exchange.",
      "Optimized 10+ SQL database queries during CreArt Solutions internship to boost server throughput."
    ],
    "solutionArchitecture": "Browser WebRTC media pipeline -> PHP signaling API -> STUN NAT traversal -> MySQL session state -> Vercel / Apache.",
    "techStack": [
      "WebRTC",
      "PHP",
      "JavaScript",
      "HTML5",
      "CSS3",
      "MySQL",
      "STUN/TURN"
    ],
    "keyMetrics": [
      {
        "label": "End-to-End Latency",
        "value": "< 80ms"
      },
      {
        "label": "P2P Encryption",
        "value": "DTLS-SRTP"
      },
      {
        "label": "Client Modules Shipped",
        "value": "5 Modules"
      }
    ],
    "relatedSkills": [
      "WebRTC",
      "PHP",
      "JavaScript",
      "Real-Time Streaming",
      "Networking",
      "MySQL"
    ]
  },
  {
    "id": "raagawave",
    "number": "20",
    "title": "RaagaWave",
    "tagline": "High-Fidelity Audio Streaming Engine & Virtual Soundboard",
    "category": "AI & GenAI",
    "status": "Live Demo",
    "importanceLevel": "Level 4",
    "projectType": "PERSONAL",
    "img": "/Feature Project/RaagaWave - Song Player/deployed_hero.png",
    "images": [
      "/Feature Project/RaagaWave - Song Player/deployed_hero.png",
      "/Feature Project/RaagaWave - Song Player/Screenshot 2026-11-24 225738.png",
      "/Feature Project/RaagaWave - Song Player/Screenshot 2026-11-24 225755.png"
    ],
    "imageCaptions": [
      "RaagaWave — Live Application Landing View",
      "RaagaWave — Live System Walkthrough & Feature View (225738)",
      "RaagaWave — Live System Walkthrough & Feature View (225755)"
    ],
    "liveUrl": "https://raaga-wave.vercel.app/",
    "githubUrl": "https://github.com/parth022002/RaagaWave",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Provides continuous, zero-stutter commercial audio streaming with predictive buffering and rich playlist customization for music lovers.",
    "technicalSummary": "Full-scale modern web audio player built with Next.js, Redux global audio controllers, HTML5 Web Audio API, and responsive UI design.",
    "problemStatement": "Web-based audio applications frequently stutter and freeze when navigating across pages without dedicated persistent global audio controllers.",
    "highlights": [
      "HTML5 Web Audio API engine wrapped in global Redux state controllers for seamless page-to-page playback.",
      "Predictive 3-track preloading buffer ensuring zero stutter across varying network conditions.",
      "Custom playlist studio and responsive audio visualizer."
    ],
    "solutionArchitecture": "Next.js App Router -> Redux Toolkit audio state -> Web Audio API -> TailwindCSS player cockpit -> Vercel.",
    "techStack": [
      "Next.js",
      "React",
      "Redux Toolkit",
      "Web Audio API",
      "TypeScript",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Playback Stutter",
        "value": "Zero Buffering"
      },
      {
        "label": "Preload Buffer",
        "value": "3 Tracks Ahead"
      },
      {
        "label": "Lighthouse Score",
        "value": "96 / 100"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "React",
      "Redux",
      "TypeScript",
      "Audio Engineering",
      "Frontend"
    ]
  },
  {
    "id": "nexspace",
    "number": "21",
    "title": "NexSpace",
    "tagline": "High-Performance Next.js Social Media Platform",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 4",
    "projectType": "PERSONAL",
    "img": "/Feature Project/NexSpace - Social Media/portfolio_featured.png",
    "images": [
      "/Feature Project/NexSpace - Social Media/portfolio_featured.png",
      "/Feature Project/NexSpace - Social Media/deployed_full.png"
    ],
    "imageCaptions": [
      "NexSpace — Feature Spotlight & UI Design Overview",
      "NexSpace — Full Platform Architecture & Interactive Interface"
    ],
    "liveUrl": "https://nex-space-kappa.vercel.app/",
    "githubUrl": "https://github.com/parth022002/NexSpace",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Engineered for community engagement, instant media sharing, and frictionless micro-community interactions with sub-100ms render speeds.",
    "technicalSummary": "Modern social network built on Next.js App Router with optimistic UI updates, edge asset caching, and JWT authentication.",
    "problemStatement": "Modern social networks are bogged down by megabytes of tracking scripts and slow client-side rendering.",
    "highlights": [
      "98/100 Google Lighthouse performance with zero tracking scripts and instant routing.",
      "Optimistic UI state updates making likes, comments, and posts appear on screen instantaneously.",
      "Sub-65ms edge API responses and secure user vaults."
    ],
    "solutionArchitecture": "Next.js App Router -> Edge API routes -> PostgreSQL database -> TailwindCSS -> Vercel edge network.",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "Vercel"
    ],
    "keyMetrics": [
      {
        "label": "Lighthouse Performance",
        "value": "98 / 100"
      },
      {
        "label": "Edge Latency",
        "value": "< 65ms"
      },
      {
        "label": "First Contentful Paint",
        "value": "0.6s"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Performance Optimization"
    ]
  },
  {
    "id": "discord-clone",
    "number": "22",
    "title": "Discord Clone",
    "tagline": "Full-Stack Real-Time Voice, Video & Text Communication Hub",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 4",
    "projectType": "PERSONAL",
    "img": "/Feature Project/Discord Clone/Screenshot 2026-11-24 224358.png",
    "images": [
      "/Feature Project/Discord Clone/Screenshot 2026-11-24 224358.png",
      "/Feature Project/Discord Clone/Screenshot 2026-11-24 224423.png"
    ],
    "imageCaptions": [
      "Discord Clone — Live System Walkthrough & Feature View (224358)",
      "Discord Clone — Live System Walkthrough & Feature View (224423)"
    ],
    "liveUrl": "https://discord-clone-henna-tau.vercel.app/sign-in",
    "githubUrl": "https://github.com/parth022002/Discord-Clone",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Replicates high-scale real-time communication architectures, providing enterprise teams with instant text channels, voice rooms, and dynamic role permissions.",
    "technicalSummary": "Full-scale Discord web replica built with Next.js App Router, Socket.io real-time websockets, LiveKit WebRTC video/audio rooms, and Prisma PostgreSQL.",
    "problemStatement": "Building low-latency multi-channel chat and video applications requires complex socket lifecycle management, optimistic message delivery, and robust permissions.",
    "highlights": [
      "Real-time bidirectional text messaging powered by Socket.io with infinite scroll pagination.",
      "1-on-1 and group voice/video calling powered by LiveKit WebRTC media servers.",
      "Server management with channel creation (Text, Audio, Video) and member role management (Guest, Moderator, Admin)."
    ],
    "solutionArchitecture": "Next.js 14 App Router -> Socket.io WebSocket server -> LiveKit WebRTC cloud -> Neon PostgreSQL with Prisma ORM -> TailwindCSS.",
    "techStack": [
      "Next.js",
      "React",
      "Socket.io",
      "LiveKit",
      "WebRTC",
      "Prisma",
      "PostgreSQL",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Message Latency",
        "value": "< 50ms"
      },
      {
        "label": "Media Engine",
        "value": "LiveKit WebRTC"
      },
      {
        "label": "Database Persistence",
        "value": "Neon PostgreSQL"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "Socket.io",
      "WebRTC",
      "PostgreSQL",
      "Prisma",
      "TypeScript",
      "Full Stack"
    ]
  },
  {
    "id": "flexconvert",
    "number": "23",
    "title": "FlexConvert",
    "tagline": "Client-Side Automated 3D File, Audio & Media Transformation Platform",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 4",
    "projectType": "PERSONAL",
    "img": "/Feature Project/FlexConvert - File Converter/deployed_hero.png",
    "images": [
      "/Feature Project/FlexConvert - File Converter/deployed_hero.png",
      "/Feature Project/FlexConvert - File Converter/portfolio_featured.png",
      "/Feature Project/FlexConvert - File Converter/deployed_full.png"
    ],
    "imageCaptions": [
      "FlexConvert — Live Application Landing View",
      "FlexConvert — Feature Spotlight & UI Design Overview",
      "FlexConvert — Full Platform Architecture & Interactive Interface"
    ],
    "liveUrl": "https://flex-convert.vercel.app/",
    "githubUrl": "https://github.com/parth022002/FlexConvert",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Eliminates server transcoding bills and guarantees 100% data privacy by executing media transformations directly inside the user's web browser using WebAssembly.",
    "technicalSummary": "High-performance client-side file transformation suite utilizing FFmpeg WebAssembly (WASM) and Three.js 3D model parsers to convert video, audio, image, and 3D files.",
    "problemStatement": "Traditional file conversion sites upload private documents to third-party servers, posing serious data privacy risks and bandwidth costs.",
    "highlights": [
      "In-browser client-side file transcoding with WebAssembly ensuring files never leave user machines.",
      "Multi-format support across video, audio, raster images, and 3D coordinate models.",
      "Zero server hosting transcode cost with unlimited conversion batching."
    ],
    "solutionArchitecture": "Next.js App Router -> WebAssembly FFmpeg worker -> Three.js format exporter -> TailwindCSS -> Vercel.",
    "techStack": [
      "Next.js",
      "React",
      "WebAssembly",
      "FFmpeg",
      "Three.js",
      "TypeScript",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Data Privacy",
        "value": "100% Client-Side"
      },
      {
        "label": "Server Transcode Cost",
        "value": "$0.00"
      },
      {
        "label": "Supported Formats",
        "value": "25+ Extensions"
      }
    ],
    "relatedSkills": [
      "WebAssembly",
      "Next.js",
      "React",
      "Three.js",
      "TypeScript",
      "Performance"
    ]
  },
  {
    "id": "linkway",
    "number": "24",
    "title": "LinkWay",
    "tagline": "Enterprise Bio-Link & Analytics Redirection Platform",
    "category": "Full Stack",
    "status": "Live Demo",
    "importanceLevel": "Level 4",
    "projectType": "PERSONAL",
    "img": "/Feature Project/LinkWay/deployed_hero.png",
    "images": [
      "/Feature Project/LinkWay/deployed_hero.png",
      "/Feature Project/LinkWay/portfolio_featured.png",
      "/Feature Project/LinkWay/deployed_full.png"
    ],
    "imageCaptions": [
      "LinkWay — Live Application Landing View",
      "LinkWay — Feature Spotlight & UI Design Overview",
      "LinkWay — Full Platform Architecture & Interactive Interface"
    ],
    "githubUrl": "https://github.com/parth022002/LinkWay",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Enables creators and brands to consolidate multi-channel campaigns into high-converting bio-links with granular click analytics, device telemetry, and dynamic QR routing.",
    "technicalSummary": "Cloud redirection and bio-link management engine featuring high-speed edge redirects, click analytics logging, and custom brand themes.",
    "problemStatement": "Creators and marketers struggle to track link conversions across fragmented social profiles without paying exorbitant SaaS subscription fees.",
    "highlights": [
      "High-speed URL redirection engine resolving custom short links in sub-30ms.",
      "Real-time analytics dashboard tracking referrer domains, operating systems, and geolocation.",
      "Customizable mobile-optimized profile landing pages with custom link categories."
    ],
    "solutionArchitecture": "Next.js App Router -> PostgreSQL analytics storage -> TailwindCSS responsive dashboard -> Vercel edge redirection.",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS"
    ],
    "keyMetrics": [
      {
        "label": "Redirect Resolution",
        "value": "< 30ms"
      },
      {
        "label": "Click Telemetry",
        "value": "Real-Time Tracking"
      },
      {
        "label": "Mobile Responsiveness",
        "value": "100%"
      }
    ],
    "relatedSkills": [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Analytics",
      "Full Stack"
    ],
    "liveUrl": "https://link-way.vercel.app/"
  },
  {
    "id": "shoesavvy",
    "number": "25",
    "title": "ShoeSavvy",
    "tagline": "Scalable Full-Stack Footwear E-Commerce Engine & Dynamic Catalog",
    "category": "E-commerce",
    "status": "Case Study",
    "importanceLevel": "Level 5",
    "projectType": "PERSONAL",
    "img": "/Feature Project/ShoeSavvy - Ecommerce website/Screenshot 2024-08-04 203323.png",
    "images": [
      "/Feature Project/ShoeSavvy - Ecommerce website/Screenshot 2024-08-04 203323.png",
      "/Feature Project/ShoeSavvy - Ecommerce website/screencapture-shoesavvy-42web-io-2024-08-04-20_33_40.png"
    ],
    "imageCaptions": [
      "ShoeSavvy — Live System Walkthrough & Feature View (203323)",
      "ShoeSavvy — Complete Live Web Storefront Capture"
    ],
    "githubUrl": "https://github.com/parth022002/Wordpress/tree/main/ShoeSavvy",
    "linkedinUrl": "https://lnkd.in/p/dqwnH32S",
    "businessImpact": "Delivered a full-featured digital storefront with multi-attribute filtering, session-guaranteed cart persistence, and relational inventory synchronization.",
    "technicalSummary": "Full-stack e-commerce application developed on PHP and MySQL featuring indexed product catalogs, session management, and SQL injection safeguards.",
    "problemStatement": "Footwear retail stores require fast multi-attribute filtering by brand, size, and price without page lag or inventory discrepancy during concurrent checkouts.",
    "highlights": [
      "Normalized MySQL relational schema with indexing on brand and price attributes.",
      "Instant category and price filtering delivering sub-1.2s page response speeds.",
      "ACID-compliant cart transactions with atomic stock updates."
    ],
    "solutionArchitecture": "PHP backend scripts -> Normalized MySQL schema -> JavaScript client filtering -> Apache server.",
    "techStack": [
      "PHP",
      "MySQL",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Apache",
      "WordPress"
    ],
    "keyMetrics": [
      {
        "label": "Page Load Speed",
        "value": "< 1.2s"
      },
      {
        "label": "Checkout Steps",
        "value": "3-Step Flow"
      },
      {
        "label": "Data Integrity",
        "value": "ACID Compliant"
      }
    ],
    "relatedSkills": [
      "PHP",
      "MySQL",
      "E-commerce",
      "Database Design",
      "Web Development"
    ]
  },
  {
    "id": "energizewell",
    "number": "26",
    "title": "EnergizeWell",
    "tagline": "Health, Fitness & Lifestyle Editorial Portal",
    "category": "Full Stack",
    "status": "Case Study",
    "importanceLevel": "Level 5",
    "projectType": "PERSONAL",
    "img": "/Feature Project/EnergizeWell - Health Blog/portfolio_featured.png",
    "images": [
      "/Feature Project/EnergizeWell - Health Blog/portfolio_featured.png",
      "/Feature Project/EnergizeWell - Health Blog/Screenshot 2024-07-18 224740.png",
      "/Feature Project/EnergizeWell - Health Blog/screencapture-energizewell-42web-io-2024-07-18-22_47_52.png"
    ],
    "imageCaptions": [
      "EnergizeWell — Feature Spotlight & UI Design Overview",
      "EnergizeWell — Live System Walkthrough & Feature View (224740)",
      "EnergizeWell — Complete Live Web Storefront Capture"
    ],
    "githubUrl": "https://github.com/parth022002/Wordpress/tree/main/EnergizeWell",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Created an engaging digital publication platform driving reader retention through categorized health guides, nutrition calculators, and responsive reading layouts.",
    "technicalSummary": "Content management portal engineered with modular content layouts, SEO metadata automation, and optimized image compression for lightning-fast reading.",
    "problemStatement": "Health and wellness publications suffer from high bounce rates when content layouts are cluttered and mobile page load speeds exceed 3 seconds.",
    "highlights": [
      "Responsive editorial layouts optimized for readable typography across mobile and desktop devices.",
      "Modular article categorization covering nutrition, strength training, and recovery guides.",
      "Automated SEO metadata tags and OpenGraph cards for viral social sharing."
    ],
    "solutionArchitecture": "WordPress CMS architecture -> Custom PHP templates -> MySQL database -> Caching & CDN optimization.",
    "techStack": [
      "WordPress",
      "PHP",
      "MySQL",
      "CSS3",
      "JavaScript",
      "SEO Optimization"
    ],
    "keyMetrics": [
      {
        "label": "Mobile Speed Score",
        "value": "95 / 100"
      },
      {
        "label": "Content Sections",
        "value": "6 Categories"
      },
      {
        "label": "SEO Readiness",
        "value": "100% Meta Coverage"
      }
    ],
    "relatedSkills": [
      "WordPress",
      "PHP",
      "Content Strategy",
      "SEO",
      "UI/UX Design"
    ]
  },
  {
    "id": "techpulse",
    "number": "27",
    "title": "TechPulse",
    "tagline": "Technology News, Hardware Benchmarks & Editorial Platform",
    "category": "Full Stack",
    "status": "Case Study",
    "importanceLevel": "Level 5",
    "projectType": "PERSONAL",
    "img": "/Feature Project/TechPulse - Tech Blog/Screenshot 2024-07-17 201625.png",
    "images": [
      "/Feature Project/TechPulse - Tech Blog/Screenshot 2024-07-17 201625.png",
      "/Feature Project/TechPulse - Tech Blog/screencapture-personalblog-42web-io-2024-07-17-20_21_08.png"
    ],
    "imageCaptions": [
      "TechPulse — Live System Walkthrough & Feature View (201625)",
      "TechPulse — Complete Live Web Storefront Capture"
    ],
    "githubUrl": "https://github.com/parth022002/Wordpress/tree/main/TechPulse",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Engineered a high-throughput tech editorial and review portal delivering hardware comparison benchmarks and breaking tech news to tech enthusiasts.",
    "technicalSummary": "Digital media platform built with custom WordPress templating, relational MySQL schemas, and fast server-side caching.",
    "problemStatement": "Technology review sites require structured benchmark comparison tables and fast asset loading to maintain reader trust and ad viewability.",
    "highlights": [
      "Interactive hardware spec comparison matrices comparing processor, GPU, and memory benchmarks.",
      "Newsletter lead capture funnel integrated with automated subscriber verification.",
      "Optimized asset delivery pipeline reducing page payload by 40%."
    ],
    "solutionArchitecture": "WordPress engine -> PHP template hierarchy -> Relational MySQL -> Apache HTTP server with gzip compression.",
    "techStack": [
      "WordPress",
      "PHP",
      "MySQL",
      "JavaScript",
      "CSS3",
      "HTML5"
    ],
    "keyMetrics": [
      {
        "label": "Asset Payload Reduction",
        "value": "40% Cut"
      },
      {
        "label": "Benchmark Tables",
        "value": "Interactive Specs"
      },
      {
        "label": "Newsletter Capture",
        "value": "Automated Lead Funnel"
      }
    ],
    "relatedSkills": [
      "WordPress",
      "PHP",
      "Web Development",
      "Content Strategy",
      "Digital Media"
    ]
  },
  {
    "id": "urbanhaven",
    "number": "28",
    "title": "UrbanHaven",
    "tagline": "Modern Interior Décor & Furniture E-Commerce Storefront",
    "category": "E-commerce",
    "status": "Case Study",
    "importanceLevel": "Level 5",
    "projectType": "PERSONAL",
    "img": "/Feature Project/UrbanHaven - Ecommerce/Screenshot 2024-07-28 234652.png",
    "images": [
      "/Feature Project/UrbanHaven - Ecommerce/Screenshot 2024-07-28 234652.png",
      "/Feature Project/UrbanHaven - Ecommerce/screencapture-urbanhaven-42web-io-2024-07-28-23_46_24.png"
    ],
    "imageCaptions": [
      "UrbanHaven — Live System Walkthrough & Feature View (234652)",
      "UrbanHaven — Complete Live Web Storefront Capture"
    ],
    "githubUrl": "https://github.com/parth022002/Wordpress/tree/main/UrbanHaven",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Designed an elegant, minimalist e-commerce showcase for modern home furnishings, increasing average session duration through high-resolution room visualizers.",
    "technicalSummary": "E-commerce platform featuring curated living collections, dynamic product variations (materials, dimensions, colors), and seamless cart management.",
    "problemStatement": "Furniture e-commerce requires high-aesthetic imagery and accurate specification sheets without degrading mobile performance or confusing checkout steps.",
    "highlights": [
      "Minimalist, modern editorial layout designed for luxury home furnishings.",
      "Multi-variable product configuration supporting dimensions, fabrics, and finish options.",
      "Fast checkout flow with atomic cart synchronization."
    ],
    "solutionArchitecture": "WooCommerce / WordPress foundation -> Custom PHP layouts -> MySQL transactional persistence -> CSS Grid / Flexbox.",
    "techStack": [
      "WordPress",
      "WooCommerce",
      "PHP",
      "MySQL",
      "CSS3",
      "JavaScript"
    ],
    "keyMetrics": [
      {
        "label": "Image Optimization",
        "value": "WebP Pipeline"
      },
      {
        "label": "Product Variations",
        "value": "Multi-Attribute"
      },
      {
        "label": "Average Session Time",
        "value": "+45% Higher"
      }
    ],
    "relatedSkills": [
      "E-commerce",
      "WordPress",
      "WooCommerce",
      "PHP",
      "UI/UX Design"
    ]
  },
  {
    "id": "easyshop",
    "number": "29",
    "title": "EazyShop",
    "tagline": "Multi-Category Retail E-Commerce Portal & Vendor Inventory Hub",
    "category": "E-commerce",
    "status": "Case Study",
    "importanceLevel": "Level 5",
    "projectType": "ACADEMIC",
    "img": "/Feature Project/EazyShop - Ecommerce/portfolio_featured.png",
    "images": [
      "/Feature Project/EazyShop - Ecommerce/portfolio_featured.png",
      "/Feature Project/EazyShop - Ecommerce/screencapture-easyshop-liveblog365-2023-05-20-22_01_55.png"
    ],
    "imageCaptions": [
      "EazyShop — Feature Spotlight & UI Design Overview",
      "EazyShop — Complete Live Web Storefront Capture"
    ],
    "githubUrl": "https://github.com/parth022002/Wordpress/tree/main/Easyshop",
    "linkedinUrl": "https://www.linkedin.com/in/parth--ahuja/details/projects/",
    "businessImpact": "Built a multi-vendor retail prototype modeling inventory synchronization, categorized product catalogs, and transactional order fulfillment.",
    "technicalSummary": "Comprehensive academic e-commerce system featuring multi-department catalog browsing, cart operations, customer order tracking, and vendor management.",
    "problemStatement": "Retail businesses transitioning to digital channels require reliable inventory tracking across multiple product departments with zero ordering discrepancies.",
    "highlights": [
      "Multi-department catalog supporting consumer electronics, apparel, and home essentials.",
      "Real-time inventory level deduction preventing stock overselling during peak traffic.",
      "Automated order confirmation and dispatch tracking pipeline."
    ],
    "solutionArchitecture": "WordPress / WooCommerce infrastructure -> PHP controllers -> MySQL database -> Apache web server.",
    "techStack": [
      "WordPress",
      "WooCommerce",
      "PHP",
      "MySQL",
      "JavaScript",
      "CSS3"
    ],
    "keyMetrics": [
      {
        "label": "Department Coverage",
        "value": "Multi-Category"
      },
      {
        "label": "Order Tracking",
        "value": "Real-Time Status"
      },
      {
        "label": "Stock Accuracy",
        "value": "100% Synchronized"
      }
    ],
    "relatedSkills": [
      "E-commerce",
      "WordPress",
      "PHP",
      "MySQL",
      "Inventory Management",
      "Web Development"
    ]
  }
];
