import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowUpRight, GraduationCap, Sparkles, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export const Navbar = ({ activeView, setActiveView, onOpenApply }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'members', label: 'Members' },
    { id: 'constitution', label: 'Constitution' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Top Institutional Bar */}
      <div className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 font-medium tracking-wide text-[11px] sm:text-xs truncate">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Vidyavardhini's College of Engineering & Technology, Vasai
            </span>
            <span className="hidden md:inline text-slate-400 dark:text-slate-600">•</span>
            <span className="hidden md:inline text-slate-500 dark:text-slate-400">
              Autonomous Institute • NAAC 'A' & NBA Accredited
            </span>
          </div>

          <div className="flex items-center space-x-3 shrink-0 text-[11px]">
            <a
              href="tel:+917972019446"
              className="hidden lg:flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>0250 233 8234</span>
            </a>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              CSI 2025-26 Active Chapter
            </span>
          </div>
        </div>
      </div>

      {/* Main Collegiate Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Left Title & Chapter Brand Icon */}
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center space-x-3.5 text-left group focus:outline-none z-20"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-slate-800 p-1 border border-blue-200 dark:border-blue-900/50 shadow-xs group-hover:shadow-md group-hover:scale-105 transition-all duration-200 shrink-0">
              <img
                src="/csi-logo.svg"
                alt="CSI VCET Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight">
                The Computer Society
              </span>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                CSI Student Chapter • VCET Vasai
              </p>
            </div>
          </button>

          {/* Right Navigation Links (Matching Home, Members, Constitution, Contact + Theme Toggle & Admin) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 z-20">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveView(link.id)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors font-sans ${
                  activeView === link.id
                    ? 'text-blue-700 dark:text-blue-400 font-bold bg-blue-50/90 dark:bg-blue-950/60'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Dynamic Animated Dark/Light Theme Button */}
            <div className="px-1.5">
              <ThemeToggle />
            </div>

            {/* Apply Button */}
            <button
              onClick={onOpenApply}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-xs hover:shadow-md border border-blue-400/30 hover:border-cyan-400 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Apply</span>
            </button>

            {/* Secure Admin Portal Link */}
            <div className="pl-2 border-l border-slate-200 dark:border-slate-800">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveView('admin')}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                      activeView === 'admin'
                        ? 'bg-amber-500 text-slate-950 border-amber-600'
                        : 'bg-slate-900 dark:bg-slate-800 text-slate-100 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin</span>
                  </button>
                  <button
                    onClick={logout}
                    className="p-1.5 text-xs text-slate-400 hover:text-rose-500 transition-colors"
                    title="Sign Out"
                  >
                    Exit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setActiveView('admin-login')}
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    activeView === 'admin-login'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border-blue-300'
                      : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700'
                  }`}
                  title="Restricted Committee Portal"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                  <span>Admin Portal</span>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-2 z-20">
            <ThemeToggle compact={true} />
            <button
              onClick={onOpenApply}
              className="px-2.5 py-1 text-xs font-bold text-white bg-blue-700 rounded-lg"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveView(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
                activeView === link.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => {
                setActiveView(isAuthenticated ? 'admin' : 'admin-login');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg"
            >
              <span className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Portal Login'}</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
