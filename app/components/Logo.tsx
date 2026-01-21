'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed top-8 left-8 z-50 mix-blend-difference cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-105 transition-transform">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 48px, 64px"
                    priority
                />
            </div>
        </motion.div>
    )
}
