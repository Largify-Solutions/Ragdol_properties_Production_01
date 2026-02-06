'use client';

import { useState, useEffect } from 'react';
import {
  HomeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

interface Project {
  id: string;
  name: string;
  location: string;
  price: number;
  currency: string;
  beds?: number;
  sqft?: number;
  image?: string;
  status?: string;
  type?: string;
  featured?: boolean;
}

interface SalesData {
  propertyType: string;
  location: string;
  unitsSold: number;
  averagePrice: number;
  totalValue: number;
}

const salesDataTable: SalesData[] = [
  {
    propertyType: 'Residential Apartment',
    location: 'Dubai Marina',
    unitsSold: 12,
    averagePrice: 2100000,
    totalValue: 25200000,
  },
  {
    propertyType: 'Luxury Villa',
    location: 'Palm Jumeirah',
    unitsSold: 5,
    averagePrice: 14500000,
    totalValue: 72500000,
  },
  {
    propertyType: 'Townhouse',
    location: 'Arabian Ranches',
    unitsSold: 7,
    averagePrice: 3800000,
    totalValue: 26600000,
  },
  {
    propertyType: 'Commercial Office',
    location: 'Business Bay',
    unitsSold: 4,
    averagePrice: 5000000,
    totalValue: 20000000,
  },
  {
    propertyType: 'Off-Plan Apartment',
    location: 'JVC',
    unitsSold: 15,
    averagePrice: 950000,
    totalValue: 14250000,
  },
];

const topLocations = [
  {
    name: 'Palm Jumeirah',
    description: 'Continued strong demand for waterfront villas.',
    icon: '🏝️',
  },
  {
    name: 'Dubai Marina',
    description: 'High turnover in luxury apartments for expat investors.',
    icon: '🌊',
  },
  {
    name: 'Jumeirah Village Circle (JVC)',
    description: 'Surge in off-plan property sales due to affordability and investor-friendly payment plans.',
    icon: '🏘️',
  },
];

const buyerDemographics = [
  { segment: 'Local UAE Nationals', percentage: 35 },
  { segment: 'International Buyers (UK, India, Russia, China)', percentage: 55 },
  { segment: 'Corporate Investments', percentage: 10 },
];

const transactionTrends = [
  'Increase in off-plan sales due to flexible post-handover payment plans.',
  'High interest from international investors after new residency reforms.',
  'Strong resale market in established communities like Dubai Marina and Business Bay.',
];

export default function ProjectSalesPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'ongoing' | 'completed'>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/properties?limit=100');
      const data = await response.json();
      // Transform properties to projects format
      const transformedProjects = (data.properties || []).map((prop: any) => ({
        id: prop.id,
        name: prop.title,
        location: prop.location,
        price: prop.price,
        currency: prop.currency,
        beds: prop.beds,
        sqft: prop.sqft,
        image: prop.image,
        status: prop.status || 'ongoing',
        type: prop.type,
        featured: prop.featured,
      }));
      setProjects(transformedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8" style={{ borderBottom: '4px solid #c5a059' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BuildingOffice2Icon className="w-10 h-10" style={{ color: '#c5a059' }} />
            <h1 className="text-4xl font-bold" style={{ color: '#c5a059' }}>Dubai Sales Transactions</h1>
          </div>
          <p className="text-gray-600 text-lg">Examine Dubai's property prices over the years. Discover market trends with our real-time data to help you make your next move.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-700">
            <p className="text-gray-600 text-sm font-medium">Total Transactions</p>
            <p className="text-4xl font-bold text-yellow-700 mt-2">43</p>
            <p className="text-gray-500 text-sm mt-2">Jan 1 - Jun 30, 2025</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-700">
            <p className="text-gray-600 text-sm font-medium">Total Sales Value</p>
            <p className="text-4xl font-bold text-yellow-700 mt-2">158.6M</p>
            <p className="text-gray-500 text-sm mt-2">AED</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-700">
            <p className="text-gray-600 text-sm font-medium">Property Types</p>
            <p className="text-4xl font-bold text-yellow-700 mt-2">5</p>
            <p className="text-gray-500 text-sm mt-2">Diverse portfolio</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-700">
            <p className="text-gray-600 text-sm font-medium">Top Location</p>
            <p className="text-2xl font-bold text-yellow-700 mt-2">Palm Jumeirah</p>
            <p className="text-gray-500 text-sm mt-2">72.5M AED sales</p>
          </div>
        </div>

        {/* Sales Highlights Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 overflow-x-auto border-t-4 border-yellow-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Sales Highlights</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-yellow-200">
                <th className="text-left py-3 px-4 font-semibold text-yellow-700">Property Type</th>
                <th className="text-left py-3 px-4 font-semibold text-yellow-700">Location</th>
                <th className="text-center py-3 px-4 font-semibold text-yellow-700">Units Sold</th>
                <th className="text-right py-3 px-4 font-semibold text-yellow-700">Avg Price (AED)</th>
                <th className="text-right py-3 px-4 font-semibold text-yellow-700">Total Value (AED)</th>
              </tr>
            </thead>
            <tbody>
              {salesDataTable.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-amber-50 transition-colors">
                  <td className="py-4 px-4 text-gray-900 font-medium">{row.propertyType}</td>
                  <td className="py-4 px-4 text-gray-700">{row.location}</td>
                  <td className="py-4 px-4 text-center text-gray-900 font-semibold">{row.unitsSold}</td>
                  <td className="py-4 px-4 text-right text-gray-900">{(row.averagePrice / 1000000).toFixed(2)}M</td>
                  <td className="py-4 px-4 text-right font-semibold text-yellow-700">{(row.totalValue / 1000000).toFixed(2)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}

        {/* Top Performing Locations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topLocations.map((location, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{location.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
                <p className="text-gray-600 leading-relaxed">{location.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Demographics */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-t-4 border-yellow-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <UsersIcon className="w-8 h-8 text-yellow-700" />
            Buyer Demographics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buyerDemographics.map((demo, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="45"
                      fill="none"
                      stroke="#a16207"
                      strokeWidth="8"
                      strokeDasharray={`${(demo.percentage / 100) * 283} 283`}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-3xl font-bold text-yellow-700">{demo.percentage}%</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mt-4">{demo.segment}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Trends */}
        <div className="bg-linear-to-r from-yellow-50 to-yellow-100 rounded-xl p-8 mb-12 border-l-4 border-yellow-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ArrowTrendingUpIcon className="w-8 h-8 text-yellow-700" />
            Transaction Trends
          </h2>
          <div className="space-y-4">
            {transactionTrends.map((trend, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-700 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-t-4 border-yellow-700">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Summary</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ragdol Properties Dubai continues to grow its market presence by offering reliable services, premium listings, and client-focused investment solutions. With the evolving real estate landscape in Dubai, the company is positioned to capture further growth in the coming quarters.
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Reporting Period:</strong> January 1, 2025 – June 30, 2025<br />
            <strong>Location:</strong> Dubai, United Arab Emirates<br />
            <strong>Company:</strong> Ragdol Properties Dubai
          </p>
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = project.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';
  const statusLabel = project.status === 'ongoing' ? 'Ongoing' : 'Completed';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-300 to-gray-400">
            <BuildingOffice2Icon className="w-16 h-16 text-gray-500 opacity-50" />
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-yellow-700">
          {project.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 shrink-0" />
          {project.location}
        </p>

        {/* Price */}
        <div className="bg-linear-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-600 mb-1">Starting Price</p>
          <p className="text-2xl font-bold text-yellow-700">
            {(project.price / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-gray-500">{project.currency}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {project.beds && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600">Units</p>
              <p className="text-lg font-bold text-gray-900">{project.beds}+</p>
            </div>
          )}
          {project.sqft && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600">Size</p>
              <p className="text-sm font-bold text-gray-900">{project.sqft} sqft</p>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className={`${statusColor} text-sm font-medium py-2 px-3 rounded-lg text-center mb-4`}>
          {statusLabel}
        </div>

        {/* CTA Button */}
        <button className="w-full bg-yellow-700 text-white font-semibold py-2 rounded-lg hover:bg-yellow-800 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}
