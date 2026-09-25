import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import ProductGrid from '../product/ProductGrid';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  bgColor?: string;
}

export default function ProductCarousel({ 
  title, 
  subtitle, 
  products, 
  viewAllLink = "/shop",
  bgColor = "bg-white" 
}: ProductCarouselProps) {

  // Derive badge from title
  let badge = '';
  if (title.toUpperCase().includes('BEST SELLERS')) badge = 'BEST SELLER';
  if (title.toUpperCase().includes('NEW LAUNCHES')) badge = 'NEW LAUNCH';

  return (
    <section className={`py-4 md:py-6 ${bgColor}`}>
      <div className="w-full px-6 md:px-12 mb-2 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif font-bold text-2xl md:text-3xl text-black uppercase tracking-wider mb-2"
        >
          {title}
        </motion.h2>
        {subtitle && <p className="text-plum-900/70">{subtitle}</p>}
      </div>

      <div className="w-full flex justify-end px-6 mb-1 md:hidden">
        <span className="text-[9px] text-plum-900/40 uppercase tracking-widest flex items-center gap-1 font-bold">
          Swipe <ArrowRight className="w-2.5 h-2.5" />
        </span>
      </div>

      <div className="w-full px-6 md:px-12">
        <ProductGrid products={products.slice(0, 10)} isCarouselOnMobile={true} badge={badge} />
      </div>

      <div className="flex items-center justify-center w-full mt-4">
        <a href={viewAllLink} className="text-sm font-bold tracking-wider text-primary hover:text-plum-900 transition-colors flex items-center gap-2 group border-2 border-lavender-100 hover:border-primary px-8 py-3 rounded-full shadow-sm hover:shadow-md">
          VIEW ALL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
