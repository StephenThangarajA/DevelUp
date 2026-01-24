import { useVendor } from '../contexts/VendorContext'
import {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
  BellAlertIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

const Dashboard = ({ setActiveTab }) => {
  const { vendors, tools, budgets } = useVendor()

  const totalVendors = vendors.length
  const activeTools = tools.length
  const totalMonthlySpend = vendors.reduce((sum, v) => sum + v.monthlySpend, 0)
  const budgetUtilization = Math.round((totalMonthlySpend / budgets.totalMonthlyLimit) * 100)

  const stats = [
    {
      title: 'Total Vendors',
      value: totalVendors,
      icon: BuildingOfficeIcon,
      type: 'blue'
    },
    {
      title: 'Active Tools',
      value: activeTools,
      icon: WrenchScrewdriverIcon,
      type: 'green'
    },
    {
      title: 'Monthly Spend',
      value: `$${totalMonthlySpend.toLocaleString()}`,
      icon: BanknotesIcon,
      type: 'red'
    },
    {
      title: 'Budget Used',
      value: `${budgetUtilization}%`,
      icon: ArrowTrendingUpIcon,
      type: 'yellow'
    }
  ]

  return (
    <div className="vs-dashboard">
      <header className="vs-dashboard-header">
        <div className="vs-header-content">
          <h1 className="vs-heading">Startup Vendor Dashboard</h1>
          <p className="vs-subheading">Track and manage your company's software stack and operational costs.</p>
        </div>
      </header>

      <div className="vs-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`vs-stat-card ${stat.type}`}>
              <div className="vs-stat-info">
                <span className="vs-stat-title">{stat.title}</span>
                <span className="vs-stat-value">{stat.value}</span>
              </div>
              <div className="vs-stat-icon">
                <Icon className="vs-icon-md" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="vs-dashboard-main">
        <section className="vs-card">
          <div className="vs-card-header">
            <h2 className="vs-card-title">Upcoming Renewals</h2>
            <button
              className="vs-btn-text"
              onClick={() => setActiveTab('renewals')}
            >
              View All
            </button>
          </div>
          <div className="vs-table-container">
            <table className="vs-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Renewal Date</th>
                  <th>Monthly Spend</th>
                </tr>
              </thead>
              <tbody>
                {vendors.slice(0, 3).map(vendor => (
                  <tr key={vendor.id}>
                    <td>{vendor.name}</td>
                    <td><span className="vs-badge">{vendor.category}</span></td>
                    <td>{vendor.renewalDate}</td>
                    <td>${vendor.monthlySpend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="vs-card">
          <div className="vs-card-header">
            <h2 className="vs-card-title">Budget Allocation</h2>
          </div>
          <div className="vs-budget-list">
            {Object.entries(budgets.categories).map(([category, limit]) => {
              const spent = vendors.filter(v => v.category === category).reduce((sum, v) => sum + v.monthlySpend, 0)
              const percent = Math.round((spent / limit) * 100)
              return (
                <div key={category} className="vs-budget-item">
                  <div className="vs-budget-info">
                    <span>{category}</span>
                    <span>${spent} / ${limit}</span>
                  </div>
                  <div className="vs-progress-bar">
                    <div
                      className={`vs-progress-fill ${percent > 90 ? 'danger' : percent > 70 ? 'warning' : 'success'}`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
