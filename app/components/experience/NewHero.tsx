'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NewHero() {
    const [activeIndex, setActiveIndex] = useState(0)

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 3)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const cards = [
        {
            id: 'engineer',
            title: 'I Engineer',
            gradient: 'from-[#240b36] to-[#c31432]',
            description: 'Building robust systems'
        },
        {
            id: 'travel',
            title: 'I Travel',
            gradient: 'from-[#1a1a2e] to-[#16213e]',
            description: 'Exploring the world'
        },
        {
            id: 'create',
            title: 'I Create',
            gradient: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
            description: 'Designing experiences'
        }
    ]

    const getCardVariant = (index: number) => {
        const position = (index - activeIndex + 3) % 3

        // 0 = Center/Active
        if (position === 0) {
            return {
                x: 0,
                scale: 1, // Normalized scale
                rotateY: 0,
                zIndex: 30,
                opacity: 1,
                filter: "brightness(1.1)"
            }
        }
        // 1 = Right (Next)
        else if (position === 1) {
            return {
                x: 180, // Tighter offset
                scale: 0.85,
                rotateY: -15,
                zIndex: 20,
                opacity: 0.7,
                filter: "brightness(0.6)"
            }
        }
        // 2 = Left (Previous)
        else {
            return {
                x: -180, // Tighter offset
                scale: 0.85,
                rotateY: 15,
                zIndex: 20,
                opacity: 0.7,
                filter: "brightness(0.6)"
            }
        }
    }

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden bg-transparent">

            {/* Background elements removed to use GlobalBackground */}

            <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10">

                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Custom cubic-bezier for premium feel
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-[0.2em] text-purple-600 dark:text-purple-300 bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/10 dark:border-purple-500/20 backdrop-blur-sm"
                        >
                            MORE ABOUT ME
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-zinc-900 dark:text-white leading-[1.05] tracking-tight">
                            I'm Naveen, a <br />
                            creative <br />
                            <span className="relative inline-block mt-2">
                                <motion.span
                                    animate={{
                                        opacity: [0.2, 0.5, 0.2],
                                        scale: [0.95, 1.15, 0.95],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 blur-2xl opacity-20 dark:opacity-30"
                                />
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-300 italic">engineer</span>
                            </span>
                        </h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="space-y-6"
                    >
                        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-xl">
                            I'm Naveen Saragadam, a proactive Data Engineer passionate about building <span className="text-zinc-900 dark:text-zinc-200 font-normal">scalable infrastructure</span>.
                            From raw logs to actionable insights, I thrive on solving complex data challenges with robust, efficient pipelines.
                        </p>

                        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-xl">
                            Specializing in <span className="text-zinc-900 dark:text-zinc-200 font-normal">PySpark</span>, Cloud Architectures, and <span className="text-zinc-900 dark:text-zinc-200 font-normal">Lakehouse Systems</span>.
                            Technological evolution is relentless, and I love embracing every part of it.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-6 pt-6"
                    >
                        <Link href="https://github.com/naveenksaragadam" target="_blank" className="p-3 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 group">
                            <Github size={22} className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/naveen-saragadam/" target="_blank" className="p-3 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 group">
                            <Linkedin size={22} className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="p-3 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 group">
                            <Twitter size={22} className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right Column: Dynamic 3D Carousel - Adjusted Dimensions */}
                <div className="relative h-[450px] w-full flex items-center justify-center perspective-[1200px] overflow-visible">

                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            animate={getCardVariant(index)}
                            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                            className="absolute top-0 w-[240px] h-[320px] md:w-[260px] md:h-[360px] bg-white dark:bg-zinc-900 rounded-[24px] overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl origin-center transform-style-3d cursor-pointer"
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* Gradient/Image */}
                            <div className={`relative w-full h-full bg-gradient-to-br ${card.gradient}`}>
                                {/* Noise Texture */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

                                <div className="absolute inset-0 flex items-end justify-center pb-8 p-6 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                                    <span className="text-white/90 font-serif text-3xl italic tracking-wide">{card.title}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Decorative Elements */}
                    <motion.div
                        animate={{ opacity: [0.03, 0.08, 0.03] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]"
                    />
                </div>
            </div>
        </section>
    )
}
