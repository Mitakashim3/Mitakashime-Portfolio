export type Project = {
  title: string
  description: string
  tech: string[]
  image: string
  href?: string
}

export const PROJECTS: Project[] = [
  {
    title: "AI-Powered Task Manager",
    description:
      "A smart task management app that uses AI to prioritize and categorize tasks automatically.",
    tech: ["React", "Node.js", "OpenAI API", "MongoDB"],
    image: "/modern-task-dashboard.png",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    image: "/clean-e-commerce-website-interface.jpg",
  },
  {
    title: "Weather Analytics Dashboard",
    description: "Real-time weather data visualization with predictive analytics and alerts.",
    tech: ["React", "D3.js", "Python", "FastAPI"],
    image: "/weather-dashboard-with-charts-and-graphs.jpg",
  },
  {
    title: "Social Media Scheduler",
    description: "Automated social media posting tool with analytics and content optimization.",
    tech: ["Vue.js", "Express.js", "Redis", "Social APIs"],
    image: "/social-media-management-interface.jpg",
  },
  {
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform built on blockchain technology.",
    tech: ["Solidity", "Web3.js", "React", "Ethereum"],
    image: "/blockchain-voting-interface.png",
  },
  {
    title: "ML Image Classifier",
    description: "Machine learning model for image classification with web interface.",
    tech: ["Python", "TensorFlow", "Flask", "Docker"],
    image: "/machine-learning-image-classification-app.jpg",
  },
]



