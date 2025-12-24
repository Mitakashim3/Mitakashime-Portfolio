"use client"

import { useEffect, useRef, useState, memo, useMemo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { PROJECTS } from "@/constants/projects"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, FolderOpen, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { useChromeVersion } from "@/hooks/use-chrome-version"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Image Carousel Component - memoized and optimized
const ImageCarousel = memo(function ImageCarousel({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]))

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length
        // Preload next image
        setLoadedImages(loaded => new Set([...loaded, next, (next + 1) % images.length]))
        return next
      })
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
          loading={loadedImages.has(idx) ? "eager" : "lazy"}
          initial={false}
          animate={{ 
            opacity: idx === currentIndex ? 1 : 0,
            scale: idx === currentIndex ? 1 : 1.05 
          }}
          transition={{ duration: 0.5 }}
          style={{ willChange: "transform, opacity" }}
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
})

type Props = {
  scrollY?: number
  componentScale?: number
}

export const Projects = memo(function Projects({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const capabilities = useDeviceCapabilities()
  const chrome = useChromeVersion()
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  // Disable complex scroll animations on mobile - use carousel instead
  const useMobileLayout = capabilities.isMobile || capabilities.isTablet

  // Adjust scrub speed based on device and Chrome version
  const scrubSpeed = useMemo(() => {
    if (capabilities.isMobile) return 0.8
    if (capabilities.isLowEnd) return 0.7
    if (chrome.isChrome && chrome.version !== null && chrome.version < 100) return 0.8
    return 0.5
  }, [capabilities.isMobile, capabilities.isLowEnd, chrome.isChrome, chrome.version])

  // Only use GSAP scroll animations on desktop
  useGSAP(() => {
    if (useMobileLayout) {
      // Clean up any existing ScrollTriggers on mobile
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
      return
    }

    const cards = cardsRef.current.filter(Boolean)
    if (!cards.length) return

    // Clean up previous ScrollTriggers before creating new ones
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === containerRef.current) {
        trigger.kill()
      }
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: scrubSpeed,
        anticipatePin: 1,
      }
    })

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return

      tl.to(card, {
        yPercent: -120,
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        force3D: true,
      }, ">-0.1")
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }

  }, { scope: containerRef, dependencies: [scrubSpeed, useMobileLayout] })

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % PROJECTS.length)
  }

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
  }

  // Mobile: Horizontal swipeable carousel
  if (useMobileLayout) {
    return (
      <section 
        id="projects"
        className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 z-40"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-white">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-sm">
              {currentProjectIndex + 1} of {PROJECTS.length}
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProjectIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Image */}
                <div className="w-full h-56 relative bg-black/50 p-3">
                  <ImageCarousel 
                    images={PROJECTS[currentProjectIndex].images || [PROJECTS[currentProjectIndex].image]} 
                    title={PROJECTS[currentProjectIndex].title} 
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary/80">
                      <FolderOpen className="w-4 h-4" />
                      <span className="text-xs font-mono">PROJECT {String(currentProjectIndex + 1).padStart(2, '0')}</span>
                    </div>
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-xs">
                      {PROJECTS[currentProjectIndex].tech[0]}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white">
                    {PROJECTS[currentProjectIndex].title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {PROJECTS[currentProjectIndex].description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {PROJECTS[currentProjectIndex].tech.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-muted-foreground font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {PROJECTS[currentProjectIndex].tech.length > 4 && (
                      <span className="px-2 py-1 text-xs text-muted-foreground">
                        +{PROJECTS[currentProjectIndex].tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex gap-3">
                    {PROJECTS[currentProjectIndex].href && (
                      <Button asChild className="flex-1 bg-primary text-black hover:bg-primary/90 h-10">
                        <Link href={PROJECTS[currentProjectIndex].href} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" asChild className="flex-1 border-white/20 hover:bg-white/10 h-10">
                      <Link href="https://github.com" target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevProject}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {PROJECTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentProjectIndex(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === currentProjectIndex 
                        ? "w-8 bg-primary" 
                        : "w-2 bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextProject}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Swipe instruction */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              Swipe or use arrows to browse
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Desktop: Pinned scroll stacking layout
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
})



