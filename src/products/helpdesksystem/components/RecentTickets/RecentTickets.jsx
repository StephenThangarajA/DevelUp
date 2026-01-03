import React from 'react';
import { Link } from 'react-router-dom';
import './RecentTickets.css';

const RecentTickets = ({ tickets }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityClass = (priority) => {
    return `priority-badge priority-${priority}`;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tickets yet</h3>
        <p>Create your first support ticket to get started.</p>
        <Link to="/helpdesksystem/tickets/new" className="btn btn-primary">
          Create Ticket
        </Link>
      </div>
    );
  }

  return (
    <div className="recent-tickets">
      <div className="tickets-list">
        {tickets.map((ticket) => (
          <Link 
            key={ticket.id} 
            to={`/helpdesksystem/tickets/${ticket.id}`}
            className="ticket-item"
          >
            <div className="ticket-header">
              <div className="ticket-id">{ticket.id}</div>
              <div className="ticket-badges">
                <span className={getPriorityClass(ticket.priority)}>
                  {ticket.priority}
                </span>
                <span className={getStatusClass(ticket.status)}>
                  {ticket.status.replace('-', ' ')}
                </span>
              </div>
            </div>
            
            <div className="ticket-content">
              <h4 className="ticket-title">{ticket.title}</h4>
              <p className="ticket-description">{ticket.description}</p>
            </div>
            
            <div className="ticket-meta">
              <div className="ticket-customer">
                <span className="meta-label">Customer:</span>
                <span className="meta-value">{ticket.customer}</span>
              </div>
              <div className="ticket-assignee">
                <span className="meta-label">Assigned to:</span>
                <span className="meta-value">{ticket.assignee}</span>
              </div>
              <div className="ticket-date">
                <span className="meta-label">Created:</span>
                <span className="meta-value">{formatDate(ticket.createdAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentTickets;