import { Link, NavLink } from "react-router";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="page-container navbar-inner">
        <Link to="/" className="brand" aria-label="Buckeye Bridge home">
          <span className="brand-mark">
            <GraduationCap size={22} />
          </span>
          <span>Buckeye Bridge</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `nav-link${isActive ? "active" : ""}`
            }
          >
            Sign in
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            Explore projects
          </NavLink>

          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            Saved
          </NavLink>
        </nav>
      </div>
    </header>
  );
}