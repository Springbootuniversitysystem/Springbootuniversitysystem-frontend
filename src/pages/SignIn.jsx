import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginLearner } from '../services/authService';
import ForgotPasswordModal from './ForgotPasswordModal';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  function updateField(field, value) {
    const updated = Object.assign({}, form);
    updated[field] = value;
    setForm(updated);
  }

  function handleEmailChange(e) {
    updateField('email', e.target.value);
  }

  function handlePasswordChange(e) {
    updateField('password', e.target.value);
  }

  function handleOpenForgotPassword(e) {
    e.preventDefault();
    setShowForgotPassword(true);
  }

  function handleCloseForgotPassword() {
    setShowForgotPassword(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginLearner(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signin-screen">
      <main className="signin-form-panel">

        <div className="signin-card">
          <div className="logo-row">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg"
              alt=""
              className="logo-icon"
            />
            <span className="logo-text-dark">PathFinder</span>
          </div>
          <h1>Welcome Back</h1>
          <p className="subtitle">Sign in to continue your career journey</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Tendani@gmail.com"
                value={form.email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="field">
              <div className="field-header">
                <label htmlFor="password">Password</label>
                <a href="#forgot-password" className="forgot-link" onClick={handleOpenForgotPassword}>Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In '}
            </button>
          </form>

          <p className="switch-line">
            New to PathFinder? <Link to="/create-account">Create a free account</Link>
          </p>
        </div>
      </main>

      <aside className="signin-side">
        <blockquote>
          "PathFinder helped me realise I had the marks for Engineering all along."
        </blockquote>
        <div className="testimonial-author">
          <div className="avatar">TP</div>
          <div>
            <p className="author-name">Thabo Phiri</p>
            <p className="author-detail">BSc Mechanical Engineering, UP ,Class of 2024</p>
          </div>
        </div>
      </aside>

      <button type="button" className="help-btn" aria-label="Help">?</button>

      {showForgotPassword && <ForgotPasswordModal onClose={handleCloseForgotPassword} />}
    </div>
  );
}

export default SignIn;