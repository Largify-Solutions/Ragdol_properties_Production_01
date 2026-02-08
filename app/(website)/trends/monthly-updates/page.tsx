'use client'

import Link from 'next/link'
import { CalendarIcon, ArrowTrendingUpIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function MonthlyUpdatesPage() {
  const monthlyReports = [
    {
      month: 'December 2024',
      growth: '+12.3%',
      transactions: '22900',
      avgPrice: 'AED 4,125/sqft',
      highlights: ['Year-end surge', 'Investor activity', 'Luxury segment strong'],
      report: '/reports/december-2024.pdf'
    },
    {
      month: 'November 2024',
      growth: '+9.8%',
      transactions: '21800',
      avgPrice: 'AED 4,050/sqft',
      highlights: ['Pre-holiday buying', 'Commercial growth', 'JVC momentum'],
      report: '/reports/november-2024.pdf'
    },
    {
      month: 'October 2024',
      growth: '+8.5%',
      transactions: '20300',
      avgPrice: 'AED 4,000/sqft',
      highlights: ['Market stabilization', 'Rental demand', 'New launches'],
      report: '/reports/october-2024.pdf'
    },
    {
      month: 'September 2024',
      growth: '+7.2%',
      transactions: '19100',
      avgPrice: 'AED 3,920/sqft',
      highlights: ['Back-to-school', 'Investor interest', 'Supply increase'],
      report: '/reports/september-2024.pdf'
    },
    {
      month: 'August 2024',
      growth: '+6.8%',
      transactions: '17200',
      avgPrice: 'AED 3,850/sqft',
      highlights: ['Summer slowdown', 'Discounts offered', 'Expatriate rentals'],
      report: '/reports/august-2024.pdf'
    },
    {
      month: 'July 2024',
      growth: '+5.9%',
      transactions: '15800',
      avgPrice: 'AED 3,800/sqft',
      highlights: ['Summer peak', 'Tourism impact', 'Affordable segment'],
      report: '/reports/july-2024.pdf'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Monthly Market <span className="text-emerald-600">Updates</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Latest monthly market reports, transaction data, and market trends for Dubai real estate
          </p>
        </div>

        {/* Monthly Reports Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {monthlyReports.map((report, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{report.month}</h3>
                  <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                    <CalendarIcon className="w-4 h-4" /> Monthly Report
                  </p>
                </div>
                <span className="text-3xl font-bold text-emerald-600">{report.growth}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200">
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">TRANSACTIONS</p>
                  <p className="text-lg font-bold text-slate-900">{report.transactions}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">AVG PRICE</p>
                  <p className="text-lg font-bold text-slate-900">{report.avgPrice}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-slate-600 font-semibold mb-2">KEY HIGHLIGHTS</p>
                <div className="flex flex-wrap gap-2">
                  {report.highlights.map((h, i) => (
                    <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={report.report}
                className="block w-full text-center px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-sm"
              >
                Download Report
              </a>
            </div>
          ))}
        </div>

        {/* Related Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/trends/quarterly-updates" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ChartBarIcon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <p className="font-bold text-slate-900">Quarterly Updates</p>
            <p className="text-sm text-slate-600 mt-1">In-depth quarterly analysis</p>
          </Link>
          <Link href="/trends/yearly-updates" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ArrowTrendingUpIcon className="w-8 h-8 mx-auto mb-3 text-amber-600" />
            <p className="font-bold text-slate-900">Yearly Reports</p>
            <p className="text-sm text-slate-600 mt-1">Annual comprehensive reports</p>
          </Link>
          <Link href="/trends/market-insights" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ChartBarIcon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <p className="font-bold text-slate-900">Market Insights</p>
            <p className="text-sm text-slate-600 mt-1">Current market overview</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
