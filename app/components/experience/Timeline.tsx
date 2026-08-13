'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const experiences = [
    {
        company: "Conjecture Technology Inc",
        location: "Remote, Tucson AZ",
        role: "Data Analyst",
        period: "Jul 2025 – Present",
        logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' rx='20' fill='%231a1a2e'/><text x='50' y='58' font-family='monospace' font-size='22' font-weight='bold' fill='%2300d4ff' text-anchor='middle'>CTI</text></svg>",
        logoScale: "scale-100",
        logoPadding: "py-2",
        description: "Analyzing 750K+ monthly customer, transaction, and operational records with SQL and Python to surface performance trends, metric anomalies, and key business drivers.",
        achievements: [
            "Analyzed 750K+ monthly customer, transaction, and operational records using SQL and Python to identify performance trends, metric anomalies, and key business drivers, delivering actionable insights to 5+ stakeholders for weekly performance reviews and decision-making.",
            "Owned 10+ recurring KPI reports and self-service dashboards across revenue, conversion, retention, and operational metrics; consolidated data from 4+ sources and reduced manual reporting effort by approximately 8 hours per week.",
            "Automated 8+ recurring data-preparation and reporting workflows using Python and SQL, reducing reporting turnaround time by 35% while applying source-to-report reconciliation and root-cause analysis to improve consistency and reliability."
        ],
        tech: [
            { name: "SQL", slug: "postgresql", color: "4169E1" },
            { name: "Python", slug: "python", color: "3776AB" },
            { name: "Tableau", slug: "tableau", color: "E97627" },
            { name: "Pandas", slug: "pandas", color: "150458" }
        ]
    },
    {
        company: "Target",
        location: "USA",
        role: "Data Analyst",
        period: "Apr 2023 – Jun 2024",
        logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' rx='20' fill='%23CC0000'/><circle cx='50' cy='50' r='30' fill='none' stroke='white' stroke-width='8'/><circle cx='50' cy='50' r='14' fill='white'/><circle cx='50' cy='50' r='5' fill='%23CC0000'/></svg>",
        logoScale: "scale-100",
        logoPadding: "py-2",
        description: "Owned analytics for Target's $7.5B North America clearance business, delivering 300+ certified reports and dashboards used by 230+ merchandising and strategy stakeholders for recurring business and pricing decisions.",
        achievements: [
            "Owned analytics for Target's $7.5B North America clearance business, delivering 300+ certified reports and dashboards used by 230+ merchandising and strategy stakeholders.",
            "Designed star schema dimensional models and delivered 9 production ETL/ELT pipelines (3 net-new, 6 migrations), enabling 230+ business users to self-serve reporting.",
            "Built a reusable Python/Pydantic data quality validation framework across 300+ certified reports, reducing data quality incidents from ~24/year to near-zero.",
            "Optimized SQL for 5+ high-traffic Apache Druid dashboards, reducing data retrieval latency 40% through query restructuring and indexing improvements.",
            "Migrated legacy Hadoop/Hive pricing pipelines to PySpark, reducing runtime 30% (8h → 5.5h) on terabyte-scale weekly snapshots while maintaining 99.9% SLA."
        ],
        tech: [
            { name: "PySpark", slug: "apachespark", color: "E25A1C" },
            { name: "dbt", slug: "dbt", color: "FF694B" },
            { name: "Apache Druid", slug: "apache", color: "D22128" },
            { name: "Pydantic", slug: "pydantic", color: "E92063" },
            { name: "SQL", slug: "postgresql", color: "4169E1" },
            { name: "Hive", slug: "apachehive", color: "FDEE21" }
        ]
    },
    {
        company: "EXL Service",
        location: "India (General Motors / ACDelco)",
        role: "Business Analyst (Analytics)",
        period: "Nov 2021 – Apr 2023",
        logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' rx='20' fill='%230054a4'/><text x='50' y='62' font-family='serif' font-size='28' font-weight='bold' fill='white' text-anchor='middle'>EXL</text></svg>",
        logoScale: "scale-100",
        logoPadding: "py-2",
        description: "Analyzed 80GB of weekly supply chain data across 5 fragmented sources and consolidated it into a unified data warehouse supporting parts availability forecasting and inventory decisions across the ACDelco dealer network.",
        achievements: [
            "Analyzed 80GB of weekly supply chain data across 5 fragmented sources, consolidated into a unified data warehouse supporting ACDelco dealer network inventory decisions.",
            "Built a daily competitor pricing intelligence tracker in Python using Selenium and BeautifulSoup across 4 rival product lines, replacing manual tracking.",
            "Automated parts recovery triage with Python decision-tree logic, reducing manual handling time 65% and saving the operations team 15+ hours per week.",
            "Built a self-service Excel interface that auto-generated HQL scripts for recurring reports, eliminating 10+ hours of weekly manual data preparation for business stakeholders."
        ],
        tech: [
            { name: "Python", slug: "python", color: "3776AB" },
            { name: "SQL", slug: "mysql", color: "4479A1" },
            { name: "Selenium", slug: "selenium", color: "43B02A" },
            { name: "Excel", slug: "microsoftexcel", color: "217346" }
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
                    Work &amp; <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Experience</span>
                </h2>
            </motion.div>

            <div ref={containerRef} className="relative">
                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[180px_4rem_1fr] items-stretch pointer-events-none">
                    <div />
                    <div className="hidden md:flex flex-col items-center relative w-full">
                        <div className="absolute top-7 bottom-7 w-1.5 bg-zinc-300 dark:bg-zinc-800 rounded-full" />
                        <div className="absolute top-7 bottom-7 w-1.5 rounded-full overflow-hidden">
                            <motion.div
                                style={{ height }}
                                className="absolute top-0 left-0 w-full overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
                            </motion.div>
                        </div>
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
                                    <div className={`rounded-xl bg-white dark:bg-zinc-100 border border-zinc-200 dark:border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden shadow-sm h-14 w-auto min-w-[3.5rem] px-3`}>
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
            </div>
        </section>
    )
}
