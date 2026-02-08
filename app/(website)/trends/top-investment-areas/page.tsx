'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowTrendingUpIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function TopInvestmentAreasPage() {
  const [filterType, setFilterType] = useState<'all' | 'appreciation' | 'yield' | 'emerging'>('all')
  const [sortBy, setSortBy] = useState<'growth' | 'yield' | 'price'>('growth')

  const topAreas = [
    {
      rank: 1,
      name: 'Jumeirah Village Circle (JVC)',
      avgPrice: 'AED 1.2M',
      growth: '+16.5%',
      yield: '5.2%',
      type: ['appreciation', 'emerging'],
      demand: 'Very High',
      score: 9.2,
      highlights: 'Fastest growing community with student and young professional demand',
      roi: {
        year1: '+8%',
        year3: '+14%',
        year5: '+25%+'
      },
      bestFor: ['First-time investors', 'Buy-to-let', 'Budget investors']
    },
    {
      rank: 2,
      name: 'Emirates Living',
      avgPrice: 'AED 1.8M',
      growth: '+14.3%',
      yield: '4.8%',
      type: ['appreciation', 'yield'],
      demand: 'Very High',
      score: 8.9,
      highlights: 'Best rental yield with strong capital appreciation',
      roi: {
        year1: '+7%',
        year3: '+12%',
        year5: '+22%+'
      },
      bestFor: ['Buy-to-let investors', 'Families', 'Value hunters']
    },
    {
      rank: 3,
      name: 'Arabian Ranches',
      avgPrice: 'AED 2.1M',
      growth: '+12.8%',
      yield: '4.5%',
      type: ['appreciation', 'yield'],
      demand: 'High',
      score: 8.7,
      highlights: 'Established community with steady appreciation and family appeal',
      roi: {
        year1: '+6.5%',
        year3: '+11%',
        year5: '+20%+'
      },
      bestFor: ['Family homes', 'Long-term investment', 'Community seekers']
    },
    {
      rank: 4,
      name: 'Dubai Hills Estate',
      avgPrice: 'AED 2.6M',
      growth: '+10.4%',
      yield: '4.3%',
      type: ['appreciation', 'yield'],
      demand: 'High',
      score: 8.4,
      highlights: 'Premium villa community with steady market performance',
      roi: {
        year1: '+5.5%',
        year3: '+9.5%',
        year5: '+18%+'
      },
      bestFor: ['Luxury investors', 'Villa seekers', 'Premium homes']
    },
    {
      rank: 5,
      name: 'Downtown Dubai',
      avgPrice: 'AED 2.8M',
      growth: '+8.5%',
      yield: '4.2%',
      type: ['appreciation', 'yield'],
      demand: 'High',
      score: 8.2,
      highlights: 'Prime location with stable market and high rental demand',
      roi: {
        year1: '+5%',
        year3: '+8%',
        year5: '+16%+'
      },
      bestFor: ['Premium apartments', 'Short-term rentals', 'Business professionals']
    },
    {
      rank: 6,
      name: 'Dubai Marina',
      avgPrice: 'AED 3.2M',
      growth: '+11.2%',
      yield: '3.8%',
      type: ['appreciation'],
      demand: 'High',
      score: 8.0,
      highlights: 'Lifestyle hub with strong international appeal',
      roi: {
        year1: '+6%',
        year3: '+10%',
        year5: '+19%+'
      },
      bestFor: ['Waterfront living', 'International investors', 'Tourist rentals']
    },
    {
      rank: 7,
      name: 'Business Bay',
      avgPrice: 'AED 1.9M',
      growth: '+9.2%',
      yield: '4.1%',
      type: ['appreciation', 'yield'],
      demand: 'Medium-High',
      score: 7.8,
      highlights: 'Commercial hub with emerging residential appeal',
      roi: {
        year1: '+5%',
        year3: '+8.5%',
        year5: '+16%+'
      },
      bestFor: ['Commercial professionals', 'Budget investors', 'Mixed-use']
    },
    {
      rank: 8,
      name: 'Ras Al Khor',
      avgPrice: 'AED 1.5M',
      growth: '+18.2%',
      yield: '4.9%',
      type: ['appreciation', 'emerging'],
      demand: 'Very High',
      score: 8.5,
      highlights: 'Emerging area with rapid development and high growth potential',
      roi: {
        year1: '+9%',
        year3: '+15%',
        year5: '+28%+'
      },
      bestFor: ['Growth investors', 'Development-focused', 'Long-term wealth']
    },
    {
      rank: 9,
      name: 'Palm Jumeirah',
      avgPrice: 'AED 4.5M',
      growth: '+9.6%',
      yield: '3.5%',
      type: ['appreciation'],
      demand: 'Medium',
      score: 7.6,
      highlights: 'Ultra-luxury waterfront living with premium positioning',
      roi: {
        year1: '+5%',
        year3: '+8%',
        year5: '+15%+'
      },
      bestFor: ['Ultra-luxury', 'High-net-worth', 'Prestige buyers']
    },
    {
      rank: 10,
      name: 'DIFC',
      avgPrice: 'AED 3.8M',
      growth: '+7.8%',
      yield: '3.3%',
      type: ['appreciation'],
      demand: 'Medium',
      score: 7.4,
      highlights: 'Financial center with premium commercial and residential mix',
      roi: {
        year1: '+4%',
        year3: '+7%',
        year5: '+14%+'
      },
      bestFor: ['Corporate professionals', 'Premium apartments', 'Finance sector']
    }
  ]

  const filteredAreas = topAreas.filter(area => {
    if (filterType === 'all') return true
    return area.type.includes(filterType)
  })

  const sortedAreas = [...filteredAreas].sort((a, b) => {
    if (sortBy === 'growth') {
      return parseFloat(b.growth) - parseFloat(a.growth)
    } else if (sortBy === 'yield') {
      return parseFloat(b.yield) - parseFloat(a.yield)
    } else {
      return parseFloat(a.avgPrice) - parseFloat(b.avgPrice)
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Top Investment <span className="text-emerald-600">Areas</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Ranked and analyzed according to growth potential, rental yield, and investment returns. Updated with 2024 market data.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Filter by Type</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Areas' },
                  { id: 'appreciation', label: 'Capital Growth' },
                  { id: 'yield', label: 'High Yield' },
                  { id: 'emerging', label: 'Emerging Markets' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterType(filter.id as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filterType === filter.id
                        ? 'bg-emerald-600 text-white'
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
                  { id: 'growth', label: 'Growth Rate' },
                  { id: 'yield', label: 'Rental Yield' },
                  { id: 'price', label: 'Avg Price' }
                ].map(sort => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
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

        {/* Areas List */}
        <div className="space-y-6">
          {sortedAreas.map((area) => (
            <div
              key={area.rank}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-5 gap-6 items-start">
                  {/* Rank and Name */}
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600 text-white font-bold text-lg">
                          {area.rank}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{area.name}</h3>
                        <p className="text-slate-600 text-sm mb-3">{area.highlights}</p>
                        <div className="flex flex-wrap gap-2">
                          {area.bestFor.slice(0, 2).map((use, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 md:col-span-3">
                    <div>
                      <p className="text-xs text-slate-600 font-semibold mb-1">AVG PRICE</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-900">{area.avgPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-semibold mb-1">GROWTH RATE</p>
                      <p className="text-xl md:text-2xl font-bold text-emerald-600">{area.growth}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-semibold mb-1">RENTAL YIELD</p>
                      <p className="text-xl md:text-2xl font-bold text-blue-600">{area.yield}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                <div className="mt-6 pt-6 border-t border-slate-200 grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-3">PROJECTED ROI</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-700">Year 1</span>
                        <span className="font-bold text-emerald-600 text-sm">{area.roi.year1}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-700">Year 3</span>
                        <span className="font-bold text-emerald-600 text-sm">{area.roi.year3}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-700">Year 5+</span>
                        <span className="font-bold text-emerald-600 text-sm">{area.roi.year5}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-3">MARKET DEMAND</p>
                    <div className="mb-2">
                      <p className={`text-sm font-bold ${
                        area.demand === 'Very High' ? 'text-emerald-600' :
                        area.demand === 'High' ? 'text-blue-600' :
                        'text-slate-600'
                      }`}>
                        {area.demand}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600">Investment Score: <span className="font-bold text-slate-900">{area.score}/10</span></p>
                  </div>

                  <div className="flex gap-2 items-end">
                    <Link
                      href={`/properties?area=${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-center text-sm"
                    >
                      View Properties
                    </Link>
                    <Link
                      href={`/trends/investment-analysis?area=${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center text-sm"
                    >
                      Full Analysis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Investment Guide CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Compare Properties in These Areas</h2>
          <p className="text-lg mb-8 opacity-90">
            Browse listings, compare prices, and find your perfect investment property in Dubai's top growth areas
          </p>
          <Link
            href="/properties?sort=latest"
            className="inline-block px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    </div>
  )
}
