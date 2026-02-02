'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Calendar, MessageSquare, Github, Linkedin, X } from 'lucide-react'
import Link from 'next/link'

interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-end justify-center p-4 pointer-events-none">
                        <motion.div
                            drag="y"
                            dragConstraints={{ top: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (info.offset.y > 100) {
                                    onClose()
                                }
                            }}
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-lg bg-zinc-900/90 dark:bg-[#0a0a0a]/90 border border-white/10 rounded-t-[40px] rounded-b-[24px] overflow-hidden pointer-events-auto backdrop-blur-3xl shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)] mb-4 touch-none"
                        >
                            {/* Drag Handle (Visual) */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full" />

                            {/* Header */}
                            <div className="p-8 pb-4 pt-10 flex items-center justify-between">
                                <h2 className="text-3xl font-serif italic text-white/90">Get in touch</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Main Content */}
                            <div className="p-8 pt-2 space-y-6">
                                {/* Top Row Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Book a Call */}
                                    <Link
                                        href="/book"
                                        onClick={onClose}
                                        className="group p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Calendar size={20} className="text-white/60" />
                                        </div>
                                        <h3 className="text-white font-medium mb-1">Book a Call</h3>
                                        <p className="text-white/40 text-sm">Schedule a 30-min chat</p>
                                    </Link>

                                    {/* Email Me */}
                                    <Link
                                        href="mailto:naveens@arizona.edu"
                                        className="group p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Mail size={20} className="text-white/60" />
                                        </div>
                                        <h3 className="text-white font-medium mb-1">Email Me</h3>
                                        <p className="text-white/40 text-sm">naveens@arizona.edu</p>
                                    </Link>
                                </div>

                                {/* Message Bar */}
                                <div className="group relative flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            <MessageSquare size={16} className="text-blue-400" />
                                        </div>
                                        <span className="text-white/70 font-medium">Or write me a message here</span>
                                    </div>
                                    <span className="text-white/30 text-xs">Tap to open</span>
                                    {/* Progress background effect */}
                                    <div className="absolute inset-0 rounded-2xl border-white/5 border-dashed border pointer-events-none" />
                                </div>

                                {/* Socials Footer */}
                                <div className="pt-4 text-center">
                                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] block mb-6">Connect on socials</span>
                                    <div className="flex justify-center gap-8 pb-4">
                                        <Link href="https://www.linkedin.com/in/naveen-saragadam/" target="_blank" className="text-white/40 hover:text-white transition-all transform hover:scale-110">
                                            <Linkedin size={22} strokeWidth={1.5} />
                                        </Link>
                                        <Link href="https://github.com/naveenksaragadam" target="_blank" className="text-white/40 hover:text-white transition-all transform hover:scale-110">
                                            <Github size={22} strokeWidth={1.5} />
                                        </Link>
                                        <Link href="mailto:naveens@arizona.edu" className="text-white/40 hover:text-white transition-all transform hover:scale-110">
                                            <Mail size={22} strokeWidth={1.5} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
