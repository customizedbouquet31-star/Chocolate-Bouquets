import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingBag, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { InstagramIcon } from '../components/icons/InstagramIcon';

export default function AdminLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate('/admin');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/admin');
    });

    // Request notification permission for Android/Desktop PWA
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Supabase Realtime Listener for New Orders
    const ordersSubscription = supabase
      .channel('public:orders')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (_payload) => {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New Order Received! 🛍️', {
              body: `A new order has just been placed. Check your dashboard!`,
              icon: '/logo.png',
              badge: '/logo.png',
              vibrate: [200, 100, 200]
            } as any);
          } else {
            alert('New Order Received! 🛍️');
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(ordersSubscription);
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lavender-50">
        <div className="w-10 h-10 border-4 border-lavender-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Reels', path: '/admin/reels', icon: InstagramIcon },
  ];

  return (
    <div className="min-h-screen bg-lavender-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-plum-950/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-lavender-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-lavender-100">
          <span className="font-serif font-bold text-lg text-plum-950">Admin Panel</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex flex-col h-[calc(100vh-4rem)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <a
                key={item.name}
                href={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-plum-900/70 hover:bg-lavender-50 hover:text-primary'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                {item.name}
              </a>
            );
          })}

          <button 
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-lavender-100 flex items-center px-4 lg:px-8 shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 mr-4 rounded-lg hover:bg-lavender-50 lg:hidden"
          >
            <Menu className="w-6 h-6 text-plum-900" />
          </button>
          
          <div className="flex-1"></div>
          
          <a href="/" target="_blank" className="text-sm font-medium text-primary hover:underline">
            View Store &rarr;
          </a>
        </header>
        
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
