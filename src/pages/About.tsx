import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export default function About() {
  const stagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center bg-plum-950 overflow-hidden">
        {/* Ambient shapes */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -right-[20%] w-[100vw] h-[100vw] rounded-full bg-gradient-to-bl from-primary/30 to-transparent blur-[120px] pointer-events-none" 
        />
        
        <div className="relative z-10 text-center px-4">
          <motion.div initial="initial" animate="animate" variants={stagger} className="flex flex-col items-center">
            <motion.span variants={fadeInUp} className="text-amber-200 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-6 block">
              The Artisan Touch
            </motion.span>
            <motion.h1 variants={fadeInUp} className="font-serif text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 mb-6 leading-tight">
              Our Story
            </motion.h1>
            <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent"></motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Composition */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-plum-950/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=1000&auto=format&fit=crop" 
              alt="Artisan Bouquet" 
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 z-20 flex items-center justify-center shadow-2xl">
              <span className="font-serif italic text-4xl text-white drop-shadow-lg p-8 text-center leading-snug">
                Since<br/>2024
              </span>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-plum-950 leading-tight">
              More than just gifts.<br/>
              <span className="text-primary italic">Memories crafted with love.</span>
            </h2>
            
            <p className="text-lg text-plum-900/70 leading-relaxed font-medium">
              At <strong className="text-plum-950">Customized Bouquets 31</strong>, we believe that a gift is a heartfelt expression of celebration. We specialize in crafting premium, customized gifting experiences that leave a lasting impression.
            </p>

            <div className="pl-6 border-l-4 border-primary py-2">
              <p className="font-serif italic text-3xl text-plum-900 leading-normal">
                "Customize; Anything → Everything."
              </p>
            </div>

            <p className="text-lg text-plum-900/70 leading-relaxed font-medium">
              Whether you're looking for a breathtaking flower arrangement, a decadent chocolate bouquet, or a thoughtfully curated hamper, we dedicate ourselves to perfecting every tiny detail. 
            </p>
            
            <div className="pt-8">
              <a href="/shop" className="group relative inline-flex items-center justify-center px-10 py-4 font-bold tracking-widest text-white transition-all duration-300 bg-plum-950 rounded-full overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-plum-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">DISCOVER COLLECTION</span>
              </a>
            </div>
          </motion.div>
          
        </div>
      </section>

    </div>
  );
}
