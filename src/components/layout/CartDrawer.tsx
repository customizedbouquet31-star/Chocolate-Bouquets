import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { user, signInWithGoogle } = useAuth();

  let discountPercent = 0;
  let appliedCode = '';

  if (totalPrice >= 2999) {
    discountPercent = 30;
    appliedCode = 'CHOCO30';
  } else if (totalPrice >= 1999) {
    discountPercent = 20;
    appliedCode = 'CHOCO20';
  } else if (totalPrice > 999) {
    discountPercent = 10;
    appliedCode = 'CHOCO10';
  }

  const discountAmount = Math.round((totalPrice * discountPercent) / 100);
  const finalPrice = totalPrice - discountAmount;

  const handleCheckout = () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    
    // TODO: Integrate Razorpay here
    alert('Razorpay checkout integration pending.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-plum-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-lavender-100 flex items-center justify-between bg-gradient-to-r from-lavender-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-xl text-plum-950">Your Cart</h2>
                  <p className="text-xs font-bold tracking-widest text-plum-900/50 uppercase">{totalItems} Items</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2.5 bg-white border border-lavender-100 hover:bg-lavender-50 hover:border-lavender-200 hover:-rotate-90 rounded-full text-plum-900 shadow-sm transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-white to-lavender-50/30"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-lavender-200/50 blur-2xl rounded-full scale-150"></div>
                  <motion.div 
                    animate={{ y: [0, -15, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-gradient-to-tr from-lavender-100 to-white rounded-full flex items-center justify-center relative z-10 shadow-xl border border-white"
                  >
                    <ShoppingBag className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>
                <h3 className="font-serif font-bold text-2xl text-plum-950 mb-3">Your cart is empty</h3>
                <p className="text-plum-900/60 mb-8 max-w-[250px] leading-relaxed">
                  Looks like you haven't added any beautiful bouquets or hampers yet.
                </p>
                <button 
                  onClick={onClose}
                  className="px-8 py-4 bg-plum-950 text-white font-bold tracking-widest text-xs uppercase rounded-full hover:bg-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/30 transition-all transform hover:-translate-y-1 flex items-center gap-3 group"
                >
                  Start Shopping
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 bg-slate-50/50">
                  <AnimatePresence>
                    {items.map((item) => {
                      const primaryImage = item.product.product_images?.find(img => img.is_primary)?.image_url 
                        || item.product.product_images?.[0]?.image_url 
                        || 'https://via.placeholder.com/150';

                      return (
                        <motion.div 
                          key={item.product.id} 
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, x: 50 }}
                          className="group flex gap-4 p-4 rounded-[1.5rem] border border-lavender-100/50 bg-white shadow-sm hover:shadow-xl hover:shadow-lavender-100/50 transition-all"
                        >
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                            <img 
                              src={primaryImage} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none"></div>
                          </div>
                          
                          <div className="flex-1 flex flex-col py-1">
                            <div className="flex justify-between items-start gap-2 mb-1">
                              <h4 className="font-bold text-plum-950 text-sm line-clamp-2 leading-tight">
                                {item.product.name}
                              </h4>
                              <button 
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1.5 text-plum-900/40 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="text-primary font-black text-sm mb-3">
                              Rs. {item.product.price.toLocaleString()}
                            </div>
                            
                            <div className="mt-auto flex items-center gap-3">
                              <div className="flex items-center bg-slate-50 rounded-full border border-lavender-100/60 shadow-inner overflow-hidden">
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-2 text-plum-900/60 hover:text-primary hover:bg-white transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-plum-950 bg-transparent">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-2 text-plum-900/60 hover:text-primary hover:bg-white transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Available Offers Section */}
                  <div className="mt-4 p-4 bg-white rounded-[1.5rem] border border-lavender-100/50 shadow-sm flex-shrink-0">
                    <h4 className="font-bold text-plum-950 text-sm mb-3 flex items-center gap-2 uppercase tracking-widest">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Available Offers
                    </h4>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { code: 'CHOCO30', desc: '30% off on orders above Rs. 2999', min: 2999 },
                        { code: 'CHOCO20', desc: '20% off on orders above Rs. 1999', min: 1999 },
                        { code: 'CHOCO10', desc: '10% off on orders above Rs. 999', min: 999 },
                        { code: 'Welcome10', desc: '10% discount on your first order', min: 0 },
                      ].map(offer => {
                        const isApplied = appliedCode === offer.code;
                        const isLocked = totalPrice < offer.min && offer.code !== 'Welcome10';
                        const amountNeeded = offer.min - totalPrice;
                        
                        return (
                          <div key={offer.code} className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${isApplied ? 'bg-green-50/50 border-green-200 shadow-sm' : 'bg-slate-50 border-lavender-50'}`}>
                            <div className="flex-1">
                              <div className="font-bold text-sm flex items-center gap-2 text-plum-950">
                                <span className={isApplied ? 'text-green-700' : ''}>{offer.code}</span>
                                {isApplied && (
                                  <span className="text-[9px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Auto-Applied</span>
                                )}
                              </div>
                              <div className={`text-[11px] mt-1 font-medium ${isApplied ? 'text-green-600/80' : 'text-plum-900/60'}`}>
                                {offer.desc}
                              </div>
                              {isLocked && (
                                <div className="text-[10px] text-primary/80 font-bold mt-1.5 flex items-center gap-1">
                                  Add Rs. {amountNeeded.toLocaleString()} more to unlock
                                </div>
                              )}
                            </div>
                            <div className="flex-shrink-0 ml-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isApplied ? 'border-green-500 bg-green-500 text-white' : 'border-lavender-200 text-transparent'}`}>
                                {isApplied && (
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 md:p-8 bg-white border-t border-lavender-50 shadow-[0_-10px_30px_rgb(0,0,0,0.03)] relative z-10 flex-shrink-0">
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-plum-900/60 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                      <span className="text-lg font-bold text-plum-950">
                        Rs. {totalPrice.toLocaleString()}
                      </span>
                    </div>
                    
                    {discountPercent > 0 && (
                      <div className="flex items-center justify-between text-green-600">
                        <span className="font-bold uppercase tracking-widest text-xs">
                          Discount ({appliedCode})
                        </span>
                        <span className="text-lg font-bold">
                          - Rs. {discountAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    <div className="h-px w-full bg-lavender-100 my-1"></div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-plum-950 font-black uppercase tracking-widest text-sm">Total</span>
                      <span className="text-2xl font-black text-plum-950">
                        Rs. {finalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] font-medium tracking-wide text-plum-900/50 mb-6 text-center">
                    Taxes and shipping calculated at checkout
                  </p>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 relative overflow-hidden group bg-gradient-to-r from-primary to-plum-900 text-white font-bold tracking-widest text-sm uppercase rounded-[1.25rem] shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-12"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {user ? 'Checkout' : 'Login to Checkout'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
