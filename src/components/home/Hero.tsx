import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section 
      className="relative min-h-[60vh] md:min-h-[90vh] flex flex-col md:flex-row items-center justify-center overflow-hidden bg-lavender-100 bg-cover bg-center bg-no-repeat bg-blend-soft-light"
      style={{ backgroundImage: "url('/background-hero.png')" }}
    >
      
      {/* Background Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-lavender-50/90 via-lavender-50/50 to-transparent z-0"></div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lavender-200/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20 z-10 py-8 md:py-0">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left"
        >
          <h1 className="font-serif font-medium text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-plum-950 text-balance">
            <span className="italic font-light text-primary/90">Customize;</span><br/>
            Anything <span className="text-lavender-400">→</span> Everything.
          </h1>

          <p className="text-lg md:text-xl text-plum-900/70 max-w-lg mx-auto md:mx-0 leading-relaxed text-balance">
            Thoughtful bouquets and hampers made around your person, your occasion and your story.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start -mt-2 md:mt-4">
            <a href="/shop" className="w-full sm:w-auto px-8 py-3.5 bg-plum-950 text-white rounded-full font-bold tracking-wider hover:bg-plum-900 shadow-xl shadow-plum-900/20 transition-all hover:-translate-y-1 text-center">
              SHOP NOW
            </a>
            <a href="https://wa.me/919315274580" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-white text-plum-950 border-2 border-lavender-100 rounded-full font-bold tracking-wider hover:border-primary hover:text-primary shadow-sm transition-all text-center">
              CUSTOMIZE YOURS
            </a>
          </div>

          <div className="flex items-center gap-8 justify-center md:justify-start mt-2 pt-4 md:mt-8 md:pt-8 border-t border-lavender-200/60">
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl text-plum-950">500+</span>
              <span className="text-xs tracking-wider text-plum-900/60 font-medium">ORDERS</span>
            </div>
            <div className="w-px h-8 bg-lavender-200/60"></div>
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl text-plum-950">Pan-India</span>
              <span className="text-xs tracking-wider text-plum-900/60 font-medium">DELIVERY</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Logo Showcase with Value Propositions (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="hidden md:flex flex-1 w-full relative items-center justify-center min-h-[400px] lg:min-h-[600px]"
        >
          {/* Glowing aura behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-primary/30 via-lavender-300/40 to-rose-400/20 rounded-full blur-3xl animate-pulse"></div>

          {/* Floating Logo without the restrictive card */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-[500px]"
          >
            <img 
              src="/logo.png" 
              alt="The Chocolate Bouquet Logo" 
              className="w-full h-auto object-contain drop-shadow-2xl rounded-3xl md:rounded-[3rem]"
            />
          </motion.div>
          
          {/* Value Proposition Badge 1 */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-4 -right-2 md:-right-8 bg-white/95 backdrop-blur-md p-3 pr-6 rounded-full shadow-xl border border-white/60 flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 text-lg">🍫</div>
            <div>
              <p className="text-[11px] font-bold text-plum-950 uppercase tracking-wider leading-tight">Premium</p>
              <p className="text-[10px] text-plum-900/60 font-medium">Imported Chocolates</p>
            </div>
          </motion.div>

          {/* Value Proposition Badge 2 */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-16 -left-4 md:-left-12 bg-white/95 backdrop-blur-md p-3 pr-6 rounded-full shadow-xl border border-white/60 flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center text-primary text-lg">🌸</div>
            <div>
              <p className="text-[11px] font-bold text-plum-950 uppercase tracking-wider leading-tight">Freshly</p>
              <p className="text-[10px] text-plum-900/60 font-medium">Handpicked Flowers</p>
            </div>
          </motion.div>

          {/* Value Proposition Badge 3 */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute -bottom-6 right-8 md:right-4 bg-white/95 backdrop-blur-md p-3 pr-6 rounded-full shadow-xl border border-white/60 flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-lg">✨</div>
            <div>
              <p className="text-[11px] font-bold text-plum-950 uppercase tracking-wider leading-tight">100% Custom</p>
              <p className="text-[10px] text-plum-900/60 font-medium">Made to order</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
