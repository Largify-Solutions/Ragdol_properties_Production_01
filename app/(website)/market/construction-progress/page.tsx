'use client';

import { useState } from 'react';
import {
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

interface Project {
  name: string;
  location: string;
  progress: number;
  expectedCompletion: string;
  units: number;
}

const activeProjects: Project[] = [
  { name: 'Emaar Beachfront', location: 'Palm Jumeirah', progress: 78, expectedCompletion: 'Q4 2026', units: 450 },
  { name: 'DAMAC Lagoon', location: 'Dubai Hills', progress: 65, expectedCompletion: 'Q2 2027', units: 580 },
  { name: 'AZIZI Riviera Extension', location: 'Meydan', progress: 82, expectedCompletion: 'Q3 2026', units: 320 },
  { name: 'Omniyat Tower', location: 'Downtown', progress: 56, expectedCompletion: 'Q1 2027', units: 280 },
  { name: 'Binghatti Residences', location: 'Dubai Sports City', progress: 71, expectedCompletion: 'Q4 2026', units: 420 },
  { name: 'MAG 5 Boulevard', location: 'Arabian Ranches', progress: 88, expectedCompletion: 'Q3 2026', units: 350 },
  { name: 'Jumeirah Central', location: 'Dubai Hills', progress: 62, expectedCompletion: 'Q2 2027', units: 610 },
  { name: 'LIV Apartments', location: 'Meydan', progress: 75, expectedCompletion: 'Q1 2027', units: 380 },
  { name: 'Azura Residence', location: 'Dubai Marina', progress: 69, expectedCompletion: 'Q4 2026', units: 290 },
  { name: 'Dar Al Baraka', location: 'Jumeirah', progress: 81, expectedCompletion: 'Q3 2026', units: 160 },
];

export default function ConstructionProgressPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';
  const [filterProgress, setFilterProgress] = useState('all');

  const filteredProjects = activeProjects.filter(project => {
    if (filterProgress === 'early') return project.progress < 50;
    if (filterProgress === 'mid') return project.progress >= 50 && project.progress < 75;
    if (filterProgress === 'late') return project.progress >= 75;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <WrenchScrewdriverIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Construction Progress Report</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Monitor ongoing construction projects and development progress across Dubai
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Development Projects</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              View ongoing construction projects and development progress. Track project stages from early construction to near-completion, including location, expected delivery dates, and unit counts to plan your real estate investments accordingly.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Projects</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>200+</p>
                </div>
                <BuildingOffice2Icon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Under Construction</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Progress</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>72%</p>
                </div>
                <ArrowTrendingUpIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Completion Rate</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Units in Pipeline</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>45K+</p>
                </div>
                <CheckCircleIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Being Developed</p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3">
            {['all', 'early', 'mid', 'late'].map((option) => (
              <button
                key={option}
                onClick={() => setFilterProgress(option)}
                style={{
                  backgroundColor: filterProgress === option ? goldColor : lightGold,
                  color: filterProgress === option ? 'white' : goldColor,
                }}
                className="px-6 py-2 rounded-lg font-semibold transition-all"
              >
                {option === 'all' ? 'All Projects' : option === 'early' ? 'Early Stage (0-50%)' : option === 'mid' ? 'Mid Stage (50-75%)' : 'Late Stage (75%+)'}
              </button>
            ))}
          </div>
        </section>

        {/* Projects List */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Project Details</h2>
          <div className="space-y-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderLeft: `4px solid ${goldColor}` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Project Name</p>
                    <p className="text-xl font-bold text-gray-900">{project.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Location</p>
                    <p className="text-xl font-bold text-gray-900">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Units</p>
                    <p className="text-xl font-bold" style={{ color: goldColor }}>{project.units} units</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-600 font-semibold">Construction Progress</p>
                      <p className="text-2xl font-bold" style={{ color: goldColor }}>{project.progress}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ width: `${project.progress}%`, backgroundColor: goldColor }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Expected Completion</p>
                    <p className="text-lg font-bold text-gray-900">{project.expectedCompletion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Monitor Your Investment</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Stay updated on construction progress, anticipated handover dates, and project milestones to plan your property investments effectively.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            View All Projects
          </button>
        </section>
      </div>
    </div>
  );
}
