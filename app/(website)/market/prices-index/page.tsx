'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface Property {
  area: string;
  soldProperties: number;
  averagePrice: string;
}

const bestAreasData: Property[] = [
  { area: 'Jumeirah Village Circle', soldProperties: 17499, averagePrice: 'AED 900K' },
  { area: 'Business Bay', soldProperties: 12015, averagePrice: 'AED 1.6M' },
  { area: 'Dubai Hills', soldProperties: 7110, averagePrice: 'AED 2.2M' },
  { area: 'Madinat Al Mataar', soldProperties: 5578, averagePrice: 'AED 2.9M' },
  { area: 'Jumeirah Lakes Towers', soldProperties: 5142, averagePrice: 'AED 1.4M' },
  { area: 'Dubai Marina', soldProperties: 5074, averagePrice: 'AED 2.1M' },
  { area: 'Meydan One', soldProperties: 4935, averagePrice: 'AED 747.2K' },
  { area: 'Arjan', soldProperties: 4772, averagePrice: 'AED 913.2K' },
  { area: 'Dubai Land Residence Complex', soldProperties: 4499, averagePrice: 'AED 722.5K' },
  { area: 'Downtown Dubai', soldProperties: 4419, averagePrice: 'AED 2.9M' },
];

const otherSearches = [
  'Dubai property prices 2025',
  'Dubai apartment prices 2025',
  'Dubai villa prices 2025',
  'Dubai commercial prices 2025',
  'Dubai plot prices 2025',
  'Dubai apartment prices 2023',
  'Dubai villa prices 2023',
  'Dubai property prices 2023',
  'Dubai plot prices 2023',
  'Dubai commercial prices 2023',
  'Dubai property prices 2022',
  'Dubai apartment prices 2022',
  'Dubai villa prices 2022',
  'Dubai plot prices 2022',
  'Dubai commercial prices 2022',
];

export default function PricesIndexPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ChartBarIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Properties Prices Index</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Dubai Properties Prices 2024
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dubai Properties Prices 2024</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Examine Dubai's 2024 property prices compared to earlier time periods. Discover market trends with our real-time data to help you make your next move. Our main goal is to provide as much market information as possible, to give you the knowledge and confidence you need to progress with your home buying and investments.
            </p>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* YoY Change */}
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">YoY Change</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    35.5%
                  </p>
                </div>
                <ArrowTrendingUpIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Year-over-Year Growth</p>
            </div>

            {/* Sold Properties */}
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Sold Properties</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    180,669
                  </p>
                </div>
                <HomeIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Total Transactions</p>
            </div>

            {/* Price Change */}
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Price Change</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    0%
                  </p>
                </div>
                <ArrowTrendingUpIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">YoY Price Stability</p>
            </div>

            {/* Average Price */}
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Average Price</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    1.5M
                  </p>
                </div>
                <CurrencyDollarIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Median Property Value</p>
            </div>
          </div>
        </section>

        {/* Best Areas Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <HomeIcon className="w-8 h-8" style={{ color: goldColor }} />
            Best Areas to Buy Properties in Dubai
          </h2>

          {/* Table View */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>
                      AREA
                    </th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                      SOLD PROPERTIES
                    </th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                      AVERAGE PRICE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bestAreasData.map((property, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-medium">{property.area}</td>
                      <td className="text-right py-4 px-6 text-gray-700 font-semibold">
                        {property.soldProperties.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                        {property.averagePrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Other Searches Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <ChartBarIcon className="w-8 h-8" style={{ color: goldColor }} />
            Other Searches
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherSearches.map((search, index) => (
                <button
                  key={index}
                  className="text-left py-3 px-4 rounded-lg transition-all hover:shadow-md"
                  style={{
                    backgroundColor: lightGold,
                    color: goldColor,
                    borderLeft: `3px solid ${goldColor}`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e8dcc8')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = lightGold)}
                >
                  <p className="font-semibold">{search}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Property Prices</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Find detailed property price information for different areas, property types, and time periods to make informed investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: goldColor }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
            >
              View Detailed Prices
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
