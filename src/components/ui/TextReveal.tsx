'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useMediaQuery } from '@/lib/useMediaQuery';

interface WordRevealProps {
  text: string;
  className?: string;
  staggerMs?: number;
}

export function WordReveal({
  text,
  className = '',
  staggerMs = 24,
}: WordRevealProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(containerRef, {
    margin: '-15%',
    once: true,
  });
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (prefersReduced) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0.15, filter: 'blur(6px)' }}
          animate={
            isInView
              ? { opacity: 1, filter: 'blur(0px)' }
              : { opacity: 0.15, filter: 'blur(6px)' }
          }
          transition={{
            duration: 0.45,
            delay: (i * staggerMs) / 1000,
            ease: [0.2, 0.9, 0.2, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

interface MaskHeadlineProps {
  lines: string[];
  className?: string;
  italicWord?: string;
}

export function MaskHeadline({
  lines,
  className = '',
  italicWord,
}: MaskHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(containerRef, {
    margin: '-15%',
    once: true,
  });
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const fullText = lines.join(' ');

  if (prefersReduced) {
    return (
      <h2 className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className="block">
            {italicWord && line.includes(italicWord) ? (
              <>
                {line.replace(italicWord, '')}
                <span className="font-serif italic font-normal">{italicWord}</span>
              </>
            ) : (
              line
            )}
          </span>
        ))}
      </h2>
    );
  }

  return (
    <h2 ref={containerRef} className={className} aria-label={fullText}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-1">
          <motion.span
            aria-hidden="true"
            className="block"
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.7,
              delay: idx * 0.09,
              ease: [0.2, 0.9, 0.2, 1],
            }}
          >
            {italicWord && line.includes(italicWord) ? (
              <>
                {line.replace(italicWord, '')}
                <span className="font-serif italic font-normal">{italicWord}</span>
              </>
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
