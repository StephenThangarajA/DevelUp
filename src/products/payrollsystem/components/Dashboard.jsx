import { usePayroll } from '../contexts/PayrollContext'
import '../styles/Dashboard.css'
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

const Dashboard = () => {
  const { employees, payslips, formatCurrency } = usePayroll()

  const totalEmployees = employees.length
  const activeEmployees = employees.filter(emp => emp.status === 'active').length
  const totalPayroll = employees.reduce((sum, emp) => sum + emp.baseSalary + emp.allowances - emp.deductions, 0)
  const totalPayslips = payslips.length

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: UsersIcon,
      color: 'from-zoho-red to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Monthly Payroll',
      value: formatCurrency(totalPayroll),
      icon: CurrencyDollarIcon,
      color: 'from-zoho-red to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Generated Payslips',
      value: totalPayslips,
      icon: DocumentTextIcon,
      color: 'from-zoho-red to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      icon: ArrowTrendingUpIcon,
      color: 'from-zoho-red to-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  const recentPayslips = payslips.slice(0, 5)

  return (
    <div className="pay-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome to PayrollPro
        </h1>
        <p className="dashboard-subtitle">
          Manage your payroll efficiently with our comprehensive dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className={`stat-card ${stat.color.includes('green') ? 'green' : stat.color.includes('red') ? 'red' : stat.color.includes('yellow') ? 'yellow' : 'blue'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="stat-card-content">
                <div className="stat-card-info">
                  <h3 className="stat-card-title">{stat.title}</h3>
                  <p className="stat-card-value">{stat.value}</p>
                </div>
                <div className={`stat-card-icon ${stat.color.includes('green') ? 'green' : stat.color.includes('red') ? 'red' : stat.color.includes('yellow') ? 'yellow' : 'blue'}`}>
                  <Icon />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="dashboard-content">
        {/* Recent Employees */}
        <div className="dashboard-section">
          <h3>Recent Employees</h3>
          <div className="dashboard-list">
            {employees.slice(0, 5).map((employee) => (
              <div key={employee.id} className="dashboard-list-item">
                <div className="dashboard-avatar">
                  <span>
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="dashboard-list-info">
                  <h4>{employee.name}</h4>
                  <p>{employee.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payslips */}
        <div className="dashboard-section">
          <h3>Recent Payslips</h3>
          <div className="dashboard-list">
            {recentPayslips.map((payslip) => {
              const employee = employees.find(emp => emp.id === payslip.employeeId)
              return (
                <div key={payslip.id} className="dashboard-payslip-item">
                  <div className="dashboard-list-info">
                    <h4>{employee?.name}</h4>
                    <p>{payslip.month}</p>
                  </div>
                  <span className="dashboard-payslip-amount">
                    {formatCurrency(payslip.netSalary)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard