import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const token = process.env.CALENDLY_API_TOKEN;
    const { searchParams } = new URL(request.url);
    const userUri = searchParams.get('userUri');
    const eventTypeUri = searchParams.get('eventTypeUri');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');

    if (!token) {
        return NextResponse.json({ error: 'Missing CALENDLY_API_TOKEN' }, { status: 500 });
    }

    if (!userUri || !eventTypeUri || !startTime || !endTime) {
        return NextResponse.json({ error: 'Missing required params' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://api.calendly.com/event_type_available_times?user=${encodeURIComponent(userUri)}&event_type=${encodeURIComponent(eventTypeUri)}&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log(`[API] Calendly Availability Response Status: ${response.status}`);

        if (!response.ok) {
            // Log full error for debugging
            const errorBody = await response.text();
            console.error('Calendly API Error Body:', errorBody);
            throw new Error(`Calendly API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[API] Slots Found: ${data.collection?.length || 0}`);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Calendly availability:', error);
        return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
    }
}
