'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative w-full bg-zinc-50 dark:bg-[#050505] overflow-hidden transition-colors duration-300">
            {/* Grainy Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}></div>

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-50" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-40" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-12">

                {/* CTA Section */}
                <div className="flex flex-col items-center text-center space-y-10 mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Logo/Icon placeholder */}
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full flex items-center justify-center border border-zinc-200 dark:border-white/5 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">NS</span>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-900 dark:text-white max-w-6xl mx-auto leading-[0.9]"
                    >
                        FROM CONCEPT TO <span className="text-zinc-400 dark:text-white/60">CREATION</span><br />
                        LET'S MAKE IT <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">HAPPEN!</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="pt-10"
                    >
                        <a
                            href="mailto:naveen.saragadam@example.com"
                            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-105 hover:shadow-xl dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]"
                        >
                            <span className="text-xl font-medium text-zinc-900 dark:text-white tracking-tight">Get In Touch</span>
                            <div className="relative overflow-hidden w-8 h-8 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                                <ArrowRight size={18} className="text-white dark:text-black" />
                            </div>
                        </a>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-zinc-600 dark:text-zinc-500 text-lg md:text-xl max-w-lg mx-auto mt-16 font-medium"
                    >
                        I'm available for full-time roles & freelance projects.
                        <br />
                        <span className="text-sm text-zinc-500 dark:text-zinc-600 block mt-3 font-normal">Based in USA · UTC-5</span>
                    </motion.p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/10 to-transparent mb-20" />

                {/* Navigation Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">

                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="inline-block">
                            <span className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white">NS</span>
                        </Link>
                        <p className="text-zinc-600 dark:text-zinc-500 max-w-xs leading-relaxed">
                            A creative developer crafting digital experiences that matter.
                            Focused on performance, accessibility and modern design.
                        </p>
                        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-500 text-sm font-medium tracking-wide">Available for work</span>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8">
                        {/* Column 1 */}
                        <div className="space-y-8">
                            <h3 className="text-xs font-bold text-zinc-400 dark:text-white/40 uppercase tracking-[0.2em]">General</h3>
                            <ul className="space-y-5">
                                <li><Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Home</Link></li>
                                <li><Link href="/work" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Projects</Link></li>
                                <li><Link href="/blog" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Blog</Link></li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-8">
                            <h3 className="text-xs font-bold text-zinc-400 dark:text-white/40 uppercase tracking-[0.2em]">Specifics</h3>
                            <ul className="space-y-5">
                                <li><Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Guest Book</Link></li>
                                <li><Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Bucket List</Link></li>
                                <li><Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Uses</Link></li>
                                <li><Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Attribution</Link></li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-8">
                            <h3 className="text-xs font-bold text-zinc-400 dark:text-white/40 uppercase tracking-[0.2em]">More</h3>
                            <ul className="space-y-5">
                                <li><a href="mailto:naveen.saragadam@example.com" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Book a call</a></li>
                                <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Links</a></li>
                                <li><Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">RSS</Link></li>
                                <li><Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Privacy</Link></li>
                                <li><Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Terms</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-500 dark:text-zinc-600 text-sm font-medium">© {currentYear} Naveen Saragadam. All rights reserved.</p>

                    <div className="flex gap-8">
                        <Link href="https://github.com/naveenksaragadam" target="_blank" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 transform hover:scale-110" aria-label="GitHub Profile">
                            <Github size={20} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/naveen-saragadam/" target="_blank" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 transform hover:scale-110" aria-label="LinkedIn Profile">
                            <Linkedin size={20} />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 transform hover:scale-110" aria-label="Twitter Profile">
                            <Twitter size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
