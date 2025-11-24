"use client"

import { useEffect, useState } from "react"

export type DeviceCapabilities = {
  isMobile: boolean
  isTablet: boolean
  isLowEnd: boolean
  prefersReducedMotion: boolean
  supportsWebGL: boolean
  devicePixelRatio: number
  maxTextureSize: number
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isTablet: false,
    isLowEnd: false,
    prefersReducedMotion: false,
    supportsWebGL: true,
    devicePixelRatio: 1,
    maxTextureSize: 2048,
  })

  useEffect(() => {
    // Check if running in browser
    if (typeof window === "undefined") return

    // Mobile detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth < 1024

    // Low-end device detection (heuristic-based)
    const hardwareConcurrency = navigator.hardwareConcurrency || 2
    const isLowEnd = hardwareConcurrency <= 4 || isMobile

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // WebGL support and capabilities
    let supportsWebGL = false
    let maxTextureSize = 2048
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (gl) {
        supportsWebGL = true
        const glContext = gl as WebGLRenderingContext
        maxTextureSize = glContext.getParameter(glContext.MAX_TEXTURE_SIZE) || 2048
      }
    } catch (e) {
      console.warn("WebGL detection failed:", e)
    }

    setCapabilities({
      isMobile,
      isTablet,
      isLowEnd,
      prefersReducedMotion,
      supportsWebGL,
      devicePixelRatio: window.devicePixelRatio || 1,
      maxTextureSize,
    })
  }, [])

  return capabilities
}
