'use client'

import Link from 'next/link'
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  CalculatorIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function TrendsPage() {
  const categories = [
    {
      id: 'market-insights',
      title: 'Market Insights',
      description: 'Comprehensive market overview and key performance indicators',
      icon: ChartBarIcon,
      color: 'from-emerald-600 to-emerald-700',
      href: '/trends/market-insights'
    },
    {
      id: 'investment-analysis',
      title: 'Investment Analysis',
      description: 'Investment strategies, best areas, and detailed analysis',
      icon: ArrowTrendingUpIcon,
      color: 'from-blue-600 to-blue-700',
      href: '/trends/investment-analysis'
    },
    {
      id: 'top-areas',
      title: 'Top Investment Areas',
      description: 'Ranked areas by growth potential, yield, and ROI',
      icon: MapPinIcon,
      color: 'from-purple-600 to-purple-700',
      href: '/trends/top-investment-areas'
    },
    {
      id: 'calculator',
      title: 'ROI Calculator',
      description: 'Calculate returns, mortgages, and investment projections',
      icon: CalculatorIcon,
      color: 'from-amber-600 to-amber-700',
      href: '/trends/calculator'
    },
    {
      id: 'projects',
      title: 'Dubai Projects Map',
      description: 'Major development projects with investment opportunities',
      icon: BuildingOffice2Icon,
      color: 'from-cyan-600 to-cyan-700',
      href: '/trends/dubai-projects-map'
    },
    {
      id: 'new-dev',
      title: 'New Developments',
      description: 'Latest launches with pre-launch discounts and offers',
      icon: SparklesIcon,
      color: 'from-pink-600 to-pink-700',
      href: '/trends/new-developments'
    },
    {
      id: 'market-data',
      title: 'Market Data',
      description: 'Population, performance, transactions, and supply data',
      icon: DocumentTextIcon,
      color: 'from-indigo-600 to-indigo-700',
      href: '/trends/market-data'
    },
    {
      id: 'tools',
      title: 'Investment Tools',
      description: 'Comparison tools, area finder, and guides',
      icon: CalculatorIcon,
      color: 'from-red-600 to-red-700',
      href: '/trends/tools'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Market <span className="text-emerald-600">Trends & Analysis</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Stay informed with Dubai's latest real estate trends, market insights, investment opportunities, and comprehensive data analysis. Make smarter investment decisions with our complete market intelligence platform.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-emerald-600 mb-1">+9.8%</p>
            <p className="text-sm text-slate-700">Market Growth 2024</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600 mb-1">185.5K</p>
            <p className="text-sm text-slate-700">Annual Transactions</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-purple-600 mb-1">AED 680B</p>
            <p className="text-sm text-slate-700">Market Volume</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-amber-600 mb-1">4.2%</p>
            <p className="text-sm text-slate-700">Avg Rental Yield</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${cat.color} h-16 flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-slate-600">{cat.description}</p>

                  <div className="mt-4 text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                    Explore
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Featured Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Content</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Investment Strategies */}
            <Link href="/trends/investment-analysis" className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
              <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <ArrowTrendingUpIcon className="w-16 h-16 text-blue-600 opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  Investment Strategies for 2024-2025
                </h3>
                <p className="text-slate-600 mb-4">
                  Explore proven investment strategies including buy-and-hold, buy-to-let, and fix-and-flip approaches. Analyze best-performing areas and expected returns.
                </p>
                <div className="text-sm font-semibold text-emerald-600">Read Article →</div>
              </div>
            </Link>

            {/* Market Performance */}
            <Link href="/trends/market-performance" className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
              <div className="h-40 bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <ChartBarIcon className="w-16 h-16 text-emerald-600 opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  Dubai Market Performance Trends
                </h3>
                <p className="text-slate-600 mb-4">
                  Detailed analysis of market performance across residential, commercial, and luxury segments. Price trends, growth rates, and market outlook.
                </p>
                <div className="text-sm font-semibold text-emerald-600">Read Article →</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Use our comprehensive tools and market insights to identify the right investment opportunities in Dubai's real estate market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trends/calculator"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
            >
              Calculate ROI
            </Link>
            <Link
              href="/trends/top-investment-areas"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore Top Areas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
