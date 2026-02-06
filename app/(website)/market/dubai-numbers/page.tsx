'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  BuildingOffice2Icon,
  UsersIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  BriefcaseIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

interface StatCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  stats?: string;
}

const statCategories: StatCategory[] = [
  {
    id: 'property-price-index',
    title: 'Property Price Index',
    description: 'Track Dubai property price movements and market trends',
    icon: ChartBarIcon,
    href: '/market/prices-index',
    stats: '180K+ transactions',
  },
  {
    id: 'developers-delivery',
    title: 'Property Developers Delivery Record',
    description: 'Monitor property delivery rates and project completion timelines',
    icon: BuildingOffice2Icon,
    href: '/market/delivery-record',
    stats: '500+ projects',
  },
  {
    id: 'population',
    title: 'Population In Dubai, UAE',
    description: 'Explore Dubai population demographics and growth statistics',
    icon: UsersIcon,
    href: '/market/population',
    stats: '3.7M residents',
  },
  {
    id: 'supply-report',
    title: 'Property Supply Report',
    description: 'Analyze available properties and market supply dynamics',
    icon: TruckIcon,
    href: '/market/property-supply',
    stats: '1,400+ units/month',
  },
  {
    id: 'construction-progress',
    title: 'Construction Progress Report',
    description: 'View ongoing construction projects and development progress',
    icon: WrenchScrewdriverIcon,
    href: '/market/construction-progress',
    stats: '200+ active projects',
  },
  {
    id: 'tourism',
    title: 'Dubai Tourism',
    description: 'Understand Dubai tourism impact on real estate market',
    icon: SparklesIcon,
    href: '/market/tourism',
    stats: '15M+ visitors/year',
  },
  {
    id: 'businesses',
    title: 'Businesses In Dubai',
    description: 'Track business registration and commercial sector growth',
    icon: BriefcaseIcon,
    href: '/market/businesses',
    stats: '300K+ businesses',
  },
  {
    id: 'daily-transactions',
    title: 'Daily Transactions',
    description: 'Monitor real-time property transaction volumes and values',
    icon: BanknotesIcon,
    href: '/market/daily-transactions',
    stats: '500+ daily deals',
  },
  {
    id: 'gdp-growth',
    title: 'Dubai GDP Growth',
    description: 'Track Dubai economic performance and GDP expansion',
    icon: ArrowTrendingUpIcon,
    href: '/market/gdp-growth',
    stats: '4.5% annual growth',
  },
  {
    id: 'tallest-buildings',
    title: 'Tallest Buildings in Dubai',
    description: 'Explore Dubai\'s iconic skyscrapers and architectural landmarks',
    icon: BuildingLibraryIcon,
    href: '/market/tallest-buildings',
    stats: '100+ supertall',
  },
  {
    id: 'service-charges',
    title: 'Service Charges Dubai',
    description: 'Understand service charge structures and maintenance costs',
    icon: CheckCircleIcon,
    href: '/market/service-charges',
    stats: 'AED 6-15 per sqft',
  },
  {
    id: 'best-schools',
    title: 'Best Schools in Dubai',
    description: 'Discover top-rated schools and educational institutions',
    icon: AcademicCapIcon,
    href: '/market/best-schools',
    stats: '150+ schools',
  },
];

export default function DubaiNumbersPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative py-20 text-white"
        style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ChartBarIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Dubai In Numbers</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Comprehensive statistics and data about Dubai's real estate market, economy, and development
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div
            className="bg-white rounded-xl shadow-lg p-8"
            style={{ borderLeft: `4px solid ${goldColor}` }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Dubai's Key Metrics</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Dive deep into Dubai's real estate market with comprehensive data on property prices, supply, construction progress, and economic indicators. Use these insights to make informed investment decisions and understand market dynamics.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <a
                  key={category.id}
                  href={category.href}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group"
                  style={{ borderTop: `4px solid ${goldColor}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: lightGold }}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: goldColor }}
                      />
                    </div>
                    {category.stats && (
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: lightGold,
                          color: goldColor,
                        }}
                      >
                        {category.stats}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-xl font-bold mb-2 group-hover:underline transition-all"
                    style={{ color: goldColor }}
                  >
                    {category.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>

                  <div className="flex items-center" style={{ color: goldColor }}>
                    <span className="text-sm font-semibold">Explore Data</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Key Insights Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <ChartBarIcon className="w-8 h-8" style={{ color: goldColor }} />
            Market Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Growth */}
            <div
              className="bg-white rounded-xl shadow-lg p-8"
              style={{ borderTop: `4px solid ${goldColor}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Market Growth</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    35.5%
                  </p>
                </div>
                <ArrowTrendingUpIcon
                  className="w-12 h-12"
                  style={{ color: goldColor, opacity: 0.2 }}
                />
              </div>
              <p className="text-xs text-gray-500">Year-over-Year Growth</p>
            </div>

            {/* Supply */}
            <div
              className="bg-white rounded-xl shadow-lg p-8"
              style={{ borderTop: `4px solid ${goldColor}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Monthly Supply</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    1.4K+
                  </p>
                </div>
                <TruckIcon
                  className="w-12 h-12"
                  style={{ color: goldColor, opacity: 0.2 }}
                />
              </div>
              <p className="text-xs text-gray-500">New Units Delivered</p>
            </div>

            {/* Activity */}
            <div
              className="bg-white rounded-xl shadow-lg p-8"
              style={{ borderTop: `4px solid ${goldColor}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Daily Activity</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    500+
                  </p>
                </div>
                <BanknotesIcon
                  className="w-12 h-12"
                  style={{ color: goldColor, opacity: 0.2 }}
                />
              </div>
              <p className="text-xs text-gray-500">Transactions Per Day</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="bg-white rounded-xl shadow-lg p-12 text-center"
          style={{ borderTop: `4px solid ${goldColor}` }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need More Details?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Contact our market research team for customized reports, detailed analysis, and investment consultation tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: goldColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a88549')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = goldColor)}
            >
              Request Custom Report
            </button>
            <button
              className="font-bold py-3 px-8 rounded-lg transition-colors"
              style={{
                borderColor: goldColor,
                color: goldColor,
                borderWidth: '2px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = lightGold)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Contact Our Team
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
