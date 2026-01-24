import { useState } from 'react'
import './styles/VendorSystem.css'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import VendorList from './components/VendorList'
import ToolList from './components/ToolList'
import BudgetTracking from './components/BudgetTracking'
import RenewalAlerts from './components/RenewalAlerts'
import { VendorProvider, useVendor } from './contexts/VendorContext'

function VendorSystemContent() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { loading } = useVendor()

  if (loading) {
    return (
      <div className="vs-loading">
        <div className="vs-spinner"></div>
        <p>Loading Vendor System...</p>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />
      case 'vendors':
        return <VendorList />
      case 'tools':
        return <ToolList />
      case 'budget':
        return <BudgetTracking />
      case 'renewals':
        return <RenewalAlerts />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="vs-app">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="vs-main">
        <div className="vs-container">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

function VendorSystem() {
  return (
    <VendorProvider>
      <VendorSystemContent />
    </VendorProvider>
  )
}

export default VendorSystem
