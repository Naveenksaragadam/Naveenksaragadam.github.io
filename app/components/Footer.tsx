'use client'

import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer id="contact" className="relative z-10 w-full bg-[#121212] py-32 px-4 md:px-12 border-t border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                <div className="space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter text-white"
                    >
                        Let's Talk.
                    </motion.h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-md">
                        Open for collaborations and new opportunities. <br />
                        Based in USA.
                    </p>
                    <a
                        href="mailto:naveen.saragadam@example.com"
                        className="inline-block text-2xl md:text-3xl text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
                    >
                        naveen.saragadam@example.com
                    </a>
                </div>

                <div className="flex flex-col gap-6">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-lg uppercase tracking-wider">LinkedIn</a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-lg uppercase tracking-wider">GitHub</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-lg uppercase tracking-wider">Twitter</a>
                </div>
            </div>

            <div className="mt-32 pt-8 border-t border-white/5 flex justify-between items-center text-white/20 text-sm">
                <p>© 2024 Naveen Saragadam</p>
                <p>Designed & Engineered with Next.js</p>
            </div>
        </footer>
    )
}
