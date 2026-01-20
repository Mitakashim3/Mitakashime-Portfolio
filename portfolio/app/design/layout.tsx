import { DesignHeader } from "@/components/sections/design/DesignHeader"
import { Archivo_Black } from "next/font/google"

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
})

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-foreground ${archivo.variable}`}>
        <DesignHeader />
        <main className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
            {children}
        </main>
    </div>
  )
}
