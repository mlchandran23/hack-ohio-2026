import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  GraduationCap,
  ListChecks,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { projects } from "../data/projects";

export default function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <main className="page-container page-section">
        <Link to="/projects" className="back-link">
          <ArrowLeft size={17} /> Back to projects
        </Link>

        <div className="empty-state">
          <h1>Project not found</h1>
          <p>
            This project may have been moved or the link may be incorrect.
          </p>
          <Link to="/projects" className="button button-primary">
            Browse projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container detail-page">
      <Link to="/projects" className="back-link">
        <ArrowLeft size={17} />
        Back to projects
      </Link>

      <article className="detail-panel">
        <div className="detail-tags">
          <span className="tag tag-category">{project.category}</span>
          <span className="tag tag-status">{project.status}</span>
          <span className="tag">{project.difficulty}</span>
        </div>

        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-description">{project.description}</p>

        <section className="detail-section">
          <h2 className="detail-section-title">
            <Code2 size={20} />
            Technologies
          </h2>

          <div className="tag-list">
            {project.technologies.map((technology) => (
              <span className="tag" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title">
            <GraduationCap size={20} />
            Skills you can learn
          </h2>

          <ul className="detail-list">
            {project.skillsLearned.map((skill) => (
              <li className="detail-list-item" key={skill}>
                <CheckCircle2
                  className="detail-list-icon"
                  size={18}
                  aria-hidden="true"
                />
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title">
            <ListChecks size={20} />
            Starter tasks
          </h2>

          <p className="section-description">
            Not sure where to begin? These tasks are potential first steps for
            learning about the project.
          </p>

          <ol className="detail-list">
            {project.starterTasks.map((task, index) => (
              <li className="starter-task" key={task}>
                <span className="detail-list-icon">{index + 1}</span>
                <span>{task}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="detail-bottom">
          <p>
            Interested in learning more? Use this project as inspiration for
            your own next step.
          </p>
          <Link to="/projects" className="button button-secondary">
            Explore more <ArrowUpRight size={17} />
          </Link>
        </div>
      </article>
    </main>
  );
}