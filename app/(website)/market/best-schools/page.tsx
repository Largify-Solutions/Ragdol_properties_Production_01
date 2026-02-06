'use client';

import { useState } from 'react';
import {
  AcademicCapIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface School {
  name: string;
  location: string;
  studentCount: string;
  curriculum: string;
  rating: number;
}

const bestSchools: School[] = [
  { name: 'GEMS Wellington International School', location: 'Jumeirah', studentCount: '2,800+', curriculum: 'British', rating: 4.8 },
  { name: 'Dubai College', location: 'Al Barsha', studentCount: '1,600+', curriculum: 'British', rating: 4.7 },
  { name: 'Al Khaleej National School', location: 'Al Manara', studentCount: '3,200+', curriculum: 'Arab National', rating: 4.6 },
  { name: 'Emirates International School', location: 'Dubai Hills', studentCount: '1,400+', curriculum: 'International Baccalaureate', rating: 4.8 },
  { name: 'JESS - Jumeirah English Speaking School', location: 'Jumeirah', studentCount: '1,200+', curriculum: 'British', rating: 4.7 },
  { name: 'Al Noor Training Centre', location: 'Bur Dubai', studentCount: '2,400+', curriculum: 'Arab Islamic', rating: 4.5 },
  { name: 'Sunmarke School', location: 'Meadows', studentCount: '1,100+', curriculum: 'International', rating: 4.6 },
  { name: 'Universal American School', location: 'DIP', studentCount: '1,300+', curriculum: 'American', rating: 4.7 },
  { name: 'Repton School Dubai', location: 'Al Barsha', studentCount: '1,500+', curriculum: 'British', rating: 4.6 },
  { name: 'Pristine Private School', location: 'Al Quoz', studentCount: '900+', curriculum: 'International', rating: 4.5 },
];

const curriculumTypes = [
  { type: 'British', percentage: 35, schools: 52 },
  { type: 'International Baccalaureate (IB)', percentage: 25, schools: 38 },
  { type: 'American', percentage: 20, schools: 30 },
  { type: 'Arab National', percentage: 15, schools: 22 },
  { type: 'Other', percentage: 5, schools: 8 },
];

export default function BestSchoolsPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';
  const [selectedCurriculum, setSelectedCurriculum] = useState('All');

  const filteredSchools = selectedCurriculum === 'All'
    ? bestSchools
    : bestSchools.filter(s => s.curriculum.includes(selectedCurriculum));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AcademicCapIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Best Schools in Dubai</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Discover top-rated schools and educational institutions in Dubai
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Education in Dubai</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Discover top-rated schools and educational institutions in Dubai. With over 150 schools offering various curricula, Dubai provides excellent education options for families. School quality and proximity significantly impact residential property values and appeal to expatriate families.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Schools</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>150+</p>
                </div>
                <AcademicCapIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Across Dubai</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Students Enrolled</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>450K+</p>
                </div>
                <UserGroupIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Across all schools</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Rating</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>4.6</p>
                </div>
                <StarIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Top schools</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Curricula Types</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>5</p>
                </div>
                <MapPinIcon className="w-10 h-10" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Different options</p>
            </div>
          </div>
        </section>

        {/* Filter by Curriculum */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {['All', 'British', 'American', 'International Baccalaureate', 'Arab National'].map((curriculum) => (
              <button
                key={curriculum}
                onClick={() => setSelectedCurriculum(curriculum)}
                style={{
                  backgroundColor: selectedCurriculum === curriculum ? goldColor : lightGold,
                  color: selectedCurriculum === curriculum ? 'white' : goldColor,
                }}
                className="px-4 py-2 rounded-lg font-semibold transition-all text-sm"
              >
                {curriculum}
              </button>
            ))}
          </div>
        </section>

        {/* Best Schools List */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top-Rated Schools in Dubai</h2>
          <div className="space-y-4">
            {filteredSchools.map((school, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                style={{ borderLeft: `4px solid ${goldColor}` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{school.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1 mb-3">
                      <MapPinIcon className="w-4 h-4" />
                      {school.location}
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <span className="font-semibold">Curriculum:</span> {school.curriculum}
                      </p>
                      <p>
                        <span className="font-semibold">Student Count:</span> {school.studentCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="text-center">
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mb-3"
                        style={{ backgroundColor: lightGold }}
                      >
                        <div className="text-center">
                          <p className="text-3xl font-bold" style={{ color: goldColor }}>
                            {school.rating}
                          </p>
                          <p className="text-xs text-gray-600">Rating</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-4 h-4"
                            style={{
                              fill: i < Math.floor(school.rating) ? goldColor : '#d1d5db',
                              color: i < Math.floor(school.rating) ? goldColor : '#d1d5db',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum Distribution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Curriculum Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Curriculum Types</h3>
              <div className="space-y-4">
                {curriculumTypes.map((item, index) => (
                  <div key={index} className="pb-4 border-b" style={{ borderColor: lightGold }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{item.type}</p>
                      <span
                        className="text-sm font-bold px-3 py-1 rounded-full"
                        style={{ backgroundColor: lightGold, color: goldColor }}
                      >
                        {item.schools} schools
                      </span>
                    </div>
                    <p className="text-lg font-bold" style={{ color: goldColor }}>
                      {item.percentage}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Curriculum Breakdown</h3>
              <div className="space-y-4">
                {curriculumTypes.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-700">{item.type}</p>
                      <p className="text-sm font-bold" style={{ color: goldColor }}>
                        {item.percentage}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
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

        {/* School Selection Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Choosing the Right School</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Academic Excellence',
                tips: ['Check school rankings and ratings', 'Review exam results and university placements', 'Consider curriculum options for your family'],
              },
              {
                title: 'Location & Access',
                tips: ['Proximity to residential areas', 'Transportation facilities available', 'School location impacts property value'],
              },
              {
                title: 'Facilities & Programs',
                tips: ['State-of-the-art sports facilities', 'Diverse extracurricular activities', 'Technology and innovation programs'],
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Properties Near Top Schools</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Invest in areas with excellent schools. Properties near top-rated schools offer better rental yields and appreciation potential.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            Explore School Area Properties
          </button>
        </section>
      </div>
    </div>
  );
}
