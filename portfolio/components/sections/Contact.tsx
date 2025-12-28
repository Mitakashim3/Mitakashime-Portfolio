"use client"

import { useRef, memo, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/constants/links"
import { AnimatedText } from "@/components/animated-text"
import { Github, Linkedin, Mail, Send } from "lucide-react"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { useChromeVersion } from "@/hooks/use-chrome-version"
import { cn } from "@/lib/utils"
import { SectionTitle } from "@/components/ui/section-title"

type Props = { scrollY: number; componentScale: number }

export const Contact = memo(function Contact({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const capabilities = useDeviceCapabilities()
  const chrome = useChromeVersion()

  // Reduce particles on mobile/low-end
  const particleCount = useMemo(() => {
    if (capabilities.isMobile) return 5
    if (capabilities.isLowEnd) return 8
    return 15
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
      },
    },
  }), [])

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="py-14 sm:py-20 px-4 sm:px-6 mb-14 sm:mb-20 relative z-40 overflow-hidden" 
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
        className="max-w-5xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle title="Get In Touch" className="mb-10 sm:mb-16" />

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 font-sans">Let's Connect</h3>
              <AnimatedText className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed font-mono">
                I'm always interested in new opportunities, collaborations, and interesting projects. Whether you have a
                question or just want to say hi, feel free to reach out across the digital galaxy!
              </AnimatedText>
            </div>

            <div className="space-y-6">
              <a
                href={`mailto:${LINKS.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 sm:p-4 rounded-lg bg-card/30 border border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="p-2.5 sm:p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-mono text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                  {LINKS.email}
                </span>
              </a>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 sm:p-4 rounded-lg bg-card/30 border border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="p-2.5 sm:p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Github className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-mono text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                  GitHub - Mitakashim3
                </span>
              </a>

              <a
                href={`https://${LINKS.linkedin.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 sm:p-4 rounded-lg bg-card/30 border border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="p-2.5 sm:p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-mono text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                  LinkedIn - Clark Jim Gabiota
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className={cn(
              "p-5 sm:p-8 border-primary/20 shadow-[0_0_50px_-12px_rgba(0,255,0,0.1)] hover:shadow-[0_0_50px_-12px_rgba(0,255,0,0.2)] transition-all duration-500",
              chrome.supportsBackdropFilter ? "bg-black/40 backdrop-blur-md" : "bg-black/90"
            )}>
              <form
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const data = {
                    name: (form[0] as HTMLInputElement).value,
                    email: (form[1] as HTMLInputElement).value,
                    message: (form[2] as HTMLTextAreaElement).value,
                  };
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });
                  if (res.ok) {
                    alert('Message sent!');
                    form.reset();
                  } else {
                    alert('Failed to send.');
                  }
                }}>
                <div className="space-y-2">
                  <Input 
                    placeholder="Your Name" 
                    required 
                    className="bg-background/50 border-primary/20 focus:border-primary/80 h-11 sm:h-12 font-mono transition-all duration-300" 
                  />
                </div>
                <div className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    className="bg-background/50 border-primary/20 focus:border-primary/80 h-11 sm:h-12 font-mono transition-all duration-300" 
                  />
                </div>
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Your Message" 
                    required 
                    className="bg-background/50 border-primary/20 focus:border-primary/80 min-h-[120px] sm:min-h-[150px] resize-none font-mono transition-all duration-300" 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-black font-bold text-base sm:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
})




