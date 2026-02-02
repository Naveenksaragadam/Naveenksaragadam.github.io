'use client'

import NewHero from "../components/experience/NewHero"
import Timeline from "../components/experience/Timeline"
import Education from "../components/experience/Education"
import ContributionGraph from "../components/experience/ContributionGraph"
import BentoGrid from "../components/BentoGrid"
import SectionSeparator from "../components/SectionSeparator"
import Navbar from "../components/Navbar"

export default function ExperiencePage() {
    return (
        <main className="min-h-screen text-zinc-900 dark:text-white selection:bg-purple-500/30">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <NewHero />

            <SectionSeparator />

            <Timeline />

            <SectionSeparator />

            <Education />

            <SectionSeparator />

            <ContributionGraph />

            <SectionSeparator />

            <BentoGrid />

            {/* Bottom Spacing */}
            <div className="h-32" />
        </main>
    )
}
