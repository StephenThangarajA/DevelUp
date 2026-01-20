import { useMarketing } from '../contexts/MarketingContext'
import {
  Briefcase,
  FileText,
  Share2,
  Mail,
  Image as ImageIcon,
  Target,
  Rocket,
  Plus
} from 'lucide-react'

const Dashboard = () => {
  const { brandFoundation, contentPlans, socialMedia, businessAnalyses } = useMarketing()

  const activeContent = (contentPlans || []).filter(p => p.status === 'In Progress').length
  const totalPlanned = (contentPlans || []).length
  const totalEmails = (socialMedia.emailOutreach || []).length
  const totalAnalyzed = (businessAnalyses || []).length

  const stats = [
    {
      title: 'Active Content',
      value: activeContent,
      icon: FileText,
      color: 'red'
    },
    {
      title: 'Email Outreach',
      value: totalEmails,
      icon: Mail,
      color: 'green'
    },
    {
      title: 'Business Analysis',
      value: totalAnalyzed,
      icon: Briefcase,
      color: 'blue'
    }
  ]

  return (
    <div className="ms-page">
      <header className="ms-page-header">
        <h1>Marketing Dashboard</h1>
        <p>Welcome back! Here's what's happening with {brandFoundation.companyName}.</p>
      </header>

      <div className="ms-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`ms-stat-card ${stat.color}`}>
            <div className="ms-stat-icon-wrapper">
              <stat.icon size={28} />
            </div>
            <div className="ms-stat-content">
              <span className="ms-stat-label">{stat.title}</span>
              <span className="ms-stat-number">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="ms-dashboard-grid">
        <section className="ms-card">
          <h2>
            <Target size={24} className="ms-icon-red" />
            Brand Identity
          </h2>
          <div className="ms-brand-preview">
            {brandFoundation.logo && (
              <div className="ms-preview-item" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                <img src={brandFoundation.logo} alt="Brand Logo" style={{ maxHeight: '60px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            )}
            <div className="ms-preview-item">
              <strong>Mission</strong>
              <p>{brandFoundation.mission || 'Not defined'}</p>
            </div>
            <div className="ms-preview-item">
              <strong>Vision</strong>
              <p>{brandFoundation.vision || 'Not defined'}</p>
            </div>
            <div className="ms-preview-item">
              <strong>Values</strong>
              <div className="ms-tag-list">
                {(brandFoundation.values || []).map((v, i) => (
                  <span key={i} className="ms-tag">{v}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="ms-card">
          <h2>
            <Rocket size={24} className="ms-icon-red" />
            Upcoming Content
          </h2>
          <div className="ms-mini-list">
            {(contentPlans || []).slice(0, 3).map(plan => (
              <div key={plan.id} className="ms-list-item">
                <div className="ms-item-info">
                  <strong>{plan.title}</strong>
                  <span className="ms-nowrap">{plan.publishDate}</span>
                </div>
                <span className={`ms-status-badge ${plan.status.toLowerCase().replace(' ', '-')}`}>
                  {plan.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="ms-card">
          <h2>Quick Actions</h2>
          <div className="ms-flex-center" style={{ gap: '1rem', marginTop: '1rem' }}>
            <button className="ms-btn-outline">
              <Mail size={18} />
              <span>Send Email</span>
            </button>
            <button className="ms-btn-outline">
              <Briefcase size={18} />
              <span>Analyze Data</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
