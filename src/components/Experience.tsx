import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, Calendar, MapPin, CheckCircle2, 
  ArrowDown, Sparkles, Building2, Zap, Radio,
  Cpu, Layers, Code2
} from 'lucide-react';
import { experiences } from '../data/portfolioData';
import { ThreeExperienceFlow } from './ThreeExperienceFlow';

// Interactive 3D Tilt Card Component for Experience Milestone
const InteractiveExperienceCard: React.FC<{
  exp: typeof experiences[0];
  index: number;
  stepNumber: string;
}> = ({ exp, index, stepNumber }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isOneIntegral = exp.id === 'oneintegral';
  const brandAccent = isOneIntegral ? '#06b6d4' : '#3b82f6';
  const brandSecondary = isOneIntegral ? '#8b5cf6' : '#60a5fa';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * 8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotX(rX);
    setRotY(rY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.16,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
        transition: 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)',
      }}
      className="relative rounded-3xl p-6 sm:p-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/60 dark:hover:border-blue-500/60 shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-xl overflow-hidden group select-none"
    >
      {/* Specular glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}), transparent 65%)`,
        }}
      />

      {/* Brand Color Ambient Glow on Hover */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${brandAccent}30 0%, transparent 70%)`,
        }}
      />

      {/* Flow Step & Role Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80 relative z-10">
        <div className="flex items-start gap-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${brandAccent}15`,
              color: brandAccent,
              borderColor: `${brandAccent}35`,
            }}
          >
            {isOneIntegral ? <Cpu className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                style={{
                  backgroundColor: `${brandAccent}15`,
                  color: brandAccent,
                  borderColor: `${brandAccent}30`,
                }}
              >
                {exp.badge}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {exp.type}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-500 dark:group-hover:text-blue-400 transition-colors">
              {exp.role}
            </h3>

            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
              <Building2 className="w-4 h-4 shrink-0" style={{ color: brandAccent }} />
              <span>{exp.company}</span>
            </div>
          </div>
        </div>

        {/* Duration & Location Metadata */}
        <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
            <Calendar className="w-3.5 h-3.5" style={{ color: brandAccent }} />
            {exp.duration}
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {exp.location}
          </span>
        </div>
      </div>

      {/* Technical Deliverables & Achievements */}
      <div className="py-6 relative z-10">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" style={{ color: brandAccent }} />
          <span>Key Deliverables & Technical Achievements</span>
        </h4>

        <ul className="space-y-3">
          {exp.description.map((item, i) => (
            <li 
              key={i} 
              className="group/item flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200 hover:text-slate-900 dark:hover:text-white"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 transition-transform duration-200 group-hover/item:scale-125" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Associated Skills Stack */}
      <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2 relative z-10">
        <span className="text-xs font-mono font-bold text-slate-400 mr-1 uppercase">
          Tech Stack:
        </span>
        {exp.skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 hover:border-cyan-500 hover:text-cyan-500 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Animated Downward Flow Connector to Next Stage */}
      {index === 0 && (
        <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
            <span>Flowing to next production milestone</span>
          </div>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            SocialTek AI & ML (10/2025 – 03/2026)
          </span>
        </div>
      )}
    </div>
  );
};

export const Experience: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="py-24 relative overflow-hidden bg-slate-50/70 dark:bg-[#070b14] transition-colors duration-300"
    >
      {/* Three.js Interactive 3D Fluid Quantum Wave Mesh */}
      <ThreeExperienceFlow />

      {/* Dynamic atmospheric flow glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold tracking-wider uppercase border border-blue-500/20 mb-4 shadow-sm">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-500" />
            <span>Interactive 3D Engineering Flow</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Experience <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 dark:from-cyan-300 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Timeline & Flow</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Hands-on delivery spanning Enterprise Generative AI & RAG pipelines and modern production full-stack engineering.
          </p>
        </div>

        {/* Interactive Flow Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Animated Connecting Flow Line (desktop/tablet) */}
          <div className="hidden md:block absolute left-8 top-10 bottom-10 w-1 rounded-full bg-slate-200 dark:bg-slate-800/60 overflow-hidden">
            {/* Travelling energetic current pulse */}
            <motion.div
              animate={{
                y: ['-100%', '200%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-full h-44 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#06b6d4]"
            />
          </div>

          {/* Chronological Flow Cards (OneIntegral First, SocialTek Second) */}
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, index) => {
              const stepNumber = `0${index + 1}`;
              const isOneIntegral = exp.id === 'oneintegral';

              return (
                <div 
                  key={exp.id}
                  id={`exp-${exp.id}`}
                  className="relative transition-all duration-500"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative md:pl-20 transition-all duration-300"
                  >
                    
                    {/* Animated Pulsing Radar Node on Flow Line (Desktop) */}
                    <div className="hidden md:flex absolute left-4 top-8 -translate-x-1/2 items-center justify-center z-20">
                      {/* Radiating beacon pulse */}
                      <motion.div
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.7,
                        }}
                        className={`absolute w-10 h-10 rounded-full
                          ${isOneIntegral ? 'bg-cyan-500/25' : 'bg-blue-500/25'}`}
                      />

                      <div className={`w-9 h-9 rounded-full bg-white dark:bg-slate-900 border-2 shadow-lg flex items-center justify-center font-mono text-xs font-black transition-all duration-300
                        ${isOneIntegral 
                          ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-cyan-500/30' 
                          : 'border-blue-500 text-blue-600 dark:text-blue-400 shadow-blue-500/30'}`}>
                        {stepNumber}
                      </div>
                    </div>

                    {/* Interactive 3D Perspective Tilt Card */}
                    <InteractiveExperienceCard 
                      exp={exp} 
                      index={index} 
                      stepNumber={stepNumber} 
                    />

                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
