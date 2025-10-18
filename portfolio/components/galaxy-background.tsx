"use client"

import { useEffect, useRef, useState } from "react"

export function GalaxyBackground({ scrollY }: { scrollY: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isReversed, setIsReversed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = 0.5 // Slow down the animation

    const resetToStart = () => {
      video.currentTime = 0
      video.play()
      setIsReversed(false)
    }

    const resetToEnd = () => {
      video.currentTime = video.duration
      video.play()
      setIsReversed(true)
    }

    // Check direction and add appropriate listener
    const handleTimeUpdate = () => {
      if (!isReversed && video.currentTime >= video.duration - 0.1) {
        resetToStart()
      }
      if (isReversed && video.currentTime <= 0.1) {
        resetToEnd()
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    return () => video.removeEventListener("timeupdate", handleTimeUpdate)
  }, [isReversed])

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          transform: `scale(1.1) translateY(${scrollY * 0.02}px)`,
        }}
      >
        <source src="/Galaxyvideo.mp4" type="video/mp4" />
      </video>
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)`
        }}
      />
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.3) 0%, transparent 100%),
            radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.2) 0%, transparent 100%),
            radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.1) 0%, transparent 100%)
          `,
          transform: `translateY(${scrollY * 0.15}px)`,
          opacity: 0.5,
        }}
      />
    </>
  )
}