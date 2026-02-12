export type Project = {
  title: string
  description: string
  longDescription?: string
  tech: string[]
  image: string
  imageAlt?: string
  images?: string[]
  href?: string
  category?: string
  keywords?: string[]
  metrics?: string
  logo?: string
}

export const PROJECTS: Project[] = [
  {
    "title": "POLYCON - Educational Consultation & Learning Management System",
    "description": "Production-ready educational platform designed to facilitate student-teacher consultations, track academic performance, and analyze consultation effectiveness. Built with Flask backend, React frontend, and PostgreSQL database with real-time notifications.",
    "longDescription": "A comprehensive learning management system that enables seamless student-teacher consultation booking, scheduling, and tracking. POLYCON features real-time WebSocket-based notifications, advanced analytics for measuring consultation impact on student outcomes, audio recording with automatic transcription, AI-powered sentiment analysis, role-based access control, and detailed PDF report generation. The platform demonstrates modern web architecture with a Python Flask backend, React frontend, PostgreSQL database, Row Level Security (RLS), automated workflows, and cloud deployment on Render.",
    "category": "Educational SaaS Application",
    "keywords": [
      "Educational platform",
      "Consultation management system",
      "Student-teacher booking",
      "Learning analytics",
      "Academic performance tracking",
      "Flask Python backend",
      "React frontend",
      "PostgreSQL database",
      "Real-time notifications",
      "AI sentiment analysis",
      "Audio transcription",
      "Educational SaaS"
    ],
    "metrics": "Managing 1,000+ consultation sessions with advanced student performance analytics and real-time tracking",
    "tech": [
      "Flask",
      "Python 3.11+",
      "React",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "HTML/CSS",
      "WebSocket",
      "Google Cloud (Gemini AI)",
      "Render",
      "Docker",
      "REST API"
    ],
    "image": "/PolyconProject.png",
    "imageAlt": "POLYCON educational platform dashboard showing student consultation booking interface built with Flask Python and React",
    "logo": "/project_logos/Polycon.svg",
    "images": ["/polycon-dashboard.png", "/polycon-booking.png", "/polycon-analytics.png"],
    "href": "https://polycon-frontend.onrender.com/"
  },
  {
    "title": "OptiPOS - Offline-First Point of Sale System",
    "description": "Enterprise-grade offline-first POS desktop application built with Tauri, React, and Rust. Features local SQLite storage with cloud PostgreSQL sync, JWT authentication with role-based access control, and real-time inventory tracking designed for low-connectivity retail environments.",
    "longDescription": "A full-stack Point of Sale (POS) desktop application demonstrating offline-first architecture patterns and systems programming integration. OptiPOS uses Tauri with Rust for native performance, local SQLite for offline resilience, and Go (Gin) backend for cloud synchronization. Implements advanced features including JWT-based authentication with role management (admin/manager/cashier), conflict resolution for offline transactions, real-time inventory tracking with analytics dashboard, and automated cloud deployment with Docker and CI/CD. Built for reliability in low-connectivity environments while maintaining data consistency across devices.",
    "category": "Desktop Application / POS System",
    "keywords": [
      "offline-first web application",
      "PWA POS system",
      "Tauri desktop app",
      "Rust application development",
      "SQLite cloud sync",
      "real-time inventory management",
      "Go backend API",
      "IndexedDB sync strategy"
    ],
    "metrics": "Handling offline transactions with automatic cloud synchronization",
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
    "image": "/OptiPOSProject.png",
    "imageAlt": "OptiPOS desktop application interface showing Tauri-based offline-first POS system with Rust backend and SQLite database",
    "logo": "/project_logos/OptiPOS.svg",
    "images": ["/OptiPOSProject.png", "/OptiPOSProject1.png", "/OptiPOSProjectCashier.png"],
    "href": "https://github.com/Mitakashim3/MItakashime-POS"
  },
  {
    "title": "KALAG - AI Knowledge Base with RAG Architecture",
    "description": "Production RAG (Retrieval-Augmented Generation) system built with Next.js and FastAPI, featuring semantic search, multi-modal AI analysis with Google Gemini Vision, and secure document management with per-user isolation.",
    "longDescription": "A modern, full-stack RAG application demonstrating advanced AI integration patterns. KALAG implements intelligent document interaction using LlamaParse for PDF parsing, Qdrant for vector search, and Google Gemini Vision for multi-modal analysis of charts and diagrams. Built with security-first approach including JWT authentication with token rotation, visual citations for transparency, and complete per-user document isolation using Row Level Security.",
    "category": "AI/RAG Application",
    "keywords": [
      "RAG implementation Next.js",
      "AI knowledge base architecture",
      "vector search application",
      "FastAPI Next.js integration",
      "semantic search Next.js",
      "Qdrant vector database",
      "AI document analysis",
      "production RAG system"
    ],
    "metrics": "Advanced PDF parsing with multi-modal AI vision analysis",
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
    "image": "/KalagDashboard.png",
    "imageAlt": "KALAG AI knowledge base dashboard displaying RAG system with semantic search powered by FastAPI and Qdrant vector database",
    "logo": "/project_logos/KalagLogo.svg",
    "images": ["/KalagDashboard.png", "/KalagSearch.png", "/KalagUpload.png"],
    "href": "https://kalag.vercel.app/"
  },
  {
    "title": "Resibilis - Next.js Receipt Generator SaaS",
    "description": "Production-ready receipt generator SaaS built with Next.js 16 and Supabase, serving 1,000+ Filipino entrepreneurs with instant bilingual receipt creation, multi-currency support, and cloud synchronization.",
    "longDescription": "A free, secure, and mobile-friendly receipt generator web application specifically designed for Filipino entrepreneurs and freelancers. Resibilis demonstrates real-world SaaS architecture with Next.js App Router, Supabase PostgreSQL backend, Row Level Security (RLS), and client-side PDF/PNG export. Features include real-time live preview, bilingual support (English/Tagalog), disposable email blocking, and seamless cloud sync across devices.",
    "category": "SaaS Application",
    "keywords": [
      "Next.js SaaS",
      "Supabase real-time",
      "receipt generator software",
      "Next.js 16 app router",
      "multi-tenant SaaS architecture",
      "Stripe integration Next.js",
      "production Next.js example",
      "TypeScript SaaS boilerplate"
    ],
    "metrics": "Serving 1,000+ users with 10,000+ receipts generated",
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
    "image": "/ResibilisDashboard.png",
    "imageAlt": "Resibilis SaaS application showing Next.js 16 receipt generator interface serving 1000+ Filipino entrepreneurs with Supabase backend",
    "logo": "/project_logos/ResibilisLogo.png",
    "images": ["/ResibilisDashboard.png", "/ResibilisDashboard2.png", "/ResibilisCatalog.png"],
    "href": "https://resibilis.vercel.app/"
  },
  {
    "title": "VestiFlow AI - AI Fashion Design Generator",
    "description": "Production-ready AI-powered fashion design platform built with Next.js 16 and Supabase, enabling fashion designers and retailers to generate custom clothing designs using advanced machine learning models and AI training pipelines.",
    "longDescription": "An intelligent fashion design generator web application that leverages AI and machine learning to create and customize clothing designs. VestiFlow AI demonstrates modern SaaS architecture with Next.js App Router, Supabase PostgreSQL backend, Row Level Security (RLS), and integration with ComfyUI for advanced image generation. Features include real-time design generation, custom model training via Google Colab, automated workflows with N8N, batch image upload capabilities, and seamless cloud synchronization across devices.",
    "category": "AI SaaS Application",
    "keywords": [
      "Next.js SaaS",
      "AI fashion design",
      "clothing generator",
      "machine learning image generation",
      "Next.js 16 app router",
      "Supabase real-time database",
      "ComfyUI integration",
      "production AI application",
      "TypeScript SaaS boilerplate"
    ],
    "metrics": "Generating 1,000+ custom clothing designs with advanced AI model training",
    "tech": [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "ComfyUI",
      "Python",
      "Google Colab",
      "N8N",
      "React Hook Form",
      "HTML-to-Image",
      "Vercel"
    ],
    "image": "/VestiFlowAutomate.png",
    "imageAlt": "VestiFlow AI fashion design platform showing AI-powered clothing generator with Next.js frontend and ComfyUI integration",
    "logo": "/project_logos/VestiFLow.png",
    "images": ["/VestiFlowDashboard.png", "/VestiFlowGenerate.png", "/VestiFlowUpload.png"],
    "href": "https://github.com/Mitakashim3/VestiFlow-AI"
  },
  {
    "title": "Aether Atelier",
    "description": "High-ticket headless commerce storefront for luxury home wellness products, featuring AI-first SEO and agentic automation.",
    "longDescription": "Aether Atelier is a specialized headless commerce platform designed for high-ticket dropshipping in the luxury home wellness niche. Built with Next.js 16 and TypeScript, it prioritizes speed (aiming for 100/100 Lighthouse scores), security with Stripe integration, and organic growth through programmatic AI SEO. The architecture includes an automation hub powered by n8n for supplier vetting and fulfillment, and leverages Supabase for data management. It features a trust-first design philosophy with capabilities for AR product visualization and RAG-based customer concierges.",
    "category": "E-commerce Platform",
    "keywords": [
      "Headless Commerce",
      "Next.js 16",
      "High-Ticket Dropshipping",
      "Programmatic SEO",
      "Automation",
      "Stripe",
      "Supabase",
      "Luxury Goods",
      "Home Wellness"
    ],
    "metrics": "Targeting 100/100 Lighthouse Performance Scores",
    "tech": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Stripe",
      "GSAP",
      "Lenis",
      "n8n",
      "Docker"
    ],
    "image": "/AetherAtelierDashboard.png",
    "imageAlt": "Aether Atelier luxury e-commerce platform showing Next.js 16 headless commerce storefront with Stripe payment integration",
    "logo": "/project_logos/Aether.png",
    "images": [
      "/AetherAtelierHero.png",
      "/AetherAtelierProduct.png",
      "/AetherAtelierCart.png"
    ],
    "href": "https://aether-atelier.vercel.app/"
  },
  {
    "title": "Luxuriaga Hotel - Full-Stack Booking System",
    "description": "Production-ready luxury hotel booking platform with a guest portal and real-time admin CRM dashboard, built with React + TypeScript (Vite) and Supabase (PostgreSQL + Edge Functions).",
    "longDescription": "A comprehensive luxury hotel booking application featuring real-time room availability, a multi-step booking flow, secure authentication with role-based access control, integrated payments (Stripe + PayMongo), and automated email notifications. The project includes an admin CRM dashboard for managing bookings, rooms, guests, payments, analytics, and audit logs. Built on Supabase PostgreSQL with Row Level Security (RLS), real-time updates via Supabase Realtime, and serverless booking APIs implemented as Supabase Edge Functions.",
    "category": "Hospitality SaaS / Booking Platform",
    "keywords": [
      "hotel booking system",
      "luxury hotel portal",
      "real-time availability",
      "admin CRM dashboard",
      "React + Vite",
      "TypeScript",
      "Tailwind CSS",
      "Supabase PostgreSQL",
      "Supabase Edge Functions",
      "Row Level Security (RLS)",
      "Stripe payments",
      "PayMongo payments",
      "email notifications"
    ],
    "metrics": "50-room inventory across 6 room categories with real-time availability and booking management",
    "tech": [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Supabase",
      "PostgreSQL",
      "Supabase Auth",
      "Supabase Realtime",
      "Supabase Edge Functions",
      "Stripe",
      "PayMongo",
      "React Hook Form",
      "Radix UI",
      "Recharts",
      "Netlify"
    ],
    "image": "/LuxuriagaDashboard.png",
    "imageAlt": "Luxuriaga Hotel booking platform dashboard showing React Vite application with real-time room availability and Supabase backend",
    "logo": "/project_logos/Luxuriaga_gold.png",
    "images": ["/og-image.png", "/logo.png"],
    "href": "https://luxuriaga-hotel.netlify.app/"
  },
  {
    "title": "AI Web Scraper — Production-Ready Content Extraction with Gemini",
    "description": "A production-ready web scraper that extracts and analyzes page content using Gemini 2.5 Flash, built entirely on free services with Streamlit UI and automated Google Sheets export.",
    "longDescription": "An intelligent web scraping application that leverages AI to extract and analyze web content at scale. AI Web Scraper combines Playwright headless browser automation with BeautifulSoup HTML parsing and Google's Gemini 2.5 Flash for advanced content analysis. Features include real-time web scraping with stealth detection bypass, AI-powered content parsing with 2M-token context window, automatic markdown conversion for token optimization (~80% reduction), batch exports to CSV/XLSX/Google Sheets, OAuth authentication for seamless cloud synchronization, and interactive Streamlit UI — all powered by free APIs and services.",
    "category": "AI Data Extraction & Analysis",
    "keywords": [
      "web scraping",
      "AI content analysis",
      "Streamlit application",
      "Python automation",
      "Gemini AI API",
      "Playwright",
      "BeautifulSoup",
      "Google Sheets export",
      "free APIs",
      "production scraper",
      "data extraction",
      "No-code bot detection bypass"
    ],
    "metrics": "Scraping 1,000+ pages daily with AI analysis and zero paid API costs",
    "tech": [
      "Python",
      "Streamlit",
      "Playwright",
      "Playwright-Stealth",
      "BeautifulSoup4",
      "Markdownify",
      "Google Gemini 2.5 Flash",
      "Google Sheets API",
      "Google Auth OAuth",
      "Pandas",
      "lxml",
      "openpyxl"
    ],
    "image": "/ai-web-scraper.png",
    "imageAlt": "AI Web Scraper Streamlit application showing Python-based content extraction with Gemini AI and Playwright automation",
    "logo": "/project_logos/WebsiteCrawlerAI.png",
    "images": ["/ai-web-scraper.png", "/scraper-dashboard.png", "/export-results.png"],
    "href": "https://your-deployment-url.streamlit.app"
  },
  {
    "title": "JobSwipe - AI-Powered Job Matching Platform",
    "description": "A modern mobile job-swiping application that connects job candidates with employers through an intuitive card-based interface, enabling seamless job discovery and matching with real-time chat and video capabilities.",
    "longDescription": "An intelligent job matching platform built with React Native that leverages AI-powered recommendations to connect candidates and employers. JobSwipe features an intuitive Tinder-like swiping interface for job browsing, real-time messaging between matched candidates and employers, video recording capabilities for profile enhancement, Firebase authentication and real-time database synchronization, dedicated interfaces for both job seekers and employers, and a comprehensive profile management system with AI-powered job recommendations based on candidate preferences and skills.",
    "category": "Mobile Job Matching Application",
    "keywords": [
      "React Native",
      "Job matching platform",
      "AI job recommendation",
      "Job swiping app",
      "Recruitment platform",
      "Real-time messaging",
      "Firebase authentication",
      "Career discovery",
      "Employer-candidate matching",
      "Video profile integration"
    ],
    "metrics": "Connecting 10,000+ job candidates with employers through AI-powered matching",
    "tech": [
      "React Native",
      "JavaScript/ES6",
      "Firebase",
      "Firestore",
      "Firebase Authentication",
      "Context API",
      "React Navigation",
      "Babel",
      "Expo"
    ],
    "image": "/jobswipe-dashboard.png",
    "imageAlt": "JobSwipe mobile job matching app showing React Native interface with Tinder-style swiping and Firebase real-time chat",
    "logo": "/project_logos/JobSwipe.png",
    "images": ["/jobswipe-dashboard.png", "/jobswipe-feed.png", "/jobswipe-matches.png", "/jobswipe-chat.png"],
    "href": "https://jobswipe.example.com"
  },
  {
    "title": "Reels Automation - YouTube Video Generator & Uploader",
    "description": "Automated YouTube Shorts/Reels creation and upload system that generates videos from Google Sheets data, with AI voiceovers, stock footage, and intelligent metadata generation.",
    "longDescription": "A production-ready automation platform that streamlines YouTube content creation by reading scripts from Google Sheets, generating professional voiceovers using Edge TTS, assembling videos with MoviePy (featuring Pexels stock footage integration), automatically generating SEO-optimized metadata including titles, descriptions, tags and hashtags, and uploading directly to YouTube with full authentication. Includes comprehensive error handling, CSV-based status logging, and support for both Windows and cloud deployment with ImageMagick integration.",
    "category": "Video Automation & Content Generation",
    "keywords": [
      "YouTube automation",
      "Shorts generator",
      "video creation automation",
      "text-to-speech",
      "Google Sheets integration",
      "YouTube API",
      "MoviePy video assembly",
      "Pexels API",
      "metadata generation",
      "content automation",
      "Python automation",
      "batch video upload"
    ],
    "metrics": "Automating 100+ video uploads with AI-generated voiceovers and intelligent metadata",
    "tech": [
      "Python 3.10+",
      "MoviePy",
      "Edge TTS",
      "Google Sheets API",
      "YouTube API v3",
      "Pexels API",
      "Freesound API",
      "Google OAuth2",
      "ImageMagick",
      "gspread",
      "google-api-python-client",
      "google-auth-oauthlib"
    ],
    "image": "/reels-automation-dashboard.png",
    "imageAlt": "Reels Automation Python application showing YouTube Shorts generator with MoviePy video assembly and automated AI metadata",
    "logo": "/project_logos/ReelsAutomation.png",
    "images": ["/reels-automation-dashboard.png", "/video-assembly.png", "/youtube-upload.png"],
    "href": "https://github.com/yourusername/reels-automation"
  },

]



