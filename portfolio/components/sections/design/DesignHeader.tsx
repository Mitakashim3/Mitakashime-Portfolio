"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export function DesignHeader() {
  const pathname = usePathname()

  const links = [
    { href: "/design/ui-ux", label: "UI/UX" },
    // { href: "/design/graphics", label: "Graphics" }, // Temporarily hidden
  ]

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium font-mono">Back to Code</span>
          </Link>
          
          <div className="h-4 w-px bg-white/10" />
          
          <h1 className="text-lg font-bold tracking-tight font-[var(--font-orbitron)]">
            Display Mode
          </h1>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href} className="relative px-3 py-1.5 sm:px-4 sm:py-2 group">
                {isActive && (
                  <motion.div
                    layoutId="activeDesignTab"
                    className="absolute inset-0 bg-primary/10 rounded-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
