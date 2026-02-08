'use client'

import { useState } from 'react'
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

export default function MarketInsightsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'areas'>('overview')

  const keyMetrics = [
    {
      label: 'Total Transactions (2024)',
      value: '185,500+',
      change: '+12.5%',
      icon: ChartBarIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Average Price Growth',
      value: '9.8%',
      change: '+2.3%',
      icon: ArrowTrendingUpIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'New Projects Launched',
      value: '156',
      change: '+18.2%',
      icon: BuildingOffice2Icon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Total Investment Value',
      value: 'AED 680B+',
      change: '+15.3%',
      icon: CurrencyDollarIcon,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ]

  const marketAreas = [
    {
      name: 'Downtown Dubai',
      avgPrice: 'AED 2.8M',
      growth: '+8.5%',
      trend: 'up',
      properties: '3,245',
      yield: '4.2%'
    },
    {
      name: 'Dubai Marina',
      avgPrice: 'AED 3.2M',
      growth: '+11.2%',
      trend: 'up',
      properties: '2,890',
      yield: '3.8%'
    },
    {
      name: 'Arabian Ranches',
      avgPrice: 'AED 2.1M',
      growth: '+12.8%',
      trend: 'up',
      properties: '4,100',
      yield: '4.5%'
    },
    {
      name: 'Emirates Living',
      avgPrice: 'AED 1.8M',
      growth: '+14.3%',
      trend: 'up',
      properties: '5,200',
      yield: '4.8%'
    },
    {
      name: 'Palm Jumeirah',
      avgPrice: 'AED 4.5M',
      growth: '+9.6%',
      trend: 'up',
      properties: '1,500',
      yield: '3.5%'
    },
    {
      name: 'Dubai Hills Estate',
      avgPrice: 'AED 2.6M',
      growth: '+10.4%',
      trend: 'up',
      properties: '3,100',
      yield: '4.3%'
    }
  ]

  const marketTrends = [
    {
      title: 'Residential Market Growth',
      description: 'The Dubai residential market continues its upward trajectory with sustained demand from both investors and end-users. New developments in emerging areas driving price appreciation.',
      impact: 'High',
      timeline: '2024-2025'
    },
    {
      title: 'Commercial Real Estate Expansion',
      description: 'Growing interest in commercial properties with new business districts emerging. Office space demand increasing post-pandemic recovery.',
      impact: 'Medium-High',
      timeline: '2024-2025'
    },
    {
      title: 'Luxury Segment Momentum',
      description: 'Ultra-premium properties showing strong performance with international investor confidence. Limited supply in luxury segment creating appreciation opportunities.',
      impact: 'High',
      timeline: '2024-2026'
    },
    {
      title: 'Rental Market Stability',
      description: 'Rental yields remain attractive with consistent demand. Average yields between 4-5% across major areas, attracting buy-to-let investors.',
      impact: 'Medium',
      timeline: '2024-2025'
    },
    {
      title: 'Investment in Emerging Areas',
      description: 'New areas like Ras Al Khor, Jumeirah Village Circle seeing increased investor interest with better price points and development opportunities.',
      impact: 'High',
      timeline: '2024-2026'
    },
    {
      title: 'Sustainability Focus',
      description: 'Green building and sustainable developments becoming investment priority. Projects with LEED/Estidama certifications commanding premium valuations.',
      impact: 'Medium-High',
      timeline: '2024-2027'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Market <span className="text-emerald-600">Insights</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive analysis of Dubai's real estate market with data-driven insights to guide your investment decisions
          </p>
        </div>

        {/* Key Metrics */}
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
                <p className="text-sm text-emerald-600 font-semibold">{metric.change} YoY</p>
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
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'overview' && 'Market Overview'}
              {tab === 'performance' && 'Performance Metrics'}
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
                    trend.impact === 'High' ? 'bg-emerald-100 text-emerald-700' :
                    trend.impact === 'Medium-High' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {trend.impact} Impact
                  </span>
                </div>
                <p className="text-slate-600 mb-4">{trend.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-sm font-medium text-slate-600">{trend.timeline}</span>
                  <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Price Appreciation</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Residential</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="font-bold text-slate-900">+9.8%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Commercial</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
                      </div>
                      <span className="font-bold text-slate-900">+7.2%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Luxury</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <span className="font-bold text-slate-900">+11.2%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Rental Yields</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Studio/1-BR</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="font-bold text-slate-900">4.8%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">2-3 BR</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-600 h-2 rounded-full" style={{width: '72%'}}></div>
                      </div>
                      <span className="font-bold text-slate-900">4.2%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">4+ BR/Villa</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-600 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <span className="font-bold text-slate-900">3.8%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Market Activity</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Sales Transactions</p>
                    <p className="text-2xl font-bold text-slate-900">185.5K</p>
                    <p className="text-xs text-emerald-600">+12.5% vs last year</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Rental Transactions</p>
                    <p className="text-2xl font-bold text-slate-900">245.3K</p>
                    <p className="text-xs text-emerald-600">+8.3% vs last year</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Market Volume</p>
                    <p className="text-2xl font-bold text-slate-900">AED 680B</p>
                    <p className="text-xs text-emerald-600">+15.3% vs last year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'areas' && (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {marketAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{area.name}</h3>
                    <p className="text-sm text-slate-600">{area.properties} Properties</p>
                  </div>
                  <span className="text-emerald-600 font-bold text-lg">{area.growth}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Avg Price</p>
                    <p className="text-lg font-bold text-slate-900">{area.avgPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Rental Yield</p>
                    <p className="text-lg font-bold text-slate-900">{area.yield}</p>
                  </div>
                </div>

                <Link
                  href={`/trends/investment-analysis?area=${area.name.toLowerCase().replace(/\s/g, '-')}`}
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  View Details
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
          <p className="text-lg mb-8 opacity-90">
            Explore our complete investment analysis tools and find the perfect property for your portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trends/investment-analysis"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
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
