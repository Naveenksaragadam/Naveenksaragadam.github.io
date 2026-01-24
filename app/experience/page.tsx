'use client'

import ExperienceHero from "../components/experience/ExperienceHero"
import Timeline from "../components/experience/Timeline"
import ContributionGraph from "../components/experience/ContributionGraph"
import BentoGrid from "../components/experience/BentoGrid"
import FloatingDock from "../components/FloatingDock"
import Navbar from "../components/Navbar"

export default function ExperiencePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <ExperienceHero />
            <Timeline />
            <ContributionGraph />
            <BentoGrid />

            {/* Persistent Dock */}
            <FloatingDock />
        </main>
    )
}
