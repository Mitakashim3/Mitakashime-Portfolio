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
    href: "https://polycon-frontend.onrender.com/",
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
},
{
  "title": "Kalag",
  "description": "A modern, full-stack RAG (Retrieval-Augmented Generation) application designed for intelligent document interaction. Features advanced PDF parsing with LlamaParse and multi-modal AI analysis using Google Gemini Vision to extract charts and diagrams. Includes semantic search via Qdrant, visual citations, secure JWT authentication with token rotation, and per-user document isolation.",
  "tech": [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "Python (FastAPI)",
    "Google Gemini AI",
    "LlamaParse",
    "Qdrant (Vector DB)",
    "Supabase (PostgreSQL)",
    "Docker",
    "Render",
    "Vercel"
  ],
  "image": "/KalagProject.jpg",
  "images": ["/KalagDashboard.png", "/KalagSearch.png", "/KalagUpload.png"],
  "href": "https://github.com/Mitakashim3/Kalag"
},
{
  "title": "Resibilis",
  "description": "A free, secure, and mobile-friendly receipt generator web application built specifically for Filipino entrepreneurs and freelancers. Features instant receipt creation with real-time live preview, bilingual support (English/Tagalog), and multi-currency handling (PHP, USD, EUR). Built with Next.js App Router and Supabase, it implements strict security measures including disposable email blocking and Row Level Security (RLS), while offering client-side PDF/PNG export and cloud synchronization.",
  "tech": [
    "Next.js 16",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "React Hook Form",
    "Zod",
    "jsPDF",
    "html-to-image",
    "Vercel"
  ],
  "image": "/ResibilisProject.jpg",
  "images": ["/ResibilisDashboard.png", "/ResibilisInvoice.png", "/ResibilisMobile.png"],
  "href": "https://resibilis.vercel.app/"
}
]



