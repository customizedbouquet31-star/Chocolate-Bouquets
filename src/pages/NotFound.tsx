import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Heart } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-lavender-50/50 to-white">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary animate-pulse">
        <Heart className="w-12 h-12 fill-primary/20" />
      </div>

      <span className="text-primary font-bold tracking-[0.25em] text-xs uppercase mb-3 block">
        Error 404
      </span>

      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-plum-950 font-bold mb-4">
        Page Not Found
      </h1>

      <p className="text-plum-900/60 max-w-md text-base sm:text-lg mb-10 leading-relaxed">
        The bouquet or page you are looking for may have been moved, renamed, or is currently unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          to="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-plum-950 text-white font-bold tracking-wider rounded-full hover:bg-plum-900 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <Link 
          to="/shop"
          className="w-full sm:w-auto px-8 py-3.5 bg-white text-plum-950 font-bold tracking-wider rounded-full border-2 border-lavender-200 hover:border-primary hover:text-primary transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Explore Shop
        </Link>
      </div>
    </div>
  );
}
