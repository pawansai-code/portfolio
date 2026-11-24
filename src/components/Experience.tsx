import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#090d16]">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            Professional Timeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#b8d9ff] tracking-tight mb-4">
            Industry Experience & <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Enterprise Roles</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Hands-on software delivery across enterprise generative AI deployments and production full-stack engineering.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl p-1 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800/40 hover:from-blue-500/40 hover:to-indigo-500/40 transition-all duration-500 shadow-lg"
            >
              <div className="rounded-[22px] bg-white dark:bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm border border-blue-500/20">
                      <Briefcase className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {exp.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
                        {exp.company}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Detailed Deliverables List */}
                <div className="py-6">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Key Deliverables & Technical Achievements
                  </h5>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2">Skills:</span>
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
