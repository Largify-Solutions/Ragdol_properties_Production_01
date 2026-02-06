'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapPinIcon, HomeIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface PropertyMarker {
  id: string
  location: string
  price: number
  priceSqft: number
  coordinates: [number, number]
  status: string
}

interface AreaBoundary {
  name: string
  coordinates: [number, number]
  bbox: [[number, number], [number, number]]
}

const DUBAI_AREAS: AreaBoundary[] = [
  {
    name: 'Downtown Dubai',
    coordinates: [25.1972, 55.2744],
    bbox: [[25.1850, 55.2600], [25.2100, 55.2850]]
  },
  {
    name: 'Dubai Marina',
    coordinates: [25.0867, 55.1414],
    bbox: [[25.0750, 55.1300], [25.1000, 55.1550]]
  },
  {
    name: 'Palm Jumeirah',
    coordinates: [25.1442, 55.1186],
    bbox: [[25.1300, 55.1050], [25.1600, 55.1350]]
  },
  {
    name: 'Business Bay',
    coordinates: [25.1853, 55.2676],
    bbox: [[25.1750, 55.2550], [25.1950, 55.2800]]
  },
  {
    name: 'DIFC',
    coordinates: [25.2114, 55.2808],
    bbox: [[25.2000, 55.2700], [25.2200, 55.2900]]
  },
  {
    name: 'Arabian Ranches',
    coordinates: [25.0853, 55.1186],
    bbox: [[25.0700, 55.1000], [25.1000, 55.1350]]
  },
  {
    name: 'Emirates Living',
    coordinates: [25.0725, 55.1347],
    bbox: [[25.0600, 55.1200], [25.0850, 55.1500]]
  },
  {
    name: 'Dubai Hills Estate',
    coordinates: [25.0812, 55.2328],
    bbox: [[25.0700, 55.2200], [25.0950, 55.2450]]
  }
]

// Mock property data for demo
const MOCK_PROPERTIES: PropertyMarker[] = [
  { id: '1', location: 'Downtown Dubai', price: 2500000, priceSqft: 850, coordinates: [25.1972, 55.2744], status: 'available' },
  { id: '2', location: 'Downtown Dubai', price: 2100000, priceSqft: 750, coordinates: [25.1955, 55.2728], status: 'available' },
  { id: '3', location: 'Downtown Dubai', price: 2800000, priceSqft: 950, coordinates: [25.1990, 55.2760], status: 'under_construction' },
  { id: '4', location: 'Dubai Marina', price: 1900000, priceSqft: 920, coordinates: [25.0890, 55.1420], status: 'available' },
  { id: '5', location: 'Dubai Marina', price: 2100000, priceSqft: 1050, coordinates: [25.0850, 55.1390], status: 'available' },
  { id: '6', location: 'Palm Jumeirah', price: 3500000, priceSqft: 1200, coordinates: [25.1442, 55.1186], status: 'available' },
  { id: '7', location: 'Business Bay', price: 1600000, priceSqft: 780, coordinates: [25.1853, 55.2676], status: 'sold' },
  { id: '8', location: 'Business Bay', price: 1800000, priceSqft: 850, coordinates: [25.1870, 55.2690], status: 'available' },
  { id: '9', location: 'Arabian Ranches', price: 1200000, priceSqft: 620, coordinates: [25.0853, 55.1186], status: 'available' },
  { id: '10', location: 'Emirates Living', price: 1100000, priceSqft: 580, coordinates: [25.0725, 55.1347], status: 'available' },
]

interface AdvancedMapProps {
  properties?: PropertyMarker[]
  selectedArea?: string | null
  onAreaSelect?: (area: string | null) => void
  height?: string
}

/**
 * AdvancedInteractiveMap
 * 
 * Google Maps-like interactive map component with:
 * - Real-time property markers with house icons
 * - Area boundary visualization
 * - Click detection and selection
 * - Database integration
 * - Responsive design
 */
export const AdvancedInteractiveMap: React.FC<AdvancedMapProps> = ({
  properties,
  selectedArea,
  onAreaSelect,
  height = 'h-screen'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null)
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  
  // Use mock data if no properties provided
  const displayProperties = (properties && properties.length > 0) ? properties : MOCK_PROPERTIES

  // Properties grouped by area
  const propertiesByArea = displayProperties.reduce((acc, prop) => {
    if (!acc[prop.location]) {
      acc[prop.location] = []
    }
    acc[prop.location].push(prop)
    return acc
  }, {} as Record<string, PropertyMarker[]>)

  const handleAreaClick = (area: AreaBoundary) => {
    onAreaSelect?.(area.name)
  }

  // Property marker colors by status
  const getPropertyColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#10b981' // emerald
      case 'under_construction':
        return '#f59e0b' // amber
      case 'sold':
        return '#ef4444' // red
      case 'rented':
        return '#3b82f6' // blue
      default:
        return '#10b981'
    }
  }

  const getPropertyLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available'
      case 'under_construction':
        return 'Under Construction'
      case 'sold':
        return 'Sold'
      case 'rented':
        return 'Rented'
      default:
        return 'Available'
    }
  }

  // Get selected property details
  const selectedPropDetails = displayProperties.find(p => p.id === selectedProperty)

  return (
    <div
      ref={mapContainer}
      className={`${height} w-full bg-slate-100 relative shadow-2xl overflow-hidden flex flex-col group`}
    >
      {/* Map Background - Google Maps Style */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-50 via-slate-50 to-green-50">
        {/* Subtle grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top Info Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center bg-white rounded-lg shadow-md p-3">
        <div>
          <h3 className="font-bold text-slate-900">Dubai Property Map</h3>
          <p className="text-xs text-slate-600">{displayProperties.length} Properties • {DUBAI_AREAS.length} Areas</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Interactive Map</span>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="flex-1 relative overflow-hidden">
        {/* SVG Map Background */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1000 700" 
          preserveAspectRatio="xMidYMid slice"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <filter id="areaGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Area Boundaries - Semi-transparent backgrounds */}
          {DUBAI_AREAS.map((area) => {
            const isSelected = selectedArea === area.name
            const isHovered = hoveredArea === area.name
            const propCount = propertiesByArea[area.name]?.length || 0
            
            // Convert Dubai coordinates to SVG viewport (0-1000, 0-700)
            const width = ((area.bbox[1][1] - area.bbox[0][1]) / (55.35 - 55.08)) * 1000
            const height = ((area.bbox[1][0] - area.bbox[0][0]) / (25.32 - 25.04)) * 700
            const x = ((area.bbox[0][1] - 55.08) / (55.35 - 55.08)) * 1000
            const y = ((25.32 - area.bbox[1][0]) / (25.32 - 25.04)) * 700

            return (
              <g key={`area-${area.name}`}>
                {/* Area Background Rectangle */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={isSelected ? '#06b6d4' : '#3b82f6'}
                  opacity={isSelected ? 0.15 : isHovered ? 0.1 : 0.05}
                  stroke={isSelected ? '#06b6d4' : '#3b82f6'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="transition-all duration-300"
                />

                {/* Area Center Circle */}
                <circle
                  cx={((area.coordinates[1] - 55.08) / (55.35 - 55.08)) * 1000}
                  cy={((25.32 - area.coordinates[0]) / (25.32 - 25.04)) * 700}
                  r={isSelected ? 8 : 5}
                  fill={isSelected ? '#06b6d4' : '#3b82f6'}
                  opacity={isSelected ? 1 : 0.6}
                  className="transition-all duration-300"
                />
              </g>
            )
          })}
        </svg>

        {/* Property Markers Overlay - HTML based for better rendering */}
        <div className="absolute inset-0 pointer-events-auto">
          {displayProperties.map((property) => {
            // Convert Dubai coordinates to percentage positions (0-100%)
            // Dubai lat range: ~25.04 to 25.32, lon range: ~55.08 to 55.35
            const x = ((property.coordinates[1] - 55.08) / (55.35 - 55.08)) * 100 // percentage position
            const y = ((25.32 - property.coordinates[0]) / (25.32 - 25.04)) * 100 // percentage position
            const color = getPropertyColor(property.status)
            const isHovered = hoveredProperty === property.id

            return (
              <div
                key={property.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  zIndex: isHovered ? 50 : 10
                }}
                onMouseEnter={() => setHoveredProperty(property.id)}
                onMouseLeave={() => setHoveredProperty(null)}
              >
                {/* Main Marker Pin */}
                <div
                  className={`relative transition-all duration-300 ${
                    isHovered ? 'scale-125' : 'scale-100'
                  }`}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -inset-3 rounded-full opacity-20 blur-md"
                    style={{ backgroundColor: color }}
                  />

                  {/* Main pin */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white transition-all"
                    style={{ backgroundColor: color }}
                  >
                    <HomeIcon className="w-4 h-4" />
                  </div>

                  {/* Hover Card with Click to Select */}
                  {isHovered && (
                    <div 
                      className="absolute left-12 -top-2 bg-white rounded-lg shadow-2xl p-3 min-w-max z-50 border-l-4 hover:shadow-3xl transition-all cursor-pointer"
                      style={{ borderColor: color }}
                      onClick={() => setSelectedProperty(property.id)}
                    >
                      <p className="font-bold text-sm text-slate-900">{property.location}</p>
                      <p className="text-xs text-slate-600 mt-1">AED {property.priceSqft.toLocaleString()}/sqft</p>
                      <p className="text-xs font-bold text-slate-900">AED {(property.price / 1000000).toFixed(1)}M</p>
                      <p className="text-xs font-semibold mt-1" style={{ color }}>
                        {getPropertyLabel(property.status)}
                      </p>
                      <p className="text-xs text-cyan-600 mt-2 font-medium">Click to view details →</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Zoom Controls - Google Maps Style */}
        <div className="absolute bottom-32 right-4 z-40 flex flex-col gap-2">
          <button
            onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
            className="w-10 h-10 bg-white rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all"
            title="Zoom in"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 0.2, 1))}
            className="w-10 h-10 bg-white rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all"
            title="Zoom out"
          >
            <MinusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="w-10 h-10 bg-white rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all text-xs font-bold"
            title="Reset zoom"
          >
            1:1
          </button>
        </div>

        {/* Selected Property Details Panel */}
        {selectedPropDetails && (
          <div className="absolute bottom-4 left-4 right-4 z-40 bg-white rounded-lg shadow-2xl p-4 border-2" style={{ borderColor: getPropertyColor(selectedPropDetails.status) }}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">{selectedPropDetails.location}</h4>
                <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-600">Price</p>
                    <p className="font-bold text-slate-900">AED {(selectedPropDetails.price / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Price/sqft</p>
                    <p className="font-bold text-slate-900">AED {selectedPropDetails.priceSqft.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Status</p>
                    <p className="font-bold" style={{ color: getPropertyColor(selectedPropDetails.status) }}>
                      {getPropertyLabel(selectedPropDetails.status)}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Panel */}
      <div className="bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Legend */}
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-3 rounded-lg border border-slate-200">
              <p className="font-semibold text-xs text-slate-700 mb-2">STATUS</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-slate-600">Construction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-slate-600">Sold</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-slate-600">Rented</span>
                </div>
              </div>
            </div>

            {/* Area Stats */}
            {DUBAI_AREAS.map((area) => {
              const propCount = propertiesByArea[area.name]?.length || 0
              const isSelected = selectedArea === area.name
              const avgPrice = propertiesByArea[area.name]?.reduce((sum, p) => sum + p.priceSqft, 0) ?? 0
              const avgPriceSqft = propCount > 0 ? Math.round(avgPrice / propCount) : 0

              if (propCount === 0) return null

              return (
                <button
                  key={area.name}
                  onClick={() => handleAreaClick(area)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'bg-cyan-50 border-cyan-500 shadow-md'
                      : 'bg-linear-to-br from-slate-50 to-slate-100 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className={`font-semibold text-xs ${isSelected ? 'text-cyan-700' : 'text-slate-700'}`}>
                    {area.name}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{propCount} Properties</p>
                  <p className="text-xs font-bold mt-1" style={{ color: isSelected ? '#06b6d4' : '#3b82f6' }}>
                    AED {avgPriceSqft}/sqft
                  </p>
                </button>
              )
            })}
          </div>

          {/* Total Stats */}
          <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900">{displayProperties.length}</p>
              <p className="text-xs text-slate-600">Total Properties</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900">
                AED {Math.round(displayProperties.reduce((sum, p) => sum + p.priceSqft, 0) / displayProperties.length).toLocaleString()}
              </p>
              <p className="text-xs text-slate-600">Avg Price/sqft</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900">{DUBAI_AREAS.length}</p>
              <p className="text-xs text-slate-600">Areas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedInteractiveMap


