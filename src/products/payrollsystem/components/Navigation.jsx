import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import '../styles/Navigation.css'

const Navigation = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, color: 'from-zoho-blue to-blue-600' },
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, color: 'from-zoho-blue to-blue-600' },
    { id: 'employees', label: 'Employees', icon: UsersIcon, color: 'from-zoho-green to-green-600' },
    { id: 'payroll', label: 'Payroll', icon: CurrencyDollarIcon, color: 'from-zoho-red to-red-600' },
    { id: 'payslips', label: 'Payslips', icon: DocumentTextIcon, color: 'from-zoho-yellow to-yellow-600' },
    { id: 'reports', label: 'Reports', icon: ChartBarIcon, color: 'from-zoho-purple to-purple-600' },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, color: 'from-zoho-orange to-orange-600' }
  ]

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <span>Payroll Hub</span>
        </div>

        <div className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                onClick={() => {
                  if (item.id === 'home') {
                    navigate('/')
                  } else {
                    setActiveTab(item.id)
                  }
                }}
                className={activeTab === item.id ? 'active' : ''}
                href="#"
              >
                {item.label}
              </a>
            )
          })}
        </div>

        <div className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navigation