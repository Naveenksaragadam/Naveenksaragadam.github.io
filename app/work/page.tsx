'use client'

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";

export default function Work() {
    return (
        <main className="relative w-full min-h-screen bg-white dark:bg-[#121212] pt-32">
            <Navbar />

            <div className="pt-20">
                <Projects />
            </div>
        </main>
    )
}
