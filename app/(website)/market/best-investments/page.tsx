'use client';

import { useState } from 'react';
import {
  MapPinIcon,
  ArrowTrendingUpIcon,
  HomeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface InvestmentArea {
  id: string;
  name: string;
  title: string;
  description: string;
  avgPrice: string;
  yoyGrowth: string;
  properties: number;
  icon: React.ComponentType<any>;
  href: string;
}

const investmentAreas: InvestmentArea[] = [
  {
    id: 'jumeirah-bay',
    name: 'Jumeirah Bay',
    title: 'Ultra-Luxury Beachfront Living',
    description: 'Exclusive island development with limited supply and high appreciation potential',
    avgPrice: 'AED 60M+',
    yoyGrowth: '+14.2%',
    properties: 45,
    icon: SparklesIcon,
    href: '/market/best-investments/jumeirah-bay',
  },
  {
    id: 'marsa-dubai',
    name: 'Marsa Dubai',
    title: 'Waterfront Mixed-Use Development',
    description: 'Premium waterfront destination with retail, residential, and hospitality mix',
    avgPrice: 'AED 15M-35M',
    yoyGrowth: '+12.8%',
    properties: 250,
    icon: MapPinIcon,
    href: '/market/best-investments/marsa-dubai',
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    title: 'Heart of Dubai\'s Luxury Market',
    description: 'Iconic location with world-class amenities and strong rental yields',
    avgPrice: 'AED 2.5M-8M',
    yoyGrowth: '+8.5%',
    properties: 1200,
    icon: HomeIcon,
    href: '/market/best-investments/downtown-dubai',
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    title: 'Commercial & Residential Hub',
    description: 'Balanced investment area with strong ROI and diverse property types',
    avgPrice: 'AED 1.8M-5M',
    yoyGrowth: '+9.2%',
    properties: 800,
    icon: ArrowTrendingUpIcon,
    href: '/market/best-investments/business-bay',
  },
  {
    id: 'jumeirah',
    name: 'Jumeirah',
    title: 'Beachfront Prestige',
    description: 'Established luxury neighborhood with consistent appreciation and strong demand',
    avgPrice: 'AED 8M-25M',
    yoyGrowth: '+10.5%',
    properties: 600,
    icon: SparklesIcon,
    href: '/market/best-investments/jumeirah',
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    title: 'Iconic Palm-Shaped Development',
    description: 'Unique island destination combining luxury living with strong investment appeal',
    avgPrice: 'AED 12M-40M',
    yoyGrowth: '+11.3%',
    properties: 380,
    icon: HomeIcon,
    href: '/market/best-investments/palm-jumeirah',
  },
  {
    id: 'palm-jebel-ali',
    name: 'Palm Jebel Ali',
    title: 'Emerging Luxury Destination',
    description: 'New master-planned community with high growth potential and modern amenities',
    avgPrice: 'AED 8M-30M',
    yoyGrowth: '+15.7%',
    properties: 520,
    icon: ArrowTrendingUpIcon,
    href: '/market/best-investments/palm-jebel-ali',
  },
  {
    id: 'dubai-creek',
    name: 'Dubai Creek',
    title: 'Mixed-Use Innovation Hub',
    description: 'Future-focused development with residential, commercial, and cultural spaces',
    avgPrice: 'AED 2M-6M',
    yoyGrowth: '+13.4%',
    properties: 900,
    icon: MapPinIcon,
    href: '/market/best-investments/dubai-creek',
  },
];

export default function BestInvestmentsPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Best Property Investments In Dubai</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Best Investment Projects by Area in Dubai
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data-Driven Investment Insights</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Explore the top-performing property investment areas in Dubai using our data-driven insights. Track market trends, compare historical property prices, and find the best locations to grow your investment. Whether you're a first-time buyer or a seasoned investor, our real-time data equips you with the confidence to make informed decisions.
            </p>
          </div>
        </section>

        {/* Investment Areas Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Investment Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {investmentAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <a
                  key={area.id}
                  href={area.href}
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
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: lightGold,
                        color: goldColor,
                      }}
                    >
                      {area.properties} properties
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-2 group-hover:underline transition-all"
                    style={{ color: goldColor }}
                  >
                    {area.name}
                  </h3>

                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    {area.title}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t" style={{ borderColor: lightGold }}>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Avg Price</p>
                      <p className="text-lg font-bold" style={{ color: goldColor }}>
                        {area.avgPrice}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">YoY Growth</p>
                      <p className="text-lg font-bold" style={{ color: goldColor }}>
                        {area.yoyGrowth}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center" style={{ color: goldColor }}>
                    <span className="text-sm font-semibold">View Top Investments</span>
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

        {/* Market Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Properties</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>5.2K+</p>
                </div>
                <HomeIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Across all areas</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg YoY Growth</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>+11.8%</p>
                </div>
                <ArrowTrendingUpIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Investment return</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Price Range</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 1.8M-60M</p>
                </div>
                <MapPinIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Across all properties</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Investment Types</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>8</p>
                </div>
                <SparklesIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Prime investment areas</p>
            </div>
          </div>
        </section>

        {/* Investment Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Investment Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Capital Appreciation',
                description: 'Focus on emerging areas with strong growth potential and limited supply',
              },
              {
                title: 'Rental Yields',
                description: 'Target established areas with high demand for rentals and family appeal',
              },
              {
                title: 'Mixed Portfolio',
                description: 'Diversify across multiple areas to balance growth and income',
              },
            ].map((strategy, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{strategy.title}</h3>
                <p className="text-gray-600">{strategy.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Invest?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Explore detailed property listings, market analysis, and investment opportunities in Dubai's top areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: goldColor }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
            >
              Browse All Properties
            </button>
            <button
              className="font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ borderColor: goldColor, color: goldColor, borderWidth: '2px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = lightGold)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Schedule Consultation
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
