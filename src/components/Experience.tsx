import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Calendar, MapPin, CheckCircle2, 
  ChevronRight, ArrowDown, Sparkles, Building2
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const Experience: React.FC = () => {
  // Interactive active milestone tracker (null means show all in full flow)
  const [activeStage, setActiveStage] = useState<string | null>(null);

  // Smooth scroll / focus handler
  const handleSelectStage = (id: string) => {
    setActiveStage((prev) => (prev === id ? null : id));
    const targetElement = document.getElementById(`exp-${id}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      id="experience" 
      className="py-24 relative overflow-hidden bg-slate-50/70 dark:bg-[#070b14] transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold tracking-wider uppercase border border-blue-500/20 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Career Flow</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Experience <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Timeline & Flow</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Chronological engineering journey from most recent enterprise deployments to foundational ML research. Click any stage to focus.
          </p>
        </div>

        {/* Interactive Flow Pipeline Navigation Track */}
        <div className="max-w-3xl mx-auto mb-16 p-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-md">
          <div className="grid grid-cols-3 gap-2">
            {experiences.map((exp, index) => {
              const isSelected = activeStage === exp.id;
              const stepNumber = `0${index + 1}`;
              const shortName = exp.id === 'socialtek' 
                ? 'SocialTek (Latest)' 
                : exp.id === 'oneintegral' 
                ? 'OneIntegral (AI & RAG)' 
                : 'Virtual Tech (ML)';

              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelectStage(exp.id)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 text-center
                    ${isSelected 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300'}`}
                >
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5
                    ${isSelected ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'}`}>
                    Step {stepNumber} {index === 0 ? '• Recent' : ''}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold truncate max-w-full">
                    {shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Flow Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Connecting Flow Line (desktop/tablet) */}
          <div className="hidden md:block absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-blue-500 via-sky-400 to-indigo-500/30">
            {/* Animated Travelling Flow Packet */}
            <motion.div
              animate={{
                y: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-2.5 h-2.5 -left-1 absolute rounded-full bg-blue-400 shadow-[0_0_12px_#38bdf8]"
            />
          </div>

          {/* Chronological Flow Cards (Recent First) */}
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, index) => {
              const stepNumber = `0${index + 1}`;
              const isSelected = activeStage === exp.id;
              const isDimmed = activeStage !== null && !isSelected;

              return (
                <div 
                  key={exp.id}
                  id={`exp-${exp.id}`}
                  className="relative transition-all duration-500"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className={`relative md:pl-20 transition-all duration-300
                      ${isDimmed ? 'opacity-40 grayscale-[40%] scale-[0.98]' : 'opacity-100 scale-100'}`}
                  >
                    
                    {/* Node on Flow Line (Desktop) */}
                    <div className="hidden md:flex absolute left-4 top-8 -translate-x-1/2 w-9 h-9 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-md shadow-blue-500/20 items-center justify-center font-mono text-xs font-black text-blue-600 dark:text-blue-400 z-20">
                      {stepNumber}
                    </div>

                    {/* Milestone Card */}
                    <div 
                      onClick={() => handleSelectStage(exp.id)}
                      className={`cursor-pointer rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 border
                        ${isSelected 
                          ? 'bg-white dark:bg-slate-900/95 border-blue-500 shadow-2xl shadow-blue-500/15 ring-2 ring-blue-500/30' 
                          : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 hover:border-blue-400/60 dark:hover:border-blue-500/50 shadow-lg'}`}
                    >
                      {/* Flow Step & Role Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-sm">
                            <Briefcase className="w-6 h-6" />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                {exp.badge}
                              </span>
                              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                {exp.type}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                              {exp.role}
                            </h3>

                            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                              <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
                              <span>{exp.company}</span>
                            </div>
                          </div>
                        </div>

                        {/* Duration & Location Metadata */}
                        <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                          <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            {exp.duration}
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Technical Deliverables & Achievements */}
                      <div className="py-6">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                          Key Deliverables & Technical Achievements
                        </h4>

                        <ul className="space-y-3">
                          {exp.description.map((item, i) => (
                            <li 
                              key={i} 
                              className="group/item flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200 hover:text-slate-900 dark:hover:text-white"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 transition-transform duration-200 group-hover/item:scale-125" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Associated Skills Stack */}
                      <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400 mr-1 uppercase">
                          Tech Stack:
                        </span>
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500 hover:text-blue-500 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Downward Flow Indicator for sequential steps */}
                      {index < experiences.length - 1 && (
                        <div className="mt-6 pt-4 border-t border-dashed border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                            Next milestone in flow
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            {experiences[index + 1].company}
                          </span>
                        </div>
                      )}

                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
