import React from 'react';
import { Palette, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const CreativeGallery: React.FC = () => {
  return (
    <section id="creative" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#090d16] transition-colors duration-300">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            Fine Arts & Visual Design
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Creative Dimension: <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Beyond Code</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Fine art isn't just a hobby — it sharpens spatial awareness, composition, and visual sensibility, making my frontend architectures intuitive and aesthetically balanced.
          </p>
        </div>

        {/* Gallery Showcase Card */}
        <div className="max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-2xl shadow-blue-500/10">
          <div className="rounded-[22px] bg-white dark:bg-slate-900/90 p-8 sm:p-12 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20">
                  <Palette className="w-7 h-7" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  Pawan's Online Art Gallery
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Explore my dedicated digital exhibition featuring pencil sketches, acrylics, concept portraits, and experimental visual art. Just as with code, every stroke requires patience, iteration, and attention to detail.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={personalInfo.socials.artGallery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all hover:-translate-y-0.5"
                  >
                    <span>Visit Live Art Gallery</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <span className="text-xs font-mono text-slate-400">
                    art-gallery-blond-five.vercel.app
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col items-center justify-center">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center w-full">
                  <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    Creative Heuristics
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Balance, proportion, and contrast learned on canvas translate directly into clean UI component hierarchies.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
