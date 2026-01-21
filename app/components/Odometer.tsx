'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

function Digit({ value }: { value: number }) {
    return (
        <div className="relative h-[1em] w-[0.6em] overflow-hidden">
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: -value * 100 + '%' }} // Assuming 1em height per digit
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="absolute top-0 left-0 flex flex-col items-center"
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n, i) => ( // Extra 0 for loop? No, just 0-9 usually enough or wrap.
                    <span key={i} className="h-[1em] flex items-center justify-center">
                        {n}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

// Actually, spring based motion value is smoother for continuous counting
function RollingDigit({ value }: { value: number }) {
    let y = value * -100 + '%'; // Simple visual map? 
    // For 0->100 transition, we want smooth rolling.
    // If we just animate `y`, it works.

    return (
        <div className="relative h-[1em] w-[0.7em] overflow-hidden text-center">
            <motion.div
                className="absolute top-0 left-0 w-full flex flex-col"
                animate={{ y: `${-value * 10}%` }} // 10 digits = 100% height? No, 10 items.
                transition={{ ease: "easeOut", duration: 0.5 }}
            >
                {/* 0-9 */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div key={i} className="h-[1em] flex items-center justify-center">
                        {i}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

// Simpler approach for "Odometer":
// A motion value that goes 0 -> 100.
// We display digits based on that value.
export default function Odometer({ value }: { value: number }) {
    // Split into hundreds, tens, ones (if needed) or just render the number string?
    // User wants "odometer style". Usually means vertical sliding columns.
    // e.g. 04 -> 05. The '4' slides up to '5'.

    // Decompose value (0-100)
    const displayValue = Math.min(100, Math.max(0, Math.round(value))).toString().padStart(3, '0');
    const [d1, d2, d3] = displayValue.split('').map(Number);

    return (
        <div className="flex items-center leading-none overflow-hidden font-mono tracking-tighter">
            <SlidingColumn digit={d1} />
            <SlidingColumn digit={d2} />
            <SlidingColumn digit={d3} />
            <span className="ml-1 text-sm md:text-xl align-top opacity-50">%</span>
        </div>
    )
}

function SlidingColumn({ digit }: { digit: number }) {
    return (
        <div className="relative h-[1em] w-[0.6em] overflow-hidden">
            <motion.div
                animate={{ y: `-${digit * 10}%` }} // Moves by 10% increments (container height must be 1em, inner height 10em)
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                className="flex flex-col"
                style={{ height: '10em' }} // Height to hold 10 digits
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <div key={num} className="h-[1em] flex items-center justify-center">
                        {num}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
