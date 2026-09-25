import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-lavender-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-lavender-100">
        <div className="p-8 md:p-10">
          <div className="w-16 h-16 bg-lavender-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-2xl font-serif font-bold text-center text-plum-950 mb-2">Admin Dashboard</h2>
          <p className="text-center text-plum-900/60 text-sm mb-8">Sign in to manage your store</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-plum-950 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-plum-950 mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 py-4 bg-primary text-white font-bold tracking-wider rounded-xl hover:bg-primary-hover shadow-md transition-all disabled:opacity-70 flex justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-lavender-100 text-center">
            <a href="/" className="text-sm text-primary hover:underline font-medium">
              &larr; Back to Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
