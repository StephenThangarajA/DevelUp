import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Findings.css';
import { useAuditData } from '../context/AuditContext.jsx';
import { getSeverityCounts } from '../utils/auditMetrics.js';
import { FaPlus, FaExclamationTriangle, FaFire, FaExclamationCircle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const Findings = () => {
  const { audits, findings, updateFinding, deleteFinding } = useAuditData();
  const [filter, setFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const navigate = useNavigate();

  const handleEditFinding = (finding) => {
    navigate(`edit/${finding.id}`);
  };

  const auditLookup = useMemo(
    () =>
      audits.reduce((acc, audit) => {
        acc[audit.id] = audit.title;
        return acc;
      }, {}),
    [audits],
  );

  const severityCounts = useMemo(() => getSeverityCounts(findings), [findings]);

  const filteredFindings = useMemo(
    () =>
      findings.filter((finding) => {
        const matchesStatus = filter === 'all' || finding.status === filter;
        const matchesSeverity = severityFilter === 'all' || finding.severity === severityFilter;
        return matchesStatus && matchesSeverity;
      }),
    [findings, filter, severityFilter],
  );

  const handleResolveFinding = (findingId) => {
    updateFinding(findingId, { status: 'resolved' });
  };

  const handleDeleteFinding = (findingId) => {
    if (window.confirm('Are you sure you want to delete this finding?')) {
      deleteFinding(findingId);
    }
  };

  return (
    <div className="as-findings-page">
      <div className="as-findings-header">
        <div className="as-header-content">
          <h1>Findings & Issues</h1>
          <p>Track and manage audit findings across all projects</p>
        </div>
        <Link to="create" className="btn btn-primary">
          <FaPlus /> Add Finding
        </Link>
      </div>

      <div className="as-findings-stats">
        <div className="as-stat-card total" style={{ borderTop: `4px solid var(--neutral-800)` }}>
          <div className="as-stat-card-header">
            <h3>Total Findings</h3>
          </div>
          <div className="as-stat-card-body">
            <div className="as-stat-card-value">{findings.length}</div>
            <div className="as-stats-icon as-total-icon">
              <FaExclamationTriangle />
            </div>
          </div>
        </div>
        <div className="as-stat-card critical" style={{ borderTop: `4px solid var(--primary-red)` }}>
          <div className="as-stat-card-header">
            <h3>Critical</h3>
            <div className="stats-icon critical-icon">
              <FaFire />
            </div>
          </div>
          <div className="as-stat-card-body">
            <div className="as-stat-card-value as-critical">{severityCounts.critical}</div>
          </div>
        </div>
        <div className="as-stat-card as-high" style={{ borderTop: `4px solid var(--accent-orange)` }}>
          <div className="as-stat-card-header">
            <h3>High</h3>
            <div className="as-stats-icon as-high-icon">
              <FaExclamationCircle />
            </div>
          </div>
          <div className="as-stat-card-body">
            <div className="as-stat-card-value as-high">{severityCounts.high}</div>
          </div>
        </div>
        <div className="as-stat-card as-medium" style={{ borderTop: `4px solid var(--accent-blue)` }}>
          <div className="as-stat-card-header">
            <h3>Medium</h3>
            <div className="as-stats-icon as-medium-icon">
              <FaInfoCircle />
            </div>
          </div>
          <div className="as-stat-card-body">
            <div className="as-stat-card-value as-medium">{severityCounts.medium}</div>
          </div>
        </div>
        <div className="as-stat-card low" style={{ borderTop: `4px solid var(--accent-green)` }}>
          <div className="as-stat-card-header">
            <h3>Low</h3>
            <div className="as-stats-icon as-low-icon">
              <FaCheckCircle />
            </div>
          </div>
          <div className="as-stat-card-body">
            <div className="as-stat-card-value as-low">{severityCounts.low}</div>
          </div>
        </div>
      </div>

      <div className="as-findings-controls">
        <div className="as-filter-group">
          <select
            className="as-input-field"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            className="as-input-field"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="as-findings-list">
        {filteredFindings.map((finding) => (
          <div key={finding.id} className="as-finding-item">
            <div className="as-finding-main">
              <div className="as-finding-info">
                <h3 className="as-finding-title">{finding.title}</h3>
                <p className="as-finding-audit">From: {auditLookup[finding.auditId] || 'Unknown Audit'}</p>
                <p className="as-finding-description">{finding.description}</p>
                <div className="as-detail-item">
                  <span className="as-detail-label">Assignee:</span>
                  <span className="as-detail-value" style={{ marginRight: '8px' }}>{finding.assignee}</span>
                  <span className="as-detail-label">Date:</span>
                  <span className="as-detail-value">{finding.date}</span>
                </div>
              </div>
              <div className="as-finding-right-section">
                <div className="as-finding-meta">
                  <div className="as-finding-badges">
                    <span className={`as-severity-badge ${finding.severity}`}>
                      {finding.severity}
                    </span>
                    <span className={`as-status-badge as-status${finding.status}`}>
                      {finding.status}
                    </span>
                  </div>
                </div>
                <div className="as-finding-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => handleEditFinding(finding)}>
                    Edit
                  </button>
                  {finding.status !== 'resolved' && (
                    <button className="btn btn-success btn-sm" onClick={() => handleResolveFinding(finding.id)} >
                      Resolve
                    </button>
                  )}
                  <button className="btn btn-primary btn-sm" onClick={() => handleDeleteFinding(finding.id)} >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredFindings.length === 0 && (
          <div className="as-card">
            <p>No findings match the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Findings;