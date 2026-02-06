'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckBadgeIcon,
  LightBulbIcon,
  TrophyIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

const trainingPrograms = [
  {
    icon: BookOpenIcon,
    title: 'Foundational Courses',
    description: 'Ideal for newcomers, covering real estate fundamentals, RERA regulations, property types, and legal frameworks.'
  },
  {
    icon: TrophyIcon,
    title: 'Advanced Sales & Leasing Training',
    description: 'Focused programs for agents and brokers to sharpen sales techniques, negotiation skills, and lead conversion.'
  },
  {
    icon: LightBulbIcon,
    title: 'Developer & Project Briefings',
    description: 'Insights into off-plan projects, handover processes, and investment trends for professional growth.'
  },
  {
    icon: CheckBadgeIcon,
    title: 'RERA Certification Preparation',
    description: 'Targeted prep sessions led by certified trainers designed to help you pass and excel in RERA exams.'
  },
  {
    icon: UserGroupIcon,
    title: 'Customized Corporate Training',
    description: 'Bespoke training sessions for brokerages, developers, or firms looking to upskill teams efficiently.'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Career Development Programs',
    description: 'Comprehensive career support, mentorship, and recruitment assistance for top-performing trainees.'
  },
  {
    icon: SparklesIcon,
    title: 'Market Insights & Trends',
    description: 'Latest Dubai real estate market analysis, emerging opportunities, and strategic investment knowledge.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Professional Certification',
    description: 'Industry-recognized credentials that enhance your credibility and career prospects in real estate.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Course Selection',
    description: 'Choose from foundational, advanced, or specialized training programs tailored to your level and goals'
  },
  {
    number: '02',
    title: 'Enrollment & Assessment',
    description: 'Complete registration and take diagnostic assessments to personalize your learning experience'
  },
  {
    number: '03',
    title: 'Expert-Led Training',
    description: 'Engage with industry experts through interactive lectures, workshops, and real-world case studies'
  },
  {
    number: '04',
    title: 'Practical Exercises',
    description: 'Apply concepts through hands-on simulations, role-plays, and live market analysis activities'
  },
  {
    number: '05',
    title: 'Certification & Assessment',
    description: 'Complete exams and practical evaluations to earn industry-recognized certifications'
  },
  {
    number: '06',
    title: 'Career Support',
    description: 'Access mentorship, recruitment assistance, and ongoing professional development opportunities'
  }
]

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Industry-Recognized Trainers',
    description: 'Learn from experienced professionals with real-world expertise and proven track records'
  },
  {
    icon: CheckCircleIcon,
    title: 'Hands-On Learning',
    description: 'Performance-focused approach with practical exercises and real-world case studies'
  },
  {
    icon: CheckCircleIcon,
    title: 'Updated Content',
    description: 'Curriculum aligned with Dubai\'s latest real estate laws, regulations, and market trends'
  },
  {
    icon: CheckCircleIcon,
    title: 'Professional Certification',
    description: 'Earn industry-recognized credentials that enhance your credibility and career prospects'
  },
  {
    icon: CheckCircleIcon,
    title: 'Career Development',
    description: 'Mentorship, networking, and recruitment support for career advancement and opportunities'
  },
  {
    icon: CheckCircleIcon,
    title: 'Flexible Learning',
    description: 'Choose from in-person, online, and hybrid learning formats to suit your schedule'
  }
]

const stats = [
  { value: '1000+', label: 'Professionals Trained' },
  { value: '95%', label: 'Certification Pass Rate' },
  { value: '50+', label: 'Specialized Courses' }
]

export default function TrainingAcademyPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_6.jpg"
            alt="Training Academy"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Real Estate Training <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Academy</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Empowering future real estate leaders with expert-led courses, practical workshops, and industry-certified programs designed for success in Dubai's dynamic property market.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-purple-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                Enroll Now
              </Link>
              <Link href="#programs" className="px-8 py-4 border-2 border-purple-400/50 text-purple-300 font-bold rounded-lg hover:bg-purple-400/10 transition-all duration-300">
                View Programs <ArrowRightIcon className="inline h-5 w-5 ml-2" />
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
              Empower Your Real Estate <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Career</span>
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              The fäm Properties Real Estate Training Academy is designed to equip aspiring and experienced professionals with the skills, insights, and confidence needed to succeed in the dynamic world of real estate.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Through expert-led courses, practical workshops, and industry-certified programs, our academy is a trusted platform for learning, development, and career growth in Dubai's competitive property market. From foundational knowledge to advanced specialization, we provide comprehensive training at every career stage.
            </p>
            <div className="space-y-3">
              {['Expert Instructors', 'Industry Recognition', 'Career Support'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-purple-400 shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/CREEK_PALACE_DCH_EMAAR_3.jpg"
              alt="Training Program"
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
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-purple-400/20 rounded-2xl p-8 text-center hover:border-purple-400/50 transition-all">
                <div className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Training Programs & Courses</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive learning pathways for every career stage in real estate</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingPrograms.map((program, idx) => {
            const Icon = program.icon
            return (
              <div 
                key={idx}
                className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-purple-400/20 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-400/10"
              >
                <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{program.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{program.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Learn with fäm Academy?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="flex gap-4">
                  <Icon className="h-6 w-6 text-purple-400 shrink-0 mt-1" />
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

      {/* Ideal For Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Who It's For</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            'Aspiring Professionals',
            'Licensed Brokers',
            'Sales Consultants',
            'Property Managers',
            'Corporate Teams'
          ].map((category, idx) => (
            <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-purple-400/20 rounded-2xl p-6 text-center hover:border-purple-400/50 transition-all">
              <h3 className="text-lg font-bold text-white">{category}</h3>
              <div className="mt-4 h-1 w-8 bg-linear-to-r from-purple-400 to-pink-500 mx-auto rounded-full"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Your Learning Journey</h2>
            <p className="text-xl text-gray-300">A structured path to real estate excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-purple-400 to-pink-500 text-white font-bold text-lg">
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
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Academy Learning Experience</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: '/CREEK_PALACE_DCH_EMAAR_9.jpg', title: 'Expert-Led Workshops' },
            { src: '/CREEK_PALACE_DCH_EMAAR_5.jpg', title: 'Interactive Training Sessions' },
            { src: '/CREEK_PALACE_DCH_EMAAR_2.jpg', title: 'Certification Programs' }
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
            src="/CREEK_PALACE_DCH_EMAAR_7.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Launch Your Real Estate Career Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join fäm Properties Training Academy and gain the knowledge, skills, and certifications needed to excel in Dubai's competitive real estate market.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-purple-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              Enroll Now
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-bold rounded-lg hover:bg-purple-400/10 transition-all duration-300"
            >
              Get Course Details
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            1000+ professionals trained with 95% certification pass rate and industry recognition
          </p>
        </div>
      </section>
    </div>
  )
}
