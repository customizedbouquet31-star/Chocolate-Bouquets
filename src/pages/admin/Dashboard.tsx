import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Package, Tags, ShoppingBag } from 'lucide-react';
import { InstagramIcon } from '../../components/icons/InstagramIcon';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    reels: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: productsCount },
        { count: categoriesCount },
        { count: ordersCount },
        { count: reelsCount }
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('reels').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        products: productsCount || 0,
        categories: categoriesCount || 0,
        orders: ordersCount || 0,
        reels: reelsCount || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Products', value: stats.products, icon: Package, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Categories', value: stats.categories, icon: Tags, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Instagram Reels', value: stats.reels, icon: () => <InstagramIcon className="w-6 h-6 text-pink-500" />, color: 'text-pink-500', bg: 'bg-pink-50' },
  ];

  const seedData = async () => {
    if (!confirm('This will insert demo products and categories. Continue?')) return;
    
    try {
      const categoriesToInsert = [
        { name: 'Flower Bouquets', slug: 'flower-bouquets' },
        { name: 'Chocolate Bouquets', slug: 'chocolate-bouquets' },
        { name: 'Men\'s Hamper', slug: 'mens-hamper' },
        { name: 'Women\'s Hamper', slug: 'womens-hamper' },
        { name: 'Festive Finds', slug: 'festive-finds' },
        { name: 'Theme Bouquets', slug: 'theme-bouquets' },
        { name: 'Polaroid Photo Bouquet', slug: 'polaroid-photo-bouquet' }
      ];
      
      const { data: categories, error: catError } = await supabase
        .from('categories')
        .upsert(categoriesToInsert, { onConflict: 'slug' })
        .select();

      if (catError) throw catError;
      
      const categoryMap = categories.reduce((acc: any, cat: any) => {
        acc[cat.slug] = cat.id;
        return acc;
      }, {});

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
          category_id: categoryMap['mens-hamper'],
          is_new: false,
          is_bestseller: false,
          is_customizable: true
        },
        {
          name: 'Diwali Special Sweet Box',
          description: 'A beautiful festive box containing traditional sweets and modern chocolates.',
          price: 1299,
          original_price: null,
          category_id: categoryMap['festive-finds'],
          is_new: true,
          is_bestseller: false,
          is_customizable: false
        },
        {
          name: 'Spa Day Women\'s Hamper',
          description: 'Relaxation in a box. Contains bath salts, scented candles, and assorted chocolates.',
          price: 2199,
          original_price: 2599,
          category_id: categoryMap['womens-hamper'],
          is_new: false,
          is_bestseller: true,
          is_customizable: true
        }
      ];

      const { data: products, error: prodError } = await supabase
        .from('products')
        .insert(productsToInsert)
        .select();

      if (prodError) throw prodError;

      const imagesToInsert = products.map((product: any) => ({
        product_id: product.id,
        image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&h=800&fit=crop',
        is_primary: true
      }));

      const { error: imgError } = await supabase.from('product_images').insert(imagesToInsert);
      if (imgError) throw imgError;

      alert('Demo data successfully added!');
      window.location.reload();
    } catch (e: any) {
      alert('Error seeding data: ' + e.message);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-plum-950">Dashboard Overview</h1>
        <button 
          onClick={seedData}
          className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
        >
          Add Demo Data
        </button>
      </div>
      
      {loading ? (
        <div className="text-plum-900/60">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-lavender-100 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-plum-900/60 uppercase tracking-wider mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-plum-950">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
