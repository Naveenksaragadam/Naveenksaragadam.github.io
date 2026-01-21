'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
    const [activeTab, setActiveTab] = React.useState('home')
    const [isScrolled, setIsScrolled] = React.useState(false)

    // Handle scroll for active tab AND navbar position
    React.useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsScrolled(scrollY > 100)

            // Active Tab Logic
            const workSection = document.getElementById('work')
            const contactSection = document.getElementById('contact')
            const scrollPosition = scrollY + window.innerHeight / 2

            if (contactSection && scrollPosition >= contactSection.offsetTop) {
                setActiveTab('contact')
            } else if (workSection && scrollPosition >= workSection.offsetTop) {
                setActiveTab('work')
            } else {
                setActiveTab('home')
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`fixed top-8 left-0 right-0 z-40 flex pointer-events-none transition-all duration-700 ease-in-out ${isScrolled ? 'justify-center' : 'justify-end pr-20 md:pr-40'
                }`}
        >
            <motion.div
                layout
                className="flex items-center gap-1 bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 px-1.5 py-1.5 rounded-full shadow-2xl shadow-black/40 pointer-events-auto"
            >
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveTab(item.id)}
                        className={`
                relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300
                ${activeTab === item.id ? 'text-black' : 'text-white/60 hover:text-white'}
              `}
                    >
                        {activeTab === item.id && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{item.name}</span>
                    </Link>
                ))}
                {activeTab !== 'home' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: 'auto' }}
                        exit={{ opacity: 0, scale: 0.8, width: 0 }}
                        className="pl-2 border-l border-white/10 ml-2"
                    >
                        <ThemeToggle />
                    </motion.div>
                )}
            </motion.div>
        </motion.nav>
    )
}
