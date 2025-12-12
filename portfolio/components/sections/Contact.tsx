"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/constants/links"
import { AnimatedText } from "@/components/animated-text"
import { Github, Linkedin, Mail, Send } from "lucide-react"

type Props = { scrollY: number; componentScale: number }

export function Contact({ scrollY, componentScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="py-20 px-6 mb-20 relative z-40 overflow-hidden" 
      style={{ transform: `scale(${componentScale})` }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              ease: "linear"
            }}
            style={{
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
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-center mb-16 gradient-text font-sans tracking-tight"
          style={{ textShadow: "0 0 30px rgba(255, 254, 242, 0.3)" }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 font-sans text-primary/90">Let's Connect</h3>
              <AnimatedText className="text-lg mb-8 leading-relaxed font-mono text-muted-foreground">
                I'm always interested in new opportunities, collaborations, and interesting projects. Whether you have a
                question or just want to say hi, feel free to reach out across the digital galaxy!
              </AnimatedText>
            </div>

            <div className="space-y-6">
              <a
                href={`mailto:${LINKS.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-mono text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                  {LINKS.email}
                </span>
              </a>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Github className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-mono text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                  GitHub - Mitakashim3
                </span>
              </a>

              <a
                href={`https://${LINKS.linkedin.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-mono text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                  LinkedIn - Clark Jim Gabiota
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-8 border-primary/20 bg-black/40 backdrop-blur-md shadow-[0_0_50px_-12px_rgba(0,255,0,0.1)] hover:shadow-[0_0_50px_-12px_rgba(0,255,0,0.2)] transition-all duration-500">
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
                    className="bg-background/50 border-primary/20 focus:border-primary/80 h-12 font-mono transition-all duration-300" 
                  />
                </div>
                <div className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    className="bg-background/50 border-primary/20 focus:border-primary/80 h-12 font-mono transition-all duration-300" 
                  />
                </div>
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Your Message" 
                    required 
                    className="bg-background/50 border-primary/20 focus:border-primary/80 min-h-[150px] resize-none font-mono transition-all duration-300" 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
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
}




