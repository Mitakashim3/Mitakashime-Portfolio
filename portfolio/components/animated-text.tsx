"use client"

import { motion } from "framer-motion"
import { useScrollVisibility } from "@/hooks/use-scroll-visibility"
import { useEffect, useMemo, useRef, useState } from "react"

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useScrollVisibility(ref)

  const realText = useMemo(() => {
    const text = Array.isArray(children)
      ? (children as any[]).join("")
      : typeof children === "string"
        ? children
        : (children as any)?.toString?.() ?? ""
    return text
  }, [children])

  const loremSource =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
  const targetLorem = useMemo(() => {
    if (!realText) return ""
    let out = ""
    while (out.length < realText.length) out += loremSource
    return out.slice(0, realText.length)
  }, [realText])

  const [displayText, setDisplayText] = useState<string>(targetLorem)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    setDisplayText(targetLorem)
  }, [targetLorem])

  useEffect(() => {
    const fromText = displayText
    const toText = isVisible ? realText : targetLorem

    if (fromText === toText) {
      setIsAnimating(false)
      return
    }

    setIsAnimating(true)

    let index = 0
    const maxLen = Math.min(fromText.length, toText.length)
    const stepMs = 5 // ~5ms per character

    const intervalId = window.setInterval(() => {
      index += 1
      if (index > maxLen) {
        window.clearInterval(intervalId)
        setDisplayText(toText)
        setIsAnimating(false)
        return
      }
      const next = toText.slice(0, index) + fromText.slice(index)
      setDisplayText(next)
    }, stepMs)

    return () => {
      window.clearInterval(intervalId)
    }
    // We intentionally depend on isVisible and the two target strings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, realText, targetLorem])

  return (
    <motion.div
      ref={ref}
      initial={{ color: "rgb(156 163 175)" }}
      animate={{ color: isVisible ? "rgb(255 255 255)" : "rgb(156 163 175)" }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <span>{displayText}</span>
      {isAnimating && <span className="type-cursor">&#9608;</span>}
    </motion.div>
  )
}