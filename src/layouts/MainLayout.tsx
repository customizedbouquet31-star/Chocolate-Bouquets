import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/layout/CartDrawer';
import { CartProvider, useCart } from '../contexts/CartContext';

function LayoutContent() {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen flex flex-col font-sans text-plum-900">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#2D162F', color: '#fff', borderRadius: '1rem', padding: '16px 24px', fontSize: '14px', fontWeight: 'bold' } }} />
    </div>
  );
}

export default function MainLayout() {
  return (
    <CartProvider>
      <LayoutContent />
    </CartProvider>
  );
}
