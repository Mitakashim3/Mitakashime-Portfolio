"use client"

import { memo } from "react"
import { ProjectsCarousel } from "@/components/sections/ProjectsCarousel"
import { SectionTitle } from "@/components/ui/section-title"

type Props = {
  scrollY?: number
  componentScale?: number
}

export const Projects = memo(function Projects({ scrollY, componentScale }: Props) {
  return (
    <section id="projects" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="z-10 px-4 w-full">
        <SectionTitle title="Featured Projects" />
      </div>
      
      <ProjectsCarousel />
    </section>
  )
})



