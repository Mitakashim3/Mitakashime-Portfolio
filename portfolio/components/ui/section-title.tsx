"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface SectionTitleProps {
  title: string
  className?: string
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const letters = lettersRef.current.filter(Boolean)
    if (!letters.length) return

    gsap.fromTo(
      letters,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={cn("mb-6 md:mb-8 text-center", className)}>
      <h2 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg inline-block">
        {title.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el }}
            className="inline-block"
            style={{ minWidth: char === " " ? "0.3em" : "auto" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
    </div>
  )
}
