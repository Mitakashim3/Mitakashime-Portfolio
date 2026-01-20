"use client"

import { motion } from "framer-motion"
import { DESIGN_PROJECTS } from "@/constants/design-projects"
import { ProjectShowcase } from "@/components/sections/design/ProjectShowcase"

export default function UiUxPage() {
  const projects = DESIGN_PROJECTS.filter(p => p.category === "ui-ux")

  return (
    <div className="min-h-screen">
      {/* Intro Header */}
      <div className="py-24 text-center max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-5xl md:text-8xl font-black font-[var(--font-archivo)] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          VISUAL
          <br />
          EXPERIENCE
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-lg md:text-xl font-[var(--font-space-mono)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Selected works showcasing interface design, motion, and interactivity.
        </motion.p>
      </div>

      {/* Projects List */}
      <div className="space-y-0">
        {projects.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}
