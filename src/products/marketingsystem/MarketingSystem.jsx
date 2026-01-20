import { useState } from 'react'
import './styles/MarketingSystem.css'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import BrandFoundation from './components/BrandFoundation'
import ContentPlanning from './components/ContentPlanning'
import BusinessAnalyst from './components/BusinessAnalyst'
import EmailAutomation from './components/EmailAutomation'
import { MarketingProvider, useMarketing } from './contexts/MarketingContext'

function MarketingContent({ activeTab }) {
    const { loading } = useMarketing()

    if (loading) {
        return (
            <div className="ms-loading-container" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '60vh',
                flexDirection: 'column',
                gap: '1rem',
                color: '#64748b'
            }}>
                <div className="ms-spinner" style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f1f5f9',
                    borderTop: '4px solid #dc2626',
                    borderRadius: '50%',
                    animation: 'ms-spin 1s linear infinite'
                }}></div>
                <p>Loading Marketing Data...</p>
                <style>{`
                    @keyframes ms-spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }

    switch (activeTab) {
        case 'dashboard':
            return <Dashboard />
        case 'brand':
            return <BrandFoundation />
        case 'content':
            return <ContentPlanning />
        case 'analyst':
            return <BusinessAnalyst />
        case 'email':
            return <EmailAutomation />
        default:
            return <Dashboard />
    }
}

function MarketingSystem() {
    const [activeTab, setActiveTab] = useState('dashboard')

    return (
        <MarketingProvider>
            <div className="ms-marketing-app">
                <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="ms-marketing-main">
                    <div className="ms-marketing-container">
                        <MarketingContent activeTab={activeTab} />
                    </div>
                </main>
            </div>
        </MarketingProvider>
    )
}

export default MarketingSystem
