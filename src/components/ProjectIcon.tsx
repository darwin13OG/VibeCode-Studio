/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TechIcon } from './TechIcons';
import flickWalletClayIcon from '../assets/images/flick_wallet_clay_icon.png';

interface ProjectIconProps {
  name: string;
  repoName: string;
  cloudflareUrl?: string;
  faviconUrl?: string;
  iconType?: 'scanner' | 'fintech' | 'waves' | 'codewave' | 'tech' | 'custom' | 'auto';
  iconSvg?: string;
  techStack?: string[];
  category?: string;
  className?: string;
  size?: number;
}

export const ProjectIcon: React.FC<ProjectIconProps> = ({
  name,
  repoName,
  cloudflareUrl = '',
  faviconUrl,
  iconType = 'auto',
  iconSvg,
  techStack = [],
  category = '',
  className = 'w-14 h-14 rounded-2xl',
  size = 56,
}) => {
  const [imgError, setImgError] = useState(false);
  const norm = (name + ' ' + repoName).toLowerCase();

  // 1. Direct custom SVG if provided
  if (iconSvg) {
    return (
      <div
        className={`${className} bg-[#16171b] border border-white/10 shadow-md flex items-center justify-center p-2.5 shrink-0 select-none`}
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
    );
  }

  // 1.5 Flick Wallet official 3D Clay Icon + SVG fallback from repo
  if (iconType === 'fintech' || (norm.includes('flick') && norm.includes('wallet'))) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-[#e2dfff] to-[#f0f4f8] dark:from-[#321ed2]/60 dark:to-[#1e2433] border border-[#635bff]/35 shadow-lg shadow-[#635bff]/20 flex items-center justify-center shrink-0 select-none overflow-hidden p-1.5`}
        style={{ width: size, height: size }}
      >
        {!imgError ? (
          <img
            src={flickWalletClayIcon}
            alt={name}
            className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(73,62,229,0.3)]"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect x="8" y="8" width="104" height="104" rx="28" fill="#635bff" />
            <path d="M38 36 L54 16 L88 26 L78 44 Z" fill="#62fae3" />
            <rect x="24" y="34" width="72" height="58" rx="16" fill="#ffffff" />
            <rect x="64" y="52" width="34" height="22" rx="8" fill="#f0f4f8" stroke="#c3c0ff" strokeWidth="2" />
            <circle cx="84" cy="63" r="5" fill="#635bff" />
          </svg>
        )}
      </div>
    );
  }

  // 2. Scan POS exact 1:1 replica from user screenshot
  if (iconType === 'scanner' || (norm.includes('scan') && norm.includes('pos'))) {
    return (
      <div
        className={`${className} bg-gradient-to-b from-[#1c1d22] to-[#121317] border border-white/10 shadow-xl shadow-black/50 flex items-center justify-center shrink-0 select-none overflow-hidden`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-1.5">
          {/* Top-Left Viewfinder Bracket */}
          <path
            d="M 33 42 V 37 C 33 33.2 35.8 30.5 39.5 30.5 H 44.5"
            stroke="#00F59B"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top-Right Viewfinder Bracket */}
          <path
            d="M 55.5 30.5 H 60.5 C 64.2 30.5 67 33.2 67 37 V 42"
            stroke="#00F59B"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bottom-Left Viewfinder Bracket */}
          <path
            d="M 33 58 V 63 C 33 66.8 35.8 69.5 39.5 69.5 H 44.5"
            stroke="#00F59B"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bottom-Right Viewfinder Bracket */}
          <path
            d="M 55.5 69.5 H 60.5 C 64.2 69.5 67 66.8 67 63 V 58"
            stroke="#00F59B"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Scan Target Bar / Pill */}
          <line
            x1="41"
            y1="50"
            x2="59"
            y2="50"
            stroke="#00F59B"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // 2.5 Code Wave official SVG icon (< > in Electric Cyan to Emerald Green on #050505)
  if (iconType === 'codewave' || (norm.includes('code') && norm.includes('wave'))) {
    return (
      <div
        className={`${className} bg-[#050505] border border-[#00f0ff]/30 shadow-lg shadow-cyan-950/40 flex items-center justify-center shrink-0 select-none overflow-hidden relative`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="cwg" x1="6" y1="10" x2="34" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="45%" stopColor="#00e5ff" />
              <stop offset="75%" stopColor="#00f5c4" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <path
            d="M15 11L7 20L15 29"
            stroke="url(#cwg)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 11L33 20L25 29"
            stroke="url(#cwg)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // 3. Focus Wave exact replica from user screenshot
  if (iconType === 'waves' || norm.includes('focus') || norm.includes('wave')) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-[#1b1947] via-[#0d1e3a] to-[#071324] border border-[#00d2ff]/45 shadow-lg shadow-cyan-950/40 flex items-center justify-center shrink-0 select-none overflow-hidden relative`}
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-cyan-500/10 blur-sm pointer-events-none" />
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-2.5 relative z-10">
          {/* Top Wave */}
          <path
            d="M 28 41 Q 33.5 35, 39 41 T 50 41 T 61 41 T 72 41"
            stroke="#00d2ff"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Middle Wave */}
          <path
            d="M 28 50 Q 33.5 44, 39 50 T 50 50 T 61 50 T 72 50"
            stroke="#00d2ff"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Bottom Wave */}
          <path
            d="M 28 59 Q 33.5 53, 39 59 T 50 59 T 61 59 T 72 59"
            stroke="#00d2ff"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // 4. Try live favicon if provided and valid
  if (faviconUrl && !imgError) {
    return (
      <div
        className={`${className} border border-slate-200/60 dark:border-white/10 shadow-md flex items-center justify-center shrink-0 overflow-hidden select-none`}
        style={{ width: size, height: size }}
      >
        <img
          src={faviconUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    );
  }

  // 4. Primary Technology Emblem (React, Next, Python, Node, Vite, etc.)
  const primaryTech = techStack.find(t => {
    const l = t.toLowerCase();
    return l.includes('react') || l.includes('next') || l.includes('vue') || l.includes('python') || l.includes('node') || l.includes('vite') || l.includes('typescript');
  }) || techStack[0];

  if (primaryTech) {
    return (
      <div
        className={`${className} bg-[#0e131d] border border-blue-500/20 shadow-md shadow-blue-950/30 flex items-center justify-center p-2.5 shrink-0 select-none group-hover:border-blue-500/40 transition-colors`}
        style={{ width: size, height: size }}
      >
        <TechIcon name={primaryTech} size={Math.round(size * 0.52)} className="drop-shadow-md" />
      </div>
    );
  }

  // 5. Stylized Monogram Squircle with category gradient
  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`${className} bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-display font-bold shadow-md flex items-center justify-center shrink-0 select-none border border-white/15`}
      style={{ width: size, height: size, fontSize: size ? size * 0.36 : 16 }}
    >
      <span>{initials || 'VC'}</span>
    </div>
  );
};
