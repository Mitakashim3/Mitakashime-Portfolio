export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Clark Jim Gabiota",
    "alternateName": "Mitakashime",
    "url": "https://mitakashime.vercel.app",
    "image": "https://mitakashime.vercel.app/Clark_Profile_Picture.png",
    "jobTitle": "Full-Stack Next.js Developer",
    "description": "Full-stack developer specializing in Next.js, React, TypeScript, AI/RAG architectures, and offline-first systems. Building production-ready SaaS applications.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bacolod City",
      "addressRegion": "Negros Occidental",
      "addressCountry": "PH"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "STI - West Negros University"
    },
    "knowsAbout": [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Rust",
      "Go",
      "Python",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "AI/RAG Architecture",
      "Offline-First Applications",
      "Full-Stack Development",
      "SaaS Development"
    ],
    "sameAs": [
      "https://github.com/Mitakashim3",
      "https://linkedin.com/in/clark-jim-gabiota"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Clark Mitakashime Portfolio",
    "url": "https://mitakashime.vercel.app",
    "description": "Full-stack developer portfolio showcasing production Next.js applications with AI integration and offline-first architectures",
    "author": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    }
  }

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "dateCreated": "2024-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString(),
    "mainEntity": {
      "@type": "Person",
      "name": "Clark Jim Gabiota",
      "alternateName": "Mitakashime",
      "description": "Full-Stack Next.js Developer & AI Integration Specialist"
    }
  }

  // Project schemas
  const resibilisSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Resibilis",
    "applicationCategory": "BusinessApplication",
    "description": "Production-ready receipt generator SaaS built with Next.js 16 and Supabase, serving 1,000+ Filipino entrepreneurs",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "url": "https://resibilis.vercel.app",
    "screenshot": "https://mitakashime.vercel.app/ResibilisDashboard.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "50"
    }
  }

  const kalagSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "KALAG",
    "applicationCategory": "ProductivityApplication",
    "description": "Production RAG (Retrieval-Augmented Generation) system built with Next.js and FastAPI featuring semantic search and AI-powered document analysis",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "url": "https://kalag.vercel.app",
    "screenshot": "https://mitakashime.vercel.app/KalagDashboard.png"
  }

  const optiposSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OptiPOS",
    "applicationCategory": "BusinessApplication",
    "description": "Enterprise-grade offline-first POS desktop application built with Tauri, React, and Rust for retail businesses",
    "operatingSystem": "Windows, macOS, Linux",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "url": "https://github.com/Mitakashim3/MItakashime-POS",
    "screenshot": "https://mitakashime.vercel.app/OptiPOSProject.png"
  }

  // Additional project schemas for remaining 7 projects
  const polyconSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "POLYCON",
    "applicationCategory": "EducationalApplication",
    "description": "Educational consultation and learning management system with Flask backend, React frontend, and PostgreSQL database serving 1,000+ sessions",
    "operatingSystem": "Web Browser",
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "url": "https://polycon-frontend.onrender.com/",
    "screenshot": "https://mitakashime.vercel.app/PolyconProject.png"
  }

  const vestiflowSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VestiFlow AI",
    "applicationCategory": "ProductivityApplication",
    "description": "AI-powered fashion design generator built with Next.js 16 and ComfyUI for custom clothing design creation",
    "operatingSystem": "Web Browser",
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "url": "https://github.com/Mitakashim3/VestiFlow-AI",
    "screenshot": "https://mitakashime.vercel.app/VestiFlowAutomate.png"
  }

  const aetherSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Aether Atelier",
    "applicationCategory": "ShoppingApplication",
    "description": "Luxury headless commerce platform for high-ticket dropshipping built with Next.js 16 and Stripe integration",
    "operatingSystem": "Web Browser",
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "url": "https://aether-atelier.vercel.app/",
    "screenshot": "https://mitakashime.vercel.app/AetherAtelierDashboard.png"
  }

  const luxuriagaSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Luxuriaga Hotel",
    "applicationCategory": "BusinessApplication",
    "description": "Luxury hotel booking platform with React Vite, Supabase backend, and integrated payment processing",
    "operatingSystem": "Web Browser",
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "url": "https://luxuriaga-hotel.netlify.app/",
    "screenshot": "https://mitakashime.vercel.app/LuxuriagaDashboard.png"
  }

  const webScraperSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Web Scraper",
    "applicationCategory": "UtilitiesApplication",
    "description": "Python-based web scraping tool with Gemini AI analysis, Playwright automation, and Google Sheets export",
    "operatingSystem": "Web Browser",
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "screenshot": "https://mitakashime.vercel.app/ai-web-scraper.png"
  }

  const jobswipeSchema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "JobSwipe",
    "applicationCategory": "BusinessApplication",
    "description": "React Native job matching mobile app with Tinder-style swiping and Firebase real-time messaging",
    "operatingSystem": "Android, iOS",
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "screenshot": "https://mitakashime.vercel.app/jobswipe-dashboard.png"
  }

  const reelsSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reels Automation",
    "applicationCategory": "MultimediaApplication",
    "description": "Python automation tool for YouTube Shorts generation with MoviePy video assembly and AI metadata",
    "operatingSystem": "Windows, macOS, Linux",
    "creator": {
      "@type": "Person",
      "name": "Clark Jim Gabiota"
    },
    "screenshot": "https://mitakashime.vercel.app/reels-automation-dashboard.png"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resibilisSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kalagSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optiposSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(polyconSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vestiflowSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aetherSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(luxuriagaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webScraperSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobswipeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reelsSchema) }}
      />
    </>
  )
}

