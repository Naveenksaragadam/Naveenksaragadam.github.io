'use client'

import { motion } from 'framer-motion'
import { Server, Wind, Database } from 'lucide-react'

export default function ExperienceHero() {
    const cards = [
        { name: 'ClickHouse', icon: Database, color: 'bg-yellow-500', rotate: 6, z: 10 },
        { name: 'Airflow', icon: Wind, color: 'bg-blue-500', rotate: -3, z: 20 },
        { name: 'Apache Spark', icon: Server, color: 'bg-orange-500', rotate: 12, z: 30 },
    ]

    return (
        <section className="relative min-h-[90vh] max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center pt-32 px-6 md:px-12 gap-12 overflow-hidden">
            {/* Background Gradient Mesh */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-200/40 dark:bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Left Content */}
            <div className="w-full md:w-1/2 space-y-6 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-zinc-900 dark:text-white leading-tight">
                        I'm Naveen, a <br />
                        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                            Data Engineer
                        </span>.
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light max-w-lg leading-relaxed"
                >
                    Specializing in <span className="text-zinc-900 dark:text-zinc-200 font-medium">Medallion Architecture</span> and high-performance ETL pipelines.
                    Migrating legacy infrastructure to the modern <span className="text-zinc-900 dark:text-zinc-200 font-medium">Lakehouse</span>.
                </motion.p>
            </div>

            {/* Right Visual: "I Build" Stack */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative h-[400px]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-0 right-10 text-xs font-mono text-zinc-500 dark:text-zinc-600 tracking-widest uppercase rotate-90 origin-top-right"
                >
                    // I Build
                </motion.div>

                <div className="relative w-64 h-64">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.name}
                            initial={{ opacity: 0, scale: 0.8, rotate: 0, y: 50 }}
                            animate={{ opacity: 1, scale: 1, rotate: card.rotate, y: 0 }}
                            transition={{
                                delay: 0.8 + (i * 0.1),
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                            style={{ zIndex: card.z }}
                            className="absolute inset-0 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center gap-3 group transition-colors duration-300"
                        >
                            <div className={`p-4 rounded-xl ${card.color}/10 border border-${card.color.split('-')[1]}-500/20 group-hover:bg-${card.color.split('-')[1]}-500/20 transition-colors`}>
                                <card.icon className={`w-10 h-10 text-${card.color.split('-')[1]}-500 dark:text-${card.color.split('-')[1]}-400`} />
                            </div>
                            <span className="font-mono text-sm text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                {card.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
