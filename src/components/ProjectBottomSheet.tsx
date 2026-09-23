/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Github,
  Heart,
  Globe,
  Copy,
  Check,
  Terminal,
  HelpCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import { Project } from '../types';
import { TechIcon } from './TechIcons';
import { ProjectIcon } from './ProjectIcon';

interface ProjectBottomSheetProps {
  project: Project | null;
  isOpen: boolean;
  isDark: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const ProjectBottomSheet: React.FC<ProjectBottomSheetProps> = ({
  project,
  isOpen,
  isDark,
  isFavorite,
  onToggleFavorite,
  onClose,
  onNotify,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);
  const [justFavorited, setJustFavorited] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project.cloudflareUrl);
    setCopiedLink(true);
    onNotify('Enlace web copiado');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyGit = () => {
    navigator.clipboard.writeText(`git clone ${project.githubUrl}.git`);
    setCopiedGit(true);
    onNotify('Comando git clone copiado');
    setTimeout(() => setCopiedGit(false), 2000);
  };

  const cleanDomain = project.cloudflareUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Sheet Container: Spacious, no cramped bars, scrollbar hidden completely */}
      <div
        className={`relative w-full sm:max-w-2xl max-h-[94vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl border shadow-2xl z-10 overflow-hidden animate-slide-up transition-colors duration-300 ${
          isDark
            ? 'bg-[#121214] border-white/10 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-slate-400/40" />
        </div>

        {/* Scrollable Container without ANY visible scrollbars (no-scrollbar) */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Hero Banner Header: Compact, clean and modern */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950 border-b border-white/10 shrink-0">
            {project.bannerUrl ? (
              <img
                src={project.bannerUrl}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-blue-700 via-indigo-700 to-sky-600 flex items-center justify-center p-6 text-white text-center">
                <Globe className="w-16 h-16 opacity-30" />
              </div>
            )}

            {/* Scrim gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

            {/* Top Bar Actions on Banner */}
            <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold backdrop-blur-md bg-black/60 text-white border border-white/20 shadow-sm">
                {project.category}
              </span>

              <div className="flex items-center gap-2">
                <button
                  aria-label="Guardar en favoritos"
                  onClick={() => {
                    setJustFavorited(true);
                    setTimeout(() => setJustFavorited(false), 500);
                    onToggleFavorite(project.id);
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-75 cursor-pointer ${
                    justFavorited ? 'animate-heart-pop' : ''
                  } ${
                    isFavorite
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-black/60 text-white hover:bg-black/80 border border-white/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                <button
                  aria-label="Cerrar ficha"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md bg-black/60 text-white hover:bg-black/80 border border-white/20 transition-all active:scale-85 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Title & Real Website Favicon */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3.5">
              <ProjectIcon
                name={project.name}
                repoName={project.repoName}
                cloudflareUrl={project.cloudflareUrl}
                faviconUrl={project.faviconUrl}
                iconType={project.iconType}
                iconSvg={project.iconSvg}
                techStack={project.techStack}
                category={project.category}
                size={54}
                className="w-14 h-14 rounded-2xl shrink-0 shadow-lg border-2 border-white/20"
              />

              <div className="truncate text-white">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight leading-tight truncate drop-shadow-md">
                  {project.name}
                </h2>
                <p className="text-xs text-white/80 font-mono truncate mt-0.5">
                  {cleanDomain} · {project.updatedDate || 'Reciente'}
                </p>
              </div>
            </div>
          </div>

          {/* Reading Body: Spacious, comfortable, typography-first */}
          <div className="p-6 sm:p-7 space-y-6 text-xs sm:text-sm leading-relaxed">
            {/* Descripción */}
            <section className="space-y-2">
              <h4 className="font-display font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                Descripción
              </h4>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {project.description}
              </p>
            </section>

            {/* Para qué se usa */}
            <section className="space-y-2">
              <h4 className="font-display font-bold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                <span>Para qué se usa</span>
              </h4>
              <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                isDark ? 'bg-zinc-900/60 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                {project.whatItsUsedFor}
              </div>
            </section>

            {/* Herramientas y tecnologías usadas con SVGs */}
            <section className="space-y-2.5">
              <h4 className="font-display font-bold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Herramientas y tecnologías usadas</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {project.techStack.map(tech => (
                  <div
                    key={tech}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                      isDark ? 'bg-zinc-900/60 border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <TechIcon name={tech} size={18} />
                    <span className="font-semibold text-xs truncate">{tech}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Direct Copy Commands */}
            <section className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleCopyLink}
                className={`flex-1 py-2.5 px-3.5 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs ${
                  isDark
                    ? 'bg-zinc-900 border-white/10 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>Copiar enlace web</span>
              </button>

              <button
                onClick={handleCopyGit}
                className={`flex-1 py-2.5 px-3.5 rounded-xl border font-mono text-[11px] flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900 border-white/10 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                {copiedGit ? <Check className="w-4 h-4 text-emerald-400" /> : <Terminal className="w-4 h-4" />}
                <span>git clone</span>
              </button>
            </section>

            {/* ACTION BUTTONS AT THE VERY END OF CONTENT (as requested by user!) */}
            <section className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`w-full sm:w-auto py-3 px-5 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900 border-white/15 text-slate-200 hover:bg-zinc-800'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>Ver en GitHub</span>
              </a>

              <a
                href={project.cloudflareUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex-1 py-3 px-6 rounded-2xl font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 shadow-xl shadow-blue-600/35 active:scale-98 transition-all cursor-pointer text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir Web</span>
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
