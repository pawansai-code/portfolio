import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Rocket, Building2, Calendar, Award,
  Sparkles, Brain, Layers, ArrowRight, Zap, Radio,
  Compass, CheckCircle2, ChevronRight, Terminal,
  Send, Lightbulb
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'education'>('story');
  const [activeStepHover, setActiveStepHover] = useState<number | null>(null);

  // High-level visual dream flow stages
  const dreamFlowStages = [
    {
      id: 0,
      step: '01',
      title: '10th Grade IT Dream',
      subtitle: 'The Spark',
      icon: Sparkles,
      color: '#3b82f6',
    },
    {
      id: 1,
      step: '02',
      title: 'Python & ML Passion',
      subtitle: 'Weather AI & Algorithms',
      icon: Brain,
      color: '#06b6d4',
    },
    {
      id: 2,
      step: '03',
      title: 'Full Stack MERN',
      subtitle: 'Modern Web & Creative Arts',
      icon: Layers,
      color: '#8b5cf6',
    },
    {
      id: 3,
      step: '04',
      title: 'AI Systems & Future',
      subtitle: 'Open Collaborations',
      icon: Rocket,
      color: '#10b981',
    },
  ];

  // Who I Am Story Chapters mapped to personal narrative
  const whoAmIChapters = [
    {
      stage: 'Chapter 01',
      badge: 'The Spark & Dream',
      icon: Sparkles,
      accent: '#3b82f6',
      text: personalInfo.whoAmIParagraphs[0],
      highlightWord: 'dream of working in the IT field',
    },
    {
      stage: 'Chapter 02',
      badge: 'Machine Learning Roots',
      icon: Brain,
      accent: '#06b6d4',
      text: personalInfo.whoAmIParagraphs[1],
      highlightWord: 'Virtual Tech Services',
    },
    {
      stage: 'Chapter 03',
      badge: 'Full Stack & Creative Horizon',
      icon: Layers,
      accent: '#8b5cf6',
      text: personalInfo.whoAmIParagraphs[2],
      highlightWord: 'mastering the MERN stack',
    },
    {
      stage: 'Chapter 04',
      badge: 'Open for Collaborations',
      icon: Rocket,
      accent: '#10b981',
      text: personalInfo.whoAmIParagraphs[3],
      isCallout: true,
    },
  ];

  const timelineMilestones = [
    {
      step: '01',
      year: 'The Spark',
      stageLabel: 'Stage 01 • Origin',
      title: 'Igniting the Dream in 10th Grade',
      desc: 'Discovered an insatiable curiosity for how software shapes human lives. Committed early to pursuing Computer Science Engineering with a relentless ambition to engineer meaningful technology.',
      tag: 'IT Dream Origin',
      icon: Sparkles,
      accent: '#3b82f6',
      flowNote: 'Flowing from early childhood dream into academic pursuit',
    },
    {
      step: '02',
      year: 'College Entry',
      stageLabel: 'Stage 02 • ML Roots',
      title: 'Diving into Python & Machine Learning',
      desc: 'Explored computational algorithms, mathematics, and data science. Built early ML models and completed a 21-day internship at Virtual Tech Services applying algorithms to real-world weather classification.',
      tag: 'Machine Learning',
      icon: Brain,
      accent: '#06b6d4',
      flowNote: 'Algorithms and mathematical models translated to practical solutions',
    },
    {
      step: '03',
      year: 'Industry Internships',
      stageLabel: 'Stage 03 • Production Systems',
      title: 'Enterprise Generative AI & Full-Stack',
      desc: 'Engineered RAG pipelines and offline LLM implementations at OneIntegral Technologies, followed by high-scale production React/TypeScript development at SocialTek AI ML Business Solutions.',
      tag: 'Production Tech',
      icon: Layers,
      accent: '#8b5cf6',
      flowNote: 'Expanding capabilities into enterprise-grade software delivery',
    },
    {
      step: '04',
      year: 'Present & Ahead',
      stageLabel: 'Stage 04 • Horizon',
      title: 'Architecting Next-Gen Systems & Synergy',
      desc: 'Synthesizing deep AI/ML capabilities with fluid modern frontends, hackathon victories, and creative design sensibility. Primed for transformative engineering partnerships.',
      tag: 'Full-Stack AI',
      icon: Rocket,
      accent: '#10b981',
      flowNote: 'Continuing the dream into boundless future collaborations',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] transition-colors duration-300">
      {/* Dynamic atmospheric ambient glow */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-600/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold tracking-wider uppercase border border-blue-500/20 mb-4 shadow-sm">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-500" />
            <span>Narrative Journey & Aspirations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Turning Curiosity into <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Intelligent Systems</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            From an early 10th-grade dream to architecting production RAG pipelines, machine learning models, and modern full-stack web applications.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
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
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'story' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              
              {/* ======================================================== */}
              {/* THE DREAM FLOW RIBBON - Horizontal Animated Stream View */}
              {/* ======================================================== */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 backdrop-blur-xl shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center border border-cyan-500/20">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        The Dream Flow Stream
                      </h4>
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        Visual progression from initial 10th-grade ambition to production engineering
                      </p>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Continuous Evolution</span>
                  </span>
                </div>

                {/* Animated Horizontal Ribbon Stream */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {dreamFlowStages.map((stage, idx) => {
                    const StageIcon = stage.icon;
                    const isHovered = activeStepHover === idx;
                    return (
                      <div 
                        key={stage.id} 
                        className="relative flex items-center"
                        onMouseEnter={() => setActiveStepHover(idx)}
                        onMouseLeave={() => setActiveStepHover(null)}
                      >
                        {/* Stage Card */}
                        <motion.div
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className={`w-full p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden z-10 cursor-pointer ${
                            isHovered
                              ? 'bg-white dark:bg-slate-800 shadow-lg border-cyan-500/60'
                              : 'bg-white/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 shadow-sm'
                          }`}
                        >
                          {/* Colored top indicator */}
                          <div 
                            className="absolute top-0 left-0 right-0 h-1" 
                            style={{ backgroundColor: stage.color }} 
                          />

                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                              style={{ 
                                backgroundColor: `${stage.color}15`, 
                                borderColor: `${stage.color}35`,
                                color: stage.color 
                              }}
                            >
                              <StageIcon className="w-5 h-5" />
                            </div>

                            <div className="min-w-0">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block" style={{ color: stage.color }}>
                                {stage.step} • {stage.subtitle}
                              </span>
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                                {stage.title}
                              </h5>
                            </div>
                          </div>
                        </motion.div>

                        {/* Animated Laser Connector (desktop between steps) */}
                        {idx < dreamFlowStages.length - 1 && (
                          <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                            <ChevronRight className="w-4 h-4 text-cyan-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================== */}
              {/* MAIN DUAL STREAM: Who I Am Narrative + Dream Timeline   */}
              {/* ======================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Column: Who I Am Interactive Story Chapters (col-span-5) */}
                <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl relative overflow-hidden">
                  
                  {/* Subtle top glow bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

                  {/* Section Title */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 font-mono text-xs font-bold border border-blue-500/20 mb-2 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>Dream Journey Stream</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                        Who I Am
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center border border-cyan-500/20">
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Interconnected Flow Chapters */}
                  <div className="relative pl-6 space-y-6">
                    
                    {/* Vertical connecting flow line with traveling photon */}
                    <div className="absolute left-2.5 top-3 bottom-3 w-0.5 rounded-full bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-500 opacity-30 overflow-hidden">
                      <motion.div
                        animate={{ y: ['-100%', '250%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-16 bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#22d3ee]"
                      />
                    </div>

                    {whoAmIChapters.map((chapter, idx) => {
                      const ChapterIcon = chapter.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          whileHover={{ x: 3 }}
                          className={`relative group rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                            chapter.isCallout
                              ? 'bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-blue-500/10 border-emerald-500/30 dark:border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                              : 'bg-white/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:border-cyan-500/40 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {/* Node Bullet on the left line */}
                          <div 
                            className="absolute -left-[27px] top-6 w-3.5 h-3.5 rounded-full border-2 bg-white dark:bg-slate-950 transition-transform duration-200 group-hover:scale-125"
                            style={{ borderColor: chapter.accent }}
                          />

                          {/* Chapter Header */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span 
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border"
                              style={{ 
                                backgroundColor: `${chapter.accent}15`, 
                                borderColor: `${chapter.accent}30`,
                                color: chapter.accent 
                              }}
                            >
                              <ChapterIcon className="w-3 h-3" />
                              <span>{chapter.badge}</span>
                            </span>

                            <span className="text-[10px] font-mono text-slate-400">
                              {chapter.stage}
                            </span>
                          </div>

                          {/* Chapter Text */}
                          <p className={`text-xs sm:text-sm leading-relaxed ${
                            chapter.isCallout 
                              ? 'font-medium text-slate-800 dark:text-slate-100' 
                              : 'text-slate-600 dark:text-slate-300'
                          }`}>
                            {chapter.text}
                          </p>

                          {/* Action Button for the final Collaboration callout */}
                          {chapter.isCallout && (
                            <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                Let's build together
                              </span>
                              <a
                                href="#contact"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-semibold transition-all hover:scale-105"
                              >
                                <span>Get in Touch</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}

                  </div>
                </div>

                {/* Right Column: Timeline Cards with Flowing Current Spine (col-span-7) */}
                <div className="lg:col-span-7 relative">
                  
                  {/* Flow Spine (Connecting Track) */}
                  <div className="absolute left-6 sm:left-8 top-4 bottom-4 w-1 rounded-full bg-slate-200 dark:bg-slate-800/80 overflow-hidden">
                    {/* Continuous Travelling Energy Pulse */}
                    <motion.div
                      animate={{ y: ['-100%', '300%'] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                      className="w-full h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#22d3ee]"
                    />
                  </div>

                  {/* Milestone Cards Stream */}
                  <div className="space-y-6">
                    {timelineMilestones.map((m, idx) => {
                      const MilestoneIcon = m.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: idx * 0.12 }}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="relative pl-14 sm:pl-16 group cursor-default"
                        >
                          {/* Animated Timeline Node with Concentric Ping */}
                          <div className="absolute left-4 sm:left-6 top-5 -translate-x-1/2 flex items-center justify-center">
                            {/* Ping ring */}
                            <span 
                              className="absolute w-7 h-7 rounded-full opacity-30 animate-ping"
                              style={{ backgroundColor: m.accent }}
                            />
                            {/* Node Disc */}
                            <div 
                              className="relative w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-2 transition-transform duration-300 group-hover:scale-125 shadow-md flex items-center justify-center"
                              style={{ borderColor: m.accent }}
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full" 
                                style={{ backgroundColor: m.accent }} 
                              />
                            </div>
                          </div>

                          {/* Milestone Card Body */}
                          <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden">
                            
                            {/* Subtle colored accent top border */}
                            <div 
                              className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-75 group-hover:opacity-100"
                              style={{ backgroundColor: m.accent }}
                            />

                            {/* Header Row */}
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span 
                                  className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
                                  style={{ 
                                    backgroundColor: `${m.accent}15`, 
                                    borderColor: `${m.accent}30`,
                                    color: m.accent 
                                  }}
                                >
                                  {m.stageLabel}
                                </span>
                                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                                  {m.year}
                                </span>
                              </div>

                              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60">
                                {m.tag}
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                              <span>{m.title}</span>
                            </h4>

                            {/* Description */}
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                              {m.desc}
                            </p>

                            {/* Flow Connection Note */}
                            <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              <Zap className="w-3 h-3 text-cyan-500 shrink-0 animate-pulse" />
                              <span>{m.flowNote}</span>
                            </div>

                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

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
