/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const FloatingActionButton: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button as soon as user scrolls past hero header (~140px)
      const isScrolled = window.scrollY > 140;
      setShow(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    // 1. Immediately hide button with smooth CSS transition
    setShow(false);

    // 2. Smoothly scroll viewport back to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="Subir al inicio"
      className={`fixed bottom-6 right-5 z-40 w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white flex items-center justify-center shadow-xl shadow-blue-600/35 active:scale-90 border border-white/25 cursor-pointer select-none transition-all duration-400 ease-out ${
        show
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-75 translate-y-6 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
};
