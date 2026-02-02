'use client'

import { motion } from 'framer-motion'
import { Link2, LayoutGrid, Music, MessageSquare } from 'lucide-react'
import UsesTile from './Tiles/UsesTile'
import GuestbookTile from './Tiles/GuestbookTile'
import SpotifyTile from './Tiles/SpotifyTile'

export default function BentoGrid() {
    return (
        <section className="relative w-full max-w-[1400px] mx-auto px-6 pt-0 pb-48 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[280px]">
                {/* Uses / Tech Stack Tile */}
                <UsesTile />

                {/* Guestbook Tile */}
                <GuestbookTile />

                {/* Spotify / Now Playing Tile */}
                <SpotifyTile />
            </div>
        </section>
    )
}
