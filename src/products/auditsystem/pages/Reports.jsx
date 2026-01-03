import React, { useMemo, useState } from 'react';
import './Reports.css';
import { PDFDownloadButton } from '../components/PDFReport';
import { useAuditData } from '../context/AuditContext.jsx';
import { getSeverityCounts } from '../utils/auditMetrics.js';

const Reports = () => {
  const { audits, findings } = useAuditData();
  const [filterType, setFilterType] = useState('All Types');

  const severityCounts = useMemo(() => getSeverityCounts(findings), [findings]);
  const totalAudits = audits.length;
  const totalFindings = findings.length;
  const criticalFindings = severityCounts.critical;
  const completedAudits = audits.filter((audit) => audit.status === 'completed');
  const pendingAudits = audits.filter((audit) => audit.status === 'pending');

  const thirtyDaysAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }, []);

  const updatedThisMonth = audits.filter((audit) => {
    const timestamp = audit.updatedAt || audit.createdAt;
    if (!timestamp) {
      return false;
    }
    const auditDate = new Date(timestamp);
    return !Number.isNaN(auditDate.getTime()) && auditDate >= thirtyDaysAgo;
  }).length;

  const resolvedFindings = findings.filter(
    (finding) => finding.status === 'resolved' && finding.createdAt && finding.updatedAt,
  );

  const averageResolutionDays = resolvedFindings.length
    ? (
        resolvedFindings.reduce((total, finding) => {
          const created = new Date(finding.createdAt);
          const updated = new Date(finding.updatedAt);
          if (Number.isNaN(created.getTime()) || Number.isNaN(updated.getTime())) {
            return total;
          }
          return total + (updated.getTime() - created.getTime());
        }, 0) /
        resolvedFindings.length /
        (1000 * 60 * 60 * 24)
      ).toFixed(1)
    : '—';

  const completionRate = totalAudits
    ? Math.round((completedAudits.length / totalAudits) * 100)
    : 0;

  const reports = useMemo(
    () =>
      audits.map((audit) => {
        const reportType = audit.status === 'completed'
          ? 'Executive Summary'
          : audit.status === 'active'
            ? 'Progress Update'
            : 'Scope Brief';
        const statusClass = audit.status === 'completed'
          ? 'completed'
          : audit.status === 'pending'
            ? 'pending'
            : 'draft';
        const dateSource = audit.updatedAt || audit.dueDate || audit.startDate || new Date().toISOString();
        const date = new Date(dateSource).toISOString().split('T')[0];

        return {
          id: audit.id,
          name: `${audit.title} Report`,
          type: reportType,
          date,
          status: statusClass,
          auditsIncluded: 1,
        };
      }),
    [audits],
  );

  const metrics = [
    { label: 'Total Reports', value: String(totalAudits), change: `${completedAudits.length} published` },
    { label: 'This Month', value: String(updatedThisMonth), change: 'Updated in last 30 days' },
    { label: 'Pending Review', value: String(pendingAudits.length), change: 'Awaiting sign-off' },
    { label: 'Published', value: String(completedAudits.length), change: `${completionRate}% completion` },
  ];

  const filteredReports = useMemo(() => {
    if (filterType === 'All Types') {
      return reports;
    }
    return reports.filter((report) => report.type === filterType);
  }, [reports, filterType]);

  const reportTypes = useMemo(() => ['All Types', ...new Set(reports.map((report) => report.type))], [reports]);

  const handleViewReport = (reportId) => {
    const report = reports.find((item) => item.id === reportId);
    const audit = audits.find((item) => item.id === reportId);
    const auditFindings = findings.filter((finding) => finding.auditId === reportId);
    const generatedAt = new Date();

    const windowRef = window.open('', '_blank');
    if (!windowRef) {
      return;
    }

    const auditSummary = audit
      ? `
        <p><strong>Client:</strong> ${audit.client}</p>
        <p><strong>Lead Auditor:</strong> ${audit.auditor}</p>
        <p><strong>Status:</strong> ${audit.status}</p>
        <p><strong>Scheduled:</strong> ${audit.startDate || '—'} → ${audit.dueDate || '—'}</p>
      `
      : '';

    const findingsList = auditFindings
      .map(
        (finding) => `
          <li>
            <strong>${finding.title}</strong> — ${finding.severity.toUpperCase()} (${finding.status})<br />
            <em>${finding.assignee || 'Unassigned'}</em> · Logged ${finding.date}
            <p>${finding.description}</p>
          </li>
        `,
      )
      .join('');

    windowRef.document.write(`
      <html>
        <head>
          <title>${report?.name || 'Audit Report'}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 32px;
              background-color: #f8f9fa;
              color: #333;
            }
            .report-container {
              max-width: 900px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #dc2626;
              margin-bottom: 0.5rem;
            }
            h2 {
              color: #495057;
              border-left: 4px solid #dc2626;
              padding-left: 12px;
              margin-top: 2rem;
            }
            ul {
              padding-left: 20px;
            }
            li {
              background: #f8f9fa;
              margin: 10px 0;
              padding: 12px 16px;
              border-radius: 8px;
              border-left: 4px solid #28a745;
            }
            footer {
              margin-top: 32px;
              text-align: center;
              color: #777;
              font-size: 0.9rem;
            }
          </style>
        </head>
        <body>
          <div class="report-container">
            <header>
              <h1>${report?.name || 'Audit Report'}</h1>
              <p>Generated ${generatedAt.toLocaleString()}</p>
            </header>

            <section>
              <h2>Executive Summary</h2>
              <p>This report summarises the current state of the audit, key findings, and recent activity captured in the system.</p>
              ${auditSummary}
            </section>

            <section>
              <h2>Key Metrics</h2>
              <p><strong>Total Findings:</strong> ${auditFindings.length}</p>
              <p><strong>Critical Findings:</strong> ${auditFindings.filter((f) => f.severity === 'critical').length}</p>
              <p><strong>Completion Rate:</strong> ${completionRate}%</p>
            </section>

            <section>
              <h2>Findings Detail</h2>
              <ul>
                ${findingsList || '<li>No findings recorded for this audit.</li>'}
              </ul>
            </section>

            <footer>
              <p>Audit Management System · Generated automatically · ${generatedAt.toLocaleDateString()}</p>
            </footer>
          </div>
        </body>
      </html>
    `);
  };

  const buildReportData = (reportId, reportType = 'summary') => {
    const audit = audits.find((item) => item.id === reportId);
    const auditFindings = findings.filter((finding) => finding.auditId === reportId);

    return {
      title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report - ${new Date().toLocaleDateString()}`,
      audits: audit ? 1 : totalAudits,
      findings: audit ? auditFindings.length : totalFindings,
      criticalFindings: audit
        ? auditFindings.filter((finding) => finding.severity === 'critical').length
        : criticalFindings,
      completionRate,
      audit,
      auditFindings,
    };
  };

  return (
    <div className="as-reports-page">
      <div className="as-reports-header">
        <div className="as-header-content">
          <h1>Reports & Analytics</h1>
          <p>Generate and manage audit reports and insights</p>
        </div>
        <PDFDownloadButton
          reportData={buildReportData('summary-overview', 'summary')}
          reportType="summary"
        >
          {({ loading }) => (
            <button className="btn btn-primary" disabled={loading}>
              Generate Report
            </button>
          )}
        </PDFDownloadButton>
      </div>

      <div className="as-metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="as-metric-card">
            <div className="as-metric-value">{metric.value}</div>
            <div className="as-metric-label">{metric.label}</div>
            <div className="as-metric-change">{metric.change}</div>
          </div>
        ))}
      </div>

      <div className="as-reports-content">
        <div className="as-reports-section">
          <div className="as-card">
            <div className="as-card-header">
              <h2 className="as-card-title">Recent Reports</h2>
              <select
                className="as-input-field as-filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {reportTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="as-reports-table">
              <div className="as-table-header">
                <div className="as-table-cell">Report Name</div>
                <div className="as-table-cell">Type</div>
                <div className="as-table-cell">Date</div>
                <div className="as-table-cell">Status</div>
                <div className="as-table-cell">Actions</div>
              </div>

              {filteredReports.map(report => (
                <div key={report.id} className="as-table-row">
                  <div className="as-table-cell">
                    <div className="as-report-info">
                      <h4>{report.name}</h4>
                      <span className="as-report-meta">{report.auditsIncluded} audit{report.auditsIncluded !== 1 ? 's' : ''} included</span>
                    </div>
                  </div>
                  <div className="as-table-cell">
                    <span className="as-report-type">{report.type}</span>
                  </div>
                  <div className="table-cell">
                    <span className="report-date">{report.date}</span>
                  </div>
                  <div className="as-table-cell">
                    <span className={`as-status-badge as-status-${report.status}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="as-table-cell">
                    <div className="as-table-actions">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleViewReport(report.id)}
                      >
                        View
                      </button>
                      <PDFDownloadButton
                        reportData={buildReportData(report.id, report.type.toLowerCase().replace(/\s+/g, '-'))}
                        reportType={report.type.toLowerCase().replace(/\s+/g, '-')}
                      >
                        {({ loading }) => (
                          <button className="btn btn-primary btn-sm" disabled={loading}>
                            Download
                          </button>
                        )}
                      </PDFDownloadButton>
                    </div>
                  </div>
                </div>
              ))}
              {filteredReports.length === 0 && (
                <div className="as-table-row empty">
                  <div className="as-table-cell" style={{ gridColumn: '1 / -1' }}>
                    <div className="as-report-info">
                      <h4>No reports available</h4>
                      <span className="as-report-meta">Try adjusting the filters or creating a new audit.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="as-analytics-section">
          <div className="as-card">
            <div className="as-card-header">
              <h2 className="as-card-title">Quick Analytics</h2>
            </div>
            <div className="as-analytics-content">
              <div className="as-analytics-item">
                <h3 className="as-input-label">Audit Completion Rate</h3>
                <div className="as-progress-bar as-large">
                  <div className="as-progress-fill" style={{ width: `${completionRate}%` }}></div>
                </div>
                <span className="as-progress-text">{completionRate}%</span>
              </div>

              <div className="as-analytics-item">
                <h3 className="as-input-label">Average Resolution Time</h3>
                <div className="as-time-metric">
                  <span className="as-time-value">{averageResolutionDays}</span>
                  <span className="as-time-unit">days</span>
                </div>
              </div>

              <div className="as-analytics-item">
                <h3 className="as-input-label">Finding Distribution</h3>
                <div className="as-distribution-chart">
                  <div className="as-distribution-item">
                    <span className="as-distribution-dot critical"></span>
                    <span>Critical: {severityCounts.critical}</span>
                  </div>
                  <div className="as-distribution-item">
                    <span className="as-distribution-dot high"></span>
                    <span>High: {severityCounts.high}</span>
                  </div>
                  <div className="as-distribution-item">
                    <span className="as-distribution-dot medium"></span>
                    <span>Medium: {severityCounts.medium}</span>
                  </div>
                  <div className="as-distribution-item">
                    <span className="as-distribution-dot low"></span>
                    <span>Low: {severityCounts.low}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;