import { createContext, useContext, useState, useEffect } from 'react'
import { vendor as vendorApi } from '../../../lib/api'

const VendorContext = createContext()

export const useVendor = () => {
  const context = useContext(VendorContext)
  if (!context) {
    throw new Error('useVendor must be used within a VendorProvider')
  }
  return context
}

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([])
  const [tools, setTools] = useState([])
  const [budgets, setBudgets] = useState({
    totalMonthlyLimit: 5000,
    categories: {
      Infrastructure: 2000,
      Communication: 1000,
      Development: 1000,
      Marketing: 1000
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const data = await vendorApi.get()
        
        // Migration logic: if DB is empty, check localStorage
        if (data.vendors.length === 0 && data.tools.length === 0) {
          const localVendors = JSON.parse(localStorage.getItem('develup_vendors') || '[]')
          const localTools = JSON.parse(localStorage.getItem('develup_tools') || '[]')
          const localBudgets = JSON.parse(localStorage.getItem('develup_budgets'))

          if (localVendors.length > 0) {
            for (const v of localVendors) {
              await vendorApi.vendors.create(v)
            }
          }
          if (localTools.length > 0) {
            for (const t of localTools) {
              await vendorApi.tools.create(t)
            }
          }
          if (localBudgets) {
            await vendorApi.update({ budgets: localBudgets })
          }

          // Fetch again after migration
          if (localVendors.length > 0 || localTools.length > 0 || localBudgets) {
            const freshData = await vendorApi.get()
            setVendors(freshData.vendors)
            setTools(freshData.tools)
            setBudgets(freshData.budgets)
          } else {
            // Default mock data if everything is empty
            const mockVendors = [
              { name: 'Google Cloud', category: 'Infrastructure', status: 'Active', monthlySpend: 1250, renewalDate: '2026-05-15', contactEmail: 'billing@google.com', owner: 'IT Ops', billingCycle: 'Monthly', supportLevel: 'Enterprise' },
              { name: 'Slack', category: 'Communication', status: 'Active', monthlySpend: 480, renewalDate: '2026-03-20', contactEmail: 'accounts@slack.com', owner: 'HR Team', billingCycle: 'Monthly', supportLevel: 'Business' },
              { name: 'GitHub', category: 'Development', status: 'Active', monthlySpend: 210, renewalDate: '2026-08-10', contactEmail: 'support@github.com', owner: 'Dev Team', billingCycle: 'Monthly', supportLevel: 'Premium' },
              { name: 'Zoom', category: 'Communication', status: 'Active', monthlySpend: 150, renewalDate: '2026-01-28', contactEmail: 'billing@zoom.us', owner: 'Admin', billingCycle: 'Monthly', supportLevel: 'Pro' }
            ]
            for (const v of mockVendors) await vendorApi.vendors.create(v)
            
            const freshData = await vendorApi.get()
            const googleCloud = freshData.vendors.find(v => v.name === 'Google Cloud')
            const slack = freshData.vendors.find(v => v.name === 'Slack')
            const github = freshData.vendors.find(v => v.name === 'GitHub')
            const zoom = freshData.vendors.find(v => v.name === 'Zoom')

            const mockTools = [
              { name: 'Cursor IDE', vendorId: github?.id, users: 15, costPerUser: 20, status: 'Active', purpose: 'AI-powered development', lastAudit: '2025-12-01' },
              { name: 'Zoom Rooms', vendorId: zoom?.id, users: 10, costPerUser: 15, status: 'Active', purpose: 'Meeting rooms', lastAudit: '2025-11-15' },
              { name: 'Slack Connect', vendorId: slack?.id, users: 50, costPerUser: 8, status: 'Active', purpose: 'External collaboration', lastAudit: '2025-12-20' }
            ]
            for (const t of mockTools) await vendorApi.tools.create(t)

            const finalData = await vendorApi.get()
            setVendors(finalData.vendors)
            setTools(finalData.tools)
            setBudgets(finalData.budgets)
          }

          // Clear localStorage after migration
          localStorage.removeItem('develup_vendors')
          localStorage.removeItem('develup_tools')
          localStorage.removeItem('develup_budgets')
        } else {
          setVendors(data.vendors)
          setTools(data.tools)
          setBudgets(data.budgets)
        }
      } catch (err) {
        console.error('Failed to load vendor data:', err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const addVendor = async (vendor) => {
    try {
      const newVendor = await vendorApi.vendors.create(vendor)
      setVendors(prev => [...prev, newVendor])
    } catch (err) {
      console.error('Failed to add vendor:', err)
    }
  }

  const updateVendor = async (updatedVendor) => {
    try {
      const { id, tools, ...data } = updatedVendor
      const saved = await vendorApi.vendors.update(id, data)
      setVendors(prev => prev.map(v => v.id === id ? saved : v))
    } catch (err) {
      console.error('Failed to update vendor:', err)
    }
  }

  const deleteVendor = async (vendorId) => {
    try {
      await vendorApi.vendors.remove(vendorId)
      setVendors(prev => prev.filter(v => v.id !== vendorId))
      setTools(prev => prev.filter(t => t.vendorId !== vendorId))
    } catch (err) {
      console.error('Failed to delete vendor:', err)
    }
  }

  const addTool = async (tool) => {
    try {
      const newTool = await vendorApi.tools.create(tool)
      setTools(prev => [...prev, newTool])
    } catch (err) {
      console.error('Failed to add tool:', err)
    }
  }

  const updateTool = async (updatedTool) => {
    try {
      const { id, vendor, ...data } = updatedTool
      const saved = await vendorApi.tools.update(id, data)
      setTools(prev => prev.map(t => t.id === id ? saved : t))
    } catch (err) {
      console.error('Failed to update tool:', err)
    }
  }

  const deleteTool = async (toolId) => {
    try {
      await vendorApi.tools.remove(toolId)
      setTools(prev => prev.filter(t => t.id !== toolId))
    } catch (err) {
      console.error('Failed to delete tool:', err)
    }
  }

  const updateBudgets = async (newBudgets) => {
    try {
      const updated = await vendorApi.update({ budgets: newBudgets })
      setBudgets(updated.budgets)
    } catch (err) {
      console.error('Failed to update budgets:', err)
    }
  }

  return (
    <VendorContext.Provider value={{
      vendors,
      tools,
      budgets,
      loading,
      addVendor,
      updateVendor,
      deleteVendor,
      addTool,
      updateTool,
      deleteTool,
      updateBudgets
    }}>
      {children}
    </VendorContext.Provider>
  )
}
