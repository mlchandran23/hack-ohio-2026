import { Bookmark, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function SavedPage() {
  return (
    <main className="page-container page-section basic-page">
      <span className="basic-page-icon">
        <Bookmark size={30} />
      </span>

      <p className="eyebrow">YOUR COLLECTION</p>
      <h1 className="basic-page-title">Your saved projects.</h1>

      <p className="basic-page-description">
        Keep track of projects that catch your interest so you can revisit
        them as you explore new ideas and skills.
      </p>

      <div className="basic-page-actions">
        <Link to="/projects" className="button button-primary">
          Find projects <ArrowRight size={17} />
        </Link>
      </div>
    </main>
  );
}