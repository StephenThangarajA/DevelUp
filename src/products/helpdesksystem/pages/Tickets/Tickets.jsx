import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import TicketFilters from '../../components/TicketFilters/TicketFilters';
import TicketTable from '../../components/TicketTable/TicketTable';
import './Tickets.css';

const Tickets = ({ tickets, agents, onUpdateTicket }) => {
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [currentFilters, setCurrentFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    search: ''
  });

  const applyFilters = (source, filters) => {
    let filtered = source;

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }

    // Filter by assignee
    if (filters.assignee !== 'all') {
      filtered = filtered.filter(ticket => ticket.assignee === filters.assignee);
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm) ||
        ticket.description.toLowerCase().includes(searchTerm) ||
        ticket.customer.toLowerCase().includes(searchTerm) ||
        ticket.id.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
    setFilteredTickets(applyFilters(tickets, filters));
  };

  const handleStatusChange = (ticketId, newStatus) => {
    onUpdateTicket(ticketId, { status: newStatus });
  };

  const handleAssigneeChange = (ticketId, newAssignee) => {
    onUpdateTicket(ticketId, { assignee: newAssignee });
  };

  const handlePriorityChange = (ticketId, newPriority) => {
    onUpdateTicket(ticketId, { priority: newPriority });
  };

  useEffect(() => {
    setFilteredTickets(applyFilters(tickets, currentFilters));
  }, [tickets, currentFilters]);

  return (
    <div className="tickets-page">
      <div className="page-container">
        <div className="tickets-header">
          <div className="header-content">
            <h1>Support Tickets</h1>
            <p>Manage and track all customer support requests</p>
          </div>
          <div className="header-actions">
            <Link to="/helpdesksystem/tickets/new" className="btn btn-primary">
              <FaPlus /> Create New Ticket
            </Link>
          </div>
        </div>

        <div className="tickets-content">
          <TicketFilters
            onFilterChange={handleFilterChange}
            agents={agents}
            totalTickets={tickets.length}
            filteredCount={filteredTickets.length}
          />

          <div className="tickets-table-container">
            <TicketTable
              tickets={filteredTickets}
              agents={agents}
              onStatusChange={handleStatusChange}
              onAssigneeChange={handleAssigneeChange}
              onPriorityChange={handlePriorityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;