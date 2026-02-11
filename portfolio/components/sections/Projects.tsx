"use client"

import { memo } from "react"
import { ShootingStarProjects } from "@/components/sections/ShootingStarProjects"
import { SectionTitle } from "@/components/ui/section-title"

type Props = {
  scrollY?: number
  componentScale?: number
}

export const Projects = memo(function Projects({ scrollY, componentScale }: Props) {
  return (
    <section id="projects" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="z-10 px-4 w-full mb-8">
        <SectionTitle title="Featured Projects" />
      </div>

      <ShootingStarProjects />
    </section>
  )
})



