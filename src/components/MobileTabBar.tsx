/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Heart, PlusCircle, Info, Sparkles } from 'lucide-react';

export type MobileTab = 'explore' | 'favorites' | 'add' | 'info';

interface MobileTabBarProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  favoritesCount: number;
  isDark: boolean;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
  isDark,
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t backdrop-blur-xl transition-colors duration-300 pb-safe ${
        isDark
          ? 'bg-[#101012]/90 border-white/10 text-slate-400'
          : 'bg-white/90 border-slate-200 text-slate-500 shadow-lg shadow-black/5'
      }`}
    >
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto items-center px-2">
        {/* Tab 1: Explorar */}
        <button
          onClick={() => onSelectTab('explore')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'explore'
              ? (isDark ? 'text-sky-400' : 'text-indigo-600')
              : 'hover:text-slate-200'
          }`}
        >
          <Compass className={`w-5 h-5 transition-transform duration-200 ${activeTab === 'explore' ? 'scale-110' : ''}`} />
          <span className="text-[10px] font-medium mt-1 tracking-tight">Explorar</span>
          {activeTab === 'explore' && (
            <span className="w-1.5 h-1.5 rounded-full bg-current absolute bottom-1" />
          )}
        </button>

        {/* Tab 2: Favoritos */}
        <button
          onClick={() => onSelectTab('favorites')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'favorites'
              ? (isDark ? 'text-rose-400' : 'text-rose-600')
              : 'hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 transition-transform duration-200 ${activeTab === 'favorites' ? 'scale-110 fill-current' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white font-mono text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-1 tracking-tight">Favoritos</span>
          {activeTab === 'favorites' && (
            <span className="w-1.5 h-1.5 rounded-full bg-current absolute bottom-1" />
          )}
        </button>

        {/* Tab 3: Nuevo MVP */}
        <button
          onClick={() => onSelectTab('add')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'add'
              ? (isDark ? 'text-sky-400' : 'text-indigo-600')
              : 'hover:text-slate-200'
          }`}
        >
          <PlusCircle className={`w-5 h-5 transition-transform duration-200 ${activeTab === 'add' ? 'scale-110' : ''}`} />
          <span className="text-[10px] font-medium mt-1 tracking-tight">Publicar</span>
          {activeTab === 'add' && (
            <span className="w-1.5 h-1.5 rounded-full bg-current absolute bottom-1" />
          )}
        </button>

        {/* Tab 4: Acerca de / PWA */}
        <button
          onClick={() => onSelectTab('info')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'info'
              ? (isDark ? 'text-sky-400' : 'text-indigo-600')
              : 'hover:text-slate-200'
          }`}
        >
          <Info className={`w-5 h-5 transition-transform duration-200 ${activeTab === 'info' ? 'scale-110' : ''}`} />
          <span className="text-[10px] font-medium mt-1 tracking-tight">Studio Info</span>
          {activeTab === 'info' && (
            <span className="w-1.5 h-1.5 rounded-full bg-current absolute bottom-1" />
          )}
        </button>
      </div>
    </div>
  );
};
