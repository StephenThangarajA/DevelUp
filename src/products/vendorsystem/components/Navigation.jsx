import { useNavigate } from 'react-router-dom'

const Navigation = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'tools', label: 'Tools' },
    { id: 'budget', label: 'Budget' },
    { id: 'renewals', label: 'Renewals' }
  ]

  return (
    <nav className="vs-navbar">
      <div className="vs-nav-container">
        <div className="vs-nav-left">
          <div className="vs-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span>Vendor Hub</span>
          </div>
        </div>
        <div className="vs-nav-links">
          {navItems.map((item) => {
            return (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (item.id === 'home') {
                    navigate('/')
                  } else {
                    setActiveTab(item.id)
                  }
                }}
                className={`vs-nav-link ${activeTab === item.id ? 'active' : ''}`}
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
