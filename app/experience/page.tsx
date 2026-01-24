'use client'

import NewHero from "../components/experience/NewHero"
import Timeline from "../components/experience/Timeline"
import ContributionGraph from "../components/experience/ContributionGraph"
import BentoGrid from "../components/experience/BentoGrid"
import Navbar from "../components/Navbar"

export default function ExperiencePage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <NewHero />
            <Timeline />
            <ContributionGraph />
            <BentoGrid />

        </main>
    )
}
