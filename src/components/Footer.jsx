import React from 'react';
import '../styles/components/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src="/src/assets/logo.png" alt="DevelUp Logo" className="logo-image" />
              <span>DevelUp</span>
            </div>
            <p>Empowering businesses with innovative IT solutions for the digital age.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Services</h4>
              <a href="#">Cloud Solutions</a>
              <a href="#">Cybersecurity</a>
              <a href="#">Data Analytics</a>
              <a href="#">Web Development</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="/about">About Us</a>
              <a href="#">Careers</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Case Studies</a>
              <a href="#">White Papers</a>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 DevelUp. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 