'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Marquee from './Marquee'
import ScrambleText from './ScrambleText'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const duration = 2500
        const steps = 100
        const intervalTime = duration / steps

        let current = 0
        const timer = setInterval(() => {
            current += 1
            if (current > 100) {
                clearInterval(timer)
                setCount(100)
                setTimeout(() => setIsVisible(false), 800)
            } else {
                setCount(current)
            }
        }, intervalTime)

        return () => clearInterval(timer)
    }, [])

    return (
        <AnimatePresence mode="wait" onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212] overflow-hidden cursor-none"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Background Marquee */}
                    <div className="absolute inset-0 flex flex-col justify-between opacity-20 pointer-events-none select-none">
                        <Marquee items={["DATA ENGINEER", "ANALYTICS", "PIPELINES", "CLOUD", "SCALABLE"]} speed={40} className="opacity-50" />
                        <Marquee items={["PYTHON", "SQL", "SPARK", "KAFKA", "AIRFLOW"]} direction="right" speed={35} className="opacity-30" />
                        <Marquee items={["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "FRAMER"]} speed={30} className="opacity-50" />
                        <Marquee items={["CLICKHOUSE", "POSTGRES", "REDIS", "DOCKER", "KUBERNETES"]} direction="right" speed={45} className="opacity-30" />
                    </div>

                    {/* Centered Content */}
                    <div className="relative z-10 flex flex-col items-center gap-4 md:gap-8">
                        {/* Scramble Title */}
                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white text-center leading-none">
                                <span className="hidden md:inline-block">{"{ "}</span>
                                <ScrambleText text="NAVEEN" duration={1.5} className="inline-block min-w-[12ch] text-center" />
                                <span className="hidden md:inline-block">{" }"}</span>
                            </h1>
                            <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white/50 text-center leading-none mt-2">
                                <ScrambleText text="SARAGADAM" duration={2.0} />
                            </h1>
                        </div>

                        {/* Odometer */}
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-px w-12 bg-white/20"></div>
                            <span className="text-xl md:text-2xl font-mono text-white/80 tabular-nums">
                                {count}%
                            </span>
                            <div className="h-px w-12 bg-white/20"></div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
