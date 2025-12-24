"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState, memo } from "react"

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  once?: boolean
}

const JWT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-"

export const AnimatedText = memo(function AnimatedText({ children, className = "", once = false }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.2, once })
  const [displayText, setDisplayText] = useState("")
  
  const textContent = typeof children === "string" ? children : String(children)

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isInView) {
      const words = textContent.split(" ")
      let currentWordIndex = 0
      let ticks = 0
      
      interval = setInterval(() => {
        const currentText = words.map((word, index) => {
          if (index < currentWordIndex) {
            return word
          }
          // Preserve length of each word, scramble characters
          return word.split('').map(char => {
             // Keep punctuation/spaces if needed, but user asked for JWT style
             // We'll just scramble everything that isn't a space (since we split by space)
             return JWT_CHARS[Math.floor(Math.random() * JWT_CHARS.length)]
          }).join('')
        }).join(" ")
        
        setDisplayText(currentText)
        
        // Reveal a new word every 3 ticks (approx 90-100ms)
        if (ticks % 3 === 0) {
          currentWordIndex++
        }
        ticks++
        
        if (currentWordIndex > words.length) {
          clearInterval(interval)
          setDisplayText(textContent)
        }
      }, 30)
      
    } else {
      if (!once) {
        // Reset to full scramble state
        setDisplayText(
          textContent.split(" ").map(word => 
            word.split('').map(() => JWT_CHARS[Math.floor(Math.random() * JWT_CHARS.length)]).join('')
          ).join(" ")
        )
      }
    }

    return () => clearInterval(interval)
  }, [isInView, textContent, once])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: "opacity" }}
    >
      {displayText}
    </motion.div>
  )
})