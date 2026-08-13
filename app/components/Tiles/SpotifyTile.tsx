'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Spotify Response Type
type SpotifyData = {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
    error?: string;
}

export default function SpotifyTile() {
    // Fallback/Mock Data (Displayed when API is unavailable)
    const FALLBACK_DATA: SpotifyData = {
        isPlaying: false, // Let's set it to true for the vibe
        title: "Guns and Roses",
        artist: "Thaman S, Harsha Darivemula",
        album: "They Call Him OG",
        // Using local high-quality movie poster
        albumImageUrl: "/images/og-soundtrack.jpg",
        songUrl: "https://open.spotify.com/track/1mHEvHzpRwCLeAnecvE6eS"
    }

    const [data, setData] = useState<SpotifyData>(FALLBACK_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/spotify');
                const json = await res.json();
                if (!json.error && json.title) {
                    setData(json);
                }
            } catch (e) {
                console.error("Failed to fetch spotify data (using fallback)", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    // Loading State: Render the Tile with fallback data but pulse slightly? 
    // Actually, just rendering the fallback immediately is better UX than a skeleton if we expect it to fail 90% of the time for new users.
    // Let's just render.

    // If data is somehow null (shouldn't be), return null
    if (!data) return null;


    return (
        <a
            href={data?.songUrl || "https://open.spotify.com/user/naveen"}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative flex flex-col p-6 rounded-[2rem] bg-zinc-950 border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden h-full min-h-[240px]"
            >
                {/* Dynamic Background Layout */}
                {data.albumImageUrl && (
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <img
                            src={data.albumImageUrl}
                            alt=""
                            className="w-full h-full object-cover blur-2xl scale-125 opacity-50 saturate-150"
                        />
                        {/* Dark Gradient Overlay - lighter on hover */}
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />

                        {/* Noise Texture Overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-2 mb-2 relative z-20">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                        alt="Spotify"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-zinc-200">
                        {data.isPlaying ? "Now Playing" : "Last Played"}
                    </span>
                    {data.isPlaying && (
                        <span className="relative flex h-2 w-2 ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    )}
                </div>

                {/* Text Content */}
                <div className="relative z-20 w-full mb-auto">
                    <p className="text-zinc-400 text-sm leading-relaxed truncate-2-lines">
                        {data.isPlaying ? "Listening to " : "Last Played "}
                        <span className="text-zinc-100 font-medium">{data.title}</span> by <span className="text-zinc-100 font-medium">{data.artist}</span>
                    </p>
                </div>

                {/* Visual: Album Art + Vinyl */}
                {/* Container centered at the bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex items-end justify-center z-10 pb-0">

                    <div className="relative flex items-end justify-center">
                        {/* Vinyl Record (Inside/Behind) - Moves UP "out of pack" on hover */}
                        {/* Vinyl Record (Inside/Behind) - Moves UP "out of pack" on hover */}
                        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) z-10
                            {/* Wrapper handles simple up/down movement */}
                            group-hover:-translate-y-6
                        `}>
                            {/* Rotating Vinyl Disc */}
                            <div
                                className={`w-[154px] h-[154px] rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden
                                    ${data.isPlaying ? 'animate-spin-slow' : 'group-hover:animate-[spin_4s_linear_infinite]'}
                                `}
                                style={{
                                    background: 'conic-gradient(from 0deg, #27272a, #18181b, #27272a, #18181b, #27272a)',
                                }}
                            >
                                {/* Textured Grooves */}
                                <div className="absolute inset-0 rounded-full border-[12px] border-[#18181b]" />
                                <div className="absolute inset-0 rounded-full border border-white/5 opacity-10 scale-95" />
                                <div className="absolute inset-0 rounded-full border border-white/5 opacity-10 scale-[0.85]" />
                                <div className="absolute inset-0 rounded-full border border-white/5 opacity-10 scale-[0.75]" />
                                <div className="absolute inset-0 rounded-full border border-white/5 opacity-10 scale-[0.65]" />
                                <div className="absolute inset-0 rounded-full border border-white/5 opacity-10 scale-[0.55]" />

                                {/* Inner Label Area */}
                                <div className="w-14 h-14 rounded-full relative z-10 flex items-center justify-center bg-zinc-800 border-[3px] border-[#18181b] ring-1 ring-white/10">
                                    {/* Album Art on Label */}
                                    <img
                                        src={data.albumImageUrl}
                                        alt="vinyl-label"
                                        className="w-full h-full object-cover rounded-full opacity-90"
                                    />
                                    {/* Spindle Hole - The "Donut" center */}
                                    <div className="absolute w-3 h-3 bg-[#18181b] rounded-full z-20 shadow-inner border border-white/20" />
                                </div>
                            </div>
                        </div>

                        {/* Rectangular Album Art Cover (The "Pack") */}
                        <motion.div
                            className="relative w-48 h-28 rounded-t-xl shadow-2xl overflow-hidden border-t border-x border-white/10 z-20 bg-zinc-800 group-hover:translate-y-9 transition-transform duration-500"
                            whileHover={{ scale: 1.02 }}
                        >
                            {data.albumImageUrl && (
                                <img
                                    src={data.albumImageUrl}
                                    alt={data.album}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            {/* Texture overlay for "Sleeve" feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        </motion.div>
                    </div>
                </div>

                {/* Radial Gradient Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-[#1ed760]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
        </a>
    )
}
