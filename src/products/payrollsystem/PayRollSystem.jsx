import { useEffect, useState } from 'react'
import './styles/PayRollSystem.css'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import Employees from './components/Employees'
import Payroll from './components/Payroll'
import Payslips from './components/Payslips'
import Reports from './components/Reports'
import Settings from './components/Settings'
import { PayrollProvider } from './contexts/PayrollContext'

function PayRollSystem() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [authorized, setAuthorized] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('userRole')
    if (!token || role !== 'STARTUP_ADMIN') {
      setAuthorized(false)
      window.location.href = '/login'
    }
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'employees':
        return <Employees />
      case 'payroll':
        return <Payroll />
      case 'payslips':
        return <Payslips />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  if (!authorized) return null
  return (
    <PayrollProvider>
      <div className="app">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="app-main">
          <div className="app-container">
            {renderContent()}
          </div>
        </main>
      </div>
    </PayrollProvider>
  )
}

export default PayRollSystem
