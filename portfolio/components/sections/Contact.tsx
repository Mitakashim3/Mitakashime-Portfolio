"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/constants/links"
import { AnimatedText } from "@/components/animated-text"
import { Github, Linkedin, Mail } from "lucide-react"

type Props = { scrollY: number; componentScale: number }

export function Contact({ scrollY, componentScale }: Props) {
  return (
    <section id="contact" className="py-20 px-6 relative z-40" style={{ transform: `scale(${componentScale})` }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-sans">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12" style={{ transform: `translateY(${scrollY * 0.01}px)` }}>
          <div>
            <h3 className="text-xl font-semibold mb-4 font-sans">Let's Connect</h3>
            <AnimatedText className="text-lg mb-6 leading-relaxed font-mono">
              I'm always interested in new opportunities, collaborations, and interesting projects. Whether you have a
              question or just want to say hi, feel free to reach out across the digital galaxy!
            </AnimatedText>
            <div className="space-y-4">
              <div className="flex items-center gap-3 hover:text-primary transition-colors duration-300 cursor-pointer font-mono">
                <Mail className="h-5 w-5 text-primary" />
                <span>{LINKS.email}</span>
              </div>
              <div className="flex items-center gap-3 hover:text-primary transition-colors duration-300 cursor-pointer font-mono">
                <Github className="h-5 w-5 text-primary" />
                <span>{LINKS.github}</span>
              </div>
              <div className="flex items-center gap-3 hover:text-primary transition-colors duration-300 cursor-pointer font-mono">
                <Linkedin className="h-5 w-5 text-primary" />
                <span>{LINKS.linkedin}</span>
              </div>
            </div>
          </div>
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Your Name" required className="w-full hover:border-primary/50 focus:border-primary transition-colors duration-300 font-mono" />
              <Input type="email" placeholder="Your Email" required className="w-full hover:border-primary/50 focus:border-primary transition-colors duration-300 font-mono" />
              <Textarea placeholder="Your Message" required className="w-full min-h-[120px] resize-none hover:border-primary/50 focus:border-primary transition-colors duration-300 font-mono" />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 font-mono">Send Message</Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}



