'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  HomeIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function InvestmentAnalysisPage() {
  const [activeStrategy, setActiveStrategy] = useState<'buy-hold' | 'rental' | 'flipping'>('buy-hold')

  const investmentStrategies = [
    {
      id: 'buy-hold',
      title: 'Buy & Hold',
      description: 'Long-term property investment for appreciation and wealth building',
      icon: HomeIcon,
      advantages: [
        'Average 8-12% annual appreciation',
        'Tax benefits and deductions',
        'Leverage with mortgage financing',
        'Inflation hedge',
        'Passive long-term wealth building'
      ],
      targetAreas: ['Dubai Marina', 'Downtown Dubai', 'Arabian Ranches'],
      expectedReturn: '8-12% p.a.',
      timeline: '5-10+ years',
      riskLevel: 'Low-Medium'
    },
    {
      id: 'rental',
      title: 'Buy to Let',
      description: 'Generate monthly rental income while building equity',
      icon: BuildingOffice2Icon,
      advantages: [
        'Monthly rental income 4-5% yield',
        'Loan payments covered by rent',
        'Property appreciation on top',
        'Tax deductions on expenses',
        'Diversified portfolio income'
      ],
      targetAreas: ['Emirates Living', 'Jumeirah Village Circle', 'Dubai Sports City'],
      expectedReturn: '4-5% yield + appreciation',
      timeline: '3-7 years',
      riskLevel: 'Medium'
    },
    {
      id: 'flipping',
      title: 'Fix & Flip',
      description: 'Short-term investment with quick returns through renovation',
      icon: SparklesIcon,
      advantages: [
        'Quick turnaround (6-18 months)',
        'Target 15-25% profit margins',
        'Active income generation',
        'Market opportunity timing',
        'Renovation value addition'
      ],
      targetAreas: ['Business Bay', 'Dubai Hills Estate', 'JVC'],
      expectedReturn: '15-25% profit',
      timeline: '6-18 months',
      riskLevel: 'Medium-High'
    }
  ]

  const bestAreas = [
    {
      name: 'Downtown Dubai',
      avgPrice: 'AED 2.8M',
      growth: '+8.5%',
      yield: '4.2%',
      highlights: ['Premium location', 'High demand', 'Stable market'],
      pros: ['Commercial hub', 'High rental demand', 'Prime location'],
      cons: ['Higher entry price', 'Competitive market']
    },
    {
      name: 'Dubai Marina',
      avgPrice: 'AED 3.2M',
      growth: '+11.2%',
      yield: '3.8%',
      highlights: ['Waterfront living', 'Lifestyle hub', 'Strong appreciation'],
      pros: ['International appeal', 'Amenities', 'Tourist area rental potential'],
      cons: ['High prices', 'Crowded market']
    },
    {
      name: 'Arabian Ranches',
      avgPrice: 'AED 2.1M',
      growth: '+12.8%',
      yield: '4.5%',
      highlights: ['Family community', 'Emerging growth', 'Value play'],
      pros: ['Community amenities', 'Strong growth', 'Family-friendly'],
      cons: ['Master-planned development', 'HOA fees']
    },
    {
      name: 'Emirates Living',
      avgPrice: 'AED 1.8M',
      growth: '+14.3%',
      yield: '4.8%',
      highlights: ['Affordable entry', 'Highest yield', 'Best value'],
      pros: ['Budget-friendly', 'Best rental yield', 'Emerging area'],
      cons: ['Newer development', 'Less established']
    },
    {
      name: 'Jumeirah Village Circle',
      avgPrice: 'AED 1.2M',
      growth: '+16.5%',
      yield: '5.2%',
      highlights: ['Lowest entry price', 'Fastest growth', 'Student market'],
      pros: ['Ultra-affordable', 'Student tenants', 'Rapid appreciation'],
      cons: ['Longer commute', 'Emerging infrastructure']
    },
    {
      name: 'Dubai Hills Estate',
      avgPrice: 'AED 2.6M',
      growth: '+10.4%',
      yield: '4.3%',
      highlights: ['Premium villas', 'Gated community', 'Lifestyle choice'],
      pros: ['Luxury homes', 'Community facilities', 'Golf courses'],
      cons: ['Higher prices', 'Limited inventory']
    }
  ]

  const investmentChecklist = [
    'Set clear investment goals (appreciation vs income)',
    'Determine budget and financing options',
    'Research target areas and market trends',
    'Analyze comparable properties and pricing',
    'Calculate expected ROI and rental yield',
    'Verify property legal documentation',
    'Inspect property condition thoroughly',
    'Understand maintenance and HOA costs',
    'Plan exit strategy or hold period',
    'Consult legal and tax professionals'
  ]

  const currentStrategy = investmentStrategies.find(s => s.id === activeStrategy)!

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Investment <span className="text-emerald-600">Analysis</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Expert guidance on investment strategies, best performing areas, and ROI calculations to maximize your property investment
          </p>
        </div>

        {/* Investment Strategies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Investment Strategies</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {investmentStrategies.map((strategy) => {
              const Icon = strategy.icon
              return (
                <button
                  key={strategy.id}
                  onClick={() => setActiveStrategy(strategy.id as any)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    activeStrategy === strategy.id
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-slate-200 bg-white hover:border-emerald-600'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${activeStrategy === strategy.id ? 'text-emerald-600' : 'text-slate-600'}`} />
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{strategy.title}</h3>
                  <p className="text-sm text-slate-600">{strategy.description}</p>
                </button>
              )
            })}
          </div>

          {/* Strategy Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Advantages</h3>
              <div className="space-y-4">
                {currentStrategy.advantages.map((adv, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircleIcon className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">{adv}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="font-semibold text-slate-600 text-sm mb-2">EXPECTED RETURN</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-4">{currentStrategy.expectedReturn}</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-slate-600">Investment Horizon</span>
                    <span className="font-bold text-slate-900">{currentStrategy.timeline}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-slate-600">Risk Level</span>
                    <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                      currentStrategy.riskLevel.includes('Low') ? 'bg-emerald-100 text-emerald-700' :
                      currentStrategy.riskLevel.includes('High') ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {currentStrategy.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="font-semibold text-slate-600 text-sm mb-4">RECOMMENDED AREAS</h3>
                <div className="space-y-2">
                  {currentStrategy.targetAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                      <span className="text-slate-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Investment Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Best Investment Areas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{area.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-slate-900">{area.avgPrice}</span>
                    <span className="text-emerald-600 font-semibold text-sm">{area.growth}</span>
                  </div>
                  <p className="text-slate-600 text-sm">Rental Yield: <span className="font-bold text-slate-900">{area.yield}</span></p>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {area.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-2">PROS</p>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {area.pros.map((p, i) => (
                        <li key={i} className="flex gap-1">
                          <span>✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-2">CONS</p>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {area.cons.map((c, i) => (
                        <li key={i} className="flex gap-1">
                          <span>•</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/properties?area=${area.name.toLowerCase().replace(/\s/g, '-')}`}
                  className="block w-full text-center px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                >
                  View Properties
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Checklist */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Investment Checklist</h2>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              {investmentChecklist.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100">
                      <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Calculator CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Calculate Your Investment Returns</h2>
          <p className="text-lg mb-8 opacity-90">
            Use our advanced ROI calculator to project your investment returns based on purchase price, rental income, and market appreciation
          </p>
          <Link
            href="/trends/calculator"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Open ROI Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}
