'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  StarIcon,
  ChartBarIcon,
  CameraIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  SparklesIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

export default function PropertyResalePage() {
  const services = [
    {
      title: "Market Valuation",
      description: "Thorough market analysis using real-time data and deep local insights to determine competitive pricing.",
      icon: ChartBarIcon,
      details: "We analyze comparable properties, market trends, and buyer demand to position your property perfectly."
    },
    {
      title: "Strategic Marketing",
      description: "Tailored campaigns with high-quality photography, 360° virtual tours, and comprehensive digital exposure.",
      icon: CameraIcon,
      details: "Our in-house team crafts compelling listings across all major platforms to reach serious buyers quickly."
    },
    {
      title: "Expert Negotiations",
      description: "Professional buyer interactions and offer negotiations with transparency and professionalism.",
      icon: UserGroupIcon,
      details: "Our experienced agents handle all communications and work to close deals efficiently and favorably."
    },
    {
      title: "Legal & Paperwork",
      description: "Complete handling of all legal processes and documentation without stress or complications.",
      icon: DocumentCheckIcon,
      details: "We manage every detail from title transfer to final closing, ensuring a smooth transaction."
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Property Assessment",
      description: "Comprehensive evaluation of your property's condition, features, and market position"
    },
    {
      number: "02",
      title: "Market Analysis & Valuation",
      description: "Detailed market research to determine optimal pricing based on comparable sales"
    },
    {
      number: "03",
      title: "Marketing Strategy",
      description: "Development of customized marketing plan with professional photography and digital campaigns"
    },
    {
      number: "04",
      title: "Buyer Engagement",
      description: "Active promotion across all channels to attract qualified and serious buyers"
    },
    {
      number: "05",
      title: "Offer Negotiation",
      description: "Expert negotiation of offers to maximize your returns and secure best terms"
    },
    {
      number: "06",
      title: "Closing & Handover",
      description: "Complete management of legal processes and smooth property handover to buyer"
    }
  ]

  const benefits = [
    {
      title: "Market Expertise",
      description: "Backed by years of Dubai real estate experience and deep market knowledge"
    },
    {
      title: "Extensive Network",
      description: "Access to serious buyers through our trusted reputation and broad connections"
    },
    {
      title: "Strategic Positioning",
      description: "Your property presented optimally to capture buyer interest and maximize value"
    },
    {
      title: "Professional Marketing",
      description: "High-quality visuals, virtual tours, and compelling listings that stand out"
    },
    {
      title: "Transparent Communication",
      description: "Kept informed at every step with regular updates and honest guidance"
    },
    {
      title: "Hassle-Free Process",
      description: "All paperwork and legal matters handled professionally without stress"
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
            Property Resale <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Expert guidance to maximize your returns when selling your property at competitive market prices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">
              Maximize Your <span className="text-amber-400">Property Value</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At Ragdol Properties, we take pride in assisting our clients with reselling their properties at the most competitive prices in the market.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Whether you're looking to liquidate an investment, upgrade your living space, or simply make a change, we ensure your resale journey is smooth, strategic, and profitable.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Sell Your Property
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_16.jpg"
              alt="Property Resale Excellence"
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
              Our <span className="text-amber-400">Resale Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive solutions designed to sell your property quickly and at the best possible price
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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

        {/* Key Differentiator */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-3xl p-12 md:p-16 mb-24">
          <h2 className="text-3xl font-black text-white mb-8">
            Why Ragdol <span className="text-amber-400">Resale Services?</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            With Ragdol, you're not just reselling—you're tapping into one of the most trusted names in Dubai real estate, backed by years of market expertise, extensive buyer networks, and a passion for delivering results.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <ArrowTrendingUpIcon className="h-8 w-8 text-amber-400 mb-3" />
              <div className="text-2xl font-black text-white mb-2">Fast Sales</div>
              <p className="text-gray-400">Quick buyer connections through our extensive network</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <StarIcon className="h-8 w-8 text-amber-400 mb-3" />
              <div className="text-2xl font-black text-white mb-2">Best Prices</div>
              <p className="text-gray-400">Market expertise ensures competitive and fair valuation</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <CheckCircleIcon className="h-8 w-8 text-amber-400 mb-3" />
              <div className="text-2xl font-black text-white mb-2">Expert Handling</div>
              <p className="text-gray-400">All negotiations and paperwork professionally managed</p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Our Resale <span className="text-amber-400">Process</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A proven methodology ensuring smooth, efficient, and profitable property sales
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

        {/* Benefits Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Key <span className="text-amber-400">Benefits</span>
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

        {/* Image Gallery */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">
              Sold <span className="text-amber-400">Properties</span>
            </h2>
            <p className="text-gray-400">Examples of properties we've successfully resold at premium prices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/CREEK_PALACE_DCH_EMAAR_2.jpg", title: "Luxury Apartment", price: "AED 2.5M" },
              { img: "/CREEK_PALACE_DCH_EMAAR_8.jpg", title: "Modern Villa", price: "AED 3.2M" },
              { img: "/CREEK_PALACE_DCH_EMAAR_11.jpg", title: "Downtown Penthouse", price: "AED 4.1M" }
            ].map((property, idx) => (
              <div key={idx} className="relative h-72 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={property.img}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/40 to-transparent group-hover:from-slate-900/98 transition-all duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
                  <p className="text-amber-300 font-bold text-lg">{property.price}</p>
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
              Ready to Sell Your <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Property?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let our expert resale team help you achieve the best possible price and smooth transaction.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
            >
              Get Your Free Valuation
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
