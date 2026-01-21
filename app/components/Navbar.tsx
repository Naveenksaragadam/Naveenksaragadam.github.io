'use client'

import React from 'react' // Added React import
import { motion } from 'framer-motion'
import Link from 'next/link'

const navItems = [
    { name: 'Home', href: '#home', id: 'home' }, // Added id
    { name: 'Work', href: '#work', id: 'work' }, // Added id
    // { name: 'About', href: '#about' }, // Overlay text essentially covers About
    { name: 'Contact', href: '#contact', id: 'contact' }, // Added id
]

export default function Navbar() {
    const [activeTab, setActiveTab] = React.useState('home') // Added state

    React.useEffect(() => { // Added useEffect
        const handleScroll = () => {
            // Simple offset-based detection
            const workSection = document.getElementById('work')
            const contactSection = document.getElementById('contact')

            const scrollPosition = window.scrollY + window.innerHeight / 2

            if (contactSection && scrollPosition >= contactSection.offsetTop) {
                setActiveTab('contact')
            } else if (workSection && scrollPosition >= workSection.offsetTop) {
                setActiveTab('work')
            } else {
                setActiveTab('home')
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-6 left-0 right-0 z-40 flex justify-center"
        >
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 px-2 py-2 rounded-full shadow-lg">
                {navItems.map((item) => ( // Removed index from map
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveTab(item.id)} // Added onClick
                        className={`
                relative px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${activeTab === item.id ? 'text-white' : 'text-gray-400 hover:text-white'}
              `}
                    >
                        {activeTab === item.id && ( // Changed condition
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-white/10 rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{item.name}</span>
                    </Link>
                ))}
            </div>
        </motion.nav>
    )
}
