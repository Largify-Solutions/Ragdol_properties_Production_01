'use client'

import { useState, useEffect } from 'react'
import { StarIcon as StarSolidIcon, UserCircleIcon, CalendarIcon, BuildingOfficeIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { StarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

// Supabase import
import { supabase } from '@/lib/supabase-browser'

// Testimonial Interface
interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  email: string
  message: string
  rating: number
  featured: boolean
  approved: boolean
  createdAt: any
  updatedAt: any
  avatar?: string
}

// Review Submission Modal Component
function ReviewSubmissionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: '',
    rating: 5
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields')
      return
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    
    if (formData.rating < 1 || formData.rating > 5) {
      setError('Please select a rating between 1 and 5')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      // Submit to Supabase inquiries table
      const { error: inquiryError } = await supabase
        .from('inquiries')
        .insert({
          inquiry_type: 'testimonial_submission',
          client_name: formData.name.trim(),
          client_email: formData.email.trim(),
          client_phone: formData.phone.trim() || '',
          message: formData.message.trim(),
          status: 'pending',
          source: 'testimonials_page',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (inquiryError) throw inquiryError;

      // Also submit to testimonials table for admin review
      const { error: testimonialError } = await supabase
        .from('testimonials')
        .insert({
          name: formData.name.trim(),
          company: formData.company.trim() || '',
          role: formData.position.trim() || '',
          content: formData.message.trim(),
          rating: formData.rating,
          is_active: false, // Admin needs to approve
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (testimonialError) throw testimonialError;

      setSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          message: '',
          rating: 5
        })
        setSuccess(false)
        onClose()
      }, 2000)

    } catch (error) {
      console.error('Error submitting review:', error)
      setError('Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-2xl transform overflow-hidden mt-30 rounded-2xl bg-white shadow-2xl transition-all">
          {/* Header */}
          <div className="bg-linear-to-r from-primary to-secondary p-2">
            <div className="flex items-center justify-between">
              <div>
                <h6 className="text-2xl font-serif text-white">Submit Your Review</h6>
                <p className="text-slate-200 mt-2">Share your experience with RAGDOLL Properties</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-slate-900 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-100 rounded-full">
                  <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-800 mb-3">Thank You!</h4>
                <p className="text-slate-600 mb-8">
                  Your review has been submitted successfully. It will appear after admin approval.
                </p>
                <div className="animate-pulse text-sm text-slate-500">
                  Closing in 2 seconds...
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success/Error Messages */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+971 50 123 4567"
                    />
                  </div>

                  {/* Company */}
                  

                  {/* Position */}
                 

                  {/* Rating */}
                  
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Experience *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Share your experience with RAGDOLL Properties. What did you like? How was the service? Would you recommend us to others?"
                  />
                 
                </div>

                {/* Terms */}
               

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Fetch Testimonials from Supabase
async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    console.log('Fetching testimonials from Supabase...')
    
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .limit(20);
    
    if (error) throw error;
    
    const testimonials: Testimonial[] = (data || []).map((row: any) => {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.name || 'Client')}&background=random&color=fff&bold=true`
      
      return {
        id: row.id,
        name: row.name || 'Anonymous Client',
        position: row.role || '',
        company: row.company || '',
        email: '',
        message: row.content || '',
        rating: row.rating || 5,
        featured: row.is_featured || false,
        approved: row.is_active || false,
        createdAt: row.created_at || '',
        updatedAt: row.updated_at || '',
        avatar: row.avatar_url || avatarUrl
      }
    });
    
    console.log(`Found ${testimonials.length} testimonials`)
    
    const sortedTestimonials = testimonials.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      try {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() / 1000 : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() / 1000 : 0
        return dateB - dateA
      } catch {
        return 0
      }
    })
    
    return sortedTestimonials
    
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return getDemoTestimonials()
  }
}

// Demo testimonials as fallback
function getDemoTestimonials(): Testimonial[] {
  console.log('Using demo testimonials data')
  return [
    {
      id: 'demo-1',
      name: 'Harry',
      position: 'CEO',
      company: 'Samsung',
      email: 'harry@gmail.com',
      message: 'Customer reviews provide valuable insights into your overall service and help build trust with potential buyers. Sharing your experience helps others make informed decisions while allowing businesses to improve and serve you better.',
      rating: 5,
      featured: true,
      approved: true,
      createdAt: { seconds: Date.now() / 1000 },
      updatedAt: { seconds: Date.now() / 1000 },
      avatar: 'https://ui-avatars.com/api/?name=Harry&background=6366f1&color=fff&bold=true'
    },
    {
      id: 'demo-2',
      name: 'Sarah Johnson',
      position: 'Investment Director',
      company: 'Global Ventures',
      email: 'sarah@globalventures.com',
      message: 'RAGDOLL Properties transformed our Dubai investment portfolio. Their market insights and attention to detail are unparalleled. We have complete trust in their expertise.',
      rating: 5,
      featured: true,
      approved: true,
      createdAt: { seconds: Date.now() / 1000 },
      updatedAt: { seconds: Date.now() / 1000 },
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff&bold=true'
    },
    {
      id: 'demo-3',
      name: 'Ahmed Al Mansoori',
      position: 'Business Owner',
      company: 'Al Mansoori Group',
      email: 'ahmed@almansoori.com',
      message: 'The team at RAGDOLL made purchasing my dream villa seamless. Their professionalism and local knowledge exceeded all expectations. Highly recommended!',
      rating: 5,
      featured: false,
      approved: true,
      createdAt: { seconds: Date.now() / 1000 },
      updatedAt: { seconds: Date.now() / 1000 },
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Al+Mansoori&background=3b82f6&color=fff&bold=true'
    }
  ]
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [firebaseError, setFirebaseError] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    averageRating: 0,
    fiveStar: 0
  })
  const [showReviewModal, setShowReviewModal] = useState(false)

  // Fetch testimonials on component mount
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true)
        const testimonialsData = await fetchTestimonials()
        setTestimonials(testimonialsData)
        
        // Calculate statistics
        const total = testimonialsData.length
        const featured = testimonialsData.filter(t => t.featured).length
        const totalRating = testimonialsData.reduce((sum, t) => sum + t.rating, 0)
        const averageRating = total > 0 ? totalRating / total : 0
        const fiveStar = testimonialsData.filter(t => t.rating === 5).length
        
        setStats({
          total,
          featured,
          averageRating: parseFloat(averageRating.toFixed(1)),
          fiveStar
        })
        
      } catch (error) {
        console.error('Error loading testimonials:', error)
        setFirebaseError('Unable to load testimonials from database. Showing demo data.')
        const demoData = getDemoTestimonials()
        setTestimonials(demoData)
        
        const total = demoData.length
        const featured = demoData.filter(t => t.featured).length
        const totalRating = demoData.reduce((sum, t) => sum + t.rating, 0)
        const averageRating = total > 0 ? totalRating / total : 0
        const fiveStar = demoData.filter(t => t.rating === 5).length
        
        setStats({
          total,
          featured,
          averageRating: parseFloat(averageRating.toFixed(1)),
          fiveStar
        })
      } finally {
        setLoading(false)
      }
    }
    
    loadTestimonials()
  }, [])

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Recently'
    
    try {
      let seconds
      if (timestamp.seconds) {
        seconds = timestamp.seconds
      } else if (typeof timestamp === 'string') {
        const date = new Date(timestamp)
        seconds = date.getTime() / 1000
      } else {
        return 'Recently'
      }
      
      const date = new Date(seconds * 1000)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 0) return 'Today'
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    } catch (error) {
      return 'Recently'
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          i < Math.floor(rating) ? (
            <StarSolidIcon key={i} className="h-5 w-5 text-amber-500" />
          ) : (
            <StarIcon key={i} className="h-5 w-5 text-amber-200" />
          )
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Review Submission Modal */}
      <ReviewSubmissionModal 
        isOpen={showReviewModal} 
        onClose={() => setShowReviewModal(false)} 
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-secondary to-slate-900">
        <div className="absolute inset-0">
          <Image 
            src="https://images.pexels.com/photos/567666/pexels-photo-567666.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Happy Clients"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/70 to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl text-center mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-white text-sm font-bold tracking-widest uppercase">Client Stories</span>
            </div>
            <h5 className="text-5xl md:text-7xl lg:text-4xl font-serif text-white mb-6 leading-tight">
              <span className="text-primary">Client</span><br />
              Testimonials
            </h5>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Real feedback from our valued clients who have experienced the RAGDOLL PROPERTIES.
             
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white -mt-20 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2">
              <div className="text-4xl font-black text-primary mb-2">{stats.total}</div>
              <div className="text-lg font-bold text-slate-800 mb-2">Total Reviews</div>
              <div className="text-sm text-slate-500">Verified testimonials</div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2">
              <div className="text-4xl font-black text-primary mb-2">{stats.averageRating}</div>
              <div className="text-lg font-bold text-slate-800 mb-2">Average Rating</div>
              <div className="flex justify-center">{renderStars(stats.averageRating)}</div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2">
              <div className="text-4xl font-black text-primary mb-2">{stats.fiveStar}</div>
              <div className="text-lg font-bold text-slate-800 mb-2">5-Star Reviews</div>
              <div className="text-sm text-slate-500">Perfect satisfaction</div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2">
              <div className="text-4xl font-black text-primary mb-2">{stats.featured}</div>
              <div className="text-lg font-bold text-slate-800 mb-2">Featured</div>
              <div className="text-sm text-slate-500">Client highlights</div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6">
              What Our <span className="text-primary">Clients</span> Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Authentic feedback from clients who have trusted RAGDOLL Properties with their real estate journey
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mb-6"></div>
              <p className="text-lg text-slate-600">Loading testimonials...</p>
              <p className="text-sm text-slate-400 mt-2">Fetching real-time client feedback</p>
            </div>
          ) : firebaseError ? (
            <div className="text-center py-12 bg-amber-50 rounded-2xl border border-amber-200 p-8 mb-8">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-amber-100 rounded-full">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Database Connection Issue</h3>
              <p className="text-slate-600 mb-4">{firebaseError}</p>
              <p className="text-sm text-slate-500">Showing demo testimonials</p>
            </div>
          ) : testimonials.length > 0 ? (
            <>
              {/* Featured Testimonials (if any) */}
              {testimonials.filter(t => t.featured).length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Featured Testimonials</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {testimonials
                      .filter(t => t.featured)
                      .slice(0, 2)
                      .map((testimonial) => (
                        <div key={testimonial.id} className="group">
                          <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border-2 border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                            <div className="p-8">
                              <div className="flex items-start gap-6 mb-6">
                                <div className="relative">
                                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/10">
                                    <Image
                                      src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                                      alt={testimonial.name}
                                      width={64}
                                      height={64}
                                      className="object-cover"
                                    />
                                  </div>
                                  <StarSolidIcon className="absolute -top-2 -right-2 h-5 w-5 text-amber-500" />
                                </div>
                                
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-slate-800 mb-1">{testimonial.name}</h3>
                                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-3">
                                    <BuildingOfficeIcon className="h-4 w-4" />
                                    <span className="font-medium">{testimonial.position}</span>
                                    {testimonial.company && (
                                      <>
                                        <span className="text-slate-400">•</span>
                                        <span>{testimonial.company}</span>
                                      </>
                                    )}
                                  </div>
                                  <div className="mb-4">
                                    {renderStars(testimonial.rating)}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="pl-2 border-l-4 border-primary/20">
                                <p className="text-slate-700 text-lg italic leading-relaxed">
                                  "{testimonial.message}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* All Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="group">
                    <div className={`h-full bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border ${testimonial.featured ? 'border-primary/30' : 'border-slate-100'} transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/70 hover:-translate-y-2`}>
                      <div className="p-6">
                        {/* Client Info Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                              <Image
                                src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            {testimonial.featured && (
                              <StarSolidIcon className="absolute -top-1 -right-1 h-4 w-4 text-amber-500" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-800 truncate">{testimonial.name}</h3>
                            <div className="flex items-center gap-2 text-slate-600 text-sm mt-1">
                              {testimonial.position && (
                                <span className="font-medium truncate">{testimonial.position}</span>
                              )}
                              {testimonial.company && (
                                <>
                                  <span className="text-slate-400">•</span>
                                  <span className="truncate">{testimonial.company}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {renderStars(testimonial.rating)}
                            <span className="text-sm font-bold text-slate-700">
                              {testimonial.rating}.0
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {formatTimestamp(testimonial.createdAt)}
                          </span>
                        </div>
                        
                        {/* Message */}
                        <div className="mb-4">
                          <p className="text-slate-700 text-sm leading-relaxed line-clamp-4">
                            "{testimonial.message}"
                          </p>
                        </div>
                        
                        {/* Verification Badge */}
                        <div className="pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-slate-500">
                              <CheckBadgeIcon className="h-3 w-3 text-green-500" />
                              <span>Verified</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-400">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 7H7v6h6V7z" />
                                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                              </svg>
                  
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-slate-100 rounded-full">
                <UserCircleIcon className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">No Testimonials Yet</h3>
              <p className="text-slate-600 max-w-md mx-auto mb-8">
                Be the first to share your experience with RAGDOLL Properties.
              </p>
              <button
                onClick={() => setShowReviewModal(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all duration-300"
              >
                Share Your Experience
                <StarSolidIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-r from-primary to-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <ShieldCheckIcon className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-bold tracking-widest uppercase">Trust & Transparency</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
              Join Our <span className="text-slate-900">Community</span> of<br />
              Satisfied Clients
            </h2>
            
            <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto">
              Experience the RAGDOLL difference and share your story with future clients.
              Every review helps us maintain our standard of excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-10 py-4 bg-white text-secondary font-bold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-xl"
              >
                Submit Your Review
              </button>
              <Link
                href="/properties"
                className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-secondary transition-all duration-300 text-center"
              >
                Browse Properties
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckBadgeIcon className="h-4 w-4" />
                  <span>All Reviews Verified</span>
                </div>
               
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}