"use client"

import { useEffect, useState, useRef } from "react"

export type PerformanceMetrics = {
  fps: number
  isLowPerformance: boolean
}

export function usePerformanceMonitor(threshold = 30): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    isLowPerformance: false,
  })

  const frameTimesRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef<number>(performance.now())
  const rafIdRef = useRef<number>()

  useEffect(() => {
    let frameCount = 0
    const maxSamples = 60

    const measureFPS = () => {
      const now = performance.now()
      const delta = now - lastFrameTimeRef.current
      lastFrameTimeRef.current = now

      if (delta > 0) {
        const currentFPS = 1000 / delta
        frameTimesRef.current.push(currentFPS)

        if (frameTimesRef.current.length > maxSamples) {
          frameTimesRef.current.shift()
        }

        frameCount++

        // Update metrics every 30 frames
        if (frameCount >= 30) {
          const avgFPS =
            frameTimesRef.current.reduce((sum, fps) => sum + fps, 0) / frameTimesRef.current.length

          setMetrics({
            fps: Math.round(avgFPS),
            isLowPerformance: avgFPS < threshold,
          })

          frameCount = 0
        }
      }

      rafIdRef.current = requestAnimationFrame(measureFPS)
    }

    rafIdRef.current = requestAnimationFrame(measureFPS)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [threshold])

  return metrics
}
