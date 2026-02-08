'use client'

import Link from 'next/link'
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  BuildingOffice2Icon,
  UsersIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

export default function MarketDataPage() {
  const dataCategories = [
    {
      id: 'dubai-population',
      title: 'Dubai Population',
      description: 'Population growth trends, demographics, and expatriate distribution',
      icon: UsersIcon,
      stats: '3.7M+',
      growth: '+5.2% yearly'
    },
    {
      id: 'market-performance',
      title: 'Market Performance',
      description: 'Real estate market indicators, price trends, and sector analysis',
      icon: ArrowTrendingUpIcon,
      stats: '+9.8%',
      growth: 'Average appreciation'
    },
    {
      id: 'transactions-supply',
      title: 'Transactions & Supply',
      description: 'Sales volume, rental transactions, and inventory data',
      icon: ChartBarIcon,
      stats: '185.5K',
      growth: 'Transactions per year'
    },
    {
      id: 'monthly-updates',
      title: 'Monthly Market Updates',
      description: 'Monthly performance metrics, new launches, and trends',
      icon: CalendarIcon,
      stats: 'Updated',
      growth: 'Every month'
    },
    {
      id: 'quarterly-updates',
      title: 'Quarterly Market Updates',
      description: 'Quarterly deep dives into market performance and forecasts',
      icon: ChartBarIcon,
      stats: '4',
      growth: 'Per year'
    },
    {
      id: 'yearly-updates',
      title: 'Yearly Market Updates',
      description: 'Annual comprehensive market analysis and outlook',
      icon: ArrowTrendingUpIcon,
      stats: '2024',
      growth: 'Latest report'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Market <span className="text-emerald-600">Data</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive market data, statistics, and reports to understand Dubai's real estate landscape
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Population', value: '3.7M+' },
            { label: 'Properties Listed', value: '185K+' },
            { label: 'Market Growth', value: '+9.8%' },
            { label: 'Data Points', value: '10K+' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
              <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Data Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={`/trends/${category.id}`}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{category.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 font-semibold mb-1">KEY STAT</p>
                      <p className="text-lg font-bold text-emerald-600">{category.stats}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-semibold mb-1">METRIC</p>
                      <p className="text-sm text-slate-700">{category.growth}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                  View Data
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Data Sources */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Data Sources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Official Authorities</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Dubai Land Department (DLD)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Real Estate Regulatory Agency (RERA)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  UAE Statistics Center
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Dubai Municipality
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Market Research</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Knight Frank Analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  JLL Market Reports
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  CBRE Research
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Colliers International
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Export Data CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Export Market Data</h2>
          <p className="text-lg mb-8 opacity-90">
            Download comprehensive market reports, data sheets, and analysis in PDF or Excel format
          </p>
          <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-colors">
            Download Reports
          </button>
        </div>
      </div>
    </div>
  )
}
