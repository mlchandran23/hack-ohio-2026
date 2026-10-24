
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  GraduationCap,
  Lightbulb,
  Users,
} from "lucide-react";
import { getProjectById } from "../lib/api/projects";
import type { Project } from "../types/project";

export default function ProjectPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProject() {
      setIsLoading(true);
      setError(null);
      setProject(null);

      try {
        if (!projectId) {
          throw new Error("Missing project ID.");
        }

        const data = await getProjectById(projectId);

        if (!cancelled) {
          setProject(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load project.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProject();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  if (isLoading) {
    return (
      <main className="page-container page-section">
        <p role="status">Loading project...</p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="page-container page-section">
        <h1>Project unavailable</h1>
        <p>{error ?? "Project not found."}</p>
        <Link to="/projects" className="button button-primary">
          Browse projects
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container page-section">
      <Link to="/projects" className="back-link">
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <section className="project-detail-header">
        <div className="project-card-top">
          <span className="tag tag-category">{project.category}</span>
          <span className="tag tag-status">{project.status}</span>
          <span className="tag">{project.difficulty}</span>
        </div>

        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </section>

      <div className="project-detail-grid">
        <div className="project-detail-main">
          <section className="detail-section">
            <h2>
              <Code2 size={20} />
              Technologies
            </h2>
            {project.technologies.length > 0 ? (
              <div className="tag-list">
                {project.technologies.map((technology) => (
                  <span className="tag" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            ) : (
              <p>Technologies have not been listed yet.</p>
            )}
          </section>

          <section className="detail-section">
            <h2>
              <BookOpen size={20} />
              Skills You'll Learn
            </h2>
            {project.skillsLearned.length > 0 ? (
              <ul className="detail-list">
                {project.skillsLearned.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>Skills have not been listed yet.</p>
            )}
          </section>

          <section className="detail-section">
            <h2>
              <Lightbulb size={20} />
              Starter Tasks
            </h2>
            <p>
              New to this project? These tasks can help you find a place to
              start.
            </p>
            {project.starterTasks.length > 0 ? (
              <ul className="detail-list">
                {project.starterTasks.map((task, index) => (
                  <li key={`${index}-${task}`}>{task}</li>
                ))}
              </ul>
            ) : (
              <p>No starter tasks have been added yet.</p>
            )}
          </section>
        </div>

        <aside className="project-detail-sidebar">
          <section className="detail-section">
            <h2>
              <Users size={20} />
              Student Contributors
            </h2>
            {project.students.length > 0 ? (
              <ul className="people-list">
                {project.students.map((student) => (
                  <li key={student.id}>
                    <Link to={`/students/${student.id}`}>
                      <strong>{student.name}</strong>
                    </Link>
                    {student.major && <p>{student.major}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No student contributors have been listed yet.</p>
            )}
          </section>

          <section className="detail-section">
            <h2>
              <GraduationCap size={20} />
              Project Mentors
            </h2>
            {project.mentors.length > 0 ? (
              <ul className="people-list">
                {project.mentors.map((mentor) => (
                  <li key={mentor.id}>
                    <strong>{mentor.name}</strong>
                    {mentor.expertise && <p>{mentor.expertise}</p>}
                    {mentor.bio && <p>{mentor.bio}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No project mentors have been listed yet.</p>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
