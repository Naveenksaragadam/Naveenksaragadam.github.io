'use client'

import Footer from "../components/Footer";
import Projects from "../components/Projects";

export default function Work() {
    return (
        <main className="relative w-full min-h-screen pt-32 selection:bg-purple-500/30">

            <div className="pt-20">
                <Projects />
            </div>
        </main>
    )
}
