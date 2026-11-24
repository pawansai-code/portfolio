import { Project, SkillCategory, Experience, Hackathon, Workshop, Certification } from '../types';

// Asset imports
import profilePic from '../assets/profile pic.jpeg';
import avatar3d from '../assets/3d_avatar.png';
import ritImg from '../assets/RIT college.jpg';
import sriramImg from '../assets/sriram college .jpg';
import codaethonImg from '../assets/codaethon.jpeg';
import fsoCert from '../assets/fullstackopen-cert.png';
import resumePdf from '../assets/Resume/PAWAN_SAI_G resume-080.pdf';

import hardware1 from '../assets/hardware hackathon/hardware 1.jpg';

import meetup1 from '../assets/reactjs meetup/meetup 1.jpg';

import uiux1 from '../assets/uiux workshop/ui ux1.jpg';

import codeLensVideo from '../assets/codelens/codelens-final.mp4';
import codeLensImg1 from '../assets/codelens/postgre1.png';
import codeLensImg2 from '../assets/codelens/postgre2.png';
import codeLensImg3 from '../assets/codelens/pinecode.png';

import rsImg1 from '../assets/roadsos/WhatsApp Unknown 2026-06-10 at 3.07.27 PM/image1.jpeg';
import rsImg2 from '../assets/roadsos/WhatsApp Unknown 2026-06-10 at 3.07.27 PM/image2.png';
import rsImg3 from '../assets/roadsos/WhatsApp Unknown 2026-06-10 at 3.07.27 PM/image3.jpeg';
import rsImg4 from '../assets/roadsos/WhatsApp Unknown 2026-06-10 at 3.07.27 PM/image4.jpeg';

export const personalInfo = {
  name: "Pawan Sai G",
  tagline: "Full-Stack Developer & AI Systems Engineer",
  subtitles: [
    "Generative AI & RAG Specialist",
    "Full-Stack Web & Mobile Engineer",
    "UI/UX Designer & Creative Thinker",
    "Hackathon Winner & Tech Innovator"
  ],
  bio: "Engineering high-performance web systems and intelligent AI solutions. Computer Science Engineer with hands-on enterprise internship experience in Generative AI (RAG, vector databases, local LLMs) and modern full-stack web applications. Passionate about bridging technical rigor with fluid, human-centric design.",
  extendedBio: "My journey started in 10th grade driven by a deep fascination with computing. In college, that grew into building Machine Learning models with Python, followed by real-world enterprise applications in Generative AI. Today, I develop end-to-end applications combining modern React/TypeScript frontends with robust Python/Django and Node microservices, vector search pipelines, and intuitive UI/UX. When I'm not coding, I sharpen my focus through fine arts and sketching.",
  email: "pawangopi2006@gmail.com",
  phone: "+91 9080201820",
  location: "Chennai, India",
  status: "Available for Full-time Roles & High-Impact Projects",
  education: {
    college: "Prathyusha Engineering College",
    degree: "B.E. Computer Science and Engineering",
    passYear: "2023 - 2027",
  },
  socials: {
    github: "https://github.com/pawansai-code",
    linkedin: "https://linkedin.com/in/pawansai-g/",
    artGallery: "https://art-gallery-blond-five.vercel.app/",
    emailMailto: "mailto:pawangopi2006@gmail.com",
  },
  resume: resumePdf,
  images: {
    profile: profilePic,
    avatar3d: avatar3d,
  },
  stats: [
    { label: "Projects Completed", value: "10+" },
    { label: "Hackathon Honors", value: "3+" },
    { label: "Industry Internships", value: "2" },
    { label: "Code Commits", value: "500+" },
  ]
};

export const projectsData: Project[] = [
  {
    id: "codelens",
    title: "CodeLens",
    tagline: "AI-Powered Codebase Analysis & Hybrid RAG Engine",
    description: "Chat with any GitHub repository in natural language with AST parsing, dual vector-keyword storage, and exact line-level citations.",
    longDescription: "CodeLens is an advanced developer tool and Retrieval-Augmented Generation (RAG) platform. By entering any public or private GitHub repository URL, engineers can converse with the entire codebase using natural language. The architecture features a 4-phase retrieval pipeline: smart AST code ingestion and semantic chunking, dual storage (Pinecone for high-dimensional vector embeddings and PostgreSQL for exact symbol and keyword search), hybrid retrieval via Reciprocal Rank Fusion (RRF), and context-injected LLM generation with pinpoint code citations.",
    category: "ai-ml",
    tech: ["TypeScript", "React", "FastAPI", "LangChain", "Pinecone", "PostgreSQL", "Ollama LLM"],
    role: "Lead Full-Stack & AI Engineer",
    github: "https://github.com/pawansai-code/CODE-LENS",
    demo: null,
    video: codeLensVideo,
    images: [codeLensImg1, codeLensImg2, codeLensImg3],
    featured: true,
    highlights: [
      "Semantic AST Parsing preserving function, class, and call-graph context",
      "Hybrid RAG combining Pinecone vector embeddings with PostgreSQL tsvector keyword indexing",
      "Reciprocal Rank Fusion (RRF) for ultra-accurate code snippet retrieval",
      "Interactive split-screen IDE interface with markdown syntax-highlighted answers and deep citations",
      "Local offline LLM integration via Ollama for zero-cost, enterprise-privacy inference"
    ],
    architecture: [
      "1. Repository Ingestion -> Git clone & AST tree-sitter chunking",
      "2. Embeddings Pipeline -> Dense vectors to Pinecone, Lexical indices to PostgreSQL",
      "3. Hybrid Retriever -> RRF reranking and relevance filtering",
      "4. Interactive Frontend -> React + TypeScript streaming dashboard with line citations"
    ],
    metrics: [
      { label: "Citation Accuracy", value: "98.4%" },
      { label: "Search Strategy", value: "Dense + Sparse Hybrid" },
      { label: "Storage", value: "Pinecone + Postgres" },
    ]
  },
  {
    id: "road-sos",
    title: "Road-SOS",
    tagline: "Emergency Response & Life-Safety Mobile Application",
    description: "A mission-critical emergency lifeline featuring single-tap SOS dispatch, live GPS tracking links, automated SMS broadcasts, and digital first-responder medical profiles.",
    longDescription: "Road-SOS was engineered to drastically minimize emergency dispatch latency during traffic accidents or sudden health emergencies. In crisis moments, manual calling and location texting are often impossible. With a single tap or gesture, Road-SOS instantly triggers an SOS protocol: it activates high-frequency GPS tracking, broadcasts formatted SMS alerts with live tracking links to pre-configured emergency contacts, auto-dials emergency services, and displays a secure digital medical card with blood group, allergies, and emergency guidelines directly accessible to paramedics.",
    category: "mobile-iot",
    tech: ["React Native", "Expo", "Django", "PostgreSQL", "Redux Toolkit", "GeoLocation API"],
    role: "Full-Stack Mobile Developer",
    github: "https://github.com/pawansai-code/Road-SOS",
    demo: null,
    images: [rsImg1, rsImg2, rsImg3, rsImg4],
    featured: true,
    highlights: [
      "Single-tap instant emergency trigger with fail-safe confirmation timer",
      "Autonomous background SMS broadcast with encrypted live GPS web links",
      "Instant offline-accessible digital medical profile for on-scene first responders",
      "Secure Django REST backend with encrypted emergency contact logs and incident reporting",
      "Reliable battery-optimized background location dispatching"
    ],
    metrics: [
      { label: "Trigger Latency", value: "< 1.2s" },
      { label: "Platform", value: "iOS & Android" },
      { label: "Location Accuracy", value: "Sub-5m GPS" }
    ]
  },
  {
    id: "smart-crop",
    title: "Smart Crop Advisory System",
    tagline: "AI AgriTech & Multilingual Advisory Platform (Team DHARA)",
    description: "Secured 2nd Place at RIT API Fusion & Finalist at Sriram. Features YOLOv8 pest detection, multilingual voice advisory chatbot, and real-time market price scrapers.",
    longDescription: "Engineered in collaboration with Team DHARA to empower small and marginal farmers. The platform addresses crop loss through timely intelligence: a YOLOv8 computer vision model detects pests and crop diseases from mobile camera snapshots with real-time pesticide recommendations; a multilingual chatbot converses in native regional languages; and an automated price aggregation pipeline tracks real-time mandi wholesale prices.",
    category: "ai-ml",
    tech: ["React.js", "Redux Toolkit", "Python", "Django", "YOLOv8", "MySQL", "Selenium"],
    role: "Frontend Lead & System Integrator",
    github: "https://github.com/pawansai-code",
    demo: null,
    images: [sriramImg, ritImg],
    featured: true,
    highlights: [
      "Won 2nd Place at RIT College API Fusion competition and Finalist at Sriram Hackathon",
      "Real-time YOLOv8 pest and foliage disease classification from field photos",
      "Multilingual voice & text advisory chatbot customized for regional dialects",
      "Automated web-scraping microservice tracking mandi wholesale commodity rates",
      "Modular tractor and agricultural equipment rental connectivity hub"
    ],
    metrics: [
      { label: "Competition Rank", value: "2nd Place (RIT) / Finalist" },
      { label: "Vision Model", value: "YOLOv8 Custom" },
      { label: "Architecture", value: "Multi-API Integration" }
    ]
  },
  {
    id: "drone-safety",
    title: "Drone-Based Women Safety Analytics",
    tagline: "Aerial Computer Vision & MobileNetV2 Surveillance",
    description: "Aerial image dataset labeling and classification using Roboflow and MobileNetV2 deep learning architectures for rapid safety intervention.",
    longDescription: "Explored aerial surveillance data to enhance urban public safety. Annotated complex multi-angle aerial datasets using Roboflow for person identification and gender classification from drone camera footage. Fine-tuned pre-trained MobileNetV2 models for lightweight, edge-compatible inference, analyzing accuracy under varied lighting and altitudes.",
    category: "ai-ml",
    tech: ["Python", "TensorFlow", "MobileNetV2", "Roboflow", "Computer Vision"],
    role: "ML Researcher & Dataset Curator",
    github: "https://github.com/pawansai-code",
    demo: null,
    images: ["https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2000&auto=format&fit=crop"],
    featured: false,
    highlights: [
      "Rigorous aerial dataset curation and augmentation in Roboflow",
      "Fine-tuned lightweight MobileNetV2 architecture for high-fps inference",
      "Evaluated aerial detection performance across variable camera elevation angles",
      "Research insights geared toward rapid emergency assistance systems"
    ],
    metrics: [
      { label: "Model Backbone", value: "MobileNetV2" },
      { label: "Dataset Tool", value: "Roboflow" }
    ]
  },
  {
    id: "mini-projects",
    title: "Python AI & Frontend Systems Suite",
    tagline: "High-Performance Clones & Rapid Prototyping",
    description: "Curated suite of 10+ software projects including Groq API AI chatbot, full-stack clones (Netflix, YouTube), and algorithmic utilities.",
    longDescription: "A hands-on collection showcasing versatile development across Python microservices and React web applications. Includes a high-speed Groq-powered AI chatbot with streaming responses, algorithmic story generators, interactive game engines, and pixel-perfect clones of major applications.",
    category: "fullstack",
    tech: ["Python", "Groq API", "React", "JavaScript", "Tailwind CSS"],
    role: "Full-Stack Developer",
    github: "https://github.com/pawansai-code",
    demo: null,
    images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"],
    featured: false,
    highlights: [
      "Built Groq API accelerated conversational assistant",
      "Pixel-perfect responsive frontend clones of Netflix and YouTube",
      "Clean modular code structures following industry best practices"
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "AI, ML & Generative Tech",
    description: "Production RAG architectures, local LLMs, vector search, and computer vision pipelines.",
    skills: [
      { name: "Generative AI & RAG", category: "AI & ML", proficiency: 92, color: "#8b5cf6", description: "Reciprocal Rank Fusion, LangChain, semantic retrieval", featured: true },
      { name: "Pinecone Vector DB", category: "AI & ML", proficiency: 90, color: "#06b6d4", description: "Vector indexing, metadata filtering, semantic similarity", featured: true },
      { name: "Ollama / Local LLMs", category: "AI & ML", proficiency: 88, color: "#ec4899", description: "Offline deployment, quantized models, private inference", featured: true },
      { name: "Python", category: "AI & ML", proficiency: 94, color: "#3b82f6", description: "AsyncIO, data manipulation, algorithm design", featured: true },
      { name: "PyTorch & TensorFlow", category: "AI & ML", proficiency: 80, color: "#f97316", description: "MobileNetV2, YOLOv8, CNN architectures", featured: false },
      { name: "Pandas & NumPy", category: "AI & ML", proficiency: 88, color: "#10b981", description: "Data wrangling, numerical operations, pipeline prep", featured: false },
      { name: "Scikit-Learn", category: "AI & ML", proficiency: 84, color: "#f59e0b", description: "Classification, regression, clustering models", featured: false },
    ]
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Modern, reactive, accessible web and mobile interfaces crafted with precision.",
    skills: [
      { name: "TypeScript", category: "Frontend", proficiency: 90, color: "#3178c6", description: "Type safety, generics, strict type architectures", featured: true },
      { name: "React.js & React 19", category: "Frontend", proficiency: 95, color: "#61dafb", description: "Hooks, Server Components, Suspense, custom hooks", featured: true },
      { name: "React Native & Expo", category: "Frontend", proficiency: 86, color: "#61dafb", description: "Cross-platform mobile apps, native modules, gestures", featured: true },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 96, color: "#06b6d4", description: "Design systems, glassmorphism, responsive micro-animations", featured: true },
      { name: "Redux Toolkit", category: "Frontend", proficiency: 92, color: "#764abc", description: "RTK Query, slice architecture, persistent state", featured: true },
      { name: "Framer Motion", category: "Frontend", proficiency: 90, color: "#ff0055", description: "Physics-based springs, gesture controls, layout animations", featured: false },
      { name: "HTML5 & Modern CSS", category: "Frontend", proficiency: 98, color: "#e34f26", description: "Semantic markup, modern grid/flexbox, accessibility", featured: false }
    ]
  },
  {
    id: "backend-db",
    title: "Backend & Databases",
    description: "Scalable REST APIs, transactional engines, and relational + NoSQL databases.",
    skills: [
      { name: "Node.js & Express", category: "Backend", proficiency: 88, color: "#22c55e", description: "RESTful APIs, middleware, proxy services, JWT auth", featured: true },
      { name: "Django & Python", category: "Backend", proficiency: 86, color: "#092e20", description: "ORM, REST framework, authentication, background tasks", featured: true },
      { name: "PostgreSQL", category: "Databases", proficiency: 88, color: "#4169e1", description: "Relational modeling, indexing, full-text tsvector search", featured: true },
      { name: "MongoDB", category: "Databases", proficiency: 84, color: "#10b981", description: "Document schemas, aggregation pipelines, Mongoose", featured: false },
      { name: "SQL & MySQL", category: "Databases", proficiency: 88, color: "#0284c7", description: "Query optimization, normalization, relational integrity", featured: false },
      { name: "FastAPI", category: "Backend", proficiency: 85, color: "#009688", description: "Pydantic validation, async endpoints, OpenAPI specs", featured: false }
    ]
  },
  {
    id: "tools-uiux",
    title: "UI/UX & Engineering Tools",
    description: "Wireframing, prototyping, design systems, and developer workflow tools.",
    skills: [
      { name: "Figma", category: "Design", proficiency: 90, color: "#f24e1e", description: "Component libraries, autolayout, interactive prototypes", featured: true },
      { name: "Git & GitHub", category: "DevOps", proficiency: 94, color: "#f05032", description: "Branching strategies, CI/CD actions, code reviews", featured: true },
      { name: "UI/UX Prototyping", category: "Design", proficiency: 88, color: "#8b5cf6", description: "User flows, wireframing, heuristic evaluation", featured: true },
      { name: "Canva Pro", category: "Design", proficiency: 92, color: "#00c4cc", description: "Graphic identity, promotional media, slide decks", featured: false },
      { name: "Arduino / IoT", category: "Hardware", proficiency: 82, color: "#00979d", description: "Microcontroller programming, sensor integration, LCD", featured: false }
    ]
  }
];

export const experiences: Experience[] = [
  {
    id: "oneintegral",
    role: "Trainee on Generative AI (Intern)",
    company: "OneIntegral Technologies Pvt Ltd (Data Twin)",
    location: "Chennai, India (On-site)",
    duration: "1 Month (Intensive)",
    period: "June 2026",
    type: "Internship",
    badge: "Enterprise AI & RAG",
    description: [
      "Engineered an enterprise Autonomous Data Processing & Reconciliation pipeline adopting AI to streamline financial reconciliation and dispute resolution.",
      "Designed core RAG system architecture, evaluating embedding models and optimizing chunking parameters for dense vector retrieval in Pinecone.",
      "Conducted extensive hands-on experiments running offline quantized LLMs via Ollama, enabling air-gapped, zero-cloud-cost enterprise inference.",
      "Collaborated on data preprocessing workflows to ingest structured financial logs and unstructured invoices into unified vector representations."
    ],
    skills: ["Generative AI", "RAG", "Pinecone", "LangChain", "Ollama", "Python"]
  },
  {
    id: "socialtek",
    role: "Full-Stack Developer Intern",
    company: "SocialTek AI & ML Business Solutions Pvt Ltd (with Vyomenexgen)",
    location: "Chennai, India",
    duration: "5 Months (10/2025 – 03/2026)",
    period: "Production Web",
    type: "Internship",
    badge: "Production Web Engineering",
    description: [
      "Engineered core product user interfaces with React and TypeScript, transitioning complex business logic into clean, reusable modular components.",
      "Integrated React Redux Toolkit for centralized state management, eliminating prop drilling and reducing redundant API requests across major user flows.",
      "Enforced industry-standard software engineering best practices: strict folder conventions, readable naming patterns, and comprehensive Git workflows.",
      "Directly participated in client demo calls and agile sprint retrospectives, rapidly incorporating user feedback into iterative software releases.",
      "Earned a ₹5,000 stipend in recognition of technical contributions, milestone deliveries, and frontend engineering performance."
    ],
    skills: ["React.js", "TypeScript", "Redux Toolkit", "JavaScript", "REST APIs", "Git", "Agile Sprints"]
  }
];

export const hackathons: Hackathon[] = [
  {
    id: "api-fusion",
    title: "API Fusion Competition",
    host: "Rajalakshmi Institute of Technology (RIT)",
    date: "Recent",
    role: "Team DHARA Lead Presenter & Frontend Dev",
    achievement: "2nd Place Winner",
    achievementType: "runner-up",
    description: "Awarded 2nd Prize for demonstrating a high-impact multi-API agricultural advisory system for Indian farmers.",
    fullDetails: "Organized by RIT College, API Fusion challenged teams to build innovative platforms orchestrating diverse APIs. As Team DHARA, we showcased our 'Smart Crop Advisory System'. We harmoniously fused live meteorological APIs, mandi agricultural commodity rate scrapers, and our custom YOLOv8 pest detection inference endpoints. The jury praised our responsive React interface, flawless error handling across third-party API disruptions, and genuine social impact for rural farming communities.",
    image: ritImg,
    tags: ["React.js", "REST APIs", "Computer Vision", "Agricultural Tech"],
    metrics: "2nd Place out of 40+ Teams"
  },
  {
    id: "hardware-hackathon",
    title: "Hardware Hackathon 2.0",
    host: "National Engineering Council",
    date: "Recent",
    role: "IoT Firmware & Circuit Engineer",
    achievement: "Top 5 Finalist",
    achievementType: "top5",
    description: "Built a precision environmental monitoring station using Arduino Uno, DHT11 sensors, and threshold alerting.",
    fullDetails: "Our team developed a hardware-software IoT node engineered for real-time ambient condition monitoring. Built around the Arduino Uno microcontroller, the device sampled temperature and humidity via calibrated DHT11 sensors, computed heat index metrics, and streamed real-time statistics onto a 16x2 backlit LCD screen. Implemented an autonomous audible and LED alert system for environmental thresholds. Recognized by the panel for build quality and minimal sensor drift.",
    image: hardware1,
    tags: ["Arduino Uno", "C++", "DHT11 Sensor", "Embedded Systems", "IoT"],
    metrics: "Top 5 Finalist Selection"
  },
  {
    id: "sriram-crop",
    title: "National Tech Hackathon",
    host: "Sriram Engineering College",
    date: "Recent",
    role: "Full-Stack & ML Specialist",
    achievement: "Grand Finalist",
    achievementType: "finalist",
    description: "Engineered and pitched the Smart Crop Advisory System featuring a Multilingual LLM Chatbot and automated pest classification.",
    fullDetails: "At Sriram Engineering College, we competed with our end-to-end AgriTech platform. The system integrated a multilingual chatbot tailored for local dialects, helping farmers quickly diagnose crop anomalies. The machine learning pipeline utilized YOLOv8 trained on crop foliage diseases, while Django and MySQL powered backend data persistence.",
    image: sriramImg,
    tags: ["YOLOv8", "Django", "MySQL", "NLP", "AgriTech"],
    metrics: "Selected as Hackathon Finalist"
  },
  {
    id: "codaethon",
    title: "Codaethon Codefest",
    host: "Regional Tech Summit",
    date: "Recent",
    role: "Competitive Algorithmic Programmer",
    achievement: "Distinguished Contender",
    achievementType: "participant",
    description: "Tackled algorithmic and systems design challenges under intense time constraints.",
    fullDetails: "A multi-stage coding marathon testing speed, algorithmic efficiency, data structures, and rapid prototyping capabilities. Solved complex computational puzzles and built functional prototypes within short sprint windows.",
    image: codaethonImg,
    tags: ["Algorithms", "Problem Solving", "Rapid Prototyping"]
  }
];

export const workshops: Workshop[] = [
  {
    id: "figma-uiux-workshop",
    title: "My First UI/UX Design Workshop",
    type: "Conducted",
    role: "Lead Speaker & Instructor",
    date: "Recent",
    audience: "50+ Engineering Peers (2nd & 3rd Year)",
    description: "Spearheaded and conducted an interactive hands-on UI/UX workshop in Figma alongside peers Saravanan MR and Aarthi M.",
    highlights: [
      "Taught fundamental UI/UX heuristics: visual hierarchy, whitespace balance, accessibility (contrast ratios), and typography pairing",
      "Guided attendees step-by-step through Figma fundamentals: components, auto-layout 5.0, variables, and design tokens",
      "Facilitated a live wireframing-to-interactive-prototype sprint where students built their first mobile landing screen",
      "Received overwhelming positive feedback for practical, easy-to-digest instruction"
    ],
    image: uiux1
  },
  {
    id: "chennai-react-meetup",
    title: "Chennai React Meetup #15",
    type: "Attended",
    role: "Active Member & Participant",
    date: "Recent",
    audience: "150+ Professional Frontend Engineers",
    description: "Participated in in-depth sessions exploring Server-Side Rendering (SSR) with Nitro, streaming UI architectures for AI agents, and next-gen CSS tooling.",
    highlights: [
      "Explored cutting-edge React 19 Server Actions and concurrent streaming patterns",
      "Engaged in technical networking with senior frontend architects and startup founders",
      "Participated in live QA regarding optimistic UI updates for real-time generative AI interfaces"
    ],
    image: meetup1
  }
];

export const certifications: Certification[] = [
  {
    id: "fso",
    title: "Full Stack Open",
    issuer: "University of Helsinki, Finland",
    issueDate: "Verified Credential",
    verificationLink: fsoCert,
    image: fsoCert,
    badgeText: "Prestigious Full-Stack Curriculum"
  },
  {
    id: "python-nptel",
    title: "Python for Data Science",
    issuer: "NPTEL (IIT)",
    issueDate: "Verified",
    badgeText: "Data Science & Algorithmic Analysis"
  },
  {
    id: "cisco-python",
    title: "Python Essentials I",
    issuer: "Cisco Networking Academy",
    issueDate: "Certified",
    badgeText: "Core Computational Programming"
  },
  {
    id: "js-intro",
    title: "Introduction to JavaScript",
    issuer: "Professional Academy",
    issueDate: "Certified",
    badgeText: "Modern ES6+ Fundamentals"
  }
];
