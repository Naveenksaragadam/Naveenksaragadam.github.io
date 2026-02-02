'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send } from 'lucide-react'

export default function GuestbookPage() {
    const [message, setMessage] = useState('')

    return (
        <main className="min-h-screen selection:bg-rose-500/30">
            <Navbar />

            <div className="relative pt-40 pb-24 px-6 min-h-[80vh] flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl w-full text-center space-y-8"
                >
                    <h1 className="text-5xl md:text-7xl font-serif italic text-zinc-900 dark:text-white mb-4">
                        Guestbook
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
                        Leave a note, say hello, or just let me know you were here.
                        It's a digital record of our paths crossing.
                    </p>

                    {/* Input Area */}
                    <div className="relative max-w-md mx-auto w-full mt-12">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Sign the guestbook..."
                            className="w-full px-6 py-4 bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 backdrop-blur-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
                        />
                        <button
                            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:scale-105 transition-transform"
                        >
                            <Send size={18} />
                        </button>
                    </div>

                    {/* Messages Feed (Mock) */}
                    <div className="mt-20 grid gap-6 text-left">
                        <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 backdrop-blur-sm">
                            <p className="text-zinc-800 dark:text-zinc-200 font-serif italic text-lg">"Love the portfolio design! The bento grid is super clean."</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-4 uppercase tracking-widest font-semibold">— Sarah Mitchell</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 backdrop-blur-sm">
                            <p className="text-zinc-800 dark:text-zinc-200 font-serif italic text-lg">"Just passing through. Amazing work on the animations!"</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-4 uppercase tracking-widest font-semibold">— Alex Chen</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    )
}
