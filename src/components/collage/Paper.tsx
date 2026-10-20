import React from 'react';

interface PaperProps {
  children?: React.ReactNode;
  className?: string;
  rotation?: number;
  style?: React.CSSProperties;
  rounded?: string;
}

export function Paper({
  children,
  className = '',
  rotation = 0,
  rounded = 'rounded-2xl',
  style,
}: PaperProps) {
  const clampedRotation = Math.max(-4, Math.min(4, rotation));

  return (
    <div
      className={`relative bg-[var(--paper)] text-[var(--paper-ink)] ${rounded} ${className}`}
      style={{
        boxShadow:
          '0 1px 1px rgba(var(--shadow-rgb), 0.08), 0 10px 24px -10px rgba(var(--shadow-rgb), 0.35), 0 2px 4px rgba(var(--shadow-rgb), 0.15)',
        transform: clampedRotation ? `rotate(${clampedRotation}deg)` : undefined,
        ...style,
      }}
    >
      {/* Subtle paper grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply rounded-[inherit]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Paper;
