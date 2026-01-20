"use client"

import { useEffect, useRef, useState, memo } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export const Preloader = memo(function Preloader() {
  const [shouldRender, setShouldRender] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  
  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden"
    
    // Shorter preloader duration
    const timer = setTimeout(() => {
      if (containerRef.current && nameRef.current) {
        // Kill any active animations
        if (animationRef.current) {
          animationRef.current.kill()
        }
        gsap.killTweensOf(nameRef.current.querySelectorAll(".letter"))
        
        const tl = gsap.timeline({
          onComplete: () => {
            setShouldRender(false)
            document.body.style.overflow = ""
          }
        })

        // Reset to 0 rotation for clean exit
        gsap.set(nameRef.current.querySelectorAll(".letter"), { 
          rotateX: 0,
        })

        // Quick exit animation
        tl.to(nameRef.current, {
          y: -80,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        }, "-=0.2")
      }
    }, 2000) // 2 seconds to show the animation

    return () => {
      document.body.style.overflow = ""
      clearTimeout(timer)
    }
  }, [])

  useGSAP(() => {
    if (!nameRef.current) return

    const letters = nameRef.current.querySelectorAll(".letter")
    
    // Optimized 3D rotation animation
    const tl = gsap.timeline({ 
      repeat: -1,
      repeatDelay: 0.2,
    })

    // Single 360 degree rotation with stagger
    tl.to(letters, {
      rotateX: -360,
      duration: 1.2,
      stagger: 0.06,
      ease: "power1.inOut",
    })

    animationRef.current = tl

    return () => {
      tl.kill()
      animationRef.current = null
    }

  }, { scope: containerRef, dependencies: [] })

  if (!shouldRender) return null

  const name = "Mitakashime"

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white"
      style={{ 
        perspective: "800px",
      }}
    >
      <div 
        ref={nameRef}
        className="relative flex text-4xl md:text-6xl font-bold tracking-wider"
        style={{ 
          transformStyle: "preserve-3d",
        }}
      >
        {name.split("").map((char, i) => (
          <span 
            key={i} 
            className="letter inline-block"
            style={{ 
              transformOrigin: "50% 50%",
              backfaceVisibility: "hidden",
              textShadow: "0 4px 8px rgba(0,0,0,0.5)",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
})
