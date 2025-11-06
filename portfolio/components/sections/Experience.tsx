"use client"

import { Card } from "@/components/ui/card"
import { AnimatedText } from "@/components/animated-text"
import { motion } from "framer-motion"
import { EXPERIENCE } from "@/constants/content"

type Props = { scrollY: number; componentScale: number }

export function Experience({ scrollY, componentScale }: Props) {
  return (
    <section className="py-20 px-6 bg-muted/30 relative z-40" style={{ transform: `scale(${componentScale})` }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-sans">Experience & Education</h2>
        <div className="space-y-8" style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
          {EXPERIENCE.map((exp) => (
            <Card key={exp.title} className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/30 bg-background/40 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <motion.div initial={{ color: "rgb(156 163 175)" }} whileInView={{ color: "rgb(255 255 255)" }} transition={{ duration: 0.5 }}>
                  <h3 className="text-xl font-semibold hover:text-primary transition-colors duration-300 font-sans">{exp.title}</h3>
                  <p className="text-primary font-medium font-sans">{exp.organization}</p>
                </motion.div>
                <AnimatedText className="font-mono text-white">{exp.period}</AnimatedText>
              </div>
              <AnimatedText className="leading-relaxed font-mono text-white">{exp.description}</AnimatedText>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}



