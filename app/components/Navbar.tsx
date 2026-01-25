'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Journey', href: '/experience', id: 'experience' },
    { name: 'Work', href: '/work', id: 'work' },
]

export default function Navbar() {
    const pathname = usePathname()
    const [activeTab, setActiveTab] = React.useState('home')
    const { scrollY } = useScroll()
    const [isHomeAnimated, setIsHomeAnimated] = React.useState(false)

    // Handle scroll and initial active tab
    React.useEffect(() => {
        const checkScroll = (latest: number) => {
            if (pathname === '/') {
                const viewportHeight = window.innerHeight
                setIsHomeAnimated(latest < viewportHeight * 4.5)
            } else {
                setIsHomeAnimated(false)
            }
        }

        // Check initial state
        checkScroll(scrollY.get())

        // Track changes
        const unsubscribe = scrollY.on('change', checkScroll)

        // simple pathname check for active tab
        if (pathname === '/work') setActiveTab('work')
        else if (pathname === '/experience') setActiveTab('experience')
        else setActiveTab('home')

        return () => unsubscribe()
    }, [pathname, scrollY])

    // Force dark mode styles if on animated home sections
    const forceDark = pathname === '/' && isHomeAnimated

    return (
        <motion.nav
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-6 left-1/2 z-50 pointer-events-none"
        >
            <div className="relative flex items-center gap-4">
                {/* Top Glow/Reflection Effect */}
                <div className={`absolute -top-px left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[2px] z-20 ${forceDark ? 'opacity-100' : 'opacity-0 dark:opacity-100'} transition-opacity duration-300`} />

                <motion.div
                    layout
                    className={`
                        relative flex items-center gap-1 backdrop-blur-2xl border p-1.5 rounded-full shadow-lg pointer-events-auto overflow-hidden ring-1 transition-all duration-500
                        ${forceDark
                            ? 'bg-[#121212]/50 border-white/[0.08] shadow-black/50 ring-white/5'
                            : 'bg-white/70 dark:bg-[#121212]/50 border-zinc-200 dark:border-white/[0.08] dark:shadow-black/50 ring-zinc-900/5 dark:ring-white/5'}
                    `}
                >
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                    relative px-8 py-2 rounded-full text-[15px] font-semibold transition-all duration-300
                                    ${isActive
                                        ? (forceDark ? 'text-white' : 'text-zinc-900 dark:text-white')
                                        : (forceDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5')}
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className={`absolute inset-0 shadow-sm ring-1 rounded-full transition-colors duration-500 ${forceDark ? 'bg-white/[0.1] ring-white/[0.05]' : 'bg-white ring-zinc-200 dark:bg-white/[0.1] dark:ring-white/[0.05]'}`}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        )
                    })}

                    {/* Theme Toggle - Integrated seamlessly */}
                    <div className="flex items-center px-4 pr-1">
                        <ThemeToggle forceDark={forceDark} />
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    )
}
