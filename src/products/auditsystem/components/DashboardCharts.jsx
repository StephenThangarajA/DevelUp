import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './DashboardCharts.css';
import { useAuditData } from '../context/AuditContext.jsx';
import {
  getSeverityCounts,
  getStatusCounts,
  getMonthsFromAudits,
  buildMonthlyDataset,
} from '../utils/auditMetrics.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const severityColors = ['#D32F2F', '#F57C00', '#FBC02D', '#388E3C'];
const statusColors = ['#1976D2', '#388E3C', '#F57C00', '#757575'];
const statusOrder = ['active', 'completed', 'pending', 'on-hold'];

const DashboardCharts = () => {
  const { audits, findings } = useAuditData();

  const findingsSeverityData = useMemo(() => {
    const counts = getSeverityCounts(findings);
    return {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      datasets: [
        {
          label: 'Findings by Severity',
          data: [counts.critical, counts.high, counts.medium, counts.low],
          backgroundColor: severityColors,
          borderColor: severityColors.map((color) => color),
          borderWidth: 2,
        },
      ],
    };
  }, [findings]);

  const auditStatusData = useMemo(() => {
    const counts = getStatusCounts(audits);
    return {
      labels: ['Active', 'Completed', 'Pending', 'On Hold'],
      datasets: [
        {
          label: 'Audit Status',
          data: statusOrder.map((status) => counts[status] ?? 0),
          backgroundColor: statusColors,
          borderColor: statusColors.map((color) => color),
          borderWidth: 2,
        },
      ],
    };
  }, [audits]);

  const monthlyProgressData = useMemo(() => {
    const months = getMonthsFromAudits(audits, 6);
    const { labels, completedData, resolvedData } = buildMonthlyDataset({
      months,
      audits,
      findings,
    });

    return {
      labels,
      datasets: [
        {
          label: 'Audits Completed',
          data: completedData,
          backgroundColor: '#1976D2',
          borderColor: '#1565C0',
          borderWidth: 1,
        },
        {
          label: 'Findings Resolved',
          data: resolvedData,
          backgroundColor: '#388E3C',
          borderColor: '#2E7D32',
          borderWidth: 1,
        },
      ],
    };
  }, [audits, findings]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#1976D2',
        borderWidth: 1,
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="as-dashboard-charts">
      <div className="as-charts-grid">
        <div className="as-chart-card">
          <div className="as-chart-header">
            <h3 className="as-chart-title">Findings by Severity</h3>
          </div>
          <div className="as-chart-container">
            <Pie data={findingsSeverityData} options={chartOptions} />
          </div>
        </div>

        <div className="as-chart-card">
          <div className="as-chart-header">
            <h3 className="as-chart-title">Audit Status Distribution</h3>
          </div>
          <div className="as-chart-container">
            <Pie data={auditStatusData} options={chartOptions} />
          </div>
        </div>

        <div className="as-chart-card full-width">
          <div className="as-chart-header">
            <h3 className="as-chart-title">Monthly Progress Overview</h3>
          </div>
          <div className="as-chart-container">
            <Bar data={monthlyProgressData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;