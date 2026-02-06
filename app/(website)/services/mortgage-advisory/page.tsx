'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  BanknotesIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  CreditCardIcon,
  GlobeAltIcon,
  SparklesIcon,
  BriefcaseIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function MortgageAdvisoryPage() {
  const services = [
    {
      title: "Pre-Approval Assistance",
      description: "Obtain mortgage pre-approval upfront",
      icon: DocumentCheckIcon,
      details: "Know your borrowing capacity and negotiate confidently with pre-approval from multiple lenders"
    },
    {
      title: "Loan Comparison",
      description: "Access to 40+ banks and institutions",
      icon: ArrowTrendingUpIcon,
      details: "Compare interest rates, payment plans, and products to find the perfect fit for your situation"
    },
    {
      title: "Documentation Support",
      description: "Streamlined application and approval process",
      icon: BriefcaseIcon,
      details: "We handle all paperwork and coordinate directly with banks for fast and smooth approval"
    },
    {
      title: "Refinancing Solutions",
      description: "Restructure existing mortgages",
      icon: CreditCardIcon,
      details: "Refinance to better rates, reduce payments, or restructure to match your current goals"
    },
    {
      title: "Non-Resident Support",
      description: "Expert guidance for foreign investors",
      icon: GlobeAltIcon,
      details: "Specialized assistance for international buyers ensuring compliance with local regulations"
    },
    {
      title: "Commercial Financing",
      description: "Bulk and commercial property solutions",
      icon: BanknotesIcon,
      details: "Bespoke financial solutions for developers, businesses, and large-scale investments"
    },
    {
      title: "End-to-End Advisory",
      description: "Full transparency and ongoing support",
      icon: SparklesIcon,
      details: "Clear communication throughout the entire process with personalized financial strategies"
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Financial Assessment",
      description: "Evaluate your financial profile, creditworthiness, and borrowing capacity"
    },
    {
      number: "02",
      title: "Product Research",
      description: "Analyze 40+ lenders to find competitive rates and flexible terms"
    },
    {
      number: "03",
      title: "Pre-Approval Submission",
      description: "Submit applications to selected lenders for pre-approval"
    },
    {
      number: "04",
      title: "Documentation Coordination",
      description: "Prepare and submit all required documents to lenders"
    },
    {
      number: "05",
      title: "Negotiation & Approval",
      description: "Negotiate terms and secure final mortgage approval"
    },
    {
      number: "06",
      title: "Closing & Disbursement",
      description: "Finalize all details and coordinate loan disbursement with your purchase"
    }
  ]

  const benefits = [
    {
      title: "Expert Guidance",
      description: "Experienced advisors with deep knowledge of UAE banking landscape"
    },
    {
      title: "Cost Savings",
      description: "Secure the best rates and terms, potentially saving thousands in interest"
    },
    {
      title: "Time Efficiency",
      description: "Faster approval process with our direct bank relationships"
    },
    {
      title: "Multiple Options",
      description: "Access to diverse products including fixed rate, variable, and Islamic financing"
    },
    {
      title: "Transparent Process",
      description: "Complete clarity on rates, fees, and terms at every stage"
    },
    {
      title: "Ongoing Support",
      description: "Continued assistance even after your mortgage is approved"
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
            Mortgage Advisory & <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Brokerage</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Expert financing solutions connecting you with the best mortgage options from 40+ leading banks.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">
              Smart <span className="text-amber-400">Financing Solutions</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Our Mortgage Advisory and Brokerage service is all about helping you finance your property in the smartest, most cost-effective way possible.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Whether you're a first-time homebuyer, an investor expanding your portfolio, or a business owner purchasing commercial space, we provide expert guidance tailored to your unique financial profile and investment goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Get Mortgage Pre-Approval
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_6.jpg"
              alt="Mortgage Advisory Excellence"
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
              Our <span className="text-amber-400">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive mortgage advisory and brokerage solutions for all property financing needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-2">{item.description}</p>
                  <p className="text-gray-500 text-xs italic">{item.details}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-3xl p-12 md:p-16 mb-24">
          <h2 className="text-3xl font-black text-white mb-8">
            Why Choose Ragdol <span className="text-amber-400">Mortgage Advisory?</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-12">
            Our team of experienced mortgage advisors works closely with a wide network of banks and financial institutions in the UAE and beyond. We don't just connect you with lenders—we take the time to understand your financial situation and tailor solutions that truly fit your needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <div className="text-3xl font-black text-amber-400 mb-4">40+</div>
              <h3 className="text-lg font-bold text-white mb-2">Bank Partners</h3>
              <p className="text-gray-400 text-sm">Access to leading UAE and international lenders</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <div className="text-3xl font-black text-amber-400 mb-4">AED 500B+</div>
              <h3 className="text-lg font-bold text-white mb-2">Financed</h3>
              <p className="text-gray-400 text-sm">Over 500 billion AED in mortgages successfully arranged</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <div className="text-3xl font-black text-amber-400 mb-4">10,000+</div>
              <h3 className="text-lg font-bold text-white mb-2">Clients</h3>
              <p className="text-gray-400 text-sm">Thousands of satisfied clients across UAE and globally</p>
            </div>
          </div>
        </div>

        {/* Loan Types Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-black text-white mb-8">
              Flexible Loan <span className="text-amber-400">Options</span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Fixed Rate Mortgages",
                  desc: "Stable payments with predictable costs throughout the loan term"
                },
                {
                  title: "Variable Rate Options",
                  desc: "Flexible rates that adjust based on market conditions"
                },
                {
                  title: "Islamic Finance Solutions",
                  desc: "Sharia-compliant financing meeting your religious preferences"
                },
                {
                  title: "Investment Loans",
                  desc: "Tailored financing for rental properties and investment portfolios"
                },
                {
                  title: "Commercial Mortgages",
                  desc: "Specialized solutions for office, retail, and business properties"
                }
              ].map((type, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircleIcon className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{type.title}</h3>
                    <p className="text-gray-400 text-sm">{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_15.jpg"
              alt="Flexible Loan Options"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent"></div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Our <span className="text-amber-400">Process</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A straightforward methodology ensuring you get the right mortgage at the best rates
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

        {/* Property Gallery */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">
              Properties We've <span className="text-amber-400">Financed</span>
            </h2>
            <p className="text-gray-400">Portfolio of properties successfully financed through our advisory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/CREEK_PALACE_DCH_EMAAR_3.jpg", title: "Luxury Residential", type: "Home Purchase" },
              { img: "/CREEK_PALACE_DCH_EMAAR_8.jpg", title: "Investment Portfolio", type: "Refinancing" },
              { img: "/CREEK_PALACE_DCH_EMAAR_16.jpg", title: "Commercial Complex", type: "Bulk Financing" }
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
                  <p className="text-amber-300 font-semibold text-sm">{property.type}</p>
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
              Ready to Secure Your <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Perfect Mortgage?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Get instant access to competitive rates from 40+ lenders with personalized advisory support.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
            >
              Get Free Mortgage Consultation
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
