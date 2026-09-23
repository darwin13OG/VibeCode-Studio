/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  Sun,
  Moon,
  Smartphone,
  Heart,
  Download,
  Trash2,
  Globe,
  Github
} from 'lucide-react';
import { VibeLogo } from './VibeLogo';

interface SettingsModalProps {
  isOpen: boolean;
  isDark: boolean;
  onClose: () => void;
  onToggleTheme: (dark: boolean) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  isInstallable: boolean;
  onInstallPWA: () => void;
  onClearStorage: () => void;
  onNotify: (msg: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  isDark,
  onClose,
  onToggleTheme,
  favoritesCount,
  onOpenFavorites,
  isInstallable,
  onInstallPWA,
  onClearStorage,
  onNotify,
}) => {
  if (!isOpen) return null;

  const handleInstallClick = () => {
    if (isInstallable) {
      onInstallPWA();
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        onNotify('En iOS: pulsa Compartir y luego "Agregar a pantalla de inicio"');
      } else {
        onNotify('En Chrome/Edge: haz clic en el icono ⊕ de instalación en la barra de URL o menú > Instalar VibeCode');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" />

      {/* Sheet Container */}
      <div
        className={`relative w-full sm:max-w-md max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl border shadow-2xl z-10 overflow-hidden animate-slide-up transition-colors duration-300 ${
          isDark
            ? 'bg-[#121214] border-white/10 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VibeLogo isDark={isDark} size={36} showText={false} />
            <div>
              <h3 className="font-display font-bold text-base tracking-tight leading-tight">VibeCode</h3>
              <p className="text-[11px] text-slate-400">Ajustes & Opciones del catálogo</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark ? 'bg-zinc-800 border-white/10 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs no-scrollbar">
          {/* APARIENCIA Section */}
          <section className="space-y-3">
            <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
              APARIENCIA
            </span>

            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
              isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-zinc-800 text-amber-400' : 'bg-white text-indigo-600 shadow-sm'
                }`}>
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-bold text-xs">Tema de la aplicación</p>
                  <p className="text-[11px] text-slate-400">
                    Modo {isDark ? 'Oscuro' : 'Claro'} activado
                  </p>
                </div>
              </div>

              {/* Segmented Control */}
              <div className={`flex items-center p-1 rounded-xl border ${
                isDark ? 'bg-zinc-950 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <button
                  onClick={() => onToggleTheme(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    !isDark
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Claro</span>
                </button>

                <button
                  onClick={() => onToggleTheme(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isDark
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Oscuro</span>
                </button>
              </div>
            </div>
          </section>

          {/* APLICACIÓN VIBECODE (PWA) Section */}
          <section className="space-y-3">
            <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
              APLICACIÓN VIBECODE (PWA)
            </span>

            <div className={`p-4 rounded-2xl border space-y-3.5 ${
              isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-700'
                }`}>
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs">Instalar en tu dispositivo</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Acceso rápido como aplicación independiente y sin barras de navegador.
                  </p>
                </div>
              </div>

              {/* Install Button always visible and clickable */}
              <button
                onClick={handleInstallClick}
                className="w-full py-2.5 px-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Instalar VibeCode</span>
              </button>
            </div>
          </section>

          {/* ACCESOS DIRECTOS Section */}
          <section className="space-y-3">
            <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
              ACCESOS DIRECTOS
            </span>

            <button
              onClick={() => {
                onOpenFavorites();
                onClose();
              }}
              className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-colors cursor-pointer ${
                isDark ? 'bg-zinc-900/50 hover:bg-zinc-800/60 border-white/5' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span className="font-bold text-xs">Mis Proyectos Favoritos</span>
              </div>
              <span className="w-6 h-6 rounded-full bg-slate-500/10 font-mono font-bold text-xs flex items-center justify-center text-slate-400">
                {favoritesCount}
              </span>
            </button>
          </section>

          {/* Footer links */}
          <section className="pt-2 border-t border-white/5 dark:border-white/10 flex items-center justify-between text-[11px]">
            <a
              href="https://github.com/darwin13OG"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-blue-500 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Github className="w-3.5 h-3.5" />
              <span>darwin13OG</span>
            </a>

            <button
              onClick={onClearStorage}
              className="text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Restablecer datos</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
