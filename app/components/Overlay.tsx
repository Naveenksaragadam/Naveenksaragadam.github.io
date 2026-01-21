'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import Typewriter from './Typewriter'

const MaskedText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function Overlay() {
    // ... existing hooks ...
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const y1 = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-50vh"])

    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0])
    const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], ["60vh", "0vh", "0vh", "-60vh"])
    const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0])
    const y3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], ["60vh", "0vh", "0vh", "-60vh"])

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* Section 1 - Title */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="fixed top-0 left-0 h-screen w-full flex flex-col items-center justify-center p-8 text-center pt-[12vh]"
            >
                <div className="relative z-10 flex flex-col items-center gap-0">
                    {/* Gradient text reflecting ambient lighting */}
                    <MaskedText delay={2} className="">
                        <h1
                            className="text-[3.875rem] md:text-[6.125rem] lg:text-[8.125rem] font-medium tracking-tight leading-[0.95] mb-1 select-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.95) 0%, rgba(255, 255, 255, 0.85) 40%, rgba(255, 255, 255, 0.85) 60%, rgba(251, 191, 136, 0.95) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Naveen
                        </h1>
                        <h1
                            className="text-[3.875rem] md:text-[6.125rem] lg:text-[8.125rem] font-medium tracking-tight leading-[1.2] -mt-2 select-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.95) 0%, rgba(255, 255, 255, 0.85) 40%, rgba(255, 255, 255, 0.85) 60%, rgba(251, 191, 136, 0.95) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Saragadam
                        </h1>
                    </MaskedText>
                </div>

                {/* Job Title with glassmorphism background */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 mt-8"
                >
                    <div className="flex items-center justify-center text-sm md:text-base font-light tracking-[0.2em] uppercase text-white/90">
                        <span className="mr-3 text-blue-400">—</span>
                        <Typewriter
                            words={['Data Engineer', 'Analytics Engineer', 'Data Analyst']}
                            className=""
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Section 2 - Bio (Right Aligned) */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-end pr-6 md:pr-16 pointer-events-none"
            >
                <div className="text-right max-w-3xl">
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-light text-white/90 mb-6 leading-[1.1] tracking-tight">
                        Modernizing Infrastructure for <br />
                        <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent font-normal">Fortune 100</span> Leaders.
                    </h2>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light max-w-lg ml-auto">
                        Driving transformation at <span className="text-white/85">Target</span> and <span className="text-white/85">General Motors</span>.
                        I specialize in <span className="text-white/85">Scalable Data Pipelines</span> and <span className="text-white/85">Lakehouse Architectures</span>.
                    </p>
                </div>
            </motion.div>

            {/* Section 3 - Experience (Left Aligned) */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-start pl-6 md:pl-16 pointer-events-none"
            >
                <div className="max-w-3xl">
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-light text-white/90 mb-6 leading-[1.1] tracking-tight">
                        Reduced pipeline runtimes <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent font-normal">30%</span> on <br /> terabyte-scale datasets.
                    </h2>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light max-w-2xl">
                        I migrated <span className="text-white/85">20+ legacy Hadoop/Hive systems</span> to PySpark, supporting 300+ downstream reports.
                        My robust data quality frameworks ensure <span className="text-white/85">99.9% SLA reliability</span>.
                    </p>
                </div>
            </motion.div>

        </div>
    )
}
