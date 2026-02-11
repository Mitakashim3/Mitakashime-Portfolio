"use client"

import { CurvedCarousel } from "@/components/sections/design/CurvedCarousel"

const SETS: Array<{ title: string; images: string[] }> = [
  {
    title: "Your UI screenshots (mostly landscape)",
    images: [
      "/ResibilisDashboard.png",
      "/KalagDashboard.png",
      "/OptiPOSProject.png",
      "/modern-task-dashboard.png",
      "/social-media-management-interface.jpg",
      "/weather-dashboard-with-charts-and-graphs.jpg",
      "/ResibilisCatalog.png",
    ],
  },
  {
    title: "Mixed + tall-ish screenshots",
    images: [
      "/OptiPOSProjectCashier.png",
      "/PortnerateProject.jpg",
      "/EstatureProject.png",
      "/PolyconProject2.png",
      "/KalagUpload.png",
      "/KalagSearch.png",
    ],
  },
  {
    title: "Square / icon / textures (incl. GIF)",
    images: [
      "/himmel1x1.png",
      "/MitakashimeLogo(B&W)Circle.png",
      "/textures/Blackhole_ring_baseColor.png",
      "/textures/image_0.png",
      "/UFO.gif",
    ],
  },
]

export default function CarouselTestPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <h1 className="text-3xl md:text-5xl font-bold">Carousel Test Playground</h1>
        <p className="text-white/70">
          Open this page while running dev server to preview how different image aspect ratios look.
          Try resizing the browser window.
        </p>
        <div className="text-white/60 text-sm">
          URL: <span className="text-white">/carousel-test</span>
        </div>
      </div>

      <section className="space-y-20 pb-24">
        {SETS.map((set) => (
          <div key={set.title} className="space-y-10">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-semibold">{set.title}</h2>
              <p className="text-white/60 text-sm">
                Testing 3 widths + 2 speeds. Images are placeholders with explicit dimensions.
              </p>
            </div>

            {/* Small cards */}
            <div className="relative w-screen left-1/2 -translate-x-1/2">
              <CurvedCarousel
                images={set.images}
                cardWidth={360}
                gap={32}
                speedPxPerSec={55}
                heightClassName="h-[420px]"
                perspective={1400}
              />
            </div>

            {/* Default-ish */}
            <div className="relative w-screen left-1/2 -translate-x-1/2">
              <CurvedCarousel
                images={set.images}
                cardWidth={520}
                gap={40}
                speedPxPerSec={60}
                heightClassName="h-130"
                perspective={1500}
              />
            </div>

            {/* Large cards (slower) */}
            <div className="relative w-screen left-1/2 -translate-x-1/2">
              <CurvedCarousel
                images={set.images}
                cardWidth={680}
                gap={48}
                speedPxPerSec={45}
                heightClassName="h-[620px]"
                perspective={1700}
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
