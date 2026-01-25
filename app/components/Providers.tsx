'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'

interface GitHubStats {
    publicRepos: number
    stars: number
    forks: number
    totalContributions: number
}

interface ContributionDay {
    date: string
    count: number
    level: number
}

interface GitHubContextType {
    stats: GitHubStats
    contributions: ContributionDay[][]
    loading: boolean
    error: boolean
}

const GitHubContext = createContext<GitHubContextType>({
    stats: { publicRepos: 0, stars: 0, forks: 0, totalContributions: 0 },
    contributions: [],
    loading: true,
    error: false,
})

export const useGitHub = () => useContext(GitHubContext)

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
    const [stats, setStats] = useState<GitHubStats>({
        publicRepos: 0,
        stars: 0,
        forks: 0,
        totalContributions: 0
    })
    const [contributions, setContributions] = useState<ContributionDay[][]>([])
    const [ghLoading, setGhLoading] = useState(true)
    const [ghError, setGhError] = useState(false)

    const username = 'Naveenksaragadam'

    useEffect(() => {
        // Check if we've already loaded in this session
        const hasLoaded = sessionStorage.getItem('hasLoaded')
        if (hasLoaded) {
            setIsLoading(false)
        }

        // Fetch GitHub Data
        const fetchGitHubData = async () => {
            setGhLoading(true)
            setGhError(false)

            try {
                // Fetch User Basic Stats
                const userResponse = await fetch(`https://api.github.com/users/${username}`)
                if (userResponse.ok) {
                    const userData = await userResponse.json()
                    setStats(prev => ({
                        ...prev,
                        publicRepos: userData.public_repos || 0
                    }))
                }

                // Fetch Repos for Stars and Forks
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
                if (reposResponse.ok) {
                    const reposData = await reposResponse.json()
                    if (Array.isArray(reposData)) {
                        const totalStars = reposData.reduce((acc, repo: any) => acc + (repo.stargazers_count || 0), 0)
                        const totalForks = reposData.reduce((acc, repo: any) => acc + (repo.forks_count || 0), 0)
                        setStats(prev => ({ ...prev, stars: totalStars, forks: totalForks }))
                    }
                }

                // Fetch Contributions
                const contribResponse = await fetch(`https://github-contributions-api.deno.dev/${username}.json`)
                if (contribResponse.ok) {
                    const contribData = await contribResponse.json()
                    if (contribData && Array.isArray(contribData.contributions)) {
                        const levelMap: Record<string, number> = {
                            'NONE': 0,
                            'FIRST_QUARTILE': 1,
                            'SECOND_QUARTILE': 2,
                            'THIRD_QUARTILE': 3,
                            'FOURTH_QUARTILE': 4
                        }

                        let totalYearlyContribs = 0
                        const processedWeeks = contribData.contributions.map((week: any[]) =>
                            week.map((day: any) => {
                                totalYearlyContribs += (day.contributionCount || 0)
                                return {
                                    date: day.date,
                                    count: day.contributionCount || 0,
                                    level: levelMap[day.contributionLevel] || 0
                                }
                            })
                        )

                        setContributions(processedWeeks.slice(-52))
                        setStats(prev => ({ ...prev, totalContributions: totalYearlyContribs }))
                    } else {
                        throw new Error('Invalid contributions data format')
                    }
                } else {
                    throw new Error('Failed to fetch contributions')
                }
            } catch (err) {
                console.error('Error fetching GitHub data:', err)
                // Only set error true if contributions fetch fails fundamentally
                setGhError(true)
            } finally {
                setGhLoading(false)
            }
        }

        fetchGitHubData()
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
            <GitHubContext.Provider value={{ stats, contributions, loading: ghLoading, error: ghError }}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    storageKey="theme-preference-v1"
                >
                    <SystemThemeSync />
                    {children}
                </ThemeProvider>
            </GitHubContext.Provider>
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
