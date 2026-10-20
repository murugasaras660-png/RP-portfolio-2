import React, { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

export const THEME_TOKENS = {
  dark: {
    isDark: true,
    theme: 'dark' as const,
    bg: '#120F17',
    bgElev: '#181520',
    bgCard: '#1B1823',
    ink: '#EDEBE6',
    inkDim: '#A19EAB',
    inkFaint: '#6E6B78',
    line: 'rgba(237, 235, 230, 0.10)',
    paper: '#F2F1EE',
    paperInk: '#16131C',
    gooeyNav: {
      theme: 'dark' as const,
      color: '#EDEBE6',
      activeTextColor: '#120F17',
      panelBg: 'rgba(18, 15, 23, 0.75)',
    },
    spotlightCard: {
      theme: 'dark' as const,
      spotlightColor: '#EDEBE6',
      intensity: 0.14,
    },
    folder: {
      theme: 'dark' as const,
      color: '#2B2735',
      paperColor: '#F2F1EE',
    },
    reflectiveCard: {
      theme: 'dark' as const,
      tint: '#E9E6EF',
      statusColor: '#EDEBE6',
    },
    flowingMenu: {
      bgColor: '#120F17',
      textColor: '#EDEBE6',
      marqueeBgColor: '#F2F1EE',
      marqueeTextColor: '#16131C',
      borderColor: 'rgba(237, 235, 230, 0.10)',
    },
    lanyard: {
      theme: 'dark' as const,
      cardColor: '#F2F1EE',
      strapColor: '#1D1A26',
    },
    logoLoop: {
      color: '#A19EAB',
    },
    cardNav: {
      theme: 'dark' as const,
    },
  },
  light: {
    isDark: false,
    theme: 'light' as const,
    bg: '#E9E6DF',
    bgElev: '#F0EEE8',
    bgCard: '#F4F2EC',
    ink: '#17141D',
    inkDim: '#56525F',
    inkFaint: '#8C8895',
    line: 'rgba(23, 20, 29, 0.12)',
    paper: '#F2F1EE',
    paperInk: '#16131C',
    gooeyNav: {
      theme: 'light' as const,
      color: '#17141D',
      activeTextColor: '#E9E6DF',
      panelBg: 'rgba(233, 230, 223, 0.75)',
    },
    spotlightCard: {
      theme: 'light' as const,
      spotlightColor: '#17141D',
      intensity: 0.08,
    },
    folder: {
      theme: 'light' as const,
      color: '#D8D4CA',
      paperColor: '#F2F1EE',
    },
    reflectiveCard: {
      theme: 'light' as const,
      tint: '#D4D0DC',
      statusColor: '#17141D',
    },
    flowingMenu: {
      bgColor: '#E9E6DF',
      textColor: '#17141D',
      marqueeBgColor: '#17141D',
      marqueeTextColor: '#F2F1EE',
      borderColor: 'rgba(23, 20, 29, 0.12)',
    },
    lanyard: {
      theme: 'light' as const,
      cardColor: '#F2F1EE',
      strapColor: '#4A4652',
    },
    logoLoop: {
      color: '#56525F',
    },
    cardNav: {
      theme: 'light' as const,
    },
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="rp-theme"
      disableTransitionOnChange
    >
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  );
}

function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', resolvedTheme === 'light' ? '#E9E6DF' : '#120F17');
    }
  }, [resolvedTheme]);

  return null;
}

export function useThemeTokens() {
  const { resolvedTheme, theme } = useTheme();
  const isDark = (resolvedTheme || theme) !== 'light';
  return isDark ? THEME_TOKENS.dark : THEME_TOKENS.light;
}

export function useThemeProps() {
  return useThemeTokens();
}
