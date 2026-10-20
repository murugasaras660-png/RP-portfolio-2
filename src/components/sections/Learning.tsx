'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { LEARNING } from '@/data/content';
import Folder from '@/components/react-bits/Folder/Folder';
import LogoLoop from '@/components/react-bits/LogoLoop/LogoLoop';
import { useThemeTokens } from '@/lib/theme';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { Paper } from '@/components/collage/Paper';
import { MaskHeadline } from '@/components/ui/TextReveal';

interface CertItem {
  title: string;
  issuer: string;
  type: string;
  credentialUrl?: string;
  issued?: string;
}

export default function Learning() {
  const tokens = useThemeTokens();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [folderOpen, setFolderOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [hasHover, setHasHover] = useState(true);

  const graceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
      setHasHover(mq.matches);
    }
  }, []);

  const openFolderWithGrace = (index?: number) => {
    if (graceTimer.current) {
      clearTimeout(graceTimer.current);
      graceTimer.current = null;
    }
    setFolderOpen(true);
    if (index !== undefined) {
      setHoveredIdx(index);
    }
  };

  const closeFolderWithGrace = () => {
    if (graceTimer.current) clearTimeout(graceTimer.current);
    graceTimer.current = setTimeout(() => {
      setFolderOpen(false);
      setHoveredIdx(null);
    }, 250);
  };

  const handleRowToggle = (index: number) => {
    setExpandedIdx((prev) => (prev === index ? null : index));
    setFolderOpen(true);
  };

  const handleRowKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowToggle(index);
    } else if (e.key === 'Escape') {
      setExpandedIdx(null);
      setFolderOpen(false);
    }
  };

  const itemsList: CertItem[] = LEARNING.map((item) => {
    if (typeof item === 'string') {
      return {
        title: item,
        issuer: 'Google',
        type: 'Verified credential',
      };
    }
    return item;
  });

  // Prepare Folder items
  const folderItems = itemsList.map((item) => ({
    title: item.title,
    description: `${item.issuer} · ${item.type}`,
  }));

  // Marquee text: Geist 15px weight 500 sentence case, --ink-dim, no parentheses
  // Format: "Google AI Essentials · Google"
  const marqueeLogos = itemsList.flatMap((item, idx) => [
    {
      node: (
        <span
          key={`txt-${idx}`}
          className="font-sans text-[15px] font-medium text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors whitespace-nowrap cursor-pointer select-none"
        >
          {item.title} · {item.issuer}
        </span>
      ),
    },
    {
      node: (
        <span
          key={`dot-${idx}`}
          className="inline-block w-1 h-1 rounded-full bg-[var(--ink-faint)] mx-7 align-middle"
        />
      ),
    },
  ]);

  return (
    <section
      id="learning"
      className="relative section-rhythm bg-[var(--bg)]"
      aria-label="Verified Academic and Technical Credentials"
    >
      <div className="shell">
        {/* Hairline ABOVE eyebrow with 32px gap */}
        <div className="w-full h-px bg-[var(--line)] mb-8" />

        {/* Section Header with 56px below */}
        <div className="mb-14">
          <span className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--ink-faint)] mb-4">
            04 / Learning
          </span>
          <MaskHeadline
            lines={['Verified Academic &', 'Technical Credentials']}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.035em] text-[var(--ink)] mb-4"
          />
          <p className="text-base sm:text-lg text-[var(--ink-dim)] max-w-[56ch] leading-relaxed">
            Courses and certifications in computer science, AI and IT.
          </p>
        </div>

        {/* Two Columns: Left Folder (6/12), Right List (6/12), gap 80px desktop, stacked 48px mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-14">
          {/* Left Column: Interactive Folder on clean Paper card */}
          <div
            className="lg:col-span-6 flex flex-col items-center justify-center"
            onMouseEnter={() => openFolderWithGrace()}
            onMouseLeave={closeFolderWithGrace}
          >
            <div className="relative w-full max-w-[420px] mx-auto">
              <Paper className="p-8 sm:p-10 flex items-center justify-center min-h-[400px] sm:min-h-[480px] rounded-2xl">
                <Folder
                  open={folderOpen}
                  onOpenChange={setFolderOpen}
                  openOn={hasHover ? 'hover' : 'click'}
                  closeOnOutsideClick={true}
                  zoomOnClick={true}
                  peek={true}
                  draggable={true}
                  intro={true}
                  layout="stack"
                  mode="flap"
                  variant="matte"
                  label="Certificates"
                  tabPosition="left"
                  paperColor={tokens.folder.paperColor}
                  color={tokens.folder.color}
                  theme={tokens.folder.theme}
                  size={isDesktop ? 1.2 : 1.0}
                  items={folderItems}
                  className="w-full"
                />
              </Paper>
            </div>
            <p className="font-sans text-xs text-[var(--ink-faint)] text-center mt-4">
              Hover to open
            </p>
          </div>

          {/* Right Column: Flat editorial rows with position: relative; z-index: 2 */}
          <div className="lg:col-span-6 relative z-[2]">
            {/* Top hairline */}
            <div className="w-full h-px bg-[var(--line)]" />

            {itemsList.map((cert, idx) => {
              const isHovered = hoveredIdx === idx;
              const isExpanded = expandedIdx === idx;
              const isOpen = isHovered || isExpanded;
              const hasValidUrl =
                cert.credentialUrl &&
                !cert.credentialUrl.startsWith('[') &&
                cert.credentialUrl.trim().length > 0;
              const hasValidDate =
                cert.issued &&
                !cert.issued.startsWith('[') &&
                cert.issued.trim().length > 0;

              return (
                <div
                  key={cert.title}
                  onMouseEnter={() => openFolderWithGrace(idx)}
                  onMouseLeave={closeFolderWithGrace}
                >
                  {/* Row Header Button */}
                  <button
                    type="button"
                    onClick={() => handleRowToggle(idx)}
                    onKeyDown={(e) => handleRowKeyDown(e, idx)}
                    onFocus={() => openFolderWithGrace(idx)}
                    onBlur={closeFolderWithGrace}
                    aria-expanded={isOpen}
                    className="w-full text-left py-7 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] rounded-sm group"
                  >
                    {/* Left: index number (mono, small), then title + issuer */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <span className="font-mono text-[13px] text-[var(--ink-faint)] pt-1 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`text-xl sm:text-2xl md:text-[26px] font-sans font-medium text-[var(--ink)] leading-tight transition-transform duration-300 ${
                            isOpen ? 'translate-x-2' : ''
                          }`}
                        >
                          {cert.title}
                        </h3>
                        <p className="font-sans text-sm text-[var(--ink-dim)] mt-1">
                          {cert.issuer} · {cert.type}
                        </p>
                      </div>
                    </div>

                    {/* Arrow icon right */}
                    <span
                      className={`text-[var(--ink-dim)] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-[-45deg]' : ''
                      }`}
                    >
                      <HugeiconsIcon
                        icon={isOpen ? ArrowUpRight01Icon : ArrowRight01Icon}
                        size={20}
                      />
                    </span>
                  </button>

                  {/* Factual Accordion Body (Only show real date/URL or status) */}
                  <div
                    className="transition-[grid-template-rows] duration-[350ms] ease-out"
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-12 pr-4 text-sm text-[var(--ink-dim)]">
                        <div className="flex flex-wrap items-center gap-4 font-sans text-xs">
                          {hasValidDate && (
                            <span className="text-[var(--ink-faint)]">
                              Issued: {cert.issued}
                            </span>
                          )}

                          {hasValidUrl ? (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium hover:underline"
                            >
                              <span>View credential</span>
                              <HugeiconsIcon
                                icon={ArrowUpRight01Icon}
                                size={14}
                              />
                            </a>
                          ) : (
                            <span className="text-[var(--ink-faint)]">
                              Credential verification pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom hairline under each row */}
                  <div className="w-full h-px bg-[var(--line)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Full-bleed Marquee Strip: between two hairlines, 64px tall, 96px space above and below */}
        <div className="mt-24 mb-24">
          {/* Top hairline */}
          <div className="w-full h-px bg-[var(--line)]" />
          <div className="h-16 flex items-center overflow-hidden">
            <LogoLoop
              logos={marqueeLogos}
              logoHeight={28}
              gap={56}
              speed={40}
              direction="left"
              fadeOut={true}
              muted={0.6}
              draggable={true}
              ariaLabel="Certified disciplines marquee"
            />
          </div>
          {/* Bottom hairline */}
          <div className="w-full h-px bg-[var(--line)]" />
        </div>
      </div>
    </section>
  );
}
