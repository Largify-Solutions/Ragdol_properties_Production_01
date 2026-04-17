'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-browser'
import { useRealtimeMulti } from '@/lib/hooks/useRealtimeSubscription'
import type { RealtimeMapProperty } from '@/components/map/RealtimePropertiesMap'
import {
  MapPinIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  CalendarIcon,
  HomeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const RealtimePropertiesMap = dynamic(
  () => import('@/components/map/RealtimePropertiesMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[480px] rounded-2xl border border-slate-200 bg-white flex items-center justify-center">
        <p className="text-slate-500 text-sm">Loading property map...</p>
      </div>
    ),
  }
)

const DUBAI_FALLBACK_COORDS: Record<string, { lat: number; lng: number }> = {
  downtown: { lat: 25.1972, lng: 55.2744 },
  'dubai marina': { lat: 25.0773, lng: 55.1336 },
  'business bay': { lat: 25.1867, lng: 55.2647 },
  'palm jumeirah': { lat: 25.1124, lng: 55.139 },
  jvc: { lat: 25.0565, lng: 55.2102 },
  jumeirah: { lat: 25.2146, lng: 55.2431 },
  'dubai hills': { lat: 25.1048, lng: 55.2445 },
  mirdif: { lat: 25.2201, lng: 55.4202 },
  'al barsha': { lat: 25.1134, lng: 55.2 },
  deira: { lat: 25.2697, lng: 55.3095 },
}

const isValidCoordinate = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

function getCoordsFromProperty(
  coords: unknown,
  location?: string | null,
  area?: string | null,
  city?: string | null
): { lat: number; lng: number } | null {
  if (coords && typeof coords === 'object') {
    const candidate = coords as {
      lat?: unknown
      lng?: unknown
      latitude?: unknown
      longitude?: unknown
    }

    const lat =
      typeof candidate.lat === 'string'
        ? Number(candidate.lat)
        : typeof candidate.latitude === 'string'
          ? Number(candidate.latitude)
          : (candidate.lat ?? candidate.latitude)

    const lng =
      typeof candidate.lng === 'string'
        ? Number(candidate.lng)
        : typeof candidate.longitude === 'string'
          ? Number(candidate.longitude)
          : (candidate.lng ?? candidate.longitude)

    if (isValidCoordinate(lat) && isValidCoordinate(lng)) {
      return { lat, lng }
    }
  }

  const lookupText = [location, area, city]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (lookupText) {
    for (const [key, value] of Object.entries(DUBAI_FALLBACK_COORDS)) {
      if (lookupText.includes(key)) {
        return value
      }
    }
  }

  return null
}

async function fetchRealtimePropertiesMapData(): Promise<RealtimeMapProperty[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('id,title,price,status,type,location,area,city,coords,updated_at,published')
      .eq('published', true)
      .limit(300)

    if (error) throw error

    return (data || [])
      .map((item) => {
        const parsedCoords = getCoordsFromProperty(item.coords, item.location, item.area, item.city)
        if (!parsedCoords) return null

        return {
          id: item.id,
          title: item.title || 'Property',
          price: item.price || 0,
          status: item.status || 'sale',
          type: item.type || 'Residential',
          location: item.location || item.area || item.city || 'Dubai',
          lat: parsedCoords.lat,
          lng: parsedCoords.lng,
          updated_at: item.updated_at || new Date().toISOString(),
        } satisfies RealtimeMapProperty
      })
      .filter((item): item is RealtimeMapProperty => item !== null)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  } catch (error) {
    console.error('Error fetching realtime map properties:', error)
    return []
  }
}

export default function DubaiProjectsMapPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all')
  const [mapProperties, setMapProperties] = useState<RealtimeMapProperty[]>([])
  const [mapLoading, setMapLoading] = useState(true)

  const loadMapProperties = useCallback(async (withSpinner = false) => {
    if (withSpinner) setMapLoading(true)
    try {
      const properties = await fetchRealtimePropertiesMapData()
      setMapProperties(properties)
    } catch (error) {
      console.error('Failed to load properties map data:', error)
    } finally {
      if (withSpinner) setMapLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMapProperties(true)
  }, [loadMapProperties])

  useRealtimeMulti([
    { table: 'properties', onChange: () => { loadMapProperties(false) } }
  ])

  const projects = [
    {
      id: 1,
      name: 'Emaar Beachfront',
      developer: 'Emaar Properties',
      area: 'Downtown Dubai',
      status: 'ongoing',
      units: '3,500+',
      avgPrice: 'AED 1.8M - 8.5M',
      completion: '2026',
      description: 'Waterfront residential development with beach access and world-class amenities',
      amenities: ['Beach access', 'Marina', 'Restaurants', 'Retail', 'Spa'],
      investment: 'High'
    },
    {
      id: 2,
      name: 'Atlantis The World',
      developer: 'Emaar Properties',
      area: 'Palm Jumeirah',
      status: 'upcoming',
      units: '2,000+',
      avgPrice: 'AED 2.5M - 12M',
      completion: '2028',
      description: 'Luxury mixed-use island development with integrated resort and residences',
      amenities: ['Resort facilities', 'Casino', 'Water park', 'Aquarium', 'Fine dining'],
      investment: 'Very High'
    },
    {
      id: 3,
      name: 'Dubai Hills Estate (Phase 2)',
      developer: 'Emaar Properties',
      area: 'Dubai Hills Estate',
      status: 'ongoing',
      units: '2,200+',
      avgPrice: 'AED 1.5M - 5M',
      completion: '2025',
      description: 'Master-planned community with golf course, schools, and retail centers',
      amenities: ['Golf course', 'Schools', 'Retail', 'Parks', 'Hospitals'],
      investment: 'High'
    },
    {
      id: 4,
      name: 'Arabian Ranches 3',
      developer: 'Emaar Properties',
      area: 'Arabian Ranches',
      status: 'ongoing',
      units: '1,200+',
      avgPrice: 'AED 1.2M - 3.5M',
      completion: '2026',
      description: 'Gated villa community with equestrian facilities and landscaped parks',
      amenities: ['Stables', 'Parks', 'Community center', 'Swimming pools', 'Tennis courts'],
      investment: 'High'
    },
    {
      id: 5,
      name: 'Ras Al Khor Gateway',
      developer: 'Azizi Developments',
      area: 'Ras Al Khor',
      status: 'upcoming',
      units: '2,800+',
      avgPrice: 'AED 950K - 2.8M',
      completion: '2027',
      description: 'Mixed-use development with residential, retail, and office spaces',
      amenities: ['Shopping mall', 'Office towers', 'Healthcare', 'Education', 'Parks'],
      investment: 'Very High'
    },
    {
      id: 6,
      name: 'Jumeirah Village Circle Expansion',
      developer: 'Azizi Developments',
      area: 'Jumeirah Village Circle',
      status: 'ongoing',
      units: '1,500+',
      avgPrice: 'AED 650K - 1.8M',
      completion: '2025',
      description: 'Affordable residential community targeting students and young professionals',
      amenities: ['Retail', 'Community facilities', 'Parks', 'Schools', 'Healthcare'],
      investment: 'Very High'
    },
    {
      id: 7,
      name: 'Downtown Dubai Phase 3',
      developer: 'Emaar Properties',
      area: 'Downtown Dubai',
      status: 'ongoing',
      units: '800+',
      avgPrice: 'AED 2.2M - 6.5M',
      completion: '2026',
      description: 'Ultra-luxury residences in prime Downtown location with iconic views',
      amenities: ['Shopping mall', 'Hotels', 'Restaurants', 'Leisure', 'Office'],
      investment: 'High'
    },
    {
      id: 8,
      name: 'Dubai Marina Heights',
      developer: 'Damac Properties',
      area: 'Dubai Marina',
      status: 'ongoing',
      units: '650+',
      avgPrice: 'AED 2.8M - 7M',
      completion: '2025',
      description: 'Luxury tower with premium residences and waterfront promenade',
      amenities: ['Marina access', 'Gym', 'Spa', 'Restaurants', 'Retail'],
      investment: 'High'
    },
    {
      id: 9,
      name: 'Business Bay Commercial District',
      developer: 'DAMAC & Others',
      area: 'Business Bay',
      status: 'ongoing',
      units: '3,000+',
      avgPrice: 'AED 1.1M - 3.2M',
      completion: '2024-2026',
      description: 'Commercial and residential hub with modern office and apartment towers',
      amenities: ['Office spaces', 'Retail', 'Hotels', 'Dining', 'Parking'],
      investment: 'Medium-High'
    },
    {
      id: 10,
      name: 'Emirates Living Hillside',
      developer: 'DAMAC Properties',
      area: 'Emirates Living',
      status: 'upcoming',
      units: '1,800+',
      avgPrice: 'AED 1.2M - 2.8M',
      completion: '2026',
      description: 'Hillside villas and townhouses with panoramic views and open spaces',
      amenities: ['Parks', 'Community center', 'Retail', 'Schools', 'Healthcare'],
      investment: 'High'
    },
    {
      id: 11,
      name: 'DIFC Financial Tower',
      developer: 'ADIB & ENBD',
      area: 'DIFC',
      status: 'ongoing',
      units: '500+',
      avgPrice: 'AED 3.5M - 8M',
      completion: '2025',
      description: 'Premium office and residential tower in Dubai International Financial Centre',
      amenities: ['Office spaces', 'Fine dining', 'Fitness', 'Concierge', 'Parking'],
      investment: 'High'
    },
    {
      id: 12,
      name: 'Palm Jumeirah South',
      developer: 'Nakheel',
      area: 'Palm Jumeirah',
      status: 'upcoming',
      units: '1,200+',
      avgPrice: 'AED 4M - 15M',
      completion: '2028',
      description: 'Ultra-luxury villas on the southern fronds of Palm Jumeirah',
      amenities: ['Beach clubs', 'Yacht marina', 'Spa', 'Fine dining', 'Shopping'],
      investment: 'Very High'
    }
  ]

  const filteredProjects = projects.filter(p => {
    if (filterStatus === 'all') return true
    return p.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-[#c5a059]/20 text-[#996515]'
      case 'ongoing': return 'bg-[#c5a059]/10 text-[#996515]'
      case 'upcoming': return 'bg-purple-100 text-purple-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const getInvestmentColor = (investment: string) => {
    switch(investment) {
      case 'Very High': return 'text-[#c5a059]'
      case 'High': return 'text-[#c5a059]'
      case 'Medium-High': return 'text-amber-600'
      default: return 'text-slate-600'
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Dubai Projects <span className="text-[#c5a059]">Map</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive overview of major real estate development projects across Dubai with investment potential and completion timelines
          </p>
        </div>

        <div className="mb-12">
          {mapLoading ? (
            <div className="h-[480px] rounded-2xl border border-slate-200 bg-white flex items-center justify-center">
              <p className="text-slate-500 text-sm">Loading property map...</p>
            </div>
          ) : mapProperties.length > 0 ? (
            <RealtimePropertiesMap properties={mapProperties} />
          ) : (
            <div className="h-60 rounded-2xl border border-dashed border-slate-300 bg-white flex items-center justify-center">
              <p className="text-slate-500 text-sm">No published properties with map coordinates found yet.</p>
            </div>
          )}
        </div>

        {/* Status Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { status: 'all', label: 'All Projects', count: projects.length },
            { status: 'upcoming', label: 'Upcoming', count: projects.filter(p => p.status === 'upcoming').length },
            { status: 'ongoing', label: 'Ongoing', count: projects.filter(p => p.status === 'ongoing').length },
            { status: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length }
          ].map(item => (
            <button
              key={item.status}
              onClick={() => setFilterStatus(item.status as any)}
              className={`p-4 rounded-xl text-center transition-all ${
                filterStatus === item.status
                  ? 'bg-[#c5a059] text-white shadow-lg'
                  : 'bg-white border border-slate-200 text-slate-900 hover:border-[#c5a059]'
              }`}
            >
              <p className="text-2xl font-bold">{item.count}</p>
              <p className="text-sm font-medium">{item.label}</p>
            </button>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-8 flex gap-2">
          {['all', 'upcoming', 'ongoing', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filterStatus === status
                  ? 'bg-[#c5a059] text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-[#c5a059]'
              }`}
            >
              {status === 'all' ? 'Show All' : status}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{project.name}</h3>
                    <p className="text-sm text-slate-600">{project.developer}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 capitalize ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">LOCATION</p>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" /> {project.area}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">UNITS</p>
                    <p className="text-sm font-bold text-slate-900">{project.units}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">COMPLETION</p>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" /> {project.completion}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">INVESTMENT</p>
                    <p className={`text-sm font-bold ${getInvestmentColor(project.investment)}`}>{project.investment}</p>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <p className="text-xs text-slate-600 font-semibold mb-1">PRICE RANGE</p>
                  <p className="text-sm font-bold text-[#c5a059]">{project.avgPrice}</p>
                </div>

                {/* Expandable Details */}
                {selectedProject === project.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-2">{project.description}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-600 mb-2">AMENITIES</p>
                      <div className="flex flex-wrap gap-2">
                        {project.amenities.map((amenity, idx) => (
                          <span key={idx} className="px-2 py-1 bg-[#c5a059]/10 text-[#996515] text-xs rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/properties?project=${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex-1 text-center px-4 py-2 bg-[#c5a059] text-white font-semibold rounded-lg hover:bg-[#996515] transition-colors text-sm"
                      >
                        View Properties
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProject(null)
                        }}
                        className="flex-1 text-center px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {selectedProject !== project.id && (
                  <p className="text-xs text-slate-500 text-center italic">Click to view details</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-600 text-lg">No projects found for this filter</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-linear-to-r from-[#c5a059] to-[#996515] rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Get Updates on New Projects</h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to our newsletter to receive updates on upcoming projects, pre-launch offers, and exclusive investment opportunities
          </p>
          <form action="/contact" method="get" className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none"
            />
            <input type="hidden" name="subject" value="projects-updates" />
            <button type="submit" className="px-8 py-3 bg-white text-[#c5a059] font-bold rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
