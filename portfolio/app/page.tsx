"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { BlackHole } from "@/components/black-hole"
import { GalaxyBackground } from "@/components/galaxy-background"
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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Fixed position galaxy background that spans the entire viewport */}
      <div className="fixed inset-0 w-full h-full z-0">
        <GalaxyBackground scrollY={scrollY} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50" />
      </div>
      
      {/* Main content with proper z-index to appear above background */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
        <Hero scrollY={scrollY} componentScale={componentScale} onScrollTo={scrollToSection} />
        <About scrollY={scrollY} componentScale={componentScale} />
        <Projects scrollY={scrollY} componentScale={componentScale} />
        <Skills scrollY={scrollY} componentScale={componentScale} />
        <Experience scrollY={scrollY} componentScale={componentScale} />
        <Contact scrollY={scrollY} componentScale={componentScale} />
      </div>

      {/* Blackhole footer */}
      <section id="blackhole" className="relative z-50 h-[400px]" aria-hidden={false}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none" />
        <div className="relative w-full h-full">
          <BlackHole />
        </div>
      </section>

      {/* Scroll to top button */}
      {scrollY > 500 && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 bg-primary/90 hover:bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  )
}

