'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  SwatchIcon,
  HomeModernIcon,
  EyeIcon,
  SunIcon,
  CheckBadgeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

const designServices = [
  {
    icon: PencilSquareIcon,
    title: 'Bespoke Design Concept',
    description: 'Comprehensive consultation to understand your style and objectives, crafting personalized designs that reflect your unique identity.'
  },
  {
    icon: Squares2X2Icon,
    title: 'Space Planning & Layout Optimization',
    description: 'Strategic space planning maximizing flow, functionality, and user experience while maintaining balanced, harmonious aesthetics.'
  },
  {
    icon: SwatchIcon,
    title: 'Material Selection & Customization',
    description: 'Carefully curated high-quality materials including custom cabinetry, flooring, lighting, and furnishings tailored to your vision.'
  },
  {
    icon: HomeModernIcon,
    title: 'Furniture & Decor Selection',
    description: 'Curated selection of statement furniture, lighting, textiles, and accessories blending style with practicality and lifestyle needs.'
  },
  {
    icon: EyeIcon,
    title: '3D Visualizations & Renderings',
    description: 'Detailed 3D renderings and visualizations allowing you to see and adjust the design before execution begins.'
  },
  {
    icon: SunIcon,
    title: 'Sustainability & Innovation',
    description: 'Eco-friendly materials and energy-efficient solutions combining modern aesthetics with responsible green design principles.'
  },
  {
    icon: CheckBadgeIcon,
    title: 'Turnkey Project Execution',
    description: 'Complete project oversight managing materials, contractors, and craftsmen ensuring flawless implementation with seamless experience.'
  },
  {
    icon: ArrowPathIcon,
    title: 'Post-Completion Services',
    description: 'Ongoing maintenance, styling updates, and seasonal refreshes ensuring your space always looks and functions beautifully.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'Meet to discuss your vision, style preferences, lifestyle needs, and project objectives'
  },
  {
    number: '02',
    title: 'Space Analysis & Concept',
    description: 'Evaluate existing space and develop initial design concepts and mood boards'
  },
  {
    number: '03',
    title: '3D Visualization',
    description: 'Create detailed 3D renderings showing layout, finishes, and design elements for approval'
  },
  {
    number: '04',
    title: 'Material & Furniture Selection',
    description: 'Source and finalize all materials, furnishings, and accessories aligned with design'
  },
  {
    number: '05',
    title: 'Project Execution',
    description: 'Oversee installation and execution ensuring every detail matches the design vision'
  },
  {
    number: '06',
    title: 'Final Styling & Support',
    description: 'Complete styling and provide ongoing maintenance and support services'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Personalized Space',
    description: 'Designs crafted exclusively for you reflecting your unique style, taste, and lifestyle requirements'
  },
  {
    icon: CheckCircleIcon,
    title: 'Enhanced Functionality',
    description: 'Strategic space planning and layout optimization maximizing usability and daily comfort'
  },
  {
    icon: CheckCircleIcon,
    title: 'Premium Quality',
    description: 'Highest-quality materials and finishes carefully selected for durability and aesthetic appeal'
  },
  {
    icon: CheckCircleIcon,
    title: 'Risk Reduction',
    description: 'Detailed 3D visualizations allow you to see results before implementation reducing design uncertainty'
  },
  {
    icon: CheckCircleIcon,
    title: 'Sustainable Design',
    description: 'Eco-friendly materials and energy-efficient solutions reducing environmental impact without compromising style'
  },
  {
    icon: CheckCircleIcon,
    title: 'Long-Term Beauty',
    description: 'Post-completion services and maintenance ensure your space remains beautiful and functional for years'
  }
]

const stats = [
  { value: '300+', label: 'Projects Designed' },
  { value: '95%', label: 'Client Satisfaction' },
  { value: '10+', label: 'Years of Experience' }
]

export default function InteriorDesignPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_11.jpg"
            alt="Interior Design"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Interior <span className="bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Design Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Bespoke interior designs that elevate aesthetics and functionality. Transform your space into a stunning reflection of your personal style with expert design and flawless execution.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-rose-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-rose-500/50 transition-all duration-300">
                Start Your Project
              </Link>
              <Link href="#details" className="px-8 py-4 border-2 border-rose-400/50 text-rose-300 font-bold rounded-lg hover:bg-rose-400/10 transition-all duration-300">
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
              Design That Reflects <span className="bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Your Essence</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              Our Interior Design service is dedicated to creating bespoke designs that elevate both the aesthetics and functionality of your property. We understand that your home or commercial space is more than just a place—it's a reflection of your personal style, values, and lifestyle.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Our expert interior designers work closely with you to bring your vision to life. From single room renovations to complete home transformations, we focus on creating harmonious environments that resonate with elegance, comfort, and practicality. Every detail is thoughtfully planned and expertly executed.
            </p>
            <div className="space-y-3">
              {['Personalized Design', 'Expert Execution', 'Timeless Aesthetics'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-rose-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_7.jpg"
              alt="Interior Design Concept"
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
            <h2 className="text-4xl font-bold text-white mb-4">Our Design Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive solutions from concept to completion for beautiful, functional spaces</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-rose-400/20 rounded-2xl p-6 hover:border-rose-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-rose-400/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-rose-400/20 rounded-2xl p-8 text-center hover:border-rose-400/50 transition-all">
              <div className="text-4xl font-bold bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose fäm Interior Design?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <Icon className="h-6 w-6 text-rose-400 shrink-0 mt-1" />
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
            <h2 className="text-4xl font-bold text-white mb-4">Design Process</h2>
            <p className="text-xl text-gray-300">Our systematic approach to creating your dream space</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-rose-400 to-pink-500 text-white font-bold text-lg">
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
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Design Showcase</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_13.jpg', title: 'Modern Residential Design' },
            { src: '/CREEK_PALACE_DCH_EMAAR_14.jpg', title: 'Luxury Living Space' },
            { src: '/CREEK_PALACE_DCH_EMAAR_10.jpg', title: 'Contemporary Interior' }
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
            src="/CREEK_PALACE_DCH_EMAAR_17.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Transform Your Space Into a Design Masterpiece
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Discover how expert interior design can elevate your home or commercial space. Let our designers create a beautiful, functional environment perfectly suited to your lifestyle.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-rose-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-rose-500/50 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-rose-400 text-rose-300 font-bold rounded-lg hover:bg-rose-400/10 transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Creating beautiful, personalized spaces that inspire and delight
          </p>
        </div>
      </section>
    </div>
  )
}
