"use client"

import { useRef, memo } from "react"
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
  frontend: "Frontend Development",
  backend: "Backend Infrastructure",
  tools: "Tools & Environment",
  specializations: "Core Specializations",
}

const SkillItem = memo(function SkillItem({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <div className="group/skill relative py-2">
      <div className="flex justify-between mb-2 items-center">
        <span className="text-base font-medium text-zinc-100 group-hover/skill:text-primary transition-colors duration-300 font-sans tracking-wide drop-shadow-md">
          {name}
        </span>
        <span className="text-sm font-mono text-primary font-bold drop-shadow-md">
          <span className="skill-number" data-level={level}>0</span>%
        </span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
        <div 
          className="skill-bar-fill bg-linear-to-r from-primary to-primary/60 h-full rounded-full relative shadow-[0_0_15px_rgba(var(--primary),0.5)]"
          data-level={level}
          style={{ width: "0%" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/80 shadow-[0_0_10px_2px_rgba(255,255,255,0.6)] opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  )
})

export const Skills = memo(function Skills({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const categories = gsap.utils.toArray<HTMLElement>(".skill-category")
    
    categories.forEach((category, i) => {
      // Zipper effect: Even index (Left) comes from x: -100, Odd index (Right) comes from x: 100
      const xOffset = i % 2 === 0 ? -100 : 100
      
      gsap.fromTo(category, 
        { 
          opacity: 0, 
          x: xOffset 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Staggered animation for bars and numbers
    const bars = gsap.utils.toArray<HTMLElement>(".skill-bar-fill")
    const numbers = gsap.utils.toArray<HTMLElement>(".skill-number")

    // Create a timeline for each bar to sync bar fill and number count
    bars.forEach((bar, i) => {
      const level = parseInt(bar.dataset.level || "0")
      const number = numbers[i]
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bar,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate bar and number simultaneously with stagger
      tl.to(bar, {
        width: `${level}%`,
        duration: 1.2,
        ease: "power2.out",
        delay: i * 0.15,
        force3D: true,
      }, 0)
      
      tl.to(number, {
        innerText: level,
        duration: 1.2,
        snap: { innerText: 1 },
        ease: "power2.out",
        delay: i * 0.15,
      }, 0)
    })

  }, { scope: containerRef })

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-24 px-4 md:px-8 relative z-40 w-full min-h-screen flex flex-col justify-center overflow-hidden" 
      style={{ transform: `scale(${componentScale})` }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/50 drop-shadow-lg">
            Technical Arsenal
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-lg drop-shadow-md">
            A curated stack of technologies I use to build immersive digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {(Object.entries(SKILLS) as [keyof typeof SKILLS, typeof SKILLS.frontend][]).map(([category, skills], idx) => {
            const Icon = CATEGORY_ICONS[category]
            return (
              <div 
                key={category} 
                className="skill-category group"
              >
                {/* Header */}
                <div className={`flex items-center gap-4 mb-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row md:flex-row-reverse'}`}>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-bold text-white font-sans tracking-wide drop-shadow-lg ${idx % 2 === 0 ? 'text-left' : 'text-left md:text-right'}`}>
                    {CATEGORY_TITLES[category]}
                  </h3>
                </div>
                
                {/* Skills List */}
                <div className="space-y-6">
                  {skills.map((s, i) => (
                    <SkillItem key={s.name} name={s.name} level={s.level} index={i} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
})



