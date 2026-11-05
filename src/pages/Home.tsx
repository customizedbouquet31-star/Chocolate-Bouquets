import { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import CategoryScroller from '../components/home/CategoryScroller';
import ProductCarousel from '../components/home/ProductCarousel';
import InstagramReels from '../components/home/InstagramReels';
import Reviews from '../components/home/Reviews';
import Coupon from '../components/home/Coupon';
import CustomizationCTA from '../components/home/CustomizationCTA';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

export default function Home() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newLaunches, setNewLaunches] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(image_url, is_primary)')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        if (data && data.length > 0) {
          const bs = data.filter(p => p.is_bestseller);
          const nl = data.filter(p => p.is_new);
          setBestSellers(bs.length > 0 ? bs : data.slice(0, 10));
          setNewLaunches(nl.length > 0 ? nl : data.slice(0, 10));
        }
      } catch (e) {
        console.error('Failed to load products from database', e);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <main>
        <Hero />
        <CategoryScroller />
        <ProductCarousel 
          title="BEST SELLERS" 
          products={bestSellers} 
          bgColor="bg-lavender-100"
        />
        <InstagramReels />
        <ProductCarousel 
          title="NEW LAUNCHES" 
          products={newLaunches} 
          bgColor="bg-lavender-100"
        />
        <Coupon />
        <Reviews />
        <CustomizationCTA />
      </main>
    </div>
  );
}
