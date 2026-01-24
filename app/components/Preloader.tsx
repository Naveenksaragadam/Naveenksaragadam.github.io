import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import Marquee from './Marquee'
import ScrambleText from './ScrambleText'
import Odometer from './Odometer'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Use Framer Motion to animate the value from 0 to 100
        // This ensures frame-perfect updates without janky intervals
        const controls = animate(0, 100, {
            duration: 1.5, // 1.5s for a brisk but readable load
            ease: "linear",
            onUpdate: (value) => {
                setCount(Math.floor(value))
            },
            onComplete: () => {
                // Wait a moment at 100% before exiting
                setTimeout(() => setIsVisible(false), 200)
            }
        })

        return () => controls.stop()
    }, [])

    return (
        <AnimatePresence mode="wait" onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212] overflow-hidden cursor-none"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }} // Custom "quint" or "expo" like curve for snappy exit
                >
                    {/* Ambient Background Gradients */}
                    <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-orange-600 rounded-full blur-[120px] opacity-20 animate-pulse delay-1000"></div>

                    {/* Background Marquee */}
                    <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none select-none mix-blend-overlay" aria-hidden="true">
                        <Marquee items={["DATA ENGINEER", "ANALYTICS", "PIPELINES", "CLOUD", "SCALABLE"]} speed={40} className="opacity-50" />
                        <Marquee items={["PYTHON", "SQL", "SPARK", "KAFKA", "AIRFLOW"]} direction="right" speed={35} className="opacity-30" />
                        <Marquee items={["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "FRAMER"]} speed={30} className="opacity-50" />
                        <Marquee items={["CLICKHOUSE", "POSTGRES", "REDIS", "DOCKER", "KUBERNETES"]} direction="right" speed={45} className="opacity-30" />
                    </div>

                    {/* Centered Content */}
                    <div className="relative z-10 flex flex-col items-center gap-6 md:gap-10">
                        {/* Scramble Title - Decorative Name */}
                        <div className="flex flex-col items-center" aria-hidden="true">
                            <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white text-center leading-[0.9]">
                                <span className="inline-block text-white/40 font-light mr-4 align-top">{`{ `}</span>
                                <ScrambleText text="NAVEEN" duration={0.8} className="inline-flex" targetChars="A" />
                                <span className="inline-block text-white/40 font-light ml-4 align-top">{` }`}</span>
                            </h1>
                            <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white text-center leading-[0.9]">
                                <ScrambleText text="SARAGADAM" duration={1.0} className="inline-flex" targetChars="A" />
                            </h1>
                        </div>
                        <div className="sr-only">Loading Naveen Saragadam Portfolio</div>

                        {/* Odometer */}
                        <div className="mt-4 flex items-center justify-center p-4">
                            <div className="text-3xl md:text-5xl font-bold text-white tabular-nums tracking-wider mix-blend-difference" role="status" aria-label={`Loading ${count}%`}>
                                <Odometer value={count} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
