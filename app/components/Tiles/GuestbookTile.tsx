'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function GuestbookTile() {
    return (
        <Link href="/guestbook" className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative flex flex-col items-center justify-between h-full min-h-[220px] rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
            >
                {/* 3D Floating Cards Container */}
                <div className="relative flex-1 w-full flex items-center justify-center min-h-[160px]">

                    {/* Background Bloom */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full group-hover:bg-purple-500/30 transition-colors duration-500" />

                    {/* Card 1 (Back/Left) */}
                    <motion.div
                        animate={{ y: [0, -8, 0], rotate: [-12, -14, -12] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-28 h-36 bg-gradient-to-br from-indigo-500 to-indigo-900 rounded-xl shadow-2xl border border-white/10 z-10 -ml-12"
                    >
                        {/* Inner detail (lines) */}
                        <div className="p-4 space-y-2 opacity-50">
                            <div className="w-12 h-2 bg-white/30 rounded-full" />
                            <div className="w-full h-1 bg-white/20 rounded-full" />
                            <div className="w-2/3 h-1 bg-white/20 rounded-full" />
                        </div>
                        {/* Circle detail */}
                        <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/10" />
                    </motion.div>

                    {/* Card 2 (Front/Right) */}
                    <motion.div
                        animate={{ y: [0, -12, 0], rotate: [12, 10, 12] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute w-28 h-36 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl shadow-2xl border border-white/10 z-20 ml-8"
                    >
                        {/* Inner detail */}
                        <div className="p-4 space-y-2 opacity-60">
                            <div className="w-full h-1 bg-white/40 rounded-full" />
                            <div className="w-3/4 h-1 bg-white/30 rounded-full" />
                            <div className="w-full h-1 bg-white/30 rounded-full" />
                        </div>
                        {/* Circle detail */}
                        <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-black/20" />
                    </motion.div>

                </div>

                {/* Text Bottom - Centered */}
                <div className="relative z-10 pb-8 text-center space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Guestbook</span>
                    <h3 className="text-base font-medium text-zinc-300">Let me know you were here</h3>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
        </Link>
    )
}
