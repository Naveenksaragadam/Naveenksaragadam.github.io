'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Handle scroll position based on navigation type
    const navigationEntries = performance.getEntriesByType('navigation')
    if (navigationEntries.length > 0) {
      const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming
      if (navigationEntry.type !== 'reload') {
        lenis.scrollTo(0, { immediate: true })
      }
    } else {
      // Fallback for browsers that don't support Navigation Timing API Level 2 consistently
      lenis.scrollTo(0, { immediate: true })
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
