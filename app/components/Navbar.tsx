'use client'

import React from 'react'
import { motion, useScroll, animate } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Journey', href: '/journey', id: 'journey', sectionId: 'journey-section' },
    { name: 'Work', href: '/work', id: 'work', sectionId: 'work-section' },
]

export default function Navbar() {
    const pathname = usePathname()
    const [activeTab, setActiveTab] = React.useState('home')
    const { scrollY } = useScroll()
    const [isHomeAnimated, setIsHomeAnimated] = React.useState(false)
    
    // Ref to prevent scroll listener from overriding manual clicks during smooth scroll
    const isManualScrolling = React.useRef(false)

    // Handle scroll and active tab synchronization
    React.useEffect(() => {
        const handleScroll = () => {
            if (isManualScrolling.current) return;

            const currentScroll = scrollY.get()
            
            if (pathname === '/') {
                const viewportHeight = window.innerHeight
                setIsHomeAnimated(currentScroll < viewportHeight * 4.5)

                const sections = navItems.filter(item => item.sectionId)
                let currentActive = 'home'
                
                const triggerPoint = window.innerHeight * 0.3
                
                // Sort sections by their position in DOM to ensure correct precedence
                const sortedSections = [...sections].sort((a, b) => {
                    const elA = document.getElementById(a.sectionId!)
                    const elB = document.getElementById(b.sectionId!)
                    return (elA?.offsetTop || 0) - (elB?.offsetTop || 0)
                })

                for (const item of sortedSections) {
                    const el = document.getElementById(item.sectionId!)
                    if (el) {
                        const rect = el.getBoundingClientRect()
                        if (rect.top <= triggerPoint) {
                            currentActive = item.id
                        }
                    }
                }

                // Special case: bottom of page
                if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                   currentActive = 'work' // Work is now last
                }
                
                setActiveTab(currentActive)
            } else {
                setIsHomeAnimated(false)
                if (pathname === '/work') setActiveTab('work')
                else if (pathname === '/journey') setActiveTab('journey')
                else setActiveTab('home')
            }
        }

        handleScroll()
        const unsubscribe = scrollY.on('change', handleScroll)
        return () => unsubscribe()
    }, [pathname, scrollY])

    const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
        if (pathname === '/' && (item.sectionId || item.href === '/')) {
            e.preventDefault()
            
            let targetPosition = 0
            if (item.sectionId) {
                const element = document.getElementById(item.sectionId)
                if (element) {
                    const offset = 100
                    const bodyRect = document.body.getBoundingClientRect().top
                    const elementRect = element.getBoundingClientRect().top
                    targetPosition = elementRect - bodyRect - offset
                }
            }

            isManualScrolling.current = true
            setActiveTab(item.id)

            const currentScroll = window.scrollY
            animate(currentScroll, targetPosition, {
                type: "spring",
                bounce: 0,
                duration: 1.2,
                onUpdate: (latest) => window.scrollTo(0, latest),
                onComplete: () => {
                    setTimeout(() => {
                        isManualScrolling.current = false
                    }, 50)
                }
            })
        } else {
            setActiveTab(item.id)
        }
    }

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
                                    onClick={(e) => handleNavClick(e, item)}
                                    className={`
                                        relative px-5 py-2 rounded-full text-[14px] font-medium transition-all duration-300
                                        ${isActive
                                            ? (forceDark ? 'text-white' : 'text-zinc-900 dark:text-white')
                                            : (forceDark ? 'text-white/50 hover:text-white' : 'text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white')}
                                    `}
                                    suppressHydrationWarning
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
                        <Link
                            href="/book"
                            className={`
                                group relative px-6 py-2 rounded-full text-[14px] font-semibold transition-all duration-500 overflow-hidden
                                ${forceDark
                                    ? 'text-white bg-white/10 hover:bg-white/20 border border-white/10'
                                    : 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 border border-zinc-200 dark:border-white/10'}
                            `}
                            suppressHydrationWarning
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5 blur-md" />
                            <span className="relative z-10">Book a Call</span>
                        </Link>

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
