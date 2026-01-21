'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about-placeholder' },
    { name: 'Services', href: '#services-placeholder' },
    { name: 'Journal', href: '#journal-placeholder' },
    { name: 'Contact', href: '#contact' },
]

export default function GlobalMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Menu Trigger Button */}
            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-8 right-8 z-[60] w-12 h-12 flex items-center justify-center mix-blend-difference group"
            >
                <div className="relative w-8 h-6 flex flex-col justify-between">
                    <span className={`w-full h-[2px] bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[11px]' : ''}`} />
                    <span className={`w-full h-[2px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-full h-[2px] bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[11px]' : ''}`} />
                </div>
            </motion.button>

            {/* Turn off standard Navbar when Menu is open? Optional. Keeping both for now. */}

            {/* Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-2xl flex items-center justify-center"
                    >
                        {/* Background Decoration */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px]" />
                        </div>

                        <nav className="relative z-10 flex flex-col items-center gap-8">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-5xl md:text-7xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all tracking-tighter"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Social/Meta Info Bottom Left */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 left-12 text-gray-500 text-sm uppercase tracking-widest hidden md:block"
                        >
                            Naveen Saragadam <br /> Portfolio '24
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
