import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [difficulty, setDifficulty] = useState("All levels");

  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category))].sort(),
    [],
  );

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          project.title,
          project.description,
          project.category,
          ...project.technologies,
          ...project.skillsLearned,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        category === "All categories" || project.category === category;

      const matchesDifficulty =
        difficulty === "All levels" || project.difficulty === difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, category, difficulty]);

  return (
    <main className="page-container page-section">
      <section className="explore-intro">
        <p className="eyebrow">THE PROJECT DIRECTORY</p>
        <h1 className="explore-title">Explore student projects.</h1>
        <p className="explore-description">
          Get inspired by what other Buckeyes are creating. Discover the
          technologies they use, the skills they build, and beginner-friendly
          tasks that can help you get involved.
        </p>
      </section>

      <section aria-label="Search and filter projects">
        <div className="explore-controls">
          <label className="search-field">
            <Search size={19} aria-hidden="true" />
            <span className="visually-hidden">Search projects</span>
            <input
              className="search-input"
              type="search"
              placeholder="Search projects, skills, or technologies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label>
            <span className="visually-hidden">Filter by category</span>
            <select
              className="filter-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="visually-hidden">Filter by difficulty</span>
            <select
              className="filter-select"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option>All levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>
        </div>
      </section>

      <section className="project-results" aria-live="polite">
        <div className="project-results-heading">
          <h2 className="project-results-title">Projects to explore</h2>
          <p className="project-count">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No projects found</h3>
            <p>
              Try a different search or change your filters to see more
              projects.
            </p>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setSearch("");
                setCategory("All categories");
                setDifficulty("All levels");
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