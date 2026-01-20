export type DesignProject = {
  id: string
  title: string
  description: string
  problem: string
  solution: string
  category: "ui-ux" | "graphic"
  imageUrl: string // Hero image
  detailImages: string[] // For lightbox or detailed view
  prototypeUrl?: string
  date: string
  // New visual fields
  palette?: string[]
  typography?: string
  buttonStyle?: {
    label: string
    css: Record<string, string | number>
  }
}

export const DESIGN_PROJECTS: DesignProject[] = [
  // UI/UX Projects
  {
    id: "uiux-1",
    title: "EcoSmart Home App",
    category: "ui-ux",
    description: "A smart home interface designed to help users reduce energy consumption through intuitive data visualization.",
    problem: "Users struggle to understand their energy bills and don't know which appliances are consuming the most power.",
    solution: "Designed a dashboard with real-time consumption graphs and device-level tracking, resulting in a theoretical 15% reduction in user energy usage.",
    imageUrl: "https://placehold.co/1200x800",
    detailImages: ["https://placehold.co/1200x800", "https://placehold.co/1200x800"],
    date: "2024",
    palette: ["#10B981", "#064E3B", "#ECFDF5", "#374151"],
    typography: "Inter",
    buttonStyle: {
      label: "View Dashboard",
      css: {
        backgroundColor: "#10B981",
        color: "#ffffff",
        borderRadius: "12px",
        padding: "12px 24px",
        fontWeight: "600",
        boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.4)"
      }
    }
  },
  {
    id: "uiux-2",
    title: "FinTrack Mobile Banking",
    category: "ui-ux",
    description: "A clean, modern banking application focused on financial wellness and goal setting.",
    problem: "Traditional banking apps are cluttered and intimidating for young adults managing finances for the first time.",
    solution: "Simplified the navigation structure and introduced gamified savings goals, increasing user retention in testing.",
    imageUrl: "https://placehold.co/1200x800",
    detailImages: ["https://placehold.co/1200x800"],
    date: "2023",
    palette: ["#4F46E5", "#312E81", "#EEF2FF", "#1F2937"],
    typography: "Plus Jakarta Sans",
    buttonStyle: {
      label: "Send Money",
      css: {
        backgroundColor: "#4F46E5",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "14px 28px",
        fontWeight: "700",
        letterSpacing: "0.5px"
      }
    }
  },
  {
    id: "uiux-3",
    title: "HealthPulse Telemedicine",
    category: "ui-ux",
    description: "A patient-first telemedicine platform connecting doctors and patients seamlessly.",
    problem: "Elderly patients found existing appointment scheduling flows confusing and inaccessible.",
    solution: "Created high-contrast large-text interfaces and a one-click appointment system.",
    imageUrl: "https://placehold.co/1200x800",
    detailImages: ["https://placehold.co/1200x800"],
    prototypeUrl: "https://figma.com",
    date: "2023",
    palette: ["#0EA5E9", "#0c4a6e", "#f0f9ff", "#0f172a"],
    typography: "DM Sans",
    buttonStyle: {
      label: "Book Appointment",
      css: {
        backgroundColor: "#0EA5E9",
        color: "#ffffff",
        borderRadius: "8px",
        padding: "16px 32px",
        fontSize: "18px",
        fontWeight: "bold"
      }
    }
  },
  // Graphic Design Projects
  {
    id: "gfx-1",
    title: "Nebula Brand Identity",
    category: "graphic",
    description: "Complete brand visual identity for a tech startup focusing on cloud computing.",
    problem: "The client needed a logo that conveyed 'speed', 'future', and 'reliability' without being generic.",
    solution: "Developed a dynamic logo system based on orbital paths, paired with a vibrant color palette.",
    imageUrl: "https://placehold.co/800x600",
    detailImages: ["https://placehold.co/800x600", "https://placehold.co/800x600"],
    date: "2024",
  },
  {
    id: "gfx-2",
    title: "Oceania Conservation Poster Series",
    category: "graphic",
    description: "A series of posters raising awareness about ocean pollution.",
    problem: "Environmental messages often feel scolding; the goal was to inspire beauty and protection.",
    solution: "Used double-exposure photography mixed with typography to merge marine life with human elements.",
    imageUrl: "https://placehold.co/600x800",
    detailImages: ["https://placehold.co/600x800"],
    date: "2023",
  },
  {
    id: "gfx-3",
    title: "Retro Vinyl Cover Art",
    category: "graphic",
    description: "Album art for an indie synth-wave band.",
    problem: "Band wanted a look that felt like 1980s nostalgia but with modern production value.",
    solution: "Created a digital painting style evocative of airbrush art from the 80s.",
    imageUrl: "https://placehold.co/800x800",
    detailImages: ["https://placehold.co/800x800"],
    date: "2023",
  },
]
