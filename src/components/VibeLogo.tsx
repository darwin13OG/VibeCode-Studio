/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface VibeLogoProps {
  isDark: boolean;
  size?: number;
  showText?: boolean;
}

export const VibeLogo: React.FC<VibeLogoProps> = ({ isDark, size = 38, showText = true }) => {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Exact Vector Emblem from VibeCode.png */}
      <div
        className={`flex items-center justify-center rounded-xl p-1 transition-all duration-300 ${
          isDark
            ? 'bg-black border border-white/15 shadow-md shadow-black/80'
            : 'bg-[#0f172a] border border-slate-700 shadow-md shadow-slate-900/10'
        }`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Left Wing / Polygon matching VibeCode.png */}
          <path
            d="M 48.4 26.8
               L 33.8 36.2
               L 33.8 52.0
               L 41.2 56.6
               L 41.2 65.0
               L 48.4 70.6
               L 48.4 54.0
               L 41.5 49.2
               L 48.4 44.4
               Z"
            fill="#FFFFFF"
          />

          {/* Right Wing / Polygon (Exact Mirrored across center line) */}
          <path
            d="M 51.6 26.8
               L 66.2 36.2
               L 66.2 52.0
               L 58.8 56.6
               L 58.8 65.0
               L 51.6 70.6
               L 51.6 54.0
               L 58.5 49.2
               L 51.6 44.4
               Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-display font-extrabold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          VibeCode
        </span>
      )}
    </div>
  );
};
