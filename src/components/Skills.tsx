import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Brain, Code2, Database, Layout, Sparkles, 
  ArrowUpRight
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

interface SkillsProps {
  onSelectSkill?: (skillName: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onSelectSkill }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkillForDetail, setSelectedSkillForDetail] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Technologies', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'ai-ml', label: 'AI & ML / RAG', icon: <Brain className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Code2 className="w-4 h-4" /> },
    { id: 'backend-db', label: 'Backend & DB', icon: <Database className="w-4 h-4" /> },
    { id: 'tools-uiux', label: 'UI/UX & Tools', icon: <Layout className="w-4 h-4" /> },
  ];

  // Flattened and filtered list
  const filteredSkills = useMemo(() => {
    let list: Array<{
      name: string;
      category: string;
      categoryId: string;
      proficiency: number;
      color: string;
      description: string;
      featured?: boolean;
    }> = [];

    skillCategories.forEach(cat => {
      cat.skills.forEach(skill => {
        list.push({
          ...skill,
          categoryId: cat.id
        });
      });
    });

    if (activeCategory !== 'all') {
      list = list.filter(item => item.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        item => item.name.toLowerCase().includes(q) || 
                item.description.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#090d16] border-y border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-500/30 border border-white/10 mb-4">
            Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#b8d9ff] tracking-tight mb-4">
            Skills, Tools & <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Core Frameworks</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A comprehensive stack honed through enterprise internships, national hackathon challenges, and production software delivery.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g., RAG, React)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkillForDetail === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedSkillForDetail(isSelected ? null : skill.name)}
                  className={`group relative p-5 rounded-2xl bg-white dark:bg-slate-900/80 border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20'
                      : 'border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: skill.color }}
                      />
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </h4>
                    </div>

                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {skill.description}
                  </p>

                  {/* Proficiency Meter */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` 
                      }}
                    />
                  </div>

                  {/* On-click action prompt */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] font-medium text-slate-500">
                    <span className="font-mono">{skill.category}</span>
                    {onSelectSkill ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSkill(skill.name);
                        }}
                        className="text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline"
                      >
                        <span>Related Projects</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <a
                        href="#projects"
                        className="text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>View Projects</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Brain className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base mb-1">
              No skills found matching "{searchQuery}"
            </h4>
            <p className="text-xs text-slate-500">Try searching for generic terms like "Python", "React", or "AI".</p>
          </div>
        )}

      </div>
    </section>
  );
};
