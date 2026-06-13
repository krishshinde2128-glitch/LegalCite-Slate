import React, { useState } from 'react';
import { Scale, Lock, Mail, ArrowRight } from 'lucide-react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center p-4">
      <div className="ui-panel w-full max-w-md border border-[#1e2536] shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#4F46E5] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="p-3 bg-[#121622] rounded-xl border border-[#1e2536] mb-5 shadow-lg">
            <Scale className="text-[#4F46E5] w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Lexis Hub</h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-1.5 tracking-wide">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-[#4F46E5] transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full pl-11"
                placeholder="john.doe@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-1.5 tracking-wide">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-[#4F46E5] transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full pl-11"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
              <input type="checkbox" className="rounded border-[#1e2536] bg-[#0B0F19] text-[#4F46E5] focus:ring-[#4F46E5]/50 w-4 h-4 cursor-pointer" />
              Remember me
            </label>
            <a href="#" className="text-sm text-[#4F46E5] hover:text-indigo-400 font-bold transition-colors">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary w-full py-3.5 mt-4 shadow-lg shadow-indigo-500/20 text-base">
            Sign In <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </form>
        
        <p className="text-center text-sm text-slate-500 mt-8 font-medium">
          Don't have an account? <a href="#" className="text-[#4F46E5] hover:text-indigo-400 font-bold transition-colors">Contact Admin</a>
        </p>
      </div>
    </div>
  );
}
