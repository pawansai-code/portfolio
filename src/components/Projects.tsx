import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Github, Play, ArrowRight,
  Layers, CheckCircle2,
  ChevronRight, Info
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { LightboxModal } from './LightboxModal';

interface ProjectsProps {
  initialFilter?: string | null;
}

export const Projects: React.FC<ProjectsProps> = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredProjects = projectsData;

  const featuredFlagship = projectsData.find(p => p.id === 'codelens');

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] transition-colors duration-300">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            Projects
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Things I've <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Built</span>
          </h2>
        </div>

        {/* Flagship Highlight Spotlight: CodeLens */}
        {featuredFlagship && (
          <div className="mb-16">
            <div className="relative rounded-3xl p-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-2xl shadow-blue-500/10">
              <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: CodeLens Narrative */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wide">
                          Flagship AI Architecture
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Hybrid RAG + Ollama
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                        {featuredFlagship.title}
                      </h3>
                      <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-4 font-mono">
                        {featuredFlagship.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {featuredFlagship.description}
                      </p>

                      {/* CodeLens Key Architecture Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {featuredFlagship.highlights.slice(0, 4).map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {featuredFlagship.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => setSelectedProject(featuredFlagship)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/25 transition-all"
                      >
                        <Info className="w-4 h-4" />
                        <span>Inspect Full Architecture</span>
                      </button>

                      {featuredFlagship.github && (
                        <a
                          href={featuredFlagship.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub Repo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Interactive Video/Visual Showcase */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <div 
                      onClick={() => setSelectedProject(featuredFlagship)}
                      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group cursor-pointer"
                    >
                      {/* Video Preview / Poster */}
                      {featuredFlagship.video ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                          {featuredFlagship.images[0] && (
                            <img
                              src={featuredFlagship.images[0]}
                              alt="CodeLens Preview"
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                            />
                          )}
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 ml-1 fill-white" />
                            </div>
                            <span className="text-xs font-mono font-semibold text-white bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md">
                              Watch RAG Pipeline Demo (Video)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={featuredFlagship.images[0]}
                          alt="CodeLens Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Screenshot thumbnails preview */}
                    <div className="grid grid-cols-3 gap-2 mt-3 w-full">
                      {featuredFlagship.images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setLightboxImage(img)}
                          className="aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden cursor-pointer"
              >
                {/* Image Banner */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {project.images && project.images[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-blue-900/20 to-indigo-900/20">
                      <Layers className="w-10 h-10 text-blue-500" />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-wider border border-white/10">
                    {project.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5 flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </h4>

                    <p className="text-xs text-blue-600 dark:text-blue-400 font-mono font-medium mb-3">
                      {project.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 4).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Footer link shortcuts */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium font-mono">
                        {project.role}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 group-hover:underline">
                        <span>Details & Gallery</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectImage={(img) => setLightboxImage(img)}
      />

      {/* Zoom Image Lightbox Modal */}
      <LightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

    </section>
  );
};
