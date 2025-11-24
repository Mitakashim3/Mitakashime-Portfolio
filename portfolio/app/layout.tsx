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
  title: "Mitakashime Portfolio",
  description: "A portfolio showcasing the projects and skills of Mitakashime.",
  icons: {
    icon: "/MitakashimeLogo.svg",
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
      </head>
      <body className={`font-sans ${orbitron.variable} ${spaceMono.variable} overflow-x-hidden touch-pan-y`}>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>{children}</Suspense>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
