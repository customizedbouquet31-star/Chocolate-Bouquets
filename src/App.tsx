import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import SplashScreen from './components/common/SplashScreen';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

// Lazy-loaded routes for minimal initial bundle & ultra-low latency
const Shop = lazy(() => import('./pages/Shop'));
const Collection = lazy(() => import('./pages/Collection'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CustomerLogin = lazy(() => import('./pages/CustomerLogin'));
const ProfileLayout = lazy(() => import('./pages/ProfileLayout'));
const ProfileOrders = lazy(() => import('./pages/ProfilePages').then(m => ({ default: m.ProfileOrders })));
const ProfileWishlist = lazy(() => import('./pages/ProfilePages').then(m => ({ default: m.ProfileWishlist })));
const ProfileAddresses = lazy(() => import('./pages/ProfilePages').then(m => ({ default: m.ProfileAddresses })));
const ProfileCards = lazy(() => import('./pages/ProfilePages').then(m => ({ default: m.ProfileCards })));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin lazy routes
const Login = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Products = lazy(() => import('./pages/admin/Products'));
const Categories = lazy(() => import('./pages/admin/Categories'));
const Reels = lazy(() => import('./pages/admin/Reels'));

function App() {
  // Prefetch key storefront route chunks on idle for near-zero route transition latency
  useEffect(() => {
    const prefetch = () => {
      void import('./pages/Shop');
      void import('./pages/Collection');
      void import('./pages/ProductDetail');
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(prefetch, { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const timer = setTimeout(prefetch, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <SplashScreen />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-plum-900/30 text-xs font-bold tracking-widest uppercase">Loading...</div>}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/collection/:categoryId" element={<Collection />} />
                <Route path="/category/:categoryId" element={<Collection />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                
                <Route path="/profile" element={<ProfileLayout />}>
                  <Route index element={<Navigate to="/profile/orders" replace />} />
                  <Route path="orders" element={<ProfileOrders />} />
                  <Route path="wishlist" element={<ProfileWishlist />} />
                  <Route path="addresses" element={<ProfileAddresses />} />
                  <Route path="cards" element={<ProfileCards />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
              
              <Route path="/login" element={<CustomerLogin />} />
              
              <Route path="/admin" element={<Login />} />
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/admin/categories" element={<Categories />} />
                <Route path="/admin/reels" element={<Reels />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
