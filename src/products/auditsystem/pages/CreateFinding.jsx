import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuditData } from '../context/AuditContext';
import './CreateFinding.css';

const CreateFinding = () => {
  const navigate = useNavigate();
  const { audits, createFinding } = useAuditData();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'low',
    status: 'open',
    auditId: '',
    assignee: '',
    dueDate: '',
    date: ''
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
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.auditId) {
      newErrors.auditId = 'Please select an audit';
    }
    
    if (!formData.severity) {
      newErrors.severity = 'Severity is required';
    }
    
    if (!formData.assignee.trim()) {
      newErrors.assignee = 'Assignee is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
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
      await createFinding(formData);
      navigate('../findings');
    } catch (error) {
      console.error('Error creating finding:', error);
      setErrors({ submit: 'Failed to create finding. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="as-create-finding-page">
      <div className="as-page-container">
        <Link to="../findings" className="as-back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Findings
        </Link>

        <div className="as-create-finding-header">
          <h1>Create New Finding</h1>
          <p>Document a new security finding or issue discovered during an audit</p>
        </div>

        <div className="as-create-finding-content">
          <form className="as-customer-form" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="as-form-error-message">
                {errors.submit}
              </div>
            )}

            <div className="as-form-section">
              <h3>Finding Details</h3>
              
              <div className="as-form-group">
                <label htmlFor="title">Finding Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="Enter a descriptive title for the finding"
                />
                {errors.title && <span className="as-form-error">{errors.title}</span>}
              </div>

              <div className="as-form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="as-form-error">{errors.date}</span>}
              </div>

              <div className="as-form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'error' : ''}
                  placeholder="Provide a detailed description of the finding..."
                  rows="4"
                />
                {errors.description && <span className="as-form-error">{errors.description}</span>}
              </div>

              <div className="as-form-row">
                <div className="as-form-group">
                  <label htmlFor="auditId">Related Audit *</label>
                  <select
                    id="auditId"
                    name="auditId"
                    value={formData.auditId}
                    onChange={handleChange}
                    className={errors.auditId ? 'error' : ''}
                  >
                    <option value="">Select an audit</option>
                    {audits.map(audit => (
                      <option key={audit.id} value={audit.id}>
                        {audit.title} - {audit.system}
                      </option>
                    ))}
                  </select>
                  {errors.auditId && <span className="as-form-error">{errors.auditId}</span>}
                </div>

                <div className="as-form-group">
                  <label htmlFor="assignee">Assigned To *</label>
                  <input
                    type="text"
                    id="assignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    className={errors.assignee ? 'error' : ''}
                    placeholder="Enter assignee name"
                  />
                  {errors.assignee && <span className="as-form-error">{errors.assignee}</span>}
                </div>
              </div>
            </div>

            <div className="as-form-section">
              <h3>Classification & Timeline</h3>
              
              <div className="as-form-row">
                <div className="as-form-group">
                  <label htmlFor="severity">Severity Level *</label>
                  <select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className={errors.severity ? 'error' : ''}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  {errors.severity && <span className="as-form-error">{errors.severity}</span>}
                </div>

                <div className="as-form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="as-form-group">
                <label htmlFor="dueDate">Due Date *</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={errors.dueDate ? 'error' : ''}
                />
                {errors.dueDate && <span className="as-form-error">{errors.dueDate}</span>}
              </div>
            </div>

            <div className="as-form-actions">
              <Link to="../findings" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Finding'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFinding;
