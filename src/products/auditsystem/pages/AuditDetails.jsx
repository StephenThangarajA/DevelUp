import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import FindingForm from '../components/FindingForm';
import { PDFDownloadButton } from '../components/PDFReport';
import './AuditDetails.css';
import { useAuditData } from '../context/AuditContext.jsx';
import {
  calculateAuditProgress,
  countAuditFindings,
  countResolvedFindings,
} from '../utils/auditMetrics.js';

const AuditDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    audits,
    findings,
    updateAudit,
    createFinding,
    updateFinding,
    deleteFinding,
  } = useAuditData();

  const [activeTab, setActiveTab] = useState('overview');
  const [showFindingModal, setShowFindingModal] = useState(false);
  const [editingFinding, setEditingFinding] = useState(null);

  const auditId = Number(id);
  const audit = audits.find((item) => Number(item.id) === auditId);

  const auditFindings = useMemo(
    () => findings.filter((finding) => Number(finding.auditId) === auditId),
    [findings, auditId],
  );

  const totalFindings = audit ? countAuditFindings(findings, audit.id) : 0;
  const resolvedFindings = audit ? countResolvedFindings(findings, audit.id) : 0;
  const openFindings = totalFindings - resolvedFindings;
  const criticalFindings = auditFindings.filter((finding) => finding.severity === 'critical').length;
  const progress = audit ? calculateAuditProgress(audit, findings) : 0;

  const progressAngle = Math.round((progress / 100) * 360);

  const auditsForSelect = useMemo(
    () => audits.map((item) => ({ id: item.id, title: item.title })),
    [audits],
  );

  if (!audit) {
    return (
      <div className="audit-details">
        <div className="card">
          <h2>Audit Not Found</h2>
          <p>The audit you are looking for does not exist or may have been removed.</p>
          <button className="btn btn-primary" onClick={() => navigate('../audits')}>
            Back to Audits
          </button>
        </div>
      </div>
    );
  }

  const handleAddFinding = () => {
    setEditingFinding(null);
    setShowFindingModal(true);
  };

  const handleEditFinding = (finding) => {
    setEditingFinding(finding);
    setShowFindingModal(true);
  };

  const handleDeleteFinding = (findingId) => {
    if (window.confirm('Are you sure you want to delete this finding?')) {
      deleteFinding(findingId);
    }
  };

  const handleSaveFinding = (findingData) => {
    if (editingFinding) {
      updateFinding(editingFinding.id, { ...findingData, auditId });
    } else {
      createFinding({ ...findingData, auditId });
    }
    setShowFindingModal(false);
    setEditingFinding(null);
  };

  const handleResolveFinding = (findingId) => {
    updateFinding(findingId, { status: 'resolved' });
  };

  const handleSaveAudit = (auditData) => {
    updateAudit(audit.id, auditData);
    setShowAuditModal(false);
  };

  const reportData = {
    audits: 1,
    findings: totalFindings,
    criticalFindings,
    audit,
    auditFindings,
  };

  return (
    <div className="as-audit-details">
      <div className="as-details-header">
        <div className="as-header-main">
          <h1>{audit.title}</h1>
          <span className={`as-status-badge as-status-${audit.status}`}>
            {audit.status}
          </span>
        </div>
        <div className="as-header-actions">
          <button className="btn btn-secondary" onClick={() => navigate(`../audits/edit/${id}`)}>
            Edit Audit
          </button>
          <PDFDownloadButton reportData={reportData} reportType="audit-details">
            {({ loading }) => (
              <button className="btn btn-primary" disabled={loading}>
                {loading ? 'Preparing...' : 'Download Report'}
              </button>
            )}
          </PDFDownloadButton>
        </div>
      </div>

      <div className="as-details-nav">
        <nav className="as-tab-nav">
          <button
            className={`btn btn-primary ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`btn btn-secondary ${activeTab === 'findings' ? 'active' : ''}`}
            onClick={() => setActiveTab('findings')}
          >
            Findings
          </button>

        </nav>
      </div>

      <div className="as-details-content">
        {activeTab === 'overview' && (
          <div className="as-overview-tab">
            <div className="as-overview-grid">
              <div className="as-overview-left">
                <div className="as-card">
                  <h2 className="as-card-title">Audit Information</h2>
                  <div className="as-info-grid">
                    <div className="as-info-item">
                      <label>Client</label>
                      <span>{audit.client}</span>
                    </div>
                    <div className="as-info-item">
                      <label>Lead Auditor</label>
                      <span>{audit.auditor}</span>
                    </div>
                    <div className="as-info-item">
                      <label>Start Date</label>
                      <span>{audit.startDate || '—'}</span>
                    </div>
                    <div className="as-info-item">
                      <label>Due Date</label>
                      <span>{audit.dueDate || '—'}</span>
                    </div>
                  </div>
                  <div className="as-description">
                    <label className="as-input-label">Description</label>
                    <p className="as-input-label">{audit.description || 'No description provided.'}</p>
                  </div>
                </div>
              </div>

              <div className="as-overview-right">
                <div className="as-card">
                  <h2 className="as-card-title">Progress Overview</h2>
                  <div className="as-progress-circle">
                    <div
                      className="as-circle-progress"
                      style={{
                        background: `conic-gradient(var(--primary-red) 0deg ${progressAngle}deg, var(--neutral-200) ${progressAngle}deg 360deg)`,
                      }}
                    >
                      <span className="as-progress-value">{progress}%</span>
                    </div>
                  </div>
                  <div className="as-progress-stats">
                    <div className="as-stat-item">
                      <span className="as-stat-value">{totalFindings}</span>
                      <span className="as-stat-label">Total Findings</span>
                    </div>
                    <div className="as-stat-item">
                      <span className="as-stat-value">{openFindings}</span>
                      <span className="as-stat-label">Open Issues</span>
                    </div>
                    <div className="as-stat-item">
                      <span className="as-stat-value">{resolvedFindings}</span>
                      <span className="as-stat-label">Resolved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'findings' && (
          <div className="as-findings-tab">
            <div className="as-findings-header">
              <h2>Findings & Issues</h2>
              <button className="btn btn-primary" onClick={handleAddFinding}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px'}}>
                  <path d="M8 1V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add Finding
              </button>
            </div>
            <div className="findings-list">
              {auditFindings.length === 0 && (
                <div className="as-card">
                  <p>No findings recorded for this audit yet.</p>
                </div>
              )}
              {auditFindings.map((finding) => (
                <div key={finding.id} className="as-finding-card">
                  <div className="as-finding-header">
                    <h3>{finding.title}</h3>
                    <div className="as-finding-actions">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleDeleteFinding(finding.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="as-finding-description">{finding.description}</p>
                  <div className="as-finding-details-row">
                    <div className="as-finding-meta">
                      <div className="as-detail-item">
                        <span className="as-detail-label">Assignee:</span>
                        <span className="as-detail-value">{finding.assignee || 'Unassigned'}</span>
                      </div>
                      <div className="as-detail-item">
                        <span className="as-detail-label">Logged:</span>
                        <span className="as-detail-value">{finding.date}</span>
                      </div>
                    </div>
                    <div className="as-finding-badges">
                      <span className={`as-status-badge as-status${finding.severity}`}>
                        {finding.severity}
                      </span>
                      <span className={`as-status-badge as-status${finding.status}`}>
                        {finding.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


      </div>

      <Modal
        isOpen={showFindingModal}
        onClose={() => setShowFindingModal(false)}
        title={editingFinding ? 'Edit Finding' : 'Add New Finding'}
      >
        <FindingForm
          finding={editingFinding}
          audits={auditsForSelect}
          onSave={handleSaveFinding}
          onCancel={() => setShowFindingModal(false)}
        />
      </Modal>


    </div>
  );
};

export default AuditDetails;