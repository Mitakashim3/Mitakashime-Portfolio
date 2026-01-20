"use client"

import { motion } from "framer-motion"
import { Palette, Type, MousePointerClick } from "lucide-react"
import { DesignProject } from "@/constants/design-projects"
import { CurvedCarousel } from "./CurvedCarousel"

export function ProjectShowcase({ project, index }: { project: DesignProject; index: number }) {
  // Combine hero + details for the carousel
  const allImages = [project.imageUrl, ...project.detailImages, project.imageUrl, ...project.detailImages]

  return (
    <section className="min-h-screen py-20 flex flex-col justify-center border-b border-white/5 last:border-0 relative">
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            background: `radial-gradient(circle at ${index % 2 === 0 ? '20%' : '80%'} 50%, ${project.palette?.[0] || '#fff'}, transparent 50%)`
        }}
      />

      <div className="container mx-auto px-4 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
                <span className="text-primary font-mono text-sm mb-2 block tracking-wider">0{index + 1} — UI/UX CASE STUDY</span>
                <h2 className="text-4xl md:text-7xl font-bold text-white font-[var(--font-archivo)] mb-6 leading-none">
                {project.title}
                </h2>
                <p className="text-xl text-gray-400 font-[var(--font-space-mono)] max-w-xl">
                {project.description}
                </p>
            </div>
            
            {/* Design System Bits - Compact */}
            <div className="flex gap-4 md:gap-8 flex-wrap">
                {/* Palette */}
                {project.palette && (
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
                            <Palette className="w-3 h-3" /> Palette
                        </span>
                        <div className="flex -space-x-2">
                            {project.palette.map((c, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border border-white/10 shadow-lg" style={{ backgroundColor: c }} />
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Typography */}
                {project.typography && (
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
                             <Type className="w-3 h-3" /> Type
                        </span>
                        <div className="px-3 py-1.5 rounded border border-white/10 bg-white/5 text-sm text-gray-300 font-medium">
                            {project.typography}
                        </div>
                    </div>
                )}

                 {/* Button */}
                 {project.buttonStyle && (
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
                             <MousePointerClick className="w-3 h-3" /> Interactivity
                        </span>
                         <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                ...project.buttonStyle.css,
                                padding: "8px 16px",
                                fontSize: "12px"
                            } as any}
                         >
                            {project.buttonStyle.label}
                         </motion.button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* The 3D Carousel Row */}
      <div className="w-full relative z-10">
        <CurvedCarousel images={allImages} />
      </div>
    </section>
  )
}
