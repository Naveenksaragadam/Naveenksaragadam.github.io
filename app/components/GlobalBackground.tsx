'use client'

import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function GlobalBackground() {
    const pathname = usePathname()
    const isHome = pathname === '/'
    
    const { scrollYProgress } = useScroll()
    
    // On home page, fade in background after the scrolly canvas (which ends at scrollProgress ~0.4-0.5)
    // On other pages, keep it fully visible
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.2], // Start fading in after the first section of scrolly canvas
        isHome ? [0, 0, 1] : [1, 1, 1]
    )

    return (
        <motion.div
            style={{ opacity }}
            className="fixed inset-0 z-[-1] overflow-hidden bg-white dark:bg-[#050505] pointer-events-none"
            suppressHydrationWarning
        >
            {/* Ambient Background Glows - Adjusted for Light/Dark Mode */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-200/40 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

            {/* Subtle Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        </motion.div>
    )
}
