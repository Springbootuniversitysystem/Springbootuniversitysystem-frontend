import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const subjectOptions = [
  'General Enquiry',
  'Technical Support',
  'Partnership Enquiry',
  'Feedback',
];

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function updateField(field, value) {
    const updated = Object.assign({}, form);
    updated[field] = value;
    setForm(updated);
  }

  function handleNameChange(e) {
    updateField('name', e.target.value);
  }

  function handleEmailChange(e) {
    updateField('email', e.target.value);
  }

  function handleSubjectChange(e) {
    updateField('subject', e.target.value);
  }

  function handleMessageChange(e) {
    updateField('message', e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // TODO: wire up to POST /contact once the backend endpoint exists
  }

  function renderSubjectOption(subject) {
    return <option key={subject} value={subject}>{subject}</option>;
  }

  return (
    <div className="contact-screen">
      <nav className="contact-nav">
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
          <Link to="/career-guidance" className="nav-link">Career Guidance</Link>
          <Link to="/about-us" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link nav-link-active">Contact</Link>
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

      <header className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Have questions? We're here to help every learner find their path.</p>
      </header>

      <main className="contact-main">
        <div className="contact-form-column">
          <h2>Send Us a Message</h2>
          <div className="contact-form-card">
            {submitted && (
              <p className="submitted-notice">
                Thanks,your message has been noted. We'll get back to you soon.
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Tendani@email.com"
                    value={form.email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <select id="subject" value={form.subject} onChange={handleSubjectChange} required>
                  <option value="" disabled>Select a topic...</option>
                  {subjectOptions.map(renderSubjectOption)}
                </select>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={handleMessageChange}
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="send-btn">
                <img
                  src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/envelope-fill.svg"
                  alt=""
                  className="send-icon"
                />
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="contact-info-column">
          <h2>Contact Info</h2>

          <div className="info-card">
            <div className="info-icon-wrap">
              <img
                src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/envelope-fill.svg"
                alt=""
                className="info-icon"
              />
            </div>
            <div>
              <p className="info-title">Email Us</p>
              <p className="info-detail">support@pathfinder.co.za</p>
              <p className="info-sub">Response within 24 hours</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrap">
              <img
                src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/telephone-fill.svg"
                alt=""
                className="info-icon"
              />
            </div>
            <div>
              <p className="info-title">Call Us</p>
              <p className="info-detail">0800 657 098</p>
              <p className="info-sub">Mon–Fri, 08:00–17:00</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrap">
              <img
                src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/geo-alt-fill.svg"
                alt=""
                className="info-icon"
              />
            </div>
            <div>
              <p className="info-title">Office</p>
              <p className="info-detail">124 BlackHealth, Johannesburg</p>
              <p className="info-sub">Gauteng, 0954</p>
            </div>
          </div>

          <div className="partnership-card">
            <h3>School Partnerships</h3>
            <p>
              Want to bring PathFinder to your school? Contact us about bulk
              licences and in school workshops.
            </p>
            <a href="mailto:support@pathfinder.co.za" className="partner-btn">
              Partner With Us
            </a>
          </div>
        </div>
      </main>

      <button type="button" className="help-btn" aria-label="Help">?</button>
    </div>
  );
}

export default Contact;