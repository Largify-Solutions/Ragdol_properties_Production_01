'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  VideoCameraIcon,
  CheckBadgeIcon,
  CogIcon,
  ChartBarIcon,
  CubeTransparentIcon,
  DocumentCheckIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const proptechServices = [
  {
    icon: VideoCameraIcon,
    title: 'Digital Property Listings & Virtual Tours',
    description: 'Interactive virtual tours with 360-degree views, dynamic search capabilities, and up-to-date property information with price trends.'
  },
  {
    icon: CheckBadgeIcon,
    title: 'Automated Transaction Management',
    description: 'Proprietary platforms automating contracts, document generation, and management for faster, secure, error-free transactions.'
  },
  {
    icon: CogIcon,
    title: 'Smart Property Management',
    description: 'Intuitive online platform for rent collection, maintenance requests, tenant communication, and real-time asset tracking.'
  },
  {
    icon: ChartBarIcon,
    title: 'Data Analytics & Investment Insights',
    description: 'Advanced analytics providing market insights, trends, forecasts, and data-driven predictions for informed investment decisions.'
  },
  {
    icon: CubeTransparentIcon,
    title: 'Blockchain for Property Transactions',
    description: 'Smart contracts, digital property titles, and secure payment systems for enhanced transaction security and transparency.'
  },
  {
    icon: SparklesIcon,
    title: 'AI-Powered Property Valuation',
    description: 'Precise valuations analyzing location, market trends, comparable sales, and property features for accurate market value assessment.'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Online Lease & Agreement Management',
    description: 'Automated lease creation, digital signatures, and transparent contract management reducing paperwork and accelerating processes.'
  },
  {
    icon: ChatBubbleLeftIcon,
    title: 'Real-Time Communication & Support',
    description: 'Integrated messaging systems enabling instant communication between clients, tenants, and managers for faster issue resolution.'
  },
  {
    icon: UserGroupIcon,
    title: 'Tenant & Owner Portals',
    description: 'Dedicated portals providing account access, payment history, maintenance requests, and lease details for simplified management.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Platform Setup',
    description: 'Configure and customize DXB Interact platform aligned with your specific real estate operations and requirements'
  },
  {
    number: '02',
    title: 'Data Integration',
    description: 'Seamlessly integrate existing property data and systems with advanced PropTech infrastructure'
  },
  {
    number: '03',
    title: 'User Onboarding',
    description: 'Comprehensive training for owners, managers, tenants, and staff on platform features and functionality'
  },
  {
    number: '04',
    title: 'Automation Activation',
    description: 'Enable automated workflows for transactions, leasing, payments, and communications'
  },
  {
    number: '05',
    title: 'Analytics & Optimization',
    description: 'Monitor performance metrics and optimize operations using data-driven insights'
  },
  {
    number: '06',
    title: 'Continuous Support',
    description: 'Ongoing technical support and platform updates ensuring maximum value realization'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Enhanced Efficiency',
    description: 'Automate repetitive tasks, reduce manual processes, and streamline operations saving time and costs'
  },
  {
    icon: CheckCircleIcon,
    title: 'Improved Transparency',
    description: 'Real-time visibility into transactions, property data, and performance metrics for all stakeholders'
  },
  {
    icon: CheckCircleIcon,
    title: 'Better Decision Making',
    description: 'Data-driven insights and analytics enable informed decisions maximizing returns and minimizing risk'
  },
  {
    icon: CheckCircleIcon,
    title: 'Enhanced Security',
    description: 'Blockchain technology and digital contracts ensure secure, transparent, and fraud-proof transactions'
  },
  {
    icon: CheckCircleIcon,
    title: 'Superior User Experience',
    description: 'Intuitive platforms for tenants, owners, and managers create seamless, convenient interactions'
  },
  {
    icon: CheckCircleIcon,
    title: 'Scalable Solutions',
    description: 'Cloud-based platforms easily scale from single properties to large portfolios without operational overhead'
  }
]

const stats = [
  { value: '500+', label: 'Properties on Platform' },
  { value: '10,000+', label: 'Active Users' },
  { value: '50%', label: 'Average Operational Cost Reduction' }
]

export default function PropTechPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_6.jpg"
            alt="PropTech Innovation"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              PropTech <span className="bg-linear-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-2xl font-semibold text-blue-200 mb-4">DXB Interact</p>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Cutting-edge technology solutions transforming real estate transactions, property management, and investment decisions. Streamline operations with intelligent platforms.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-blue-400 to-cyan-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
                Explore Platform
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
              The Future of Real Estate <span className="bg-linear-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">is Digital</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              At DXB Interact, we're at the forefront of the real estate revolution, leveraging cutting-edge technology to enhance how properties are bought, sold, and managed. Our PropTech services bring together innovative tools, software, and digital platforms to streamline transactions and property management.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              By utilizing the latest technological advancements, we empower clients to make smarter decisions, reduce operational costs, and improve overall user experiences. From virtual property tours to automated lease management and data-driven investment analysis, our solutions transform traditional processes into seamless, tech-driven experiences.
            </p>
            <div className="space-y-3">
              {['AI-Powered Solutions', 'Blockchain Security', 'Real-Time Analytics'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-blue-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_9.jpg"
              alt="Digital Real Estate Platform"
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
            <h2 className="text-4xl font-bold text-white mb-4">PropTech Solutions</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive platform combining digital innovation, automation, and intelligent analytics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proptechServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
              <div className="text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose DXB Interact?</h2>

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

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Implementation Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to digital transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 text-white font-bold text-lg">
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
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Properties Powered by DXB Interact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_3.jpg', title: 'Residential Listings' },
            { src: '/CREEK_PALACE_DCH_EMAAR_15.jpg', title: 'Digital Transaction Management' },
            { src: '/CREEK_PALACE_DCH_EMAAR_16.jpg', title: 'Smart Property Analytics' }
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
            src="/CREEK_PALACE_DCH_EMAAR_12.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Real Estate Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the PropTech revolution with DXB Interact. Streamline transactions, optimize management, and unlock data-driven growth with our cutting-edge platform.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-blue-400 to-cyan-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Schedule Demo
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-blue-400 text-blue-300 font-bold rounded-lg hover:bg-blue-400/10 transition-all duration-300"
            >
              Contact DXB Interact
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Transforming real estate with AI, blockchain, and intelligent automation
          </p>
        </div>
      </section>
    </div>
  )
}
