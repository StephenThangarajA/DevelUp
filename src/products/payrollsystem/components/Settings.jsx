import { useState, useEffect } from 'react'
import { usePayroll } from '../contexts/PayrollContext'
import '../styles/Settings.css'
import {
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  BellIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const Settings = () => {
  const { settings, setSettings, saveSettings, formatCurrency, getCurrencySymbol } = usePayroll()
  const [activeTab, setActiveTab] = useState('company')
  const [formData, setFormData] = useState(settings)
  const [saved, setSaved] = useState(false)

  // Security section states
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Sync formData with settings when settings change externally
  useEffect(() => {
    setFormData(settings)
  }, [settings])

  const tabs = [
    { id: 'company', label: 'Company Info', icon: BuildingOfficeIcon },
    { id: 'payroll', label: 'Payroll Config', icon: CurrencyDollarIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon }
  ]

  const handleSave = async () => {
    try {
      // Filter only valid database fields
      const validSettings = {
        companyName: formData.companyName || '',
        companyAddress: formData.companyAddress || '',
        registrationNumber: formData.registrationNumber || '',
        phoneNumber: formData.phoneNumber || '',
        email: formData.email || '',
        taxRate: formData.taxRate || 0.15,
        pfRate: formData.pfRate || 0.12,
        healthInsurance: formData.healthInsurance || 500,
        currency: formData.currency || 'USD'
      }
      await saveSettings(validSettings)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save settings. Please try again.')
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Password change handlers
  const handleOpenPasswordModal = () => {
    setShowPasswordModal(true)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setPasswordErrors({})
    setPasswordSuccess(false)
  }

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setPasswordErrors({})
    setPasswordSuccess(false)
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    const errors = {}

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required'
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long'
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password'
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = 'New password must be different from current password'
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      return
    }

    // Simulate password change (in real app, this would call an API)
    setPasswordSuccess(true)
    setTimeout(() => {
      handleClosePasswordModal()
      // Show success notification
      alert('Password changed successfully!')
    }, 1500)
  }

  // Logout handlers
  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true)
  }

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false)
  }

  const handleLogoutAllDevices = () => {
    // Simulate logout (in real app, this would call an API)
    alert('You have been logged out from all devices. Please log in again.')
    handleCloseLogoutModal()
    // In a real application, you would redirect to login page or clear session
    // window.location.href = '/login'
  }

  return (
    <div className="settings">
      {/* Header */}
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure your payroll system preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="settings-tabs">
        <div className="settings-tabs-list">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`settings-tab ${activeTab === tab.id
                  ? 'active'
                  : ''
                  }`}
              >
                <Icon />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="settings-content">
        {activeTab === 'company' && (
          <div className="settings-section">
            <h3>Company Information</h3>

            <div className="settings-form-grid">
              <div className="settings-form-field">
                <label>
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                />
              </div>

              <div className="settings-form-field">
                <label>
                  Registration Number
                </label>
                <input
                  type="text"
                  placeholder="REG-123456789"
                  value={formData.registrationNumber || ''}
                  onChange={(e) => handleChange('registrationNumber', e.target.value)}
                />
              </div>
            </div>

            <div className="settings-form-field full-width">
              <label>
                Company Address
              </label>
              <textarea
                value={formData.companyAddress}
                onChange={(e) => handleChange('companyAddress', e.target.value)}
                rows="3"
              />
            </div>

            <div className="settings-form-grid">
              <div className="settings-form-field">
                <label>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phoneNumber || ''}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                />
              </div>

              <div className="settings-form-field">
                <label>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="settings-section">
            <h3>Payroll Configuration</h3>

            <div className="settings-payroll-grid">
              <div className="settings-form-field">
                <label>
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={(formData.taxRate || 0) * 100}
                  onChange={(e) => handleChange('taxRate', parseFloat(e.target.value) / 100)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="settings-form-field">
                <label>
                  PF Rate (%)
                </label>
                <input
                  type="number"
                  value={(formData.pfRate || 0) * 100}
                  onChange={(e) => handleChange('pfRate', parseFloat(e.target.value) / 100)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="settings-form-field">
                <label>
                  Health Insurance ({getCurrencySymbol(formData.currency)})
                </label>
                <input
                  type="number"
                  value={formData.healthInsurance || 0}
                  onChange={(e) => handleChange('healthInsurance', parseFloat(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="settings-form-field">
                <label>
                  Pay Frequency
                </label>
                <select>
                  <option value="monthly">Monthly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div className="settings-form-field">
                <label>
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                >
                  <option value="USD">USD - US Dollar ($)</option>
                  <option value="INR">INR - Indian Rupee (₹)</option>
                  <option value="EUR">EUR - Euro (€)</option>
                  <option value="GBP">GBP - British Pound (£)</option>
                </select>
              </div>
            </div>

            <div className="settings-notice">
              <div className="settings-notice-content">
                <div className="settings-notice-icon">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div className="settings-notice-text">
                  <h4>Important Notice</h4>
                  <p>
                    Changes to payroll configuration will affect future payroll calculations.
                    Please consult with your HR and finance teams before making changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="settings-section">
            <h3>Security Settings</h3>

            <div className="settings-security-list">
              <div className="settings-security-item">
                <div className="settings-security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <label className="settings-toggle">
                  <input type="checkbox" />
                  <div className="settings-toggle-slider"></div>
                </label>
              </div>

              <div className="settings-security-item">
                <div className="settings-security-info">
                  <h4>Login Notifications</h4>
                  <p>Get notified when someone logs into your account</p>
                </div>
                <label className="settings-toggle">
                  <input type="checkbox" defaultChecked />
                  <div className="settings-toggle-slider"></div>
                </label>
              </div>

              <div className="settings-security-item">
                <div className="settings-security-info">
                  <h4>Session Timeout</h4>
                  <p>Automatically log out after period of inactivity</p>
                </div>
                <select className="settings-security-select">
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="480">8 hours</option>
                </select>
              </div>
            </div>

            <div className="settings-password-section">
              <h4>Password Security</h4>
              <div className="settings-password-actions">
                <button
                  onClick={handleOpenPasswordModal}
                  className="settings-password-btn change"
                >
                  Change Password
                </button>
                <button
                  onClick={handleOpenLogoutModal}
                  className="settings-password-btn logout"
                >
                  Logout All Devices
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="settings-section">
            <h3>Notification Preferences</h3>

            <div className="settings-notifications-list">
              <div className="settings-notifications-item">
                <div className="settings-security-info">
                  <h4>Payroll Processing</h4>
                  <p>Get notified when payroll is processed</p>
                </div>
                <label className="settings-toggle">
                  <input type="checkbox" defaultChecked />
                  <div className="settings-toggle-slider"></div>
                </label>
              </div>

              <div className="settings-notifications-item">
                <div className="settings-security-info">
                  <h4>New Employee Added</h4>
                  <p>Get notified when a new employee is added</p>
                </div>
                <label className="settings-toggle">
                  <input type="checkbox" defaultChecked />
                  <div className="settings-toggle-slider"></div>
                </label>
              </div>

              <div className="settings-notifications-item">
                <div className="settings-security-info">
                  <h4>Monthly Reports</h4>
                  <p>Receive monthly payroll summary reports</p>
                </div>
                <label className="settings-toggle">
                  <input type="checkbox" />
                  <div className="settings-toggle-slider"></div>
                </label>
              </div>

              <div className="settings-notifications-item">
                <div className="settings-security-info">
                  <h4>System Updates</h4>
                  <p>Get notified about system updates and maintenance</p>
                </div>
                <label className="settings-toggle">
                  <input type="checkbox" defaultChecked />
                  <div className="settings-toggle-slider"></div>
                </label>
              </div>
            </div>

            <div className="settings-delivery-section">
              <h4>Delivery Methods</h4>
              <div className="settings-delivery-list">
                <div className="settings-delivery-item">
                  <input type="checkbox" defaultChecked />
                  <label>Email notifications</label>
                </div>
                <div className="settings-delivery-item">
                  <input type="checkbox" />
                  <label>SMS notifications</label>
                </div>
                <div className="settings-delivery-item">
                  <input type="checkbox" defaultChecked />
                  <label>In-app notifications</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="settings-actions">
          <button
            onClick={handleSave}
            className={`settings-save-btn ${saved
              ? 'saved'
              : 'unsaved'
              }`}
          >
            {saved ? '✓ Saved Successfully' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="settings-modal-overlay" onClick={handleClosePasswordModal}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>Change Password</h3>
              <button
                onClick={handleClosePasswordModal}
                className="settings-modal-close"
              >
                <XMarkIcon />
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="settings-modal-content">
              {passwordSuccess ? (
                <div className="settings-modal-success">
                  <CheckCircleIcon />
                  <p>Password changed successfully!</p>
                </div>
              ) : (
                <>
                  <div className={`settings-form-field ${passwordErrors.currentPassword ? 'error' : ''}`}>
                    <label>Current Password *</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                    />
                    {passwordErrors.currentPassword && (
                      <p className="error-message">{passwordErrors.currentPassword}</p>
                    )}
                  </div>

                  <div className={`settings-form-field ${passwordErrors.newPassword ? 'error' : ''}`}>
                    <label>New Password *</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password (min 8 characters)"
                    />
                    {passwordErrors.newPassword && (
                      <p className="error-message">{passwordErrors.newPassword}</p>
                    )}
                  </div>

                  <div className={`settings-form-field ${passwordErrors.confirmPassword ? 'error' : ''}`}>
                    <label>Confirm New Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="error-message">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="settings-modal-actions">
                    <button
                      type="button"
                      onClick={handleClosePasswordModal}
                      className="settings-modal-cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="settings-modal-submit"
                    >
                      Change Password
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Logout All Devices Modal */}
      {showLogoutModal && (
        <div className="settings-modal-overlay" onClick={handleCloseLogoutModal}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>Logout All Devices</h3>
              <button
                onClick={handleCloseLogoutModal}
                className="settings-modal-close"
              >
                <XMarkIcon />
              </button>
            </div>
            <div className="settings-modal-content">
              <div className="settings-modal-warning">
                <p>Are you sure you want to logout from all devices?</p>
                <p className="settings-modal-warning-text">
                  This will end all active sessions on all devices. You will need to log in again on this device.
                </p>
              </div>
              <div className="settings-modal-actions">
                <button
                  type="button"
                  onClick={handleCloseLogoutModal}
                  className="settings-modal-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLogoutAllDevices}
                  className="settings-modal-submit logout"
                >
                  Logout All Devices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings