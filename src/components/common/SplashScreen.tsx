import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function SplashScreen() {
  const prefersReducedMotion = useReducedMotion();

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.location.pathname.startsWith('/admin')) return false;
    try {
      const hasShown = sessionStorage.getItem('tcb_splash_shown');
      const forceSplash = new URLSearchParams(window.location.search).has('splash');
      if (hasShown && !forceSplash) {
        return false;
      }
      sessionStorage.setItem('tcb_splash_shown', 'true');
      return true;
    } catch {
      return true;
    }
  });

  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerExit = useCallback(() => {
    setIsExiting(true);
    document.body.style.overflow = '';
    document.body.classList.remove('splash-active');

    setTimeout(() => {
      setIsVisible(false);
    }, 650);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    document.body.style.overflow = 'hidden';
    document.body.classList.add('splash-active');

    const duration = prefersReducedMotion ? 400 : 1350;
    timerRef.current = setTimeout(() => {
      triggerExit();
    }, duration);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('splash-active');
    };
  }, [isVisible, triggerExit, prefersReducedMotion]);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="editorial-splash-curtain"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: prefersReducedMotion ? 0 : '-100%',
            opacity: prefersReducedMotion ? 0 : 1,
            transition: {
              duration: prefersReducedMotion ? 0.25 : 0.65,
              ease: CURTAIN_EASE,
            },
          }}
          onClick={triggerExit}
          className="fixed inset-0 h-dvh z-[9999] flex flex-col items-center justify-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] px-6 select-none overflow-hidden bg-[#140a21] cursor-pointer"
        >
          {/* Minimal Editorial Centerpiece */}
          <div className="flex flex-col items-center text-center max-w-md w-full">
            {/* Crisp Framed Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/15 p-1 mb-7 bg-white/[0.03]"
            >
              <img
                src="/logo.webp"
                alt="The Chocolate Bouquet"
                className="w-full h-full object-cover rounded-full"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </motion.div>

            {/* Masked Brand Title Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.1, ease: LUXURY_EASE }}
                className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal tracking-[0.2em] uppercase"
              >
                The Chocolate Bouquet
              </motion.h1>
            </div>

            {/* Hairline Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: LUXURY_EASE }}
              className="w-16 h-px bg-white/25 my-4 origin-center"
            />

            {/* Masked Subtitle Reveal */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: LUXURY_EASE }}
                className="font-sans text-[10px] sm:text-[11px] text-lavender-200/70 tracking-[0.35em] uppercase"
              >
                Handcrafted Luxury Gifting
              </motion.p>
            </div>
          </div>

          {/* Understated Skip Action */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            onClick={(e) => {
              e.stopPropagation();
              triggerExit();
            }}
            className="absolute bottom-[calc(2rem+env(safe-area-inset-bottom))] text-[10px] font-sans uppercase tracking-[0.3em] text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          >
            Enter
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
