import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, X } from 'lucide-react';
import { hackathons } from '../data/portfolioData';
import { Hackathon } from '../types';
import { LightboxModal } from './LightboxModal';

export const Hackathons: React.FC = () => {
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const getTrophyColor = (type: string) => {
    switch (type) {
      case 'runner-up':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'top5':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'finalist':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <section id="hackathons" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3 border border-amber-500/20">
            Competitive Triumphs
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Hackathons & <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">Engineering Contests</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Pushing boundaries under intense time constraints — building real-world solutions that win podium finishes.
          </p>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {hackathons.map((h, idx) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div 
                  className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                  onClick={() => setLightboxImg(h.image)}
                >
                  <img
                    src={h.image}
                    alt={h.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70" />

                  {/* Trophy Badge */}
                  <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border backdrop-blur-md ${getTrophyColor(h.achievementType)}`}>
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{h.achievement}</span>
                  </div>

                  {h.metrics && (
                    <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-mono border border-white/10">
                      {h.metrics}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                    <span>{h.host}</span>
                    <span>{h.date}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                    {h.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {h.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {h.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedHackathon(h)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all shadow-sm"
                >
                  <span>Read Hackathon Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Hackathon Deep Dive Modal */}
      <AnimatePresence>
        {selectedHackathon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHackathon(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedHackathon(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${getTrophyColor(selectedHackathon.achievementType)}`}>
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{selectedHackathon.achievement}</span>
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {selectedHackathon.date}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {selectedHackathon.title}
              </h3>
              <p className="text-sm font-semibold text-amber-500 mb-4 font-mono">
                Host: {selectedHackathon.host} | Role: {selectedHackathon.role}
              </p>

              <div 
                className="rounded-2xl overflow-hidden mb-6 aspect-video bg-slate-950 cursor-pointer"
                onClick={() => setLightboxImg(selectedHackathon.image)}
              >
                <img
                  src={selectedHackathon.image}
                  alt={selectedHackathon.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
                  The Challenge & Impact
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedHackathon.fullDetails}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedHackathon.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <LightboxModal
        image={lightboxImg}
        onClose={() => setLightboxImg(null)}
      />

    </section>
  );
};
