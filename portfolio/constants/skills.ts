export type Skill = { name: string; level: number }

export const SKILLS = {
  frontend: [
    { name: "React/Next.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Vue.js", level: 75 },
  ] as Skill[],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 70 },
  ] as Skill[],
  tools: [
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 70 },
    { name: "AWS", level: 65 },
    { name: "Machine Learning", level: 60 },
  ] as Skill[],
}



