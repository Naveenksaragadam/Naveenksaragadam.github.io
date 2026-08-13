import { NextRequest, NextResponse } from 'next/server'

const USERNAME = 'Naveenksaragadam'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const headers = new Headers({
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Naveenksaragadam-Portfolio',
        ...options.headers,
    })
    if (GITHUB_TOKEN) {
        headers.set('Authorization', `Bearer ${GITHUB_TOKEN}`)
    }
    return fetch(url, { ...options, headers, next: { revalidate: 3600 } })
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')

    try {
        if (action === 'user') {
            const response = await fetchWithAuth(`https://api.github.com/users/${USERNAME}`)
            if (!response.ok) throw new Error('Failed to fetch user')
            const data = await response.json()
            return NextResponse.json({
                public_repos: data.public_repos || 0,
                created_at: data.created_at,
            })
        }

        if (action === 'contributions') {
            const from = searchParams.get('from')
            const to = searchParams.get('to')

            // Use GitHub GraphQL API (requires token for higher rate limits)
            return await fetchGraphQLContributions(from, to)
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    } catch (error) {
        console.error('GitHub API error:', error)
        return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
    }
}

async function fetchGraphQLContributions(from?: string | null, to?: string | null) {
    // Use REST API if no token (lower rate limit but works)
    if (!GITHUB_TOKEN) {
        return await fetchRESTContributions(from, to)
    }

    const query = `
        query($username: String!, $from: DateTime, $to: DateTime) {
            user(login: $username) {
                createdAt
                contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                contributionLevel
                            }
                        }
                    }
                }
            }
        }
    `

    const variables: { username: string; from?: string; to?: string } = { username: USERNAME }
    // GitHub's GraphQL API expects DateTime values, not date-only strings.
    if (from) variables.from = `${from}T00:00:00Z`
    if (to) variables.to = `${to}T23:59:59Z`

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Naveenksaragadam-Portfolio',
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 },
    })

    if (!response.ok) {
        // Fallback to REST API
        return await fetchRESTContributions(from, to)
    }

    const result = await response.json()
    if (result.errors) {
        // Fallback to REST API
        return await fetchRESTContributions(from, to)
    }

    const levelMap: Record<string, number> = {
        NONE: 0,
        FIRST_QUARTILE: 1,
        SECOND_QUARTILE: 2,
        THIRD_QUARTILE: 3,
        FOURTH_QUARTILE: 4,
    }

    const weeks = result.data.user.contributionsCollection.contributionCalendar.weeks.map((week: any) =>
        week.contributionDays.map((day: any) => ({
            date: day.date,
            // Keep this response aligned with the client-side contribution model.
            contributionCount: day.contributionCount,
            contributionLevel: day.contributionLevel,
            count: day.contributionCount,
            level: levelMap[day.contributionLevel] ?? 0,
        }))
    )

    const lifetimeTotal = await fetchLifetimeContributionTotal(
        new Date(result.data.user.createdAt).getUTCFullYear()
    )

    return NextResponse.json({
        contributions: weeks,
        lifetimeTotal,
    })
}

async function fetchLifetimeContributionTotal(startYear: number) {
    const currentYear = new Date().getUTCFullYear()
    const years = Array.from(
        { length: Math.max(0, currentYear - startYear + 1) },
        (_, index) => startYear + index
    )

    if (years.length === 0) return null

    // A contribution calendar is range-based. Its undocumented-looking default
    // range is roughly one year, so a no-date query is not a lifetime total.
    // Querying each calendar year gives the actual all-time count in one request.
    const yearlyFields = years.map(year => `
        year${year}: contributionsCollection(
            from: "${year}-01-01T00:00:00Z"
            to: "${year}-12-31T23:59:59Z"
        ) {
            contributionCalendar { totalContributions }
        }
    `).join('\n')

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Naveenksaragadam-Portfolio',
        },
        body: JSON.stringify({
            query: `query($username: String!) { user(login: $username) { ${yearlyFields} } }`,
            variables: { username: USERNAME },
        }),
        next: { revalidate: 3600 },
    })

    if (!response.ok) return null

    const result = await response.json()
    if (result.errors || !result.data?.user) return null

    return years.reduce(
        (total, year) => total + (result.data.user[`year${year}`]?.contributionCalendar?.totalContributions ?? 0),
        0
    )
}

async function fetchRESTContributions(from?: string | null, to?: string | null) {
    // Fetch user events to get contribution data
    // Note: REST API doesn't have a direct contributions calendar endpoint
    // We'll use the events API as a fallback
    const response = await fetchWithAuth(`https://api.github.com/users/${USERNAME}/events/public?per_page=100`)

    if (!response.ok) {
        throw new Error('Failed to fetch events')
    }

    const events = await response.json()

    // Build contribution days from events
    const contributionsMap = new Map<string, { count: number; level: string }>()

    events.forEach((event: any) => {
        if (event.created_at) {
            const date = event.created_at.split('T')[0]
            if (from && date < from) return
            if (to && date > to) return

            const existing = contributionsMap.get(date) || { count: 0, level: 'NONE' }
            existing.count += 1
            contributionsMap.set(date, existing)
        }
    })

    // Convert to weeks format
    const weeks: any[][] = []
    let currentWeek: any[] = []

    const today = new Date()
    const startDate = from ? new Date(from) : new Date(today)
    startDate.setDate(startDate.getDate() - 365)

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0]
        const dayData = contributionsMap.get(dateStr) || { count: 0, level: 'NONE' }

        // Estimate level based on count
        let level = 0
        if (dayData.count > 0) level = 1
        if (dayData.count > 3) level = 2
        if (dayData.count > 6) level = 3
        if (dayData.count > 10) level = 4

        if (currentWeek.length === 0 || d.getDay() !== 0) {
            currentWeek.push({
                date: dateStr,
                contributionCount: dayData.count,
                contributionLevel: ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'][level],
                count: dayData.count,
                level,
            })
        } else {
            weeks.push(currentWeek)
            currentWeek = [{
                date: dateStr,
                contributionCount: dayData.count,
                contributionLevel: ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'][level],
                count: dayData.count,
                level,
            }]
        }
    }
    if (currentWeek.length > 0) weeks.push(currentWeek)

    return NextResponse.json({ contributions: weeks, lifetimeTotal: null })
}
