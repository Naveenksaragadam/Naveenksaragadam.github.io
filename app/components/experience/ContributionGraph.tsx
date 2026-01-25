'use client'

import { motion } from 'framer-motion'
import { Github, Star, GitCommit, GitFork } from 'lucide-react'
import CountUp from 'react-countup'

export default function ContributionGraph() {
    // Generate mock data for the graph
    const weeks = 52
    const days = 7
    const contributionLevels = [
        'bg-zinc-100 dark:bg-[#161b22]',
        'bg-emerald-100 dark:bg-[#0e4429]',
        'bg-emerald-300 dark:bg-[#006d32]',
        'bg-emerald-500 dark:bg-[#26a641]',
        'bg-emerald-600 dark:bg-[#39d353]'
    ]

    // Deterministic random for consistent render
    const getLevel = (i: number) => {
        const x = Math.sin(i * 9999)
        const rand = (x - Math.floor(x))
        if (rand > 0.9) return 4
        if (rand > 0.7) return 3
        if (rand > 0.5) return 2
        if (rand > 0.3) return 1
        return 0
    }

    return (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center mb-16"
            >
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Open Source</div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-zinc-900 dark:text-white text-center">
                    Code & <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Contributions</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Graph Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-8 shadow-2xl overflow-hidden relative transition-colors duration-300"
                >
                    <div className="absolute top-0 right-0 p-8 text-right">
                        <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                            <CountUp end={1807} duration={2} separator="," />
                        </div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">2025 Total</div>
                    </div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center">
                            <Github className="w-6 h-6 text-zinc-900 dark:text-white" />
                        </div>
                        <div>
                            <div className="text-zinc-900 dark:text-white font-bold">@Naveenksaragadam</div>
                            <div className="text-zinc-500 text-sm">Contribution Graph</div>
                        </div>
                    </div>

                    {/* The Grid */}
                    <div className="flex gap-1 overflow-x-auto pb-4 scrollbar-hide">
                        {Array.from({ length: weeks }).map((_, w) => (
                            <div key={w} className="flex flex-col gap-1">
                                {Array.from({ length: days }).map((_, d) => (
                                    <motion.div
                                        key={d}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (w * 0.01) + (d * 0.01) }}
                                        className={`w-3 h-3 rounded-sm ${contributionLevels[getLevel(w * 7 + d)]}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2 text-xs text-zinc-500">
                        <span>Less</span>
                        <div className="flex gap-1">
                            {contributionLevels.map(bg => (
                                <div key={bg} className={`w-3 h-3 rounded-sm ${bg}`} />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </motion.div>

                {/* Stats Panel */}
                <div className="space-y-4">
                    {/* Followers */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-6 flex items-center justify-between transition-colors duration-300"
                    >
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Followers</div>
                            <div className="text-4xl font-bold text-pink-500">
                                <CountUp end={319} duration={2} />
                            </div>
                        </div>
                        {/* Abstract dots animation */}
                        <div className="flex gap-1">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                    className="w-2 h-2 rounded-full bg-pink-500/50"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Forks */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-6 flex items-center justify-between transition-colors duration-300"
                    >
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Forks</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                <CountUp end={74} duration={2} />
                            </div>
                        </div>
                        <GitFork className="w-8 h-8 text-emerald-500/20" />
                    </motion.div>

                    {/* Stars */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-6 flex items-center justify-between transition-colors duration-300"
                    >
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Stars</div>
                            <div className="text-4xl font-bold text-yellow-400">
                                <CountUp end={505} duration={2} />
                            </div>
                        </div>
                        <Star className="w-8 h-8 text-yellow-500/20 fill-yellow-500/20" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
