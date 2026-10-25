
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";
import ProjectCard from "../components/projects/ProjectCard";
import { createProject, getProjects, type CreateProjectInput } from "../lib/api/projects";
import { getStudentSession, subscribeToStudentSession, type StudentSession } from "../lib/authSession";
import type { Project } from "../types/project";

const emptyProjectForm = {
  title: "",
  description: "",
  category: "",
  difficulty: "Beginner" as Project["difficulty"],
  technologies: "",
  skillsLearned: "",
  starterTasks: "",
};

function parseList(value: string): string[] {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export default function ExplorePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [student, setStudent] = useState<StudentSession | null>(getStudentSession);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createMessage, setCreateMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => subscribeToStudentSession(() => setStudent(getStudentSession())), []);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProjects();

        if (!cancelled) {
          setProjects(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load projects.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  async function handleCreateProject(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!student) {
      setCreateError("Sign in before creating a project.");
      return;
    }

    const input: CreateProjectInput = {
      ...projectForm,
      studentId: student.id,
      technologies: parseList(projectForm.technologies),
      skillsLearned: parseList(projectForm.skillsLearned),
      starterTasks: parseList(projectForm.starterTasks),
    };

    setIsCreating(true);
    setCreateError(null);
    setCreateMessage(null);
    try {
      const createdProject = await createProject(input);
      setProjects((currentProjects) => [
        createdProject,
        ...currentProjects.filter((project) => project.id !== createdProject.id),
      ]);
      setSearchQuery("");
      setSelectedCategory("All");
      setSelectedDifficulty("All");
      setProjectForm(emptyProjectForm);
      setShowCreateForm(false);
      setCreateMessage("Project created. You are listed as a contributor.");
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Unable to create project.");
    } finally {
      setIsCreating(false);
    }
  }

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [projects],
  );

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((technology) =>
          technology.toLowerCase().includes(query),
        ) ||
        project.skillsLearned.some((skill) =>
          skill.toLowerCase().includes(query),
        );

      const matchesCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "All" ||
        project.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [projects, searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <main className="page-container page-section">
      <div className="page-header">
        <h1>Explore Projects</h1>
        <p>
          Discover what other Buckeyes are building, the skills they are
          learning, and how you can get involved.
        </p>
      </div>

      <div className="project-create-actions">
        {student ? (
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setShowCreateForm((isVisible) => !isVisible);
              setCreateError(null);
              setCreateMessage(null);
            }}
            aria-expanded={showCreateForm}
            aria-controls="create-project-form"
          >
            {showCreateForm ? "Cancel" : "Create project"}
          </button>
        ) : (
          <p>
            <Link to="/login">Sign in</Link> to create a project and join as a contributor.
          </p>
        )}
      </div>

      {createMessage && <p className="project-create-message" role="status">{createMessage}</p>}
      {createError && <p className="project-create-error" role="alert">{createError}</p>}

      {student && showCreateForm && (
        <section className="project-create-panel" aria-labelledby="create-project-heading">
          <h2 id="create-project-heading">Create a project</h2>
          <p>Your account will be added as a contributor automatically.</p>
          <form id="create-project-form" className="project-create-form" onSubmit={handleCreateProject}>
            <div className="project-create-fields">
              <div className="project-create-field">
                <label htmlFor="new-project-title">Project title</label>
                <input
                  id="new-project-title"
                  required
                  maxLength={120}
                  value={projectForm.title}
                  onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })}
                />
              </div>
              <div className="project-create-field">
                <label htmlFor="new-project-category">Category</label>
                <input
                  id="new-project-category"
                  required
                  maxLength={80}
                  placeholder="e.g. Web Development"
                  value={projectForm.category}
                  onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })}
                />
              </div>
              <div className="project-create-field project-create-field-wide">
                <label htmlFor="new-project-description">Description</label>
                <textarea
                  id="new-project-description"
                  required
                  maxLength={2000}
                  rows={3}
                  value={projectForm.description}
                  onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })}
                />
              </div>
              <div className="project-create-field">
                <label htmlFor="new-project-difficulty">Difficulty</label>
                <select
                  id="new-project-difficulty"
                  value={projectForm.difficulty}
                  onChange={(event) => setProjectForm({
                    ...projectForm,
                    difficulty: event.target.value as Project["difficulty"],
                  })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="project-create-field">
                <label htmlFor="new-project-technologies">Technologies</label>
                <input
                  id="new-project-technologies"
                  placeholder="Comma-separated"
                  value={projectForm.technologies}
                  onChange={(event) => setProjectForm({ ...projectForm, technologies: event.target.value })}
                />
              </div>
              <div className="project-create-field">
                <label htmlFor="new-project-skills">Skills to learn</label>
                <input
                  id="new-project-skills"
                  placeholder="Comma-separated"
                  value={projectForm.skillsLearned}
                  onChange={(event) => setProjectForm({ ...projectForm, skillsLearned: event.target.value })}
                />
              </div>
              <div className="project-create-field">
                <label htmlFor="new-project-tasks">Starter tasks</label>
                <input
                  id="new-project-tasks"
                  placeholder="Comma-separated"
                  value={projectForm.starterTasks}
                  onChange={(event) => setProjectForm({ ...projectForm, starterTasks: event.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="button button-primary" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create project"}
            </button>
          </form>
        </section>
      )}

      <section className="project-filters" aria-label="Filter projects">
        <div className="search-container">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            className="search-input"
            placeholder="Search projects, technologies, or skills..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search projects"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="difficulty-filter">Difficulty</label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={(event) => setSelectedDifficulty(event.target.value)}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="project-results" aria-label="Project results">
        <div className="project-results-header">
          <h2>
            {isLoading
              ? "Loading projects..."
              : error
                ? "Projects unavailable"
                : "Student Projects"}
          </h2>

          {!isLoading && !error && (
            <p>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"} found
            </p>
          )}
        </div>

        {isLoading ? (
          <p className="project-results-message" role="status">
            Loading projects...
          </p>
        ) : error ? (
          <div className="empty-state" role="alert">
            <h3>Couldn't load projects</h3>
            <p>{error}</p>
            <button
              type="button"
              className="button button-primary"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              Try again
            </button>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No projects found</h3>
            <p>
              Try changing your search terms or selecting different filters.
            </p>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedDifficulty("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
