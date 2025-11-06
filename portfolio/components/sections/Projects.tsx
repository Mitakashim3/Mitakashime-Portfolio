"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/animated-text"
import { PROJECTS } from "@/constants/projects"

type Props = { scrollY: number; componentScale: number }

export function Projects({ scrollY, componentScale }: Props) {
  return (
    <section id="projects" className="py-20 px-6 bg-muted/30 relative z-40" style={{ transform: `scale(${componentScale})` }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-sans">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
          {PROJECTS.map((project, index) => (
            <Card
              key={project.title}
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-primary/10 border-border/50 hover:border-primary/30 bg-background/40 backdrop-blur-sm"
              style={{ transform: `translateY(${scrollY * (0.01 + index * 0.005)}px)` }}
            >
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 font-sans">{project.title}</h3>
                <AnimatedText className="mb-4 leading-relaxed font-mono text-sm">{project.description}</AnimatedText>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="inline-flex items-center px-2 py-1 rounded-md bg-secondary/50 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary/20 group-hover:text-white group-hover:border-primary transition-all duration-300 bg-transparent hover:scale-105 font-mono">
                  View Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}



