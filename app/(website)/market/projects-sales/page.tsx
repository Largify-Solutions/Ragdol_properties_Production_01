'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
const FALLBACK_IMG =
  'https://images.pexels.com/photos/1396134/pexels-photo-1396134.jpeg?auto=compress&cs=tinysrgb&w=900';

const formatAedShort = (value: number) => {
  if (value >= 1_000_000_000) return `AED ${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `AED ${(value / 1_000).toFixed(1)}K`;
  return `AED ${value.toLocaleString()}`;
};

const normalizeLocation = (prop: any) =>
  prop.location || prop.address || prop.area || prop.city || 'Dubai';

const normalizeType = (prop: any) => prop.type || prop.category || 'Property';

const normalizeStatus = (prop: any) => {
  const status = (prop.status || prop.property_status || '').toLowerCase();
  if (status.includes('complete') || status.includes('sold')) return 'completed';
  return 'ongoing';
};

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
        name: prop.title || prop.name || 'Untitled Property',
        location: normalizeLocation(prop),
        price: prop.price || 0,
        currency: prop.currency || 'AED',
        beds: prop.beds || prop.bedrooms || undefined,
        sqft: prop.sqft || prop.built_up_area || undefined,
        image: prop.image || prop.image_url || (Array.isArray(prop.images) ? prop.images[0] : undefined) || FALLBACK_IMG,
        status: normalizeStatus(prop),
        type: normalizeType(prop),
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

  const summary = useMemo(() => {
    const totalListings = projects.length;
    const totalValue = projects.reduce((sum, p) => sum + (p.price || 0), 0);
    const avgPrice = totalListings ? totalValue / totalListings : 0;

    const typeSet = new Set(projects.map(p => p.type || 'Property'));

    const locationAgg = new Map<string, { count: number; totalValue: number }>();
    projects.forEach(p => {
      const key = p.location || 'Dubai';
      const entry = locationAgg.get(key) || { count: 0, totalValue: 0 };
      entry.count += 1;
      entry.totalValue += p.price || 0;
      locationAgg.set(key, entry);
    });

    let topLocation = 'Dubai';
    let topLocationValue = 0;
    locationAgg.forEach((value, key) => {
      if (value.totalValue > topLocationValue) {
        topLocationValue = value.totalValue;
        topLocation = key;
      }
    });

    return {
      totalListings,
      totalValue,
      avgPrice,
      typeCount: typeSet.size,
      topLocation,
      topLocationValue,
    };
  }, [projects]);

  const salesDataTable = useMemo<SalesData[]>(() => {
    if (!projects.length) return [];

    const groupMap = new Map<string, SalesData>();
    projects.forEach((p) => {
      const propertyType = p.type || 'Property';
      const location = p.location || 'Dubai';
      const key = `${propertyType}__${location}`;
      const entry = groupMap.get(key) || {
        propertyType,
        location,
        unitsSold: 0,
        averagePrice: 0,
        totalValue: 0,
      };

      entry.unitsSold += 1;
      entry.totalValue += p.price || 0;
      groupMap.set(key, entry);
    });

    const rows = Array.from(groupMap.values()).map((row) => ({
      ...row,
      averagePrice: row.unitsSold ? row.totalValue / row.unitsSold : 0,
    }));

    return rows.sort((a, b) => b.totalValue - a.totalValue).slice(0, 6);
  }, [projects]);

  const topLocations = useMemo(() => {
    if (!projects.length) return [];

    const agg = new Map<string, { count: number; totalValue: number }>();
    projects.forEach((p) => {
      const key = p.location || 'Dubai';
      const entry = agg.get(key) || { count: 0, totalValue: 0 };
      entry.count += 1;
      entry.totalValue += p.price || 0;
      agg.set(key, entry);
    });

    const icons = ['📍', '🏝️', '🏙️'];
    return Array.from(agg.entries())
      .sort((a, b) => b[1].totalValue - a[1].totalValue)
      .slice(0, 3)
      .map(([name, data], idx) => ({
        name,
        icon: icons[idx % icons.length],
        description: `${formatAedShort(data.totalValue)} across ${data.count} listings`,
      }));
  }, [projects]);

  const propertyMix = useMemo(() => {
    if (!projects.length) return [];

    const typeAgg = new Map<string, number>();
    projects.forEach((p) => {
      const key = p.type || 'Property';
      typeAgg.set(key, (typeAgg.get(key) || 0) + 1);
    });

    const total = projects.length || 1;
    return Array.from(typeAgg.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([segment, count]) => ({
        segment,
        percentage: Math.round((count / total) * 100),
      }));
  }, [projects]);

  const transactionTrends = useMemo(() => {
    if (!projects.length) return [];

    const highestPrice = projects.reduce((max, p) => Math.max(max, p.price || 0), 0);
    const avgListing = summary.avgPrice;
    const topType = propertyMix[0]?.segment || 'Property';
    const topLocation = summary.topLocation || 'Dubai';

    return [
      `Top listing value in ${topLocation} with ${formatAedShort(summary.topLocationValue)} total value.`,
      `Average listing price is ${formatAedShort(avgListing)} across active properties.`,
      `Most common property type is ${topType} with peak listing at ${formatAedShort(highestPrice)}.`,
    ];
  }, [projects, propertyMix, summary]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8" style={{ borderBottom: '4px solid #c5a059' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BuildingOffice2Icon className="w-10 h-10" style={{ color: '#c5a059' }} />
            <h1 className="text-4xl font-bold" style={{ color: '#c5a059' }}>Dubai Sales Transactions</h1>
          </div>
          <p className="text-gray-600 text-lg">Explore live listings and pricing snapshots generated from current properties in Dubai.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#FFC636]">
            <p className="text-gray-600 text-sm font-medium">Total Listings</p>
            <p className="text-4xl font-bold text-[#FFC636] mt-2">{summary.totalListings}</p>
            <p className="text-gray-500 text-sm mt-2">Live inventory</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#FFC636]">
            <p className="text-gray-600 text-sm font-medium">Total Listing Value</p>
            <p className="text-4xl font-bold text-[#FFC636] mt-2">{formatAedShort(summary.totalValue)}</p>
            <p className="text-gray-500 text-sm mt-2">AED</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#FFC636]">
            <p className="text-gray-600 text-sm font-medium">Property Types</p>
            <p className="text-4xl font-bold text-[#FFC636] mt-2">{summary.typeCount}</p>
            <p className="text-gray-500 text-sm mt-2">Active listings mix</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#FFC636]">
            <p className="text-gray-600 text-sm font-medium">Top Location</p>
            <p className="text-2xl font-bold text-[#FFC636] mt-2">{summary.topLocation}</p>
            <p className="text-gray-500 text-sm mt-2">{formatAedShort(summary.topLocationValue)} listings</p>
          </div>
        </div>

        {/* Sales Highlights Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 overflow-x-auto border-t-4 border-[#FFC636]">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Sales Highlights (Live Listings)</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#FFC636]/30">
                <th className="text-left py-3 px-4 font-semibold text-[#FFC636]">Property Type</th>
                <th className="text-left py-3 px-4 font-semibold text-[#FFC636]">Location</th>
                <th className="text-center py-3 px-4 font-semibold text-[#FFC636]">Listings</th>
                <th className="text-right py-3 px-4 font-semibold text-[#FFC636]">Avg Price</th>
                <th className="text-right py-3 px-4 font-semibold text-[#FFC636]">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {salesDataTable.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-amber-50 transition-colors">
                  <td className="py-4 px-4 text-gray-900 font-medium">{row.propertyType}</td>
                  <td className="py-4 px-4 text-gray-700">{row.location}</td>
                  <td className="py-4 px-4 text-center text-gray-900 font-semibold">{row.unitsSold}</td>
                  <td className="py-4 px-4 text-right text-gray-900">{formatAedShort(row.averagePrice)}</td>
                  <td className="py-4 px-4 text-right font-semibold text-[#FFC636]">{formatAedShort(row.totalValue)}</td>
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
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#FFC636] hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{location.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
                <p className="text-gray-600 leading-relaxed">{location.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Demographics */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-t-4 border-[#FFC636]">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <UsersIcon className="w-8 h-8 text-[#FFC636]" />
            Property Mix (Live Listings)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyMix.map((demo, index) => (
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
                    <p className="text-3xl font-bold text-[#FFC636]">{demo.percentage}%</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mt-4">{demo.segment}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Trends */}
        <div className="bg-linear-to-r from-[#FFC636]/10 to-[#FFC636]/15 rounded-xl p-8 mb-12 border-l-4 border-[#FFC636]">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ArrowTrendingUpIcon className="w-8 h-8 text-[#FFC636]" />
            Transaction Trends (Listings Based)
          </h2>
          <div className="space-y-4">
            {transactionTrends.map((trend, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#FFC636] text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-t-4 border-[#FFC636]">
          <h2 className="text-2xl font-bold text-[#FFC636] mb-4">Summary</h2>
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
  const statusColor = project.status === 'ongoing' ? 'bg-[#FFC636]/15 text-[#FFC636]' : 'bg-[#FFC636]/15 text-[#FFC636]';
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
          <div className="absolute top-3 right-3 bg-[#FFC636] text-white px-3 py-1 rounded-full text-xs font-bold">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#FFC636]">
          {project.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 shrink-0" />
          {project.location}
        </p>

        {/* Price */}
        <div className="bg-linear-to-r from-[#FFC636]/10 to-[#FFC636]/15 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-600 mb-1">Starting Price</p>
          <p className="text-2xl font-bold text-[#FFC636]">
            {formatAedShort(project.price || 0)}
          </p>
          <p className="text-xs text-gray-500">{project.currency || 'AED'}</p>
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
        <Link href="/projects" className="block w-full text-center bg-[#FFC636] text-white font-semibold py-2 rounded-lg hover:bg-[#FFC636] transition-colors">
          Learn More
        </Link>
      </div>
    </div>
  );
}
