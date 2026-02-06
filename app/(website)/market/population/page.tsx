'use client';

import { useState } from 'react';
import {
  UsersIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

interface PopulationData {
  category: string;
  value: string;
  percentage: string;
}

const populationBreakdown: PopulationData[] = [
  { category: 'Total Population', value: '3.7M', percentage: '100%' },
  { category: 'Emirati Citizens', value: '980K', percentage: '26.5%' },
  { category: 'Expatriates', value: '2.72M', percentage: '73.5%' },
  { category: 'Indian Nationals', value: '1.2M', percentage: '32.4%' },
  { category: 'Pakistani Nationals', value: '450K', percentage: '12.2%' },
  { category: 'Filipino Nationals', value: '380K', percentage: '10.3%' },
  { category: 'Bangladeshi Nationals', value: '280K', percentage: '7.6%' },
  { category: 'Other Nationalities', value: '400K', percentage: '10.8%' },
  { category: 'Working Age (25-54)', value: '2.1M', percentage: '56.8%' },
  { category: 'Families with Children', value: '1.85M', percentage: '50%' },
];

const householdData = [
  { type: 'Studio Apartments', percentage: 18, population: '665K' },
  { type: '1-Bedroom', percentage: 25, population: '925K' },
  { type: '2-Bedroom', percentage: 28, population: '1.04M' },
  { type: '3+ Bedroom', percentage: 29, population: '1.07M' },
];

export default function PopulationPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <UsersIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Population In Dubai, UAE</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Comprehensive population demographics, growth statistics, and household composition
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dubai's Diverse Population</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Explore Dubai's population demographics and growth statistics. With a diverse expatriate population and continuous migration patterns, Dubai remains one of the world's most cosmopolitan cities. Understanding demographic trends helps in real estate market analysis and investment decisions.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Population</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>3.7M</p>
                </div>
                <UsersIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">As of 2024</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Annual Growth</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>4.2%</p>
                </div>
                <ArrowTrendingUpIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Year-over-Year</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Expatriates</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>73.5%</p>
                </div>
                <MapPinIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">2.72M residents</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Housing Density</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>1.7M</p>
                </div>
                <HomeIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Households</p>
            </div>
          </div>
        </section>

        {/* Population Breakdown */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Population Breakdown</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>CATEGORY</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>POPULATION</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>PERCENTAGE</th>
                  </tr>
                </thead>
                <tbody>
                  {populationBreakdown.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-medium">{item.category}</td>
                      <td className="text-right py-4 px-6 text-gray-700 font-semibold">{item.value}</td>
                      <td className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                        {item.percentage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Housing by Type */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Housing Distribution by Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {householdData.map((house, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">{house.type}</p>
                    <p className="text-3xl font-bold" style={{ color: goldColor }}>
                      {house.percentage}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Population</p>
                    <p className="text-xl font-bold text-gray-900">{house.population}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${house.percentage}%`, backgroundColor: goldColor }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Understand Dubai's Demographics</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Use demographic insights for market analysis, property investment decisions, and understanding housing demand patterns.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            Get Demographic Report
          </button>
        </section>
      </div>
    </div>
  );
}
