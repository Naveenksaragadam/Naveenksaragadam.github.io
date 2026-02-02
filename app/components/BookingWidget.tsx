'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Calendar,
    MessageSquare,
    CheckSquare,
    Clock,
    Globe,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Twitter,
    Github,
    Linkedin
} from 'lucide-react'

// Custom icons to match the design (e.g. Google Meet logo)
const GoogleMeetIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 14.5V9.5C22 8.39543 21.1046 7.5 20 7.5H16L12 12L16 16.5H20C21.1046 16.5 22 15.6046 22 14.5Z" fill="#00832D"></path>
        <path d="M12 12L16 7.5H4C2.89543 7.5 2 8.39543 2 9.5V14.5C2 15.6046 2.89543 16.5 4 16.5H16L12 12Z" fill="#0066DA"></path>
        <path d="M16 16.5V7.5L22 12L16 16.5Z" fill="#E04F5F"></path>
        <path d="M16 16.5H4C2.89543 16.5 2 15.6046 2 14.5V9.5C2 8.39543 2.89543 7.5 4 7.5H16" fill="#FFBA00"></path>
    </svg>
)

export default function BookingWidget() {
    return (
        <div className="w-full max-w-5xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2E2E2E] rounded-xl shadow-xl flex flex-col lg:flex-row overflow-hidden min-h-[600px]">
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-[#2E2E2E] flex flex-col">
                <div className="mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-gray-100 dark:border-[#1E1E1E]">
                        <img
                            alt="Profile"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnoRFVOFltZv7VORrCAXP0JHKpQTgKmQgTGVUVXxp6iCmTtY86dC-hKSoB983telyRfmFjDtMsGyb6t5kwG9sFoVoNZ6AVft8H9ZYyvX_b7W03hIw4EQvMVmcHhLYZphGi5MM-_U8yayZG2_MxoT6uvGzP5HuEk2OCKXR3BC5H_q9PjINcfHAMr8UwUDXHl6cyIJXawORAsYVb9TGFHK2iqhBishGy6Oikqvn-2uDr0MkIkJ3P8L4S2zBwRfiSpH5ZAlpMIWit6udF"
                        />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-[#A1A1AA] font-medium mb-1">Aayush Bharti</p>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">30 Min Meeting</h1>
                </div>

                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-3">
                        <CheckSquare className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span>Requires confirmation</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span>30m</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-[18px] h-[18px] flex items-center justify-center">
                            <GoogleMeetIcon />
                        </div>
                        <span>Google Meet</span>
                    </div>
                    <div className="flex items-center gap-3 mt-8 pt-4">
                        <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <button className="hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                            America/New York
                            <span className="text-[10px]">▼</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Section */}
            <div className="w-full lg:w-1/3 p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-[#2E2E2E]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium dark:text-white">February <span className="text-gray-400 dark:text-[#A1A1AA] font-normal">2026</span></h2>
                    <div className="flex gap-1">
                        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E1E1E] text-gray-400 dark:text-gray-500 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E1E1E] text-gray-400 dark:text-gray-500 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-xs mb-2">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="text-gray-400 dark:text-gray-500 font-medium">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2 text-center flex-grow content-start">
                    {/* Previous Month Placeholder */}
                    <div className="h-10 w-full flex items-center justify-center text-sm text-gray-300 dark:text-gray-600">1</div>

                    {/* Current Day with Dot */}
                    <div className="h-10 w-full flex flex-col items-center justify-center text-sm relative">
                        <span className="text-gray-300 dark:text-gray-600">2</span>
                        <span className="w-1 h-1 bg-white rounded-full mt-0.5"></span>
                    </div>

                    <div className="h-10 w-full flex items-center justify-center text-sm text-gray-300 dark:text-gray-600">3</div>
                    <div className="h-10 w-full flex items-center justify-center text-sm text-gray-300 dark:text-gray-600">4</div>

                    {/* Selected Day */}
                    <div className="h-10 w-full rounded bg-white text-black font-semibold flex items-center justify-center text-sm shadow-md cursor-pointer">5</div>

                    {/* Available Days */}
                    {[6, 7, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28].map(day => (
                        <div key={day} className="h-10 w-full rounded bg-gray-100 dark:bg-[#1E1E1E] hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-sm cursor-pointer transition-colors">
                            {day}
                        </div>
                    ))}

                    {/* Disabled/Other Days */}
                    {[8, 15, 22].map(day => (
                        <div key={day} className="h-10 w-full flex items-center justify-center text-sm text-gray-300 dark:text-gray-600">{day}</div>
                    ))}
                </div>
            </div>

            {/* Time Slot Picker */}
            <div className="w-full lg:w-1/3 p-6 flex flex-col h-[600px] lg:h-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-base font-medium dark:text-white">Thu <span className="text-gray-400 dark:text-[#A1A1AA]">05</span></h2>
                    <div className="bg-gray-100 dark:bg-[#1E1E1E] p-0.5 rounded flex text-xs">
                        <button className="px-2 py-1 bg-white dark:bg-gray-700 rounded shadow-sm text-gray-900 dark:text-white font-medium">12h</button>
                        <button className="px-2 py-1 text-gray-500 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white transition-colors">24h</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {[
                        '12:30am', '1:00am', '1:30am', '2:00am', '2:30am',
                        '3:00am', '3:30am', '4:00am', '4:30am', '5:00am'
                    ].map(time => (
                        <button key={time} className="w-full py-2.5 rounded border border-gray-300 dark:border-[#2E2E2E] text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-all text-sm font-medium">
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #333;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #555;
                }
            `}</style>
        </div>
    )
}
