'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  SparklesIcon,
  BuildingOffice2Icon,
  CreditCardIcon,
  HomeIcon,
  DocumentCheckIcon,
  BanknotesIcon,
  UserGroupIcon,
  CogIcon,
  PlusCircleIcon,
  StarIcon,
  BeakerIcon,
  WrenchIcon,
  MagnifyingGlassIcon,
  LockClosedIcon,
  BoltIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  Square3Stack3DIcon
} from '@heroicons/react/24/outline'

const services = [
  {
    id: 1,
    title: "Property Sales Services",
    description: "Expertly managing off-plan sales for developers—delivered with precision.",
    icon: BuildingOffice2Icon,
    href: "/services/property-sales",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "At Ragdoll Properties, we specialize in managing off-plan property sales for developers—and when we say 'delivered,' we mean it. Our mission is to facilitate seamless property sales while ensuring our clients achieve maximum returns on their investments."
  },
  {
    id: 2,
    title: "Fitout Services",
    description: "Full-range specialized fit-out solutions for premium properties.",
    icon: CogIcon,
    href: "/services/fitout",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "We provide a full range of specialized fit-out solutions, including aluminium and façade works, glazing, metal works, joinery, glass installations, and premium finishing."
  },
  {
    id: 3,
    title: "360 Solutions",
    description: "End-to-end real estate development services and analysis.",
    icon: Square3Stack3DIcon,
    href: "/services/360-solutions",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "We provide end-to-end real estate development services, beginning with development structuring, investment analysis, ROI feasibility, and strategic market analysis."
  },
  {
    id: 4,
    title: "Property Resale Services",
    description: "Expert assistance in reselling properties at optimal prices.",
    icon: ArrowTrendingUpIcon,
    href: "/services/property-resale",
    color: "from-[#8A6508] to-[#6E4F05]",
    details: "Assisting clients in reselling their properties at competitive prices with expert market positioning and comprehensive marketing strategies."
  },
  {
    id: 5,
    title: "Property Management Services",
    description: "Comprehensive property management to enhance value.",
    icon: HomeIcon,
    href: "/services/property-management",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Offering full-service property management to maintain and enhance property value through proactive maintenance and professional tenant relations."
  },
  {
    id: 6,
    title: "Conveyancing Services",
    description: "Streamlined legal property transfers and transactions.",
    icon: DocumentCheckIcon,
    href: "/services/conveyancing",
    color: "from-[#8C6A0A] to-[#5C4204]",
    details: "We streamline property sales and help investors secure Golden Visas, offering services like property valuation, gifting, registration, and company setup."
  },
  {
    id: 7,
    title: "Mortgage Advisory & Brokerage",
    description: "Expert financing solutions through premier banking partners.",
    icon: BanknotesIcon,
    href: "/services/mortgage-advisory",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Offering expert advice and brokerage services for property financing with access to competitive rates and flexible solutions."
  },
  {
    id: 8,
    title: "Real Estate Master Agency",
    description: "Master agency services for seamless transactions.",
    icon: UserGroupIcon,
    href: "/services/property-master-agency",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Acting as a master agency to streamline and manage property transactions across multiple channels and market segments."
  },
  {
    id: 9,
    title: "Real Estate Development",
    description: "Visionary architecture and design excellence.",
    icon: WrenchIcon,
    href: "/services/development",
    color: "from-[#8C6A0A] to-[#6E4F05]",
    details: "Delivering architecture and design excellence through seamless development management, blending minimalism with luxurious aesthetics."
  },
  {
    id: 10,
    title: "Development Management",
    description: "Expert oversight from inception to handover.",
    icon: CheckCircleIcon,
    href: "/services/development-management",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Managing the entire development process from inception to handover with meticulous attention to detail and timeline compliance."
  },
  {
    id: 11,
    title: "Real Estate Private Equity",
    description: "Strategic investment in high-potential projects.",
    icon: CreditCardIcon,
    href: "/services/private-equity",
    color: "from-[#8C6A0A] to-[#5C4204]",
    details: "Investing in high-potential real estate projects to maximize returns through strategic partnership and portfolio diversification."
  },
  {
    id: 12,
    title: "Holiday Homes Management",
    description: "Short-term rental property expertise.",
    icon: StarIcon,
    href: "/services/holiday-homes",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Managing short-term rental properties to provide exceptional guest experiences and optimize occupancy and revenue."
  },
  {
    id: 13,
    title: "RenTech",
    description: "Technology-driven renovation solutions.",
    icon: BeakerIcon,
    href: "/services/rentech",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Utilizing the latest technologies to renovate and enhance properties with innovative solutions and modern techniques."
  },
  {
    id: 14,
    title: "PropTech Solutions",
    description: "Technology for enhanced real estate operations.",
    icon: CogIcon,
    href: "/services/proptech",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Leveraging technology to improve real estate transactions and management with digital platforms and smart solutions."
  },
  {
    id: 15,
    title: "Interior Design Services",
    description: "Comprehensive architectural design services.",
    icon: SparklesIcon,
    href: "/services/interior-design",
    color: "from-[#8C6A0A] to-[#6E4F05]",
    details: "Comprehensive design services covering architecture and interior design with specialized expertise in FF&E selection."
  },
  {
    id: 16,
    title: "Construction Project Management",
    description: "Complete project lifecycle management.",
    icon: WrenchIcon,
    href: "/services/construction-pm",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Expertise covering the full spectrum of project life-cycle management ensuring smooth progress from inception to completion."
  },
  {
    id: 17,
    title: "Snagging & Inspection",
    description: "Thorough engineered inspections.",
    icon: MagnifyingGlassIcon,
    href: "/services/snagging",
    color: "from-[#8A6508] to-[#5C4204]",
    details: "Conducting thorough engineered inspections to identify and address any issues before handover."
  },
  {
    id: 18,
    title: "Property Handover",
    description: "Seamless property transition services.",
    icon: LockClosedIcon,
    href: "/services/handover",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Ensuring a smooth transition of completed properties to owners and tenants with comprehensive handover support."
  },
  {
    id: 19,
    title: "MEP Services",
    description: "Precision mechanical, electrical & plumbing.",
    icon: BoltIcon,
    href: "/services/mep",
    color: "from-[#8C6A0A] to-[#6E4F05]",
    details: "Complete spectrum of MEP services ensuring seamless integration and optimal performance in every project."
  },
  {
    id: 20,
    title: "Golden Visa Services",
    description: "UAE Golden Visa investment guidance.",
    icon: StarIcon,
    href: "/services/golden-visa",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Secure your UAE Golden Visa through smart Dubai property investment. Our experts guide you through every step."
  },
  {
    id: 21,
    title: "Training Academy",
    description: "Professional real estate education.",
    icon: AcademicCapIcon,
    href: "/services/training-academy",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Providing comprehensive training for real estate professionals with industry expertise and certification programs."
  },
  {
    id: 22,
    title: "Rental Services",
    description: "Optimized property rental management.",
    icon: HomeIcon,
    href: "/services/rental-services",
    color: "from-[#8A6508] to-[#8A6508]",
    details: "Managing rental properties to optimize rental yields and occupancy rates with professional tenant management."
  },
  {
    id: 23,
    title: "Construction Services",
    description: "Comprehensive base-build development.",
    icon: BuildingOffice2Icon,
    href: "/services/construction",
    color: "from-[#8C6A0A] to-[#5C4204]",
    details: "Complete construction capabilities spanning enabling works through specialized features like swimming pools and landscaping."
  }
]


export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <Image
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#2A1D05]/75 via-[#5C4204]/60 to-[#8A6508]/55"></div>
        <div className="absolute inset-0 bg-linear-to-r from-[#8A6508]/20 via-transparent to-[#8A6508]/5"></div>

        <div className="container-custom mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-2 bg-white/10 border border-[#F6E7C0]/35 rounded-full mb-8 backdrop-blur-sm">
            <span className="text-sm font-black text-[#F6E7C0] tracking-widest uppercase">Our Expertise</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            <span className="text-[#F6E7C0]">Premium Real Estate Services</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Experience excellence with Ragdoll Properties' comprehensive suite of real estate solutions
          </p>
        </div>
      </div>

      {/* Services Grid - Premium Layout */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link key={service.id} href={service.href}>
                <div className="group relative h-full bg-white border-2 border-[#8A6508]/30 rounded-3xl p-8 hover:border-[#8A6508] transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-lg">
                  {/* Golden gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>
                  
                  {/* Golden accent bar */}
                  <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-linear-to-r from-[#8A6508] to-[#5C4204] transition-all duration-500"></div>
                  
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-linear-to-br from-[#F6E7C0] to-[#D2B377] border border-[#8A6508]/35 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <Icon className="h-8 w-8 text-[#5C4204]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8A6508] transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 transition-colors">
                    {service.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className="flex items-center text-[#8A6508] font-semibold text-sm group-hover:text-[#5C4204] transition-colors">
                    <span>Learn More</span>
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Why Choose Ragdoll Properties Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent to-[#8A6508]/6">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-linear-to-r from-[#8A6508] to-[#8A6508] rounded-full mb-6">
              <span className="text-sm font-black text-[#F6E7C0] tracking-widest uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <span className="bg-linear-to-r from-[#8A6508] to-[#5C4204] bg-clip-text text-transparent"> The Ragdoll Properties Difference</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Two decades of Dubai real estate expertise with a track record of successful projects across all segments.",
                icon: UserGroupIcon
              },
              {
                title: "Quality Assured",
                description: "Rigorous standards and meticulous attention to detail in every project and transaction.",
                icon: CheckCircleIcon
              },
              {
                title: "Premium Service",
                description: "Personalized solutions tailored to your unique needs with 24/7 support and transparency.",
                icon: StarIcon
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="group bg-white border-2 border-[#8A6508]/30 rounded-2xl p-8 hover:border-[#8A6508] transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 bg-linear-to-br from-[#F6E7C0] to-[#D2B377] border border-[#8A6508]/35 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-[#5C4204]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Premium Property Gallery Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-[#8A6508]/15 rounded-full mb-6">
              <span className="text-sm font-black text-[#8A6508] tracking-widest uppercase">Featured Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Premium Property <span className="bg-linear-to-r from-[#8A6508] to-[#5C4204] bg-clip-text text-transparent">Showcase</span>
            </h2>
            <p className="text-slate-600 text-lg">Explore our curated selection of luxury developments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
                title: "Waterfront Luxury",
                desc: "Premium creek-side living",
                href: "/services/property-sales",
                label: "Explore Sales"
              },
              {
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
                title: "Modern Architecture",
                desc: "Contemporary excellence",
                href: "/services/construction-pm",
                label: "View Construction"
              },
              {
                img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80",
                title: "Urban Living",
                desc: "Mixed-use development",
                href: "/services/360-solutions",
                label: "360 Solutions"
              },
              {
                img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
                title: "Interior Design",
                desc: "Premium finishes",
                href: "/services/interior-design",
                label: "Interior Design"
              },
              {
                img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
                title: "Modern Interiors",
                desc: "Design innovation",
                href: "/services/fitout",
                label: "Fitout Services"
              },
              {
                img: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80",
                title: "Investment Grade",
                desc: "High-value returns",
                href: "/services/private-equity",
                label: "Private Equity"
              }
            ].map((project, idx) => (
              <Link key={idx} href={project.href} className="group relative h-72 rounded-3xl overflow-hidden shadow-2xl block">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/40 to-transparent group-hover:from-slate-900/98 transition-all duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-[#D2B377] font-semibold text-sm mb-3">{project.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-white/70 group-hover:text-[#D2B377] transition-colors">
                    {project.label} <ArrowRightIcon className="h-3 w-3 text-[#D2B377] group-hover:text-[#F6E7C0] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container-custom mx-auto">
          <div className="relative overflow-hidden rounded-4xl p-12 md:p-20 bg-white border-2 border-[#8A6508]/40 shadow-lg">
            {/* Golden glow effects */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8A6508]/12 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8A6508]/6 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Ready to Experience <span className="bg-linear-to-r from-[#8A6508] to-[#5C4204] bg-clip-text text-transparent">Excellence?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Connect with our specialist team today for a confidential consultation about your property needs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-[#8A6508] to-[#5C4204] text-white font-bold rounded-xl hover:from-[#8A6508] hover:to-[#4B3504] transition-all duration-300 shadow-xl shadow-[#5C4204]/25 hover:shadow-2xl hover:shadow-[#5C4204]/40 group"
              >
                Schedule Consultation
                <ArrowRightIcon className="h-5 w-5 text-[#D2B377] group-hover:text-[#F6E7C0] group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


