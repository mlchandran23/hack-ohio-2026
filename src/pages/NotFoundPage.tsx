import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="page-container not-found-page">
      <Compass size={38} aria-hidden="true" />

      <p className="not-found-code">404</p>
      <h1 className="not-found-title">Looks like you've wandered off course.</h1>

      <p className="basic-page-description">
        That page doesn't exist, but there are plenty of projects to discover.
      </p>

      <div className="basic-page-actions">
        <Link to="/" className="button button-primary">
          <ArrowLeft size={17} /> Back home
        </Link>

        <Link to="/projects" className="button button-secondary">
          Explore projects
        </Link>
      </div>
    </main>
  );
}