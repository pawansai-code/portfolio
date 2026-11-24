import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, FileText } from 'lucide-react';
import { certifications } from '../data/portfolioData';
import { LightboxModal } from './LightboxModal';

export const Highlights: React.FC = () => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] border-y border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            Verified Credentials
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Professional <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Rigorous international and national university accreditations in full-stack architecture, Python, and data systems.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <Award className="w-6 h-6" />
                </div>

                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-2 border border-slate-200 dark:border-slate-700/60">
                  {cert.badgeText}
                </span>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
                  Issuer: {cert.issuer}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                {cert.image ? (
                  <button
                    onClick={() => setLightboxImg(cert.image!)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-blue-600/15 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors border border-blue-500/30 shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Credential PDF</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Academic Verified</span>
                  </div>
                )}
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
