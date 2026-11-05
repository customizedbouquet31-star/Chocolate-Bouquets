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

  const refreshStats = async () => {
    setLoading(true);
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
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-plum-950">Dashboard Overview</h1>
        <button 
          onClick={refreshStats}
          className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
        >
          Refresh Data
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
