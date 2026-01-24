'use client'

import { motion } from 'framer-motion'

const projects = [
    {
        title: "Formula 1 Racing Analytics Platform",
        category: "Lakehouse Architecture",
        description: "Production-grade platform processing 70+ years of race data (10M+ records) with sub-second query performance using ClickHouse, Airflow, and MinIO.",
        techStack: ['Python', 'Airflow', 'ClickHouse', 'dbt', 'MinIO', 'Docker', 'Superset'],
        color: "bg-red-600"
    },
    {
        title: "SQL Data Warehouse",
        category: "Data Modeling",
        description: "Robust warehouse implementation using PostgreSQL with Star Schema for business intelligence.",
        techStack: ['PostgreSQL', 'SQL', 'Star Schema', 'ETL'],
        color: "bg-blue-600"
    },
    {
        title: "HR Analytics Dashboard",
        category: "Visualization",
        description: "Interactive Tableau dashboard for visualizing key performance indicators and workforce trends.",
        techStack: ['Tableau', 'SQL', 'Data Viz'],
        color: "bg-yellow-500"
    }
]

export default function Projects() {
    return (
        <section id="work" className="relative z-10 w-full py-32 px-4 md:px-12 transition-colors duration-500 overflow-hidden">

            {/* Local Background for Home Page Consistency (Matches Global) */}
            <div className="absolute inset-0 z-[-1] pointer-events-none">
                <div className="absolute inset-0 bg-white dark:bg-[#050505] transition-colors duration-500" />
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-200/40 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-20 text-gray-900 dark:text-white"
                >
                    Selected Work
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-[500px] w-full overflow-hidden rounded-3xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] backdrop-blur-md transition-all duration-500 hover:bg-gray-100 dark:hover:bg-white/[0.08] hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            {/* Color Gradient Mesh Background (Subtle) */}
                            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 ${project.color.replace('bg-', 'bg-')}`} />

                            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                                <div className="space-y-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest text-gray-500 dark:text-white/60 uppercase border border-gray-200 dark:border-white/10 rounded-full bg-gray-100 dark:bg-white/5 backdrop-blur-sm">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-white/70 text-lg leading-relaxed line-clamp-3 font-light">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 mt-4 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="text-[10px] px-2 py-1 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/80 rounded-md font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover Arrow Indicator */}
                                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
