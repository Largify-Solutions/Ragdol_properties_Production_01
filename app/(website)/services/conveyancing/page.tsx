'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  DocumentCheckIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline'

export default function ConveyancingPage() {
  const services = [
    {
      title: "Property Sales & Purchases",
      description: "Full legal transfer of ownership with contract management",
      icon: BuildingOffice2Icon,
      details: "Managing the full legal transfer for buyers and sellers, including drafting contracts, coordinating with parties, and DLD submission."
    },
    {
      title: "Title Deed Transfers",
      description: "Efficient processing of all title deed registrations",
      icon: DocumentCheckIcon,
      details: "Handling resales, new purchases, and mortgage releases in full compliance with UAE real estate law."
    },
    {
      title: "Property Gifting Services",
      description: "Seamless property transfers between family members",
      icon: HandRaisedIcon,
      details: "Facilitating gifting process including valuation, NOCs, documentation, and official registration."
    },
    {
      title: "Property Valuation",
      description: "RERA-approved certified property valuations",
      icon: CreditCardIcon,
      details: "Professional valuations essential for gifting, mortgage purposes, and sales accuracy."
    },
    {
      title: "Golden Visa Assistance",
      description: "Complete guidance for visa through property ownership",
      icon: GlobeAltIcon,
      details: "Handling application preparation, documentation, approvals, and renewals for smooth visa experience."
    },
    {
      title: "Company Formation & Structuring",
      description: "Legal entity setup for property investment",
      icon: BriefcaseIcon,
      details: "Assisting with onshore/offshore companies, SPVs, and trusts for tax-efficient ownership."
    },
    {
      title: "Power of Attorney Services",
      description: "Representation and documentation for overseas clients",
      icon: ClipboardDocumentCheckIcon,
      details: "Facilitating PoA documentation to carry out transactions on your behalf when unavailable."
    },
    {
      title: "Due Diligence & Legal Advice",
      description: "Thorough contract review and risk assessment",
      icon: ShieldCheckIcon,
      details: "Comprehensive review, risk assessment, and compliance checks to protect from liabilities."
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "Understand your requirements and assess the transaction scope"
    },
    {
      number: "02",
      title: "Document Collection",
      description: "Gather all required documents and conduct thorough due diligence"
    },
    {
      number: "03",
      title: "Contract Preparation",
      description: "Draft, review, and negotiate all legal agreements and contracts"
    },
    {
      number: "04",
      title: "Regulatory Compliance",
      description: "Ensure full compliance with UAE real estate law and DLD requirements"
    },
    {
      number: "05",
      title: "Processing & Registration",
      description: "Submit documents to DLD and manage the registration process"
    },
    {
      number: "06",
      title: "Completion & Handover",
      description: "Finalize all formalities and provide you with complete documentation"
    }
  ]

  const benefits = [
    {
      title: "Legal Expertise",
      description: "Deep knowledge of UAE real estate and conveyancing laws"
    },
    {
      title: "Complete Protection",
      description: "Thorough due diligence and risk assessment for peace of mind"
    },
    {
      title: "Time Efficiency",
      description: "Streamlined processes ensuring timely completion of all transactions"
    },
    {
      title: "Regulatory Compliance",
      description: "Full adherence to all DLD and UAE legal requirements"
    },
    {
      title: "Personalized Service",
      description: "Tailored solutions for each unique property transaction"
    },
    {
      title: "Expert Support",
      description: "Dedicated team guiding you through every step of the process"
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
            Conveyancing <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Expert legal guidance simplifying every step of your property transaction with complete compliance and peace of mind.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">
              Trusted Legal <span className="text-amber-400">Partner</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Our conveyancing services are designed to simplify the entire property transaction process—whether you're buying, selling, transferring, or gifting a property.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We act as your trusted legal partner, managing all the paperwork, compliance, and regulatory requirements, so you can focus on your investment goals without the stress of navigating complex procedures.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Get Legal Guidance
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_2.jpg"
              alt="Conveyancing Excellence"
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
              Comprehensive conveyancing solutions covering every aspect of property transactions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            Why Choose Ragdol <span className="text-amber-400">Conveyancing?</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-12">
            With nearly two decades of experience in Dubai's real estate market, we understand the intricacies of UAE conveyancing law. Our expert team ensures every transaction is handled with precision, protecting your interests while maintaining full regulatory compliance.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <div className="text-3xl font-black text-amber-400 mb-4">100%</div>
              <h3 className="text-lg font-bold text-white mb-2">Compliance</h3>
              <p className="text-gray-400 text-sm">Full adherence to all UAE laws and DLD requirements</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <div className="text-3xl font-black text-amber-400 mb-4">99.9%</div>
              <h3 className="text-lg font-bold text-white mb-2">Success Rate</h3>
              <p className="text-gray-400 text-sm">Successful completion of thousands of transactions</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
              <div className="text-3xl font-black text-amber-400 mb-4">24/7</div>
              <h3 className="text-lg font-bold text-white mb-2">Support</h3>
              <p className="text-gray-400 text-sm">Dedicated legal team always available for assistance</p>
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
              A proven methodology ensuring smooth, compliant, and timely transaction completion
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

        {/* Transaction Types Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_11.jpg"
              alt="Transaction Types"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent"></div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-white mb-8">
              Wide Range of <span className="text-amber-400">Transaction Types</span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Residential Transactions",
                  desc: "From apartments to villas, we handle all residential property transfers"
                },
                {
                  title: "Commercial Properties",
                  desc: "Expert guidance for office, retail, and investment property conveyancing"
                },
                {
                  title: "Family Transfers",
                  desc: "Gifting and inheritance transfers with proper legal documentation"
                },
                {
                  title: "International Buyers",
                  desc: "Specialized assistance for overseas investors and foreign nationals"
                },
                {
                  title: "Golden Visa Route",
                  desc: "Strategic property purchases supporting UAE Golden Visa applications"
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
        </div>

        {/* Property Gallery */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">
              Properties We've <span className="text-amber-400">Conveyed</span>
            </h2>
            <p className="text-gray-400">Portfolio of successful transactions we've completed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/CREEK_PALACE_DCH_EMAAR_5.jpg", title: "Luxury Penthouse", type: "Sale Transfer" },
              { img: "/CREEK_PALACE_DCH_EMAAR_9.jpg", title: "Investment Villa", type: "Purchase" },
              { img: "/CREEK_PALACE_DCH_EMAAR_13.jpg", title: "Family Property", type: "Gifting" }
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
              Ready to Simplify Your <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Property Transaction?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let our expert legal team guide you through every step with confidence and compliance.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
            >
              Schedule Legal Consultation
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
