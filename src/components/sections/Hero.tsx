'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUpRight01Icon,
  CheckmarkBadge01Icon,
  FingerPrintIcon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import { SITE } from '@/data/content';
import SpotlightCard from '@/components/react-bits/SpotlightCard/SpotlightCard';
import ReflectiveCard from '@/components/react-bits/ReflectiveCard/ReflectiveCard';
import { useLenisScroll } from '@/lib/lenis';
import { useThemeTokens } from '@/lib/theme';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useIntro } from '@/lib/introContext';

export default function Hero() {
  const { scrollTo } = useLenisScroll();
  const tokens = useThemeTokens();
  const { introDone } = useIntro();
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 639px)');

  const handleFlipToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlipToggle();
    }
  };

  const cardWidth = isMobile ? 310 : 340;
  const cardHeight = isMobile ? 475 : 520;

  const sharedCardProps = {
    width: cardWidth,
    height: cardHeight,
    radius: 24,
    theme: tokens.reflectiveCard.theme,
    tint: tokens.reflectiveCard.tint,
    metalness: 1,
    roughness: 0.35,
    blurStrength: 6,
    grayscale: 1,
    warp: 0.5,
    shine: 1,
    bevel: 3,
    glare: 0.5,
    enableTilt: true,
    tiltStrength: 10,
    intro: introDone,
    statusColor: tokens.reflectiveCard.statusColor,
    webcam: false,
  };

  return (
    <section
      id="hero"
      className="relative pt-[96px] pb-16 md:pt-[104px] md:pb-24 flex flex-col items-center justify-center min-h-[90svh]"
    >
      <div className="shell">
        <SpotlightCard
          theme={tokens.spotlightCard.theme}
          spotlightColor={tokens.spotlightCard.spotlightColor}
          intensity={tokens.spotlightCard.intensity}
          spotlightSize={340}
          softness={0.7}
          shape="circle"
          borderGlow={0.6}
          proximity={120}
          smoothing={0.3}
          grain={0.25}
          ambient={true}
          flare={true}
          style={
            {
              '--spotlight-card-surface': 'var(--bg-card)',
              borderRadius: '24px',
              minHeight: 'min(78svh, 720px)',
            } as React.CSSProperties
          }
          className="border border-[var(--line)] shadow-xl p-6 sm:p-8 md:p-12 lg:p-14"
        >
          {/* Top Eyebrow Row */}
          <div className="flex items-center justify-between w-full border-b border-[var(--line)] pb-5 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ink)] animate-pulse" />
              <span className="font-sans text-xs uppercase tracking-[0.04em] font-medium text-[var(--ink-dim)]">
                Rithick Prasath · Portfolio 2026
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs text-[var(--ink-faint)] hidden sm:inline-block">
                {SITE.brand}
              </span>
            </div>
          </div>

          {/* Dual Column Grid: Left Content (7 cols), Right Flipping ReflectiveCard (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 16 }}
              transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* H1 with Instrument Serif italic on the emphasized word */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-[var(--ink)] leading-[1.08] mb-6">
                Software Engineer in the{' '}
                <span className="font-serif italic font-normal">Making.</span>
              </h1>

              <p className="text-xl sm:text-2xl text-[var(--ink-dim)] font-normal max-w-xl leading-relaxed mb-4">
                Building intelligent software. Engineering what's next.
              </p>

              {/* Education line (one line, --ink-dim) */}
              <p className="text-sm font-sans text-[var(--ink-dim)] mb-8">
                B.Tech CSE, Bharath University, Tamil Nadu, India · Class of 2028
              </p>

              {/* Action Buttons: 52px height, 0 28px padding, 999px radius, 16px gap, 32px above */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => scrollTo('#work', { offset: -80, duration: 1.2 })}
                  className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-sm font-sans font-medium bg-[var(--ink)] text-[var(--bg)] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 cursor-pointer text-center"
                >
                  <span>View My Work</span>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
                <a
                  href={SITE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-sm font-sans font-medium bg-transparent text-[var(--ink)] border border-[var(--line)] transition-all duration-200 hover:border-[var(--ink-dim)] hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <span>Download Resume</span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Flipping Profile Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -4 }}
                animate={{
                  opacity: introDone ? 1 : 0,
                  y: introDone ? 0 : 40,
                  rotate: introDone ? 0 : -4,
                }}
                transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1], delay: 0.15 }}
                className="relative flex items-center justify-center select-none"
              >
                {/* Flip Card Wrapper */}
                <div
                  className="relative cursor-pointer focus:outline-none"
                  style={{
                    perspective: 1200,
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={handleFlipToggle}
                  onKeyDown={handleKeyDown}
                  aria-pressed={isFlipped}
                  aria-label="Profile card. Click or press Enter to flip."
                >
                  {prefersReducedMotion ? (
                    /* Reduced Motion: Cross-fade */
                    <AnimatePresence mode="wait">
                      {!isFlipped ? (
                        <motion.div
                          key="front"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full"
                          aria-hidden={isFlipped}
                          // @ts-expect-error inert attribute
                          inert={isFlipped ? '' : undefined}
                        >
                          <ReflectiveCard {...sharedCardProps}>
                            <FrontCardContent />
                          </ReflectiveCard>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full"
                          aria-hidden={!isFlipped}
                          // @ts-expect-error inert attribute
                          inert={!isFlipped ? '' : undefined}
                        >
                          <ReflectiveCard {...sharedCardProps}>
                            <BackCardContent onFlipBack={handleFlipToggle} />
                          </ReflectiveCard>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ) : (
                    /* 3D Spring Flip */
                    <motion.div
                      className="w-full h-full relative"
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                        mass: 0.8,
                      }}
                    >
                      {/* Front Face */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                        aria-hidden={isFlipped}
                        // @ts-expect-error inert attribute
                        inert={isFlipped ? '' : undefined}
                      >
                        <ReflectiveCard {...sharedCardProps}>
                          <FrontCardContent />
                        </ReflectiveCard>
                      </div>

                      {/* Back Face */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                        aria-hidden={!isFlipped}
                        // @ts-expect-error inert attribute
                        inert={!isFlipped ? '' : undefined}
                      >
                        <ReflectiveCard {...sharedCardProps}>
                          <BackCardContent onFlipBack={handleFlipToggle} />
                        </ReflectiveCard>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Clean hint underneath */}
              <div className="mt-4 flex items-center gap-1.5 text-[var(--ink-faint)] font-sans text-xs">
                <span>Click to flip</span>
                <span className="opacity-60">⇄</span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

function FrontCardContent() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-1 select-none">
      {/* Top row: Verified badge (left), Open to internship status (right) */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium bg-[var(--rc-ink)]/10 text-[var(--rc-ink)] border border-[var(--rc-tile-edge)] backdrop-blur-sm">
          <HugeiconsIcon icon={CheckmarkBadge01Icon} size={15} strokeWidth={2} />
          <span>Verified</span>
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans font-medium bg-[var(--rc-ink)]/10 text-[var(--rc-ink)] border border-[var(--rc-tile-edge)] backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Open to internship</span>
        </span>
      </div>

      {/* Centre: large engraved monogram "RP" (Geist, 96px, weight 600, low-contrast embossed look using text-shadow highlights, not a colour) */}
      <div className="flex items-center justify-center my-auto py-2">
        <span
          className="font-sans font-semibold tracking-tighter text-transparent select-none"
          style={{
            fontSize: '96px',
            lineHeight: 1,
            textShadow:
              '0 1px 1px rgba(255, 255, 255, 0.4), 0 -1px 1px rgba(0, 0, 0, 0.5), 1px 0 1px rgba(255, 255, 255, 0.2), -1px 0 1px rgba(0, 0, 0, 0.3)',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
          }}
        >
          RP
        </span>
      </div>

      {/* Bottom block */}
      <div className="space-y-3">
        <div>
          <h3 className="font-sans text-xl font-bold tracking-tight text-[var(--rc-ink)]">
            Rithick Prasath
          </h3>
          <p className="font-sans text-xs text-[var(--rc-muted)] font-medium">
            Software Engineer in the Making
          </p>
        </div>

        <div className="text-[11px] text-[var(--rc-muted)] font-sans space-y-0.5 border-t border-[var(--rc-tile-edge)] pt-2">
          <p>B.Tech CSE · Class of 2028</p>
          <p>Bharath University, Tamil Nadu</p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            {['Flutter', 'Flask', 'AI / LLM'].map((chip) => (
              <span
                key={chip}
                className="px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-[var(--rc-ink)]/10 text-[var(--rc-ink)] border border-[var(--rc-tile-edge)]"
              >
                {chip}
              </span>
            ))}
          </div>
          <span className="reflective-card__tile shrink-0">
            <HugeiconsIcon icon={FingerPrintIcon} size={20} strokeWidth={1.6} />
          </span>
        </div>
      </div>
    </div>
  );
}

function BackCardContent({ onFlipBack }: { onFlipBack: () => void }) {
  const links = [
    { label: 'Email', href: `mailto:${SITE.email}`, value: SITE.email },
    { label: 'LinkedIn', href: SITE.linkedin, value: 'Profile' },
    { label: 'GitHub', href: SITE.github, value: 'Repositories' },
    { label: 'Resume', href: SITE.resume, value: 'PDF' },
  ];

  return (
    <div
      className="p-5 h-full flex flex-col justify-between text-[var(--ink)] select-text"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-5">
          <span className="font-sans text-xs uppercase tracking-wider font-semibold text-[var(--ink)]">
            Contact Channels
          </span>
          <span className="font-sans text-xs text-[var(--ink-faint)]">
            Direct
          </span>
        </div>

        {/* Links list */}
        <div className="space-y-2.5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-elev)] border border-[var(--line)] hover:border-[var(--ink-dim)] hover:bg-[var(--bg-card)] transition-all group"
            >
              <div>
                <span className="block font-sans text-xs font-semibold text-[var(--ink)]">
                  {link.label}
                </span>
                <span className="block font-sans text-xs text-[var(--ink-faint)] truncate max-w-[190px]">
                  {link.value}
                </span>
              </div>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={16}
                className="text-[var(--ink-dim)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Footer Location & Flip back affordance */}
      <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
        <div className="font-sans text-xs text-[var(--ink-dim)]">
          <span className="block text-[11px] text-[var(--ink-faint)]">
            Location
          </span>
          <span>{SITE.location}</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFlipBack();
          }}
          className="px-3 py-1.5 rounded-full bg-[var(--ink)] text-[var(--bg)] font-sans text-xs font-medium hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          Flip back ↺
        </button>
      </div>
    </div>
  );
}
