'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { ArrowTrendingUpIcon, ChartBarIcon } from '@heroicons/react/24/outline'

interface AreaStat { name: string; count: number; avgPrice: number; avgPricePerSqft: number; totalViews: number }
interface MonthlyCount { month: string; count: number; saleCount: number; rentCount: number }
interface TypeStat { type: string; count: number }
interface MarketStats {
  summary: { totalListings: number; forSale: number; forRent: number; offPlan: number; ready: number; totalProjects: number; avgPrice: number; avgPricePerSqft: number }
  byArea: AreaStat[]
  byType: TypeStat[]
  monthlyCounts: MonthlyCount[]
  priceRanges: { label: string; count: number }[]
  generatedAt: string
}

export default function MarketPerformancePage() {
  const [stats, setStats] = useState<MarketStats | null>(null)

  useEffect(() => {
    fetch('/api/market-stats')
      .then(r => r.json())
      .then(d => { if (d.summary) setStats(d) })
      .catch(() => {})
  }, [])

  const fmtPrice = (n: number) => n >= 1_000_000 ? `AED ${(n / 1_000_000).toFixed(1)}M` : `AED ${(n / 1000).toFixed(0)}K`

  // Top 6 areas by listing count for the table
  const topAreas = (stats?.byArea || []).slice(0, 6)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#8A6508]/15 text-[#6E4F05] px-4 py-2 rounded-full mb-4 font-semibold">
            <ArrowTrendingUpIcon className="w-5 h-5" />
            Performance Metrics
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Market <span className="text-[#8A6508]">Performance</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Detailed analysis of Dubai's real estate market performance based on live listing data
          </p>
          {stats && (
            <p className="mt-3 text-xs text-slate-400">Live data — refreshed {new Date(stats.generatedAt).toLocaleString()}</p>
          )}
        </div>

        {/* Key Metrics — real */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Listings', value: stats ? stats.summary.totalListings.toLocaleString() : '...', segment: 'Active' },
            { label: 'Avg Listing Price', value: stats ? fmtPrice(stats.summary.avgPrice) : '...', segment: 'All types' },
            { label: 'Off-Plan', value: stats ? stats.summary.offPlan.toLocaleString() : '...', segment: 'Listings' },
            { label: 'Avg Price/Sqft', value: stats ? `AED ${stats.summary.avgPricePerSqft.toLocaleString()}` : '...', segment: 'Per sqft' },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <p className="text-xs text-slate-600 font-semibold mb-2 uppercase">{metric.segment}</p>
              <p className="text-2xl font-bold text-[#8A6508] mb-1">{metric.value}</p>
              <p className="text-sm text-slate-700">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Monthly Listings Chart — real data */}
        {stats && stats.monthlyCounts.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Monthly New Listings (Last 12 Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyCounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="saleCount" fill="#8A6508" name="For Sale" />
                <Bar dataKey="rentCount" fill="#3b82f6" name="For Rent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Price Range Distribution — real */}
        {stats && stats.priceRanges.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Price Range Distribution</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats.priceRanges} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="label" width={160} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" name="Listings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Areas Table — real */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Top Areas by Listings</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Area</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Listings</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Avg Price</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Avg / Sqft</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Total Views</th>
                  </tr>
                </thead>
                <tbody>
                  {topAreas.length > 0 ? topAreas.map((area, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{area.name}</td>
                      <td className="px-6 py-4 text-slate-700">{area.count.toLocaleString()}</td>
                      <td className="px-6 py-4 text-[#8A6508] font-bold">{fmtPrice(area.avgPrice)}</td>
                      <td className="px-6 py-4 text-blue-600 font-bold">
                        {area.avgPricePerSqft ? `AED ${area.avgPricePerSqft.toLocaleString()}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-slate-700">{area.totalViews.toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading data...</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Market Outlook */}
        <div className="bg-linear-to-r from-[#8A6508] to-[#5C4204] rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">2025–2026 Market Outlook</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Positive Indicators</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3"><span className="text-[#D2B377]">✓</span><span>Strong population and expat growth</span></li>
                <li className="flex gap-3"><span className="text-[#D2B377]">✓</span><span>New mega projects and developments</span></li>
                <li className="flex gap-3"><span className="text-[#D2B377]">✓</span><span>International investor confidence</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Growth Areas</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3"><span className="text-[#D2B377]">✓</span><span>Emerging locations (JVC, Ras Al Khor)</span></li>
                <li className="flex gap-3"><span className="text-[#D2B377]">✓</span><span>Mixed-use developments</span></li>
                <li className="flex gap-3"><span className="text-[#D2B377]">✓</span><span>Sustainable and smart properties</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
