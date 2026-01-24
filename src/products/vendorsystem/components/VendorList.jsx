import { useState } from 'react'
import { useVendor } from '../contexts/VendorContext'
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const VendorList = () => {
  const { vendors, addVendor, updateVendor, deleteVendor } = useVendor()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [vendorToDelete, setVendorToDelete] = useState(null)
  const [filters, setFilters] = useState({
    category: 'All',
    status: 'All'
  })
  const [editingVendor, setEditingVendor] = useState(null)
  const [newVendor, setNewVendor] = useState({
    name: '',
    category: 'Infrastructure',
    status: 'Active',
    monthlySpend: '',
    renewalDate: '',
    contactEmail: '',
    owner: '',
    billingCycle: 'Monthly',
    supportLevel: 'Basic'
  })

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filters.category === 'All' || v.category === filters.category
    const matchesStatus = filters.status === 'All' || v.status === filters.status

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEditClick = (vendor) => {
    setEditingVendor(vendor)
    setNewVendor({
      name: vendor.name,
      category: vendor.category,
      status: vendor.status,
      monthlySpend: vendor.monthlySpend.toString(),
      renewalDate: vendor.renewalDate,
      contactEmail: vendor.contactEmail,
      owner: vendor.owner || '',
      billingCycle: vendor.billingCycle || 'Monthly',
      supportLevel: vendor.supportLevel || 'Basic'
    })
    setIsModalOpen(true)
  }

  const handleDeleteClick = (vendor) => {
    setVendorToDelete(vendor)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (vendorToDelete) {
      deleteVendor(vendorToDelete.id)
      setIsDeleteConfirmOpen(false)
      setVendorToDelete(null)
    }
  }

  const resetForm = () => {
    setIsModalOpen(false)
    setEditingVendor(null)
    setNewVendor({
      name: '',
      category: 'Infrastructure',
      status: 'Active',
      monthlySpend: '',
      renewalDate: '',
      contactEmail: '',
      owner: '',
      billingCycle: 'Monthly',
      supportLevel: 'Basic'
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const vendorData = {
      ...newVendor,
      monthlySpend: parseFloat(newVendor.monthlySpend) || 0
    }

    if (editingVendor) {
      updateVendor({ ...vendorData, id: editingVendor.id })
    } else {
      addVendor(vendorData)
    }
    resetForm()
  }

  return (
    <div className="vs-page">
      <header className="vs-page-header">
        <div>
          <h1 className="vs-heading">Vendor Management</h1>
          <p className="vs-subheading">Manage your relationship with service providers and vendors.</p>
        </div>
        <button className="vs-btn-primary" onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="vs-icon-sm" />
          <span>Add Vendor</span>
        </button>
      </header>

      <div className="vs-filters">
        <div className="vs-search-box">
          <MagnifyingGlassIcon />
          <input
            type="text"
            placeholder="Search vendors or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="vs-filter-container">
          <button
            className={`vs-btn-outline ${isFilterOpen ? 'active' : ''}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FunnelIcon className="vs-icon-sm" />
            <span>Filter</span>
            {(filters.category !== 'All' || filters.status !== 'All') && (
              <span className="vs-filter-dot"></span>
            )}
          </button>

          {isFilterOpen && (
            <div className="vs-filter-dropdown">
              <div className="vs-filter-section">
                <label>Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option>All</option>
                  <option>Infrastructure</option>
                  <option>Communication</option>
                  <option>Development</option>
                  <option>Marketing</option>
                  <option>HR & Legal</option>
                </select>
              </div>
              <div className="vs-filter-section">
                <label>Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="vs-filter-actions">
                <button
                  className="vs-btn-text"
                  onClick={() => {
                    setFilters({ category: 'All', status: 'All' })
                    setIsFilterOpen(false)
                  }}
                >
                  Reset
                </button>
                <button
                  className="vs-btn-primary vs-btn-sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="vs-card">
        <div className="vs-table-container">
          <table className="vs-table">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Monthly Spend</th>
                <th>Renewal Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map(vendor => (
                <tr key={vendor.id}>
                  <td>
                    <div className="vs-vendor-cell">
                      <div className="vs-vendor-logo">
                        {vendor.name.charAt(0)}
                      </div>
                      <div className="vs-vendor-info">
                        <span className="vs-vendor-name">{vendor.name}</span>
                        <span className="vs-vendor-email">{vendor.contactEmail}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="vs-badge">{vendor.category}</span></td>
                  <td>
                    <span className={`vs-status-dot ${vendor.status.toLowerCase()}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td>${vendor.monthlySpend.toLocaleString()}</td>
                  <td>{vendor.renewalDate}</td>
                  <td>
                    <div className="vs-actions-cell">
                      <button className="vs-btn-edit" onClick={() => handleEditClick(vendor)}>
                        <PencilIcon className="vs-icon-xs" />
                        <span>Edit</span>
                      </button>
                      <button className="vs-btn-delete" onClick={() => handleDeleteClick(vendor)}>
                        <TrashIcon className="vs-icon-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="vs-modal-overlay">
          <div className="vs-modal">
            <div className="vs-modal-header">
              <h2>{editingVendor ? 'Edit Vendor' : 'Add New Vendor'}</h2>
              <button className="vs-modal-close" onClick={resetForm}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="vs-form">
              <div className="vs-form-group">
                <label>Vendor Name</label>
                <input
                  type="text"
                  required
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                />
              </div>
              <div className="vs-form-row">
                <div className="vs-form-group">
                  <label>Category</label>
                  <select
                    value={newVendor.category}
                    onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                  >
                    <option>Infrastructure</option>
                    <option>Communication</option>
                    <option>Development</option>
                    <option>Marketing</option>
                    <option>HR & Legal</option>
                  </select>
                </div>
                <div className="vs-form-group">
                  <label>Monthly Spend ($)</label>
                  <input
                    type="number"
                    required
                    value={newVendor.monthlySpend}
                    onChange={(e) => setNewVendor({ ...newVendor, monthlySpend: e.target.value })}
                  />
                </div>
              </div>
              <div className="vs-form-row">
                <div className="vs-form-group">
                  <label>Renewal Date</label>
                  <input
                    type="date"
                    required
                    value={newVendor.renewalDate}
                    onChange={(e) => setNewVendor({ ...newVendor, renewalDate: e.target.value })}
                  />
                </div>
                <div className="vs-form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    required
                    value={newVendor.contactEmail}
                    onChange={(e) => setNewVendor({ ...newVendor, contactEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="vs-form-row">
                <div className="vs-form-group">
                  <label>Owner / Department</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IT Ops, HR Team"
                    value={newVendor.owner}
                    onChange={(e) => setNewVendor({ ...newVendor, owner: e.target.value })}
                  />
                </div>
                <div className="vs-form-group">
                  <label>Billing Cycle</label>
                  <select
                    value={newVendor.billingCycle}
                    onChange={(e) => setNewVendor({ ...newVendor, billingCycle: e.target.value })}
                  >
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Annual</option>
                  </select>
                </div>
              </div>
              <div className="vs-form-group">
                <label>Support Level</label>
                <select
                  value={newVendor.supportLevel}
                  onChange={(e) => setNewVendor({ ...newVendor, supportLevel: e.target.value })}
                >
                  <option>Basic</option>
                  <option>Business</option>
                  <option>Premium</option>
                  <option>Enterprise</option>
                </select>
              </div>
              <div className="vs-modal-footer">
                <button type="button" className="vs-btn-outline" onClick={resetForm}>Cancel</button>
                <button type="submit" className="vs-btn-primary">
                  {editingVendor ? 'Save Changes' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="vs-modal-overlay">
          <div className="vs-modal vs-modal-sm">
            <div className="vs-modal-header">
              <h2>Confirm Delete</h2>
              <button className="vs-modal-close" onClick={() => setIsDeleteConfirmOpen(false)}>&times;</button>
            </div>
            <div className="vs-modal-body">
              <p>Are you sure you want to delete <strong>{vendorToDelete?.name}</strong>? This will also remove all tools associated with this vendor.</p>
            </div>
            <div className="vs-modal-footer">
              <button className="vs-btn-outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</button>
              <button className="vs-btn-primary danger" onClick={confirmDelete}>Delete Vendor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VendorList
