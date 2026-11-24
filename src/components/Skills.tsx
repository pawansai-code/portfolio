import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Code2, Database, Layout, Sparkles, 
  ArrowUpRight, Search, Terminal, Server, Layers,
  Cpu, Palette, ArrowRight
} from 'lucide-react';
import { 
  FaPython, FaJava, FaReact, FaNodeJs, FaDatabase, 
  FaGitAlt, FaHtml5, FaBrain, FaFigma
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiTailwindcss, SiDjango, 
  SiMongodb, SiPostgresql, SiPandas, SiNumpy, SiScikitlearn, 
  SiC, SiPytorch, SiExpo, SiRedux, SiFramer, SiPostman
} from 'react-icons/si';
import { ThreeSkillCanvas } from './ThreeSkillCanvas';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  proficiency: number;
  level: 'Production' | 'Core' | 'Advanced' | 'Proficient';
  color: string;
  icon: React.ReactNode;
  description: string;
  practicalUse: string;
  tag: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  accentColor: string;
  badge: string;
}

interface SkillsProps {
  onSelectSkill?: (skillName: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onSelectSkill }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: CategoryGroup[] = [
    {
      id: 'ai-ml',
      title: 'AI & Generative Tech',
      tagline: 'Production RAG pipelines, local offline LLMs, vector search & computer vision.',
      icon: <Brain className="w-5 h-5" />,
      accentColor: '#8b5cf6',
      badge: 'High Impact'
    },
    {
      id: 'frontend',
      title: 'Frontend & Mobile',
      tagline: 'Modern reactive SPAs, strict type systems, responsive design & mobile apps.',
      icon: <Code2 className="w-5 h-5" />,
      accentColor: '#06b6d4',
      badge: 'React 19 Core'
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      tagline: 'Scalable microservices, REST APIs, authentication gates & server runtimes.',
      icon: <Server className="w-5 h-5" />,
      accentColor: '#10b981',
      badge: 'Microservices'
    },
    {
      id: 'databases',
      title: 'Databases & Vectors',
      tagline: 'Relational schemas, NoSQL document stores & embedding vector indices.',
      icon: <Database className="w-5 h-5" />,
      accentColor: '#3b82f6',
      badge: 'Dense + Sparse'
    },
    {
      id: 'languages',
      title: 'Core Languages',
      tagline: 'Object-oriented programming, algorithmic efficiency & memory structures.',
      icon: <Terminal className="w-5 h-5" />,
      accentColor: '#f59e0b',
      badge: 'Foundations'
    },
    {
      id: 'tools-design',
      title: 'UI/UX & DevOps',
      tagline: 'Design systems, wireframes, version control workflows & testing suites.',
      icon: <Palette className="w-5 h-5" />,
      accentColor: '#ec4899',
      badge: 'Design Rigor'
    }
  ];

  const allSkills: SkillItem[] = useMemo(() => [
    // AI, ML & Generative Tech
    {
      id: 'rag',
      name: 'Generative AI & RAG',
      category: 'AI & Generative Tech',
      categoryId: 'ai-ml',
      proficiency: 95,
      level: 'Production',
      color: '#8b5cf6',
      icon: <FaBrain className="w-5 h-5 text-purple-400" />,
      description: 'Hybrid dense + sparse retrieval, semantic embeddings, and reciprocal rank fusion.',
      practicalUse: 'Engineered sub-second AST repository search & local citation streams in CodeLens IDE.',
      tag: 'Generative AI'
    },
    {
      id: 'pinecone',
      name: 'Pinecone Vector DB',
      category: 'AI & Generative Tech',
      categoryId: 'ai-ml',
      proficiency: 92,
      level: 'Production',
      color: '#06b6d4',
      icon: <FaDatabase className="w-5 h-5 text-cyan-400" />,
      description: 'Serverless vector indexes, metadata filtering, and high-dimensional cosine similarity.',
      practicalUse: 'Stores 1536-dimensional OpenAI & local sentence embeddings for instant code retrieval.',
      tag: 'Vector Search'
    },
    {
      id: 'ollama',
      name: 'Ollama / Local LLMs',
      category: 'AI & Generative Tech',
      categoryId: 'ai-ml',
      proficiency: 90,
      level: 'Advanced',
      color: '#ec4899',
      icon: <Cpu className="w-5 h-5 text-pink-400" />,
      description: 'Offline private LLM execution with quantized weights (LLaMA, DeepSeek, Mistral).',
      practicalUse: 'Enabled zero-latency, private offline code intelligence without external cloud API dependencies.',
      tag: 'Offline AI'
    },
    {
      id: 'pytorch',
      name: 'PyTorch & Vision',
      category: 'AI & Generative Tech',
      categoryId: 'ai-ml',
      proficiency: 84,
      level: 'Advanced',
      color: '#f97316',
      icon: <SiPytorch className="w-5 h-5 text-orange-500" />,
      description: 'Convolutional neural networks, MobileNetV2 fine-tuning, and YOLOv8 computer vision.',
      practicalUse: 'Deployed real-time crop leaf pest detection in Smart Crop Advisory System (RIT winner).',
      tag: 'Deep Learning'
    },
    {
      id: 'pandas-numpy',
      name: 'Pandas & NumPy',
      category: 'AI & Generative Tech',
      categoryId: 'ai-ml',
      proficiency: 90,
      level: 'Core',
      color: '#10b981',
      icon: <SiPandas className="w-5 h-5 text-emerald-400" />,
      description: 'High-speed matrix calculations, tabular data preprocessing, and dataset augmentation.',
      practicalUse: 'Engineered training data pipelines and automated mandi agricultural price scrapers.',
      tag: 'Data Science'
    },
    {
      id: 'scikit-learn',
      name: 'Scikit-Learn',
      category: 'AI & Generative Tech',
      categoryId: 'ai-ml',
      proficiency: 86,
      level: 'Proficient',
      color: '#f59e0b',
      icon: <SiScikitlearn className="w-5 h-5 text-amber-500" />,
      description: 'Supervised classification, regression modeling, and cluster analytics.',
      practicalUse: 'Applied during 21-day Virtual Tech Services internship for weather classification models.',
      tag: 'ML Classical'
    },

    // Frontend & Mobile
    {
      id: 'react',
      name: 'React 19 & React.js',
      category: 'Frontend & Mobile',
      categoryId: 'frontend',
      proficiency: 96,
      level: 'Production',
      color: '#61dafb',
      icon: <FaReact className="w-5 h-5 text-cyan-400" />,
      description: 'Modern component lifecycle, Server Components, concurrent rendering, and custom hooks.',
      practicalUse: 'Core framework for this portfolio, CodeLens IDE interface, and SocialTek enterprise client apps.',
      tag: 'Core Framework'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Frontend & Mobile',
      categoryId: 'frontend',
      proficiency: 92,
      level: 'Core',
      color: '#3178c6',
      icon: <SiTypescript className="w-5 h-5 text-blue-500" />,
      description: 'Strict compile-time type verification, generics, discriminated unions, and interface design.',
      practicalUse: 'Guarantees zero runtime null exceptions across complex UI states and API data shapes.',
      tag: 'Type Safety'
    },
    {
      id: 'react-native',
      name: 'React Native & Expo',
      category: 'Frontend & Mobile',
      categoryId: 'frontend',
      proficiency: 88,
      level: 'Production',
      color: '#61dafb',
      icon: <SiExpo className="w-5 h-5 text-slate-800 dark:text-white" />,
      description: 'Cross-platform mobile apps for iOS and Android with native gestures and hardware sensors.',
      practicalUse: 'Built Road-SOS emergency response app featuring live GPS dispatch and background SMS alerts.',
      tag: 'Mobile Apps'
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Frontend & Mobile',
      categoryId: 'frontend',
      proficiency: 98,
      level: 'Core',
      color: '#06b6d4',
      icon: <SiTailwindcss className="w-5 h-5 text-cyan-400" />,
      description: 'Utility-first styling, design token systems, dark mode palettes, and responsive glassmorphism.',
      practicalUse: 'Crafted the entire visual design language, electric blue theme, and sleek responsive layouts.',
      tag: 'UI Styling'
    },
    {
      id: 'redux',
      name: 'Redux Toolkit',
      category: 'Frontend & Mobile',
      categoryId: 'frontend',
      proficiency: 92,
      level: 'Production',
      color: '#764abc',
      icon: <SiRedux className="w-5 h-5 text-purple-500" />,
      description: 'Predictable state containers, RTK Query API caching, and immutable slice management.',
      practicalUse: 'Managed complex client-side session states, user verification, and cached API feeds at SocialTek.',
      tag: 'State Store'
    },
    {
      id: 'framer-motion',
      name: 'Framer Motion',
      category: 'Frontend & Mobile',
      categoryId: 'frontend',
      proficiency: 90,
      level: 'Advanced',
      color: '#ff0055',
      icon: <SiFramer className="w-5 h-5 text-pink-500" />,
      description: 'Physics-based spring dynamics, layout animations, gesture controls, and smooth route transitions.',
      practicalUse: 'Powers the sliding navbar indicators, organic blob morphs, and stagger animations across the site.',
      tag: 'Micro-animations'
    },
    {
      id: 'html5-css3',
      name: 'HTML5 & Modern CSS',
      category: 'Frontend & Mobile',
      categoryId: 'frontend',
      proficiency: 98,
      level: 'Core',
      color: '#e34f26',
      icon: <FaHtml5 className="w-5 h-5 text-orange-500" />,
      description: 'Accessible semantic markup, CSS grid/flexbox, SVG animation, and mobile touch optimization.',
      practicalUse: 'Ensures 100% Lighthouse accessibility, responsive fluidity, and clean DOM tree hierarchies.',
      tag: 'Web Standards'
    },

    // Backend & APIs
    {
      id: 'nodejs',
      name: 'Node.js & Express',
      category: 'Backend & APIs',
      categoryId: 'backend',
      proficiency: 90,
      level: 'Production',
      color: '#22c55e',
      icon: <FaNodeJs className="w-5 h-5 text-green-500" />,
      description: 'Non-blocking I/O event loops, RESTful endpoints, middleware chains, and JWT security gates.',
      practicalUse: 'Developed high-concurrency microservice proxies and Groq API streaming bridges.',
      tag: 'Runtime'
    },
    {
      id: 'django',
      name: 'Django & REST',
      category: 'Backend & APIs',
      categoryId: 'backend',
      proficiency: 88,
      level: 'Production',
      color: '#092e20',
      icon: <SiDjango className="w-5 h-5 text-emerald-600" />,
      description: 'High-productivity Python web framework with powerful ORM, authentication, and REST framework.',
      practicalUse: 'Built backend services for Road-SOS emergency logs and Smart Crop market data persistence.',
      tag: 'Backend Engine'
    },
    {
      id: 'rest-apis',
      name: 'RESTful Architecture',
      category: 'Backend & APIs',
      categoryId: 'backend',
      proficiency: 94,
      level: 'Core',
      color: '#3b82f6',
      icon: <Server className="w-5 h-5 text-blue-500" />,
      description: 'Stateless endpoints, standard HTTP methods, payload validation, and clean error responses.',
      practicalUse: 'Designed seamless data interfaces bridging React frontends with Python and Node backends.',
      tag: 'Architecture'
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: 'Backend & APIs',
      categoryId: 'backend',
      proficiency: 86,
      level: 'Proficient',
      color: '#009688',
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      description: 'Asynchronous Python framework with Pydantic type validation and automatic OpenAPI Swagger docs.',
      practicalUse: 'Created high-throughput inference endpoints for serving localized AI model requests.',
      tag: 'Async APIs'
    },

    // Databases & Vectors
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Databases & Vectors',
      categoryId: 'databases',
      proficiency: 90,
      level: 'Production',
      color: '#4169e1',
      icon: <SiPostgresql className="w-5 h-5 text-blue-500" />,
      description: 'ACID-compliant relational database, index optimization, and tsvector full-text search.',
      practicalUse: 'Powers the lexical sparse indexing in CodeLens hybrid search alongside Pinecone dense vectors.',
      tag: 'Relational'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Databases & Vectors',
      categoryId: 'databases',
      proficiency: 85,
      level: 'Proficient',
      color: '#10b981',
      icon: <SiMongodb className="w-5 h-5 text-green-500" />,
      description: 'Document-oriented database with flexible JSON-like BSON schemas and aggregation pipelines.',
      practicalUse: 'Ideal for unstructured event logging, chat history storage, and rapid prototyping.',
      tag: 'NoSQL'
    },
    {
      id: 'sql',
      name: 'SQL & MySQL',
      category: 'Databases & Vectors',
      categoryId: 'databases',
      proficiency: 90,
      level: 'Core',
      color: '#0284c7',
      icon: <FaDatabase className="w-5 h-5 text-sky-500" />,
      description: 'Complex relational JOIN queries, schema normalization, and transaction rollbacks.',
      practicalUse: 'Maintained agricultural commodity price logs and verified user profile records.',
      tag: 'Databases'
    },

    // Core Languages
    {
      id: 'python',
      name: 'Python',
      category: 'Core Languages',
      categoryId: 'languages',
      proficiency: 95,
      level: 'Core',
      color: '#3b82f6',
      icon: <FaPython className="w-5 h-5 text-blue-400" />,
      description: 'Primary computational language for AI/ML, data engineering, algorithms, and backend APIs.',
      practicalUse: 'Authored 5+ AI microservices, RAG pipelines, data visualizers, and hackathon prototypes.',
      tag: 'Primary'
    },
    {
      id: 'javascript',
      name: 'JavaScript (ES6+)',
      category: 'Core Languages',
      categoryId: 'languages',
      proficiency: 94,
      level: 'Core',
      color: '#f7df1e',
      icon: <SiJavascript className="w-5 h-5 text-yellow-400" />,
      description: 'Asynchronous event driven programming, closures, promises, prototypes, and browser APIs.',
      practicalUse: 'High-speed client-side execution, interactive state machines, and dynamic DOM rendering.',
      tag: 'Primary'
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Core Languages',
      categoryId: 'languages',
      proficiency: 84,
      level: 'Proficient',
      color: '#ed8b00',
      icon: <FaJava className="w-5 h-5 text-amber-600" />,
      description: 'Object-oriented software engineering principles, design patterns, and JVM fundamentals.',
      practicalUse: 'Implemented core Data Structures & Algorithms and academic coursework projects.',
      tag: 'OOP Rigor'
    },
    {
      id: 'c-lang',
      name: 'C Programming',
      category: 'Core Languages',
      categoryId: 'languages',
      proficiency: 82,
      level: 'Proficient',
      color: '#a8b9cc',
      icon: <SiC className="w-5 h-5 text-sky-600" />,
      description: 'Low-level memory management, pointers, bitwise operations, and foundational algorithms.',
      practicalUse: 'Built deep intuition for memory allocation, cache locality, and runtime complexity.',
      tag: 'Systems'
    },

    // UI/UX & DevOps Tools
    {
      id: 'figma',
      name: 'Figma',
      category: 'UI/UX & DevOps',
      categoryId: 'tools-design',
      proficiency: 92,
      level: 'Advanced',
      color: '#f24e1e',
      icon: <FaFigma className="w-5 h-5 text-orange-500" />,
      description: 'Design systems, auto-layout hierarchies, component variants, and interactive prototypes.',
      practicalUse: 'Mentored 50+ students in a hands-on UI/UX workshop; prototyped all portfolio layouts.',
      tag: 'UI/UX Design'
    },
    {
      id: 'git-github',
      name: 'Git & GitHub',
      category: 'UI/UX & DevOps',
      categoryId: 'tools-design',
      proficiency: 95,
      level: 'Core',
      color: '#f05032',
      icon: <FaGitAlt className="w-5 h-5 text-orange-600" />,
      description: 'Branch management, pull requests, interactive rebasing, merge hygiene, and CI/CD actions.',
      practicalUse: 'Enforced Git best practices in team hackathons and enterprise SocialTek client codebases.',
      tag: 'DevOps'
    },
    {
      id: 'canva',
      name: 'Canva Pro & Visual Design',
      category: 'UI/UX & DevOps',
      categoryId: 'tools-design',
      proficiency: 92,
      level: 'Proficient',
      color: '#00c4cc',
      icon: <Palette className="w-5 h-5 text-teal-400" />,
      description: 'Fine art composition, marketing visual assets, presentation slide decks, and digital graphics.',
      practicalUse: 'Synthesized with my active fine art discipline to create balanced UI compositions.',
      tag: 'Visual Assets'
    },
    {
      id: 'postman',
      name: 'Postman',
      category: 'UI/UX & DevOps',
      categoryId: 'tools-design',
      proficiency: 88,
      level: 'Proficient',
      color: '#ff6c37',
      icon: <SiPostman className="w-5 h-5 text-orange-500" />,
      description: 'API testing, automated collection runners, environment variables, and payload assertions.',
      practicalUse: 'Used to validate API contracts during the RIT API Fusion hackathon victory.',
      tag: 'Testing'
    }
  ], []);

  // Filter skills based on category and search query
  const filteredSkills = useMemo(() => {
    let list = allSkills;
    if (activeCategory !== 'all') {
      list = list.filter(s => s.categoryId === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allSkills, activeCategory, searchQuery]);

  // Group skills by category for the Bento Hub view
  const categorizedSkills = useMemo(() => {
    const map = new Map<string, SkillItem[]>();
    categories.forEach(cat => {
      map.set(cat.id, []);
    });

    allSkills.forEach(skill => {
      if (map.has(skill.categoryId)) {
        map.get(skill.categoryId)?.push(skill);
      }
    });

    return map;
  }, [allSkills, categories]);

  const currentCategoryObj = categories.find(c => c.id === activeCategory);
  const activeColor = currentCategoryObj ? currentCategoryObj.accentColor : '#3b82f6';
  const activeTitle = currentCategoryObj ? currentCategoryObj.title : 'All Tech Domains';

  const handleSelectSkillAction = (skillName: string) => {
    if (onSelectSkill) {
      onSelectSkill(skillName);
    } else {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#090d16] border-y border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            Interactive 3D Tech Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Categorized Stack & <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Core Competencies</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Explore my full technical ecosystem categorized by specialized domain with real-time 3D orbital visualization and fluid interactions.
          </p>
        </div>

        {/* 3D Three.js Interactive Tech Hub & Domain Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          
          {/* Left Column: Interactive 3D Three.js Tech Canvas */}
          <div className="lg:col-span-5">
            <ThreeSkillCanvas 
              activeColor={activeColor}
              categoryTitle={activeTitle}
            />
          </div>

          {/* Right Column: Dynamic Category Overview & Search */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-lg">
              
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span 
                  className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border text-white shadow-sm"
                  style={{ backgroundColor: activeColor, borderColor: `${activeColor}40` }}
                >
                  {activeCategory === 'all' ? 'Complete Engineering Stack' : activeTitle}
                </span>

                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  {filteredSkills.length} Technologies Indexed
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                {activeCategory === 'all' 
                  ? 'Full-Stack & Generative AI Architecture' 
                  : currentCategoryObj?.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {activeCategory === 'all'
                  ? 'A dual-stack skill set integrating deep machine learning pipelines and local offline LLMs with production React 19 frontends, Redux Toolkit, and microservice architectures.'
                  : currentCategoryObj?.tagline}
              </p>

              {/* Fast Stats Row */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="block text-xl font-black text-slate-900 dark:text-white font-mono">
                    32+
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Tech Nodes
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="block text-xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    6
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Domains
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="block text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    100%
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Production Rigor
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any skill or tool (e.g., React, Python, RAG, Figma)..."
                className="w-full pl-11 pr-20 py-3.5 text-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Interactive Domain Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl mx-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Domains</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-white/20 dark:bg-white/10">
              {allSkills.length}
            </span>
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categorizedSkills.get(cat.id)?.length || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
                <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Categorized Bento Cards Matrix */}
        {activeCategory === 'all' && !searchQuery.trim() ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              const skillsInCat = categorizedSkills.get(cat.id) || [];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: cat.accentColor }}
                        >
                          {cat.icon}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                            {cat.title}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {skillsInCat.length} Technologies
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                        {cat.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                      {cat.tagline}
                    </p>

                    {/* Interactive Chips within Category */}
                    <div className="flex flex-wrap gap-2">
                      {skillsInCat.map((skill) => (
                        <div
                          key={skill.id}
                          className="group/chip inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 shadow-sm hover:scale-105"
                        >
                          <span className="shrink-0 scale-110">
                            {skill.icon}
                          </span>
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Bottom Action */}
                  <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                    >
                      <span>Explore {cat.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono text-slate-400">
                      {skillsInCat.length} Skills
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Filtered / Single Category View with Enhanced UI Cards */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Showing {filteredSkills.length} Technologies
              </span>
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ← Show All Domains
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm"
                            style={{ 
                              backgroundColor: `${skill.color}15`,
                              borderColor: `${skill.color}30`
                            }}
                          >
                            {skill.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {skill.name}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              {skill.tag}
                            </span>
                          </div>
                        </div>

                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                          {skill.proficiency}%
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {skill.description}
                      </p>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 mb-3 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="font-semibold text-slate-800 dark:text-white">Use: </span>
                        {skill.practicalUse}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-slate-500 font-mono">
                        Tier: {skill.level}
                      </span>
                      <button
                        onClick={() => handleSelectSkillAction(skill.name)}
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>Related Projects</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Brain className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base mb-1">
              No technologies found matching "{searchQuery}"
            </h4>
            <p className="text-xs text-slate-500">Try searching for keywords like "React", "Python", "RAG", or "Figma".</p>
          </div>
        )}

      </div>
    </section>
  );
};
