'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const education = [
    {
        degree: "M.S in Information Science",
        specialization: "Specialization in Machine Learning",
        university: "University of Arizona",
        location: "Tucson, AZ",
        period: "2023 - 2025",
        logo: "/images/arizona-logo.png",
        gpa: "3.8/4.00",
        courses: [
            { name: "Foundations of Information", slug: "googlescholar", color: "4285F4" },
            { name: "Data mining and Discovery", slug: "databricks", color: "FF3621" },
            { name: "Intro to Machine Learning", slug: "scikitlearn", color: "F7931E" },
            { name: "Data Warehousing and Analytics in Cloud", slug: "snowflake", color: "29B5E8" },
            { name: "NLP", slug: "python", color: "3776AB" },
            { name: "Neural Networks", slug: "pytorch", color: "EE4C2C" },
            { name: "Data Analysis and Visualization", slug: "tableau", color: "E97627" }
        ],
        projects: "End to End F1 analytics Dashboard via Azure"
    },
    {
        degree: "B.Tech in Computer Science and Engineering",
        specialization: "",
        university: "Bharath University",
        location: "Chennai, India",
        period: "2017 - 2021",
        logo: "/images/bharath-logo.jpg",
        gpa: null,
        courses: [
            { name: "Fundamentals of Computing and Programming", slug: "cplusplus", color: "00599C" },
            { name: "Data Structures and Algorithms", slug: "java", color: "007396" },
            { name: "Database Management Systems", slug: "mysql", color: "4479A1" },
            { name: "OS", slug: "linux", color: "FCC624" },
            { name: "Networking", slug: "cisco", color: "1BA0D7" },
            { name: "Software Engineering", slug: "git", color: "F05032" },
            { name: "Intro to Data Science", slug: "anaconda", color: "44A833" },
            { name: "Data Warehousing and Mining", slug: "oracle", color: "F80000" },
            { name: "Distributed Computing", slug: "apache", color: "D22128" },
            { name: "Big Data Analytics", slug: "apachespark", color: "E25A1C" },
            { name: "AI and Expert systems", slug: "openai", color: "412991" },
            { name: "Computer Vision", slug: "opencv", color: "5C3EE8" }
        ],
        projects: "CNN based Emotion Recognition model"
    }
]

export default function Education() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end 50%"]
    })

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section className="relative w-full max-w-[1400px] mx-auto px-6 md:pl-12 md:pr-10 py-32">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center mb-40"
            >
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Educational Journey</div>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-zinc-900 dark:text-white text-center tracking-tight">
                    Degrees & <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">Learning</span>
                </h2>
            </motion.div>

            <div ref={containerRef} className="relative">
                {/* 
                   ABSOLUTE SPINE CONTAINER 
                */}
                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[180px_4rem_1fr] items-stretch pointer-events-none">
                    <div /> {/* Left Cols */}
                    <div className="hidden md:flex flex-col items-center relative w-full">
                        {/* Static Background Track */}
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

                        {/* Sticky Bead */}
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
                    {education.map((edu, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="relative grid grid-cols-1 md:grid-cols-[180px_4rem_1fr] gap-0 items-start"
                        >
                            {/* Left Column: Date & University */}
                            <div className="md:text-right pr-4 pt-2">
                                <h4 className="text-zinc-500 font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-4 leading-none">
                                    {edu.period}
                                </h4>
                                <div className="flex flex-col md:items-end gap-3">
                                    <h3 className="text-2xl md:text-3xl font-serif text-zinc-900 dark:text-white leading-tight">
                                        {edu.university}
                                    </h3>
                                    <div className="w-14 h-14 rounded-xl bg-white dark:bg-zinc-100 border border-zinc-200 dark:border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-2">
                                        <img
                                            src={edu.logo}
                                            alt={edu.university}
                                            className="w-12 h-12 object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="flex md:justify-end gap-2 mt-4 text-zinc-500 text-[11px] font-medium uppercase tracking-wide">
                                    <span>{edu.location}</span>
                                </div>
                            </div>

                            {/* Center Spacer for Spine */}
                            <div className="hidden md:block w-16" />

                            {/* Right Column: Degree & Content */}
                            <div className="pl-0 md:pl-12 mt-8 md:mt-0">
                                <h3 className="text-3xl font-serif text-zinc-900 dark:text-white mb-4 block md:hidden">{edu.university}</h3>
                                <div className="flex items-baseline gap-4 mb-6">
                                    <h4 className="text-xl md:text-2xl font-sans font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
                                        {edu.degree}
                                    </h4>
                                    {edu.gpa && (
                                        <span className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                            GPA {edu.gpa}
                                        </span>
                                    )}
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className="space-y-8 bg-white dark:bg-[#0d1117] border border-zinc-200 dark:border-white/10 rounded-3xl p-8 md:p-10 max-w-3xl shadow-2xl backdrop-blur-sm transition-colors duration-300"
                                >
                                    {edu.projects && (
                                        <div>
                                            <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2 leading-none">Capstone</p>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl text-justify [text-justify:inter-word]">
                                                {edu.projects}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-100 dark:border-white/5">
                                        <p className="w-full text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1 leading-none">Coursework</p>
                                        {edu.courses.map((course) => (
                                            <span key={course.name} className="flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:border-purple-500/30 hover:bg-zinc-50 dark:hover:bg-purple-500/5 transition-all duration-300 cursor-default">
                                                <img
                                                    src={`https://cdn.simpleicons.org/${course.slug}/${course.color}`}
                                                    alt={course.name}
                                                    className="w-4 h-4 shadow-sm object-contain"
                                                />
                                                <span className="truncate">{course.name}</span>
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

