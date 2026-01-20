import { createContext, useContext, useState, useEffect } from 'react'
import { marketing } from '../../../lib/api'

const MarketingContext = createContext()

export const useMarketing = () => {
  const context = useContext(MarketingContext)
  if (!context) {
    throw new Error('useMarketing must be used within a MarketingProvider')
  }
  return context
}

const DEFAULT_BRAND_FOUNDATION = {
  companyName: '',
  vision: '',
  mission: '',
  values: [],
  targetAudience: '',
  colors: [],
  voice: '',
  emailTopics: [],
  senderEmail: '',
  logo: '',
  website: '',
  socialLinks: {
    instagram: '',
    twitter: '',
    linkedin: '',
    facebook: ''
  }
}

const DEFAULT_SOCIAL_MEDIA = {
  scheduledPosts: [],
  emailOutreach: [],
  posters: []
}

export const MarketingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [brandFoundation, setBrandFoundation] = useState(DEFAULT_BRAND_FOUNDATION)
  const [contentPlans, setContentPlans] = useState([])
  const [customers, setCustomers] = useState([])
  const [businessAnalyses, setBusinessAnalyses] = useState([])
  const [socialMedia, setSocialMedia] = useState(DEFAULT_SOCIAL_MEDIA)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await marketing.get()

        // Check if we should migrate from localStorage
        const hasLocalData = localStorage.getItem('ms_brand_foundation') ||
          localStorage.getItem('ms_customers') ||
          localStorage.getItem('ms_content_plans')

        const isDbEmpty = !data || (!data.brandFoundation && data.customers.length === 0)

        if (hasLocalData && isDbEmpty) {
          console.log('Migrating localStorage data to Neon DB...')
          const localBrand = JSON.parse(localStorage.getItem('ms_brand_foundation') || 'null')
          const localCustomers = JSON.parse(localStorage.getItem('ms_customers') || '[]')
          const localPlans = JSON.parse(localStorage.getItem('ms_content_plans') || '[]')
          const localSocial = JSON.parse(localStorage.getItem('ms_social_media') || 'null')
          const localAnalyses = JSON.parse(localStorage.getItem('ms_business_analyses') || '[]')

          if (localBrand) await marketing.update({ brandFoundation: localBrand })
          if (localPlans.length > 0) await marketing.update({ contentPlans: localPlans })
          if (localSocial) await marketing.update({ socialMedia: localSocial })
          if (localAnalyses.length > 0) await marketing.update({ businessAnalyses: localAnalyses })

          for (const customer of localCustomers) {
            await marketing.customers.create(customer)
          }

          // Clear localStorage after migration
          localStorage.removeItem('ms_brand_foundation')
          localStorage.removeItem('ms_customers')
          localStorage.removeItem('ms_content_plans')
          localStorage.removeItem('ms_social_media')
          localStorage.removeItem('ms_business_analyses')

          // Refetch data from DB
          data = await marketing.get()
        }

        if (data) {
          setBrandFoundation(data.brandFoundation || DEFAULT_BRAND_FOUNDATION)
          setContentPlans(data.contentPlans || [])
          setCustomers(data.customers || [])
          setBusinessAnalyses(data.businessAnalyses || [])
          setSocialMedia(data.socialMedia || DEFAULT_SOCIAL_MEDIA)
        }
      } catch (error) {
        console.error('Error fetching marketing data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const updateBrandFoundation = async (data) => {
    const updated = { ...brandFoundation, ...data }
    setBrandFoundation(updated)
    await marketing.update({ brandFoundation: updated })
  }

  const addContentPlan = async (plan) => {
    const newPlans = [...contentPlans, { ...plan, id: Date.now() }]
    setContentPlans(newPlans)
    await marketing.update({ contentPlans: newPlans })
  }

  const updateContentPlan = async (id, updatedPlan) => {
    const newPlans = contentPlans.map(p => p.id === id ? { ...p, ...updatedPlan } : p)
    setContentPlans(newPlans)
    await marketing.update({ contentPlans: newPlans })
  }

  const deleteContentPlan = async (id) => {
    const newPlans = contentPlans.filter(p => p.id !== id)
    setContentPlans(newPlans)
    await marketing.update({ contentPlans: newPlans })
  }

  const addSocialPost = async (post) => {
    const newSocial = {
      ...socialMedia,
      scheduledPosts: [...socialMedia.scheduledPosts, { ...post, id: Date.now() }]
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const updateSocialPost = async (id, updatedPost) => {
    const newSocial = {
      ...socialMedia,
      scheduledPosts: socialMedia.scheduledPosts.map(p => p.id === id ? { ...p, ...updatedPost } : p)
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const deleteSocialPost = async (id) => {
    const newSocial = {
      ...socialMedia,
      scheduledPosts: socialMedia.scheduledPosts.filter(p => p.id !== id)
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const addEmailOutreach = async (email) => {
    const newSocial = {
      ...socialMedia,
      emailOutreach: [...socialMedia.emailOutreach, { ...email, id: Date.now(), sentDate: new Date().toISOString().split('T')[0] }]
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const updateEmailOutreach = async (id, updatedEmail) => {
    const newSocial = {
      ...socialMedia,
      emailOutreach: socialMedia.emailOutreach.map(e => e.id === id ? { ...e, ...updatedEmail } : e)
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const deleteEmailOutreach = async (id) => {
    const newSocial = {
      ...socialMedia,
      emailOutreach: socialMedia.emailOutreach.filter(e => e.id !== id)
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const addPoster = async (poster) => {
    const newSocial = {
      ...socialMedia,
      posters: [...socialMedia.posters, { ...poster, id: Date.now() }]
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const updatePoster = async (id, updatedPoster) => {
    const newSocial = {
      ...socialMedia,
      posters: socialMedia.posters.map(p => p.id === id ? { ...p, ...updatedPoster } : p)
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const deletePoster = async (id) => {
    const newSocial = {
      ...socialMedia,
      posters: socialMedia.posters.filter(p => p.id !== id)
    }
    setSocialMedia(newSocial)
    await marketing.update({ socialMedia: newSocial })
  }

  const addCustomer = async (customer) => {
    const newCustomer = await marketing.customers.create({
      ...customer,
      signupDate: new Date().toISOString()
    })
    setCustomers(prev => [...prev, newCustomer])
  }

  const updateCustomer = async (id, updatedCustomer) => {
    const updated = await marketing.customers.update(id, updatedCustomer)
    setCustomers(prev => prev.map(c => c.id === id ? updated : c))
  }

  const deleteCustomer = async (id) => {
    await marketing.customers.remove(id)
    setCustomers(prev => prev.filter(c => c.id !== id))
  }

  const addAnalysis = async (analysis) => {
    const newAnalyses = [...businessAnalyses, { ...analysis, id: Date.now(), date: new Date().toISOString() }]
    setBusinessAnalyses(newAnalyses)
    await marketing.update({ businessAnalyses: newAnalyses })
  }

  return (
    <MarketingContext.Provider value={{
      loading,
      brandFoundation,
      contentPlans,
      customers,
      socialMedia,
      businessAnalyses,
      updateBrandFoundation,
      addContentPlan,
      updateContentPlan,
      deleteContentPlan,
      addSocialPost,
      updateSocialPost,
      deleteSocialPost,
      addEmailOutreach,
      updateEmailOutreach,
      deleteEmailOutreach,
      addPoster,
      updatePoster,
      deletePoster,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addAnalysis
    }}>
      {children}
    </MarketingContext.Provider>
  )
}
