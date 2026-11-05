import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { supabase } from '../../lib/supabase';
import type { Category } from '../../types';

export default function CategoryScroller() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultCategories: Category[] = [
    { id: '64e954cf-585b-4752-beae-82fec0119e1f', name: 'Chocolate Bouquets', slug: 'chocolate-bouquets', image_url: '/categories/chocolate.png', created_at: '' },
    { id: 'ca82cdd8-bfa1-4924-b435-5e0d219ff81a', name: 'Flower Bouquets', slug: 'flower-bouquets', image_url: '/categories/flower.png', created_at: '' },
    { id: '5b00a6c3-0c26-46c2-bfc1-199e4e9449cf', name: 'Polaroid Bouquets', slug: 'polaroid-photo-bouquets', image_url: '/categories/polaroid.png', created_at: '' },
    { id: '0ce6156d-4127-4c6f-860d-5afbf6e9d646', name: "Men's Hampers", slug: 'mens-hampers', image_url: '/categories/mens.png', created_at: '' },
    { id: '9419808b-4314-456d-80fb-07875e50d122', name: "Women's Hampers", slug: 'womens-hampers', image_url: '/categories/womens.png', created_at: '' },
    { id: '168b2dc7-de08-4c20-ae0d-e26b0e0767ab', name: 'Theme Bouquets', slug: 'theme-bouquets', image_url: '/categories/theme.png', created_at: '' },
    { id: 'deeb3f7c-401a-43c0-8098-86008c33786f', name: 'Festive Finds', slug: 'festive-finds', image_url: '/categories/festival.png', created_at: '' },
    { id: '3faad705-d4a5-4c0e-955e-26a0ada9bf03', name: 'Cards & Letters', slug: 'cards-letters', image_url: '/categories/cards.png', created_at: '' },
  ];

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
        if (data && data.length > 0) {
          // Map beautiful custom generated photos
          const mappedData = data.map((cat: any) => {
            let customImg = '';
            if (cat.slug.includes('flower')) customImg = '/categories/flower.png';
            else if (cat.slug.includes('chocolate')) customImg = '/categories/chocolate.png';
            else if (cat.slug.includes('women')) customImg = '/categories/womens.png';
            else if (cat.slug.includes('men')) customImg = '/categories/mens.png';
            else if (cat.slug.includes('festiv')) customImg = '/categories/festival.png';
            else if (cat.slug.includes('theme')) customImg = '/categories/theme.png';
            else if (cat.slug.includes('polaroid')) customImg = '/categories/polaroid.png';
            else if (cat.slug.includes('card')) customImg = '/categories/cards.png';
            else customImg = 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=600&h=800&fit=crop';
            
            return { ...cat, image_url: customImg };
          });
          setCategories(mappedData);
        } else {
          setCategories(defaultCategories);
        }
      } catch (e) {
        setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section id="categories" className="py-4 md:py-6 bg-white overflow-hidden relative">
      <div className="w-full px-4 md:px-12 mb-2 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif font-bold text-2xl md:text-3xl text-black uppercase tracking-wider"
        >
          SHOP BY CATEGORY.
        </motion.h2>
      </div>

      <div className="w-full flex justify-end px-6 mb-1 md:hidden">
        <span className="text-[9px] text-plum-900/40 uppercase tracking-widest flex items-center gap-1 font-bold">
          Swipe <ArrowRight className="w-2.5 h-2.5" />
        </span>
      </div>

      <div className="w-full px-4 md:px-12 pb-2">
        <div className="flex flex-row lg:grid lg:grid-cols-8 gap-4 lg:gap-3 xl:gap-4 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory hide-scrollbar pb-6 lg:pb-4 px-2 lg:px-0">
          {loading ? (
            <div className="p-8 col-span-full text-center">Loading categories...</div>
          ) : (
            categories.map((category, index) => {
              const bgGradients = [
                'bg-gradient-to-br from-lavender-50 to-lavender-100',
                'bg-gradient-to-br from-pink-50 to-rose-100',
                'bg-gradient-to-br from-purple-50 to-fuchsia-100',
                'bg-gradient-to-br from-indigo-50 to-blue-100',
                'bg-gradient-to-br from-rose-50 to-orange-50',
                'bg-gradient-to-br from-fuchsia-50 to-pink-100',
                'bg-gradient-to-br from-violet-50 to-lavender-200'
              ];
              const cardBg = bgGradients[index % bgGradients.length];

              return (
                <a
                  key={category.id}
                  href={`/collection/${category.slug}`}
                  className={`flex-none w-[45vw] md:w-[220px] lg:w-auto flex flex-col aspect-[4/5] rounded-xl relative overflow-hidden group shadow-md hover:shadow-xl transition-all hover:-translate-y-1 ${cardBg} p-2 md:p-3 snap-center lg:snap-align-none`}
                >
                  <div className="absolute top-2 md:top-3 left-2 right-2 md:left-3 md:right-3 bg-white py-2 px-1 rounded shadow-md text-center z-20 group-hover:bg-plum-950 transition-colors">
                    <span className="font-extrabold text-[9px] md:text-xs lg:text-sm uppercase tracking-widest text-plum-950 group-hover:text-white leading-tight block truncate">
                      {category.name}
                    </span>
                  </div>

                  <div className="relative w-full h-full mt-10 md:mt-12 rounded-lg overflow-hidden bg-white/20">
                    {category.image_url && (
                      <img 
                        src={category.image_url} 
                        alt={category.name} 
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform" 
                      />
                    )}
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
