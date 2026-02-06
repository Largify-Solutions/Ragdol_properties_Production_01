'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  BuildingOffice2Icon,
  PencilSquareIcon,
  MapPinIcon,
  LightBulbIcon,
  CogIcon,
  StarIcon,
  ShieldCheckIcon,
  HandThumbUpIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const developmentServices = [
  {
    icon: PencilSquareIcon,
    title: 'Design Excellence',
    description: 'Collaborate with world-class architects and interior designers to create bespoke villas and boutique buildings that redefine contemporary luxury.'
  },
  {
    icon: MapPinIcon,
    title: 'Prime Locations',
    description: 'Every development is situated in Dubai\'s most coveted neighborhoods, ensuring exclusivity, excellent connectivity, and unparalleled views.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Sustainability & Innovation',
    description: 'Building properties that are luxurious and sustainable, integrating green technologies and smart home features with cutting-edge solutions.'
  },
  {
    icon: SparklesIcon,
    title: 'Tailored Experiences',
    description: 'We understand that luxury is personal. Offering customization options to meet unique preferences with bespoke interiors and exclusive finishes.'
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Boutique Developments',
    description: 'Specializing in boutique buildings that provide intimate and personalized living experiences designed for select residents only.'
  },
  {
    icon: CogIcon,
    title: 'Craftsmanship & Quality',
    description: 'Every development reflects highest standards of craftsmanship with finest materials, advanced construction techniques, and industry-best professionals.'
  },
  {
    icon: StarIcon,
    title: 'Investment Value',
    description: 'Carefully selected projects that promise strong capital growth, providing investors with both aesthetic and financial rewards.'
  },
  {
    icon: HandThumbUpIcon,
    title: 'Seamless Ownership Experience',
    description: 'From first consultation to key handover, we provide smooth ownership experience with after-sales service and ongoing personalized support.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Site Selection & Feasibility',
    description: 'Identify prime locations with strategic advantages, conduct comprehensive market and feasibility analysis'
  },
  {
    number: '02',
    title: 'Architectural Planning',
    description: 'Collaborate with world-class architects to design innovative, luxury-focused projects with bespoke aesthetics'
  },
  {
    number: '03',
    title: 'Regulatory Approval',
    description: 'Navigate regulatory requirements, obtain necessary approvals, and ensure full DLD compliance'
  },
  {
    number: '04',
    title: 'Construction & Quality Management',
    description: 'Execute construction with rigorous quality control, advanced techniques, and premium material sourcing'
  },
  {
    number: '05',
    title: 'Marketing & Pre-Sales',
    description: 'Launch strategic marketing campaigns, manage pre-sales, and coordinate with master agency network'
  },
  {
    number: '06',
    title: 'Handover & After-Sales',
    description: 'Deliver completed properties with comprehensive handover support and ongoing customer care services'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Timeless Design',
    description: 'Properties designed to remain contemporary and desirable for decades through innovative yet classic architecture'
  },
  {
    icon: CheckCircleIcon,
    title: 'Superior Materials',
    description: 'Only the finest materials sourced globally, ensuring durability, elegance, and long-term value preservation'
  },
  {
    icon: CheckCircleIcon,
    title: 'Smart Living',
    description: 'Integrated smart home technologies and sustainable features that enhance lifestyle while reducing environmental impact'
  },
  {
    icon: CheckCircleIcon,
    title: 'Exclusivity',
    description: 'Boutique developments with limited units ensure exclusivity, privacy, and a strong sense of community among residents'
  },
  {
    icon: CheckCircleIcon,
    title: 'Capital Appreciation',
    description: 'Strategic location selection and premium positioning ensure strong potential for property value appreciation over time'
  },
  {
    icon: CheckCircleIcon,
    title: 'Lifetime Support',
    description: 'Comprehensive after-sales service, maintenance support, and personalized assistance throughout property ownership journey'
  }
]

const stats = [
  { value: '50+', label: 'Developments Completed' },
  { value: '1,000+', label: 'Luxury Units Delivered' },
  { value: 'AED 50B+', label: 'Total Development Value' }
]

export default function DevelopmentPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_10.jpg"
            alt="Nordic by fäm Development"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Real Estate <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Development</span>
            </h1>
            <p className="text-2xl font-semibold text-purple-200 mb-4">Nordic by fäm</p>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Luxury and ultra-luxury villas and boutique buildings that set new standards in design, quality, and exclusivity. Creating spaces that inspire, innovate, and reflect the highest level of sophistication.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                Explore Projects
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-purple-400/50 text-purple-300 font-bold rounded-lg hover:bg-purple-400/10 transition-all duration-300">
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
              More Than Buildings—<span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Lifestyle Destinations</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              At Nordic by fäm, we specialize in the development of luxury and ultra-luxury villas and boutique buildings that set new standards in design, quality, and exclusivity. As a division of fäm Properties, Nordic is committed to delivering exceptional real estate experiences that elevate living standards and offer long-term value to investors and homeowners alike.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Our approach to real estate development goes beyond just building structures—it's about creating spaces that inspire, innovate, and reflect the highest level of sophistication. From prime locations to state-of-the-art designs, Nordic by fäm brings to life meticulously crafted properties that cater to discerning tastes and the most prestigious lifestyles.
            </p>
            <div className="space-y-3">
              {['World-Class Architecture', 'Premium Material Selection', 'Bespoke Customization'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-purple-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_7.jpg"
              alt="Nordic Luxury Development"
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
            <h2 className="text-4xl font-bold text-white mb-4">What Sets Nordic by fäm Apart</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Our specialized approach to luxury development ensures every project exceeds expectations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-purple-400/20 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-purple-400/20 rounded-2xl p-8 text-center hover:border-purple-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose Nordic by fäm?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-purple-400 shrink-0 mt-1" />
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
            <h2 className="text-4xl font-bold text-white mb-4">Development Process</h2>
            <p className="text-xl text-gray-300">From concept to completion—our systematic approach to excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-purple-400 to-pink-500 text-white font-bold text-lg">
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
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Nordic by fäm Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_13.jpg', title: 'Ultra-Luxury Villa Collection' },
            { src: '/CREEK_PALACE_DCH_EMAAR_11.jpg', title: 'Boutique Residential Complex' },
            { src: '/CREEK_PALACE_DCH_EMAAR_6.jpg', title: 'Contemporary Design Excellence' }
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
            src="/CREEK_PALACE_DCH_EMAAR_5.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Invest in Luxury?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            With Nordic by fäm, you're not just investing in a property—you're securing a lifestyle. Discover developments designed for those who appreciate the finest things in life.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-bold rounded-lg hover:bg-purple-400/10 transition-all duration-300"
            >
              View Developments
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Discover the Nordic by fäm difference in luxury real estate development
          </p>
        </div>
      </section>
    </div>
  )
}
