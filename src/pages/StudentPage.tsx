
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, BookOpen, FolderKanban } from "lucide-react";
import ProjectCard from "../components/projects/ProjectCard";
import { getStudentById } from "../lib/api/projects";
import type { Project, Student } from "../types/project";

type StudentProfile = Student & {
  projects: Project[];
};

export default function StudentPage() {
  const { studentId } = useParams();

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadStudent() {
      setIsLoading(true);
      setError(null);
      setStudent(null);

      try {
        if (!studentId) {
          throw new Error("Missing student ID.");
        }

        const data = await getStudentById(studentId);

        if (!cancelled) {
          setStudent(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load student profile.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadStudent();

    return () => {
      cancelled = true;
    };
  }, [studentId, retryCount]);

  if (isLoading) {
    return (
      <main className="page-container page-section">
        <p role="status">Loading student profile...</p>
      </main>
    );
  }

  if (error || !student) {
    return (
      <main className="page-container page-section">
        <h1>Student unavailable</h1>
        <p>{error ?? "Student not found."}</p>

        {error && (
          <button
            type="button"
            className="button button-primary"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try again
          </button>
        )}

        <p>
          <Link to="/projects">Browse projects</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="page-container page-section">
      <Link to="/projects" className="back-link">
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <section className="student-profile">
        <div className="student-profile-avatar" aria-hidden="true">
          {student.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div className="student-profile-info">
          <h1>{student.name}</h1>

          {student.major && (
            <p className="student-major">{student.major}</p>
          )}

          {student.bio ? (
            <p className="student-bio">{student.bio}</p>
          ) : (
            <p className="student-bio">
              This student hasn't added a bio yet.
            </p>
          )}
        </div>
      </section>

      <section className="student-projects">
        <div className="project-results-header">
          <h2>
            <FolderKanban size={20} />
            Projects
          </h2>
          <p>
            {student.projects.length}{" "}
            {student.projects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        {student.projects.length > 0 ? (
          <div className="project-grid">
            {student.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <BookOpen size={24} />
            <h3>No projects yet</h3>
            <p>This student isn't currently associated with any projects.</p>
          </div>
        )}
      </section>
    </main>
  );
}
