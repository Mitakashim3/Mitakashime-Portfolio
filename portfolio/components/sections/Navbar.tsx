"use client"

import { motion } from "framer-motion"
import { NAV_SECTIONS } from "@/constants/links"
import { SITE } from "@/constants/content"

type Props = {
  activeSection: string
  onNavigate: (id: string) => void
}

export function Navbar({ activeSection, onNavigate }: Props) {
  return (
    <nav className="fixed top-0 w-full bg-background/20 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
  <h1 className="text-xl font-bold text-primary font-mono">{SITE.name}</h1>
        <div className="flex items-center gap-6">
          {NAV_SECTIONS.map((id) => (
            <motion.button
              key={id}
              onClick={() => onNavigate(id)}
              className={`transition-all duration-300 hover:scale-105 font-mono ${
                activeSection === id ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-primary"
              }`}
              initial={{ color: "rgb(156 163 175)" }}
              whileInView={{ color: "rgb(255 255 255)" }}
              transition={{ duration: 0.5 }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  )
}



