"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { PROJECTS } from "@/constants/projects"
import { cn } from "@/lib/utils"
import { Code, Globe, Server, Database, Terminal, Cpu, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ProjectsCarousel() {
  const [theta, setTheta] = useState(0)
  const [radius, setRadius] = useState(400)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippedIndices, setFlippedIndices] = useState<Set<number>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startTheta, setStartTheta] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const totalCards = PROJECTS.length

  const rotateCarousel = useCallback((newTheta: number) => {
    setTheta(newTheta)
    const index = Math.round(Math.abs(newTheta / (360 / totalCards)) % totalCards)
    setCurrentIndex(index >= totalCards ? 0 : index)
  }, [totalCards])

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth <= 768
    setIsMobile(mobile)
    // Smaller radius on mobile for better visibility
    setRadius(mobile ? 250 : 500)
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const prevCard = () => {
    const angle = 360 / totalCards
    rotateCarousel(theta + angle)
  }

  const nextCard = () => {
    const angle = 360 / totalCards
    rotateCarousel(theta - angle)
  }

  const toggleFlip = (index: number) => {
    setFlippedIndices(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX
    setStartX(pageX)
    setStartTheta(theta)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    // e.preventDefault() // Can't prevent default in passive event listener if attached via React? 
    // React synthetic events are passive by default for touch? No.
    
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX
    const diffX = pageX - startX
    const sensitivity = 0.5
    setTheta(startTheta + diffX * sensitivity)
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    
    const pageX = 'changedTouches' in e ? e.changedTouches[0].pageX : (e as React.MouseEvent).pageX
    const diffX = pageX - startX
    
    if (Math.abs(diffX) > 20) {
      if (diffX > 0) {
        // Swipe right -> prev
        const angle = 360 / totalCards
        const snapTheta = Math.round((startTheta + angle) / angle) * angle
        rotateCarousel(snapTheta)
      } else {
        // Swipe left -> next
        const angle = 360 / totalCards
        const snapTheta = Math.round((startTheta - angle) / angle) * angle
        rotateCarousel(snapTheta)
      }
    } else {
      // Snap back
      const angle = 360 / totalCards
      const snapTheta = Math.round(theta / angle) * angle
      rotateCarousel(snapTheta)
    }
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center overflow-hidden perspective-1000 select-none px-4 md:px-0">
      <div 
        className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-500 ease-out"
        style={{ 
          transform: `translateZ(-${radius}px) rotateY(${theta}deg)`,
          transformStyle: 'preserve-3d'
        }}
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
        onMouseLeave={() => isDragging && setIsDragging(false)}
      >
        {PROJECTS.map((project, index) => {
          const angle = (360 / totalCards) * index
          const isFlipped = flippedIndices.has(index)
          
          return (
            <div
              key={index}
              className="absolute cursor-pointer transition-transform duration-500"
              style={{
                width: isMobile ? '240px' : '380px',
                height: isMobile ? '340px' : '500px',
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d'
              }}
              onClick={() => toggleFlip(index)}
            >
              <div 
                className={cn(
                  "relative w-full h-full transition-transform duration-700 preserve-3d",
                  isFlipped ? "rotate-y-180" : ""
                )}
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* Front */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-4 md:p-6 flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-[10px] font-orbitron text-accent mb-2">PROJECT</div>
                  <h3 className="text-lg font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{project.title}</h3>
                  
                  <div className="relative w-full h-32 md:h-48 mb-3 md:mb-4 rounded-lg overflow-hidden bg-black/30 flex items-center justify-center group">
                    {project.image ? (
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <Code className="w-16 h-16 text-primary animate-pulse" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 md:line-clamp-4">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-3 text-[10px] text-center text-slate-400">
                    Click to flip
                  </div>
                </div>

                {/* Back */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-secondary/30 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 md:p-6 flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)] rotate-y-180"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <h3 className="text-lg font-bold text-white mb-3">{project.title}</h3>
                  
                  <div className="grow overflow-y-auto custom-scrollbar pr-2">
                    <p className="text-xs text-slate-300 mb-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center pt-3 border-t border-white/10">
                    <div className="flex gap-2">
                      {project.href && (
                        <Link href={project.href} target="_blank" className="text-white hover:text-primary transition-colors">
                          <ExternalLink size={18} />
                        </Link>
                      )}
                      {/* Assuming there might be a github link in the future or if it exists in the type */}
                      {/* <Link href="#" className="text-white hover:text-primary transition-colors">
                        <Github size={20} />
                      </Link> */}
                    </div>
                    <span className="text-[10px] font-orbitron text-accent">
                      {new Date().getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button 
        onClick={prevCard}
        className="absolute left-2 md:left-20 lg:left-40 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/80 border border-primary text-white flex items-center justify-center hover:bg-slate-800 hover:scale-110 transition-all shadow-[0_0_10px_rgba(157,0,255,0.5)] z-10 lg:hover:bg-slate-800"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button 
        onClick={nextCard}
        className="absolute right-2 md:right-20 lg:right-40 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/80 border border-primary text-white flex items-center justify-center hover:bg-slate-800 hover:scale-110 transition-all shadow-[0_0_10px_rgba(157,0,255,0.5)] z-10 lg:hover:bg-slate-800"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>
    </div>
  )
}
