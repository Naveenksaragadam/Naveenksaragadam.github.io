'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const education = [
    {
        degree: "M.S in Information Science",
        specialization: "Specialization in Machine Learning",
        university: "University of Arizona",
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
        <section className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center font-serif text-5xl md:text-6xl text-white mb-24 tracking-tight"
            >
                Education
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {education.map((edu, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        className="group relative p-8 md:p-12 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors"
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-serif text-white">{edu.university}</h3>
                                    <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">{edu.period}</p>
                                </div>
                                {edu.gpa && (
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300">
                                        GPA: {edu.gpa}
                                    </div>
                                )}
                            </div>

                            <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{edu.degree}</h4>
                            {edu.specialization && <p className="text-blue-400 text-sm font-medium mb-6">{edu.specialization}</p>}

                            {/* Divider */}
                            <div className="h-px w-12 bg-zinc-800 my-8" />

                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Relevant Courses</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.courses.map((course) => (
                                            <span key={course} className="text-[11px] px-2 py-1 rounded bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Capstone</h5>
                                    <div className="flex items-center gap-3 text-zinc-300 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        {edu.projects}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
