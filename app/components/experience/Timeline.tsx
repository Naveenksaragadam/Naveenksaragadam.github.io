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
        <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-0 md:pl-6 md:pr-40 py-32">

            {/* Header */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center font-serif text-5xl md:text-7xl text-white mb-40 tracking-tight"
            >
                Professional Journey
            </motion.h2>

            <div ref={containerRef} className="relative">
                {/* 
                   ABSOLUTE SPINE CONTAINER 
                */}
                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[25%_auto_1fr] items-stretch pointer-events-none">
                    <div /> {/* Left Cols */}
                    <div className="hidden md:flex flex-col items-center relative w-16 -ml-8">
                        {/* Static Background Track - Constrained to match mask/bead radius */}
                        <div className="absolute top-7 bottom-7 w-1.5 bg-zinc-800 rounded-full" />

                        {/* MASKED GRADIENT REVEAL 
                             The Mask (motion.div) determines how much is visible.
                             The Gradient (inner div) is full height and fixed relative to content.
                             ADDED: top-7 bottom-7 to account for Bead Radius (28px). 
                             This ensures line starts/stops at Bead Center, not Bead Edge.
                         */}
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
                            <div className="relative w-14 h-14 rounded-full border-2 border-white/10 bg-[#050505] shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center">
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
                            className="relative grid grid-cols-1 md:grid-cols-[25%_auto_1fr] gap-0 items-start"
                        >
                            {/* Left Column: Date & Company (Restored) */}
                            <div className="md:text-right pr-12 pt-2">
                                <h4 className="text-zinc-500 font-bold text-xs tracking-[0.2em] uppercase mb-6">{exp.period}</h4>
                                <div className="flex justify-end items-center gap-4">
                                    <h3 className="text-3xl font-serif text-white">{exp.company}</h3>
                                    {i === 0 && <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 font-bold text-xl shrink-0">T</div>}
                                    {i === 1 && <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500 font-bold text-xl shrink-0">E</div>}
                                </div>
                                <div className="flex justify-end gap-2 mt-2 text-zinc-500 text-xs font-medium uppercase tracking-wide">
                                    <span>{exp.location}</span>
                                    <span>•</span>
                                    <span>Remote</span>
                                </div>
                            </div>

                            {/* Center Spacer for Spine (Fixed Width matching absolute spine container) */}
                            <div className="hidden md:block w-16 -ml-8" />

                            {/* Right Column: Role & Content */}
                            <div className="pl-12">
                                <h3 className="text-3xl font-serif text-white mb-4 block md:hidden">{exp.company}</h3>
                                <h4 className="text-3xl md:text-4xl font-sans font-bold text-white mb-6 tracking-tight">{exp.role}</h4>

                                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                    {exp.description}
                                </p>

                                <ul className="space-y-4 mb-10">
                                    {exp.achievements.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-zinc-400 text-[15px] leading-relaxed group">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-blue-500 transition-colors shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map((t) => (
                                        <span key={t} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
                                            <svg className="w-3 h-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
