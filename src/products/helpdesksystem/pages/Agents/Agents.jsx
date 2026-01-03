import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEnvelope } from 'react-icons/fa';
import './Agents.css';

const Agents = ({ agents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  // Removed modal-related state to use route-based pages like Customers

  const departments = [...new Set(agents.map(agent => agent.department))];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || agent.department === filterDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusClass = (status) => {
    return `status-indicator status-${status}`;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return status;
    }
  };

  // No handlers needed; navigation handled via <Link>

  return (
    <div className="agents-page">
      <div className="page-container">
        <div className="agents-header">
          <div className="header-content">
            <h1>Support Agents</h1>
            <p>Manage your support team and track their performance</p>
          </div>
          <div className="header-actions">
            <Link to="/helpdesksystem/agents/new" className="btn btn-primary">
              <FaPlus /> Add Agent
            </Link>
          </div>
        </div>

        <div className="agents-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{agents.length}</div>
              <div className="stat-label">Total Agents</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{agents.filter(a => a.status === 'online').length}</div>
              <div className="stat-label">Online Now</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{agents.reduce((sum, a) => sum + a.activeTickets, 0)}</div>
              <div className="stat-label">Active Tickets</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{agents.reduce((sum, a) => sum + a.resolvedTickets, 0)}</div>
              <div className="stat-label">Resolved Tickets</div>
            </div>
          </div>
        </div>

        <div className="agents-content">
          <div className="agents-filters">
            <div className="filters-content">
              <div className="search-group">
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control search-input"
                />
              </div>

              <div className="filter-group">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="all">All Status</option>
                  <option value="online">Online</option>
                  <option value="away">Away</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <div className="filter-group">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="form-control"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="results-info">
                Showing {filteredAgents.length} of {agents.length} agents
              </div>
            </div>
          </div>

          <div className="agents-grid">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="agent-card">
                <div className="agent-header">
                  <div className="agent-avatar">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="agent-info">
                    <h3 className="agent-name">{agent.name}</h3>
                    <div className="agent-role">{agent.role}</div>
                    <div className="agent-department">{agent.department}</div>
                  </div>
                  <div className={getStatusClass(agent.status)}>
                    <span className="status-dot"></span>
                    <span className="status-text">{getStatusText(agent.status)}</span>
                  </div>
                </div>

                <div className="agent-contact">
                  <div className="contact-item">
                    <FaEnvelope size={20} style={{ color: 'var(--neutral-600)' }} />
                    <span className="contact-value">{agent.email}</span>
                  </div>
                </div>

                <div className="agent-stats">
                  <div className="agent-stat">
                    <div className="stat-number">{agent.activeTickets}</div>
                    <div className="stat-label">Active</div>
                  </div>
                  <div className="agent-stat">
                    <div className="stat-number">{agent.resolvedTickets}</div>
                    <div className="stat-label">Resolved</div>
                  </div>
                  <div className="agent-stat">
                    <div className="stat-number">
                      {agent.resolvedTickets > 0
                        ? Math.round((agent.resolvedTickets / (agent.activeTickets + agent.resolvedTickets)) * 100)
                        : 0}%
                    </div>
                    <div className="stat-label">Success Rate</div>
                  </div>
                </div>

                <div className="agent-actions">
                  <Link
                    to={`/helpdesksystem/agents/${agent.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/helpdesksystem/tickets/new"
                    className="btn btn-primary btn-sm"
                  >
                    Assign Ticket
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="empty-state">
              <h3>No agents found</h3>
              <p>Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>

        {/* Route-based flow now handles add/view/assign actions; no modals used here */}
      </div>
    </div>
  );
};

export default Agents;