export type Skill = { name: string; level: number }

export const SKILLS = {
  frontend: [
    { name: "React/Next.js", level: 90 },
    { name: "TypeScript/JavaScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Three.js", level: 65 },
  ] as Skill[],
  backend: [
    { name: "Node.js", level: 90 },
    { name: "Python", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 65 },
  ] as Skill[],
  tools: [
    { name: "Git/GitHub", level: 90 },
    { name: "Cursor", level: 90 },
    { name: "APIs", level: 80 },
    { name: "Machine Learning", level: 60 },
  ] as Skill[],
}



