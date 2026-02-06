'use client';

import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PropertyComparison {
  id: string;
  title: string;
  price: number;
  incomeGenerating: number;
  capitalAppreciation: number;
  overallScore: number;
  type?: string;
}

interface PropertyComparisonProps {
  properties: PropertyComparison[];
}

export function PropertyComparison({ properties: allProperties }: PropertyComparisonProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const toggleProperty = (propertyId: string) => {
    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties(selectedProperties.filter(id => id !== propertyId));
    } else {
      if (selectedProperties.length < 4) {
        setSelectedProperties([...selectedProperties, propertyId]);
      }
    }
  };

  const comparisonProperties = allProperties.filter(p =>
    selectedProperties.includes(p.id)
  );

  const avgMetrics = {
    price: comparisonProperties.length > 0
      ? Math.round(comparisonProperties.reduce((sum, p) => sum + p.price, 0) / comparisonProperties.length)
      : 0,
    yield: comparisonProperties.length > 0
      ? Math.round(comparisonProperties.reduce((sum, p) => sum + p.incomeGenerating, 0) / comparisonProperties.length * 100) / 100
      : 0,
    appreciation: comparisonProperties.length > 0
      ? Math.round(comparisonProperties.reduce((sum, p) => sum + p.capitalAppreciation, 0) / comparisonProperties.length * 100) / 100
      : 0,
    score: comparisonProperties.length > 0
      ? Math.round(comparisonProperties.reduce((sum, p) => sum + p.overallScore, 0) / comparisonProperties.length)
      : 0,
  };

  if (selectedProperties.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-600 shadow-2xl max-h-96 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Comparing {selectedProperties.length} Properties
          </h3>
          <button
            onClick={() => setSelectedProperties([])}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {comparisonProperties.map(prop => (
            <div key={prop.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="font-semibold text-gray-900 text-sm line-clamp-2 mb-3">{prop.title}</p>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600 text-xs">Price</p>
                  <p className="font-bold text-lg text-gray-900">{(prop.price / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Score</p>
                  <p className="font-bold text-blue-600">{prop.overallScore}/100</p>
                </div>
              </div>
              <button
                onClick={() => toggleProperty(prop.id)}
                className="mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          {comparisonProperties.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
              <p className="font-semibold text-gray-900 text-sm mb-3">Average</p>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600 text-xs">Avg Price</p>
                  <p className="font-bold text-lg text-gray-900">{(avgMetrics.price / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Avg Score</p>
                  <p className="font-bold text-green-600">{avgMetrics.score}/100</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {comparisonProperties.length > 0 && (
          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-2">Avg Yield</p>
              <p className="text-2xl font-bold text-green-600">{avgMetrics.yield}%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-2">Avg Appreciation</p>
              <p className="text-2xl font-bold text-orange-600">{avgMetrics.appreciation}%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-2">Best Score</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.max(...comparisonProperties.map(p => p.overallScore))}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-2">Highest Yield</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.max(...comparisonProperties.map(p => p.incomeGenerating))}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
