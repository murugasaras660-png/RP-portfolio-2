import { useRef } from 'react';
import { useScroll } from 'motion/react';
import { CharacterV1 } from '@/components/ui/skiper31';
import { useMediaQuery } from '@/lib/useMediaQuery';

export default function Statement() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const line1 = 'RITHICK';
  const line2 = 'PRASATH';

  const chars1 = line1.split('');
  const center1 = Math.floor(chars1.length / 2);

  const chars2 = line2.split('');
  const center2 = Math.floor(chars2.length / 2);

  const charDistance = isMobile ? 18 : 50;

  return (
    <section
      ref={targetRef}
      className="relative h-[130svh] md:h-[180vh] bg-[var(--bg)]"
      aria-label="Statement: Rithick Prasath"
    >
      {/* Screen reader accessible heading */}
      <h2 className="sr-only">Rithick Prasath</h2>

      {/* Sticky viewport stage */}
      <div className="sticky top-0 h-[100svh] md:h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none">
        {/* Subtle label — hidden on mobile to avoid clutter */}
        <span className="hidden md:block font-sans text-xs uppercase tracking-[0.04em] font-medium text-[var(--ink-faint)] mb-8">
          Scroll to explore
        </span>

        {/* 3D Perspective container */}
        <div
          className="w-full max-w-5xl text-center flex flex-col items-center justify-center gap-2 md:gap-4"
          style={{ perspective: '800px' }}
          aria-hidden="true"
        >
          {/* Line 1: RITHICK */}
          <div className="font-sans text-[13.5vw] sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tight text-[var(--ink)] flex justify-center gap-0.5 sm:gap-2">
            {chars1.map((char, index) => (
              <CharacterV1
                key={`l1-${index}`}
                char={char}
                index={index}
                centerIndex={center1}
                distance={charDistance}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Line 2: PRASATH */}
          <div className="font-sans text-[13.5vw] sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tight text-[var(--ink)] flex justify-center gap-0.5 sm:gap-2">
            {chars2.map((char, index) => (
              <CharacterV1
                key={`l2-${index}`}
                char={char}
                index={index}
                centerIndex={center2}
                distance={charDistance}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <span className="w-12 h-px bg-[var(--line)]" />
          <span className="font-sans text-xs font-medium text-[var(--ink-dim)]">
            Builder & Engineer
          </span>
          <span className="w-12 h-px bg-[var(--line)]" />
        </div>
      </div>
    </section>
  );
}
