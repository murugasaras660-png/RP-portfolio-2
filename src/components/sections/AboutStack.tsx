'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import {
  SiPython,
  SiDart,
  SiFlutter,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiFlask,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArtificialIntelligence01Icon } from '@hugeicons/core-free-icons';
import { SITE } from '@/data/content';
import LogoLoop from '@/components/react-bits/LogoLoop/LogoLoop';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { HalftonePhoto } from '@/components/collage/HalftonePhoto';
import { Paper } from '@/components/collage/Paper';
import { WordReveal, MaskHeadline } from '@/components/ui/TextReveal';

const ROW_1_STACK = [
  {
    title: 'Python',
    node: <SiPython className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'Dart',
    node: <SiDart className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'Flutter',
    node: <SiFlutter className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'JavaScript',
    node: <SiJavascript className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'HTML5',
    node: <SiHtml5 className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'CSS3',
    node: <SiCss className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
];

const ROW_2_STACK = [
  {
    title: 'Flask',
    node: <SiFlask className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'Firebase',
    node: <SiFirebase className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'Supabase',
    node: <SiSupabase className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'Git',
    node: <SiGit className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'GitHub',
    node: <SiGithub className="w-10 h-10 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors" />,
  },
  {
    title: 'AI / LLM APIs',
    node: (
      <HugeiconsIcon
        icon={ArtificialIntelligence01Icon}
        size={40}
        className="text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors"
      />
    ),
  },
];

const ALL_LOGOS = [...ROW_1_STACK, ...ROW_2_STACK];

export default function AboutStack() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <section
      id="about"
      className="relative section-rhythm bg-[var(--bg)]"
      aria-label="About Rithick Prasath and Technical Stack"
    >
      <div className="shell">
        {/* Hairline ABOVE eyebrow with 32px gap */}
        <div className="w-full h-px bg-[var(--line)] mb-8" />

        {/* Section Header */}
        <div className="mb-16">
          <span className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--ink-faint)] mb-4">
            01 / Philosophy & Stack
          </span>
          <MaskHeadline
            lines={['Engineering with purpose,', 'precision & speed.']}
            italicWord="speed."
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.035em] text-[var(--ink)] leading-tight max-w-3xl mb-4"
          />
          <p className="text-base sm:text-lg text-[var(--ink-dim)] max-w-[56ch] leading-relaxed">
            Crafting tactile digital systems, combining clean architecture with high-speed implementation.
          </p>
        </div>

        {/* About Grid: Portrait (5 cols) & Bio Paper Card (7 cols), Gap 64px on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20">
          {/* Halftone Portrait with Spring Tilt & Light Glare */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <PortraitTilt>
              <HalftonePhoto
                src="/profile/portrait.jpg"
                alt="Rithick Prasath portrait"
                width={300}
                height={380}
              />
            </PortraitTilt>
          </div>

          {/* Bio Paper Card (Refined clean paper, no stickers, no zig-zag) */}
          <div className="lg:col-span-7">
            <Paper className="p-8 sm:p-10 rounded-2xl">
              <div className="space-y-5 text-base sm:text-lg text-[var(--paper-ink)] leading-relaxed">
                <p className="font-semibold text-lg sm:text-xl">
                  {SITE.about}
                </p>

                {/* Word-by-word reveal */}
                <WordReveal
                  text="My focus centers on combining clean architecture with high-speed implementation. Whether crafting responsive cross-platform mobile apps with Flutter, structuring resilient Python and Flask microservices, or orchestrating local and hosted LLMs, I prioritize responsive performance and polished tactile interfaces."
                  className="text-sm sm:text-base opacity-85 leading-relaxed"
                  staggerMs={22}
                />

                <div className="pt-4 border-t border-[rgba(22,19,28,0.12)] flex flex-wrap items-center justify-between gap-4 font-sans text-xs opacity-75">
                  <span>Location: {SITE.location}</span>
                  <span>Class of 2028 · B.Tech CSE</span>
                </div>
              </div>
            </Paper>
          </div>
        </div>

        {/* Skills Section with ≥96px spacing above and 48px clearance below */}
        <div className="pt-24 pb-8">
          {/* Skills Header */}
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
              Core Technical Stack
            </h3>
          </div>

          {/* LogoLoop Block */}
          {prefersReducedMotion ? (
            /* Reduced Motion Static Wrapped Grid */
            <div className="flex flex-wrap items-center justify-center gap-8 py-8">
              {ALL_LOGOS.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-2"
                >
                  {item.node}
                  <span className="font-sans text-xs text-[var(--ink-dim)]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Clean Logo Loops */
            <div className="relative py-4 space-y-6">
              {/* Row 1: Left */}
              <LogoLoop
                logos={ROW_1_STACK}
                logoHeight={44}
                gap={72}
                speed={60}
                direction="left"
                hoverSpeed={12}
                fadeOut={true}
                fadeOutWidth={0.12}
                muted={0.5}
                scaleOnHover={true}
                labels="below"
                draggable={true}
                scrollBoost={0.15}
                ariaLabel="Technical stack primary row"
              />

              {/* Row 2: Right */}
              <LogoLoop
                logos={ROW_2_STACK}
                logoHeight={44}
                gap={72}
                speed={60}
                direction="right"
                hoverSpeed={12}
                fadeOut={true}
                fadeOutWidth={0.12}
                muted={0.5}
                scaleOnHover={true}
                labels="below"
                draggable={true}
                scrollBoost={0.15}
                ariaLabel="Technical stack secondary row"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PortraitTilt({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const rotateX = useSpring(0, { stiffness: 140, damping: 16 });
  const rotateY = useSpring(0, { stiffness: 140, damping: 16 });
  const lift = useSpring(0, { stiffness: 140, damping: 16 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || prefersReduced) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    setMousePos({ x: px, y: py });

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    rotateX.set(-normY * 10);
    rotateY.set(normX * 10);
    lift.set(6);
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    setIsHovered(false);
  };

  if (prefersReduced) {
    return <div className="relative inline-block">{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative inline-block select-none"
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          y: lift,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {children}

        {/* Diagonal light sheen and radial glare overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.2) 0%, transparent 60%), linear-gradient(${115 + (mousePos.x - 50) * 0.4}deg, transparent 20%, rgba(255,255,255,0.12) 45%, transparent 65%)`,
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
    </div>
  );
}
