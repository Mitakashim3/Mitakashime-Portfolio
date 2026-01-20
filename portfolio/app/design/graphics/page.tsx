"use client"

import { motion } from "framer-motion"
import { DESIGN_PROJECTS } from "@/constants/design-projects"
import { GraphicDesignMasonry } from "@/components/sections/design/GraphicDesignMasonry"

export default function GraphicsPage() {
  const projects = DESIGN_PROJECTS.filter(p => p.category === "graphic")

  return (
    <div className="space-y-12">
      <div className="space-y-4 max-w-2xl">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold font-[var(--font-archivo)] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Graphic Design
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          A collection of brand identities, logos, and visual experiments.
        </motion.p>
      </div>

      <GraphicDesignMasonry projects={projects} />
    </div>
  )
}
