'use client'

import { motion } from 'framer-motion'

const projects = [
    {
        title: "Project Alpha",
        category: "Web Development",
        description: "A high-performance e-commerce platform built with Next.js.",
        color: "bg-blue-500"
    },
    {
        title: "Neon Nexus",
        category: "Interaction Design",
        description: "Experimental WebGL showcase focusing on light physics.",
        color: "bg-purple-500"
    },
    {
        title: "Velvet UI",
        category: "Design System",
        description: "A comprehensive React component library for enterprise apps.",
        color: "bg-pink-500"
    }
]

export default function Projects() {
    return (
        <section className="relative z-10 w-full bg-[#121212] py-32 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-20 text-white"
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
                            className="group relative h-[400px] w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10"
                        >
                            <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity ${project.color}`} />

                            <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform group-hover:-translate-y-2">
                                <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">{project.category}</p>
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-300 line-clamp-2">{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
