import { useState } from 'react'
import { useMarketing } from '../contexts/MarketingContext'
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  Layout,
  BarChart3,
  Lightbulb,
  X,
  Trash2,
  Edit2
} from 'lucide-react'

const ContentPlanning = () => {
  const { contentPlans, addContentPlan, updateContentPlan, deleteContentPlan, brandFoundation } = useMarketing()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [newPlan, setNewPlan] = useState({
    title: '',
    topic: '',
    type: 'Social Post',
    platforms: [],
    publishDate: '',
    status: 'Planned'
  })

  const [editingPlan, setEditingPlan] = useState(null)

  const handleAddPlan = () => {
    if (!newPlan.title || !newPlan.topic || !newPlan.publishDate) {
      alert('Please fill in title, topic and publish date.')
      return
    }
    addContentPlan(newPlan)
    setNewPlan({
      title: '',
      topic: '',
      type: 'Social Post',
      platforms: [],
      publishDate: '',
      status: 'Planned'
    })
    setShowAddModal(false)
  }

  const handleUpdatePlan = () => {
    if (!editingPlan.title || !editingPlan.topic || !editingPlan.publishDate) {
      alert('Please fill in title, topic and publish date.')
      return
    }
    updateContentPlan(editingPlan.id, editingPlan)
    setEditingPlan(null)
    setEditingId(null)
  }

  const handleDeletePlan = (id) => {
    if (window.confirm('Are you sure you want to delete this content plan?')) {
      deleteContentPlan(id)
    }
  }

  const startEditing = (plan) => {
    setEditingId(plan.id)
    setEditingPlan({ ...plan })
  }

  const togglePlatform = (platform, isEditing = false) => {
    if (isEditing) {
      setEditingPlan(prev => ({
        ...prev,
        platforms: prev.platforms.includes(platform)
          ? prev.platforms.filter(p => p !== platform)
          : [...prev.platforms, platform]
      }))
    } else {
      setNewPlan(prev => ({
        ...prev,
        platforms: prev.platforms.includes(platform)
          ? prev.platforms.filter(p => p !== platform)
          : [...prev.platforms, platform]
      }))
    }
  }

  const getStats = () => {
    const now = new Date()
    const thisWeek = contentPlans.filter(p => {
      const pDate = new Date(p.publishDate)
      const diff = (pDate - now) / (1000 * 60 * 60 * 24)
      return diff >= 0 && diff <= 7 && p.status !== 'Completed'
    }).length

    const thisMonthCompleted = contentPlans.filter(p => {
      const pDate = new Date(p.publishDate)
      return pDate.getMonth() === now.getMonth() &&
        pDate.getFullYear() === now.getFullYear() &&
        p.status === 'Completed'
    }).length

    return { thisWeek, thisMonthCompleted }
  }

  const stats = getStats()

  return (
    <div className="ms-page">
      <header className="ms-page-header ms-flex-between">
        <div className="ms-header-content">
          <h1>Content Planning & Management</h1>
          <p>Plan, organize, and track your content across all channels.</p>
        </div>
        <button className="ms-btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          <span>New Content Plan</span>
        </button>
      </header>

      {(showAddModal || editingId) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="ms-card" style={{ width: '500px', maxWidth: '90%' }}>
            <div className="ms-flex-between" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{editingId ? 'Edit Content Plan' : 'Create Content Plan'}</h2>
              <button onClick={() => { setShowAddModal(false); setEditingId(null); setEditingPlan(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="ms-form-group">
              <label>Content Title</label>
              <input
                type="text"
                className="ms-input"
                value={editingId ? editingPlan.title : newPlan.title}
                onChange={(e) => editingId
                  ? setEditingPlan({ ...editingPlan, title: e.target.value })
                  : setNewPlan({ ...newPlan, title: e.target.value })}
                placeholder="e.g. Summer Collection Launch"
              />
            </div>

            <div className="ms-form-group">
              <label>Topic</label>
              <select
                className="ms-input"
                value={editingId ? editingPlan.topic : newPlan.topic}
                onChange={(e) => editingId
                  ? setEditingPlan({ ...editingPlan, topic: e.target.value })
                  : setNewPlan({ ...newPlan, topic: e.target.value })}
              >
                <option value="">Select Topic...</option>
                {brandFoundation.emailTopics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div className="ms-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: 0 }}>
              <div className="ms-form-group">
                <label>Content Type</label>
                <select
                  className="ms-input"
                  value={editingId ? editingPlan.type : newPlan.type}
                  onChange={(e) => editingId
                    ? setEditingPlan({ ...editingPlan, type: e.target.value })
                    : setNewPlan({ ...newPlan, type: e.target.value })}
                >
                  <option value="Social Post">Social Post</option>
                  <option value="Email Newsletter">Email Newsletter</option>
                  <option value="Blog Post">Blog Post</option>
                  <option value="Video">Video</option>
                </select>
              </div>
              <div className="ms-form-group">
                <label>Publish Date</label>
                <input
                  type="date"
                  className="ms-input"
                  value={editingId ? editingPlan.publishDate : newPlan.publishDate}
                  onChange={(e) => editingId
                    ? setEditingPlan({ ...editingPlan, publishDate: e.target.value })
                    : setNewPlan({ ...newPlan, publishDate: e.target.value })}
                />
              </div>
            </div>

            {editingId && (
              <div className="ms-form-group">
                <label>Status</label>
                <select
                  className="ms-input"
                  value={editingPlan.status}
                  onChange={(e) => setEditingPlan({ ...editingPlan, status: e.target.value })}
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}

            <div className="ms-form-group">
              <label>Platforms</label>
              <div className="ms-tag-list" style={{ marginTop: '0.5rem' }}>
                {['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'Email', 'Website'].map(platform => {
                  const isActive = editingId
                    ? editingPlan.platforms.includes(platform)
                    : newPlan.platforms.includes(platform)
                  return (
                    <button
                      key={platform}
                      className="ms-tag"
                      onClick={() => togglePlatform(platform, !!editingId)}
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: isActive ? '#dc2626' : '#f1f5f9',
                        color: isActive ? 'white' : '#475569'
                      }}
                    >
                      {platform}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="ms-flex-center" style={{ marginTop: '2rem', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="ms-btn-outline" onClick={() => { setShowAddModal(false); setEditingId(null); setEditingPlan(null); }}>Cancel</button>
              <button className="ms-btn-primary" onClick={editingId ? handleUpdatePlan : handleAddPlan}>
                {editingId ? 'Update Plan' : 'Save Plan'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ms-content-grid">
        <div className="ms-card">
          <h2>
            <Layout size={24} className="ms-icon-red" />
            Upcoming Content
          </h2>
          <div className="ms-table-container">
            <table className="ms-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Type</th>
                  <th>Platforms</th>
                  <th>Publish Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td><strong>{plan.title}</strong></td>
                    <td>
                      <span className="ms-tag" style={{ background: '#f1f5f9', color: '#475569' }}>
                        {plan.topic}
                      </span>
                    </td>
                    <td>{plan.type}</td>
                    <td>
                      <div className="ms-tag-list">
                        {plan.platforms.map((p, i) => (
                          <span key={i} className="ms-tag">{p}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="ms-flex-center ms-nowrap" style={{ color: '#64748b', fontSize: '0.875rem', gap: '0.5rem' }}>
                        <Calendar size={14} />
                        <span>{plan.publishDate}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`ms-status-badge ${plan.status.toLowerCase().replace(' ', '-')}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td>
                      <div className="ms-flex-center" style={{ gap: '0.5rem' }}>
                        <button
                          className="ms-btn-icon"
                          onClick={() => startEditing(plan)}
                          style={{ color: '#64748b' }}
                          title="Edit Plan"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="ms-btn-icon"
                          onClick={() => handleDeletePlan(plan.id)}
                          style={{ color: '#dc2626' }}
                          title="Delete Plan"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ms-sidebar-cards">
          <div className="ms-card">
            <h3>
              <BarChart3 size={20} className="ms-icon-red" />
              Quick Stats
            </h3>
            <div className="ms-list-item">
              <div className="ms-flex-center">
                <Clock size={16} className="ms-icon-red" />
                <span>{stats.thisWeek} Planned this week</span>
              </div>
            </div>
            <div className="ms-list-item">
              <div className="ms-flex-center">
                <CheckCircle size={16} className="ms-icon-green" />
                <span>{stats.thisMonthCompleted} Completed this month</span>
              </div>
            </div>
          </div>

          <div className="ms-card">
            <h3>
              <Lightbulb size={20} className="ms-icon-orange" />
              Content Tips
            </h3>
            <ul className="ms-tips-list">
              <li>Consistency is key for brand growth.</li>
              <li>Repurpose blog posts into social snippets.</li>
              <li>Use high-quality visuals for better engagement.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPlanning
