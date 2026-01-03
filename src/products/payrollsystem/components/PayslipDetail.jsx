import { usePayroll } from '../contexts/PayrollContext'
import '../styles/PayslipDetail.css'
import { 
  XMarkIcon, 
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

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

const PayslipDetail = ({ payslip, onClose }) => {
  const { employees, settings, formatCurrency } = usePayroll()
  const employee = employees.find(emp => emp.id === payslip.employeeId)

  if (!employee) return null

  const handleDownload = async () => {
    try {
      // Show loading indicator
      const downloadButton = document.querySelector('.payslip-detail-btn.download span')
      const originalText = downloadButton.textContent
      downloadButton.textContent = 'Generating...'
      
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
      
      // Reset button text
      downloadButton.textContent = originalText
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  return (
    <div className="payslip-detail">
      <div className="payslip-detail-header">
        <div className="payslip-detail-header-info">
          <h1>Payslip Details</h1>
          <p>{employee.name} - {payslip.month}</p>
        </div>
        <div className="payslip-detail-actions">
          <button
            onClick={handleDownload}
            className="payslip-detail-btn download"
          >
            <ArrowDownTrayIcon />
            <span>Download</span>
          </button>
          <button
            onClick={onClose}
            className="payslip-detail-btn close"
          >
            <XMarkIcon />
          </button>
        </div>
      </div>

      {/* Payslip Document */}
      <div className="payslip-document">
        {/* Header */}
        <div className="payslip-document-header">
          <div className="payslip-document-header-content">
            <div className="payslip-company-info">
              <h2>{settings.companyName}</h2>
              <p>{settings.companyAddress}</p>
            </div>
            <div className="payslip-document-info">
              <h3>PAYSLIP</h3>
              <p>Pay Period: {payslip.month}</p>
              <p>Generated: {payslip.generatedDate}</p>
            </div>
          </div>
        </div>

        {/* Employee Info */}
        <div className="payslip-employee-section">
          <div className="payslip-employee-grid">
            <div>
              <h4 className="payslip-section-title">Employee Information</h4>
              <div className="payslip-info-list">
                <div className="payslip-info-row">
                  <span className="label">Name:</span>
                  <span className="value">{employee.name}</span>
                </div>
                <div className="payslip-info-row">
                  <span className="label">Email:</span>
                  <span className="value">{employee.email}</span>
                </div>
                <div className="payslip-info-row">
                  <span className="label">Position:</span>
                  <span className="value">{employee.position}</span>
                </div>
                <div className="payslip-info-row">
                  <span className="label">Department:</span>
                  <span className="value">{employee.department}</span>
                </div>
                <div className="payslip-info-row">
                  <span className="label">Join Date:</span>
                  <span className="value">{employee.joinDate}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="payslip-section-title">Payment Information</h4>
              <div className="payslip-info-list">
                <div className="payslip-info-row">
                  <span className="label">Payslip ID:</span>
                  <span className="value">PS-{payslip.id}</span>
                </div>
                <div className="payslip-info-row">
                  <span className="label">Pay Period:</span>
                  <span className="value">{payslip.month}</span>
                </div>
                <div className="payslip-info-row">
                  <span className="label">Generated Date:</span>
                  <span className="value">{payslip.generatedDate}</span>
                </div>
                <div className="payslip-info-row">
                  <span className="label">Status:</span>
                  <span className="payslip-status-badge">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="payslip-salary-section">
          <div className="payslip-salary-grid">
            {/* Earnings */}
            <div className="payslip-earnings">
              <div className="payslip-section-header-green">
                Earnings
              </div>
              <div className="payslip-breakdown-list">
                <div className="payslip-breakdown-item">
                  <span className="label">Base Salary</span>
                  <span className="value">{formatCurrency(payslip.baseSalary)}</span>
                </div>
                <div className="payslip-breakdown-item">
                  <span className="label">Allowances</span>
                  <span className="value earnings">{formatCurrency(payslip.allowances)}</span>
                </div>
                <div className="payslip-breakdown-total green">
                  <div className="payslip-breakdown-item">
                    <span className="label">Gross Salary</span>
                    <span className="value earnings" style={{color: "#166534", marginLeft: "4rem"}}>
                      {formatCurrency(payslip.baseSalary + payslip.allowances)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="payslip-deductions">
              <div className="payslip-section-header-red">
                Deductions
              </div>
              <div className="payslip-breakdown-list">
                <div className="payslip-breakdown-item">
                  <span className="label">Tax (15%)</span>
                  <span className="value">
                    {formatCurrency(Math.round((payslip.baseSalary + payslip.allowances) * 0.15))}
                  </span>
                </div>
                <div className="payslip-breakdown-item">
                  <span className="label">Health Insurance</span>
                  <span className="value">{formatCurrency(settings.healthInsurance)}</span>
                </div>
                <div className="payslip-breakdown-item">
                  <span className="label">Other Deductions</span>
                  <span className="value">
                    {formatCurrency(payslip.deductions - Math.round((payslip.baseSalary + payslip.allowances) * 0.15) - settings.healthInsurance)}
                  </span>
                </div>
                <div className="payslip-breakdown-total red">
                  <div className="payslip-breakdown-item">
                    <span className="label">Total Deductions</span>
                    <span className="value deductions" style={{marginLeft: "3rem"}}>
                      {formatCurrency(payslip.deductions)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="payslip-net-salary">
            <h3>Net Salary</h3>
            <p className="amount">{formatCurrency(payslip.netSalary)}</p>
            <p className="breakdown">
                Gross: {formatCurrency(payslip.baseSalary + payslip.allowances)} - 
                Deductions: {formatCurrency(payslip.deductions)}
            </p>
          </div>

          {/* Footer */}
          <div className="payslip-footer">
            <p>This is a computer-generated payslip and does not require a signature.</p>
            <p>© 2024 {settings.companyName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayslipDetail