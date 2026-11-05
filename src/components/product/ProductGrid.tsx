import type { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isCarouselOnMobile?: boolean;
  badge?: string;
  size?: 'default' | 'large';
}

export default function ProductGrid({ 
  products, 
  isCarouselOnMobile = false, 
  badge,
  size = 'default' 
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-plum-900/60 font-medium">
        <p>No products found in this category.</p>
      </div>
    );
  }

  // Category page grid: compact, well-proportioned layout with 4-5 columns on large screens
  // Default size: original compact grid for Home page & carousels
  const gridClasses = size === 'large'
    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5 sm:gap-5"
    : isCarouselOnMobile 
      ? "flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 md:pb-0" 
      : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8";

  const mobileItemClass = size === 'large'
    ? "w-full"
    : isCarouselOnMobile 
      ? "flex-none w-[75vw] md:w-auto snap-center md:snap-align-none" 
      : "";

  return (
    <div className={gridClasses}>
      {products.map(product => (
        <div key={product.id} className={mobileItemClass}>
          <ProductCard product={product} badge={badge} size={size} />
        </div>
      ))}
    </div>
  );
}
