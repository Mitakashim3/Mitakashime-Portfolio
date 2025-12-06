"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SKILLS } from "@/constants/skills"
import { cn } from "@/lib/utils"
import { Code2, Database, Wrench, Cpu } from "lucide-react"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type Props = { scrollY: number; componentScale: number }

const CATEGORY_ICONS = {
  frontend: Code2,
  backend: Database,
  tools: Wrench,
  specializations: Cpu,
}

const CATEGORY_TITLES = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools & Platforms",
  specializations: "Specializations",
}

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <div className="group/skill relative">
      <div className="flex justify-between mb-1.5 items-center">
        <span className="text-sm font-medium text-muted-foreground group-hover/skill:text-primary transition-colors duration-300 font-mono flex items-center gap-2">
          {name}
        </span>
        <span className="text-xs font-mono text-primary/80">
          <span className="skill-number" data-level={level}>0</span>%
        </span>
      </div>
      <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/5">
        <div 
          className="skill-bar-fill bg-gradient-to-r from-primary to-primary/60 h-full rounded-full relative"
          data-level={level}
          style={{ width: "0%" }}
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 animate-pulse" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  )
}

export function Skills({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate categories in
    tl.from(".skill-category", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    })

    // Animate bars filling and numbers counting
    // We use a separate animation for this to run in parallel or slightly after
    const bars = gsap.utils.toArray<HTMLElement>(".skill-bar-fill")
    const numbers = gsap.utils.toArray<HTMLElement>(".skill-number")

    bars.forEach((bar, i) => {
      const level = bar.dataset.level
      
      gsap.to(bar, {
        width: `${level}%`,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2 + (i * 0.05), // Stagger effect across all bars
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      })
    })

    numbers.forEach((num, i) => {
      const level = parseInt(num.dataset.level || "0")
      
      gsap.to(num, {
        innerText: level,
        duration: 1.5,
        snap: { innerText: 1 },
        ease: "power2.out",
        delay: 0.2 + (i * 0.05),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      })
    })

  }, { scope: containerRef })

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-24 px-4 md:px-8 relative z-40 w-full" 
      style={{ transform: `scale(${componentScale})` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and development stack.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {(Object.entries(SKILLS) as [keyof typeof SKILLS, typeof SKILLS.frontend][]).map(([category, skills], idx) => {
            const Icon = CATEGORY_ICONS[category]
            return (
              <div key={category} className="skill-category group">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans tracking-wide">
                    {CATEGORY_TITLES[category]}
                  </h3>
                </div>
                
                <div className="space-y-5">
                  {skills.map((s, i) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



