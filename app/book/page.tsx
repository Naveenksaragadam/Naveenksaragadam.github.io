'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Calendar, MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BookPage() {
    const [activeTab, setActiveTab] = useState<'book' | 'message'>('book')

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] selection:bg-rose-500/30">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative pt-32 pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-12"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium tracking-wide uppercase">Back to Home</span>
                        </Link>
                    </motion.div>

                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.4em]">Get in touch</span>
                            <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-zinc-900 dark:text-white mt-4">
                                Let's Get <span className="font-serif italic bg-gradient-to-r from-sky-400 via-purple-500 to-rose-400 bg-clip-text text-transparent">In Touch</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <a
                                href="mailto:naveens@arizona.edu"
                                className="inline-flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                            >
                                <Mail size={20} className="text-zinc-400 dark:text-zinc-600 group-hover:text-sky-400 transition-colors" />
                                <span className="text-lg font-medium tracking-tight">naveens@arizona.edu</span>
                            </a>

                            <div className="flex items-center gap-8">
                                <Link href="https://www.linkedin.com/in/naveen-saragadam/" target="_blank" className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-all transform hover:scale-110">
                                    <Linkedin size={22} strokeWidth={1.5} />
                                </Link>
                                <Link href="https://github.com/naveenksaragadam" target="_blank" className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-all transform hover:scale-110">
                                    <Github size={22} strokeWidth={1.5} />
                                </Link>
                                <Link href="mailto:naveens@arizona.edu" className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-all transform hover:scale-110">
                                    <Mail size={22} strokeWidth={1.5} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tab Switcher */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center mb-12"
                    >
                        <div className="inline-flex p-1.5 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl backdrop-blur-3xl shadow-xl">
                            <button
                                onClick={() => setActiveTab('book')}
                                className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'book'
                                        ? 'bg-white dark:bg-white/10 text-zinc-900 dark:text-white shadow-lg'
                                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                                    }`}
                            >
                                <Calendar size={16} />
                                Book a Call
                            </button>
                            <button
                                onClick={() => setActiveTab('message')}
                                className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'message'
                                        ? 'bg-white dark:bg-white/10 text-zinc-900 dark:text-white shadow-lg'
                                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                                    }`}
                            >
                                <MessageSquare size={16} />
                                Send Message
                            </button>
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                            className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-[40px] shadow-2xl backdrop-blur-3xl overflow-hidden min-h-[600px] flex flex-col items-center justify-center p-8 relative group"
                        >
                            {activeTab === 'book' ? (
                                <div className="w-full h-full min-h-[600px] relative">
                                    {/* Glassmorphic Overlay for Iframe Loading Area */}
                                    <div className="absolute inset-x-8 top-8 bottom-8 rounded-[32px] bg-zinc-50/50 dark:bg-black/20 border border-dashed border-zinc-200 dark:border-white/5 flex flex-col items-center justify-center space-y-4">
                                        <div className="w-16 h-16 rounded-full border-4 border-zinc-200 dark:border-white/10 border-t-sky-400 animate-spin" />
                                        <p className="text-zinc-500 dark:text-white/40 font-medium tracking-tight italic font-serif">Loading your personalized experience...</p>
                                    </div>
                                    {/* actual iframe would go here */}
                                    {/* <iframe src="https://calendly.com/your-profile" className="w-full h-full relative z-10 border-none" /> */}
                                </div>
                            ) : (
                                <div className="w-full max-w-lg space-y-8 py-12">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6">
                                            <MessageSquare size={24} className="text-sky-400" />
                                        </div>
                                        <h3 className="text-3xl font-serif italic text-zinc-900 dark:text-white">Write me a message</h3>
                                        <p className="text-zinc-500 dark:text-white/40 leading-relaxed">Have a specific project in mind or just want to chat? Drop me a line below and I'll get back to you personally within 24 hours.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pl-4">Your Email</label>
                                            <input
                                                type="email"
                                                placeholder="hi@example.com"
                                                className="w-full p-4 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-sky-400/20 focus:border-sky-400/50 outline-none transition-all dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pl-4">Your Message</label>
                                            <textarea
                                                rows={4}
                                                placeholder="Tell me about your vision..."
                                                className="w-full p-4 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-sky-400/20 focus:border-sky-400/50 outline-none transition-all dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 resize-none"
                                            />
                                        </div>
                                        <button className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/10 dark:shadow-white/5 uppercase tracking-widest text-xs">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Decorative Corner Glows */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-sky-400/10 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-400/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-rose-400/10 transition-colors" />
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
