import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Hackathons } from './components/Hackathons';
import { Workshops } from './components/Workshops';
import { Highlights } from './components/Highlights';
import { CreativeGallery } from './components/CreativeGallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Terminal } from 'lucide-react';

export const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);

  const handleSelectSkill = (skillName: string) => {
    setSelectedSkillFilter(skillName);
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-blue-500/20 selection:text-blue-500">
        
        {/* Navigation Bar */}
        <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <About />
          <Skills onSelectSkill={handleSelectSkill} />
          <Projects initialFilter={selectedSkillFilter} />
          <Experience />
          <Hackathons />
          <Workshops />
          <Highlights />
          <CreativeGallery />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive CLI Terminal Window */}
        <InteractiveTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        {/* Floating Quick Terminal Button (Bottom-Right) */}
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-slate-900/90 dark:bg-slate-800/90 text-cyan-400 hover:text-white border border-cyan-500/30 hover:border-cyan-400 backdrop-blur-xl shadow-xl shadow-cyan-500/10 transition-all hover:scale-105 active:scale-95 group flex items-center gap-2 text-xs font-mono"
          title="Open Developer Terminal (CLI)"
        >
          <Terminal className="w-4 h-4" />
          <span className="hidden sm:inline font-bold">CLI</span>
        </button>

      </div>
    </ThemeProvider>
  );
};

export default App;
