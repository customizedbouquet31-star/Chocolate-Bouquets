import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, X, User, LogOut, Package, Heart, MapPin, CreditCard, Headset } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Header({ onCartClick }: { onCartClick: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Invisible spacer to prevent content jump if we made it strictly fixed */}
      <div className="w-full h-4 bg-transparent absolute top-0 left-0 z-40"></div>

      {/* Sticky wrapper */}
      <div className="sticky top-2 md:top-4 z-50 w-full flex justify-center px-4 md:px-6 pointer-events-none transition-all duration-500">
        <motion.header 
          layout
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between backdrop-blur-xl bg-white/75 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-lavender-100/50 transition-all duration-500 ${
            isScrolled 
              ? 'rounded-full w-full md:w-fit md:min-w-[600px] px-4 md:px-6 py-2.5' 
              : 'rounded-2xl md:rounded-[2rem] w-full max-w-[1400px] px-5 md:px-10 py-4 md:py-5'
          }`}
        >
          {/* Mobile Menu Button */}
          <motion.div layout className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 hover:bg-lavender-50 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-plum-900" />
            </button>
          </motion.div>

          {/* Dynamic Logo */}
          <motion.a layout href="/" className="flex items-center justify-center md:justify-start z-10 flex-shrink-0">
            <div className="font-serif font-bold text-plum-950 text-center md:text-left transition-all duration-500">
              {isScrolled ? (
                <div className="text-xl md:text-2xl tracking-widest block font-black">TCB.</div>
              ) : (
                <div className="text-base md:text-[22px] leading-[1.1] tracking-wide">
                  THE CHOCOLATE<br className="hidden md:block" /> BOUQUET
                </div>
              )}
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <AnimatePresence mode="wait">
            {!isScrolled ? (
              <motion.nav 
                key="full-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex items-center justify-center flex-1 gap-10 text-[13px] font-bold tracking-widest text-plum-900/80 mx-8"
              >
                <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
                <Link to="/shop" className="hover:text-primary transition-colors">SHOP</Link>
                <Link to="/about" className="hover:text-primary transition-colors">ABOUT</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">CONTACT</Link>
              </motion.nav>
            ) : (
              <motion.nav 
                key="compact-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex items-center justify-center gap-8 text-[12px] font-bold tracking-widest text-plum-900/80 mx-8"
              >
                <Link to="/shop" className="hover:text-primary transition-colors">SHOP</Link>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Actions */}
          <motion.div layout className="flex items-center justify-end gap-1 md:gap-3 flex-shrink-0">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-lavender-50 rounded-full transition-colors hidden sm:block"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5 text-plum-950" />
            </button>
            
            {/* User Profile */}
            <div className="relative">
              {user ? (
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-1 hover:bg-lavender-50 rounded-full transition-colors flex items-center justify-center"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || 'Profile'} className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-lavender-200" />
                  ) : (
                    <User className="w-5 h-5 md:w-5 md:h-5 text-plum-950" />
                  )}
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="p-2 hover:bg-lavender-50 rounded-full transition-colors flex items-center justify-center"
                >
                  <User className="w-5 h-5 md:w-5 md:h-5 text-plum-950" />
                </Link>
              )}
              
              <AnimatePresence>
                {isProfileOpen && user && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-lavender-100 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-lavender-50">
                      <p className="font-bold text-sm text-plum-950 truncate">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs text-plum-900/60 truncate">{user.email}</p>
                    </div>
                    <div className="py-2 flex flex-col">
                      <Link to="/profile/orders" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-plum-900 hover:bg-lavender-50 hover:text-primary transition-all flex items-center gap-3 font-medium">
                        <Package className="w-4 h-4 text-plum-900/60" />
                        Orders
                      </Link>
                      <Link to="/profile/wishlist" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-plum-900 hover:bg-lavender-50 hover:text-primary transition-all flex items-center gap-3 font-medium">
                        <Heart className="w-4 h-4 text-plum-900/60" />
                        Wishlist
                      </Link>
                      <Link to="/profile/addresses" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-plum-900 hover:bg-lavender-50 hover:text-primary transition-all flex items-center gap-3 font-medium">
                        <MapPin className="w-4 h-4 text-plum-900/60" />
                        Saved Addresses
                      </Link>
                      <Link to="/profile/cards" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-plum-900 hover:bg-lavender-50 hover:text-primary transition-all flex items-center gap-3 font-medium">
                        <CreditCard className="w-4 h-4 text-plum-900/60" />
                        Saved Cards
                      </Link>
                      <Link to="/contact" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-plum-900 hover:bg-lavender-50 hover:text-primary transition-all flex items-center gap-3 font-medium">
                        <Headset className="w-4 h-4 text-plum-900/60" />
                        Customer Support
                      </Link>
                    </div>
                    <div className="border-t border-lavender-50">
                      <button 
                        onClick={() => {
                          setIsProfileOpen(false);
                          signOut();
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={onCartClick}
              className="p-2 hover:bg-lavender-50 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 md:w-5 md:h-5 text-plum-950" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 md:w-4 md:h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <AnimatePresence>
              {!isScrolled && (
                <motion.a 
                  href="https://wa.me/919315274580?text=Hi%2C%20I%20would%20like%20to%20customize%20a%20bouquet%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, width: 0, scale: 0.8 }}
                  animate={{ opacity: 1, width: 'auto', scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.8, margin: 0, padding: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block px-6 py-3 ml-2 bg-plum-950 text-white text-[12px] font-bold tracking-widest rounded-full hover:bg-plum-900 shadow-md transition-colors whitespace-nowrap overflow-hidden text-center"
                >
                  CUSTOMIZE
                </motion.a>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-plum-950/40 backdrop-blur-sm md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-5 md:p-6 flex justify-between items-center border-b border-lavender-100 bg-lavender-50/30">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" className="w-10 h-10 object-cover rounded-full shadow-sm bg-white border border-lavender-200" />
                  <span className="font-serif font-black text-xl text-plum-950 tracking-widest">TCB.</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white rounded-full text-plum-900 shadow-sm border border-lavender-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-8 px-8 flex flex-col gap-8 text-sm tracking-widest font-bold text-plum-950">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-lavender-50 flex items-center justify-center text-primary">01</span> HOME
                </Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-lavender-50 flex items-center justify-center text-primary">02</span> SHOP
                </Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-lavender-50 flex items-center justify-center text-primary">03</span> ABOUT
                </Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-lavender-50 flex items-center justify-center text-primary">04</span> CONTACT
                </Link>
              </nav>

              <div className="p-6 border-t border-lavender-100 bg-white">
                <a 
                  href="https://wa.me/919315274580?text=Hi%2C%20I%20would%20like%20to%20customize%20a%20bouquet%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-plum-950 text-white font-bold tracking-widest text-xs uppercase rounded-full shadow-lg text-center"
                >
                  CUSTOMIZE YOURS
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-white/90 backdrop-blur-xl flex flex-col items-center justify-start pt-[20vh] px-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)} 
              className="absolute top-8 right-8 p-3 bg-lavender-50 rounded-full text-plum-900 shadow-sm border border-lavender-100 hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.form 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSearch}
              className="w-full max-w-2xl relative"
            >
              <div className="flex items-center border-b-2 border-plum-950/20 pb-4 group focus-within:border-primary transition-colors">
                <Search className="w-8 h-8 text-plum-900/50 group-focus-within:text-primary mr-4" />
                <input 
                  type="text"
                  autoFocus
                  placeholder="Search for bouquets, chocolates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-3xl md:text-5xl font-serif text-plum-950 placeholder:text-plum-900/20 focus:outline-none"
                />
              </div>
              <p className="text-plum-900/50 font-medium tracking-widest text-xs uppercase mt-6 text-center">
                Press Enter to Search
              </p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
