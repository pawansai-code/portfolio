import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, RotateCcw, X, 
  Volume2, VolumeX, Sparkles, MapPin, Minimize2, Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThreeAvatarCanvas } from './ThreeAvatarCanvas';

interface Station {
  id: string;
  name: string;
  code: string;
  title: string;
  message: string;
}

const STATIONS: Station[] = [
  {
    id: 'hero',
    name: 'Origin Terminal',
    code: 'STN-01',
    title: 'Hero Depot',
    message: "All aboard Pawan's Career Express! Scroll down or tap next station to begin the tour.",
  },
  {
    id: 'about',
    name: 'Foundation Grounds',
    code: 'STN-02',
    title: 'Education & Bio',
    message: "Arriving at Station 2: B.E. Computer Science at Prathyusha (2023–2027) & engineering journey.",
  },
  {
    id: 'skills',
    name: 'Tech Arsenal Junction',
    code: 'STN-03',
    title: 'Skills Matrix',
    message: "Arriving at Station 3: Inspecting 28+ tools, Python, React 19, RAG pipelines & vector databases.",
  },
  {
    id: 'projects',
    name: 'Innovation Yard',
    code: 'STN-04',
    title: 'Featured Projects',
    message: "Platform 4: CodeLens hybrid RAG engine and Road-SOS emergency response lifeline.",
  },
  {
    id: 'experience',
    name: 'Enterprise Rails',
    code: 'STN-05',
    title: 'Work Experience',
    message: "Platform 5: Enterprise Generative AI at OneIntegral & Production Full-Stack at SocialTek.",
  },
  {
    id: 'hackathons',
    name: 'Podium Platform',
    code: 'STN-06',
    title: 'Hackathon Honors',
    message: "Station 6: Competitive triumphs! 2nd Place at RIT API Fusion & Hardware Hackathon Finalist.",
  },
  {
    id: 'workshops',
    name: 'Community Junction',
    code: 'STN-07',
    title: 'Workshops & Mentorship',
    message: "Station 7: Community leadership and conducting hands-on Figma UI/UX design workshops.",
  },
  {
    id: 'contact',
    name: 'Destination Terminal',
    code: 'STN-08',
    title: 'Contact Platform',
    message: "Final Station reached! Ready to build something extraordinary? Let's connect or return home!",
  },
];

export const JourneyTrainHUD: React.FC = () => {
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [dialogueOpen, setDialogueOpen] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 350);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Determine active station by section position
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = STATIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(STATIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          if (currentStationIndex !== i) {
            setCurrentStationIndex(i);
            setDialogueOpen(true);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [currentStationIndex]);

  // Listen for global train return events from footer
  useEffect(() => {
    const handleReturnEvent = () => {
      handleReturnToOrigin();
    };
    window.addEventListener('train-return-origin', handleReturnEvent);
    return () => window.removeEventListener('train-return-origin', handleReturnEvent);
  }, []);

  // Station navigation handler
  const goToStation = (index: number) => {
    if (index < 0 || index >= STATIONS.length) return;
    const target = document.getElementById(STATIONS[index].id);
    if (target) {
      setCurrentStationIndex(index);
      setDialogueOpen(true);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Return to origin reverse sequence
  const handleReturnToOrigin = () => {
    setIsReversing(true);
    setDialogueOpen(true);

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setIsReversing(false);
      setCurrentStationIndex(0);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#06b6d4', '#eab308', '#ffffff'],
      });
    }, 1800);
  };

  const currentStation = STATIONS[currentStationIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-start gap-2.5">
        
        {/* Animated Station Dialogue Speech Bubble */}
        <AnimatePresence>
          {dialogueOpen && !isMinimized && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative max-w-xs sm:max-w-sm rounded-2xl p-4 bg-slate-900/95 dark:bg-slate-950/95 text-white border border-cyan-500/40 shadow-2xl backdrop-blur-xl"
            >
              {/* Dialogue Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-cyan-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>{currentStation.code} • {currentStation.name}</span>
                </div>
                <button
                  onClick={() => setDialogueOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close dialogue"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Conductor Avatar Dialogue Message */}
              <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-sans mb-3">
                {isReversing 
                  ? '🚂 Reversing engine! Traveling back to Origin Terminal at full steam!'
                  : currentStation.message}
              </p>

              {/* Station Navigation Quick Actions */}
              <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                <button
                  onClick={() => goToStation(currentStationIndex - 1)}
                  disabled={currentStationIndex === 0}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>Prev</span>
                </button>

                <span className="text-slate-400 font-bold">
                  {currentStationIndex + 1} / {STATIONS.length}
                </span>

                {currentStationIndex === STATIONS.length - 1 ? (
                  <button
                    onClick={handleReturnToOrigin}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:scale-105 transition-all"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Return</span>
                  </button>
                ) : (
                  <button
                    onClick={() => goToStation(currentStationIndex + 1)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-sm transition-all"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Speech bubble downward pointer */}
              <div className="absolute -bottom-2 left-10 w-4 h-4 bg-slate-900/95 dark:bg-slate-950/95 border-r border-b border-cyan-500/40 rotate-45 transform" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vintage Steam Locomotive HUD */}
        <motion.div
          layout
          className={`relative rounded-3xl bg-slate-900/95 dark:bg-[#070d18]/95 border-2 border-slate-700/80 shadow-2xl backdrop-blur-xl transition-all duration-300 flex items-center gap-3 p-2.5 sm:p-3
            ${isReversing ? 'border-amber-400/80 shadow-amber-500/20' : 'hover:border-cyan-400/70 shadow-cyan-500/10'}`}
        >
          {/* Animated Puffing Steam Clouds from Smokestack */}
          <div className="absolute -top-6 left-12 flex items-center pointer-events-none">
            <motion.span
              animate={{
                y: [-2, -18],
                x: isReversing ? [0, 10] : [0, -10],
                opacity: [0.8, 0],
                scale: [0.6, 1.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="text-slate-300 font-bold text-xs"
            >
              💨
            </motion.span>
            <motion.span
              animate={{
                y: [-2, -16],
                x: isReversing ? [0, 8] : [0, -8],
                opacity: [0.6, 0],
                scale: [0.5, 1.2],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: 0.4,
                ease: 'easeOut',
              }}
              className="text-slate-400 text-[10px]"
            >
              💨
            </motion.span>
          </div>

          {/* 3D Avatar Cabin Window */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-cyan-400/40 shadow-inner overflow-hidden shrink-0 group/avatar">
            <ThreeAvatarCanvas 
              isMoving={isScrolling} 
              direction={isReversing ? 'reverse' : 'forward'} 
            />

            {/* Brass Cabin Rivet Accents */}
            <span className="absolute top-1 left-1 w-1 h-1 rounded-full bg-amber-400/70" />
            <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-amber-400/70" />
          </div>

          {/* Train Cockpit Details & Station Status */}
          {!isMinimized && (
            <div className="pr-2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  🚂 Pawan Express
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-amber-300 font-semibold border border-amber-400/30">
                  {currentStation.code}
                </span>
              </div>

              <div className="text-xs sm:text-sm font-black text-white truncate max-w-[170px] sm:max-w-[200px]">
                {currentStation.name}
              </div>

              {/* Progress Rail Track */}
              <div className="w-full mt-1.5 flex items-center gap-1.5">
                <div className="w-28 sm:w-36 h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 rounded-full"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-semibold">
                  {Math.round(scrollProgress)}%
                </span>
              </div>
            </div>
          )}

          {/* Quick HUD Controls */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={() => setDialogueOpen(!dialogueOpen)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={dialogueOpen ? 'Hide Announcement' : 'Show Station Announcement'}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isMinimized ? 'Expand HUD' : 'Minimize HUD'}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

        </motion.div>

      </div>
    </div>
  );
};
