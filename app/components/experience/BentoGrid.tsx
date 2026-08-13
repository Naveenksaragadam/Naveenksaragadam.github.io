'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Box, Terminal, ArrowRight, Play, AudioWaveform } from 'lucide-react'

export default function BentoGrid() {
    return (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: My Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-colors relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">Uses</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center gap-2 p-4 bg-white/50 dark:bg-white/5 rounded-2xl group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-colors group">
                            <img src="https://cdn.simpleicons.org/visualstudiocode" alt="VS Code" className="w-8 h-8 dark:invert dark:opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">VS Code</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 bg-white/50 dark:bg-white/5 rounded-2xl group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-colors group">
                            <img src="https://cdn.simpleicons.org/dbt" alt="dbt" className="w-8 h-8 dark:invert dark:opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">dbt</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 bg-white/50 dark:bg-white/5 rounded-2xl group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-colors group">
                            <img src="https://cdn.simpleicons.org/gnubash" alt="Shell" className="w-8 h-8 dark:invert dark:opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">Shell</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 bg-white/50 dark:bg-white/5 rounded-2xl group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-colors group">
                            <img src="https://cdn.simpleicons.org/minio" alt="MinIO" className="w-8 h-8 dark:invert dark:opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">MinIO</span>
                        </div>
                    </div>
                </motion.div>

                {/* Card 2: Guestbook */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-colors flex flex-col justify-between relative overflow-hidden"
                >
                    <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <div>
                        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">Guestbook</h3>
                        <div className="text-2xl font-serif text-zinc-900 dark:text-white">Let me know you were here.</div>
                    </div>

                    <div className="relative mt-8">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-white/20 transition-colors"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>

                {/* Card 3: Music */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="group bg-zinc-100 dark:bg-[#111] rounded-3xl p-8 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-colors relative overflow-hidden"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Focus Mode</h3>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center relative group-hover:scale-105 transition-transform">
                            {/* Mock Album Art */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-300 to-zinc-500 dark:from-zinc-700 dark:to-black rounded-lg" />
                            <Play className="w-6 h-6 text-white relative z-10" />
                        </div>
                        <div>
                            <div className="text-zinc-900 dark:text-white font-medium">Deep Focus</div>
                            <div className="text-zinc-500 text-sm">Spotify Playlist</div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-end justify-between items-center gap-1 h-8">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [10, 24, 8, 20, 10] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.1
                                }}
                                className="w-1.5 bg-green-500/50 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
