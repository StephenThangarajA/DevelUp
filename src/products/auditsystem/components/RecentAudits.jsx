import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecentAudits.css';
import { useAuditData } from '../context/AuditContext.jsx';
import { calculateAuditProgress } from '../utils/auditMetrics.js';

const RecentAudits = () => {
  const navigate = useNavigate();
  const { audits, findings } = useAuditData();

  const recentAudits = useMemo(() => {
    const sorted = [...audits].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
    return sorted.slice(0, 5);
  }, [audits]);

  const handleViewAllAudits = () => {
    navigate('audits');
  };

  return (
    <div className="as-card">
      <div className="as-card-header">
        <h2 className="as-card-title">Recent Audits</h2>
        <button className="btn btn-primary btn-sm" onClick={handleViewAllAudits}>View All</button>
      </div>
      <div className="as-audits-list">
        {recentAudits.length === 0 && (
          <div className="as-audit-item empty">
            <p>No audits have been recorded yet.</p>
          </div>
        )}
        {recentAudits.map((audit) => {
          const progress = calculateAuditProgress(audit, findings);
          return (
            <div
              key={audit.id}
              className="as-audit-item"
              onClick={() => navigate(`audits/${audit.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate(`audits/${audit.id}`);
                }
              }}
            >
              <div className="as-audit-main">
                <div className="as-audit-info">
                  <h3 className="as-audit-title">{audit.title}</h3>
                  <p className="as-audit-client">{audit.client}</p>
                </div>
                <div className="as-audit-meta">
                  <span className={`as-status-badge as-status-${audit.status}`}>
                    {audit.status}
                  </span>
                  {audit.dueDate && (
                    <span className="as-audit-date">Due: {audit.dueDate}</span>
                  )}
                </div>
              </div>
              <div className="as-progress-section">
                <div className="as-progress-bar">
                  <div 
                    className="as-progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="as-progress-text">{progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentAudits;