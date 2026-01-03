import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../styles/components/Navbar.css';
import { authMe, authLogout } from '../lib/api.js';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navMenuRef = useRef(null);
  const toggleRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [authed, setAuthed] = useState(false);
  const [me, setMe] = useState(null);

  useEffect(() => {
    const mobileToggle = toggleRef.current;
    const navMenu = navMenuRef.current;
    if (!mobileToggle || !navMenu) return;

    const handler = () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    };
    mobileToggle.addEventListener('click', handler);
    return () => mobileToggle.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const u = await authMe();
        if (!cancelled) {
          setMe(u);
          setAuthed(!!u);
        }
      } catch {
        if (!cancelled) {
          setMe(null);
          setAuthed(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [location.pathname]);

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // preserve active link behavior on scroll into sections on home
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    if (location.pathname !== '/') {
      // Clear active section state and remove active class from hash links when not on home page
      setActiveSection('');
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });
      return;
    }

    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
      let current = '';
      const heroSection = document.getElementById('home');
      let isInHero = false;

      if (heroSection) {
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;
        isInHero = window.scrollY >= heroTop - 100 && window.scrollY < heroTop + heroHeight - 100;
      }

      // Check which section we're in
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id') || '';
        }
      });

      // Update state for active section
      if (isInHero || (!current && window.scrollY < 200)) {
        setActiveSection('home');
      } else {
        setActiveSection(current);
      }

      // Update hash links (Services, Solutions)
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    // Initial call to set correct state
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      // Clean up: remove active class from hash links when component unmounts or pathname changes
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });
    };
  }, [location.pathname]);

  const goLogin = () => navigate('/login');
  const logout = async (e) => {
    e.preventDefault();
    try { await authLogout(); } catch { }
    setMe(null);
    setAuthed(false);
    navigate('/');
  };

  const handleSolutionsClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home page, scroll to solutions
      const solutionsSection = document.getElementById('solutions');
      if (solutionsSection) {
        solutionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll to solutions
      navigate('/');
      // Wait for navigation and DOM update, then scroll
      setTimeout(() => {
        const solutionsSection = document.getElementById('solutions');
        if (solutionsSection) {
          solutionsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home page, scroll to services
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll to services
      navigate('/');
      // Wait for navigation and DOM update, then scroll
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <div className="logo">
            <img src="/src/assets/logo.png" alt="DevelUp Logo" className="logo-image" />
            <span>DevelUp</span>
          </div>
        </div>
        <div className="nav-menu" ref={navMenuRef}>
          <NavLink
            to="/"
            className={({ isActive }) => {
              // Only show as active if we're on home page AND activeSection is 'home' or empty
              if (location.pathname === '/') {
                return activeSection === 'home' || activeSection === '' ? 'active' : undefined;
              }
              return isActive ? 'active' : undefined;
            }}
          >
            Home
          </NavLink>
          <a href="#services" onClick={handleServicesClick}>Services</a>
          <a href="#solutions" onClick={handleSolutionsClick}>Solutions</a>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined}>Contact</NavLink>
          {!authed ? (
            <button className="cta-button" onClick={goLogin}>Get Started</button>
          ) : (
            <div className="user-profile">
              <div className="profile-avatar">
                <span id="userInitials">{(me?.name || '').split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</span>
              </div>
              <div className="profile-dropdown">
                <NavLink to="/profile" className="profile-link">
                  <FaUser style={{ color: 'var(--primary-red)' }} />
                  Profile
                </NavLink>
                <NavLink to="/settings" className="profile-link">
                  <FaCog style={{ color: 'var(--primary-red)' }} />
                  Settings
                </NavLink>
                <a href="#" className="profile-link" onClick={logout}>
                  <FaSignOutAlt style={{ color: 'var(--primary-red)' }} />
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="mobile-menu-toggle" ref={toggleRef}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
} 
