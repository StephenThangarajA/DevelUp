import React, { useEffect, useState } from 'react';
import './FindingForm.css';

const FindingForm = ({ finding, onSave, onCancel, audits }) => {
  const [formData, setFormData] = useState(() => ({
    title: finding?.title || '',
    auditId: finding?.auditId || (audits?.[0]?.id ?? ''),
    severity: finding?.severity || 'medium',
    status: finding?.status || 'open',
    assignee: finding?.assignee || '',
    description: finding?.description || '',
    date: finding?.date || new Date().toISOString().split('T')[0]
  }));

  useEffect(() => {
    setFormData({
      title: finding?.title || '',
      auditId: finding?.auditId || (audits?.[0]?.id ?? ''),
      severity: finding?.severity || 'medium',
      status: finding?.status || 'open',
      assignee: finding?.assignee || '',
      description: finding?.description || '',
      date: finding?.date || new Date().toISOString().split('T')[0]
    });
  }, [finding, audits]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...finding,
      ...formData
    });
  };

  return (
    <form onSubmit={handleSubmit} className="as-finding-form">
      <div className="as-form-grid">
        <div className="as-input-group">
          <label className="as-input-label">Finding Title *</label>
          <input
            type="text"
            name="title"
            className="as-input-field"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="as-input-group">
          <label className="as-input-label">Related Audit *</label>
          <select
            name="auditId"
            className="as-input-field"
            value={formData.auditId}
            onChange={handleChange}
            required
          >
            <option value="">Select Audit</option>
            {audits.map(audit => (
              <option key={audit.id} value={audit.id}>
                {audit.title}
              </option>
            ))}
          </select>
        </div>
        <div className="as-input-group">
          <label className="as-input-label">Date *</label>
          <input
            type="date"
            name="date"
            className="as-input-field"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="as-input-group">
          <label className="as-input-label">Severity *</label>
          <select
            name="severity"
            className="as-input-field"
            value={formData.severity}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="as-input-group">
          <label className="as-input-label">Status</label>
          <select
            name="status"
            className="as-input-field"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
      <div className="as-input-group">
        <label className="as-input-label">Assignee</label>
        <input
          type="text"
          name="assignee"
          className="as-input-field"
          value={formData.assignee}
          onChange={handleChange}
          placeholder="Enter assignee name"
        />
      </div>
      <div className="as-input-group">
        <label className="as-input-label">Description *</label>
        <textarea
          name="description"
          className="as-input-field textarea"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe the finding in detail..."
        />
      </div>
      <div className="as-form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {finding ? 'Update Finding' : 'Add Finding'}
        </button>
      </div>
    </form>
  );
};

export default FindingForm;