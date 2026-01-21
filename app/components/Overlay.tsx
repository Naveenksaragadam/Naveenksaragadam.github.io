'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null)

    // We can hook into the same scroll progress as the canvas if we want, 
    // or just use window scroll. Since the canvas is 500vh, we can map 
    // sections of that scroll to these text elements.

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Paralax effects
    const y1 = useTransform(scrollYProgress, [0, 0.2], ["0%", "-50%"])
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0])

    const y2 = useTransform(scrollYProgress, [0.2, 0.45], ["50%", "-50%"])
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0])

    const y3 = useTransform(scrollYProgress, [0.5, 0.75], ["50%", "-50%"])
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0])

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* Section 1 */}
            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="sticky top-0 h-screen w-full flex items-center justify-center p-8 text-center"
            >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mix-blend-difference">
                    Naveen Saragadam.<br />
                    <span className="text-gray-400 text-3xl md:text-5xl mt-4 block">Creative Developer.</span>
                </h1>
            </motion.div>

            {/* Section 2 */}
            <div className="absolute top-[30%] w-full h-[100vh]">
                {/* 'sticky' inside absolute to keep it in view during its section? 
             Actually, simpler to just use fixed/sticky positioning logic simulated by transform 
             or just place them absolutely at % offsets and let parallax move them.
             Let's use the transform sticky trick or just absolute placement.
         */}
                <motion.div
                    style={{ y: y2, opacity: opacity2 }}
                    className="w-full h-full flex items-center justify-start ml-12 md:ml-32"
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-white max-w-2xl leading-tight">
                        I build <span className="text-blue-500">digital experiences</span> that feel alive.
                    </h2>
                </motion.div>
            </div>

            {/* Section 3 */}
            <div className="absolute top-[60%] w-full h-[100vh]">
                <motion.div
                    style={{ y: y3, opacity: opacity3 }}
                    className="w-full h-full flex items-center justify-end mr-12 md:mr-32"
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-white text-right max-w-2xl leading-tight">
                        Bridging <br />
                        <span className="text-purple-500">Design</span> & <span className="text-green-400">Engineering</span>.
                    </h2>
                </motion.div>
            </div>

        </div>
    )
}
