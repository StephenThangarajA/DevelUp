import React, { useMemo } from 'react';
import StatsCard from '../components/StatsCard';
import DashboardCharts from '../components/DashboardCharts';
import RecentAudits from '../components/RecentAudits';
import FindingsSummary from '../components/FindingsSummary';
import './Dashboard.css';
import { useAuditData } from '../context/AuditContext.jsx';
import {
  countItemsUpdatedSince,
  countDueWithinDays,
} from '../utils/auditMetrics.js';

const Dashboard = () => {
  const { audits, findings } = useAuditData();

  const stats = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const activeAudits = audits.filter((audit) => audit.status === 'active');
    const completedAudits = audits.filter((audit) => audit.status === 'completed');
    const pendingAudits = audits.filter((audit) => audit.status === 'pending');
    const criticalFindings = findings.filter((finding) => finding.severity === 'critical');

    const activeStartedThisWeek = countItemsUpdatedSince(activeAudits, 'createdAt', sevenDaysAgo);

    const completedThisWeek = countItemsUpdatedSince(completedAudits, 'updatedAt', sevenDaysAgo);

    const pendingDueSoon = countDueWithinDays(pendingAudits, 7);

    const criticalOpened = criticalFindings.filter((finding) => {
      const created = finding.createdAt ? new Date(finding.createdAt) : null;
      return created && created >= sevenDaysAgo;
    }).length;

    const criticalResolved = criticalFindings.filter((finding) => {
      const updated = finding.updatedAt ? new Date(finding.updatedAt) : null;
      return finding.status === 'resolved' && updated && updated >= sevenDaysAgo;
    }).length;

    return [
      {
        title: 'Active Audits',
        value: activeAudits.length,
        changeLabel: `${activeStartedThisWeek} started this week`,
        trend: activeStartedThisWeek > 0 ? 'up' : 'down',
        color: '#1976D2',
      },
      {
        title: 'Completed Audits',
        value: completedAudits.length,
        changeLabel: `${completedThisWeek} closed this week`,
        trend: completedThisWeek > 0 ? 'up' : 'down',
        color: '#388E3C',
      },
      {
        title: 'Pending Reviews',
        value: pendingAudits.length,
        changeLabel: `${pendingDueSoon} due within 7 days`,
        trend: pendingDueSoon > 0 ? 'down' : 'up',
        color: '#F57C00',
      },
      {
        title: 'Critical Findings',
        value: criticalFindings.length,
        changeLabel: `${criticalOpened} opened · ${criticalResolved} resolved this week`,
        trend: criticalResolved >= criticalOpened ? 'up' : 'down',
        color: '#D32F2F',
      },
    ];
  }, [audits, findings]);

  return (
    <div className="as-dashboard">
      <div className="as-dashboard-header">
        <h2 className="as-dashboard-title">Dashboard</h2>
        <p>Welcome back! Here's what's happening with your audits.</p>
      </div>

      <div className="as-stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <DashboardCharts />

      <div className="as-dashboard-content">
        <div className="as-dashboard-left">
          <RecentAudits />
        </div>
        <div className="as-dashboard-right">
          <FindingsSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;