'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
    {
        company: "Target",
        role: "Data Analyst (DE Focus)",
        period: "Apr 2023 – Jun 2024",
        impact: "Migrated 20+ Hadoop/Hive pipelines to PySpark, reducing runtime by 30% (8h → 5.5h) for North America pricing data.",
        tech: ["PySpark", "Hadoop", "Airflow"]
    },
    {
        company: "EXL Service",
        role: "Business Analyst (DE)",
        period: "Nov 2021 – Apr 2023",
        impact: "Built end-to-end ELT pipelines using Oozie/SparkSQL, consolidating 5 disparate supply chain sources.",
        tech: ["SparkSQL", "Oozie", "Python"]
    }
]

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section ref={containerRef} className="relative max-w-5xl mx-auto px-6 py-32">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white mb-24 text-center md:text-left md:pl-20"
            >
                Experience That <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Delivers Impact</span>
            </motion.h2>

            <div className="relative border-l border-zinc-200 dark:border-white/10 md:ml-10 space-y-24 pl-8 md:pl-24 transition-colors duration-300">
                {/* Scroll Progress Bead */}
                <motion.div
                    style={{ height }}
                    className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400"
                />

                {experiences.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative group"
                    >
                        {/* Glow Bead for Item */}
                        <div className="absolute left-[-37px] md:left-[-101px] top-2 w-4 h-4 rounded-full bg-white dark:bg-[#050505] border border-zinc-300 dark:border-white/20 group-hover:border-purple-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(0,0,0,1)] z-10">
                            <div className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 md:items-baseline mb-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-600 dark:group-hover:from-white dark:group-hover:to-zinc-400 transition-colors">
                                {exp.company}
                            </h3>
                            <span className="text-zinc-500 dark:text-zinc-500 font-mono text-sm md:text-base">
                                {exp.role} | {exp.period}
                            </span>
                        </div>

                        <p className="text-lg text-zinc-600 dark:text-zinc-300 font-light leading-relaxed max-w-2xl mb-6">
                            {exp.impact.split('30%').map((part, index, arr) => (
                                <span key={index}>
                                    {part}
                                    {index < arr.length - 1 && <span className="font-bold text-zinc-900 dark:text-white">30%</span>}
                                </span>
                            ))}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t) => (
                                <span key={t} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-mono text-zinc-600 dark:text-zinc-400 group-hover:border-purple-500/30 group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
