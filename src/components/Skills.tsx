import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Code2, Database, Server, Terminal, 
  Palette, Cpu, Layers, Sparkles
} from 'lucide-react';
import { 
  FaPython, FaJava, FaReact, FaNodeJs, FaDatabase, 
  FaGitAlt, FaHtml5, FaBrain, FaFigma 
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiTailwindcss, SiDjango, 
  SiMongodb, SiPostgresql, SiPandas, SiNumpy, SiScikitlearn, 
  SiC, SiPytorch, SiExpo, SiRedux, SiFramer, SiPostman,
  SiFastapi, SiMysql, SiCplusplus, SiDocker, SiArduino
} from 'react-icons/si';
import confetti from 'canvas-confetti';
import { ThreeSkillBackground } from './ThreeSkillBackground';

interface SkillBadge {
  id: string;
  name: string;
  icon: React.ReactNode;
  brandColor: string;
}

interface SkillGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  accent: string;
  skills: SkillBadge[];
}

export interface SkillsProps {
  onSelectSkill?: (skillName: string) => void;
}

// Interactive Magnetic 3D Skill Pill Component
const MagneticSkillPill: React.FC<{ 
  skill: SkillBadge;
  onSelect?: (name: string) => void;
}> = ({ skill, onSelect }) => {
  const pillRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    const rotX = -((e.clientY - centerY) / (rect.height / 2)) * 10;
    const rotY = ((e.clientX - centerX) / (rect.width / 2)) * 10;

    setOffset({ x: deltaX, y: deltaY, rotX, rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0, rotX: 0, rotY: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 800);
    onSelect?.(skill.name);

    // Subtle micro-sparkle effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 16,
      spread: 45,
      startVelocity: 14,
      origin: { x, y },
      colors: [skill.brandColor, '#3b82f6', '#60a5fa', '#ffffff'],
      disableForReducedMotion: true,
      zIndex: 9999,
    });
  };

  return (
    <motion.div
      ref={pillRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{
        x: offset.x,
        y: offset.y,
        rotateX: offset.rotX,
        rotateY: offset.rotY,
        scale: isHovered ? 1.07 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="relative cursor-pointer select-none group"
    >
      {/* Brand Color Ambient Glow */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${skill.brandColor}55 0%, transparent 75%)`,
        }}
      />

      {/* Pill Body */}
      <div 
        className={`relative flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl 
          bg-white/85 dark:bg-slate-900/85 backdrop-blur-md 
          border transition-all duration-300 shadow-sm group-hover:shadow-lg
          ${clicked ? 'ring-2' : ''}`}
        style={{
          borderColor: isHovered ? `${skill.brandColor}80` : undefined,
          boxShadow: isHovered ? `0 10px 25px -5px ${skill.brandColor}35` : undefined,
        }}
      >
        {/* Brand Icon with ambient soft box */}
        <div 
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ 
            backgroundColor: `${skill.brandColor}18`,
            border: `1px solid ${skill.brandColor}35`
          }}
        >
          <div className="text-base sm:text-lg" style={{ color: skill.brandColor }}>
            {skill.icon}
          </div>
        </div>

        {/* Skill Name */}
        <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-[#b8d9ff] whitespace-nowrap">
          {skill.name}
        </span>

        {/* Active Dot */}
        <span 
          className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
          style={{ backgroundColor: skill.brandColor }}
        />
      </div>
    </motion.div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ onSelectSkill }) => {
  // Skill data organized cleanly without filter bar or clutter
  const skillGroups: SkillGroup[] = [
    {
      id: 'ai-ml',
      title: 'AI, ML & Generative Systems',
      icon: <Brain className="w-5 h-5" />,
      accent: '#8b5cf6',
      skills: [
        { id: 'rag', name: 'Generative AI & RAG', icon: <FaBrain />, brandColor: '#8b5cf6' },
        { id: 'pinecone', name: 'Pinecone Vector DB', icon: <FaDatabase />, brandColor: '#06b6d4' },
        { id: 'ollama', name: 'Ollama (Local LLMs)', icon: <Cpu />, brandColor: '#ec4899' },
        { id: 'python-ai', name: 'Python', icon: <FaPython />, brandColor: '#3b82f6' },
        { id: 'pytorch', name: 'PyTorch & Vision', icon: <SiPytorch />, brandColor: '#f97316' },
        { id: 'scikit', name: 'Scikit-Learn', icon: <SiScikitlearn />, brandColor: '#f59e0b' },
        { id: 'pandas', name: 'Pandas & NumPy', icon: <SiPandas />, brandColor: '#10b981' },
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend & Mobile Engineering',
      icon: <Code2 className="w-5 h-5" />,
      accent: '#3b82f6',
      skills: [
        { id: 'react', name: 'React 19 & React.js', icon: <FaReact />, brandColor: '#61dafb' },
        { id: 'typescript', name: 'TypeScript', icon: <SiTypescript />, brandColor: '#3178c6' },
        { id: 'react-native', name: 'React Native & Expo', icon: <SiExpo />, brandColor: '#00d8ff' },
        { id: 'tailwind', name: 'Tailwind CSS', icon: <SiTailwindcss />, brandColor: '#06b6d4' },
        { id: 'redux', name: 'Redux Toolkit', icon: <SiRedux />, brandColor: '#764abc' },
        { id: 'framer', name: 'Framer Motion', icon: <SiFramer />, brandColor: '#ff0055' },
        { id: 'html5', name: 'HTML5 & Modern CSS', icon: <FaHtml5 />, brandColor: '#e34f26' },
      ]
    },
    {
      id: 'backend',
      title: 'Backend & Database Architecture',
      icon: <Server className="w-5 h-5" />,
      accent: '#10b981',
      skills: [
        { id: 'nodejs', name: 'Node.js & Express', icon: <FaNodeJs />, brandColor: '#22c55e' },
        { id: 'django', name: 'Django & REST', icon: <SiDjango />, brandColor: '#092e20' },
        { id: 'fastapi', name: 'FastAPI', icon: <SiFastapi />, brandColor: '#009688' },
        { id: 'postgresql', name: 'PostgreSQL', icon: <SiPostgresql />, brandColor: '#4169e1' },
        { id: 'mongodb', name: 'MongoDB', icon: <SiMongodb />, brandColor: '#10b981' },
        { id: 'mysql', name: 'MySQL & SQL', icon: <SiMysql />, brandColor: '#0284c7' },
        { id: 'rest', name: 'RESTful Architecture', icon: <Layers />, brandColor: '#3b82f6' },
      ]
    },
    {
      id: 'languages-tools',
      title: 'Core Languages & Systems',
      icon: <Terminal className="w-5 h-5" />,
      accent: '#f59e0b',
      skills: [
        { id: 'python', name: 'Python', icon: <FaPython />, brandColor: '#3b82f6' },
        { id: 'javascript', name: 'JavaScript (ES6+)', icon: <SiJavascript />, brandColor: '#f7df1e' },
        { id: 'java', name: 'Java', icon: <FaJava />, brandColor: '#ed8b00' },
        { id: 'c-lang', name: 'C Programming', icon: <SiC />, brandColor: '#a8b9cc' },
        { id: 'cpp', name: 'C++', icon: <SiCplusplus />, brandColor: '#00599c' },
      ]
    },
    {
      id: 'design-devops',
      title: 'Design Systems & Developer Tools',
      icon: <Palette className="w-5 h-5" />,
      accent: '#ec4899',
      skills: [
        { id: 'figma', name: 'Figma', icon: <FaFigma />, brandColor: '#f24e1e' },
        { id: 'git', name: 'Git & GitHub', icon: <FaGitAlt />, brandColor: '#f05032' },
        { id: 'uiux', name: 'UI/UX Prototyping', icon: <Palette />, brandColor: '#8b5cf6' },
        { id: 'docker', name: 'Docker', icon: <SiDocker />, brandColor: '#2496ed' },
        { id: 'postman', name: 'Postman', icon: <SiPostman />, brandColor: '#ff6c37' },
        { id: 'canva', name: 'Canva Pro', icon: <Sparkles />, brandColor: '#00c4cc' },
        { id: 'arduino', name: 'Arduino IoT', icon: <SiArduino />, brandColor: '#00979d' },
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-24 relative overflow-hidden bg-slate-50/70 dark:bg-[#070b14] transition-colors duration-300"
    >
      {/* Three.js Interactive 3D Ambient Particle Constellation */}
      <ThreeSkillBackground accentColor="#3b82f6" />

      {/* Atmospheric lighting gradients */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold tracking-wider uppercase border border-blue-500/20 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Arsenal & Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Skills & <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Technologies</span>
          </h2>
        </div>

        {/* Organized Thematic Clusters of Magnetic Skills */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: groupIdx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/70 backdrop-blur-sm"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ 
                      backgroundColor: `${group.accent}15`,
                      color: group.accent,
                      border: `1px solid ${group.accent}30`
                    }}
                  >
                    {group.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {group.title}
                  </h3>
                </div>
              </div>

              {/* Magnetic Interactive Skill Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {group.skills.map((skill) => (
                  <MagneticSkillPill 
                    key={skill.id} 
                    skill={skill} 
                    onSelect={onSelectSkill}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
