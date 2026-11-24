import { COMPLETED_PROJECTS } from './projectsData';

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'AI & GenAI' | 'Full Stack' | 'Data & Real-time' | 'E-commerce' | 'Business Analytics & Strategy';
  status: 'Production' | 'Live Demo' | 'Research Prototype' | 'Case Study' | 'Completed';
  importanceLevel?: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Level 5';
  projectType?: 'PERSONAL' | 'ACADEMIC';
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
  institution?: string;
  authors?: string;
  guides?: string;
  abstract: string;
  methodology: string[];
  keyFindings: string[];
  stats?: { label: string; value: string; desc: string }[];
  relatedProjectId?: string;
  paperUrl?: string;
  downloadUrl?: string;
  githubUrl?: string;
}

export interface JourneyItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
  location?: string;
  badge?: string;
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
    linkedin: "https://www.linkedin.com/in/parth--ahuja/",
    linktree: "https://linktr.ee/parthahuja",
    stats: [
      { label: "Projects Completed", value: "29" },
      { label: "Verified Certifications", value: "49+" },
      { label: "Ranked Core Skills", value: "100" },
      { label: "Code Repositories", value: "25+" },
    ]
  },

  projects: COMPLETED_PROJECTS,

  researchPapers: [
    {
      id: "paper-ai-advisory-adoption",
      title: "Understanding AI Advisory Adoption Among Indian Retail Investors",
      subtitle: "Evidence From Trust, Social Influence, and Risk Perceptions (TAM, UTAUT2 & PLS-SEM Framework)",
      date: "PGDM Empirical Research Paper (2026)",
      domain: "FinTech & Behavioral AI Adoption",
      institution: "Jagdish Sheth School of Management (JAGSoM), Bengaluru, Karnataka, India",
      authors: "Parth Ahuja (Corresponding Author), Ishika Gupta, Shubham Jaiswal, Priyal Lahoti, Aditya Parashar, Rishu Raj",
      guides: "Prof. Pooja Gupta (Academic Supervisor)",
      abstract: "Investigates the structural and psychological mechanisms governing retail investor adoption of artificial intelligence advisory systems in emerging markets. Integrates the Technology Acceptance Model (TAM), UTAUT2, Trust Theory, and Risk Perception Theory across an empirical survey of 211 Indian investors. Utilizing Partial Least Squares Structural Equation Modeling (PLS-SEM) on 147 active users, the study reveals that Social Influence (β = 0.489) is the dominant driver of adoption, while Perceived Usefulness operates entirely through Trust (80.5% full mediation) rather than as a direct determinant.",
      methodology: [
        "Integrated Theoretical Framework (TAM + UTAUT2 + Trust Theory + Risk Perception)",
        "Empirical Survey Dataset (N = 211 Indian retail investors across metro, tier-1, and tier-2 markets)",
        "Partial Least Squares Structural Equation Modeling (PLS-SEM with 5,000 bootstrap resamples)",
        "Robustness & Mediation Analysis (OLS Regression verification F(6,140) = 139.7, p < 0.001 & VAF mediation testing)"
      ],
      keyFindings: [
        "Social Influence is the primary driver of AI advisory adoption (β = 0.489, p < 0.001, t = 9.17), heavily outweighing individual effort expectancy",
        "Trust in AI acts as a full mediator (VAF = 80.5%) between Perceived Usefulness and Behavioral Intention, proving utility alone does not drive adoption",
        "High explanatory power achieving R² = 0.856 (85.6% variance explained), substantially outperforming previous benchmark literature (Tai & Ku R² = 0.694)",
        "Psychometric validation confirmed: Cronbach's α ≥ 0.901, Composite Reliability ≥ 0.902, SRMR = 0.048, and Statistical Power = 0.995"
      ],
      stats: [
        { label: "Variance Explained (R²)", value: "85.6%", desc: "Substantial predictive power" },
        { label: "Social Influence (β)", value: "0.489", desc: "Top dominant predictor (p < 0.001)" },
        { label: "Trust Mediation (VAF)", value: "80.5%", desc: "Full mediation of utility" },
        { label: "Model Goodness of Fit", value: "0.048", desc: "SRMR (< 0.08 benchmark)" }
      ],
      relatedProjectId: "marketscope",
      paperUrl: "/Research Paper/Understanding AI Advisory Adoption Among Indian Retail Investors.pdf",
      downloadUrl: "/Research Paper/Understanding AI Advisory Adoption Among Indian Retail Investors.pdf",
      githubUrl: "https://github.com/parth022002/marketscope"
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
        id: "oasis-infobyte-intern",
        type: "experience",
        title: "Data Analytics Intern",
        organization: "OASIS INFOBYTE",
        location: "Remote",
        period: "Feb 2026 – March 2026",
        badge: "Recent Internship",
        description: "Conducted exploratory data analytics, built interactive executive Tableau KPI dashboards, and presented workflow optimization proposals to guide non-technical stakeholder decisions.",
        highlights: [
          "Cleaned and analysed 5+ datasets (10,000+ records) using Python, SQL, and Excel to uncover operational trends and anomalies.",
          "Built Tableau dashboards and Excel reports to track KPIs, replacing manual data pulls with decision-ready views.",
          "Pinpointed workflow inefficiencies and presented structured optimization and automation recommendations to guide non-technical stakeholders' decisions."
        ],
        skills: ["Python", "SQL", "Microsoft Excel", "Tableau", "Data Analytics", "KPI Reporting", "Process Optimization", "Stakeholder Communication"]
      },
      {
        id: "creart-php-intern",
        type: "experience",
        title: "PHP Web Developer",
        organization: "CreArt Solutions Pvt Ltd",
        location: "Remote",
        period: "July 2023 – August 2023",
        badge: "Client-Facing Systems",
        description: "Engineered responsive client-facing WebRTC communication modules and tuned relational database queries to boost application throughput.",
        highlights: [
          "Developed 5 responsive modules for a client-facing video-calling application using PHP, JavaScript, HTML/CSS, and MySQL to meet client specifications.",
          "Optimized 10+ SQL queries to boost backend performance and resolved 15+ UI and functional bugs prior to deployment."
        ],
        skills: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "WebRTC", "Query Optimization", "Full-Stack Web"],
        relatedProjectId: "vchat"
      },
      {
        id: "internsavy-android-intern",
        type: "experience",
        title: "Android Application Development",
        organization: "INTERNSAVY",
        location: "Remote",
        period: "July 2023 – July 2023",
        badge: "Mobile Engineering",
        description: "Built responsive native mobile features and collaborated in Agile sprint cycles to deliver tested, bug-free Android deliverables.",
        highlights: [
          "Built 3+ responsive Android features using Java and Android Studio, testing and resolving 15+ bugs to boost app usability and stability.",
          "Collaborated in an Agile environment to refine sprint deliverables and consistently ship project milestones on schedule."
        ],
        skills: ["Android Development", "Java", "Android Studio", "Mobile UI", "Agile Methodologies", "Bug Resolution"]
      }
    ] as JourneyItem[],

    education: [
      {
        id: "jagsom-pgdm",
        type: "education",
        title: "Postgrade PGDM",
        organization: "JAGSoM (Jagdish Sheth School of Management)",
        location: "Bengaluru, India",
        period: "2025 – 2027",
        badge: "Currently Pursuing",
        description: "Post Graduate Diploma in Management specializing in Business Analytics, Product Management, and Technology Strategy. Integrating software engineering architecture with data-driven corporate strategy.",
        highlights: [
          "Core concentration in Business Analytics, Product Strategy, and Technology Commercialization.",
          "Selected among top finalists for executive masterclasses and campus innovation leadership initiatives."
        ],
        skills: ["Business Analytics", "Product Strategy", "Technology Management", "Data-Driven Strategy", "Operations Analytics"]
      },
      {
        id: "marwadi-be-cse",
        type: "education",
        title: "Undergrade BE - Computer Science",
        organization: "Gujarat Technological University MU",
        location: "Rajkot, Gujarat",
        period: "2020 – 2024",
        badge: "Graduated with Distinction",
        description: "Four-year Bachelor of Engineering in Computer Science with rigorous specializations in Software Engineering, Artificial Intelligence, and Distributed Database Architecture. Capstone: ProctorShield.",
        highlights: [
          "Engineered ProctorShield: Flagship AI examination integrity platform leveraging WebRTC and quantized TensorFlow neural models.",
          "Active competitive participant in IEEE Algorithm Arena, Regional SSIP Hackathons, and INTELLIFY 2023."
        ],
        skills: ["Computer Science", "Artificial Intelligence", "Distributed Systems", "Software Engineering", "Algorithms"],
        relatedProjectId: "proctorshield"
      },
      {
        id: "aditya-birla-intermediate",
        type: "education",
        title: "Intermediate (Class XII - Science)",
        organization: "Aditya Birla Higher Secondary School",
        location: "Gujarat, India",
        period: "2018 – 2020",
        badge: "Science Foundation",
        description: "Senior secondary education focused on Mathematics, Physics, Chemistry, and Foundations of Computer Science.",
        highlights: [
          "Developed core programming problem-solving fundamentals, analytical mathematics, and algorithmic logic."
        ],
        skills: ["Mathematics", "Physics", "Computer Science Foundations", "Problem Solving"]
      }
    ] as JourneyItem[]
  }
};
