import type React from "react"
import type { Metadata } from "next"
import { Orbitron } from "next/font/google"
import { Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mitakashime.vercel.app'),
  title: {
    default: "Clark Jim Gabiota | Full-Stack Next.js Developer & AI Integration Specialist",
    template: "%s | Clark Mitakashime"
  },
  description: "Full-stack developer building production Next.js applications with AI/RAG architecture, offline-first systems, and modern web technologies. Specializing in React, TypeScript, Rust, and FastAPI. Available for remote roles.",
  keywords: [
    "Next.js developer",
    "full-stack React developer",
    "AI integration specialist",
    "RAG implementation",
    "remote software engineer",
    "TypeScript developer",
    "React developer",
    "SaaS developer",
    "Rust developer",
    "FastAPI developer",
    "Supabase developer",
    "offline-first architecture",
    "Next.js portfolio",
    "software engineer Philippines",
    "Bacolod developer"
  ],
  authors: [{ name: "Clark Jim Gabiota", url: "https://mitakashime.vercel.app" }],
  creator: "Clark Jim Gabiota",
  publisher: "Clark Jim Gabiota",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mitakashime.vercel.app",
    siteName: "Clark Mitakashime Portfolio",
    title: "Clark Jim Gabiota - Full-Stack Next.js Developer & AI Integration Specialist",
    description: "Building production-ready SaaS & AI applications with Next.js, React, TypeScript, and modern web technologies. Explore my projects: Resibilis, KALAG, and OptiPOS.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clark Mitakashime - Full-Stack Developer Portfolio"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clark Jim Gabiota - Full-Stack Next.js Developer",
    description: "Building production Next.js apps with AI/RAG, offline-first architecture, and modern web tech. Available for remote roles.",
    creator: "@mitakashime",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/MitakashimeLogo(B&W)Circle.svg",
    shortcut: "/MitakashimeLogo(B&W)Circle.svg",
    apple: "/MitakashimeLogo(B&W)Circle.svg",
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#14141a" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://mitakashime.vercel.app" />
        {/* Fallback favicon links for browsers that don't use metadata.icons */}
        <link rel="icon" href="/MitakashimeLogo(B&W)Circle.svg" />
        <link rel="shortcut icon" href="/MitakashimeLogo(B&W)Circle.svg" />
        <link rel="apple-touch-icon" href="/MitakashimeLogo(B&W)Circle.svg" />
      </head>
      <body className={`${orbitron.variable} ${spaceMono.variable} overflow-x-hidden touch-pan-y`} style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>{children}</Suspense>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
