import { useState } from 'react'
import { usePayroll } from '../contexts/PayrollContext'
import '../styles/Employees.css'
import EmployeeForm from './EmployeeForm'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const Employees = () => {
  const { employees, deleteEmployee, formatCurrency } = usePayroll()
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (employee) => {
    setEditingEmployee(employee)
    setShowForm(true)
  }

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id)
      setShowDeleteDialog(false)
      setEmployeeToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setEmployeeToDelete(null)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingEmployee(null)
  }

  if (showForm) {
    return <EmployeeForm employee={editingEmployee} onClose={closeForm} />
  }

  return (
    <div className="employees">
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="delete-dialog-overlay">
          <div className="delete-dialog">
            <div className="delete-dialog-header">
              <h3>Confirm Deletion</h3>
              <button className="delete-dialog-close" onClick={cancelDelete}>
                <XMarkIcon />
              </button>
            </div>
            <div className="delete-dialog-content">
              <p>Are you sure you want to delete this employee?</p>
              {employeeToDelete && (
                <div className="delete-employee-info">
                  <span className="employee-name">{employeeToDelete.name}</span>
                  <span className="employee-email">{employeeToDelete.email}</span>
                </div>
              )}
            </div>
            <div className="delete-dialog-actions">
              <button className="delete-dialog-cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="delete-dialog-confirm" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="employees-header">
        <div className="employees-header-info">
          <h1>Employee Management</h1>
          <p>Manage your workforce efficiently</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="employees-add-btn"
        >
          <PlusIcon />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="employees-search">
        <MagnifyingGlassIcon />
        <input
          type="text"
          placeholder="Search employees by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Employee Grid */}
      <div className="employees-grid">
        {filteredEmployees.map((employee, index) => (
          <div
            key={employee.id}
            className="employee-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="employee-card-header">
              <div className="employee-avatar">
                <UserIcon />
              </div>
              <div className="employee-actions">
                <button
                  onClick={() => handleEdit(employee)}
                  className="employee-action-btn edit"
                >
                  <PencilIcon />
                </button>
                <button
                  onClick={() => handleDeleteClick(employee)}
                  className="employee-action-btn delete"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>

            <div className="employee-info">
              <h3>{employee.name}</h3>
              <p className="emp-email">{employee.email}</p>
              <p className="position">{employee.position}</p>
              <p className="department">{employee.department}</p>
              
              <div className="employee-salary">
                <div className="employee-salary-row">
                  <span className="label">Base Salary:</span>
                  <span className="base-salary">{formatCurrency(employee.baseSalary)}</span>
                </div>
                <div className="employee-salary-row">
                  <span className="label">Net Salary:</span>
                  <span className="net-salary">
                    {formatCurrency(employee.baseSalary + employee.allowances - employee.deductions)}
                  </span>
                </div>
              </div>

              <div className="employee-status">
                <span className={`employee-status-badge ${employee.status}`}>
                  {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="employees-empty">
          <UserIcon />
          <h3>No employees found</h3>
          <p>Try adjusting your search or add a new employee</p>
        </div>
      )}
    </div>
  )
}

export default Employees