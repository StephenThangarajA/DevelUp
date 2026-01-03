import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuditData } from '../context/AuditContext.jsx';
import './CreateAudit.css';

const CreateAudit = () => {
  const navigate = useNavigate();
  const { createAudit } = useAuditData();
  
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    auditor: '',
    startDate: '',
    dueDate: '',
    description: '',
    status: 'pending'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Audit title is required';
    }
    
    if (!formData.client.trim()) {
      newErrors.client = 'Client name is required';
    }
    
    if (!formData.auditor.trim()) {
      newErrors.auditor = 'Lead auditor is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (formData.startDate && formData.dueDate && new Date(formData.dueDate) < new Date(formData.startDate)) {
      newErrors.dueDate = 'Due date cannot be before start date';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createAudit(formData);
      navigate('../audits');
    } catch (error) {
      console.error('Error creating audit:', error);
      setErrors({ submit: 'Failed to create audit. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="as-create-audit-page">
      <div className="as-create-audit-container">
        <div className="as-create-audit-header">
          <Link to=".." className="as-back-link">
            ← Back to Audits
          </Link>
          <h1>Create New Audit</h1>
          <p>Fill in the details below to create a new audit</p>
        </div>

        <div className="as-create-audit-form-card">
          <form onSubmit={handleSubmit} className="as-create-audit-form">
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="as-form-group">
                <label htmlFor="title" className="as-form-label">
                  Audit Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`as-form-input ${errors.title ? 'error' : ''}`}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter audit title"
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="as-form-group">
                <label htmlFor="client" className="as-form-label">
                  Client *
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  className={`as-form-input ${errors.client ? 'error' : ''}`}
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Enter client name"
                />
                {errors.client && <span className="error-message">{errors.client}</span>}
              </div>

              <div className="as-form-group">
                <label htmlFor="auditor" className="as-form-label">
                  Lead Auditor *
                </label>
                <input
                  type="text"
                  id="auditor"
                  name="auditor"
                  className={`as-form-input ${errors.auditor ? 'error' : ''}`}
                  value={formData.auditor}
                  onChange={handleChange}
                  placeholder="Enter lead auditor name"
                />
                {errors.auditor && <span className="error-message">{errors.auditor}</span>}
              </div>
            </div>

            <div className="as-form-section">
              <h3>Schedule & Status</h3>
              
              <div className="as-form-row">
                <div className="as-form-group">
                  <label htmlFor="startDate" className="as-form-label">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className={`as-form-input ${errors.startDate ? 'error' : ''}`}
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  {errors.startDate && <span className="as-error-message">{errors.startDate}</span>}
                </div>

                <div className="as-form-group">
                  <label htmlFor="dueDate" className="as-form-label">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    className={`as-form-input ${errors.dueDate ? 'error' : ''}`}
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                  {errors.dueDate && <span className="as-error-message">{errors.dueDate}</span>}
                </div>
              </div>

              <div className="as-form-group">
                <label htmlFor="status" className="as-form-label">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="as-form-input"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="as-form-section">
              <h3>Additional Information</h3>
              
              <div className="as-form-group">
                <label htmlFor="description" className="as-form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="as-form-textarea"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter audit description or scope..."
                />
              </div>
            </div>

            {errors.submit && <div className="as-error-alert">{errors.submit}</div>}

            <div className="as-form-actions">
              <Link to="../audits" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Audit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAudit;
