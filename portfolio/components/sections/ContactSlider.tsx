"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function ContactSlider() {
  const [isHovered, setIsHovered] = useState(false)

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col items-end">
      {/* Trigger Arrow */}
      <motion.button
        onClick={scrollToContact}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-2 rounded-full bg-background/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-colors">
          <ChevronDown className="w-5 h-5 text-primary/50 hover:text-primary transition-colors" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 -translate-y-1/2 right-full mr-3 whitespace-nowrap bg-black/80 backdrop-blur-md border border-primary/50 px-3 py-1.5 rounded-md text-primary font-[var(--font-orbitron)] text-xs tracking-widest shadow-[0_0_10px_rgba(0,255,0,0.2)] pointer-events-none"
        >
          CONTACT ME?
        </motion.div>
      </motion.button>
    </div>
  )
}
