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

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = new Array(frameCount).fill(null)
        let loadedCount = 0

        const loadImage = (index: number) => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image()
                const frameIndex = index.toString().padStart(3, '0')
                img.src = `/sequence/frame_${frameIndex}.webp`
                img.onload = () => {
                    loadedImages[index] = img
                    loadedCount++

                    // Update global progress (cap at 99% until render)
                    const progress = Math.round((loadedCount / frameCount) * 100)
                    setLoadingProgress(Math.min(progress, 99))

                    // Once everything is loaded, update local state
                    if (loadedCount === frameCount) {
                        setImages([...loadedImages])
                        setIsLoaded(true)
                    }

                    resolve()
                }
                img.onerror = () => {
                    console.error(`Failed to load frame ${index}`)
                    loadedCount++
                    resolve()
                }
            })
        }

        // Load all frames in parallel chunks
        const loadEverything = async () => {
            const batchSize = 10
            for (let i = 0; i < frameCount; i += batchSize) {
                const batchPromises = []
                for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
                    batchPromises.push(loadImage(j))
                }
                await Promise.all(batchPromises)
            }
        }

        loadEverything()

    }, [setLoadingProgress])

    // Wait for images to be ready and first frame to draw before hitting 100%
    useEffect(() => {
        if (!isLoaded || !canvasRef.current || images.length === 0) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Force an initial render of the first frame
        const firstImg = images[0]
        if (firstImg) {
            // Re-use logic or just allow the render loop to pick it up?
            // Safer to allow render loop, but we want to confirm it happened.
            // We'll set a small timeout to allow the render loop effect to run once
            // Or explicitly call render here if we extract the logic. 
            // For simplicity, we'll assume the render loop (below) catches it immediately
            // but we'll delay the 100% signal slightly to ensure paint.

            setTimeout(() => {
                setLoadingProgress(100)
            }, 100)
        }
    }, [isLoaded, images, setLoadingProgress])

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
