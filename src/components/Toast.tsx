import React from 'react';
import { Check } from 'lucide-react';
import { ToastNotification } from '../types';

interface ToastProps {
  toast: ToastNotification;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white border border-slate-700/80 px-5 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[90vw] sm:max-w-md">
      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4" />
      </div>
      <span className="text-xs sm:text-sm font-medium leading-tight">{toast.message}</span>
    </div>
  );
};
