'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'

const LoadingContext = createContext<{
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}>({
    isLoading: true,
    setIsLoading: () => { },
})

export const useLoading = () => useContext(LoadingContext)

export function Providers({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                storageKey="theme-preference-v1"
            >
                <SystemThemeSync />
                {children}
            </ThemeProvider>
        </LoadingContext.Provider>
    )
}

function SystemThemeSync() {
    const { setTheme } = useTheme()

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e: MediaQueryListEvent) => {
            // 1. Remove manual preference to allow system passthrough
            try {
                localStorage.removeItem('theme-preference-v1')
            } catch (err) {
                // Ignore errors
            }
            // 2. Force system mode
            setTheme('system')
        }

        media.addEventListener('change', handleChange)
        return () => media.removeEventListener('change', handleChange)
    }, [setTheme])

    return null
}
