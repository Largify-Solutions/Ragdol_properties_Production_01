'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  HomeIcon,
  UserGroupIcon,
  CameraIcon,
  WrenchIcon,
  DocumentCheckIcon,
  SparklesIcon,
  ClipboardDocumentCheckIcon,
  BoltIcon,
  ShieldCheckIcon,
  CogIcon
} from '@heroicons/react/24/outline'

export default function PropertyManagementPage() {
  const mainServices = [
    {
      title: "Tenancy Management",
      description: "Professional tenant screening, lease management, and ongoing support",
      icon: UserGroupIcon,
      details: "Screening and selecting qualified tenants, handling lease agreements, and addressing tenant concerns during the tenancy period."
    },
    {
      title: "Handover & Snagging",
      description: "Thorough inspections ensuring properties delivered in perfect condition",
      icon: ClipboardDocumentCheckIcon,
      details: "Conducting detailed snagging inspections and condition reports to ensure properties are ready for occupancy or sale."
    },
    {
      title: "Premium Marketing",
      description: "High-quality visuals and virtual tours to attract tenants and buyers",
      icon: CameraIcon,
      details: "HD photography, professional videos, 360° virtual tours, and multi-channel promotion for maximum visibility."
    },
    {
      title: "Asset Preservation",
      description: "Preventive maintenance and 24/7 vendor access for property upkeep",
      icon: WrenchIcon,
      details: "Regularly scheduled maintenance and approved vendors available around the clock for any service requests."
    },
    {
      title: "ERP/CRM Platform",
      description: "Oracle-based system for transparent property management",
      icon: CogIcon,
      details: "Bespoke CRM platform providing real-time access to reports, secure data management, and transparent operations."
    },
    {
      title: "Property Optimization",
      description: "Strategic enhancements to maximize property value and appeal",
      icon: SparklesIcon,
      details: "Value-add recommendations and optimization strategies tailored to market conditions and property potential."
    }
  ]

  const snagServices = [
    {
      number: "01",
      title: "Comprehensive Inspection",
      description: "Engineering-based inspections by qualified engineers, architects, and technical specialists"
    },
    {
      number: "02",
      title: "Detailed Documentation",
      description: "Defect identification with photos and descriptions using 'Snag It' proprietary app"
    },
    {
      number: "03",
      title: "Status Tracking",
      description: "Real-time tracking of remediation status before and after fixes"
    },
    {
      number: "04",
      title: "Condition Reports",
      description: "Professional reports supporting handover and purchase decisions"
    }
  ]

  const benefits = [
    {
      title: "Peace of Mind",
      description: "Comprehensive inspections and professional management for complete confidence"
    },
    {
      title: "Quality Assurance",
      description: "All issues identified and resolved before occupancy or sale"
    },
    {
      title: "Maximum Value",
      description: "Strategic maintenance and marketing enhance property appeal and rental/resale value"
    },
    {
      title: "Expert Team",
      description: "Qualified engineers, architects, and property professionals at your service"
    },
    {
      title: "Technology-Driven",
      description: "Oracle-based systems for transparent, efficient, and secure management"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock access to approved vendors and emergency services"
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
            Property Management <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Comprehensive property management and snagging services designed to enhance value, functionality, and investor returns.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">
              Professional Property <span className="text-amber-400">Management</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At Ragdol Properties, we provide a comprehensive range of property management and snagging services designed to enhance the value and functionality of real estate assets in Dubai.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Our suite of services is tailored to meet the diverse needs of property owners and investors, ensuring that each asset is managed with the utmost professionalism and care.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Get Your Free Assessment
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_10.jpg"
              alt="Property Management Excellence"
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
              Comprehensive solutions covering every aspect of property management and optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((item, idx) => {
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

        {/* Snagging Services Section */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-3xl p-12 md:p-16 mb-24">
          <h2 className="text-3xl font-black text-white mb-8">
            Snagging & <span className="text-amber-400">Inspection Services</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-12">
            Understanding the critical importance of property condition at the time of handover, Ragdol Properties offers specialized snagging and inspection services. These services are designed to identify and address any defects or issues before the property is occupied or sold, providing peace of mind to property owners and buyers.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {snagServices.map((step, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-amber-400/10">
                <div className="text-3xl font-black text-amber-400 mb-4">{step.number}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-slate-900/50 rounded-xl border border-amber-300/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheckIcon className="h-6 w-6 text-amber-400" />
              Our "Snag It" Proprietary App
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We utilize an engineering-based inspection process conducted by qualified engineers, architects, and technical inspectors using our proprietary "Snag It" app. This delivers comprehensive reports with descriptions, photos, and status tracking of all identified defects before and after remediation, ensuring smooth handovers.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Why Choose Ragdol <span className="text-amber-400">Property Management?</span>
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
              Managed <span className="text-amber-400">Properties</span>
            </h2>
            <p className="text-gray-400">Premium portfolios we maintain and optimize across Dubai</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/CREEK_PALACE_DCH_EMAAR_4.jpg", title: "Luxury Residential", desc: "Premium Apartments" },
              { img: "/CREEK_PALACE_DCH_EMAAR_7.jpg", title: "Mixed Portfolio", desc: "Diverse Assets" },
              { img: "/CREEK_PALACE_DCH_EMAAR_14.jpg", title: "Investment Grade", desc: "Strategic Holdings" }
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
                  <p className="text-amber-300 font-semibold text-sm">{property.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features Breakdown */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-3xl font-black text-white mb-8">
              Advanced Property <span className="text-amber-400">Management Platform</span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Real-Time Reporting",
                  desc: "Instant access to property performance metrics and analytics"
                },
                {
                  title: "Transparent Operations",
                  desc: "Complete visibility into all management activities and decisions"
                },
                {
                  title: "Secure Data Management",
                  desc: "Enterprise-grade security for all tenant and property information"
                },
                {
                  title: "Integrated Workflows",
                  desc: "Seamless coordination between maintenance, tenancy, and marketing"
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <BoltIcon className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_17.jpg"
              alt="Management Platform"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent"></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 border border-amber-500/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Optimize Your <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Property Portfolio?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let our expert team handle all aspects of property management while you enjoy steady returns and peace of mind.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
            >
              Schedule Free Consultation
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}