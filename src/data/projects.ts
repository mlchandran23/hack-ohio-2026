
import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "event-finder",
    title: "Buckeye Event Finder",
    description:
      "Discover campus events through a searchable, student-friendly interface.",
    category: "Web Development",
    difficulty: "Beginner",
    status: "Completed",
    technologies: ["React", "TypeScript", "REST APIs"],
    skillsLearned: ["API integration", "Search", "UI design"],
    starterTasks: ["Add an event category filter"],
    studentIds: ["student-001", "student-002"],
  },
  {
    id: "campus-energy",
    title: "Campus Energy Tracker",
    description:
      "Explore energy usage data and identify opportunities to reduce waste.",
    category: "Data Science",
    difficulty: "Intermediate",
    status: "In Progress",
    technologies: ["Python", "Pandas", "Charts"],
    skillsLearned: ["Data cleaning", "Visualization"],
    starterTasks: ["Build a chart for daily energy usage"],
    studentIds: ["student-003"],
  },
  {
    id: "buckeye-security",
    title: "Buckeye Security Lab",
    description:
      "Create a learning environment for understanding common security events.",
    category: "Cybersecurity",
    difficulty: "Intermediate",
    status: "In Progress",
    technologies: ["Python", "Linux", "Networking"],
    skillsLearned: ["Log analysis", "Network fundamentals"],
    starterTasks: ["Identify suspicious login patterns"],
    studentIds: ["student-004", "student-005"],
  },
  {
    id: "study-buddy",
    title: "Study Group Finder",
    description:
      "Help students discover classmates studying similar subjects.",
    category: "Web Development",
    difficulty: "Beginner",
    status: "Completed",
    technologies: ["React", "TypeScript", "CSS"],
    skillsLearned: ["Component design", "Filtering"],
    starterTasks: ["Add a course-based search filter"],
    studentIds: ["student-006"],
  },
];
