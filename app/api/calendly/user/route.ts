import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.CALENDLY_API_TOKEN;

    if (!token) {
        console.error('[API] Missing CALENDLY_API_TOKEN');
        return NextResponse.json({ error: 'Missing CALENDLY_API_TOKEN' }, { status: 500 });
    }

    try {
        console.log(`[API] Fetching Calendly User. Token present: ${!!token}, ending in ...${token.slice(-4)}`);
        const response = await fetch('https://api.calendly.com/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(`[API] Calendly User Response Status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`Calendly API error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Calendly user:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
