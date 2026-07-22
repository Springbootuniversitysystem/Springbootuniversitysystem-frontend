import React, { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import './App.css'; // Importing separated CSS sheet

function App() {
  const [session, setSession] = useState({
    isLoggedIn: true,
    role: "ADMIN",
    username: 'admin@pathfinder.co.za'
  });

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const result = await response.json();

      if (response.ok && result.data) {
        setSession({
          isLoggedIn: true,
          role: result.data.role,
          username: result.data.username
        });
        setShowLoginModal(false);
        setCredentials({ username: '', password: '' });
      } else {
        setError(result.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Could not reach the Spring Boot backend server.');
    }
  };

  const handleLogout = () => {
    setSession({ isLoggedIn: false, role: "GUEST", username: '' });
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Fixed Navigation Header */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-icon">🎓</div>
          <div>
            <div className="logo-text">PathFinder</div>
            <div className="logo-subtext">CAREER GUIDANCE</div>
          </div>
        </div>

        <div className="nav-links">
          <span className="nav-link">Home</span>
          <span className="nav-link">Career Guidance</span>
          <span className="nav-link active-nav-link">About Us</span>
          <span className="nav-link">Contact</span>
        </div>

        <div className="nav-right">
          {session.isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span className="session-badge">{session.role}</span>
              <button onClick={handleLogout} className="logout-btn">Sign Out</button>
            </div>
          ) : (
            <>
              <button onClick={() => setShowLoginModal(true)} className="login-btn">
                Login
              </button>
              <button className="signup-btn">Sign Up</button>
            </>
          )}
        </div>
      </nav>

      {/* Content wrapper with paddingTop offset */}
      <main style={{ flex: 1, width: '100%', paddingTop: '80px' }}>
        <AboutUs role={session.role} />
      </main>

      {/* Modal Overlay Layer */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="login-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0c1e36', fontFamily: "'Playfair Display', serif" }}>Sign In Portal</h3>
              <button onClick={() => { setShowLoginModal(false); setError(''); }} className="close-btn">✕</button>
            </div>
            {error && <div className="error-alert">{error}</div>}
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <label className="auth-label">Email Address</label>
              <input type="text" name="username" value={credentials.username} onChange={handleInputChange} className="auth-input" placeholder="admin@pathfinder.co.za" required />
              
              <label className="auth-label">Password</label>
              <input type="password" name="password" value={credentials.password} onChange={handleInputChange} className="auth-input" required />
              
              <button type="submit" className="submit-btn">Authenticate</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;