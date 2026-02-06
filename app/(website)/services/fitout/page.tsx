'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  StarIcon,
  Square3Stack3DIcon,
  PaintBrushIcon,
  CogIcon,
  SparklesIcon,
  WindowIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'

export default function FitoutServicesPage() {
  const services = [
    {
      title: "Aluminium and Façade Solutions",
      description: "Custom aluminium cladding and façade enhancements designed to improve aesthetics, durability, and energy efficiency.",
      icon: Square3Stack3DIcon
    },
    {
      title: "Glazing and Glass Installations",
      description: "High-performance glazing, partitions, and bespoke glass elements that add light, openness, and modern appeal.",
      icon: WindowIcon
    },
    {
      title: "Metal Works and Joinery",
      description: "Precision metal fabrication and tailored joinery solutions to complement architectural design and functionality.",
      icon: CogIcon
    },
    {
      title: "Premium Finishing",
      description: "From flooring and wall treatments to fine detailing, our finishing services create a polished, market-ready look.",
      icon: PaintBrushIcon
    },
    {
      title: "Custom Architectural Elements",
      description: "Bespoke design solutions that elevate property aesthetics and create distinctive, memorable spaces.",
      icon: SparklesIcon
    },
    {
      title: "Quality Assurance",
      description: "Rigorous inspection and testing to ensure every fitout meets our exacting standards and your expectations.",
      icon: CheckCircleIcon
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Design Consultation",
      description: "Work with architects and designers to develop a comprehensive fitout strategy"
    },
    {
      number: "02",
      title: "Material Selection",
      description: "Choose premium materials that align with design vision and budget parameters"
    },
    {
      number: "03",
      title: "Project Planning",
      description: "Develop detailed timeline and resource allocation for seamless execution"
    },
    {
      number: "04",
      title: "Expert Installation",
      description: "Execute all fitout works with precision by experienced craftsmen"
    },
    {
      number: "05",
      title: "Quality Inspection",
      description: "Conduct thorough quality checks to ensure excellence at every detail"
    },
    {
      number: "06",
      title: "Final Handover",
      description: "Deliver a market-ready property that exceeds expectations"
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
            Fitout <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            End-to-end interior and exterior solutions crafted to the highest standards of craftsmanship and design.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">
              Premium Fitout <span className="text-amber-400">Excellence</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At Ragdol Properties, we understand that the finishing touches define the quality and value of a property. Our dedicated Fitout Services division delivers end-to-end interior and exterior solutions tailored to meet the highest standards of craftsmanship and design.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Whether you are an investor preparing a property for market, a landlord enhancing tenant appeal, or an owner creating a dream space, our fitout team handles every detail with precision.
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
              src="/CREEK_PALACE_DCH_EMAAR_4.jpg"
              alt="Premium Fitout Services"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Our Fitout <span className="text-amber-400">Solutions</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive specialized services covering every aspect of premium fitout work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => {
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

        {/* Expertise Section */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-3xl p-12 md:p-16 mb-24">
          <h2 className="text-3xl font-black text-white mb-8">
            Our <span className="text-amber-400">Approach</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            We combine technical expertise with premium materials and strict project management to deliver on time and within budget. Our fitout team works seamlessly with property owners, architects, and designers to ensure each project aligns with its vision while maximizing property value and tenant satisfaction.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="text-4xl font-black text-amber-400 mb-2">20+</div>
              <p className="text-gray-300 font-bold">Years of Experience</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="text-4xl font-black text-amber-400 mb-2">1000+</div>
              <p className="text-gray-300 font-bold">Projects Completed</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="text-4xl font-black text-amber-400 mb-2">100%</div>
              <p className="text-gray-300 font-bold">Client Satisfaction</p>
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
              A systematic approach to deliver exceptional fitout results
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

        {/* Why Choose Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-black text-white mb-6">
              Why Choose Ragdol <span className="text-amber-400">Fitout Services?</span>
            </h2>
            <ul className="space-y-4">
              {[
                "Premium materials sourced from trusted suppliers",
                "Experienced craftsmen with proven track records",
                "On-time delivery with strict quality standards",
                "Transparent communication throughout the project",
                "Competitive pricing without compromising quality",
                "Comprehensive warranties on all work"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircleIcon className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                  <span className="text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_9.jpg"
              alt="Luxury Interior Design"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent"></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 border border-amber-500/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Transform Your <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Property?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let our fitout experts create a premium finish that maximizes your property's value and appeal.
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
