import React, { useState, useEffect } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  // --- STATE MANAGEMENT ---
  const [role, setRole] = useState("USER"); // Defaults to safe USER view until backend confirms otherwise
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Core page layout schema
  const [pageData, setPageData] = useState({
    id: 1,
    heroTitle: "",
    heroSubtitle: "",
    missionHeading: "",
    missionBody1: "",
    missionBody2: "",
    tagYear: "",
    tagText: "",
    teamTitle: "",
    metrics: [],
    teamMembers: [],
    platformStats: {
      totalProvinces: 0,
      totalProgrammes: 0,
      totalStudents: 0
    }
  });

  // --- BACKEND API CONFIGURATION ---
  const API_BASE_URL = 'http://localhost:8085/api'; // Adjust port to match your Spring Boot config

  useEffect(() => {
    // 1. Fetch User Session Profile / Role Verification
    // (Assumes your Spring Boot backend drops an authentication token/session cookie)
    const fetchUserRoleAndContent = async () => {
      try {
        // Fetch current user details to check authentication role securely
        const userRes = await fetch(`${API_BASE_URL}/auth/user-profile`);
        if (userRes.ok) {
          const userData = await userRes.json();
          setRole(userData.role); // e.g., "ADMIN" or "USER"
        }

        // Fetch the editable page content layout configuration  [Update Gift's]
        const contentRes = await fetch(`${API_BASE_URL}/v1/about`);

        if (contentRes.ok) {
          const response = await contentRes.json();

          setPageData(response.data);
        }

      } catch (err) {
        console.error("Backend communication failure:", err);
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoleAndContent();
  }, []);

  // 2. Submit layout modifications back to database (Admin Auth Protected)
  const handlePublishChanges = async () => {
    if (role !== "ADMIN") {
      alert("Unauthorized action.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/about/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers here if using JWT Bearer tokens
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pageData),
      });

      if (!response.ok) throw new Error("Could not update database configuration.");

      alert("🎉 Changes successfully written and saved to the database!");
    } catch (err) {
      console.error("Error saving data:", err);
      alert(`Failed to save adjustments: ${err.message}`);
    }
  };

  // --- CONTENT MUTATION HANDLERS ---
  const handleInputChange = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamMemberChange = (id, field, value) => {
    setPageData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(member =>
          member.id === id ? { ...member, [field]: value } : member
      )
    }));
  };

  const isAdmin = role === "ADMIN";

  if (loading) {
    return (
        <div className="about-page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3 style={{ color: '#ffffff' }}>Verifying permissions and loading data...</h3>
        </div>
    );
  }

  return (
      <div className="about-page-wrapper">

        {/* 1. TOP MAIN HEADER / INTEGRATED NAVBAR BLOCK */}
        <header className="about-hero-header-block">
          <nav className="about-nav">
            <div className="nav-logo-row">
              <div className="nav-logo-icon-wrap">
                <div style={{ width: '12px', height: '12px', background: '#0f1b3d', borderRadius: '2px' }} />
              </div>
              <div>
                <span className="nav-logo-text">PathFinder</span>
                <span className="nav-logo-subtext">CAREER GUIDANCE</span>
              </div>
            </div>

            <div className="nav-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/career-guidance" className="nav-link">Career Guidance</a>
              <a href="/about" className="nav-link nav-link-active">About Us</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>

            <div className="nav-actions">
              <a href="/login" className="nav-login-link">Login</a>
              <a href="/signup" className="nav-signup-btn">Sign Up</a>
            </div>
          </nav>
        </header>

        {/* 2. SECURE ADMIN CONTROLS: Completely hidden from standard users */}
        {isAdmin && (
            <div className="admin-bar">
              <div className="admin-bar-left">
                <div className="live-indicator"></div>
                <span className="admin-bar-title">Visual Editor Mode Active</span>
              </div>
              <button className="publish-btn" onClick={handlePublishChanges}>
                Publish Layout Changes
              </button>
            </div>
        )}

        {/* 3. HERO BANNER HEADER CONTENT */}
        <section className="hero-content">
          {isAdmin ? (
              <div className="hero-edit-container">
                <span className="edit-badge">✏️ Editing Hero Main Frame Title</span>
                <input
                    className="hero-input"
                    value={pageData.heroTitle}
                    onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                />
                <textarea
                    className="hero-textarea"
                    value={pageData.heroSubtitle}
                    onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                />
              </div>
          ) : (
              <>
                <h1 className="hero-title">{pageData.heroTitle}</h1>
                <p className="hero-subtitle">{pageData.heroSubtitle}</p>
              </>
          )}
        </section>

        {/* 4. TWO-COLUMN MISSION & ASSET LAYOUT */}
        <section className="mission-section">
          <div className="mission-text-column">
            {isAdmin ? (
                <div className="clean-admin-card">
                  <label className="clean-label">Heading</label>
                  <input
                      className="clean-input"
                      value={pageData.missionHeading}
                      onChange={(e) => handleInputChange('missionHeading', e.target.value)}
                  />
                  <label className="clean-label">Paragraph 1 Context</label>
                  <textarea
                      className="clean-textarea text-area-large"
                      value={pageData.missionBody1}
                      onChange={(e) => handleInputChange('missionBody1', e.target.value)}
                  />
                  <label className="clean-label">Paragraph 2 Context</label>
                  <textarea
                      className="clean-textarea text-area-large"
                      value={pageData.missionBody2}
                      onChange={(e) => handleInputChange('missionBody2', e.target.value)}
                  />
                </div>
            ) : (
                <>
                  <h2 className="section-heading">{pageData.missionHeading}</h2>
                  <p className="body-text">{pageData.missionBody1}</p>
                  <p className="body-text">{pageData.missionBody2}</p>
                </>
            )}
          </div>

          <div className="mission-asset-column">
            <div className="image-container">
              <img
                  className="mission-img"
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                  alt="Students"
              />
              <div className="image-overlay-tag">
                {isAdmin ? (
                    <>
                      <input
                          className="clean-input font-small"
                          style={{ width: '80px', textAlign: 'center', marginBottom: '4px' }}
                          value={pageData.tagYear}
                          onChange={(e) => handleInputChange('tagYear', e.target.value)}
                      />
                      <input
                          className="clean-input font-small"
                          style={{ width: '160px', textAlign: 'center' }}
                          value={pageData.tagText}
                          onChange={(e) => handleInputChange('tagText', e.target.value)}
                      />
                    </>
                ) : (
                    <>
                      <div className="tag-year">{pageData.tagYear}</div>
                      <div className="tag-text">{pageData.tagText}</div>
                    </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 5. TRIPLE STAT HIGHLIGHT METRICS GRID */}
        <section className="metrics-section">
          <div className="metrics-grid">

            {pageData.metrics.map((metric) => {

              let value = "";

              switch (metric.metricKey) {
                case "PROVINCES":
                  value = pageData.platformStats.totalProvinces;
                  break;

                case "PROGRAMMES":
                  value = pageData.platformStats.totalProgrammes;
                  break;

                case "STUDENTS":
                  value = pageData.platformStats.totalStudents;
                  break;

                default:
                  value = "";
              }

              return (
                  <div className="metric-card" key={metric.id}>

                    <div className="icon-circle">
                      {metric.icon}
                    </div>

                    {isAdmin ? (

                        <div className="clean-admin-card-inline">

                          <input
                              className="clean-input-inline-title"
                              value={metric.title}
                              onChange={(e) => {
                                const metrics = [...pageData.metrics];
                                metrics.find(m => m.id === metric.id).title = e.target.value;
                                setPageData({...pageData, metrics});
                              }}
                          />

                          <textarea
                              className="clean-textarea-inline-desc"
                              value={metric.description}
                              onChange={(e) => {
                                const metrics = [...pageData.metrics];
                                metrics.find(m => m.id === metric.id).description = e.target.value;
                                setPageData({...pageData, metrics});
                              }}
                          />

                        </div>

                    ) : (

                        <>
                          <h2 className="metric-number"> {metric.metricKey === "PROVINCES"
                              ? value
                              : `${value}+`}</h2>

                          <h3 className="card-title">
                            {metric.title}
                          </h3>

                          <p className="card-desc">
                            {metric.description}
                          </p>
                        </>

                    )}

                  </div>
              );

            })}

          </div>
        </section>

        {/* 6. MEET THE TEAM SECTION BLOCK */}
        <section className="team-section">
          <div className="team-container">
            {isAdmin ? (
                <input
                    className="hero-input-center"
                    value={pageData.teamTitle}
                    onChange={(e) => handleInputChange('teamTitle', e.target.value)}
                />
            ) : (
                <h2 className="team-main-title">{pageData.teamTitle}</h2>
            )}

            <div className="team-grid">
              {pageData.teamMembers.map((member) => (
                  <div className="team-member" key={member.id}>
                    <div className="avatar-circle">
                      <span className="initials-span">{member.initials}</span>
                    </div>

                    {isAdmin ? (
                        <div className="team-admin-card">
                          <input
                              className="team-input-name"
                              value={member.fullName}
                              onChange={(e) => handleTeamMemberChange(member.id, 'fullName', e.target.value)}
                          />
                          <input
                              className="team-input-role"
                              value={member.position}
                              onChange={(e) => handleTeamMemberChange(member.id, 'position', e.target.value)}
                          />
                          <input
                              className="team-input-sub"
                              value={member.biography}
                              onChange={(e) => handleTeamMemberChange(member.id, 'biography', e.target.value)}
                          />
                          <input
                              className="team-input-sub font-small"
                              style={{ textAlign: 'center' }}
                              value={member.initials}
                              maxLength={2}
                              onChange={(e) => handleTeamMemberChange(member.id, 'initials', e.target.value.toUpperCase())}
                          />
                        </div>
                    ) : (
                        <>
                          <h4 className="member-name">{member.fullName}</h4>
                          <span className="member-role">{member.position}</span>
                          <p className="member-sub">{member.biography}</p>
                        </>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

export default AboutUs;