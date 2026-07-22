import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  {
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg',
    title: 'University Matching',
    description: 'AI-powered course recommendations',
    highlighted: true,
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/graph-up-arrow.svg',
    title: 'Subject Analysis',
    description: 'Deep dive into your strengths',
    highlighted: false,
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/briefcase-fill.svg',
    title: 'CV Builder',
    description: 'Professional CV in minutes',
    highlighted: true,
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/award-fill.svg',
    title: 'Bursary Finder',
    description: 'Funding opportunities for you',
    highlighted: false,
  },
];

function Home() {
  function renderFeatureCard(feature) {
    let cardClass = 'feature-card';
    if (feature.highlighted) {
      cardClass = 'feature-card feature-card-highlighted';
    }

    let iconWrapClass = 'feature-icon-wrap';
    if (feature.highlighted) {
      iconWrapClass = 'feature-icon-wrap feature-icon-wrap-highlighted';
    }

    return (
      <div key={feature.title} className={cardClass}>
        <div className={iconWrapClass}>
          <img src={feature.icon} alt="" className="feature-icon" />
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    );
  }

  return (
    <div className="home-screen">
      <nav className="home-nav">
        <div className="nav-logo-row">
          <div className="nav-logo-icon-wrap">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg"
              alt=""
              className="nav-logo-icon"
            />
          </div>
          <div>
            <span className="nav-logo-text">PathFinder</span>
            <span className="nav-logo-subtext">CAREER GUIDANCE</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home" className="nav-link nav-link-active">Home</a>
          <Link to="/career-guidance" className="nav-link">Career Guidance</Link>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div className="nav-actions">
          <Link to="/sign-in" className="nav-login-link">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/box-arrow-in-right.svg"
              alt=""
              className="nav-icon-white"
            />
            Login
          </Link>
          <Link to="/create-account" className="nav-signup-btn">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-plus-fill.svg"
              alt=""
              className="nav-icon-dark"
            />
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-text">
          <div className="hero-badge">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/star-fill.svg"
              alt=""
              className="nav-icon-gold"
            />
            South Africa's #1 Student Career Platform
          </div>

          <h1>
            Discover Your<br />
            <span className="hero-highlight">Perfect Career</span><br />
            Path
          </h1>

          <p className="hero-description">
            Upload your Grade 11 or Grade 12 trial exam marks and let
            PathFinder recommend the university courses that match
            your academic profile and passions.
          </p>

          <div className="hero-buttons">
            <Link to="/create-account" className="hero-btn-primary">
              Get Started Free →
            </Link>
            <a href="#career-guidance" className="hero-btn-secondary">
              Explore Careers
            </a>
          </div>
        </div>

        <div className="feature-grid">
          {features.map(renderFeatureCard)}
        </div>
      </main>

      <button type="button" className="help-btn" aria-label="Help">?</button>
    </div>
  );
}

export default Home;