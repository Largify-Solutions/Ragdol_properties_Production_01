'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  CogIcon,
  EyeIcon,
  SunIcon,
  ChartBarIcon,
  BoltIcon,
  PaintBrushIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

const rentechServices = [
  {
    icon: CogIcon,
    title: 'Smart Home Integrations',
    description: 'Incorporate latest smart home technology with automated lighting, climate control, security systems, and voice-activated devices.'
  },
  {
    icon: EyeIcon,
    title: '3D Visualization & Virtual Reality',
    description: 'Advanced visualization tools to see renovation ideas before work begins, ensuring precise planning and perfect results.'
  },
  {
    icon: SunIcon,
    title: 'Sustainable Renovations',
    description: 'Eco-friendly solutions including sustainable materials, solar panels, and water-saving technologies for reduced environmental impact.'
  },
  {
    icon: ChartBarIcon,
    title: 'Project Management & Real-Time Updates',
    description: 'Cutting-edge project management tools with real-time transparency, progress tracking, and on-the-go decision making.'
  },
  {
    icon: BoltIcon,
    title: 'Energy Efficiency Enhancements',
    description: 'Modern insulation, energy-efficient lighting, advanced HVAC systems, and smart thermostats to reduce utility costs.'
  },
  {
    icon: PaintBrushIcon,
    title: 'Property Staging & Interior Design',
    description: 'Full interior design services using virtual tools to create optimized layouts that enhance functionality and market appeal.'
  },
  {
    icon: SparklesIcon,
    title: 'High-Quality Finishes',
    description: 'Premium materials and finishes from luxury flooring and fixtures to high-end kitchen and bathroom upgrades.'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Cost-Effective Solutions',
    description: 'Technology-driven efficiency enables cost-effective renovations without compromising quality, maximizing your investment returns.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Property Assessment',
    description: 'Evaluate current condition, identify renovation opportunities, and define project scope and goals'
  },
  {
    number: '02',
    title: '3D Design & Visualization',
    description: 'Create detailed 3D models and VR walkthroughs to visualize the final result before construction begins'
  },
  {
    number: '03',
    title: 'Technology Planning',
    description: 'Design smart home integration and technology infrastructure aligned with property requirements'
  },
  {
    number: '04',
    title: 'Construction & Installation',
    description: 'Execute renovation with real-time project tracking and transparent progress updates'
  },
  {
    number: '05',
    title: 'Smart Systems Setup',
    description: 'Install and configure all smart home devices and systems with comprehensive user training'
  },
  {
    number: '06',
    title: 'Quality Verification & Handover',
    description: 'Final inspection, optimization testing, and complete handover with documentation'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Future-Proof Property',
    description: 'Latest smart home and energy technologies ensure your property remains modern and efficient for years'
  },
  {
    icon: CheckCircleIcon,
    title: 'Enhanced Value',
    description: 'High-tech renovations significantly increase property market value and appeal to buyers'
  },
  {
    icon: CheckCircleIcon,
    title: 'Energy Savings',
    description: 'Smart systems and efficiency upgrades reduce utility costs while improving comfort and sustainability'
  },
  {
    icon: CheckCircleIcon,
    title: 'Precision Planning',
    description: 'VR visualization and 3D design ensure renovations match your vision exactly before any work begins'
  },
  {
    icon: CheckCircleIcon,
    title: 'Complete Transparency',
    description: 'Real-time project tracking and updates keep you informed throughout the entire renovation process'
  },
  {
    icon: CheckCircleIcon,
    title: 'Superior Craftsmanship',
    description: 'Premium materials and expert execution deliver exceptional quality finishes that exceed expectations'
  }
]

const stats = [
  { value: '500+', label: 'Renovations Completed' },
  { value: '30%', label: 'Average Property Value Increase' },
  { value: '40%', label: 'Average Utility Cost Reduction' }
]

export default function RenTechPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_5.jpg"
            alt="RenTech Renovation"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              RenTech <span className="bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Tech-driven renovations that transform properties with smart integrations, sustainable solutions, and cutting-edge design. Unlock your property's full potential.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-indigo-400 to-purple-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300">
                Start Your Renovation
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-indigo-400/50 text-indigo-300 font-bold rounded-lg hover:bg-indigo-400/10 transition-all duration-300">
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
              Technology-Driven <span className="bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Property Transformation</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              With fäm Properties RenTech, we transform properties using the latest technologies, delivering cutting-edge renovations that elevate both aesthetic appeal and functionality. Whether refreshing residential spaces, upgrading commercial properties, or maximizing market value, RenTech provides innovative, tech-driven solutions.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              By leveraging advanced tools, sustainable materials, and smart technologies, we help you achieve renovation goals efficiently and effectively. We combine expertise with the power of technology to deliver results that improve appearance, enhance performance, and increase energy efficiency.
            </p>
            <div className="space-y-3">
              {['Smart Home Ready', 'Sustainable Design', 'Tech-Forward Solutions'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-indigo-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_17.jpg"
              alt="Modern Renovation Design"
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
            <h2 className="text-4xl font-bold text-white mb-4">RenTech Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive renovation solutions combining technology, sustainability, and premium craftsmanship</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentechServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-indigo-400/20 rounded-2xl p-6 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-indigo-400/20 rounded-2xl p-8 text-center hover:border-indigo-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose RenTech?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-indigo-400 shrink-0 mt-1" />
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
            <h2 className="text-4xl font-bold text-white mb-4">RenTech Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to transforming your property</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 text-white font-bold text-lg">
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
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Renovation Showcase</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_11.jpg', title: 'Smart Home Renovation' },
            { src: '/CREEK_PALACE_DCH_EMAAR_13.jpg', title: 'Sustainable Design Transform' },
            { src: '/CREEK_PALACE_DCH_EMAAR_2.jpg', title: 'Premium Finish Upgrade' }
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
            src="/CREEK_PALACE_DCH_EMAAR_9.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let RenTech unlock your property's full potential with cutting-edge technology, sustainable solutions, and exceptional design. See the future of your space before construction begins.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-indigo-400 to-purple-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-indigo-400 text-indigo-300 font-bold rounded-lg hover:bg-indigo-400/10 transition-all duration-300"
            >
              View Renovations
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Experience 30% average property value increase with RenTech smart renovations
          </p>
        </div>
      </section>
    </div>
  )
}
