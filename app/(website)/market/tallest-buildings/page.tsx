'use client';

import { useState } from 'react';
import {
  BuildingLibraryIcon,
  MapPinIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface Building {
  name: string;
  location: string;
  height: string;
  floors: number;
  yearCompleted: number;
  residents: string;
}

const tallestBuildings: Building[] = [
  { name: 'Burj Khalifa', location: 'Downtown Dubai', height: '828m', floors: 163, yearCompleted: 2010, residents: '12,000+' },
  { name: 'Marina 101', location: 'Dubai Marina', height: '432m', floors: 101, yearCompleted: 2017, residents: '3,000+' },
  { name: 'Emirates Tower', location: 'Downtown Dubai', height: '355m', floors: 60, yearCompleted: 2000, residents: '2,000+' },
  { name: 'Princess Tower', location: 'Dubai Marina', height: '414m', floors: 101, yearCompleted: 2012, residents: '2,800+' },
  { name: 'JW Marquis', location: 'Downtown Dubai', height: '400m', floors: 89, yearCompleted: 2014, residents: '2,200+' },
  { name: 'Burj Al Arab', location: 'Jumeirah', height: '321m', floors: 60, yearCompleted: 1999, residents: '1,500+' },
  { name: 'Rose Tower', location: 'Downtown Dubai', height: '390m', floors: 86, yearCompleted: 2021, residents: '2,100+' },
  { name: 'DAMAC Maison Ciel', location: 'Downtown Dubai', height: '385m', floors: 100, yearCompleted: 2019, residents: '1,900+' },
  { name: 'Infinity Tower', location: 'Dubai Marina', height: '368m', floors: 89, yearCompleted: 2021, residents: '1,800+' },
  { name: 'Al Noor Tower', location: 'Business Bay', height: '355m', floors: 88, yearCompleted: 2020, residents: '1,700+' },
];

export default function TallestBuildingsPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';
  const [sortBy, setSortBy] = useState('height');

  const sortedBuildings = [...tallestBuildings].sort((a, b) => {
    if (sortBy === 'height') return parseInt(b.height) - parseInt(a.height);
    if (sortBy === 'floors') return b.floors - a.floors;
    return b.yearCompleted - a.yearCompleted;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BuildingLibraryIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Tallest Buildings in Dubai</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Explore Dubai's iconic skyscrapers and architectural landmarks
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Architectural Marvels</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Dubai's skyline features over 100 supertall buildings, showcasing architectural excellence and innovation. These landmarks have become symbols of Dubai's rapid development and attract international investment in premium residential, commercial, and hospitality properties.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Supertall Buildings</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>100+</p>
                </div>
                <BuildingLibraryIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Over 300m tall</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Tallest Structure</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>828m</p>
                </div>
                <ArrowTrendingUpIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Burj Khalifa</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Height</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>380m</p>
                </div>
                <CheckCircleIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Top 10 Buildings</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Residents</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>120K+</p>
                </div>
                <MapPinIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">In Top 10</p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-8">
          <div className="flex gap-3">
            {['height', 'floors', 'year'].map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                style={{
                  backgroundColor: sortBy === option ? goldColor : lightGold,
                  color: sortBy === option ? 'white' : goldColor,
                }}
                className="px-6 py-2 rounded-lg font-semibold transition-all"
              >
                {option === 'height' ? 'By Height' : option === 'floors' ? 'By Floors' : 'By Year'}
              </button>
            ))}
          </div>
        </section>

        {/* Buildings Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tallest Buildings in Dubai</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>BUILDING</th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>LOCATION</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>HEIGHT</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>FLOORS</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>COMPLETED</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>RESIDENTS</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedBuildings.map((building, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-semibold">{building.name}</td>
                      <td className="py-4 px-6 text-gray-700">{building.location}</td>
                      <td className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                        {building.height}
                      </td>
                      <td className="text-right py-4 px-6 text-gray-700">{building.floors}</td>
                      <td className="text-right py-4 px-6 text-gray-700">{building.yearCompleted}</td>
                      <td className="text-right py-4 px-6 text-gray-700">{building.residents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Building Highlights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Landmarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedBuildings.slice(0, 4).map((building, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderLeft: `4px solid ${goldColor}` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{building.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <MapPinIcon className="w-4 h-4" />
                      {building.location}
                    </p>
                  </div>
                  <div
                    className="text-right"
                    style={{
                      backgroundColor: lightGold,
                      color: goldColor,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    {building.height}
                  </div>
                </div>

                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Floors:</span> {building.floors}
                  </p>
                  <p>
                    <span className="font-semibold">Completed:</span> {building.yearCompleted}
                  </p>
                  <p>
                    <span className="font-semibold">Residents:</span> {building.residents}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Development Impact */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Architectural Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Global Recognition',
                description: 'Dubai\'s skyline has become a globally iconic symbol of modernity and development',
              },
              {
                title: 'Property Values',
                description: 'Premium properties in supertall buildings command premium prices and returns',
              },
              {
                title: 'Economic Growth',
                description: 'Construction and real estate drive significant economic activity and employment',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Invest in Dubai's Iconic Buildings</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Own a piece of Dubai's architectural heritage. Explore premium properties in the world's most spectacular skyscrapers.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            View Premium Properties
          </button>
        </section>
      </div>
    </div>
  );
}
