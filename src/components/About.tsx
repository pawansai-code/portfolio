import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Lightbulb, Rocket,
  Brain, Code2, Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'philosophy' | 'education'>('story');

  const timelineMilestones = [
    {
      year: "The Spark",
      title: "Igniting the Dream in 10th Grade",
      desc: "Discovered an insatiable curiosity for how software shapes human lives. Committed early to pursuing Computer Science Engineering.",
      tag: "Foundations",
    },
    {
      year: "College Entry",
      title: "Diving into Python & Machine Learning",
      desc: "Explored computational algorithms, mathematics, and data science. Built early ML models and completed a 21-day internship at Virtual Tech Services applying algorithms to weather classification.",
      tag: "Machine Learning",
    },
    {
      year: "Industry Internships",
      title: "Enterprise Generative AI & Full-Stack",
      desc: "Engineered RAG pipelines and offline LLM implementations at OneIntegral Technologies, followed by high-scale production React/TypeScript development at SocialTek.",
      tag: "Production Tech",
    },
    {
      year: "Present & Ahead",
      title: "Architecting Next-Gen Systems",
      desc: "Synthesizing deep AI/ML capabilities with fluid modern frontends, hackathon victories, and creative design sensibility.",
      tag: "Full-Stack AI",
    },
  ];

  const philosophies = [
    {
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      title: "Intelligence Built In, Not Bolted On",
      desc: "AI is at its best when seamlessly woven into the product fabric — through sub-second RAG, private local LLMs, and intuitive citation streams.",
    },
    {
      icon: <Code2 className="w-5 h-5 text-sky-400" />,
      title: "Strict Engineering Rigor",
      desc: "Clean modular TypeScript, deterministic state machines with Redux, and accessible UI components designed to scale effortlessly.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      title: "Dual-Brain: Engineering + Artistry",
      desc: "As an active artist, I blend algorithmic discipline with spatial balance, micro-interactions, and visual harmony.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#090d16]">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            About My Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#b8d9ff] tracking-tight mb-4">
            Turning Curiosity into <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Intelligent Systems</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A developer who bridges the gap between complex machine learning pipelines and intuitive, polished user experiences.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'story'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>My Story & Milestones</span>
            </button>

            <button
              onClick={() => setActiveTab('philosophy')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'philosophy'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Core Philosophy</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'education'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education & Foundations</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'story' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              {/* Narrative Bio */}
              <div className="lg:col-span-5 p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  Who I Am
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                  {personalInfo.extendedBio}
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                  Whether formulating vector search architectures with Pinecone and Ollama, or crafting responsive web dashboards with React and Tailwind CSS, I approach every engineering problem with deep curiosity and high standards for craftsmanship.
                </p>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-mono text-slate-500 uppercase">Current Focus</span>
                    <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                      Production RAG & Next-Gen Frontends
                    </span>
                  </div>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>View Work</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Timeline Cards */}
              <div className="lg:col-span-7 relative">
                <div className="absolute left-6 sm:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-cyan-500 opacity-30" />
                
                <div className="space-y-6">
                  {timelineMilestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="relative pl-14 sm:pl-16 group"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-4 sm:left-6 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-500 group-hover:scale-125 group-hover:border-indigo-400 transition-all shadow-md shadow-blue-500/20" />

                      <div className="p-5 sm:p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all backdrop-blur-md shadow-sm hover:shadow-md">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                            {m.year}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                            {m.tag}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                          {m.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'philosophy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {philosophies.map((p, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-lg flex flex-col justify-between hover:border-blue-500/30 transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 shadow-sm border border-slate-200 dark:border-slate-700/60">
                      {p.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Applied in all projects</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {personalInfo.education.degree}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Focus: {personalInfo.education.focus}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold border border-blue-500/20">
                  Present Student
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    Core Coursework
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Data Structures & Algorithms, Object-Oriented Software Design, Database Management Systems (RDBMS), Operating Systems, Computer Networks, Machine Learning & Neural Networks.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Academic Honors & Activities
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Represented college at multiple state-level hackathons; secured 2nd place at RIT API Fusion competition; organized hands-on Figma UI/UX workshop for 50+ junior peers.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
