'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import GlobalMenu from '../components/GlobalMenu'
import ThemeToggle from '../components/ThemeToggle'
import { ArrowLeft } from 'lucide-react'

export default function BlogPage() {
    return (
        <main className="relative w-full min-h-screen bg-[#121212] text-white overflow-hidden flex flex-col">
            <GlobalMenu />

            <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
                <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </Link>
                <ThemeToggle />
            </nav>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
                        Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-lg mx-auto leading-relaxed">
                        Thoughts, stories, and ideas. <br />
                        Coming soon.
                    </p>
                </motion.div>
            </div>

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>
        </main>
    )
}
