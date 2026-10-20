'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useIntro } from '@/lib/introContext';
import { useLenisScroll } from '@/lib/lenis';
import { useMediaQuery } from '@/lib/useMediaQuery';

const EASING = [0.2, 0.9, 0.2, 1] as const;

export function IntroSequence() {
  const { shouldPlayIntro, setIntroDone } = useIntro();
  const { lenis } = useLenisScroll();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [curtainOpened, setCurtainOpened] = useState(false);
  const [removed, setRemoved] = useState(false);

  const realTargetRef = useRef(15);
  const displayProgressRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    // Only run if should play
    if (!shouldPlayIntro) {
      setRemoved(true);
      return;
    }

    setMounted(true);
    startTimeRef.current = performance.now();

    // Remove static HTML preloader seamlessly
    const staticEl = document.getElementById('static-preloader');
    if (staticEl) {
      staticEl.remove();
    }

    // Lock page scroll & mark aria-busy
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.setAttribute('aria-busy', 'true');
    }
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = 'hidden';

    // Reduced motion shortcut
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIntroDone(true);
        sessionStorage.setItem('rp-intro-seen', '1');
        if (rootEl) rootEl.removeAttribute('aria-busy');
        if (lenis) lenis.start();
        document.body.style.overflow = '';
        setRemoved(true);
      }, 400);
      return () => clearTimeout(timer);
    }

    // Real progress trackers
    let fontsReady = false;
    let assetsReady = false;

    if (document.fonts) {
      document.fonts.ready.then(() => {
        fontsReady = true;
        realTargetRef.current = Math.max(realTargetRef.current, 50);
      });
    } else {
      fontsReady = true;
      realTargetRef.current = 50;
    }

    // Preload key hero textures / assets
    const preloadImg = new Image();
    preloadImg.src = '/favicon.svg';
    preloadImg.onload = () => {
      assetsReady = true;
      realTargetRef.current = Math.max(realTargetRef.current, 85);
    };
    preloadImg.onerror = () => {
      assetsReady = true;
      realTargetRef.current = Math.max(realTargetRef.current, 85);
    };

    // Smooth ticker — rapid 0.35s - 0.55s sequence (~0.5s - 0.8s total sequence)
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const minDuration = 320; // super snappy 0.32s minimum count
      const hardCap = 550;     // maximum cap 0.55s

      if (elapsed >= hardCap) {
        realTargetRef.current = 100;
      } else if (fontsReady && assetsReady && elapsed >= minDuration) {
        realTargetRef.current = 100;
      } else if (elapsed > 100) {
        realTargetRef.current = Math.max(realTargetRef.current, Math.min(95, Math.floor((elapsed / minDuration) * 95)));
      }

      // Smooth step towards target, strictly monotonic
      const diff = realTargetRef.current - displayProgressRef.current;
      if (diff > 0) {
        const step = Math.max(3, diff * 0.3);
        displayProgressRef.current = Math.min(100, displayProgressRef.current + step);
        setProgress(Math.floor(displayProgressRef.current));
      }

      if (displayProgressRef.current >= 100 && elapsed >= minDuration) {
        setIsComplete(true);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (rootEl) rootEl.removeAttribute('aria-busy');
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [shouldPlayIntro, lenis, prefersReducedMotion, setIntroDone]);

  // Handle sequence completion & curtain split
  useEffect(() => {
    if (!isComplete) return;

    // Ultra-snappy 60ms hold at 100
    const holdTimer = setTimeout(() => {
      setCurtainOpened(true);
      // Hand over to page entrance right as curtain begins opening
      setIntroDone(true);
      sessionStorage.setItem('rp-intro-seen', '1');
      const rootEl = document.getElementById('root');
      if (rootEl) rootEl.removeAttribute('aria-busy');

      // 320ms snappy curtain split
      const exitTimer = setTimeout(() => {
        if (lenis) lenis.start();
        document.body.style.overflow = '';
        setRemoved(true);
      }, 360);

      return () => clearTimeout(exitTimer);
    }, 60);

    return () => clearTimeout(holdTimer);
  }, [isComplete, lenis, setIntroDone]);

  if (!shouldPlayIntro || removed) {
    return null;
  }

  // Reduced motion simple fade
  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[99999] bg-[var(--bg)] flex items-center justify-center text-[var(--ink)]"
      >
        <span className="font-sans text-6xl font-bold tracking-tight">RP</span>
      </motion.div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Screen reader loading announcement */}
      <div className="sr-only" role="status">
        Loading portfolio
      </div>

      {/* Split Curtain Top Panel */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: curtainOpened ? '-100%' : '0%' }}
        transition={{ duration: 0.32, ease: EASING }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[var(--bg)] border-b border-[var(--line)]"
        style={{ willChange: 'transform' }}
      />

      {/* Split Curtain Bottom Panel */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: curtainOpened ? '100%' : '0%' }}
        transition={{ duration: 0.32, ease: EASING }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[var(--bg)] border-t border-[var(--line)]"
        style={{ willChange: 'transform' }}
      />

      {/* Center Stage: Monogram & Hairline Progress */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: curtainOpened ? 0 : 1,
          scale: curtainOpened ? 0.9 : 1,
        }}
        transition={{ duration: 0.25, ease: EASING }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Monogram: R and P rising out of overflow-hidden masks with fast stagger */}
        <div className="flex items-center justify-center overflow-hidden h-[190px] mb-8">
          <div className="overflow-hidden inline-block leading-none">
            <motion.span
              initial={{ y: '115%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.25, ease: EASING, delay: 0.01 }}
              className="inline-block font-sans font-semibold text-[clamp(80px,16vw,180px)] tracking-[-0.05em] text-[var(--ink)] leading-none"
            >
              R
            </motion.span>
          </div>
          <div className="overflow-hidden inline-block leading-none">
            <motion.span
              initial={{ y: '115%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.25, ease: EASING, delay: 0.04 }}
              className="inline-block font-sans font-semibold text-[clamp(80px,16vw,180px)] tracking-[-0.05em] text-[var(--ink)] leading-none"
            >
              P
            </motion.span>
          </div>
        </div>

        {/* 200px Hairline Progress Bar */}
        <div className="w-[200px] h-[1px] bg-[var(--ink-faint)]/20 relative overflow-hidden mb-6">
          <motion.div
            className="absolute top-0 bottom-0 left-0 bg-[var(--ink)]"
            style={{
              width: '100%',
              scaleX: progress / 100,
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Bottom line: Rithick Prasath (left) + Tabular Counter 000-100 (right) */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-[200px] flex items-center justify-between text-[14px] font-sans text-[var(--ink-dim)]"
        >
          <span className="font-medium text-[var(--ink-dim)]">Rithick Prasath</span>
          <span className="font-normal tabular-nums text-[var(--ink-dim)]">
            {String(progress).padStart(3, '0')}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default IntroSequence;
