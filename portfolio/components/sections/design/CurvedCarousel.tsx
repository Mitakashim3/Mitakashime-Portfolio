"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"

// Width drives size; height follows each image's aspect ratio.
const DEFAULT_CARD_WIDTH = 520
const DEFAULT_GAP = 40
const DEFAULT_SPEED_PX_PER_SEC = 60
const DEFAULT_HEIGHT_CLASS = "h-130" // 520px
const DEFAULT_PERSPECTIVE = 1500

// Duplicate images to create illusion of infinity if few images
function getLoopedImages(images: string[]) {
  if (images.length === 0) return []
  let looped = [...images]
  while (looped.length < 10) {
    looped = [...looped, ...images]
  }
  return looped
}

type CurvedCarouselProps = {
  images: string[]
  cardWidth?: number
  gap?: number
  speedPxPerSec?: number
  heightClassName?: string
  perspective?: number
}

export function CurvedCarousel({
  images,
  cardWidth = DEFAULT_CARD_WIDTH,
  gap = DEFAULT_GAP,
  speedPxPerSec = DEFAULT_SPEED_PX_PER_SEC,
  heightClassName = DEFAULT_HEIGHT_CLASS,
  perspective = DEFAULT_PERSPECTIVE,
}: CurvedCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [centerOffset, setCenterOffset] = useState(0)
  const displayImages = useMemo(() => getLoopedImages(images), [images])
  // We'll just render a standard marquee and use CSS/Framer for the curve? 
  // Ideally we need per-item transforms based on screen position.
  
  // Let's rely on a simpler approach: 
  // A scrollable container (hidden scrollbar) that we auto-scroll?
  // Or a framer motion value that drives x.
  
  const x = useMotionValue(0)

  // Track container size so 3D transforms stay accurate on resize.
  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const update = () => setCenterOffset(el.clientWidth / 2)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Auto-scroll logic
  useEffect(() => {
    let animationFrameId: number
    let lastTime = performance.now()

    const animate = (time: number) => {
      const delta = time - lastTime
      const currentX = x.get()

      const totalWidth = displayImages.length * (cardWidth + gap)
      const halfWidth = totalWidth / 2

      // Move left at a constant rate (px/sec)
      let newX = currentX - (speedPxPerSec * delta) / 1000

      // Wrap seamlessly if the second half is a duplicate of the first.
      if (halfWidth > 0 && newX <= -halfWidth) {
        newX += halfWidth
      }

      x.set(newX)
      lastTime = time
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [x, displayImages.length, cardWidth, gap, speedPxPerSec])

  return (
    <div 
        ref={containerRef}
      className={`relative w-full overflow-hidden py-6 ${heightClassName} flex items-center`}
      style={{ perspective: `${perspective}px` }}
    >
      <div className="absolute inset-0">
            {/* We render items absolutely based on the motion value x */}
            {displayImages.map((img, index) => (
                <CarouselItem 
                    key={index} 
                    index={index} 
                    x={x}
                    imgUrl={img}
                    centerOffset={centerOffset}
                    cardWidth={cardWidth}
                    gap={gap}
                />
            ))}
      </div>
    </div>
  )
}

function CarouselItem({ 
    index, 
    x, 
    imgUrl,
  centerOffset,
  cardWidth,
  gap,
}: { 
    index: number
    x: ReturnType<typeof useMotionValue<number>>
    imgUrl: string
    centerOffset: number
  cardWidth: number
  gap: number
}) {
  const baseX = index * (cardWidth + gap)
    const itemX = useTransform(x, (latestX) => baseX + latestX)
  const distFromCenter = useTransform(itemX, (posX) => posX + cardWidth / 2 - centerOffset)

    const rotateY = useTransform(distFromCenter, (d) => -d * 0.04)
    const translateZ = useTransform(distFromCenter, (d) => -Math.abs(d) * 0.35)
    const opacity = useTransform(distFromCenter, (d) => 1 - Math.min(1, Math.abs(d) / 1400))
    const zIndex = useTransform(distFromCenter, (d) => Math.round(1000 - Math.abs(d)))
    const transform = useMotionTemplate`translateX(${itemX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`

    // Minimalist border/frame that wraps the image with consistent padding.
    return (
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 p-2 rounded-xl border border-white/20 shadow-2xl bg-black/30 backdrop-blur-sm"
        style={{
          width: cardWidth,
          transform,
          opacity,
          zIndex,
          willChange: "transform",
        }}
      >
        <div className="rounded-lg overflow-hidden bg-black/10">
          <Image
            src={imgUrl}
            alt="Project visual"
            width={1600}
            height={1067}
            className="block w-full h-auto object-contain pointer-events-none"
            sizes={`(max-width: 768px) 92vw, ${cardWidth}px`}
            priority={index < 2}
          />
        </div>
      </motion.div>
    )
}

