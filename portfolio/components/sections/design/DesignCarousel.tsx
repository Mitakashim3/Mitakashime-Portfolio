"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Palette, Type, MousePointerClick } from "lucide-react"
import { DesignProject } from "@/constants/design-projects"
import { Button } from "@/components/ui/button"

function DesignCard({ project }: { project: DesignProject }) {
  return (
    <div className="relative flex-[0_0_100%] min-w-0 pl-4 md:basis-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden p-6 md:p-10">
        {/* Left: Visuals */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-archivo)]">
              {project.title}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg">
              {project.description}
            </p>
          </div>
          
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl group">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs text-white border border-white/20">
                Mockup Preview
              </span>
            </div>
          </div>
        </div>

        {/* Right: Style System */}
        <div className="flex flex-col justify-center space-y-8 p-4 md:p-8 bg-black/20 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-white font-mono">Color Palette</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.palette?.map((color, idx) => (
              <div key={idx} className="space-y-2 group cursor-pointer">
                <div 
                  className="h-16 w-full rounded-lg shadow-lg border border-white/10 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: color }}
                />
                <p className="text-xs text-center font-mono text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity">
                  {color}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-white font-mono">Typography</h3>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/5 space-y-2">
               <p className="text-sm text-gray-500 font-mono">Font Family: {project.typography}</p>
               <h4 className="text-3xl font-bold text-white" style={{ fontFamily: project.typography || 'inherit' }}>
                 Clean & Modern
               </h4>
               <p className="text-gray-300" style={{ fontFamily: project.typography || 'inherit' }}>
                 The quick brown fox jumps over the lazy dog. 1234567890
               </p>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-2">
              <MousePointerClick className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-white font-mono">Interactive Elements</h3>
            </div>
            <div className="p-8 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-4">
               <p className="text-xs text-gray-500 font-mono mb-2">Primary Button Style</p>
               {project.buttonStyle && (
                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={project.buttonStyle.css as any}
                 >
                    {project.buttonStyle.label}
                 </motion.button>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DesignCarousel({ projects }: { projects: DesignProject[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {projects.map((project) => (
            <DesignCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/50 border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-md w-12 h-12"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 backdrop-blur-md">
            {projects.map((_, idx) => (
                <div 
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                        idx === selectedIndex ? "w-8 bg-primary shadow-[0_0_10px_var(--primary)]" : "w-2 bg-white/20"
                    }`}
                />
            ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/50 border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-md w-12 h-12"
          onClick={scrollNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
