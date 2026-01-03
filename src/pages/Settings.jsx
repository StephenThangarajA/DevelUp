import React, { useState } from 'react';
import { FaBell, FaLock, FaPalette } from 'react-icons/fa';
import '../styles/pages/Settings.css';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('notifications');

    const tabs = [
        { id: 'notifications', label: 'Notifications', icon: FaBell },
        { id: 'security', label: 'Security', icon: FaLock },
        { id: 'appearance', label: 'Appearance', icon: FaPalette }
    ];

    const renderNotificationsSection = () => (
        <div className="settings-section">
            <div className="section-header">
                <h3>Notification Preferences</h3>
            </div>
            <div className="notification-settings">
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>Email Notifications</h4>
                        <p>Receive notifications via email</p>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>SMS Notifications</h4>
                        <p>Receive notifications via SMS</p>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>Marketing Emails</h4>
                        <p>Receive promotional and marketing emails</p>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>Security Alerts</h4>
                        <p>Receive security-related notifications</p>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderSecuritySection = () => (
        <div className="settings-section">
            <div className="section-header">
                <h3>Security Settings</h3>
            </div>
            <div className="security-settings">
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="security-btn">
                        <FaLock /> Enable 2FA
                    </button>
                </div>
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>Change Password</h4>
                        <p>Update your account password</p>
                    </div>
                    <button className="security-btn">
                        <FaLock /> Change Password
                    </button>
                </div>
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>Login History</h4>
                        <p>View recent login activity</p>
                    </div>
                    <button className="security-btn">
                        <FaLock /> View History
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAppearanceSection = () => (
        <div className="settings-section">
            <div className="section-header">
                <h3>Appearance Settings</h3>
            </div>
            <div className="appearance-settings">
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>Theme</h4>
                        <p>Choose your preferred theme</p>
                    </div>
                    <select className="theme-select">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <div className="setting-item">
                    <div className="setting-info">
                        <h4>Language</h4>
                        <p>Select your preferred language</p>
                    </div>
                    <select className="language-select">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'notifications':
                return renderNotificationsSection();
            case 'security':
                return renderSecuritySection();
            case 'appearance':
                return renderAppearanceSection();
            default:
                return renderNotificationsSection();
        }
    };

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Settings</h1>
                    <p>Manage your account preferences and settings</p>
                </div>
            </section>

            <section className="settings-page">
                <div className="container">
                    <div className="settings-layout">
                        <div className="settings-sidebar">
                            <div className="sidebar-nav">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            <Icon />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="settings-content">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}