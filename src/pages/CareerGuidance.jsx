import { Link } from 'react-router-dom';
import './CareerGuidance.css';

const guidanceOptions = [
  {
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg',
    title: 'Career Guidance',
    description: 'Enter your exam marks and get personalised university course recommendations based on your results.',
    linkLabel: 'Get started',
    linkTo: '/marks-analysis',
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/file-earmark-text-fill.svg',
    title: 'CV Builder',
    description: 'Create a professional CV to use for bursary applications, part-time jobs, and university entrance portfolios.',
    linkLabel: 'Get started',
    linkTo: '/create-account',
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/graph-up-arrow.svg',
    title: 'Subject Analysis',
    description: 'Get a deep dive into your academic strengths and see which subjects open the most doors for you.',
    linkLabel: 'Get started',
    linkTo: '/create-account',
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/award-fill.svg',
    title: 'Bursary Finder',
    description: 'Discover funding opportunities and bursaries that match your academic profile and financial needs.',
    linkLabel: 'Get started',
    linkTo: '/create-account',
  },
];

function CareerGuidance() {
  function renderGuidanceCard(option) {
    return (
      <div key={option.title} className="guidance-card">
        <div className="guidance-icon-wrap">
          <img src={option.icon} alt="" className="guidance-icon" />
        </div>
        <h3>{option.title}</h3>
        <p>{option.description}</p>
        <Link to={option.linkTo} className="guidance-link">
          {option.linkLabel} →
        </Link>
      </div>
    );
  }

  return (
    <div className="career-screen">
      <nav className="career-nav">
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
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/career-guidance" className="nav-link nav-link-active">Career Guidance</Link>
          <Link to="/about-us" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-actions">
          <Link to="/sign-in" className="nav-login-link">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/box-arrow-in-right.svg"
              alt=""
              className="nav-icon-dark"
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

      <main className="career-hero">
        <div className="career-icon-badge">
          <img
            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/book-fill.svg"
            alt=""
            className="career-icon-badge-img"
          />
        </div>

        <h1>Career Guidance Centre</h1>
        <p className="career-subtitle">Choose how we can help you today</p>

        <div className="guidance-grid">
          {guidanceOptions.map(renderGuidanceCard)}
        </div>
      </main>

      <button type="button" className="help-btn" aria-label="Help">?</button>
    </div>
  );
}

export default CareerGuidance;