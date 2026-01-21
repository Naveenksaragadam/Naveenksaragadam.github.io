'use client'

import { motion } from 'framer-motion'

export default function Marquee({ items, direction = 'left', speed = 20, className = "" }: { items: string[], direction?: 'left' | 'right', speed?: number, className?: string }) {
    return (
        <div className={`flex overflow-hidden whitespace-nowrap select-none ${className}`}>
            <motion.div
                className="flex flex-shrink-0"
                initial={{ x: direction === 'left' ? 0 : '-100%' }}
                animate={{ x: direction === 'left' ? '-100%' : 0 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {items.map((item, i) => (
                    <span key={i} className="mx-8 text-4xl font-bold uppercase text-white/5">{item}</span>
                ))}
            </motion.div>
            <motion.div
                className="flex flex-shrink-0"
                initial={{ x: direction === 'left' ? 0 : '-100%' }}
                animate={{ x: direction === 'left' ? '-100%' : 0 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {items.map((item, i) => (
                    <span key={i} className="mx-8 text-4xl font-bold uppercase text-white/5">{item}</span>
                ))}
            </motion.div>
        </div>
    )
}
