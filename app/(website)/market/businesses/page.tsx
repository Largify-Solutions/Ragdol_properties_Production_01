'use client';

import { useState } from 'react';
import {
  BriefcaseIcon,
  ArrowTrendingUpIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface BusinessSector {
  sector: string;
  registeredBusinesses: number;
  growth: string;
  employment: string;
}

const businessSectors: BusinessSector[] = [
  { sector: 'Trade & Commerce', registeredBusinesses: 85000, growth: '+8.2%', employment: '125K' },
  { sector: 'Real Estate', registeredBusinesses: 42000, growth: '+6.5%', employment: '95K' },
  { sector: 'Construction', registeredBusinesses: 38000, growth: '+5.8%', employment: '110K' },
  { sector: 'Finance & Banking', registeredBusinesses: 12500, growth: '+4.2%', employment: '65K' },
  { sector: 'Tourism & Hospitality', registeredBusinesses: 18000, growth: '+7.1%', employment: '85K' },
  { sector: 'IT & Technology', registeredBusinesses: 22000, growth: '+12.5%', employment: '75K' },
  { sector: 'Healthcare', registeredBusinesses: 8500, growth: '+3.9%', employment: '45K' },
  { sector: 'Education', registeredBusinesses: 5200, growth: '+2.1%', employment: '35K' },
  { sector: 'Manufacturing', registeredBusinesses: 15000, growth: '+4.5%', employment: '80K' },
  { sector: 'Energy & Utilities', registeredBusinesses: 3200, growth: '+1.8%', employment: '25K' },
];

export default function BusinessesPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';
  const [sortBy, setSortBy] = useState('businesses');

  const sortedData = [...businessSectors].sort((a, b) => {
    if (sortBy === 'businesses') return b.registeredBusinesses - a.registeredBusinesses;
    if (sortBy === 'growth') {
      return parseFloat(b.growth) - parseFloat(a.growth);
    }
    return parseInt(b.employment) - parseInt(a.employment);
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BriefcaseIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Businesses In Dubai</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Track business registration and commercial sector growth across Dubai
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dubai's Business Ecosystem</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Track business registration and commercial sector growth. With over 300,000 registered businesses and continuous economic expansion, Dubai offers diverse investment opportunities across multiple sectors. Understanding business trends helps investors identify growth areas and commercial real estate opportunities.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Businesses</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>300K+</p>
                </div>
                <BriefcaseIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Registered Companies</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Workforce</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>2.5M+</p>
                </div>
                <BuildingOffice2Icon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Employed Professionals</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Annual Growth</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>6.5%</p>
                </div>
                <ArrowTrendingUpIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Business Registration</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Sectors Active</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>50+</p>
                </div>
                <CheckCircleIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Economic Categories</p>
            </div>
          </div>
        </section>

        {/* Business Sectors */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Business Sectors Analysis</h2>
            <div className="flex gap-2">
              {['businesses', 'growth', 'employment'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  style={{
                    backgroundColor: sortBy === option ? goldColor : lightGold,
                    color: sortBy === option ? 'white' : goldColor,
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                >
                  {option === 'businesses' ? 'By Count' : option === 'growth' ? 'By Growth' : 'By Employment'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>SECTOR</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>BUSINESSES</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>GROWTH</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>EMPLOYMENT</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((sector, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-semibold">{sector.sector}</td>
                      <td className="text-right py-4 px-6 text-gray-700 font-semibold">
                        {sector.registeredBusinesses.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                        {sector.growth}
                      </td>
                      <td className="text-right py-4 px-6 text-gray-700 font-semibold">{sector.employment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Business Growth Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Fastest Growing Sectors',
                sectors: ['IT & Technology (+12.5%)', 'Trade & Commerce (+8.2%)', 'Tourism & Hospitality (+7.1%)'],
              },
              {
                title: 'Largest Employers',
                sectors: ['Trade & Commerce (125K)', 'Construction (110K)', 'Real Estate (95K)'],
              },
              {
                title: 'Investment Opportunities',
                sectors: ['Commercial Real Estate', 'Tech Startups', 'Tourism & Hospitality'],
              },
            ].map((insight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{insight.title}</h3>
                <ul className="space-y-3">
                  {insight.sectors.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="font-bold mr-3" style={{ color: goldColor }}>•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Commercial Opportunities</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Identify high-growth business sectors and find commercial properties aligned with market expansion trends.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            View Commercial Properties
          </button>
        </section>
      </div>
    </div>
  );
}
