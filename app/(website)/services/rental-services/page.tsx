'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  HomeIcon,
  DocumentCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  WrenchIcon,
  ChartBarIcon,
  BellIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const rentalServices = [
  {
    icon: CurrencyDollarIcon,
    title: 'Rental Price Optimization',
    description: 'Competitive market analysis using real-time data and trends to set optimal rental prices for maximum returns.'
  },
  {
    icon: SparklesIcon,
    title: 'Professional Marketing & Listings',
    description: 'High-quality photography, professional listings, and multi-platform marketing to maximize property exposure.'
  },
  {
    icon: UserGroupIcon,
    title: 'Tenant Screening & Selection',
    description: 'Comprehensive background checks and tenant qualification ensuring reliable, quality tenants for your property.'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Lease & Contract Management',
    description: 'Professional lease preparation, contract review, and legal compliance ensuring full tenant protection.'
  },
  {
    icon: ChartBarIcon,
    title: 'Rent Collection & Accounting',
    description: 'Automated rent collection, transparent accounting, and detailed financial reporting for all properties.'
  },
  {
    icon: BellIcon,
    title: '24/7 Tenant Support',
    description: 'Round-the-clock support and communication ensuring tenant satisfaction and quick issue resolution.'
  },
  {
    icon: WrenchIcon,
    title: 'Maintenance & Repairs',
    description: 'In-house maintenance team handling inspections, repairs, and property upkeep throughout the tenancy.'
  },
  {
    icon: HomeIcon,
    title: 'Lease Renewal & Termination',
    description: 'Proactive lease renewal management and smooth property transition at end of tenancy periods.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Property Assessment',
    description: 'Evaluate your property and develop a rental strategy aligned with market conditions'
  },
  {
    number: '02',
    title: 'Rental Price Analysis',
    description: 'Conduct market research to set competitive yet profitable rental rates'
  },
  {
    number: '03',
    title: 'Marketing & Listing',
    description: 'Professional photography and multi-platform marketing campaigns to attract quality tenants'
  },
  {
    number: '04',
    title: 'Tenant Screening',
    description: 'Comprehensive background checks and verification ensuring reliable tenant selection'
  },
  {
    number: '05',
    title: 'Lease Management',
    description: 'Contract preparation, signing, and ongoing lease administration and compliance'
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description: 'Continuous rent collection, maintenance, support, and financial reporting'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Maximize Rental Yields',
    description: 'Strategic pricing and professional management ensure consistent income and high occupancy rates'
  },
  {
    icon: CheckCircleIcon,
    title: 'Quality Tenant Selection',
    description: 'Rigorous screening process ensures reliable tenants and reduces vacancy risks'
  },
  {
    icon: CheckCircleIcon,
    title: 'Hassle-Free Management',
    description: 'Full lifecycle management means you enjoy passive income without operational burden'
  },
  {
    icon: CheckCircleIcon,
    title: 'Professional Marketing',
    description: 'High-quality listings and multi-channel marketing ensure maximum property exposure'
  },
  {
    icon: CheckCircleIcon,
    title: '24/7 Support Services',
    description: 'Round-the-clock tenant support and maintenance team ensuring smooth operations'
  },
  {
    icon: CheckCircleIcon,
    title: 'Transparent Reporting',
    description: 'Detailed financial reports and tech-driven management for complete visibility and control'
  }
]

const stats = [
  { value: '3500+', label: 'Properties Managed' },
  { value: '95%', label: 'Average Occupancy Rate' },
  { value: '12%', label: 'Average Yield Increase' }
]

export default function RentalServicesPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_4.jpg"
            alt="Rental Services"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Property Rental <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Maximize your rental yields while keeping occupancy rates high. From pricing optimization to 24/7 tenant support, we manage your property like a business.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-orange-400 to-red-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300">
                Start Rental Management
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-orange-400/50 text-orange-300 font-bold rounded-lg hover:bg-orange-400/10 transition-all duration-300">
                Learn More <ArrowRightIcon className="inline h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Rental Management <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Excellence</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              At fäm Properties, we manage rental properties with one clear focus: maximizing your rental yields while keeping occupancy rates high. Whether you own a single unit or a full portfolio, our solutions deliver consistent income with minimal hassle.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              We begin by helping you set the right rental price—one that's competitive but optimized for returns. Once your property is ready, we handle everything from professional marketing to tenant screening, lease management, rent collection, and 24/7 support. Thanks to our in-house maintenance team and transparent reporting, your property becomes a reliable, long-term income stream.
            </p>
            <div className="space-y-3">
              {['Yield Optimization', 'Expert Management', 'Full Support'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-orange-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_8.jpg"
              alt="Rental Management"
              fill
              className="object-cover rounded-2xl scale-110 hover:scale-125 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-orange-400/20 rounded-2xl p-8 text-center hover:border-orange-400/50 transition-all">
                <div className="text-4xl font-bold bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="details" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Rental Management Services</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive solutions covering the entire rental property lifecycle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rentalServices.map((service, idx) => {
            const Icon = service.icon
            return (
              <div 
                key={idx}
                className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-orange-400/20 rounded-2xl p-6 hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-400/10"
              >
                <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm Rental Services?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="flex gap-4">
                  <Icon className="h-6 w-6 text-orange-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Rental Management Process</h2>
          <p className="text-xl text-gray-300">From assessment to ongoing management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-orange-400 to-red-500 text-white font-bold text-lg">
                  {step.number}
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Professional Rental Management</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/CREEK_PALACE_DCH_EMAAR_12.jpg', title: 'Strategic Price Optimization' },
              { src: '/CREEK_PALACE_DCH_EMAAR_7.jpg', title: 'Professional Marketing' },
              { src: '/CREEK_PALACE_DCH_EMAAR_14.jpg', title: 'Tenant Management' }
            ].map((project, idx) => (
              <div key={idx} className="group relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-slate-900/80 to-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_10.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Turn Your Property into Reliable Income
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let fäm Properties manage your rental property with expertise, transparency, and hands-on care. Maximize yields, minimize hassle.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-orange-400 to-red-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
            >
              Start Rental Management
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-orange-400 text-orange-300 font-bold rounded-lg hover:bg-orange-400/10 transition-all duration-300"
            >
              Get Consultation
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            3500+ properties managed with 95% average occupancy rate and 12% average yield increase
          </p>
        </div>
      </section>
    </div>
  )
}
