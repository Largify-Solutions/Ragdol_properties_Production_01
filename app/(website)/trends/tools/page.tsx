'use client'

import Link from 'next/link'
import {
  CalculatorIcon,
  ChartBarIcon,
  MapPinIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function ToolsPage() {
  const tools = [
    {
      id: 'calculator',
      name: 'ROI Calculator',
      icon: CalculatorIcon,
      description: 'Calculate investment returns, mortgage payments, rental yields, and property appreciation projections',
      features: [
        'Mortgage calculation',
        'Rental yield analysis',
        '5-year projections',
        'Tax estimations',
        'Comparison tools'
      ],
      color: 'from-amber-600 to-amber-700',
      href: '/trends/calculator'
    },
    {
      id: 'comparison',
      name: 'Property Comparison',
      icon: ChartBarIcon,
      description: 'Compare multiple properties side-by-side based on price, location, amenities, and investment potential',
      features: [
        'Side-by-side comparison',
        'Price analysis',
        'ROI comparison',
        'Export reports',
        'Save favorites'
      ],
      color: 'from-blue-600 to-blue-700',
      href: '/properties?compare=true'
    },
    {
      id: 'area-finder',
      name: 'Area Finder',
      icon: MapPinIcon,
      description: 'Discover the best investment areas based on your criteria: growth potential, yield, or budget',
      features: [
        'Filter by growth rate',
        'Filter by rental yield',
        'Budget-based search',
        'Market sentiment',
        'Demographics data'
      ],
      color: 'from-emerald-600 to-emerald-700',
      href: '/trends/top-investment-areas'
    },
    {
      id: 'market-report',
      name: 'Market Reports',
      icon: DocumentTextIcon,
      description: 'Access comprehensive market reports covering monthly, quarterly, and yearly analysis',
      features: [
        'Monthly updates',
        'Quarterly analysis',
        'Yearly reports',
        'PDF download',
        'Email subscription'
      ],
      color: 'from-purple-600 to-purple-700',
      href: '/trends/market-data'
    },
    {
      id: 'price-checker',
      name: 'Price Checker',
      icon: ChartBarIcon,
      description: 'Check current property prices, historical trends, and market valuation for any area in Dubai',
      features: [
        'Current prices',
        'Price history',
        'Market trends',
        'Comparison data',
        'Valuation estimates'
      ],
      color: 'from-red-600 to-red-700',
      href: '/market/prices-2024'
    },
    {
      id: 'investment-guide',
      name: 'Investment Guide',
      icon: CheckCircleIcon,
      description: 'Complete guide to real estate investment in Dubai with strategies, tips, and best practices',
      features: [
        'Investment strategies',
        'Risk assessment',
        'Legal requirements',
        'Financing options',
        'FAQs & support'
      ],
      color: 'from-cyan-600 to-cyan-700',
      href: '/trends/investment-analysis'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Investment <span className="text-emerald-600">Tools</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Powerful tools and resources to help you make informed real estate investment decisions in Dubai
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${tool.color} h-24 flex items-center justify-center`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">{tool.description}</p>

                  <div className="space-y-2 mb-6">
                    {tool.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-sm group-hover:shadow-md">
                    Open Tool
                  </button>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Quick Guides & Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'First-Time Buyer Guide',
                description: 'Essential information for first-time property investors in Dubai',
                icon: '📖'
              },
              {
                title: 'Investment Checklisti',
                description: 'Step-by-step checklist to ensure you don\'t miss any critical details',
                icon: '✓'
              },
              {
                title: 'Legal & Tax Guide',
                description: 'Understand legal requirements and tax implications of real estate investment',
                icon: '⚖️'
              },
              {
                title: 'Financing 101',
                description: 'Guide to mortgages, loans, and financing options in Dubai',
                icon: '💰'
              },
              {
                title: 'Area Profiles',
                description: 'Detailed profiles of Dubai\'s top investment areas',
                icon: '📍'
              },
              {
                title: 'Market Glossary',
                description: 'Common real estate terms and definitions explained',
                icon: '📚'
              }
            ].map((guide, idx) => (
              <Link
                key={idx}
                href="#"
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{guide.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{guide.title}</h3>
                <p className="text-sm text-slate-600">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Expert Support */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need Expert Help?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our team of investment consultants is ready to provide personalized guidance for your real estate investment journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+971123456789"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
