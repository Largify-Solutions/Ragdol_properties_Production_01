'use client';

import { useState } from 'react';
import {
  MapPinIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

interface Property {
  name: string;
  type: string;
  price: string;
  bedrooms: number;
  sqft: string;
  roi: string;
}

const properties: Property[] = [
  { name: 'Business Bay - Modern Apartment', type: 'Apartment', price: 'AED 2.1M', bedrooms: 2, sqft: '1,050 sqft', roi: '+9.2% YoY' },
  { name: 'Bay Central - Studio', type: 'Studio', price: 'AED 1.2M', bedrooms: 0, sqft: '550 sqft', roi: '+8.5% YoY' },
  { name: 'The Lofts - 3BR Apartment', type: 'Apartment', price: 'AED 3.8M', bedrooms: 3, sqft: '1,800 sqft', roi: '+9.8% YoY' },
  { name: 'Pasha Tower - Furnished', type: 'Apartment', price: 'AED 4.5M', bedrooms: 2, sqft: '1,650 sqft', roi: '+8.7% YoY' },
  { name: 'Business Bay Marina - Waterfront', type: 'Apartment', price: 'AED 5.2M', bedrooms: 3, sqft: '2,200 sqft', roi: '+10.1% YoY' },
];

const opportunities = [
  { title: 'Entry-Level Apartments', range: 'AED 1.2M - AED 2.5M', desc: 'Studios and 1-BR for first-time investors' },
  { title: 'Mid-Range 2-3 BR', range: 'AED 2.5M - AED 5M', desc: 'Family-friendly, high rental demand' },
  { title: 'Marina-View Premium', range: 'AED 4M - AED 7M', desc: 'Waterfront properties with scenic views' },
  { title: 'Commercial Spaces', range: 'AED 1.5M - AED 6M', desc: 'Office units with strong office-seeker demand' },
];

export default function BusinessBayPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BuildingOffice2Icon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Best Property Investments in Business Bay</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Commercial & Residential Hub - Balanced investment area with diverse property types
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Invest in Business Bay?</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Business Bay is Dubai's premier commercial and residential hub, offering balanced investment opportunities with diverse property types. From studios for first-time investors to luxury penthouses, this area attracts both homebuyers and rental investors.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Affordable Entry Point:</span> More accessible prices than Downtown Dubai.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Strong Rental Demand:</span> Professional workers and families seek quality rentals.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Mixed-Use Development:</span> Retail, office, and residential create synergies.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Consistent Growth:</span> 9%+ annual appreciation with healthy demand.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Rental Yield</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>+6.8%</p>
                </div>
                <ArrowTrendingUpIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Annual return</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Price Growth</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>+9.2%</p>
                </div>
                <CurrencyDollarIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Year-over-year</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Occupancy Rate</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>92%</p>
                </div>
                <CheckCircleIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Very high demand</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Entry Price</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 1.2M</p>
                </div>
                <HomeIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Starting studio</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Investment Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{opp.title}</h3>
                <p className="text-gray-600 mb-4">{opp.desc}</p>
                <p className="font-bold text-lg" style={{ color: goldColor }}>{opp.range}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Properties</h2>
          <div className="space-y-4">
            {properties.map((prop, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Property</p>
                    <p className="font-bold text-gray-900">{prop.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{prop.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="text-2xl font-bold" style={{ color: goldColor }}>{prop.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Details</p>
                    <p className="font-semibold text-gray-900">{prop.bedrooms ? `${prop.bedrooms} BR` : 'Studio'}</p>
                    <p className="text-xs text-gray-600">{prop.sqft}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ROI Potential</p>
                    <p className="text-lg font-bold" style={{ color: goldColor }}>{prop.roi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Business Bay Investment</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Affordable pricing, strong returns, and diverse property types make Business Bay ideal for all investor profiles.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            Explore Properties
          </button>
        </section>
      </div>
    </div>
  );
}
