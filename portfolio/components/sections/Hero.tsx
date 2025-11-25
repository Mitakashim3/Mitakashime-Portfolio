"use client"

import { useRef, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { HERO } from "@/constants/content"

type Props = {
  scrollY: number
  componentScale: number
  onScrollTo: (id: string) => void
}

// Helper component for letter-by-letter animation
const AnimatedText = ({ text, variants }: { text: string; variants: any }) => {
  const words = text.split(" ")
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
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
}

export function Hero({ scrollY, componentScale, onScrollTo }: Props) {
  const heroRef = useRef<HTMLElement>(null)

  // Define scroll thresholds - increased for longer scroll duration
  const PHASE_1_END = 300 // Hi There!
  const PHASE_2_END = 600 // Welcome!
  const PHASE_3_END = 900 // I'm Clark Jim Gabiota
  const PHASE_4_END = 1200 // You can call me Mitakashime!
  // After 2000: Final Hero Content

  const currentPhase = useMemo(() => {
    if (scrollY < PHASE_1_END) return 0
    if (scrollY < PHASE_2_END) return 1
    if (scrollY < PHASE_3_END) return 2
    if (scrollY < PHASE_4_END) return 3
    return 4
  }, [scrollY])

  // Letter animation variants for each phase
  const slideInVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  const fadeInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const bounceInVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const rotateInVariants = {
    hidden: { rotate: -180, opacity: 0 },
    visible: { rotate: 0, opacity: 1 },
  }

  const containerVariants = (staggerDelay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  })

  const cubeVariants = {
    initial: { rotateX: -90, opacity: 0, y: 50, position: "absolute" as const },
    animate: { rotateX: 0, opacity: 1, y: 0, position: "absolute" as const },
    exit: { rotateX: 90, opacity: 0, y: -50, position: "absolute" as const },
  }

  const renderContent = () => {
    switch (currentPhase) {
      case 0:
        return (
          <motion.h1
            key="phase0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants(0.05)}
            className="text-6xl md:text-8xl font-bold font-sans w-full text-center absolute text-[#FFFEF2] drop-shadow-[0_0_15px_rgba(255,254,242,0.7)]"
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
            exit="exit"
            variants={containerVariants(0.08)}
            className="text-6xl md:text-8xl font-bold font-sans w-full text-center absolute text-[#FFFEF2] drop-shadow-[0_0_15px_rgba(255,254,242,0.7)]"
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
            exit="exit"
            variants={containerVariants(0.06)}
            className="text-5xl md:text-7xl font-bold font-sans text-center w-full absolute text-[#FFFEF2] drop-shadow-[0_0_15px_rgba(255,254,242,0.7)]"
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
            exit="exit"
            variants={containerVariants(0.04)}
            className="text-4xl md:text-6xl font-bold font-sans text-center px-4 w-full absolute text-[#FFFEF2] drop-shadow-[0_0_15px_rgba(255,254,242,0.7)]"
            style={{ position: "absolute" }}
          >
            <AnimatedText text="You can call me Mitakashime!" variants={rotateInVariants} />
          </motion.h1>
        )
      case 4:
        return (
          <motion.div
            key="phase4"
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
            className="max-w-4xl mx-auto text-center absolute w-full"
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
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance animate-pulse font-sans leading-tight"
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
                className="text-lg sm:text-xl md:text-2xl mb-8 text-pretty backdrop-blur-sm bg-background/20 rounded-lg p-3 sm:p-4 font-mono"
              >
                {HERO.subtitle}
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
                  className="bg-primary hover:bg-primary/90 text-white active:scale-95 sm:hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 font-mono px-6 py-3 rounded-md text-base sm:text-lg touch-manipulation"
                >
                  {HERO.primaryCta.label}
                </button>
                <button
                  onClick={() => onScrollTo(HERO.secondaryCta.target)}
                  className="hover:bg-primary/10 hover:border-primary active:scale-95 sm:hover:scale-105 transition-all duration-300 font-mono text-white border border-primary/50 px-6 py-3 rounded-md text-base sm:text-lg touch-manipulation"
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
      default:
        return null
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative h-[300vh]" // Increased height for longer scroll sequence
      id="hero"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-40 w-full max-w-4xl mx-auto px-4 flex items-center justify-center h-full">
          <AnimatePresence>
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}



