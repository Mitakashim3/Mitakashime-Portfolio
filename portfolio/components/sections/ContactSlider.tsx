"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useChromeVersion } from "@/hooks/use-chrome-version"
import { cn } from "@/lib/utils"

export function ContactSlider() {
  const [isHovered, setIsHovered] = useState(false)
  const chrome = useChromeVersion()

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
        <div className={cn(
          "p-2 rounded-full border border-primary/20 hover:border-primary/50 transition-colors",
          chrome.supportsBackdropFilter ? "bg-background/20 backdrop-blur-sm" : "bg-background/90"
        )}>
          <ChevronDown className="w-5 h-5 text-primary/50 hover:text-primary transition-colors" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-full mr-3 whitespace-nowrap border border-primary/50 px-3 py-1.5 rounded-md text-primary font-[var(--font-orbitron)] text-xs tracking-widest shadow-[0_0_10px_rgba(0,255,0,0.2)] pointer-events-none",
            chrome.supportsBackdropFilter ? "bg-black/80 backdrop-blur-md" : "bg-black"
          )}
        >
          CONTACT ME?
        </motion.div>
      </motion.button>
    </div>
  )
}
