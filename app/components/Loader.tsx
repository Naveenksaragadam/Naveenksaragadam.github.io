'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader({ onLoadComplete }: { onLoadComplete: () => void }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Pseudo-progress for initial visual feedback
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(timer)
                    return 90
                }
                return prev + Math.floor(Math.random() * 10)
            })
        }, 100)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        // When real loading is done (passed via props ideally, but for now we simulate 
        // finishing the last 10% when the parent mounts/signals)
        // Actually, this component is just the UI. The parent controls removal.
        // We'll just animate the number.
    }, [])

    // We'll just use this component to display the loading state. 
    // The parent will unmount it or we can animate it out.
    // Let's rely on the parent passage of "isLoaded" to trigger the exit animation 
    // or just use AnimatePresence in the parent.

    return (
        <div className="fixed inset-0 z-[100] bg-[#121212] flex items-center justify-center">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <span className="text-8xl md:text-9xl font-bold text-white tracking-tighter tabular-nums">
                        {progress}%
                    </span>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-1 bg-white mt-4 mx-auto max-w-[200px]"
                    />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-white/40 text-sm uppercase tracking-[0.2em]"
                >
                    Loading Experience
                </motion.p>
            </div>
        </div>
    )
}
