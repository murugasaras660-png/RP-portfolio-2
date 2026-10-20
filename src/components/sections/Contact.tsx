'use client';

import React, { useState, useEffect } from 'react';
import { SITE } from '@/data/content';
import FlowingMenu from '@/components/react-bits/FlowingMenu/FlowingMenu';
import { useThemeTokens } from '@/lib/theme';
import { MaskHeadline } from '@/components/ui/TextReveal';

export default function Contact() {
  const tokens = useThemeTokens();
  const [align, setAlign] = useState<'left' | 'center'>('center');

  useEffect(() => {
    const updateAlign = () => {
      setAlign(window.innerWidth < 768 ? 'left' : 'center');
    };
    updateAlign();
    window.addEventListener('resize', updateAlign);
    return () => window.removeEventListener('resize', updateAlign);
  }, []);

  // Never disable rows for placeholders — always provide a valid link
  const contactItems = [
    {
      text: 'Email',
      link: SITE.email.startsWith('[') ? '#contact' : `mailto:${SITE.email}`,
      meta: SITE.email.startsWith('[')
        ? (process.env.NODE_ENV !== 'production' ? 'add in content.js' : 'Email')
        : SITE.email,
      marquee: 'Email me',
      image: '/brands/email.svg',
    },
    {
      text: 'LinkedIn',
      link: SITE.linkedin.startsWith('[') ? '#contact' : SITE.linkedin,
      meta: SITE.linkedin.startsWith('[')
        ? (process.env.NODE_ENV !== 'production' ? 'add in content.js' : 'LinkedIn')
        : "Let's connect",
      marquee: "Let's connect",
      image: '/brands/linkedin.svg',
    },
    {
      text: 'GitHub',
      link: SITE.github.startsWith('[') ? '#contact' : SITE.github,
      meta: SITE.github.startsWith('[')
        ? (process.env.NODE_ENV !== 'production' ? 'add in content.js' : 'GitHub')
        : 'Open source',
      marquee: 'Open source',
      image: '/brands/github.svg',
    },
    {
      text: 'Resume',
      link: SITE.resume || '#contact',
      meta: 'Curriculum vitae',
      marquee: 'Curriculum vitae',
      image: '/brands/resume.svg',
    },
  ];

  return (
    <section
      id="contact"
      className="relative section-rhythm bg-[var(--bg)]"
      aria-label="Contact and Channels"
    >
      <div className="shell">
        {/* Hairline ABOVE eyebrow with 32px gap */}
        <div className="w-full h-px bg-[var(--line)] mb-8" />

        {/* Section Header: two columns — title left, location right (desktop), 64px below before menu */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--ink-faint)] mb-4">
              05 / Contact
            </span>
            <MaskHeadline
              lines={["Let's build something", 'exceptional.']}
              italicWord="exceptional."
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.035em] text-[var(--ink)] mb-3"
            />
            <p className="text-base sm:text-lg text-[var(--ink-dim)] max-w-[56ch] leading-relaxed">
              Open to internships, high-impact projects and technical collaborations.
            </p>
          </div>

          <div className="font-sans text-xs text-[var(--ink-dim)] space-y-0.5 shrink-0">
            <p>Tamil Nadu, India · IST (UTC +5:30)</p>
          </div>
        </div>

        {/* FlowingMenu Stage: definite height, relative positioning, no overflow-hidden ancestors */}
        <div
          className="relative w-full rounded-2xl border border-[var(--line)] shadow-2xl"
          style={{
            height: 'clamp(440px, 64vh, 580px)',
            position: 'relative',
          }}
        >
          <FlowingMenu
            items={contactItems}
            speed={50}
            direction="alternate"
            followCursor={0.4}
            stretch={0.6}
            magnet={0.25}
            duration={0.5}
            bandRadius={0}
            showIndex={true}
            showArrow={true}
            intro={true}
            imageShape="pill"
            align={align}
            bgColor={tokens.flowingMenu.bgColor}
            textColor={tokens.flowingMenu.textColor}
            marqueeBgColor={tokens.flowingMenu.marqueeBgColor}
            marqueeTextColor={tokens.flowingMenu.marqueeTextColor}
            borderColor={tokens.flowingMenu.borderColor}
          />
        </div>
      </div>
    </section>
  );
}
