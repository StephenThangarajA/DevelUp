import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import '../styles/pages/Login.css';
import { authLogin, authSignup, authGoogle } from '../lib/api.js';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => { }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
    const email = emailEl && 'value' in emailEl ? emailEl.value : '';
    const password = passwordEl && 'value' in passwordEl ? passwordEl.value : '';
    if (!email || !password) { alert('Please fill in all fields'); return; }
    if (loginButton) {
      loginButton.textContent = 'Signing In...';
      loginButton.setAttribute('disabled', 'true');
    }
    try {
      await authLogin({ email, password });
      if (loginButton) {
        loginButton.textContent = 'Success!';
        loginButton.setAttribute('style', 'background: var(--accent-green)');
      }
      setTimeout(() => { navigate('/'); }, 800);
    } catch (err) {
      alert('Login failed');
      if (loginButton) {
        loginButton.textContent = 'Sign In';
        loginButton.removeAttribute('disabled');
        loginButton.removeAttribute('style');
      }
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    try {
      await authGoogle({ credential: credentialResponse?.credential });
      navigate('/');
    } catch (err) {
      alert('Google login failed');
    }
  };

  const onSignup = async (e) => {
    e.preventDefault();
    const firstNameEl = document.getElementById('firstName');
    const lastNameEl = document.getElementById('lastName');
    const signupEmailEl = document.getElementById('signupEmail');
    const companyEl = document.getElementById('company');
    const userTypeEl = document.getElementById('userType');
    const signupPasswordEl = document.getElementById('signupPassword');
    const confirmPasswordEl = document.getElementById('confirmPassword');
    const signupButton = document.querySelector('.signup-button');
    const firstName = firstNameEl && 'value' in firstNameEl ? firstNameEl.value : '';
    const lastName = lastNameEl && 'value' in lastNameEl ? lastNameEl.value : '';
    const email = signupEmailEl && 'value' in signupEmailEl ? signupEmailEl.value : '';
    const company = companyEl && 'value' in companyEl ? companyEl.value : '';
    const userType = userTypeEl && 'value' in userTypeEl ? userTypeEl.value : '';
    const password = signupPasswordEl && 'value' in signupPasswordEl ? signupPasswordEl.value : '';
    const confirmPassword = confirmPasswordEl && 'value' in confirmPasswordEl ? confirmPasswordEl.value : '';
    if (!firstName || !lastName || !email || !company || !userType || !password || !confirmPassword) { alert('Please fill in all fields'); return; }
    if (password !== confirmPassword) { alert('Passwords do not match'); return; }
    if (signupButton) {
      signupButton.textContent = 'Creating Account...';
      signupButton.setAttribute('disabled', 'true');
    }
    try {
      const role = userType === 'student' ? 'STUDENT' : 'STARTUP_ADMIN';
      await authSignup({ email, password, role, name: `${firstName} ${lastName}`, company });
      if (signupButton) {
        signupButton.textContent = 'Account Created!';
        signupButton.setAttribute('style', 'background: var(--accent-green)');
      }
      setTimeout(() => { hideSignup(); navigate('/'); }, 800);
    } catch (err) {
      alert('Signup failed');
      if (signupButton) {
        signupButton.textContent = 'Create Account';
        signupButton.removeAttribute('disabled');
        signupButton.removeAttribute('style');
      }
    }
  };

  const showSignup = () => {
    const modal = document.getElementById('signupModal');
    if (modal) modal.style.display = 'block';
  };
  const hideSignup = () => {
    const modal = document.getElementById('signupModal');
    if (modal) modal.style.display = 'none';
  };

  useEffect(() => {
    const modal = document.getElementById('signupModal');
    const onWindowClick = (event) => {
      if (event.target === modal) hideSignup();
    };
    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  }, []);

  return (
    <>
      <section className="login-section">
        <div className="container">
          <div className="login-container">
            <div className="login-form-container">
              <div className="login-header">
                <h1>Welcome Back</h1>
                <p>Sign in to your DevelUp account</p>
              </div>
              <form className="login-form" id="loginForm" onSubmit={onLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div className="form-options">
                  <label className="checkbox-container">
                    <input type="checkbox" id="remember" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
                <button type="submit" className="login-button">Sign In</button>
              </form>
              <div className="login-divider">
                <span>OR</span>
              </div>
              <div className="social-login">
                <GoogleLogin style={{border: '2px solid var(--primary-red)'}} onSuccess={onGoogleSuccess} onError={() => alert('Google login failed')} />
              </div>
              <div className="signup-link">
                <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); showSignup(); }}>Sign up</a></p>
              </div>
            </div>
            <div className="login-visual">
              <div className="visual-content">
                <h2>Transform Your Business</h2>
                <p>Join thousands of businesses that trust DevelUp for their IT solutions</p>
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-check"></div>
                    <span>24/7 Expert Support</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-check"></div>
                    <span>Secure Cloud Solutions</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-check"></div>
                    <span>Custom IT Strategies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="modal" id="signupModal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create Account</h2>
            <button className="close-modal" onClick={hideSignup}>&times;</button>
          </div>
          <form className="signup-form" id="signupForm" onSubmit={onSignup}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="signupEmail">Email Address</label>
              <input type="email" id="signupEmail" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input type="text" id="company" name="company" required />
            </div>
            <div className="form-group">
              <label htmlFor="userType">I am a</label>
              <select id="userType" name="userType" required>
                <option value="">Select user type</option>
                <option value="student">Student</option>
                <option value="startup">Startup/Business Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="signupPassword">Password</label>
              <input type="password" id="signupPassword" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" id="terms" required />
                <span className="checkmark"></span>
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            <button type="submit" className="signup-button">Create Account</button>
          </form>
        </div>
      </div>
    </>
  );
} 
