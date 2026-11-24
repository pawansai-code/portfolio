import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { personalInfo, projectsData, skillCategories } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-xs font-mono text-cyan-300">
          <p className="font-bold text-white mb-1">Pawan Sai G's Interactive Developer CLI [v2.0.0]</p>
          <p className="text-slate-400 mb-2">Type <span className="text-yellow-400">help</span> to view available terminal commands.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold mb-1">Available Commands:</p>
            <p><span className="text-yellow-400 font-bold">whoami</span> - Short bio and overview</p>
            <p><span className="text-yellow-400 font-bold">skills</span> - List core technical proficiencies</p>
            <p><span className="text-yellow-400 font-bold">projects</span> - View flagship software projects</p>
            <p><span className="text-yellow-400 font-bold">experience</span> - Internship and industry history</p>
            <p><span className="text-yellow-400 font-bold">contact</span> - Get direct email and phone</p>
            <p><span className="text-yellow-400 font-bold">clear</span> - Clear the terminal output</p>
            <p><span className="text-yellow-400 font-bold">exit</span> - Close the terminal window</p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-white font-bold">{personalInfo.name} - {personalInfo.tagline}</p>
            <p className="text-slate-400">{personalInfo.bio}</p>
            <p className="text-cyan-400">Location: {personalInfo.location} | Education: {personalInfo.education.degree}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-2">
            {skillCategories.map(cat => (
              <div key={cat.id}>
                <span className="text-cyan-400 font-bold">[{cat.title}]: </span>
                <span>{cat.skills.map(s => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-2">
            {projectsData.map(p => (
              <div key={p.id} className="border-b border-slate-800 pb-1">
                <span className="text-yellow-400 font-bold">{p.title}</span> ({p.category}): {p.tagline}
                <div className="text-slate-500">Tech: {p.tech.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-2">
            <div>
              <p className="text-white font-bold">OneIntegral Technologies (Data Twin)</p>
              <p className="text-cyan-400">Trainee on Generative AI (Intern) | June 2026</p>
              <p className="text-slate-400">Autonomous Financial Reconciliation, RAG, Pinecone, Ollama</p>
            </div>
            <div>
              <p className="text-white font-bold">SocialTek AI & ML Business Solutions</p>
              <p className="text-cyan-400">Full-Stack Developer Intern | 5 Months</p>
              <p className="text-slate-400">Production React, Redux Toolkit, client iterations</p>
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p>Email: <span className="text-cyan-300">{personalInfo.email}</span></p>
            <p>Phone: <span className="text-cyan-300">{personalInfo.phone}</span></p>
            <p>LinkedIn: <span className="text-cyan-300">{personalInfo.socials.linkedin}</span></p>
            <p>GitHub: <span className="text-cyan-300">{personalInfo.socials.github}</span></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        setInput('');
        return;

      default:
        output = (
          <p className="text-xs font-mono text-rose-400">
            command not found: {cmd}. Type 'help' to see available commands.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { command: input, output }]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0b0f19] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col h-[480px]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                pawan@portfolio-v2:~
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Screen Body */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-200 space-y-3">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400 font-bold">pawan@dev:~$</span>
                  <span>{item.command}</span>
                </div>
                <div>{item.output}</div>
              </div>
            ))}

            {/* Input Prompt Form */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-bold shrink-0">pawan@dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white"
                autoFocus
              />
              <button type="submit" className="text-slate-500 hover:text-white">
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>

            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
