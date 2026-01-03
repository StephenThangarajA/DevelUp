import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '', icon: '🏠', label: 'Home', key: 'home' },
    { path: '', icon: '📊', label: 'Dashboard', key: 'dashboard' },
    { path: 'audits', icon: '📋', label: 'Audits', key: 'audits' },
    { path: 'findings', icon: '🔍', label: 'Findings', key: 'findings' },
    { path: 'reports', icon: '📈', label: 'Reports', key: 'reports' },
    { path: 'settings', icon: '⚙️', label: 'Settings', key: 'settings' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="" end className="logo">
          AuditFlow
        </NavLink>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {menuItems.map((item) => (
            item.label === 'Home' ? (
              <a
                key={item.key}
                onClick={() => {
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
                className={location.pathname === '/auditsystem/' ? 'active' : ''}
                href="#"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.key}
                to={item.path}
                end={item.path === ''}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            )
          ))}
        </nav>

        <div
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;