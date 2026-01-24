'use client'

import { usePathname } from 'next/navigation'

export default function GlobalBackground() {
    const pathname = usePathname()
    const isHome = pathname === '/'

    return (
        <div
            className={`fixed inset-0 z-[-1] overflow-hidden bg-white dark:bg-[#050505] transition-opacity duration-500 ease-in-out pointer-events-none ${isHome ? 'opacity-0' : 'opacity-100'}`}
            style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
            {/* Ambient Background Glows - Adjusted for Light/Dark Mode */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-200/40 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

            {/* Subtle Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        </div>
    )
}
