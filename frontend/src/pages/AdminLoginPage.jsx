import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export const AdminLoginPage = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@csivcet.org');
    setPassword('CsiVcet@2026');
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Card Header */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-7 text-center space-y-2 relative border-b border-slate-800">
          <div className="absolute top-4 right-4">
            <ThemeToggle compact={true} />
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 p-2 mx-auto flex items-center justify-center shadow-lg border border-blue-500/30">
            <img src="/csi-logo.svg" alt="CSI Emblem" className="w-12 h-12 object-contain" />
          </div>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight">Admin & Core Portal</h2>
          <p className="text-xs text-slate-300 font-sans">
            Computer Society of India • VCET Student Chapter
          </p>
          <div className="pt-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
              JWT Protected Authority Access
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-7 space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1-Click Demo Credentials Quick Fill Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-300 text-xs flex items-center justify-between">
            <div>
              <p className="font-bold flex items-center space-x-1 text-amber-950 dark:text-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Demo Admin Credentials</span>
              </p>
              <p className="text-[11px] text-amber-800 dark:text-amber-400 mt-0.5 font-mono">
                admin@csivcet.org / CsiVcet@2026
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-3 py-1.5 text-[11px] font-bold bg-amber-200 dark:bg-amber-900/80 hover:bg-amber-300 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-100 rounded-lg transition-colors shadow-2xs"
            >
              Fill Demo
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Admin Official Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@csivcet.org"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <>
                  <span>Access Admin Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              ← Back to Chapter Public View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
