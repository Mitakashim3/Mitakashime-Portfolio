"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { useChromeVersion } from "@/hooks/use-chrome-version"

// Dynamic import client-only heavy components with loading states
const BlackHole = dynamic(() => import("@/components/black-hole").then((m) => m.BlackHole), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
})

const GalaxyBackground = dynamic(() => import("@/components/galaxy-background").then((m) => m.GalaxyBackground), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />
})

const Rocket3D = dynamic(() => import("@/components/rocket-3d"), { 
  ssr: false,
  loading: () => null
})

import { ContactSlider } from "@/components/sections/ContactSlider"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Experience } from "@/components/sections/Experience"
import { Contact } from "@/components/sections/Contact"
import { Preloader } from "@/components/preloader"
import { BrowserNotice } from "@/components/browser-notice"

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [isLaunching, setIsLaunching] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const capabilities = useDeviceCapabilities()
  const chrome = useChromeVersion()

  // Prevent loading heavy desktop-only UI before we know device capabilities.
  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleScrollToTop = useCallback(() => {
    setIsLaunching(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => setIsLaunching(false), 2500)
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  const maxScroll = 4000
  const squeezeIntensity = Math.min(1, scrollY / maxScroll)
  const componentScale = 1 - squeezeIntensity * 0.05

  // Treat tablets as non-mobile for the rocket.
  const isHandset = hasMounted ? (capabilities.isMobile && !capabilities.isTablet) : true

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Preloader />
      <BrowserNotice />
      {/* Fixed position galaxy background that spans the entire viewport */}
      <div className="fixed inset-0 w-full h-full z-0">
        <GalaxyBackground scrollY={scrollY} />
      </div>
      
      {/* Contact Slider - replaces Navbar */}
      <ContactSlider />
      
      {/* Main content with proper z-index to appear above background */}
      <div className="relative z-10">
        <Hero scrollY={scrollY} componentScale={componentScale} onScrollTo={scrollToSection} />
        <About scrollY={scrollY} componentScale={componentScale} />
        <Projects scrollY={scrollY} componentScale={componentScale} />
        <Skills scrollY={scrollY} componentScale={componentScale} />
        <Experience scrollY={scrollY} componentScale={componentScale} />
        <Contact scrollY={scrollY} componentScale={componentScale} />
      </div>

      {/* Blackhole footer */}
      <section id="blackhole" className="relative z-50 h-[300px] sm:h-[400px] md:h-[500px]" aria-hidden={false}>
        <div className="absolute inset-0 bg-linear-to-t from-transparent via-transparent to-transparent pointer-events-none" />
        <div className="relative w-full h-full">
          <BlackHole />
        </div>
        {/* 3D Model Attribution */}
        <a 
          href="https://sketchfab.com/3d-models/blackhole-74cbeaeae2174a218fe9455d77902b5c" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 text-[10px] text-white/20 hover:text-white/50 transition-colors duration-300"
          title="3D Model by rubykamen on Sketchfab"
        >
          3D: rubykamen
        </a>
      </section>

      {/* Scroll to top button - Always rendered but hidden to prevent mount lag */}
      {isHandset ? (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: (scrollY > 500 || isLaunching) ? 1 : 0,
            y: (scrollY > 500 || isLaunching) ? [0, -4, 0] : 100,
            pointerEvents: scrollY > 500 ? "auto" : "none"
          }}
          transition={{
            opacity: { duration: 0.2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/20 transition-colors touch-manipulation flex items-center justify-center"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: (scrollY > 500 || isLaunching) ? 1 : 0,
            y: (scrollY > 500 || isLaunching) ? [0, -8, 0] : 100,
            pointerEvents: scrollY > 500 ? "auto" : "none"
          }}
          transition={{
            opacity: { duration: 0.2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={handleScrollToTop}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Scroll to top"
          className="fixed bottom-0.5 right-1 z-50 w-28 h-[50vh] flex items-end justify-center cursor-pointer p-0 bg-transparent overflow-visible"
        >
          <div className="w-28 h-screen relative z-10 pointer-events-none overflow-visible">
            <Rocket3D isHovered={isHovered} isLaunching={isLaunching} />
          </div>
        </motion.button>
      )}
    </div>
  )
}