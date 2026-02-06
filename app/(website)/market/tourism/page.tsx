'use client';

import { useState } from 'react';
import {
  SparklesIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

interface TourismMetric {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<any>;
}

const tourismData: TourismMetric[] = [
  {
    title: 'Annual Visitors',
    value: '15M+',
    description: 'International and domestic tourists',
    icon: UsersIcon,
  },
  {
    title: 'Hotel Occupancy',
    value: '88%',
    description: 'Average room occupancy rate',
    icon: BuildingLibraryIcon,
  },
  {
    title: 'Tourism Revenue',
    value: 'AED 94B',
    description: 'Annual tourism revenue',
    icon: SparklesIcon,
  },
  {
    title: 'Hotel Nights',
    value: '85M',
    description: 'Average annual room nights',
    icon: CalendarIcon,
  },
];

const topAttractions = [
  { name: 'Burj Khalifa', location: 'Downtown Dubai', visitors: '1.9M/year' },
  { name: 'Dubai Mall', location: 'Downtown Dubai', visitors: '80M/year' },
  { name: 'Palm Jumeirah', location: 'Jumeirah', visitors: '25M/year' },
  { name: 'Atlantis The Palm', location: 'Palm Jumeirah', visitors: '7.5M/year' },
  { name: 'Dubai Marina', location: 'Marina', visitors: '20M/year' },
  { name: 'Emirates Mall', location: 'Al Barsha', visitors: '35M/year' },
  { name: 'Gold Souk', location: 'Deira', visitors: '15M/year' },
  { name: 'Desert Safari', location: 'Dubai Desert', visitors: '5.2M/year' },
  { name: 'Jumeirah Beach', location: 'Jumeirah', visitors: '10M/year' },
  { name: 'Wild Wadi', location: 'Jumeirah', visitors: '1.5M/year' },
];

export default function TourismPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Dubai Tourism</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Understand Dubai tourism impact on the real estate market and hospitality sector
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tourism's Role in Dubai's Growth</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Tourism is a major economic driver for Dubai, attracting over 15 million visitors annually. This influx of tourists creates significant demand for hospitality properties, short-term rentals, and residential properties for relocated expat workers, making it crucial for understanding real estate market dynamics.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tourismData.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8"
                  style={{ borderTop: `4px solid ${goldColor}` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
                      <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>
                        {metric.value}
                      </p>
                    </div>
                    <IconComponent className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
                  </div>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tourism Growth */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tourism Growth Trends</h2>
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="space-y-6">
              {[
                { year: '2020', visitors: '5.6M', growth: '-67%' },
                { year: '2021', visitors: '7.1M', growth: '+27%' },
                { year: '2022', visitors: '12.2M', growth: '+72%' },
                { year: '2023', visitors: '14.1M', growth: '+16%' },
                { year: '2024', visitors: '15M+', growth: '+6%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b" style={{ borderColor: lightGold }}>
                  <div>
                    <p className="font-bold text-gray-900">{item.year}</p>
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2"
                        style={{
                          width: `${(parseInt(item.visitors) / 20) * 100}%`,
                          backgroundColor: goldColor,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{item.visitors}</p>
                    <p style={{ color: goldColor }} className="text-sm font-semibold">
                      {item.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Attractions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Tourist Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topAttractions.map((attraction, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderLeft: `4px solid ${goldColor}` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                <p className="text-gray-600 mb-4">{attraction.location}</p>
                <div className="flex items-center">
                  <SparklesIcon className="w-5 h-5 mr-2" style={{ color: goldColor }} />
                  <p className="font-semibold" style={{ color: goldColor }}>
                    {attraction.visitors}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Impact */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tourism Impact on Real Estate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Hospitality Properties',
                description: 'High demand for hotels, resorts, and serviced apartments',
                value: '450+ hotels',
              },
              {
                title: 'Short-Term Rentals',
                description: 'Vacation rental demand drives property investment',
                value: '75K+ units',
              },
              {
                title: 'Residential Growth',
                description: 'Tourism creates expat relocation and housing demand',
                value: '1.7M units',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-2xl font-bold" style={{ color: goldColor }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Capitalize on Tourism Opportunities</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Tourism-driven properties offer unique investment opportunities. Explore our hospitality and vacation rental properties.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            Explore Tourism Properties
          </button>
        </section>
      </div>
    </div>
  );
}
