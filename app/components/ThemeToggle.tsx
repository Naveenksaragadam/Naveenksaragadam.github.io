'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle({ forceDark }: { forceDark?: boolean }) {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isActuallyDark = resolvedTheme === 'dark' || forceDark

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={`
                w-8 h-8 flex items-center justify-center rounded-full transition-colors active:scale-95
                ${forceDark
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'}
            `}
            aria-label="Toggle Theme"
        >
            {isActuallyDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
    )
}
