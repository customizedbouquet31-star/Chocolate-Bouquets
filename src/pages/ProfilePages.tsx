import { PackageSearch, HeartCrack, Map, CreditCard } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/product/ProductCard';

export function ProfileOrders() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-lavender-50 rounded-full flex items-center justify-center mb-6">
        <PackageSearch className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-plum-950 mb-3">No Orders Yet</h2>
      <p className="text-plum-900/60 max-w-sm mb-8">
        Looks like you haven't placed any orders. Discover our beautiful bouquets and make someone's day special.
      </p>
      <a href="/shop" className="px-8 py-3.5 bg-primary text-white font-bold tracking-wider rounded-full hover:bg-primary-hover shadow-md transition-transform transform hover:-translate-y-0.5">
        START SHOPPING
      </a>
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
        <a href="/shop" className="px-8 py-3.5 bg-primary text-white font-bold tracking-wider rounded-full hover:bg-primary-hover shadow-md transition-transform transform hover:-translate-y-0.5">
          EXPLORE PRODUCTS
        </a>
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
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-lavender-50 rounded-full flex items-center justify-center mb-6">
        <Map className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-plum-950 mb-3">No Saved Addresses</h2>
      <p className="text-plum-900/60 max-w-sm mb-8">
        You haven't added any delivery addresses yet. Add one during checkout to save it for later!
      </p>
    </div>
  );
}

export function ProfileCards() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-lavender-50 rounded-full flex items-center justify-center mb-6">
        <CreditCard className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-plum-950 mb-3">No Saved Cards</h2>
      <p className="text-plum-900/60 max-w-sm mb-8">
        We do not store your credit card details directly. Any saved Razorpay methods will appear securely at checkout.
      </p>
    </div>
  );
}
