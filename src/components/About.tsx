import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Rocket, Building2, Calendar, Award,
  Sparkles, MapPin, Briefcase, ArrowRight, CheckCircle2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { AboutAvatar3D } from './AboutAvatar3D';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'education'>('story');

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] transition-colors duration-300">
      {/* Background decoration glows */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            About My Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Curious About How <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Things Work</span>
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
              <Rocket className="w-4 h-4 text-cyan-500" />
              <span>About Me</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'education'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-indigo-400" />
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Prominent, Visible "Who I Am" Narrative (col-span-7) */}
              <motion.div 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="lg:col-span-7 p-8 sm:p-10 lg:p-12 rounded-3xl bg-slate-50/90 dark:bg-slate-900/75 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-xl shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

                {/* Header with pill and title */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 font-mono text-xs font-bold border border-blue-500/20 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Personal Story & Ambition</span>
                  </div>

                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                    B.E. CSE • 2023 – 2027
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse" />
                  <span>Who I Am</span>
                </h3>
                
                {/* Story Paragraphs - Bigger, Highly Visible & Readable */}
                <div className="space-y-4 text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base lg:text-[17px]">
                  <p>
                    {personalInfo.whoAmIParagraphs[0]}
                  </p>
                  <p>
                    {personalInfo.whoAmIParagraphs[1]}
                  </p>
                  <p>
                    {personalInfo.whoAmIParagraphs[2]}
                  </p>
                </div>

                {/* Final Callout Card */}
                {personalInfo.whoAmIParagraphs[3] && (
                  <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-indigo-500/10 border border-blue-500/30 dark:border-cyan-500/30 shadow-md">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1.5">
                      <Rocket className="w-4 h-4 text-cyan-400" />
                      <span>The Horizon</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                      "{personalInfo.whoAmIParagraphs[3]}"
                    </p>
                  </div>
                )}

                {/* Quick Info Footer Bar */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{personalInfo.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                      <span>Full-Stack & ML</span>
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>Let's Connect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Right Column: 3D GLB Model Standing & Wavering Hands (col-span-5) */}
              <div className="lg:col-span-5 w-full">
                <AboutAvatar3D />
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
                      Education & Accreditations
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
