'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  MapPinIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

interface TopArea {
  rank: number;
  name: string;
  transactions: number;
  propertyType: string[];
  category: string[];
}

const topAreasData: TopArea[] = [
  {
    rank: 1,
    name: 'Jumeirah Village Circle (JVC)',
    transactions: 18000,
    propertyType: ['Apartment', 'Villa'],
    category: ['Ready', 'Offplan'],
  },
  {
    rank: 2,
    name: 'Business Bay',
    transactions: 12000,
    propertyType: ['Apartment', 'Commercial'],
    category: ['Ready'],
  },
  {
    rank: 3,
    name: 'Wadi Al Safa 5',
    transactions: 9000,
    propertyType: ['Villa', 'Plot'],
    category: ['Ready', 'Offplan'],
  },
  {
    rank: 4,
    name: 'Marsa Dubai',
    transactions: 8000,
    propertyType: ['Apartment', 'Villa'],
    category: ['Ready'],
  },
  {
    rank: 5,
    name: 'Dubai South',
    transactions: 8000,
    propertyType: ['Apartment', 'Plot'],
    category: ['Offplan'],
  },
];

export default function PerformancePage() {
  const [propertyFilter, setPropertyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredAreas = topAreasData.filter(area => {
    const matchesProperty = propertyFilter === 'All' || area.propertyType.includes(propertyFilter);
    const matchesCategory = categoryFilter === 'All' || area.category.includes(categoryFilter);
    return matchesProperty && matchesCategory;
  });

  const maxTransactions = Math.max(...topAreasData.map(a => a.transactions));

  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ChartBarIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Market Performance 2024</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Analyze Dubai's property market performance in 2024. Discover trends, top-performing areas, and market insights that shaped the year's real estate landscape.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ArrowTrendingUpIcon className="w-8 h-8" style={{ color: goldColor }} />
            Dubai Property Market Performance 2024
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              In 2024, the Dubai property market has experienced a remarkable surge, setting new records in both property transactions and values. This growth is driven by strong demand from both local and international investors, with residential property prices rising significantly.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Villas and apartments saw substantial increases in prices, reflecting Dubai's appeal as a prime real estate destination. The off-plan market continues to thrive, contributing to more than half of all transactions as investors seek out new and promising developments.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              This upward trend highlights Dubai's continued status as one of the world's most dynamic and attractive real estate hubs, offering lucrative opportunities for investors and homebuyers alike.
            </p>
          </div>
        </section>

        {/* Top 5 Areas Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <MapPinIcon className="w-8 h-8" style={{ color: goldColor }} />
            Top 5 Performing Areas 2024
          </h2>
          <p className="text-gray-600 mb-8 text-lg">Find where people are buying properties in Dubai.</p>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Property Type Filter */}
            <div className="bg-white rounded-xl shadow-md p-6" style={{ borderTop: `4px solid ${goldColor}` }}>
              <label className="block text-sm font-bold text-gray-900 mb-4">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Apartment', 'Villa', 'Plot', 'Commercial'].map(type => (
                  <button
                    key={type}
                    onClick={() => setPropertyFilter(type)}
                    style={{
                      backgroundColor: propertyFilter === type ? goldColor : '#f3f4f6',
                      color: propertyFilter === type ? 'white' : '#374151',
                    }}
                    className="px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-xl shadow-md p-6" style={{ borderTop: `4px solid ${goldColor}` }}>
              <label className="block text-sm font-bold text-gray-900 mb-4">Category</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Ready', 'Offplan'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    style={{
                      backgroundColor: categoryFilter === cat ? goldColor : '#f3f4f6',
                      color: categoryFilter === cat ? 'white' : '#374151',
                    }}
                    className="px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Areas Chart */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12" style={{ borderTop: `4px solid ${goldColor}` }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Transaction Volume by Area</h3>
            <div className="space-y-6">
              {filteredAreas.length > 0 ? (
                filteredAreas.map(area => (
                  <div key={area.rank} className="flex items-end gap-4">
                    <div className="w-32">
                      <p className="text-sm font-bold text-gray-600 mb-2">#{area.rank}</p>
                      <p className="text-lg font-bold text-gray-900">{area.name}</p>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-lg h-12 overflow-hidden">
                        <div
                          className="h-full rounded-lg flex items-center justify-end pr-4 transition-all"
                          style={{
                            width: `${(area.transactions / maxTransactions) * 100}%`,
                            background: `linear-gradient(to right, ${goldColor}, #d4b896)`,
                          }}
                        >
                          <span className="text-white font-bold text-sm">{area.transactions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No areas match your filters. Try adjusting your selection.</p>
                </div>
              )}
            </div>
          </div>

          {/* Areas Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredAreas.map(area => (
              <div
                key={area.rank}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-lg"
                    style={{ backgroundColor: goldColor }}
                  >
                    {area.rank}
                  </div>
                  <span className="text-2xl font-bold" style={{ color: goldColor }}>
                    {(area.transactions / 1000).toFixed(0)}K
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{area.name}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Types</p>
                    <div className="flex flex-wrap gap-1">
                      {area.propertyType.map(type => (
                        <span
                          key={type}
                          className="text-[10px] px-2 py-1 rounded font-medium"
                          style={{ backgroundColor: lightGold, color: '#78350f' }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Category</p>
                    <div className="flex flex-wrap gap-1">
                      {area.category.map(cat => (
                        <span
                          key={cat}
                          className="text-[10px] px-2 py-1 rounded font-medium"
                          style={{ backgroundColor: lightGold, color: '#78350f' }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Insights */}
        <section
          className="mt-20 rounded-xl p-8"
          style={{ background: `linear-gradient(to right, ${lightGold}, #faf8f5)`, borderLeft: `4px solid ${goldColor}` }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HomeIcon className="w-8 h-8" style={{ color: goldColor }} />
            Key Market Insights 2024
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                📈 Record Growth
              </h3>
              <p className="text-gray-700">
                2024 saw unprecedented transaction volumes and property valuations reaching all-time highs across Dubai.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                🏢 Off-Plan Boom
              </h3>
              <p className="text-gray-700">
                Off-plan properties contributed to over 50% of all transactions, driven by attractive payment plans and investor confidence.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                🌍 Global Demand
              </h3>
              <p className="text-gray-700">
                Strong demand from international investors bolstered market growth, with properties attracting buyers from 100+ countries.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Investment Opportunities</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Ready to invest in Dubai's booming real estate market? Connect with our expert agents who can guide you to the best opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: goldColor }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
            >
              View All Properties
            </button>
            <button
              className="font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ borderColor: goldColor, color: goldColor, borderWidth: '2px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = lightGold)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Contact an Agent
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
