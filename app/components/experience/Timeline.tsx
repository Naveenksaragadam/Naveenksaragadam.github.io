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
        logo: "https://www.vectorlogo.zone/logos/target/target-icon.svg",
        logoScale: "scale-110",
        logoPadding: "py-2",
        description: "Migrated legacy Hadoop/Hive pricing pipelines to PySpark on-premise clusters, reducing runtime 30% (8h → 5.5h) for $7.5B North America clearance dataset. Maintained 99.9% SLA across critical pipelines.",
        achievements: [
            "Refactored inefficient joins and implemented partitioning strategies on terabyte-scale weekly snapshots, enabling same-day pricing analysis for 230+ stakeholders.",
            "Built reusable Python validation framework enforcing schema quality on bronze layer data, validating billions of rows weekly.",
            "Automated detection of nulls/duplicates using Pydantic, reducing data quality incidents from ~24/year to near-zero.",
            "Engineered and maintained 3 new ETL pipelines and migrated 6 legacy pipelines, supporting 300+ certified datasets.",
            "Optimized SQL queries for 5+ high-traffic Greenfield dashboards (Apache Druid), reducing data retrieval latency 40%.",
            "Restructured complex subqueries as CTEs and added strategic indexing, enabling real-time pricing analysis."
        ],
        tech: [
            { name: "PySpark", slug: "apachespark", color: "E25A1C" },
            { name: "Hadoop", slug: "apachehadoop", color: "66CCFF" },
            { name: "Hive", slug: "apachehive", color: "FDE073" },
            { name: "Python", slug: "python", color: "3776AB" },
            { name: "Pydantic", slug: "pydantic", color: "E92063" },
            { name: "Apache Druid", slug: "apachedruid", color: "29FCC3" },
            { name: "SQL", slug: "postgresql", color: "4169E1" },
            { name: "Airflow", slug: "apacheairflow", color: "017CEE" }
        ]
    },
    {
        company: "EXL Service",
        location: "Noida, India",
        role: "Business Analyst (Data Engineering)",
        period: "Nov 2021 – Apr 2023",
        logo: "/images/exl-logo-v2.png",
        logoScale: "scale-[1.5]",
        logoPadding: "px-1.5 py-2",
        logoBoxStyle: "!w-14 !h-14 !min-w-0 p-2 mb-1",
        description: "Built end-to-end ELT pipelines using Apache Oozie and SparkSQL, consolidating 5 disparate supply chain data sources into a unified warehouse for General Motors / ACDelco.",
        achievements: [
            "Ingested 80GB weekly supply chain data during critical chip shortage, enabling inventory optimization for dealer networks.",
            "Automated parts recovery workflow using Python algorithmic logic, reducing manual handling time 65% (15+ hours/week).",
            "Developed competitor pricing intelligence system tracking 4 rival products daily using Python web scrapers (Selenium, BeautifulSoup).",
            "Engineered database retention automation preventing table drops, saving 10+ hours of manual data prep weekly.",
            "Integrated SharePoint data sources using Shareplum to maintain centralized parts availability data.",
            "Solved critical tech debt issue where unused tables were being dropped, preventing downstream reporting failures."
        ],
        tech: [
            { name: "Apache Oozie", slug: "apache", color: "D22128" },
            { name: "SparkSQL", slug: "apachespark", color: "E25A1C" },
            { name: "Python", slug: "python", color: "3776AB" },
            { name: "Selenium", slug: "selenium", color: "43B02A" },
            { name: "BeautifulSoup", slug: "python", color: "3776AB" },
            { name: "Shareplum", slug: "microsoftsharepoint", color: "0078D4" },
            { name: "Excel", slug: "microsoftexcel", color: "217346" },
            { name: "HQL", slug: "apachehive", color: "FDE073" }
        ]
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
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center mb-40"
            >
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Professional Journey</div>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-zinc-900 dark:text-white text-center tracking-tight">
                    Work & <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Experience</span>
                </h2>
            </motion.div>

            <div ref={containerRef} className="relative">
                {/* 
                   ABSOLUTE SPINE CONTAINER 
                */}
                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[180px_4rem_1fr] items-stretch pointer-events-none">
                    <div /> {/* Left Cols */}
                    <div className="hidden md:flex flex-col items-center relative w-full">
                        {/* Static Background Track - Constrained to match mask/bead radius */}
                        <div className="absolute top-7 bottom-7 w-1.5 bg-zinc-300 dark:bg-zinc-800 rounded-full" />

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
                                <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-500/5 animate-pulse" />
                                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-zinc-900/10 dark:bg-transparent flex items-center justify-center p-0.5">
                                    <Image src="/logo.png" alt="NS" fill className="object-contain invert dark:invert-0 transition-all duration-300" />
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
                                    <div className={`rounded-xl bg-white dark:bg-zinc-100 border border-zinc-200 dark:border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${exp.logoBoxStyle || 'h-14 w-auto min-w-[3.5rem] px-3'}`}>
                                        <img
                                            src={exp.logo}
                                            alt={exp.company}
                                            className={`h-full w-auto object-contain ${exp.logoPadding || 'py-2'} ${exp.logoScale || 'scale-100'}`}
                                        />
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

                                <motion.div
                                    whileHover={{ scale: 1.002 }}
                                    className="space-y-8 bg-white/80 dark:bg-[#0d1117]/80 border border-zinc-200/50 dark:border-white/10 rounded-3xl p-8 md:p-10 max-w-5xl shadow-xl dark:shadow-2xl backdrop-blur-md transition-colors duration-300"
                                >
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

                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-white/5">
                                        {exp.tech.map((t) => (
                                            <span key={t.name} className="flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:border-blue-500/30 hover:bg-zinc-50 dark:hover:bg-blue-500/5 transition-all duration-300 cursor-default">
                                                <img
                                                    src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
                                                    alt={t.name}
                                                    className="w-4 h-4 object-contain shadow-sm"
                                                />
                                                {t.name}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div >
        </section >

    )
}
