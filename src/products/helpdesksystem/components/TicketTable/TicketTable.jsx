import React from 'react';
import { Link } from 'react-router-dom';
import './TicketTable.css';

const TicketTable = ({ 
  tickets, 
  agents, 
  onStatusChange, 
  onAssigneeChange, 
  onPriorityChange 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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

  const handleStatusChange = (ticketId, newStatus) => {
    onStatusChange(ticketId, newStatus);
  };

  const handleAssigneeChange = (ticketId, newAssignee) => {
    onAssigneeChange(ticketId, newAssignee);
  };

  const handlePriorityChange = (ticketId, newPriority) => {
    onPriorityChange(ticketId, newPriority);
  };

  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tickets found</h3>
        <p>Try adjusting your filters or create a new ticket.</p>
        <Link to="/helpdesksystem/tickets/new" className="btn btn-primary">
          Create New Ticket
        </Link>
      </div>
    );
  }

  return (
    <div className="ticket-table">
      <table className="table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Title</th>
            <th>Customer</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>
                <Link to={`/helpdesksystem/tickets/${ticket.id}`} className="ticket-id-link">
                  {ticket.id}
                </Link>
              </td>
              <td>
                <div className="ticket-title-cell">
                  <Link to={`/helpdesksystem/tickets/${ticket.id}`} className="ticket-title-link">
                    {ticket.title}
                  </Link>
                  <div className="ticket-category">{ticket.category}</div>
                </div>
              </td>
              <td>
                <div className="customer-cell">
                  <div className="customer-name">{ticket.customer}</div>
                  <div className="customer-email">{ticket.customerEmail}</div>
                </div>
              </td>
              <td>
                <select
                  value={ticket.priority}
                  onChange={(e) => handlePriorityChange(ticket.id, e.target.value)}
                  className={`priority-select ${getPriorityClass(ticket.priority)}`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </td>
              <td>
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                  className={`status-select ${getStatusClass(ticket.status)}`}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td>
                <select
                  value={ticket.assignee}
                  onChange={(e) => handleAssigneeChange(ticket.id, e.target.value)}
                  className="assignee-select"
                >
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.name}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <div className="date-cell">
                  <div className="date-primary">{formatDate(ticket.createdAt)}</div>
                  <div className="date-sla">SLA: {ticket.sla}</div>
                </div>
              </td>
              <td>
                <div className="actions-cell">
                  <Link 
                    to={`/helpdesksystem/tickets/${ticket.id}`} 
                    className="btn btn-secondary btn-sm"
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;