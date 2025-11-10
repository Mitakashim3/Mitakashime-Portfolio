export const SITE = {
  handle: "mitakashime",
  name: "Mitakashime",
  displayName: "Clark Jim Gabiota",
  tagline: "Web Developer",
}

export const HERO = {
  title: `Hi there, I'm ${SITE.name}!`,
  subtitle: `${SITE.displayName} - ${SITE.tagline}`,
  primaryCta: { label: "View My Work", target: "projects" },
  secondaryCta: { label: "Get In Touch", target: "contact" },
}

export const ABOUT = {
  paragraphs: [
    "I'm a passionate computer science student with a deep interest in web development, artificial intelligence, and creating innovative solutions that make a difference. My journey in technology started with curiosity and has evolved into a commitment to building impactful applications.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or working on personal projects that challenge my skills and expand my knowledge across the digital universe.",
  ],
  profileImage: "/himmel1x1.png",
}

export type ExperienceEntry = {
  title: string
  organization: string
  period: string
  description: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: "Computer Science Student",
    organization: "STI - West Negros University",
    period: "2021 - Present",
    description:
      "Pursuing Bachelor's degree in Computer Science with focus on software development, artificial intelligence, and system design. Relevant coursework includes Data Structures, Algorithms, Database Systems, and Machine Learning.",
  },
  {
    title: "Frontend Developer Intern",
    organization: "Tech Startup",
    period: "Summer 2023",
    description:
      "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components and improved application performance by 30%.",
  },
  {
    title: "Open Source Contributor",
    organization: "Various Projects",
    period: "2022 - Present",
    description:
      "Active contributor to open-source projects including React libraries and developer tools. Contributed bug fixes, feature implementations, and documentation improvements to projects with 10k+ stars.",
  },
]
