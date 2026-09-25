import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Package, Heart, MapPin, CreditCard, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Orders', path: '/profile/orders', icon: Package },
    { name: 'Wishlist', path: '/profile/wishlist', icon: Heart },
    { name: 'Addresses', path: '/profile/addresses', icon: MapPin },
    { name: 'Cards', path: '/profile/cards', icon: CreditCard },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 min-h-[70vh]">
      
      {/* Premium User Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-tr from-plum-950 via-plum-900 to-primary rounded-[1.5rem] md:rounded-[3rem] p-5 md:p-12 text-white relative overflow-hidden mb-6 md:mb-12 shadow-2xl shadow-plum-900/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-lavender-400/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-row items-center md:items-start gap-4 md:gap-10">
          <div className="w-16 h-16 md:w-36 md:h-36 bg-white/10 p-1 md:p-3 rounded-full backdrop-blur-md border border-white/20 shadow-xl flex-shrink-0">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 md:w-12 md:h-12 text-plum-900/40" />
              )}
            </div>
          </div>
          
          <div className="text-left md:mt-6 flex-1 min-w-0">
            <h1 className="font-serif font-bold text-lg md:text-5xl mb-0.5 md:mb-3 text-white drop-shadow-sm truncate">
              {user.user_metadata?.full_name || 'My Profile'}
            </h1>
            <p className="text-white/80 font-medium tracking-wider text-xs md:text-base truncate">
              {user.email}
            </p>
          </div>
          
          <div className="md:mt-0 md:ml-auto self-center md:self-start">
            <button 
              onClick={signOut}
              className="p-3 md:px-6 md:py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl font-bold tracking-widest text-[11px] md:text-xs uppercase transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Navigation Sidebar / Horizontal Tabs */}
        <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
          <nav className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 md:mx-0 md:px-0">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex-shrink-0 md:flex-shrink flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 rounded-2xl md:rounded-3xl font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-primary shadow-xl shadow-lavender-200/40 scale-100 md:scale-105 z-10 border-2 border-primary/5' 
                      : 'bg-white/40 text-plum-900/50 hover:bg-white hover:text-plum-950 hover:shadow-md border-2 border-transparent'
                  }`
                }
              >
                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base tracking-wide whitespace-nowrap">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl shadow-lavender-100/50 border border-lavender-50 h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
