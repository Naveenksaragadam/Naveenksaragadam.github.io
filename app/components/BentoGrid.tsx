'use client'

import { motion } from 'framer-motion'
import UsesTile from './Tiles/UsesTile'
import GuestbookTile from './Tiles/GuestbookTile'
import SpotifyTile from './Tiles/SpotifyTile'
import { BarChart2, Database, Cloud, Award } from 'lucide-react'

const skillCategories = [
    {
        icon: BarChart2,
        label: 'Analytics & BI',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        skills: ['SQL (Advanced)', 'Tableau', 'Apache Superset', 'Apache Druid', 'KPI Reporting', 'Self-Service Analytics', 'Data Visualization', 'Excel (Advanced)']
    },
    {
        icon: Database,
        label: 'Data Engineering',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        skills: ['Python (Pandas, NumPy, PySpark)', 'dbt', 'ETL/ELT', 'Dimensional Modeling', 'Star/Snowflake Schema', 'Data Warehousing', 'Apache Airflow', 'Batch Processing']
    },
    {
        icon: Cloud,
        label: 'Cloud & Platforms',
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        skills: ['Azure (Data Factory, Databricks, Synapse)', 'Snowflake', 'ClickHouse', 'PostgreSQL', 'MinIO (AWS S3)', 'Docker', 'Hadoop / Hive', 'NoSQL']
    },
    {
        icon: Award,
        label: 'Data Quality & Governance',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        skills: ['Pydantic', 'Schema Validation', 'Data Profiling', 'Data Quality Frameworks', 'Data Lineage', 'OLAP', 'CI/CD', 'REST APIs']
    }
]

const awards = [
    {
        title: 'Outstanding Contributions Award',
        org: 'Target (2024)',
        desc: 'Recognized for data analysis, reporting reliability, and data quality impact'
    },
    {
        title: 'Ideathon Winner',
        org: 'Target (2024)',
        desc: 'Won internal innovation competition for proposing a scalable analytics solution'
    }
]

export default function BentoGrid() {
    return (
        <section className="relative w-full max-w-[1400px] mx-auto px-6 pt-0 pb-48 z-10">

            {/* Skills Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center mb-16"
            >
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">What I Bring</div>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-zinc-900 dark:text-white text-center tracking-tight">
                    Skills &amp; <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Expertise</span>
                </h2>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {skillCategories.map((cat, i) => (
                    <motion.div
                        key={cat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-zinc-50 dark:bg-[#111] rounded-3xl p-8 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-colors relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 ${cat.bg} blur-[60px] rounded-full pointer-events-none`} />

                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-9 h-9 rounded-xl ${cat.bg} flex items-center justify-center`}>
                                <cat.icon size={18} className={cat.color} />
                            </div>
                            <h3 className="text-sm font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{cat.label}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {cat.skills.map(skill => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Awards Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {awards.map((award, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="relative flex items-start gap-5 p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/5 border border-amber-200 dark:border-amber-500/20 rounded-3xl group hover:border-amber-300 dark:hover:border-amber-500/40 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 blur-[50px] rounded-full pointer-events-none" />
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                                <Award size={18} className="text-amber-500" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">{award.org}</p>
                                <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-1">{award.title}</h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{award.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Bento Tiles Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[280px]">
                <UsesTile />
                <GuestbookTile />
                <SpotifyTile />
            </div>
        </section>
    )
}
