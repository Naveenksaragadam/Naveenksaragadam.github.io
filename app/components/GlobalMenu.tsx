'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Home,
    Briefcase,
    Mail,
    Linkedin,
    Github,
    Twitter,
    Search,
    Command,
    X,
    ArrowRight
} from 'lucide-react'

interface MenuItem {
    name: string
    href: string
    icon: any
    description: string
    external?: boolean
}

const menuItems: { category: string; items: MenuItem[] }[] = [
    {
        category: "Pages",
        items: [
            { name: 'Home', href: '/#home', icon: Home, description: 'Go to homepage' },
            { name: 'Projects', href: '/#work', icon: Briefcase, description: 'View my selected work' },
            { name: 'Blog', href: '/blog', icon: Command, description: 'Thoughts & stories' },
            { name: 'Contact', href: '/#contact', icon: Mail, description: 'Get in touch' },
        ]
    },
    {
        category: "Connect",
        items: [
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/naveen-saragadam/', icon: Linkedin, description: 'Professional network', external: true },
            { name: 'GitHub', href: 'https://github.com', icon: Github, description: 'Code repositories', external: true },
            { name: 'Twitter', href: 'https://twitter.com', icon: Twitter, description: 'Thoughts & updates', external: true },
        ]
    }
]

export default function GlobalMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Filter Items
    const filteredGroups = menuItems.map(group => ({
        ...group,
        items: group.items.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        )
    })).filter(group => group.items.length > 0)

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="fixed top-8 right-8 z-50 w-[51.4px] h-[51.4px] md:w-[68.5px] md:h-[68.5px] flex items-center justify-center group"
                aria-label="Open Menu"
            >
                <div className="relative w-10 h-10 md:w-14 md:h-14 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-zinc-200 dark:border-white/20 group-hover:bg-zinc-100 dark:group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                    <Command className="w-5 h-5 md:w-6 md:h-6 text-zinc-900 dark:text-white" />
                </div>
            </motion.button>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-zinc-100/80 dark:bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] transition-colors duration-300"
                        >
                            {/* Header / Search */}
                            <div className="flex items-center px-4 py-4 border-b border-zinc-200 dark:border-white/10 shrink-0">
                                <Search className="w-5 h-5 text-zinc-400 dark:text-white/40 mr-3" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Type a command or search..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="flex-1 bg-transparent text-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/20 outline-none"
                                    aria-label="Search navigation items"
                                />
                                <div className="flex items-center gap-2">
                                    <span className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs text-zinc-500 dark:text-white/40 font-mono">
                                        <span className="text-[10px]">ESC</span>
                                    </span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-md transition-colors"
                                        aria-label="Close Menu"
                                    >
                                        <X className="w-5 h-5 text-zinc-500 dark:text-white/40" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="overflow-y-auto p-2 scrollbar-hide">
                                {filteredGroups.length === 0 ? (
                                    <div className="py-12 text-center text-zinc-400 dark:text-white/30 text-sm">
                                        No results found.
                                    </div>
                                ) : (
                                    <div className="space-y-6 p-2">
                                        {filteredGroups.map((group) => (
                                            <div key={group.category}>
                                                <h3 className="px-3 text-xs font-semibold text-zinc-500 dark:text-white/30 uppercase tracking-wider mb-2">
                                                    {group.category}
                                                </h3>
                                                <div className="space-y-1">
                                                    {group.items.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            target={item.external ? "_blank" : undefined}
                                                            rel={item.external ? "noopener noreferrer" : undefined}
                                                            onClick={() => setIsOpen(false)}
                                                            className="group flex items-center justify-between px-3 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 dark:text-white/60 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:border-orange-200 dark:group-hover:border-orange-500/30 transition-colors">
                                                                    <item.icon className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <div className="text-zinc-900 dark:text-white font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-600 dark:group-hover:from-orange-400 dark:group-hover:to-red-500 transition-all">
                                                                        {item.name}
                                                                    </div>
                                                                    <div className="text-zinc-500 dark:text-white/40 text-sm">
                                                                        {item.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {item.external && (
                                                                <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-white/20 group-hover:text-zinc-600 dark:group-hover:text-white/60 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-3 bg-zinc-50 dark:bg-white/5 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-[10px] text-zinc-500 dark:text-white/30 uppercase tracking-wider shrink-0 transition-colors duration-300">
                                <div>Navigation</div>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <ArrowRight className="w-3 h-3" /> Select
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Command className="w-3 h-3" /> + K to open
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
