'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  BoltIcon,
  WrenchIcon,
  CogIcon,
  Cog6ToothIcon,
  SparklesIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  HomeModernIcon
} from '@heroicons/react/24/outline'

const mepServices = [
  {
    icon: Cog6ToothIcon,
    title: 'HVAC Design & Installation',
    description: 'Advanced mechanical systems including heating, ventilation, and air conditioning engineered for optimal performance and energy efficiency.'
  },
  {
    icon: BoltIcon,
    title: 'Electrical Systems Design',
    description: 'Complete power distribution, lighting design, fire alarm systems, and low-current networks engineered for safety and scalability.'
  },
  {
    icon: WrenchIcon,
    title: 'Plumbing & Drainage Systems',
    description: 'Comprehensive water supply, drainage, and sanitary systems designed to meet high-capacity demands and regulatory standards.'
  },
  {
    icon: CogIcon,
    title: 'Ventilation Systems',
    description: 'Precision ventilation solutions ensuring proper air quality, circulation, and energy efficiency across all building spaces.'
  },
  {
    icon: SparklesIcon,
    title: 'Energy-Efficient Solutions',
    description: 'Sustainable MEP design reducing operational costs through advanced technologies and efficiency optimization.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Compliance & Code Adherence',
    description: 'Full compliance with international building codes, safety standards, and regulatory requirements for all MEP systems.'
  },
  {
    icon: ChartBarIcon,
    title: 'System Integration & Testing',
    description: 'Seamless integration of mechanical, electrical, and plumbing systems with comprehensive testing and commissioning.'
  },
  {
    icon: HomeModernIcon,
    title: 'Maintenance & Support Services',
    description: 'Ongoing maintenance, troubleshooting, and support ensuring optimal system performance throughout the building lifecycle.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Project Analysis & Planning',
    description: 'Analyze project requirements and develop comprehensive MEP strategy aligned with building objectives'
  },
  {
    number: '02',
    title: 'Design & Engineering',
    description: 'Detailed design of mechanical, electrical, and plumbing systems using advanced engineering standards'
  },
  {
    number: '03',
    title: 'System Integration',
    description: 'Coordinate MEP systems to ensure efficient integration without conflicts or performance issues'
  },
  {
    number: '04',
    title: 'Installation & Implementation',
    description: 'Professional installation of all MEP systems with strict quality control and adherence to specifications'
  },
  {
    number: '05',
    title: 'Testing & Commissioning',
    description: 'Comprehensive testing and commissioning of all systems ensuring proper operation and efficiency'
  },
  {
    number: '06',
    title: 'Handover & Support',
    description: 'Complete handover with documentation and ongoing maintenance support for all MEP systems'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Optimal Performance',
    description: 'Precision engineering ensures all MEP systems operate at peak efficiency and reliability'
  },
  {
    icon: CheckCircleIcon,
    title: 'Cost Reduction',
    description: 'Energy-efficient solutions and integrated systems reduce operational and maintenance costs'
  },
  {
    icon: CheckCircleIcon,
    title: 'Safety & Compliance',
    description: 'Full compliance with international codes and safety standards protecting building occupants'
  },
  {
    icon: CheckCircleIcon,
    title: 'Sustainable Design',
    description: 'Environment-conscious MEP solutions supporting long-term sustainability goals'
  },
  {
    icon: CheckCircleIcon,
    title: 'Seamless Integration',
    description: 'Coordinated MEP systems that work together seamlessly without conflicts or inefficiencies'
  },
  {
    icon: CheckCircleIcon,
    title: 'Reliable Support',
    description: 'Comprehensive maintenance and support ensuring continuous optimal system performance'
  }
]

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '30%', label: 'Average Cost Savings' },
  { value: '99%', label: 'System Uptime' }
]

export default function MEPPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_16.jpg"
            alt="MEP Services"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              MEP <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Fully integrated mechanical, electrical, and plumbing solutions delivering precision engineering, seamless integration, and exceptional performance.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
                Get MEP Consultation
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-blue-400/50 text-blue-300 font-bold rounded-lg hover:bg-blue-400/10 transition-all duration-300">
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
              Integrated MEP <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Excellence</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              Our Mechanical, Electrical, and Plumbing division delivers fully integrated building services critical to the performance and longevity of any development. We combine technical expertise, cutting-edge technology, and a commitment to quality.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Whether for residential towers, commercial spaces, or mixed-use developments, our MEP services ensure that every property operates at its best. We focus on precision engineering, seamless integration, and compliance with international codes to enhance performance, reduce operational costs, and support long-term sustainability.
            </p>
            <div className="space-y-3">
              {['Mechanical Systems', 'Electrical Systems', 'Plumbing Solutions'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-blue-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_12.jpg"
              alt="MEP Systems"
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
            <h2 className="text-4xl font-bold text-white mb-4">MEP Solutions</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive mechanical, electrical, and plumbing services across all building types</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mepServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-2xl p-8 text-center hover:border-blue-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm MEP Services?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* MEP Systems Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our MEP Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mechanical Systems',
                items: ['HVAC Design', 'Ventilation Systems', 'Energy Efficiency', 'Thermal Comfort']
              },
              {
                title: 'Electrical Systems',
                items: ['Power Distribution', 'Lighting Design', 'Fire Alarm Systems', 'Low-Current Networks']
              },
              {
                title: 'Plumbing & Drainage',
                items: ['Water Supply', 'Drainage Systems', 'Sanitary Systems', 'High-Capacity Design']
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-2xl p-8 hover:border-blue-400/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-linear-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">MEP Project Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to integrated building systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 text-white font-bold text-lg">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Integrated Systems in Action</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/CREEK_PALACE_DCH_EMAAR_10.jpg', title: 'Advanced HVAC Systems' },
              { src: '/CREEK_PALACE_DCH_EMAAR_14.jpg', title: 'Electrical Distribution' },
              { src: '/CREEK_PALACE_DCH_EMAAR_1.jpg', title: 'Plumbing Integration' }
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
            src="/CREEK_PALACE_DCH_EMAAR_9.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Integrated MEP Solutions for Excellence
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Partner with fäm Properties for comprehensive MEP services that combine technical expertise, cutting-edge technology, and unwavering quality commitment.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Get MEP Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-blue-400 text-blue-300 font-bold rounded-lg hover:bg-blue-400/10 transition-all duration-300"
            >
              Contact Our Team
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            500+ projects completed with 30% average cost savings and 99% system uptime
          </p>
        </div>
      </section>
    </div>
  )
}
