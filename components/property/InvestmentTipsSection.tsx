'use client';

import React from 'react';
import {
  LightBulbIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export function InvestmentTipsSection() {
  const tips = [
    {
      title: 'Score Above 70',
      description: 'Look for properties with investment scores above 70 for reliable returns.',
      icon: LightBulbIcon,
      color: 'blue',
    },
    {
      title: 'Rental Yield 4%+',
      description: 'Properties with 4% or higher annual rental yield provide steady income.',
      icon: ArrowTrendingUpIcon,
      color: 'green',
    },
    {
      title: 'Location Matters',
      description: 'Downtown and Marina properties typically have higher appreciation rates.',
      icon: ShieldCheckIcon,
      color: 'purple',
    },
    {
      title: 'Long-term Growth',
      description: 'Capital appreciation is typically 5-6% annually in premium Dubai locations.',
      icon: CheckCircleIcon,
      color: 'orange',
    },
  ];

  const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Investment Tips</h2>
        <p className="text-gray-600">Smart strategies for Dubai real estate investing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          const colors = colorClasses[tip.color];

          return (
            <div
              key={index}
              className={`${colors.bg} border ${colors.border} rounded-xl p-6 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-8 h-8 ${colors.icon}`} />
                <h3 className="font-bold text-gray-900">{tip.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4">Dubai Real Estate Market Outlook</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-2">Average Annual Appreciation</p>
            <p className="text-4xl font-bold">4-6%</p>
            <p className="text-blue-100 text-sm mt-2">Varies by location and property type</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm font-medium mb-2">Average Rental Yield</p>
            <p className="text-4xl font-bold">3-5%</p>
            <p className="text-blue-100 text-sm mt-2">Strong rental market growth</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm font-medium mb-2">Best Investment Areas</p>
            <p className="text-lg font-bold">Marina • Downtown</p>
            <p className="text-blue-100 text-sm mt-2">Emirates Hills • Palm Jumeirah</p>
          </div>
        </div>
      </div>
    </section>
  );
}
