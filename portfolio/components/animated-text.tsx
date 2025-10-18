"use client"

import { motion } from "framer-motion"
import { useScrollVisibility } from "@/hooks/use-scroll-visibility"
import { useRef } from "react"

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useScrollVisibility(ref)

  return (
    <motion.div
      ref={ref}
      initial={{ color: "rgb(156 163 175)" }} // text-muted-foreground equivalent
      animate={{ 
        color: isVisible ? "rgb(255 255 255)" : "rgb(156 163 175)",
      }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}