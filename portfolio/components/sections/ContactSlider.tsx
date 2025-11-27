"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Mail, Github, Linkedin } from "lucide-react"
import { LINKS } from "@/constants/links"

export function ContactSlider() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="fixed top-4 right-4 z-[100] flex flex-col items-end"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Trigger Arrow */}
      <motion.div
        className="relative cursor-pointer"
        animate={{ 
          opacity: isExpanded ? 0 : 1,
          y: isExpanded ? -10 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-2 rounded-full bg-background/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-colors">
          <ChevronDown className="w-5 h-5 text-primary/50 hover:text-primary transition-colors" />
        </div>
      </motion.div>

      {/* Expanded Contact Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="absolute top-0 right-0 bg-background/80 backdrop-blur-md border border-primary/30 rounded-xl p-4 shadow-2xl shadow-primary/10 min-w-[180px]"
          >
            <p className="text-xs text-muted-foreground font-mono mb-3 uppercase tracking-wider">Contact</p>
            
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${LINKS.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">Email</span>
              </a>
              
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
              >
                <Github className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">GitHub</span>
              </a>
              
              <a
                href={`https://${LINKS.linkedin.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">LinkedIn</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
