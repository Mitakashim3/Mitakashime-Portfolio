"use client"

import { SKILLS } from "@/constants/skills"
import { AnimatedText } from "@/components/animated-text"

type Props = { scrollY: number; componentScale: number }

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="group/skill">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium group-hover/skill:text-primary transition-colors duration-300 font-mono">{name}</span>
        <span className="text-sm text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 hover:shadow-lg hover:shadow-primary/25" style={{ width: `${level}%` }} />
      </div>
    </div>
  )
}

export function Skills({ scrollY, componentScale }: Props) {
  return (
    <section id="skills" className="py-20 px-6 relative z-40" style={{ transform: `scale(${componentScale})` }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-sans">Skills & Technologies</h2>
        <div className="grid md:grid-cols-3 gap-8" style={{ transform: `translateY(${scrollY * 0.015}px)` }}>
          <div className="group">
            <h3 className="text-xl font-semibold mb-4 text-primary group-hover:scale-105 transition-transform duration-300 font-sans">Frontend</h3>
            <div className="space-y-3">{SKILLS.frontend.map((s) => (<SkillBar key={s.name} name={s.name} level={s.level} />))}</div>
          </div>
          <div className="group">
            <h3 className="text-xl font-semibold mb-4 text-primary group-hover:scale-105 transition-transform duration-300 font-sans">Backend</h3>
            <div className="space-y-3">{SKILLS.backend.map((s) => (<SkillBar key={s.name} name={s.name} level={s.level} />))}</div>
          </div>
          <div className="group">
            <h3 className="text-xl font-semibold mb-4 text-primary group-hover:scale-105 transition-transform duration-300 font-sans">Tools & Others</h3>
            <div className="space-y-3">{SKILLS.tools.map((s) => (<SkillBar key={s.name} name={s.name} level={s.level} />))}</div>
          </div>
        </div>
      </div>
    </section>
  )
}



