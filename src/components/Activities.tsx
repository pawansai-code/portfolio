import React from 'react';
import { motion } from 'framer-motion';
import { Radio, CheckCircle2, Cpu, Compass } from 'lucide-react';
import { activities } from '../data/portfolioData';
import { Drone3D } from './Drone3D';

export const Activities: React.FC = () => {
  return (
    <section 
      id="activities" 
      className="py-24 relative overflow-hidden bg-white dark:bg-[#070b14] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold tracking-wider uppercase border border-blue-500/20 mb-4 shadow-sm">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-500" />
            <span>Co-Curricular & Engineering Initiatives</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Key <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Activities & R&D</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Autonomous robotics research, mission-critical engineering initiatives, and multi-disciplinary systems integration.
          </p>
        </div>

        {/* 2-Column Showcase: Activities Details on Left, 3D Hovering Drone on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Activity R&D Card (col-span-7) */}
          <div className="lg:col-span-7 space-y-8 relative z-20 pointer-events-auto">
            {activities.map((act, idx) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-xl backdrop-blur-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative accent top border gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {act.category && (
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                          {act.category}
                        </span>
                      )}
                      {act.period && (
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {act.period}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                      {act.title}
                    </h3>

                    {act.subtitle && (
                      <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 font-mono">
                        {act.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-200/60 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700/60 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 shrink-0 self-start">
                    <Cpu className="w-4 h-4 text-cyan-500" />
                    <span>{act.role}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {act.description}
                </p>

                {/* Highlights */}
                <div className="mb-6 space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-3">
                    <Compass className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Key Contributions & Technical Scope</span>
                  </h4>
                  {act.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-2">
                  {act.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: 3D Hovering Drone Model (col-span-5) */}
          <div className="lg:col-span-5 w-full relative z-10 overflow-hidden">
            <Drone3D />
          </div>

        </div>

      </div>
    </section>
  );
};
