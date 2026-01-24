import { useState } from 'react'
import { useVendor } from '../contexts/VendorContext'
import { BellAlertIcon, CalendarIcon, ExclamationTriangleIcon, DocumentTextIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

const RenewalAlerts = () => {
  const { vendors, updateVendor } = useVendor()
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  // Sort vendors by renewal date
  const sortedVendors = [...vendors].sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))

  const handleReview = (vendor) => {
    setSelectedVendor(vendor)
    setIsReviewModalOpen(true)
  }

  const handleConfirmClick = (vendor) => {
    setSelectedVendor(vendor)
    setIsConfirmModalOpen(true)
  }

  const confirmRenewal = () => {
    if (!selectedVendor) return

    const currentDate = new Date(selectedVendor.renewalDate)
    currentDate.setFullYear(currentDate.getFullYear() + 1)

    const updatedVendor = {
      ...selectedVendor,
      renewalDate: currentDate.toISOString().split('T')[0]
    }

    updateVendor(updatedVendor)
    setIsConfirmModalOpen(false)
    setSelectedVendor(null)
  }

  const getStatusColor = (date) => {
    const today = new Date()
    const renewal = new Date(date)
    const diffDays = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'danger'
    if (diffDays < 30) return 'warning'
    return 'success'
  }

  const getDiffText = (date) => {
    const today = new Date()
    const renewal = new Date(date)
    const diffDays = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return `Expired ${Math.abs(diffDays)} days ago`
    if (diffDays === 0) return 'Renewing today'
    if (diffDays < 30) return `In ${diffDays} days`
    return `In ${Math.floor(diffDays / 30)} months`
  }

  return (
    <div className="vs-page">
      <header className="vs-page-header">
        <div>
          <h1 className="vs-heading">Renewal Alerts</h1>
          <p className="vs-subheading">Never miss a contract renewal or payment deadline.</p>
        </div>
      </header>

      <div className="vs-alerts-container">
        <div className="vs-alert-summary">
          <div className="vs-summary-item">
            <span className="vs-label">Critical</span>
            <span className="vs-value danger">{vendors.filter(v => {
              const diff = Math.ceil((new Date(v.renewalDate) - new Date()) / (1000 * 60 * 60 * 24))
              return diff >= 0 && diff < 30
            }).length}</span>
          </div>
          <div className="vs-summary-item">
            <span className="vs-label">Upcoming</span>
            <span className="vs-value danger">{vendors.filter(v => {
              const diff = Math.ceil((new Date(v.renewalDate) - new Date()) / (1000 * 60 * 60 * 24))
              return diff >= 30
            }).length}</span>
          </div>
        </div>

        <div className="vs-timeline">
          {sortedVendors.map(vendor => {
            const status = getStatusColor(vendor.renewalDate)
            return (
              <div key={vendor.id} className={`vs-timeline-item ${status}`}>
                <div className="vs-timeline-date">
                  <CalendarIcon className="vs-icon-sm" />
                  <span>{vendor.renewalDate}</span>
                </div>
                <div className="vs-timeline-content">
                  <div className="vs-vendor-brief">
                    <h3 className="vs-vendor-name">{vendor.name}</h3>
                    <span className="vs-category">{vendor.category}</span>
                  </div>
                  <div className="vs-renewal-info">
                    <span className={`vs-days-left ${status}`}>
                      {status === 'warning' && <ExclamationTriangleIcon className="vs-icon-xs" />}
                      {getDiffText(vendor.renewalDate)}
                    </span>
                    <span className="vs-cost-impact">Impact: ${vendor.monthlySpend}/mo</span>
                  </div>
                  <div className="vs-timeline-actions">
                    <button
                      className="vs-btn-outline sm"
                      onClick={() => handleReview(vendor)}
                    >
                      Review Contract
                    </button>
                    <button
                      className="vs-btn-primary sm"
                      onClick={() => handleConfirmClick(vendor)}
                    >
                      Confirm Renewal
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Review Contract Modal */}
      {isReviewModalOpen && selectedVendor && (
        <div className="vs-modal-overlay">
          <div className="vs-modal">
            <div className="vs-modal-header">
              <div className="vs-modal-title-with-icon">
                <DocumentTextIcon className="vs-icon-md" style={{ color: 'var(--vs-primary-red)' }} />
                <h2 className="vs-modal-title">Contract Review: {selectedVendor.name}</h2>
              </div>
              <button className="vs-modal-close" onClick={() => setIsReviewModalOpen(false)}>
                <XMarkIcon className="vs-icon-sm" />
              </button>
            </div>
            <div className="vs-modal-body">
              <div className="vs-contract-details">
                <div className="vs-contract-section">
                  <h4 className="vs-label">Service Terms</h4>
                  <p>{selectedVendor.billingCycle} subscription with {selectedVendor.billingCycle.toLowerCase()} billing. Auto-renews unless cancelled 30 days prior.</p>
                </div>
                <div className="vs-contract-grid">
                  <div className="vs-contract-item">
                    <span className="vs-label">Owner</span>
                    <span className="vs-value">{selectedVendor.owner}</span>
                  </div>
                  <div className="vs-contract-item">
                    <span className="vs-label">Billing Cycle</span>
                    <span className="vs-value">{selectedVendor.billingCycle}</span>
                  </div>
                  <div className="vs-contract-item">
                    <span className="vs-label">Support Level</span>
                    <span className="vs-value">{selectedVendor.supportLevel}</span>
                  </div>
                  <div className="vs-contract-item">
                    <span className="vs-label">Last Reviewed</span>
                    <span className="vs-value">Jan 10, 2025</span>
                  </div>
                </div>
                <div className="vs-info-box" style={{ marginTop: '1.5rem' }}>
                  <BellAlertIcon className="vs-icon-sm" />
                  <div>
                    <p><strong>Renewal Tip:</strong> We recommend reviewing user seats for {selectedVendor.name} before the next billing cycle to optimize costs.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="vs-modal-footer">
              <button className="vs-btn-outline" onClick={() => setIsReviewModalOpen(false)}>Close</button>
              <button className="vs-btn-primary" onClick={() => {
                setIsReviewModalOpen(false);
                handleConfirmClick(selectedVendor);
              }}>
                Proceed to Renewal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Renewal Modal */}
      {isConfirmModalOpen && selectedVendor && (
        <div className="vs-modal-overlay">
          <div className="vs-modal" style={{ maxWidth: '450px' }}>
            <div className="vs-modal-header">
              <div className="vs-modal-title-with-icon">
                <CheckCircleIcon className="vs-icon-md" style={{ color: 'var(--vs-accent-green)' }} />
                <h2 className="vs-modal-title">Confirm Renewal</h2>
              </div>
              <button className="vs-modal-close" onClick={() => setIsConfirmModalOpen(false)}>
                <XMarkIcon className="vs-icon-sm" />
              </button>
            </div>
            <div className="vs-modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                Are you sure you want to confirm the renewal for <strong>{selectedVendor.name}</strong>?
              </p>
              <div className="vs-savings-comparison">
                <div className="vs-savings-row">
                  <span>Current Renewal</span>
                  <span className="vs-value">{selectedVendor.renewalDate}</span>
                </div>
                <div className="vs-savings-row highlight">
                  <span>New Renewal Date</span>
                  <span className="vs-value">
                    {(() => {
                      const d = new Date(selectedVendor.renewalDate);
                      d.setFullYear(d.getFullYear() + 1);
                      return d.toISOString().split('T')[0];
                    })()}
                  </span>
                </div>
              </div>
              <p className="vs-toggle-description">
                This will update the renewal schedule in the system and notify the billing department.
              </p>
            </div>
            <div className="vs-modal-footer">
              <button className="vs-btn-outline" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
              <button className="vs-btn-primary" onClick={confirmRenewal}>Confirm & Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RenewalAlerts
