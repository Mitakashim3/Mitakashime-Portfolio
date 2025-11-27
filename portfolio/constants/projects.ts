export type Project = {
  title: string
  description: string
  tech: string[]
  image: string
  images?: string[]
  href?: string
}

export const PROJECTS: Project[] = [
  {
    title: "POLYCON",
    description:
      "A cross-platform consultation system developed as a thesis project for streamlining manual consultation workflows. Features include descriptive analysis and an AI-driven minutes recorder to automatically transcribe and summarize meetings. Built collaboratively under the group name Develorant (now Conqode).",
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Python (Flask)",
      "AssemblyAI API",
      "Gemini API",
      "PostgreSQL",
      "WebSockets",
      "Cloudinary",
      "Render"
    ],
    image: "/PolyconProject.png",
    images: ["/PolyconProject.png", "/PolyconProject1.png", "/PolyconProject2.png"],
    href: "",
  },
  {
    title: "Estature",
    description:
      "A real-estate platform with AI-assisted broker eligibility scoring that aggregates social media signals to provide richer client insights. The system evaluates broker profiles by analyzing publicly available social data to improve client trust and matching accuracy. This project is actively in development.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python (FastAPI)",
      "MongoDB",
      "Redis",
      "NextAuth",
      "Social Media APIs (LinkedIn, X, Facebook)",
      "Cloudinary",
      "Render",
      "Gemini"
    ],
    image: "/EstatureProject.png",
    images: ["/EstatureProject.png", "/EstatureProject.png", "/EstatureProject.png"],
    href: "",
  },
  {
    title: "Portnerate",
    description:
      "A portfolio-generation web app that creates ready-to-publish portfolios from user inputs and selectable templates. The project is designed to experiment with automated content generation, responsive template composition, PDF export, and customizable styling presets to rapidly produce professional portfolios for different fields.",
    tech: [
      "Vite",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python (Flask)",
      "Serverless functions",
      "Puppeteer (PDF export)",
      "Cloudinary",
      "Prisma"
    ],
    image: "/PortnerateProject.jpg",
    images: ["/PortnerateProject.jpg", "/PortnerateProject.jpg", "/PortnerateProject.jpg"],
    href: "",
  },
  {
  "title": "OptiPOS",
  "description": "A full-stack Point of Sale (POS) desktop application built for retail businesses. Features offline-first architecture with local SQLite storage that syncs to cloud PostgreSQL, JWT-based authentication with role management (admin/manager/cashier), real-time inventory tracking, transaction history with analytics dashboard, and automated cloud deployment. Designed for reliability in low-connectivity environments while maintaining data consistency across devices.",
  "tech": [
    "Tauri",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Rust",
    "Go (Gin)",
    "SQLite",
    "PostgreSQL",
    "JWT Authentication",
    "Docker",
    "Render (Cloud Hosting)",
    "GitHub Actions (CI/CD)"
  ],
  "image": "/OptiPOSProject.jpg",
  "images": ["/OptiPOSProject.png", "/OptiPOSProject1.png", "/OptiPOSProjectCashier.png"],
  "href": "https://github.com/Mitakashim3/MItakashime-POS"
}
]



