'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'circle' | 'rectangle';
  start?: 'center' | 'bottom-up';
}

export function ThemeToggleButton({
  className = '',
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme || theme) === 'dark' : true;

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? 'light' : 'dark';

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fallback if View Transition API is not supported or reduced motion is preferred
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = document as any;
    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if ('clientX' in e && (e.clientX !== 0 || e.clientY !== 0)) {
      x = e.clientX;
      y = e.clientY;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add('theme-switching');

    const transition = doc.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready?.then(() => {
      const anim = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
      anim.onfinish = () => {
        document.documentElement.classList.remove('theme-switching');
      };
    });

    transition.finished?.finally(() => {
      document.documentElement.classList.remove('theme-switching');
    });
  };

  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--bg-card)] text-[var(--ink)] hover:text-[var(--ink)] hover:border-[var(--ink-faint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] active:scale-95 transition-all cursor-pointer shadow-sm ${className}`}
      aria-label={label}
      title={label}
    >
      <span className="sr-only">{label}</span>
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.25, ease: [0.2, 0.9, 0.2, 1] }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-5 h-5 stroke-[1.75]" />
        ) : (
          <Sun className="w-5 h-5 stroke-[1.75]" />
        )}
      </motion.div>
    </button>
  );
}

export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme) === 'dark';

  const toggleTheme = (e?: React.MouseEvent) => {
    const nextTheme = isDark ? 'light' : 'dark';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = document as any;
    if (!doc.startViewTransition) {
      setTheme(nextTheme);
      return;
    }
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add('theme-switching');

    const transition = doc.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready?.then(() => {
      const anim = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
      anim.onfinish = () => {
        document.documentElement.classList.remove('theme-switching');
      };
    });

    transition.finished?.finally(() => {
      document.documentElement.classList.remove('theme-switching');
    });
  };

  return { isDark, toggleTheme, theme };
}

export default ThemeToggleButton;
