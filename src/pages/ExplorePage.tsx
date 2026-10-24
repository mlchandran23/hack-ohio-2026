
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProjectCard from "../components/projects/ProjectCard";
import { getProjects } from "../lib/api/projects";
import type { Project } from "../types/project";

export default function ExplorePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

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
