import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message, description = '') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, description }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, desc) => addToast('success', msg, desc),
    error: (msg, desc) => addToast('error', msg, desc),
    info: (msg, desc) => addToast('info', msg, desc),
    warning: (msg, desc) => addToast('warning', msg, desc),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl backdrop-blur-xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
              t.type === 'success'
                ? 'bg-slate-900/95 dark:bg-slate-900/95 border-emerald-500/30 text-white shadow-emerald-950/20'
                : t.type === 'error'
                ? 'bg-slate-900/95 dark:bg-slate-900/95 border-rose-500/30 text-white shadow-rose-950/20'
                : t.type === 'warning'
                ? 'bg-slate-900/95 dark:bg-slate-900/95 border-amber-500/30 text-white shadow-amber-950/20'
                : 'bg-slate-900/95 dark:bg-slate-900/95 border-blue-500/30 text-white shadow-blue-950/20'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {t.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                {t.message}
              </p>
              {t.description && (
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-sans">
                  {t.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
