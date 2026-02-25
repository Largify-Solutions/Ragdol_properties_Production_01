
'use client';

import { useState, useEffect } from 'react'
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { useRealtimeSubscription } from '@/lib/hooks/useRealtimeSubscription'

interface Testimonial {
  id: string
  name: string
  email: string
  company?: string
  role?: string
  content: string
  rating: number
  is_active: boolean
  is_featured: boolean
  created_at: any
  updated_at: any
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddTestimonial, setShowAddTestimonial] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    content: '',
    rating: 5,
    is_active: true,
    is_featured: false
  })

  // Fetch testimonials via admin API (service role — bypasses RLS)
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      console.log('Fetching testimonials via API...')

      const res = await fetch('/api/admin/testimonials')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load testimonials')

      const testimonialsData: Testimonial[] = (json.testimonials || []).map((item: any) => ({
        id: item.id,
        name: item.name || '',
        email: item.email || '',
        company: item.company || '',
        role: item.role || '',
        content: item.content || '',
        rating: item.rating || 5,
        is_active: item.is_active || false,
        is_featured: item.is_featured || false,
        created_at: item.created_at,
        updated_at: item.updated_at
      }))

      console.log('Testimonials loaded:', testimonialsData.length)
      setTestimonials(testimonialsData)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      alert('Failed to load testimonials. Please check console for details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  // Realtime subscription for testimonials table
  useRealtimeSubscription({
    table: 'testimonials',
    onChange: () => fetchTestimonials(),
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.content.trim()) {
      alert('Name, email, and message are required')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return
    }

    try {
      setIsSubmitting(true)
      
      const testimonialData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        role: formData.role.trim(),
        content: formData.content.trim(),
        rating: formData.rating,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        updated_at: new Date().toISOString()
      }

      if (editingTestimonial) {
        // Update existing testimonial via API
        const res = await fetch('/api/admin/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingTestimonial.id, ...testimonialData }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to update testimonial')
        console.log('Testimonial updated:', editingTestimonial.id)
      } else {
        // Add new testimonial via API
        const res = await fetch('/api/admin/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testimonialData),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to create testimonial')
        console.log('Testimonial added with ID:', json.testimonial?.id)
      }

      // Reset form and refresh list
      resetForm()
      await fetchTestimonials() // Wait for refresh
      
    } catch (error: any) {
      console.error('Error saving testimonial:', error)
      alert(`Error saving testimonial: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      role: '',
      content: '',
      rating: 5,
      is_active: true,
      is_featured: false
    })
    setShowAddTestimonial(false)
    setEditingTestimonial(null)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      email: testimonial.email,
      company: testimonial.company || '',
      role: testimonial.role || '',
      content: testimonial.content,
      rating: testimonial.rating,
      is_active: testimonial.is_active,
      is_featured: testimonial.is_featured
    })
    setShowAddTestimonial(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial? This action cannot be undone.')) return

    try {
      console.log('Deleting testimonial:', id)
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to delete testimonial')

      console.log('Testimonial deleted successfully')
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id))
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Failed to delete testimonial. Please try again.')
    }
  }

  const toggleApproval = async (testimonial: Testimonial) => {
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: testimonial.id,
          is_active: !testimonial.is_active,
          updated_at: new Date().toISOString()
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update testimonial')

      setTestimonials(testimonials.map(t =>
        t.id === testimonial.id
          ? { ...t, is_active: !t.is_active }
          : t
      ))
    } catch (error) {
      console.error('Error updating testimonial approval:', error)
      alert('Error updating testimonial. Please try again.')
    }
  }

  const toggleFeatured = async (testimonial: Testimonial) => {
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: testimonial.id,
          is_featured: !testimonial.is_featured,
          updated_at: new Date().toISOString()
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update testimonial')

      setTestimonials(testimonials.map(t =>
        t.id === testimonial.id
          ? { ...t, is_featured: !t.is_featured }
          : t
      ))
    } catch (error) {
      console.error('Error updating testimonial featured status:', error)
      alert('Error updating testimonial. Please try again.')
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
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

  // Calculate statistics
  const approvedCount = testimonials.filter(t => t.is_active).length
  const featuredCount = testimonials.filter(t => t.is_featured).length
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '0.0'

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials Management</h1>
          <p className="text-muted-foreground">Manage customer testimonials and reviews for your website.</p>
        </div>
        <button
          onClick={() => {
            setEditingTestimonial(null)
            resetForm()
            setShowAddTestimonial(true)
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Testimonial
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Testimonials</h3>
          <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Featured</h3>
          <p className="text-2xl font-bold text-purple-600">{featuredCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Avg. Rating</h3>
          <p className="text-2xl font-bold text-yellow-600">{averageRating} ⭐</p>
        </div>
      </div>

      {/* Add/Edit Testimonial Modal */}
      {showAddTestimonial && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
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
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="ABC Corporation"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Position/Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="CEO"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  <option value={2}>⭐⭐ (2 Stars)</option>
                  <option value={1}>⭐ (1 Star)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  disabled={isSubmitting}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Share your experience..."
                />
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
                    name="is_featured"
                    checked={formData.is_featured}
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
                      {editingTestimonial ? 'Updating...' : 'Adding...'}
                    </>
                  ) : editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md border">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Testimonials</h3>
            <button
              onClick={fetchTestimonials}
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
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No testimonials found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Get started by adding your first testimonial.
              </p>
              <button
                onClick={() => setShowAddTestimonial(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Testimonial
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col h-full">
                    {/* Header with name and rating */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                        {testimonial.company && (
                          <p className="text-sm text-blue-600">{testimonial.company}</p>
                        )}
                        {testimonial.role && (
                          <p className="text-xs text-gray-500">{testimonial.role}</p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-4 flex-1">
                      <p className="text-gray-600 italic">"{testimonial.content}"</p>
                    </div>

                    {/* Footer with actions and status */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        {testimonial.is_active ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            <EyeSlashIcon className="h-3 w-3 mr-1" />
                            Inactive
                          </span>
                        )}
                        {testimonial.is_featured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            <StarIcon className="h-3 w-3 mr-1" />
                            Featured
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          <CalendarIcon className="h-3 w-3 inline mr-1" />
                          {formatDate(testimonial.created_at)}
                        </span>
                      </div>

                      <div className="flex space-x-1">
                        <button
                          onClick={() => toggleApproval(testimonial)}
                          className={`p-1.5 rounded-md ${
                            testimonial.is_active
                              ? 'text-green-600 hover:text-green-800 hover:bg-green-50'
                              : 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                          }`}
                          title={testimonial.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {testimonial.is_active ? (
                            <CheckCircleIcon className="h-4 w-4" />
                          ) : (
                            <EyeSlashIcon className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleFeatured(testimonial)}
                          className={`p-1.5 rounded-md ${
                            testimonial.is_featured
                              ? 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'
                              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                          }`}
                          title={testimonial.is_featured ? 'Remove featured' : 'Mark as featured'}
                        >
                          <StarIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
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