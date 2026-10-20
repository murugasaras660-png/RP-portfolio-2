'use client';

import React from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  distance?: number;
  className?: string;
};

export const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  distance = 50,
  className,
}: CharacterProps) => {
  const isSpace = char === ' ';
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * distance, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * distance, 0]
  );

  return (
    <motion.span
      className={cn('inline-block text-[var(--ink)] transition-colors', isSpace && 'w-4', className)}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};

type IconCharacterProps = {
  iconSrc?: string;
  iconNode?: React.ReactNode;
  label: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
};

export const CharacterV2 = ({
  iconSrc,
  iconNode,
  label,
  index,
  centerIndex,
  scrollYProgress,
  className,
}: IconCharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 40, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 35, 0]
  );

  return (
    <motion.div
      title={label}
      className={cn(
        'inline-flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--line)] shadow-lg transition-all',
        className
      )}
      style={{
        x,
        scale,
        y,
        transformOrigin: 'center',
      }}
    >
      {iconSrc ? (
        <img src={iconSrc} alt={label} className="w-8 h-8 object-contain" />
      ) : (
        iconNode
      )}
      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink-dim)]">
        {label}
      </span>
    </motion.div>
  );
};

export const Bracket = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={cn('h-10 text-[var(--ink-dim)]', className)}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};
