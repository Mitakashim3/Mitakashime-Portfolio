"use client"

import { AnimatedText } from "@/components/animated-text"
import { ABOUT } from "@/constants/content"

type Props = { scrollY: number; componentScale: number }

export function About({ scrollY, componentScale }: Props) {
  return (
    <section id="about" className="py-20 px-6 relative z-40" style={{ transform: `scale(${componentScale})` }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translateY(${scrollY * (0.02 + Math.random() * 0.03)}px)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text font-sans">About Me</h2>
            {ABOUT.paragraphs.map((p, idx) => (
              <AnimatedText key={idx} className="text-lg leading-relaxed font-mono mb-4">
                {p}
              </AnimatedText>
            ))}
          </div>
          <div className="flex justify-center" style={{ transform: `translateY(${scrollY * -0.02}px)` }}>
            <div className="relative w-80 h-80">
              <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/30 to-primary/20 rounded-full flex items-center justify-center ">
                <div className="w-64 h-64 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-primary/30 hover:scale-105 transition-transform duration-500 shadow-lg shadow-primary/20">
                  <img src={ABOUT.profileImage} alt="Profile" className="w-56 h-56 rounded-full object-cover border-2 border-primary/20" />
                </div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "30s" }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2" />
                <div className="absolute left-0 top-1/2 w-2 h-2 bg-primary/60 rounded-full -translate-y-1/2" />
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-accent/60 rounded-full -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



