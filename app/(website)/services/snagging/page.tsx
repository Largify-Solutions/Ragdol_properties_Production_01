'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  CameraIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  HandThumbUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const snagServices = [
  {
    icon: MagnifyingGlassIcon,
    title: 'Professional Engineering Inspections',
    description: 'Qualified engineers conduct detailed room-by-room inspections using industry best practices and standards.'
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Tailored Checklists',
    description: 'Customized inspection checklists for each property type—apartments, villas, townhouses, commercial units.'
  },
  {
    icon: CameraIcon,
    title: 'Comprehensive Reports with Photos',
    description: 'Clear reports with photographic documentation, detailed descriptions, and suggested corrective actions.'
  },
  {
    icon: ChartBarIcon,
    title: 'Defect Identification & Analysis',
    description: 'Systematic identification of construction defects, cosmetic issues, and functional problems with prioritization.'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Pre-Handover Inspections',
    description: 'Thorough inspections before property handover to identify and resolve issues before occupation.'
  },
  {
    icon: HandThumbUpIcon,
    title: 'Post-Handover Support',
    description: 'Ongoing support for resale properties ensuring compliance with construction standards and contracts.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Compliance Verification',
    description: 'Verification of adherence to construction standards, regulations, and contract specifications.'
  },
  {
    icon: SparklesIcon,
    title: 'Negotiation Leverage Reports',
    description: 'Professional reports that provide impartial documentation for negotiations with developers or sellers.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Scheduling & Planning',
    description: 'Coordinate inspection timing based on property stage and client needs'
  },
  {
    number: '02',
    title: 'Property Assessment',
    description: 'Initial site assessment to understand property type, condition, and inspection scope'
  },
  {
    number: '03',
    title: 'Detailed Inspection',
    description: 'Comprehensive room-by-room inspection with engineering precision and documentation'
  },
  {
    number: '04',
    title: 'Issue Documentation',
    description: 'Detailed photographic and written documentation of all identified defects and issues'
  },
  {
    number: '05',
    title: 'Report Generation',
    description: 'Comprehensive report with findings, descriptions, photos, and recommended remediation actions'
  },
  {
    number: '06',
    title: 'Follow-up Support',
    description: 'Ongoing support for remediation tracking and compliance verification'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Safeguard Your Investment',
    description: 'Protect your property investment with expert quality control before handover'
  },
  {
    icon: CheckCircleIcon,
    title: 'Avoid Costly Repairs',
    description: 'Identify and address issues early to prevent expensive post-handover remediation'
  },
  {
    icon: CheckCircleIcon,
    title: 'Gain Negotiation Leverage',
    description: 'Use professional reports to strengthen negotiations with developers or sellers'
  },
  {
    icon: CheckCircleIcon,
    title: 'Ensure Compliance',
    description: 'Verify adherence to construction standards, regulations, and contract requirements'
  },
  {
    icon: CheckCircleIcon,
    title: 'Professional Impartiality',
    description: 'Receive trusted, independent reporting from qualified engineering professionals'
  },
  {
    icon: CheckCircleIcon,
    title: 'Peace of Mind',
    description: 'Move into your property confident that all quality standards have been verified'
  }
]

const stats = [
  { value: '5000+', label: 'Properties Inspected' },
  { value: '98%', label: 'Defect Detection Rate' },
  { value: '95%', label: 'Client Satisfaction' }
]

export default function SnagginPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_17.jpg"
            alt="Snagging Inspection"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Property Engineered <span className="bg-linear-to-r from-[#8A6508] to-[#5C4204] bg-clip-text text-transparent">Snagging & Inspection</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional quality assurance service ensuring your property meets the highest standards of construction quality, safety, and workmanship.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-[#8A6508] to-[#5C4204] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#8A6508]/50 transition-all duration-300">
                Schedule Inspection
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-[#8A6508]/50 text-[#8A6508] font-bold rounded-lg hover:bg-[#8A6508]/10 transition-all duration-300">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Quality Assurance Through <span className="bg-linear-to-r from-[#8A6508] to-[#5C4204] bg-clip-text text-transparent">Expert Inspection</span>
            </h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              Snagging is the process of thoroughly inspecting a property to detect issues such as incomplete finishes, cosmetic defects, or functional problems. These inspections are essential before moving in, leasing, or completing a purchase.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              At fäm Properties, our specialized snagging and inspection service helps property owners, buyers, and investors identify and resolve construction defects before handover or occupation. Our goal is to protect your investment and ensure your property meets the highest standards.
            </p>
            <div className="space-y-3">
              {['Engineering Excellence', 'Comprehensive Reports', 'Actionable Solutions'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-[#8A6508] shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_11.jpg"
              alt="Quality Inspection"
              fill
              className="object-cover rounded-2xl scale-110 hover:scale-125 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="details" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Snagging Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive inspection and quality assurance across all property types</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {snagServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-white border border-[#8A6508]/20 rounded-2xl p-6 hover:border-[#8A6508]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#8A6508]/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-[#8A6508] to-[#5C4204] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
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
            <div key={idx} className="bg-white border border-[#8A6508]/20 rounded-2xl p-8 text-center hover:border-[#8A6508]/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-[#8A6508] to-[#5C4204] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose fäm Snagging Services?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-[#8A6508] shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Who Should Use Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Who Should Use This Service?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              'Property Buyers',
              'Real Estate Investors',
              'Developers & Builders',
              'Landlords & Tenants',
              'Property Managers'
            ].map((category, idx) => (
              <div key={idx} className="bg-white border border-[#8A6508]/20 rounded-2xl p-6 text-center hover:border-[#8A6508]/50 transition-all">
                <h3 className="text-lg font-bold text-gray-900">{category}</h3>
                <div className="mt-4 h-1 w-8 bg-linear-to-r from-[#8A6508] to-[#5C4204] mx-auto rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Snagging Process</h2>
            <p className="text-xl text-gray-600">Our systematic approach to comprehensive quality assurance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-[#8A6508] to-[#5C4204] text-white font-bold text-lg">
                    {step.number}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Quality Assurance in Action</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/CREEK_PALACE_DCH_EMAAR_3.jpg', title: 'Detailed Property Assessment' },
              { src: '/CREEK_PALACE_DCH_EMAAR_6.jpg', title: 'Comprehensive Inspection' },
              { src: '/CREEK_PALACE_DCH_EMAAR_9.jpg', title: 'Professional Documentation' }
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
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_13.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Protect Your Investment Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule a professional snagging and inspection with fäm Properties. Our expert engineers will ensure your property meets the highest quality standards before handover.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-[#8A6508] to-[#5C4204] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#8A6508]/50 transition-all duration-300"
            >
              Schedule Inspection
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-[#8A6508] text-[#8A6508] font-bold rounded-lg hover:bg-[#8A6508]/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          <p className="text-gray-600 text-sm mt-8">
            5000+ properties inspected with 98% defect detection rate and 95% client satisfaction
          </p>
        </div>
      </section>
    </div>
  )
}
