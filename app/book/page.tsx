'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, ArrowLeft, Calendar, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import BookingWidget from '../components/BookingWidget'

export default function BookPage() {
    const [activeTab, setActiveTab] = useState<'book' | 'message'>('book')

    return (
        <main className="min-h-screen selection:bg-rose-500/30 bg-[#f3f4f6] dark:bg-[#050505] transition-colors duration-300">
            <Navbar />

            <div className="relative pt-32 pb-24 px-6 flex flex-col items-center">

                {/* Social Links (Top Center) */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-6 mb-8 text-gray-500 dark:text-gray-400"
                >
                    <Link href="https://www.linkedin.com/in/naveen-saragadam/" target="_blank" className="hover:text-black dark:hover:text-white transition-colors">
                        <Linkedin size={20} />
                    </Link>
                    <Link href="https://github.com/naveenksaragadam" target="_blank" className="hover:text-black dark:hover:text-white transition-colors">
                        <Github size={20} />
                    </Link>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                        <Twitter size={20} />
                    </Link>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#121212] p-1 rounded-lg border border-gray-200 dark:border-[#2E2E2E] flex items-center mb-12 shadow-sm w-full max-w-md"
                >
                    <button
                        onClick={() => setActiveTab('book')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded text-sm font-medium transition-all ${activeTab === 'book'
                                ? 'bg-gray-100 dark:bg-[#1E1E1E] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-[#2E2E2E]'
                                : 'text-gray-500 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <Calendar size={16} />
                        Book a Call
                    </button>
                    <button
                        onClick={() => setActiveTab('message')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded text-sm font-medium transition-all ${activeTab === 'message'
                                ? 'bg-gray-100 dark:bg-[#1E1E1E] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-[#2E2E2E]'
                                : 'text-gray-500 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <MessageSquare size={16} />
                        Send Message
                    </button>
                </motion.div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex justify-center"
                >
                    {activeTab === 'book' ? (
                        <BookingWidget />
                    ) : (
                        <div className="w-full max-w-md bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2E2E2E] rounded-xl shadow-xl p-8">
                            {/* Reusing the message form style but adapting to new container */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send Message</h3>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 dark:text-[#A1A1AA] uppercase">Your Email</label>
                                    <input
                                        type="email"
                                        placeholder="hi@example.com"
                                        className="w-full p-3 bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2E2E2E] rounded-lg focus:ring-1 focus:ring-white outline-none transition-all dark:text-white placeholder:text-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 dark:text-[#A1A1AA] uppercase">Your Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell me about your vision..."
                                        className="w-full p-3 bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2E2E2E] rounded-lg focus:ring-1 focus:ring-white outline-none transition-all dark:text-white placeholder:text-gray-400 resize-none"
                                    />
                                </div>
                                <button className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

            </div>
        </main>
    )
}
