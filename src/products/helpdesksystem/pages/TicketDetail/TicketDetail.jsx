import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './TicketDetail.css';

const TicketDetail = ({ tickets, agents, onUpdateTicket }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticket = tickets.find(t => t.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(ticket || {});
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Wilson',
      content: 'I\'ve received this ticket and will start investigating the login issues.',
      timestamp: '2025-01-27T10:15:00Z',
      type: 'comment'
    },
    {
      id: 2,
      author: 'System',
      content: 'Ticket status changed from Open to In Progress',
      timestamp: '2025-01-27T10:16:00Z',
      type: 'system'
    }
  ]);

  if (!ticket) {
    return (
      <div className="ticket-detail-page">
        <div className="page-container">
          <div className="error-state">
            <h2>Ticket Not Found</h2>
            <p>The ticket you're looking for doesn't exist or has been removed.</p>
            <Link to="/helpdesksystem/tickets" className="btn btn-primary">
              Back to Tickets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityClass = (priority) => {
    return `priority-badge priority-${priority}`;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(ticket);
  };

  const handleSave = () => {
    onUpdateTicket(ticket.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(ticket);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: 'Current User', // In real app, this would be the logged-in user
      content: newComment,
      timestamp: new Date().toISOString(),
      type: 'comment'
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleStatusChange = (newStatus) => {
    onUpdateTicket(ticket.id, { status: newStatus });

    // Add system comment
    const systemComment = {
      id: comments.length + 1,
      author: 'System',
      content: `Ticket status changed from ${ticket.status} to ${newStatus}`,
      timestamp: new Date().toISOString(),
      type: 'system'
    };
    setComments([...comments, systemComment]);
  };

  return (
    <div className="ticket-detail-page">
      <div className="page-container">
        <div className="ticket-detail-header">
          <div className="header-nav">
            <Link to="/helpdesksystem/tickets" className="back-link">
              ← Back to Tickets
            </Link>
          </div>

          <div className="header-content">
            <h1>Ticket {ticket.id}</h1>
            <div className="header-info">
              <div className="header-badges">
                <span className={getPriorityClass(ticket.priority)}>
                  {ticket.priority}
                </span>
                <span className={getStatusClass(ticket.status)}>
                  {ticket.status.replace('-', ' ')}
                </span>
              </div>
              <div className="header-actions">
                {!isEditing ? (<>
                  <button onClick={handleEdit} className="btn btn-secondary">
                    Edit Ticket
                  </button>
                  <div className="status-actions">
                    {ticket.status === 'open' && (
                      <button onClick={() => handleStatusChange('in-progress')} className="btn btn-warning" >
                        Start Progress
                      </button>
                    )}
                    {ticket.status === 'in-progress' && (
                      <button onClick={() => handleStatusChange('resolved')} className="btn btn-success" >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </>
                ) : (
                  <div className="edit-actions">
                    <button onClick={handleCancel} className="btn btn-secondary">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="ticket-detail-content">
          <div className="ticket-main">
            <div className="ticket-info-card">
              {!isEditing ? (
                <>
                  <h2>{ticket.title}</h2>
                  <p className="ticket-description">{ticket.description}</p>
                </>
              ) : (
                <div className="edit-form">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editData.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={editData.description}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="4"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="priority">Priority</label>
                      <select
                        id="priority"
                        name="priority"
                        value={editData.priority}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="assignee">Assignee</label>
                      <select
                        id="assignee"
                        name="assignee"
                        value={editData.assignee}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        {agents.map(agent => (
                          <option key={agent.id} value={agent.name}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="comments-section">
              <h3>Comments & Activity</h3>

              <div className="comments-list">
                {comments.map(comment => (
                  <div key={comment.id} className={`comment ${comment.type}`}>
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-time">{formatDate(comment.timestamp)}</span>
                    </div>
                    <div className="comment-content">{comment.content}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="add-comment-form">
                <div className="form-group">
                  <label htmlFor="newComment">Add Comment</label>
                  <textarea
                    id="newComment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="form-control"
                    rows="3"
                    placeholder="Add your comment here..."
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Comment
                </button>
              </form>
            </div>
          </div>

          <div className="ticket-sidebar">
            <div className="ticket-meta-card">
              <h3>Ticket Details</h3>
              <div className="meta-item">
                <span className="meta-label">Customer</span>
                <span className="meta-value">{ticket.customer}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Email</span>
                <span className="meta-value">{ticket.customerEmail}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-value">{ticket.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Assigned to</span>
                <span className="meta-value">{ticket.assignee}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">SLA</span>
                <span className="meta-value">{ticket.sla}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Created</span>
                <span className="meta-value">{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Last Updated</span>
                <span className="meta-value">{formatDate(ticket.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;