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
        year: "2025",
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
        year: "2021",
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
        <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-32 md:mb-48"
            >
                <h2 className="font-serif text-5xl md:text-8xl text-zinc-900 dark:text-white tracking-tighter">
                    Education
                </h2>
            </motion.div>

            <div className="space-y-32 md:space-y-48">
                {education.map((edu, idx) => (
                    <div key={idx} className="relative">
                        {/* Massive Year Watermark */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute -top-20 -left-6 md:-top-32 md:-left-12 text-[120px] md:text-[240px] font-bold text-zinc-100 dark:text-zinc-900/40 select-none z-0 leading-none tracking-tighter"
                        >
                            {edu.year}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12 md:gap-24 items-start pl-4 md:pl-12"
                        >
                            {/* Main Info */}
                            <div>
                                <h3 className="text-4xl md:text-6xl font-serif text-zinc-900 dark:text-white mb-4 leading-tight">
                                    {edu.university}
                                </h3>
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-8">
                                    <p className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400">
                                        {edu.degree}
                                    </p>
                                    <p className="font-mono text-sm text-zinc-500 uppercase tracking-widest">
                                        {edu.location}
                                    </p>
                                </div>

                                {edu.gpa && (
                                    <div className="inline-block border-b border-zinc-300 dark:border-zinc-700 pb-1 mb-8">
                                        <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-300">GPA {edu.gpa}</span>
                                    </div>
                                )}
                            </div>

                            {/* Details Column */}
                            <div className="pt-4">
                                <div className="mb-10">
                                    <p className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-6">
                                        Curriculum
                                    </p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                                        {edu.courses.map((course) => (
                                            <span
                                                key={course}
                                                className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-light hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {edu.projects && (
                                    <div>
                                        <p className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-4">
                                            Capstone
                                        </p>
                                        <p className="text-base text-zinc-800 dark:text-zinc-200 leading-relaxed font-light">
                                            {edu.projects}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    )
}
