import { useState, useEffect } from 'react'
import { useVendor } from '../contexts/VendorContext'
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
  CalculatorIcon,
  UserMinusIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'

const BudgetTracking = () => {
  const { vendors, budgets, tools, updateBudgets } = useVendor()
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false)
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)

  const [editTotalLimit, setEditTotalLimit] = useState(budgets.totalMonthlyLimit)
  const [editCategories, setEditCategories] = useState({ ...budgets.categories })

  useEffect(() => {
    setEditTotalLimit(budgets.totalMonthlyLimit)
    setEditCategories({ ...budgets.categories })
  }, [budgets])

  const handleUpdateBudget = async (e) => {
    e.preventDefault()
    await updateBudgets({
      totalMonthlyLimit: Number(editTotalLimit),
      categories: Object.fromEntries(
        Object.entries(editCategories).map(([k, v]) => [k, Number(v)])
      )
    })
    setIsEditBudgetOpen(false)
  }

  const totalSpent = vendors.reduce((sum, v) => sum + v.monthlySpend, 0)
  const totalBudget = budgets.totalMonthlyLimit
  const remainingBudget = totalBudget - totalSpent
  const utilizationPercent = Math.round((totalSpent / totalBudget) * 100)

  // Find a vendor with high monthly spend for savings suggestion
  const highSpendVendor = [...vendors].sort((a, b) => b.monthlySpend - a.monthlySpend)[0]

  // Find a tool with many users for license review
  const highUsageTool = [...tools]
    .filter(t => t.inactiveUsers && t.inactiveUsers.length > 0)
    .sort((a, b) => b.inactiveUsers.length - a.inactiveUsers.length)[0]

  const toolVendor = vendors.find(v => v.id === highUsageTool?.vendorId)

  const potentialSavings = Math.round(highSpendVendor?.monthlySpend * 12 * 0.1) || 0

  const handleReviewLicenses = () => {
    setSelectedSuggestion({
      type: 'license',
      tool: highUsageTool,
      vendor: toolVendor
    })
    setIsLicenseModalOpen(true)
  }

  const handleCalculateSavings = () => {
    setSelectedSuggestion({
      type: 'savings',
      vendor: highSpendVendor
    })
    setIsSavingsModalOpen(true)
  }

  return (
    <div className="vs-page">
      <header className="vs-page-header">
        <div>
          <h1 className="vs-heading">Budget Tracking</h1>
          <p className="vs-subheading">Monitor and optimize your monthly operational spending.</p>
        </div>
        <div className="vs-actions">
          <button 
            className="vs-btn-primary"
            onClick={() => setIsEditBudgetOpen(true)}
          >
            <PencilSquareIcon className="vs-icon-sm mr-2" />
            Edit Budget
          </button>
        </div>
      </header>

      <div className="vs-stats-grid">
        <div className="vs-stat-card blue">
          <div className="vs-stat-info">
            <span className="vs-stat-title">Monthly Budget</span>
            <span className="vs-stat-value">${totalBudget.toLocaleString()}</span>
          </div>
          <div className="vs-stat-icon">
            <BanknotesIcon className="vs-icon-md" />
          </div>
        </div>
        <div className="vs-stat-card red">
          <div className="vs-stat-info">
            <span className="vs-stat-title">Current Spend</span>
            <span className="vs-stat-value">${totalSpent.toLocaleString()}</span>
          </div>
          <div className="vs-stat-icon">
            <ArrowTrendingUpIcon className="vs-icon-md" />
          </div>
        </div>
        <div className="vs-stat-card green">
          <div className="vs-stat-info">
            <span className="vs-stat-title">Remaining</span>
            <span className="vs-stat-value">${remainingBudget.toLocaleString()}</span>
          </div>
          <div className="vs-stat-icon">
            <ArrowTrendingDownIcon className="vs-icon-md" />
          </div>
        </div>
      </div>

      <div className="vs-budget-layout">
        <div className="vs-card">
          <div className="vs-card-header">
            <h2 className="vs-card-title">Category Breakdown</h2>
          </div>
          <div className="vs-budget-details">
            {Object.entries(budgets.categories).map(([category, limit]) => {
              const spent = vendors.filter(v => v.category === category).reduce((sum, v) => sum + v.monthlySpend, 0)
              const percent = Math.round((spent / limit) * 100)
              return (
                <div key={category} className="vs-budget-item">
                  <div className="vs-budget-info">
                    <div className="vs-budget-label">
                      <h3>{category}</h3>
                      <span className="vs-budget-count">
                        {vendors.filter(v => v.category === category).length} vendors
                      </span>
                    </div>
                    <div className="vs-budget-stats">
                      <span className="vs-spent">${spent.toLocaleString()}</span>
                      <span className="vs-limit">/ ${limit.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="vs-progress-bar-container">
                    <div className="vs-progress-bar">
                      <div
                        className={`vs-progress-fill ${percent > 100 ? 'danger' : percent > 85 ? 'warning' : 'success'}`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      ></div>
                    </div>
                    <span className={`vs-percent ${percent > 100 ? 'danger' : ''}`}>{percent}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="vs-card">
          <div className="vs-card-header">
            <h2 className="vs-card-title">Optimization Suggestions</h2>
            <LightBulbIcon className="vs-icon-md vs-text-warning" />
          </div>
          <div className="vs-suggestions-list">
            {highUsageTool && (
              <div className="vs-suggestion-card warning">
                <div className="vs-suggestion-header">
                  <ExclamationTriangleIcon className="vs-icon-md" />
                  <h4>Unused {highUsageTool.name} Licenses</h4>
                </div>
                <p>{highUsageTool.inactiveUsers.length} users haven't logged into {highUsageTool.name} in 30 days. Potential saving: ${highUsageTool.inactiveUsers.length * highUsageTool.costPerUser}/mo.</p>
                <button
                  className="vs-btn-suggestion"
                  onClick={handleReviewLicenses}
                >
                  Review Licenses
                </button>
              </div>
            )}

            {highSpendVendor && (
              <div className="vs-suggestion-card info">
                <div className="vs-suggestion-header">
                  <InformationCircleIcon className="vs-icon-md" />
                  <h4>Annual Plan Available</h4>
                </div>
                <p>Switching {highSpendVendor.name} to an annual plan could save ${potentialSavings}/year (10%).</p>
                <button
                  className="vs-btn-suggestion"
                  onClick={handleCalculateSavings}
                >
                  Calculate Savings
                </button>
              </div>
            )}

            <div className="vs-suggestion-card success">
              <div className="vs-suggestion-header">
                <CheckCircleIcon className="vs-icon-md" />
                <h4>Budget Aligned</h4>
              </div>
              <p>Your total spend is at {utilizationPercent}% of the monthly target.</p>
              <div className="vs-badge-success">Optimized</div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Licenses Modal */}
      {isLicenseModalOpen && selectedSuggestion && (
        <div className="vs-modal-overlay">
          <div className="vs-modal">
            <div className="vs-modal-header">
              <div className="vs-modal-title-with-icon">
                <UserMinusIcon className="vs-icon-md vs-text-warning" />
                <h2>Review Inactive Licenses</h2>
              </div>
              <button className="vs-modal-close" onClick={() => setIsLicenseModalOpen(false)}>&times;</button>
            </div>
            <div className="vs-modal-body">
              <p className="vs-modal-description">
                The following users have not accessed <strong>{selectedSuggestion.tool?.name}</strong> in over 30 days.
                Removing these seats could save <strong>${selectedSuggestion.tool?.inactiveUsers.length * (selectedSuggestion.tool?.costPerUser || 0)}/month</strong>.
              </p>
              <div className="vs-license-list">
                {selectedSuggestion.tool?.inactiveUsers.map(item => (
                  <div key={item.id} className="vs-license-item">
                    <div className="vs-license-user">
                      <span className="vs-user-name">{item.name}</span>
                      <span className="vs-user-role">{item.role}</span>
                    </div>
                    <div className="vs-license-meta">
                      <span className="vs-last-active">Last active: {item.lastActive}</span>
                      <span className="vs-license-cost">${selectedSuggestion.tool?.costPerUser}/mo</span>
                    </div>
                    <button className="vs-btn-text danger">Remove Seat</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="vs-modal-footer">
              <button className="vs-btn-outline" onClick={() => setIsLicenseModalOpen(false)}>Close</button>
              <button className="vs-btn-primary danger" onClick={() => {
                alert(`Seats marked for removal in ${selectedSuggestion.tool?.name}. IT will process this request.`)
                setIsLicenseModalOpen(false)
              }}>Remove All Inactive</button>
            </div>
          </div>
        </div>
      )}

      {/* Savings Calculator Modal */}
      {isSavingsModalOpen && selectedSuggestion && (
        <div className="vs-modal-overlay">
          <div className="vs-modal">
            <div className="vs-modal-header">
              <div className="vs-modal-title-with-icon">
                <CalculatorIcon className="vs-icon-md vs-text-info" />
                <h2>Annual Savings Calculator</h2>
              </div>
              <button className="vs-modal-close" onClick={() => setIsSavingsModalOpen(false)}>&times;</button>
            </div>
            <div className="vs-modal-body">
              <p className="vs-modal-description">
                Switching <strong>{selectedSuggestion.vendor?.name}</strong> from Monthly to Annual billing provides a 10% discount on total costs.
              </p>

              <div className="vs-savings-comparison">
                <div className="vs-savings-row">
                  <span>Current Monthly Cost:</span>
                  <span className="vs-value">${selectedSuggestion.vendor?.monthlySpend.toLocaleString()}</span>
                </div>
                <div className="vs-savings-row">
                  <span>Current Annual Total (12 x ${selectedSuggestion.vendor?.monthlySpend}):</span>
                  <span className="vs-value">${(selectedSuggestion.vendor?.monthlySpend * 12).toLocaleString()}</span>
                </div>
                <div className="vs-savings-divider"></div>
                <div className="vs-savings-row highlight">
                  <span>New Annual Cost (10% Discount):</span>
                  <span className="vs-value success">
                    ${((selectedSuggestion.vendor?.monthlySpend * 12) * 0.9).toLocaleString()}
                  </span>
                </div>
                <div className="vs-savings-row total">
                  <span>Total Annual Savings:</span>
                  <span className="vs-value success">
                    ${((selectedSuggestion.vendor?.monthlySpend * 12) * 0.1).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="vs-info-box">
                <InformationCircleIcon className="vs-icon-sm" />
                <p>Annual billing requires a one-time upfront payment but reduces administrative overhead.</p>
              </div>
            </div>
            <div className="vs-modal-footer">
              <button className="vs-btn-outline" onClick={() => setIsSavingsModalOpen(false)}>Cancel</button>
              <button className="vs-btn-primary" onClick={() => {
                alert(`Request sent to Finance to switch ${selectedSuggestion.vendor?.name} to Annual billing.`)
                setIsSavingsModalOpen(false)
              }}>Request Billing Change</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Budget Modal */}
      {isEditBudgetOpen && (
        <div className="vs-modal-overlay">
          <div className="vs-modal">
            <div className="vs-modal-header">
              <div className="vs-modal-title-with-icon">
                <BanknotesIcon className="vs-icon-md vs-text-primary" />
                <h2>Edit Budget Limits</h2>
              </div>
              <button className="vs-modal-close" onClick={() => setIsEditBudgetOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleUpdateBudget}>
              <div className="vs-modal-body">
                <div className="vs-form-group">
                  <label>Total Monthly Limit ($)</label>
                  <input
                    type="number"
                    value={editTotalLimit}
                    onChange={(e) => setEditTotalLimit(e.target.value)}
                    className="vs-input"
                    required
                  />
                </div>
                <div className="vs-modal-divider"></div>
                <h3 className="vs-form-subtitle">Category Allocations</h3>
                <div className="vs-budget-edit-grid">
                  {Object.entries(editCategories).map(([category, limit]) => (
                    <div key={category} className="vs-form-group">
                      <label>{category} ($)</label>
                      <input
                        type="number"
                        value={limit}
                        onChange={(e) => setEditCategories({
                          ...editCategories,
                          [category]: e.target.value
                        })}
                        className="vs-input"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="vs-modal-footer">
                <button type="button" className="vs-btn-outline" onClick={() => setIsEditBudgetOpen(false)}>Cancel</button>
                <button type="submit" className="vs-btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BudgetTracking
