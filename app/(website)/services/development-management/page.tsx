'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  DocumentCheckIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  HandThumbUpIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const managementServices = [
  {
    icon: ClipboardDocumentListIcon,
    title: 'Project Planning & Feasibility Studies',
    description: 'Detailed feasibility analysis evaluating market demand, location viability, financial potential, and long-term value positioning.'
  },
  {
    icon: SparklesIcon,
    title: 'Design & Architecture Coordination',
    description: 'Collaborate with architects and designers to ensure designs align with developer vision while meeting market demands and highest standards.'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Budgeting & Cost Management',
    description: 'Comprehensive budget creation and management with cost monitoring, savings opportunities, and full financial oversight.'
  },
  {
    icon: CogIcon,
    title: 'Construction & Contractor Management',
    description: 'Full construction oversight ensuring timeline adherence, quality standards, safety compliance, and issue resolution.'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Regulatory Compliance & Permitting',
    description: 'Navigate regulatory landscape, obtain permits, ensure DLD compliance and all legal and environmental requirements.'
  },
  {
    icon: MegaphoneIcon,
    title: 'Sales & Marketing Strategy',
    description: 'Develop and implement effective marketing strategies with branding, advertising, digital campaigns, and sales events.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Control & Inspections',
    description: 'Rigorous quality control throughout construction with regular site inspections ensuring highest craftsmanship standards.'
  },
  {
    icon: HandThumbUpIcon,
    title: 'Handover & After-Sales Support',
    description: 'Efficient handover process with comprehensive documentation and post-handover support for customer satisfaction.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Sustainability & Innovation',
    description: 'Focus on sustainable development with energy-efficient solutions and eco-friendly materials for future-proof properties.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Project Assessment',
    description: 'Comprehensive evaluation of project scope, goals, timeline requirements, and resource allocation'
  },
  {
    number: '02',
    title: 'Planning & Strategy',
    description: 'Develop detailed project plan with milestones, budgets, risk mitigation, and quality frameworks'
  },
  {
    number: '03',
    title: 'Design Coordination',
    description: 'Oversee architectural and design development ensuring alignment with vision and market positioning'
  },
  {
    number: '04',
    title: 'Construction Execution',
    description: 'Manage all construction phases with rigorous quality control, timeline adherence, and safety compliance'
  },
  {
    number: '05',
    title: 'Marketing & Sales',
    description: 'Execute marketing strategies and sales campaigns to ensure strong buyer/tenant interest and pipeline'
  },
  {
    number: '06',
    title: 'Delivery & Support',
    description: 'Manage handover process and provide comprehensive after-sales support for long-term satisfaction'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'On-Time Delivery',
    description: 'Professional project management ensures your development meets or exceeds timeline expectations consistently'
  },
  {
    icon: CheckCircleIcon,
    title: 'Budget Control',
    description: 'Rigorous cost management and financial oversight keeps projects on budget without quality compromises'
  },
  {
    icon: CheckCircleIcon,
    title: 'Risk Mitigation',
    description: 'Proactive identification and management of potential issues before they become costly problems'
  },
  {
    icon: CheckCircleIcon,
    title: 'Quality Excellence',
    description: 'Unwavering commitment to highest standards ensures exceptional finished properties that exceed expectations'
  },
  {
    icon: CheckCircleIcon,
    title: 'Regulatory Expertise',
    description: 'Deep knowledge of local regulations and DLD requirements ensures smooth approval and compliance processes'
  },
  {
    icon: CheckCircleIcon,
    title: 'Peace of Mind',
    description: 'End-to-end management means you can focus on strategy while we handle all operational complexities'
  }
]

const stats = [
  { value: '100+', label: 'Projects Managed' },
  { value: '500K+', label: 'Sq.ft Delivered' },
  { value: '98%', label: 'On-Time Completion' }
]

export default function DevelopmentManagementPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_2.jpg"
            alt="Development Management"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Development <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Management</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Comprehensive end-to-end project management from inception to handover. We oversee every phase ensuring your development progresses smoothly, on time, and within budget.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
                Get Management Partner
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 font-bold rounded-lg hover:bg-cyan-400/10 transition-all duration-300">
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
              Expert Oversight—<span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">From Inception to Handover</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              Our Real Estate Development Management service offers comprehensive, end-to-end solutions for property developers. We take on the responsibility of overseeing every phase of the project, ensuring it progresses smoothly, on time, and within budget.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Our team of experts brings wealth of experience in real estate development, construction management, and project coordination. Whether you're a large-scale developer or boutique builder, we provide strategic guidance and hands-on management necessary to turn your vision into reality.
            </p>
            <div className="space-y-3">
              {['Professional Project Oversight', 'Budget & Timeline Control', 'Risk Management Expertise'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-cyan-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_9.jpg"
              alt="Project Management"
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
            <h2 className="text-4xl font-bold text-white mb-4">Comprehensive Management Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Complete solutions covering every aspect of development lifecycle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/20 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm Development Management?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-cyan-400 shrink-0 mt-1" />
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
            <h2 className="text-4xl font-bold text-white mb-4">Development Management Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to project excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 text-white font-bold text-lg">
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
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Managed Development Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_3.jpg', title: 'Multi-Phase Development' },
            { src: '/CREEK_PALACE_DCH_EMAAR_14.jpg', title: 'Large-Scale Project Delivery' },
            { src: '/CREEK_PALACE_DCH_EMAAR_12.jpg', title: 'Premium Property Management' }
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
            src="/CREEK_PALACE_DCH_EMAAR_8.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Partner with Expert Development Managers
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let fäm Properties manage your development lifecycle with expertise, efficiency, and unwavering commitment to excellence. Focus on growth while we handle operations.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-300 font-bold rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
            >
              Contact Our Team
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Trusted development management partner for Dubai's most successful projects
          </p>
        </div>
      </section>
    </div>
  )
}
