"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from "lucide-react"
import { BlackHole } from "@/components/black-hole"

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const maxScroll = 4000 // Approximate total scroll height
  const squeezeIntensity = Math.min(1, scrollY / maxScroll)
  const componentScale = 1 - squeezeIntensity * 0.05 // Subtle squeeze effect

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary font-mono">Portfolio</h1>
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-mono"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-mono"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-mono"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-mono"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
        style={{
          transform: `scale(${componentScale}) translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/10 to-background/30 z-20" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                transform: `translateY(${scrollY * (0.2 + Math.random() * 0.3)}px)`,
                boxShadow: `0 0 6px currentColor`,
              }}
            />
          ))}
        </div>

        <div className="relative z-40 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance animate-pulse gradient-text font-sans">
              Aspiring Computer Engineer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty backdrop-blur-sm bg-background/20 rounded-lg p-4 font-mono">
              Building innovative web applications and AI-powered solutions across the digital galaxy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 font-mono !text-background"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 font-mono text-foreground border-primary/50"
              >
                Get In Touch
              </Button>
            </div>
          </div>
          <div className="animate-bounce">
            <ChevronDown className="h-6 w-6 mx-auto text-primary" />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-20 px-6 relative z-40"
        style={{
          transform: `scale(${componentScale})`,
        }}
      >
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
            <div
              className="space-y-6"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text font-sans">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300 font-mono">
                I'm a passionate computer engineering student with a deep interest in web development, artificial
                intelligence, and creating innovative solutions that make a difference. My journey in technology started
                with curiosity and has evolved into a commitment to building impactful applications.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300 font-mono">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
                working on personal projects that challenge my skills and expand my knowledge across the digital
                universe.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 bg-transparent font-mono"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 bg-transparent font-mono"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
            <div
              className="flex justify-center"
              style={{
                transform: `translateY(${scrollY * -0.02}px)`,
              }}
            >
              <div className="relative w-80 h-80">
                <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/30 to-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-64 h-64 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-primary/30 hover:scale-105 transition-transform duration-500 shadow-lg shadow-primary/20">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5cJkO6MW0DNdF3bkF1fVJyvu9nOn3E.png"
                      alt="Profile"
                      className="w-56 h-56 rounded-full object-cover border-2 border-primary/20"
                    />
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

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-6 bg-muted/30 relative z-40"
        style={{
          transform: `scale(${componentScale})`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-sans">
            Featured Projects
          </h2>
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{
              transform: `translateY(${scrollY * 0.02}px)`,
            }}
          >
            {[
              {
                title: "AI-Powered Task Manager",
                description:
                  "A smart task management app that uses AI to prioritize and categorize tasks automatically.",
                tech: ["React", "Node.js", "OpenAI API", "MongoDB"],
                image: "/modern-task-dashboard.png",
              },
              {
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
                tech: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
                image: "/clean-e-commerce-website-interface.jpg",
              },
              {
                title: "Weather Analytics Dashboard",
                description: "Real-time weather data visualization with predictive analytics and alerts.",
                tech: ["React", "D3.js", "Python", "FastAPI"],
                image: "/weather-dashboard-with-charts-and-graphs.jpg",
              },
              {
                title: "Social Media Scheduler",
                description: "Automated social media posting tool with analytics and content optimization.",
                tech: ["Vue.js", "Express.js", "Redis", "Social APIs"],
                image: "/social-media-management-interface.jpg",
              },
              {
                title: "Blockchain Voting System",
                description: "Secure and transparent voting platform built on blockchain technology.",
                tech: ["Solidity", "Web3.js", "React", "Ethereum"],
                image: "/blockchain-voting-interface.png",
              },
              {
                title: "ML Image Classifier",
                description: "Machine learning model for image classification with web interface.",
                tech: ["Python", "TensorFlow", "Flask", "Docker"],
                image: "/machine-learning-image-classification-app.jpg",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-primary/10 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm"
                style={{
                  transform: `translateY(${scrollY * (0.01 + index * 0.005)}px)`,
                }}
              >
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 font-sans">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground transition-colors duration-300 font-mono text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs hover:bg-primary/20 transition-colors duration-300 font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 bg-transparent hover:scale-105 font-mono"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-6 relative z-40"
        style={{
          transform: `scale(${componentScale})`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-sans">
            Skills & Technologies
          </h2>
          <div
            className="grid md:grid-cols-3 gap-8"
            style={{
              transform: `translateY(${scrollY * 0.015}px)`,
            }}
          >
            <div className="group">
              <h3 className="text-xl font-semibold mb-4 text-primary group-hover:scale-105 transition-transform duration-300 font-sans">
                Frontend
              </h3>
              <div className="space-y-3">
                {[
                  { name: "React/Next.js", level: 90 },
                  { name: "TypeScript", level: 85 },
                  { name: "Tailwind CSS", level: 95 },
                  { name: "Vue.js", level: 75 },
                ].map((skill) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium group-hover/skill:text-primary transition-colors duration-300 font-mono">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 hover:shadow-lg hover:shadow-primary/25"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="group">
              <h3 className="text-xl font-semibold mb-4 text-primary group-hover:scale-105 transition-transform duration-300 font-sans">
                Backend
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Node.js", level: 85 },
                  { name: "Python", level: 80 },
                  { name: "PostgreSQL", level: 75 },
                  { name: "MongoDB", level: 70 },
                ].map((skill) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium group-hover/skill:text-primary transition-colors duration-300 font-mono">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 hover:shadow-lg hover:shadow-primary/25"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="group">
              <h3 className="text-xl font-semibold mb-4 text-primary group-hover:scale-105 transition-transform duration-300 font-sans">
                Tools & Others
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Git/GitHub", level: 90 },
                  { name: "Docker", level: 70 },
                  { name: "AWS", level: 65 },
                  { name: "Machine Learning", level: 60 },
                ].map((skill) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium group-hover/skill:text-primary transition-colors duration-300 font-mono">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 hover:shadow-lg hover:shadow-primary/25"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        className="py-20 px-6 bg-muted/30 relative z-40"
        style={{
          transform: `scale(${componentScale})`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-sans">
            Experience & Education
          </h2>
          <div
            className="space-y-8"
            style={{
              transform: `translateY(${scrollY * 0.02}px)`,
            }}
          >
            <Card className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold hover:text-primary transition-colors duration-300 font-sans">
                    Computer Engineering Student
                  </h3>
                  <p className="text-primary font-medium font-sans">University Name</p>
                </div>
                <span className="text-muted-foreground font-mono">2021 - Present</span>
              </div>
              <p className="text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300 font-mono">
                Pursuing Bachelor's degree in Computer Engineering with focus on software development, artificial
                intelligence, and system design. Relevant coursework includes Data Structures, Algorithms, Database
                Systems, and Machine Learning.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold hover:text-primary transition-colors duration-300 font-sans">
                    Frontend Developer Intern
                  </h3>
                  <p className="text-primary font-medium font-sans">Tech Startup</p>
                </div>
                <span className="text-muted-foreground font-mono">Summer 2023</span>
              </div>
              <p className="text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300 font-mono">
                Developed responsive web applications using React and TypeScript. Collaborated with design team to
                implement pixel-perfect UI components and improved application performance by 30%.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold hover:text-primary transition-colors duration-300 font-sans">
                    Open Source Contributor
                  </h3>
                  <p className="text-primary font-medium font-sans">Various Projects</p>
                </div>
                <span className="text-muted-foreground font-mono">2022 - Present</span>
              </div>
              <p className="text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300 font-mono">
                Active contributor to open-source projects including React libraries and developer tools. Contributed
                bug fixes, feature implementations, and documentation improvements to projects with 10k+ stars.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 relative z-40"
        style={{
          transform: `scale(${componentScale})`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-sans">Get In Touch</h2>
          <div
            className="grid md:grid-cols-2 gap-12"
            style={{
              transform: `translateY(${scrollY * 0.01}px)`,
            }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-4 font-sans">Let's Connect</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed hover:text-foreground transition-colors duration-300 font-mono">
                I'm always interested in new opportunities, collaborations, and interesting projects. Whether you have a
                question or just want to say hi, feel free to reach out across the digital galaxy!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 hover:text-primary transition-colors duration-300 cursor-pointer font-mono">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>your.email@example.com</span>
                </div>
                <div className="flex items-center gap-3 hover:text-primary transition-colors duration-300 cursor-pointer font-mono">
                  <Github className="h-5 w-5 text-primary" />
                  <span>github.com/yourusername</span>
                </div>
                <div className="flex items-center gap-3 hover:text-primary transition-colors duration-300 cursor-pointer font-mono">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span>linkedin.com/in/yourprofile</span>
                </div>
              </div>
            </div>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
              <form className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="w-full hover:border-primary/50 focus:border-primary transition-colors duration-300 font-mono"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full hover:border-primary/50 focus:border-primary transition-colors duration-300 font-mono"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="w-full min-h-[120px] resize-none hover:border-primary/50 focus:border-primary transition-colors duration-300 font-mono"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 font-mono">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 border-t border-border bg-muted/20 relative z-40"
        style={{
          transform: `scale(${componentScale})`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-6 gradient-text font-sans">
              Journey's End: The Event Horizon
            </h3>
            <BlackHole />
          </div>

          <div className="text-center">
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-mono">
              © 2024 Your Name. Built with Next.js and Tailwind CSS. Powered by the digital galaxy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
