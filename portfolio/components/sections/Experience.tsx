"use client"

import { useRef, memo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { EXPERIENCE } from "@/constants/content"
import { SectionTitle } from "@/components/ui/section-title"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type Props = { scrollY: number; componentScale: number }

export const Experience = memo(function Experience({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".experience-card")
    const borders = gsap.utils.toArray<HTMLElement>(".card-border")

    cards.forEach((card, i) => {
      const border = borders[i]

      // Create a timeline for synchronized animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate card: blur, opacity, and scale
      tl.fromTo(card,
        {
          filter: "blur(15px)",
          opacity: 0.2,
          scale: 0.95
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.2,
        }
      )

      // Animate border height synchronized with card reveal
      tl.fromTo(border,
        {
          height: "0%"
        },
        {
          height: "100%",
          duration: 0.8,
          ease: "power2.out",
        },
        0
      )
    })

  }, { scope: containerRef })

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-24 px-4 md:px-8 relative z-40" 
      style={{ transform: `scale(${componentScale})` }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Experience & Education" className="mb-16" />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <div 
              key={exp.title}
              className="experience-card relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-colors duration-300">
              {/* Animated left border accent */}
              <div 
                className="card-border absolute left-0 top-0 w-1 bg-gradient-to-b from-primary to-primary/40 rounded-full"
                style={{ height: "0%" }}
              />

              <div className="ml-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 font-sans">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-semibold font-sans text-base sm:text-lg">
                      {exp.organization}
                    </p>
                  </div>
                  <span className="font-mono text-xs sm:text-sm text-zinc-400 md:text-base">
                    {exp.period}
                  </span>
                </div>
                <p className="leading-relaxed text-zinc-300 font-sans">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})



