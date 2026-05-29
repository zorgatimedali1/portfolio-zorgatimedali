export interface Service {
  name: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    name: "Full Stack Development",
    description:
      "End-to-end web applications with modern frontend frameworks and robust backend APIs. Scalable architecture from database to deployment.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Mobile App Development",
    description:
      "Native-quality cross-platform mobile apps using Flutter. Smooth animations, offline support, and real-time data synchronization.",
    tags: ["Flutter", "Dart", "Firebase"],
  },
  {
    name: "Backend API Development",
    description:
      "RESTful and GraphQL APIs built for performance and reliability. Microservices architecture with authentication and caching layers.",
    tags: ["Spring Boot", "Node.js", "SQL"],
  },
  {
    name: "AI Integration",
    description:
      "Intelligent features powered by machine learning — recommendation engines, chatbots, and data analysis pipelines.",
    tags: ["Python", "TensorFlow", "NLP"],
  },
  {
    name: "UI/UX Engineering",
    description:
      "Pixel-perfect interfaces with smooth interactions. Component-driven development with design systems and accessibility in mind.",
    tags: ["Figma", "Tailwind", "Framer"],
  },
  {
    name: "Cloud & DevOps",
    description:
      "Deployment automation, CI/CD pipelines, and cloud infrastructure management for reliable, scalable applications.",
    tags: ["Firebase", "Docker", "GitHub Actions"],
  },
];
