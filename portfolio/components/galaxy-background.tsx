"use client"

import { useRef, useEffect, useState } from "react"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"

export function GalaxyBackground({ scrollY }: { scrollY: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const capabilities = useDeviceCapabilities()

  // Lazy load video only when needed and with adaptive quality
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    // Optimize video playback based on device
    if (capabilities.isMobile || capabilities.isLowEnd) {
      // Reduce quality for mobile/low-end devices
      video.style.filter = "blur(0.5px)" // Slight blur to hide compression artifacts
    }

    // Intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVideoLoaded) {
            video.src = "/Galaxyvideo-loop.mp4"
            video.load()
            setIsVideoLoaded(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [isVideoLoaded, capabilities])

  // Pause video when not visible to save resources
  useEffect(() => {
    if (!videoRef.current) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRef.current?.pause()
      } else {
        videoRef.current?.play().catch(() => {
          // Ignore autoplay errors
        })
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  // Disable video for users who prefer reduced motion
  if (capabilities.prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-linear-to-b from-slate-950 via-slate-900 to-slate-950"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
        }}
      />
    )
  }

  return (
    <>
      <video
        ref={videoRef}
        poster="/galaxy-poster.jpg" // Add a poster frame (you can create this from the video)
        autoPlay
        loop
        muted
        playsInline
        preload={capabilities.isMobile ? "none" : "metadata"} // Don't preload on mobile
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          transform: capabilities.prefersReducedMotion
            ? "scale(1.1)"
            : `scale(1.1) translateY(${scrollY * 0.02}px)`,
          willChange: capabilities.isLowEnd ? "auto" : "transform", // Optimize for low-end devices
        }}
        // Reduce video size on mobile to improve performance
        width={capabilities.isMobile ? "720" : undefined}
        height={capabilities.isMobile ? "480" : undefined}
      />
      {/* Gradient overlay for better text readability */}
      <div className="fixed inset-0 bg-linear-to-b from-background/50 via-background/30 to-background/50 z-0 pointer-events-none" />
    </>
  )
}
