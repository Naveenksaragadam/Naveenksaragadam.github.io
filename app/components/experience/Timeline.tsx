'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const experiences = [
    {
        company: "Target",
        location: "Bangalore, India",
        role: "Data Analyst (Data Engineering Focus)",
        period: "Apr 2023 – Jun 2024",
        description: "Migrated legacy Hadoop/Hive pricing pipelines to PySpark on-premise clusters, reducing runtime 30% (8h → 5.5h) for $7.5B North America clearance dataset. Maintained 99.9% SLA across critical pipelines.",
        achievements: [
            "Refactored inefficient joins and implemented partitioning strategies on terabyte-scale weekly snapshots, enabling same-day pricing analysis for 230+ stakeholders.",
            "Built reusable Python validation framework enforcing schema quality on bronze layer data, validating billions of rows weekly.",
            "Automated detection of nulls/duplicates using Pydantic, reducing data quality incidents from ~24/year to near-zero.",
            "Engineered and maintained 3 new ETL pipelines and migrated 6 legacy pipelines, supporting 300+ certified datasets.",
            "Optimized SQL queries for 5+ high-traffic Greenfield dashboards (Apache Druid), reducing data retrieval latency 40%.",
            "Restructured complex subqueries as CTEs and added strategic indexing, enabling real-time pricing analysis."
        ],
        tech: ["PySpark", "Hadoop", "Hive", "Python", "Pydantic", "Apache Druid", "SQL", "Airflow"]
    },
    {
        company: "EXL Service",
        location: "Noida, India",
        role: "Business Analyst (Data Engineering)",
        period: "Nov 2021 – Apr 2023",
        description: "Built end-to-end ELT pipelines using Apache Oozie and SparkSQL, consolidating 5 disparate supply chain data sources into a unified warehouse for General Motors / ACDelco.",
        achievements: [
            "Ingested 80GB weekly supply chain data during critical chip shortage, enabling inventory optimization for dealer networks.",
            "Automated parts recovery workflow using Python algorithmic logic, reducing manual handling time 65% (15+ hours/week).",
            "Developed competitor pricing intelligence system tracking 4 rival products daily using Python web scrapers (Selenium, BeautifulSoup).",
            "Engineered database retention automation preventing table drops, saving 10+ hours of manual data prep weekly.",
            "Integrated SharePoint data sources using Shareplum to maintain centralized parts availability data.",
            "Solved critical tech debt issue where unused tables were being dropped, preventing downstream reporting failures."
        ],
        tech: ["Apache Oozie", "SparkSQL", "Python", "Selenium", "BeautifulSoup", "Shareplum", "Excel", "HQL"]
    }
]

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end 50%"]
    })

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section className="relative w-full max-w-[1400px] mx-auto px-6 md:pl-12 md:pr-4 py-32">

            {/* Header */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center font-serif text-5xl md:text-8xl text-zinc-900 dark:text-white mb-40 tracking-tight"
            >
                Professional Journey
            </motion.h2>

            <div ref={containerRef} className="relative">
                {/* 
                   ABSOLUTE SPINE CONTAINER 
                */}
                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[180px_4rem_1fr] items-stretch pointer-events-none">
                    <div /> {/* Left Cols */}
                    <div className="hidden md:flex flex-col items-center relative w-full">
                        {/* Static Background Track - Constrained to match mask/bead radius */}
                        <div className="absolute top-7 bottom-7 w-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />

                        {/* MASKED GRADIENT REVEAL */}
                        <div className="absolute top-7 bottom-7 w-1.5 rounded-full overflow-hidden">
                            <motion.div
                                style={{ height }}
                                className="absolute top-0 left-0 w-full overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
                            </motion.div>
                        </div>

                        {/* Sticky Bead - Z-Index boosted to 50 to ensure it's ABOVE the line */}
                        <div className="sticky top-1/2 -translate-y-1/2 z-50">
                            <div className="relative w-14 h-14 rounded-full border-2 border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse" />
                                <div className="relative w-8 h-8">
                                    <Image src="/logo.png" alt="NS" fill className="object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-40 relative z-10">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="relative grid grid-cols-1 md:grid-cols-[180px_4rem_1fr] gap-0 items-start"
                        >
                            {/* Left Column: Date & Company */}
                            <div className="md:text-right pr-4 pt-2">
                                <h4 className="text-zinc-500 font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-4 leading-none">
                                    {exp.period}
                                </h4>
                                <div className="flex flex-col md:items-end gap-3">
                                    <h3 className="text-2xl md:text-3xl font-serif text-zinc-900 dark:text-white leading-tight">
                                        {exp.company}
                                    </h3>
                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 font-bold text-lg shrink-0 overflow-hidden shadow-sm">
                                        {exp.company.charAt(0)}
                                    </div>
                                </div>
                                <div className="flex md:justify-end gap-2 mt-4 text-zinc-500 text-[11px] font-medium uppercase tracking-wide">
                                    <span>{exp.location}</span>
                                </div>
                            </div>

                            {/* Center Spacer for Spine */}
                            <div className="hidden md:block w-16" />

                            {/* Right Column: Role & Content */}
                            <div className="pl-0 md:pl-12 mt-8 md:mt-0">
                                <h3 className="text-3xl font-serif text-zinc-900 dark:text-white mb-4 block md:hidden">{exp.company}</h3>
                                <h4 className="text-xl md:text-2xl font-sans font-bold text-zinc-800 dark:text-zinc-100 mb-6 tracking-tight">
                                    {exp.role}
                                </h4>

                                <div className="space-y-8 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-3xl p-8 md:p-10 max-w-5xl shadow-sm backdrop-blur-sm">
                                    <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-4xl text-justify">
                                        {exp.description}
                                    </p>

                                    <ul className="space-y-4 max-w-4xl">
                                        {exp.achievements.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed group pr-12 md:pr-24 text-justify [text-justify:inter-word]">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-blue-500 transition-colors shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {exp.tech.map((t) => (
                                            <span key={t} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 cursor-default">
                                                <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

    )
}
