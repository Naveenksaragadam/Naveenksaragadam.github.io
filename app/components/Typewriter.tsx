'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
    words: string[]
    className?: string
}

export default function Typewriter({ words, className }: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentText, setCurrentText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const word = words[currentWordIndex]
        const typeSpeed = isDeleting ? 50 : 100 // Faster deleting, standard typing
        const pauseTime = 2000 // Pause before deleting

        const handleTyping = () => {
            if (!isDeleting && currentText === word) {
                // Finished typing word, pause before deleting
                setTimeout(() => setIsDeleting(true), pauseTime)
                return
            }

            if (isDeleting && currentText === '') {
                // Finished deleting, move to next word
                setIsDeleting(false)
                setCurrentWordIndex((prev) => (prev + 1) % words.length)
                return
            }

            const nextText = isDeleting
                ? word.substring(0, currentText.length - 1)
                : word.substring(0, currentText.length + 1)

            setCurrentText(nextText)
        }

        const timer = setTimeout(handleTyping, typeSpeed)

        return () => clearTimeout(timer)
    }, [currentText, isDeleting, currentWordIndex, words])

    return (
        <span className={className}>
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[3px] h-[1em] bg-blue-400 ml-1 align-middle mb-1"
            />
        </span>
    )
}
