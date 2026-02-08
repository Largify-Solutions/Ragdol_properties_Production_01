'use client'

import Link from 'next/link'
import { ChartBarIcon } from '@heroicons/react/24/outline'

export default function YearlyUpdatesPage() {
  const yearlyReports = [
    {
      year: '2024',
      growth: '+9.8%',
      transactions: '185.5K',
      investment: 'AED 680B',
      summary: 'Record-breaking year with strong investor activity, new mega-projects, and market expansion',
      highlights: [
        'Highest transaction volume in history',
        'Major project launches (Atlantis, Emaar Beachfront)',
        'Population growth at 5.2%',
        'Luxury segment appreciation +11.2%',
        'Emerging areas outperformed expectations'
      ]
    },
    {
      year: '2023',
      growth: '+6.2%',
      transactions: '164.8K',
      investment: 'AED 589B',
      summary: 'Solid growth year with stabilization in residential and commercial sectors',
      highlights: [
        'Recovery post-pandemic',
        'Increasing expatriate inflow',
        'Commercial expansion in DIFC',
        'Affordable segment momentum',
        'New developer projects announced'
      ]
    },
    {
      year: '2022',
      growth: '+4.8%',
      transactions: '147.2K',
      investment: 'AED 512B',
      summary: 'Market stabilization with balanced buyer-investor activity',
      highlights: [
        'Steady recovery trend',
        'Commercial markets opening',
        'Visa incentives boost',
        'Affordable housing focus',
        'International investor confidence'
      ]
    },
    {
      year: '2021',
      growth: '+7.3%',
      transactions: '141.3K',
      investment: 'AED 468B',
      summary: 'Strong recovery from pandemic with vaccination drive and economic reopening',
      highlights: [
        'Exponential recovery',
        'Golden visa program launch',
        'Remote work culture impact',
        'Dubai real estate hub positioning',
        'International market interest'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Yearly Market <span className="text-emerald-600">Reports</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive annual market analysis, year-over-year comparisons, and strategic insights
          </p>
        </div>

        {/* Yearly Reports */}
        <div className="space-y-8 mb-16">
          {yearlyReports.map((report, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-6 border-b border-slate-200">
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">{report.year}</h2>
                    <p className="text-slate-600 font-medium">{report.summary}</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-emerald-600 font-semibold mb-1">GROWTH</p>
                    <p className="text-3xl font-bold text-emerald-700">{report.growth}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-blue-600 font-semibold mb-1">TRANSACTIONS</p>
                    <p className="text-2xl font-bold text-blue-700">{report.transactions}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-purple-600 font-semibold mb-1">INVESTMENT</p>
                    <p className="text-2xl font-bold text-purple-700">{report.investment}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Key Highlights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {report.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-emerald-600 font-bold text-lg flex-shrink-0">✓</span>
                      <p className="text-slate-700">{highlight}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <button className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                    Download Full Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Year-over-Year Comparison */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Year-over-Year Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-slate-900">Year</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-900">Growth Rate</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-900">Transactions</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-900">Investment Value</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-900">Market Trend</th>
                </tr>
              </thead>
              <tbody>
                {yearlyReports.map((report, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{report.year}</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">{report.growth}</td>
                    <td className="px-6 py-4 text-blue-600 font-bold">{report.transactions}</td>
                    <td className="px-6 py-4 text-purple-600 font-bold">{report.investment}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
                        parseFloat(report.growth) > 7 ? 'bg-emerald-100 text-emerald-700' :
                        parseFloat(report.growth) > 5 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {parseFloat(report.growth) > 7 ? 'Strong' : parseFloat(report.growth) > 5 ? 'Moderate' : 'Steady'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/trends/monthly-updates" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ChartBarIcon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <p className="font-bold text-slate-900">Monthly Updates</p>
            <p className="text-sm text-slate-600 mt-1">Latest monthly data</p>
          </Link>
          <Link href="/trends/quarterly-updates" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ChartBarIcon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <p className="font-bold text-slate-900">Quarterly Updates</p>
            <p className="text-sm text-slate-600 mt-1">3-month analysis</p>
          </Link>
          <Link href="/trends/market-insights" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ChartBarIcon className="w-8 h-8 mx-auto mb-3 text-emerald-600" />
            <p className="font-bold text-slate-900">Market Insights</p>
            <p className="text-sm text-slate-600 mt-1">Current overview</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
