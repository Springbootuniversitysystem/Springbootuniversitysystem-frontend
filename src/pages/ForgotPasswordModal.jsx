import { useState } from 'react';
import './ForgotPasswordModal.css';

function ForgotPasswordModal(props) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleCodeChange(e) {
    setCode(e.target.value);
  }

  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function handleSendCode(e) {
    e.preventDefault();
    setError('');
    // TODO: wire up to POST /auth/forgot-password once the backend endpoint exists
    setStep('code');
  }

  function handleVerifyCode(e) {
    e.preventDefault();
    setError('');
    if (code.trim() === '') {
      setError('Enter the code we sent you.');
      return;
    }
    // TODO: wire up to POST /auth/verify-reset-code once the backend endpoint exists
    setStep('newPassword');
  }

  function handleTryDifferentEmail() {
    setCode('');
    setError('');
    setStep('email');
  }

  function handleResetPassword(e) {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // TODO: wire up to POST /auth/reset-password once the backend endpoint exists
    setStep('success');
  }

  function handleClose() {
    props.onClose();
  }

  function renderEmailStep() {
    return (
      <div>
        <div className="modal-icon-circle">
          <img
            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/envelope-fill.svg"
            alt=""
            className="modal-icon"
          />
        </div>
        <h2>Forgot Your Password?</h2>
        <p className="modal-subtitle">Enter your email address and we'll send you a reset code.</p>

        <form onSubmit={handleSendCode}>
          <div className="field">
            <label htmlFor="reset-email">Email Address</label>
            <input
              id="reset-email"
              type="email"
              placeholder="Tendani@email.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          <button type="submit" className="modal-btn">
            Send Reset Code →
          </button>
        </form>
      </div>
    );
  }

  function renderCodeStep() {
    return (
      <div>
        <div className="modal-icon-circle modal-icon-circle-light">
          <img
            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/envelope-fill.svg"
            alt=""
            className="modal-icon modal-icon-gold"
          />
        </div>
        <h2>Check Your Email</h2>
        <p className="modal-subtitle">We've sent a 6-digit reset code to</p>
        <p className="modal-email-highlight">{email}</p>

        <form onSubmit={handleVerifyCode}>
          <div className="field">
            <label htmlFor="reset-code">Enter Reset Code</label>
            <input
              id="reset-code"
              type="text"
              placeholder="12345678"
              value={code}
              onChange={handleCodeChange}
              maxLength={6}
              required
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          <button type="submit" className="modal-btn">
            Verify Code →
          </button>
        </form>

        <button type="button" className="modal-link-btn" onClick={handleTryDifferentEmail}>
          Didn't receive it? Try a different email
        </button>
      </div>
    );
  }

  function renderNewPasswordStep() {
    return (
      <div>
        <div className="modal-icon-circle">
          <img
            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/check-circle.svg"
            alt=""
            className="modal-icon"
          />
        </div>
        <h2>Create New Password</h2>
        <p className="modal-subtitle">Choose a strong password of at least 8 characters.</p>

        <form onSubmit={handleResetPassword}>
          <div className="field">
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type="password"
              placeholder="At least 8 characters"
              value={newPassword}
              onChange={handleNewPasswordChange}
              minLength={8}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="confirm-new-password">Confirm New Password</label>
            <input
              id="confirm-new-password"
              type="password"
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          <button type="submit" className="modal-btn">
            Reset Password →
          </button>
        </form>
      </div>
    );
  }

  function renderSuccessStep() {
    return (
      <div className="success-step">
        <div className="modal-icon-circle modal-icon-circle-light modal-icon-circle-centered">
          <img
            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/check-circle.svg"
            alt=""
            className="modal-icon modal-icon-gold"
          />
        </div>
        <h2>Password Reset!</h2>
        <p className="modal-subtitle">
          Your password has been successfully updated. You can now sign in with your new password.
        </p>

        <button type="button" className="modal-btn" onClick={handleClose}>
          Back to Sign In
        </button>
      </div>
    );
  }

  function renderStepContent() {
    if (step === 'email') {
      return renderEmailStep();
    }
    if (step === 'code') {
      return renderCodeStep();
    }
    if (step === 'newPassword') {
      return renderNewPasswordStep();
    }
    return renderSuccessStep();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button type="button" className="modal-close-btn" onClick={handleClose} aria-label="Close">
          <img
            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/x-lg.svg"
            alt=""
            className="modal-close-icon"
          />
        </button>
        {renderStepContent()}
      </div>
    </div>
  );
}

export default ForgotPasswordModal;