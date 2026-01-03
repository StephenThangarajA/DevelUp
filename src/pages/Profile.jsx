import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaBuilding, FaBriefcase } from 'react-icons/fa';
import '../styles/pages/Profile.css';

export default function Profile() {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        userType: '',
    });

    useEffect(() => {
        const userName = localStorage.getItem('userName') || '';
        const [firstName, lastName] = userName.split(' ');
        const email = localStorage.getItem('email') || '';
        const company = localStorage.getItem('company') || '';
        const userType = localStorage.getItem('userType') || '';

        setProfileData({
            firstName: firstName || '',
            lastName: lastName || '',
            email: email,
            company: company,
            userType: userType,
        });
    }, []);

    return (
        <div className="profile-page">
            <div className="container">
                <div className="page-header">
                    <h1>Profile</h1>
                    <p>Manage your personal information</p>
                </div>

                <div className="profile-content">
                    <div className="profile-section">
                        <div className="section-profile">
                            <h3>Profile Information</h3>
                        </div>
                        <div className="profile-form">
                            <div className="form-group">
                                <label>First Name</label>
                                <div className="input-with-icon">
                                    <FaUser style={{ color: 'var(--primary-red)' }} />
                                    <input type="text" value={profileData.firstName} disabled />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <div className="input-with-icon">
                                    <FaUser style={{ color: 'var(--primary-red)' }} />
                                    <input type="text" value={profileData.lastName} disabled />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <div className="input-with-icon">
                                    <FaEnvelope  style={{ color: 'var(--primary-red)' }} />
                                    <input type="email" value={profileData.email} disabled />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <div className="input-with-icon">
                                    <FaBuilding style={{ color: 'var(--primary-red)' }} />
                                    <input type="text" value={profileData.company} disabled />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>User Type</label>
                                <div className="input-with-icon">
                                    <FaBriefcase style={{ color: 'var(--primary-red)' }} />
                                    <input type="text" value={profileData.userType} disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}