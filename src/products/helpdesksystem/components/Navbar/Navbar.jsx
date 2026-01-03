import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extract route inside /helpdesksystem (ex: /helpdesksystem/dashboard → dashboard)
  const currentPath = location.pathname.split("/")[2] || "dashboard";

  return (
    <nav className="navbar">
      <div className="container">

        <Link to="/helpdesksystem/dashboard" className="logo">
          <span>HelpDesk Pro</span>
        </Link>

        <div
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <a
            onClick={() => navigate('/')}
            className={currentPath === "home" ? "active" : ""}
            href="#"
          >
            Home
          </a>

          <Link
            to="/helpdesksystem/dashboard"
            className={currentPath === "dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            to="/helpdesksystem/tickets"
            className={currentPath === "tickets" ? "active" : ""}
          >
            Tickets
          </Link>

          <Link
            to="/helpdesksystem/customers"
            className={currentPath === "customers" ? "active" : ""}
          >
            Customers
          </Link>

          <Link
            to="/helpdesksystem/agents"
            className={currentPath === "agents" ? "active" : ""}
          >
            Agents
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;