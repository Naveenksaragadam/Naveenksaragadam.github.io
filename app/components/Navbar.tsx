'use client'

import React from 'react' // Added React import
import { motion } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { name: 'Home', href: '#home', id: 'home' }, // Added id
    { name: 'Work', href: '#work', id: 'work' }, // Added id
    // { name: 'About', href: '#about' }, // Overlay text essentially covers About
    { name: 'Contact', href: '#contact', id: 'contact' }, // Added id
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
            className={`fixed z-40 flex pointer-events-none transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isScrolled
                    ? 'top-6 left-1/2 -translate-x-1/2'
                    : 'top-8 right-20 md:right-40'
                }`}
        >
            <motion.div
                layout
                className={`flex items-center gap-1 backdrop-blur-2xl border transition-all duration-300 pointer-events-auto ${isScrolled
                        ? 'bg-black/80 border-white/10 px-3 py-2 rounded-full shadow-2xl scale-90'
                        : 'bg-[#0a0a0a]/60 border-white/5 px-1.5 py-1.5 rounded-full shadow-xl'
                    }`}
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
