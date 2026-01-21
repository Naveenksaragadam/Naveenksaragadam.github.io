'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import Typewriter from './Typewriter'

export default function Overlay() {
    // ... existing hooks ...
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // ... existing transforms ...
    // Section 1: Title (0% - 20%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const y1 = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-50vh"])

    // ... existing transforms for other sections ...
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0])
    const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], ["60vh", "0vh", "0vh", "-60vh"])
    const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0])
    const y3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], ["60vh", "0vh", "0vh", "-60vh"])

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* Section 1 - Title */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="fixed top-0 left-0 h-screen w-full flex flex-col items-center justify-center p-4"
            >
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl md:text-[11rem] font-bold tracking-tighter text-white mix-blend-difference leading-[0.85] uppercase">
                        Naveen<br />Saragadam
                    </h1>
                    <div className="mt-8 md:mt-12 flex justify-center">
                        <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-sm md:text-xl font-medium tracking-widest uppercase text-white/80">
                            <Typewriter
                                words={['Data Engineer', 'Analytics', 'Architecture']}
                                className="text-white"
                            />
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Section 2 - Bio (Right Aligned - Editorial Style) */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-end pr-8 md:pr-32 pointer-events-none"
            >
                <div className="text-right max-w-4xl">
                    <h2 className="text-5xl md:text-8xl font-bold text-white mix-blend-difference mb-8 leading-[0.9] tracking-tighter">
                        Fortune 100 <br /> Scale.
                    </h2>
                    <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed max-w-xl ml-auto mix-blend-difference">
                        Architecting the data backbones for <strong className="font-medium">Target</strong> and <strong className="font-medium">General Motors</strong>.
                    </p>
                </div>
            </motion.div>

            {/* Section 3 - Experience (Left Aligned - Editorial Style) */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-start pl-8 md:pl-32 pointer-events-none"
            >
                <div className="max-w-4xl">
                    <h2 className="text-5xl md:text-8xl font-bold text-white mix-blend-difference mb-8 leading-[0.9] tracking-tighter">
                        Velocity <br /> & Volume.
                    </h2>
                    <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed max-w-xl mix-blend-difference">
                        Migrating <strong className="font-medium">terabyte-scale</strong> legacy systems to modern lakehouses, reducing runtime by <strong className="font-medium">30%</strong>.
                    </p>
                </div>
            </motion.div>

        </div>
    )
}
