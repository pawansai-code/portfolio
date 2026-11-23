import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Award, BookOpen, Wrench, ShieldCheck, 
  CheckCircle2, Code2, Lock
} from 'lucide-react';

export const EduverseSpotlight: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      id: "ai-assistant",
      title: "Private AI Academic Assistant",
      subtitle: "Meta LLaMA 3.3-70B via Groq LPU",
      icon: <Bot className="w-5 h-5 text-cyan-400" />,
      badge: "Sub-200ms TTFT",
      summary: "An enterprise-grade conversational tutor that provides 24/7 contextual homework guidance without ever exposing private API keys to the browser.",
      bullets: [
        "Server-Side Proxy Architecture: Groq AI SDK is isolated inside an Express.js backend microservice.",
        "Zero API Key Exposure: Client browsers never touch credentials, satisfying enterprise security criteria.",
        "System Prompt Guardrails: Guided persona encourages critical thinking and refuses to write entire exam submissions.",
        "Real-Time Markdown & Streaming: Syntax-highlighted code explanations and math formulas delivered at instant LPU speeds."
      ],
      metrics: {
        latency: "< 200ms",
        model: "LLaMA 3.3-70B Versatile",
        proxy: "Node / Express"
      }
    },
    {
      id: "gamification",
      title: "Gamified Cognition Engine",
      subtitle: "Chess.js + react-chessboard + XP Loop",
      icon: <Award className="w-5 h-5 text-amber-400" />,
      badge: "Scientifically Proven Cognition",
      summary: "Blends intellectual play with academic habits. Chess victories, puzzle completions, and daily streaks directly feed an Achievements and XP flywheel.",
      bullets: [
        "Client-Side Move Validation: Full rules engine powered by chess.js with SAN notation parsing and illegal move rejection.",
        "Versatile Match Modes: Pass-and-play hot seat mode, algorithmic computer opponent, and tactical puzzles.",
        "XP Progression System: Dynamic ranks that unlock platform customization badges as students level up.",
        "Firestore Game Logging: Persistent W/L/D ratios and win streak tracking."
      ],
      metrics: {
        engine: "chess.js",
        interface: "react-chessboard",
        sync: "Firebase Firestore"
      }
    },
    {
      id: "tools-hub",
      title: "Extensible Tools Hub Registry",
      subtitle: "Plugin-Style Architecture",
      icon: <Wrench className="w-5 h-5 text-blue-400" />,
      badge: "Zero-Routing Manifest",
      summary: "A unified portal containing scientific calculators, conversion utilities, and writing aides without requiring routing refactors to register new tools.",
      bullets: [
        "Plugin Registry: Each tool is registered in a central tools-manifest.js specification.",
        "Code-Split & Lazy Loaded: Utilizes React.lazy + Suspense to load tools on-demand, preserving initial bundle speed.",
        "Fuzzy Search & Filtering: Category-based filtering (Mathematics, Writing, Science, Productivity) with instant search.",
        "Bookmark Persistence: Students favorite their top tools to pin on their personalized dashboard."
      ],
      metrics: {
        architecture: "Manifest-Driven",
        codeSplitting: "React.lazy",
        categories: "5 Academic Domains"
      }
    },
    {
      id: "journal-hub",
      title: "Encrypted Journal & Habit Streaks",
      subtitle: "Private Reflection & Daily Flywheel",
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
      badge: "Encrypted Data Isolation",
      summary: "A student diary engineered with strict user-level Firestore Security rules. Daily writing streaks incentivize consistent reflection.",
      bullets: [
        "Data Isolation by Design: Explicit Firestore security deny for any uid !== author uid. Even administrators cannot view student journals.",
        "Streak Milestone Engine: Automatic streak triggers for 3, 7, 14, and 30 consecutive days unlock exclusive platform rewards.",
        "Soft-Delete Trash Can: 7-day recoverable safety net for accidental note deletion.",
        "Rich Formatting: Lightweight distraction-free Markdown editor."
      ],
      metrics: {
        isolation: "Strict uid Deny",
        retention: "7-Day Soft Delete",
        gamification: "Milestone Triggers"
      }
    },
    {
      id: "dual-dashboard",
      title: "Role-Aware Dual Dashboards",
      subtitle: "Firebase Auth + Redux RBAC",
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      badge: "Enterprise RBAC",
      summary: "Two entirely divergent user interfaces governed by a single authentication gate. Students get focus tools; admins get platform-wide analytics.",
      bullets: [
        "RBAC Route Guards: React Router PrivateRoute and AdminRoute components enforce access before rendering.",
        "Admin KPI Center: Real-time DAU/MAU counters, module engagement histograms, and user verification tables.",
        "Broadcast Engine: Platform-wide instant announcements pushed to active student sessions.",
        "Session Persistence: Redux Toolkit rehydrates from Firebase onAuthStateChanged across refreshes."
      ],
      metrics: {
        roles: "Student & Admin",
        auth: "Firebase OAuth + Email",
        guard: "React Router v7 Guards"
      }
    }
  ];

  return (
    <section id="eduverse" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0d1424] to-slate-950 text-white border-y border-slate-800">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3 border border-cyan-500/20">
            System Design & PRD Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Eduverse: <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Centralized Academic Hub</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A complete product blueprint engineered to unify AI tutoring, cognitive gamification, and student utilities into an engagement flywheel.
          </p>
        </div>

        {/* Interactive Pillar Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-10">
          {pillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(idx)}
              className={`p-3.5 rounded-2xl flex flex-col items-center text-center transition-all duration-300 border ${
                activeTab === idx
                  ? 'bg-blue-600/20 border-cyan-400/80 shadow-lg shadow-cyan-500/15 text-white scale-[1.02]'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-900/80 mb-2 shadow-inner">
                {pillar.icon}
              </div>
              <span className="text-xs font-bold line-clamp-1">{pillar.title}</span>
              <span className="text-[10px] font-mono text-cyan-400 mt-0.5">{pillar.badge}</span>
            </button>
          ))}
        </div>

        {/* Selected Pillar Detailed View */}
        <div className="rounded-3xl p-1 bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40 shadow-2xl">
          <div className="rounded-[22px] bg-slate-900/90 p-6 sm:p-10 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Deep Architectural Breakdown */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      PILLAR 0{activeTab + 1}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {pillars[activeTab].subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    {pillars[activeTab].title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {pillars[activeTab].summary}
                  </p>

                  <div className="space-y-3 mb-8">
                    {pillars[activeTab].bullets.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-4 border-t border-slate-800">
                    <Lock className="w-4 h-4 text-cyan-400" />
                    <span>Engineered from Pawansai's Eduverse PRD Specification</span>
                  </div>
                </div>

                {/* Right: Technical Spec Card */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                      <span className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        TECHNICAL SPECIFICATIONS
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        Production Ready
                      </span>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(pillars[activeTab].metrics).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-slate-900 text-xs">
                          <span className="text-slate-400 font-mono capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-cyan-300 font-mono font-semibold">{val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                      <span className="text-white font-semibold block mb-1">Architecture Philosophy:</span>
                      "Consolidating academic tools into one single sign-on platform eliminates tab-switching fatigue while gamification incentivizes daily learning habits."
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
