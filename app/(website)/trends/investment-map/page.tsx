'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  CurrencyDollarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface AreaStats {
  name: string
  avgPriceSqft: number
  unitsUnderConstruction: number
  salesVolume: number
  totalProperties: number
  coordinates: [number, number]
}

const dubaiAreas: AreaStats[] = [
  {
    name: 'Downtown Dubai',
    avgPriceSqft: 4500,
    unitsUnderConstruction: 120,
    salesVolume: 450,
    totalProperties: 3200,
    coordinates: [25.1972, 55.2744]
  },
  {
    name: 'Dubai Marina',
    avgPriceSqft: 5200,
    unitsUnderConstruction: 85,
    salesVolume: 380,
    totalProperties: 2800,
    coordinates: [25.0867, 55.1414]
  },
  {
    name: 'Palm Jumeirah',
    avgPriceSqft: 6800,
    unitsUnderConstruction: 40,
    salesVolume: 200,
    totalProperties: 1500,
    coordinates: [25.1442, 55.1186]
  },
  {
    name: 'Business Bay',
    avgPriceSqft: 3800,
    unitsUnderConstruction: 95,
    salesVolume: 320,
    totalProperties: 2100,
    coordinates: [25.1853, 55.2676]
  },
  {
    name: 'DIFC',
    avgPriceSqft: 5500,
    unitsUnderConstruction: 60,
    salesVolume: 280,
    totalProperties: 1200,
    coordinates: [25.2114, 55.2808]
  },
  {
    name: 'Arabian Ranches',
    avgPriceSqft: 3200,
    unitsUnderConstruction: 150,
    salesVolume: 520,
    totalProperties: 4000,
    coordinates: [25.0853, 55.1186]
  },
  {
    name: 'Emirates Living',
    avgPriceSqft: 2800,
    unitsUnderConstruction: 200,
    salesVolume: 650,
    totalProperties: 5200,
    coordinates: [25.0725, 55.1347]
  },
  {
    name: 'Dubai Hills Estate',
    avgPriceSqft: 4100,
    unitsUnderConstruction: 110,
    salesVolume: 420,
    totalProperties: 3100,
    coordinates: [25.0812, 55.2328]
  }
]

export default function InvestmentMapPage() {
  const [selectedArea, setSelectedArea] = useState<AreaStats | null>(null)
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch real-time properties from database
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/properties/map?type=all&limit=100')
        if (response.ok) {
          const data = await response.json()
          setProperties(data.properties || [])
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()

    // Set up real-time updates
    const interval = setInterval(fetchProperties, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_12.jpg"
            alt="Investment Map"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Dubai Investment <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Map</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Interactive map showing real-time property data, average prices, landmarks, and investment opportunities across Dubai's top neighborhoods.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Map Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Map Area */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border-2 border-cyan-400/20 bg-slate-800/50">
              <div className="aspect-video relative bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="h-16 w-16 text-cyan-400 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-lg mb-4">Interactive Map Viewer</p>
                  <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                    Click on any area below to view detailed statistics, or scroll through the area list to explore investment opportunities.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {dubaiAreas.map((area) => (
                      <button
                        key={area.name}
                        onClick={() => setSelectedArea(area)}
                        className="px-3 py-1 text-xs rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/30 transition-all"
                      >
                        {area.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Selected Area Stats */}
            <div className="rounded-2xl overflow-hidden">
              {selectedArea ? (
                <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/20 rounded-2xl p-8 h-full">
                  <h3 className="text-2xl font-bold text-white mb-6">{selectedArea.name}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CurrencyDollarIcon className="h-5 w-5 text-cyan-400" />
                        <p className="text-sm text-gray-400">Average Price per Sqft</p>
                      </div>
                      <p className="text-3xl font-bold text-white">
                        AED {selectedArea.avgPriceSqft.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BuildingOffice2Icon className="h-5 w-5 text-cyan-400" />
                        <p className="text-sm text-gray-400">Units Under Construction</p>
                      </div>
                      <p className="text-3xl font-bold text-white">
                        {selectedArea.unitsUnderConstruction}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ChartBarIcon className="h-5 w-5 text-cyan-400" />
                        <p className="text-sm text-gray-400">Sales Volume</p>
                      </div>
                      <p className="text-3xl font-bold text-white">
                        {selectedArea.salesVolume}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <SparklesIcon className="h-5 w-5 text-cyan-400" />
                        <p className="text-sm text-gray-400">Total Properties</p>
                      </div>
                      <p className="text-3xl font-bold text-white">
                        {selectedArea.totalProperties.toLocaleString()}
                      </p>
                    </div>

                    <Link
                      href={`/properties?area=${selectedArea.name.replace(/\s+/g, '-').toLowerCase()}`}
                      className="w-full mt-8 px-6 py-3 bg-linear-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all text-center"
                    >
                      View Properties <ArrowRightIcon className="inline h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/20 rounded-2xl p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-cyan-400/50 mx-auto mb-4" />
                    <p className="text-gray-400">Select an area to view detailed statistics</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dubaiAreas.map((area) => (
              <button
                key={area.name}
                onClick={() => setSelectedArea(area)}
                className={`rounded-2xl p-6 transition-all duration-300 text-left ${
                  selectedArea?.name === area.name
                    ? 'bg-linear-to-br from-cyan-400/30 to-blue-500/30 border-2 border-cyan-400 shadow-xl shadow-cyan-400/20'
                    : 'bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/20 hover:border-cyan-400/50'
                }`}
              >
                <h3 className="text-lg font-bold text-white mb-4">{area.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price/Sqft</span>
                    <span className="text-cyan-400 font-semibold">AED {area.avgPriceSqft.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Under Construction</span>
                    <span className="text-cyan-400 font-semibold">{area.unitsUnderConstruction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sales Volume</span>
                    <span className="text-cyan-400 font-semibold">{area.salesVolume}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-cyan-400/20">
                    <span className="text-gray-400">Total Properties</span>
                    <span className="text-cyan-400 font-semibold">{area.totalProperties.toLocaleString()}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How to Use This Map</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Click on Areas',
                description: 'Select any Dubai neighborhood to view detailed statistics and market insights'
              },
              {
                title: 'View Real-Time Data',
                description: 'Data updates automatically every 30 seconds with latest property information'
              },
              {
                title: 'Market Analysis',
                description: 'Compare average prices, construction activity, and sales volume across areas'
              },
              {
                title: 'Property Listings',
                description: 'Click "View Properties" to see all available properties in your selected area'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
                <CheckCircleIcon className="h-8 w-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Dubai Market Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Properties', value: dubaiAreas.reduce((a, b) => a + b.totalProperties, 0).toLocaleString(), icon: BuildingOffice2Icon },
            { label: 'Avg Price Range', value: 'AED 2.8K - 6.8K', icon: CurrencyDollarIcon },
            { label: 'Under Construction', value: dubaiAreas.reduce((a, b) => a + b.unitsUnderConstruction, 0).toLocaleString(), icon: ChartBarIcon },
            { label: 'Total Sales Volume', value: dubaiAreas.reduce((a, b) => a + b.salesVolume, 0).toLocaleString(), icon: SparklesIcon }
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
                <Icon className="h-8 w-8 text-cyan-400 mb-4" />
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-slate-900/80 to-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_15.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Invest in Dubai Real Estate?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Use our interactive map to explore opportunities, then connect with our expert advisors for personalized investment guidance.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Get Investment Advice
            </Link>
            <Link 
              href="/properties" 
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-300 font-bold rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
