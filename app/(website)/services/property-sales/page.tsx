'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  StarIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  DocumentCheckIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function PropertySalesPage() {
  const highlights = [
    {
      title: "Deep Market Research",
      description: "We dive deep into feasibility studies and market analysis to assess commercial viability, helping our partners make data-driven decisions from day one.",
      icon: ChartBarIcon
    },
    {
      title: "Strategic Marketing",
      description: "Our creative teams develop powerful branding and marketing strategies tailored to each project, from online campaigns to exclusive on-site events.",
      icon: StarIcon
    },
    {
      title: "Legal Excellence",
      description: "We handle operational essentials like setting up development companies, managing DLD project registrations, and ensuring all legal frameworks are airtight.",
      icon: DocumentCheckIcon
    },
    {
      title: "Complete Transaction Management",
      description: "From the moment a buyer shows interest to the day they receive their title deed, we manage every touchpoint with transparency and professionalism.",
      icon: CheckCircleIcon
    },
    {
      title: "Global Reach",
      description: "Our reach extends globally through a network of strategic partners, ensuring your project gets the attention it deserves in international markets.",
      icon: GlobeAltIcon
    },
    {
      title: "Expert Sales Team",
      description: "We plan unit releases carefully, optimize pricing, and execute through the region's most dynamic and experienced sales force.",
      icon: UserGroupIcon
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Market Analysis & Feasibility",
      description: "Comprehensive research to assess project viability and market positioning"
    },
    {
      number: "02",
      title: "Branding & Strategy",
      description: "Develop unique brand identity and targeted marketing strategy"
    },
    {
      number: "03",
      title: "Legal Setup",
      description: "Establish development company and manage DLD registrations"
    },
    {
      number: "04",
      title: "Pre-Launch Marketing",
      description: "Build anticipation through strategic PR and exclusive previews"
    },
    {
      number: "05",
      title: "Sales Execution",
      description: "Deploy experienced sales team with optimized pricing strategy"
    },
    {
      number: "06",
      title: "Post-Sale Support",
      description: "Manage buyer communications and handover documentation"
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
            Property Sales <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Expert off-plan sales management for developers—delivered with precision and professionalism.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">
              Seamless Property Sales <span className="text-amber-400">Excellence</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At Ragdol Properties, we specialize in managing off-plan property sales for developers—and when we say "delivered," we mean it. Our mission is to facilitate seamless property sales while ensuring our clients achieve maximum returns on their investments.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              With nearly two decades of experience in Dubai's real estate market, we've fine-tuned a process that covers every angle, from initial planning to final handover.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Get Started Today
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_3.jpg"
              alt="Property Sales Excellence"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent"></div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              What We <span className="text-amber-400">Deliver</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our comprehensive approach ensures every aspect of your sales success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-2xl p-8 hover:border-amber-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Our <span className="text-amber-400">Process</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A proven methodology refined over nearly two decades in Dubai's real estate market
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

        {/* Project Gallery */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">
              Featured <span className="text-amber-400">Projects</span>
            </h2>
            <p className="text-gray-400">Successful developments we've brought to market</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/CREEK_PALACE_DCH_EMAAR_1.jpg", title: "Luxury Development", price: "AED 5.2M" },
              { img: "/CREEK_PALACE_DCH_EMAAR_6.jpg", title: "Mixed-Use Project", price: "AED 3.8M" },
              { img: "/CREEK_PALACE_DCH_EMAAR_12.jpg", title: "Waterfront Complex", price: "AED 6.1M" }
            ].map((property, idx) => (
              <div key={idx} className="relative h-72 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={property.img}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/40 to-transparent group-hover:from-slate-900/98 transition-all duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{property.title}</h3>
                  <p className="text-amber-300 font-bold text-lg">{property.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-3xl p-12 md:p-16 mb-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-white mb-8">
              Our <span className="text-amber-400">Philosophy</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We don't just sell properties—we build legacies. This is what drives every decision we make and every strategy we execute.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              When it comes to sales strategy, we don't just push units—we position them. We plan unit releases carefully, optimize pricing, and execute through the region's most dynamic and experienced salesforce. This is the Ragdol Properties difference.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 border border-amber-500/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Maximize Your <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Sales Potential?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let Ragdol Properties manage your off-plan sales with expertise and precision.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
            >
              Schedule Consultation
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
