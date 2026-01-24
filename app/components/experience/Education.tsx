'use client'

import React from 'react'
import { motion } from 'framer-motion'

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
    return (
        <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-0 md:pl-6 md:pr-40 py-32">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center font-serif text-5xl md:text-7xl text-zinc-900 dark:text-white mb-40 tracking-tight"
            >
                Education
            </motion.h2>

            <div className="space-y-40 relative z-10">
                {education.map((edu, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className="relative grid grid-cols-1 md:grid-cols-[25%_auto_1fr] gap-0 items-start"
                    >
                        {/* Left Column: Date & University (Aligned with Timeline Left Col) */}
                        <div className="md:text-right pr-12 pt-2">
                            <h4 className="text-zinc-500 font-bold text-xs tracking-[0.2em] uppercase mb-6">{edu.period}</h4>
                            <div className="flex justify-end items-center gap-4">
                                <h3 className="text-3xl font-serif text-zinc-900 dark:text-white leading-tight">{edu.university}</h3>
                            </div>
                            <div className="flex justify-end gap-2 mt-2 text-zinc-500 text-xs font-medium uppercase tracking-wide">
                                <span>{edu.location}</span>
                            </div>
                        </div>

                        {/* Center Spacer / Vertical Line */}
                        <div className="hidden md:flex flex-col items-center relative w-16 -ml-8 h-full">
                            {/* Static Background Track (Visually connecting the education items) */}
                            <div className="absolute top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
                            {/* Dot */}
                            <div className="relative z-10 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 mt-3" />
                        </div>

                        {/* Right Column: Degree & Details */}
                        <div className="pl-12">
                            <h3 className="text-3xl font-serif text-zinc-900 dark:text-white mb-4 block md:hidden">{edu.university}</h3>
                            <div className="flex items-baseline gap-4 mb-6">
                                <h4 className="text-3xl md:text-4xl font-sans font-bold text-blue-600 dark:text-blue-500 tracking-tight">{edu.degree}</h4>
                                {edu.gpa && (
                                    <span className="px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500">
                                        GPA {edu.gpa}
                                    </span>
                                )}
                            </div>

                            {edu.projects && (
                                <div className="mb-8">
                                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Capstone</p>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                                        {edu.projects}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {edu.courses.map((course) => (
                                    <span key={course} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-default">
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
