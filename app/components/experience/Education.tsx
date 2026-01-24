'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <section className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 text-center"
            >
                <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight mb-4">
                    Academic <span className="text-zinc-500">Credentials</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {education.map((edu, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        onMouseMove={handleMouseMove}
                        className="group relative rounded-3xl bg-[#080808] border border-white/5 overflow-hidden transition-colors hover:border-white/10"
                    >
                        {/* Spotlight Gradient */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                            style={{
                                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
                            }}
                        />

                        <div className="relative p-8 md:p-10 h-full flex flex-col items-start text-left">
                            {/* University Header */}
                            <div className="mb-6 w-full">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-3xl font-serif text-white tracking-wide">{edu.university}</h3>
                                    <span className="inline-flex items-center px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        {edu.period}
                                    </span>
                                </div>
                                <p className="text-zinc-500 font-mono text-sm">{edu.location || "USA"}</p>
                            </div>

                            {/* Degree Info */}
                            <div className="mb-8">
                                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{edu.degree}</h4>
                                {edu.specialization && <p className="text-zinc-400 text-sm font-medium">{edu.specialization}</p>}
                                {edu.gpa && (
                                    <div className="mt-4 inline-flex items-center bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-md">
                                        <span className="text-blue-400 text-sm font-bold tracking-tight">GPA {edu.gpa}</span>
                                    </div>
                                )}
                            </div>

                            {/* Coursework Cluster */}
                            <div className="mt-auto pt-8 border-t border-white/5 w-full">
                                <h5 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4">Core Competencies</h5>
                                <div className="flex flex-wrap gap-2">
                                    {edu.courses.map((course) => (
                                        <span key={course} className="text-xs px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 transition-all group-hover:border-zinc-700">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Capstone Link-style */}
                            <div className="mt-6 w-full p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                <div>
                                    <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Capstone</span>
                                    <span className="text-sm text-zinc-200 leading-snug">{edu.projects}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
