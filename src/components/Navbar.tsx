import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Menu, X, Download, Terminal
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';
import { triggerCelebration } from '../utils/confetti';

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'skills', 'projects', 'eduverse', 'experience', 'hackathons', 'creative', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Eduverse', href: '#eduverse' },
    { name: 'Experience', href: '#experience' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Creative', href: '#creative' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleResumeDownload = () => {
    triggerCelebration();
    window.open(personalInfo.resume, '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/80 dark:bg-[#090d16]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="cursor-pointer select-none group"
            >
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                PAWAN SAI G
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-sm shadow-blue-500/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Terminal Quick Button */}
              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700/60"
                  title="Open Interactive CLI Terminal"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Terminal</span>
                </button>
              )}

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700/60 shadow-sm"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-indigo-600 transition-transform duration-300" />
                )}
              </button>

              {/* Resume Download CTA */}
              <button
                onClick={handleResumeDownload}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open mobile navigation"
                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700/60"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 lg:hidden px-4 pb-6 pt-2 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5 py-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleResumeDownload();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </button>

                {onOpenTerminal && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTerminal();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800"
                  >
                    <Terminal className="w-4 h-4 text-cyan-500" />
                    <span>Launch Terminal CLI</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
