
import { Link } from "react-router";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Buckeye Bridge Challenge
            </Link>
            <p>
              Connecting students to collaborate on projects to build practical
              skills and explore new technologies.
            </p>
          </div>

          <nav className="footer-navigation" aria-label="Footer navigation">
            <h2>Explore</h2>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
          </nav>

          <div className="footer-links">
            <h2>Connect</h2>
                <a
                href="https://github.com/mlchandran23/hack-ohio-2026"
                target="_blank"
                rel="noopener noreferrer"
                >
                GitHub <span aria-hidden="true">↗</span>
                </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Matthew Chandran and Aaron Geise.
          </p>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            Back to top
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}