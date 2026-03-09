"use client"

import { useRef, useMemo, memo, useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { HERO } from "@/constants/content"

type Props = {
  scrollY: number
  componentScale: number
  onScrollTo: (id: string) => void
}

// Helper component for letter-by-letter animation - memoized
const AnimatedText = memo(({ text, variants }: { text: string; variants: any }) => {
  const words = text.split(" ")
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={variants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </>
  )
})

// Phase progress dots indicator
const PhaseDots = memo(({ current, total }: { current: number; total: number }) => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scale: i === current ? 1.4 : 1,
          opacity: i <= current ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
        className={`rounded-full transition-all duration-300 ${i === current
          ? "w-4 h-2 bg-primary shadow-[0_0_8px_rgba(16,185,129,0.8)]"
          : i < current
            ? "w-2 h-2 bg-primary/60"
            : "w-2 h-2 bg-white/20"
          }`}
      />
    ))}
  </div>
))

export const Hero = memo(function Hero({ scrollY, componentScale, onScrollTo }: Props) {
  const heroRef = useRef<HTMLElement>(null)

  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile: 3 phases (quicker to reach content), Desktop: 4 phases
  // Phase 0: Hi There! + Welcome (combined on mobile)
  // Phase 1 [mobile] / Phase 1+2 (desktop split): I'm Clark Jim Gabiota
  // Phase 2 [mobile] / Phase 3 [desktop]: You can call me Mitakashime!
  // After final phase: Final Hero Content

  const PHASE_1_END = isMobile ? 300 : 300   // Hi There!
  const PHASE_2_END = isMobile ? 600 : 600   // Welcome! / Name
  const PHASE_3_END = isMobile ? 900 : 900   // I'm Clark / Mitakashime
  const PHASE_4_END = isMobile ? 900 : 1200  // (desktop only extra phase)
  // After phase 4: Final Hero Content

  const currentPhase = useMemo(() => {
    if (isMobile) {
      // Mobile: 3 phases
      if (scrollY < PHASE_1_END) return 0
      if (scrollY < PHASE_2_END) return 1
      if (scrollY < PHASE_3_END) return 2
      return 3
    } else {
      // Desktop: 4 phases
      if (scrollY < PHASE_1_END) return 0
      if (scrollY < PHASE_2_END) return 1
      if (scrollY < PHASE_3_END) return 2
      if (scrollY < PHASE_4_END) return 3
      return 4
    }
  }, [scrollY, isMobile, PHASE_1_END, PHASE_2_END, PHASE_3_END, PHASE_4_END])

  const totalPhases = isMobile ? 3 : 4
  const finalPhase = isMobile ? 3 : 4
  const isIntroPhase = currentPhase < finalPhase

  // Shared exit variant for all phases
  const exitVariant = {
    opacity: 0,
    scale: 0.85,
    transition: { duration: 0.35, ease: "easeIn" as const }
  }

  // Letter animation variants for each phase - optimized
  const slideInVariants = useMemo(() => ({
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }), [])

  const fadeInVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }), [])

  const bounceInVariants = useMemo(() => ({
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }), [])

  const rotateInVariants = useMemo(() => ({
    hidden: { rotate: -180, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }), [])

  const containerVariants = useMemo(() => (staggerDelay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }), [])

  // Shared wrapper class for intro text with frosted backdrop for readability
  const introTextWrapper = "relative inline-flex flex-col items-center"
  const textBackdrop = "absolute inset-0 -inset-x-8 -inset-y-4 rounded-2xl bg-black/25 backdrop-blur-[2px] -z-10"

  const renderContent = () => {
    if (isMobile) {
      // ===== MOBILE: 3-phase intro =====
      switch (currentPhase) {
        case 0:
          return (
            <motion.div
              key="m-phase0"
              initial="hidden"
              animate="visible"
              exit={exitVariant}
              variants={containerVariants(0.05)}
              className="flex flex-col items-center gap-3 absolute w-full px-6"
            >
              <div className="flex flex-col items-center gap-2">
                <motion.h1
                  variants={containerVariants(0.05)}
                  className="text-5xl font-bold font-sans text-center text-[#FFFEF2] drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] [text-shadow:0_2px_20px_rgba(0,0,0,0.9),0_0_40px_rgba(255,254,242,0.3)]"
                >
                  <AnimatedText text="Hi There!" variants={slideInVariants} />
                </motion.h1>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } } }}
                  className="text-2xl font-bold font-sans text-[#FFFEF2] drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] [text-shadow:0_2px_20px_rgba(0,0,0,0.9),0_0_40px_rgba(255,254,242,0.3)]"
                >
                  Welcome!
                </motion.p>
              </div>
            </motion.div>
          )
        case 1:
          return (
            <motion.h1
              key="m-phase1"
              initial="hidden"
              animate="visible"
              exit={exitVariant}
              variants={containerVariants(0.06)}
              className="text-2xl sm:text-3xl font-bold font-sans text-center w-full absolute px-6 text-[#FFFEF2] drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] [text-shadow:0_2px_20px_rgba(0,0,0,0.9),0_0_40px_rgba(255,254,242,0.25)]"
            >
              <AnimatedText text="I'm Clark Jim Gabiota" variants={bounceInVariants} />
            </motion.h1>
          )
        case 2:
          return (
            <motion.h1
              key="m-phase2"
              initial="hidden"
              animate="visible"
              exit={exitVariant}
              variants={containerVariants(0.04)}
              className="text-xl sm:text-2xl font-bold font-sans text-center px-6 w-full absolute text-[#FFFEF2] drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] [text-shadow:0_2px_20px_rgba(0,0,0,0.9),0_0_40px_rgba(255,254,242,0.25)]"
            >
              <AnimatedText text="You can call me Mitakashime!" variants={rotateInVariants} />
            </motion.h1>
          )
        case 3:
          return renderFinalContent()
        default:
          return null
      }
    } else {
      // ===== DESKTOP: 4-phase intro =====
      switch (currentPhase) {
        case 0:
          return (
            <motion.h1
              key="phase0"
              initial="hidden"
              animate="visible"
              exit={exitVariant}
              variants={containerVariants(0.05)}
              className="text-4xl sm:text-6xl md:text-8xl font-bold font-sans w-full text-center absolute text-[#FFFEF2] drop-shadow-[0_0_15px_rgba(255,254,242,0.7)]"
              style={{ position: "absolute" }}
            >
              <AnimatedText text="Hi There!" variants={slideInVariants} />
            </motion.h1>
          )
        case 1:
          return (
            <motion.h1
              key="phase1"
              initial="hidden"
              animate="visible"
              exit={exitVariant}
              variants={containerVariants(0.08)}
              className="text-4xl sm:text-6xl md:text-8xl font-bold font-sans w-full text-center absolute text-[#FFFEF2] drop-shadow-[0_0_15px_rgba(255,254,242,0.7)]"
              style={{ position: "absolute" }}
            >
              <AnimatedText text="Welcome!" variants={fadeInVariants} />
            </motion.h1>
          )
        case 2:
          return (
            <motion.h1
              key="phase2"
              initial="hidden"
              animate="visible"
              exit={exitVariant}
              variants={containerVariants(0.06)}
              className="text-3xl sm:text-5xl md:text-7xl font-bold font-sans text-center w-full absolute text-[#FFFEF2] drop-shadow-[0_0_15px_rgba(255,254,242,0.7)]"
              style={{ position: "absolute" }}
            >
              <AnimatedText text="I'm Clark Jim Gabiota" variants={bounceInVariants} />
            </motion.h1>
          )
        case 3:
          return (
            <motion.h1
              key="phase3"
              initial="hidden"
              animate="visible"
              exit={exitVariant}
              variants={containerVariants(0.04)}
              className="text-2xl sm:text-4xl md:text-6xl font-bold font-sans text-center px-4 w-full absolute text-[#FFFEF2] drop-shadow-[0_0_15px_rgba(255,254,242,0.7)]"
              style={{ position: "absolute" }}
            >
              <AnimatedText text="You can call me Mitakashime!" variants={rotateInVariants} />
            </motion.h1>
          )
        case 4:
          return renderFinalContent()
        default:
          return null
      }
    }
  }

  const renderFinalContent = () => (
    <motion.div
      key="phase-final"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
          },
        },
      }}
      className="max-w-4xl mx-auto text-center absolute w-full px-4"
    >
      <div className="mb-8">
        <motion.h1
          variants={{
            hidden: { x: -100, y: -50, rotate: -10, opacity: 0, scale: 0.8 },
            visible: {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 100, damping: 15 }
            }
          }}
          className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 font-sans leading-tight gradient-text"
        >
          {HERO.title}
        </motion.h1>
        <motion.p
          variants={{
            hidden: { x: 100, y: 50, rotate: 5, opacity: 0 },
            visible: {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 100, damping: 15 }
            }
          }}
          className="text-xs leading-relaxed sm:text-xl md:text-2xl mb-4 text-pretty sm:backdrop-blur-sm sm:bg-black/30 sm:rounded-lg sm:p-4 font-mono text-[#FFFEF2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          {HERO.subtitle}
        </motion.p>
        {/* Description - visible on all sizes (was hidden on mobile) */}
        <motion.p
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 }
            }
          }}
          className="text-xs sm:text-lg md:text-xl mb-6 sm:mb-8 text-center max-w-2xl mx-auto text-zinc-300 font-mono leading-relaxed"
        >
          {HERO.description}
        </motion.p>
        <motion.div
          variants={{
            hidden: { y: 100, opacity: 0, scale: 0.5 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 120, damping: 20 }
            }
          }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <button
            onClick={() => onScrollTo(HERO.primaryCta.target)}
            className="bg-primary hover:bg-primary/90 text-black font-bold active:scale-95 sm:hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] font-mono px-6 py-3.5 rounded-md text-base sm:text-lg touch-manipulation"
          >
            {HERO.primaryCta.label}
          </button>
          <button
            onClick={() => onScrollTo(HERO.secondaryCta.target)}
            className="hover:bg-primary/10 hover:border-primary active:scale-95 sm:hover:scale-105 transition-all duration-300 font-mono text-[#FFFEF2] border border-primary/60 px-6 py-3.5 rounded-md text-base sm:text-lg touch-manipulation backdrop-blur-sm bg-black/20"
          >
            {HERO.secondaryCta.label}
          </button>
        </motion.div>
      </div>
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1 } } }}
        className="animate-bounce"
      >
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 mx-auto text-primary" />
      </motion.div>
    </motion.div>
  )

  return (
    <section
      ref={heroRef}
      className={isMobile ? "relative h-[250vh]" : "relative h-[300vh]"}
      id="hero"
    >
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="relative z-40 w-full max-w-4xl mx-auto px-4 flex items-center justify-center h-full">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>

        {/* Phase progress dots - show only during intro phases */}
        <AnimatePresence>
          {isIntroPhase && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              <PhaseDots current={currentPhase} total={totalPhases} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
})


