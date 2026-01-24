'use client'

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TechStack from "../components/TechStack";
import TypingHero from "../components/TypingHero";

export default function About() {
    return (
        <main className="relative w-full min-h-screen bg-white dark:bg-[#121212] flex flex-col pt-32">
            <Navbar />

            <div className="flex-grow max-w-7xl mx-auto px-4 md:px-12 w-full">
                {/* Hero Section */}
                <section className="py-20 md:py-32">
                    <TypingHero />
                </section>

                {/* Tech Stack Marquee */}
                <section className="pb-32">
                    <TechStack />
                </section>

                {/* Additional Content / Bio */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-32">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">About Me</h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>
                                Hi, my name is Naveen and I am currently pursuing a degree in Computer Science.
                                As a passionate individual, I strongly believe in the power of authenticity and
                                strive to maintain a true reflection of myself in all my professional endeavors.
                            </p>
                            <p>
                                I have acquired a wealth of technical knowledge and skills through my education
                                and practical experience. My expertise includes proficiency in programming
                                languages such as Python, JavaScript, and SQL.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
