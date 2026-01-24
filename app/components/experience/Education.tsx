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
        <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32 bg-white dark:bg-[#050505] transition-colors duration-500">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24"
            >
                <h2 className="font-serif text-5xl md:text-7xl text-zinc-900 dark:text-white tracking-tight">
                    Academic Background
                </h2>
                <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 mt-8" />
            </motion.div>

            <div className="space-y-0">
                {education.map((edu, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="group relative grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-zinc-200 dark:border-zinc-800"
                    >
                        {/* Period - Right Border only on desktop */}
                        <div className="py-8 md:py-16 md:pr-12 md:border-r border-zinc-200 dark:border-zinc-800">
                            <span className="font-mono text-sm text-zinc-500 dark:text-zinc-500 sticky top-32 block font-medium">
                                {edu.period}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="py-8 md:py-16 md:pl-12">
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-8">
                                <div>
                                    <h3 className="font-serif text-3xl md:text-5xl text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-zinc-300 transition-colors">
                                        {edu.university}
                                    </h3>
                                    <p className="font-mono text-zinc-500 text-sm tracking-wide">
                                        {edu.location?.toUpperCase()}
                                    </p>
                                </div>
                                <div className="text-right self-start md:self-auto">
                                    <p className="text-zinc-900 dark:text-white text-lg font-medium">{edu.degree}</p>
                                    {edu.gpa && (
                                        <p className="text-zinc-500 text-sm font-mono mt-1">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8">
                                <div>
                                    <p className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-4">Focus Areas</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        {edu.courses.map((course) => (
                                            <span key={course} className="text-sm text-zinc-600 dark:text-zinc-400 font-light hover:text-blue-600 dark:hover:text-white transition-colors cursor-default">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {edu.projects && (
                                    <div className="md:border-l border-zinc-200 dark:border-zinc-900 md:pl-8">
                                        <p className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-4">Capstone</p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            {edu.projects}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
