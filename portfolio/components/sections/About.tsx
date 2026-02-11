"use client"

import { useRef, useMemo, memo } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ABOUT } from "@/constants/content"
import { AnimatedText } from "@/components/animated-text"
import { cn } from "@/lib/utils"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { useChromeVersion } from "@/hooks/use-chrome-version"
import { SectionTitle } from "@/components/ui/section-title"

type Props = { scrollY: number; componentScale: number }

export const About = memo(function About({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const capabilities = useDeviceCapabilities()
  const chrome = useChromeVersion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  // Reduce particle count on mobile/low-end devices for better performance
  const particleCount = useMemo(() => {
    if (capabilities.isMobile) return 0 // Disable particles on mobile completely
    if (capabilities.isLowEnd) return 3
    return 8
  }, [capabilities.isMobile, capabilities.isLowEnd])

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }), [])

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-12 sm:py-20 px-4 sm:px-6 relative z-40 overflow-hidden"
      style={{ transform: `scale(${componentScale})` }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!capabilities.prefersReducedMotion && [...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -100]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              willChange: "transform, opacity",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 md:items-start">
          {/* Text Content */}
          <div className="space-y-6 order-2 md:order-1">
            <SectionTitle title="About Me" className="md:text-left mb-6" />

            <div className="space-y-4">
              {ABOUT.paragraphs.map((p, idx) => (
                <div key={idx} className="mb-4">
                  <AnimatedText className="text-sm sm:text-lg leading-relaxed font-mono text-[#FFFEF2] drop-shadow-[0_0_10px_rgba(255,254,242,0.5)]">
                    {p}
                  </AnimatedText>
                </div>
              ))}
            </div>

          </div>

          {/* Avatar / 3D Pop-out Effect */}
          <div className="flex justify-center order-1 md:order-2 relative">
            <motion.div
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 group perspective-1000"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              {/* Glowing Background Orb */}
              <div className="absolute inset-10 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />

              {/* The Circle Frame */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full border-[2px] sm:border-[3px] border-primary/30 bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,0,0.1)] group-hover:border-primary/60 transition-colors duration-500 overflow-visible flex items-end justify-center z-10">

                {/* Inner Ring */}
                <div className="absolute inset-2 rounded-full border border-primary/10" />

                {/* The Image - Pop-out Effect */}
                {/* Note: For the best pop-out effect, use a transparent PNG (cutout) where the head extends above the frame */}
                <motion.div
                  className="relative z-20 w-[90%] h-[110%] -mb-0 flex items-end justify-center"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={ABOUT.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover object-bottom drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] mask-image-gradient"
                    style={{
                      // This mask helps blend the bottom if it's not a perfect cutout, 
                      // but ideally the image should be a cutout.
                      maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                    }}
                  />
                </motion.div>

                {/* Decorative Orbiting Particles */}
                <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 shadow-[0_0_10px_var(--primary)]" />
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-accent rounded-full -translate-x-1/2 shadow-[0_0_10px_var(--accent)]" />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.img
                src="/UFO.gif"
                alt="Robot waving"
                className="hidden lg:block absolute -right-2 top-20 h-48 z-30 "
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className={cn(
                  "hidden sm:block absolute -left-4 bottom-20 p-3 rounded-xl border border-primary/20 shadow-lg z-30",
                  chrome.supportsBackdropFilter ? "bg-card/80 backdrop-blur-md" : "bg-card"
                )}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-2xl">今日は</span>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
})




