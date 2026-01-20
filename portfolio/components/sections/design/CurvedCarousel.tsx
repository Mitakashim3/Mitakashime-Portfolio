"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import Image from "next/image"

const CARD_WIDTH = 260
const CARD_HEIGHT = 400
const GAP = 20

// Duplicate images to create illusion of infinity if few images
function getLoopedImages(images: string[]) {
  if (images.length === 0) return []
  let looped = [...images]
  while (looped.length < 10) {
    looped = [...looped, ...images]
  }
  return looped
}

export function CurvedCarousel({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [centerOffset, setCenterOffset] = useState(0)
  const displayImages = getLoopedImages(images)
  // We'll just render a standard marquee and use CSS/Framer for the curve? 
  // Ideally we need per-item transforms based on screen position.
  
  // Let's rely on a simpler approach: 
  // A scrollable container (hidden scrollbar) that we auto-scroll?
  // Or a framer motion value that drives x.
  
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-scroll logic
  useEffect(() => {
    let animationFrameId: number
    let lastTime = performance.now()
    const speed = 0.5 // pixels per ms

    const animate = (time: number) => {
      if (!isHovered) {
        const delta = time - lastTime
        const currentX = x.get()
        const totalWidth = displayImages.length * (CARD_WIDTH + GAP)
        
        // Move left
        let newX = currentX - speed * (delta / 16)
        
        // Wrap around logic can be complex with absolute positioning, 
        // let's try a different approach: Infinite strip.
        // If we move too far left, reset.
        if (newX <= -totalWidth / 2) {
             newX = 0
        }
        
        x.set(newX)
      }
      lastTime = time
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [x, isHovered, displayImages.length])

  // Center calculation for 3D
  useEffect(() => {
    if (containerRef.current) {
        setCenterOffset(containerRef.current.offsetWidth / 2)
    }
  }, [])

  return (
    <div 
        ref={containerRef}
        className="relative w-full overflow-hidden py-10 perspective-[1000px] h-[500px] flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-0 w-full h-full flex items-center justify-center">
            {/* We render items absolutely based on the motion value x */}
            {displayImages.map((img, index) => (
                <CarouselItem 
                    key={index} 
                    index={index} 
                    total={displayImages.length}
                    x={x}
                    imgUrl={img}
                    centerOffset={centerOffset}
                />
            ))}
      </div>
      
      {/* Gradients to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
    </div>
  )
}

function CarouselItem({ 
    index, 
    total, 
    x, 
    imgUrl,
    centerOffset
}: { 
    index: number
    total: number
    x: any
    imgUrl: string
    centerOffset: number
}) {
    const itemRef = useRef<HTMLDivElement>(null)
    const [style, setStyle] = useState<any>({})

    useEffect(() => {
        // Subscribe to x changes to update transforms
        const unsubscribe = x.on("change", (latestX: number) => {
             // Calculate absolute position in the strip
             const itemX = index * (CARD_WIDTH + GAP) + latestX
             
             // Check if we need to wrap visually?
             // Since we have a long strip that resets, we need to ensure seamlessness.
             // If we use "loopedImages" where total width is large enough, 
             // and we reset X when it reaches half, we just need to render enough copies.
             
             // Let's refine the wrapping logic in the parent or here.
             // Actually, parent resetting X from -HalfWidth to 0 works if the second half is a copy of the first.
             // displayImages should be [A, B, C, A, B, C].
             
             // Position relative to viewport center
             // The container is full width. 
             // We want to center the strip? Adjust `latestX` so that 0 starts at center?
             // Let's adding centerOffset to the position.
             
             const visualX = itemX + centerOffset // This puts the first item at center if X=0
             // But we want the strip to start further right maybe?
             // Lets assume itemX is strictly linear.
             
             // Distance from center of screen
             const distFromCenter = visualX + CARD_WIDTH / 2 - centerOffset
             
             // 3D Transform
             // Cap distance to avoid extreme rotations
             // const maxDist = 800
             // const clampedDist = Math.max(-maxDist, Math.min(maxDist, distFromCenter))
             
             // Rotate Y based on distance. 
             // Left side (dist < 0) -> Rotate positive
             const rotateY = -distFromCenter * 0.05
             
             // Push back based on distance
             const translateZ = -Math.abs(distFromCenter) * 0.5
             
             // Opacity fade
             const opacity = 1 - Math.min(1, Math.abs(distFromCenter) / 1000)

             setStyle({
                 transform: `translateX(${visualX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                 opacity,
                 zIndex: Math.round(1000 - Math.abs(distFromCenter))
             })
        })
        return () => unsubscribe()
    }, [x, index, centerOffset])

    return (
        <div 
            ref={itemRef}
            className="absolute top-1/2 -mt-[200px] left-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                ...style, // Applied via state from motion value subscription
                willChange: "transform" // Critical for performance
            }}
        >
            <Image 
                src={imgUrl} 
                alt="Project visual" 
                fill 
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 300px"
            />
             <div className="absolute inset-0 bg-black/20" />
        </div>
    )
}
