
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "In Progress" | "Completed";
  technologies: string[];
  skillsLearned: string[];
  starterTasks: string[];
  studentIds: string[];
}