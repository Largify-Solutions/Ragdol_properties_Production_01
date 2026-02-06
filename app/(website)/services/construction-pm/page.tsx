'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  DocumentCheckIcon,
  ChatBubbleLeftIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'

const pmServices = [
  {
    icon: ClipboardDocumentListIcon,
    title: 'Project Planning & Scheduling',
    description: 'Detailed project plans outlining timelines, milestones, and deliverables with advanced scheduling tools for progress monitoring.'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Budget Management',
    description: 'Accurate cost estimation and expense tracking ensuring the project stays within approved budget without overruns.'
  },
  {
    icon: UserGroupIcon,
    title: 'Contractor & Vendor Coordination',
    description: 'Management of all contractors, subcontractors, and suppliers ensuring quality standards and timeline adherence.'
  },
  {
    icon: EyeIcon,
    title: 'Quality Control & Inspections',
    description: 'Regular inspections at key milestones ensuring all work meets specifications and adheres to local regulations.'
  },
  {
    icon: ExclamationTriangleIcon,
    title: 'Risk Management & Problem Solving',
    description: 'Proactive identification and mitigation of potential risks including delays, budget changes, and supply disruptions.'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Compliance & Permitting',
    description: 'Ensuring adherence to building codes, regulations, and safety standards with all necessary permits and approvals.'
  },
  {
    icon: ChatBubbleLeftIcon,
    title: 'Stakeholder Communication & Reporting',
    description: 'Regular transparent updates and detailed reports keeping all stakeholders informed throughout construction.'
  },
  {
    icon: CheckBadgeIcon,
    title: 'Final Handover & Closeout',
    description: 'Final inspections, comprehensive handover packages with warranties, documentation, and maintenance instructions.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Project Initiation',
    description: 'Define scope, objectives, stakeholders, and establish project governance framework'
  },
  {
    number: '02',
    title: 'Planning & Scheduling',
    description: 'Develop detailed plans, timelines, budgets, and resource allocation strategies'
  },
  {
    number: '03',
    title: 'Procurement & Contracting',
    description: 'Source contractors and vendors, negotiate contracts, and establish supplier relationships'
  },
  {
    number: '04',
    title: 'Construction Execution',
    description: 'Oversee construction activities with regular inspections and quality control oversight'
  },
  {
    number: '05',
    title: 'Monitoring & Control',
    description: 'Track progress, manage changes, resolve issues, and maintain budget and schedule compliance'
  },
  {
    number: '06',
    title: 'Closure & Handover',
    description: 'Final inspections, documentation, handover, and project closeout activities'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'On-Time Delivery',
    description: 'Expert scheduling and coordination ensures projects are completed according to established timelines'
  },
  {
    icon: CheckCircleIcon,
    title: 'Cost Control',
    description: 'Rigorous budget management prevents cost overruns and keeps projects financially aligned'
  },
  {
    icon: CheckCircleIcon,
    title: 'Quality Assurance',
    description: 'Regular inspections and quality control ensure exceptional construction standards throughout'
  },
  {
    icon: CheckCircleIcon,
    title: 'Risk Mitigation',
    description: 'Proactive risk management identifies and addresses potential issues before they become problems'
  },
  {
    icon: CheckCircleIcon,
    title: 'Seamless Communication',
    description: 'Transparent stakeholder communication keeps everyone informed and involved throughout the project'
  },
  {
    icon: CheckCircleIcon,
    title: 'Peace of Mind',
    description: 'Comprehensive project oversight means you can focus on your business while we manage construction'
  }
]

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%', label: 'On-Time Completion Rate' },
  { value: '99%', label: 'Budget Adherence' }
]

export default function ConstructionPMPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_16.jpg"
            alt="Construction Management"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Construction <span className="bg-linear-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Project Management</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Expert oversight of your entire construction project from planning to handover. On-time delivery, budget control, and exceptional quality guaranteed.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-teal-400 to-cyan-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300">
                Get Project Manager
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-teal-400/50 text-teal-300 font-bold rounded-lg hover:bg-teal-400/10 transition-all duration-300">
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
              Expert Construction <span className="bg-linear-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Oversight & Control</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              Our Construction Project Management service oversees the entire construction process, ensuring your project is completed on time, within budget, and to the highest quality standards. We coordinate between architects, contractors, and suppliers for seamless execution.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Our experienced project managers take responsibility for keeping your construction running smoothly, mitigating risks, and addressing challenges as they arise. Whether residential, commercial, or mixed-use, we provide expert guidance for successful outcomes.
            </p>
            <div className="space-y-3">
              {['End-to-End Management', 'Budget Control', 'Quality Assurance'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-teal-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_14.jpg"
              alt="Construction Project"
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
            <h2 className="text-4xl font-bold text-white mb-4">Project Management Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive services covering every aspect of construction project lifecycle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pmServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-teal-400/20 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-teal-400/20 rounded-2xl p-8 text-center hover:border-teal-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm Project Management?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-teal-400 shrink-0 mt-1" />
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
            <h2 className="text-4xl font-bold text-white mb-4">Project Management Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to construction excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-teal-400 to-cyan-500 text-white font-bold text-lg">
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

      {/* Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Managed Construction Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_13.jpg', title: 'Residential Complex Delivery' },
            { src: '/CREEK_PALACE_DCH_EMAAR_10.jpg', title: 'Commercial Project Execution' },
            { src: '/CREEK_PALACE_DCH_EMAAR_15.jpg', title: 'Mixed-Use Development' }
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
            src="/CREEK_PALACE_DCH_EMAAR_12.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Ensure Project Success?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let fäm Properties manage your construction project with expertise, precision, and unwavering commitment to delivering excellence on time and within budget.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-teal-400 to-cyan-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-teal-400 text-teal-300 font-bold rounded-lg hover:bg-teal-400/10 transition-all duration-300"
            >
              Contact Project Team
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            150+ projects delivered on time with 98% completion rate and 99% budget adherence
          </p>
        </div>
      </section>
    </div>
  )
}
