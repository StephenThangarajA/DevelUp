import { useState } from 'react'
import { usePayroll } from '../contexts/PayrollContext'
import '../styles/EmployeeForm.css'
import { XMarkIcon } from '@heroicons/react/24/outline'

const EmployeeForm = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee, settings } = usePayroll()
  
  // Get currency symbol
  const getCurrencySymbol = () => {
    switch(settings.currency) {
      case 'INR': return '₹'
      case 'EUR': return '€'
      case 'GBP': return '£'
      case 'USD':
      default: return '$'
    }
  }
  
  const currencySymbol = getCurrencySymbol()
  const isEditing = Boolean(employee)

  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    position: employee?.position || '',
    department: employee?.department || '',
    baseSalary: employee?.baseSalary || '',
    allowances: employee?.allowances || '',
    deductions: employee?.deductions || '',
    joinDate: employee?.joinDate || '',
    status: employee?.status || 'active'
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.position.trim()) newErrors.position = 'Position is required'
    if (!formData.department.trim()) newErrors.department = 'Department is required'
    if (!formData.baseSalary || formData.baseSalary <= 0) newErrors.baseSalary = 'Valid base salary is required'
    if (formData.allowances < 0) newErrors.allowances = 'Allowances cannot be negative'
    if (formData.deductions < 0) newErrors.deductions = 'Deductions cannot be negative'
    if (!formData.joinDate) newErrors.joinDate = 'Join date is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const employeeData = {
      ...formData,
      baseSalary: parseFloat(formData.baseSalary),
      allowances: parseFloat(formData.allowances) || 0,
      deductions: parseFloat(formData.deductions) || 0
    }

    if (isEditing) {
      updateEmployee(employee.id, employeeData)
    } else {
      addEmployee(employeeData)
    }

    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="employee-form">
      <div className="employee-form-header">
        <div className="employee-form-header-info">
          <h1>
            {isEditing ? 'Edit Employee' : 'Add New Employee'}
          </h1>
          <p>
            {isEditing ? 'Update employee information' : 'Enter employee details to add them to the system'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="employee-form-close"
        >
          <XMarkIcon />
        </button>
      </div>

      <div className="employee-form-container">
        <form onSubmit={handleSubmit} className="employee-form-content">
          <div className="employee-form-grid">
            {/* Basic Information */}
            <div className="employee-form-section">
              <h3>
                Basic Information
              </h3>
              
              <div className={`employee-form-field ${errors.name ? 'error' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className={`employee-form-field ${errors.email ? 'error' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className={`employee-form-field ${errors.position ? 'error' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter job position"
                />
                {errors.position && <p className="error-message">{errors.position}</p>}
              </div>

              <div className={`employee-form-field ${errors.department ? 'error' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                </select>
                {errors.department && <p className="error-message">{errors.department}</p>}
              </div>
            </div>

            {/* Compensation & Status */}
            <div className="employee-form-section">
              <h3>
                Compensation & Status
              </h3>

              <div className={`employee-form-field ${errors.baseSalary ? 'error' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Salary (Annual) *
                </label>
                <div className="input-with-icon">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                  <input
                    type="number"
                    name="baseSalary"
                    value={formData.baseSalary}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
                {errors.baseSalary && <p className="error-message">{errors.baseSalary}</p>}
              </div>

              <div className={`employee-form-field ${errors.allowances ? 'error' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowances (Monthly)
                </label>
                <div className="input-with-icon">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                  <input
                    type="number"
                    name="allowances"
                    value={formData.allowances}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
                {errors.allowances && <p className="error-message">{errors.allowances}</p>}
              </div>

              <div className={`employee-form-field ${errors.deductions ? 'error' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deductions (Monthly)
                </label>
                <div className="input-with-icon">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                  <input
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
                {errors.deductions && <p className="error-message">{errors.deductions}</p>}
              </div>

              <div className={`employee-form-field ${errors.joinDate ? 'error' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Join Date *
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                />
                {errors.joinDate && <p className="error-message">{errors.joinDate}</p>}
              </div>

              <div className="employee-form-field">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="employee-form-actions">
            <button
              type="button"
              onClick={onClose}
              className="employee-form-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="employee-form-submit"
            >
              {isEditing ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeForm