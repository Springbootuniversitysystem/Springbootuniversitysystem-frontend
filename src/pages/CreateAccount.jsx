import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerLearner } from '../services/authService';
import './CreateAccount.css';

const grades = ['Grade 11', 'Grade 12'];

const provinces = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
  'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
];

const features = [
  'Personalised course recommendations',
  'Subject strength analysis',
  'Professional CV builder',
  'Bursary opportunity alerts',
  'University application tracker',
];

function CreateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    grade: '',
    email: '',
    schoolName: '',
    province: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    const updated = Object.assign({}, form);
    updated[field] = value;
    setForm(updated);
  }

  function handleFullNameChange(e) {
    updateField('fullName', e.target.value);
  }

  function handleGradeChange(e) {
    updateField('grade', e.target.value);
  }

  function handleEmailChange(e) {
    updateField('email', e.target.value);
  }

  function handleSchoolNameChange(e) {
    updateField('schoolName', e.target.value);
  }

  function handleProvinceChange(e) {
    updateField('province', e.target.value);
  }

  function handlePasswordChange(e) {
    updateField('password', e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    updateField('confirmPassword', e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await registerLearner(form);
      navigate('/sign-in');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  function renderGradeOption(g) {
    return <option key={g} value={g}>{g}</option>;
  }

  function renderProvinceOption(p) {
    return <option key={p} value={p}>{p}</option>;
  }

  function renderFeature(item) {
    return (
      <li key={item}>
        <img
          src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/check-circle-fill.svg"
          alt=""
          className="check-icon"
        />
        {item}
      </li>
    );
  }

  return (
    <div className="auth-screen">
      <aside className="auth-side">
        <div className="side-content">
         <div className="logo-row">
           <img
             src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg"
             alt=""
             className="logo-icon"
           />
           <span className="logo-text">PathFinder</span>
         </div>
          <h1>Begin Your Journey</h1>
          <p>
            Create your free PathFinder account and unlock personalised
            university recommendations based on your unique academic profile.
          </p>
          <ul className="feature-list">
            {features.map(renderFeature)}
          </ul>
        </div>
      </aside>

      <main className="auth-form-panel">
       <h2>Create Account</h2>
        <p className="switch-link">
          Already have an account? <Link to="/sign-in">Sign in here</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Tendani Murendi"
                value={form.fullName}
                onChange={handleFullNameChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="grade">Grade</label>
              <select
                id="grade"
                value={form.grade}
                onChange={handleGradeChange}
                required
              >
                <option value="">Select...</option>
                {grades.map(renderGradeOption)}
              </select>
            </div>
          </div>

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
            <label htmlFor="schoolName">School Name</label>
            <input
              id="schoolName"
              type="text"
              placeholder="e.g. Pretoria High School"
              value={form.schoolName}
              onChange={handleSchoolNameChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={form.province}
              onChange={handleProvinceChange}
              required
            >
              <option value="">Select province...</option>
              {provinces.map(renderProvinceOption)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              minLength={8}
              value={form.password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create My Account '}
          </button>

          <p className="fine-print">
            By creating an account you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </main>
    </div>
  );
}

export default CreateAccount;