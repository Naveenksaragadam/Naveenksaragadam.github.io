'use client'

import { useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const { scrollYProgress } = useScroll()

    // Configuration
    const frameCount = 120 // Based on the file list (frame_000 to frame_119)
    const priorityFrames = 24 // Load first ~20% immediately for quick start

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = new Array(frameCount).fill(null)
        let loadedCount = 0

        const loadImage = (index: number) => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image()
                // Construct filename: frame_000_delay-0.067s.png
                // We need to handle padding: 000, 001, ...
                const frameIndex = index.toString().padStart(3, '0')
                // Note: The delay suffix seems constant or pattern-based from the file list, 
                // but checking the file list again: frame_000_delay-0.067s.png
                // Wait, from the ls output: frame_000_delay-0.067s.png
                // Some might vary. Let's check a few.
                // frame_000_delay-0.067s.png
                // frame_001_delay-0.066s.png
                // This variation makes static path construction tricky without a map or a consistent naming scheme.
                // HACK: For now, I will assume a consistent naming or try to find a pattern. 
                // Since I cannot list files in client-side code, I should probably generate a manifest or rename them.
                // But the prompt said: "The files are named sequentially (e.g., frame_00_delay-0.067s.webp... up to roughly 89 frames)."
                // My ls showed .png files and delay variations (0.066s vs 0.067s).
                // To be safe, I should probably rename them to a standard sequence like frame_000.png, frame_001.png etc.
                // I will do that in the next tool call. For now, I'll write the code expecting standardized names.

                img.src = `/sequence/frame_${frameIndex}.webp`
                img.onload = () => {
                    loadedImages[index] = img
                    loadedCount++

                    // If we have loaded the priority frames, we can signal "ready" enough to start rendering
                    if (loadedCount === priorityFrames) {
                        setIsLoaded(true)
                    }
                    // Updating state periodically or at end to trigger re-renders if needed,
                    // but for canvas we just need the array to be mutated in place usually, 
                    // however React state needs to know.
                    // To avoid too many re-renders, we can setImages at chunks or at the end.
                    // For smoothness, we set it when priority is done, and then at the very end?
                    // Or we can just use a ref for the images array to avoid re-renders entirely
                    // and just trigger a single "isLoaded" state.

                    if (loadedCount === frameCount) {
                        // All loaded
                        setImages([...loadedImages])
                    } else if (loadedCount === priorityFrames) {
                        setImages([...loadedImages])
                    }

                    resolve()
                }
                img.onerror = reject
            })
        }

        // 1. Load Priority Frames Immediately
        const loadPriority = async () => {
            const promises = []
            for (let i = 0; i < priorityFrames; i++) {
                promises.push(loadImage(i))
            }
            await Promise.all(promises)
            // Start background loading strictly after priority is done
            loadBackground()
        }

        // 2. Load the rest in background
        const loadBackground = () => {
            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    loadRemainingChunks(priorityFrames)
                })
            } else {
                // Fallback
                setTimeout(() => loadRemainingChunks(priorityFrames), 100)
            }
        }

        const loadRemainingChunks = async (startIndex: number) => {
            const batchSize = 10
            for (let i = startIndex; i < frameCount; i += batchSize) {
                const batchPromises = []
                for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
                    batchPromises.push(loadImage(j))
                }
                await Promise.all(batchPromises)
                // Optional: Update state every batch if we want to show incremental progress?
                // For now, minimal connects
            }
            setImages([...loadedImages]) // Final update
        }

        loadPriority()

    }, [])

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

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        // Subscribe to scroll changes
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            requestAnimationFrame(() => renderFrame(latest))
        })

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            unsubscribe()
        }
    }, [scrollYProgress, images])

    return (
        <div className="h-[500vh] w-full relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>
        </div>
    )
}
