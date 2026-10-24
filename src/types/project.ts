export interface Student {
  id: string;
  name: string;
  major: string | null;
  bio: string | null;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string | null;
  bio: string | null;
}

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
  students: Student[];
  mentors: Mentor[];
}