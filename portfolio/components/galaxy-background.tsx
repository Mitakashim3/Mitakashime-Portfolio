"use client"

import { useRef, useEffect, useState } from "react"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { motion, AnimatePresence } from "framer-motion"
import { Video, VideoOff } from "lucide-react"

export function GalaxyBackground({ scrollY }: { scrollY: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const capabilities = useDeviceCapabilities()

  // Auto-disable video on mobile by default for performance
  useEffect(() => {
    if (capabilities.isMobile || capabilities.isLowEnd) {
      setIsVideoEnabled(false)
    }
  }, [capabilities.isMobile, capabilities.isLowEnd])

  // Lazy load video only when needed and with adaptive quality
  useEffect(() => {
    if (!videoRef.current || !isVideoEnabled) return

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
  }, [isVideoLoaded, capabilities, isVideoEnabled])

  // Pause video when not visible to save resources
  useEffect(() => {
    if (!videoRef.current || !isVideoEnabled) return

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
  }, [isVideoEnabled])

  // Handle video toggle
  const toggleVideo = () => {
    setIsVideoEnabled(prev => {
      if (!prev && videoRef.current) {
        // Re-enable: reload and play
        videoRef.current.src = "/Galaxyvideo-loop.mp4"
        videoRef.current.load()
        videoRef.current.play().catch(() => {})
        setIsVideoLoaded(true)
      } else if (videoRef.current) {
        // Disable: pause and clear
        videoRef.current.pause()
      }
      return !prev
    })
  }

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

  // Calculate scale based on scrollY for subtle zoom effect
  // Only zoom during the hero sequence (0-2000px)
  const scale = 1 + Math.min(scrollY, 2000) * 0.00015

  return (
    <>
      {/* Video Toggle Button - Only show on mobile/low-end devices */}
      {(capabilities.isMobile || capabilities.isLowEnd) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={toggleVideo}
          className="fixed bottom-20 left-4 z-60 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/20 transition-colors touch-manipulation"
          aria-label={isVideoEnabled ? "Turn off background video" : "Turn on background video"}
        >
          {isVideoEnabled ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </motion.button>
      )}

      <AnimatePresence>
        {isVideoEnabled ? (
          <motion.video
            key="video"
            ref={videoRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            poster="/galaxy-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload={capabilities.isMobile ? "none" : "metadata"}
            className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
            style={{
              transform: `scale(${scale})`,
              willChange: capabilities.isLowEnd ? "auto" : "transform",
            }}
            width={capabilities.isMobile ? "720" : undefined}
            height={capabilities.isMobile ? "480" : undefined}
          />
        ) : (
          <motion.div
            key="static"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-linear-to-b from-slate-950 via-slate-900 to-slate-950"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Consistent dark overlay for uniform appearance across all sections */}
      <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />
    </>
  )
}
