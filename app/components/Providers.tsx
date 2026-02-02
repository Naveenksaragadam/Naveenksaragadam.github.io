'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'

interface GitHubStats {
    publicRepos: number
    totalContributions: number
    lastYearContributions: number
    currentStreak: number
    longestStreak: number
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
    stats: { publicRepos: 0, totalContributions: 0, lastYearContributions: 0, currentStreak: 0, longestStreak: 0 },
    contributions: [],
    loading: true,
    error: false,
})

export const useGitHub = () => useContext(GitHubContext)

const LoadingContext = createContext<{
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    loadingProgress: number
    setLoadingProgress: (value: number) => void
}>({
    isLoading: true,
    setIsLoading: () => { },
    loadingProgress: 0,
    setLoadingProgress: () => { },
})

export const useLoading = () => useContext(LoadingContext)

const ModalContext = createContext<{
    isContactModalOpen: boolean
    setIsContactModalOpen: (value: boolean) => void
}>({
    isContactModalOpen: false,
    setIsContactModalOpen: () => { },
})

export const useModal = () => useContext(ModalContext)


// Helper to calculate streaks
const calculateStreaks = (allDays: any[]) => {
    // Sort by date descending (newest first)
    const sortedDays = [...allDays].sort((a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let currentStreak = 0;
    let longestStreak = 0;

    // Calculate Current Streak
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const sortedAsc = [...sortedDays].reverse(); // Oldest to Newest

    let tempStreak = 0;
    sortedAsc.forEach(day => {
        if (day.contributionCount > 0) {
            tempStreak++;
        } else {
            if (tempStreak > longestStreak) longestStreak = tempStreak;
            tempStreak = 0;
        }
    });
    if (tempStreak > longestStreak) longestStreak = tempStreak;

    // Current Streak implementation
    let i = 0;
    while (i < sortedDays.length && new Date(sortedDays[i].date) > new Date()) {
        i++;
    }

    const latest = sortedDays[i];
    const secondLatest = sortedDays[i + 1];

    let activeIndex = -1;

    if (latest && latest.date === today && latest.contributionCount > 0) {
        activeIndex = i;
    } else if (latest && latest.date === today && latest.contributionCount === 0) {
        if (secondLatest && secondLatest.date === yesterday && secondLatest.contributionCount > 0) {
            activeIndex = i + 1;
        }
    } else if (latest && latest.date === yesterday && latest.contributionCount > 0) {
        activeIndex = i;
    }

    if (activeIndex !== -1) {
        for (let j = activeIndex; j < sortedDays.length; j++) {
            if (sortedDays[j].contributionCount > 0) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    return { currentStreak, longestStreak };
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState<GitHubStats>({
        publicRepos: 0,
        totalContributions: 0,
        lastYearContributions: 0,
        currentStreak: 0,
        longestStreak: 0
    })
    const [contributions, setContributions] = useState<ContributionDay[][]>([])
    const [ghLoading, setGhLoading] = useState(true)
    const [ghError, setGhError] = useState(false)
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    const username = 'Naveenksaragadam'

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('hasLoaded')
        if (hasLoaded) {
            setIsLoading(false)
        }

        const fetchGitHubData = async () => {
            setGhLoading(true)
            setGhError(false)

            try {
                // 1. Fetch User Profile
                const userResponse = await fetch(`https://api.github.com/users/${username}`)
                let startYear = 2018;
                let publicRepos = 0;

                if (userResponse.ok) {
                    const userData = await userResponse.json()
                    publicRepos = userData.public_repos || 0
                    if (userData.created_at) {
                        startYear = new Date(userData.created_at).getFullYear()
                    }
                }

                // 2. Parallel Fetch All Years
                const currentYear = new Date().getFullYear();
                const years = [];
                for (let y = startYear; y <= currentYear; y++) {
                    years.push(y);
                }

                const requests = years.map(year =>
                    fetch(`https://github-contributions-api.deno.dev/${username}.json?from=${year}-01-01&to=${year}-12-31`)
                        .then(res => res.ok ? res.json() : null)
                        .catch(err => null)
                );

                const results = await Promise.all(requests);

                // 3. Process All Data
                const allDays: any[] = [];
                let lifetimeTotal = 0;

                results.forEach(res => {
                    if (res && res.contributions) {
                        res.contributions.forEach((week: any[]) => {
                            week.forEach((day: any) => {
                                if (day.date) {
                                    allDays.push(day);
                                    lifetimeTotal += (day.contributionCount || 0);
                                }
                            })
                        })
                    }
                });

                const uniqueDaysMap = new Map();
                allDays.forEach(day => uniqueDaysMap.set(day.date, day));
                const uniqueDays = Array.from(uniqueDaysMap.values());

                // 4. Calculate Stats
                const { currentStreak, longestStreak } = calculateStreaks(uniqueDays);

                // 5. Strict 365 Days ending Today
                const today = new Date();
                const daysToGenerate = 365;
                const finalLastYearDays: any[] = [];

                for (let i = daysToGenerate - 1; i >= 0; i--) {
                    const d = new Date(today);
                    d.setDate(d.getDate() - i);
                    const dateStr = d.toISOString().split('T')[0];

                    const existingDay = uniqueDaysMap.get(dateStr);
                    if (existingDay) {
                        finalLastYearDays.push(existingDay);
                    } else {
                        finalLastYearDays.push({
                            date: dateStr,
                            contributionCount: 0,
                            contributionLevel: 'NONE'
                        });
                    }
                }

                const lastYearTotal = finalLastYearDays.reduce((acc, d) => acc + (d.contributionCount || 0), 0);

                const levelMap: Record<string, number> = {
                    'NONE': 0, 'FIRST_QUARTILE': 1, 'SECOND_QUARTILE': 2,
                    'THIRD_QUARTILE': 3, 'FOURTH_QUARTILE': 4
                }

                const weeks: ContributionDay[][] = [];
                let currentWeek: ContributionDay[] = [];

                finalLastYearDays.forEach((day: any) => {
                    const dateObj = new Date(day.date);
                    const level = levelMap[day.contributionLevel] ?? 0;

                    if (currentWeek.length === 0 || dateObj.getDay() !== 0) {
                        currentWeek.push({
                            date: day.date,
                            count: day.contributionCount || 0,
                            level
                        });
                    } else {
                        weeks.push(currentWeek);
                        currentWeek = [{
                            date: day.date,
                            count: day.contributionCount || 0,
                            level
                        }];
                    }
                });
                if (currentWeek.length > 0) weeks.push(currentWeek);

                setContributions(weeks);
                setStats({
                    publicRepos,
                    totalContributions: lifetimeTotal,
                    lastYearContributions: lastYearTotal,
                    currentStreak,
                    longestStreak
                });

            } catch (err) {
                console.error('Error fetching GitHub data:', err)
                setGhError(true)
            } finally {
                setGhLoading(false)
            }
        }

        fetchGitHubData()
    }, [])

    const [loadingProgress, setLoadingProgress] = useState(0)

    const handleSetIsLoading = (value: boolean) => {
        setIsLoading(value)
        if (!value) {
            sessionStorage.setItem('hasLoaded', 'true')
        }
    }

    return (
        <LoadingContext.Provider value={{
            isLoading,
            setIsLoading: handleSetIsLoading,
            loadingProgress,
            setLoadingProgress
        }}>
            <GitHubContext.Provider value={{ stats, contributions, loading: ghLoading, error: ghError }}>
                <ModalContext.Provider value={{ isContactModalOpen, setIsContactModalOpen }}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        storageKey="theme-preference-v1"
                    >
                        <SystemThemeSync />
                        {children}
                    </ThemeProvider>
                </ModalContext.Provider>
            </GitHubContext.Provider>
        </LoadingContext.Provider>
    )
}

function SystemThemeSync() {
    const { setTheme } = useTheme()

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e: MediaQueryListEvent) => {
            try {
                localStorage.removeItem('theme-preference-v1')
            } catch (err) { }
            setTheme('system')
        }

        media.addEventListener('change', handleChange)
        return () => media.removeEventListener('change', handleChange)
    }, [setTheme])

    return null
}
