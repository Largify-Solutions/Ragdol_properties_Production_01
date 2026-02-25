'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase-browser'
import { useRealtimeMulti } from '@/lib/hooks/useRealtimeSubscription'
import { Database } from '@/lib/database.types'

type Property = Database['public']['Tables']['properties']['Row']

// Module-level cache for properties
const CACHE_DURATION = 3 * 60 * 1000 // 3 minutes
const propertyCache: Map<string, { data: NormalizedProperty[]; timestamp: number }> = new Map()

function getCachedProperties(cacheKey: string) {
  const cached = propertyCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

function setCachedProperties(cacheKey: string, data: NormalizedProperty[]) {
  propertyCache.set(cacheKey, { data, timestamp: Date.now() })
}

function clearPropertiesCache(cacheKey?: string) {
  if (cacheKey) {
    propertyCache.delete(cacheKey)
  } else {
    propertyCache.clear()
  }
}

// Normalized property type with all fields needed for display
export interface NormalizedProperty extends Partial<Property> {
  id: string
  title: string
  image: string
  price: number
  priceLabel?: string
  area?: string | null
  city?: string | null
  location: string
  beds: number
  baths: number
  sqft: number
  type: string
  featured: boolean
  developer?: string | null
  description?: string | null
  category?: string | null
  parking?: number | null
  furnished?: boolean | null
  furnishing?: string | null
  propertyAge?: string | null
  completion?: string | null
  subtype?: string | null
  features?: string[] | null
  amenities?: string[] | null
  video_url?: string | null
  currency?: string
  status?: string
  agent_name?: string
  review_status?: string
  submitted_at?: string
  collection?: string
  address?: string | null
  property_status?: string | null
  property_age?: string | null
  images?: string[]
  floorplans?: string[] | null
  inquiries_count?: number
  coords?: { lat: number; lng: number } | null
  agent_id?: string | null
  slug?: string | null
  created_at?: string | null
  updated_at?: string | null
  views?: number
  neighborhood?: string | null
  district?: string | null
}

// Filter state
export interface PropertyFilters {
  action: string // 'all' | 'sale' | 'rent'
  category: string
  type: string
  area: string
  minPrice: string
  maxPrice: string
  beds: string
  baths: string
  furnished: string
  completion: string
  hasVideo: string
  search: string
}

// Config for pages
export interface PropertyListingConfig {
  /** Filter preset: 'all' | 'sale' | 'rent' | 'commercial' | 'luxe' */
  preset: 'all' | 'sale' | 'rent' | 'commercial' | 'luxe'
  /** Route path for URL updates */
  routePath: string
}

// Normalize a property from DB to display format
function normalizeProperty(p: any): NormalizedProperty {
  let imageUrl = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop'
  if (p.images && Array.isArray(p.images) && p.images.length > 0) {
    imageUrl = p.images[0]
  } else if (p.image) {
    imageUrl = p.image
  } else if (p.image_url) {
    imageUrl = p.image_url
  }
  
  const price = typeof p.price === 'string' ? parseFloat(p.price) : (p.price ?? 0)
  const location = p.location || p.address || p.area || p.city || 'Dubai'
  const completionStatus = p.completion || p.property_status || 'ready'
  const propertyArea = p.area || p.location || p.address || p.neighborhood || p.district || 'Dubai'
  
  let featuresArray: string[] = []
  if (Array.isArray(p.features)) {
    featuresArray = p.features
  } else if (typeof p.features === 'string') {
    featuresArray = p.features.split(',').map((f: string) => f.trim())
  }
  
  return {
    ...p,
    id: p.id,
    title: p.title || 'Property',
    image: imageUrl,
    price: price,
    priceLabel: p.status === 'rent' ? 'yearly' : 'total',
    area: propertyArea,
    city: p.city || 'Dubai',
    location: location,
    beds: p.beds ?? 0,
    baths: p.baths ?? 0,
    sqft: p.sqft ?? 0,
    type: p.type || p.subtype || 'Property',
    developer: p.developer || (p.developers?.name ? p.developers.name : null) || p.developer_id || null,
    featured: Boolean(p.featured),
    category: p.category || null,
    parking: p.parking_spaces || p.parking || null,
    furnished: p.furnishing === 'furnished' || p.furnished === true,
    furnishing: p.furnishing || null,
    propertyAge: p.property_age || p.propertyAge || null,
    completion: completionStatus,
    subtype: p.subtype || null,
    description: p.description || null,
    features: featuresArray,
    amenities: Array.isArray(p.amenities) ? p.amenities : [],
    video_url: p.video_url || null,
    currency: p.currency || 'AED',
    status: p.status || 'sale',
    agent_name: p.agent_name || null,
    review_status: p.review_status || null,
    submitted_at: p.submitted_at || null,
    collection: p.collection || 'properties',
    address: p.address,
    property_status: p.property_status,
    property_age: p.property_age,
    images: Array.isArray(p.images) ? p.images : [],
    floorplans: Array.isArray(p.floorplans) ? p.floorplans : [],
    inquiries_count: p.inquiries_count || 0,
    coords: p.coords,
    agent_id: p.agent_id,
    slug: p.slug,
    created_at: p.created_at,
    updated_at: p.updated_at,
    views: p.views_count || p.views || 0,
    neighborhood: p.neighborhood,
    district: p.district,
  }
}

// Fetch properties from main collection with optional preset filter
async function fetchFromMainCollection(preset: string) {
  try {
    let query = supabase
      .from('properties')
      .select('*')
      .eq('published', true)
    
    // Apply preset filters at query level for performance
    if (preset === 'sale') {
      query = query.eq('status', 'sale')
    } else if (preset === 'rent') {
      query = query.eq('status', 'rent')
    } else if (preset === 'commercial') {
      query = query.or('type.eq.office,type.eq.shop,type.eq.warehouse,type.eq.building')
    } else if (preset === 'luxe') {
      query = query.gte('price', 5000000) // Luxury = 5M+ AED
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(500)
    
    if (error) throw error
    
    return (data || []).map((item: any) => ({
      ...item,
      collection: 'properties'
    }))
  } catch (error: any) {
    console.error('Error fetching from main collection:', error.message)
    return []
  }
}

// Fetch properties from agent_properties collection with optional preset filter
async function fetchFromAgentCollection(preset: string) {
  try {
    let query = supabase
      .from('agent_properties')
      .select('*')
      .eq('published', true)
    
    // Apply preset filters
    if (preset === 'sale') {
      query = query.eq('status', 'sale')
    } else if (preset === 'rent') {
      query = query.eq('status', 'rent')
    } else if (preset === 'commercial') {
      query = query.or('type.eq.office,type.eq.shop,type.eq.warehouse,type.eq.building')
    } else if (preset === 'luxe') {
      query = query.gte('price', 5000000)
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(500)
    
    if (error) throw error
    
    return (data || []).map((item: any) => ({
      ...item,
      collection: 'agent_properties'
    }))
  } catch (error: any) {
    console.error('Error fetching from agent collection:', error.message)
    return []
  }
}

// Main fetch function
async function fetchAllProperties(preset: string): Promise<NormalizedProperty[]> {
  const cacheKey = `properties_${preset}`
  const cached = getCachedProperties(cacheKey)
  if (cached) return cached
  
  try {
    const [mainProperties, agentProperties] = await Promise.all([
      fetchFromMainCollection(preset),
      fetchFromAgentCollection(preset)
    ])
    
    const allProperties = [...mainProperties, ...agentProperties].map(normalizeProperty)
    setCachedProperties(cacheKey, allProperties)
    
    return allProperties
  } catch (error) {
    console.error('Error in fetchAllProperties:', error)
    return []
  }
}

// Apply filters to properties array
function applyFilters(
  properties: NormalizedProperty[],
  filters: PropertyFilters,
  sortBy: string = 'featured'
): NormalizedProperty[] {
  let filtered = [...properties]
  
  // Filter by action (rent/sale/all)
  if (filters.action === 'rent') {
    filtered = filtered.filter(p => p.status === 'rent')
  } else if (filters.action === 'buy' || filters.action === 'sale') {
    filtered = filtered.filter(p => p.status === 'sale')
  }
  
  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category)
  }
  
  // Filter by property type
  if (filters.type) {
    filtered = filtered.filter(p => 
      p.type?.toLowerCase() === filters.type.toLowerCase() ||
      p.subtype?.toLowerCase() === filters.type.toLowerCase()
    )
  }
  
  // Filter by area/location
  if (filters.area) {
    const searchPhrase = filters.area.replace(/-/g, ' ').toLowerCase()
    const searchTerms = searchPhrase.split(' ').filter(term => term.length > 0)
    
    filtered = filtered.filter(p => {
      const locationText = [p.area, p.city, p.location, p.address, p.neighborhood, p.district]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      
      return locationText.includes(searchPhrase) || 
             searchTerms.every(term => locationText.includes(term))
    })
  }
  
  // Filter by price range
  if (filters.minPrice) {
    const minP = parseInt(filters.minPrice)
    filtered = filtered.filter(p => p.price >= minP)
  }
  if (filters.maxPrice) {
    const maxP = parseInt(filters.maxPrice)
    filtered = filtered.filter(p => p.price <= maxP)
  }
  
  // Filter by bedrooms
  if (filters.beds) {
    const bedNum = parseInt(filters.beds)
    if (filters.beds === '5') {
      filtered = filtered.filter(p => p.beds >= 5)
    } else {
      filtered = filtered.filter(p => p.beds === bedNum)
    }
  }
  
  // Filter by bathrooms
  if (filters.baths) {
    const bathNum = parseInt(filters.baths)
    if (filters.baths === '5') {
      filtered = filtered.filter(p => p.baths >= 5)
    } else {
      filtered = filtered.filter(p => p.baths === bathNum)
    }
  }
  
  // Filter by furnished
  if (filters.furnished === 'true') {
    filtered = filtered.filter(p => p.furnished === true || p.furnishing === 'furnished')
  } else if (filters.furnished === 'false') {
    filtered = filtered.filter(p => 
      p.furnished === false || 
      p.furnishing === 'unfurnished' || 
      p.furnishing === null
    )
  }
  
  // Filter by completion status
  if (filters.completion) {
    filtered = filtered.filter(p => 
      p.completion === filters.completion ||
      p.property_status === filters.completion
    )
  }
  
  // Filter by video availability
  if (filters.hasVideo === 'true') {
    filtered = filtered.filter(p => p.video_url && p.video_url.trim() !== '')
  }
  
  // Keywords search
  if (filters.search && filters.search.trim() !== '') {
    const sLower = filters.search.toLowerCase()
    filtered = filtered.filter(p => {
      const searchFields = [
        p.title,
        p.location,
        p.area,
        p.description,
        p.developer as string,
        p.agent_name
      ]
      return searchFields.some(field => 
        field?.toLowerCase().includes(sLower)
      )
    })
  }
  
  // Sort results
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered.sort((a, b) => {
        const dateA = a.submitted_at || a.created_at || '0'
        const dateB = b.submitted_at || b.created_at || '0'
        return new Date(dateB).getTime() - new Date(dateA).getTime()
      })
      break
    case 'featured':
    default:
      filtered.sort((a, b) => {
        if (Boolean(b.featured) !== Boolean(a.featured)) {
          return Number(b.featured) - Number(a.featured)
        }
        const dateA = a.submitted_at || a.created_at || '0'
        const dateB = b.submitted_at || b.created_at || '0'
        return new Date(dateB).getTime() - new Date(dateA).getTime()
      })
      break
  }
  
  return filtered
}

// Default filters
export const defaultFilters: PropertyFilters = {
  action: 'all',
  category: '',
  type: '',
  area: '',
  minPrice: '',
  maxPrice: '',
  beds: '',
  baths: '',
  furnished: '',
  completion: '',
  hasVideo: '',
  search: ''
}

/**
 * Hook for property listing pages with caching and real-time updates
 */
export function usePropertyListings(config: PropertyListingConfig) {
  const { preset, routePath } = config
  
  const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([])
  const [filters, setFilters] = useState<PropertyFilters>({
    ...defaultFilters,
    action: preset === 'sale' ? 'sale' : preset === 'rent' ? 'rent' : 'all'
  })
  const [sortBy, setSortBy] = useState('featured')
  const [dataLoaded, setDataLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Cache key based on preset
  const cacheKey = `properties_${preset}`
  
  // Load properties
  const loadProperties = useCallback(async () => {
    setIsLoading(true)
    try {
      const properties = await fetchAllProperties(preset)
      setAllProperties(properties)
      setDataLoaded(true)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setIsLoading(false)
    }
  }, [preset])
  
  // Initial load
  useEffect(() => {
    loadProperties()
  }, [loadProperties])
  
  // Real-time subscription
  useRealtimeMulti([
    { 
      table: 'properties', 
      onChange: () => {
        clearPropertiesCache(cacheKey)
        loadProperties()
      }
    },
    { 
      table: 'agent_properties', 
      onChange: () => {
        clearPropertiesCache(cacheKey)
        loadProperties()
      }
    }
  ])
  
  // Filtered and sorted properties (memoized)
  const filteredProperties = useMemo(() => {
    if (!dataLoaded || allProperties.length === 0) return []
    return applyFilters(allProperties, filters, sortBy)
  }, [allProperties, filters, sortBy, dataLoaded])
  
  // Update a single filter
  const updateFilter = useCallback((key: keyof PropertyFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])
  
  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      ...defaultFilters,
      action: preset === 'sale' ? 'sale' : preset === 'rent' ? 'rent' : 'all'
    })
  }, [preset])
  
  // Refresh data (clear cache and reload)
  const refreshData = useCallback(() => {
    clearPropertiesCache(cacheKey)
    loadProperties()
  }, [cacheKey, loadProperties])
  
  return {
    // Data
    allProperties,
    filteredProperties,
    dataLoaded,
    isLoading,
    
    // Filters
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    
    // Sorting
    sortBy,
    setSortBy,
    
    // Actions
    refreshData,
    
    // Config
    routePath
  }
}

// Helper to generate page title
export function getPageTitle(filters: PropertyFilters, preset: string): string {
  let title = ''
  
  if (preset === 'luxe') {
    title = 'Luxury Properties'
  } else if (preset === 'commercial') {
    title = 'Commercial Properties'
  } else if (filters.action === 'rent') {
    title = 'Properties for Rent'
  } else if (filters.action === 'buy' || filters.action === 'sale') {
    title = 'Properties for Sale'
  } else {
    title = 'All Properties'
  }
  
  if (filters.type) {
    const typeLabels: Record<string, string> = {
      apartment: 'Apartments',
      villa: 'Villas',
      townhouse: 'Townhouses',
      penthouse: 'Penthouses',
      studio: 'Studios',
      plot: 'Plots',
      office: 'Offices',
      shop: 'Retail Shops',
      warehouse: 'Warehouses',
      building: 'Buildings'
    }
    title = typeLabels[filters.type] || 
            filters.type.charAt(0).toUpperCase() + filters.type.slice(1) + 's'
  }
  
  title += filters.area ? ` in ${filters.area}` : ' in Dubai'
  
  return title
}

// Helper to format price
export function formatPrice(price: number, currency: string = 'AED'): string {
  return `${currency} ${new Intl.NumberFormat('en-US').format(price)}`
}
