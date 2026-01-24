'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, Briefcase, Mail } from 'lucide-react'

// Icon Interface
interface DockIconProps {
    mouseX: any
    icon: any
    href: string
    label: string
    isActive?: boolean
}

function DockIcon({ mouseX, icon: Icon, href, label, isActive }: DockIconProps) {
    const ref = useRef<HTMLDivElement>(null)

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

    return (
        <Link href={href} className="relative group">
            <motion.div
                ref={ref}
                style={{ width }}
                className="aspect-square rounded-2xl bg-white/50 dark:bg-white/10 border border-zinc-200 dark:border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
            >
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-zinc-600 dark:text-white/80'}`} />
            </motion.div>

            {/* Active Dot */}
            {isActive && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            )}

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white dark:bg-black/80 text-zinc-900 dark:text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-zinc-200 dark:border-white/10 font-mono tracking-widest uppercase truncate whitespace-nowrap shadow-lg">
                {label}
            </span>
        </Link>
    )
}

export default function FloatingDock() {
    const mouseX = useMotionValue(Infinity)
    const pathname = usePathname()

    const items = [
        { icon: Home, href: '/', label: 'Home' },
        { icon: Map, href: '/experience', label: 'Journey' }, // Map icon for Journey
        { icon: Briefcase, href: '/#work', label: 'Projects' },
        { icon: Mail, href: 'mailto:naveen.saragadam@example.com', label: 'Contact' },
    ]

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex h-16 items-end gap-4 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-[#050505]/50 px-4 pb-3 backdrop-blur-2xl z-50 shadow-2xl transition-colors duration-300"
        >
            {items.map((item) => (
                <DockIcon
                    key={item.label}
                    mouseX={mouseX}
                    {...item}
                    isActive={pathname === item.href}
                />
            ))}
        </motion.div>
    )
}
