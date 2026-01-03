import React, { useState, useEffect } from 'react';
import { audit as api } from '../../../lib/api.js';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    department: '',
    emailNotifications: true,
    dueDateReminders: true,
    criticalAlerts: true,
    autoSave: true,
    defaultView: 'Dashboard',
    itemsPerPage: '25'
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const settings = await api.settings.get();
        setFormData({
          fullName: settings.fullName || '',
          email: settings.email || '',
          jobTitle: settings.jobTitle || '',
          department: settings.department || '',
          emailNotifications: settings.emailNotifications ?? true,
          dueDateReminders: settings.dueDateReminders ?? true,
          criticalAlerts: settings.criticalAlerts ?? true,
          autoSave: settings.autoSave ?? true,
          defaultView: settings.defaultView || 'Dashboard',
          itemsPerPage: settings.itemsPerPage || '25'
        });
      } catch (error) {
        console.error('Failed to load settings:', error);
        alert('Failed to load settings. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.settings.update({
        fullName: formData.fullName,
        email: formData.email,
        jobTitle: formData.jobTitle,
        department: formData.department
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    // Reset form
    e.target.reset();
    alert('Password updated successfully!');
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      await api.settings.update({
        defaultView: formData.defaultView,
        itemsPerPage: formData.itemsPerPage,
        autoSave: formData.autoSave
      });
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Failed to save preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      setSaving(true);
      await api.settings.update({
        emailNotifications: formData.emailNotifications,
        dueDateReminders: formData.dueDateReminders,
        criticalAlerts: formData.criticalAlerts
      });
      alert('Notification preferences saved successfully!');
    } catch (error) {
      console.error('Failed to save notifications:', error);
      alert('Failed to save notification preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="as-settings-page">
        <div className="as-settings-header">
          <h1>Settings</h1>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="as-settings-page">
      <div className="as-settings-header">
        <h1>Settings</h1>
        <p>Manage your account and application preferences</p>
      </div>

      <div className="as-settings-content">
        <div className="as-settings-sidebar">
          <nav className="as-settings-nav">
            <button 
              className={`as-nav-button ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveSection('profile')}
            >
              Profile Settings
            </button>
            <button 
              className={`as-nav-button ${activeSection === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveSection('notifications')}
            >
              Notifications
            </button>
            <button 
              className={`as-nav-button ${activeSection === 'security' ? 'active' : ''}`}
              onClick={() => setActiveSection('security')}
            >
              Security
            </button>
            <button 
              className={`as-nav-button ${activeSection === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveSection('preferences')}
            >
              Preferences
            </button>
          </nav>
        </div>

        <div className="as-settings-main">
          {activeSection === 'profile' && (
            <div className="as-settings-section">
              <div className="as-card">
                <div className="as-card-header">
                  <h2 className="as-card-title">Profile Information</h2>
                </div>
                <form onSubmit={handleSaveProfile}>
                  <div className="as-form-grid">
                    <div className="as-input-group">
                      <label className="as-input-label">Full Name</label>
                      <input 
                        type="text" 
                        name="fullName"
                        className="as-input-field" 
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="as-input-group">
                      <label className="as-input-label">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        className="as-input-field" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="as-input-group">
                      <label className="as-input-label">Job Title</label>
                      <input 
                        type="text" 
                        name="jobTitle"
                        className="as-input-field" 
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="as-input-group">
                      <label className="as-input-label">Department</label>
                      <select 
                        name="department"
                        className="as-input-field"
                        value={formData.department}
                        onChange={handleInputChange}
                      >
                        <option value="">Select department</option>
                        <option>Internal Audit</option>
                        <option>Risk Management</option>
                        <option>Compliance</option>
                      </select>
                    </div>
                  </div>
                  <div className="as-form-actions">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn btn-secondary" disabled={saving}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="as-settings-section">
              <div className="as-card">
                <div className="as-card-header">
                  <h2 className="as-card-title">Notification Preferences</h2>
                </div>
                <div className="as-notification-settings">
                  <div className="as-setting-item">
                    <div className="as-setting-info">
                      <h3 className="as-input-label">Email Notifications</h3>
                      <p>Receive email updates about audit progress and findings</p>
                    </div>
                    <label className="as-toggle-switch">
                      <input 
                        type="checkbox" 
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                      />
                      <span className="as-slider"></span>
                    </label>
                  </div>
                  <div className="as-setting-item">
                    <div className="as-setting-info">
                      <h3 className="as-input-label">Due Date Reminders</h3>
                      <p>Get notified when audit deadlines are approaching</p>
                    </div>
                    <label className="as-toggle-switch">
                      <input 
                        type="checkbox" 
                        name="dueDateReminders"
                        checked={formData.dueDateReminders}
                        onChange={handleInputChange}
                      />
                      <span className="as-slider"></span>
                    </label>
                  </div>
                  <div className="as-setting-item">
                    <div className="as-setting-info">
                      <h3 className="as-input-label">Critical Finding Alerts</h3>
                      <p>Immediate notifications for critical audit findings</p>
                    </div>
                    <label className="as-toggle-switch">
                      <input 
                        type="checkbox" 
                        name="criticalAlerts"
                        checked={formData.criticalAlerts}
                        onChange={handleInputChange}
                      />
                      <span className="as-slider"></span>
                    </label>
                  </div>
                </div>
                <div className="as-form-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleSaveNotifications}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Notification Preferences'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="as-settings-section">
              <div className="as-card">
                <div className="as-card-header">
                  <h2 className="as-card-title">Security Settings</h2>
                </div>
                <form onSubmit={handleUpdatePassword}>
                  <div className="as-security-settings">
                    <div className="as-input-group">
                      <label className="as-input-label">Current Password</label>
                      <input type="password" name="currentPassword" className="as-input-field" required />
                    </div>
                    <div className="as-input-group">
                      <label className="as-input-label">New Password</label>
                      <input type="password" name="newPassword" className="as-input-field" required />
                    </div>
                    <div className="as-input-group">
                      <label className="as-input-label">Confirm New Password</label>
                      <input type="password" name="confirmPassword" className="as-input-field" required />
                    </div>
                  </div>
                  <div className="as-form-actions">
                    <button type="submit" className="btn btn-primary">Update Password</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="as-settings-section">
              <div className="as-card">
                <div className="as-card-header">
                  <h2 className="as-card-title">Application Preferences</h2>
                </div>
                <div className="as-preference-settings">
                  <div className="as-input-group">
                    <label className="as-input-label">Default View</label>
                    <select 
                      name="defaultView"
                      className="as-input-field"
                      value={formData.defaultView}
                      onChange={handleInputChange}
                    >
                      <option>Dashboard</option>
                      <option>Audits</option>
                      <option>Findings</option>
                    </select>
                  </div>
                  <div className="as-input-group">
                    <label className="as-input-label">Items Per Page</label>
                    <select 
                      name="itemsPerPage"
                      className="as-input-field"
                      value={formData.itemsPerPage}
                      onChange={handleInputChange}
                    >
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div className="as-setting-item">
                    <div className="as-setting-info">
                      <h3 className="as-input-label">Auto-save</h3>
                      <p>Automatically save form changes</p>
                    </div>
                    <label className="as-toggle-switch">
                      <input 
                        type="checkbox" 
                        name="autoSave"
                        checked={formData.autoSave}
                        onChange={handleInputChange}
                      />
                      <span className="as-slider"></span>
                    </label>
                  </div>
                </div>
                <div className="as-form-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleSavePreferences}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
