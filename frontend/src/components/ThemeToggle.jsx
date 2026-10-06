import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = ({ compact = false, className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center group cursor-pointer transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full ${className}`}
      title={`Currently ${theme} mode. Click to switch to ${isDark ? 'light' : 'dark'} mode.`}
    >
      {/* Animated Pill Container */}
      <div
        className={`relative flex items-center justify-between rounded-full p-1 transition-all duration-500 ease-out border shadow-inner ${
          compact ? 'w-14 h-7' : 'w-16 h-8'
        } ${
          isDark
            ? 'bg-slate-900 border-indigo-500/40 shadow-indigo-950/80 ring-1 ring-indigo-500/30'
            : 'bg-gradient-to-r from-amber-100 to-sky-100 border-amber-300/80 shadow-amber-200/50'
        }`}
      >
        {/* Ambient Backlight Glow */}
        <span
          className={`absolute inset-0 rounded-full blur-md opacity-40 transition-opacity duration-500 ${
            isDark ? 'bg-indigo-600' : 'bg-amber-400'
          }`}
        />

        {/* Ambient Tiny Background Icons */}
        <span
          className={`absolute left-2 text-[10px] transition-all duration-300 ${
            isDark ? 'opacity-30 scale-75 text-slate-500' : 'opacity-90 scale-100 text-amber-600'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
        </span>
        <span
          className={`absolute right-2 text-[10px] transition-all duration-300 ${
            isDark ? 'opacity-90 scale-100 text-indigo-300' : 'opacity-30 scale-75 text-slate-400'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
        </span>

        {/* Sliding Thumb Knob */}
        <span
          className={`relative z-10 flex items-center justify-center rounded-full shadow-md transform transition-all duration-500 ease-spring ${
            compact ? 'w-5 h-5' : 'w-6 h-6'
          } ${
            isDark
              ? 'translate-x-8 bg-gradient-to-br from-indigo-500 to-slate-900 text-amber-300 shadow-indigo-900/60 rotate-360'
              : 'translate-x-0 bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-amber-500/40 rotate-0'
          }`}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 fill-amber-300 text-amber-300 transition-transform duration-300 transform group-hover:-rotate-12" />
          ) : (
            <Sun className="w-3.5 h-3.5 fill-white text-white transition-transform duration-300 transform group-hover:rotate-45" />
          )}
        </span>
      </div>

      {!compact && (
        <span className="sr-only">
          Toggle {isDark ? 'light' : 'dark'} mode
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
