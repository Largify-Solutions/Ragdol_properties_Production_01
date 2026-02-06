'use client';

import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  HomeIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import { InvestmentTipsSection } from '@/components/property/InvestmentTipsSection';

interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  image?: string;
  location: string;
  type?: string;
  beds?: number;
  sqft?: number;
  featured?: boolean;
}

interface PropertyAnalysis extends Property {
  moneyValue: number;
  incomeGenerating: number; // Rental yield %
  capitalAppreciation: number; // Expected % per year
  overallScore: number; // 0-100
}

export default function DubaiRealEstateInvestmentAnalysis() {
  const [properties, setProperties] = useState<PropertyAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'yield' | 'appreciation'>('score');
  const [filterType, setFilterType] = useState<'all' | 'villa' | 'apartment' | 'townhouse'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAndAnalyzeProperties();
  }, []);

  const fetchAndAnalyzeProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/properties?limit=50');
      const data = await response.json();

      // Calculate investment metrics for each property
      const analyzed = (data.properties || []).map((prop: Property) => {
        // Calculate Money Value (normalized price value)
        const moneyValue = Math.round((prop.price / 1000000) * 100) / 100;

        // Calculate Income Generating (Rental Yield %)
        // Average Dubai rental yield: 3-5% depending on location
        const baseYield = 3.5;
        const locationBonus = prop.location?.includes('Marina') ? 0.8 : 
                             prop.location?.includes('Downtown') ? 0.6 :
                             prop.location?.includes('Hills') ? 0.5 : 0;
        const incomeGenerating = baseYield + locationBonus;

        // Calculate Capital Appreciation (Expected yearly %)
        const baseAppreciation = 4;
        const typeBonus = prop.type === 'villa' ? 1 : prop.type === 'apartment' ? 0.5 : 0.3;
        const priceBonus = prop.price > 10000000 ? 0.8 : prop.price > 5000000 ? 0.5 : 0;
        const capitalAppreciation = baseAppreciation + typeBonus + priceBonus;

        // Calculate Overall Score (0-100)
        const yieldScore = Math.min((incomeGenerating / 5) * 25, 25);
        const appreciationScore = Math.min((capitalAppreciation / 6) * 25, 25);
        const priceValueScore = Math.min((1 - (prop.price / 100000000)) * 25 + 12.5, 25);
        const marketDemandScore = (prop.featured ? 10 : 5) + (prop.type === 'villa' ? 10 : 5);
        
        const overallScore = Math.round(yieldScore + appreciationScore + priceValueScore + marketDemandScore);

        return {
          ...prop,
          moneyValue,
          incomeGenerating: Math.round(incomeGenerating * 100) / 100,
          capitalAppreciation: Math.round(capitalAppreciation * 100) / 100,
          overallScore: Math.min(100, overallScore),
        };
      });

      setProperties(analyzed);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSortedAndFiltered = () => {
    let sorted = [...properties];

    // Filter by type
    if (filterType !== 'all') {
      sorted = sorted.filter(p => p.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      sorted = sorted.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.overallScore - a.overallScore;
        case 'price':
          return a.price - b.price;
        case 'yield':
          return b.incomeGenerating - a.incomeGenerating;
        case 'appreciation':
          return b.capitalAppreciation - a.capitalAppreciation;
        default:
          return 0;
      }
    });

    return sorted;
  };

  const displayProperties = getSortedAndFiltered();

  // Calculate summary stats
  const avgScore = properties.length > 0
    ? Math.round(properties.reduce((sum, p) => sum + p.overallScore, 0) / properties.length)
    : 0;

  const avgYield = properties.length > 0
    ? Math.round(properties.reduce((sum, p) => sum + p.incomeGenerating, 0) / properties.length * 100) / 100
    : 0;

  const avgAppreciation = properties.length > 0
    ? Math.round(properties.reduce((sum, p) => sum + p.capitalAppreciation, 0) / properties.length * 100) / 100
    : 0;

  const totalInvestment = properties.length > 0
    ? Math.round(properties.reduce((sum, p) => sum + p.price, 0))
    : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <ChartBarIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Dubai Real Estate Investment Analysis</h1>
          </div>
          <p className="text-blue-100 text-lg">Real-time property metrics for informed investment decisions</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Properties */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
              </div>
              <HomeIcon className="w-12 h-12 text-blue-500 opacity-30" />
            </div>
          </div>

          {/* Average Investment Score */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Investment Score</p>
                <p className="text-3xl font-bold text-gray-900">{avgScore}/100</p>
              </div>
              <StarIcon className="w-12 h-12 text-purple-500 opacity-30" />
            </div>
          </div>

          {/* Average Rental Yield */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Rental Yield</p>
                <p className="text-3xl font-bold text-gray-900">{avgYield}%</p>
              </div>
              <CurrencyDollarIcon className="w-12 h-12 text-green-500 opacity-30" />
            </div>
          </div>

          {/* Average Capital Appreciation */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Capital Appreciation</p>
                <p className="text-3xl font-bold text-gray-900">{avgAppreciation}%</p>
              </div>
              <span className="text-4xl">📈</span>
            </div>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by property name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Filter & Sort:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="villa">Villas</option>
                  <option value="apartment">Apartments</option>
                  <option value="townhouse">Townhouses</option>
                </select>

                {/* Sort Option */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="score">Sort by Investment Score</option>
                  <option value="price">Sort by Price (Low to High)</option>
                  <option value="yield">Sort by Rental Yield</option>
                  <option value="appreciation">Sort by Capital Appreciation</option>
                </select>
              </div>

              <p className="text-sm text-gray-500">
                Showing {displayProperties.length} of {properties.length}
              </p>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading investment properties...</p>
          </div>
        ) : displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property) => (
              <PropertyInvestmentCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Investment Tips Section */}
      <InvestmentTipsSection />
    </div>
  );
}

interface PropertyInvestmentCardProps {
  property: PropertyAnalysis;
}

function PropertyInvestmentCard({ property }: PropertyInvestmentCardProps) {
  const scoreColor = property.overallScore >= 80 ? 'text-green-600' :
                    property.overallScore >= 60 ? 'text-blue-600' :
                    property.overallScore >= 40 ? 'text-yellow-600' : 'text-red-600';

  const scoreBackground = property.overallScore >= 80 ? 'bg-green-50 border-green-200' :
                         property.overallScore >= 60 ? 'bg-blue-50 border-blue-200' :
                         property.overallScore >= 40 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-40 bg-gray-200 overflow-hidden">
        {property.image ? (
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-300 to-gray-400">
            <HomeIcon className="w-16 h-16 text-gray-500 opacity-50" />
          </div>
        )}
        {property.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <SparklesIcon className="w-4 h-4" />
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-1">📍 {property.location}</p>

        {/* Overall Score Badge */}
        <div className={`mb-4 p-3 rounded-lg border ${scoreBackground}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-gray-700">Investment Score</span>
            <StarSolidIcon className={`w-5 h-5 ${scoreColor}`} />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-300 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  property.overallScore >= 80 ? 'bg-green-500' :
                  property.overallScore >= 60 ? 'bg-blue-500' :
                  property.overallScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${property.overallScore}%` }}
              />
            </div>
            <span className={`text-lg font-bold ${scoreColor}`}>
              {property.overallScore}
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Money Value */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-xs text-gray-600 font-medium">Money Value</p>
            <p className="text-xl font-bold text-blue-600">{property.moneyValue}M</p>
            <p className="text-xs text-gray-500">AED</p>
          </div>

          {/* Income Generating */}
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-gray-600 font-medium">Rental Yield</p>
            <p className="text-xl font-bold text-green-600">{property.incomeGenerating}%</p>
            <p className="text-xs text-gray-500">Per Year</p>
          </div>

          {/* Capital Appreciation */}
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <p className="text-xs text-gray-600 font-medium">Appreciation</p>
            <div className="flex items-center gap-1">
              <p className="text-xl font-bold text-orange-600">{property.capitalAppreciation}%</p>
              <span>📈</span>
            </div>
            <p className="text-xs text-gray-500">Expected/Year</p>
          </div>

          {/* Property Details */}
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <p className="text-xs text-gray-600 font-medium">Property</p>
            <p className="text-lg font-bold text-purple-600 capitalize">{property.type || 'Property'}</p>
            {property.beds && <p className="text-xs text-gray-500">{property.beds} beds</p>}
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-4">
          <p className="text-xs text-gray-600 font-medium mb-1">Listed Price</p>
          <p className="text-2xl font-bold text-gray-900">
            {(property.price / 1000000).toFixed(1)}M
            <span className="text-lg text-gray-600 ml-1">{property.currency}</span>
          </p>
        </div>

        {/* View Details Button */}
        <button className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
          View Investment Details
        </button>
      </div>
    </div>
  );
}
