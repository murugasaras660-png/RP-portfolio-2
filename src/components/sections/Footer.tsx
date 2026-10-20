'use client';

import React from 'react';
import { SITE } from '@/data/content';
import { useLenisScroll } from '@/lib/lenis';

export default function Footer() {
  const { scrollTo } = useLenisScroll();

  return (
    <footer
      className="relative py-14 border-t border-[var(--line)] bg-[var(--bg-elev)]"
      role="contentinfo"
    >
      <div className="shell flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-sans text-xl font-bold tracking-tight text-[var(--ink)]">
            {SITE.brand}
          </span>
          <span className="text-[var(--ink-faint)]">/</span>
          <span className="font-sans text-xs text-[var(--ink-dim)]">
            © 2026 {SITE.name}. All rights reserved.
          </span>
        </div>

        <div className="font-sans text-xs text-[var(--ink-faint)] text-center md:text-left">
          Crafted with React, Three.js & Motion
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={() => scrollTo('#hero', { offset: -80, duration: 1.2 })}
          className="group inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[var(--line)] bg-[var(--bg)] text-xs font-sans font-medium text-[var(--ink-dim)] hover:text-[var(--ink)] hover:border-[var(--ink-dim)] transition-all cursor-pointer shadow-sm active:scale-95"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <svg
            className="w-3.5 h-3.5 stroke-current group-hover:-translate-y-0.5 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
