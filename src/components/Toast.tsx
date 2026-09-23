/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle, Info, Heart } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  isDark: boolean;
}

export const Toast: React.FC<ToastProps> = ({ toasts, isDark }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDark
              ? 'bg-zinc-900/95 border-white/15 text-white shadow-black/60'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-900/10'
          }`}
        >
          {toast.type === 'favorite' ? (
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
