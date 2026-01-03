import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaTicketAlt, FaChartLine, FaCheckCircle, FaHourglassHalf, FaPhoneAlt } from 'react-icons/fa';
import StatsCard from '../../components/StatsCard/StatsCard';
import './AgentDetail.css';

const AgentDetail = ({ agents = [], tickets = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const agent = useMemo(() => {
    const numericId = Number(id);
    console.log('AgentDetail Debug - ID:', numericId, 'Available agents:', agents);
    const found = agents.find(a => a.id === numericId);
    console.log('AgentDetail Debug - Found agent:', found);
    return found;
  }, [id, agents]);

  // Calculate performance stats from actual tickets
  const performanceStats = useMemo(() => {
    if (!agent) {
      return {
        activeTickets: 0,
        resolvedTickets: 0,
        successRate: 'N/A',
        avgResolutionTime: 'N/A'
      };
    }

    // Find all tickets assigned to this agent
    const agentTickets = tickets.filter(ticket => {
      // Check if ticket is assigned to this agent by assigneeId or assignee name
      // Tickets may have assigneeId as a number, or assignee as a string (name or ID)
      const assigneeId = ticket.assigneeId;
      const assigneeName = typeof ticket.assignee === 'string' ? ticket.assignee : ticket.assignee?.name;
      
      // Match by ID (number comparison) or by name (string comparison)
      return (
        (assigneeId !== undefined && assigneeId !== null && Number(assigneeId) === agent.id) ||
        (assigneeName && assigneeName === agent.name) ||
        (typeof ticket.assignee === 'string' && Number(ticket.assignee) === agent.id)
      );
    });

    // Count active tickets (not resolved or closed)
    const activeTickets = agentTickets.filter(t => 
      t.status !== 'resolved' && t.status !== 'closed'
    ).length;

    // Count resolved tickets
    const resolvedTickets = agentTickets.filter(t => 
      t.status === 'resolved' || t.status === 'closed'
    ).length;

    // Calculate success rate
    const totalTickets = activeTickets + resolvedTickets;
    const successRate = totalTickets > 0 
      ? `${((resolvedTickets / totalTickets) * 100).toFixed(2)}%`
      : 'N/A';

    // Calculate average resolution time from resolved tickets
    const resolvedTicketsWithTime = agentTickets.filter(t => 
      (t.status === 'resolved' || t.status === 'closed') && t.createdAt && t.updatedAt
    );

    let avgResolutionTime = 'N/A';
    if (resolvedTicketsWithTime.length > 0) {
      const totalHours = resolvedTicketsWithTime.reduce((sum, t) => {
        const created = new Date(t.createdAt).getTime();
        const updated = new Date(t.updatedAt).getTime();
        const diffHours = Math.max(0, (updated - created) / (1000 * 60 * 60));
        return sum + diffHours;
      }, 0);
      const avgHours = totalHours / resolvedTicketsWithTime.length;
      const hours = Math.floor(avgHours);
      const minutes = Math.floor((avgHours - hours) * 60);
      avgResolutionTime = `${hours}h ${minutes}m`;
    }

    return {
      activeTickets,
      resolvedTickets,
      successRate,
      avgResolutionTime
    };
  }, [agent, tickets]);

  if (!agent) {
    console.log('AgentDetail Debug - Agent not found, agents array length:', agents?.length);
    return (
      <div className="agent-detail-page">
        <div className="page-container">
          <div className="not-found-card">
            <h2>Agent not found</h2>
            <p>The requested agent does not exist or data is still loading.</p>
            <p>Agent ID: {id}</p>
            <p>Available agents: {agents?.length || 0}</p>
            <Link to="/helpdesksystem/agents" className="btn btn-secondary">Back to Agents</Link>
          </div>
        </div>
      </div>
    );
  }

  const initials = agent.name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="agent-detail-page">
      <div className="page-container">
        <Link to="/helpdesksystem/agents" className="back-link">← Back to Agents</Link>
        <div className="agent-info-card">
          <div className="agent-header">
            <div className="agent-avatar">{initials}</div>
            <div className="agent-title">
              <h1>{agent.name}</h1>
              <p>{agent.role}</p>
              <p>{agent.department}</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => navigate(`/helpdesksystem/tickets/new?agentId=${agent.id}`)}>Assign Ticket</button>
              <button className="btn btn-primary" onClick={() => navigate(`/helpdesksystem/messages/new/${agent.id}`)}>Message</button>
            </div>
          </div>

          <div className="agent-details">
            <div className="detail-section">
              <h3>Contact</h3>
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <div className="detail-content">
                  <div className="label">Email</div>
                  <div className="value">{agent.email}</div>
                </div>
              </div>
              {agent.phone && (
                <div className="detail-item">
                  <FaPhoneAlt className="detail-icon" />
                  <div className="detail-content">
                    <div className="label">Phone</div>
                    <div className="value">{agent.phone}</div>
                  </div>
                </div>
              )}
            </div>

            {agent.notes && (
              <div className="detail-section">
                <h3>Notes</h3>
                <div className="detail-item">
                  <div className="detail-content">
                    <div className="value">{agent.notes}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="detail-section performance-section">
              <h3>Performance</h3>
              <div className="performance-section">
                <StatsCard
                  title="Active Tickets"
                  value={performanceStats.activeTickets}
                  icon={<FaTicketAlt />}
                  color="primary"
                />
                <StatsCard
                  title="Resolved Tickets"
                  value={performanceStats.resolvedTickets}
                  icon={<FaCheckCircle />}
                  color="success"
                />
                <StatsCard
                  title="Success Rate"
                  value={performanceStats.successRate}
                  icon={<FaChartLine />}
                  color="info"
                />
                <StatsCard
                  title="Average Resolution Time"
                  value={performanceStats.avgResolutionTime}
                  icon={<FaHourglassHalf />}
                  color="info"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;