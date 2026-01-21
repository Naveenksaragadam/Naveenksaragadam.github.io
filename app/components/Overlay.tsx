'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Section 1: Title (0% - 20%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const y1 = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-50vh"])

    // Section 2: Bio (25% - 65%) - Right Aligned
    // Rise from bottom (25-35%), Hold longer (35-55%), Exit up (55-65%)
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0])
    const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], ["60vh", "0vh", "0vh", "-60vh"])

    // Section 3: Experience (65% - 95%) - Left Aligned
    // Rise from bottom (65-75%), Hold (75-85%), Exit up (85-95%)
    const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0])
    const y3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], ["60vh", "0vh", "0vh", "-60vh"])

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* Section 1 - Title */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-center p-8 text-center"
            >
                <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference leading-[0.9]">
                    Naveen <br className="hidden md:block" /> Saragadam.
                    <span className="text-white/60 text-2xl md:text-4xl mt-6 block tracking-normal font-light">Data Engineer.</span>
                </h1>
            </motion.div>

            {/* Section 2 - Bio (Right Aligned) */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-end pr-6 md:pr-20 pointer-events-none"
            >
                <div className="text-right max-w-3xl">
                    <h2 className="text-3xl md:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tighter">
                        Modernizing Infrastructure for <br /><span className="text-orange-500">Fortune 100</span> Leaders.
                    </h2>
                    <p className="text-lg md:text-2xl text-white/80 leading-relaxed ml-auto font-light max-w-xl">
                        Driving transformation at <strong className="text-white font-medium">Target</strong> and <strong className="text-white font-medium">General Motors</strong>.
                        I specialize in <strong className="text-white font-medium">Scalable Data Pipelines</strong> and <strong className="text-white font-medium">Lakehouse Architectures</strong> that empower critical business decisions.
                    </p>
                </div>
            </motion.div>

            {/* Section 3 - Experience (Left Aligned) */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-start pl-6 md:pl-20 pointer-events-none"
            >
                <div className="max-w-4xl">
                    <h2 className="text-3xl md:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tighter">
                        Reduced pipeline runtimes <span className="text-blue-500">30%</span> on <br /> terabyte-scale datasets.
                    </h2>
                    <p className="text-lg md:text-2xl text-white/80 leading-relaxed max-w-2xl font-light">
                        I migrated <strong className="text-white font-medium">20+ legacy Hadoop/Hive systems</strong> to PySpark, supporting 300+ downstream reports.
                        My robust data quality frameworks ensure <strong className="text-white font-medium">99.9% SLA reliability</strong> for critical pricing decisions.
                    </p>
                </div>
            </motion.div>

        </div>
    )
}
