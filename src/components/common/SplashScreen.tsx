import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Detect mobile device (Android, iOS, or mobile viewport width)
    const checkMobile = () => {
      if (typeof window === 'undefined') return false;
      
      const ua = navigator.userAgent || '';
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const isSmallScreen = window.innerWidth <= 768;
      const urlHasSplash = new URLSearchParams(window.location.search).has('splash');
      
      return isMobileUA || isSmallScreen || urlHasSplash;
    };

    const isMobile = checkMobile();
    setIsMobileDevice(isMobile);

    if (!isMobile) {
      return;
    }

    // Activate splash screen
    setIsVisible(true);

    // Prevent background scrolling while splash screen is active
    document.body.style.overflow = 'hidden';
    document.body.classList.add('splash-active');

    // Exactly 5 seconds display timer as requested
    const DURATION = 5000;
    timerRef.current = setTimeout(() => {
      triggerExit();
    }, DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.body.style.overflow = '';
      document.body.classList.remove('splash-active');
    };
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
    // Restore normal body scroll
    document.body.style.overflow = '';
    document.body.classList.remove('splash-active');

    // Remove component after animation finishes
    setTimeout(() => {
      setIsVisible(false);
    }, 900);
  };

  if (!isMobileDevice || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="mobile-splash-curtain"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Crisp, elegant curtain lift
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between items-center py-8 px-6 select-none overflow-hidden bg-gradient-to-b from-[#1b0a2a] via-[#2d1245] to-[#140620]"
        >
          {/* Top Bar with Brand & Skip Option */}
          <div className="w-full flex justify-between items-center relative z-20 max-w-sm pt-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.85, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[11px] font-sans font-bold tracking-[0.25em] text-lavender-200 uppercase"
            >
              The Chocolate Bouquet
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              onClick={triggerExit}
              className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/25 text-white text-[12px] font-semibold tracking-wider shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Skip</span>
              <span className="text-[11px] opacity-80">✕</span>
            </motion.button>
          </div>

          {/* Centerpiece: Crystal Clear, Crisp Logo */}
          <motion.div
            key="center-logo-showcase"
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              y: -30,
              transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 flex flex-col items-center justify-center my-auto"
          >
            {/* Crisp High-Res Logo Container */}
            <div className="relative mb-6">
              {/* Outer Subtle Golden-Lavender Accent Border */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-lavender-400 via-white to-lavender-300 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center justify-center">
                {/* Clean White Crisp Card */}
                <div className="w-full h-full rounded-full bg-white p-2.5 flex items-center justify-center overflow-hidden shadow-inner">
                  <img
                    src="/logo.png"
                    alt="The Chocolate Bouquet"
                    className="w-full h-full object-contain select-none pointer-events-none"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Tagline & Subtitle with high-contrast sharp typography */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-serif italic text-white text-lg tracking-wide text-center drop-shadow-md font-medium"
            >
              "Customize; Anything → Everything."
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-[11px] uppercase font-sans font-bold tracking-[0.3em] text-lavender-200 text-center mt-2"
            >
              Handcrafted Bouquets &amp; Hampers
            </motion.p>
          </motion.div>

          {/* 5-Second Sharp Progress Bar */}
          <motion.div
            key="bottom-progress-indicator"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full flex flex-col items-center gap-3 relative z-10 max-w-xs pb-4"
          >
            {/* The 5-Second Fill Line */}
            <div className="w-52 h-[3px] bg-white/20 rounded-full overflow-hidden shadow-sm">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 5.0, // Exactly 5 seconds
                  ease: 'linear',
                }}
                className="h-full bg-gradient-to-r from-lavender-400 via-white to-lavender-200 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]"
              />
            </div>

            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.28em] text-lavender-200/80">
              Opening Experience
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
