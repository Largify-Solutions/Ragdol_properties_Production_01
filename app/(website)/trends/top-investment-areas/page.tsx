'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ChartBarIcon,
  EyeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

interface AreaStat {
  name: string
  count: number
  avgPrice: number
  avgPricePerSqft: number
  totalViews: number
}

interface MarketStats {
  summary: {
    totalListings: number
    forSale: number
    forRent: number
    offPlan: number
    ready: number
    totalProjects: number
    avgPrice: number
    avgPricePerSqft: number
  }
  byArea: AreaStat[]
  generatedAt: string
}

function formatPrice(price: number) {
  if (price >= 1_000_000) return `AED ${(price / 1_000_000).toFixed(1)}M`
  if (price >= 1_000) return `AED ${(price / 1_000).toFixed(0)}K`
  return `AED ${price.toLocaleString()}`
}

export default function TopInvestmentAreasPage() {
  const [filterType, setFilterType] = useState<'all' | 'popular' | 'high-value' | 'budget'>('all')
  const [sortBy, setSortBy] = useState<'count' | 'price' | 'sqft'>('count')
  const [stats, setStats] = useState<MarketStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/market-stats')
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const areas: AreaStat[] = stats?.byArea ?? []

  // Compute median listing count for "popular" filter
  const medianCount = areas.length
    ? [...areas].sort((a, b) => a.count - b.count)[Math.floor(areas.length / 2)]?.count ?? 0
    : 0

  const filteredAreas = areas.filter(area => {
    if (filterType === 'all') return true
    if (filterType === 'popular') return area.count >= medianCount
    if (filterType === 'high-value') return area.avgPrice >= 2_000_000
    if (filterType === 'budget') return area.avgPrice < 1_500_000
    return true
  })

  const sortedAreas = [...filteredAreas].sort((a, b) => {
    if (sortBy === 'count') return b.count - a.count
    if (sortBy === 'price') return b.avgPrice - a.avgPrice
    return b.avgPricePerSqft - a.avgPricePerSqft
  })

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Top Investment <span className="text-[#c5a059]">Areas</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Ranked by live listing data from our Dubai property database. Areas are sorted by market activity and listing volumes.
          </p>
          {stats && (
            <p className="text-xs text-slate-400 mt-3">
              Live data · {stats.byArea.length} areas · Last updated: {new Date(stats.generatedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Summary Metrics */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold mb-1">TOTAL LISTINGS</p>
              <p className="text-2xl font-bold text-slate-900">{stats.summary.totalListings.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold mb-1">AVG MARKET PRICE</p>
              <p className="text-2xl font-bold text-slate-900">{formatPrice(stats.summary.avgPrice)}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold mb-1">AVG PRICE / SQFT</p>
              <p className="text-2xl font-bold text-slate-900">AED {Math.round(stats.summary.avgPricePerSqft).toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold mb-1">ACTIVE AREAS</p>
              <p className="text-2xl font-bold text-slate-900">{stats.byArea.length}</p>
            </div>
          </div>
        )}

        {/* Filters and Sort */}
        <div className="mb-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Filter by Segment</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Areas' },
                  { id: 'popular', label: 'Most Active' },
                  { id: 'high-value', label: 'Premium (2M+)' },
                  { id: 'budget', label: 'Value (Under 1.5M)' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterType(filter.id as typeof filterType)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      filterType === filter.id
                        ? 'bg-[#c5a059] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Sort By</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'count', label: 'Most Listings' },
                  { id: 'price', label: 'Avg Price' },
                  { id: 'sqft', label: 'Price / Sqft' }
                ].map(sort => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id as typeof sortBy)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      sortBy === sort.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a059]" />
          </div>
        )}

        {/* Areas List */}
        {!loading && (
          <div className="space-y-6">
            {sortedAreas.length === 0 && (
              <div className="text-center py-20 text-slate-500">No areas match the selected filter.</div>
            )}
            {sortedAreas.map((area, idx) => {
              const rank = idx + 1
              const demandLabel = area.count >= 20 ? 'Very High' : area.count >= 10 ? 'High' : area.count >= 5 ? 'Medium' : 'Low'
              const demandColor = area.count >= 10 ? 'text-[#c5a059]' : 'text-slate-600'
              return (
                <div
                  key={area.name}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-5 gap-6 items-start">
                      {/* Rank and Name */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-4">
                          <div className="shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-linear-to-br from-[#c5a059] to-[#996515] text-white font-bold text-lg">
                              {rank}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{area.name}</h3>
                            <p className="text-slate-500 text-sm mb-3 flex items-center gap-1">
                              <MapPinIcon className="h-4 w-4" /> Dubai
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-[#c5a059]/10 text-[#996515] text-xs font-medium rounded-full">
                                {area.count} listing{area.count !== 1 ? 's' : ''}
                              </span>
                              {area.avgPrice >= 2_000_000 && (
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">Premium</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-4 md:col-span-3">
                        <div>
                          <p className="text-xs text-slate-600 font-semibold mb-1">AVG PRICE</p>
                          <p className="text-xl md:text-2xl font-bold text-slate-900">{formatPrice(area.avgPrice)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-semibold mb-1">PRICE / SQFT</p>
                          <p className="text-xl md:text-2xl font-bold text-[#c5a059]">
                            AED {Math.round(area.avgPricePerSqft).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-semibold mb-1">TOTAL VIEWS</p>
                          <p className="text-xl md:text-2xl font-bold text-[#c5a059]">{area.totalViews.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="mt-6 pt-6 border-t border-slate-200 grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-slate-600 font-semibold mb-3">LISTING BREAKDOWN</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-700">Total Listings</span>
                            <span className="font-bold text-[#c5a059] text-sm">{area.count}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-700">Avg Price/Sqft</span>
                            <span className="font-bold text-[#c5a059] text-sm">AED {Math.round(area.avgPricePerSqft).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-700">Avg Price</span>
                            <span className="font-bold text-[#c5a059] text-sm">{formatPrice(area.avgPrice)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 font-semibold mb-3">MARKET DEMAND</p>
                        <p className={`text-sm font-bold mb-1 ${demandColor}`}>{demandLabel}</p>
                        <p className="text-xs text-slate-600 flex items-center gap-1">
                          <EyeIcon className="h-3 w-3" /> {area.totalViews.toLocaleString()} total property views
                        </p>
                      </div>

                      <div className="flex gap-2 items-end">
                        <Link
                          href={`/properties?area=${encodeURIComponent(area.name)}`}
                          className="flex-1 px-4 py-2 bg-[#c5a059] text-white font-semibold rounded-lg hover:bg-[#996515] text-center text-sm"
                        >
                          View Properties
                        </Link>
                        <Link
                          href={`/trends/market-insights`}
                          className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-center text-sm"
                        >
                          Market Insights
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Investment Guide CTA */}
        <div className="mt-16 bg-linear-to-r from-[#996515] to-[#c5a059] rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Compare Properties in These Areas</h2>
          <p className="text-lg mb-8 opacity-90">
            Browse listings, compare prices, and find your perfect investment property in Dubai's top growth areas
          </p>
          <Link
            href="/properties?sort=latest"
            className="inline-block px-8 py-4 bg-white text-[#c5a059] font-bold rounded-lg hover:bg-slate-100"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    </div>
  )
}
