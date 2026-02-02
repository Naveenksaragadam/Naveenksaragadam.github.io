'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Calendar,
    MessageSquare,
    CheckSquare,
    Clock,
    Globe,
    ChevronLeft,
    ChevronRight,
    Video
} from 'lucide-react'

// Custom icons to match the design import
const GoogleMeetIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#fff" fillOpacity="0.0" />
        <path d="M7 10.5V13.5L10 13.5V10.5H7ZM10.5 16.5V11.25L14 13.5L10.5 15.75V16.5ZM17 12V7L12 10.5V13.5L17 12Z" fill="#00832D" />
        <path d="M22 14.5V9.5C22 8.39543 21.1046 7.5 20 7.5H16L12 12L16 16.5H20C21.1046 16.5 22 15.6046 22 14.5Z" fill="#00832D" />
        <path d="M12 12L16 7.5H4C2.89543 7.5 2 8.39543 2 9.5V14.5C2 15.6046 2.89543 16.5 4 16.5H16L12 12Z" fill="#0066DA" />
        <path d="M16 16.5V7.5L22 12L16 16.5Z" fill="#E04F5F" />
        <path d="M16 16.5H4C2.89543 16.5 2 15.6046 2 14.5V9.5C2 8.39543 2.89543 7.5 4 7.5H16" fill="#FFBA00" />
    </svg>
)

export default function BookingWidget() {
    const [selectedDate, setSelectedDate] = useState<number>(5)

    // Calendar Data configuration to match the screenshot
    const availableDays = [6, 7, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28]

    return (
        <div className="w-full max-w-5xl bg-[#111111] border border-white/5 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden min-h-[580px] font-sans text-white">

            {/* --- LEFT SIDEBAR --- */}
            <div className="w-full lg:w-[280px] p-8 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col bg-[#111111]">
                <div className="mb-8">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden mb-4 ring-2 ring-white/5">
                        <img
                            alt="Profile"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnoRFVOFltZv7VORrCAXP0JHKpQTgKmQgTGVUVXxp6iCmTtY86dC-hKSoB983telyRfmFjDtMsGyb6t5kwG9sFoVoNZ6AVft8H9ZYyvX_b7W03hIw4EQvMVmcHhLYZphGi5MM-_U8yayZG2_MxoT6uvGzP5HuEk2OCKXR3BC5H_q9PjINcfHAMr8UwUDXHl6cyIJXawORAsYVb9TGFHK2iqhBishGy6Oikqvn-2uDr0MkIkJ3P8L4S2zBwRfiSpH5ZAlpMIWit6udF"
                        />
                    </div>
                    <p className="text-sm text-zinc-400 font-medium mb-1">Aayush Bharti</p>
                    <h1 className="text-xl font-bold text-white mb-6">30 Min Meeting</h1>
                </div>

                <div className="space-y-5 text-sm font-medium text-zinc-300">
                    <div className="flex items-center gap-3.5">
                        <span className="p-1 rounded bg-zinc-800/50 border border-white/10">
                            <CheckSquare className="w-3.5 h-3.5 text-zinc-400" />
                        </span>
                        <span className="text-zinc-400">Requires confirmation</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                        <span className="p-1 rounded bg-zinc-800/50 border border-white/10">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        </span>
                        <span className="text-zinc-400">30m</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                        <span className="p-1 rounded bg-transparent">
                            <GoogleMeetIcon />
                        </span>
                        <span className="text-zinc-400">Google Meet</span>
                    </div>
                    <div className="flex items-center gap-3.5 mt-auto pt-6">
                        <span className="p-1 rounded bg-zinc-800/50 border border-white/10">
                            <Globe className="w-3.5 h-3.5 text-zinc-400" />
                        </span>
                        <button className="hover:text-white text-zinc-400 flex items-center gap-1 transition-colors">
                            America/New York
                            <span className="text-[10px] opacity-50">▼</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- CALENDAR SECTION --- */}
            <div className="flex-1 p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5 bg-[#111111]">
                <div className="flex justify-between items-center mb-6 pl-2">
                    <h2 className="text-xl font-normal text-white">February <span className="text-zinc-500">2026</span></h2>
                    <div className="flex gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-zinc-500 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-zinc-500 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 mb-4">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="text-center text-[11px] tracking-wider font-semibold text-zinc-500">{day}</div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 grid-rows-6 gap-2 flex-grow h-full content-start">
                    {/* Previous/Next padding logic omitted for simplicity, manual map based on screenshot */}

                    {/* Row 1 */}
                    {['', '', '', '', '', '', 1].map((d, i) => (
                        <div key={i} className="h-12 w-full flex items-center justify-center text-sm text-zinc-600 font-medium">{d}</div>
                    ))}

                    {/* Row 2 */}
                    {/* Day 2 (Current) */}
                    <div className="h-12 w-full flex flex-col items-center justify-center text-sm relative group cursor-pointer">
                        <span className="text-white font-medium">2</span>
                        <span className="w-1 h-1 bg-white rounded-full mt-1"></span>
                    </div>

                    <div className="h-12 w-full flex items-center justify-center text-sm text-zinc-600 font-medium">3</div>
                    <div className="h-12 w-full flex items-center justify-center text-sm text-zinc-600 font-medium">4</div>

                    {/* Day 5 (Selected) */}
                    <button className="h-12 w-full rounded-lg bg-white text-black font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] transform scale-105 transition-all">
                        5
                    </button>

                    {/* Day 6-7 (Available) */}
                    {[6, 7].map(day => (
                        <button key={day} className="h-12 w-full rounded-lg bg-[#27272A] hover:bg-[#3f3f46] hover:ring-1 hover:ring-white/20 text-zinc-300 hover:text-white font-medium flex items-center justify-center text-sm transition-all duration-200">
                            {day}
                        </button>
                    ))}

                    {/* Row 3 - Row 5 (Mostly available) */}
                    {[
                        { d: 8, a: false }, { d: 9, a: true }, { d: 10, a: true }, { d: 11, a: true }, { d: 12, a: true }, { d: 13, a: true }, { d: 14, a: true },
                        { d: 15, a: false }, { d: 16, a: true }, { d: 17, a: true }, { d: 18, a: true }, { d: 19, a: true }, { d: 20, a: true }, { d: 21, a: true },
                        { d: 22, a: false }, { d: 23, a: true }, { d: 24, a: true }, { d: 25, a: true }, { d: 26, a: true }, { d: 27, a: true }, { d: 28, a: true },
                    ].map((item, i) => (
                        item.a ? (
                            <button key={i} className="h-12 w-full rounded-lg bg-[#27272A] hover:bg-[#3f3f46] hover:ring-1 hover:ring-white/20 text-zinc-300 hover:text-white font-medium flex items-center justify-center text-sm transition-all duration-200">
                                {item.d}
                            </button>
                        ) : (
                            <div key={i} className="h-12 w-full flex items-center justify-center text-sm text-zinc-600 font-medium">{item.d}</div>
                        )
                    ))}
                </div>
            </div>

            {/* --- TIME SLOTS --- */}
            <div className="w-full lg:w-[300px] p-6 flex flex-col h-[600px] lg:h-auto bg-[#111111]">
                <div className="flex justify-between items-center mb-8 pt-2">
                    <h2 className="text-base font-normal text-white">Thu <span className="text-zinc-500">05</span></h2>

                    {/* Toggle */}
                    <div className="bg-[#1A1A1A] p-1 rounded-lg flex text-[10px] font-medium border border-white/5">
                        <button className="px-3 py-1 bg-[#27272A] rounded text-white shadow-sm transition-colors">12h</button>
                        <button className="px-3 py-1 text-zinc-500 hover:text-zinc-300 transition-colors">24h</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {[
                        '12:30am', '1:00am', '1:30am', '2:00am', '2:30am',
                        '3:00am', '3:30am', '4:00am', '4:30am', '5:00am'
                    ].map(time => (
                        <button key={time} className="w-full py-3.5 rounded-xl border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200 text-sm font-medium group relative overflow-hidden">
                            <span className="relative z-10">{time}</span>
                            {/* Subtle shine effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine" />
                        </button>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #333;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #444;
                }
            `}</style>
        </div>
    )
}
