"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, PanInfo } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/animated-text"
import { PROJECTS } from "@/constants/projects"
import { ExternalLink, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

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
      className="relative w-full h-full overflow-hidden bg-muted rounded-lg"
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
          className="absolute inset-0 w-full h-full object-cover"
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
              "h-1 rounded-full transition-all duration-300",
              idx === currentIndex ? "bg-white w-4" : "bg-white/40 w-1"
            )} 
          />
        ))}
      </div>
    </div>
  )
}

type Props = { scrollY: number; componentScale: number }

export function Projects({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const [activeIndex, setActiveIndex] = useState(0)
  const [showAllTech, setShowAllTech] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Listen to scroll progress changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isDragging) return
      
      // More responsive mapping - starts showing content sooner
      const adjustedProgress = Math.max(0, (latest - 0.05) / 0.9)
      const index = Math.min(
        Math.floor(adjustedProgress * PROJECTS.length),
        PROJECTS.length - 1
      )
      
      if (index !== activeIndex && index >= 0) {
        setActiveIndex(index)
        setShowAllTech(false)
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, activeIndex, isDragging])

  // Handle swipe gestures for mobile
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 50
    
    if (info.offset.x < -threshold && activeIndex < PROJECTS.length - 1) {
      setActiveIndex(prev => prev + 1)
      setShowAllTech(false)
    } else if (info.offset.x > threshold && activeIndex > 0) {
      setActiveIndex(prev => prev - 1)
      setShowAllTech(false)
    }
  }

  const activeProject = PROJECTS[activeIndex]

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative z-40" 
      style={{ 
        height: `${PROJECTS.length * 120 + 30}vh`,
      }} 
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-8">
        
        {/* Title Section */}
        <div className="relative z-50 mb-6 w-full text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text font-sans">
            Featured Projects
          </h2>
        </div>

        {/* Main Content Area */}
        <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center">
          
          {/* File Tabs on the left - Desktop only */}
          <div className="hidden lg:flex flex-col gap-1 absolute left-0 top-1/2 -translate-y-1/2 z-40">
            {PROJECTS.map((project, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx)
                  setShowAllTech(false)
                }}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-3 rounded-l-lg text-left transition-all duration-300 origin-right",
                  idx === activeIndex 
                    ? "bg-background/90 border border-r-0 border-primary/30 text-primary shadow-lg translate-x-1" 
                    : "bg-background/40 border border-r-0 border-border/30 text-muted-foreground hover:bg-background/60 hover:text-primary/70"
                )}
                animate={{
                  width: idx === activeIndex ? 180 : 50,
                  opacity: 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <FolderOpen className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  idx === activeIndex ? "text-primary" : "text-muted-foreground"
                )} />
                <motion.span 
                  className="text-xs font-mono truncate"
                  animate={{ opacity: idx === activeIndex ? 1 : 0 }}
                >
                  {project.title.split(' ')[0]}
                </motion.span>
                
                {/* Active indicator line */}
                {idx === activeIndex && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute right-0 top-2 bottom-2 w-0.5 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Main Project Card */}
          <motion.div
            className="relative w-full max-w-4xl h-[70vh] md:h-[65vh] lg:ml-16"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.98 }}
          >
            {/* Card Stack Effect - Background layers */}
            <div className="absolute inset-0">
              {/* Third card (furthest back) */}
              {activeIndex < PROJECTS.length - 2 && (
                <div 
                  className="absolute inset-0 bg-background/30 border border-border/20 rounded-xl"
                  style={{ 
                    transform: "translateX(16px) translateY(16px) scale(0.94)",
                    zIndex: 1 
                  }}
                />
              )}
              {/* Second card */}
              {activeIndex < PROJECTS.length - 1 && (
                <div 
                  className="absolute inset-0 bg-background/50 border border-border/30 rounded-xl"
                  style={{ 
                    transform: "translateX(8px) translateY(8px) scale(0.97)",
                    zIndex: 2 
                  }}
                />
              )}
            </div>

            {/* Active Card */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="w-full h-full overflow-hidden border-primary/20 bg-background/95 backdrop-blur-md shadow-2xl shadow-black/20 rounded-xl">
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* Image Section */}
                  <div className="w-full md:w-1/2 h-[35%] md:h-full p-3 md:p-4">
                    <ImageCarousel 
                      images={activeProject.images || [activeProject.image]} 
                      title={activeProject.title} 
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="w-full md:w-1/2 h-[65%] md:h-full p-4 md:p-6 flex flex-col bg-background/50">
                    
                    {/* Project Number Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] sm:text-xs font-mono text-muted-foreground bg-secondary/30 px-2 py-1 rounded">
                        PROJECT {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-sans mb-3">
                      {activeProject.title}
                    </h3>
                    
                    {/* Description */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar mb-4 min-h-0">
                      <AnimatedText className="leading-relaxed font-mono text-xs sm:text-sm text-muted-foreground">
                        {activeProject.description}
                      </AnimatedText>
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="shrink-0">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(showAllTech ? activeProject.tech : activeProject.tech.slice(0, 5)).map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2 py-0.5 rounded bg-secondary/40 text-[10px] sm:text-xs font-mono border border-secondary/40"
                          >
                            {tech}
                          </span>
                        ))}
                        {!showAllTech && activeProject.tech.length > 5 && (
                          <button 
                            onClick={() => setShowAllTech(true)}
                            className="px-2 py-0.5 rounded bg-primary/20 text-[10px] sm:text-xs font-mono text-primary hover:bg-primary/30 transition-colors"
                          >
                            +{activeProject.tech.length - 5}
                          </button>
                        )}
                      </div>
                      
                      {/* Action Button */}
                      <Button className="w-full group" variant="outline" size="sm">
                        <span className="flex items-center justify-center gap-2">
                          View Project 
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Progress Dots - Desktop Right Side */}
          <div className="hidden md:flex flex-col gap-2 absolute right-4 top-1/2 -translate-y-1/2 z-50">
            {PROJECTS.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx)
                  setShowAllTech(false)
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  idx === activeIndex 
                    ? "bg-primary scale-150" 
                    : idx < activeIndex 
                      ? "bg-primary/50" 
                      : "bg-border hover:bg-primary/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
          <div className="flex gap-2">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx)
                  setShowAllTech(false)
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeIndex 
                    ? "bg-primary w-6" 
                    : "bg-primary/30 w-1.5"
                )}
              />
            ))}
          </div>
        </div>
        
        {/* Swipe Hint - Mobile */}
        <p className="text-[10px] text-muted-foreground/40 font-mono mt-2 md:hidden">
          Swipe to browse
        </p>
      </div>
    </section>
  )
}

