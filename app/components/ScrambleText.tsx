'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?"

export default function ScrambleText({ text, duration = 2, className = "" }: { text: string, duration?: number, className?: string }) {
    const [display, setDisplay] = useState(text)

    useEffect(() => {
        let frame = 0
        const totalFrames = duration * 60
        const interval = setInterval(() => {
            frame++
            const progress = frame / totalFrames

            if (progress >= 1) {
                setDisplay(text)
                clearInterval(interval)
                return
            }

            // Scramble logic
            // Chars that are "done" are those whose index < progress * length
            const scrambled = text.split('').map((char, index) => {
                if (char === ' ') return ' '
                if (index < progress * text.length) {
                    return char
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)]
            }).join('')

            setDisplay(scrambled)
        }, 16) // ~60fps

        return () => clearInterval(interval)
    }, [text, duration])

    return (
        <span className={className}>{display}</span>
    )
}
