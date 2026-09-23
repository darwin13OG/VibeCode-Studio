/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Heart,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Project, ToastMessage } from './types';
import { INITIAL_PROJECTS } from './data/initialProjects';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { ProjectBottomSheet } from './components/ProjectBottomSheet';
import { SettingsModal } from './components/SettingsModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Toast } from './components/Toast';
import { OfflineIndicator } from './components/OfflineIndicator';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  // Theme state: dark default, persists
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('vibecode_theme');
      if (savedTheme) return savedTheme === 'dark';
    } catch {
      // ignore
    }
    return true; // Deep graphite dark mode
  });

  // Projects state: loaded from repository data
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);

  // Favorites state: starts at 0 (empty array)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vibecode_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [favoritesOnlyFilter, setFavoritesOnlyFilter] = useState(false);

  // Modals & Bottom Sheets
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toasts with strict duplicate prevention
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // PWA install hook
  const { isInstallable, install } = usePWAInstall();

  // Sync theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0d0d0d';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
    try {
      localStorage.setItem('vibecode_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  // Sync favorites & clean stale cache
  useEffect(() => {
    try {
      localStorage.removeItem('vibecode_custom_repos');
      localStorage.setItem('vibecode_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const addToast = (message: string, type: 'success' | 'info' | 'favorite' = 'success') => {
    setToasts(prev => {
      if (prev.some(t => t.message === message)) return prev;
      const id = Date.now().toString() + Math.random().toString().slice(-4);
      return [...prev, { id, message, type }];
    });
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 2800);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        addToast('Eliminado de favoritos', 'info');
        return prev.filter(item => item !== id);
      } else {
        addToast('Guardado en favoritos', 'favorite');
        return [...prev, id];
      }
    });
  };

  const handleClearStorage = () => {
    try {
      localStorage.removeItem('vibecode_favorites');
      setFavorites([]);
      addToast('Favoritos restablecidos a 0', 'info');
      setIsSettingsOpen(false);
    } catch {
      // ignore
    }
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return ['Todas', ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (favoritesOnlyFilter && !favorites.includes(project.id)) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = project.name.toLowerCase().includes(q);
        const matchesRepo = project.repoName.toLowerCase().includes(q);
        const matchesDesc = project.description.toLowerCase().includes(q);
        const matchesUse = project.whatItsUsedFor.toLowerCase().includes(q);
        const matchesTech = project.techStack.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesRepo && !matchesDesc && !matchesUse && !matchesTech) {
          return false;
        }
      }

      if (selectedCategory !== 'Todas' && project.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [projects, searchQuery, selectedCategory, favoritesOnlyFilter, favorites]);

  return (
    <div className={`min-h-screen flex flex-col selection:bg-blue-500/25 transition-colors duration-300 ${
      isDark ? 'bg-[#0d0d0d] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Top Navbar */}
      <Navbar
        isDark={isDark}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
        isFavoritesActive={favoritesOnlyFilter}
        onToggleFavoritesFilter={() => setFavoritesOnlyFilter(prev => !prev)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-5 pb-20 space-y-6">
        {/* Blue Gradient Hero Card */}
        <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white shadow-xl shadow-blue-500/15">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-indigo-900/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            {/* Top pill tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/20 border border-white/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catálogo de Repositorios Web</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
              Proyectos rápidos, modernos y optimizados
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-blue-50/90 leading-relaxed max-w-xl">
              Tu catálogo propio de repositorios. Explora proyectos, consulta herramientas y pruébalos en un toque.
            </p>

            {/* Quick Badges Row */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/15 border border-white/20 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>{projects.length} proyectos disponibles</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/15 border border-white/20 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>100% verificados</span>
              </div>

              <button
                onClick={() => setFavoritesOnlyFilter(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                  favoritesOnlyFilter
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'bg-white/15 border border-white/20 text-white hover:bg-white/25'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${favoritesOnlyFilter ? 'fill-current text-rose-500' : 'text-rose-300'}`} />
                <span>{favorites.length} en favoritos</span>
              </button>
            </div>
          </div>
        </section>

        {/* Categorías Section */}
        <section className="space-y-2.5">
          <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block px-1">
            CATEGORÍAS
          </span>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => {
              const isActive = selectedCategory === cat && !favoritesOnlyFilter;
              const count = cat === 'Todas' ? projects.length : projects.filter(p => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setFavoritesOnlyFilter(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20'
                      : isDark
                        ? 'bg-zinc-900/70 border border-white/10 text-slate-300 hover:text-white hover:bg-zinc-800'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-white/25 text-white' : isDark ? 'bg-zinc-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Favoritos Pill */}
            <button
              onClick={() => setFavoritesOnlyFilter(prev => !prev)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer ${
                favoritesOnlyFilter
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                  : isDark
                    ? 'bg-zinc-900/70 border border-white/10 text-slate-300 hover:text-white'
                    : 'bg-white border border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesOnlyFilter ? 'fill-current' : 'text-rose-400'}`} />
              <span>Favoritos</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                favoritesOnlyFilter ? 'bg-white/25 text-white' : isDark ? 'bg-zinc-800 text-slate-400' : 'bg-slate-100 text-slate-600'
              }`}>
                {favorites.length}
              </span>
            </button>
          </div>
        </section>

        {/* Section Heading: "Todos los repositorios (X)" */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-display font-bold text-lg tracking-tight">
              {favoritesOnlyFilter
                ? `Proyectos favoritos (${filteredProjects.length})`
                : selectedCategory === 'Todas'
                  ? `Todos los repositorios (${filteredProjects.length})`
                  : `${selectedCategory} (${filteredProjects.length})`}
            </h2>

            {(searchQuery || favoritesOnlyFilter || selectedCategory !== 'Todas') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todas');
                  setFavoritesOnlyFilter(false);
                }}
                className="text-xs text-blue-500 hover:underline font-medium cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* List / Grid of Projects */}
          {filteredProjects.length === 0 ? (
            <div className={`p-10 text-center rounded-3xl border ${
              isDark ? 'bg-zinc-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <p className="text-sm font-semibold mb-1">No se encontraron repositorios</p>
              <p className="text-xs text-slate-400 mb-3">
                {favoritesOnlyFilter
                  ? 'No tienes proyectos en favoritos todavía. Pulsa el corazón en cualquier tarjeta para agregarlo.'
                  : 'Intenta buscar con otra palabra clave o restablece los filtros activos.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todas');
                  setFavoritesOnlyFilter(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
              >
                Mostrar todos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  isFavorite={favorites.includes(project.id)}
                  onToggleFavorite={toggleFavorite}
                  onOpenDetails={setSelectedProject}
                />
              ))}
            </div>
          )}
        </section>

        {/* Discrete Clean Footer */}
        <footer className="pt-8 pb-4 text-center border-t border-white/5 dark:border-white/10 space-y-2">
          <div className="text-[11px] text-slate-500 select-none">
            VibeCode Studio · Catálogo de Repositorios Web
          </div>
          <p className="text-[10px] text-slate-600 font-mono">
            Desplegado en Cloudflare Pages · github.com/darwin13OG
          </p>
        </footer>
      </main>

      {/* Floating Action Button (Scroll to top - only visible when scrolled down) */}
      <FloatingActionButton />

      {/* Bottom Sheet "Ficha Técnica" */}
      <ProjectBottomSheet
        project={selectedProject}
        isOpen={!!selectedProject}
        isDark={isDark}
        isFavorite={selectedProject ? favorites.includes(selectedProject.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedProject(null)}
        onNotify={msg => addToast(msg, 'success')}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        isDark={isDark}
        onClose={() => setIsSettingsOpen(false)}
        onToggleTheme={dark => setIsDark(dark)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesOnlyFilter(true)}
        isInstallable={isInstallable}
        onInstallPWA={install}
        onClearStorage={handleClearStorage}
        onNotify={msg => addToast(msg, 'info')}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} isDark={isDark} />

      {/* Offline Status Pill */}
      <OfflineIndicator />
    </div>
  );
}
