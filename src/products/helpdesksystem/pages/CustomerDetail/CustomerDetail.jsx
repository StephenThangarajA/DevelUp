import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTicketAlt, FaPhone, FaEnvelope, FaBuilding, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import './CustomerDetail.css';
import { helpdesk } from '../../../../lib/api.js';

const CustomerDetail = ({ customers, tickets: allTickets = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState('');


  useEffect(() => {
    const foundCustomer = customers.find(c => String(c.id) === id);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setEditData(foundCustomer);
      const localTickets = allTickets.filter(t => t.customer && String(t.customer.id || t.customerId) === String(foundCustomer.id));
      if (localTickets.length > 0) {
        setTickets(localTickets);
        setLoading(false);
      } else {
        helpdesk.tickets.list().then(ts => {
          const mapped = ts.map(x => ({
            id: x.code,
            title: x.title,
            status: x.status,
            priority: x.priority,
            createdAt: x.createdAt,
            customerId: x.customerId
          }));
          setTickets(mapped.filter(t => String(t.customerId) === String(foundCustomer.id)));
          setLoading(false);
        }).catch(() => {
          setError('Failed to load tickets');
          setLoading(false);
        });
      }
    } else {
      navigate('/helpdesksystem/customers');
      setLoading(false);
    }
  }, [id, navigate, customers, allTickets]);

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

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'status-open';
      case 'closed': return 'status-closed';
      case 'in progress': return 'status-in-progress';
      default: return 'status-default';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'priority-urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(customer);
  };

  const handleSave = () => {
    setCustomer(editData);
    setIsEditing(false);
    // In a real app, you would save to API here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(customer);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="customer-detail-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading customer details...</p>
          {error && <p className="error-state">{error}</p>}
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="customer-detail-page">
        <div className="error-state">
          <h3>Customer not found</h3>
          <Link to="/helpdesksystem/customers" className="back-link">
            ← Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-detail-page">
      <div className="page-container">
        {error && (
          <div className="error-state" style={{ marginBottom: '12px' }}>
            <h3>{error}</h3>
          </div>
        )}
        <Link to="/helpdesksystem/customers" className="back-link">
          ← Back to Customers
        </Link>
        <div className="customer-detail-content">
          <div className="customer-info-card">
            <div className="customer-header">
              <div className="customer-avatar">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="customer-title">
                <h1>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    customer.name
                  )}
                </h1>
                <p>{customer.company}</p>
              </div>
              <div className="header-actions">
                {!isEditing && (
                  <button className="btn btn-primary" onClick={handleEdit}>
                    <FaEdit /> Edit Customer
                  </button>
                )}
                {isEditing && (
                  <>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                    <button className="btn btn-success" onClick={handleSave}>
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="customer-details">
              <div className="detail-section">
                <h3>Contact Information</h3>
                <div className="detail-item">
                  <FaEnvelope className="detail-icon" />
                  <div className="detail-content">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      <span>{customer.email}</span>
                    )}
                  </div>
                </div>

                <div className="detail-item">
                  <FaPhone className="detail-icon" />
                  <div className="detail-content">
                    <label>Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      <span>{customer.phone}</span>
                    )}
                  </div>
                </div>

                <div className="detail-item">
                  <FaBuilding className="detail-icon" />
                  <div className="detail-content">
                    <label>Company</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={editData.company}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      <span>{customer.company}</span>
                    )}
                  </div>
                </div>

                <div className="detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <div className="detail-content">
                    <label>Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="2"
                      />
                    ) : (
                      <span>{customer.address || 'No address provided'}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Additional Information</h3>
                <div className="detail-item">
                  <div className="detail-content full-width">
                    <label>Notes</label>
                    {isEditing ? (
                      <textarea
                        name="notes"
                        value={editData.notes}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="4"
                      />
                    ) : (
                      <span>{customer.notes || 'No notes available'}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Account Information</h3>
                <div className="detail-item">
                  <div className="detail-content">
                    <label>Customer ID</label>
                    <span>{customer.id}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-content">
                    <label>Account Created</label>
                    <span>{formatDate(customer.createdAt)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-content">
                    <label>Last Contact</label>
                    <span>{formatDate(customer.lastContact)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="customer-tickets-section">
            <div className="tickets-header">
              <h2>Recent Tickets</h2>
              <Link
                to="/helpdesksystem/tickets/new"
                className="btn btn-primary"
              >
                <FaPlus /> New Ticket
              </Link>
            </div>

            {tickets.length > 0 ? (
              <div className="tickets-list">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-header">
                      <div className="ticket-info">
                        <Link to={`/tickets/${ticket.id}`} className="ticket-title">
                          {ticket.title}
                        </Link>
                        <span className="ticket-id">{ticket.id}</span>
                      </div>
                      <div className="ticket-meta">
                        <span className={`status-badge ${getStatusBadgeClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`priority-badge ${getPriorityBadgeClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                    <div className="ticket-footer">
                      <span className="ticket-date">
                        Created: {formatDate(ticket.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <FaTicketAlt className="empty-icon" />
                <h3>No tickets found</h3>
                <p>This customer hasn't created any tickets yet.</p>
                <Link to="/helpdesksystem/tickets/new" className="btn btn-primary">
                  Create First Ticket
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
