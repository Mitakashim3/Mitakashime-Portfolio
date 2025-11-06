"use client"

import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import { GalaxyBackground } from "@/components/galaxy-background"
import { HERO } from "@/constants/content"

type Props = {
  scrollY: number
  componentScale: number
  onScrollTo: (id: string) => void
}

export function Hero({ scrollY, componentScale, onScrollTo }: Props) {
  const heroRef = useRef<HTMLElement>(null)
  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      style={{ transform: `scale(${componentScale}) translateY(${scrollY * 0.1}px)` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/10 to-background/30 z-20" />
      <div className="relative z-40 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance animate-pulse font-sans">{HERO.title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-pretty backdrop-blur-sm bg-background/20 rounded-lg p-4 font-mono">{HERO.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onScrollTo(HERO.primaryCta.target)} className="bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 font-mono px-6 py-3 rounded-md">{HERO.primaryCta.label}</button>
            <button onClick={() => onScrollTo(HERO.secondaryCta.target)} className="hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 font-mono text-white border border-primary/50 px-6 py-3 rounded-md">{HERO.secondaryCta.label}</button>
          </div>
        </div>
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 mx-auto text-primary" />
        </div>
      </div>
    </section>
  )
}



