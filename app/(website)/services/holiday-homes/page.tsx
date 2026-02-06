'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  CogIcon,
  SparklesIcon as HouseIcon,
  AdjustmentsHorizontalIcon,
  ShieldCheckIcon,
  HeartIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const holidayServices = [
  {
    icon: MapPinIcon,
    title: 'Property Marketing & Listing Management',
    description: 'Professional listings on Airbnb, Booking.com and our network with optimized descriptions and photos to maximize visibility.'
  },
  {
    icon: ChatBubbleLeftIcon,
    title: 'Guest Communication & Booking Management',
    description: 'Handle all guest inquiries, booking confirmations, and post-checkout follow-ups with timely, professional service.'
  },
  {
    icon: CalendarIcon,
    title: 'Check-in & Check-out Services',
    description: 'Seamless guest arrival and departure with flexible timing, concierge services, and personalized welcome.'
  },
  {
    icon: CogIcon,
    title: 'Property Maintenance & Housekeeping',
    description: 'Professional housekeeping and routine maintenance to keep property spotless, well-stocked, and guest-ready.'
  },
  {
    icon: StarIcon,
    title: 'Guest Reviews & Reputation Management',
    description: 'Proactively gather feedback and manage reviews to build strong reputation and attract quality guests.'
  },
  {
    icon: AdjustmentsHorizontalIcon,
    title: 'Dynamic Pricing & Revenue Optimization',
    description: 'Advanced algorithms and market data to implement pricing strategies that maximize revenue and occupancy.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Compliance & Legal Assurance',
    description: 'Ensure full compliance with local laws, licensing requirements, taxation, and rental regulations.'
  },
  {
    icon: HeartIcon,
    title: 'Guest Experience & Personalization',
    description: 'Welcome gifts, bespoke itineraries, local recommendations, and unique touches for memorable stays.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Property Assessment',
    description: 'Comprehensive evaluation of property positioning, amenities, and market potential'
  },
  {
    number: '02',
    title: 'Listing Optimization',
    description: 'Professional photography, descriptions, and multi-platform listing creation'
  },
  {
    number: '03',
    title: 'Booking Management',
    description: 'Handle inquiries, confirmations, and guest communication with efficiency'
  },
  {
    number: '04',
    title: 'Guest Services',
    description: 'Coordinate check-in, concierge services, and ensure exceptional guest experience'
  },
  {
    number: '05',
    title: 'Housekeeping & Maintenance',
    description: 'Professional cleaning and property upkeep between guests'
  },
  {
    number: '06',
    title: 'Performance Optimization',
    description: 'Monitor reviews, adjust pricing, and maximize occupancy and revenue'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Hassle-Free Management',
    description: 'Let us handle all operations while you enjoy passive income from your property investment'
  },
  {
    icon: CheckCircleIcon,
    title: 'Maximum Occupancy',
    description: 'Strategic marketing and dynamic pricing ensure your property stays booked at optimal rates'
  },
  {
    icon: CheckCircleIcon,
    title: 'Premium Guest Experience',
    description: 'Personalized service and attention to detail create memorable stays and repeat bookings'
  },
  {
    icon: CheckCircleIcon,
    title: 'Strong Online Reputation',
    description: 'Professional management and quality service build 5-star ratings that attract more guests'
  },
  {
    icon: CheckCircleIcon,
    title: 'Legal Compliance',
    description: 'Rest assured knowing your property meets all local regulations and licensing requirements'
  },
  {
    icon: CheckCircleIcon,
    title: 'Revenue Maximization',
    description: 'Data-driven pricing and market intelligence ensure best possible returns on your investment'
  }
]

const stats = [
  { value: '1,000+', label: 'Properties Managed' },
  { value: '95%+', label: 'Average Occupancy' },
  { value: 'AED 500K+', label: 'Average Annual Revenue/Property' }
]

export default function HolidayHomesPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_8.jpg"
            alt="Holiday Homes Management"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Holiday Homes <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Management</span>
            </h1>
            <p className="text-2xl font-semibold text-orange-200 mb-4">fäm living</p>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Premium short-term rental management for holiday homes. Expert handling of bookings, guest services, and property maintenance to maximize returns and guest satisfaction.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-orange-400 to-red-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300">
                Get Started Today
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
              Turn Your Property Into a <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Revenue Engine</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              At fäm living, we specialize in managing short-term rental properties with seamless expertise. We understand the growing demand for high-quality vacation rentals and provide comprehensive services that ensure your property stands out while delivering exceptional guest experiences.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Our team handles everything from booking management to guest services, ensuring your property is always in top condition, occupied, and delivering strong returns. Whether you're renting out a single unit or multiple properties, we provide expert management tailored to your needs.
            </p>
            <div className="space-y-3">
              {['Professional Listing Management', 'Guest Satisfaction Focus', 'Revenue Optimization'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-orange-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_12.jpg"
              alt="Holiday Home Rental"
              fill
              className="object-cover rounded-2xl scale-110 hover:scale-125 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="details" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Holiday Homes Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Complete short-term rental management covering every aspect of property success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {holidayServices.map((service, idx) => {
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
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-orange-400/20 rounded-2xl p-8 text-center hover:border-orange-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm living?</h2>

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
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">fäm living Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to rental property success</p>
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
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Premium Properties in Our Portfolio</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_4.jpg', title: 'Luxury Villa Rental' },
            { src: '/CREEK_PALACE_DCH_EMAAR_7.jpg', title: 'Beachfront Apartment' },
            { src: '/CREEK_PALACE_DCH_EMAAR_14.jpg', title: 'Premium Penthouse' }
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
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-slate-900/80 to-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_1.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Maximize Your Holiday Home Revenue?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let fäm living handle all management details while you enjoy reliable passive income. Professional service, exceptional guest experiences, optimized returns.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-orange-400 to-red-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-orange-400 text-orange-300 font-bold rounded-lg hover:bg-orange-400/10 transition-all duration-300"
            >
              Contact fäm living
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Managing premium holiday properties with 95%+ occupancy rates and AED 500K+ annual revenue per property
          </p>
        </div>
      </section>
    </div>
  )
}
