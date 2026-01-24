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

    useEffect(() => {
        // Check if we've already loaded in this session
        const hasLoaded = sessionStorage.getItem('hasLoaded')
        if (hasLoaded) {
            setIsLoading(false)
        }
    }, [])

    const handleSetIsLoading = (value: boolean) => {
        setIsLoading(value)
        if (!value) {
            // Unlocking: Mark session as loaded
            sessionStorage.setItem('hasLoaded', 'true')
        }
    }

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading: handleSetIsLoading }}>
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
