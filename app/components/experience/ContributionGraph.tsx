'use client'

import { motion } from 'framer-motion'
import { Github, Star, GitCommit, GitFork, Loader2, Library } from 'lucide-react'
import CountUp from 'react-countup'
import { useGitHub } from '../Providers'

export default function ContributionGraph() {
    const { stats, contributions, loading, error } = useGitHub()
    const username = 'Naveenksaragadam'

    const contributionLevels = [
        'bg-zinc-100 dark:bg-[#161b22]',
        'bg-emerald-100 dark:bg-[#0e4429]',
        'bg-emerald-300 dark:bg-[#006d32]',
        'bg-emerald-500 dark:bg-[#26a641]',
        'bg-emerald-600 dark:bg-[#39d353]'
    ]

    if (error) {
        return (
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 text-center">
                <div className="bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-12 shadow-2xl">
                    <Github className="w-12 h-12 mx-auto mb-4 text-zinc-300 dark:text-zinc-700" />
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Contributions Unavailable</h3>
                    <p className="text-zinc-500">Currently unable to fetch live data from GitHub. Please check back later.</p>
                </div>
            </section>
        )
    }

    if (!loading && contributions.length === 0) {
        return (
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 text-center">
                <div className="bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-12 shadow-2xl">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No Contributions Found</h3>
                    <p className="text-zinc-500">No public activity recorded for @{username} in the last year.</p>
                </div>
            </section>
        )
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
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#0d1117]/50 backdrop-blur-sm z-10 rounded-3xl">
                            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                        </div>
                    ) : null}

                    <div className="absolute top-0 right-0 p-8 text-right">
                        <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                            <CountUp end={stats.totalContributions} duration={2} separator="," />
                        </div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Last Year Total</div>
                    </div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center">
                            <Github className="w-6 h-6 text-zinc-900 dark:text-white" />
                        </div>
                        <div>
                            <div className="text-zinc-900 dark:text-white font-bold">@{username}</div>
                            <div className="text-zinc-500 text-sm">Contribution Graph</div>
                        </div>
                    </div>

                    {/* The Grid Grouped by Quarters */}
                    <div className="flex justify-start items-end gap-x-1 overflow-x-auto pb-4 scrollbar-hide min-h-[140px]">
                        {(() => {
                            const groupedQuarters: { label: string; weeks: any[][] }[] = [];

                            if (loading) {
                                // Dummy loading quarters
                                for (let i = 0; i < 4; i++) {
                                    groupedQuarters.push({
                                        label: `Q${i + 1}`,
                                        weeks: Array.from({ length: 13 }).map(() => Array.from({ length: 7 }).map(() => ({ level: 0, date: '' })))
                                    });
                                }
                            } else {
                                contributions.forEach(week => {
                                    const firstDay = new Date(week[0].date);
                                    const q = Math.floor(firstDay.getMonth() / 3) + 1;
                                    const year = firstDay.getFullYear().toString().slice(-2);
                                    const label = `Q${q}'${year}`;

                                    if (groupedQuarters.length === 0 || groupedQuarters[groupedQuarters.length - 1].label !== label) {
                                        groupedQuarters.push({ label, weeks: [week] });
                                    } else {
                                        groupedQuarters[groupedQuarters.length - 1].weeks.push(week);
                                    }
                                });
                            }

                            return groupedQuarters.map((quarter, qIndex) => (
                                <div key={qIndex} className="flex items-end gap-x-1">
                                    <div className="flex flex-col gap-3">
                                        <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-widest text-center border-b border-zinc-100 dark:border-white/5 pb-1">
                                            {quarter.label}
                                        </div>
                                        <div className="flex gap-1">
                                            {quarter.weeks.map((week, w) => (
                                                <div key={w} className="flex flex-col gap-1">
                                                    {week.map((day: any, d) => (
                                                        <motion.div
                                                            key={`${qIndex}-${w}-${d}`}
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: loading ? 0.2 : 1, scale: 1 }}
                                                            transition={{ delay: (qIndex * 0.1) + (w * 0.01) + (d * 0.005) }}
                                                            className={`w-3 h-3 rounded-sm ${loading ? 'bg-zinc-200 dark:bg-zinc-800' : contributionLevels[day.level]}`}
                                                            title={loading ? undefined : `${day.count} contributions on ${day.date}`}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {qIndex < groupedQuarters.length - 1 && (
                                        <div className="w-px h-12 bg-zinc-100 dark:bg-white/5 mb-1" />
                                    )}
                                </div>
                            ));
                        })()}
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
                    {/* Repositories */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-6 flex items-center justify-between transition-colors duration-300"
                    >
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Repositories</div>
                            <div className="text-4xl font-bold text-purple-500">
                                <CountUp end={stats.publicRepos} duration={2} />
                            </div>
                        </div>
                        <Library className="w-8 h-8 text-purple-500/50" />
                    </motion.div>

                    {/* Forks */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-6 flex items-center justify-between transition-colors duration-300"
                    >
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Forks</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                <CountUp end={stats.forks} duration={2} />
                            </div>
                        </div>
                        <GitFork className="w-8 h-8 text-emerald-500/50" />
                    </motion.div>

                    {/* Stars */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-[#0d1117] rounded-3xl border border-zinc-200 dark:border-white/10 p-6 flex items-center justify-between transition-colors duration-300"
                    >
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Stars</div>
                            <div className="text-4xl font-bold text-yellow-400">
                                <CountUp end={stats.stars} duration={2} />
                            </div>
                        </div>
                        <Star className="w-8 h-8 text-yellow-500/50 fill-yellow-500/30" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
