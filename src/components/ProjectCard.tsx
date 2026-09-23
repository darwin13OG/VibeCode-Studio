/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Heart,
  Globe,
  ChevronRight
} from 'lucide-react';
import { Project } from '../types';
import { TechIcon } from './TechIcons';
import { ProjectIcon } from './ProjectIcon';

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isDark,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}) => {
  const [justFavorited, setJustFavorited] = useState(false);
  const cleanDomain = project.cloudflareUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJustFavorited(true);
    setTimeout(() => setJustFavorited(false), 500);
    onToggleFavorite(project.id);
  };

  return (
    <div
      onClick={() => onOpenDetails(project)}
      className={`relative rounded-3xl p-5 border transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-between hover:-translate-y-1 ${
        isDark
          ? 'bg-[#141416]/90 hover:bg-[#18181c] border-white/10 hover:border-blue-500/40 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-blue-950/20'
          : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-blue-400 shadow-md shadow-slate-900/5 hover:shadow-xl hover:shadow-blue-900/10'
      }`}
    >
      <div>
        {/* Top Header Row: Project Icon, Category & Version, Favorite Heart */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3.5">
            {/* Authentic Project Squircle Icon */}
            <ProjectIcon
              name={project.name}
              repoName={project.repoName}
              cloudflareUrl={project.cloudflareUrl}
              faviconUrl={project.faviconUrl}
              iconType={project.iconType}
              iconSvg={project.iconSvg}
              techStack={project.techStack}
              category={project.category}
              size={56}
              className="w-14 h-14 rounded-2xl shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm"
            />

            {/* Category tag & status */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide transition-colors ${
                  isDark
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {project.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {project.updatedDate || 'Reciente'}
                </span>
              </div>

              {/* Project Title */}
              <h3 className={`font-display font-bold text-lg tracking-tight leading-snug transition-colors duration-200 ${
                isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
              }`}>
                {project.name}
              </h3>
            </div>
          </div>

          {/* Favorite Button with bouncy micro-animation */}
          <button
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            onClick={handleFavoriteClick}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-75 cursor-pointer ${
              justFavorited ? 'animate-heart-pop' : ''
            } ${
              isFavorite
                ? 'text-rose-500 hover:text-rose-600'
                : isDark
                  ? 'text-slate-500 hover:text-slate-300'
                  : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Heart className={`w-5 h-5 transition-transform duration-200 ${isFavorite ? 'fill-current scale-110' : ''}`} />
          </button>
        </div>

        {/* Description (2 lines) */}
        <p className={`text-xs line-clamp-2 leading-relaxed mb-4 transition-colors ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {project.description}
        </p>

        {/* Real URLs / Metadata Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono border transition-colors ${
            isDark ? 'bg-zinc-900/60 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate max-w-[130px]">darwin13OG/{project.repoName}</span>
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono border transition-colors ${
            isDark ? 'bg-zinc-900/60 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate max-w-[130px]">{cleanDomain}</span>
          </div>
        </div>

        {/* Tech Stack SVG preview row */}
        <div className="flex items-center gap-1.5 overflow-hidden mb-4">
          {project.techStack.slice(0, 4).map(tech => (
            <span
              key={tech}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium border transition-all hover:scale-105 ${
                isDark ? 'bg-zinc-900 border-white/5 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <TechIcon name={tech} size={12} />
              <span>{tech}</span>
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] text-slate-400 font-mono">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer Actions: "Ver ficha >" and "Abrir Web" */}
      <div className="pt-3 border-t border-white/5 dark:border-white/10 flex items-center justify-between gap-3" onClick={e => e.stopPropagation()}>
        {/* Ver ficha link with animated chevron */}
        <button
          onClick={() => onOpenDetails(project)}
          className={`text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
            isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Ver ficha</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        {/* Action button cluster */}
        <div className="flex items-center gap-2">
          {/* GitHub Icon Link */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={`p-2 rounded-xl border transition-all active:scale-90 cursor-pointer ${
              isDark
                ? 'bg-zinc-900 border-white/10 text-slate-300 hover:text-white hover:bg-zinc-800'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title="Ver repositorio en GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Simple and punchy "Abrir Web" button */}
          <a
            href={project.cloudflareUrl}
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-md shadow-blue-600/25 active:scale-95 hover:shadow-lg hover:shadow-blue-600/35 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir Web</span>
          </a>
        </div>
      </div>
    </div>
  );
};
