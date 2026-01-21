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
import Loader from "./components/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main id="home" className="relative w-full bg-[#121212]">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onLoadComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Noise />
      <ScrollProgress />
      <Logo />
      <GlobalMenu />
      <Navbar />

      {/* 
        ScrollyCanvas triggers the load completion. 
        It needs to be rendered to start loading. 
      */}
      <ScrollyCanvas onLoaded={() => setTimeout(() => setIsLoading(false), 500)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Overlay />
      </motion.div>

      {/* Projects and Footer don't need to be hidden, they are below fold, 
          but fading them in with the Overlay feels nicer. */}
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
