'use client'

import { useState } from 'react'
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main id="home" className="relative w-full bg-[#121212]">
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
      <ScrollyCanvas onLoaded={() => { }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Overlay />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Projects />
        <Footer />
      </motion.div>

    </main>
  );
}
