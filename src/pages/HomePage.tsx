import { Link } from "react-router";

export default function HomePage() {
  return (
    <main className="page-container page-section">
      <h1>Buckeye Bridge</h1>
      <p>Discover what Ohio State students are building.</p>
      <Link to="/projects" className="button button-primary">
        Explore projects
      </Link>
    </main>
  );
}