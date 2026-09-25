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
      const { data } = await supabase
        .from('products')
        .select('*, product_images(image_url, is_primary)')
        .order('created_at', { ascending: false });

      if (data) {
        setBestSellers(data.filter(p => p.is_bestseller));
        setNewLaunches(data.filter(p => p.is_new));
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
