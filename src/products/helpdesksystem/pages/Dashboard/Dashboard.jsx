import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaTicketAlt, FaBolt, FaCheckCircle, FaExclamationTriangle, FaUsers, FaUserTie, FaClock, FaPlusCircle, FaExclamationCircle } from 'react-icons/fa';
import StatsCard from '../../components/StatsCard/StatsCard';
import RecentTickets from '../../components/RecentTickets/RecentTickets';
import './Dashboard.css';

const Dashboard = ({ tickets, customers, agents }) => {
  const responded = tickets.filter(t => t.status !== 'open' && t.createdAt && t.updatedAt);
  const avgHours = responded.length
    ? responded.reduce((sum, t) => {
        const created = new Date(t.createdAt).getTime();
        const updated = new Date(t.updatedAt).getTime();
        const diffHours = Math.max(0, (updated - created) / (1000 * 60 * 60));
        return sum + diffHours;
      }, 0) / responded.length
    : null;
  const avgResponseText = avgHours === null ? 'N/A' : `${avgHours.toFixed(1)} hours`;

  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    inProgressTickets: tickets.filter(t => t.status === 'in-progress').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    urgentTickets: tickets.filter(t => t.priority === 'urgent').length,
    totalCustomers: customers.length,
    activeAgents: agents.filter(a => a.status === 'online').length,
    avgResponseTime: avgResponseText
  };

  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your support tickets.</p>
        </div>

        <div className="stats-grid">
          <StatsCard
            title="Total Tickets"
            value={stats.totalTickets}
            icon={<FaChartBar />}
            color="primary"
          />
          <StatsCard
            title="Open Tickets"
            value={stats.openTickets}
            icon={<FaTicketAlt />}
            color="danger"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgressTickets}
            icon={<FaBolt />}
            color="warning"
          />
          <StatsCard
            title="Resolved"
            value={stats.resolvedTickets}
            icon={<FaCheckCircle />}
            color="success"
          />
          <StatsCard
            title="Urgent Tickets"
            value={stats.urgentTickets}
            icon={<FaExclamationTriangle />}
            color="urgent"
          />
          <StatsCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<FaUsers />}
            color="info"
          />
          <StatsCard
            title="Active Agents"
            value={stats.activeAgents}
            icon={<FaUserTie />}
            color="success"
          />
          <StatsCard
            title="Avg Response Time"
            value={stats.avgResponseTime}
            icon={<FaClock />}
            color="info"
          />
        </div>

        <div className="dashboard-content">
          <div className="dashboard-main">
            <div className="card">
              <div className="card-header">
                <h2>Recent Tickets</h2>
                <Link to="/helpdesksystem/tickets" className="btn btn-secondary btn-sm">
                  View All
                </Link>
              </div>
              <RecentTickets tickets={recentTickets} />
            </div>
          </div>

          <div className="dashboard-sidebar">
            <div className="card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <Link to="/helpdesksystem/tickets/new" className="quick-action-btn">
                  <span className="action-icon"><FaPlusCircle /></span>
                  <div>
                    <div className="action-title">Create Ticket</div>
                    <div className="action-desc">Add new support ticket</div>
                  </div>
                </Link>
                <Link to="/helpdesksystem/customers" className="quick-action-btn">
                  <span className="action-icon"><FaUsers /></span>
                  <div>
                    <div className="action-title">View Customers</div>
                    <div className="action-desc">Manage customer accounts</div>
                  </div>
                </Link>
                <Link to="/helpdesksystem/agents" className="quick-action-btn">
                  <span className="action-icon"><FaUserTie /></span>
                  <div>
                    <div className="action-title">Team Overview</div>
                    <div className="action-desc">Check agent availability</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="card">
              <h3>Priority Alerts</h3>
              <div className="priority-alerts">
                {stats.urgentTickets > 0 && (
                  <div className="alert alert-urgent">
                    <span className="alert-icon"><FaExclamationTriangle /></span>
                    <div>
                      <div className="alert-title">Urgent Tickets</div>
                      <div className="alert-desc">
                        {stats.urgentTickets} ticket{stats.urgentTickets !== 1 ? 's' : ''} need immediate attention
                      </div>
                    </div>
                  </div>
                )}
                {stats.openTickets > 10 && (
                  <div className="alert alert-warning">
                    <span className="alert-icon"><FaExclamationCircle /></span>
                    <div>
                      <div className="alert-title">High Volume</div>
                      <div className="alert-desc">
                        {stats.openTickets} open tickets in queue
                      </div>
                    </div>
                  </div>
                )}
                {stats.urgentTickets === 0 && stats.openTickets <= 10 && (
                  <div className="alert alert-success">
                    <span className="alert-icon"><FaCheckCircle /></span>
                    <div>
                      <div className="alert-title">All Good</div>
                      <div className="alert-desc">No urgent issues at the moment</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
