"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { DesignProject } from "@/constants/design-projects"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export function GraphicDesignMasonry({ projects }: { projects: DesignProject[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {projects.map((project, index) => (
        <Dialog key={project.id}>
          <DialogTrigger asChild>
            <motion.div
              className="break-inside-avoid relative group cursor-zoom-in rounded-lg overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-xl font-bold text-white font-[var(--font-archivo)] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300">{project.description}</p>
                </div>
              </div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] h-[90vh] bg-transparent border-none shadow-none p-0 flex items-center justify-center pointer-events-none">
             <div className="relative w-full h-full pointer-events-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
               <div className="relative max-w-full max-h-full overflow-hidden rounded-lg">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={1600}
                    height={1200}
                    className="object-contain max-h-[90vh] w-auto h-auto mx-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur text-white">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-gray-300">{project.description}</p>
                </div>
               </div>
             </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
