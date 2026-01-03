import { usePayroll } from '../contexts/PayrollContext'
import '../styles/Reports.css'
import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import * as XLSX from 'xlsx'

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: '2 solid #e62929'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: '#666666'
  },
  date: {
    fontSize: 10,
    color: '#999999',
    marginTop: 5
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1 solid #cccccc'
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  metricCard: {
    width: '48%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    border: '1 solid #dddddd'
  },
  metricLabel: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 3
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e62929'
  },
  table: {
    marginTop: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #eeeeee',
    paddingVertical: 8
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderBottom: '2 solid #cccccc'
  },
  tableCell: {
    fontSize: 9,
    color: '#333333'
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a'
  },
  col1: { width: '40%' },
  col2: { width: '30%' },
  col3: { width: '30%' }
})

// PDF Document Component
const ReportPDFDocument = ({
  employees,
  payslips,
  totalEmployees,
  activeEmployees,
  totalPayroll,
  averageSalary,
  departmentStats,
  salaryRanges,
  formatCurrency
}) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>Payroll Report Summary</Text>
        <Text style={pdfStyles.subtitle}>Comprehensive payroll insights and statistics</Text>
        <Text style={pdfStyles.date}>Generated: {new Date().toLocaleDateString()}</Text>
      </View>

      {/* Key Metrics */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Key Metrics</Text>
        <View style={pdfStyles.metricsGrid}>
          <View style={pdfStyles.metricCard}>
            <Text style={pdfStyles.metricLabel}>Total Employees</Text>
            <Text style={pdfStyles.metricValue}>{totalEmployees}</Text>
          </View>
          <View style={pdfStyles.metricCard}>
            <Text style={pdfStyles.metricLabel}>Active Employees</Text>
            <Text style={pdfStyles.metricValue}>{activeEmployees}</Text>
          </View>
          <View style={pdfStyles.metricCard}>
            <Text style={pdfStyles.metricLabel}>Total Payroll</Text>
            <Text style={pdfStyles.metricValue}>{formatCurrency(totalPayroll)}</Text>
          </View>
          <View style={pdfStyles.metricCard}>
            <Text style={pdfStyles.metricLabel}>Average Salary</Text>
            <Text style={pdfStyles.metricValue}>{formatCurrency(Math.round(averageSalary))}</Text>
          </View>
        </View>
      </View>

      {/* Department Breakdown */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Department Breakdown</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableHeader}>
            <Text style={[pdfStyles.tableHeaderCell, pdfStyles.col1]}>Department</Text>
            <Text style={[pdfStyles.tableHeaderCell, pdfStyles.col2]}>Employees</Text>
            <Text style={[pdfStyles.tableHeaderCell, pdfStyles.col3]}>Total Salary</Text>
          </View>
          {Object.entries(departmentStats).map(([dept, stats]) => (
            <View key={dept} style={pdfStyles.tableRow}>
              <Text style={[pdfStyles.tableCell, pdfStyles.col1]}>{dept}</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.col2]}>{stats.count}</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.col3]}>{formatCurrency(stats.totalSalary)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Salary Distribution */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Salary Distribution</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableHeader}>
            <Text style={[pdfStyles.tableHeaderCell, pdfStyles.col1]}>Range</Text>
            <Text style={[pdfStyles.tableHeaderCell, pdfStyles.col2]}>Count</Text>
            <Text style={[pdfStyles.tableHeaderCell, pdfStyles.col3]}></Text>
          </View>
          {Object.entries(salaryRanges).map(([range, count]) => (
            <View key={range} style={pdfStyles.tableRow}>
              <Text style={[pdfStyles.tableCell, pdfStyles.col1]}>{range}</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.col2]}>{count} employees</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.col3]}></Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
)

const Reports = () => {
  const { employees, payslips, formatCurrency } = usePayroll()

  // Calculate statistics
  const totalEmployees = employees.length
  const activeEmployees = employees.filter(emp => emp.status === 'active').length
  const totalPayroll = payslips.reduce((sum, payslip) => sum + payslip.netSalary, 0)
  const averageSalary = totalPayroll / (payslips.length || 1)

  // Department breakdown
  const departmentStats = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { count: 0, totalSalary: 0 }
    }
    acc[emp.department].count++
    acc[emp.department].totalSalary += emp.baseSalary + emp.allowances - emp.deductions
    return acc
  }, {})

  // Salary ranges
  const salaryRanges = {
    'Under $50k': 0,
    '$50k - $75k': 0,
    '$75k - $100k': 0,
    'Over $100k': 0
  }

  employees.forEach(emp => {
    const netSalary = emp.baseSalary + emp.allowances - emp.deductions
    if (netSalary < 50000) salaryRanges['Under $50k']++
    else if (netSalary < 75000) salaryRanges['$50k - $75k']++
    else if (netSalary < 100000) salaryRanges['$75k - $100k']++
    else salaryRanges['Over $100k']++
  })

  // Monthly payroll trend from payslips
  const monthlyTotals = payslips.reduce((acc, slip) => {
    acc[slip.month] = (acc[slip.month] || 0) + slip.netSalary
    return acc
  }, {})
  const uniqueMonths = [...new Set(payslips.map(p => p.month))]
  const monthlyTrend = uniqueMonths.map(m => ({ month: m, amount: monthlyTotals[m] }))

  const exportReport = async (type) => {
    try {
      if (type === 'PDF') {
        await exportToPDF()
      } else if (type === 'Excel') {
        exportToExcel()
      }
    } catch (error) {
      console.error(`Error exporting ${type}:`, error)
      alert(`Failed to export ${type}. Please try again.`)
    }
  }

  const exportToPDF = async () => {
    try {
      const doc = <ReportPDFDocument
        employees={employees}
        payslips={payslips}
        totalEmployees={totalEmployees}
        activeEmployees={activeEmployees}
        totalPayroll={totalPayroll}
        averageSalary={averageSalary}
        departmentStats={departmentStats}
        salaryRanges={salaryRanges}
        formatCurrency={formatCurrency}
      />

      const blob = await pdf(doc).toBlob()

      const fileName = `Payroll_Report_${new Date().toISOString().split('T')[0]}.pdf`
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error
    }
  }

  const exportToExcel = () => {
    // Create workbook
    const wb = XLSX.utils.book_new()

    // Sheet 1: Summary Data
    const summaryData = [
      ['Payroll Report Summary'],
      ['Generated Date', new Date().toLocaleDateString()],
      [''],
      ['Key Metrics', ''],
      ['Total Employees', totalEmployees],
      ['Active Employees', activeEmployees],
      ['Total Payroll', totalPayroll],
      ['Average Salary', averageSalary],
      [''],
      ['Department Breakdown', ''],
      ['Department', 'Employees', 'Total Salary']
    ]

    Object.entries(departmentStats).forEach(([dept, stats]) => {
      summaryData.push([dept, stats.count, stats.totalSalary])
    })

    summaryData.push([''])
    summaryData.push(['Salary Distribution', '', ''])
    summaryData.push(['Range', 'Count', ''])

    Object.entries(salaryRanges).forEach(([range, count]) => {
      summaryData.push([range, count, ''])
    })

    const ws1 = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(wb, ws1, 'Summary')

    // Sheet 2: Employee Details
    const employeeData = [
      ['Name', 'Department', 'Position', 'Status', 'Base Salary', 'Allowances', 'Deductions', 'Net Salary']
    ]
    employees.forEach(emp => {
      const netSalary = emp.baseSalary + emp.allowances - emp.deductions
      employeeData.push([
        emp.name,
        emp.department,
        emp.position,
        emp.status,
        emp.baseSalary,
        emp.allowances,
        emp.deductions,
        netSalary
      ])
    })

    const ws2 = XLSX.utils.aoa_to_sheet(employeeData)
    XLSX.utils.book_append_sheet(wb, ws2, 'Employees')

    // Sheet 3: Payslip Details
    const payslipData = [
      ['Employee', 'Month', 'Gross Salary', 'Deductions', 'Net Salary', 'Generated Date']
    ]
    payslips.forEach(payslip => {
      const employee = employees.find(emp => emp.id === payslip.employeeId)
      const grossSalary = payslip.baseSalary + payslip.allowances
      payslipData.push([
        employee?.name || 'Unknown',
        payslip.month,
        grossSalary,
        payslip.deductions,
        payslip.netSalary,
        payslip.generatedDate
      ])
    })

    const ws3 = XLSX.utils.aoa_to_sheet(payslipData)
    XLSX.utils.book_append_sheet(wb, ws3, 'Payslips')

    // Save file
    const fileName = `Payroll_Report_${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(wb, fileName)
  }

  const colorClasses = ['from-zoho-red to-red-600', 'from-zoho-blue to-blue-600', 'from-zoho-green to-green-600', 'from-zoho-yellow to-yellow-600', 'from-zoho-purple to-purple-600']

  return (
    <div className="reports">
      {/* Header */}
      <div className="reports-header">
        <div className="reports-header-info">
          <h1>Reports & Analytics</h1>
          <p>Comprehensive payroll insights and statistics</p>
        </div>
        <div className="reports-actions">
          <button
            onClick={() => exportReport('PDF')}
            className="reports-export-btn pdf"
          >
            <ArrowDownTrayIcon />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => exportReport('Excel')}
            className="reports-export-btn excel"
          >
            <ArrowDownTrayIcon />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="reports-metrics">
        {[
          { title: 'Total Employees', value: totalEmployees, icon: UsersIcon, color: 'from-zoho-red to-red-600', bg: 'bg-red-50' },
          { title: 'Active Employees', value: activeEmployees, icon: ArrowTrendingUpIcon, color: 'from-zoho-red to-red-600', bg: 'bg-red-50' },
          { title: 'Total Payroll', value: formatCurrency(totalPayroll), icon: CurrencyDollarIcon, color: 'from-zoho-red to-red-600', bg: 'bg-red-50' },
          { title: 'Average Salary', value: formatCurrency(Math.round(averageSalary)), icon: ChartBarIcon, color: 'from-zoho-red to-red-600', bg: 'bg-red-50' }
        ].map((metric, index) => {
          const Icon = metric.icon
          return (
            <div
              key={index}
              className={`reports-metric-card ${metric.color.includes('blue') ? 'blue' : metric.color.includes('green') ? 'green' : metric.color.includes('red') ? 'red' : 'yellow'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="reports-metric-content">
                <div className="reports-metric-info">
                  <h3>{metric.title}</h3>
                  <p>{metric.value}</p>
                </div>
                <div className={`reports-metric-icon ${metric.color.includes('blue') ? 'blue' : metric.color.includes('green') ? 'green' : metric.color.includes('red') ? 'red' : 'yellow'}`}>
                  <Icon />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="reports-charts">
        {/* Department Breakdown */}
        <div className="reports-chart-card">
          <h3>Department Breakdown</h3>
          <div className="reports-chart-list">
            {Object.entries(departmentStats).map(([dept, stats], index) => (
              <div key={dept} className="reports-chart-item">
                <div className="reports-chart-header">
                  <span className="label">{dept}</span>
                  <span className="value">
                    {stats.count} employees - {formatCurrency(stats.totalSalary)}
                  </span>
                </div>
                <div className="reports-chart-bar">
                  <div
                    className={`reports-chart-fill red`}
                    style={{ width: `${(stats.count / totalEmployees) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Distribution */}
        <div className="reports-chart-card">
          <h3>Salary Distribution</h3>
          <div className="reports-chart-list">
            {Object.entries(salaryRanges).map(([range, count], index) => (
              <div key={range} className="reports-chart-item">
                <div className="reports-chart-header">
                  <span className="label">{range}</span>
                  <span className="value">{count} employees</span>
                </div>
                <div className="reports-chart-bar">
                  <div
                    className={`reports-chart-fill red`}
                    style={{ width: `${totalEmployees ? (count / totalEmployees) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="reports-trend">
        <h3>Monthly Payroll Trend</h3>
        <div className="reports-trend-list">
          {monthlyTrend.map((month, index) => {
            const maxAmount = Math.max(...monthlyTrend.map(m => m.amount))
            return (
              <div key={month.month} className="reports-trend-item">
                <div className="reports-trend-header">
                  <span className="month">{month.month}</span>
                  <span className="amount">{formatCurrency(month.amount)}</span>
                </div>
                <div className="reports-trend-bar">
                  <div
                    className="reports-trend-fill"
                    style={{
                      width: `${(month.amount / maxAmount) * 100}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="reports-activity">
        <h3>Recent Payslip Activity</h3>
        <div className="reports-activity-list">
          {payslips.slice(-5).reverse().map((payslip) => {
            const employee = employees.find(emp => emp.id === payslip.employeeId)
            return (
              <div key={payslip.id} className="reports-activity-item">
                <div className="reports-activity-content">
                  <div className="reports-activity-avatar">
                    <span>
                      {employee?.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="reports-activity-info">
                    <h4>{employee?.name}</h4>
                    <p>{payslip.month} - {formatCurrency(payslip.netSalary)}</p>
                  </div>
                </div>
                <span className="reports-activity-date">{payslip.generatedDate}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Reports
