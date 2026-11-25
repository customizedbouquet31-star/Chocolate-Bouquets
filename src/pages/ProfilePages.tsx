import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch, HeartCrack, Map, CreditCard, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/product/ProductCard';
import type { Address, SavedCard } from '../types';

interface OrderRecord {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export function ProfileOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_email', user.email)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setOrders(data);
        }
      } catch (err) {
        console.error('Error fetching user orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full"><Truck className="w-3.5 h-3.5" /> Shipped</span>;
      case 'delivered':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full"><AlertCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-plum-900/60 font-medium">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-500 py-12">
        <div className="w-24 h-24 bg-lavender-50 rounded-full flex items-center justify-center mb-6">
          <PackageSearch className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-plum-950 mb-3">No Orders Yet</h2>
        <p className="text-plum-900/60 max-w-sm mb-8">
          Looks like you haven't placed any orders yet. Discover our handcrafted bouquets and hampers.
        </p>
        <Link to="/shop" className="px-8 py-3.5 bg-primary text-white font-bold tracking-wider rounded-full hover:bg-primary-hover shadow-md transition-transform transform hover:-translate-y-0.5">
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-serif font-bold text-plum-950 mb-6">Order History</h2>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="p-5 md:p-6 bg-white rounded-2xl border border-lavender-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-lavender-100/60">
              <div>
                <span className="text-xs font-bold tracking-wider text-plum-900/50 uppercase">Order ID</span>
                <p className="font-mono text-sm font-bold text-plum-950">#{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider text-plum-900/50 uppercase">Date</span>
                <p className="text-sm font-medium text-plum-900/80">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider text-plum-900/50 uppercase">Total</span>
                <p className="text-base font-bold text-plum-950">Rs. {Number(order.total_amount).toLocaleString()}</p>
              </div>
              <div>
                {getStatusBadge(order.status)}
              </div>
            </div>
            <div className="pt-3 text-xs text-plum-900/70">
              <span className="font-semibold text-plum-950">Delivery Address: </span>
              {order.delivery_address}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileWishlist() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-lavender-50 rounded-full flex items-center justify-center mb-6">
          <HeartCrack className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-plum-950 mb-3">Your Wishlist is Empty</h2>
        <p className="text-plum-900/60 max-w-sm mb-8">
          Save your favorite items here so you never lose track of them.
        </p>
        <Link to="/shop" className="px-8 py-3.5 bg-primary text-white font-bold tracking-wider rounded-full hover:bg-primary-hover shadow-md transition-transform transform hover:-translate-y-0.5">
          EXPLORE PRODUCTS
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-serif font-bold text-plum-950 mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export function ProfileAddresses() {
  const { user, updateUserMetadata } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', street: '', city: '', state: '', pincode: '', phone: '' });

  const addresses = (user?.user_metadata?.addresses || []) as Address[];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress = { id: crypto.randomUUID(), ...formData };
    const newAddresses = [...addresses, newAddress];
    await updateUserMetadata({ addresses: newAddresses });
    setIsAdding(false);
    setFormData({ name: '', street: '', city: '', state: '', pincode: '', phone: '' });
  };

  const handleDelete = async (id: string) => {
    const newAddresses = addresses.filter(a => a.id !== id);
    await updateUserMetadata({ addresses: newAddresses });
  };

  if (isAdding) {
    return (
      <div className="animate-in fade-in duration-500">
        <h2 className="text-2xl font-serif font-bold text-plum-950 mb-6">Add New Address</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-lg">
          <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
          <input required type="text" placeholder="Street Address" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
          <div className="grid grid-cols-2 gap-4">
            <input required type="text" placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
            <input required type="text" placeholder="State" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input required type="text" placeholder="Pincode" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
            <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 bg-lavender-50 text-plum-900 font-bold rounded-xl hover:bg-lavender-100 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-md transition-colors">Save Address</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-plum-950">Saved Addresses</h2>
        <button onClick={() => setIsAdding(true)} className="px-5 py-2 bg-lavender-50 text-primary font-bold rounded-full hover:bg-lavender-100 transition-colors shadow-sm text-sm">
          + Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-2xl border border-lavender-50">
          <Map className="w-10 h-10 text-primary/40 mb-4" />
          <p className="text-plum-900/60 max-w-sm mb-6">You haven't added any delivery addresses yet.</p>
          <button onClick={() => setIsAdding(true)} className="px-6 py-2.5 bg-primary text-white font-bold tracking-wider rounded-full hover:bg-primary-hover shadow-md text-sm">ADD ADDRESS</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="p-5 rounded-2xl border border-lavender-100 bg-white shadow-sm flex flex-col items-start gap-1">
              <h4 className="font-bold text-plum-950">{addr.name}</h4>
              <p className="text-sm text-plum-900/70">{addr.street}</p>
              <p className="text-sm text-plum-900/70">{addr.city}, {addr.state} {addr.pincode}</p>
              <p className="text-sm text-plum-900/70 mt-1 flex items-center gap-2">📞 {addr.phone}</p>
              <button onClick={() => handleDelete(addr.id)} className="text-red-500 text-xs font-bold mt-3 hover:underline">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProfileCards() {
  const { user, updateUserMetadata } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ nameOnCard: '', cardNumber: '', expiry: '' });

  const cards = (user?.user_metadata?.cards || []) as SavedCard[];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate masking
    const masked = '**** **** **** ' + formData.cardNumber.slice(-4);
    const newCard = { id: crypto.randomUUID(), nameOnCard: formData.nameOnCard, cardNumber: masked, expiry: formData.expiry };
    const newCards = [...cards, newCard];
    await updateUserMetadata({ cards: newCards });
    setIsAdding(false);
    setFormData({ nameOnCard: '', cardNumber: '', expiry: '' });
  };

  const handleDelete = async (id: string) => {
    const newCards = cards.filter(c => c.id !== id);
    await updateUserMetadata({ cards: newCards });
  };

  if (isAdding) {
    return (
      <div className="animate-in fade-in duration-500">
        <h2 className="text-2xl font-serif font-bold text-plum-950 mb-6">Add New Card</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-lg">
          <input required type="text" placeholder="Name on Card" value={formData.nameOnCard} onChange={e => setFormData({...formData, nameOnCard: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
          <input required type="text" placeholder="Card Number (16 digits)" maxLength={16} value={formData.cardNumber} onChange={e => setFormData({...formData, cardNumber: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
          <input required type="text" placeholder="Expiry (MM/YY)" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary" />
          <div className="flex gap-4 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 bg-lavender-50 text-plum-900 font-bold rounded-xl hover:bg-lavender-100 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-md transition-colors">Save Card</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-plum-950">Saved Cards</h2>
        <button onClick={() => setIsAdding(true)} className="px-5 py-2 bg-lavender-50 text-primary font-bold rounded-full hover:bg-lavender-100 transition-colors shadow-sm text-sm">
          + Add New
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-2xl border border-lavender-50">
          <CreditCard className="w-10 h-10 text-primary/40 mb-4" />
          <p className="text-plum-900/60 max-w-sm mb-6">You haven't saved any cards yet.</p>
          <button onClick={() => setIsAdding(true)} className="px-6 py-2.5 bg-primary text-white font-bold tracking-wider rounded-full hover:bg-primary-hover shadow-md text-sm">ADD CARD</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="p-5 rounded-2xl border border-lavender-100 bg-white shadow-sm flex flex-col items-start gap-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-lavender-50 rounded-bl-full"></div>
              <h4 className="font-bold text-plum-950 relative z-10">{card.nameOnCard}</h4>
              <p className="text-lg font-mono text-plum-900/80 mt-1 relative z-10 tracking-widest">{card.cardNumber}</p>
              <p className="text-sm text-plum-900/50 relative z-10 mt-1">Exp: {card.expiry}</p>
              <button onClick={() => handleDelete(card.id)} className="text-red-500 text-xs font-bold mt-3 hover:underline relative z-10">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
