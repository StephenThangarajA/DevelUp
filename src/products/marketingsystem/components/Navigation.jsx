import { useNavigate } from 'react-router-dom'
import '../styles/Navigation.css'

const Navigation = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'brand', label: 'Brand Foundation' },
    { id: 'content', label: 'Content Planning' },
    { id: 'analyst', label: 'Business Analyst' },
    { id: 'email', label: 'Email Automation' }
  ]

  return (
    <nav className="ms-navbar">
      <div className="ms-container">
        <div className="ms-logo">
          <span>MarketGrow AI</span>
        </div>

        <div className="ms-nav-menu">
          {navItems.map((item) => {
            return (
              <a
                key={item.id}
                onClick={(e) => {
                  e.preventDefault()
                  if (item.id === 'home') {
                    navigate('/')
                  } else {
                    setActiveTab(item.id)
                  }
                }}
                className={activeTab === item.id ? 'ms-active' : ''}
                href="#"
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
