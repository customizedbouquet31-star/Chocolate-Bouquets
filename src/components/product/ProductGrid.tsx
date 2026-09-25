import type { Product } from '../../types';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isCarouselOnMobile?: boolean;
  badge?: string;
}

export default function ProductGrid({ products, isCarouselOnMobile = false, badge }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-plum-900/60">
        <p>No products found in this category.</p>
      </div>
    );
  }

  const gridClasses = isCarouselOnMobile 
    ? "flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 overflow-x-auto snap-x hide-scrollbar pb-6 md:pb-0" 
    : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8";

  return (
    <motion.div 
      className={gridClasses}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }
      }}
    >
      {products.map(product => (
        <motion.div 
          key={product.id} 
          className={isCarouselOnMobile ? "flex-none w-[75vw] md:w-auto snap-center md:snap-align-none" : ""}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ProductCard product={product} badge={badge} />
        </motion.div>
      ))}
    </motion.div>
  );
}
