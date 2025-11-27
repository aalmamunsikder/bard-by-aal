import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, ShieldCheck, Leaf } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network latency for a realistic feel
    setTimeout(async () => {
      const success = await onLogin(email, password);
      if (success) {
        // Success handled by parent (unmount)
      } else {
        setError('Invalid credentials. Please use admin / admin.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans">
      
      {/* Left Side - Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16 text-white">
        {/* Background Overlay with Gradient and Image */}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Rural Landscape" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-slate-900/95 mix-blend-multiply" />
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-glow">B</div>
            <span className="text-2xl font-bold tracking-tight">BARD ERP</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Empowering Rural <br/>
            <span className="text-emerald-400">Development</span> through <br/>
            Digital Innovation.
          </h1>
          <p className="text-slate-300 text-lg max-w-md leading-relaxed">
            A comprehensive enterprise resource planning system designed to streamline administration, training, research, and project management.
          </p>
        </div>

        <div className="relative z-10 flex gap-8 text-sm font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><ShieldCheck size={18} /></div>
            <span>Secure Access</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><Leaf size={18} /></div>
            <span>Eco-Friendly</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
         <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            <div className="mb-10">
                <div className="lg:hidden w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-6">B</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
                <p className="text-slate-500">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                            <Mail size={20} />
                        </div>
                        <input 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@bard.gov.bd"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                            <Lock size={20} />
                        </div>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-12 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                        <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">Remember for 30 days</span>
                    </label>
                    <a href="#" className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline">Forgot password?</a>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-emerald-600 text-white py-3.5 rounded-2xl font-bold text-base hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-600/20 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                >
                    {isLoading ? (
                        <>
                           <Loader2 size={20} className="animate-spin" />
                           Signing in...
                        </>
                    ) : (
                        <>
                           Sign In
                           <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500 font-medium">
                Don't have an account? <a href="#" className="text-emerald-600 font-bold hover:underline">Contact Admin</a>
            </div>
         </div>

         <div className="absolute bottom-6 text-center w-full text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Bangladesh Academy for Rural Development
         </div>
      </div>
    </div>
  );
};