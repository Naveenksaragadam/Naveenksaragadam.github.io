import { NextRequest, NextResponse } from 'next/server';
import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';

export const runtime = 'edge';
export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        // 1. Try to get "Currently Playing"
        const nowPlayingResponse = await getNowPlaying();

        // If playing
        if (nowPlayingResponse.status === 200) {
            const song = await nowPlayingResponse.json();

            // Check if actually playing valid song content
            if (song.item) {
                const isPlaying = song.is_playing;
                const title = song.item.name;
                const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
                const album = song.item.album.name;
                const albumImageUrl = song.item.album.images[0].url;
                const songUrl = song.item.external_urls.spotify;

                return NextResponse.json({
                    isPlaying,
                    title,
                    artist,
                    album,
                    albumImageUrl,
                    songUrl,
                });
            }
        }

        // 2. If nothing playing, fall back to "Recently Played"
        const recentResponse = await getRecentlyPlayed();
        if (recentResponse.status === 200) {
            const data = await recentResponse.json();
            if (data.items && data.items.length > 0) {
                const item = data.items[0].track;

                return NextResponse.json({
                    isPlaying: false,
                    title: item.name,
                    artist: item.artists.map((_artist: any) => _artist.name).join(', '),
                    album: item.album.name,
                    albumImageUrl: item.album.images[0].url,
                    songUrl: item.external_urls.spotify,
                });
            }
        }

        // 3. Fallback if everything fails
        return NextResponse.json({ isPlaying: false });

    } catch (error) {
        console.error("Spotify API Error:", error);
        return NextResponse.json({ isPlaying: false, error: "Failed to fetch Spotify status" }, { status: 500 });
    }
}
