'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

interface MonthCount { month: string; count: number; saleCount: number; rentCount: number }
interface TypeStat { type: string; count: number }
interface PriceRange { range: string; count: number }
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
  byType: TypeStat[]
  priceRanges: PriceRange[]
  monthlyCounts: MonthCount[]
  generatedAt: string
}

export default function TransactionSupplyPage() {
  const [stats, setStats] = useState<MarketStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/market-stats')
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const totalTypeCount = stats?.byType.reduce((sum, t) => sum + t.count, 0) ?? 0

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Transactions & <span className="text-emerald-600">Supply</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Live listing volumes, supply breakdown, and market distribution from our Dubai property database.
          </p>
          {stats && (
            <p className="text-xs text-slate-400 mt-3">
              Live data · Last updated: {new Date(stats.generatedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Key Metrics */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
          </div>
        ) : stats ? (
          <>
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <p className="text-sm text-slate-600 font-semibold mb-2">TOTAL LISTINGS</p>
                <p className="text-3xl font-bold text-slate-900">{stats.summary.totalListings.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-2">Live count</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <p className="text-sm text-slate-600 font-semibold mb-2">FOR SALE</p>
                <p className="text-3xl font-bold text-slate-900">{stats.summary.forSale.toLocaleString()}</p>
                <p className="text-xs text-blue-600 font-semibold mt-2">
                  {stats.summary.totalListings > 0
                    ? `${Math.round((stats.summary.forSale / stats.summary.totalListings) * 100)}% of total`
                    : '—'}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <p className="text-sm text-slate-600 font-semibold mb-2">FOR RENT</p>
                <p className="text-3xl font-bold text-slate-900">{stats.summary.forRent.toLocaleString()}</p>
                <p className="text-xs text-purple-600 font-semibold mt-2">
                  {stats.summary.totalListings > 0
                    ? `${Math.round((stats.summary.forRent / stats.summary.totalListings) * 100)}% of total`
                    : '—'}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <p className="text-sm text-slate-600 font-semibold mb-2">OFF-PLAN / NEW</p>
                <p className="text-3xl font-bold text-slate-900">{stats.summary.offPlan.toLocaleString()}</p>
                <p className="text-xs text-amber-600 font-semibold mt-2">
                  {stats.summary.totalListings > 0
                    ? `${Math.round((stats.summary.offPlan / stats.summary.totalListings) * 100)}% of total`
                    : '—'}
                </p>
              </div>
            </div>

            {/* Monthly Listings Chart */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Monthly New Listings (Last 12 Months)</h2>
              <p className="text-sm text-slate-500 mb-6">Properties added to the database per month, split by sale vs rent status</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.monthlyCounts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                  <Legend />
                  <Bar dataKey="saleCount" fill="#10b981" name="Sale Listings" />
                  <Bar dataKey="rentCount" fill="#3b82f6" name="Rent Listings" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Price Range Distribution */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Price Range Distribution</h2>
              <p className="text-sm text-slate-500 mb-6">Number of listings in each price bracket</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats.priceRanges} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="range" width={140} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                  <Bar dataKey="count" fill="#f59e0b" name="Listings" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Property Type Breakdown */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Supply Breakdown by Property Type</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {stats.byType.map((t, idx) => {
                  const pct = totalTypeCount > 0 ? Math.round((t.count / totalTypeCount) * 100) : 0
                  return (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 capitalize">{t.type}</h3>
                        <span className="text-slate-700 font-bold text-lg">{t.count.toLocaleString()} listings</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="bg-linear-to-r from-emerald-500 to-blue-500 h-3 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-600 mt-3">{pct}% of total listings</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Supply Status Summary */}
            <div className="bg-linear-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-8">Supply Snapshot</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Ready Properties</h3>
                  <p className="text-5xl font-bold mb-2">{stats.summary.ready.toLocaleString()}</p>
                  <p className="opacity-90">Move-in ready listings available now</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Off-Plan / New</h3>
                  <p className="text-5xl font-bold mb-2">{stats.summary.offPlan.toLocaleString()}</p>
                  <p className="opacity-90">Under construction or new development properties</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Active Projects</h3>
                  <p className="text-5xl font-bold mb-2">{stats.summary.totalProjects.toLocaleString()}</p>
                  <p className="opacity-90">Active development projects listed on the platform</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-slate-500">Could not load market data.</div>
        )}
      </div>
    </div>
  )
}
