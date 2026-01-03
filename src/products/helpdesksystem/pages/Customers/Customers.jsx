import React, { useState } from 'react';
import { FaPlus, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Customers.css';

const Customers = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const filteredCustomers = customers
    .filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'lastContact') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return <FaSort />;
    return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="customers-page">
      <div className="page-container">
        <div className="customers-header">
          <div className="header-content">
            <h1>Customers</h1>
            <p>Manage customer accounts and contact information</p>
          </div>
          <div className="header-actions">
            <Link to="/helpdesksystem/customers/new" className="btn btn-primary">
              <FaPlus /> Add Customer
            </Link>
          </div>
        </div>

        <div className="customers-content">
          <div className="customers-filters">
            <div className="filters-content">
              <div className="search-group">
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control search-input"
                />
              </div>
              <div className="results-info">
                Showing {filteredCustomers.length} of {customers.length} customers
              </div>
            </div>
          </div>

          <div className="customers-table-container">
            <table className="table">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="sortable"
                  >
                    Customer {getSortIcon('name')}
                  </th>
                  <th
                    onClick={() => handleSort('company')}
                    className="sortable"
                  >
                    Company {getSortIcon('company')}
                  </th>
                  <th>Contact</th>
                  <th
                    onClick={() => handleSort('ticketsCount')}
                    className="sortable"
                  >
                    Tickets {getSortIcon('ticketsCount')}
                  </th>
                  <th
                    onClick={() => handleSort('lastContact')}
                    className="sortable"
                  >
                    Last Contact {getSortIcon('lastContact')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-info">
                        <div className="customer-avatar">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="customer-details">
                          <div className="customer-name">
                            {customer.name}
                            <p className="customer-id">ID: {customer.id}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="company-name">{customer.company}</div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-email">{customer.email}</div>
                        <div className="contact-phone">{customer.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="tickets-count">
                        <span className="count-badge">{customer.ticketsCount}</span>
                        <span className="count-label">tickets</span>
                      </div>
                    </td>
                    <td>
                      <div className="last-contact">
                        {formatDate(customer.lastContact)}
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <Link
                          to={`/helpdesksystem/customers/${customer.id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          View Profile
                        </Link>
                        <Link
                          to="/helpdesksystem/tickets/new"
                          className="btn btn-primary btn-sm"
                        >
                          New Ticket
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredCustomers.length === 0 && (
              <div className="empty-state">
                <h3>No customers found</h3>
                <p>Try adjusting your search terms or add a new customer.</p>
                <Link to="/helpdesksystem/customers/new" className="btn btn-primary">
                  Add Customer
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;