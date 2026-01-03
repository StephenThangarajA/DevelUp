import { useState, useEffect } from 'react'
import { usePayroll } from '../contexts/PayrollContext'
import '../styles/Payroll.css'
import {
  PlayIcon,
  UserIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const Payroll = () => {
  const { employees, generatePayslip, formatCurrency } = usePayroll()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [processing, setProcessing] = useState(false)
  const [processedPayslips, setProcessedPayslips] = useState([])
  const [dateError, setDateError] = useState('')

  // Set max date to current date (to prevent future dates)
  const today = new Date()
  const maxDate = today.toISOString().split('T')[0]

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const selectAllEmployees = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(employees.map(emp => emp.id))
    }
  }

  // Handle date change and convert to month format
  const handleDateChange = (e) => {
    const date = new Date(e.target.value)
    setSelectedDate(e.target.value)

    // Validate date is not in the future
    if (date > today) {
      setDateError('Cannot select a future date')
      setSelectedMonth('')
      return
    }

    setDateError('')

    // Format date to "Month YYYY" format
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()
    setSelectedMonth(`${monthName} ${year}`)
  }

  const processPayroll = async () => {
    if (!selectedMonth || selectedEmployees.length === 0) return

    setProcessing(true)
    setProcessedPayslips([])

    // Simulate processing delay
    for (let i = 0; i < selectedEmployees.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const employeeId = selectedEmployees[i]
      const payslip = await generatePayslip(employeeId, selectedMonth)
      setProcessedPayslips(prev => [...prev, payslip])
    }

    setProcessing(false)
    setSelectedEmployees([])
  }

  const totalSelectedSalary = selectedEmployees.reduce((total, empId) => {
    const employee = employees.find(emp => emp.id === empId)
    return total + (employee ? employee.baseSalary + employee.allowances - employee.deductions : 0)
  }, 0)

  return (
    <div className="payroll">
      {/* Header */}
      <div className="payroll-header">
        <h1>Payroll Processing</h1>
        <p>Process salaries for your employees</p>
      </div>

      {/* Processing Controls */}
      <div className="payroll-config">
        <h3>Payroll Configuration</h3>

        <div className="payroll-config-grid">
          {/* Month Selection */}
          <div className="payroll-config-field">
            <label>
              Select Month
            </label>
            <div className="calendar-input-container">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                max={maxDate}
                className="calendar-input"
              />
            </div>
            {dateError && <p className="date-error">{dateError}</p>}
            {selectedMonth && <p className="selected-month">Selected: {selectedMonth}</p>}
          </div>

          {/* Selected Count */}
          <div className="reports-metric-card red">
            <div className="reports-metric-content">
              <div className="reports-metric-info">
                <h3>Selected Employees</h3>
                <p>{selectedEmployees.length}</p>
              </div>
              <div className="reports-metric-icon red">
                <UserIcon />
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="reports-metric-card red">
            <div className="reports-metric-content">
              <div className="reports-metric-info">
                <h3>Total Amount</h3>
                <p>{formatCurrency(totalSelectedSalary)}</p>
              </div>
              <div className="reports-metric-icon red">
                <CurrencyDollarIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Process Button */}
        <button
          onClick={processPayroll}
          disabled={!selectedMonth || selectedEmployees.length === 0 || processing}
          className="payroll-process-btn"
        >
          <PlayIcon />
          <span>{processing ? 'Processing...' : 'Process Payroll'}</span>
        </button>
      </div>

      {/* Employee Selection */}
      <div className="payroll-employees">
        <div className="payroll-employees-header">
          <h3>Select Employees</h3>
          <button
            onClick={selectAllEmployees}
            className="payroll-select-all"
          >
            {selectedEmployees.length === employees.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="payroll-employees-grid">
          {employees.map(employee => (
            <div
              key={employee.id}
              onClick={() => handleEmployeeSelect(employee.id)}
              className={`payroll-employee-card ${selectedEmployees.includes(employee.id)
                ? 'selected'
                : ''
                }`}
            >
              <div className="payroll-employee-content">
                <div className="payroll-employee-avatar">
                  <span>
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="payroll-employee-info">
                  <h4>{employee.name}</h4>
                  <p className="position">{employee.position}</p>
                  <p className="salary">
                    {formatCurrency(employee.baseSalary + employee.allowances - employee.deductions)}
                  </p>
                </div>
                {selectedEmployees.includes(employee.id) && (
                  <CheckCircleIcon className="payroll-employee-check" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Status */}
      {(processing || processedPayslips.length > 0) && (
        <div className="payroll-status">
          <h3>Processing Status</h3>

          {processing && (
            <div className="payroll-progress">
              <div className="payroll-progress-header">
                <div className="payroll-progress-indicator"></div>
                <span className="payroll-progress-text">Processing payroll...</span>
              </div>
              <div className="payroll-progress-bar">
                <div
                  className="payroll-progress-fill"
                  style={{ width: `${(processedPayslips.length / selectedEmployees.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="payroll-status-list">
            {processedPayslips.map(payslip => {
              const employee = employees.find(emp => emp.id === payslip.employeeId)
              return (
                <div key={payslip.id} className="payroll-status-item">
                  <CheckCircleIcon />
                  <span className="employee-name">
                    {employee ? employee.name : 'Unknown Employee'} - {formatCurrency(payslip.netSalary)}
                  </span>
                  <span className="status-text">Processed</span>
                </div>
              )
            })}
          </div>

          {!processing && processedPayslips.length > 0 && (
            <div className="payroll-success">
              <div className="payroll-success-content">
                <CheckCircleIcon />
                <span>
                  Payroll processed successfully for {processedPayslips.length} employees!
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Payroll