import React, { createContext, useContext, useState, useEffect } from 'react';

interface IntroContextType {
  introDone: boolean;
  setIntroDone: (done: boolean) => void;
  shouldPlayIntro: boolean;
}

const IntroContext = createContext<IntroContextType>({
  introDone: true,
  setIntroDone: () => {},
  shouldPlayIntro: false,
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [shouldPlay] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem('rp-intro-seen');
    const skip = window.location.search.includes('intro=0');
    return !seen && !skip;
  });

  const [introDone, setIntroDone] = useState<boolean>(() => !shouldPlay);

  useEffect(() => {
    if (!shouldPlay) {
      const staticEl = document.getElementById('static-preloader');
      if (staticEl) staticEl.remove();
    }
  }, [shouldPlay]);

  return (
    <IntroContext.Provider value={{ introDone, setIntroDone, shouldPlayIntro: shouldPlay }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
