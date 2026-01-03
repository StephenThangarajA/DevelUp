import { useState } from 'react'
import { usePayroll } from '../contexts/PayrollContext'
import PayslipDetail from './PayslipDetail'
import '../styles/Payslips.css'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import { 
  DocumentTextIcon, 
  EyeIcon, 
  ArrowDownTrayIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline'

// PDF Styles
const payslipPdfStyles = StyleSheet.create({
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
  companyInfo: {
    marginBottom: 10
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5
  },
  companyAddress: {
    fontSize: 10,
    color: '#666666'
  },
  payslipTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e62929',
    marginBottom: 5
  },
  infoRow: {
    fontSize: 10,
    color: '#666666',
    marginTop: 3
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1 solid #cccccc'
  },
  grid: {
    flexDirection: 'row',
    marginBottom: 20
  },
  gridItem: {
    width: '50%',
    paddingRight: 10
  },
  infoList: {
    marginTop: 5
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    fontSize: 9
  },
  label: {
    color: '#666666',
    fontWeight: 'normal'
  },
  value: {
    color: '#1a1a1a',
    fontWeight: 'bold'
  },
  earnings: {
    backgroundColor: '#f0fdf4',
    padding: 15,
    borderRadius: 5,
    marginRight: 10
  },
  deductions: {
    backgroundColor: '#fef2f2',
    padding: 15,
    borderRadius: 5
  },
  breakdownList: {
    marginTop: 10
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    fontSize: 9
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1 solid #cccccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 11,
    fontWeight: 'bold'
  },
  netSalary: {
    textAlign: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 5
  },
  netSalaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5
  },
  netSalaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e62929',
    marginBottom: 5
  },
  breakdownText: {
    fontSize: 9,
    color: '#666666'
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: '1 solid #cccccc',
    textAlign: 'center'
  },
  footerText: {
    fontSize: 8,
    color: '#999999',
    marginTop: 5
  }
})

// PDF Document Component
const PayslipPDFDocument = ({ payslip, employee, settings, formatCurrency }) => (
  <Document>
    <Page size="A4" style={payslipPdfStyles.page}>
      {/* Header */}
      <View style={payslipPdfStyles.header}>
        <View style={payslipPdfStyles.companyInfo}>
          <Text style={payslipPdfStyles.companyName}>{settings.companyName}</Text>
          <Text style={payslipPdfStyles.companyAddress}>{settings.companyAddress}</Text>
        </View>
        <Text style={payslipPdfStyles.payslipTitle}>PAYSLIP</Text>
        <Text style={payslipPdfStyles.infoRow}>Pay Period: {payslip.month}</Text>
        <Text style={payslipPdfStyles.infoRow}>Generated: {payslip.generatedDate}</Text>
      </View>

      {/* Employee Info */}
      <View style={payslipPdfStyles.section}>
        <View style={payslipPdfStyles.grid}>
          <View style={payslipPdfStyles.gridItem}>
            <Text style={payslipPdfStyles.sectionTitle}>Employee Information</Text>
            <View style={payslipPdfStyles.infoList}>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Name:</Text>
                <Text style={payslipPdfStyles.value}>{employee.name}</Text>
              </View>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Email:</Text>
                <Text style={payslipPdfStyles.value}>{employee.email}</Text>
              </View>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Position:</Text>
                <Text style={payslipPdfStyles.value}>{employee.position}</Text>
              </View>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Department:</Text>
                <Text style={payslipPdfStyles.value}>{employee.department}</Text>
              </View>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Join Date:</Text>
                <Text style={payslipPdfStyles.value}>{employee.joinDate}</Text>
              </View>
            </View>
          </View>

          <View style={payslipPdfStyles.gridItem}>
            <Text style={payslipPdfStyles.sectionTitle}>Payment Information</Text>
            <View style={payslipPdfStyles.infoList}>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Payslip ID:</Text>
                <Text style={payslipPdfStyles.value}>PS-{payslip.id}</Text>
              </View>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Pay Period:</Text>
                <Text style={payslipPdfStyles.value}>{payslip.month}</Text>
              </View>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Generated Date:</Text>
                <Text style={payslipPdfStyles.value}>{payslip.generatedDate}</Text>
              </View>
              <View style={payslipPdfStyles.infoItem}>
                <Text style={payslipPdfStyles.label}>Status:</Text>
                <Text style={payslipPdfStyles.value}>Paid</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Salary Breakdown */}
      <View style={payslipPdfStyles.section}>
        <View style={payslipPdfStyles.grid}>
          {/* Earnings */}
          <View style={payslipPdfStyles.earnings}>
            <Text style={payslipPdfStyles.sectionTitle}>Earnings</Text>
            <View style={payslipPdfStyles.breakdownList}>
              <View style={payslipPdfStyles.breakdownItem}>
                <Text style={payslipPdfStyles.label}>Base Salary</Text>
                <Text style={payslipPdfStyles.value}>{formatCurrency(payslip.baseSalary)}</Text>
              </View>
              <View style={payslipPdfStyles.breakdownItem}>
                <Text style={payslipPdfStyles.label}>Allowances</Text>
                <Text style={payslipPdfStyles.value}>{formatCurrency(payslip.allowances)}</Text>
              </View>
              <View style={payslipPdfStyles.totalRow}>
                <Text style={payslipPdfStyles.label}>Gross Salary</Text>
                <Text style={[payslipPdfStyles.value, { color: '#166534' }]}>
                  {formatCurrency(payslip.baseSalary + payslip.allowances)}
                </Text>
              </View>
            </View>
          </View>

          {/* Deductions */}
          <View style={payslipPdfStyles.deductions}>
            <Text style={payslipPdfStyles.sectionTitle}>Deductions</Text>
            <View style={payslipPdfStyles.breakdownList}>
              <View style={payslipPdfStyles.breakdownItem}>
                <Text style={payslipPdfStyles.label}>Tax (15%)</Text>
                <Text style={payslipPdfStyles.value}>
                  {formatCurrency(Math.round((payslip.baseSalary + payslip.allowances) * 0.15))}
                </Text>
              </View>
              <View style={payslipPdfStyles.breakdownItem}>
                <Text style={payslipPdfStyles.label}>Health Insurance</Text>
                <Text style={payslipPdfStyles.value}>{formatCurrency(settings.healthInsurance)}</Text>
              </View>
              <View style={payslipPdfStyles.breakdownItem}>
                <Text style={payslipPdfStyles.label}>Other Deductions</Text>
                <Text style={payslipPdfStyles.value}>
                  {formatCurrency(payslip.deductions - Math.round((payslip.baseSalary + payslip.allowances) * 0.15) - settings.healthInsurance)}
                </Text>
              </View>
              <View style={payslipPdfStyles.totalRow}>
                <Text style={payslipPdfStyles.label}>Total Deductions</Text>
                <Text style={[payslipPdfStyles.value, { color: '#dc2626' }]}>
                  {formatCurrency(payslip.deductions)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Net Salary */}
        <View style={payslipPdfStyles.netSalary}>
          <Text style={payslipPdfStyles.netSalaryTitle}>Net Salary</Text>
          <Text style={payslipPdfStyles.netSalaryAmount}>{formatCurrency(payslip.netSalary)}</Text>
          <Text style={payslipPdfStyles.breakdownText}>
            Gross: {formatCurrency(payslip.baseSalary + payslip.allowances)} - 
            Deductions: {formatCurrency(payslip.deductions)}
          </Text>
        </View>

        {/* Footer */}
        <View style={payslipPdfStyles.footer}>
          <Text style={payslipPdfStyles.footerText}>
            This is a computer-generated payslip and does not require a signature.
          </Text>
          <Text style={payslipPdfStyles.footerText}>
            © 2024 {settings.companyName}. All rights reserved.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
)

const Payslips = () => {
  const { payslips, employees, settings, formatCurrency } = usePayroll()
  const [selectedPayslip, setSelectedPayslip] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterMonth, setFilterMonth] = useState('')

  const months = [...new Set(payslips.map(p => p.month))].sort().reverse()

  const filteredPayslips = payslips.filter(payslip => {
    const employee = employees.find(emp => emp.id === payslip.employeeId)
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee?.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMonth = !filterMonth || payslip.month === filterMonth
    
    return matchesSearch && matchesMonth
  })

  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip)
  }

  const handleDownload = async (payslip) => {
    try {
      const employee = employees.find(emp => emp.id === payslip.employeeId)
      if (!employee) return

      const doc = <PayslipPDFDocument
        payslip={payslip}
        employee={employee}
        settings={settings}
        formatCurrency={formatCurrency}
      />
      
      const blob = await pdf(doc).toBlob()
      
      const fileName = `Payslip_${employee.name.replace(/\s+/g, '_')}_${payslip.month.replace(/\s+/g, '_')}.pdf`
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
      alert('Failed to generate PDF. Please try again.')
    }
  }

  if (selectedPayslip) {
    return <PayslipDetail payslip={selectedPayslip} onClose={() => setSelectedPayslip(null)} />
  }

  return (
    <div className="payslips">
      {/* Header */}
      <div className="payslips-header">
        <h1>Payslip Management</h1>
        <p>View and manage employee payslips</p>
      </div>

      {/* Filters */}
      <div className="payslips-filters">
        <div className="payslips-filters-grid">
          {/* Search */}
          <div className="payslips-search">
            <MagnifyingGlassIcon />
            <input
              type="text"
              placeholder="Search by employee name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Month Filter */}
          <div className="payslips-filter">
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="">All months</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Payslips Grid */}
      <div className="payslips-grid">
        {filteredPayslips.map((payslip, index) => {
          const employee = employees.find(emp => emp.id === payslip.employeeId)
          if (!employee) return null

          return (
            <div
              key={payslip.id}
              className="payslip-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="payslip-card-header">
                <div className="payslip-icon">
                  <DocumentTextIcon />
                </div>
                <span className="payslip-date">
                  {payslip.generatedDate}
                </span>
              </div>

              <div className="payslip-info">
                <div className="payslip-employee">
                  <h3>{employee.name}</h3>
                  <p>{employee.position}</p>
                </div>

                <div className="payslip-breakdown">
                  <div className="payslip-breakdown-row">
                    <span className="label">Base Salary:</span>
                    <span className="value">{formatCurrency(payslip.baseSalary)}</span>
                  </div>
                  <div className="payslip-breakdown-row">
                    <span className="label">Allowances:</span>
                    <span className="value allowances">+{formatCurrency(payslip.allowances)}</span>
                  </div>
                  <div className="payslip-breakdown-row">
                    <span className="label">Deductions:</span>
                    <span className="value deductions">-{formatCurrency(payslip.deductions)}</span>
                  </div>
                  <div className="payslip-breakdown-total">
                    <span className="label">Net Salary:</span>
                    <span className="value">{formatCurrency(payslip.netSalary)}</span>
                  </div>
                </div>

                <div className="payslip-month">
                  <span className="payslip-month-badge">
                    {payslip.month}
                  </span>
                </div>

                <div className="payslip-actions">
                  <button
                    onClick={() => handleViewPayslip(payslip)}
                    className="payslip-action-btn view"
                  >
                    <EyeIcon />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDownload(payslip)}
                    className="payslip-action-btn download"
                  >
                    <ArrowDownTrayIcon />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredPayslips.length === 0 && (
        <div className="payslips-empty">
          <DocumentTextIcon />
          <h3>No payslips found</h3>
          <p>Try adjusting your search or generate new payslips</p>
        </div>
      )}
    </div>
  )
}

export default Payslips