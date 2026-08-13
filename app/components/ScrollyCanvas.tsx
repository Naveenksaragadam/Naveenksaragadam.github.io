'use client'

import { useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLoading } from './Providers'

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const { scrollYProgress } = useScroll()
    const { setLoadingProgress } = useLoading()

    // Configuration
    const frameCount = 120 // Based on the file list (frame_000 to frame_119)

    // The intro only needs its first frame before it can be shown. Loading every
    // frame before dismissing the preloader made first visits unnecessarily slow.
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = new Array(frameCount).fill(null)

        const loadImage = (index: number, priority: 'high' | 'low' = 'low') => {
            return new Promise<void>((resolve) => {
                const img = new Image()
                const frameIndex = index.toString().padStart(3, '0')
                img.fetchPriority = priority
                img.decoding = 'async'
                img.src = `/sequence/frame_${frameIndex}.webp`
                img.onload = () => {
                    loadedImages[index] = img
                    resolve()
                }
                img.onerror = () => {
                    console.error(`Failed to load frame ${index}`)
                    resolve()
                }
            })
        }

        const preloadRemainingFrames = async () => {
            const batchSize = 12
            for (let i = 1; i < frameCount; i += batchSize) {
                await Promise.all(
                    Array.from({ length: Math.min(batchSize, frameCount - i) }, (_, offset) =>
                        loadImage(i + offset)
                    )
                )
                // Make newly available frames usable without blocking the page.
                setImages([...loadedImages])
            }
            setIsLoaded(true)
        }

        const loadInitialFrame = async () => {
            await loadImage(0, 'high')
            setImages([...loadedImages])
            setLoadingProgress(100)

            // Let the browser paint the first frame and finish the preloader exit
            // before using network bandwidth for the rest of the animation.
            window.setTimeout(() => {
                void preloadRemainingFrames()
            }, 0)
        }

        void loadInitialFrame()
    }, [setLoadingProgress])

    // A completed sequence is useful for diagnostics, but it should never gate
    // the first render.
    useEffect(() => {
        if (isLoaded) {
            setLoadingProgress(100)
        }
    }, [isLoaded, setLoadingProgress])

    // Render loop
    useEffect(() => {
        // We render whatever we have. If images[index] is null, we show nothing or previous frame.
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Render function
        const renderFrame = (progress: number) => {
            // Map progress (0-1) to frame index
            const index = Math.min(
                frameCount - 1,
                Math.floor(progress * frameCount)
            )

            // Fallback: search backwards for a loaded frame if current isn't loaded
            let img = images[index]
            if (!img) {
                for (let i = index - 1; i >= 0; i--) {
                    if (images[i]) {
                        img = images[i]
                        break
                    }
                }
            }

            if (img) {
                // Object-fit: cover logic
                const hRatio = canvas.width / img.width
                const vRatio = canvas.height / img.height
                const ratio = Math.max(hRatio, vRatio) * 1.2

                const centerShift_x = (canvas.width - img.width * ratio) / 2
                const centerShift_y = (canvas.height - img.height * ratio) / 2

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(
                    img,
                    0,
                    0,
                    img.width,
                    img.height,
                    centerShift_x,
                    centerShift_y,
                    img.width * ratio,
                    img.height * ratio
                )
            }
        }

        // Set canvas size to match window
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            renderFrame(scrollYProgress.get()) // Initial render
        }

        // Debounce resize
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(resizeCanvas, 100)
        }

        window.addEventListener('resize', handleResize)
        resizeCanvas()

        // Subscribe to scroll changes
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            requestAnimationFrame(() => renderFrame(latest))
        })

        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(resizeTimeout)
            unsubscribe()
        }
    }, [scrollYProgress, images])

    return (
        <div
            className="h-[500vh] w-full relative"
            role="img"
            aria-label="3D scrolling animation sequence showing technical visualization"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>
        </div>
    )
}
