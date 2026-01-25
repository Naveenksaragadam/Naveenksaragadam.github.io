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
        gpa: "3.8/4.00",
        courses: [
            "Foundations of Information",
            "Data mining and Discovery",
            "Intro to Machine Learning",
            "Data Warehousing and Analytics in Cloud",
            "NLP",
            "Neural Networks",
            "Data Analysis and Visualization"
        ],
        projects: "End to End F1 analytics Dashboard via Azure"
    },
    {
        degree: "B.Tech in Computer Science and Engineering",
        specialization: "",
        university: "Bharath University",
        location: "Chennai, India",
        period: "2017 - 2021",
        gpa: null,
        courses: [
            "Fundamentals of Computing and Programming",
            "Data Structures and Algorithms",
            "Database Management Systems",
            "OS",
            "Networking",
            "Software Engineering",
            "Intro to Data Science",
            "Data Warehousing and Mining",
            "Distributed Computing",
            "Big Data Analytics",
            "AI and Expert systems",
            "Computer Vision"
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
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center font-serif text-5xl md:text-8xl text-zinc-900 dark:text-white mb-40 tracking-tight"
            >
                Educational Journey
            </motion.h2>

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
                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 font-bold text-lg shrink-0 overflow-hidden shadow-sm">
                                        {edu.university.charAt(0)}
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

                                <div className="space-y-8 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-3xl p-8 md:p-10 max-w-3xl shadow-sm backdrop-blur-sm">
                                    {edu.projects && (
                                        <div>
                                            <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2 leading-none">Capstone</p>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl text-justify [text-justify:inter-word]">
                                                {edu.projects}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {edu.courses.map((course) => (
                                            <span key={course} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 cursor-default">
                                                <svg className="w-3 h-3 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                                <span className="truncate">{course}</span>
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

