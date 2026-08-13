'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export default function ScrambleText({ text, duration = 2, className = "", targetChars }: { text: string, duration?: number, className?: string, targetChars?: string }) {
    const [displayContent, setDisplayContent] = useState(text.split('').map(char => ({ char, isTarget: false })))

    useEffect(() => {
        let frame = 0
        const totalFrames = duration * 60
        const interval = setInterval(() => {
            frame++
            const progress = frame / totalFrames

            if (progress >= 1) {
                setDisplayContent(text.split('').map(char => ({ char, isTarget: false })))
                clearInterval(interval)
                return
            }

            const scrambled = text.split('').map((originalChar, index) => {
                // If this is not a target char (and targetChars is defined), it never scrambles
                if (targetChars && !targetChars.includes(originalChar)) {
                    return { char: originalChar, isTarget: false }
                }

                // Wave logic: if the wave hasn't passed this index, it's NOT resolved yet (so it scrambles)
                // If index < progress * length, it IS resolved (shows original).
                if (index < progress * text.length) {
                    return { char: originalChar, isTarget: false }
                }

                // Otherwise, show random char
                const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)]
                return { char: randomChar, isTarget: true }
            })

            setDisplayContent(scrambled)
        }, 16)

        return () => clearInterval(interval)
    }, [text, duration, targetChars])

    return (
        <span className={`${className} inline-flex`}>
            {displayContent.map((item, idx) => (
                <span
                    key={idx}
                    className={`inline-block text-center ${item.isTarget ? 'opacity-80' : ''}`}
                    style={{ width: '0.8em' }} // Fixed width to prevent layout shift ("jitter")
                >
                    {item.char}
                </span>
            ))}
        </span>
    )
}
