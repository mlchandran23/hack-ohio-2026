import { ArrowLeft, UserRound } from "lucide-react";
import { Link, useParams } from "react-router";

export default function StudentPage() {
  const { studentId } = useParams();

  return (
    <main className="page-container page-section basic-page">
      <span className="basic-page-icon">
        <UserRound size={30} />
      </span>

      <p className="eyebrow">STUDENT COMMUNITY</p>
      <h1 className="basic-page-title">Student profile</h1>

      <p className="basic-page-description">
        {studentId
          ? "This student profile has not been added to the sample data yet."
          : "Student profiles will help you discover who is behind each project and what they are learning."}
      </p>

      <div className="basic-page-actions">
        <Link to="/projects" className="button button-primary">
          Explore projects
        </Link>

        <Link to="/" className="button button-secondary">
          <ArrowLeft size={17} /> Back home
        </Link>
      </div>
    </main>
  );
}