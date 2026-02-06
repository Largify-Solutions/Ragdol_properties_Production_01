'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BanknotesIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const equityServices = [
  {
    icon: SparklesIcon,
    title: 'Sourcing High-Potential Projects',
    description: 'Market research and local insights to identify exceptional growth opportunities in residential, commercial, and mixed-use developments.'
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Due Diligence & Risk Assessment',
    description: 'Thorough analysis of financial viability, market demand, location, legal factors, construction timelines, and financial projections.'
  },
  {
    icon: CogIcon,
    title: 'Investment Structuring',
    description: 'Flexible structures tailored for individual and institutional investors including joint ventures, equity partnerships, and fund-based models.'
  },
  {
    icon: ChartBarIcon,
    title: 'Capital Deployment & Asset Management',
    description: 'Active management of properties and projects overseeing construction, leasing, and operations for optimized returns.'
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Strategic Exit Planning',
    description: 'Timing exits through resale, refinancing, or long-term holding based on market conditions and real estate cycles.'
  },
  {
    icon: BanknotesIcon,
    title: 'Transparency & Reporting',
    description: 'Regular updates on project progress, financial performance, and market conditions throughout the investment lifecycle.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Diversification & Portfolio Growth',
    description: 'Access to diverse opportunities across property types and locations to build robust, risk-reduced portfolios.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Market Research',
    description: 'Comprehensive market analysis and trend identification to source high-potential investment opportunities'
  },
  {
    number: '02',
    title: 'Due Diligence',
    description: 'In-depth financial, legal, and technical analysis to assess viability and risk profiles of opportunities'
  },
  {
    number: '03',
    title: 'Structure Design',
    description: 'Develop customized investment structures aligned with investor goals and risk tolerance'
  },
  {
    number: '04',
    title: 'Capital Deployment',
    description: 'Execute investment with active asset management and progress monitoring'
  },
  {
    number: '05',
    title: 'Performance Tracking',
    description: 'Continuous monitoring and optimization of returns with transparent reporting'
  },
  {
    number: '06',
    title: 'Exit Execution',
    description: 'Strategic exit timing and execution to realize maximum returns on investment'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Expert Deal Sourcing',
    description: 'Access to exclusive, pre-vetted investment opportunities unavailable in the open market'
  },
  {
    icon: CheckCircleIcon,
    title: 'Risk Mitigation',
    description: 'Comprehensive due diligence and data-driven analysis ensures informed investment decisions'
  },
  {
    icon: CheckCircleIcon,
    title: 'Optimized Returns',
    description: 'Active management and strategic positioning maximize capital appreciation and rental yields'
  },
  {
    icon: CheckCircleIcon,
    title: 'Flexible Structures',
    description: 'Tailored investment vehicles designed to meet specific investor needs and objectives'
  },
  {
    icon: CheckCircleIcon,
    title: 'Complete Transparency',
    description: 'Regular reporting and market insights keep you informed every step of the journey'
  },
  {
    icon: CheckCircleIcon,
    title: 'Portfolio Diversification',
    description: 'Build resilient portfolios across multiple property types, locations, and investment strategies'
  }
]

const stats = [
  { value: 'AED 500B+', label: 'Managed Investment Value' },
  { value: '200+', label: 'Successful Investments' },
  { value: '25%+', label: 'Average Annual Returns' }
]

export default function PrivateEquityPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_15.jpg"
            alt="Private Equity Investment"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Real Estate <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Private Equity</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Strategic investment opportunities in Dubai's dynamic real estate market. Access exclusive deals and maximize returns with expert guidance at every step.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-green-400 to-emerald-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300">
                Explore Opportunities
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-green-400/50 text-green-300 font-bold rounded-lg hover:bg-green-400/10 transition-all duration-300">
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
              Build Wealth Through <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Strategic Real Estate Investing</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              Our Real Estate Private Equity service offers investors the opportunity to participate in high-potential projects carefully selected to maximize returns. We specialize in identifying and capitalizing on lucrative opportunities in Dubai's dynamic market.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              With deep market knowledge and a proven track record, we navigate the complexities of real estate investment, providing tailored strategies that align with your financial goals. Our team applies a data-driven approach to sourcing, analyzing, and executing investments from residential and commercial to mixed-use projects.
            </p>
            <div className="space-y-3">
              {['Expert Deal Sourcing', 'Data-Driven Analysis', 'Transparent Reporting'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_16.jpg"
              alt="Investment Opportunities"
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
            <h2 className="text-4xl font-bold text-white mb-4">Private Equity Investment Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Complete solutions from sourcing to exit for optimal portfolio performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equityServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-green-400/20 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-green-400/20 rounded-2xl p-8 text-center hover:border-green-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm Private Equity?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-green-400 shrink-0 mt-1" />
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
            <h2 className="text-4xl font-bold text-white mb-4">Investment Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to maximizing returns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-green-400 to-emerald-500 text-white font-bold text-lg">
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

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Investment Portfolio Showcase</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_10.jpg', title: 'Residential Development Fund' },
            { src: '/CREEK_PALACE_DCH_EMAAR_11.jpg', title: 'Commercial Mixed-Use Project' },
            { src: '/CREEK_PALACE_DCH_EMAAR_13.jpg', title: 'Premium Boutique Investment' }
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
            src="/CREEK_PALACE_DCH_EMAAR_17.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Maximize Your Real Estate Returns?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            With fäm Properties, you gain access to exclusive investment opportunities and expert guidance. Build wealth through strategic real estate private equity investing.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-green-400 to-emerald-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-green-400 text-green-300 font-bold rounded-lg hover:bg-green-400/10 transition-all duration-300"
            >
              View Opportunities
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Access exclusive deals with proven track record of 25%+ average annual returns
          </p>
        </div>
      </section>
    </div>
  )
}
