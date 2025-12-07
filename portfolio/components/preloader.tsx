"use client"

import { useEffect, useRef, useState } from "react"
import { useProgress, useGLTF } from "@react-three/drei"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function Preloader() {
  const { active, progress } = useProgress()
  const [shouldRender, setShouldRender] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  // Minimum display time state
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden"
    
    // Minimum display time timer (2 seconds)
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 2000)

    return () => {
      document.body.style.overflow = ""
      clearTimeout(timer)
    }
  }, [])

  useGSAP(() => {
    if (!nameRef.current) return

    const letters = nameRef.current.querySelectorAll(".letter")
    
    // Initial set
    gsap.set(letters, {
      transformOrigin: "50% 50% -20px", // Axis of rotation
      rotateX: 0,
      opacity: 1
    })

    // Looping "Cube Down" Animation
    // We use a timeline that repeats indefinitely while loading
    const tl = gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 0.5,
      defaults: { ease: "power3.inOut" }
    })

    // Animate each letter rotating 360 degrees on X axis (tumbling down)
    tl.to(letters, {
      rotateX: -360,
      duration: 1.2,
      stagger: 0.1, // "M then I then T"
    })

    // Cleanup function to kill timeline when component unmounts or updates
    return () => {
      tl.kill()
    }

  }, { scope: containerRef })

  // Exit animation
  useEffect(() => {
    const isLoaded = progress === 100 && minTimeElapsed
    
    if (isLoaded && containerRef.current && nameRef.current) {
      // Kill any active animations on the letters to prevent conflict
      gsap.killTweensOf(nameRef.current.querySelectorAll(".letter"))
      
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false)
          document.body.style.overflow = ""
        }
      })

      // Reset letters to 0 rotation for clean exit
      gsap.set(nameRef.current.querySelectorAll(".letter"), { rotateX: 0 })

      // Animate name up and fade out
      tl.to(nameRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
      })
      
      // Slide up background
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.4")
    }
  }, [progress, minTimeElapsed])

  if (!shouldRender) return null

  const name = "Mitakashime"

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505] text-white perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <div 
        ref={nameRef}
        className="relative flex text-4xl md:text-6xl font-bold tracking-wider"
        style={{ transformStyle: "preserve-3d" }}
      >
        {name.split("").map((char, i) => (
          <span 
            key={i} 
            className="letter inline-block"
            style={{ 
              backfaceVisibility: "hidden",
              display: "inline-block",
              textShadow: "0 4px 8px rgba(0,0,0,0.5)"
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}

// Preload critical 3D assets to ensure they are tracked by useProgress
useGLTF.preload("/falcon_9_spacex_rocket/scene.gltf")
useGLTF.preload("/scene.gltf")
