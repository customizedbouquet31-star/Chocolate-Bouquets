import type { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, badge }: { product: Product, badge?: string }) {
  const { addToCart } = useCart();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  
  const wishlisted = isWishlisted(product.id);
  
  const primaryImage = product.product_images?.find(img => img.is_primary)?.image_url 
    || product.product_images?.[0]?.image_url 
    || 'https://via.placeholder.com/400x400?text=No+Image';

  const discountPercent = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100) 
    : 0;

  return (
    <a href={`/product/${product.id}`} className="group flex flex-col bg-white hover:shadow-lg transition-all duration-300 h-full">
      
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden border border-gray-100">
        <img 
          src={primaryImage} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Badges - Top Left Stacked */}
        <div className="absolute top-0 left-0 flex flex-col items-start">
          {badge && (
            <span className="px-2 py-1 bg-black text-white text-[8px] sm:text-[9px] font-bold tracking-widest uppercase">
              {badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-1 bg-black text-white text-[8px] sm:text-[9px] font-bold tracking-widest uppercase mt-[1px]">
              SAVE {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            if (wishlisted) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist(product);
            }
          }}
          className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all transform hover:scale-110 z-10"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="pt-3 pb-2 px-1 flex flex-col flex-1 gap-1.5">

        <h3 className="font-bold text-[9px] sm:text-[10px] text-black uppercase tracking-wider line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-center flex-wrap gap-1 mt-auto pt-1">
          <span className="text-[10px] sm:text-xs font-bold text-black">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.original_price && (
            <>
              <span className="text-[8px] sm:text-[9px] text-gray-400 line-through">
                Rs. {product.original_price.toLocaleString()}
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-green-600">
                | {discountPercent}% Off
              </span>
            </>
          )}
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <div className="mt-1 pt-1 pb-2">
        <button 
          className="w-full py-2.5 bg-black text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors rounded-sm"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </a>
  );
}
