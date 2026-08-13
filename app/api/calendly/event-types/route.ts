import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const token = process.env.CALENDLY_API_TOKEN;
    const { searchParams } = new URL(request.url);
    const userUri = searchParams.get('userUri');

    if (!token) {
        return NextResponse.json({ error: 'Missing CALENDLY_API_TOKEN' }, { status: 500 });
    }

    if (!userUri) {
        return NextResponse.json({ error: 'Missing userUri param' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.calendly.com/event_types?user=${encodeURIComponent(userUri)}&active=true`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Calendly API error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Calendly event types:', error);
        return NextResponse.json({ error: 'Failed to fetch event types' }, { status: 500 });
    }
}
