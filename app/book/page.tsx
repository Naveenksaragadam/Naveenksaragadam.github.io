'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Calendar, MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import InterviewScheduler from '../components/InterviewScheduler'

export default function BookPage() {
    const [activeTab, setActiveTab] = useState<'book' | 'message'>('book')

    return (
        <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
            <Navbar />

            <div className="relative pt-32 pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium tracking-wide">Back to Home</span>
                        </Link>
                    </motion.div>

                    {/* Header Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-12"
                    >
                        <div className="inline-flex p-1 bg-zinc-900/50 border border-white/5 rounded-lg backdrop-blur-sm">
                            <button
                                onClick={() => setActiveTab('book')}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'book'
                                    ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-white/5'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                <Calendar size={14} />
                                Book a Call
                            </button>
                            <button
                                onClick={() => setActiveTab('message')}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'message'
                                    ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-white/5'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                <MessageSquare size={14} />
                                Send Message
                            </button>
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {activeTab === 'book' ? (
                            <InterviewScheduler />
                        ) : (
                            <div className="max-w-2xl mx-auto bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl font-semibold text-white">Send a Message</h3>
                                        <p className="text-zinc-400 text-sm">Got a project in mind? Let's talk.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Your Email</label>
                                            <input
                                                type="email"
                                                placeholder="hi@example.com"
                                                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/20 focus:border-white/20 outline-none transition-all text-white placeholder:text-zinc-600"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Message</label>
                                            <textarea
                                                rows={4}
                                                placeholder="Tell me about your vision..."
                                                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/20 focus:border-white/20 outline-none transition-all text-white placeholder:text-zinc-600 resize-none"
                                            />
                                        </div>
                                        <button className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
