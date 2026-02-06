'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  MapPinIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface Property {
  area: string;
  soldProperties: number;
  averagePrice: string;
  averagePriceValue: number;
}

const bestAreasData: Property[] = [
  {
    area: 'Jumeirah Village Circle',
    soldProperties: 17499,
    averagePrice: 'AED 900K',
    averagePriceValue: 900000,
  },
  {
    area: 'Business Bay',
    soldProperties: 12015,
    averagePrice: 'AED 1.6M',
    averagePriceValue: 1600000,
  },
  {
    area: 'Dubai Hills',
    soldProperties: 7110,
    averagePrice: 'AED 2.2M',
    averagePriceValue: 2200000,
  },
  {
    area: 'Madinat Al Mataar',
    soldProperties: 5578,
    averagePrice: 'AED 2.9M',
    averagePriceValue: 2900000,
  },
  {
    area: 'Jumeirah Lakes Towers',
    soldProperties: 5142,
    averagePrice: 'AED 1.4M',
    averagePriceValue: 1400000,
  },
  {
    area: 'Dubai Marina',
    soldProperties: 5074,
    averagePrice: 'AED 2.1M',
    averagePriceValue: 2100000,
  },
  {
    area: 'Meydan One',
    soldProperties: 4935,
    averagePrice: 'AED 747.2K',
    averagePriceValue: 747200,
  },
  {
    area: 'Arjan',
    soldProperties: 4772,
    averagePrice: 'AED 913.2K',
    averagePriceValue: 913200,
  },
  {
    area: 'Dubai Land Residence Complex',
    soldProperties: 4499,
    averagePrice: 'AED 722.5K',
    averagePriceValue: 722500,
  },
  {
    area: 'Downtown Dubai',
    soldProperties: 4419,
    averagePrice: 'AED 2.9M',
    averagePriceValue: 2900000,
  },
];

export default function Prices2024Page() {
  const [sortBy, setSortBy] = useState<'properties' | 'price'>('properties');

  const sortedAreas = [...bestAreasData].sort((a, b) => {
    if (sortBy === 'properties') {
      return b.soldProperties - a.soldProperties;
    } else {
      return b.averagePriceValue - a.averagePriceValue;
    }
  });

  const maxProperties = Math.max(...bestAreasData.map(a => a.soldProperties));
  const maxPrice = Math.max(...bestAreasData.map(a => a.averagePriceValue));

  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <CurrencyDollarIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Dubai Properties Prices 2024</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Examine Dubai's 2024 property prices. Discover market trends with our real-time data to help you make your next move. Our main goal is to provide as much market information as possible, to give you the knowledge and confidence you need to progress with your home buying and investments.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                    174,220
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
                <ArrowUpIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">YoY Price Stability</p>
            </div>

            {/* Average Price */}
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Average Price</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    1.4M
                  </p>
                </div>
                <CurrencyDollarIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Median Property Value</p>
            </div>
          </div>
        </section>

        {/* Best Areas Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <MapPinIcon className="w-8 h-8" style={{ color: goldColor }} />
              Best Areas to Buy Properties in Dubai
            </h2>
            <p className="text-gray-600 text-lg">Explore the top-performing areas and their property prices in 2024.</p>
          </div>

          {/* Sort Options */}
          <div className="mb-8 flex gap-4">
            <button
              onClick={() => setSortBy('properties')}
              style={{
                backgroundColor: sortBy === 'properties' ? goldColor : '#f3f4f6',
                color: sortBy === 'properties' ? 'white' : '#374151',
              }}
              className="px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Sort by Properties Sold
            </button>
            <button
              onClick={() => setSortBy('price')}
              style={{
                backgroundColor: sortBy === 'price' ? goldColor : '#f3f4f6',
                color: sortBy === 'price' ? 'white' : '#374151',
              }}
              className="px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Sort by Average Price
            </button>
          </div>

          {/* Table View */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>
                      Area
                    </th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                      Sold Properties
                    </th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                      Average Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAreas.map((property, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-medium">{property.area}</td>
                      <td className="text-right py-4 px-6 text-gray-800 font-semibold">
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

          {/* Chart View */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12" style={{ borderTop: `4px solid ${goldColor}` }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Properties Sold by Area</h3>
            <div className="space-y-6">
              {sortedAreas.map((property, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="w-40">
                    <p className="text-sm font-bold text-gray-700 line-clamp-2">{property.area}</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-lg h-10 overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center justify-end pr-4 transition-all"
                        style={{
                          width: `${(property.soldProperties / maxProperties) * 100}%`,
                          background: `linear-gradient(to right, ${goldColor}, #d4b896)`,
                        }}
                      >
                        <span className="text-white font-bold text-sm">{property.soldProperties.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Chart */}
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Average Prices by Area</h3>
            <div className="space-y-6">
              {sortedAreas.map((property, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="w-40">
                    <p className="text-sm font-bold text-gray-700 line-clamp-2">{property.area}</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-lg h-10 overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center justify-end pr-4 transition-all"
                        style={{
                          width: `${(property.averagePriceValue / maxPrice) * 100}%`,
                          background: `linear-gradient(to right, #d4b896, #e8c4a0)`,
                        }}
                      >
                        <span className="text-white font-bold text-sm">{property.averagePrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="mt-20 rounded-xl p-8" style={{ background: `linear-gradient(to right, ${lightGold}, #faf8f5)`, borderLeft: `4px solid ${goldColor}` }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ChartBarIcon className="w-8 h-8" style={{ color: goldColor }} />
            Market Insights 2024
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                📈 Strong Growth
              </h3>
              <p className="text-gray-700">
                Dubai's property market achieved a 35.5% YoY growth, reflecting strong investor confidence and market expansion.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                🏢 High Volume
              </h3>
              <p className="text-gray-700">
                Over 174,220 properties were sold in 2024, demonstrating robust market activity and diverse investment opportunities.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                💰 Stable Pricing
              </h3>
              <p className="text-gray-700">
                Price stability with 0% YoY change indicates a balanced market with sustainable property valuations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Invest?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Use this data to make informed decisions about your next property investment in Dubai. Connect with our expert agents for personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: goldColor }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
            >
              Browse Properties
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
