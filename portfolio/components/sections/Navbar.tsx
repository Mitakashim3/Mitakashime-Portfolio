"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { NAV_SECTIONS } from "@/constants/links"
import { SITE } from "@/constants/content"

type Props = {
  activeSection: string
  onNavigate: (id: string) => void
  visible?: boolean
}

export function Navbar({ activeSection, onNavigate, visible = true }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigate = (id: string) => {
    // Close menu first, then navigate with a small delay to ensure smooth transition
    setIsMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full bg-background/20 backdrop-blur-sm border-b border-border z-[100]"
        >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate("hero")}>
          <Image src="/MitakashimeLogo.svg" alt="Mitakashime Logo" width={48} height={48} className="sm:w-16 sm:h-16" />
          <h1 className="text-lg sm:text-xl font-bold text-primary font-mono">{SITE.name}</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_SECTIONS.map((id) => (
            <motion.button
              key={id}
              onClick={() => handleNavigate(id)}
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary hover:text-primary/80 transition-colors p-4 -mr-4 touch-manipulation relative z-[101]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden absolute top-full left-0 right-0 z-[102]"
          >
            <div className="flex flex-col px-4 py-3 space-y-1">
              {NAV_SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleNavigate(id)
                  }}
                  className={`text-left py-4 px-4 rounded-md transition-all duration-300 font-mono touch-manipulation active:scale-98 ${
                    activeSection === id
                      ? "text-primary bg-primary/10 border-l-4 border-primary"
                      : "text-gray-400 hover:text-primary hover:bg-primary/5 active:bg-primary/10"
                  }`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
