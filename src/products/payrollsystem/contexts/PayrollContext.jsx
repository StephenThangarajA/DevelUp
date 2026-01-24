import { createContext, useContext, useState, useEffect } from 'react'
import { payroll as api, authMe } from '../../../lib/api.js'

const PayrollContext = createContext()

export const usePayroll = () => {
  const context = useContext(PayrollContext)
  if (!context) {
    throw new Error('usePayroll must be used within a PayrollProvider')
  }
  return context
}

export const PayrollProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])

  const [payslips, setPayslips] = useState([])

  const [settings, setSettings] = useState({
    companyName: '',
    companyAddress: '',
    registrationNumber: '',
    phoneNumber: '',
    email: '',
    taxRate: 0.15,
    pfRate: 0.12,
    healthInsurance: 500,
    currency: 'USD'
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        // Check authentication using cookie-based auth
        const user = await authMe()
        if (!user || user.role !== 'STARTUP_ADMIN') {
          setLoading(false)
          setError('Unauthorized')
          return
        }

        const [emps, slips, setts] = await Promise.all([
          api.employees.list(),
          api.payslips.list(),
          api.settings.get()
        ])
        setEmployees(emps)
        setPayslips(slips)
        if (setts) {
          const sanitized = {
            ...setts,
            companyName: setts.companyName === 'TechCorp Solutions' ? '' : setts.companyName,
            registrationNumber: setts.registrationNumber || '',
            phoneNumber: setts.phoneNumber || '',
            email: setts.email || ''
          }
          setSettings(sanitized)
        }
        setLoading(false)
      } catch (e) {
        setError('Failed to load payroll')
        setLoading(false)
      }
    }
    load()
  }, [])

  const addEmployee = async (employee) => {
    const created = await api.employees.create(employee)
    setEmployees(prev => [...prev, created])
  }

  const updateEmployee = async (id, updatedEmployee) => {
    const updated = await api.employees.update(id, updatedEmployee)
    setEmployees(prev => prev.map(emp => emp.id === id ? updated : emp))
  }

  const deleteEmployee = async (id) => {
    await api.employees.remove(id)
    setEmployees(prev => prev.filter(emp => emp.id !== id))
  }

  const generatePayslip = async (employeeId, month) => {
    const slip = await api.payslips.generate(employeeId, month)
    setPayslips(prev => [...prev, slip])
    return slip
  }

  const saveSettings = async (newSettings) => {
    const updated = await api.settings.update(newSettings)
    setSettings(updated)
    return updated
  }

  // Currency formatting utility
  const getCurrencySymbol = (currencyCode) => {
    const currency = currencyCode || settings.currency || 'USD'
    switch (currency) {
      case 'INR': return '₹'
      case 'EUR': return '€'
      case 'GBP': return '£'
      case 'USD':
      default: return '$'
    }
  }

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return amount

    const currency = settings.currency || 'USD'
    const symbol = getCurrencySymbol(currency)
    
    switch (currency) {
      case 'INR':
        return `${symbol}${amount.toLocaleString('en-IN')}`
      case 'EUR':
        return `${symbol}${amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case 'GBP':
        return `${symbol}${amount.toLocaleString('en-GB')}`
      case 'USD':
      default:
        return `${symbol}${amount.toLocaleString('en-US')}`
    }
  }

  const value = {
    employees,
    payslips,
    settings,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    generatePayslip,
    setSettings,
    saveSettings,
    formatCurrency,
    getCurrencySymbol
  }

  return (
    <PayrollContext.Provider value={value}>
      {children}
    </PayrollContext.Provider>
  )
}
