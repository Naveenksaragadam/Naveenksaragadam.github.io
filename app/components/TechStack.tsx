'use client'

import { motion } from 'framer-motion'

const techStack = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Unreal Engine",
    "Python", "PostgreSQL", "Docker", "AWS", "Framer Motion", "Three.js",
    "Node.js", "GraphQL", "Supabase", "Git"
]

export default function TechStack() {
    return (
        <div className="w-full py-12 overflow-hidden relative">
            {/* Fade edges - use white for light mode to match page bg */}
            <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-white dark:from-[#121212] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-white dark:from-[#121212] to-transparent pointer-events-none" />

            <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-gray-500 mb-8">
                My Tech Stack
            </h3>

            <div className="flex">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-8 whitespace-nowrap"
                >
                    {[...techStack, ...techStack].map((tech, index) => (
                        <div
                            key={index}
                            className="text-2xl md:text-4xl font-bold text-zinc-300 dark:text-white/20 hover:text-blue-500 dark:hover:text-white transition-colors cursor-default"
                        >
                            {tech}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
