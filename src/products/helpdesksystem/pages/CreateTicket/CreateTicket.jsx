import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTicket.css';

const CreateTicket = ({ customers, agents, onCreateTicket }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customer: '',
    customerEmail: '',
    priority: 'medium',
    assignee: agents[0]?.name || '',
    category: 'Technical',
    sla: '24 hours'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Technical',
    'Billing',
    'Feature Request',
    'Bug Report',
    'Account',
    'General Inquiry'
  ];

  const slaOptions = [
    { value: '2 hours', label: '2 hours (Urgent)' },
    { value: '4 hours', label: '4 hours (High)' },
    { value: '24 hours', label: '24 hours (Medium)' },
    { value: '72 hours', label: '72 hours (Low)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCustomerSelect = (e) => {
    const customerName = e.target.value;
    const customer = customers.find(c => c.name === customerName);

    setFormData(prev => ({
      ...prev,
      customer: customerName,
      customerEmail: customer ? customer.email : ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.customer.trim()) {
      newErrors.customer = 'Customer is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Customer email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newTicket = await onCreateTicket(formData);
      navigate(`/helpdesksystem/tickets/${newTicket.id}`);
    } catch (error) {
      console.error('Error creating ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/helpdesksystem/tickets');
  };

  return (
    <div className="create-ticket-page">
      <div className="page-container">
        <div className="create-ticket-header">
          <h1>Create New Ticket</h1>
          <p>Fill out the form below to create a new support ticket</p>
        </div>

        <div className="create-ticket-content">
          <form onSubmit={handleSubmit} className="ticket-form">
            <div className="form-section">
              <h3>Ticket Information</h3>

              <div className="form-row">
                <div className="forms">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`form-control ${errors.title ? 'error' : ''}`}
                    placeholder="Brief description of the issue"
                  />
                  {errors.title && <div className="form-error">{errors.title}</div>}
                </div>

                <div className="forms">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="forms">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`form-control ${errors.description ? 'error' : ''}`}
                  rows="4"
                  placeholder="Detailed description of the issue or request"
                />
                {errors.description && <div className="form-error">{errors.description}</div>}
              </div>
            </div>

            <div className="form-section">
              <h3>Customer Information</h3>

              <div className="form-row">
                <div className="forms">
                  <label htmlFor="customer">Customer *</label>
                  <select
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleCustomerSelect}
                    className={`form-control ${errors.customer ? 'error' : ''}`}
                  >
                    <option value="">Select a customer</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.name}>
                        {customer.name} - {customer.company}
                      </option>
                    ))}
                  </select>
                  {errors.customer && <div className="form-error">{errors.customer}</div>}
                </div>

                <div className="forms">
                  <label htmlFor="customerEmail">Customer Email *</label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className={`form-control ${errors.customerEmail ? 'error' : ''}`}
                    placeholder="customer@example.com"
                  />
                  {errors.customerEmail && <div className="form-error">{errors.customerEmail}</div>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Assignment & Priority</h3>

              <div className="form-row">
                <div className="forms">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="forms">
                  <label htmlFor="assignee">Assign to</label>
                  <select
                    id="assignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.name}>
                        {agent.name} - {agent.department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="forms">
                <label htmlFor="sla">SLA</label>
                <select
                  id="sla"
                  name="sla"
                  value={formData.sla}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {slaOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Creating...
                  </>
                ) : (
                  'Create Ticket'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;