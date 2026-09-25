import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Minus, Plus, MessageCircle, MapPin, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [pincode, setPincode] = useState('');
  
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('*, product_images(image_url, is_primary)')
        .eq('id', productId)
        .single();
        
      if (data) {
        setProduct(data);
        setActiveImage(data.product_images?.find((i: any) => i.is_primary)?.image_url || data.product_images?.[0]?.image_url || 'https://via.placeholder.com/600x800?text=No+Image');
      } else {
        navigate('/shop');
      }
      setLoading(false);
    }
    if (productId) fetchProduct();
  }, [productId, navigate]);

  if (loading) {
    return <div className="pt-24 pb-20 text-center">Loading product...</div>;
  }
  
  if (!product) return null;

  const images = product.product_images?.map(i => i.image_url) || [activeImage];
  const originalPrice = product.original_price;
  const isNew = product.is_new;
  const isCustomizable = product.is_customizable;

  return (
    <div className="pt-8 pb-20 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-[4/5] bg-lavender-50 rounded-3xl overflow-hidden relative border border-lavender-100 flex items-center justify-center">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
              {isNew && (
                <span className="absolute top-6 left-6 px-3 py-1.5 bg-white text-plum-950 text-xs font-bold tracking-wider rounded-md shadow-sm">
                  NEW
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square bg-lavender-50 rounded-xl overflow-hidden border cursor-pointer transition-colors flex items-center justify-center ${activeImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-lavender-100 hover:border-primary'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <span className="text-sm font-medium text-plum-900/60">(24 Reviews)</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl text-plum-950 mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-4 mb-6">
              <span className="text-3xl font-bold text-plum-950">₹{product.price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-lg text-plum-900/40 line-through mb-1">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
              {originalPrice && (
                <span className="text-sm font-bold text-red-500 mb-1.5">
                  Save ₹{(originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-plum-900/80 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="border-t border-b border-lavender-100 py-6 mb-8 flex flex-col gap-6">
              {/* Delivery Check */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-plum-950 tracking-wide">CHECK DELIVERY</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-plum-900/40" />
                    <input 
                      type="text" 
                      placeholder="Enter Pincode" 
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-lavender-50 border border-lavender-200 rounded-xl focus:outline-none focus:border-primary text-plum-950"
                    />
                  </div>
                  <button className="px-6 py-3 bg-white border border-lavender-200 rounded-xl font-bold text-plum-950 hover:bg-lavender-50 transition-colors">
                    CHECK
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-plum-950 tracking-wide">QUANTITY</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-lavender-50 border border-lavender-200 rounded-xl p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-white rounded-lg transition-colors text-plum-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-plum-950">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-white rounded-lg transition-colors text-plum-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-plum-950 text-white font-bold tracking-wider rounded-full hover:bg-plum-900 shadow-xl shadow-plum-900/20 transition-all hover:-translate-y-1">
                  ADD TO CART
                </button>
                <button className="p-4 bg-white border border-lavender-200 rounded-full text-plum-900 hover:text-red-500 hover:border-red-500 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
              
              {isCustomizable && (
                <a 
                  href="https://wa.me/919315274580"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366]/10 text-[#128C7E] font-bold tracking-wider rounded-full hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  CUSTOMIZE VIA WHATSAPP
                </a>
              )}
            </div>

            {/* Accordions (Mock) */}
            <div className="flex flex-col border-t border-lavender-100">
              <details className="group py-4 border-b border-lavender-100">
                <summary className="flex justify-between items-center font-bold text-plum-950 cursor-pointer list-none">
                  Product Details
                  <span className="transition group-open:rotate-180">
                    <Plus className="w-5 h-5" />
                  </span>
                </summary>
                <div className="text-plum-900/70 mt-4 leading-relaxed text-sm">
                  Each bouquet is carefully handcrafted by our expert artisans. We use only premium materials and the freshest chocolates. This particular arrangement includes premium wrapping paper, satin ribbons, and a personalized message card.
                </div>
              </details>
              <details className="group py-4 border-b border-lavender-100">
                <summary className="flex justify-between items-center font-bold text-plum-950 cursor-pointer list-none">
                  Customization Options
                  <span className="transition group-open:rotate-180">
                    <Plus className="w-5 h-5" />
                  </span>
                </summary>
                <div className="text-plum-900/70 mt-4 leading-relaxed text-sm">
                  You can customize the color theme, the type of chocolates (Ferrero Rocher, Dairy Milk, Lindt, etc.), and the overall size of the bouquet. Add photos or personalized notes for an extra special touch.
                </div>
              </details>
              <details className="group py-4 border-b border-lavender-100">
                <summary className="flex justify-between items-center font-bold text-plum-950 cursor-pointer list-none">
                  Delivery Information
                  <span className="transition group-open:rotate-180">
                    <Plus className="w-5 h-5" />
                  </span>
                </summary>
                <div className="text-plum-900/70 mt-4 leading-relaxed text-sm">
                  We offer Pan-India shipping. Standard delivery takes 3-5 business days. Express delivery is available for Noida/Delhi regions within 24-48 hours. All packages are securely packed to ensure the chocolates don't melt or get damaged.
                </div>
              </details>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
