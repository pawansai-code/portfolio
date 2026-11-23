import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Download, Sparkles, Github, Linkedin, 
  Mail, Palette, Brain, Layers, CheckCircle,
  ChevronRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { triggerCelebration } from '../utils/confetti';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [useAvatar, setUseAvatar] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.subtitles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerCelebration();
    window.open(personalInfo.resume, '_blank');
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] sm:w-[800px] sm:h-[500px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-purple-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-2/3 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 blur-[110px] rounded-full" />
        <div className="absolute inset-0 grid-pattern dark:opacity-100 opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-300 shadow-sm backdrop-blur-md mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-600 dark:text-slate-400">Available for Work & Collaborations</span>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-600">|</span>
              <span className="hidden sm:inline font-mono text-[11px] text-blue-600 dark:text-blue-400">Chennai, IN</span>
            </motion.div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
              <span className="block text-2xl sm:text-3xl font-semibold text-slate-500 dark:text-slate-400 font-sans mb-1">
                Hi, I'm
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>

            {/* Dynamic Rotating Subtitle */}
            <div className="h-10 sm:h-12 flex items-center mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 text-lg sm:text-2xl font-bold font-mono text-slate-700 dark:text-slate-200"
                >
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{personalInfo.subtitles[roleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
              {personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleResumeClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4 text-blue-500" />
                <span>Resume PDF</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>Let's Talk</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links & Indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full">
              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Connect:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700/60"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-blue-600 transition-all border border-slate-200 dark:border-slate-700/60"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.socials.artGallery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-purple-600 transition-all border border-slate-200 dark:border-slate-700/60 flex items-center gap-1.5 text-xs font-medium"
                  aria-label="Art Gallery"
                >
                  <Palette className="w-4 h-4 text-purple-400" />
                  <span className="hidden sm:inline">Art Gallery</span>
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-emerald-600 transition-all border border-slate-200 dark:border-slate-700/60"
                  aria-label="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Profile & Tech Hologram */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Outer Glow Halo */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl pointer-events-none" />

            {/* Profile Card Container with 3D Border */}
            <div className="relative group w-full max-w-sm sm:max-w-md">
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-blue-500/30 via-indigo-500/20 to-purple-500/30 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border border-white/10 dark:border-slate-800">
                <div className="relative rounded-[22px] overflow-hidden bg-slate-100 dark:bg-slate-900/90 p-5">
                  
                  {/* Photo / 3D Avatar Display */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800/80 mb-4 group-hover:scale-[1.01] transition-transform duration-500">
                    <img
                      src={useAvatar ? personalInfo.images.avatar3d : personalInfo.images.profile}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center transition-all duration-500"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                    {/* Toggle button for Real vs 3D Avatar */}
                    <button
                      onClick={() => setUseAvatar(!useAvatar)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/20 transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>{useAvatar ? "Real Photo" : "3D Avatar"}</span>
                    </button>

                    {/* Badge: Full Stack + GenAI */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-blue-600/80 backdrop-blur-md text-white text-[11px] font-mono font-semibold tracking-wide">
                      CSE / AI SPECIALIST
                    </div>
                  </div>

                  {/* Profile Card Info */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {personalInfo.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {personalInfo.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Chips around Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="hidden sm:flex absolute -top-4 -left-6 items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Brain className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 font-mono">RAG & GenAI</span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400">AST + Pinecone</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                className="hidden sm:flex absolute -bottom-4 -right-4 items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 font-mono">Full-Stack</span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400">React 19 + TS</span>
                </div>
              </motion.div>
            </div>

            {/* Quick Stat Bar below profile */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 w-full max-w-sm sm:max-w-md">
              {personalInfo.stats.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-center shadow-sm"
                >
                  <span className="block text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                    {s.value}
                  </span>
                  <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
