"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { PROJECTS } from "@/constants/projects"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, FolderOpen } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Image Carousel Component
function ImageCarousel({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length, isPaused])

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-lg bg-black/50 flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {images.map((img, idx) => (
        <motion.img
          key={idx}
          src={img || "/placeholder.svg"}
          alt={`${title} - Image ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
          initial={false}
          animate={{ 
            opacity: idx === currentIndex ? 1 : 0,
            scale: idx === currentIndex ? 1 : 1.05 
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
      
      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm",
              idx === currentIndex ? "bg-white w-4" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  )
}

type Props = {
  scrollY?: number
  componentScale?: number
}

export function Projects({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean)
    if (!cards.length) return

    // Create a master timeline for the stacking effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`, // Scroll distance proportional to number of cards
        pin: true,
        scrub: 0.5, // Reduced scrub time for "faster" feel
        anticipatePin: 1,
      }
    })

    // Animate each card (except the last one) to slide up and reveal the next
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return // Last card stays visible

      tl.to(card, {
        yPercent: -120, // Slide up completely out of view
        scale: 0.95, // Slight scale down for depth
        opacity: 0, // Fade out
        duration: 1,
        ease: "power2.inOut", // Smoother but faster feel
      }, ">-0.1") // Minimal overlap for cleaner transition
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Header - Fixed at top of the section */}
      <div className="absolute top-4 md:top-8 left-0 right-0 z-50 text-center px-4 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 drop-shadow-lg">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto drop-shadow-md">
          A curated selection of my recent work.
        </p>
      </div>

      {/* Cards Container - Occupies 75% of height as requested */}
      <div className="relative w-full max-w-[90vw] md:max-w-[85vw] h-[75vh] flex items-center justify-center mt-12">
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            style={{ 
              zIndex: PROJECTS.length - i, // Stack order: First card on top
            }} 
          >
            {/* Opaque Card to fix readability */}
            <div className="w-full h-full bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              
              {/* Image Section - Larger area for desktop screenshots */}
              <div className="w-full md:w-[70%] h-[45%] md:h-full relative bg-black/50 border-b md:border-b-0 md:border-r border-white/5 p-4">
                <ImageCarousel images={project.images || [project.image]} title={project.title} />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-[30%] h-[55%] md:h-full p-6 md:p-8 flex flex-col bg-linear-to-b from-white/5 to-transparent">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-primary/80">
                    <FolderOpen className="w-4 h-4" />
                    <span className="text-xs font-mono tracking-wider">PROJECT {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <Badge variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    {project.tech[0]}
                  </Badge>
                </div>

                {/* Title & Description */}
                <div className="grow overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-muted-foreground font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-auto border-t border-white/10 flex gap-3">
                  {project.href && (
                    <Button asChild className="flex-1 bg-white text-black hover:bg-white/90">
                      <Link href={project.href} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" asChild className="flex-1 border-white/20 hover:bg-white/10 hover:text-white">
                    <Link href="https://github.com" target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      Source
                    </Link>
                  </Button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}



