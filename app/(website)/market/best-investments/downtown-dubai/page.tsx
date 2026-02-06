'use client';

import { useState } from 'react';
import {
  MapPinIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
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
  { name: 'Downtown Dubai - Luxury Apartment', type: 'Apartment', price: 'AED 3.2M', bedrooms: 2, sqft: '1,200 sqft', roi: '+8.5% YoY' },
  { name: 'Burj Khalifa View - Studio', type: 'Studio', price: 'AED 1.8M', bedrooms: 0, sqft: '650 sqft', roi: '+7.2% YoY' },
  { name: 'Downtown Dubai - Penthouse', type: 'Penthouse', price: 'AED 8.5M', bedrooms: 4, sqft: '4,500 sqft', roi: '+9.1% YoY' },
  { name: 'The Address Hotel Residences', type: 'Serviced Apt', price: 'AED 4.2M', bedrooms: 2, sqft: '1,400 sqft', roi: '+8.8% YoY' },
  { name: 'Emaar Beachfront - Marina View', type: 'Apartment', price: 'AED 5.8M', bedrooms: 3, sqft: '2,100 sqft', roi: '+9.3% YoY' },
];

const opportunities = [
  { title: 'Prime Downtown Apartments', range: 'AED 2M - AED 8M', desc: 'Close to Burj Khalifa and Dubai Mall' },
  { title: 'Serviced Residences', range: 'AED 3M - AED 6M', desc: 'High rental demand, hotel-managed' },
  { title: 'Boutique Penthouses', range: 'AED 6M - AED 12M', desc: 'Luxury finishes, premium amenities' },
  { title: 'Retail + Residential Mix', range: 'AED 1.5M - AED 4M', desc: 'Commercial synergy, high foot traffic' },
];

export default function DowntownDubaiPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBagIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Best Property Investments in Downtown Dubai</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Heart of Dubai's Luxury Market - World-class amenities and strong rental yields
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Invest in Downtown Dubai?</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Downtown Dubai is the iconic heart of Dubai's luxury real estate market. With world-class amenities, including the Burj Khalifa, Dubai Mall, and superior infrastructure, this area consistently delivers strong rental yields and price appreciation.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Prime Location:</span> Central location with excellent connectivity and accessibility.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">High Rental Demand:</span> Consistent tenant interest from professionals and tourists.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Iconic Status:</span> Most recognizable address in Dubai attracts international investors.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Steady Growth:</span> Consistent 8-9% annual appreciation with strong investor demand.</span>
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
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>+6.2%</p>
                </div>
                <ArrowTrendingUpIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Annual return</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Price Growth</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>+8.5%</p>
                </div>
                <CurrencyDollarIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Year-over-year</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Occupancy Rate</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>95%</p>
                </div>
                <CheckCircleIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Extremely high</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Price</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: goldColor }}>AED 3.5M</p>
                </div>
                <HomeIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">For 2-bed apartment</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Invest in Downtown Dubai Today</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of investors who have profited from Downtown Dubai's consistent appreciation and rental yields.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            View All Properties
          </button>
        </section>
      </div>
    </div>
  );
}
