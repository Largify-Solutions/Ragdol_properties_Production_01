/**
 * Supabase Data Fetching Utilities
 * Central helper for all database operations across the app
 */

import { supabase } from './supabase-browser'
import type { Database } from './database.types'

type Tables = Database['public']['Tables']

// ============================================================================
// PROPERTIES
// ============================================================================

export interface PropertyFilters {
  type?: string
  status?: string
  minPrice?: number
  maxPrice?: number
  minBeds?: number
  area?: string
  city?: string
  featured?: boolean
  published?: boolean
  agentId?: string
  search?: string
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export async function fetchProperties(filters: PropertyFilters = {}) {
  const {
    type, status, minPrice, maxPrice, minBeds, area, city,
    featured, published = true, agentId, search,
    limit = 20, offset = 0, sortBy = 'created_at', sortOrder = 'desc'
  } = filters

  let query = supabase
    .from('properties')
    .select('*, agents(id, title, profile_image, rating)', { count: 'exact' })

  if (published !== undefined) query = query.eq('published', published)
  if (type) query = query.eq('type', type)
  if (status) query = query.eq('status', status)
  if (minPrice) query = query.gte('price', minPrice)
  if (maxPrice) query = query.lte('price', maxPrice)
  if (minBeds) query = query.gte('beds', minBeds)
  if (area) query = query.ilike('area', `%${area}%`)
  if (city) query = query.ilike('city', `%${city}%`)
  if (featured) query = query.eq('featured', true)
  if (agentId) query = query.eq('agent_id', agentId)
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,area.ilike.%${search}%,address.ilike.%${search}%`)
  }

  query = query.order(sortBy, { ascending: sortOrder === 'asc' })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

export async function fetchPropertyById(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*, agents(id, title, profile_image, rating, whatsapp, office, bio, areas, experience_years, review_count)')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function fetchPropertyBySlug(slug: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*, agents(id, title, profile_image, rating, whatsapp, office)')
    .eq('slug', slug)
    .single()

  return { data, error }
}

export async function createProperty(property: any) {
  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single()

  return { data, error }
}

export async function updateProperty(id: string, updates: any) {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteProperty(id: string) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)

  return { error }
}

// ============================================================================
// AGENT PROPERTIES (listed by agent portal)
// ============================================================================

export async function fetchAgentProperties(agentId?: string, filters: PropertyFilters = {}) {
  let query = supabase
    .from('agent_properties')
    .select('*', { count: 'exact' })

  if (agentId) query = query.eq('agent_id', agentId)
  if (filters.status) query = query.eq('status', filters.status)
  if (filters.published !== undefined) query = query.eq('published', filters.published)

  query = query.order('created_at', { ascending: false })

  if (filters.limit) query = query.limit(filters.limit)
  if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit ?? 20) - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

// ============================================================================
// AGENTS
// ============================================================================

export async function fetchAgents(filters: { approved?: boolean, limit?: number, offset?: number } = {}) {
  const { approved = true, limit = 20, offset = 0 } = filters

  let query = supabase
    .from('agents')
    .select('*, profiles(full_name, email, avatar_url)', { count: 'exact' })

  if (approved !== undefined) query = query.eq('approved', approved)

  query = query.order('rating', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

export async function fetchAgentById(id: string) {
  const { data, error } = await supabase
    .from('agents')
    .select('*, profiles(full_name, email, avatar_url, phone)')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function fetchAgentByUserId(userId: string) {
  const { data, error } = await supabase
    .from('agents')
    .select('*, profiles(full_name, email, avatar_url, phone)')
    .eq('user_id', userId)
    .single()

  return { data, error }
}

export async function createAgent(agent: any) {
  const { data, error } = await supabase
    .from('agents')
    .insert(agent)
    .select()
    .single()

  return { data, error }
}

export async function updateAgent(id: string, updates: any) {
  const { data, error } = await supabase
    .from('agents')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteAgent(id: string) {
  const { error } = await supabase
    .from('agents')
    .delete()
    .eq('id', id)

  return { error }
}

// ============================================================================
// PROJECTS
// ============================================================================

export async function fetchProjects(filters: { status?: string, featured?: boolean, published?: boolean, limit?: number, offset?: number } = {}) {
  const { status, featured, published = true, limit = 20, offset = 0 } = filters

  let query = supabase
    .from('projects')
    .select('*, developers(name, logo_url)', { count: 'exact' })

  if (published !== undefined) query = query.eq('published', published)
  if (status) query = query.eq('status', status)
  if (featured) query = query.eq('featured', true)

  query = query.order('created_at', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

export async function fetchProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, developers(name, logo_url, description, website)')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function createProject(project: any) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  return { data, error }
}

export async function updateProject(id: string, updates: any) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  return { error }
}

// ============================================================================
// ENQUIRIES
// ============================================================================

export async function fetchEnquiries(filters: { userId?: string, agentId?: string, status?: string, limit?: number, offset?: number } = {}) {
  const { userId, agentId, status, limit = 20, offset = 0 } = filters

  let query = supabase
    .from('enquiries')
    .select('*, properties(id, title, price, image_url), agents(id, title, profile_image)', { count: 'exact' })

  if (userId) query = query.eq('user_id', userId)
  if (agentId) query = query.eq('agent_id', agentId)
  if (status) query = query.eq('status', status)

  query = query.order('created_at', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

export async function fetchEnquiryById(id: string) {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*, properties(id, title, price, image_url, address, area), agents(id, title, profile_image, whatsapp)')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function createEnquiry(enquiry: any) {
  const { data, error } = await supabase
    .from('enquiries')
    .insert(enquiry)
    .select()
    .single()

  return { data, error }
}

export async function updateEnquiry(id: string, updates: any) {
  const { data, error } = await supabase
    .from('enquiries')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

// ============================================================================
// APPLICATIONS
// ============================================================================

export async function fetchApplications(filters: { userId?: string, agentId?: string, status?: string, limit?: number, offset?: number } = {}) {
  const { userId, agentId, status, limit = 20, offset = 0 } = filters

  let query = supabase
    .from('applications')
    .select('*, properties(id, title, price), agents:assigned_agent_id(id, title)', { count: 'exact' })

  if (userId) query = query.eq('user_id', userId)
  if (agentId) query = query.eq('assigned_agent_id', agentId)
  if (status) query = query.eq('status', status)

  query = query.order('created_at', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

export async function createApplication(application: any) {
  const { data, error } = await supabase
    .from('applications')
    .insert(application)
    .select()
    .single()

  return { data, error }
}

export async function updateApplication(id: string, updates: any) {
  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

// ============================================================================
// VALUATIONS
// ============================================================================

export async function fetchValuations(filters: { userId?: string, status?: string, limit?: number, offset?: number } = {}) {
  const { userId, status, limit = 20, offset = 0 } = filters

  let query = supabase
    .from('property_valuations')
    .select('*', { count: 'exact' })

  if (userId) query = query.eq('user_id', userId)
  if (status) query = query.eq('status', status)

  query = query.order('created_at', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

export async function createValuation(valuation: any) {
  const { data, error } = await supabase
    .from('property_valuations')
    .insert(valuation)
    .select()
    .single()

  return { data, error }
}

export async function updateValuation(id: string, updates: any) {
  const { data, error } = await supabase
    .from('property_valuations')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export async function fetchNotifications(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data: data ?? [], error }
}

export async function markNotificationRead(id: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true, read_at: new Date().toISOString() })
    .eq('id', id)

  return { error }
}

// ============================================================================
// SAVED PROPERTIES
// ============================================================================

export async function fetchSavedProperties(userId: string) {
  const { data, error } = await supabase
    .from('saved_properties')
    .select('*, properties(id, title, price, image_url, images, beds, baths, sqft, area, city, type, status)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data: data ?? [], error }
}

export async function saveProperty(userId: string, propertyId: string) {
  const { data, error } = await supabase
    .from('saved_properties')
    .insert({ user_id: userId, property_id: propertyId })
    .select()
    .single()

  return { data, error }
}

export async function unsaveProperty(userId: string, propertyId: string) {
  const { error } = await supabase
    .from('saved_properties')
    .delete()
    .eq('user_id', userId)
    .eq('property_id', propertyId)

  return { error }
}

// ============================================================================
// CUSTOMER QUESTIONS
// ============================================================================

export async function fetchQuestions(filters: { userId?: string, status?: string, limit?: number } = {}) {
  const { userId, status, limit = 50 } = filters

  let query = supabase
    .from('customer_questions')
    .select('*')

  if (userId) query = query.eq('user_id', userId)
  if (status) query = query.eq('status', status)

  query = query.order('created_at', { ascending: false })
  query = query.limit(limit)

  const { data, error } = await query
  return { data: data ?? [], error }
}

export async function createQuestion(question: any) {
  const { data, error } = await supabase
    .from('customer_questions')
    .insert(question)
    .select()
    .single()

  return { data, error }
}

export async function answerQuestion(id: string, reply: string) {
  const { data, error } = await supabase
    .from('customer_questions')
    .update({
      admin_response: reply,
      admin_response_at: new Date().toISOString(),
      status: 'answered',
    })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

// ============================================================================
// CATEGORIES
// ============================================================================

export async function fetchCategories(activeOnly = true) {
  let query = supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (activeOnly) query = query.eq('is_active', true)

  const { data, error } = await query
  return { data: data ?? [], error }
}

export async function createCategory(category: any) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()

  return { data, error }
}

export async function updateCategory(id: string, updates: any) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  return { error }
}

// ============================================================================
// POSTS / BLOGS
// ============================================================================

export async function fetchPosts(filters: { status?: string, category?: string, limit?: number, offset?: number } = {}) {
  const { status = 'published', category, limit = 20, offset = 0 } = filters

  let query = supabase
    .from('posts')
    .select('*, profiles:author_id(full_name, avatar_url)', { count: 'exact' })

  if (status) query = query.eq('status', status)
  if (category) query = query.eq('category', category)

  query = query.order('published_at', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

export async function createPost(post: any) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  return { data, error }
}

export async function updatePost(id: string, updates: any) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  return { error }
}

// ============================================================================
// PARTNERS
// ============================================================================

export async function fetchPartners(activeOnly = true) {
  let query = supabase
    .from('partners')
    .select('*')
    .order('sort_order', { ascending: true })

  if (activeOnly) query = query.eq('is_active', true)

  const { data, error } = await query
  return { data: data ?? [], error }
}

export async function createPartner(partner: any) {
  const { data, error } = await supabase
    .from('partners')
    .insert(partner)
    .select()
    .single()

  return { data, error }
}

export async function updatePartner(id: string, updates: any) {
  const { data, error } = await supabase
    .from('partners')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deletePartner(id: string) {
  const { error } = await supabase
    .from('partners')
    .delete()
    .eq('id', id)

  return { error }
}

// ============================================================================
// TESTIMONIALS
// ============================================================================

export async function fetchTestimonials(activeOnly = true) {
  let query = supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })

  if (activeOnly) query = query.eq('is_active', true)

  const { data, error } = await query
  return { data: data ?? [], error }
}

export async function createTestimonial(testimonial: any) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial)
    .select()
    .single()

  return { data, error }
}

export async function updateTestimonial(id: string, updates: any) {
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  return { error }
}

// ============================================================================
// NEWS
// ============================================================================

export async function fetchNews(filters: { published?: boolean, category?: string, limit?: number, offset?: number } = {}) {
  const { published = true, category, limit = 20, offset = 0 } = filters

  let query = supabase
    .from('news')
    .select('*', { count: 'exact' })

  if (published) query = query.eq('published', true)
  if (category) query = query.eq('category', category)

  query = query.order('published_at', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

// ============================================================================
// DOWNLOAD INTERESTS
// ============================================================================

export async function createDownloadInterest(interest: any) {
  const { data, error } = await supabase
    .from('download_interests')
    .insert(interest)
    .select()
    .single()

  return { data, error }
}

export async function fetchDownloadInterests(filters: { status?: string, limit?: number, offset?: number } = {}) {
  const { status, limit = 50, offset = 0 } = filters

  let query = supabase
    .from('download_interests')
    .select('*, properties(title, price), agents:assigned_agent_id(title)', { count: 'exact' })

  if (status) query = query.eq('status', status)

  query = query.order('created_at', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

// ============================================================================
// DASHBOARD / ANALYTICS
// ============================================================================

export async function fetchDashboardStats() {
  const [properties, agents, enquiries, applications] = await Promise.all([
    supabase.from('properties').select('id', { count: 'exact', head: true }),
    supabase.from('agents').select('id', { count: 'exact', head: true }).eq('approved', true),
    supabase.from('enquiries').select('id', { count: 'exact', head: true }),
    supabase.from('applications').select('id', { count: 'exact', head: true }),
  ])

  return {
    totalProperties: properties.count ?? 0,
    totalAgents: agents.count ?? 0,
    totalEnquiries: enquiries.count ?? 0,
    totalApplications: applications.count ?? 0,
  }
}

// ============================================================================
// PROFILES
// ============================================================================

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}

export async function updateProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

export async function fetchAllProfiles(filters: { role?: string, limit?: number, offset?: number } = {}) {
  const { role, limit = 50, offset = 0 } = filters

  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })

  if (role) query = query.eq('role', role)

  query = query.order('created_at', { ascending: false })
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  return { data: data ?? [], error, total: count ?? 0 }
}

// ============================================================================
// STORAGE HELPERS
// ============================================================================

export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) return { url: null, error }

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return { url: publicUrl.publicUrl, error: null }
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  return { error }
}

// ============================================================================
// ENQUIRY MESSAGES
// ============================================================================

export async function fetchEnquiryMessages(enquiryId: string) {
  const { data, error } = await supabase
    .from('enquiry_messages')
    .select('*, profiles:sender_id(full_name, avatar_url)')
    .eq('enquiry_id', enquiryId)
    .order('created_at', { ascending: true })

  return { data: data ?? [], error }
}

export async function sendEnquiryMessage(message: any) {
  const { data, error } = await supabase
    .from('enquiry_messages')
    .insert(message)
    .select()
    .single()

  return { data, error }
}

// ============================================================================
// SYSTEM SETTINGS
// ============================================================================

export async function fetchSystemSettings() {
  const { data, error } = await supabase
    .from('system_settings')
    .select('*')
    .order('key')

  return { data: data ?? [], error }
}

// ============================================================================
// INQUIRIES (simple form)
// ============================================================================

export async function createInquiry(inquiry: any) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiry)
    .select()
    .single()

  return { data, error }
}

export async function fetchInquiries(agentId?: string) {
  let query = supabase
    .from('inquiries')
    .select('*, properties(title, price)')
    .order('created_at', { ascending: false })

  if (agentId) query = query.eq('agent_id', agentId)

  const { data, error } = await query
  return { data: data ?? [], error }
}

// ============================================================================
// VIEWINGS
// ============================================================================

export async function fetchViewings(agentId?: string) {
  let query = supabase
    .from('viewings')
    .select('*, properties(title, address, area)')
    .order('scheduled_date', { ascending: true })

  if (agentId) query = query.eq('agent_id', agentId)

  const { data, error } = await query
  return { data: data ?? [], error }
}

export async function createViewing(viewing: any) {
  const { data, error } = await supabase
    .from('viewings')
    .insert(viewing)
    .select()
    .single()

  return { data, error }
}

export async function updateViewing(id: string, updates: any) {
  const { data, error } = await supabase
    .from('viewings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}
