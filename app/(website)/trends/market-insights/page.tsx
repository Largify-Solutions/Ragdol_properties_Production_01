'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface AreaStat {
  name: string
  count: number
  avgPrice: number
  avgPricePerSqft: number
  totalViews: number
}

interface TypeStat { type: string; count: number }

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
  byType: TypeStat[]
  generatedAt: string
}

export default function MarketInsightsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'areas'>('overview')
  const [stats, setStats] = useState<MarketStats | null>(null)

  useEffect(() => {
    fetch('/api/market-stats')
      .then(r => r.json())
      .then(d => { if (d.summary) setStats(d) })
      .catch(() => {})
  }, [])

  const fmtPrice = (n: number) => n >= 1_000_000 ? `AED ${(n / 1_000_000).toFixed(1)}M` : `AED ${(n / 1000).toFixed(0)}K`
  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)

  const keyMetrics = [
    {
      label: 'Total Active Listings',
      value: stats ? fmt(stats.summary.totalListings) : '...',
      change: 'Live count',
      icon: ChartBarIcon,
      color: 'text-[#8A6508]',
      bgColor: 'bg-[#F8F1E0]'
    },
    {
      label: 'Average Listing Price',
      value: stats ? fmtPrice(stats.summary.avgPrice) : '...',
      change: 'Avg across all listings',
      icon: CurrencyDollarIcon,
      color: 'text-[#7A5806]',
      bgColor: 'bg-[#F5EBD1]'
    },
    {
      label: 'Active Projects',
      value: stats ? String(stats.summary.totalProjects) : '...',
      change: 'Published developments',
      icon: BuildingOffice2Icon,
      color: 'text-[#6A4C05]',
      bgColor: 'bg-[#F3E7C8]'
    },
    {
      label: 'Avg Price / Sq.Ft',
      value: stats ? `AED ${stats.summary.avgPricePerSqft.toLocaleString()}` : '...',
      change: 'Across listed properties',
      icon: HomeIcon,
      color: 'text-[#5C4204]',
      bgColor: 'bg-[#F9F2E3]'
    }
  ]

  // Top 6 areas by listing count from real DB data
  const marketAreas = (stats?.byArea || []).slice(0, 6).map(a => ({
    name: a.name,
    avgPrice: fmtPrice(a.avgPrice),
    properties: a.count.toLocaleString(),
    avgPricePerSqft: a.avgPricePerSqft ? `AED ${a.avgPricePerSqft.toLocaleString()}/sqft` : 'N/A',
    totalViews: a.totalViews.toLocaleString(),
  }))

  const marketTrends = [
    {
      title: 'Residential Market Growth',
      description: 'The Dubai residential market continues its upward trajectory with sustained demand from both investors and end-users. New developments in emerging areas driving price appreciation.',
      impact: 'High',
      timeline: '2025–2026'
    },
    {
      title: 'Off-Plan Momentum',
      description: `${stats ? stats.summary.offPlan : '...'} off-plan listings currently active on our platform, reflecting strong developer pipeline and investor confidence in future developments.`,
      impact: 'High',
      timeline: '2025–2026'
    },
    {
      title: 'Luxury Segment Momentum',
      description: 'Ultra-premium properties showing strong performance with international investor confidence. Limited supply in the luxury segment creating appreciation opportunities.',
      impact: 'High',
      timeline: '2025–2027'
    },
    {
      title: 'Rental Market Stability',
      description: `${stats ? fmt(stats.summary.forRent) : '...'} rental listings available. Average yields remain attractive, drawing consistent buy-to-let investment.`,
      impact: 'Medium',
      timeline: '2025–2026'
    },
    {
      title: 'Investment in Emerging Areas',
      description: 'New areas seeing increased investor interest with better price points and development opportunities.',
      impact: 'High',
      timeline: '2025–2027'
    },
    {
      title: 'Sustainability Focus',
      description: 'Green building and sustainable developments becoming an investment priority. Projects with LEED/Estidama certifications commanding premium valuations.',
      impact: 'Medium-High',
      timeline: '2025–2028'
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Market <span className="text-[#8A6508]">Insights</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive analysis of Dubai's real estate market with data-driven insights to guide your investment decisions
          </p>
          {stats && (
            <p className="mt-3 text-xs text-slate-400">
              Live data — last refreshed {new Date(stats.generatedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Key Metrics — real data */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {keyMetrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all">
                <div className={`inline-flex p-3 ${metric.bgColor} rounded-xl mb-4`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <p className="text-sm font-medium text-slate-600 mb-2">{metric.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-[#8A6508] font-semibold">{metric.change}</p>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {['overview', 'performance', 'areas'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-4 font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'text-[#8A6508] border-b-2 border-[#8A6508]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'overview' && 'Market Overview'}
              {tab === 'performance' && 'Supply Breakdown'}
              {tab === 'areas' && 'Top Areas'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {marketTrends.map((trend, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex-1">{trend.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    trend.impact === 'High' ? 'bg-[#F3E7C8] text-[#6B4E06]' :
                    trend.impact === 'Medium-High' ? 'bg-[#EFE1BD] text-[#7A5806]' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {trend.impact} Impact
                  </span>
                </div>
                <p className="text-slate-600 mb-4">{trend.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-sm font-medium text-slate-600">{trend.timeline}</span>
                  <ArrowTrendingUpIcon className="w-5 h-5 text-[#8A6508]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Listing Status</h3>
                {stats && (
                  <div className="space-y-4">
                    {[
                      { label: 'For Sale', count: stats.summary.forSale, color: 'bg-[#8A6508]' },
                      { label: 'For Rent', count: stats.summary.forRent, color: 'bg-[#7A5806]' },
                      { label: 'Off-Plan', count: stats.summary.offPlan, color: 'bg-[#6A4C05]' },
                      { label: 'Ready', count: stats.summary.ready, color: 'bg-[#5C4204]' },
                    ].map(item => {
                      const pct = stats.summary.totalListings > 0
                        ? Math.round((item.count / stats.summary.totalListings) * 100)
                        : 0
                      return (
                        <div key={item.label}>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm text-slate-600">{item.label}</p>
                            <span className="text-sm font-bold text-slate-900">{item.count.toLocaleString()} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className={`${item.color} h-2 rounded-full`} style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Property Types</h3>
                <div className="space-y-3">
                  {(stats?.byType || []).slice(0, 6).map((t, i) => {
                    const pct = stats?.summary.totalListings
                      ? Math.round((t.count / stats.summary.totalListings) * 100)
                      : 0
                    return (
                      <div key={t.type}>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm text-slate-600 capitalize">{t.type}</p>
                          <span className="text-sm font-bold text-slate-900">{t.count}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-[#8A6508] h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Key Numbers</h3>
                {stats && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Active Listings</p>
                      <p className="text-2xl font-bold text-slate-900">{stats.summary.totalListings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Active Projects</p>
                      <p className="text-2xl font-bold text-slate-900">{stats.summary.totalProjects}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Avg Price Per Sqft</p>
                      <p className="text-2xl font-bold text-slate-900">AED {stats.summary.avgPricePerSqft.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'areas' && (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {marketAreas.length > 0 ? marketAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{area.name}</h3>
                    <p className="text-sm text-slate-600">{area.properties} listings</p>
                  </div>
                  <MapPinIcon className="w-5 h-5 text-[#8A6508] mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Avg Price</p>
                    <p className="text-base font-bold text-slate-900">{area.avgPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Avg / Sqft</p>
                    <p className="text-base font-bold text-slate-900">{area.avgPricePerSqft}</p>
                  </div>
                </div>

                <Link
                  href={`/properties?area=${encodeURIComponent(area.name)}`}
                  className="inline-flex items-center gap-2 text-[#8A6508] font-semibold hover:text-[#5C4204] transition-colors"
                >
                  View Listings
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                </Link>
              </div>
            )) : (
              <div className="col-span-2 text-center py-12 text-slate-400">Loading area data...</div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-linear-to-r from-[#8A6508] to-[#5C4204] rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
          <p className="text-lg mb-8 opacity-90">
            Explore our complete investment analysis tools and find the perfect property for your portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trends/investment-analysis"
              className="px-8 py-4 bg-white text-[#5C4204] font-bold rounded-lg hover:bg-amber-50 transition-colors"
            >
              Investment Guide
            </Link>
            <Link
              href="/trends/investment-map"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore Areas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
