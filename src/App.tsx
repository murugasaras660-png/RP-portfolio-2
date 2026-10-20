import { ThemeProvider } from '@/lib/theme';
import { SmoothScrollProvider } from '@/lib/lenis';
import { IntroProvider } from '@/lib/introContext';
import { IntroSequence } from '@/components/ui/IntroSequence';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Statement from '@/components/sections/Statement';
import AboutStack from '@/components/sections/AboutStack';
import TheCard from '@/components/sections/TheCard';
import Work from '@/components/sections/Work';
import Learning from '@/components/sections/Learning';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import { TornDivider } from '@/components/collage/TornDivider';

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <IntroProvider>
          <IntroSequence />
          <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper-ink)]">
            <Navbar />
            <main id="main-content">
              <Hero />
              <Statement />
              <AboutStack />
              {/* Subtle torn divider before The Card */}
              <TornDivider />
              <TheCard />
              {/* Subtle torn divider after The Card */}
              <TornDivider flip={true} />
              <Work />
              <Learning />
              <Contact />
            </main>
            <Footer />
          </div>
        </IntroProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
