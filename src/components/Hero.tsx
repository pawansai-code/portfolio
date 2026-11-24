import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Download, Github, Linkedin, 
  Mail, Palette
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { triggerCelebration } from '../utils/confetti';

export const Hero: React.FC = () => {
  const roles = [
    "FullStack Developer",
    "Generative AI & RAG Engineer",
    "Creative Problem Solver",
    "UI/UX Enthusiast",
    "Tech Innovator"
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles.length]);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerCelebration();
    window.open(personalInfo.resume, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 35, rotateX: -60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      transition: { type: "spring" as const, damping: 14, stiffness: 200 } 
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#090d16]"
    >
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 grid-pattern opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Exactly Matching User Screenshot */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* "HEY! I'M" Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs sm:text-sm shadow-lg shadow-blue-500/40 mb-6 border border-white/10"
            >
              HEY! I'M
            </motion.div>

            {/* Name: PAWANSAI GOPI in 2 lines with prominent typography */}
            <motion.h1
              className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-[#b8d9ff] leading-[1.08] mb-4 select-none"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="block">
                {"PAWANSAI".split("").map((char, index) => (
                  <motion.span
                    key={`p-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="block">
                {"GOPI".split("").map((char, index) => (
                  <motion.span
                    key={`g-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            {/* Dynamic Rotating Subtitle */}
            <div className="h-9 sm:h-11 flex items-center mb-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl sm:text-2xl font-bold font-sans text-blue-500 dark:text-blue-400 tracking-wide"
                >
                  {roles[roleIndex]}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Intro Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8"
            >
              I build exceptional digital experiences. Combining deep technical expertise with a sharp eye for design, I craft modern, responsive, and performant web applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Contact Me</span>
              </a>

              <button
                onClick={handleResumeClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Resume PDF</span>
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-3 pt-4 border-t border-slate-800/80 w-full"
            >
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2">
                Socials:
              </span>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700/60"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-600 text-slate-300 hover:text-white transition-all border border-slate-700/60"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.socials.artGallery}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-600 text-slate-300 hover:text-white transition-all border border-slate-700/60 flex items-center gap-1.5 text-xs font-medium"
                aria-label="Art Gallery"
              >
                <Palette className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">Art Gallery</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-slate-300 hover:text-white transition-all border border-slate-700/60"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column: Organic Morphing Blob Profile from Screenshot */}
          <motion.div
            className="lg:col-span-5 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, type: 'spring' }}
          >
            {/* 3D Wrapper & Glow Layer */}
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
              
              {/* Radial Blur Glow behind Blob */}
              <div className="absolute inset-0 w-[115%] h-[115%] -translate-x-[7.5%] -translate-y-[7.5%] rounded-full bg-gradient-to-tr from-blue-600/40 via-indigo-600/30 to-purple-600/20 blur-3xl pointer-events-none" />

              {/* Organic Morphing Blob Profile Image */}
              <motion.div
                className="relative w-full h-full overflow-hidden animate-smooth-blob shadow-2xl shadow-black/80 border-4 border-white/15 backdrop-blur-md"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <img
                  src={personalInfo.images.profile}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
