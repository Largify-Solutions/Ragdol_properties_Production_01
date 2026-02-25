
'use client';

import { useState, useEffect } from 'react'
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  PhotoIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { useRealtimeSubscription } from '@/lib/hooks/useRealtimeSubscription'

interface Partner {
  id: string
  name: string
  description?: string
  logo_url?: string
  website_url?: string
  category?: string
  featured: boolean
  is_active: boolean
  sort_order: number
  created_at: any
  updated_at: any
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddPartner, setShowAddPartner] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    website_url: '',
    category: '',
    featured: false,
    is_active: true,
    sort_order: 0
  })

  // Predefined categories for dropdown
  const categories = [
    'Real Estate Developer',
    'Banking Partner',
    'Construction',
    'Interior Design',
    'Property Management',
    'Legal Services',
    'Home Inspection',
    'Mortgage Services',
    'Architecture',
    'Engineering',
    'Insurance',
    'Other'
  ]

  // Fetch partners via admin API (service role — bypasses RLS)
  const fetchPartners = async () => {
    try {
      setLoading(true)
      console.log('Fetching partners via API...')

      const res = await fetch('/api/admin/partners')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load partners')

      const partnersData: Partner[] = (json.partners || []).map((item: any) => ({
        id: item.id,
        name: item.name || '',
        description: item.description || '',
        logo_url: item.logo_url || '',
        website_url: item.website_url || '',
        category: item.category || '',
        featured: item.featured || false,
        is_active: item.is_active !== false,
        sort_order: item.sort_order || 0,
        created_at: item.created_at,
        updated_at: item.updated_at
      }))

      // Sort by order (ascending), then by creation date (newest first)
      partnersData.sort((a, b) => {
        if (a.sort_order !== b.sort_order) {
          return a.sort_order - b.sort_order
        }
        const dateA = new Date(a.created_at || 0)
        const dateB = new Date(b.created_at || 0)
        return dateB.getTime() - dateA.getTime()
      })

      setPartners(partnersData)
      console.log('Partners loaded:', partnersData.length)
    } catch (error) {
      console.error('Error fetching partners:', error)
      alert('Failed to load partners. Please check console for details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  // Realtime subscription for partners table
  useRealtimeSubscription({
    table: 'partners',
    onChange: () => fetchPartners(),
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value) || 0 : value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  // Upload logo to storage and return public URL
  const uploadLogo = async (partnerName: string): Promise<string | null> => {
    if (!logoFile) return null
    try {
      const uploadData = new FormData()
      uploadData.append('file', logoFile)
      uploadData.append('partner_name', partnerName)
      const res = await fetch('/api/admin/partners/upload-logo', { method: 'POST', body: uploadData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Logo upload failed')
      return json.url as string
    } catch (err: any) {
      console.error('Logo upload error:', err)
      alert('Logo upload failed: ' + err.message)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert('Partner name is required')
      return
    }

    // Validate website URL format
    if (formData.website_url && !formData.website_url.startsWith('http://') && !formData.website_url.startsWith('https://')) {
      formData.website_url = 'https://' + formData.website_url
    }

    try {
      setIsSubmitting(true)

      // Upload logo if a file was selected
      const uploadedLogoUrl = await uploadLogo(formData.name.trim())
      const finalLogoUrl = uploadedLogoUrl || formData.logo_url.trim()

      const partnerData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        logo_url: finalLogoUrl,
        website_url: formData.website_url.trim(),
        category: formData.category.trim(),
        featured: formData.featured,
        is_active: formData.is_active,
        sort_order: formData.sort_order || 0,
        updated_at: new Date().toISOString()
      }

      if (editingPartner) {
        // Update existing partner via API
        const res = await fetch('/api/admin/partners', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingPartner.id, ...partnerData }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to update partner')
        console.log('Partner updated:', editingPartner.id)
      } else {
        // Add new partner via API
        const res = await fetch('/api/admin/partners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partnerData),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to add partner')
        console.log('Partner added with ID:', json.partner?.id)
      }

      // Reset form and refresh list
      resetForm()
      await fetchPartners() // Wait for refresh
      
    } catch (error: any) {
      console.error('Error saving partner:', error)
      alert(`Error saving partner: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setLogoFile(null)
    setLogoPreview(null)
    setFormData({
      name: '',
      description: '',
      logo_url: '',
      website_url: '',
      category: '',
      featured: false,
      is_active: true,
      sort_order: 0
    })
    setShowAddPartner(false)
    setEditingPartner(null)
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setLogoFile(null)
    setLogoPreview(partner.logo_url || null)
    setFormData({
      name: partner.name,
      description: partner.description || '',
      logo_url: partner.logo_url || '',
      website_url: partner.website_url || '',
      category: partner.category || '',
      featured: partner.featured,
      is_active: partner.is_active,
      sort_order: partner.sort_order
    })
    setShowAddPartner(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner? This action cannot be undone.')) return

    try {
      console.log('Deleting partner:', id)
      const res = await fetch(`/api/admin/partners?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to delete partner')

      console.log('Partner deleted successfully')
      setPartners(partners.filter(partner => partner.id !== id))
    } catch (error) {
      console.error('Error deleting partner:', error)
      alert('Failed to delete partner. Please try again.')
    }
  }

  const toggleActive = async (partner: Partner) => {
    try {
      const res = await fetch('/api/admin/partners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: partner.id,
          is_active: !partner.is_active,
          updated_at: new Date().toISOString()
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update partner')

      setPartners(partners.map(p =>
        p.id === partner.id
          ? { ...p, is_active: !p.is_active }
          : p
      ))
    } catch (error) {
      console.error('Error updating partner status:', error)
      alert('Error updating partner. Please try again.')
    }
  }

  const toggleFeatured = async (partner: Partner) => {
    try {
      const res = await fetch('/api/admin/partners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: partner.id,
          featured: !partner.featured,
          updated_at: new Date().toISOString()
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update partner')

      setPartners(partners.map(p =>
        p.id === partner.id
          ? { ...p, featured: !p.featured }
          : p
      ))
    } catch (error) {
      console.error('Error updating partner featured status:', error)
      alert('Error updating partner. Please try again.')
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A'
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch (error) {
      return 'N/A'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partners Management</h1>
          <p className="text-muted-foreground">Manage partner companies and organizations for your website.</p>
        </div>
        <button
          onClick={() => {
            setEditingPartner(null)
            resetForm()
            setShowAddPartner(true)
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Partner
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Partners</h3>
          <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Active</h3>
          <p className="text-2xl font-bold text-green-600">
            {partners.filter(p => p.is_active).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Featured</h3>
          <p className="text-2xl font-bold text-purple-600">
            {partners.filter(p => p.featured).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Inactive</h3>
          <p className="text-2xl font-bold text-gray-600">
            {partners.filter(p => !p.is_active).length}
          </p>
        </div>
      </div>

      {/* Add/Edit Partner Modal */}
      {showAddPartner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <input
                  type="url"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Partner Logo</label>
                <div className="flex items-start gap-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
                  {/* Preview */}
                  <div className="shrink-0">
                    {(logoPreview || formData.logo_url) ? (
                      <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 p-1 flex items-center justify-center">
                        <img
                          src={logoPreview || formData.logo_url}
                          alt="Logo preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <PhotoIcon className="h-7 w-7 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Upload Logo File</label>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isSubmitting}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          setLogoFile(file)
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => setLogoPreview(reader.result as string)
                            reader.readAsDataURL(file)
                          } else {
                            setLogoPreview(null)
                          }
                        }}
                        className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG, WEBP — uploaded to storage</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Or paste logo URL</label>
                      <input
                        type="url"
                        name="logo_url"
                        value={formData.logo_url}
                        onChange={(e) => {
                          handleInputChange(e)
                          setLogoFile(null)
                          setLogoPreview(e.target.value || null)
                        }}
                        disabled={isSubmitting}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Recommended size: 200x100px PNG or SVG</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  disabled={isSubmitting}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Brief description about the partner..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="sort_order"
                    value={formData.sort_order}
                    onChange={handleInputChange}
                    min="0"
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500">
                    Lower numbers appear first
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Active</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Featured</label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                      {editingPartner ? 'Updating...' : 'Adding...'}
                    </>
                  ) : editingPartner ? 'Update Partner' : 'Add Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Partners List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md border">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Partners</h3>
            <button
              onClick={fetchPartners}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-12">
              <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No partners found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Get started by adding your first partner.
              </p>
              <button
                onClick={() => setShowAddPartner(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Partner
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner) => (
                <div key={partner.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col h-full">
                    {/* Logo and Name */}
                    <div className="flex items-start space-x-3 mb-3">
                      {partner.logo_url ? (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg p-2 flex items-center justify-center shrink-0">
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><PhotoIcon class="h-8 w-8 text-gray-400" /></div>'
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg p-2 flex items-center justify-center shrink-0">
                          <PhotoIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{partner.name}</h4>
                          {partner.featured && (
                            <StarIcon className="h-4 w-4 text-yellow-500 shrink-0" />
                          )}
                        </div>
                        {partner.category && (
                          <p className="text-sm text-blue-600 truncate">{partner.category}</p>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          {partner.is_active ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              <XCircleIcon className="h-3 w-3 mr-1" />
                              Inactive
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            Order: {partner.sort_order}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {partner.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {partner.description}
                      </p>
                    )}

                    {/* Website */}
                    {partner.website_url && (
                      <div className="mb-3">
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <GlobeAltIcon className="h-4 w-4 mr-1" />
                          Visit Website
                        </a>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                      <div className="text-xs text-gray-500">
                        {formatDate(partner.created_at)}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleFeatured(partner)}
                          className={`p-1.5 rounded-md ${
                            partner.featured
                              ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                          }`}
                          title={partner.featured ? 'Remove featured' : 'Mark as featured'}
                        >
                          <StarIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleActive(partner)}
                          className={`p-1.5 rounded-md ${
                            partner.is_active
                              ? 'text-green-600 hover:text-green-800 hover:bg-green-50'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                          title={partner.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {partner.is_active ? (
                            <CheckCircleIcon className="h-4 w-4" />
                          ) : (
                            <XCircleIcon className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(partner)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                          title="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}