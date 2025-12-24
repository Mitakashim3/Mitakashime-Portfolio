"use client"

import { useEffect, useRef, useState, memo } from "react"
import { useProgress, useGLTF } from "@react-three/drei"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export const Preloader = memo(function Preloader() {
  const { active, progress } = useProgress()
  const [shouldRender, setShouldRender] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  
  // Minimum display time state
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden"
    
    // Minimum display time timer (reduced to 1.5 seconds for faster perceived loading)
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 1500)

    return () => {
      document.body.style.overflow = ""
      clearTimeout(timer)
    }
  }, [])

  useGSAP(() => {
    if (!nameRef.current) return

    const letters = nameRef.current.querySelectorAll(".letter")
    
    // Initial set with GPU acceleration
    gsap.set(letters, {
      transformOrigin: "50% 50% -20px",
      rotateX: 0,
      opacity: 1,
      force3D: true, // Force GPU acceleration
      willChange: "transform, opacity"
    })

    // Looping "Cube Down" Animation - optimized
    const tl = gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 0.3, // Reduced delay for smoother feel
      defaults: { 
        ease: "power2.inOut", // Lighter easing for better performance
        force3D: true
      }
    })

    // Animate each letter rotating 360 degrees on X axis (tumbling down)
    tl.to(letters, {
      rotateX: -360,
      duration: 1, // Slightly faster
      stagger: 0.08, // Reduced stagger for smoother animation
    })

    animationRef.current = tl

    // Cleanup function to kill timeline when component unmounts or updates
    return () => {
      tl.kill()
      animationRef.current = null
    }

  }, { scope: containerRef, dependencies: [] })

  // Exit animation
  useEffect(() => {
    const isLoaded = progress === 100 && minTimeElapsed
    
    if (isLoaded && containerRef.current && nameRef.current) {
      // Kill any active animations on the letters to prevent conflict
      if (animationRef.current) {
        animationRef.current.kill()
      }
      gsap.killTweensOf(nameRef.current.querySelectorAll(".letter"))
      
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false)
          document.body.style.overflow = ""
          // Clean up will-change
          if (nameRef.current) {
            const letters = nameRef.current.querySelectorAll(".letter")
            gsap.set(letters, { clearProps: "willChange" })
          }
        }
      })

      // Reset letters to 0 rotation for clean exit
      gsap.set(nameRef.current.querySelectorAll(".letter"), { 
        rotateX: 0,
        force3D: true 
      })

      // Animate name up and fade out - faster exit
      tl.to(nameRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.5, // Reduced from 0.8
        ease: "power2.in",
        force3D: true
      })
      
      // Slide up background
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.6, // Reduced from 0.8
        ease: "power2.inOut",
        force3D: true
      }, "-=0.3") // Increased overlap for smoother transition
    }
  }, [progress, minTimeElapsed])

  if (!shouldRender) return null

  const name = "Mitakashime"

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505] text-white perspective-1000"
      style={{ 
        perspective: "1000px",
        willChange: "transform" 
      }}
    >
      <div 
        ref={nameRef}
        className="relative flex text-4xl md:text-6xl font-bold tracking-wider"
        style={{ 
          transformStyle: "preserve-3d",
          willChange: "transform, opacity"
        }}
      >
        {name.split("").map((char, i) => (
          <span 
            key={i} 
            className="letter inline-block"
            style={{ 
              backfaceVisibility: "hidden",
              display: "inline-block",
              textShadow: "0 4px 8px rgba(0,0,0,0.5)",
              willChange: "transform, opacity"
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
})

// Preload critical 3D assets to ensure they are tracked by useProgress
useGLTF.preload("/falcon_9_spacex_rocket/scene.gltf")
useGLTF.preload("/scene.gltf")
