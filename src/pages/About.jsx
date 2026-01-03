import React, { useState, useEffect } from 'react';
import { authMe } from '../lib/api.js';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, BadgeCheck, Handshake } from 'lucide-react';
import '../styles/pages/About.css';

export default function About() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => { try { setIsLoggedIn(!!await authMe()); } catch { setIsLoggedIn(false); } })();
  }, []);

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>About DevelUp</h1>
          <p>Empowering businesses with innovative IT solutions since 2020</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>At DevelUp, we believe technology should empower, not complicate. Our mission is to provide innovative IT solutions that help businesses and individuals thrive in the digital age. We combine technical expertise with business acumen to deliver solutions that drive real results.</p>
              <p>Founded in 2020, we've grown from a small team of passionate technologists to a trusted partner for businesses across various industries. Our commitment to excellence and customer satisfaction has been the cornerstone of our success.</p>
            </div>
            <div className="mission-visual">
              <div className="mission-stats">
                <div className="stat-card">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support Available</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="service-icon innovation-icon"><Sparkles size={42} color='white' /></div>
              <h3>Innovation</h3>
              <p>We stay at the forefront of technology, constantly exploring new solutions and methodologies to deliver cutting-edge results.</p>
            </div>
            <div className="value-card">
              <div className="service-icon integrity-icon"><ShieldCheck size={42} color='white' /></div>
              <h3>Integrity</h3>
              <p>We build trust through transparency, honesty, and ethical practices in all our business relationships.</p>
            </div>
            <div className="value-card">
              <div className="service-icon excellence-icon"><BadgeCheck size={42} color='white' /></div>
              <h3>Excellence</h3>
              <p>We are committed to delivering exceptional quality in every project, exceeding expectations at every turn.</p>
            </div>
            <div className="value-card">
              <div className="service-icon collaboration-icon"><Handshake size={42} color='white' /></div>
              <h3>Collaboration</h3>
              <p>We work closely with our clients as partners, ensuring their vision becomes reality through teamwork.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The experts behind your success</p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Sarah Johnson" />
              </div>
              <div className="member-info">
                <h3>Sarah Johnson</h3>
                <p className="member-role">CEO & Founder</p>
                <p className="member-bio">With over 15 years in IT leadership, Sarah founded DevelUp to bridge the gap between complex technology and business needs.</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Michael Chen" />
              </div>
              <div className="member-info">
                <h3>Michael Chen</h3>
                <p className="member-role">CTO</p>
                <p className="member-bio">Michael leads our technical vision with expertise in cloud architecture, cybersecurity, and emerging technologies.</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Emily Rodriguez" />
              </div>
              <div className="member-info">
                <h3>Emily Rodriguez</h3>
                <p className="member-role">Head of Operations</p>
                <p className="member-bio">Emily ensures seamless project delivery and client satisfaction with her exceptional organizational skills and attention to detail.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Milestones that shaped our company</p>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Company Founded</h3>
                <p>DevelUp was founded with a vision to simplify IT solutions for businesses of all sizes.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3>First 100 Clients</h3>
                <p>Reached our first major milestone by serving 100 satisfied clients across various industries.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>Cloud Specialization</h3>
                <p>Became certified cloud solution providers for major platforms including AWS and Azure.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Team Expansion</h3>
                <p>Grew our team to 25+ professionals and opened our second office location.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>AI Integration</h3>
                <p>Launched AI-powered solutions and became early adopters of machine learning technologies.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>Global Expansion</h3>
                <p>Expanding our services globally while maintaining our commitment to personalized service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work With Us?</h2>
            <p>Join hundreds of satisfied clients who trust DevelUp with their IT needs</p>
            <div className="cta-buttons">
              {!isLoggedIn && (
                <button className="secondary-button" onClick={handleGetStartedClick}>Get Started Today</button>
              )}
              <a href="/contact" className="primary-button">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 
