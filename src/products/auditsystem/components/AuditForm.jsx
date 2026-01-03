import React, { useState } from 'react';
import './AuditForm.css';

const AuditForm = ({ audit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: audit?.title || '',
    client: audit?.client || '',
    auditor: audit?.auditor || '',
    startDate: audit?.startDate || '',
    dueDate: audit?.dueDate || '',
    description: audit?.description || '',
    status: audit?.status || 'pending'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...audit,
      ...formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="as-audit-form">
      <div className="as-form-grid">
        <div className="as-input-group">
          <label className="as-input-label">Audit Title *</label>
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
          <label className="as-input-label">Client *</label>
          <input
            type="text"
            name="client"
            className="as-input-field"
            value={formData.client}
            onChange={handleChange}
            required
          />
        </div>
        <div className="as-input-group">
          <label className="as-input-label">Lead Auditor *</label>
          <input
            type="text"
            name="auditor"
            className="as-input-field"
            value={formData.auditor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="as-input-group">
          <label className="as-input-label">Status</label>
          <select
            name="status"
            className="as-input-field"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="as-input-group">
          <label className="as-input-label">Start Date *</label>
          <input
            type="date"
            name="startDate"
            className="as-input-field"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="as-input-group">
          <label className="as-input-label">Due Date *</label>
          <input
            type="date"
            name="dueDate"
            className="as-input-field"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="as-input-group">
        <label className="as-input-label">Description</label>
        <textarea
          name="description"
          className="as-input-field textarea"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter audit description..."
        />
      </div>
      <div className="as-form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {audit ? 'Update Audit' : 'Create Audit'}
        </button>
      </div>
    </form>
  );
};

export default AuditForm;