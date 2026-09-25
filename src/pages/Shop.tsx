import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, X } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'Newest Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
];

export default function Shop() {
  const [sort, setSort] = useState('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';

  // Mock filters state
  const [filters, setFilters] = useState({
    customizable: false,
    inStock: true
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*, product_images(image_url, is_primary)'),
        supabase.from('categories').select('*').order('name')
      ]);

      if (productsRes.data) setProducts(productsRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
    if (activeCategory && p.category_id !== activeCategory) return false;
    if (filters.customizable && !p.is_customizable) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.description?.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'new') return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    return a.is_bestseller === b.is_bestseller ? 0 : a.is_bestseller ? -1 : 1;
  });

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Banner */}
      <section className="relative pt-8 pb-6 md:pt-10 md:pb-8 overflow-hidden bg-gradient-to-br from-lavender-50 via-white to-primary/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="w-full px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">The Collection</span>
            <h1 className="font-serif text-5xl md:text-7xl text-plum-950 mb-3 leading-tight">All Products</h1>
            <p className="text-lg text-plum-900/60 max-w-2xl mx-auto">
              Browse our complete collection of premium gifting options, meticulously crafted for your special moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full px-4 md:px-12 pb-12 md:pb-20 -mt-4 relative z-20">
        
        {/* Toolbar (Mobile Filters / Sorting) */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-lavender-100 mb-8 gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pl-2">
            <span className="text-sm font-bold text-plum-900/50 uppercase tracking-wider hidden md:block">
              Showing {sortedProducts.length} Results
            </span>
            {searchFilter && (
              <div className="flex items-center gap-2 px-4 py-2 bg-lavender-50 rounded-full text-xs font-bold tracking-widest text-plum-950 border border-lavender-100">
                SEARCH: "{searchFilter}"
                <button 
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                  className="p-1 hover:bg-white rounded-full transition-colors ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          
          {/* Custom Sort Dropdown */}
          <div className="relative w-full md:w-auto">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full md:w-64 flex items-center justify-between px-6 py-3 bg-lavender-50 text-plum-950 text-sm font-bold tracking-wider rounded-xl hover:bg-lavender-100 transition-colors"
            >
              <span>{sortOptions.find(o => o.id === sort)?.label.toUpperCase()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-lavender-100 overflow-hidden z-50"
                >
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => { setSort(option.id); setIsSortOpen(false); }}
                      className={`w-full text-left px-6 py-3 text-sm font-bold tracking-wider transition-colors ${sort === option.id ? 'bg-primary text-white' : 'text-plum-950 hover:bg-lavender-50'}`}
                    >
                      {option.label.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
              
              <h2 className="font-bold text-xs uppercase tracking-widest text-plum-900/40 mb-6">Categories</h2>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold tracking-wider transition-all ${!activeCategory ? 'bg-plum-950 text-white shadow-md' : 'text-plum-900/70 hover:bg-lavender-50'}`}
                >
                  ALL ITEMS
                </button>
                {loading ? (
                  <div className="px-4 py-2 text-sm text-plum-900/40 animate-pulse">Loading categories...</div>
                ) : (
                  categories.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => setActiveCategory(c.id)}
                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all ${activeCategory === c.id ? 'bg-plum-950 text-white shadow-md' : 'text-plum-900/70 hover:bg-lavender-50'}`}
                    >
                      {c.name}
                    </button>
                  ))
                )}
              </div>

              <div className="w-full h-px bg-lavender-100 my-8"></div>

              <h2 className="font-bold text-xs uppercase tracking-widest text-plum-900/40 mb-6">Filters</h2>
              <div className="flex flex-col gap-4">
                
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={filters.customizable}
                      onChange={(e) => setFilters(f => ({ ...f, customizable: e.target.checked }))}
                    />
                    <div className="w-6 h-6 rounded-lg border-2 border-lavender-200 bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center group-hover:border-primary/50">
                      <Check className={`w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity`} strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-plum-950 tracking-wider">CUSTOMIZABLE</span>
                </label>

                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={filters.inStock}
                      onChange={(e) => setFilters(f => ({ ...f, inStock: e.target.checked }))}
                    />
                    <div className="w-6 h-6 rounded-lg border-2 border-lavender-200 bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center group-hover:border-primary/50">
                      <Check className={`w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity`} strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-plum-950 tracking-wider">IN STOCK</span>
                </label>

              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-lavender-200 border-t-primary rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <ProductGrid products={sortedProducts} />
                
                {sortedProducts.length > 0 && (
                  <div className="mt-10 flex justify-center">
                    <button className="px-10 py-4 bg-white border-2 border-plum-950 text-plum-950 font-bold tracking-widest text-sm rounded-full hover:bg-plum-950 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-plum-950/20 uppercase">
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
