/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Heart, Settings, X } from 'lucide-react';
import { VibeLogo } from './VibeLogo';

interface NavbarProps {
  isDark: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favoritesCount: number;
  isFavoritesActive: boolean;
  onToggleFavoritesFilter: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  searchQuery,
  onSearchChange,
  favoritesCount,
  isFavoritesActive,
  onOpenSettings,
  onToggleFavoritesFilter,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 border-b backdrop-blur-md ${
        isDark ? 'glass-panel-dark' : 'glass-panel-light'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: VibeCode Brand Logo */}
        <div className="flex items-center shrink-0 select-none" title="VibeCode Studio">
          <VibeLogo isDark={isDark} size={40} />
        </div>

        {/* Center: Search pill for Tablet/Desktop (hidden on small mobile to avoid cramped layout) */}
        <div className="hidden sm:block relative flex-1 max-w-md mx-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre, tecnología o uso..."
            className={`w-full pl-10 pr-9 py-2 rounded-full text-xs outline-none transition-colors border ${
              isDark
                ? 'bg-zinc-900/80 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                : 'bg-slate-100/90 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Action Icons: Favorites + Settings (Ajustes) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Favorites Heart Button with counter badge */}
          <button
            onClick={onToggleFavoritesFilter}
            aria-label="Ver proyectos favoritos"
            title="Favoritos"
            className={`relative p-2.5 rounded-full transition-all active:scale-90 cursor-pointer ${
              isFavoritesActive
                ? 'bg-rose-500/15 text-rose-500 ring-1 ring-rose-500/30'
                : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavoritesActive ? 'fill-current text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white font-mono text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Settings (Ajustes) Gear Icon */}
          <button
            onClick={onOpenSettings}
            aria-label="Abrir Ajustes"
            title="Ajustes (Tema, PWA, datos)"
            className={`group flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-2xl transition-all active:scale-95 cursor-pointer border ${
              isDark
                ? 'bg-zinc-900/60 border-white/10 text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-zinc-800/80'
                : 'bg-slate-100/90 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-blue-500/40 hover:bg-slate-200/80 shadow-sm'
            }`}
          >
            <Settings className="w-5 h-5 text-blue-400 transition-transform duration-300 group-hover:rotate-45" />
            <span className="hidden md:inline text-xs font-semibold">Ajustes</span>
          </button>
        </div>
      </div>
    </header>
  );
};
