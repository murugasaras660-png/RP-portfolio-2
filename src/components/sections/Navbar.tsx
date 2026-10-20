'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { SITE } from '@/data/content';
import { useLenisScroll } from '@/lib/lenis';
import { useThemeTokens } from '@/lib/theme';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useIntro } from '@/lib/introContext';
import GooeyNav from '@/components/react-bits/GooeyNav/GooeyNav';
import CardNav from '@/components/react-bits/CardNav/CardNav';
import { ThemeToggleButton } from '@/components/ui/skiper26';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'The Card', id: 'card' },
  { label: 'Work', id: 'work' },
  { label: 'Learning', id: 'learning' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const { scrollTo } = useLenisScroll();
  const tokens = useThemeTokens();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticScroll = useRef(false);

  const { introDone } = useIntro();

  // Scroll-spy with IntersectionObserver (rootMargin: -45% 0px -50% 0px)
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isProgrammaticScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = NAV_ITEMS.findIndex((item) => item.id === entry.target.id);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0,
    });

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavChange = (index: number) => {
    setActiveIndex(index);
    isProgrammaticScroll.current = true;
    const targetId = NAV_ITEMS[index].id;
    scrollTo(`#${targetId}`, {
      offset: -80,
      duration: 1.2,
      onComplete: () => {
        isProgrammaticScroll.current = false;
      },
    });
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    isProgrammaticScroll.current = true;
    scrollTo('#hero', {
      offset: -80,
      duration: 1.2,
      onComplete: () => {
        isProgrammaticScroll.current = false;
        setActiveIndex(0);
      },
    });
  };

  const gooeyItems = NAV_ITEMS.map((item) => ({
    label: item.label,
    href: `#${item.id}`,
  }));

  const mobileNavCards = [
    {
      label: 'Explore',
      description: 'Sections & highlights.',
      links: [
        { label: 'About', href: '#about' },
        { label: 'The Card', href: '#card' },
        { label: 'Work', href: '#work' },
        { label: 'Learning', href: '#learning' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      label: 'Connect',
      description: 'Get in touch directly.',
      links: [
        { label: 'Email', href: `mailto:${SITE.email}` },
        { label: 'LinkedIn', href: SITE.linkedin },
        { label: 'GitHub', href: SITE.github },
      ],
    },
  ];

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[var(--bg)] focus:rounded-md focus:font-sans focus:text-sm shadow-xl"
      >
        Skip to main content
      </a>

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : -12 }}
        transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 h-[72px] border-b border-[var(--line)] backdrop-blur-md"
        style={{
          backgroundColor: tokens.gooeyNav.panelBg,
        }}
        role="banner"
      >
        <div className="shell h-full flex items-center justify-between">
          {/* Brand (Desktop only — on mobile CardNav already includes the brand logo) */}
          {isDesktop && (
            <a
              href="#hero"
              onClick={handleBrandClick}
              className="group flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] rounded-md z-10 shrink-0"
              aria-label="Rithick Prasath Portfolio - Home"
            >
              <span className="font-sans text-xl md:text-2xl font-bold tracking-tight text-[var(--ink)] group-hover:opacity-80 transition-opacity">
                {SITE.brand}
              </span>
            </a>
          )}

          {/* Desktop Navigation (Centered) */}
          {isDesktop ? (
            <>
              <nav className="flex items-center justify-center flex-1 px-4" aria-label="Desktop Navigation">
                <GooeyNav
                  items={gooeyItems}
                  activeIndex={activeIndex}
                  onChange={handleNavChange}
                  theme={tokens.gooeyNav.theme}
                  size="md"
                  frame={true}
                  particleCount={15}
                  spread={56}
                  animationTime={600}
                  timeVariance={300}
                  gooeyness={0.5}
                  wobble={0.5}
                  hoverEffect={true}
                  color={tokens.gooeyNav.color}
                  activeTextColor={tokens.gooeyNav.activeTextColor}
                />
              </nav>

              {/* Right: Resume button + Theme toggle (gap 12px, aligned to shell right edge) */}
              <div className="flex items-center gap-3 shrink-0 z-10">
                <a
                  href={SITE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 h-10 px-[18px] rounded-full text-sm font-sans font-medium bg-[var(--ink)] text-[var(--bg)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
                  aria-label="Open Resume PDF in new tab"
                >
                  <span>Resume</span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <ThemeToggleButton className="w-10 h-10 rounded-full border border-[var(--line)] hover:-translate-y-0.5 transition-all duration-200" />
              </div>
            </>
          ) : (
            /* Mobile Navigation: [CardNav (logo left, Menu right)] [theme toggle] */
            <div className="flex items-center gap-3 w-full justify-between">
              <div className="flex-1">
                <CardNav
                  logo={
                    <span className="font-sans text-lg font-bold tracking-tight text-[var(--ink)]">
                      {SITE.brand}
                    </span>
                  }
                  logoAlt="Rithick Prasath"
                  surface="solid"
                  cardEffect="rise"
                  openOn="click"
                  stagger={0.1}
                  bounce={0.2}
                  maxWidth={480}
                  menuLabel={true}
                  intro={true}
                  cta={{
                    label: 'Resume',
                    href: SITE.resume,
                    onClick: (e: React.MouseEvent) => {
                      e.preventDefault();
                      window.open(SITE.resume, '_blank', 'noopener,noreferrer');
                    },
                  }}
                  theme={tokens.cardNav.theme}
                  items={mobileNavCards}
                  onLinkClick={(link: { href?: string }) => {
                    if (link.href?.startsWith('#')) {
                      scrollTo(link.href, { offset: -80, duration: 1.2 });
                    }
                  }}
                />
              </div>
              <ThemeToggleButton className="w-10 h-10 shrink-0 rounded-full border border-[var(--line)]" />
            </div>
          )}
        </div>
      </motion.header>
    </>
  );
}
