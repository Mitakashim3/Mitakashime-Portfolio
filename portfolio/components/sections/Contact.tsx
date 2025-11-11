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
              <a
                href={`mailto:${LINKS.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-300 cursor-pointer font-mono group px-2 py-1 rounded-md hover:bg-primary/10 hover:shadow-md"
              >
                <Mail className="h-5 w-5 text-primary group-hover:scale-125 transition-transform duration-300" />
                <span className="group-hover:text-primary group-hover:decoration-2 transition-colors duration-300">
                  Gmail - clarkjimgabiota
                </span>
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-300 cursor-pointer font-mono group px-2 py-1 rounded-md hover:bg-primary/10 hover:shadow-md"
              >
                <Github className="h-5 w-5 text-primary group-hover:scale-125 transition-transform duration-300" />
                <span className="group-hover:text-primary group-hover:decoration-2 transition-colors duration-300">
                  GitHub - Mitakashim3
                </span>
              </a>
              <a
                href={`https://${LINKS.linkedin.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-300 cursor-pointer font-mono group px-2 py-1 rounded-md hover:bg-primary/10 hover:shadow-md"
              >
                <Linkedin className="h-5 w-5 text-primary group-hover:scale-125 transition-transform duration-300" />
                <span className=" group-hover:text-primary group-hover:decoration-2 transition-colors duration-300">
                  LinkedIn - Clark Jim Gabiota
                </span>
              </a>
            </div>


          </div>
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const data = {
                  name: e.target[0].value,
                  email: e.target[1].value,
                  message: e.target[2].value,
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
                  e.target.reset();
                } else {
                  alert('Failed to send.');
                }
              }}>
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




