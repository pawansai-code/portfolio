import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Rocket, Building2, Calendar, Award
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'education'>('story');

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

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            About My Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Turning Curiosity into <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Intelligent Systems</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A developer who bridges the gap between complex machine learning pipelines and intuitive, polished user experiences.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'story'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>My Story & Milestones</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'education'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
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
              <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  Who I Am
                </h3>
                
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {personalInfo.whoAmIParagraphs.map((paragraph, idx) => (
                    <p 
                      key={idx}
                      className={idx === personalInfo.whoAmIParagraphs.length - 1 ? "font-semibold text-blue-600 dark:text-blue-400 pt-1" : ""}
                    >
                      {paragraph}
                    </p>
                  ))}
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

                      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all backdrop-blur-md shadow-sm hover:shadow-md">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                            {m.year}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60">
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

          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                      Academic Background
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Education
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* College Name */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-slate-500 dark:text-slate-400">College</span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {personalInfo.education.college}
                      </span>
                    </div>
                  </div>

                  {/* Degree */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-slate-500 dark:text-slate-400">Degree</span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {personalInfo.education.degree}
                      </span>
                    </div>
                  </div>

                  {/* Pass Year */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-slate-500 dark:text-slate-400">Pass Year</span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                        {personalInfo.education.passYear}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
