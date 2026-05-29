export interface TimelineItem {
  title: string;
  institution: string;
  date: string;
  description: string;
  icon: "graduation" | "building" | "briefcase";
  logo?: string;
  photo?: string;
}

export const timelineItems: TimelineItem[] = [
  {
    title: "Engineering Diploma in Software Engineering",
    institution: "Polytechnique Sousse, Tunisia",
    date: "2024 – Present",
    description:
      "Specializing in full-stack development, mobile applications, and software architecture. Advanced coursework in distributed systems, AI integration, and agile methodologies.",
    icon: "graduation",
    logo: "/images/essths-logo.png",
    photo: "/images/polytechsousse.png",
  },
  {
    title: "Final Year Internship",
    institution: "ESSTHS, Sousse",
    date: "Summer 2023",
    description:
      "Developed and deployed production features for a real-world application, collaborating with senior engineers on architecture decisions and code reviews.",
    icon: "briefcase",
    logo: "/images/essths-logo.png",
    photo: "/images/essths.png",
  },
  {
    title: "Bachelor's in Computer Science",
    institution: "ESSTHS, Sousse",
    date: "2020 – 2023",
    description:
      "Foundation in algorithms, data structures, object-oriented programming, database systems, and web development fundamentals.",
    icon: "graduation",
    logo: "/images/essths-logo.png",
    photo: "/images/essths.png",
  },

];
