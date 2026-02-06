'use client';

import { useState } from 'react';
import {
  SparklesIcon,
  MapPinIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface Property {
  name: string;
  type: string;
  price: string;
  area: string;
  bedrooms: number;
  sqft: string;
  yearCompleted: number;
  roiPotential: string;
}

const properties: Property[] = [
  {
    name: 'Bulgari Residences - Penthouse',
    type: 'Luxury Apartment',
    price: 'AED 28M',
    area: 'Jumeirah Bay Island',
    bedrooms: 4,
    sqft: '6,500 sqft',
    yearCompleted: 2024,
    roiPotential: '+14.2% YoY',
  },
  {
    name: 'Beachfront Villa - Custom Built',
    type: 'Villa',
    price: 'AED 65M',
    area: 'Jumeirah Bay Island',
    bedrooms: 5,
    sqft: '18,000 sqft',
    yearCompleted: 2025,
    roiPotential: '+16.5% YoY',
  },
  {
    name: 'Bulgari Yacht Club - Serviced Apt',
    type: 'Serviced Apartment',
    price: 'AED 8.5M',
    area: 'Jumeirah Bay Island',
    bedrooms: 2,
    sqft: '1,850 sqft',
    yearCompleted: 2024,
    roiPotential: '+12.8% YoY',
  },
  {
    name: 'Developer-Built Signature Home',
    type: 'Luxury Villa',
    price: 'AED 52M',
    area: 'Jumeirah Bay Island',
    bedrooms: 5,
    sqft: '15,500 sqft',
    yearCompleted: 2024,
    roiPotential: '+13.5% YoY',
  },
  {
    name: 'Beachfront Plot - Prime Location',
    type: 'Land',
    price: 'AED 48M',
    area: 'Jumeirah Bay Island',
    bedrooms: 0,
    sqft: '16,000 sqft',
    yearCompleted: 2025,
    roiPotential: '+18.2% YoY',
  },
];

const investmentOpportunities = [
  {
    title: 'Bulgari Residences',
    description: '1 to 4-bedroom apartments and penthouses with access to private marina, spa, and resort facilities',
    priceRange: 'AED 18M - AED 45M',
    highlight: 'Limited availability, branded property',
  },
  {
    title: 'Beachfront Villas (Off-Plan)',
    description: 'Custom-built plots with ultra-modern designs, infinity pools, and skyline views',
    priceRange: 'AED 45M - AED 100M+',
    highlight: 'High appreciation potential',
  },
  {
    title: 'Serviced Apartments',
    description: 'High-yield short-term rentals with 5-star services and holiday-home returns',
    priceRange: 'AED 8M - AED 15M',
    highlight: 'Minimal management, strong ROI',
  },
  {
    title: 'Developer-Built Signature Homes',
    description: 'Fully furnished, turnkey, smart-home integrated properties with exclusive designs',
    priceRange: 'AED 35M - AED 80M',
    highlight: 'Turnkey, design exclusivity',
  },
];

const marketMetrics = [
  { property: 'Villas', avgPrice: 'AED 7,500/sqft', growth: '+14.2%' },
  { property: 'Apartments', avgPrice: 'AED 6,200/sqft', growth: '+11.6%' },
  { property: 'Plots (Land)', avgPrice: 'AED 4,800/sqft', growth: '+9.8%' },
];

export default function JumeirahBayPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';
  const [selectedType, setSelectedType] = useState('All');

  const filteredProperties = selectedType === 'All'
    ? properties
    : properties.filter(p => p.type.includes(selectedType));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Top Real Estate Investments in Jumeirah Bay</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Ultra-Luxury Island Development - Explore exclusive beachfront investment opportunities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Invest in Jumeirah Bay Island?</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Jumeirah Bay Island – also known as "Bulgari Island" – is one of Dubai's most elite and exclusive real estate destinations. Shaped like a seahorse and connected to Jumeirah's coast via a 300-meter private bridge, this ultra-luxury enclave is attracting high-net-worth individuals and international investors.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Limited Supply, Unlimited Demand:</span> With only a few dozen plots and ultra-high-end villas available, scarcity drives long-term value.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Beachfront Living:</span> Direct access to private beaches and stunning views of the Arabian Gulf.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">Prestige Factor:</span> Home to the world-renowned Bulgari Resort & Residences, offering hotel-level amenities.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3" style={{ color: goldColor }}>✓</span>
                <span><span className="font-semibold">ROI & Appreciation:</span> Property prices have increased by 14% YoY, outperforming many other luxury areas.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">YoY Growth</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>+14.2%</p>
                </div>
                <ArrowTrendingUpIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Property appreciation</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Property Price</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>AED 60M+</p>
                </div>
                <CurrencyDollarIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Premium pricing</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Properties Available</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>45</p>
                </div>
                <HomeIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Limited supply</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Area Type</p>
                  <p className="text-2xl font-bold mt-2" style={{ color: goldColor }}>Island</p>
                </div>
                <MapPinIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Ultra-luxury</p>
            </div>
          </div>
        </section>

        {/* Investment Opportunities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Investment Opportunities (2025)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentOpportunities.map((opp, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{opp.title}</h3>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: lightGold, color: goldColor }}
                  >
                    {opp.highlight}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{opp.description}</p>
                <p className="font-bold text-lg" style={{ color: goldColor }}>
                  {opp.priceRange}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Properties */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <div className="flex gap-2">
              {['All', 'Villa', 'Apartment'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    backgroundColor: selectedType === type ? goldColor : lightGold,
                    color: selectedType === type ? 'white' : goldColor,
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredProperties.map((property, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderLeft: `4px solid ${goldColor}` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Property Name</p>
                    <p className="text-xl font-bold text-gray-900">{property.name}</p>
                    <p className="text-sm text-gray-600 mt-2">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Price</p>
                    <p className="text-3xl font-bold" style={{ color: goldColor }}>
                      {property.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">ROI Potential</p>
                    <p className="text-2xl font-bold" style={{ color: goldColor }}>
                      {property.roiPotential}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t" style={{ borderColor: lightGold }}>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Size</p>
                    <p className="font-bold text-gray-900">{property.sqft}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Bedrooms</p>
                    <p className="font-bold text-gray-900">{property.bedrooms || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Completed</p>
                    <p className="font-bold text-gray-900">{property.yearCompleted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Area</p>
                    <p className="font-bold text-gray-900">Jumeirah Bay</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Snapshot */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Market Snapshot – Jumeirah Bay Island (2025)</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>PROPERTY TYPE</th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>AVG. PRICE PER SQ. FT.</th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>YoY GROWTH</th>
                  </tr>
                </thead>
                <tbody>
                  {marketMetrics.map((metric, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-semibold">{metric.property}</td>
                      <td className="py-4 px-6 text-gray-700">{metric.avgPrice}</td>
                      <td className="py-4 px-6 font-bold" style={{ color: goldColor }}>
                        {metric.growth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Expert Insight */}
        <section className="mb-16">
          <div
            className="bg-white rounded-xl shadow-lg p-8"
            style={{ borderLeft: `8px solid ${goldColor}`, backgroundColor: lightGold }}
          >
            <p className="text-gray-800 text-lg italic mb-4">
              "Jumeirah Bay Island is no longer just a luxury address – it's an asset class in itself. With the limited number of properties and branded developments, prices will continue to appreciate even in a slower global economy."
            </p>
            <p className="font-bold text-gray-900" style={{ color: goldColor }}>
              — Rami El Zahid, Luxury Real Estate Consultant
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Invest in Jumeirah Bay?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Contact our luxury real estate specialists to schedule a private viewing and investment consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: goldColor }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
            >
              Schedule Viewing
            </button>
            <button
              className="font-bold py-3 px-8 rounded-lg transition-colors"
              style={{ borderColor: goldColor, color: goldColor, borderWidth: '2px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = lightGold)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Download Brochure
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
