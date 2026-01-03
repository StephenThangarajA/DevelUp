import React, { useMemo } from 'react';
import './FindingsSummary.css';
import { useAuditData } from '../context/AuditContext.jsx';
import { getSeverityCounts } from '../utils/auditMetrics.js';

const severityPalette = {
  critical: '#D32F2F',
  high: '#F57C00',
  medium: '#FBC02D',
  low: '#388E3C',
};

const FindingsSummary = () => {
  const { audits, findings } = useAuditData();

  const auditLookup = useMemo(
    () =>
      audits.reduce((acc, audit) => {
        acc[audit.id] = audit.title;
        return acc;
      }, {}),
    [audits],
  );

  const severityCounts = useMemo(() => getSeverityCounts(findings), [findings]);
  const totalFindings = findings.length || 1;

  const recentFindings = useMemo(() => {
    const sorted = [...findings].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();
      const dateB = new Date(b.createdAt || b.date || 0).getTime();
      return dateB - dateA;
    });
    return sorted.slice(0, 5);
  }, [findings]);

  const overview = ['critical', 'high', 'medium', 'low'].map((severity) => ({
    severity,
    count: severityCounts[severity],
    color: severityPalette[severity],
  }));

  return (
    <div className="as-findings-summary">
      <div className="as-card">
        <div className="as-card-header">
          <h2 className="as-card-title">Recent Findings</h2>
        </div>
        <div className="as-recent-findings-list">
          {recentFindings.length === 0 && (
            <div className="as-recent-finding-item empty">
              <p>No recent findings.</p>
            </div>
          )}
          {recentFindings.map((finding) => (
            <div key={finding.id} className="as-recent-finding-item">
              <div className="as-recent-finding-info">
                <h3 className="as-recent-finding-title">{finding.title}</h3>
                <p className="as-recent-finding-audit">
                  From: {auditLookup[finding.auditId] || 'Unknown Audit'}
                </p>
              </div>
              <span className={`as-recent-finding-severity ${finding.severity}`}>
                {finding.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindingsSummary;