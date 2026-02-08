'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  SparklesIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function NewDevelopmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'residential' | 'commercial' | 'mixed'>('residential')

  const newDevelopments = {
    residential: [
      {
        id: 1,
        name: 'Emaar Beachfront',
        area: 'Downtown Dubai',
        launchDate: 'December 2024',
        units: '3,500+',
        startPrice: 'AED 1.8M',
        preLaunchDiscount: '5-8%',
        amenities: ['Beach access', 'Marina', 'Infinity pools', 'Luxury spas', 'Fine dining'],
        status: 'Pre-Launch',
        contactable: true
      },
      {
        id: 2,
        name: 'Ras Al Khor Gateway Phase 1',
        area: 'Ras Al Khor',
        launchDate: 'February 2025',
        units: '2,800+',
        startPrice: 'AED 950K',
        preLaunchDiscount: '7-10%',
        amenities: ['Shopping mall', 'Parks', 'Schools', 'Healthcare', 'Community center'],
        status: 'Available',
        contactable: true
      },
      {
        id: 3,
        name: 'Arabian Ranches 3',
        area: 'Arabian Ranches',
        launchDate: 'January 2025',
        units: '1,200+',
        startPrice: 'AED 1.2M',
        preLaunchDiscount: '6%',
        amenities: ['Stables', 'Parks', 'Equestrian facilities', 'Community center', 'Retail'],
        status: 'Launch Soon',
        contactable: true
      },
      {
        id: 4,
        name: 'Atlantis The World',
        area: 'Palm Jumeirah',
        launchDate: 'Q1 2025',
        units: '2,000+',
        startPrice: 'AED 2.5M',
        preLaunchDiscount: '10-15%',
        amenities: ['Resort facilities', 'Water park', 'Restaurants', 'Yacht marina', 'Beach clubs'],
        status: 'Pre-Launch',
        contactable: true
      },
      {
        id: 5,
        name: 'Emirates Living Hillside',
        area: 'Emirates Living',
        launchDate: 'March 2025',
        units: '1,800+',
        startPrice: 'AED 1.2M',
        preLaunchDiscount: '5%',
        amenities: ['Panoramic views', 'Parks', 'Schools', 'Retail', 'Community facilities'],
        status: 'Coming Soon',
        contactable: true
      }
    ],
    commercial: [
      {
        id: 6,
        name: 'Business Bay Commercial District Phase 2',
        area: 'Business Bay',
        launchDate: 'Q1 2025',
        units: '1,200 offices',
        startPrice: 'AED 3,500/sqft',
        preLaunchDiscount: '8%',
        amenities: ['Modern offices', 'Retail spaces', 'Hotels', 'Parking', 'Dining'],
        status: 'Available',
        contactable: true
      },
      {
        id: 7,
        name: 'DIFC Financial Hub Expansion',
        area: 'DIFC',
        launchDate: 'Q2 2025',
        units: '500+ offices',
        startPrice: 'AED 5,500/sqft',
        preLaunchDiscount: '7%',
        amenities: ['Premium offices', 'Fine dining', 'Fitness center', 'Concierge', 'Valet'],
        status: 'Pre-Launch',
        contactable: true
      },
      {
        id: 8,
        name: 'Dubai Marina Commercial Hub',
        area: 'Dubai Marina',
        launchDate: 'Q2 2025',
        units: '350 units',
        startPrice: 'AED 4,200/sqft',
        preLaunchDiscount: '6-9%',
        amenities: ['Marina views', 'Retail', 'Restaurants', 'Wellness center', 'Parking'],
        status: 'Launch Soon',
        contactable: true
      }
    ],
    mixed: [
      {
        id: 9,
        name: 'Downtown Dubai Phase 3',
        area: 'Downtown Dubai',
        launchDate: 'January 2025',
        units: '800+ mixed',
        startPrice: 'AED 2.2M',
        preLaunchDiscount: '5-7%',
        amenities: ['Shopping mall', 'Hotels', 'Restaurants', 'Offices', 'Leisure'],
        status: 'Launched',
        contactable: true
      },
      {
        id: 10,
        name: 'Jumeirah Village Circle Expansion',
        area: 'Jumeirah Village Circle',
        launchDate: 'December 2024',
        units: '1,500+ mixed',
        startPrice: 'AED 650K',
        preLaunchDiscount: '8-10%',
        amenities: ['Retail', 'Schools', 'Healthcare', 'Parks', 'Community center'],
        status: 'Available',
        contactable: true
      }
    ]
  }

  const developments = newDevelopments[selectedCategory]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4 font-semibold">
            <SparklesIcon className="w-5 h-5" />
            New Launches & Coming Soon
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Latest <span className="text-emerald-600">Developments</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover Dubai's newest real estate projects with exclusive pre-launch offers, priority booking, and early-bird discounts
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {[
            { id: 'residential', label: 'Residential' },
            { id: 'commercial', label: 'Commercial' },
            { id: 'mixed', label: 'Mixed-Use' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Developments Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {developments.map((dev) => (
            <div
              key={dev.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Status Badge */}
              <div className="relative">
                <div className="p-6 pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 flex-1">{dev.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                      dev.status === 'Launched' ? 'bg-emerald-100 text-emerald-700' :
                      dev.status === 'Available' ? 'bg-blue-100 text-blue-700' :
                      dev.status === 'Pre-Launch' ? 'bg-purple-100 text-purple-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {dev.status}
                    </span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="px-6 py-4 grid grid-cols-2 gap-4 bg-slate-50 border-t border-slate-200">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">LOCATION</p>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" /> {dev.area}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">LAUNCH DATE</p>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" /> {dev.launchDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">UNITS</p>
                    <p className="text-sm font-bold text-slate-900">{dev.units}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">START FROM</p>
                    <p className="text-sm font-bold text-emerald-600">{dev.startPrice}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Discount Banner */}
                {dev.preLaunchDiscount && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <p className="text-xs text-amber-600 font-semibold mb-1">LIMITED TIME OFFER</p>
                    <p className="text-lg font-bold text-amber-700">{dev.preLaunchDiscount} Early Bird Discount</p>
                  </div>
                )}

                {/* Amenities */}
                <div className="mb-6">
                  <p className="text-xs text-slate-600 font-semibold mb-3">KEY FEATURES</p>
                  <div className="flex flex-wrap gap-2">
                    {dev.amenities.slice(0, 4).map((amenity, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                        <CheckCircleIcon className="w-3 h-3" />
                        {amenity}
                      </span>
                    ))}
                    {dev.amenities.length > 4 && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                        +{dev.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-2 pt-4 border-t border-slate-200">
                  <button className="flex-1 px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                    <CheckCircleIcon className="w-5 h-5" />
                    Reserve Now
                  </button>
                  <Link
                    href={`/properties?project=${dev.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Invest in New Developments?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Pre-Launch Discounts',
                description: 'Get exclusive early-bird discounts and payment plans when you reserve during pre-launch phases'
              },
              {
                title: 'Modern Amenities',
                description: 'Brand new facilities, smart home technology, and sustainable building standards'
              },
              {
                title: 'Guaranteed Quality',
                description: 'Built by established developers with warranty coverage and quality assurance'
              },
              {
                title: 'Capital Appreciation',
                description: 'New developments typically appreciate faster as the project completes and matures'
              },
              {
                title: 'Flexible Payment Plans',
                description: 'Developer offers attractive payment plans with minimal upfront investment'
              },
              {
                title: 'Prime Locations',
                description: 'New projects typically launch in high-demand areas with strong growth potential'
              }
            ].map((advantage, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <SparklesIcon className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-slate-900">{advantage.title}</h3>
                </div>
                <p className="text-slate-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Schedule a Site Visit</h2>
          <p className="text-lg mb-8 opacity-90">
            Visit our showrooms or arrange a virtual tour of new developments. Our investment consultants are ready to assist you with personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-colors">
              Book Site Visit
            </button>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
