"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function ContactSlider() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col items-end">
      {/* Trigger Arrow */}
      <motion.button
        onClick={scrollToContact}
        className="relative cursor-pointer outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-2 rounded-full bg-background/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-colors">
          <ChevronDown className="w-5 h-5 text-primary/50 hover:text-primary transition-colors" />
        </div>
      </motion.button>
    </div>
  )
}
