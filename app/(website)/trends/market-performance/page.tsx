'use client'

import {
  LineChart,
  Line,
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

export default function MarketPerformancePage() {
  const priceData = [
    { year: 2020, residential: 3200, commercial: 4500, luxury: 8200 },
    { year: 2021, residential: 3400, commercial: 4700, luxury: 8600 },
    { year: 2022, residential: 3650, commercial: 5100, luxury: 9200 },
    { year: 2023, residential: 3850, commercial: 5400, luxury: 9800 },
    { year: 2024, residential: 4120, commercial: 5800, luxury: 10500 }
  ]

  const performanceMetrics = [
    {
      title: 'Price Growth (2024)',
      value: '+9.8%',
      segment: 'Residential',
      trend: 'up'
    },
    {
      title: 'Commercial Growth',
      value: '+8.2%',
      segment: 'Commercial',
      trend: 'up'
    },
    {
      title: 'Luxury Segment',
      value: '+11.2%',
      segment: 'Luxury',
      trend: 'up'
    },
    {
      title: 'Average Rental Yield',
      value: '4.2%',
      segment: 'All Segments',
      trend: 'stable'
    }
  ]

  const areaPerformance = [
    { area: 'JVC', growth: '+16.5%', yield: '5.2%', sentiment: 'Very Positive' },
    { area: 'Ras Al Khor', growth: '+18.2%', yield: '4.9%', sentiment: 'Very Positive' },
    { area: 'Emirates Living', growth: '+14.3%', yield: '4.8%', sentiment: 'Positive' },
    { area: 'Arabian Ranches', growth: '+12.8%', yield: '4.5%', sentiment: 'Positive' },
    { area: 'Dubai Marina', growth: '+11.2%', yield: '3.8%', sentiment: 'Positive' },
    { area: 'Downtown Dubai', growth: '+8.5%', yield: '4.2%', sentiment: 'Stable' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4 font-semibold">
            <ArrowTrendingUpIcon className="w-5 h-5" />
            Performance Metrics
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Market <span className="text-emerald-600">Performance</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Detailed analysis of Dubai's real estate market performance, price trends, and segment-wise growth
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {performanceMetrics.map((metric, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <p className="text-xs text-slate-600 font-semibold mb-2 uppercase">{metric.segment}</p>
              <p className="text-3xl font-bold text-emerald-600 mb-1">{metric.value}</p>
              <p className="text-sm text-slate-700">{metric.title}</p>
            </div>
          ))}
        </div>

        {/* Price Trend Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Price Trend by Segment (AED/sqft)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `AED ${value}`} />
              <Legend />
              <Line type="monotone" dataKey="residential" stroke="#10b981" strokeWidth={2} name="Residential" />
              <Line type="monotone" dataKey="commercial" stroke="#3b82f6" strokeWidth={2} name="Commercial" />
              <Line type="monotone" dataKey="luxury" stroke="#f59e0b" strokeWidth={2} name="Luxury" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Performance */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Top Performing Areas (2024)</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Area</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Growth Rate</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Rental Yield</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Market Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {areaPerformance.map((area, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{area.area}</td>
                      <td className="px-6 py-4 text-emerald-600 font-bold">{area.growth}</td>
                      <td className="px-6 py-4 text-blue-600 font-bold">{area.yield}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
                          area.sentiment === 'Very Positive' ? 'bg-emerald-100 text-emerald-700' :
                          area.sentiment === 'Positive' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {area.sentiment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Segment Analysis */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'Residential Market',
              growth: '+9.8%',
              outlook: 'Strong',
              highlights: ['Average prices up', 'High demand', 'Investment-friendly']
            },
            {
              title: 'Commercial Market',
              growth: '+8.2%',
              outlook: 'Positive',
              highlights: ['Office demand rising', 'Retail expansion', 'Co-working growth']
            },
            {
              title: 'Luxury Segment',
              growth: '+11.2%',
              outlook: 'Very Strong',
              highlights: ['High appreciation', 'Limited supply', 'International buyers']
            }
          ].map((segment, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{segment.title}</h3>
              <p className="text-3xl font-bold text-emerald-600 mb-4">{segment.growth}</p>
              <div className="mb-4 pb-4 border-b border-slate-200">
                <p className="text-sm font-semibold text-slate-600">Outlook: <span className="text-slate-900">{segment.outlook}</span></p>
              </div>
              <ul className="space-y-2">
                {segment.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-slate-700 flex gap-2">
                    <span className="text-emerald-600">✓</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Market Outlook */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">2024-2025 Market Outlook</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Positive Indicators</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Strong population and expat growth</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>New mega projects and developments</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>International investor confidence</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Growth Areas</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Emerging locations (JVC, Ras Al Khor)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Mixed-use developments</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Sustainable and smart properties</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
