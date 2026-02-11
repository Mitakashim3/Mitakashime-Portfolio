export const SITE = {
  handle: "mitakashime",
  name: "Mitakashime",
  displayName: "Clark Jim Gabiota",
  tagline: "Full-Stack Next.js Developer | AI Integration Specialist | Building Production SaaS",
}

export const HERO = {
  title: `Hi there, I'm ${SITE.name}!`,
  subtitle: `${SITE.displayName} - ${SITE.tagline}`,
  description: "Building production-ready web applications with Next.js, React, TypeScript, and AI. Specializing in SaaS platforms, RAG systems, and offline-first architecture.",
  primaryCta: { label: "View My Work", target: "projects" },
  secondaryCta: { label: "Get In Touch", target: "contact" },
}

export const ABOUT = {
  paragraphs: [
    "Full-stack developer specializing in production Next.js applications, AI/RAG systems, and offline-first architecture. Built 10+ production applications including Resibilis (1,000+ users), KALAG (RAG knowledge base), OptiPOS (Tauri desktop POS), and POLYCON (educational LMS). Expert in React, TypeScript, Python, Rust, and modern web technologies.",
    "Strong foundation in both elegant UI/UX design (Figma) and robust backend systems (Supabase, PostgreSQL, FastAPI). When I'm not coding, you'll find me exploring cutting-edge AI technologies like RAG architectures, building automation workflows, or contributing to open-source projects.",
  ],
  profileImage: "/Clark_Profile_Picture.png",
}

export type ExperienceEntry = {
  title: string
  organization: string
  period: string
  description: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: "Project Lead & Full-Stack Developer",
    organization: "Resibilis (SaaS)",
    period: "Present",
    description:
      "Directed the end-to-end development and marketing of a rental property generator for Filipino customers. Implemented comprehensive SEO strategy to increase organic traffic and user acquisition. Designed and developed a 'mobile-first' professional interface to ensure high user retention. Security-oriented advanced custom middleware to protect against disposable email domains and security threats.",
  },
  {
    title: "Full-Stack Developer",
    organization: "POLYCON Archiesis Project",
    period: "2022 - 2025",
    description:
      "System Architecture: Assisted in the design and development of a cross-platform consultation system aimed at bridging communication gaps between designers and faculty. Features: Developed features including an AI-powered chatbot with Ranking System integrated with a feedback loop, providing the necessary tools for the project's comparative analysis and performance evaluation. Concept Analysis: Orchestrated the project's concern analysis framework, designing the logic to identify, categorize, and prioritize user issues for more efficient and effective solution. Transcription Technology: Designed an innovative consultation model that automates the transcription and summarization of consultation sessions in real-time.",
  },
  {
    title: "Light Annotator & Video Annotator",
    organization: "Remotasks (2020-2021) & LVMAI Atlas (2025)",
    period: "2020 - 2021, 2025",
    description:
      "Data Management: Annotated high-accuracy LiDAR images to support Machine Learning datasets. Quality Control: Enhanced data precision for computer vision used in AI training. Video Annotation: Validated and used descriptive text annotations for complex video data from frontier Physical AI models in perceiving and reasoning within real-world environments.",
  },
  {
    title: "Bachelor of Science in Computer Science",
    organization: "STI-West Negros University",
    period: "2025 - 2026",
    description:
      "Dean's Lister (2023-2025). Pursuing comprehensive education in software development, artificial intelligence, and system design with focus on practical applications and innovative solutions.",
  },
  {
    title: "Certificates & Training",
    organization: "Various Platforms",
    period: "2022 - Present",
    description:
      "Ongoing: WordPress - The Complete WordPress (Immersion Program, Spring Valley Corp). Completed: Cisco Python Essentials 1, LinkedIn Learning: Generative AI, Philippine Army Cyber Defense Exercise, Hubspot SEO Certificate. Continuously expanding technical expertise through professional development and specialized training programs.",
  },
]
