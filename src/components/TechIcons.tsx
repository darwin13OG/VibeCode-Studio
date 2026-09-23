/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Code, Database, Globe, Layers, Cpu, Terminal, Volume2 } from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-4 h-4', size = 16 }) => {
  const norm = name.trim().toLowerCase();

  if (norm.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FE" />
        <g stroke="#00D8FE" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect width="32" height="32" rx="4" fill="#3178C6" />
        <path d="M18.8 19.8c.6.9 1.4 1.4 2.5 1.4 1.1 0 1.8-.6 1.8-1.4 0-.9-.7-1.3-2.1-1.9-2.1-.9-3.5-1.9-3.5-3.8 0-2.2 1.8-3.8 4.4-3.8 1.7 0 3 .6 3.9 1.9l-1.9 1.4c-.5-.7-1.1-1-2-1-.9 0-1.5.5-1.5 1.2 0 .8.6 1.2 2 1.7 2.3.9 3.6 2 3.6 4 0 2.4-1.8 3.9-4.7 3.9-2.1 0-3.7-.8-4.7-2.3l2.2-1.3zM5.5 10.7h11.2v2.7H12v9.7H8.8v-9.7H5.5v-2.7z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect width="32" height="32" rx="4" fill="#F7DF1E" />
        <path d="M18.5 21.6c.6 1 1.6 1.7 2.8 1.7 1.2 0 2-.6 2-1.4 0-1-.8-1.4-2.2-2l-.8-.3c-2.3-.9-3.8-2.1-3.8-4.6 0-2.3 1.8-4 4.5-4 2 0 3.4.7 4.4 2.4l-2.1 1.3c-.5-.9-1.2-1.3-2.3-1.3-1.1 0-1.8.6-1.8 1.4 0 .9.7 1.3 2.1 1.9l.8.3c2.7 1.1 4 2.3 4 4.8 0 2.8-2.1 4.2-4.9 4.2-2.7 0-4.4-1.3-5.2-3.1l2.6-1.4zm-11.2.2c.4.8.9 1.5 2.1 1.5 1.1 0 1.8-.5 1.8-2.3v-10h2.8v10.1c0 3.2-1.9 4.6-4.6 4.6-2.5 0-3.9-1.3-4.6-2.9l2.5-1z" fill="#000000" />
      </svg>
    );
  }

  if (norm.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" fill="#38BDF8" />
      </svg>
    );
  }

  if (norm.includes('vite')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
        <path d="M29.6 5.7L16.8 28.5c-.4.7-1.3.7-1.7 0L2.4 5.7c-.4-.7.1-1.6.9-1.5l13.1 1.8 12.3-1.8c.8-.1 1.3.8.9 1.5z" fill="url(#viteGradient1)" />
        <path d="M22.5 4.3L11.8 21.2l-4-7.2 14.7-9.7z" fill="url(#viteGradient2)" />
        <path d="M17.8 2.6L10.3 16l3.5-.5-2.8 7.3 9.4-12.7-3.8.5 2.8-8c.2-.5-.3-1-.8-.6l-1.6.6z" fill="#FFD62E" />
        <defs>
          <linearGradient id="viteGradient1" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="viteGradient2" x1="7" y1="4" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFEA83" />
            <stop offset=".08" stopColor="#FFDD35" />
            <stop offset="1" stopColor="#FFA800" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm.includes('cloudflare') || norm.includes('pages')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
        <path d="M18.6 11.2c-.3-2.3-2.2-4.1-4.6-4.1-1.8 0-3.3 1-4.1 2.5-1.9-.3-3.7 1-4 2.9-.1.6 0 1.2.2 1.7-.8.5-1.3 1.4-1.3 2.5 0 1.7 1.3 3 3 3h10.8c2.1 0 3.8-1.7 3.8-3.8 0-1.8-1.2-3.3-2.8-3.7-.4-.3-.7-.6-1-.9z" fill="#F38020" />
        <path d="M14.5 17.5l2.2-4.7c.1-.3-.1-.6-.4-.6h-2.5l1.2-2.7c.1-.3-.2-.6-.5-.5l-3.9 4.3c-.2.2 0 .6.3.6h2.2l-1.5 3.3c-.1.3.2.6.5.4l2.4-.1z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('html')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
        <path d="M3 2l1.8 18.2L12 22l7.2-1.8L21 2H3z" fill="#E34F26" />
        <path d="M12 3.8v16.3l5.7-1.4 1.5-14.9H12z" fill="#EF652A" />
        <path d="M7 6.4h10l-.2 2.2H9.2l.2 2.3h7.2l-.6 6.8L12 18.8l-3.9-1.1-.3-3.2h2.2l.2 1.6 1.8.5 1.8-.5.2-2.5H7.2L7 6.4z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('css')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
        <path d="M3 2l1.8 18.2L12 22l7.2-1.8L21 2H3z" fill="#1572B6" />
        <path d="M12 3.8v16.3l5.7-1.4 1.5-14.9H12z" fill="#33A9DC" />
        <path d="M12 11.2h4.5l-.3 3.3-4.2 1.2v2.3l6.5-1.8.8-9.4H7.4l.2 2.2H12v2.2z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('pwa')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
        <rect width="24" height="24" rx="4" fill="#5A0FC8" />
        <path d="M5 15.5l3.5-7h3l3.5 7h-2.2l-.7-1.6H8.9l-.7 1.6H5zm4.5-3.3h2l-1-2.4-1 2.4zm7.5 3.3l3-7h2l-4 9h-2l1-2z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('git') || norm.includes('hub')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  if (norm.includes('storage') || norm.includes('sql') || norm.includes('db')) {
    return <Database className={className} />;
  }

  if (norm.includes('audio') || norm.includes('sound')) {
    return <Volume2 className={className} />;
  }

  return <Code className={className} />;
};
