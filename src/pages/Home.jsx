import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, BookText, BarChart2, Lightbulb, Mail, MapPin, Phone, AlertCircle, X } from 'lucide-react';
import '../styles/pages/Home.css';
import { startTrial, authMe } from '../lib/api.js';

export default function Home() {
  const [activeTab, setActiveTab] = useState("business");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, message: '', title: '' });
  const navigate = useNavigate();

  const showDialog = (message, title = 'Access Denied') => {
    setDialog({ isOpen: true, message, title });
  };

  const closeDialog = () => {
    setDialog({ ...dialog, isOpen: false });
  };

  useEffect(() => {
    (async () => {
      try { setIsLoggedIn(!!await authMe()); } catch { setIsLoggedIn(false); }
    })();
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          if (entry.target.classList.contains('stats')) {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
              const target = counter.textContent || '';
              const isNumber = /^\d+$/.test(target.replace(/[^\d]/g, ''));
              if (isNumber) {
                const count = parseInt(target.replace(/[^\d]/g, ''), 10);
                let current = 0;
                const increment = count / 100;
                const updateCount = () => {
                  if (current < count) {
                    current += increment;
                    counter.textContent = String(Math.ceil(current));
                    setTimeout(updateCount, 20);
                  } else {
                    counter.textContent = String(count);
                  }
                };
                updateCount();
              }
            });
          }
        }
      });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.service-card, .solution-item, .feature, .stats');
    animatedElements.forEach(el => {
      (el).style.opacity = '0';
      (el).style.transform = 'translateY(30px)';
      (el).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-card');
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        (element).style.transform = `translateY(${yPos}px)`;
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    const t = setTimeout(() => { document.body.style.opacity = '1'; }, 100);
    return () => clearTimeout(t);
  }, []);

  const requireAuth = async (role, action) => {
    let me;
    try {
      me = await authMe();
    } catch {
      navigate('/login');
      return;
    }

    if (!me) {
      navigate('/login');
      return;
    }

    if (role && me.role !== role) {
      showDialog(`Access denied. This feature requires ${role} role.`);
      return;
    }

    try {
      await action();
    } catch (err) {
      console.error('Action failed:', err);
      showDialog('Something went wrong. Please try again.', 'Error');
    }
  };

  const goResumeBuilder = () => requireAuth('STUDENT', async () => { await startTrial('resume'); navigate('/resumebuilder'); });
  const goATSChecker = () => requireAuth('STUDENT', async () => { await startTrial('ats'); navigate('/atschecker'); });
  const goCoverLetter = () => requireAuth('STUDENT', async () => { await startTrial('coverletter'); navigate('/coverletter'); });
  const goPayRollSystem = () => requireAuth('STARTUP_ADMIN', async () => { await startTrial('payroll'); navigate('/payrollsystem'); });
  const goHelpDeskSystem = () => requireAuth('STARTUP_ADMIN', async () => { await startTrial('helpdesk'); navigate('/helpdesksystem'); });
  const goAuditSystem = () => requireAuth('STARTUP_ADMIN', async () => { await startTrial('audit'); navigate('/auditsystem'); });
  const goAptitudeMentor = () => requireAuth('STUDENT', async () => { await startTrial('aptitudementor'); navigate('/aptitudementor'); });
  const goMockAssesment = () => requireAuth('STUDENT', async () => { await startTrial('mockassesment'); navigate('/mockassesment'); });
  const goMarketingSystem = () => requireAuth('STARTUP_ADMIN', async () => { await startTrial('marketing'); navigate('/marketing'); });
  const goVendorSystem = () => requireAuth('STARTUP_ADMIN', async () => { await startTrial('vendor'); navigate('/vendorsystem'); });

  const handleStartJourneyClick = () => {
    navigate('/login');
  };

  const handleExploreSolutionsClick = () => {
    document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1><span className="highlight">Empowering Futures </span> Through IT Solutions</h1>
              <p>DevelUp is a platform which provides IT solutions to help startups, growing business organizations, college students, and individuals develop their career and business or startup. We bridge the gap between technology and success.</p>
              <div className="hero-buttons">
                {!isLoggedIn && (
                  <button className="secondary-button" onClick={handleStartJourneyClick}>Start Your Journey</button>
                )}
                <button className="primary-button" onClick={handleExploreSolutionsClick}>Explore Solutions</button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-card card-1">
                <Lightbulb color="var(--primary-red)" size={48} />
                <span className="floating-card-text">Startups</span>
              </div>
              <div className="floating-card card-2">
                <BriefcaseBusiness color="#2E8B57" size={48} />
                <span className="floating-card-text">Business</span>
              </div>
              <div className="floating-card card-3">
                <BookText color="#FFD700" size={48} />
                <span className="floating-card-text">Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Our IT Solutions</h2>
            <p>Comprehensive technology solutions for every stage of your journey</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon startup-solutions"><Lightbulb size={48} color='white' /></div>
              <h3>Startup Solutions</h3>
              <p>Launch your dream with our comprehensive IT infrastructure, from MVP development to scaling solutions.</p>
            </div>
            <div className="service-card">
              <div className="service-icon business-growth"><BarChart2 size={48} color='white' /></div>
              <h3>Business Growth</h3>
              <p>Scale your growing business with enterprise-grade solutions, automation, and digital transformation.</p>
            </div>
            <div className="service-card">
              <div className="service-icon career-development"><BookText size={48} color='white' /></div>
              <h3>Career Development</h3>
              <p>Empower college students and individuals with tech skills, resume tools, and career guidance for success.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="solutions">
        <div className="container">
          <div className="section-header">
            <h2>Solutions For Every Journey</h2>
            <p>From startup dreams to career advancement - we've got you covered</p>
          </div>
          <div className="solutions-tabs">
            <button className={`solution-tab-button ${activeTab === "business" ? "active" : ""}`} onClick={() => setActiveTab("business")}>Business</button>
            <button className={`solution-tab-button ${activeTab === "students" ? "active" : ""}`} onClick={() => setActiveTab("students")}>Students</button>
          </div>
          {activeTab === "business" && (
            <div className={`tab-content ${activeTab === "business" ? "active" : ""}`}>
              <div className="solutions-grid">
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/payroll.png" alt="PayRoll" /></div>
                  <h4>PayRoll System</h4>
                  <p className="solution-description">Manage your employee's payroll with ease using our PayRoll System.</p>
                  <button className="cta-button" id="navButton" onClick={goPayRollSystem}>Try Now</button>
                </div>
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/helpdesk.png" alt="HelpDesk" /></div>
                  <h4>HelpDesk System</h4>
                  <p className="solution-description">Manage your customer support with ease using our HelpDesk System.</p>
                  <button className="cta-button" id="navButton" onClick={goHelpDeskSystem}>Try Now</button>
                </div>
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/audit.png" alt="Audit" /></div>
                  <h4>Audit System</h4>
                  <p className="solution-description">Audit your business operations with ease using our Audit System.</p>
                  <button className="cta-button" id="navButton" onClick={goAuditSystem}>Try Now</button>
                </div>
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/audit.png" alt="Marketing" /></div>
                  <h4>Marketing System</h4>
                  <p className="solution-description">Manage your marketing campaigns with ease using our Marketing System.</p>
                  <button className="cta-button" id="navButton" onClick={goMarketingSystem}>Try Now</button>
                </div>
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/payroll.png" alt="Vendor" /></div>
                  <h4>Vendor & Tool Management</h4>
                  <p className="solution-description">Manage your vendors and software tools with ease using our Vendor System.</p>
                  <button className="cta-button" id="navButton" onClick={goVendorSystem}>Try Now</button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "students" && (
            <div className={`tab-content ${activeTab === "students" ? "active" : ""}`}>
              <div className="solutions-grid">
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/resume.png" alt="Resume" /></div>
                  <h4>Resume Builder</h4>
                  <p className="solution-description">Create professional resumes with ease using our online resume builder.</p>
                  <button className="cta-button" id="navButton" onClick={goResumeBuilder}>Try Now</button>
                </div>
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/ats.png" alt="ATS" /></div>
                  <h4>ATS Resume Checker</h4>
                  <p className="solution-description">Check your resume against ATS standards with recommendations.</p>
                  <button className="cta-button" id="navButton" onClick={goATSChecker}>Try Now</button>
                </div>
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/coverletter.png" alt="Cover Letter" /></div>
                  <h4>Cover Letter Generator</h4>
                  <p className="solution-description">Create personalized cover letters with ease using our cover letter generator.</p>
                  <button className="cta-button" id="navButton" onClick={goCoverLetter}>Try Now</button>
                </div>
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/mentor.png" alt="ATS" /></div>
                  <h4>Aptitude Mentor</h4>
                  <p className="solution-description">Get personalized aptitude guidance from our expert mentors.</p>
                  <button className="cta-button" id="navButton" onClick={goAptitudeMentor}>Try Now</button>
                </div>
                <div className="solution-item">
                  <div className="solution-icon"><img src="/src/assets/assesment.png" alt="ATS" /></div>
                  <h4>Mock Assessment</h4>
                  <p className="solution-description">Take a mock assessment to test your skills and prepare for your next job interview.</p>
                  <button className="cta-button" id="navButton" onClick={goMockAssesment}>Try Now</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="homestats">
        <div className="container">
          <div className="homestats-grid">
            <div className="homestat-item">
              <div className="homestat-number">1000+</div>
              <div className="homestat-label">Careers Launched</div>
            </div>
            <div className="homestat-item">
              <div className="homestat-number">200+</div>
              <div className="homestat-label">Startups Supported</div>
            </div>
            <div className="homestat-item">
              <div className="homestat-number">5000+</div>
              <div className="homestat-label">Students Empowered</div>
            </div>
            <div className="homestat-item">
              <div className="homestat-number">95%</div>
              <div className="homestat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Why Choose DevelUp?</h2>
              <p>DevelUp is more than just an IT solutions provider - we're your partner in success. Whether you're launching a startup, growing your business, advancing your career, or starting fresh, we provide the technology foundation you need to thrive in the digital age.</p>
              <div className="features">
                <div className="feature">
                  <div className="feature-icon expertise"></div>
                  <div className="feature-content">
                    <h4>Comprehensive Support</h4>
                    <p>From startup ideation to career advancement, we support every step of your journey</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon innovation"></div>
                  <div className="feature-content">
                    <h4>Tailored Solutions</h4>
                    <p>Customized IT solutions that match your specific needs and goals</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon support"></div>
                  <div className="feature-content">
                    <h4>Continuous Growth</h4>
                    <p>Tools and guidance that evolve with you as you grow and succeed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="about-image">
                <div className="tech-stack">
                  <div className="tech-item">Startups</div>
                  <div className="tech-item">Businesses</div>
                  <div className="tech-item">Students</div>
                  <div className="tech-item">Individuals</div>
                  <div className="tech-item">Careers</div>
                  <div className="tech-item">Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Ready to Transform Your Future?</h2>
              <p>Whether you're starting a business, growing your company, advancing your career, or exploring new opportunities, DevelUp is here to guide you every step of the way.</p>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon email"><Mail color='white' /></div>
                  <div>
                    <h4>Email Us</h4>
                    <p>hello@develup.com</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon phone"><Phone color='white' /></div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon location"><MapPin color='white' /></div>
                  <div>
                    <h4>Connect With Us</h4>
                    <p>Available online worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="forms">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="forms">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="forms">
                  <select required className="form-select">
                    <option value="">I am a...</option>
                    <option value="startup">Startup Founder</option>
                    <option value="business">Business Owner</option>
                    <option value="student">College Student</option>
                    <option value="individual">Individual Professional</option>
                  </select>
                </div>
                <div className="forms">
                  <textarea placeholder="Tell us about your goals and how we can help" rows={5} required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Dialog Box */}
      {dialog.isOpen && (
        <div className="custom-dialog-overlay">
          <div className="custom-dialog">
            <div className="custom-dialog-header">
              <div className="custom-dialog-title">
                <AlertCircle className="custom-dialog-icon" size={24} />
                <h3>{dialog.title}</h3>
              </div>
              <button className="custom-dialog-close" onClick={closeDialog}>
                <X size={20} />
              </button>
            </div>
            <div className="custom-dialog-body">
              <p>{dialog.message}</p>
            </div>
            <div className="custom-dialog-footer">
              <button className="custom-dialog-button" onClick={closeDialog}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
