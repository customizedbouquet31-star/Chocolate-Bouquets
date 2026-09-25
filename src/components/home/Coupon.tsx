import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Copy, Check, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Coupon() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const offers = [
    { code: 'Welcome10', title: 'First Order', discount: '10%', threshold: 'No minimum', color: 'from-amber-200 via-amber-400 to-amber-600' },
    { code: 'CHOCO10', title: 'Silver Tier', discount: '10%', threshold: 'Above ₹999', color: 'from-zinc-200 via-zinc-400 to-zinc-500' },
    { code: 'CHOCO20', title: 'Gold Tier', discount: '20%', threshold: 'Above ₹1999', color: 'from-yellow-300 via-yellow-500 to-yellow-700' },
    { code: 'CHOCO30', title: 'Platinum Tier', discount: '30%', threshold: 'Above ₹2999', color: 'from-rose-300 via-rose-500 to-rose-700' },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleDragEnd = (_event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // Swipe left - next card
      setActiveIndex((prev) => (prev + 1) % offers.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swipe right - prev card
      setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length);
    }
  };

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % offers.length);
  const prevCard = () => setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length);

  return (
    <section className="py-6 md:py-8 bg-plum-950 relative overflow-hidden flex items-center justify-center">
      
      {/* Abstract Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-b from-primary/20 to-transparent blur-[120px]" 
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.3, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-t from-rose-500/20 to-transparent blur-[100px]" 
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(255,255,255,0.1)] hidden md:flex"
          >
            <Sparkles className="w-8 h-8 text-amber-200" />
          </motion.div>
          <h2 className="font-sans font-black tracking-tighter text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 mb-4 md:mb-6">
            Unlock Privilege.
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base md:text-xl font-medium tracking-wide">
            Elevate your gifting experience. These exclusive tiers are automatically applied to your cart.
          </p>
        </div>

        {/* Mobile Swipeable Stack */}
        <div className="relative w-full h-[380px] md:hidden flex justify-center items-center perspective-[1000px]">
          <AnimatePresence initial={false}>
            {offers.map((offer, index) => {
              // Calculate relative position (0 is active, 1 is next, 2 is after next, etc)
              let relativeIndex = (index - activeIndex + offers.length) % offers.length;
              
              // Only render the active card and a few cards behind it to save performance
              if (relativeIndex > 2 && relativeIndex !== offers.length - 1) return null;

              // For visual stacking
              let isTop = relativeIndex === 0;
              let isPrev = relativeIndex === offers.length - 1;

              let scale = isTop ? 1 : isPrev ? 0.9 : 1 - (relativeIndex * 0.05);
              let yOffset = isTop ? 0 : isPrev ? -20 : relativeIndex * 20;
              let zIndex = isTop ? 10 : isPrev ? 0 : 10 - relativeIndex;
              let opacity = isTop ? 1 : isPrev ? 0 : 1 - (relativeIndex * 0.3);

              return (
                <motion.div 
                  key={offer.code}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={isTop ? handleDragEnd : undefined}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ 
                    opacity, 
                    scale, 
                    y: yOffset,
                    zIndex,
                    rotate: isTop ? 0 : (relativeIndex % 2 === 0 ? -2 : 2)
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute w-[85%] max-w-[320px] h-[320px] touch-none"
                >
                  {/* Card Body */}
                  <div className="relative h-full bg-white/[0.05] backdrop-blur-3xl border border-white/20 rounded-[2rem] p-6 flex flex-col items-center text-center overflow-hidden shadow-2xl">
                    <div className={`w-full h-1.5 absolute top-0 left-0 bg-gradient-to-r ${offer.color}`}></div>
                    
                    <p className="text-white/60 font-bold tracking-widest uppercase text-[10px] mb-4 mt-2">
                      {offer.title}
                    </p>

                    <div className="flex-1 flex flex-col justify-center items-center w-full">
                      <h3 className={`font-sans font-black text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${offer.color} drop-shadow-2xl mb-1`}>
                        {offer.discount}
                      </h3>
                      <span className="text-white/80 font-medium tracking-widest uppercase text-xs">
                        {offer.threshold}
                      </span>
                    </div>

                    <div className="w-full pt-4 border-t border-white/10 mt-auto">
                      <button 
                        onClick={() => handleCopy(offer.code)}
                        className="w-full relative overflow-hidden rounded-xl p-[1px] active:scale-95 transition-transform"
                      >
                        <div className="relative bg-plum-950/80 backdrop-blur-md rounded-[11px] py-3 px-4 flex items-center justify-between">
                          <span className="font-mono font-bold tracking-widest text-white text-base">
                            {offer.code}
                          </span>
                          {copiedCode === offer.code ? (
                            <Check className="w-4 h-4 text-amber-300" />
                          ) : (
                            <Copy className="w-4 h-4 text-white/50" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Mobile Swipe Indicators */}
          <div className="absolute bottom-0 w-full flex justify-center gap-2 items-center">
            {offers.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-white/80' : 'w-1.5 bg-white/20'}`} 
              />
            ))}
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-2 p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/50" onClick={prevCard}>
            <ChevronLeft className="w-5 h-5" />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/50" onClick={nextCard}>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <motion.div 
              key={offer.code}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="relative group h-full"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
              
              <div className="relative h-full bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-2xl border border-white/10 hover:border-white/20 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shimmer"></div>
                <div className={`w-full h-1 absolute top-0 left-0 bg-gradient-to-r ${offer.color} opacity-70`}></div>

                <p className="text-white/40 font-bold tracking-widest uppercase text-[10px] mb-6">
                  {offer.title}
                </p>

                <div className="flex-1 flex flex-col justify-center items-center mb-8">
                  <h3 className={`font-sans font-black text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${offer.color} drop-shadow-2xl mb-2`}>
                    {offer.discount}
                  </h3>
                  <span className="text-white/80 font-medium tracking-widest uppercase text-sm">
                    {offer.threshold}
                  </span>
                </div>

                <div className="w-full pt-6 border-t border-white/10">
                  <button 
                    onClick={() => handleCopy(offer.code)}
                    className="w-full relative overflow-hidden rounded-2xl p-[1px] group/btn transition-transform active:scale-95"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-50 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <div className="relative bg-plum-950/80 backdrop-blur-md rounded-[15px] py-3.5 px-4 flex items-center justify-between transition-colors group-hover/btn:bg-plum-950/50">
                      <span className="font-mono font-bold tracking-widest text-white text-lg">
                        {offer.code}
                      </span>
                      {copiedCode === offer.code ? (
                        <Check className="w-5 h-5 text-amber-300" />
                      ) : (
                        <Copy className="w-5 h-5 text-white/50 group-hover/btn:text-white transition-colors" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
