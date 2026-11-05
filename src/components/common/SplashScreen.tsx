import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart } from 'lucide-react';

const CRAFT_STEPS = [
  { icon: '🌸', text: 'Selecting fresh botanical blooms...' },
  { icon: '🍫', text: 'Curating artisanal chocolates...' },
  { icon: '🎀', text: 'Hand-tying signature satin ribbons...' },
  { icon: '✨', text: 'Personalizing your gift story...' },
];

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Avoid running on admin dashboard pages
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return;
    }

    // Activate for all devices (Mobile, Tablet, Desktop)
    setIsVisible(true);

    // Prevent background scrolling while splash is active
    document.body.style.overflow = 'hidden';
    document.body.classList.add('splash-active');

    // Cycle through artisanal craftsmanship steps
    stepIntervalRef.current = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % CRAFT_STEPS.length);
    }, 1200);

    // 4.5 seconds display timer for the complete experience
    const DURATION = 4600;
    timerRef.current = setTimeout(() => {
      triggerExit();
    }, DURATION);

    // Keyboard support: Escape key skips
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('splash-active');
    };
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
    document.body.style.overflow = '';
    document.body.classList.remove('splash-active');

    setTimeout(() => {
      setIsVisible(false);
    }, 850);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="luxury-splash-curtain"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            opacity: 0.95,
            transition: {
              duration: 0.8,
              ease: [0.77, 0, 0.175, 1], // Luxurious smooth curtain lift
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between items-center py-6 sm:py-8 px-6 select-none overflow-hidden bg-gradient-to-br from-[#12051b] via-[#210c2e] to-[#0e0416]"
        >
          {/* Subtle Ambient Glow Layers behind content */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-primary/25 via-lavender-400/20 to-rose-400/15 rounded-full blur-3xl pointer-events-none transform-gpu" />
          <div className="absolute bottom-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/15 rounded-full blur-3xl pointer-events-none transform-gpu" />

          {/* Floating subtle ambient particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/3 left-10 sm:left-24 text-rose-300/40 text-xl"
            >
              🌸
            </motion.div>
            <motion.div
              animate={{ y: [0, -25, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/2 right-8 sm:right-28 text-lavender-300/40 text-lg"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-1/3 left-1/4 text-amber-300/30 text-sm"
            >
              ✦
            </motion.div>
          </div>

          {/* Top Bar with Brand Badge & Skip Button */}
          <header className="w-full max-w-4xl flex justify-between items-center relative z-20 pt-1 sm:pt-2">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.25em] text-lavender-200/90 uppercase">
                Artisanal Gifting Boutique
              </span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              onClick={triggerExit}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white text-xs font-semibold tracking-wider shadow-sm backdrop-blur-sm transition-all flex items-center gap-1.5 cursor-pointer"
              title="Skip to store (Esc)"
            >
              <span>Skip</span>
              <X className="w-3.5 h-3.5 opacity-70" />
            </motion.button>
          </header>

          {/* Centerpiece: Perfectly Balanced, Centered, Luxury Logo & Message */}
          <main className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-lg text-center px-4">
            
            {/* Handcrafted Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold tracking-[0.28em] text-lavender-200 uppercase mb-5 backdrop-blur-sm"
            >
              <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
              <span>Handcrafted with Love</span>
            </motion.div>

            {/* Logo Container with Smooth Optical Alignment */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-5 sm:mb-6 group"
            >
              {/* Outer Radiant Soft Ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-lavender-400/30 via-white/20 to-primary/30 rounded-[2.2rem] sm:rounded-[2.7rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Logo Frame: Clean, Perfectly Proportionate Rounded Card */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-white/15 to-white/5 p-1.5 sm:p-2 border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="The Chocolate Bouquet"
                  className="w-full h-full object-cover rounded-[1.6rem] sm:rounded-[2.1rem] select-none pointer-events-none drop-shadow-md"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-wide drop-shadow-md"
            >
              The Chocolate Bouquet
            </motion.h1>

            {/* Handcrafted Motto */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="font-serif italic text-lavender-200/90 text-sm sm:text-base tracking-wide mt-1 drop-shadow-sm"
            >
              "Customize; Anything → Everything."
            </motion.p>

            {/* Live Crafting Step: Human-Made Touch */}
            <div className="mt-5 sm:mt-6 h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-lavender-100 font-medium tracking-wide shadow-inner"
                >
                  <span className="text-base">{CRAFT_STEPS[currentStep].icon}</span>
                  <span>{CRAFT_STEPS[currentStep].text}</span>
                </motion.div>
              </AnimatePresence>
            </div>

          </main>

          {/* Bottom Bar: Elegant Golden-Lavender Progress Indicator */}
          <footer className="w-full max-w-xs flex flex-col items-center gap-2.5 relative z-10 pb-2 sm:pb-4">
            {/* The 4.5-Second Fill Line */}
            <div className="w-48 sm:w-56 h-[3px] bg-white/15 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 4.6,
                  ease: 'linear',
                }}
                className="h-full bg-gradient-to-r from-lavender-400 via-rose-200 to-amber-200 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              />
            </div>

            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-lavender-300/70">
              <Sparkles className="w-3 h-3 text-amber-300/80" />
              <span>Opening Your Experience</span>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
