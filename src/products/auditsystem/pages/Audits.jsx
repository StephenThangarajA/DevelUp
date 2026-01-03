import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import AuditForm from '../components/AuditForm';
import './Audits.css';
import { FaPlus } from 'react-icons/fa';
import { useAuditData } from '../context/AuditContext.jsx';
import {
  calculateAuditProgress,
  countAuditFindings,
} from '../utils/auditMetrics.js';

const Audits = () => {
  const { audits, findings, updateAudit, deleteAudit } = useAuditData();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAudit, setEditingAudit] = useState(null);
  const navigate = useNavigate();

  const filteredAudits = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return audits
      .filter((audit) => {
        const matchesFilter = filter === 'all' || audit.status === filter;
        const matchesSearch =
          !normalizedSearch ||
          audit.title.toLowerCase().includes(normalizedSearch) ||
          audit.client.toLowerCase().includes(normalizedSearch) ||
          audit.auditor.toLowerCase().includes(normalizedSearch);
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => new Date(a.dueDate ?? 0) - new Date(b.dueDate ?? 0));
  }, [audits, filter, searchTerm]);

  const handleNewAudit = () => {
    setEditingAudit(null);
    setShowModal(true);
  };

  const handleEditAudit = (audit) => {
    navigate(`audits/edit/${audit.id}`);
  };

  const handleSaveAudit = (auditData) => {
    if (editingAudit) {
      updateAudit(editingAudit.id, auditData);
    }
    setShowModal(false);
    setEditingAudit(null);
  };

  const handleDeleteAudit = (auditId) => {
    if (window.confirm('Are you sure you want to delete this audit?')) {
      deleteAudit(auditId);
    }
  };

  return (
    <div className="as-audits-page">
      <div className="as-audits-header">
        <div className="as-header-content">
          <h1>Audits</h1>
          <p>Manage and track all your audit processes</p>
        </div>
        <Link to="create" className="btn btn-primary">
          <FaPlus /> New Audit
        </Link>
      </div>

      <div className="as-audits-controls">
        <div className="as-search-filter">
          <input
            type="text"
            placeholder="Search audits..."
            className="as-input-field as-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="as-input-field as-filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="as-audits-grid">
        {filteredAudits.map((audit) => {
          const progress = calculateAuditProgress(audit, findings);
          const totalFindings = countAuditFindings(findings, audit.id);

          return (
            <div key={audit.id} className="as-audit-card">
              <div className="as-audit-card-header">
                <h3 className="as-audit-card-title">{audit.title}</h3>
                <span className={`as-status-badge as-status-${audit.status}`}>
                  {audit.status}
                </span>
              </div>

              <div className="as-audit-card-content">
                <div className="as-audit-detail">
                  <span className="as-detail-label">Client:</span>
                  <span className="as-detail-value">{audit.client}</span>
                </div>
                <div className="as-audit-detail">
                  <span className="as-detail-label">Auditor:</span>
                  <span className="as-detail-value">{audit.auditor}</span>
                </div>
                <div className="as-audit-detail">
                  <span className="as-detail-label">Due Date:</span>
                  <span className="as-detail-value">{audit.dueDate}</span>
                </div>
                <div className="as-audit-detail">
                  <span className="as-detail-label">Findings:</span>
                  <span className="as-detail-value">{totalFindings}</span>
                </div>
              </div>

              <div className="as-progress-section">
                <div className="as-progress-header">
                  <span className='as-progress-label'>Progress:</span>
                  <span>{progress}%</span>
                </div>
                <div className="as-progress-bar">
                  <div
                    className="as-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="as-audit-card-actions">
                <Link
                  to={`${audit.id}`}
                  className="btn btn-success"
                >
                  View
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDeleteAudit(audit.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {filteredAudits.length === 0 && (
          <div className="as-card">
            <p>No audits match the current filters. Create a new audit to get started.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingAudit ? 'Edit Audit' : 'Create New Audit'}
      >
        <AuditForm
          audit={editingAudit}
          onSave={handleSaveAudit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Audits;