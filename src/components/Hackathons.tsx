import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, X, Calendar, MapPin, Award } from 'lucide-react';
import { hackathons } from '../data/portfolioData';
import { Hackathon } from '../types';
import { LightboxModal } from './LightboxModal';

export const Hackathons: React.FC = () => {
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section id="hackathons" className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] border-y border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            Competitive Triumphs
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Hackathons & <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Engineering Contests</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Pushing boundaries under intense time constraints — building real-world solutions.
          </p>
        </div>

        {/* Hackathon Cards Grid with Complete Layout Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {hackathons.map((h, idx) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl bg-slate-50/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Photo Header: Full Visibility Without Obstructive Overlays */}
                <div 
                  className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setLightboxImg(h.image)}
                >
                  <img
                    src={h.image}
                    alt={h.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle top shade for badge contrast */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                  {/* Trophy Badge */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/90 text-white border border-blue-400/40 backdrop-blur-md shadow-md">
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>{h.achievement}</span>
                  </div>

                  {h.metrics && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] font-mono border border-white/10 shadow-sm">
                      {h.metrics}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Host & Date Meta */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2.5">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {h.host}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {h.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {h.title}
                  </h3>

                  {/* Role */}
                  <p className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-3">
                    Role: <span className="text-slate-700 dark:text-slate-300 font-semibold">{h.role}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {h.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {h.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer with 'Read Fully' Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedHackathon(h)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 transition-all shadow-sm group-hover:border-blue-500/30"
                >
                  <span>Read Fully</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedHackathon(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600 text-white shadow-sm">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span>{selectedHackathon.achievement}</span>
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {selectedHackathon.date}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                {selectedHackathon.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4 font-mono">
                Host: {selectedHackathon.host} • Role: {selectedHackathon.role}
              </p>

              <div 
                className="rounded-2xl overflow-hidden mb-6 aspect-video bg-slate-950 cursor-pointer shadow-md"
                onClick={() => setLightboxImg(selectedHackathon.image)}
              >
                <img
                  src={selectedHackathon.image}
                  alt={selectedHackathon.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  The Challenge & Impact
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedHackathon.fullDetails}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                {selectedHackathon.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
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
