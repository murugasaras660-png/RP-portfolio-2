import React from 'react';

interface TornDividerProps {
  className?: string;
  flip?: boolean;
  fill?: string;
}

export function TornDivider({
  className = '',
  flip = false,
  fill = 'var(--bg)',
}: TornDividerProps) {
  // Low amplitude single-layer subtle torn paper edge
  const subtleTornPath =
    'M0,0 L0,14 Q40,19 80,13 T160,16 T240,12 T320,18 T400,13 T480,17 T560,12 T640,16 T720,12 T800,18 T880,13 T960,17 T1040,12 T1120,16 T1200,13 L1200,32 L0,32 Z';

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none pointer-events-none select-none relative z-10 ${
        flip ? 'rotate-180 -mb-1' : '-mt-1'
      } ${className}`}
      style={{ height: '28px' }}
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={subtleTornPath} fill={fill} />
      </svg>
    </div>
  );
}

export default TornDivider;
