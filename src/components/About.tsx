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
      period: "10th Grade",
      tag: "Foundations",
      title: "The IT Dream & Early Foundations",
      desc: "Sparked a clear direction toward computer science in 10th grade, building early programming fundamentals and committing to a B.E. in Computer Science Engineering.",
    },
    {
      period: "College Entry",
      tag: "ML & Python",
      title: "Python & Weather Classification ML",
      desc: "Mastered Python and machine learning algorithms. Completed a 21-day internship at Virtual Tech Services, developing a practical Weather Classification model.",
    },
    {
      period: "Industry Internships",
      tag: "Enterprise AI & Web",
      title: "Generative AI & Production Web Engineering",
      desc: "Built enterprise RAG workflows with LangChain, Pinecone, and Ollama at OneIntegral; engineered production React & Redux Toolkit web apps at SocialTek (earning a ₹5,000 stipend).",
    },
    {
      period: "Present & Ahead",
      tag: "Full-Stack & Drone R&D",
      title: "MERN Stack Expansion & Autonomous Drone Systems",
      desc: "Scaling into full-stack MERN engineering while keeping strong ML roots. Developing the NIDAR autonomous drone disaster response system alongside 3 hackathon wins.",
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
              <motion.div 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  Who I Am
                </h3>
                
                <div className="space-y-3.5 text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {personalInfo.whoAmIParagraphs.map((paragraph, idx) => (
                    <p 
                      key={idx}
                      className={idx === personalInfo.whoAmIParagraphs.length - 1 ? "font-semibold text-blue-600 dark:text-blue-400 pt-1" : ""}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Timeline Cards */}
              <div className="lg:col-span-7 relative">
                {/* Subtle animated flow spine */}
                <div className="absolute left-6 sm:left-8 top-4 bottom-4 w-0.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-full h-24 bg-gradient-to-b from-transparent via-blue-500 dark:via-cyan-400 to-transparent opacity-70"
                  />
                </div>
                
                <div className="space-y-5">
                  {timelineMilestones.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                      whileHover={{ y: -2 }}
                      className="relative pl-14 sm:pl-16 group cursor-default"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-4 sm:left-6 top-5 -translate-x-1/2 flex items-center justify-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-500 dark:border-cyan-400 transition-transform duration-300 group-hover:scale-125 shadow-sm shadow-blue-500/20" />
                      </div>

                      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-md">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-mono font-semibold text-blue-600 dark:text-cyan-400">
                            {m.period}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60">
                            {m.tag}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {m.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </motion.div>
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

                  {/* Degree & CGPA */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-slate-500 dark:text-slate-400">Degree & Academic Score</span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {personalInfo.education.degree}
                      </span>
                      {personalInfo.education.cgpa && (
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          CGPA: {personalInfo.education.cgpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pass Year & Location */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-slate-500 dark:text-slate-400">Period & Location</span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                        {personalInfo.education.passYear} {personalInfo.education.location && `• ${personalInfo.education.location}`}
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
