'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  StarIcon,
  CogIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  Cog8ToothIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'

export default function Solutions360Page() {
  const services = [
    {
      title: "Development Structuring",
      description: "Designing the right legal, financial, and operational framework to ensure every project starts on solid ground.",
      icon: Cog8ToothIcon,
      details: "We create comprehensive development structures that align with regulatory requirements, investor expectations, and market opportunities."
    },
    {
      title: "Investment and ROI Feasibility",
      description: "Detailed financial modeling and cashflow analysis to evaluate profitability and minimize risk.",
      icon: ChartBarIcon,
      details: "Our financial experts conduct thorough ROI analysis with multiple scenarios to identify the most profitable development strategy."
    },
    {
      title: "Strategic Market Analysis",
      description: "In-depth studies of demand, competition, and pricing trends to identify the best use of land.",
      icon: MagnifyingGlassIcon,
      details: "We analyze market dynamics, demographic trends, and competitive positioning to optimize project placement and pricing."
    },
    {
      title: "Land Suitability Assessments",
      description: "Technical and regulatory evaluations to ensure the site aligns with development goals.",
      icon: DocumentCheckIcon,
      details: "Comprehensive site analysis covering zoning, infrastructure, environmental factors, and regulatory compliance."
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Project Kickoff & Assessment",
      description: "Initial evaluation of the property, investor goals, and market opportunities"
    },
    {
      number: "02",
      title: "Market Intelligence Gathering",
      description: "Comprehensive analysis of demand, competition, pricing trends, and buyer profiles"
    },
    {
      number: "03",
      title: "Financial Modeling",
      description: "Develop detailed pro forma with multiple scenarios and sensitivity analysis"
    },
    {
      number: "04",
      title: "Land & Site Analysis",
      description: "Technical evaluation of zoning, infrastructure, buildability, and regulatory requirements"
    },
    {
      number: "05",
      title: "Strategic Recommendations",
      description: "Deliver actionable insights and optimized development approach"
    },
    {
      number: "06",
      title: "Implementation Support",
      description: "Guide stakeholders through structuring and execution of recommended strategy"
    }
  ]

  const benefits = [
    {
      title: "Data-Driven Decisions",
      description: "Make confident investment decisions backed by comprehensive research and analysis"
    },
    {
      title: "Risk Minimization",
      description: "Identify and mitigate potential risks early in the development process"
    },
    {
      title: "Profitability Optimization",
      description: "Maximize ROI through strategic positioning and efficient project structuring"
    },
    {
      title: "Market Advantage",
      description: "Position your project for success in Dubai's competitive real estate market"
    },
    {
      title: "Regulatory Compliance",
      description: "Ensure full alignment with zoning, legal, and regulatory requirements"
    },
    {
      title: "Expert Guidance",
      description: "Benefit from nearly two decades of development expertise and market knowledge"
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 to-white">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        {/* Golden gradient background */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-amber-900/20 via-transparent to-amber-800/10 -z-10"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="container-custom mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full mb-8 text-amber-300 hover:bg-amber-400/20 transition-all">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Back to Services
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            360 <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Solutions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Fully integrated real estate development services from concept to completion with strategic insights and expert execution.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">
              Comprehensive Development <span className="text-amber-400">Expertise</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Our 360 Solutions division delivers a fully integrated approach to real estate development, designed to maximize the potential of every project from concept to completion.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We partner with investors, developers, and landowners to turn ideas into profitable, market-ready assets by combining strategic insights with hands-on execution.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Start Your Project
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_7.jpg"
              alt="Comprehensive Development Solutions"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent"></div>
          </div>
        </div>

        {/* Core Services Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Our Integrated <span className="text-amber-400">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive suite of services covering every aspect of real estate development planning and analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-2xl p-8 hover:border-amber-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-3">{item.description}</p>
                  <p className="text-gray-500 text-sm italic">{item.details}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-3xl p-12 md:p-16 mb-24">
          <h2 className="text-3xl font-black text-white mb-8">
            Our <span className="text-amber-400">Approach</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            By integrating market intelligence, financial expertise, and practical execution, 360 Solutions helps stakeholders make confident, data-driven decisions and deliver projects that stand out in Dubai's competitive real estate landscape.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <StarIcon className="h-8 w-8 text-amber-400 mb-3" />
              <div className="text-2xl font-black text-white mb-2">Strategic</div>
              <p className="text-gray-400">Market-focused development planning</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <ChartBarIcon className="h-8 w-8 text-amber-400 mb-3" />
              <div className="text-2xl font-black text-white mb-2">Financial</div>
              <p className="text-gray-400">Comprehensive ROI modeling</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <Cog8ToothIcon className="h-8 w-8 text-amber-400 mb-3" />
              <div className="text-2xl font-black text-white mb-2">Operational</div>
              <p className="text-gray-400">Structured implementation support</p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Our <span className="text-amber-400">Process</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A systematic methodology ensuring comprehensive analysis and actionable recommendations
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-amber-400 to-yellow-500 text-slate-900 font-black text-xl">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Why Choose Ragdol <span className="text-amber-400">360 Solutions?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-2xl p-8 hover:border-amber-400/50 transition-all duration-300">
                <CheckCircleIcon className="h-8 w-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">
              Project <span className="text-amber-400">Gallery</span>
            </h2>
            <p className="text-gray-400">Discover successful developments we've analyzed and strategized</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/CREEK_PALACE_DCH_EMAAR_5.jpg", title: "Waterfront Dev", desc: "Strategic positioning" },
              { img: "/CREEK_PALACE_DCH_EMAAR_10.jpg", title: "Modern Complex", desc: "Market analysis" },
              { img: "/CREEK_PALACE_DCH_EMAAR_13.jpg", title: "Mixed-Use", desc: "ROI optimization" }
            ].map((project, idx) => (
              <div key={idx} className="relative h-72 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/40 to-transparent group-hover:from-slate-900/98 transition-all duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-amber-300 font-semibold text-sm">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 border border-amber-500/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Maximize Your <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Development Potential?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let our 360 Solutions experts analyze your project and create a winning development strategy.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
            >
              Request Consultation
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
