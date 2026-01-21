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

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        for (let i = 0; i < frameCount; i++) {
            const img = new Image()
            // Construct filename: frame_000_delay-0.067s.png
            // We need to handle padding: 000, 001, ...
            const frameIndex = i.toString().padStart(3, '0')
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

            img.src = `/sequence/frame_${frameIndex}.png`
            img.onload = () => {
                loadedCount++
                if (loadedCount === frameCount) {
                    setIsLoaded(true)
                }
            }
            loadedImages.push(img)
        }
        setImages(loadedImages)
    }, [])

    // Render loop
    useEffect(() => {
        if (!isLoaded || !canvasRef.current || images.length === 0) return

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
            const img = images[index]

            if (img) {
                // Calculate ratio with an 8% zoom to crop edges (watermark)
                const hRatio = canvas.width / img.width
                const vRatio = canvas.height / img.height
                const ratio = Math.max(hRatio, vRatio) * 1.08

                const centerShift_x = (canvas.width - img.width * ratio) / 2
                // Shift y down by 5% of screen height to keep Face (top-center) in view 
                // while pushing Bottom-Right (watermark) further off-screen.
                const centerShift_y = ((canvas.height - img.height * ratio) / 2) + (canvas.height * 0.05)

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
        // ...
        // ...
        return (
            <div className="h-[500vh] w-full relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <canvas ref={canvasRef} className="block w-full h-full" />
                </div>
            </div>
        )
    }
