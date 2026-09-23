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
          {/* Left Wing / Polygon Bracket matching VibeCode.png */}
          <path
            d="M 47 18
               L 28 30
               L 28 50
               L 38 57
               L 38 68
               L 47 77
               L 47 63
               L 40 57
               L 40 50
               L 47 44
               Z"
            fill="#FFFFFF"
          />

          {/* Right Wing / Polygon Bracket (Exact Mirrored) */}
          <path
            d="M 53 18
               L 72 30
               L 72 50
               L 62 57
               L 62 68
               L 53 77
               L 53 63
               L 60 57
               L 60 50
               L 53 44
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
