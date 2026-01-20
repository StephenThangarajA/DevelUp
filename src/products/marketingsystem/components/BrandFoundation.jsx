import { useState } from 'react'
import { useMarketing } from '../contexts/MarketingContext'
import {
  Building2,
  Target,
  Users,
  Palette,
  Heart,
  MessageSquare,
  Globe,
  Edit2,
  Save,
  Mail,
  Plus,
  X,
  Image as ImageIcon,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon
} from 'lucide-react'
import '../styles/MarketingSystem.css'

const BrandFoundation = () => {
  const { brandFoundation, updateBrandFoundation } = useMarketing()
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState('')
  const [tempColor, setTempColor] = useState('#2563eb')
  const [customTopic, setCustomTopic] = useState('')
  const [showCustomTopicInput, setShowCustomTopicInput] = useState(false)

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size too large. Please upload an image under 2MB.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange('logo', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const targetAudienceOptions = [
    'Small Business',
    'Enterprise',
    'Freelancers',
    'E-commerce',
    'Local Services',
    'Education',
    'Healthcare',
    'Other'
  ]

  const emailTopicOptions = [
    'Product Updates',
    'Weekly Newsletters',
    'Monthly Promotions',
    'Educational Content',
    'Event Invitations',
    'Customer Success Stories',
    'Industry News'
  ]

  const handleChange = (field, value) => {
    updateBrandFoundation({ [field]: value })
  }

  const handleSocialChange = (platform, value) => {
    updateBrandFoundation({
      socialLinks: {
        ...brandFoundation.socialLinks,
        [platform]: value
      }
    })
  }

  const handleAddItem = (field, value) => {
    if (!value) return
    const currentItems = brandFoundation[field] || []
    if (!currentItems.includes(value)) {
      handleChange(field, [...currentItems, value])
    }
    if (field === 'emailTopics') {
      setTempValue('')
      setCustomTopic('')
      setShowCustomTopicInput(false)
    } else if (field === 'colors') {
      setTempColor('#2563eb')
    } else {
      setTempValue('')
    }
  }

  const handleRemoveItem = (field, itemToRemove) => {
    const currentItems = brandFoundation[field] || []
    handleChange(field, currentItems.filter(item => item !== itemToRemove))
  }

  return (
    <div className="ms-page">
      <header className="ms-page-header ms-flex-between">
        <div className="ms-header-content">
          <h1>Business & Brand Foundation</h1>
          <p>Define your core business identity and brand guidelines.</p>
        </div>
        <button
          className="ms-btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save size={20} />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit2 size={20} />
              <span>Edit Foundation</span>
            </>
          )}
        </button>
      </header>

      <div className="ms-grid">
        <section className="ms-card">
          <h2>
            <Building2 size={24} className="ms-icon-red" />
            Core Identity
          </h2>

          <div className="ms-form-group">
            <label>
              <ImageIcon size={16} />
              Business Logo
            </label>
            {isEditing ? (
              <div className="ms-flex-center" style={{ gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="ms-input"
                  style={{ padding: '0.5rem' }}
                />
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Recommended: Square image, max 2MB</span>
                {brandFoundation.logo && (
                  <div className="ms-value-display" style={{ padding: '0.5rem', marginTop: '0.5rem' }}>
                    <img src={brandFoundation.logo} alt="Preview" style={{ maxHeight: '40px' }} />
                  </div>
                )}
              </div>
            ) : (
              <div className="ms-value-display" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', minHeight: '100px', display: 'flex', justifyContent: 'center' }}>
                {brandFoundation.logo ? (
                  <img src={brandFoundation.logo} alt="Business Logo" style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} />
                ) : (
                  <div style={{ color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <ImageIcon size={32} />
                    <span>No logo added</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="ms-form-group">
            <label>
              <Building2 size={16} />
              Company Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={brandFoundation.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="ms-input"
                placeholder="Enter company name..."
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.companyName || 'Not defined'}</p>
            )}
          </div>
          <div className="ms-form-group">
            <label>
              <Mail size={16} />
              Sender Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={brandFoundation.senderEmail}
                onChange={(e) => handleChange('senderEmail', e.target.value)}
                className="ms-input"
                placeholder="e.g. hello@company.com"
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.senderEmail || 'Not defined'}</p>
            )}
            <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
              This is the email address your customers will see in their inbox.
            </span>
          </div>
        </section>

        <section className="ms-card">
          <h2>
            <Target size={24} className="ms-icon-red" />
            Strategic Foundation
          </h2>
          <div className="ms-form-group">
            <label>
              <Target size={16} />
              Mission Statement
            </label>
            {isEditing ? (
              <textarea
                value={brandFoundation.mission}
                onChange={(e) => handleChange('mission', e.target.value)}
                className="ms-textarea"
                placeholder="What is your immediate goal/purpose?"
                rows="3"
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.mission || 'Not defined'}</p>
            )}
          </div>
          <div className="ms-form-group">
            <label>
              <Globe size={16} />
              Vision Statement
            </label>
            {isEditing ? (
              <textarea
                value={brandFoundation.vision}
                onChange={(e) => handleChange('vision', e.target.value)}
                className="ms-textarea"
                placeholder="Where do you see the company in the long term?"
                rows="3"
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.vision || 'Not defined'}</p>
            )}
          </div>
        </section>

        <section className="ms-card">
          <h2>
            <Users size={24} className="ms-icon-red" />
            Brand Voice & Audience
          </h2>
          <div className="ms-form-group">
            <label>
              <Globe size={16} />
              Target Audience
            </label>
            {isEditing ? (
              <select
                value={brandFoundation.targetAudience}
                onChange={(e) => handleChange('targetAudience', e.target.value)}
                className="ms-input"
              >
                <option value="">Select Target Audience...</option>
                {targetAudienceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <p className="ms-value-display">{brandFoundation.targetAudience || 'Not defined'}</p>
            )}
          </div>
          <div className="ms-form-group">
            <label>
              <MessageSquare size={16} />
              Brand Voice
            </label>
            {isEditing ? (
              <input
                type="text"
                value={brandFoundation.voice}
                onChange={(e) => handleChange('voice', e.target.value)}
                className="ms-input"
                placeholder="e.g. Professional, Friendly..."
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.voice || 'Not defined'}</p>
            )}
          </div>
        </section>

        <section className="ms-card">
          <h2>
            <Mail size={24} className="ms-icon-red" />
            Email Topics
          </h2>
          <div className="ms-form-group">
            <label>
              <Mail size={16} />
              Topics for Email Outreach
            </label>
            {isEditing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <div className="ms-flex-center" style={{ gap: '0.5rem' }}>
                  <select
                    value={showCustomTopicInput ? 'custom' : tempValue}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setShowCustomTopicInput(true)
                        setTempValue('')
                      } else {
                        setShowCustomTopicInput(false)
                        setTempValue(e.target.value)
                      }
                    }}
                    className="ms-input"
                    style={{ flex: 1 }}
                  >
                    <option value="">Select a topic...</option>
                    {emailTopicOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    <option value="custom">+ Type custom topic...</option>
                  </select>
                  {!showCustomTopicInput && (
                    <button
                      className="ms-btn-primary ms-btn-sm"
                      onClick={() => handleAddItem('emailTopics', tempValue)}
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
                {showCustomTopicInput && (
                  <div className="ms-flex-center" style={{ gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="ms-input"
                      placeholder="Type your topic..."
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      autoFocus
                    />
                    <button
                      className="ms-btn-primary ms-btn-sm"
                      onClick={() => handleAddItem('emailTopics', customTopic)}
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      className="ms-btn-outline ms-btn-sm"
                      onClick={() => setShowCustomTopicInput(false)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="ms-tag-list">
              {brandFoundation.emailTopics && brandFoundation.emailTopics.length > 0 ? (
                brandFoundation.emailTopics.map((topic, index) => (
                  <span key={index} className="ms-tag">
                    {topic}
                    {isEditing && (
                      <X
                        size={12}
                        style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                        onClick={() => handleRemoveItem('emailTopics', topic)}
                      />
                    )}
                  </span>
                ))
              ) : (
                <p className="ms-value-display">No topics selected</p>
              )}
            </div>
          </div>
        </section>

        <section className="ms-card">
          <h2>
            <Palette size={24} className="ms-icon-red" />
            Visual & Values
          </h2>
          <div className="ms-form-group">
            <label>
              <Palette size={16} />
              Brand Colors
            </label>
            {isEditing && (
              <div className="ms-flex-center" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="color"
                    value={tempColor}
                    onChange={(e) => setTempColor(e.target.value)}
                    style={{
                      height: '42px',
                      width: '42px',
                      padding: '0',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: 'none'
                    }}
                  />
                  <input
                    type="text"
                    value={tempColor.toUpperCase()}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val.startsWith('#') && val.length <= 7) {
                        setTempColor(val.toLowerCase())
                      } else if (!val.startsWith('#') && val.length <= 6) {
                        setTempColor('#' + val.toLowerCase())
                      }
                    }}
                    className="ms-input"
                    style={{ width: '100px', textAlign: 'center', fontWeight: 'bold' }}
                    placeholder="#000000"
                  />
                </div>
                <button
                  className="ms-btn-primary ms-btn-sm"
                  onClick={() => handleAddItem('colors', tempColor)}
                  title="Add Color"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
            <div className="ms-color-list">
              {brandFoundation.colors && brandFoundation.colors.length > 0 ? (
                brandFoundation.colors.map((color, index) => (
                  <div key={index} className="ms-color-item">
                    <div className="ms-color-preview" style={{ backgroundColor: color }}></div>
                    <span>{color}</span>
                    {isEditing && (
                      <X
                        size={12}
                        style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                        onClick={() => handleRemoveItem('colors', color)}
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="ms-value-display">No colors defined</p>
              )}
            </div>
          </div>
          <div className="ms-form-group">
            <label>
              <Heart size={16} />
              Core Values
            </label>
            {isEditing && (
              <div className="ms-flex-center" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="ms-input"
                  placeholder="Add value..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem('values', tempValue)}
                />
                <button
                  className="ms-btn-primary ms-btn-sm"
                  onClick={() => handleAddItem('values', tempValue)}
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
            <div className="ms-tag-list">
              {brandFoundation.values && brandFoundation.values.length > 0 ? (
                brandFoundation.values.map((value, index) => (
                  <span key={index} className="ms-tag">
                    {value}
                    {isEditing && (
                      <X
                        size={12}
                        style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                        onClick={() => handleRemoveItem('values', value)}
                      />
                    )}
                  </span>
                ))
              ) : (
                <p className="ms-value-display">No values defined</p>
              )}
            </div>
          </div>
        </section>

        <section className="ms-card">
          <h2>
            <Globe size={24} className="ms-icon-red" />
            Online Presence
          </h2>
          <div className="ms-form-group">
            <label>
              <LinkIcon size={16} />
              Website URL
            </label>
            {isEditing ? (
              <input
                type="url"
                value={brandFoundation.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                className="ms-input"
                placeholder="https://www.yourbusiness.com"
              />
            ) : (
              <p className="ms-value-display">
                {brandFoundation.website ? (
                  <a href={brandFoundation.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
                    {brandFoundation.website}
                  </a>
                ) : 'Not defined'}
              </p>
            )}
          </div>

          <div className="ms-form-group">
            <label>
              <Instagram size={16} />
              Instagram
            </label>
            {isEditing ? (
              <input
                type="text"
                value={brandFoundation.socialLinks?.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className="ms-input"
                placeholder="@username"
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.socialLinks?.instagram || 'Not defined'}</p>
            )}
          </div>

          <div className="ms-form-group">
            <label>
              <Twitter size={16} />
              Twitter / X
            </label>
            {isEditing ? (
              <input
                type="text"
                value={brandFoundation.socialLinks?.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                className="ms-input"
                placeholder="@username"
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.socialLinks?.twitter || 'Not defined'}</p>
            )}
          </div>

          <div className="ms-form-group">
            <label>
              <Linkedin size={16} />
              LinkedIn
            </label>
            {isEditing ? (
              <input
                type="text"
                value={brandFoundation.socialLinks?.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className="ms-input"
                placeholder="Company Page URL or @username"
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.socialLinks?.linkedin || 'Not defined'}</p>
            )}
          </div>

          <div className="ms-form-group">
            <label>
              <Facebook size={16} />
              Facebook
            </label>
            {isEditing ? (
              <input
                type="text"
                value={brandFoundation.socialLinks?.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                className="ms-input"
                placeholder="Facebook Page URL"
              />
            ) : (
              <p className="ms-value-display">{brandFoundation.socialLinks?.facebook || 'Not defined'}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default BrandFoundation
