'use client'

import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'

export default function TypingHero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
        >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hi Everyone, I am <br />
                <span className="text-blue-500">
                    <TypeAnimation
                        sequence={[
                            'Naveen Saragadam',
                            1000,
                            'a Full Stack Developer',
                            1000,
                            'a Data Engineer',
                            1000,
                            'a Problem Solver',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mt-6 max-w-2xl leading-relaxed">
                A passionate developer pursuing a degree in Computer Science. I believe in the power of authenticity and strive to maintain a true reflection of myself in all my professional endeavors.
            </p>
        </motion.div>
    )
}
