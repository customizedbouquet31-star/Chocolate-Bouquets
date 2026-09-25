import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve } from 'path';
import ws from 'ws';

// Load .env
dotenv.config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  realtime: { transport: ws }
});

async function seed() {
  console.log('Seeding Database with Demo Data...');

  // 1. Insert Categories
  const categoriesToInsert = [
    { name: 'Flower Bouquets', slug: 'flower-bouquets' },
    { name: 'Chocolate Bouquets', slug: 'chocolate-bouquets' },
    { name: 'Men\'s Hampers', slug: 'mens-hampers' },
    { name: 'Women\'s Hampers', slug: 'womens-hampers' },
    { name: 'Festival Finds', slug: 'festival-finds' },
    { name: 'Theme Bouquets', slug: 'theme-bouquets' },
    { name: 'Polaroid Photo Bouquets', slug: 'polaroid-photo-bouquets' },
    { name: 'Cards & Letters', slug: 'cards-and-letters' }
  ];

  console.log('Inserting categories...');
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .upsert(categoriesToInsert, { onConflict: 'slug' })
    .select();

  if (catError) {
    console.error('Error inserting categories:', catError);
    return;
  }

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.slug] = cat.id;
    return acc;
  }, {});

  // 2. Insert Products
  const productsToInsert = [
    {
      name: 'Premium Ferrero Rocher Bouquet',
      description: 'A luxurious arrangement of 24 Ferrero Rocher chocolates wrapped in premium golden and lavender paper.',
      price: 1499,
      original_price: 1999,
      category_id: categoryMap['chocolate-bouquets'],
      is_new: true,
      is_bestseller: true,
      is_customizable: true
    },
    {
      name: 'Classic Dairy Milk Arrangement',
      description: 'Simple yet elegant. Perfect for sweet lovers. Contains 15 Dairy Milk silk chocolates.',
      price: 899,
      original_price: 1199,
      category_id: categoryMap['chocolate-bouquets'],
      is_new: false,
      is_bestseller: true,
      is_customizable: true
    },
    {
      name: 'Red Roses & Lindt Combo',
      description: 'The ultimate romantic gesture. Fresh red roses paired with premium Lindt truffles.',
      price: 2499,
      original_price: 2999,
      category_id: categoryMap['flower-bouquets'],
      is_new: true,
      is_bestseller: false,
      is_customizable: false
    },
    {
      name: 'Gentleman\'s Grooming Hamper',
      description: 'A complete care package for him including premium face wash, beard oil, and dark chocolates.',
      price: 1999,
      original_price: null,
      category_id: categoryMap['mens-hampers'],
      is_new: false,
      is_bestseller: false,
      is_customizable: true
    },
    {
      name: 'Spa Day Women\'s Hamper',
      description: 'Relaxation in a box. Contains bath salts, scented candles, and assorted chocolates.',
      price: 2199,
      original_price: 2599,
      category_id: categoryMap['womens-hampers'],
      is_new: false,
      is_bestseller: true,
      is_customizable: true
    },
    {
      name: 'Diwali Special Sweet Box',
      description: 'A beautiful festive box containing traditional sweets and modern chocolates.',
      price: 1299,
      original_price: null,
      category_id: categoryMap['festival-finds'],
      is_new: true,
      is_bestseller: false,
      is_customizable: false
    }
  ];

  console.log('Inserting products...');
  const { data: products, error: prodError } = await supabase
    .from('products')
    .insert(productsToInsert)
    .select();

  if (prodError) {
    console.error('Error inserting products:', prodError);
    return;
  }

  // 3. Insert Product Images (Using Unsplash placeholders)
  const imagesToInsert = products.map((product) => {
    return {
      product_id: product.id,
      image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&h=800&fit=crop',
      is_primary: true
    };
  });

  console.log('Inserting product images...');
  const { error: imgError } = await supabase
    .from('product_images')
    .insert(imagesToInsert);

  if (imgError) {
    console.error('Error inserting images:', imgError);
    return;
  }

  console.log('Successfully seeded database with demo data!');
}

seed();
