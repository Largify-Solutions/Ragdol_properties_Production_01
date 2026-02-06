'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MapPinIcon, 
  BuildingOfficeIcon, 
  HomeIcon, 
  CurrencyDollarIcon, 
  MagnifyingGlassIcon, 
  ArrowRightIcon, 
  StarIcon, 
  BuildingLibraryIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  UsersIcon,
  BookOpenIcon,
  ClockIcon,
  FireIcon,
 
  AcademicCapIcon,
  HeartIcon,
  HomeModernIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { TrendingUpIcon } from 'lucide-react'

const dubaiAreas = [
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    description: 'Dubai Marina is the world\'s largest man-made marina, featuring stunning waterfront living with luxury apartments, yachts, and a vibrant lifestyle.',
    avgPrice: 'AED 2.5M - 15M',
    priceTrend: '+12%',
    highlights: ['Waterfront views', 'Marina lifestyle', 'Modern architecture', 'Walking distance to beach', 'Vibrant nightlife'],
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600',
    properties: 1250,
    rating: 4.8,
    category: 'Luxury Waterfront',
    developer: 'Emaar Properties',
    launchYear: 2003,
    propertyTypes: ['Apartments', 'Penthouses', 'Duplexes'],
    avgRentalYield: '7.2%',
    amenities: ['Marina Walk', 'Beach Access', 'Shopping Malls', 'Fine Dining', 'Yacht Clubs']
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    description: 'An iconic palm-shaped artificial island featuring exclusive beachfront properties, luxury resorts, and breathtaking sea views.',
    avgPrice: 'AED 5M - 50M+',
    priceTrend: '+18%',
    highlights: ['Beachfront living', 'Exclusive location', 'Premium amenities', 'Private beaches', 'World-class resorts'],
    image: 'https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1600',
    properties: 890,
    rating: 4.9,
    category: 'Premium Island',
    developer: 'Nakheel',
    launchYear: 2001,
    propertyTypes: ['Villas', 'Apartments', 'Hotel Apartments'],
    avgRentalYield: '6.8%',
    amenities: ['Private Beach', 'Atlantis Hotel', 'Water Parks', 'Fine Dining', 'Marina']
  },
  {
    id: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    description: 'A master-planned golf community offering luxury villas, townhouses, and apartments surrounded by lush green landscapes.',
    avgPrice: 'AED 3M - 25M',
    priceTrend: '+15%',
    highlights: ['Family-friendly', 'Golf course', 'Nature views', 'Quality schools', 'Spacious homes'],
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600',
    properties: 2100,
    rating: 4.7,
    category: 'Golf Community',
    developer: 'Emaar Properties',
    launchYear: 2013,
    propertyTypes: ['Villas', 'Townhouses', 'Apartments'],
    avgRentalYield: '6.5%',
    amenities: ['18-hole Golf Course', 'Parkland', 'Community Center', 'Retail Outlets', 'Hospitals']
  },
  {
    id: 'jumeirah-village-circle',
    name: 'Jumeirah Village Circle (JVC)',
    description: 'An affordable luxury community with modern apartments and villas, excellent connectivity, and family-oriented amenities.',
    avgPrice: 'AED 800K - 5M',
    priceTrend: '+10%',
    highlights: ['Affordable luxury', 'Metro access', 'Community focus', 'Parks & Playgrounds', 'Shopping Centers'],
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600',
    properties: 3200,
    rating: 4.6,
    category: 'Affordable Luxury',
    developer: 'Dubai Properties',
    launchYear: 2008,
    propertyTypes: ['Apartments', 'Townhouses', 'Villas'],
    avgRentalYield: '8.2%',
    amenities: ['Central Park', 'Community Center', 'Retail Plaza', 'Schools', 'Medical Centers']
  },
  {
    id: 'dubai-silicon-oasis',
    name: 'Dubai Silicon Oasis',
    description: 'A free zone technology park offering modern apartments and villas tailored for tech professionals and businesses.',
    avgPrice: 'AED 1.2M - 8M',
    priceTrend: '+9%',
    highlights: ['Tech community', 'Business park', 'Modern living', 'Educational hub', 'Innovation center'],
    image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600',
    properties: 1500,
    rating: 4.5,
    category: 'Tech Hub',
    developer: 'Dubai Silicon Oasis Authority',
    launchYear: 2004,
    propertyTypes: ['Apartments', 'Villas', 'Commercial Spaces'],
    avgRentalYield: '7.8%',
    amenities: ['Tech University', 'Business Center', 'Shopping Mall', 'Parks', 'Sports Complex']
  },
  {
    id: 'arabian-ranches',
    name: 'Arabian Ranches',
    description: 'An exclusive equestrian-themed community featuring luxury villas and equestrian facilities in a serene desert landscape.',
    avgPrice: 'AED 4M - 30M',
    priceTrend: '+14%',
    highlights: ['Equestrian lifestyle', 'Spacious villas', 'Private community', 'Desert views', 'Family-oriented'],
    image: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1600',
    properties: 980,
    rating: 4.8,
    category: 'Equestrian Community',
    developer: 'Emaar Properties',
    launchYear: 2004,
    propertyTypes: ['Villas', 'Townhouses', 'Golf Villas'],
    avgRentalYield: '6.2%',
    amenities: ['Equestrian Center', 'Golf Course', 'Community Center', 'Schools', 'Retail Outlets']
  }
]

const areaCategories = [
  {
    id: 'luxury-waterfront',
    title: 'Luxury Waterfront',
    icon: BuildingOfficeIcon,
    areas: ['Dubai Marina', 'Palm Jumeirah', 'Bluewaters Island', 'Jumeirah Beach Residence'],
    description: 'Premium properties with stunning sea views and direct marina access',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'family-communities',
    title: 'Family Communities',
    icon: HomeIcon,
    areas: ['Dubai Hills Estate', 'Arabian Ranches', 'Mudon', 'Al Barari'],
    description: 'Spacious villas and townhouses perfect for family living',
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 'affordable-luxury',
    title: 'Affordable Luxury',
    icon: CurrencyDollarIcon,
    areas: ['Jumeirah Village Circle', 'Dubai Silicon Oasis', 'Sports City', 'IMPZ'],
    description: 'Quality properties at competitive price points',
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'investment-hotspots',
    title: 'Investment Hotspots',
    icon: TrendingUpIcon,
    areas: ['Downtown Dubai', 'Business Bay', 'Dubai Creek Harbour', 'Dubai South'],
    description: 'High-growth areas with excellent ROI potential',
    color: 'from-orange-500 to-yellow-400'
  }
]

const guideSections = [
  {
    title: 'Investment Analysis',
    icon: ChartBarIcon,
    content: [
      'Current market trends and price analysis',
      'Rental yield calculations and projections',
      'Capital appreciation potential by area',
      'Government regulations and fees',
      'Tax benefits and incentives'
    ]
  },
  {
    title: 'Area Selection Guide',
    icon: MapPinIcon,
    content: [
      'Demographics and community profiles',
      'Infrastructure and connectivity',
      'Schools and healthcare facilities',
      'Lifestyle amenities and recreation',
      'Future development plans'
    ]
  },
  {
    title: 'Property Types',
    icon: HomeModernIcon,
    content: [
      'Apartments vs Villas vs Townhouses',
      'Off-plan vs Ready properties',
      'Freehold vs Leasehold areas',
      'Amenities to look for',
      'Maintenance and service charges'
    ]
  },
  {
    title: 'Legal Framework',
    icon: ShieldCheckIcon,
    content: [
      'RERA regulations and buyer protection',
      'Title deed registration process',
      'Mortgage procedures for foreigners',
      'Inheritance laws in Dubai',
      'Golden Visa requirements'
    ]
  }
]

const featuredGuides = [
  {
    id: 'investment-guide-2025',
    title: 'Ultimate Dubai Property Investment Guide 2025',
    description: 'Comprehensive analysis of Dubai\'s property market trends, investment hotspots, and ROI projections for 2025.',
    category: 'Investment',
    readTime: '15 min read',
    difficulty: 'Advanced',
    featured: true,
    tags: ['Market Analysis', 'ROI', 'Trends'],
    author: 'RAGDOLL Investment Team',
    date: 'Jan 2025'
  },
  {
    id: 'first-time-buyer',
    title: 'First-Time Buyer\'s Complete Handbook',
    description: 'Step-by-step guide for new buyers covering everything from property search to moving into your dream home.',
    category: 'Buying',
    readTime: '12 min read',
    difficulty: 'Beginner',
    featured: true,
    tags: ['Beginner Guide', 'Process', 'Checklist'],
    author: 'Sarah Johnson',
    date: 'Dec 2024'
  },
  {
    id: 'rental-market',
    title: 'Dubai Rental Market Deep Dive',
    description: 'In-depth analysis of rental yields, tenant preferences, and property management strategies.',
    category: 'Rental',
    readTime: '10 min read',
    difficulty: 'Intermediate',
    featured: false,
    tags: ['Rental Yields', 'Tenant Management', 'ROI'],
    author: 'Michael Chen',
    date: 'Nov 2024'
  }
]

export default function AreaGuidesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const filteredAreas = dubaiAreas.filter(area =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(area =>
    selectedCategory === 'All' || area.category === selectedCategory
  )

  const selectedAreaData = dubaiAreas.find(area => area.id === selectedArea)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-secondary to-slate-900">
        <div className="absolute inset-0">
          <Image 
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Dubai Skyline"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/70 to-transparent"></div>
        </div>
        
        <div className="relative container-custom py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-white text-sm font-bold tracking-widest uppercase">Expert Insights</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
              Dubai <span className="text-primary">Area</span><br />
              Guides
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Expert analysis and comprehensive guides to Dubai's most sought-after neighborhoods. 
              Make informed decisions with our detailed area profiles and investment insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
             
              <Link href={'/contact'} className="px-8 py-4 bg-primary text-secondary font-bold rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Personalized Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-3xl font-black text-primary mb-2">25+</div>
              <div className="text-sm text-slate-600 font-medium">Areas Covered</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-black text-primary mb-2">98%</div>
              <div className="text-sm text-slate-600 font-medium">Client Satisfaction</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-black text-primary mb-2">AED 15B+</div>
              <div className="text-sm text-slate-600 font-medium">Properties Sold</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-black text-primary mb-2">5000+</div>
              <div className="text-sm text-slate-600 font-medium">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Area Categories */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6">
              Dubai Area <span className="text-primary">Categories</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore Dubai's diverse neighborhoods categorized by lifestyle, budget, and investment potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areaCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.title)}
                className={`text-left p-8 rounded-2xl bg-white border-2 ${selectedCategory === category.title ? 'border-primary shadow-xl' : 'border-slate-100 shadow-lg'} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`w-14 h-14 rounded-xl bg-linear-to-r ${category.color} flex items-center justify-center mb-6`}>
                  <category.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{category.title}</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{category.description}</p>
                <div className="space-y-2">
                  {category.areas.slice(0, 3).map((area, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-500">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                      <span className="truncate">{area}</span>
                    </div>
                  ))}
                  {category.areas.length > 3 && (
                    <div className="text-sm text-primary font-medium">
                      +{category.areas.length - 3} more areas
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Area Guides */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6">
                Comprehensive <span className="text-primary">Area Guides</span>
              </h2>
              <p className="text-lg text-slate-600">
                Detailed analysis of Dubai's most popular neighborhoods with investment insights
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="All">All Categories</option>
                {areaCategories.map(cat => (
                  <option key={cat.id} value={cat.title}>{cat.title}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="px-4 py-3 text-primary font-medium hover:bg-slate-50 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {filteredAreas.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredAreas.map((area) => (
                <div 
                  key={area.id}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border-2 ${selectedArea === area.id ? 'border-primary' : 'border-slate-100'} transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/70`}
                >
                  {/* Area Header */}
                  <div className="relative h-64">
                    <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    
                    {/* Price Trend Badge */}
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <TrendingUpIcon className="h-3 w-3" />
                      {area.priceTrend}
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 bg-white text-secondary px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                      <StarSolidIcon className="h-3 w-3 text-amber-500" />
                      {area.rating}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest rounded">
                        {area.category}
                      </span>
                    </div>
                  </div>

                  {/* Area Details */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                          {area.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <BuildingLibraryIcon className="h-4 w-4" />
                            <span>{area.developer}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>Since {area.launchYear}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-primary">{area.avgPrice}</div>
                        <div className="text-sm text-slate-500">Average Price</div>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed">{area.description}</p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-slate-50 rounded-xl">
                        <div className="text-lg font-black text-primary mb-1">{area.properties}+</div>
                        <div className="text-xs text-slate-500">Properties</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-xl">
                        <div className="text-lg font-black text-primary mb-1">{area.avgRentalYield}</div>
                        <div className="text-xs text-slate-500">Rental Yield</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-xl">
                        <div className="text-lg font-black text-primary mb-1">{area.propertyTypes.length}</div>
                        <div className="text-xs text-slate-500">Property Types</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
                        <FireIcon className="h-4 w-4 text-primary" />
                        <span>Key Highlights</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.highlights.map((highlight, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Property Types */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                        <HomeModernIcon className="h-4 w-4 text-primary" />
                        <span>Available Property Types</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.propertyTypes.map((type, idx) => (
                          <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full border border-slate-200">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                      <Link
                        href={`/properties`}
                        className="flex-1 py-3 bg-primary text-secondary font-bold rounded-xl hover:bg-secondary hover:text-white transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                      >
                        View Properties
                      </Link>
                      <button
                        onClick={() => setSelectedArea(area.id === selectedArea ? null : area.id)}
                        className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        {selectedArea === area.id ? 'Show Less' : 'View Details'}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {selectedArea === area.id && (
                      <div className="mt-6 pt-6 border-t border-slate-100 animate-slideDown">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-bold text-secondary mb-4">Amenities</h4>
                            <ul className="space-y-2">
                              {area.amenities.map((amenity, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-slate-600">
                                  <CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
                                  <span>{amenity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-secondary mb-4">Why Invest Here?</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2">
                                <TrendingUpIcon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                <span className="text-slate-600"><strong>High Appreciation:</strong> Average {area.priceTrend} price increase annually</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CurrencyDollarIcon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                <span className="text-slate-600"><strong>Strong Rental Yield:</strong> {area.avgRentalYield} average annual return</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <UsersIcon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                <span className="text-slate-600"><strong>High Demand:</strong> {area.properties}+ properties with 98% occupancy rate</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <MapPinIcon className="h-20 w-20 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-700 mb-4">No Areas Found</h3>
              <p className="text-slate-600 max-w-md mx-auto mb-8">
                Try adjusting your search criteria or browse all areas
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all duration-300"
              >
                Show All Areas
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Guide Sections */}
      <section className="py-24 bg-linear-to-br from-slate-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6">
              Complete <span className="text-primary">Buyer's Guide</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about buying property in Dubai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guideSections.map((section, index) => (
              <div key={index} className="group">
                <div className="h-full bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <section.icon className="h-7 w-7 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6">
                Featured <span className="text-primary">Investment Guides</span>
              </h2>
              <p className="text-lg text-slate-600">
                Expert insights and market analysis from our investment team
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
            >
          Contact for more Guides
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGuides.map((guide) => (
              <div key={guide.id} className="group">
                <div className={`h-full bg-white rounded-3xl overflow-hidden border-2 ${guide.featured ? 'border-primary shadow-2xl' : 'border-slate-100 shadow-lg'} hover:shadow-2xl hover:border-primary transition-all duration-300`}>
                  <div className="p-8">
                    {guide.featured && (
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                        <StarSolidIcon className="h-3 w-3" />
                        Featured
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full mb-3">
                        {guide.category}
                      </span>
                      <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                        {guide.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{guide.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AcademicCapIcon className="h-4 w-4" />
                          <span>{guide.difficulty}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">{guide.author}</div>
                        <div className="text-xs text-slate-400">{guide.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {guide.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-r from-primary to-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <HeartIcon className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-bold tracking-widest uppercase">Personalized Service</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
              Need <span className="text-slate-900">Personalized</span> Area Recommendations?
            </h2>
            
            <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto">
              Our experts will analyze your requirements and provide customized area recommendations 
              based on your budget, lifestyle, and investment goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="px-10 py-4 bg-white text-secondary font-bold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-xl"
              >
                Book Consultation
              </Link>
              <Link
                href="/properties"
                className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-secondary transition-all duration-300"
              >
                Browse All Properties
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>Free Area Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4" />
                  <span>Market Analysis Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChartBarIcon className="h-4 w-4" />
                  <span>ROI Projections</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}