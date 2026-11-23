import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { workshops } from '../data/portfolioData';
import { LightboxModal } from './LightboxModal';

export const Workshops: React.FC = () => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section id="workshops" className="py-24 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3 border border-purple-500/20">
            Community & Leadership
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Workshops & <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">Knowledge Sharing</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Mentoring junior engineers, conducting design sessions, and staying at the cutting edge of modern frontend conferences.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {workshops.map((w, idx) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div 
                  className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                  onClick={() => setLightboxImg(w.image)}
                >
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-600/90 text-white backdrop-blur-md shadow-sm">
                    {w.type === 'Conducted' ? 'Instructor & Speaker' : 'Active Participant'}
                  </div>

                  <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span>{w.audience}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                    <span>{w.role}</span>
                    <span>{w.date}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">
                    {w.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {w.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2.5">
                    {w.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => setLightboxImg(w.image)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all shadow-sm"
                >
                  <span>View Event Photographs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <LightboxModal
        image={lightboxImg}
        onClose={() => setLightboxImg(null)}
      />

    </section>
  );
};
