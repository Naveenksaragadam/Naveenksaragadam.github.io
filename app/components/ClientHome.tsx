'use client'

import { AnimatePresence, motion } from 'framer-motion'
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import Projects from "./Projects"; // Keep import if needed later, or remove if unused. For now keeping to minimize breakage if referenced elsewhere.
import BentoGrid from "./BentoGrid";
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";
import Logo from "./Logo";
import Footer from "./Footer";
import Noise from "./Noise";
import GlobalMenu from "./GlobalMenu";
import Preloader from "./Preloader";
import { useLoading } from "./Providers";

export default function ClientHome() {
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
                {/* Replaced Projects with BentoGrid as requested */}
                <BentoGrid />
                {/* <Projects /> */}
            </motion.div>

        </main>
    );
}
