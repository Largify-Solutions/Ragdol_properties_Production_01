'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  BuildingOffice2Icon,
  CogIcon,
  WrenchIcon,
  SparklesIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

const constructionServices = [
  {
    icon: BuildingOffice2Icon,
    title: 'Enabling & Civil Works',
    description: 'Site preparation, earthworks, foundations, and structural frameworks ensuring a solid start to every project.'
  },
  {
    icon: CogIcon,
    title: 'MEP Installations',
    description: 'Full mechanical, electrical, and plumbing solutions integrated seamlessly into the build for optimal performance.'
  },
  {
    icon: SparklesIcon,
    title: 'Swimming Pools & Water Features',
    description: 'Custom pool design and installation creating luxurious amenities that enhance property value and appeal.'
  },
  {
    icon: CheckBadgeIcon,
    title: 'Landscaping & Hardscaping',
    description: 'Professional landscape design and installation enhancing aesthetics, functionality, and outdoor living spaces.'
  },
  {
    icon: WrenchIcon,
    title: 'Steel Structures & Architecture',
    description: 'Durable steel construction and tailored architectural elements creating distinctive, long-lasting features.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Waterproofing & Protection',
    description: 'Advanced waterproofing systems and protective coatings safeguarding buildings from environmental damage.'
  },
  {
    icon: LightBulbIcon,
    title: 'Thermal Insulation & Energy Efficiency',
    description: 'Advanced material applications reducing operational costs and enhancing building energy performance.'
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Quality Control & Compliance',
    description: 'Strict quality controls and industry standard compliance ensuring excellence at every construction phase.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Project Planning & Design',
    description: 'Develop comprehensive construction plans aligned with design specifications and project requirements'
  },
  {
    number: '02',
    title: 'Site Preparation & Enablement',
    description: 'Execute site preparation, earthworks, and foundation work establishing the project foundation'
  },
  {
    number: '03',
    title: 'Structural Construction',
    description: 'Build primary and secondary structures with precision and adherence to engineering standards'
  },
  {
    number: '04',
    title: 'MEP & Systems Installation',
    description: 'Install mechanical, electrical, plumbing systems and specialized features integrated throughout'
  },
  {
    number: '05',
    title: 'Finishing & Protection',
    description: 'Apply protective systems, insulation, landscaping, and final finishing touches'
  },
  {
    number: '06',
    title: 'Quality Assurance & Handover',
    description: 'Conduct comprehensive inspections and testing before final project handover'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Technical Expertise',
    description: 'Experienced teams with specialized knowledge across all construction disciplines'
  },
  {
    icon: CheckCircleIcon,
    title: 'Timely Delivery',
    description: 'Strict project management and scheduling ensuring on-time project completion'
  },
  {
    icon: CheckCircleIcon,
    title: 'Cost Efficiency',
    description: 'Optimized processes and resource management delivering value without compromising quality'
  },
  {
    icon: CheckCircleIcon,
    title: 'Quality Standards',
    description: 'Uncompromised quality with rigorous inspections and compliance with industry standards'
  },
  {
    icon: CheckCircleIcon,
    title: 'Innovation & Technology',
    description: 'Advanced construction methods and technologies improving efficiency and project outcomes'
  },
  {
    icon: CheckCircleIcon,
    title: 'Integrated Solutions',
    description: 'Seamless coordination across all trades ensuring cohesive, efficient project execution'
  }
]

const stats = [
  { value: '200+', label: 'Projects Completed' },
  { value: '98%', label: 'On-Time Delivery' },
  { value: '50M+', label: 'Sq.Ft. Constructed' }
]

export default function ConstructionServicesPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_13.jpg"
            alt="Construction Services"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Construction <span className="bg-linear-to-r from-slate-400 to-gray-500 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Comprehensive base-build and specialized construction solutions delivered with technical expertise, precision, and unwavering quality standards.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-slate-400 to-gray-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-slate-500/50 transition-all duration-300">
                Get Construction Quote
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-slate-400/50 text-slate-300 font-bold rounded-lg hover:bg-slate-400/10 transition-all duration-300">
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
              Comprehensive Construction <span className="bg-linear-to-r from-slate-400 to-gray-500 bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              Our Construction Services division delivers comprehensive base-build and specialized construction solutions designed to meet the highest industry standards. Whether residential, commercial, or mixed-use, our team provides the technical expertise needed to turn concepts into reality.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              We manage every phase of construction with precision and transparency, from enabling and civil works to MEP installations, specialized features, and protective systems. By combining innovative methods, strict quality controls, and experienced project teams, we ensure timely delivery, cost efficiency, and uncompromised quality.
            </p>
            <div className="space-y-3">
              {['Expert Teams', 'Precision Execution', 'Quality Assurance'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-slate-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_11.jpg"
              alt="Construction Project"
              fill
              className="object-cover rounded-2xl scale-110 hover:scale-125 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-400/20 rounded-2xl p-8 text-center hover:border-slate-400/50 transition-all">
                <div className="text-4xl font-bold bg-linear-to-r from-slate-400 to-gray-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="details" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Construction Services</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive solutions spanning every phase of construction</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {constructionServices.map((service, idx) => {
            const Icon = service.icon
            return (
              <div 
                key={idx}
                className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-400/20 rounded-2xl p-6 hover:border-slate-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-400/10"
              >
                <div className="w-12 h-12 bg-linear-to-br from-slate-400 to-gray-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm Construction Services?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="flex gap-4">
                  <Icon className="h-6 w-6 text-slate-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Construction Process</h2>
          <p className="text-xl text-gray-300">From planning to completion with precision and quality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-slate-400 to-gray-500 text-white font-bold text-lg">
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
      </section>

      {/* Expertise Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Structural Excellence',
                items: ['Civil Works', 'Foundations', 'Steel Structures', 'Architectural Design']
              },
              {
                title: 'Systems Integration',
                items: ['MEP Systems', 'Smart Technology', 'HVAC Solutions', 'Fire Safety']
              },
              {
                title: 'Finishing & Features',
                items: ['Swimming Pools', 'Landscaping', 'Hardscaping', 'Waterproofing']
              },
              {
                title: 'Performance & Durability',
                items: ['Thermal Insulation', 'Energy Efficiency', 'Protective Coatings', 'Quality Assurance']
              }
            ].map((expertise, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-400/20 rounded-2xl p-8 hover:border-slate-400/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-6">{expertise.title}</h3>
                <ul className="space-y-3">
                  {expertise.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-linear-to-r from-slate-400 to-gray-500 rounded-full"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Construction Excellence</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_9.jpg', title: 'Structural Development' },
            { src: '/CREEK_PALACE_DCH_EMAAR_15.jpg', title: 'MEP Integration' },
            { src: '/CREEK_PALACE_DCH_EMAAR_16.jpg', title: 'Finishing & Completion' }
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
            src="/CREEK_PALACE_DCH_EMAAR_14.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Build Your Next Project with Confidence
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Partner with fäm Properties Construction for expertise, innovation, and uncompromised quality across all construction disciplines.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-slate-400 to-gray-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-slate-500/50 transition-all duration-300"
            >
              Get Construction Quote
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-slate-400 text-slate-300 font-bold rounded-lg hover:bg-slate-400/10 transition-all duration-300"
            >
              Contact Our Team
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            200+ projects completed with 98% on-time delivery and 50M+ sq.ft. of construction excellence
          </p>
        </div>
      </section>
    </div>
  )
}
