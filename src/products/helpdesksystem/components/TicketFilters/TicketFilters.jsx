import React, { useState } from 'react';
import './TicketFilters.css';

const TicketFilters = ({ onFilterChange, agents, totalTickets, filteredCount }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    search: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: 'all',
      priority: 'all',
      assignee: 'all',
      search: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all' && value !== '');

  return (
    <div className="ticket-filters">
      <div className="filters-header">
        <div className="filters-title">
          <h3>Filters</h3>
          <span className="results-count">
            Showing {filteredCount} of {totalTickets} tickets
          </span>
        </div>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="btn btn-secondary btn-sm">
            Clear Filters
          </button>
        )}
      </div>

      <div className="filters-content">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search tickets..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="form-control"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="form-control"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="form-control"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="assignee">Assignee</label>
          <select
            id="assignee"
            value={filters.assignee}
            onChange={(e) => handleFilterChange('assignee', e.target.value)}
            className="form-control"
          >
            <option value="all">All Agents</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.name}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketFilters;