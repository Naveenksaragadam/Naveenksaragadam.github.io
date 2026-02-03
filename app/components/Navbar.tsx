'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Journey', href: '/journey', id: 'journey' },
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
        else if (pathname === '/journey') setActiveTab('journey')
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

                <motion.div
                    layout
                    className={`
                        relative flex items-center gap-1 backdrop-blur-2xl border p-1 rounded-full shadow-2xl pointer-events-auto overflow-hidden ring-1 transition-all duration-500
                        ${forceDark
                            ? 'bg-zinc-900/60 border-white/10 shadow-black/40 ring-white/5'
                            : 'bg-white/70 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/10 dark:shadow-black/40 ring-zinc-900/5 dark:ring-white/5'}
                    `}
                >
                    <div className="flex items-center gap-1 px-1">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.id
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`
                                        relative px-5 py-2 rounded-full text-[14px] font-medium transition-all duration-300
                                        ${isActive
                                            ? (forceDark ? 'text-white' : 'text-zinc-900 dark:text-white')
                                            : (forceDark ? 'text-white/50 hover:text-white' : 'text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white')}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-pill"
                                            className={`absolute inset-0 z-0 ${forceDark ? 'bg-white/10' : 'bg-zinc-100 dark:bg-white/5'} rounded-full`}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex items-center gap-2 pr-1">
                        {/* Premium CTA: Book a Call (Pill-in-Pill) */}
                        <Link
                            href="/book"
                            className={`
                                group relative px-6 py-2 rounded-full text-[14px] font-semibold transition-all duration-500 overflow-hidden
                                ${forceDark
                                    ? 'text-white bg-white/10 hover:bg-white/20 border border-white/10'
                                    : 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 border border-zinc-200 dark:border-white/10'}
                            `}
                        >
                            {/* Inner Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            {/* Subtle Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5 blur-md" />

                            <span className="relative z-10">Book a Call</span>
                        </Link>

                        {/* Theme Toggle & Separator */}
                        <div className="flex items-center gap-1">
                            <div className="w-[1px] h-4 bg-zinc-200 dark:bg-white/10 mx-1" />
                            <ThemeToggle forceDark={forceDark} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    )
}
