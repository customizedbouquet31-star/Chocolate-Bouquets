import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

export default function Collection() {
  const { categoryId } = useParams<{ categoryId: string }>(); // acts as slug
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollection() {
      setLoading(true);
      // Fetch category by slug
      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categoryId)
        .single();
        
      if (catData) {
        setCategory(catData);
        // Fetch products in category
        const { data: prodData } = await supabase
          .from('products')
          .select('*, product_images(image_url, is_primary)')
          .eq('category_id', catData.id)
          .order('created_at', { ascending: false });
          
        if (prodData) setProducts(prodData);
      }
      setLoading(false);
    }
    if (categoryId) fetchCollection();
  }, [categoryId]);

  const title = category?.name || categoryId?.replace('-', ' ');

  return (
    <div className="flex flex-col">
      {/* Collection Hero */}
      <section className="bg-lavender-50/50 py-16 md:py-24 border-b border-lavender-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-plum-950 mb-6 capitalize">
            {title}
          </h1>
          <p className="text-plum-900/70 max-w-2xl mx-auto text-lg">
            Explore our curated selection of {title?.toLowerCase()} crafted with love and attention to detail.
          </p>
        </div>
      </section>

      {/* Collection Content */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-lavender-100">
            <span className="text-sm font-medium text-plum-900/60">{products.length} Products</span>
            
            <select className="bg-white border border-lavender-200 text-plum-950 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 outline-none font-medium">
              <option>Sort by Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="py-12 text-center text-plum-900/60">Loading products...</div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>
    </div>
  );
}
