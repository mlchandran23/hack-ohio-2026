
import { Link } from "react-router";
import { ArrowRight, Search, Lightbulb, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">

          <h1>
            Turn your curiosity into
            <span className="home-hero-highlight"> real-world experience.</span>
          </h1>

          <p className="home-hero-description">
            Discover hands-on projects, develop practical skills, and connect
            with opportunities to grow as a student and future professional.
          </p>

          <div className="home-hero-actions">
            <Link to="/explore" className="home-button home-button-primary">
              Explore Projects
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <a href="#how-it-works" className="home-button home-button-secondary">
              How It Works
            </a>
          </div>

          <div className="home-hero-note">
            <span className="home-hero-note-line" />
            Start with an idea. Build something meaningful.
          </div>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <div className="home-visual-glow" />
          <div className="home-visual-card home-visual-card-back">
            <div className="home-visual-card-top">
              <span className="home-visual-dot" />
              <span className="home-visual-dot" />
              <span className="home-visual-dot" />
            </div>
            <div className="home-code-line home-code-line-short" />
            <div className="home-code-line home-code-line-long" />
            <div className="home-code-line home-code-line-medium" />
            <div className="home-code-line home-code-line-short" />
          </div>

          <div className="home-visual-card home-visual-card-front">
            <div className="home-visual-icon">
              <Lightbulb size={30} />
            </div>
            <span className="home-visual-label">YOUR NEXT CHALLENGE</span>
            <h2>Learn something new.</h2>
            <p>Build skills one project at a time.</p>
            <div className="home-visual-progress">
              <span />
            </div>
            <div className="home-visual-progress-caption">
              <span>Progress starts here</span>
              <span>01</span>
            </div>
          </div>

          <div className="home-visual-badge">
            <span className="home-visual-badge-icon">
              <Users size={17} />
            </span>
            <span>
              <strong>Build your skills</strong>
              <small>One project at a time</small>
            </span>
          </div>
        </div>
      </section>

      <section className="home-benefits" aria-label="Platform benefits">
        <div className="home-benefit">
          <span className="home-benefit-icon">
            <Search size={21} aria-hidden="true" />
          </span>
          <div>
            <h2>Find your next project</h2>
            <p>Explore ideas that match your interests and experience.</p>
          </div>
        </div>

        <div className="home-benefit">
          <span className="home-benefit-icon">
            <Lightbulb size={21} aria-hidden="true" />
          </span>
          <div>
            <h2>Learn by doing</h2>
            <p>Turn classroom concepts into practical experience.</p>
          </div>
        </div>

        <div className="home-benefit">
          <span className="home-benefit-icon">
            <Users size={21} aria-hidden="true" />
          </span>
          <div>
            <h2>Grow with guidance</h2>
            <p>Get support from mentors and peers as you build your skills.</p>
          </div>
        </div>
      </section>

      <section className="home-how-section" id="how-it-works">
        <div className="home-section-heading">
          <span className="home-section-eyebrow">YOUR JOURNEY STARTS HERE</span>
          <h2>Big ideas start with a first step.</h2>
          <p>
            Find a project that interests you, understand what it involves,
            and start building experience at your own pace.
          </p>
        </div>

        <div className="home-steps">
          <article className="home-step-card">
            <span className="home-step-number">01</span>
            <div className="home-step-accent" />
            <h3>Discover</h3>
            <p>
              Browse projects across different topics, technologies, and
              difficulty levels.
            </p>
          </article>

          <article className="home-step-card">
            <span className="home-step-number">02</span>
            <div className="home-step-accent" />
            <h3>Explore</h3>
            <p>
              Review project details, skills you can learn, and suggested tasks.
            </p>
          </article>

          <article className="home-step-card">
            <span className="home-step-number">03</span>
            <div className="home-step-accent" />
            <h3>Get started</h3>
            <p>
              Choose a challenge that fits your goals and take the next step
              in your learning journey.
            </p>
          </article>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta-content">
          <span className="home-section-eyebrow">READY TO GET STARTED?</span>
          <h2>Your next opportunity begins with a project.</h2>
          <p>
            Explore the available challenges and find one that sparks your
            curiosity.
          </p>
        </div>

        <Link to="/explore" className="home-button home-button-light">
          Browse Projects
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
