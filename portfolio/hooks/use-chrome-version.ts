"use client"

import { useEffect, useState } from "react"

export type ChromeCapabilities = {
  isChrome: boolean
  version: number | null
  supportsBackdropFilter: boolean
  supportsContainerQueries: boolean
  supportsHas: boolean
  supportsScrollTimeline: boolean
  supportsViewTransitions: boolean
  shouldUseModernFeatures: boolean
}

export function useChromeVersion(): ChromeCapabilities {
  const [capabilities, setCapabilities] = useState<ChromeCapabilities>({
    isChrome: false,
    version: null,
    supportsBackdropFilter: false,
    supportsContainerQueries: false,
    supportsHas: false,
    supportsScrollTimeline: false,
    supportsViewTransitions: false,
    shouldUseModernFeatures: false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    // Detect Chrome and version
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    let version: number | null = null

    if (isChrome) {
      const match = navigator.userAgent.match(/Chrome\/(\d+)/)
      version = match ? parseInt(match[1], 10) : null
    }

    // Feature detection
    const supportsBackdropFilter = CSS.supports("backdrop-filter", "blur(10px)") || 
                                   CSS.supports("-webkit-backdrop-filter", "blur(10px)")
    
    const supportsContainerQueries = CSS.supports("container-type", "inline-size")
    
    const supportsHas = CSS.supports("selector(:has(*))")
    
    const supportsScrollTimeline = "ScrollTimeline" in window
    
    const supportsViewTransitions = "startViewTransition" in document
    
    // Chrome 109+ has good support for modern CSS features
    const shouldUseModernFeatures = !isChrome || (version !== null && version >= 109)

    setCapabilities({
      isChrome,
      version,
      supportsBackdropFilter,
      supportsContainerQueries,
      supportsHas,
      supportsScrollTimeline,
      supportsViewTransitions,
      shouldUseModernFeatures,
    })
  }, [])

  return capabilities
}
