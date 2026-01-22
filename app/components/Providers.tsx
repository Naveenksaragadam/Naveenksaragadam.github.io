'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'

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
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="portfolio-theme">
                {children}
            </ThemeProvider>
        </LoadingContext.Provider>
    )
}
