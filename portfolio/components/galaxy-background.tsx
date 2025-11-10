"use client"

import { useRef } from "react"

export function GalaxyBackground({ scrollY }: { scrollY: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <>
      <video
        ref={videoRef}
        src="/Galaxyvideo-loop.mp4" // <-- Use your concatenated video here!
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          transform: `scale(1.1) translateY(${scrollY * 0.02}px)`,
        }}
      />
      {/* Your overlays as before */}
    </>
  )
}
