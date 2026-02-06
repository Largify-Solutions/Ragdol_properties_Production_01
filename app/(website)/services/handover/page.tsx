'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  HandRaisedIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  HomeModernIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const handoverServices = [
  {
    icon: ClipboardDocumentListIcon,
    title: 'Pre-Handover Coordination',
    description: 'Align with developers, contractors, and stakeholders to prepare properties for delivery with all necessary works completed.'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Documentation & Compliance Review',
    description: 'Verification of completion certificates, warranties, manuals, DLP terms, and all essential handover documentation.'
  },
  {
    icon: HomeModernIcon,
    title: 'On-Site Handover Support',
    description: 'Professional representatives manage walkthroughs, unit orientations, key collection, and final client sign-offs.'
  },
  {
    icon: ChatBubbleLeftIcon,
    title: 'Client Communication',
    description: 'Clear communication with buyers or tenants about handover appointments, unit status, and next steps.'
  },
  {
    icon: CheckBadgeIcon,
    title: 'After-Handover Follow-Up',
    description: 'Post-handover checks to ensure client satisfaction, resolve pending issues, and close the process professionally.'
  },
  {
    icon: UserGroupIcon,
    title: 'Stakeholder Coordination',
    description: 'Seamless coordination between developers, property managers, buyers, and regulatory authorities.'
  },
  {
    icon: SparklesIcon,
    title: 'Quality Final Walkthrough',
    description: 'Comprehensive final inspection ensuring all property standards are met before client acceptance.'
  },
  {
    icon: HandRaisedIcon,
    title: 'Handover Documentation Package',
    description: 'Complete handover packages including warranties, maintenance instructions, and necessary documentation.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Pre-Handover Planning',
    description: 'Coordinate with developer and set handover schedule and requirements'
  },
  {
    number: '02',
    title: 'Documentation Preparation',
    description: 'Compile and verify all certificates, warranties, manuals, and compliance documents'
  },
  {
    number: '03',
    title: 'Property Preparation',
    description: 'Ensure property is clean, complete, and ready for buyer walkthrough'
  },
  {
    number: '04',
    title: 'Client Notification',
    description: 'Communicate handover date, time, and requirements to all parties'
  },
  {
    number: '05',
    title: 'Handover Execution',
    description: 'Manage on-site handover with walkthroughs, orientation, and key transfer'
  },
  {
    number: '06',
    title: 'Post-Handover Support',
    description: 'Follow-up checks and resolution of any post-handover issues'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Reduce Delays',
    description: 'Eliminate miscommunication and streamline the handover process'
  },
  {
    icon: CheckCircleIcon,
    title: 'Enhance Satisfaction',
    description: 'Deliver a smooth, stress-free handover experience that builds buyer trust'
  },
  {
    icon: CheckCircleIcon,
    title: 'Ensure Compliance',
    description: 'Verify regulatory and contractual handover requirements are met'
  },
  {
    icon: CheckCircleIcon,
    title: 'Offload Pressure',
    description: 'Remove administrative and operational burden from your internal team'
  },
  {
    icon: CheckCircleIcon,
    title: 'Professional Experience',
    description: 'Deliver a complete, high-quality client experience from start to finish'
  },
  {
    icon: CheckCircleIcon,
    title: 'Complete Documentation',
    description: 'Maintain comprehensive records and documentation for future reference'
  }
]

const stats = [
  { value: '2000+', label: 'Successful Handovers' },
  { value: '99%', label: 'On-Time Delivery' },
  { value: '97%', label: 'Client Satisfaction' }
]

export default function HandoverPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_8.jpg"
            alt="Property Handover"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Property & Project <span className="bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Handover</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              From project completion to client occupancy. Professional handover services ensuring smooth, transparent, and stress-free property transfer.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300">
                Schedule Handover
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-emerald-400/50 text-emerald-300 font-bold rounded-lg hover:bg-emerald-400/10 transition-all duration-300">
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
              Seamless Property Transfer & <span className="bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Client Onboarding</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              The transition from project completion to property handover is a critical phase requiring coordination, documentation, and attention to detail. fäm Properties offers dedicated handover services to ensure developers and buyers experience a smooth, transparent, and stress-free transfer.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              We manage the end-to-end handover journey, bridging the gap between construction and occupancy with professional oversight and hands-on execution. From pre-handover preparation to post-handover follow-up, we ensure every detail is perfect.
            </p>
            <div className="space-y-3">
              {['Complete Coordination', 'Full Documentation', 'Professional Support'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_5.jpg"
              alt="Handover Process"
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
            <h2 className="text-4xl font-bold text-white mb-4">Handover Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive handover management covering all phases of property transfer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {handoverServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-emerald-400/20 rounded-2xl p-6 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-emerald-400/20 rounded-2xl p-8 text-center hover:border-emerald-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm Handover Services?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Ideal For</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              'Real Estate Developers',
              'Project Management Teams',
              'Building Owners',
              'Real Estate Brokerages',
              'Facility Management'
            ].map((category, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-emerald-400/20 rounded-2xl p-6 text-center hover:border-emerald-400/50 transition-all">
                <h3 className="text-lg font-bold text-white">{category}</h3>
                <div className="mt-4 h-1 w-8 bg-linear-to-r from-emerald-400 to-teal-500 mx-auto rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Handover Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to seamless property transfer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text-white font-bold text-lg">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Handover Experience</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/CREEK_PALACE_DCH_EMAAR_7.jpg', title: 'Pre-Handover Coordination' },
              { src: '/CREEK_PALACE_DCH_EMAAR_2.jpg', title: 'On-Site Walkthroughs' },
              { src: '/CREEK_PALACE_DCH_EMAAR_4.jpg', title: 'Client Orientation' }
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
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-slate-900/80 to-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_1.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ensure Smooth Property Handover
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let fäm Properties manage your property handover with professionalism, transparency, and attention to detail. From coordination to client satisfaction, we handle it all.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
            >
              Schedule Handover
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-emerald-400 text-emerald-300 font-bold rounded-lg hover:bg-emerald-400/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            2000+ successful handovers with 99% on-time delivery and 97% client satisfaction
          </p>
        </div>
      </section>
    </div>
  )
}
