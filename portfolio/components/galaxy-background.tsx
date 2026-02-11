"use client"

import { useRef, useEffect, useState, memo, useMemo, useCallback } from "react"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { useChromeVersion } from "@/hooks/use-chrome-version"
import { motion, AnimatePresence } from "framer-motion"
import { Video, VideoOff } from "lucide-react"

export const GalaxyBackground = memo(function GalaxyBackground({ scrollY }: { scrollY: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const capabilities = useDeviceCapabilities()
  const chrome = useChromeVersion()

  // Force a static background on mobile or older Chrome versions for performance
  const forceStaticBackground = capabilities.isMobile || (chrome.isChrome && chrome.version !== null && chrome.version < 90)
  
  // Use modern gradient on mobile instead of static image
  const useMobileGradient = capabilities.isMobile

  // Auto-disable video on mobile (handsets) by default for performance
  useEffect(() => {
    if (forceStaticBackground) {
      setIsVideoEnabled(false)
    }
  }, [forceStaticBackground])

  // Lazy load video only when needed and with adaptive quality
  useEffect(() => {
    if (forceStaticBackground || !videoRef.current || !isVideoEnabled) return

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
  }, [isVideoLoaded, capabilities, isVideoEnabled, forceStaticBackground])

  // Pause video when not visible to save resources
  useEffect(() => {
    if (forceStaticBackground || !videoRef.current || !isVideoEnabled) return

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
  }, [isVideoEnabled, forceStaticBackground])

  // Handle video toggle with useCallback for performance
  const toggleVideo = useCallback(() => {
    if (forceStaticBackground) return
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
  }, [forceStaticBackground])

  // Disable video for users who prefer reduced motion
  if (capabilities.prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
        }}
      />
    )
  }

  // Use simpler animations for older Chrome versions
  const animationDuration = chrome.shouldUseModernFeatures ? 0.5 : 0.3

  // Calculate scale based on scrollY for subtle zoom effect - memoized
  // Only zoom during the hero sequence (0-2000px)
  const scale = useMemo(() => 1 + Math.min(scrollY, 2000) * 0.00015, [scrollY])

  const showVideo = isVideoEnabled && !forceStaticBackground

  return (
    <>
      {/* Video Toggle Button - Only show on mobile/low-end devices */}
      {capabilities.isLowEnd && !forceStaticBackground && (
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

      <AnimatePresence mode="wait">
        {showVideo ? (
          <motion.video
            key="video"
            ref={videoRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            poster="/galaxy-bg.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
            style={{
              transform: `scale(${scale})`,
              willChange: capabilities.isLowEnd ? "auto" : "transform",
            }}
          />
        ) : useMobileGradient ? (
          <motion.div
            key="mobile-gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className="fixed inset-0 w-full h-full z-0 pointer-events-none"
          >
            {/* Dark space base gradient */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, #050510 0%, #0a0a1e 20%, #0d1528 45%, #0a1220 65%, #080818 85%, #050510 100%)",
              }}
            />
            
            {/* Subtle nebula glow - positioned to add depth */}
            <div 
              className="absolute top-[20%] left-[30%] w-[250px] h-[250px] rounded-full opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)',
                filter: 'blur(60px)'
              }}
            />
            <div 
              className="absolute top-[60%] right-[20%] w-[200px] h-[200px] rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(56,189,248,0.08) 50%, transparent 70%)',
                filter: 'blur(50px)'
              }}
            />
            
            {/* Static stars layer - pure CSS, zero JS overhead */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.8) 50%, transparent 50%),
                radial-gradient(1px 1px at 20% 40%, rgba(255,255,255,0.6) 50%, transparent 50%),
                radial-gradient(1.5px 1.5px at 30% 70%, rgba(255,255,255,0.9) 50%, transparent 50%),
                radial-gradient(1px 1px at 40% 20%, rgba(255,255,255,0.5) 50%, transparent 50%),
                radial-gradient(1px 1px at 50% 80%, rgba(255,255,255,0.7) 50%, transparent 50%),
                radial-gradient(1.5px 1.5px at 60% 30%, rgba(255,255,255,0.8) 50%, transparent 50%),
                radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.6) 50%, transparent 50%),
                radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.9) 50%, transparent 50%),
                radial-gradient(1.5px 1.5px at 90% 50%, rgba(255,255,255,0.7) 50%, transparent 50%),
                radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.5) 50%, transparent 50%),
                radial-gradient(1px 1px at 25% 55%, rgba(255,255,255,0.8) 50%, transparent 50%),
                radial-gradient(1.5px 1.5px at 35% 25%, rgba(255,255,255,0.6) 50%, transparent 50%),
                radial-gradient(1px 1px at 45% 95%, rgba(255,255,255,0.7) 50%, transparent 50%),
                radial-gradient(1px 1px at 55% 5%, rgba(255,255,255,0.9) 50%, transparent 50%),
                radial-gradient(1.5px 1.5px at 65% 75%, rgba(255,255,255,0.5) 50%, transparent 50%),
                radial-gradient(1px 1px at 75% 45%, rgba(255,255,255,0.8) 50%, transparent 50%),
                radial-gradient(1px 1px at 85% 90%, rgba(255,255,255,0.6) 50%, transparent 50%),
                radial-gradient(1.5px 1.5px at 95% 35%, rgba(255,255,255,0.7) 50%, transparent 50%),
                radial-gradient(1px 1px at 5% 65%, rgba(255,255,255,0.9) 50%, transparent 50%),
                radial-gradient(1px 1px at 12% 32%, rgba(255,255,255,0.5) 50%, transparent 50%),
                radial-gradient(0.5px 0.5px at 8% 48%, rgba(255,255,255,0.4) 50%, transparent 50%),
                radial-gradient(0.5px 0.5px at 32% 12%, rgba(255,255,255,0.3) 50%, transparent 50%),
                radial-gradient(0.5px 0.5px at 58% 42%, rgba(255,255,255,0.5) 50%, transparent 50%),
                radial-gradient(0.5px 0.5px at 72% 88%, rgba(255,255,255,0.4) 50%, transparent 50%),
                radial-gradient(0.5px 0.5px at 88% 62%, rgba(255,255,255,0.3) 50%, transparent 50%)
              `
            }} />
            
            {/* Twinkling stars - minimal CSS animation */}
            <div className="absolute w-1 h-1 rounded-full bg-white/90 top-[15%] left-[25%] animate-pulse" style={{ animationDuration: '2s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-white/80 top-[45%] left-[75%] animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/70 top-[70%] left-[15%] animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-white/70 top-[25%] left-[85%] animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }} />
            <div className="absolute w-0.5 h-0.5 rounded-full bg-white/60 top-[55%] left-[45%] animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.8s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-white/75 top-[80%] left-[60%] animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '1.5s' }} />
          </motion.div>
        ) : (
          <motion.div
            key="static"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-center bg-cover"
            style={{
              backgroundImage: "url('/galaxy-bg.jpg')",
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Consistent dark overlay for uniform appearance across all sections - lighter on mobile */}
      <div className={`fixed inset-0 z-0 pointer-events-none ${useMobileGradient ? 'bg-black/20' : 'bg-black/40'}`} />
    </>
  )
})
