import React, { useState, useEffect } from 'react';

interface HalftonePhotoProps {
  src?: string;
  alt: string;
  className?: string;
  rotation?: number;
  width?: number | string;
  height?: number | string;
}

export function HalftonePhoto({
  src,
  alt,
  className = '',
  rotation = 0,
  width = 280,
  height = 340,
}: HalftonePhotoProps) {
  const [imgError, setImgError] = useState(!src);
  const clampedRotation = Math.max(-4, Math.min(4, rotation));

  useEffect(() => {
    if (imgError && process.env.NODE_ENV !== 'production') {
      console.info(
        '[HalftonePhoto] Portrait placeholder active. To use custom photo, add public/profile/portrait.jpg'
      );
    }
  }, [imgError]);

  return (
    <div
      className={`relative inline-block p-2 bg-[var(--paper)] text-[var(--paper-ink)] shadow-xl rounded-xl ${className}`}
      style={{
        transform: clampedRotation ? `rotate(${clampedRotation}deg)` : undefined,
        boxShadow:
          '0 1px 1px rgba(var(--shadow-rgb), 0.08), 0 16px 32px -12px rgba(var(--shadow-rgb), 0.35), 0 2px 8px rgba(var(--shadow-rgb), 0.15)',
      }}
    >
      {/* Image container with halftone raster effect */}
      <div
        className="relative overflow-hidden bg-[#D8D5CD] rounded-lg"
        style={{ width, height }}
      >
        {!imgError && src ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
        ) : (
          /* Tasteful elegant placeholder (no visible [TODO] text) */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#D2CFCA] text-[#4A4652]">
            <div className="w-20 h-20 rounded-full border border-[#8C8895]/40 flex items-center justify-center mb-3 text-[#2A2733] bg-[#E2DFD8]">
              <span className="font-serif italic text-2xl font-bold">RP</span>
            </div>
            <span className="font-sans text-xs font-medium text-[#2A2733] tracking-tight">
              Rithick Prasath
            </span>
            <span className="font-sans text-[11px] text-[#5C5966] mt-0.5">
              Software Engineer
            </span>
          </div>
        )}

        {/* Halftone dot screen overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(#17141D 1.2px, transparent 1.2px)',
            backgroundSize: '4px 4px',
          }}
        />

        {/* Paper texture overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}

export default HalftonePhoto;
