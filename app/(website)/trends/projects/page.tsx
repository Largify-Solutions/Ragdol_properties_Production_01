'use client'

import Link from 'next/link'
import { BuildingOffice2Icon, MapPinIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function ProjectsPage() {
  const projects = [
    {
      name: 'Emaar Beachfront',
      developer: 'Emaar Properties',
      area: 'Downtown Dubai',
      status: 'Ongoing',
      units: '3,500+',
      price: 'AED 1.8M - 8.5M',
      completion: '2026',
      description: 'Waterfront residential development with beach access'
    },
    {
      name: 'Atlantis The World',
      developer: 'Emaar Properties',
      area: 'Palm Jumeirah',
      status: 'Upcoming',
      units: '2,000+',
      price: 'AED 2.5M - 12M',
      completion: '2028',
      description: 'Luxury mixed-use island development with integrated resort'
    },
    {
      name: 'Arabian Ranches 3',
      developer: 'Emaar Properties',
      area: 'Arabian Ranches',
      status: 'Ongoing',
      units: '1,200+',
      price: 'AED 1.2M - 3.5M',
      completion: '2026',
      description: 'Gated villa community with equestrian facilities'
    },
    {
      name: 'Ras Al Khor Gateway',
      developer: 'Azizi Developments',
      area: 'Ras Al Khor',
      status: 'Upcoming',
      units: '2,800+',
      price: 'AED 950K - 2.8M',
      completion: '2027',
      description: 'Mixed-use development with residential, retail, and office'
    },
    {
      name: 'Jumeirah Village Circle Expansion',
      developer: 'Azizi Developments',
      area: 'Jumeirah Village Circle',
      status: 'Ongoing',
      units: '1,500+',
      price: 'AED 650K - 1.8M',
      completion: '2025',
      description: 'Affordable residential community for students and young professionals'
    },
    {
      name: 'Dubai Marina Heights',
      developer: 'Damac Properties',
      area: 'Dubai Marina',
      status: 'Ongoing',
      units: '650+',
      price: 'AED 2.8M - 7M',
      completion: '2025',
      description: 'Luxury tower with premium residences and waterfront promenade'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Featured <span className="text-emerald-600">Projects</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore Dubai's most exciting real estate development projects with investment opportunities
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-slate-600">{project.developer}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-slate-700 text-sm mb-4">{project.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPinIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700">{project.area}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BuildingOffice2Icon className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700">{project.units}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700">{project.completion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CurrencyDollarIcon className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">{project.price.split('-')[0]}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/properties?project=${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-center text-sm"
                  >
                    View Properties
                  </Link>
                  <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors text-sm">
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Statistics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Project Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-emerald-600 mb-2">12</p>
              <p className="text-slate-700 font-semibold">Major Projects</p>
              <p className="text-xs text-slate-600 mt-2">Featured & tracked</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">18.5K+</p>
              <p className="text-slate-700 font-semibold">Total Units</p>
              <p className="text-xs text-slate-600 mt-2">Across projects</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">AED 52B+</p>
              <p className="text-slate-700 font-semibold">Investment Value</p>
              <p className="text-xs text-slate-600 mt-2">Total projects</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-amber-600 mb-2">2025-28</p>
              <p className="text-slate-700 font-semibold">Completion Range</p>
              <p className="text-xs text-slate-600 mt-2">Next 2-4 years</p>
            </div>
          </div>
        </div>

        {/* Developer Spotlight */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Top Developers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Emaar Properties', projects: 5, focus: 'Premium developments' },
              { name: 'Damac Properties', projects: 4, focus: 'Luxury residential' },
              { name: 'Azizi Developments', projects: 3, focus: 'Affordable & emerging' }
            ].map((dev, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{dev.name}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Active Projects</span>
                    <span className="font-bold text-slate-900">{dev.projects}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Focus Area</span>
                    <span className="font-bold text-slate-900 text-right">{dev.focus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Find Your Investment Project</h2>
          <p className="text-lg mb-8 opacity-90">
            Browse all projects and connect with developers for pre-launch offers and exclusive opportunities
          </p>
          <Link
            href="/trends/dubai-projects-map"
            className="inline-block px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Explore All Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
