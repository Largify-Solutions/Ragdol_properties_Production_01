'use client';

import { useState } from 'react';
import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

interface Developer {
  name: string;
  projectsCompleted: number;
  unitsDelivered: number;
  onTimePercentage: number;
}

const developersData: Developer[] = [
  { name: 'DAMAC', projectsCompleted: 45, unitsDelivered: 12500, onTimePercentage: 92 },
  { name: 'Emaar Properties', projectsCompleted: 38, unitsDelivered: 15200, onTimePercentage: 88 },
  { name: 'AZIZI', projectsCompleted: 52, unitsDelivered: 18900, onTimePercentage: 85 },
  { name: 'Mag Properties', projectsCompleted: 28, unitsDelivered: 8200, onTimePercentage: 90 },
  { name: 'Dubai Properties', projectsCompleted: 22, unitsDelivered: 5800, onTimePercentage: 87 },
  { name: 'Binghatti', projectsCompleted: 35, unitsDelivered: 11400, onTimePercentage: 89 },
  { name: 'Omniyat', projectsCompleted: 18, unitsDelivered: 6200, onTimePercentage: 94 },
  { name: 'Deyaar', projectsCompleted: 42, unitsDelivered: 14100, onTimePercentage: 86 },
  { name: 'Tiger Properties', projectsCompleted: 25, unitsDelivered: 7600, onTimePercentage: 91 },
  { name: 'Select Group', projectsCompleted: 19, unitsDelivered: 5400, onTimePercentage: 88 },
];

export default function DeliveryRecordPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';
  const [sortBy, setSortBy] = useState('completed');

  const sortedData = [...developersData].sort((a, b) => {
    if (sortBy === 'completed') return b.projectsCompleted - a.projectsCompleted;
    if (sortBy === 'units') return b.unitsDelivered - a.unitsDelivered;
    return b.onTimePercentage - a.onTimePercentage;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BuildingOffice2Icon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Property Developers Delivery Record</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Track developer performance, project completion rates, and delivery timelines
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Developer Performance Analysis</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Monitor property delivery rates and project completion timelines. Our comprehensive database tracks developer performance metrics including projects completed, units delivered, and on-time completion percentages to help you identify reliable partners.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Top Developers</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>500+</p>
                </div>
                <BuildingOffice2Icon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Active in Dubai</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Projects Completed</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>2,000+</p>
                </div>
                <CheckCircleIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Delivered Successfully</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg On-Time Rate</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>89%</p>
                </div>
                <ClockIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Timely Completions</p>
            </div>
          </div>
        </section>

        {/* Developers Table */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Top Developers Performance</h2>
            <div className="flex gap-2">
              {['completed', 'units', 'ontime'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  style={{
                    backgroundColor: sortBy === option ? goldColor : lightGold,
                    color: sortBy === option ? 'white' : goldColor,
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                >
                  {option === 'completed' ? 'By Projects' : option === 'units' ? 'By Units' : 'By On-Time %'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>DEVELOPER</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>PROJECTS COMPLETED</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>UNITS DELIVERED</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>ON-TIME %</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((dev, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-semibold">{dev.name}</td>
                      <td className="text-right py-4 px-6 text-gray-700">{dev.projectsCompleted}</td>
                      <td className="text-right py-4 px-6 text-gray-700">{dev.unitsDelivered.toLocaleString()}</td>
                      <td className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                        {dev.onTimePercentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Track Developer Performance</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Stay informed about developer delivery records to make confident investment decisions. Review project timelines and completion history.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            View All Developers
          </button>
        </section>
      </div>
    </div>
  );
}
