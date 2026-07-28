import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const subjectOptions = [
  'General Enquiry',
  'Technical Support',
  'Partnership Enquiry',
  'Feedback',
];

function Contact() {
  const [form, setForm] = useState({ name: "", emailAddress: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({ supportEmail: "", supportPhone: "", officeLocation: "" });

  // Track if user is signed in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for active session
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }

    const loadContactInfo = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/v1/contact/info");
        if (response.ok) {
          const result = await response.json();
          setContactInfo(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadContactInfo();
  }, []);

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8085/api/v1/contact/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to send message.");
      setSubmitted(true);
      setForm({ name: "", emailAddress: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Unable to send message.");
    }
  }

  return (
      <div className="contact-screen">
        <nav className="contact-nav">
          <div className="nav-logo-row">
            <div className="nav-logo-icon-wrap">
              <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg" alt="" className="nav-logo-icon" />
            </div>
            <div>
              <span className="nav-logo-text">PathFinder</span>
              <span className="nav-logo-subtext">CAREER GUIDANCE</span>
            </div>
          </div>

          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/career-guidance" className="nav-link">Career Guidance</Link>
            <Link to="/about" className="nav-link">About Us</Link> {/* FIXED LINK */}
            <Link to="/contact" className="nav-link nav-link-active">Contact</Link>
          </div>

          <div className="nav-actions">
            {isLoggedIn ? (
                <Link to="/profile" className="nav-signup-btn">
                  <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-fill.svg" alt="" className="nav-icon-dark" />
                  My Profile
                </Link>
            ) : (
                <>
                  <Link to="/sign-in" className="nav-login-link">Login</Link>
                  <Link to="/create-account" className="nav-signup-btn">Sign Up</Link>
                </>
            )}
          </div>
        </nav>

        <header className="contact-hero">
          <h1>Get in Touch</h1>
          <p>Have questions? We're here to help every learner find their path.</p>
        </header>

        <main className="contact-main">
          {/* ... Rest of your contact main content remains exactly the same ... */}
          <div className="contact-form-column">
            <h2>Send Us a Message</h2>
            <div className="contact-form-card">
              {submitted && <p className="submitted-notice">Thanks, your message has been noted. We'll get back to you soon.</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="name">Your Name</label>
                    <input id="name" type="text" placeholder="Full name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" placeholder="Tendani@email.com" value={form.emailAddress} onChange={(e) => updateField('emailAddress', e.target.value)} required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" value={form.subject} onChange={(e) => updateField('subject', e.target.value)} required>
                    <option value="" disabled>Select a topic...</option>
                    {subjectOptions.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Tell us how we can help you..." value={form.message} onChange={(e) => updateField('message', e.target.value)} rows="6" required />
                </div>
                <button type="submit" className="send-btn">Send Message</button>
              </form>
            </div>
          </div>

          <div className="contact-info-column">
            <h2>Contact Info</h2>
            <div className="info-card">
              <div className="info-icon-wrap"><img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/envelope-fill.svg" alt="" className="info-icon" /></div>
              <div><p className="info-title">Email Us</p><p className="info-detail">{contactInfo.supportEmail || "support@pathfinder.co.za"}</p><p className="info-sub">Response within 24 hours</p></div>
            </div>
            <div className="info-card">
              <div className="info-icon-wrap"><img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/telephone-fill.svg" alt="" className="info-icon" /></div>
              <div><p className="info-title">Call Us</p><p className="info-detail">{contactInfo.supportPhone || "011 234 5678"}</p><p className="info-sub">Mon–Fri, 08:00–17:00</p></div>
            </div>
            <div className="info-card">
              <div className="info-icon-wrap"><img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/geo-alt-fill.svg" alt="" className="info-icon" /></div>
              <div><p className="info-title">Office</p><p className="info-detail">{contactInfo.officeLocation || "Sandton, Johannesburg"}</p><p className="info-sub">Gauteng, 0954</p></div>
            </div>
          </div>
        </main>
      </div>
  );
}

export default Contact;