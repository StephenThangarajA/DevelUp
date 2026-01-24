import { useState } from 'react'
import { useVendor } from '../contexts/VendorContext'
import { PlusIcon, MagnifyingGlassIcon, ComputerDesktopIcon, XMarkIcon } from '@heroicons/react/24/outline'

const ToolList = () => {
  const { tools, vendors, addTool, updateTool, deleteTool } = useVendor()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [isDeprecateDialogOpen, setIsDeprecateDialogOpen] = useState(false)
  const [toolToDeprecate, setToolToDeprecate] = useState(null)
  const [selectedTool, setSelectedTool] = useState(null)
  const [newTool, setNewTool] = useState({
    name: '',
    vendorId: '',
    users: '',
    costPerUser: '',
    status: 'Active',
    purpose: ''
  })

  const filteredTools = tools.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    addTool({
      ...newTool,
      vendorId: parseInt(newTool.vendorId),
      users: parseInt(newTool.users) || 0,
      costPerUser: parseFloat(newTool.costPerUser) || 0
    })
    setIsModalOpen(false)
    setNewTool({
      name: '',
      vendorId: '',
      users: '',
      costPerUser: '',
      status: 'Active',
      purpose: ''
    })
  }

  const handleDeprecate = (toolId) => {
    setToolToDeprecate(toolId)
    setIsDeprecateDialogOpen(true)
  }

  const confirmDeprecation = () => {
    if (toolToDeprecate) {
      deleteTool(toolToDeprecate)
      setIsDeprecateDialogOpen(false)
      setToolToDeprecate(null)
    }
  }

  const handleManageLicenses = (tool) => {
    setSelectedTool({ ...tool })
    setIsLicenseModalOpen(true)
  }

  const handleLicenseUpdate = (e) => {
    e.preventDefault()
    updateTool(selectedTool)
    setIsLicenseModalOpen(false)
    setSelectedTool(null)
  }

  return (
    <div className="vs-page">
      <header className="vs-page-header">
        <div>
          <h1 className="vs-heading">Software Stack</h1>
          <p className="vs-subheading">Track all software tools used across the organization.</p>
        </div>
        <button className="vs-btn-primary" onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="vs-icon-sm" />
          <span>Add Tool</span>
        </button>
      </header>

      <div className="vs-filters">
        <div className="vs-search-box">
          <MagnifyingGlassIcon />
          <input
            type="text"
            placeholder="Search tools or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="vs-tools-grid">
        {filteredTools.map(tool => {
          const vendor = vendors.find(v => v.id === tool.vendorId)
          return (
            <div key={tool.id} className="vs-tool-card">
              <div className="vs-tool-header">
                <div className="vs-tool-icon">
                  <ComputerDesktopIcon className="vs-icon-md" />
                </div>
                <div className="vs-tool-title-area">
                  <h3 className="vs-tool-name">{tool.name}</h3>
                  <span className="vs-tool-vendor">by {vendor?.name || 'Unknown Vendor'}</span>
                </div>
                <span className={`vs-status-badge ${tool.status.toLowerCase()}`}>{tool.status}</span>
              </div>
              <div className="vs-tool-body">
                <p className="vs-tool-purpose">{tool.purpose}</p>
                <div className="vs-tool-stats">
                  <div className="vs-tool-stat">
                    <span className="vs-label">Users</span>
                    <span className="vs-value">{tool.users}</span>
                  </div>
                  <div className="vs-tool-stat">
                    <span className="vs-label">Cost/User</span>
                    <span className="vs-value">${tool.costPerUser}</span>
                  </div>
                  <div className="vs-tool-stat">
                    <span className="vs-label">Total Monthly</span>
                    <span className="vs-value">${tool.users * tool.costPerUser}</span>
                  </div>
                </div>
              </div>
              <div className="vs-tool-footer">
                <button className="vs-btn-text" onClick={() => handleManageLicenses(tool)}>Manage Licenses</button>
                <button className="vs-btn-text danger" onClick={() => handleDeprecate(tool.id)}>Deprecate</button>
              </div>
            </div>
          )
        })}
      </div>

      {isLicenseModalOpen && selectedTool && (
        <div className="vs-modal-overlay">
          <div className="vs-modal">
            <div className="vs-modal-header">
              <h2>Manage Licenses: {selectedTool.name}</h2>
              <button className="vs-modal-close" onClick={() => setIsLicenseModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleLicenseUpdate} className="vs-form">
              <div className="vs-form-row">
                <div className="vs-form-group">
                  <label>Total Users</label>
                  <input
                    type="number"
                    required
                    value={selectedTool.users}
                    onChange={(e) => setSelectedTool({ ...selectedTool, users: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="vs-form-group">
                  <label>Cost Per User ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={selectedTool.costPerUser}
                    onChange={(e) => setSelectedTool({ ...selectedTool, costPerUser: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="vs-form-group">
                <label>Status</label>
                <select
                  value={selectedTool.status}
                  onChange={(e) => setSelectedTool({ ...selectedTool, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="vs-modal-footer">
                <button type="button" className="vs-btn-outline" onClick={() => setIsLicenseModalOpen(false)}>Cancel</button>
                <button type="submit" className="vs-btn-primary">Update Licenses</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeprecateDialogOpen && (
        <div className="vs-modal-overlay">
          <div className="vs-modal vs-modal-sm">
            <div className="vs-modal-header">
              <h2>Confirm Deprecation</h2>
              <button className="vs-modal-close" onClick={() => setIsDeprecateDialogOpen(false)}>&times;</button>
            </div>
            <div className="vs-modal-body">
              <p>Are you sure you want to deprecate this tool? This will remove it from the active software stack.</p>
            </div>
            <div className="vs-modal-footer">
              <button className="vs-btn-outline" onClick={() => setIsDeprecateDialogOpen(false)}>Cancel</button>
              <button className="vs-btn-primary danger" onClick={confirmDeprecation}>Deprecate Tool</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="vs-modal-overlay">
          <div className="vs-modal">
            <div className="vs-modal-header">
              <h2>Add New Tool</h2>
              <button className="vs-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="vs-form">
              <div className="vs-form-group">
                <label>Tool Name</label>
                <input
                  type="text"
                  required
                  value={newTool.name}
                  onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                />
              </div>
              <div className="vs-form-group">
                <label>Vendor</label>
                <select
                  required
                  value={newTool.vendorId}
                  onChange={(e) => setNewTool({ ...newTool, vendorId: e.target.value })}
                >
                  <option value="">Select a vendor</option>
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div className="vs-form-row">
                <div className="vs-form-group">
                  <label>Total Users</label>
                  <input
                    type="number"
                    required
                    value={newTool.users}
                    onChange={(e) => setNewTool({ ...newTool, users: e.target.value })}
                  />
                </div>
                <div className="vs-form-group">
                  <label>Cost Per User ($)</label>
                  <input
                    type="number"
                    required
                    value={newTool.costPerUser}
                    onChange={(e) => setNewTool({ ...newTool, costPerUser: e.target.value })}
                  />
                </div>
              </div>
              <div className="vs-form-group">
                <label>Primary Purpose</label>
                <textarea
                  rows="3"
                  value={newTool.purpose}
                  onChange={(e) => setNewTool({ ...newTool, purpose: e.target.value })}
                ></textarea>
              </div>
              <div className="vs-modal-footer">
                <button type="button" className="vs-btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="vs-btn-primary">Add to Stack</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolList
