import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [pageData, setPageData] = useState({
    heroTitle: "Empowering Students to Find Their Path",
    heroSubtitle: "PathFinder bridges the gap between high school marks and university realities.",
    missionHeading: "Our Mission",
    missionBody1: "We believe that every student deserves clear, actionable guidance regarding their future.",
    missionBody2: "By automatically matching APS scores against actual university requirements, we remove the guesswork from applications.",
    tagYear: "EST 2026",
    tagText: "PathFinder Initiative",
    teamTitle: "Meet the Team",
    teamMembers: [
      { id: 1, initials: 'EM', fullName: 'Emmanuel', position: 'Head Developer & Backend Lead', biography: 'Architects the secure Spring Boot infrastructure and API endpoints powering PathFinder.' },
      { id: 2, initials: 'DO', fullName: 'Destiny Okeke', position: 'Systems Integration & UI/UX', biography: 'Focuses on frontend architecture, system flows, and AI-driven platform integrations.' },
      { id: 3, initials: 'GI', fullName: 'Gift', position: 'Frontend Developer', biography: 'Crafts responsive React interfaces and manages client-side state for a seamless experience.' },
      { id: 4, initials: 'TE', fullName: 'Tendi', position: 'Lead UI/UX Designer', biography: 'Designed the beautiful Navy and Gold theme and crafted the intuitive user experience for PathFinder.' }
    ]
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    navigate('/sign-in');
  };

  return (
      <div className="about-page-wrapper">
        <header className="about-hero-header-block">
          <nav className="about-nav">
            <div className="nav-logo-row">
              <div className="nav-logo-icon-wrap"><div style={{ width: '12px', height: '12px', background: '#0f1b3d', borderRadius: '2px' }} /></div>
              <div><span className="nav-logo-text">PathFinder</span><span className="nav-logo-subtext">CAREER GUIDANCE</span></div>
            </div>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/career-guidance" className="nav-link">Career Guidance</Link>
              <Link to="/about" className="nav-link nav-link-active">About Us</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
            <div className="nav-actions">
              {isLoggedIn ? (
                  <>
                    <Link to="/profile" className="nav-login-link">My Profile</Link>
                    <button onClick={handleLogout} className="nav-signup-btn" style={{ border: 'none', cursor: 'pointer' }}>Logout</button>
                  </>
              ) : (
                  <>
                    <Link to="/sign-in" className="nav-login-link">Login</Link>
                    <Link to="/create-account" className="nav-signup-btn">Sign Up</Link>
                  </>
              )}
            </div>
          </nav>
        </header>

        <section className="hero-content">
          <h1 className="hero-title">{pageData.heroTitle}</h1>
          <p className="hero-subtitle">{pageData.heroSubtitle}</p>
        </section>

        <section className="mission-section">
          <div className="mission-text-column">
            <h2 className="section-heading">{pageData.missionHeading}</h2>
            <p className="body-text">{pageData.missionBody1}</p>
            <p className="body-text">{pageData.missionBody2}</p>
          </div>
          <div className="mission-asset-column">
            <div className="image-container">
              <img className="mission-img" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80" alt="Students" />
              <div className="image-overlay-tag"><div className="tag-year">{pageData.tagYear}</div><div className="tag-text">{pageData.tagText}</div></div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="team-container">
            <h2 className="team-main-title">{pageData.teamTitle}</h2>
            <div className="team-grid">
              {pageData.teamMembers.map((member) => (
                  <div className="team-member" key={member.id}>
                    <div className="avatar-circle"><span className="initials-span">{member.initials}</span></div>
                    <h4 className="member-name">{member.fullName}</h4>
                    <span className="member-role">{member.position}</span>
                    <p className="member-sub">{member.biography}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

export default AboutUs;