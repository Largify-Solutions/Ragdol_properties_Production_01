'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  StarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckBadgeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

const benefits = [
  {
    icon: ClockIcon,
    title: '10-Year Stability',
    description: 'Long-term renewable residency without mandatory re-entry, providing security for your family\'s future in the UAE.'
  },
  {
    icon: CheckBadgeIcon,
    title: 'No Entry Requirements',
    description: 'Live, work, and study in the UAE without mandatory re-entry every six months. Complete freedom of movement.'
  },
  {
    icon: UserGroupIcon,
    title: 'Family Sponsorship',
    description: 'Sponsor your spouse, children, and unlimited domestic staff. Keep your family together under one visa.'
  },
  {
    icon: SparklesIcon,
    title: 'Business Freedom',
    description: '100% business ownership on mainland UAE. No need for a local partner to start and operate your company.'
  }
]

const visaCategories = [
  {
    title: 'Retirement Visa',
    investment: 'AED 1M+',
    popular: false,
    features: [
      'Minimum AED 1 million property investment',
      'AED 15,000 monthly income or AED 1M savings',
      'Aged 55 or above',
      '5-year renewable term',
      'Full residency benefits'
    ],
    description: '5-year renewable visa for retirees aged 55 and above who invest in UAE property.'
  },
  {
    title: 'Property Investor',
    investment: 'AED 2M+',
    popular: true,
    features: [
      'Ready or off-plan properties (50%+ completion)',
      'Single or multiple property portfolio',
      '4% Dubai Land Department payment proof',
      '10-year renewable residency',
      'Include spouse and children'
    ],
    description: 'Secure a 10-year Golden Visa by owning UAE properties with total value of AED 2 million or more.'
  },
  {
    title: '2-Year Investor Visa',
    investment: 'AED 750K+',
    popular: false,
    features: [
      'Minimum AED 750,000 investment',
      'Ready or off-plan properties',
      'Renewable every 2 years',
      'Property must be retained',
      'Quick processing time'
    ],
    description: 'Entry-level residency option for property investors seeking shorter-term commitments.'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Eligibility Assessment',
    description: 'Free pre-qualification check and personalized investment strategy based on your residency goals'
  },
  {
    number: '02',
    title: 'Property Curation',
    description: 'Access to Golden Visa-eligible properties from our premium portfolio, handpicked for investment value'
  },
  {
    number: '03',
    title: 'Document Preparation',
    description: 'Expert handling of all paperwork, attestations, translations, and legal formalities'
  },
  {
    number: '04',
    title: 'Application Submission',
    description: 'Direct coordination with UAE immigration authorities and real-time status tracking'
  },
  {
    number: '05',
    title: 'Medical & Biometrics',
    description: 'Appointment scheduling and escorted processing for medical tests and Emirates ID'
  },
  {
    number: '06',
    title: 'Visa Handover',
    description: 'Final visa stamping, passport return, and ongoing property management support'
  }
]

const requirements = [
  { title: 'Valid Passport Copy', detail: 'Minimum 6 months validity remaining' },
  { title: 'Digital Photograph', detail: 'Passport-sized, white background, recent' },
  { title: 'UAE Health Insurance', detail: 'Compliant with local regulations' },
  { title: 'Emirates ID', detail: 'For residents applying for renewal' },
  { title: 'Property Documents', detail: 'Title deed or Oqood certificate' }
]

const processingOptions = [
  {
    days: '5-7 Days',
    title: 'VIP Service',
    price: 'AED 23,000',
    features: ['Priority application handling', 'Fast-tracked approvals', 'Premium appointment scheduling', 'Dedicated account manager', 'Express document processing']
  },
  {
    days: '10-15 Days',
    title: 'Standard',
    price: 'AED 18,750',
    features: ['Standard processing track', 'Full documentation support', 'Regular status updates', 'Medical & biometrics booking', 'End-to-end management']
  },
  {
    days: '20-25 Days',
    title: 'Investor Visa',
    price: 'AED 16,750',
    features: ['AED 750K+ investment option', 'All-inclusive fee structure', 'Property verification included', 'Renewal reminders', 'Family package available']
  }
]

const faqs = [
  {
    question: 'What is the minimum investment for the 10-year Golden Visa?',
    answer: 'The minimum investment for the 10-year Golden Visa is AED 2 million in UAE property. You can combine multiple properties to reach this threshold.'
  },
  {
    question: 'Can I combine multiple properties to reach the AED 2M threshold?',
    answer: 'Yes, absolutely. You can build your portfolio across multiple properties to meet the AED 2 million minimum investment requirement.'
  },
  {
    question: 'Does a mortgaged property qualify for the Golden Visa?',
    answer: 'Yes, mortgaged properties qualify for the Golden Visa. You\'ll need to provide mortgage proof documentation during your application.'
  },
  {
    question: 'Can Golden Visa holders sponsor family members?',
    answer: 'Yes, Golden Visa holders can sponsor their spouse, children, and unlimited domestic staff under their visa.'
  }
]

export default function GoldenVisaPage() {
  return (
    <div className="bg-linear-to-br from-slate-950 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_15.jpg"
            alt="Golden Visa"
            fill
            className="object-cover scale-110 hover:scale-125 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              UAE Golden <span className="bg-linear-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Visa Advisory</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              10-year residency delivered through strategic property investment. Dubai's most trusted real estate advisors guiding your journey to long-term UAE residency.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#contact" className="px-8 py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300">
                Free Consultation
              </Link>
              <Link href="#requirements" className="px-8 py-4 border-2 border-yellow-400/50 text-yellow-300 font-bold rounded-lg hover:bg-yellow-400/10 transition-all duration-300">
                View Requirements <ArrowRightIcon className="inline h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-6 text-center">Why Choose a UAE Golden Visa?</h2>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Enjoy seamless, long-term residency in the UAE - valid for up to 10 years, without the need for a local sponsor or frequent renewals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div 
                key={idx}
                className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-yellow-400/20 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10"
              >
                <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Visa Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Golden Visa Categories</h2>
            <p className="text-xl text-gray-300">Choose the pathway that matches your investment goals and residency requirements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visaCategories.map((category, idx) => (
              <div 
                key={idx}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  category.popular
                    ? 'border-2 border-yellow-400 shadow-2xl shadow-yellow-400/20 scale-105'
                    : 'border border-yellow-400/20 hover:border-yellow-400/50'
                } bg-linear-to-br from-slate-800/50 to-slate-900/50`}
              >
                {category.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-linear-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold py-2 text-center text-sm">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${category.popular ? 'pt-16' : ''}`}>
                  <div className="text-4xl font-bold bg-linear-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                    {category.investment}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">{category.description}</p>
                  
                  <div className="space-y-3 border-t border-yellow-400/20 pt-6">
                    {category.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Golden Visa Requirements</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Required Documentation</h3>
            <div className="space-y-4">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex gap-4">
                  <DocumentCheckIcon className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">{req.title}</h4>
                    <p className="text-gray-400 text-sm">{req.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Property Requirements</h3>
            <div className="space-y-4">
              {[
                { title: 'Minimum Investment', detail: 'AED 2M for Golden Visa, AED 750K for 2-year visa' },
                { title: 'DLD Registration', detail: '4% Dubai Land Department fee paid' },
                { title: 'Completion Status', detail: 'Ready or 50%+ complete for off-plan' },
                { title: 'Joint Ownership', detail: 'Spouses may apply with attested marriage certificate' },
                { title: 'Mortgage Allowed', detail: 'Mortgaged properties qualify with proof' }
              ].map((req, idx) => (
                <div key={idx} className="flex gap-4">
                  <BuildingOfficeIcon className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">{req.title}</h4>
                    <p className="text-gray-400 text-sm">{req.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Processing Options Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Processing Timeline & Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processingOptions.map((option, idx) => (
              <div 
                key={idx}
                className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-yellow-400/20 rounded-2xl p-8 hover:border-yellow-400/50 transition-all"
              >
                <div className="text-lg font-bold text-yellow-400 mb-2">{option.days}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{option.title}</h3>
                <div className="text-4xl font-bold bg-linear-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-6">
                  {option.price}
                </div>
                <ul className="space-y-3 border-t border-yellow-400/20 pt-6">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-sm text-center mt-8">
            * AED 2,000 refundable security deposit required. Refunded in case of application rejection.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">fäm Properties Advantage</h2>
        <p className="text-xl text-gray-300 text-center mb-12">White-glove service from property selection to visa stamping</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-yellow-400 to-amber-500 text-slate-900 font-bold text-lg">
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

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-yellow-400/20 rounded-2xl p-6 hover:border-yellow-400/50 transition-all">
                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                  <SparklesIcon className="h-6 w-6 text-yellow-400 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-300 ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-slate-900/80 to-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/CREEK_PALACE_DCH_EMAAR_11.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Start Your Golden Visa Journey Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let fäm Properties guide you through every step of securing your UAE Golden Visa. Book your free consultation with our expert advisors today.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href="tel:+971" 
              className="px-8 py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300"
            >
              Free Consultation
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-yellow-400 text-yellow-300 font-bold rounded-lg hover:bg-yellow-400/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            10-year residency with property investment starting from AED 750,000
          </p>
        </div>
      </section>
    </div>
  )
}
