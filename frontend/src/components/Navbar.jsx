import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowUpRight, GraduationCap, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ activeView, setActiveView, onOpenApply }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'members', label: 'Members' },
    { id: 'constitution', label: 'Constitution' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Institutional Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2 font-medium tracking-wide">
          <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
          <span>Vidyavardhini's College of Engineering and Technology (VCET)</span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-slate-400">Affiliated to University of Mumbai (NAAC 'A' Grade)</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Recruitment Cycle 2026-27 Open
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Custom Chapter Logo & Title */}
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 border border-blue-700/50">
              <img src="/csi-logo.svg" alt="CSI VCET Logo" className="w-10 h-10 object-contain drop-shadow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  CSI VCET
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  ESTD. 2008
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                Computer Society of India • Student Chapter
              </p>
            </div>
          </button>

          {/* Desktop Links on Right */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveView(link.id)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeView === link.id
                    ? 'text-blue-700 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Apply Button */}
            <button
              onClick={onOpenApply}
              className="ml-2 inline-flex items-center space-x-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 rounded-lg shadow-sm hover:shadow transition-all duration-150 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Apply for Council</span>
            </button>

            {/* Secure Admin Portal Link */}
            <div className="pl-3 ml-2 border-l border-slate-200">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveView('admin')}
                    className={`inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-colors ${
                      activeView === 'admin'
                        ? 'bg-amber-500 text-slate-950 border-amber-600'
                        : 'bg-slate-900 text-slate-100 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Admin Portal</span>
                  </button>
                  <button
                    onClick={logout}
                    className="p-2 text-xs text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setActiveView('admin-login')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-colors ${
                    activeView === 'admin-login'
                      ? 'bg-blue-100 text-blue-900 border-blue-300'
                      : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>Admin Portal</span>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenApply}
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-700 rounded-lg shadow-sm"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveView(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
                activeView === link.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setActiveView(isAuthenticated ? 'admin' : 'admin-login');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 rounded-lg"
            >
              <span className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Portal Login'}</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-rose-600 font-semibold"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
