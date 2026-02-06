'use client';

import { useState } from 'react';
import {
  CheckCircleIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface ServiceChargeArea {
  area: string;
  residential: string;
  commercial: string;
  villa: string;
}

const serviceCharges: ServiceChargeArea[] = [
  { area: 'Dubai Marina', residential: 'AED 12-15/sqft', commercial: 'AED 18-22/sqft', villa: 'AED 3-5/sqft' },
  { area: 'Downtown Dubai', residential: 'AED 14-18/sqft', commercial: 'AED 20-25/sqft', villa: 'AED 4-6/sqft' },
  { area: 'Business Bay', residential: 'AED 11-13/sqft', commercial: 'AED 16-20/sqft', villa: 'AED 3-4/sqft' },
  { area: 'JVC', residential: 'AED 8-10/sqft', commercial: 'AED 12-15/sqft', villa: 'AED 2-3/sqft' },
  { area: 'Dubai Hills', residential: 'AED 10-12/sqft', commercial: 'AED 14-18/sqft', villa: 'AED 3-4/sqft' },
  { area: 'Jumeirah', residential: 'AED 13-16/sqft', commercial: 'AED 19-23/sqft', villa: 'AED 5-7/sqft' },
  { area: 'Arabian Ranches', residential: 'AED 6-8/sqft', commercial: 'AED 10-12/sqft', villa: 'AED 2-3/sqft' },
  { area: 'Palm Jumeirah', residential: 'AED 15-20/sqft', commercial: 'AED 25-30/sqft', villa: 'AED 6-8/sqft' },
  { area: 'Emirates Hills', residential: 'AED 9-11/sqft', commercial: 'AED 13-16/sqft', villa: 'AED 3-4/sqft' },
  { area: 'Dubai Sports City', residential: 'AED 7-9/sqft', commercial: 'AED 11-14/sqft', villa: 'AED 2-3/sqft' },
];

const chargeComponents = [
  { component: 'Building Maintenance', percentage: 35, description: 'Common areas upkeep, repairs' },
  { component: 'Utilities', percentage: 25, description: 'Water, electricity, gas' },
  { component: 'Security & Safety', percentage: 20, description: 'Security personnel, CCTV, firefighting' },
  { component: 'Landscaping', percentage: 10, description: 'Gardens, common areas' },
  { component: 'Administrative', percentage: 10, description: 'Management staff, administration' },
];

export default function ServiceChargesPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircleIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Service Charges Dubai</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Understand service charge structures and maintenance costs across Dubai
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Service Charges</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Understand service charge structures and maintenance costs. Service charges vary significantly by location, property type, and amenities. Typically ranging from AED 6-15 per sqft annually, these costs cover building maintenance, utilities, security, and administrative services essential for property upkeep.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Residential</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 10-12</p>
                </div>
                <HomeIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Per sqft annually</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Commercial</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 15-20</p>
                </div>
                <CurrencyDollarIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Per sqft annually</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Villa Average</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 3-5</p>
                </div>
                <HomeIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Per sqft annually</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Premium Locations</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 15-20</p>
                </div>
                <ChartBarIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Per sqft annually</p>
            </div>
          </div>
        </section>

        {/* Service Charges by Area */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Charges by Area</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>AREA</th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>RESIDENTIAL</th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>COMMERCIAL</th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>VILLA</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceCharges.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-semibold">{item.area}</td>
                      <td className="py-4 px-6 text-gray-700">{item.residential}</td>
                      <td className="py-4 px-6 text-gray-700">{item.commercial}</td>
                      <td className="py-4 px-6 text-gray-700">{item.villa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Charge Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Charge Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Charge Breakdown</h3>
              <div className="space-y-4">
                {chargeComponents.map((component, index) => (
                  <div key={index} className="pb-4 border-b" style={{ borderColor: lightGold }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{component.component}</p>
                      <p className="text-lg font-bold" style={{ color: goldColor }}>
                        {component.percentage}%
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Charge Visualization</h3>
              <div className="space-y-4">
                {chargeComponents.map((component, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-700">{component.component}</p>
                      <p className="text-sm font-bold" style={{ color: goldColor }}>
                        {component.percentage}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${component.percentage}%`,
                          backgroundColor: goldColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Managing Service Charges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Budget Planning',
                tips: ['Factor service charges into investment analysis', 'Expect annual increases of 3-5%', 'Compare charges across similar properties'],
              },
              {
                title: 'Cost Optimization',
                tips: ['Review detailed charge breakdowns', 'Monitor energy efficiency initiatives', 'Check for hidden fees or surcharges'],
              },
              {
                title: 'Investment Decisions',
                tips: ['Properties with lower charges attract renters', 'Premium buildings offer better amenities', 'Location impacts charge significantly'],
              },
            ].map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate Your Service Charges</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Contact our advisors to understand service charges for properties you\'re interested in and make informed investment decisions.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            Get Property Analysis
          </button>
        </section>
      </div>
    </div>
  );
}
