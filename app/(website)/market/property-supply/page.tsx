'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  HomeIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface Project {
  name: string;
  developer: string;
  handoverDate: string;
  totalUnits: number;
}

const recentProjects: Project[] = [
  {
    name: 'DAMAC HILLS (2) - VICTORIA 2',
    developer: 'Front Line Investment Management L.L.C',
    handoverDate: '09-APR-2025',
    totalUnits: 96,
  },
  {
    name: 'Palm Hills',
    developer: 'Dubai Hills Estate L.L.C',
    handoverDate: '09-APR-2025',
    totalUnits: 27,
  },
  {
    name: 'AZIZI RIVIERA 65',
    developer: 'Azizi Developments L.L.C',
    handoverDate: '27-MAR-2025',
    totalUnits: 169,
  },
  {
    name: 'AZIZI RIVIERA 67',
    developer: 'Azizi Developments L.L.C',
    handoverDate: '27-MAR-2025',
    totalUnits: 198,
  },
  {
    name: 'AZIZI RIVIERA 61',
    developer: 'Azizi Developments L.L.C',
    handoverDate: '27-MAR-2025',
    totalUnits: 240,
  },
  {
    name: 'Majestic Vistas',
    developer: 'Dubai Hills Estate L.L.C',
    handoverDate: '25-MAR-2025',
    totalUnits: 41,
  },
  {
    name: 'Luxury Family Residence II',
    developer: 'Kappa Acca Real Estate Development',
    handoverDate: '24-MAR-2025',
    totalUnits: 205,
  },
  {
    name: 'H Three By Aurora',
    developer: 'Aurora Real Estate Development L.L.C',
    handoverDate: '20-MAR-2025',
    totalUnits: 147,
  },
  {
    name: 'Binghatti Tulip',
    developer: 'Binghatti Developers Fze',
    handoverDate: '19-MAR-2025',
    totalUnits: 279,
  },
  {
    name: 'The 100',
    developer: 'The 100',
    handoverDate: '19-MAR-2025',
    totalUnits: 91,
  },
];

export default function PropertySupplyPage() {
  const [sortBy, setSortBy] = useState<'date' | 'units'>('date');

  const sortedProjects = [...recentProjects].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.handoverDate).getTime() - new Date(a.handoverDate).getTime();
    } else {
      return b.totalUnits - a.totalUnits;
    }
  });

  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';
  const maxUnits = Math.max(...recentProjects.map(p => p.totalUnits));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BuildingOfficeIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Dubai Property Supply</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Explore the latest delivered real estate projects in Dubai. Understand supply and demand dynamics to make informed investment decisions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ChartBarIcon className="w-8 h-8" style={{ color: goldColor }} />
            Understanding Supply and Demand
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Like other assets, real estate also depends on the law of supply and demand. When the demand for property is high, but the property is scarce, prices go up, and it becomes a seller's market. When the number of available properties increases to glut the market, prices typically drop, and it becomes a buyer's market.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Supply and demand in real estate are not easy to balance. If the demand goes up suddenly, for example during the Arab Spring, which resulted in moving more investors to Turkey and GCC, then there is no way to meet that instantly; hence, property prices skyrocket.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Understanding this basic economic principle can help consumers decide the best time to buy or sell their properties. The property supply should be studied based on the available stock in each area and the lifestyles offered by that supply. On this page, you can view all freehold registered projects in the Dubai Land Department, which compose the majority of the real estate market in Dubai.
            </p>
          </div>
        </section>

        {/* Key Insights */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Market Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Units Delivered</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    1,485
                  </p>
                </div>
                <HomeIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Across 10 projects</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Developers</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    8
                  </p>
                </div>
                <BuildingOfficeIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Contributing to market growth</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Recent Activity</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>
                    Mar-Apr
                  </p>
                </div>
                <ArrowTrendingUpIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Latest handover period</p>
            </div>
          </div>
        </section>

        {/* Latest Projects Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircleIcon className="w-8 h-8" style={{ color: goldColor }} />
              Latest Delivered Real Estate Projects in Dubai
            </h2>
            <p className="text-gray-600 text-lg">Recently completed projects registered with Dubai Land Department</p>
          </div>

          {/* Sort Options */}
          <div className="mb-8 flex gap-4">
            <button
              onClick={() => setSortBy('date')}
              style={{
                backgroundColor: sortBy === 'date' ? goldColor : '#f3f4f6',
                color: sortBy === 'date' ? 'white' : '#374151',
              }}
              className="px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Sort by Date
            </button>
            <button
              onClick={() => setSortBy('units')}
              style={{
                backgroundColor: sortBy === 'units' ? goldColor : '#f3f4f6',
                color: sortBy === 'units' ? 'white' : '#374151',
              }}
              className="px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Sort by Units
            </button>
          </div>

          {/* Table View */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>
                      Project Name
                    </th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>
                      Developer
                    </th>
                    <th className="text-center py-4 px-6 font-bold" style={{ color: goldColor }}>
                      Handover Date
                    </th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                      Total Units
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProjects.map((project, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-medium">{project.name}</td>
                      <td className="py-4 px-6 text-gray-700">{project.developer}</td>
                      <td className="text-center py-4 px-6 text-gray-700 font-semibold">{project.handoverDate}</td>
                      <td className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                        {project.totalUnits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Projects Chart */}
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Units by Project</h3>
            <div className="space-y-6">
              {sortedProjects.map((project, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="w-56">
                    <p className="text-sm font-bold text-gray-700 line-clamp-2">{project.name}</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-lg h-10 overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center justify-end pr-4 transition-all"
                        style={{
                          width: `${(project.totalUnits / maxUnits) * 100}%`,
                          background: `linear-gradient(to right, ${goldColor}, #d4b896)`,
                        }}
                      >
                        <span className="text-white font-bold text-sm">{project.totalUnits}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Cards */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Project Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {sortedProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  style={{ borderTop: `4px solid ${goldColor}` }}
                >
                  <div className="mb-4">
                    <p className="text-sm font-bold text-gray-500 mb-2">PROJECT</p>
                    <p className="text-lg font-bold text-gray-900 line-clamp-3">{project.name}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4" style={{ borderLeft: `3px solid ${goldColor}` }}>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Units</p>
                    <p className="text-2xl font-bold text-gray-900">{project.totalUnits}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4" style={{ borderLeft: `3px solid ${goldColor}` }}>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Handover</p>
                    <p className="text-sm font-bold" style={{ color: goldColor }}>
                      {project.handoverDate}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 line-clamp-2">{project.developer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supply Insights */}
        <section
          className="mt-20 rounded-xl p-8"
          style={{ background: `linear-gradient(to right, ${lightGold}, #faf8f5)`, borderLeft: `4px solid ${goldColor}` }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ChartBarIcon className="w-8 h-8" style={{ color: goldColor }} />
            Market Supply Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                📊 Freehold Projects
              </h3>
              <p className="text-gray-700">
                All projects listed are freehold registered properties with the Dubai Land Department, representing the majority of Dubai's real estate market.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                🏗️ Active Development
              </h3>
              <p className="text-gray-700">
                Continuous supply of new properties ensures balanced market dynamics and provides investors with diverse options across different areas and price points.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2 text-lg" style={{ color: goldColor }}>
                📈 Market Growth
              </h3>
              <p className="text-gray-700">
                The steady handover of new projects demonstrates consistent market growth and developer confidence in Dubai's real estate sector.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interested in New Projects?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Explore these newly delivered projects and discover investment opportunities in Dubai's thriving real estate market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: goldColor }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
            >
              View All Projects
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
