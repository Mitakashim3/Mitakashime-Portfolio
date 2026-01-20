"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, X } from "lucide-react"
import { DesignProject } from "@/constants/design-projects"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function UiUxProjectCard({ project }: { project: DesignProject }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 cursor-pointer overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-[16/9] w-full relative">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <Badge variant="outline" className="mb-3 border-primary/50 text-primary bg-primary/10 backdrop-blur-md">
                UI/UX Case Study
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-2 font-[var(--font-archivo)]">
                {project.title}
              </h3>
              <p className="text-gray-300 line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-white/10">
        <ScrollArea className="h-full">
          <div className="p-6 sm:p-10">
            <DialogHeader className="mb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <Badge variant="outline" className="border-primary text-primary">
                  {project.date}
                </Badge>
                {project.prototypeUrl && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={project.prototypeUrl} target="_blank" rel="noopener noreferrer">
                      View Prototype <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
              <DialogTitle className="text-3xl sm:text-4xl font-bold font-[var(--font-orbitron)] text-white mb-4">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-400">
                {project.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4 p-6 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-xl font-bold text-primary mb-2">The Problem</h4>
                <p className="text-gray-300 leading-relaxed">{project.problem}</p>
              </div>
              <div className="space-y-4 p-6 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-xl font-bold text-green-400 mb-2">The Solution</h4>
                <p className="text-gray-300 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-white font-[var(--font-orbitron)]">Project Gallery</h4>
              <div className="grid gap-6">
                {project.detailImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={img}
                      alt={`${project.title} detail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
