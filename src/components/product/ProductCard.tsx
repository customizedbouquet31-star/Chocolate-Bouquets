import type { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  badge?: string;
  size?: 'default' | 'large';
}

export default function ProductCard({ product, badge, size = 'default' }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  
  const wishlisted = isWishlisted(product.id);
  
  const primaryImage = product.product_images?.find(img => img.is_primary)?.image_url 
    || product.product_images?.[0]?.image_url 
    || 'https://via.placeholder.com/400x400?text=No+Image';

  const discountPercent = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100) 
    : 0;

  // CATEGORY / COLLECTION PAGE: Refined, balanced compact card size
  if (size === 'large') {
    return (
      <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-lavender-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 h-full">
        {/* Image Container */}
        <a href={`/product/${product.id}`} className="relative aspect-square bg-lavender-50/40 overflow-hidden block">
          <img 
            src={primaryImage} 
            alt={product.name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
          />
          
          {/* Badges - Top Left Stacked */}
          <div className="absolute top-2 left-2 flex flex-col items-start gap-1 z-10">
            {badge && (
              <span className="px-2 py-0.5 bg-plum-950 text-white text-[10px] font-bold tracking-wider uppercase rounded shadow-sm">
                {badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold tracking-wider uppercase rounded shadow-sm">
                SAVE {discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (wishlisted) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            }}
            className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all transform hover:scale-110 z-10"
            title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-plum-900/60 hover:text-red-500'}`} />
          </button>
        </a>

        {/* Content */}
        <div className="p-3 sm:p-3.5 flex flex-col flex-1 gap-2">
          <a href={`/product/${product.id}`}>
            <h3 className="font-semibold text-xs sm:text-sm text-plum-950 tracking-wide line-clamp-2 hover:text-primary transition-colors leading-snug min-h-[2.4rem]">
              {product.name}
            </h3>
          </a>

          {/* Pricing */}
          <div className="flex items-baseline flex-wrap gap-1.5 mt-auto pt-1">
            <span className="text-sm sm:text-base font-bold text-plum-950">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.original_price && (
              <>
                <span className="text-[11px] sm:text-xs text-plum-900/40 line-through">
                  Rs. {product.original_price.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  {discountPercent}% Off
                </span>
              </>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-2 pt-0.5">
            <button 
              className="w-full py-2 sm:py-2.5 bg-plum-950 text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase hover:bg-primary transition-all duration-300 rounded-lg shadow-sm hover:shadow flex items-center justify-center gap-1.5 active:scale-[0.99]"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT SIZE: Strictly for Home page / carousels (Original compact styling)
  return (
    <a href={`/product/${product.id}`} className="group flex flex-col bg-white hover:shadow-lg transition-all duration-300 h-full">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden border border-gray-100">
        <img 
          src={primaryImage} 
          alt={product.name} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
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
