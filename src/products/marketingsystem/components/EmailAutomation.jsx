import { useState } from 'react'
import { useMarketing } from '../contexts/MarketingContext'
import {
  Mail,
  Plus,
  Clock,
  Send,
  Users,
  UserPlus,
  Tag,
  X,
  Edit2,
  Trash2,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react'

const EmailAutomation = () => {
  const {
    socialMedia,
    customers,
    contentPlans,
    brandFoundation,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addEmailOutreach,
    updateEmailOutreach,
    deleteEmailOutreach
  } = useMarketing()

  const { emailOutreach = [] } = socialMedia

  // State for Customer View
  const [showAllCustomers, setShowAllCustomers] = useState(false)
  const [showAllEmails, setShowAllEmails] = useState(false)

  // State for Customer Modal
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [editingCustomerId, setEditingCustomerId] = useState(null)
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    interests: []
  })

  // State for Email Modal
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [editingEmailId, setEditingEmailId] = useState(null)
  const [emailForm, setEmailForm] = useState({
    subject: '',
    topic: '',
    content: '',
    image: null,
    status: 'Sent'
  })

  const [isSending, setIsSending] = useState(false)

  const totalSentEmails = (emailOutreach || []).length

  // Find matches for latest published content
  const latestContent = (contentPlans || [])[0] || { title: 'No content planned yet', topic: 'None' }
  const matchedCustomers = (customers || []).filter(c =>
    latestContent.topic !== 'None' && (c.interests || []).includes(latestContent.topic)
  )

  // Customer Actions
  const handleSaveCustomer = () => {
    if (!customerForm.name || !customerForm.email || (customerForm.interests || []).length === 0) {
      alert('Please fill in all fields and select at least one interest.')
      return
    }

    if (editingCustomerId) {
      updateCustomer(editingCustomerId, customerForm)
    } else {
      addCustomer(customerForm)
    }

    resetCustomerForm()
  }

  const resetCustomerForm = () => {
    setCustomerForm({ name: '', email: '', interests: [] })
    setEditingCustomerId(null)
    setShowCustomerModal(false)
  }

  const handleEditCustomer = (customer) => {
    setEditingCustomerId(customer.id)
    setCustomerForm({ ...customer })
    setShowCustomerModal(true)
  }

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id)
    }
  }

  const toggleInterest = (topic) => {
    setCustomerForm(prev => ({
      ...prev,
      interests: prev.interests.includes(topic)
        ? prev.interests.filter(i => i !== topic)
        : [...prev.interests, topic]
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for database storage
        alert('Image is too large. Please select an image under 2MB.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setEmailForm(prev => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Email Actions
  const handleSaveEmail = async () => {
    if (!emailForm.subject || !emailForm.topic || !emailForm.content) {
      alert('Please fill in all fields (Subject, Topic, and Content).')
      return
    }

    const recipients = (customers || []).filter(c => (c.interests || []).includes(emailForm.topic)).length

    if (recipients === 0 && !window.confirm('No customers match this topic. Send anyway?')) {
      return
    }

    setIsSending(true)

    // Simulate recording delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const emailData = {
      ...emailForm,
      recipientCount: recipients
    }

    // 1. Record the outreach in history
    if (editingEmailId) {
      updateEmailOutreach(editingEmailId, emailData)
    } else {
      addEmailOutreach(emailData)
    }

    // 2. Automatically launch the email client (mailto)
    const matchedEmails = (customers || [])
      .filter(c => (c.interests || []).includes(emailForm.topic))
      .map(c => c.email)
      .join(',')

    const subject = encodeURIComponent(emailForm.subject)
    const body = encodeURIComponent(
      emailForm.content +
      (emailForm.image ? '\n\n---\n[IMPORTANT: You attached an image in the dashboard. Browser security prevents automatic file attachments. PLEASE MANUALLY ATTACH YOUR IMAGE TO THIS EMAIL NOW.]\n---' : '')
    )

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${matchedEmails}&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank')

    setIsSending(false)
    resetEmailForm()

    if (!editingEmailId) {
      alert(`Outreach recorded and Gmail launched for ${recipients} recipient(s)!`)
    }
  }

  const resetEmailForm = () => {
    setEmailForm({
      subject: '',
      topic: '',
      content: '',
      image: null,
      status: 'Sent'
    })
    setEditingEmailId(null)
    setShowEmailModal(false)
  }

  const handleEditEmail = (email) => {
    setEditingEmailId(email.id)
    setEmailForm({ ...email })
    setShowEmailModal(true)
  }

  const handleDeleteEmail = (id) => {
    if (window.confirm('Are you sure you want to delete this email record?')) {
      deleteEmailOutreach(id)
    }
  }

  const stats = [
    {
      title: 'Total Emails Sent',
      value: totalSentEmails,
      icon: Send,
      color: 'green'
    },
    {
      title: 'Total Customers',
      value: (customers || []).length,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Interests',
      value: (brandFoundation.emailTopics || []).length,
      icon: Tag,
      color: 'purple'
    }
  ]

  return (
    <div className="ms-page">
      <header className="ms-page-header">
        <h1>Email Automation</h1>
        <p>Send targeted emails to customers based on their interests.</p>
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
        {/* Customer Directory Section */}
        <section className="ms-card">
          <div className="ms-card-header ms-flex-between">
            <div className="ms-flex-center">
              <Users className="ms-icon-red" size={24} />
              <h2 style={{ margin: 0 }}>Customer Directory</h2>
            </div>
            <button className="ms-btn-primary ms-btn-sm" onClick={() => setShowCustomerModal(true)}>
              <UserPlus size={16} />
              <span>Add Customer</span>
            </button>
          </div>

          <div className="ms-list" style={{ marginTop: '1.5rem' }}>
            {customers.length === 0 ? (
              <div className="ms-empty-state">
                <Users size={48} strokeWidth={1} />
                <p>No customers added yet.</p>
                <button className="ms-btn-outline ms-btn-sm" onClick={() => setShowCustomerModal(true)}>
                  Add your first customer
                </button>
              </div>
            ) : (
              (showAllCustomers ? [...customers].reverse() : customers.slice(-3).reverse()).map(customer => (
                <div key={customer.id} className="ms-list-item">
                  <div className="ms-item-info">
                    <strong>{customer.name}</strong>
                    <span style={{ fontSize: '0.8125rem' }}>{customer.email}</span>
                    <div className="ms-tag-list" style={{ marginTop: '0.5rem' }}>
                      {customer.interests.map((interest, idx) => (
                        <span key={idx} className="ms-tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ms-flex-center" style={{ gap: '0.5rem' }}>
                    <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Joined</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{customer.signupDate}</span>
                    </div>
                    <button className="ms-btn-icon" onClick={() => handleEditCustomer(customer)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="ms-btn-icon" onClick={() => handleDeleteCustomer(customer.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {customers.length > 3 && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                className="ms-btn-ghost ms-btn-sm"
                onClick={() => setShowAllCustomers(!showAllCustomers)}
                style={{ color: '#dc2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
              >
                {showAllCustomers ? (
                  <>Show Less</>
                ) : (
                  <>
                    <span>View All Customers ({customers.length})</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        {/* Email Outreach Section */}
        <section className="ms-card">
          <div className="ms-card-header ms-flex-between">
            <div className="ms-flex-center">
              <Send className="ms-icon-orange" size={24} />
              <h2 style={{ margin: 0 }}>Email Outreach</h2>
            </div>
            <button className="ms-btn-primary ms-btn-sm" onClick={() => setShowEmailModal(true)}>
              <Plus size={16} />
              <span>New Email</span>
            </button>
          </div>

          <div className="ms-list" style={{ marginTop: '1.5rem' }}>
            {emailOutreach.length === 0 ? (
              <div className="ms-empty-state">
                <Mail size={48} strokeWidth={1} />
                <p>No emails sent yet.</p>
                <button className="ms-btn-outline ms-btn-sm" onClick={() => setShowEmailModal(true)}>
                  Send your first targeted email
                </button>
              </div>
            ) : (
              (showAllEmails ? [...emailOutreach].reverse() : emailOutreach.slice(-5).reverse()).map(email => (
                <div key={email.id} className="ms-list-item" style={{ alignItems: 'flex-start' }}>
                  <div className="ms-item-info">
                    <div className="ms-flex-center" style={{ gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <strong>{email.subject}</strong>
                      <span className="ms-status-badge completed" style={{ fontSize: '0.65rem' }}>
                        {email.status}
                      </span>
                    </div>
                    <div className="ms-flex-center" style={{ gap: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                      <span className="ms-flex-center" style={{ gap: '0.25rem' }}>
                        <Tag size={12} /> {email.topic}
                      </span>
                      <span className="ms-flex-center" style={{ gap: '0.25rem' }}>
                        <Users size={12} /> {email.recipientCount} recipients
                      </span>
                      <span className="ms-flex-center" style={{ gap: '0.25rem' }}>
                        <Clock size={12} /> {email.sentDate}
                      </span>
                    </div>
                  </div>
                  <div className="ms-flex-center" style={{ gap: '0.5rem' }}>
                    <button className="ms-btn-icon" onClick={() => handleEditEmail(email)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="ms-btn-icon" onClick={() => handleDeleteEmail(email.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {emailOutreach.length > 5 && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                className="ms-btn-ghost ms-btn-sm"
                onClick={() => setShowAllEmails(!showAllEmails)}
                style={{ color: '#dc2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
              >
                {showAllEmails ? (
                  <>Show Less</>
                ) : (
                  <>
                    <span>View All Emails ({emailOutreach.length})</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </section>
      </div>
      {showCustomerModal && (
        <div
          className="ms-modal-overlay"
          style={{
            overflowY: 'auto',
            padding: '2rem 0',
            display: 'block',
            textAlign: 'center'
          }}
        >
          <div
            className="ms-card"
            style={{
              width: '450px',
              maxWidth: '90%',
              maxHeight: 'fit-content',
              margin: '0 auto',
              textAlign: 'left',
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
          >
            <div className="ms-flex-between" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{editingCustomerId ? 'Edit Customer' : 'Add New Customer'}</h2>
              <button onClick={resetCustomerForm} className="ms-btn-icon">
                <X size={20} />
              </button>
            </div>

            <div className="ms-form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="ms-input"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="ms-form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="ms-input"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="ms-form-group">
              <label>Interests (Select multiple)</label>
              <div className="ms-tag-list" style={{ marginTop: '0.5rem' }}>
                {brandFoundation.emailTopics.length > 0 ? (
                  brandFoundation.emailTopics.map(topic => (
                    <button
                      key={topic}
                      className="ms-tag"
                      onClick={() => toggleInterest(topic)}
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: customerForm.interests.includes(topic) ? '#dc2626' : '#f1f5f9',
                        color: customerForm.interests.includes(topic) ? 'white' : '#475569',
                        transition: 'all 0.2s'
                      }}
                    >
                      {topic}
                    </button>
                  ))
                ) : (
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>No topics defined in Brand Foundation.</p>
                )}
              </div>
            </div>

            <div className="ms-flex-center" style={{ marginTop: '2rem', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="ms-btn-outline" onClick={resetCustomerForm}>Cancel</button>
              <button className="ms-btn-primary" onClick={handleSaveCustomer}>
                {editingCustomerId ? 'Update' : 'Add'} Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div
          className="ms-modal-overlay"
          style={{
            overflowY: 'auto',
            padding: '2rem 0',
            display: 'block',
            textAlign: 'center'
          }}
        >
          <div
            className="ms-card"
            style={{
              width: '600px',
              maxWidth: '90%',
              maxHeight: 'fit-content',
              margin: '0 auto',
              textAlign: 'left',
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
          >
            <div className="ms-flex-between" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{editingEmailId ? 'Edit Email' : 'Create New Email'}</h2>
              <button onClick={resetEmailForm} className="ms-btn-icon">
                <X size={20} />
              </button>
            </div>

            <div className="ms-form-group">
              <label>From</label>
              <input
                type="text"
                className="ms-input"
                value={brandFoundation.senderEmail || 'No sender email set'}
                disabled
                style={{ backgroundColor: '#f8fafc', color: '#64748b' }}
              />
              {!brandFoundation.senderEmail && (
                <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem' }}>
                  Please set a sender email in Brand Foundation.
                </p>
              )}
            </div>

            <div className="ms-form-group">
              <label>Email Subject</label>
              <input
                type="text"
                className="ms-input"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                placeholder="e.g. Special Update for You"
              />
            </div>

            <div className="ms-form-group">
              <label>Topic for Matching</label>
              <select
                className="ms-input"
                value={emailForm.topic}
                onChange={(e) => setEmailForm({ ...emailForm, topic: e.target.value })}
              >
                <option value="">Select a topic</option>
                {brandFoundation.emailTopics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
              {brandFoundation.emailTopics.length === 0 && (
                <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.5rem' }}>
                  No topics defined. Go to <strong>Brand Foundation</strong> to add email topics first.
                </p>
              )}
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                {emailForm.topic ? (
                  <>Matches <strong>{customers.filter(c => c.interests.includes(emailForm.topic)).length}</strong> customers.</>
                ) : (
                  'Select a topic to see potential recipients.'
                )}
              </p>
            </div>

            <div className="ms-form-group">
              <label>Email Content</label>
              <textarea
                className="ms-textarea"
                rows="6"
                value={emailForm.content}
                onChange={(e) => setEmailForm({ ...emailForm, content: e.target.value })}
                placeholder="Write your email content here..."
              ></textarea>
            </div>

            <div className="ms-form-group">
              <label>Attachment (Optional)</label>
              <div
                className="ms-image-upload-zone"
                onClick={() => document.getElementById('email-image-upload').click()}
                style={{
                  border: '2px dashed #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: emailForm.image ? '#f8fafc' : 'transparent',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                <input
                  id="email-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />

                {emailForm.image ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={emailForm.image}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px' }}
                    />
                    <button
                      className="ms-btn-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEmailForm(prev => ({ ...prev, image: null }))
                      }}
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '4px'
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div style={{ color: '#64748b' }}>
                    <ImageIcon size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>Click to upload an image (Max 2MB)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="ms-flex-center" style={{ marginTop: '2rem', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="ms-btn-outline" onClick={resetEmailForm} disabled={isSending}>
                Cancel
              </button>
              <button
                className="ms-btn-primary"
                onClick={handleSaveEmail}
                disabled={isSending || !brandFoundation.senderEmail}
              >
                {isSending ? 'Processing...' : (editingEmailId ? 'Update' : 'Send') + ' Email'}
              </button>
            </div>

            <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '1rem', textAlign: 'center' }}>
              <strong>Note:</strong> Clicking "Send" will record the outreach and automatically open your email client.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmailAutomation
