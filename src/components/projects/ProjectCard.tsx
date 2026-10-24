import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="tag tag-category">{project.category}</span>
        <span className="tag tag-status">{project.status}</span>
      </div>

      <h3 className="project-card-title">{project.title}</h3>

      <p className="project-card-description">{project.description}</p>

      <div className="tag-list">
        {project.technologies.slice(0, 3).map((technology) => (
          <span className="tag" key={technology}>
            {technology}
          </span>
        ))}
      </div>

      <div className="project-card-footer">
        <span className="project-card-difficulty">
          {project.difficulty}
        </span>

        <Link
          to={`/projects/${project.id}`}
          className="project-card-link"
          aria-label={`Explore ${project.title}`}
        >
          Explore <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}