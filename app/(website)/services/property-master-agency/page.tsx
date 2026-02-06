'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  UsersIcon,
  RocketLaunchIcon,
  CogIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline'

const masterAgencyServices = [
  {
    icon: RocketLaunchIcon,
    title: 'Project Launch Strategy',
    description: 'We advise on product positioning, pricing, unit release phasing, and go-to-market strategy—ensuring your development enters the market at the right time with the right message.'
  },
  {
    icon: ChartBarIcon,
    title: 'Sales Management & Coordination',
    description: 'We manage and lead an exclusive or preferred network of sub-agencies and brokers, providing tools, training, and updates to effectively sell your project.'
  },
  {
    icon: CogIcon,
    title: 'Centralized CRM & Reporting',
    description: 'Through our proprietary Oracle-based CRM system, we provide real-time tracking of leads, sales performance, payments, and client communications.'
  },
  {
    icon: SparklesIcon,
    title: 'Branding & Marketing Oversight',
    description: 'From creative direction to campaign execution, we define your project\'s identity and push it across digital and traditional marketing channels.'
  },
  {
    icon: UsersIcon,
    title: 'Investor Relations & VIP Sales',
    description: 'Leveraging our elite client base and global partnerships, we generate interest among serious buyers and investors early in the sales cycle.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Compliance & DLD Coordination',
    description: 'We oversee all legal and administrative aspects, including project registration with the Dubai Land Department and regulatory compliance.'
  },
  {
    icon: BanknotesIcon,
    title: 'Post-Sales Services',
    description: 'We continue to manage buyer communication, coordinate handovers, and support payment collection and title deed issuance throughout the journey.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Market Analysis',
    description: 'Deep dive into market conditions, competitive landscape, and buyer demographics to inform strategy'
  },
  {
    number: '02',
    title: 'Strategy Development',
    description: 'Create comprehensive go-to-market strategy including positioning, pricing, and phasing'
  },
  {
    number: '03',
    title: 'Infrastructure Setup',
    description: 'Establish CRM systems, agency network, marketing frameworks, and operational protocols'
  },
  {
    number: '04',
    title: 'Launch Execution',
    description: 'Execute coordinated marketing campaigns and agency activation across all channels'
  },
  {
    number: '05',
    title: 'Sales Optimization',
    description: 'Monitor performance, optimize strategies, and accelerate sales velocity throughout campaign'
  },
  {
    number: '06',
    title: 'Lifecycle Management',
    description: 'Manage completions, handovers, and post-sales services for exceptional customer satisfaction'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Complete Market Control',
    description: 'Full oversight of your project\'s sales strategy and execution across all channels'
  },
  {
    icon: CheckCircleIcon,
    title: 'Maximized Sales Velocity',
    description: 'Coordinated agency network and proven playbooks drive faster, higher-volume sales'
  },
  {
    icon: CheckCircleIcon,
    title: 'Real-Time Transparency',
    description: 'Oracle-based CRM provides instant visibility into all sales, leads, and customer interactions'
  },
  {
    icon: CheckCircleIcon,
    title: 'Brand Consistency',
    description: 'Unified marketing and messaging across all touchpoints strengthens your project identity'
  },
  {
    icon: CheckCircleIcon,
    title: 'Strategic Partnerships',
    description: 'Access to elite buyer networks and global investor relationships you may not reach alone'
  },
  {
    icon: CheckCircleIcon,
    title: 'End-to-End Support',
    description: 'From launch through post-sales, we handle the entire lifecycle so you can focus on building'
  }
]

const stats = [
  { value: '50+', label: 'Projects Managed' },
  { value: '10,000+', label: 'Units Sold' },
  { value: 'AED 100B+', label: 'Total Value Managed' }
]

export default function MasterAgencyPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_1.jpg"
            alt="Luxury Development"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Real Estate <span className="bg-linear-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Master Agency</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Your Strategic Partner for Development Success. From concept to completion, we orchestrate comprehensive sales strategies that drive results.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300">
                Partner with Us
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-amber-400/50 text-amber-400 font-bold rounded-lg hover:bg-amber-400/10 transition-all duration-300">
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
              More Than a Sales Partner—<span className="bg-linear-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">A Strategic Engine</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              At fäm Properties, we act as a trusted Real Estate Master Agency, partnering with developers to streamline and manage the entire property transaction process from concept to completion. We don't just handle sales—we orchestrate a full-service strategy that brings developments to life.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              We serve as the central hub between developers, agents, and buyers, ensuring consistency in communication, marketing, pricing, and execution. By taking full ownership of the sales and operations process, we enable developers to focus on what they do best—building high-quality projects—while we handle the rest with expertise and precision.
            </p>
            <div className="space-y-3">
              {['Exclusive Developer Partnerships', 'Multi-Agency Coordination', '24/7 Operational Support'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-amber-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_4.jpg"
              alt="Strategic Partnership"
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
            <h2 className="text-4xl font-bold text-white mb-4">Our Master Agency Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive solutions covering every aspect of development sales and lifecycle management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {masterAgencyServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/20 rounded-2xl p-8 text-center hover:border-amber-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Partner with fäm Master Agency?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
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
            <h2 className="text-4xl font-bold text-white mb-4">Master Agency Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to development success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-yellow-400 to-amber-500 text-white font-bold text-lg">
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
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Projects We've Launched</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_9.jpg', title: 'Luxury Development Launch' },
            { src: '/CREEK_PALACE_DCH_EMAAR_12.jpg', title: 'High-Rise Project Coordination' },
            { src: '/CREEK_PALACE_DCH_EMAAR_14.jpg', title: 'Master-Planned Community' }
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
            src="/CREEK_PALACE_DCH_EMAAR_2.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Launch Your Next Development?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let fäm Properties handle your master agency strategy while you focus on building excellence.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-amber-400 text-amber-400 font-bold rounded-lg hover:bg-amber-400/10 transition-all duration-300"
            >
              Contact Sales Team
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Available for exclusive developer partnerships across all UAE developments
          </p>
        </div>
      </section>
    </div>
  )
}
