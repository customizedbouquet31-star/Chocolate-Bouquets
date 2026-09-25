import { Star } from 'lucide-react';
import { reviews } from '../../data/reviews';

import { motion } from 'framer-motion';

export default function Reviews() {
  return (
    <section className="py-8 md:py-12 bg-lavender-100">
      <div className="w-full px-4 md:px-12">
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif font-bold text-2xl md:text-3xl text-black uppercase tracking-wider mb-6 px-8 py-3 border border-lavender-200 bg-white rounded-full shadow-sm hover:shadow-xl hover:border-primary/30 cursor-default transition-shadow"
          >
            Made With Love. Gifted With Joy.
          </motion.h2>
          <p className="text-plum-900/70 max-w-xl mx-auto">
            Hear from our wonderful customers who chose us to make their special moments even more memorable.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 md:p-8 rounded-2xl border border-lavender-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 md:w-4 md:h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-lavender-200'}`} 
                  />
                ))}
              </div>
              <p className="text-plum-950/80 mb-4 md:mb-6 italic text-[11px] sm:text-xs md:text-[15px] leading-relaxed line-clamp-4 md:line-clamp-none">
                "{review.text}"
              </p>
              <div className="mt-auto pt-3 md:pt-4 border-t border-lavender-50">
                <p className="font-bold text-plum-950 text-[10px] md:text-base truncate">{review.name}</p>
                {review.product && (
                  <p className="text-[9px] md:text-xs text-plum-900/50 font-medium mt-0.5 md:mt-1 truncate">Bought: {review.product}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
