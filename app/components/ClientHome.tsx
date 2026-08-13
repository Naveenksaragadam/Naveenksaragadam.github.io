'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import Projects from "./Projects";
import BentoGrid from "./BentoGrid";
import ScrollProgress from "./ScrollProgress";
import Noise from "./Noise";
import Preloader from "./Preloader";
import { useLoading } from "./Providers";
import SectionSeparator from "./SectionSeparator";

// Journey Components
import NewHero from "./experience/NewHero";
import Timeline from "./experience/Timeline";
import Education from "./experience/Education";
import ContributionGraph from "./experience/ContributionGraph";

export default function ClientHome() {
    const { isLoading, setIsLoading } = useLoading()
    const { scrollY } = useScroll()
    const [vh, setVh] = useState(0)

    useEffect(() => {
        setVh(window.innerHeight)
        const handleResize = () => setVh(window.innerHeight)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    // Fade out the entire scrolly intro (Canvas + Overlay)
    const introOpacity = useTransform(scrollY, [vh * 4, vh * 4.8], [1, 0])
    const introPointerEvents = useTransform(scrollY, [vh * 4, vh * 4.8], ["auto", "none"])

    return (
        <main id="home" className="relative w-full bg-transparent">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <Noise />
            <ScrollProgress />

            {/* Scrolly Intro Group */}
            <motion.div 
                style={{ 
                    opacity: vh > 0 ? introOpacity : 1, 
                    pointerEvents: vh > 0 ? introPointerEvents as any : "auto" 
                }}
                className="relative z-10"
            >
                <ScrollyCanvas />
                <Overlay />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-20 bg-transparent"
            >
                {/* Journey Sections - Moved to Second Place */}
                <div id="journey-section">
                    <NewHero />
                    <SectionSeparator />
                    <Timeline />
                    <SectionSeparator />
                    <Education />
                    <SectionSeparator />
                    <ContributionGraph />
                </div>

                <SectionSeparator />

                {/* Work Section - Moved to Third Place */}
                <div id="work-section">
                    <Projects />
                </div>

                <SectionSeparator />

                {/* Summary Section */}
                <BentoGrid />
            </motion.div>
        </main>
    );
}
