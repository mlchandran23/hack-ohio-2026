
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  Send,
  UserPlus,
  Users,
} from "lucide-react";
import { getProjectById } from "../lib/api/projects";
import type { Project } from "../types/project";

export default function ProjectPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAccessForm, setShowAccessForm] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

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
            err instanceof Error
              ? err.message
              : "Failed to load project.",
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

  function resetAccessRequest() {
    setShowAccessForm(false);
    setRequestSubmitted(false);
    setRequestName("");
    setRequestEmail("");
    setRequestMessage("");
  }

  if (isLoading) {
    return (
      <main className="project-detail-page">
        <div className="page-container project-detail-container">
          <p className="project-loading" role="status">
            Loading project...
          </p>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="project-detail-page">
        <div className="page-container project-detail-container">
          <div className="project-error">
            <h1>Project unavailable</h1>
            <p>{error ?? "Project not found."}</p>
            <Link to="/projects" className="button button-primary">
              Browse projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="project-detail-page">
      <div className="page-container project-detail-container">
        <Link
          to="/projects"
          className="back-link project-back-link"
        >
          <ArrowLeft size={17} />
          All projects
        </Link>

        <header className="project-hero">
          <div className="project-hero-tags">
            <span className="tag tag-category">{project.category}</span>
            <span className="tag tag-status">{project.status}</span>
            <span className="tag project-difficulty">
              {project.difficulty}
            </span>
          </div>

          <h1>{project.title}</h1>

          <p className="project-hero-description">
            {project.description}
          </p>

          <div className="project-hero-footer">
            <span>
              <Users size={17} />
              {project.students.length}{" "}
              {project.students.length === 1
                ? "contributor"
                : "contributors"}
            </span>

            <span>
              <Code2 size={17} />
              {project.technologies.length}{" "}
              {project.technologies.length === 1
                ? "technology"
                : "technologies"}
            </span>
          </div>
        </header>

        <div className="project-detail-layout">
          <div className="project-detail-content">
            <section className="project-panel">
              <div className="project-panel-heading">
                <div className="project-section-icon">
                  <Code2 size={21} />
                </div>

                <div>
                  <h2>Technologies</h2>
                  <p>Tools and technologies used in this project.</p>
                </div>
              </div>

              {project.technologies.length > 0 ? (
                <div className="project-tech-list">
                  {project.technologies.map((technology) => (
                    <span
                      className="project-tech-tag"
                      key={technology}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="project-muted">
                  Technologies have not been listed yet.
                </p>
              )}
            </section>

            <section className="project-panel">
              <div className="project-panel-heading">
                <div className="project-section-icon">
                  <BookOpen size={21} />
                </div>

                <div>
                  <h2>Skills You'll Learn</h2>
                  <p>
                    Knowledge and experience you can gain by participating.
                  </p>
                </div>
              </div>

              {project.skillsLearned.length > 0 ? (
                <ul className="project-skill-list">
                  {project.skillsLearned.map((skill) => (
                    <li key={skill}>
                      <CheckCircle2 size={18} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="project-muted">
                  Skills have not been listed yet.
                </p>
              )}
            </section>

            
            <section className="project-panel project-starter-panel">
              <div className="project-panel-heading">
                <div className="project-section-icon project-starter-icon">
                  <BookOpen size={21} />
                </div>
                <div>
                  <h2>Starter Tasks</h2>
                  <p>
                    Tasks needed for the project.
                  </p>
                </div>
              </div>

              {project.starterTasks.length > 0 ? (
                <ul className="project-starter-list">
                  {project.starterTasks.map((task, index) => (
                    <li className="project-starter-item" key={`${index}-${task}`}>
                      <span className="project-starter-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="project-muted">
                  No starter tasks have been added yet.
                </p>
              )}
            </section>


            <section className="project-panel project-access-panel">
              <div className="project-panel-heading">
                <div className="project-section-icon project-access-icon">
                  <UserPlus size={21} />
                </div>              

                <div>
                  <h2>Get Involved</h2>
                  <p>
                    Interested in contributing? Introduce yourself and tell
                    the team what you'd like to learn.
                  </p>
                </div>
              </div>

              <div className="project-access-content">
                <div className="project-access-benefits">
                  <div className="project-access-benefit">
                    <CheckCircle2 size={18} />
                    <span>
                      Learn by working on a real student project
                    </span>
                  </div>

                  <div className="project-access-benefit">
                    <CheckCircle2 size={18} />
                    <span>
                      Build experience with the project's technologies
                    </span>
                  </div>

                  <div className="project-access-benefit">
                    <CheckCircle2 size={18} />
                    <span>Connect with student contributors</span>
                  </div>
                </div>

                {!showAccessForm && !requestSubmitted && (
                  <button
                    type="button"
                    className="button button-primary project-access-button"
                    onClick={() => setShowAccessForm(true)}
                  >
                    <UserPlus size={18} />
                    Request Project Access
                    <ArrowRight size={17} />
                  </button>
                )}

                {showAccessForm && !requestSubmitted && (
                  <form
                    className="project-access-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setRequestSubmitted(true);
                      setShowAccessForm(false);
                    }}
                  >
                    <div className="project-access-form-heading">
                      <div>
                        <h3>Request to Join</h3>
                        <p>
                          Share a little about yourself and your interest
                          in {project.title}.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="project-form-cancel"
                        onClick={() => setShowAccessForm(false)}
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="project-form-field">
                      <label htmlFor="request-name">Your name</label>
                      <input
                        id="request-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your name"
                        value={requestName}
                        onChange={(event) =>
                          setRequestName(event.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="project-form-field">
                      <label htmlFor="request-email">
                        Email
                      </label>
                      <input
                        id="request-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="janedoe@gmail.com"
                        value={requestEmail}
                        onChange={(event) =>
                          setRequestEmail(event.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="project-form-field">
                      <label htmlFor="request-message">
                        Why are you interested?
                      </label>
                      <textarea
                        id="request-message"
                        name="message"
                        placeholder="Tell the team what interests you, what you'd like to learn, or how you'd like to contribute..."
                        rows={4}
                        value={requestMessage}
                        onChange={(event) =>
                          setRequestMessage(event.target.value)
                        }
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="button button-primary project-access-button"
                    >
                      <Send size={17} />
                      Submit Request
                    </button>
                  </form>
                )}

                {requestSubmitted && (
                  <div
                    className="project-request-confirmation"
                    role="status"
                  >
                    <CheckCircle2 size={23} />

                    <div>
                      <h3>Request submitted!</h3>
                      <p>
                        Your demo request for {project.title} has been
                        recorded on this page. No actual request has been
                        sent to the project team.
                      </p>

                      <button
                        type="button"
                        className="project-request-reset"
                        onClick={resetAccessRequest}
                      >
                        Start another request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="project-detail-sidebar">
            <section className="project-panel contributors-panel">
              <div className="project-panel-heading">
                <div className="project-section-icon">
                  <Users size={21} />
                </div>

                <div>
                  <h2>Meet the Contributors</h2>
                  <p>Learn from the students building this project.</p>
                </div>
              </div>

              <p className="click-profile-hint">
                Select a student to explore their profile and projects.
              </p>

              {project.students.length > 0 ? (
                <div className="contributor-list">
                  {project.students.map((student) => {
                    const initials = student.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <Link
                        to={`/students/${student.id}`}
                        className="contributor-card"
                        key={student.id}
                        aria-label={`View ${student.name}'s profile`}
                      >
                        <span
                          className="contributor-avatar"
                          aria-hidden="true"
                        >
                          {initials}
                        </span>

                        <span className="contributor-info">
                          <strong>{student.name}</strong>
                          <span>
                            {student.major || "Student contributor"}
                          </span>
                          <span className="contributor-profile-link">
                            View profile <ArrowRight size={14} />
                          </span>
                        </span>

                        <ChevronRight
                          className="contributor-chevron"
                          size={19}
                          aria-hidden="true"
                        />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="project-muted">
                  No student contributors have been listed yet.
                </p>
              )}
            </section>

            <section className="project-panel mentors-panel">
              <div className="project-panel-heading">
                <div className="project-section-icon">
                  <GraduationCap size={21} />
                </div>

                <div>
                  <h2>Project Mentors</h2>
                  <p>People who can help guide the project.</p>
                </div>
              </div>

              {project.mentors.length > 0 ? (
                <div className="mentor-list">
                  {project.mentors.map((mentor) => (
                    <article className="mentor-card" key={mentor.id}>
                      <h3>{mentor.name}</h3>

                      {mentor.expertise && (
                        <p className="mentor-expertise">
                          {mentor.expertise}
                        </p>
                      )}

                      {mentor.bio && (
                        <p className="mentor-bio">{mentor.bio}</p>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="project-muted">
                  No project mentors have been listed yet.
                </p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
