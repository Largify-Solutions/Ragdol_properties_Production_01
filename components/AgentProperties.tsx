// components/AgentProperties.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-browser'
import type { MouseEvent } from 'react'

interface Property {
  id: string
  title: string
  price: number
  type: string
  status: string
  location?: string
  agent_id: string
  property_type?: string
  beds?: number
  baths?: number
  area?: number
  main_image?: string
  images?: string[]
  image_url?: string
  address?: string
  city?: string
  description?: string
}

interface AgentPropertiesProps {
  agentId: string
  agentName: string
  onClose: () => void
}

export default function AgentProperties({ agentId, agentName, onClose }: AgentPropertiesProps) {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const preventCardClickBubbling = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  const handleCardNavigation = (href: string) => {
    router.push(href)
  }

  const normalizeImageList = (value: unknown): string[] => {
    if (!value) return []

    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    }

    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (!trimmed) return []

      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed)
          if (Array.isArray(parsed)) {
            return parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
          }
        } catch {
          // Fall through to comma-split parsing.
        }
      }

      if (trimmed.includes(',')) {
        return trimmed
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      }

      return [trimmed]
    }

    return []
  }

  const buildPropertyImages = (data: any): string[] => {
    const candidates = [
      data.main_image,
      data.image_url,
      ...normalizeImageList(data.images),
      ...normalizeImageList(data.property_images),
      ...normalizeImageList(data.gallery_images)
    ]

    return Array.from(new Set(candidates.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)))
  }

  useEffect(() => {
    fetchAgentProperties()
  }, [agentId])

  const fetchAgentProperties = async () => {
    try {
      setLoading(true)
      const allProperties: Property[] = []
      
      // 1. Fetch from "properties" table
      try {
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .eq('agent_id', agentId)
          .eq('published', true)
        
        if (propertiesError) throw propertiesError
        
        if (propertiesData) {
          propertiesData.forEach((data) => {
            const allImages = buildPropertyImages(data)

            allProperties.push({
              id: data.id,
              title: data.title || 'Property',
              price: data.price || 0,
              type: data.type || 'Residential',
              status: data.status || 'sale',
              location: data.address || data.city || 'Dubai',
              agent_id: data.agent_id || agentId,
              property_type: data.type || 'Residential',
              beds: data.beds || 0,
              baths: data.baths || 0,
              area: Number(data.area) || 0,
              main_image: allImages[0] || '',
              images: allImages,
              image_url: (data as any).image_url || undefined,
              address: data.address || undefined,
              city: data.city || undefined,
              description: data.description || undefined
            })
          })
        }
        
        console.log(`Found ${propertiesData?.length || 0} properties from properties table`)
      } catch (error) {
        console.error('Error fetching from properties table:', error)
      }
      
      // 2. Fetch from "agent_properties" table
      try {
        const { data: agentPropertiesData, error: agentPropertiesError } = await supabase
          .from('agent_properties')
          .select('*')
          .eq('agent_id', agentId)
          .eq('published', true)
        
        if (agentPropertiesError) throw agentPropertiesError
        
        if (agentPropertiesData) {
          agentPropertiesData.forEach((data) => {
            const allImages = buildPropertyImages(data)

            allProperties.push({
              id: data.id,
              title: data.title || 'Property',
              price: data.price || 0,
              type: data.type || 'Residential',
              status: data.status || 'rent',
              location: data.address || data.city || 'Dubai',
              agent_id: data.agent_id || agentId,
              property_type: data.type || undefined,
              beds: data.beds || 0,
              baths: data.bathrooms || 0,
              area: Number(data.sqft) || 0,
              main_image: allImages[0] || '',
              images: allImages,
              image_url: (data as any).image_url || undefined,
              address: data.address || undefined,
              city: data.city || undefined,
              description: data.description || undefined
            })
          })
        }
        
        console.log(`Found ${agentPropertiesData?.length || 0} properties from agent_properties table`)
      } catch (error) {
        console.error('Error fetching from agent_properties table:', error)
      }
      
      // Remove duplicates
      const uniqueProperties = allProperties.filter(
        (property, index, self) =>
          index === self.findIndex(p => p.id === property.id)
      )
      
      setProperties(uniqueProperties)
    } catch (error) {
      console.error('Error fetching agent properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price)
  }

  const getPropertyImage = (property: Property) => {
    if (property.main_image && property.main_image.trim().length > 0) return property.main_image
    if (property.image_url && property.image_url.trim().length > 0) return property.image_url
    if (property.images && property.images.length > 0) return property.images[0]
    return ''
  }

  const getPropertyImages = (property: Property) => {
    const candidates = [property.main_image, property.image_url, ...(property.images || [])]
    return Array.from(new Set(candidates.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-secondary">
                {agentName}'s Properties
              </h2>
              <p className="text-slate-600 mt-1">
                Total {properties.length} properties listed
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading properties...</p>
            </div>
          ) : properties.length > 0 ? (
            <div className={`grid gap-6 ${
              properties.length === 1
                ? 'grid-cols-1 max-w-md mx-auto w-full'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {properties.map((property) => {
                const images = getPropertyImages(property)
                const imageUrl = getPropertyImage(property)
                const propertyHref = '/properties'
                const galleryHref = '/properties'
                const detailsHref = '/properties'

                return (
                  <div
                    key={property.id}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                    onClick={() => handleCardNavigation(propertyHref)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        handleCardNavigation(propertyHref)
                      }
                    }}
                    role="link"
                    tabIndex={0}
                  >
                    {/* Property Image */}
                    <div className="h-48 overflow-hidden relative">
                      <Link href={propertyHref} onClick={preventCardClickBubbling} className="block h-full w-full" aria-label={`View details for ${property.title}`}>
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                            <div className="text-4xl font-bold text-primary/30">
                              {property.title.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                        )}
                      </Link>

                      <div className="absolute top-3 left-3 flex items-center gap-2 text-white text-xs font-semibold">
                        <Link href={detailsHref} onClick={preventCardClickBubbling} className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors">
                          View Details
                        </Link>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                          property.status === 'sale' 
                            ? 'bg-[#FFC636] text-white' 
                            : property.status === 'rent'
                            ? 'bg-blue-500 text-white'
                            : 'bg-[#FFC636] text-white'
                        }`}>
                          {property.status === 'sale' ? 'For Sale' : 
                           property.status === 'rent' ? 'For Rent' : 
                           property.status}
                        </span>
                      </div>

                      {images.length > 1 && (
                        <div className="absolute bottom-3 right-3">
                          <Link href={galleryHref} onClick={preventCardClickBubbling} className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors">
                            {images.length} Photos
                          </Link>
                        </div>
                      )}
                    </div>

                    {images.length > 1 && (
                      <div className="px-3 py-2 bg-slate-50 border-y border-slate-100">
                        <Link href={galleryHref} onClick={preventCardClickBubbling} className="flex gap-1.5" aria-label={`Open ${property.title} gallery`}>
                          {images.slice(0, 4).map((img, idx) => (
                            <div key={`${property.id}-${idx}`} className="w-10 h-8 rounded overflow-hidden bg-slate-100 shrink-0">
                              <img src={img} alt={`${property.title} ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {images.length > 4 && (
                            <div className="w-10 h-8 rounded bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                              +{images.length - 4}
                            </div>
                          )}
                        </Link>
                      </div>
                    )}
                    
                    {/* Property Details */}
                    <div className="p-4">
                      <Link href={propertyHref} onClick={preventCardClickBubbling} className="block">
                        <h3 className="font-bold text-lg text-secondary mb-2 line-clamp-1 hover:text-primary transition-colors">
                          {property.title}
                        </h3>
                      </Link>
                      
                      <div className="text-primary text-xl font-bold mb-3">
                        AED {formatPrice(property.price)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        {property.beds && property.beds > 0 && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            {property.beds} Beds
                          </span>
                        )}
                        {property.baths && property.baths > 0 && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0112 0c0 .459-.031.907-.086 1.333A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                            {property.baths} Baths
                          </span>
                        )}
                        {property.area && property.area > 0 && (
                          <span>{formatPrice(property.area)} sq.ft</span>
                        )}
                      </div>
                      
                      <div className="text-sm text-slate-500 mb-2 line-clamp-1">
                        {property.location || property.address || property.city || 'Location not specified'}
                      </div>

                      {property.description && (
                        <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                          {property.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 capitalize">
                          {property.type?.replace(/-/g, ' ')}
                        </span>
                       
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Properties Found</h3>
              <p className="text-slate-600">
                {agentName} has not listed any properties yet.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}