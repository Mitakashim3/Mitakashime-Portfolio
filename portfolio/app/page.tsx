"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
// Dynamic import client-only heavy components to avoid SSR/client markup mismatch
const BlackHole = dynamic(() => import("@/components/black-hole").then((m) => m.BlackHole), { ssr: false })
const GalaxyBackground = dynamic(() => import("@/components/galaxy-background").then((m) => m.GalaxyBackground), { ssr: false })
import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Experience } from "@/components/sections/Experience"
import { Contact } from "@/components/sections/Contact"
import { NAV_SECTIONS } from "@/constants/links"

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const currentSection = NAV_SECTIONS.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })
      setActiveSection((currentSection as string) || "")
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const maxScroll = 4000
  const squeezeIntensity = Math.min(1, scrollY / maxScroll)
  const componentScale = 1 - squeezeIntensity * 0.05

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Fixed position galaxy background that spans the entire viewport */}
      <div className="fixed inset-0 w-full h-full z-0">
        <GalaxyBackground scrollY={scrollY} />
      </div>
      
      {/* Main content with proper z-index to appear above background */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} visible={scrollY > 2000} />
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

      {/* Scroll to top button */}
      {scrollY > 500 && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0]
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 bg-primary/90 hover:bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  )
}

