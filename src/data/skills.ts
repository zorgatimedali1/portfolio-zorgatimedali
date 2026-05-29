export interface Skill {
  name: string;
  category: string;
  proficiency: number;
}

export const skills: Skill[] = [
  { name: "React", category: "Frontend", proficiency: 90 },
  { name: "Angular", category: "Frontend", proficiency: 85 },
  { name: "TypeScript", category: "Frontend", proficiency: 88 },
  { name: "Flutter", category: "Mobile", proficiency: 95 },
  { name: "Kotlin", category: "Mobile", proficiency: 80 },
  { name: "Dart", category: "Mobile", proficiency: 92 },
  { name: "Node.js", category: "Backend", proficiency: 88 },
  { name: "Spring Boot", category: "Backend", proficiency: 82 },
  { name: "Python", category: "Backend", proficiency: 80 },
  { name: "Firebase", category: "Backend", proficiency: 90 },
  { name: "Supabase", category: "Backend", proficiency: 78 },
  { name: "PHP", category: "Backend", proficiency: 70 },
  { name: "MongoDB", category: "Database", proficiency: 85 },
  { name: "SQL", category: "Database", proficiency: 88 },
  { name: "PostgreSQL", category: "Database", proficiency: 82 },
  { name: "Git", category: "Tools", proficiency: 92 },
  { name: "Docker", category: "Tools", proficiency: 78 },
  { name: "AI / ML", category: "AI / Algorithms", proficiency: 72 },
  { name: "C++", category: "AI / Algorithms", proficiency: 75 },
];

export const skillCategories = [
  "Frontend",
  "Mobile",
  "Backend",
  "Database",
  "Tools",
  "AI / Algorithms",
];
