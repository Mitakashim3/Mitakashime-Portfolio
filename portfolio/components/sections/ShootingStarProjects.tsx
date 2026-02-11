"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useAnimation, PanInfo, useMotionValue, animate } from "framer-motion"
import { PROJECTS, Project } from "@/constants/projects"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Code, ExternalLink, Github, X } from "lucide-react"

// Constants for the simulation
const SPAWN_INTERVAL_MS = 2000 // Time between spawns
const TRAVEL_DURATION_S_MIN = 15 // Min seconds to cross screen
const TRAVEL_DURATION_S_MAX = 25 // Max seconds to cross screen
const MAX_ACTIVE_PROJECTS = 5 // Max number of projects on screen at once
const VERTICAL_TRAVEL_DISTANCE = 120 // Reduced from 150 to prevent bottom overflow
const HORIZONTAL_TRAVEL_DISTANCE = -150 // vw units, negative = moving left

// Calculate the trail rotation angle based on movement direction
// The comet moves down-left, so the tail should point up-right (opposite direction)
function calculateTrailAngle(): number {
    if (typeof window === 'undefined') return -35 // Default for SSR
    
    // Convert vw/vh to actual pixels for accurate angle calculation
    const xPixels = HORIZONTAL_TRAVEL_DISTANCE * window.innerWidth / 100
    const yPixels = VERTICAL_TRAVEL_DISTANCE * window.innerHeight / 100
    
    // Calculate movement direction angle in radians
    const movementAngle = Math.atan2(yPixels, xPixels)
    
    // The trail points opposite to movement (add 180 degrees / PI radians)
    const trailAngle = movementAngle + Math.PI
    
    // Convert to degrees
    return trailAngle * (180 / Math.PI)
}

type ShootingStarProps = {
    project: Project
    id: string
    startX: number // 0-100 percentage
    startY: number // 0-100 percentage
    duration: number
    onComplete: (id: string) => void
}

const ProjectCard = ({ project, isFlipped, onFlip, onClose }: { project: Project, isFlipped: boolean, onFlip: () => void, onClose: () => void }) => {
    return (
        <div
            className={cn(
                "relative cursor-pointer perspective-1000",
                // Mobile: smaller card that fits screen with padding
                "w-[calc(100vw-32px)] h-[calc(100vh-120px)] max-w-[450px] max-h-[550px]",
                // Desktop: fixed size
                "sm:w-[450px] sm:h-[550px]",
                isFlipped ? "z-50" : "z-10"
            )}
            onClick={(e) => {
                e.stopPropagation();
                onFlip();
            }}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 700, damping: 30, duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-primary/30 bg-slate-900/90 p-4 sm:p-6 flex flex-col shadow-[0_0_15px_rgba(120,50,255,0.3)] backdrop-blur-md"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* Shooting Star Trail Effect (only visible when not flipped and moving) */}
                    {!isFlipped && (
                        <div className="absolute -top-20 -right-20 w-40 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent rotate-45 blur-xl pointer-events-none opacity-50" />
                    )}

                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="text-[10px] sm:text-xs font-orbitron text-accent mb-1 sm:mb-2">PROJECT</div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 line-clamp-2">{project.title}</h3>

                    <div className="relative w-full h-28 sm:h-44 rounded-lg overflow-hidden bg-black/50 mb-3 sm:mb-4 flex items-center justify-center flex-shrink-0">
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        ) : (
                            <Code className="w-12 h-12 text-primary/50" />
                        )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 sm:line-clamp-4 mb-2 sm:mb-3">
                        {project.description}
                    </p>

                    <div className="mt-auto flex justify-between items-center text-[10px] sm:text-xs text-slate-400">
                        <span className="truncate max-w-[50%]">{project.category || "Development"}</span>
                        <span className="text-primary">Click to details &rarr;</span>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-secondary/50 bg-slate-900/95 p-4 sm:p-6 flex flex-col shadow-[0_0_25px_rgba(50,200,255,0.4)]"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 sm:p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white z-20"
                    >
                        <X size={14} className="sm:hidden" />
                        <X size={16} className="hidden sm:block" />
                    </button>

                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4 pr-6 sm:pr-8">{project.title}</h3>

                    <div className="grow overflow-y-auto custom-scrollbar pr-2 space-y-3 sm:space-y-4">
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {project.longDescription || project.description}
                        </p>

                        <div>
                            <div className="text-[10px] sm:text-xs font-bold text-slate-300 mb-1 sm:mb-2">TECH STACK</div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.metrics && (
                            <div className="bg-primary/5 p-2 sm:p-3 rounded border border-primary/10">
                                <div className="text-[10px] sm:text-xs font-bold text-primary mb-1">IMPACT</div>
                                <p className="text-xs sm:text-sm text-slate-300">{project.metrics}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-white/10 flex gap-2 sm:gap-3">
                        {project.href && (
                            <Link
                                href={project.href}
                                target="_blank"
                                className="flex-1 flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-white text-xs sm:text-sm py-2 sm:py-2.5 rounded transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={14} className="sm:hidden" />
                                <ExternalLink size={16} className="hidden sm:block" />
                                Visit Project
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const ShootingStar = ({ project, id, startX, startY, duration, onComplete }: ShootingStarProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [trailAngle, setTrailAngle] = useState(-35)
    const [isMobile, setIsMobile] = useState(false)

    const scope = useRef<HTMLDivElement>(null)
    const animationRef = useRef<any>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    useEffect(() => {
        setIsMounted(true)
        
        // Calculate initial trail angle and check mobile
        setTrailAngle(calculateTrailAngle())
        setIsMobile(window.innerWidth < 640)
        
        // Recalculate on resize
        const handleResize = () => {
            setTrailAngle(calculateTrailAngle())
            setIsMobile(window.innerWidth < 640)
        }
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!scope.current) return

        const xDist = HORIZONTAL_TRAVEL_DISTANCE
        const yDist = VERTICAL_TRAVEL_DISTANCE // Use the constrained distance

        animationRef.current = animate(
            scope.current,
            {
                x: ["0vw", `${xDist}vw`],
                y: ["0vh", `${yDist}vh`],
                opacity: [0, 1, 1, 0.8, 0], // Smoother fade with intermediate step
            },
            {
                duration: duration,
                ease: "linear",
                times: [0, 0.1, 0.75, 0.92, 1], // Start fading earlier (at 75% instead of 90%)
                onComplete: () => onComplete(id)
            }
        )

        return () => animationRef.current?.stop()
    }, [duration, id, onComplete])

    useEffect(() => {
        if (isHovered || isFlipped) {
            animationRef.current?.pause()
        } else {
            animationRef.current?.play()
        }
    }, [isHovered, isFlipped])

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    const handleClose = () => {
        setIsClosing(true)
        // Delay state changes to allow exit animation
        setTimeout(() => {
            setIsFlipped(false)
            setIsHovered(false)
            setIsClosing(false)
        }, 300)
    }

    return (
        <motion.div
            ref={scope}
            initial={{ left: `${startX}%`, top: `${startY}%` }}
            className="absolute z-20 pointer-events-auto will-change-transform"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                zIndex: isHovered || isFlipped ? 50 : 20,
            }}
        >
            {/* Comet Container */}
            <div className="relative">
                {/* === COMET TRAIL (always visible when not hovered/flipped) === */}
                {/* TRAIL ANGLE: Dynamically calculated based on viewport dimensions */}
                {!isHovered && !isFlipped && (
                    <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%', zIndex: -1 }}>
                        {/* Core bright trail */}
                        <div
                            className="absolute origin-left"
                            style={{
                                width: isMobile ? '350px' : '700px',
                                height: isMobile ? '4px' : '8px',
                                transform: `rotate(${trailAngle}deg) translateY(-50%)`,
                                background: 'linear-gradient(90deg, rgba(251,146,60,1) 0%, rgba(251,146,60,0.7) 10%, rgba(234,88,12,0.4) 30%, transparent 100%)',
                                filter: isMobile ? 'blur(2px)' : 'blur(3px)'
                            }}
                        />
                        {/* Secondary orange glow */}
                        <div
                            className="absolute origin-left"
                            style={{
                                width: isMobile ? '300px' : '600px',
                                height: isMobile ? '18px' : '35px',
                                transform: `rotate(${trailAngle}deg) translateY(-50%)`,
                                background: 'linear-gradient(90deg, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0.3) 25%, transparent 100%)',
                                filter: isMobile ? 'blur(8px)' : 'blur(12px)'
                            }}
                        />
                        {/* Wide outer yellow glow - DUST CLOUD */}
                        <div
                            className="absolute origin-left opacity-80"
                            style={{
                                width: isMobile ? '250px' : '500px',
                                height: isMobile ? '40px' : '80px',
                                transform: `rotate(${trailAngle}deg) translateY(-50%)`,
                                background: 'linear-gradient(90deg, rgba(253,224,71,0.7) 0%, rgba(253,186,116,0.4) 25%, rgba(253,224,71,0.15) 50%, transparent 100%)',
                                filter: isMobile ? 'blur(12px)' : 'blur(20px)'
                            }}
                        />
                        {/* Extra wide dust tail - hidden on mobile for performance */}
                        {!isMobile && (
                            <div
                                className="absolute w-[400px] h-[120px] origin-left opacity-50"
                                style={{
                                    transform: `rotate(${trailAngle}deg) translateY(-50%)`,
                                    background: 'linear-gradient(90deg, rgba(251,191,36,0.5) 0%, rgba(251,191,36,0.2) 30%, transparent 70%)',
                                    filter: 'blur(30px)'
                                }}
                            />
                        )}
                        {/* Sparkle streaks - simplified on mobile */}
                        <div
                            className="absolute origin-left animate-pulse"
                            style={{
                                width: isMobile ? '150px' : '300px',
                                height: isMobile ? '2px' : '3px',
                                transform: `rotate(${trailAngle + 5}deg) translateY(-15px)`,
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, transparent 70%)',
                                filter: 'blur(1px)'
                            }}
                        />
                        {!isMobile && (
                            <>
                                <div
                                    className="absolute w-[250px] h-[3px] origin-left animate-pulse"
                                    style={{
                                        transform: `rotate(${trailAngle - 5}deg) translateY(15px)`,
                                        animationDelay: '0.2s',
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, transparent 60%)',
                                        filter: 'blur(1px)'
                                    }}
                                />
                                {/* Additional dust particles */}
                                <div
                                    className="absolute w-[200px] h-[2px] origin-left animate-pulse"
                                    style={{
                                        transform: `rotate(${trailAngle + 10}deg) translateY(-25px)`,
                                        animationDelay: '0.4s',
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, transparent 50%)',
                                        filter: 'blur(1px)'
                                    }}
                                />
                                <div
                                    className="absolute w-[180px] h-[2px] origin-left animate-pulse"
                                    style={{
                                        transform: `rotate(${trailAngle - 5}deg) translateY(25px)`,
                                        animationDelay: '0.6s',
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, transparent 45%)',
                                        filter: 'blur(1px)'
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}

                {/* === COMET HEAD (Logo with fire effect) === */}
                <motion.div
                    animate={{
                        scale: isHovered || isFlipped ? 0 : 1,
                        opacity: isHovered || isFlipped ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                        "relative cursor-pointer",
                        isMobile ? "w-14 h-14" : "w-20 h-20"
                    )}
                >
                    {/* Fire/Blast effect around logo */}
                    <div className="absolute inset-0 rounded-full animate-pulse" style={{
                        background: 'radial-gradient(circle, rgba(251,146,60,0.8) 0%, rgba(234,88,12,0.4) 50%, transparent 70%)',
                        filter: isMobile ? 'blur(5px)' : 'blur(8px)',
                        transform: isMobile ? 'scale(1.5)' : 'scale(1.8)'
                    }} />
                    <div className="absolute inset-0 rounded-full" style={{
                        background: 'radial-gradient(circle, rgba(253,224,71,0.6) 0%, rgba(251,146,60,0.3) 40%, transparent 60%)',
                        filter: isMobile ? 'blur(3px)' : 'blur(4px)',
                        transform: isMobile ? 'scale(1.3)' : 'scale(1.5)'
                    }} />
                    {/* Bright core glow */}
                    <div className="absolute inset-0 rounded-full" style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(253,224,71,0.5) 30%, transparent 50%)',
                        filter: isMobile ? 'blur(1px)' : 'blur(2px)',
                        transform: 'scale(1.2)'
                    }} />

                    {/* The actual logo/image */}
                    <div className={cn(
                        "relative rounded-full overflow-hidden border-2 border-orange-400/50 shadow-[0_0_20px_rgba(251,146,60,0.8)] bg-black/80",
                        isMobile ? "w-14 h-14" : "w-20 h-20"
                    )}>
                        {project.logo ? (
                            <Image
                                src={project.logo}
                                alt={project.title}
                                fill
                                className="object-cover p-1" // Add padding for logo to not touch edges
                            />
                        ) : project.image ? (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
                                <Code className="w-8 h-8 text-white" />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* === EXPANDED CARD (appears on hover) - RENDERED VIA PORTAL === */}
                {isMounted && (isHovered || isFlipped || isClosing) && createPortal(
                    <AnimatePresence>
                        {(isHovered || isFlipped) && !isClosing ? (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={cn(
                                        "fixed inset-0 z-[9998]",
                                        isFlipped ? "bg-black/50" : "bg-black/20"
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClose()
                                    }}
                                />

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]"
                                >
                                    <ProjectCard
                                        project={project}
                                        isFlipped={isFlipped}
                                        onFlip={handleFlip}
                                        onClose={handleClose}
                                    />
                                </motion.div>
                            </>
                        ) : null}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </motion.div>
    )
}

export function ShootingStarProjects() {
    const [activeStars, setActiveStars] = useState<Array<ShootingStarProps>>([])
    const [isMobile, setIsMobile] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Track last spawn time per "lane" to prevent overlap
    // Lanes are defined by starting Y position ranges.
    // 3 lanes on desktop, 2 lanes on mobile for better performance
    const lanes = useRef<number[]>([0, 0, 0])
    
    // Track current project index for sequential display
    const projectIndex = useRef<number>(0)

    // Check for mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const spawnStar = useCallback(() => {
        if (document.hidden) return // Don't spawn if tab is inactive

        setActiveStars(prev => {
            // Limit active projects - fewer on mobile for performance
            const maxActive = isMobile ? 3 : MAX_ACTIVE_PROJECTS
            if (prev.length >= maxActive) return prev

            const now = Date.now()
            // Find available lanes (not spawned in last X seconds - longer on mobile)
            const laneCooldown = isMobile ? 5000 : 4000
            const activeLanes = isMobile ? [0, 1] : [0, 1, 2] // Use 2 lanes on mobile, 3 on desktop
            const availableLanes = activeLanes
                .map(index => ({ index, lastSpawn: lanes.current[index] }))
                .filter(lane => now - lane.lastSpawn > laneCooldown)

            if (availableLanes.length === 0) return prev

            // Pick a random available lane
            const selectedLaneObj = availableLanes[Math.floor(Math.random() * availableLanes.length)]
            const laneIndex = selectedLaneObj.index

            // Update last spawn time for this lane
            lanes.current[laneIndex] = now

            // Sequential project selection - cycle through all projects
            const selectedProject = PROJECTS[projectIndex.current]
            projectIndex.current = (projectIndex.current + 1) % PROJECTS.length
            const id = Math.random().toString(36).substr(2, 9)

            // Define start positions based on lane and device
            // Mobile: 2 lanes with adjusted spacing
            // Desktop: 3 lanes for full coverage
            const startYBase = isMobile ? [-10, 20] : [-15, 10, 35]
            const startY = startYBase[laneIndex] + (Math.random() * 8 - 4) // Add slight variance +/- 4%
            const startX = 80 + Math.random() * 20 // 80-100%

            // Faster animation on mobile for better engagement
            const minDuration = isMobile ? 12 : TRAVEL_DURATION_S_MIN
            const maxDuration = isMobile ? 18 : TRAVEL_DURATION_S_MAX
            const duration = minDuration + Math.random() * (maxDuration - minDuration)

            return [...prev, {
                project: selectedProject,
                id,
                startX,
                startY,
                duration,
                onComplete: (completedId: string) => {
                    setActiveStars(current => current.filter(s => s.id !== completedId))
                }
            }]
        })
    }, [isMobile])

    useEffect(() => {
        // Initial spawn
        spawnStar()

        // Slower spawn interval on mobile for performance
        const interval = setInterval(spawnStar, isMobile ? 2500 : SPAWN_INTERVAL_MS)
        return () => clearInterval(interval)
    }, [spawnStar, isMobile])

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[600px] sm:h-[800px] overflow-hidden"
            style={{ 
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)'
            }}
        >
            <AnimatePresence>
                {activeStars.map(star => (
                    <ShootingStar key={star.id} {...star} />
                ))}
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-[10px] sm:text-xs text-center pointer-events-none opacity-50">
                <span className="hidden sm:inline">Catch the shooting star!</span>
                <span className="sm:hidden">Tap the comet!</span>
                <br /> 
                <span className="hidden sm:inline">Hover to pause, click to explore</span>
                <span className="sm:hidden">Tap to explore projects</span>
            </div>
        </div>
    )
}
