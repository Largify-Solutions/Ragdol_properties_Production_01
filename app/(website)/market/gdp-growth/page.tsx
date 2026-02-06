'use client';

import { useState } from 'react';
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface GDPData {
  year: number;
  gdp: string;
  growth: string;
  sectors: { name: string; contribution: number }[];
}

const gdpHistory: GDPData[] = [
  {
    year: 2020,
    gdp: 'AED 383B',
    growth: '-2.1%',
    sectors: [
      { name: 'Tourism & Hospitality', contribution: 22 },
      { name: 'Real Estate', contribution: 18 },
      { name: 'Trade & Commerce', contribution: 28 },
    ],
  },
  {
    year: 2021,
    gdp: 'AED 401B',
    growth: '+4.7%',
    sectors: [
      { name: 'Tourism & Hospitality', contribution: 20 },
      { name: 'Real Estate', contribution: 19 },
      { name: 'Trade & Commerce', contribution: 29 },
    ],
  },
  {
    year: 2022,
    gdp: 'AED 446B',
    growth: '+11.2%',
    sectors: [
      { name: 'Tourism & Hospitality', contribution: 21 },
      { name: 'Real Estate', contribution: 20 },
      { name: 'Trade & Commerce', contribution: 27 },
    ],
  },
  {
    year: 2023,
    gdp: 'AED 477B',
    growth: '+6.9%',
    sectors: [
      { name: 'Tourism & Hospitality', contribution: 23 },
      { name: 'Real Estate', contribution: 19 },
      { name: 'Trade & Commerce', contribution: 26 },
    ],
  },
  {
    year: 2024,
    gdp: 'AED 513B',
    growth: '+7.5%',
    sectors: [
      { name: 'Tourism & Hospitality', contribution: 24 },
      { name: 'Real Estate', contribution: 20 },
      { name: 'Trade & Commerce', contribution: 25 },
    ],
  },
];

export default function GDPGrowthPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ArrowTrendingUpIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Dubai GDP Growth</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Track Dubai economic performance and GDP expansion trends
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Economic Growth Story</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Track Dubai economic performance and GDP expansion. With consistent year-over-year growth averaging 4.5%, Dubai has demonstrated strong economic resilience and diversification. Understanding GDP trends helps investors identify stable market conditions and growth opportunities across sectors.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Current GDP</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 513B</p>
                </div>
                <CurrencyDollarIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">2024 Estimate</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Annual Growth</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>7.5%</p>
                </div>
                <ArrowTrendingUpIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">2024 Growth Rate</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">5-Year CAGR</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>4.5%</p>
                </div>
                <ArrowTrendingUpIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Compound Annual</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Per Capita</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 139K</p>
                </div>
                <ChartBarIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Income Per Resident</p>
            </div>
          </div>
        </section>

        {/* GDP Growth Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">GDP Growth Timeline</h2>
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="space-y-6">
              {gdpHistory.map((item, index) => (
                <div key={index} className="pb-6 border-b" style={{ borderColor: lightGold }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{item.year}</p>
                      <p className="text-gray-600">GDP: <span style={{ color: goldColor }} className="font-bold">{item.gdp}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold" style={{ color: goldColor }}>{item.growth}</p>
                      <p className="text-gray-600 text-sm">Growth Rate</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Sector Contributions:</p>
                    <div className="flex flex-wrap gap-4">
                      {item.sectors.map((sector, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: goldColor }}></div>
                          <span className="text-gray-700">
                            {sector.name}: <span className="font-bold" style={{ color: goldColor }}>{sector.contribution}%</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Economic Sectors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Economic Sectors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Tourism & Hospitality', contribution: '24%', value: 'AED 123B' },
              { name: 'Trade & Commerce', contribution: '25%', value: 'AED 128B' },
              { name: 'Real Estate', contribution: '20%', value: 'AED 103B' },
              { name: 'Finance & Banking', contribution: '12%', value: 'AED 62B' },
              { name: 'Energy & Utilities', contribution: '10%', value: 'AED 51B' },
              { name: 'Manufacturing', contribution: '9%', value: 'AED 46B' },
            ].map((sector, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{sector.name}</h3>
                <p className="text-gray-600 mb-4">Sector contribution to GDP</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold" style={{ color: goldColor }}>
                      {sector.contribution}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{sector.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Growth Drivers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Growth Drivers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Tourism Recovery',
                description: 'Strong international visitor growth driving hospitality sector expansion',
                icon: '✈️',
              },
              {
                title: 'Real Estate Boom',
                description: 'Robust property sales and construction activity fueling economic growth',
                icon: '🏗️',
              },
              {
                title: 'Business Growth',
                description: 'Continued business registration and entrepreneurship expanding tax base',
                icon: '💼',
              },
            ].map((driver, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderLeft: `4px solid ${goldColor}` }}
              >
                <div className="text-3xl mb-3">{driver.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{driver.title}</h3>
                <p className="text-gray-600">{driver.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Invest in Dubai's Growth</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            With strong GDP growth and economic diversification, Dubai offers stable investment opportunities across multiple sectors.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            Explore Investment Options
          </button>
        </section>
      </div>
    </div>
  );
}
