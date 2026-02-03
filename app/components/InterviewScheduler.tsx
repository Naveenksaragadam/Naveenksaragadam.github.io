'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Globe, ChevronLeft, ChevronRight, Loader2, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { PopupModal } from 'react-calendly';

// Types
interface CalendlyUser {
    resource: {
        avatar_url: string;
        name: string;
        scheduling_url: string;
        uri: string;
    }
}

interface CalendlyEventType {
    uri: string;
    name: string;
    duration: number;
    scheduling_url: string;
}

interface TimeSlot {
    start_time: string;
    status: string;
}

export default function InterviewScheduler() {
    // State
    const [user, setUser] = useState<CalendlyUser | null>(null);
    const [eventTypes, setEventTypes] = useState<CalendlyEventType[]>([]);
    const [selectedEventType, setSelectedEventType] = useState<CalendlyEventType | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingUrl, setBookingUrl] = useState('');
    const [is24Hour, setIs24Hour] = useState(false);

    // Timezone State
    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [timeZoneList, setTimeZoneList] = useState<{ value: string; label: string }[]>([]);

    // Initialize Timezones
    useEffect(() => {
        const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setSelectedTimeZone(localTz);

        // Generate list of timezones with UTC offsets
        const tzs = Intl.supportedValuesOf('timeZone').map(tz => {
            try {
                // Get offset string (e.g., "GMT-5")
                const dateStr = new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
                const offset = dateStr.split(' ').pop() || ''; // Extract "GMT-5"
                return { value: tz, label: `(${offset}) ${tz.replace(/_/g, ' ')}` };
            } catch (e) {
                return { value: tz, label: tz };
            }
        });

        setTimeZoneList(tzs.sort((a, b) => a.label.localeCompare(b.label)));
    }, []);

    // Fetch User and Event Types on Mount
    useEffect(() => {
        async function init() {
            try {
                // 1. Fetch User
                const userRes = await fetch('/api/calendly/user');
                const userData = await userRes.json();
                if (userData.resource) {
                    setUser(userData);

                    // 2. Fetch Event Types
                    const typesRes = await fetch(`/api/calendly/event-types?userUri=${encodeURIComponent(userData.resource.uri)}`);
                    const typesData = await typesRes.json();

                    if (typesData.collection) {
                        setEventTypes(typesData.collection);
                        // Find a 30 min meeting or default to first
                        const thirtyMin = typesData.collection.find((t: CalendlyEventType) => t.duration === 30) || typesData.collection[0];
                        setSelectedEventType(thirtyMin);
                    }
                }
            } catch (error) {
                console.error('Initialization failed:', error);
            }
        }
        init();
    }, []);

    // Calendar Generation Helpers
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = async (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);

        if (!selectedEventType || !user) return;

        setLoadingSlots(true);
        setAvailableSlots([]); // Clear slots to prevent stale data

        try {
            // Fix for "start_time must be in the future" error
            // If the selected date is today, use the current time (plus a small buffer if needed)
            // If it's a future date, use the beginning of that day (UTC)

            // Robust calculation to satisfy "start_time must be in the future"
            // while capturing the full Local Day (including evening slots for negative UTC offsets).

            // 1. Define the Local Day window
            const localStart = new Date(date);
            localStart.setHours(0, 0, 0, 0);

            const localEnd = new Date(date);
            localEnd.setHours(23, 59, 59, 999);

            // 2. Clamp Start Time to 'Now' if today, to satisfy API
            const now = new Date();
            // detailed matching: if localStart is in the past, use 'now'
            // We use a small buffer (e.g. now + 1 min) or just 'now' is usually fine.
            const queryStart = localStart < now ? now : localStart;

            const startStr = queryStart.toISOString();
            const endStr = localEnd.toISOString();

            console.log(`[Scheduler] Fetching slots for: ${date.toDateString()}`);
            console.log(`[Scheduler] Local Window: ${localStart.toLocaleString()} - ${localEnd.toLocaleString()}`);
            console.log(`[Scheduler] Query Range: ${startStr} - ${endStr}`);

            const res = await fetch(`/api/calendly/availability?userUri=${encodeURIComponent(user.resource.uri)}&eventTypeUri=${encodeURIComponent(selectedEventType.uri)}&startTime=${startStr}&endTime=${endStr}`);
            const data = await res.json();

            if (data.collection) {
                // Filter out past slots
                const now = new Date();
                console.log(`[Scheduler] Filtering slots against current time: ${now.toLocaleString()}`);

                const validSlots = data.collection.filter((slot: TimeSlot) => {
                    const slotTime = new Date(slot.start_time);
                    const isFuture = slotTime.getTime() > now.getTime();

                    if (data.collection.indexOf(slot) < 3) {
                        console.log(`[Scheduler] Slot ${slot.start_time} (Local: ${slotTime.toLocaleString()}) > Now? ${isFuture}`);
                    }

                    return isFuture;
                });
                setAvailableSlots(validSlots);
            }
        } catch (error) {
            console.error('Failed to fetch slots', error);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleTimeSelect = (slot: TimeSlot) => {
        if (!selectedEventType) return;
        setBookingUrl(selectedEventType.scheduling_url);
        setIsBookingOpen(true);
    };

    // Render Calendar Grid
    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-full" />);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isToday = new Date().toDateString() === date.toDateString();
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

            days.push(
                <button
                    key={i}
                    onClick={() => !isPast && handleDateClick(i)}
                    disabled={isPast}
                    className={`
                        h-10 w-full flex items-center justify-center text-sm rounded-lg transition-all relative font-medium
                        ${isSelected
                            ? 'bg-white text-black'
                            : isPast
                                ? 'text-zinc-600 cursor-not-allowed'
                                : 'text-zinc-300 hover:bg-zinc-800'
                        }
                    `}
                >
                    {i}
                    {isToday && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 bg-white rounded-full"></span>
                    )}
                </button>
            );
        }
        return days;
    };

    if (!user) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center text-zinc-500">
                <Loader2 className="animate-spin mr-2" /> Loading scheduler...
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row w-full bg-[#111] text-zinc-100 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl h-auto lg:h-[480px]">
            {/* Left Panel: Profile & Details */}
            <div className="w-full lg:w-[300px] p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col bg-[#111]">
                <div className="mb-8">
                    {user.resource.avatar_url && (
                        <div className="w-12 h-12 rounded-full overflow-hidden mb-4 border border-zinc-700">
                            <img src={user.resource.avatar_url} alt={user.resource.name} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h2 className="text-zinc-400 font-medium text-sm mb-1">{user.resource.name}</h2>
                    <h1 className="text-xl font-bold text-white mb-6">
                        {selectedEventType?.name || "30 Min Meeting"}
                    </h1>
                </div>

                <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Requires confirmation</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>{selectedEventType?.duration || 30}m</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                        <div className="w-4 h-4 rounded-sm bg-zinc-800/50 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" opacity="0" />
                                <path d="M22 14.5v-9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-8-3.5l6-4v11l-6-4v-3z" />
                            </svg>
                        </div>
                        <span>Google Meet</span>
                    </div>

                    {/* Timezone Selector */}
                    <div className="flex items-center gap-2 text-zinc-400 pt-4 cursor-pointer hover:text-white transition-colors">
                        <Globe className="w-4 h-4 shrink-0" />
                        <select
                            value={selectedTimeZone}
                            onChange={(e) => setSelectedTimeZone(e.target.value)}
                            className="bg-transparent text-xs appearance-none focus:outline-none cursor-pointer w-full"
                        >
                            {timeZoneList.map((tz) => (
                                <option key={tz.value} value={tz.value} className="bg-zinc-900 text-zinc-300">
                                    {tz.label}
                                </option>
                            ))}
                        </select>
                        <ChevronRight className="w-3 h-3 rotate-90 opacity-50" />
                    </div>
                </div>
            </div>

            {/* Middle Panel: Calendar */}
            <div className="flex-1 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-zinc-800">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-medium text-white">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="text-xs font-semibold text-zinc-500 tracking-wider mb-2">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {renderCalendarDays()}
                </div>
            </div>

            {/* Right Panel: Time Slots */}
            <div className="w-full lg:w-[320px] bg-[#111] flex flex-col h-[350px] lg:h-full border-l border-zinc-800">
                {/* Header for Time Slots */}
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-[#111] z-10 shrink-0">
                    <span className="text-sm font-medium text-zinc-300">
                        {selectedDate
                            ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit' })
                            : 'Select a date'}
                    </span>
                    <div className="flex bg-zinc-800 rounded p-0.5">
                        <button
                            onClick={() => setIs24Hour(false)}
                            className={`px-2 py-1 text-[10px] rounded font-medium transition-colors ${!is24Hour ? 'bg-zinc-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                            12h
                        </button>
                        <button
                            onClick={() => setIs24Hour(true)}
                            className={`px-2 py-1 text-[10px] rounded font-medium transition-colors ${is24Hour ? 'bg-zinc-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                            24h
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {selectedDate && (
                            <motion.div
                                key={selectedDate.toISOString()}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3"
                            >
                                {loadingSlots ? (
                                    <div className="flex justify-center py-12">
                                        <Loader2 className="animate-spin text-zinc-600" />
                                    </div>
                                ) : availableSlots.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-zinc-600 gap-2">
                                        <CalendarIcon className="w-8 h-8 opacity-20" />
                                        <span className="text-sm">No slots available</span>
                                    </div>
                                ) : (
                                    availableSlots.map((slot, idx) => {
                                        const timeLabel = new Date(slot.start_time).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: !is24Hour,
                                            timeZone: selectedTimeZone
                                        });

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleTimeSelect(slot)}
                                                className="w-full py-3 px-4 rounded-lg border border-zinc-700/50 bg-zinc-900/30 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white transition-all text-sm font-medium flex justify-center group"
                                            >
                                                {timeLabel}
                                            </button>
                                        )
                                    })
                                )}
                            </motion.div>
                        )}
                        {!selectedDate && (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-3">
                                <div className="p-3 rounded-full bg-zinc-900">
                                    <CalendarIcon className="w-5 h-5 text-zinc-500" />
                                </div>
                                <span className="text-sm">Pick a date to view available times</span>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <PopupModal
                url={bookingUrl}
                pageSettings={{
                    backgroundColor: '121212',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: 'ffffff',
                    textColor: 'ffffff'
                }}
                rootElement={typeof document !== 'undefined' ? document.getElementById("main-root") || document.body : null as unknown as HTMLElement}
                open={isBookingOpen}
                onModalClose={() => setIsBookingOpen(false)}
            />
        </div>
    );
}
