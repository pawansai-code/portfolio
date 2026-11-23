import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectImage: (img: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSelectImage }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-10 p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wide">
                {project.category}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-mono">
                Role: {project.role}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-medium mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 shadow-sm transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/25 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}
          </div>

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center"
                >
                  <span className="block text-base sm:text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                    {m.value}
                  </span>
                  <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Video Player if present (CodeLens demo) */}
          {project.video && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-black">
              <div className="p-2.5 bg-slate-900 text-white flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  CodeLens Live RAG Demonstration Video
                </span>
                <span className="text-slate-400">MP4 Walkthrough</span>
              </div>
              <video
                controls
                className="w-full max-h-[420px] object-contain bg-black"
                src={project.video}
                preload="metadata"
              >
                Your browser does not support video playback.
              </video>
            </div>
          )}

          {/* Detailed Narrative */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
              System Architecture & Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Breakdown if available */}
          {project.architecture && (
            <div className="mb-8 p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
              <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 font-mono mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                Pipeline Flow & Data Architecture
              </h4>
              <div className="space-y-2">
                {project.architecture.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono">
                    <span className="text-blue-500 font-bold shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Engineering Highlights */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Key Features & Engineering Highlights
            </h3>
            <ul className="space-y-2">
              {project.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                Project Gallery (Click to Zoom)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectImage(img)}
                    className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer group hover:shadow-md transition-all"
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2 py-1 rounded bg-black/70 text-white text-[11px] font-mono">
                        Zoom
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
