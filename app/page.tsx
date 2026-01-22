'use client'

import { AnimatePresence, motion } from 'framer-motion'
import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import Noise from "./components/Noise";
import GlobalMenu from "./components/GlobalMenu";
import Preloader from "./components/Preloader";
import { useLoading } from "./components/Providers";

export default function Home() {
  const { isLoading, setIsLoading } = useLoading()

  return (
    <main id="home" className="relative w-full">
      {/* 
        Preloader handles the initial load animation (Odometer + Curtain Reveal).
        It signals onComplete when the exit animation finishes.
      */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Noise />
      <ScrollProgress />
      <Logo />
      <GlobalMenu />
      <Navbar />

      {/* 
        ScrollyCanvas loads images in background. 
        We no longer let it control isLoading to enforce the 2s preloader aesthetic.
      */}
      <ScrollyCanvas />

      <Overlay />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Projects />
        <Footer />
      </motion.div>

    </main>
  );
}
