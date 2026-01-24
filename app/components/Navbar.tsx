'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Journey', href: '/experience', id: 'experience' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Work', href: '/work', id: 'work' },
]

export default function Navbar() {
    const pathname = usePathname()
    const [activeTab, setActiveTab] = React.useState('home')
    const [isScrolled, setIsScrolled] = React.useState(false)

    // Handle scroll and initial active tab
    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100)
        window.addEventListener('scroll', handleScroll)

        // simple pathname check for active tab
        if (pathname === '/about') setActiveTab('about')
        else if (pathname === '/work') setActiveTab('work')
        else if (pathname === '/experience') setActiveTab('experience')
        else setActiveTab('home')

        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    return (
        <motion.nav
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-6 left-1/2 z-50 pointer-events-none"
        >
            <div className="relative">
                {/* Top Glow/Reflection Effect */}
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[2px] z-20" />

                <motion.div
                    layout
                    className="relative flex items-center gap-1.5 bg-[#121212]/50 backdrop-blur-2xl border border-white/[0.08] p-2 rounded-full shadow-2xl shadow-black/50 pointer-events-auto overflow-hidden ring-1 ring-white/5"
                >
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                    relative px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300
                                    ${isActive
                                        ? 'text-white shadow-[0_1px_10px_rgba(255,255,255,0.05)]'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-white/[0.1] rounded-full ring-1 ring-white/[0.05]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        )
                    })}

                    {/* Theme Toggle - Integrated seamlessly */}
                    <div className="ml-1 px-2">
                        <ThemeToggle />
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    )
}
