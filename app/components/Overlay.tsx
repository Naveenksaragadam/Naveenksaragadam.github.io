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

import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const ScrollIndicator = ({ opacity, scrollYProgress }: { opacity: MotionValue<number>, scrollYProgress: MotionValue<number> }) => {
    const [isHidden, setIsHidden] = useState(false)

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.15) {
            setIsHidden(true)
        } else {
            setIsHidden(false)
        }
    })

    if (isHidden) return null;

    return (
        <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
        >
            <div className="w-[24px] h-[50px] rounded-full border-2 border-zinc-400/80 dark:border-white/80 flex justify-center pt-2 box-border shadow-sm">
                <motion.div
                    animate={{ y: [24, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 0 }}
                    className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
            </div>
        </motion.div>
    )
}

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const opacity1 = useTransform(scrollYProgress, [0, 0.18, 0.2], [1, 1, 0])
    const y1 = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-50vh"])
    const display1 = useTransform(scrollYProgress, (v) => v > 0.22 ? "none" : "flex")

    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0])
    const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], ["60vh", "0vh", "0vh", "-60vh"])
    const display2 = useTransform(scrollYProgress, (v) => (v < 0.23 || v > 0.67) ? "none" : "flex")

    const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0])
    const y3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], ["60vh", "0vh", "0vh", "-60vh"])
    const display3 = useTransform(scrollYProgress, (v) => v < 0.63 ? "none" : "flex")

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* Section 1 - Title */}
            <motion.div
                style={{ opacity: opacity1, y: y1, display: display1 }}
                className="fixed top-0 left-0 h-screen w-full flex flex-col items-center justify-center p-8 text-center pt-[15vh]"
            >
                <div className="relative z-10 flex flex-col items-center gap-0">
                    <MaskedText delay={2} className="">
                        <h1 className="text-[3.84rem] md:text-[6.06rem] lg:text-[8.04rem] font-medium tracking-tight leading-[0.95] mb-0 select-none">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-300 via-white to-orange-200">
                                Naveen
                            </span>
                        </h1>
                        <h1 className="text-[3.84rem] md:text-[6.06rem] lg:text-[8.04rem] font-medium tracking-tight leading-[1.2] -mt-3 select-none">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-300 via-white to-orange-200">
                                Saragadam
                            </span>
                        </h1>
                    </MaskedText>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 mt-8"
                >
                    <div className="flex items-center justify-center text-sm md:text-base font-light tracking-[0.2em] uppercase text-white/90">
                        <span className="mr-3 text-blue-400">—</span>
                        <Typewriter
                            words={['Data Analyst', 'Data Engineer', 'Analytics Engineer']}
                            className=""
                        />
                    </div>
                </motion.div>
                <ScrollIndicator opacity={opacity1} scrollYProgress={scrollYProgress} />
            </motion.div>

            {/* Section 2 - Value Proposition */}
            <motion.div
                style={{ opacity: opacity2, y: y2, display: display2 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-end pr-6 md:pr-16 pointer-events-none"
            >
                <div className="text-right max-w-3xl">
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-light text-zinc-200 mb-6 leading-[1.1] tracking-tight">
                        Powering Analytics for <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-normal">Fortune 100 Leaders</span> like Target &amp; GM.
                    </h2>
                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-light max-w-lg ml-auto">
                        Delivered <span className="text-zinc-100 font-normal">300+ certified dashboards</span> for Target's <span className="text-zinc-100 font-normal">$7.5B business</span>, empowering <span className="text-zinc-100 font-normal">230+ strategy stakeholders</span>.
                    </p>
                </div>
            </motion.div>

            {/* Section 3 - Impact */}
            <motion.div
                style={{ opacity: opacity3, y: y3, display: display3 }}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-start pl-6 md:pl-16 pointer-events-none"
            >
                <div className="max-w-3xl">
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-light text-zinc-200 mb-6 leading-[1.1] tracking-tight">
                        Built production <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent font-normal">ETL/ELT pipelines</span><br />reducing incidents to <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent font-normal">near-zero.</span>
                    </h2>
                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-light max-w-2xl">
                        Engineered dimensional models with <span className="text-zinc-100 font-normal">SQL, PySpark, dbt, &amp; Pydantic</span> — cutting query latency by <span className="text-zinc-100 font-normal">40%</span> and pipeline runtime by <span className="text-zinc-100 font-normal">30%</span>.
                    </p>
                </div>
            </motion.div>

        </div>
    )
}
