export type Skill = { name: string; level: number }

export const SKILLS = {
  frontend: [
    { name: "React/Next.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Three.js/R3F", level: 75 },
    { name: "Framer Motion", level: 80 },
  ] as Skill[],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "Firebase/Supabase", level: 70 },
  ] as Skill[],
  tools: [
    { name: "Git/GitHub", level: 90 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 75 },
    { name: "Vercel/Render", level: 85 },
  ] as Skill[],
  specializations: [
    { name: "3D Web", level: 80 },
    { name: "UI/UX Design", level: 85 },
    { name: "IoT/Embedded", level: 70 },
    { name: "REST APIs", level: 90 },
  ] as Skill[],
}



