'use client'

import { motion } from 'framer-motion'

export default function SectionSeparator() {
    return (
        <div className="relative w-full max-w-7xl mx-auto py-4 flex items-center justify-center">
            {/* Visible Separation Line */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full h-px bg-gradient-to-r from-transparent via-zinc-400 dark:via-white/60 to-transparent"
            />
        </div>
    )
}
