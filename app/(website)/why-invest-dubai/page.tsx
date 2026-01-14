// 'use client'

// import { useState } from 'react'
// import { ChartBarIcon, GlobeAltIcon, BuildingOfficeIcon, CurrencyDollarIcon, ShieldCheckIcon, ArrowTrendingUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

// const investmentReasons = [
//   {
//     title: 'Zero Capital Gains Tax',
//     description: 'Dubai offers 0% capital gains tax on property sales, allowing investors to keep 100% of their profits.',
//     icon: CurrencyDollarIcon,
//     stats: 'Save up to 20-30% vs other markets'
//   },
//   {
//     title: 'Stable Economy & Currency',
//     description: 'Dubai\'s economy is pegged to the US Dollar, providing currency stability and economic predictability.',
//     icon: ArrowTrendingUpIcon,
//     stats: 'USD pegged since 1997'
//   },
//   {
//     title: 'World-Class Infrastructure',
//     description: 'Dubai boasts exceptional infrastructure including the world\'s busiest airport, modern metro, and smart city initiatives.',
//     icon: BuildingOfficeIcon,
//     stats: 'Dubai International Airport: 90M+ passengers/year'
//   },
//   {
//     title: 'Strategic Location',
//     description: 'Dubai serves as a gateway between East and West, with excellent connectivity to major global markets.',
//     icon: GlobeAltIcon,
//     stats: 'Direct flights to 280+ destinations'
//   },
//   {
//     title: 'Strong Legal Framework',
//     description: 'Dubai offers clear property laws, strong contract enforcement, and protection for foreign investors.',
//     icon: ShieldCheckIcon,
//     stats: 'Ranked #1 in MENA for investor protection'
//   },
//   {
//     title: 'Growing Population & Demand',
//     description: 'Dubai\'s population is growing rapidly, driving demand for residential and commercial properties.',
//     icon: ChartBarIcon,
//     stats: 'Population growth: 3.5M to 4.5M by 2030'
//   }
// ]

// const marketData = [
//   { year: '2020', price: 100, rental: 100 },
//   { year: '2021', price: 115, rental: 108 },
//   { year: '2022', price: 135, rental: 118 },
//   { year: '2023', price: 160, rental: 132 },
//   { year: '2024', price: 190, rental: 148 },
//   { year: '2025', price: 225, rental: 165 }
// ]

// const testimonials = [
//   {
//     name: 'Sarah Johnson',
//     country: 'UK',
//     investment: 'AED 5M Portfolio',
//     quote: 'Dubai property has been our best investment decision. The returns are consistent and the lifestyle is unmatched.',
//     returns: '+45% in 3 years'
//   },
//   {
//     name: 'Ahmed Al-Rashid',
//     country: 'Saudi Arabia',
//     investment: 'AED 8M Commercial',
//     quote: 'The business environment in Dubai is world-class. Our commercial property investment has exceeded all expectations.',
//     returns: '+60% in 4 years'
//   },
//   {
//     name: 'Maria Gonzalez',
//     country: 'Spain',
//     investment: 'AED 3M Residential',
//     quote: 'Moving to Dubai and investing in property was the best decision for our family. The growth potential is incredible.',
//     returns: '+35% in 2 years'
//   }
// ]

// const benefits = [
//   '100% foreign ownership in freehold areas',
//   'No capital gains tax on property sales',
//   'Stable currency pegged to USD',
//   'World-class healthcare and education',
//   'Tax-free income for many investors',
//   'Modern infrastructure and smart city initiatives',
//   'Strategic location for business expansion',
//   'Growing tourism and business sectors',
//   'Strong legal protection for investors',
//   'Easy repatriation of profits'
// ]

// export default function WhyInvestDubaiPage() {
//   const [activeTab, setActiveTab] = useState('overview')

//   return (
//     <div className="min-h-screen bg-white text-secondary">
//       {/* Hero Section */}
//       <div className="relative py-20 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-black text-secondary mb-6 tracking-tight">
//               <span className="text-secondary">Why Invest in</span> <span className="text-primary">Dubai?</span>
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-slate-600">
//               Discover why Dubai is the world's premier destination for property investment
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
//                 Start Investing Today
//               </button>
//               <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
//                 Download Investment Guide
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="border-b border-primary/20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="flex space-x-8">
//             {['overview', 'market-data', 'testimonials', 'benefits'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
//                   activeTab === tab
//                     ? 'border-primary text-primary'
//                     : 'border-transparent text-secondary hover:text-primary'
//                 }`}
//               >
//                 {tab.replace('-', ' ')}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Content Sections */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {activeTab === 'overview' && (
//           <div className="space-y-16">
//             {/* Overview */}
//             <div className="text-center">
//               <h2 className="text-3xl md:text-4xl font-black text-secondary mb-6 tracking-tight">
//                 World's Leading Investment Destination
//               </h2>
//               <p className="text-lg max-w-3xl mx-auto text-slate-600">
//                 Dubai has established itself as the premier global destination for property investment,
//                 offering unparalleled opportunities for both individual and institutional investors.
//               </p>
//             </div>

//             {/* Key Investment Reasons */}
//             <div>
//               <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12 tracking-tight">
//                 Why Dubai Stands Out
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {investmentReasons.map((reason, index) => (
//                   <div
//                     key={index}
//                     className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 text-center shadow-sm hover:shadow-md transition-all duration-300"
//                   >
//                     <reason.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
//                     <h3 className="text-xl font-bold text-secondary mb-3">
//                       {reason.title}
//                     </h3>
//                     <p className="mb-4 text-slate-600 leading-relaxed">
//                       {reason.description}
//                     </p>
//                     <div className="text-sm font-semibold text-primary">
//                       {reason.stats}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Market Performance Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               <div className="text-center">
//                 <div className="text-4xl font-black text-primary mb-2">125%</div>
//                 <div className="text-slate-600">Average Property Appreciation (5 years)</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl font-black text-primary mb-2">7.2%</div>
//                 <div className="text-slate-600">Average Rental Yield</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl font-black text-primary mb-2">0%</div>
//                 <div className="text-slate-600">Capital Gains Tax</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl font-black text-primary mb-2">280+</div>
//                 <div className="text-slate-600">Direct Flight Destinations</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'market-data' && (
//           <div>
//             <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12 tracking-tight">
//               Dubai Property Market Performance
//             </h2>

//             {/* Market Chart Simulation */}
//             <div className="mb-12 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
//               <h3 className="text-xl font-bold text-secondary mb-6 text-center">
//                 Property Price & Rental Index (2020-2025)
//               </h3>
//               <div className="space-y-6">
//                 {marketData.map((data, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <span className="w-16 font-semibold text-secondary">{data.year}</span>
//                     <div className="flex-1 mx-4">
//                       <div className="flex items-center space-x-4">
//                         <div className="flex-1">
//                           <div className="text-xs mb-1 text-slate-600">Property Price</div>
//                           <div className="w-full bg-slate-200 rounded-full h-2">
//                             <div
//                               className="h-2 rounded-full transition-all duration-1000"
//                               style={{
//                                 width: `${(data.price / 225) * 100}%`,
//                                 backgroundColor: '#c5a059'
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="text-sm font-semibold w-12 text-right text-primary">
//                           {data.price}
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-4 mt-2">
//                         <div className="flex-1">
//                           <div className="text-xs mb-1 text-slate-600">Rental Index</div>
//                           <div className="w-full bg-slate-200 rounded-full h-2">
//                             <div
//                               className="h-2 rounded-full transition-all duration-1000"
//                               style={{
//                                 width: `${(data.rental / 165) * 100}%`,
//                                 backgroundColor: '#1e293b'
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="text-sm font-semibold w-12 text-right text-secondary">
//                           {data.rental}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Market Insights */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
//                 <h3 className="text-lg font-bold text-primary mb-3">Price Growth</h3>
//                 <p className="text-2xl font-black text-secondary mb-2">125%</p>
//                 <p className="text-slate-600">Average increase over 5 years</p>
//               </div>
//               <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
//                 <h3 className="text-lg font-bold text-primary mb-3">Rental Yield</h3>
//                 <p className="text-2xl font-black text-secondary mb-2">7.2%</p>
//                 <p className="text-slate-600">Average gross rental yield</p>
//               </div>
//               <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
//                 <h3 className="text-lg font-bold text-primary mb-3">Occupancy Rate</h3>
//                 <p className="text-2xl font-black text-secondary mb-2">92%</p>
//                 <p className="text-slate-600">Average property occupancy</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'testimonials' && (
//           <div>
//             <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12 tracking-tight">
//               Success Stories from Dubai Investors
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {testimonials.map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="mb-4">
//                     <div className="text-lg font-bold text-primary mb-1">
//                       {testimonial.returns}
//                     </div>
//                     <div className="text-sm text-slate-600">
//                       {testimonial.investment}
//                     </div>
//                   </div>
//                   <blockquote className="mb-4 italic text-secondary leading-relaxed">
//                     "{testimonial.quote}"
//                   </blockquote>
//                   <div>
//                     <div className="font-semibold text-secondary">{testimonial.name}</div>
//                     <div className="text-sm text-slate-600">{testimonial.country}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'benefits' && (
//           <div>
//             <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12 tracking-tight">
//               Complete Investment Benefits
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {benefits.map((benefit, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300"
//                 >
//                   <CheckCircleIcon className="h-6 w-6 mr-3 flex-shrink-0 text-primary" />
//                   <span className="text-secondary font-medium">{benefit}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* CTA Section */}
//       <div className="py-16 bg-slate-50">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-black text-secondary mb-4 tracking-tight">
//             Ready to Start Your Dubai Investment Journey?
//           </h2>
//           <p className="text-lg mb-8 text-slate-600">
//             Join thousands of successful investors who have discovered Dubai's unparalleled investment potential.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
//               Get Investment Consultation
//             </button>
//             <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
//               Schedule Property Tour
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// new code
'use client'

import { useState } from 'react'
import { ChartBarIcon, GlobeAltIcon, BuildingOfficeIcon, CurrencyDollarIcon, ShieldCheckIcon, ArrowTrendingUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const investmentReasons = [
  {
    title: 'Zero Capital Gains Tax',
    description: 'Dubai offers 0% capital gains tax on property sales, allowing investors to keep 100% of their profits.',
    icon: CurrencyDollarIcon,
    stats: 'Save up to 20-30% vs other markets'
  },
  {
    title: 'Stable Economy & Currency',
    description: 'Dubai\'s economy is pegged to the US Dollar, providing currency stability and economic predictability.',
    icon: ArrowTrendingUpIcon,
    stats: 'USD pegged since 1997'
  },
  {
    title: 'World-Class Infrastructure',
    description: 'Dubai boasts exceptional infrastructure including the world\'s busiest airport, modern metro, and smart city initiatives.',
    icon: BuildingOfficeIcon,
    stats: 'Dubai International Airport: 90M+ passengers/year'
  },
  {
    title: 'Strategic Location',
    description: 'Dubai serves as a gateway between East and West, with excellent connectivity to major global markets.',
    icon: GlobeAltIcon,
    stats: 'Direct flights to 280+ destinations'
  },
  {
    title: 'Strong Legal Framework',
    description: 'Dubai offers clear property laws, strong contract enforcement, and protection for foreign investors.',
    icon: ShieldCheckIcon,
    stats: 'Ranked #1 in MENA for investor protection'
  },
  {
    title: 'Growing Population & Demand',
    description: 'Dubai\'s population is growing rapidly, driving demand for residential and commercial properties.',
    icon: ChartBarIcon,
    stats: 'Population growth: 3.5M to 4.5M by 2030'
  }
]

const marketData = [
  { year: '2020', price: 100, rental: 100 },
  { year: '2021', price: 115, rental: 108 },
  { year: '2022', price: 135, rental: 118 },
  { year: '2023', price: 160, rental: 132 },
  { year: '2024', price: 190, rental: 148 },
  { year: '2025', price: 225, rental: 165 }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    country: 'UK',
    investment: 'AED 5M Portfolio',
    quote: 'Dubai property has been our best investment decision. The returns are consistent and the lifestyle is unmatched.',
    returns: '+45% in 3 years'
  },
  {
    name: 'Ahmed Al-Rashid',
    country: 'Saudi Arabia',
    investment: 'AED 8M Commercial',
    quote: 'The business environment in Dubai is world-class. Our commercial property investment has exceeded all expectations.',
    returns: '+60% in 4 years'
  },
  {
    name: 'Maria Gonzalez',
    country: 'Spain',
    investment: 'AED 3M Residential',
    quote: 'Moving to Dubai and investing in property was the best decision for our family. The growth potential is incredible.',
    returns: '+35% in 2 years'
  }
]

const benefits = [
  '100% foreign ownership in freehold areas',
  'No capital gains tax on property sales',
  'Stable currency pegged to USD',
  'World-class healthcare and education',
  'Tax-free income for many investors',
  'Modern infrastructure and smart city initiatives',
  'Strategic location for business expansion',
  'Growing tourism and business sectors',
  'Strong legal protection for investors',
  'Easy repatriation of profits'
]

// Data for property price growth chart
const propertyPriceData = [
  { area: 'Dubai Marina', '2021': 1200, '2022': 1350, '2023': 1650, '2024': 2100, '2025': 2550 },
  { area: 'Palm Jumeirah', '2021': 1800, '2022': 2100, '2023': 2500, '2024': 2950, '2025': 3450 },
  { area: 'Downtown Dubai', '2021': 1500, '2022': 1700, '2023': 2000, '2024': 2400, '2025': 2850 },
  { area: 'Business Bay', '2021': 900, '2022': 1050, '2023': 1250, '2024': 1550, '2025': 1900 },
  { area: 'JVC', '2021': 700, '2022': 800, '2023': 950, '2024': 1150, '2025': 1400 },
]

export default function WhyInvestDubaiPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedChart, setSelectedChart] = useState('price-growth')

  return (
    <div className="min-h-screen bg-white text-secondary">
      {/* Hero Section */}
      <div className="relative py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-secondary mb-6 tracking-tight">
              <span className="text-secondary">Why Invest in</span> <span className="text-primary">Dubai?</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-600">
              Discover why Dubai is the world's premier destination for property investment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Start Investing Today
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                Download Investment Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-primary/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'market-performance', 'market-data', 'testimonials', 'benefits'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === 'overview' && (
          <div className="space-y-16">
            {/* Overview */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black text-secondary mb-6 tracking-tight">
                World's Leading Investment Destination
              </h2>
              <p className="text-lg max-w-3xl mx-auto text-slate-600">
                Dubai has established itself as the premier global destination for property investment,
                offering unparalleled opportunities for both individual and institutional investors.
              </p>
            </div>

            {/* Key Investment Reasons */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12 tracking-tight">
                Why Dubai Stands Out
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {investmentReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 text-center shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <reason.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-bold text-secondary mb-3">
                      {reason.title}
                    </h3>
                    <p className="mb-4 text-slate-600 leading-relaxed">
                      {reason.description}
                    </p>
                    <div className="text-sm font-semibold text-primary">
                      {reason.stats}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">125%</div>
                <div className="text-slate-600">Average Property Appreciation (5 years)</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">7.2%</div>
                <div className="text-slate-600">Average Rental Yield</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">0%</div>
                <div className="text-slate-600">Capital Gains Tax</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">280+</div>
                <div className="text-slate-600">Direct Flight Destinations</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market-performance' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Main Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Market Performance 2024</h1>
              <h2 className="text-3xl font-bold text-primary mb-2">Dubai Property Market Performance 2024</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-slate-700 leading-relaxed">
                  In 2024, Dubai's real estate market demonstrated exceptional growth and resilience, 
                  setting new benchmarks for global property markets. The year was marked by significant 
                  price appreciation across all segments, driven by strong demand and strategic government initiatives.
                </p>
              </div>
            </div>

            {/* Dual Property Market Section */}
            <div className="bg-white border border-slate-300 rounded-lg shadow-sm mb-12">
              <div className="p-8">
                {/* Section Title */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Dual Property Market Performance 2024</h3>
                  <div className="w-24 h-1 bg-primary rounded-full"></div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Column - Market Overview */}
                  <div>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      In 2024, the Dubai real estate market achieved unprecedented growth, 
                      with transaction volumes increasing by 42% compared to 2023. Total transaction 
                      value exceeded AED 450 billion, marking a historic milestone for the emirate's 
                      property sector.
                    </p>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      Luxury properties led the market surge, with prices in prime locations 
                      appreciating by over 30%. The mid-market segment also showed strong 
                      performance, driven by increased demand from expatriates and growing population.
                    </p>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      Government initiatives including visa reforms, business-friendly policies, 
                      and infrastructure development continued to attract global investors, 
                      positioning Dubai as the top destination for property investment in the Middle East.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      The market's resilience was evident throughout the year, with consistent 
                      month-over-month growth and strong investor confidence across all property types.
                    </p>
                  </div>

                  {/* Right Column - Top Performing Areas */}
                  <div>
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-slate-900 mb-4">Top 5 performing areas 2024</h4>
                      <p className="text-slate-600 mb-6">
                        For 2024, the market performance has been analyzed across key areas, 
                        showing substantial growth in property values and investment returns.
                      </p>
                    </div>

                    {/* Performance Table */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-slate-300">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700">Area</th>
                            <th className="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700">Price Growth</th>
                            <th className="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700">Avg Price (AED/sqft)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">Dubai Marina</td>
                            <td className="border border-slate-300 px-4 py-3">
                              <span className="font-semibold text-green-600">28.5%</span>
                            </td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">2,800</td>
                          </tr>
                          <tr className="bg-slate-50">
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">Palm Jumeirah</td>
                            <td className="border border-slate-300 px-4 py-3">
                              <span className="font-semibold text-green-600">25.2%</span>
                            </td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">3,500</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">Downtown Dubai</td>
                            <td className="border border-slate-300 px-4 py-3">
                              <span className="font-semibold text-green-600">22.8%</span>
                            </td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">3,200</td>
                          </tr>
                          <tr className="bg-slate-50">
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">Business Bay</td>
                            <td className="border border-slate-300 px-4 py-3">
                              <span className="font-semibold text-green-600">20.1%</span>
                            </td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">1,800</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">Jumeirah Village Circle</td>
                            <td className="border border-slate-300 px-4 py-3">
                              <span className="font-semibold text-green-600">18.7%</span>
                            </td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">1,200</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Stats */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">Average Growth</div>
                        <div className="text-2xl font-bold text-primary">23.1%</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">Total Transactions</div>
                        <div className="text-2xl font-bold text-primary">124,850</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="my-8 border-t border-slate-300"></div>

                {/* NEW: Beautiful Property Analytics Graph */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Property Price Growth Analysis (2021-2025)</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedChart('price-growth')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedChart === 'price-growth' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        Price Growth
                      </button>
                      <button 
                        onClick={() => setSelectedChart('rental-yield')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedChart === 'rental-yield' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        Rental Yield
                      </button>
                    </div>
                  </div>

                  {/* Graph Container */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    {/* Graph Legend */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      {propertyPriceData.map((area, index) => {
                        const colors = ['#c5a059', '#1e293b', '#3b82f6', '#10b981', '#8b5cf6']
                        return (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: colors[index] }}
                            />
                            <span className="text-sm text-slate-700">{area.area}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Graph Bars */}
                    <div className="space-y-8">
                      {propertyPriceData.map((area, areaIndex) => {
                        const colors = ['#c5a059', '#1e293b', '#3b82f6', '#10b981', '#8b5cf6']
                        const maxValue = 3500
                        
                        return (
                          <div key={areaIndex} className="flex items-center">
                            <div className="w-32 text-sm font-medium text-slate-700">{area.area}</div>
                            <div className="flex-1 ml-4">
                              <div className="flex items-center space-x-2">
                                {['2021', '2022', '2023', '2024', '2025'].map((year, yearIndex) => {
                                  const value = area[year as keyof typeof area] as number
                                  const percentage = (value / maxValue) * 100
                                  
                                  return (
                                    <div key={yearIndex} className="flex-1">
                                      <div className="relative">
                                        <div className="text-xs text-slate-500 mb-1">{year}</div>
                                        <div className="relative h-8 bg-slate-200 rounded overflow-hidden">
                                          <div 
                                            className="absolute top-0 left-0 h-full rounded transition-all duration-500 ease-out hover:opacity-90"
                                            style={{ 
                                              width: `${percentage}%`,
                                              backgroundColor: colors[areaIndex]
                                            }}
                                          />
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-semibold text-white mix-blend-difference">
                                              AED {value}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* X-axis Labels */}
                    <div className="flex justify-between mt-4 pt-4 border-t border-slate-200">
                      <div className="text-xs text-slate-500">2021</div>
                      <div className="text-xs text-slate-500">2022</div>
                      <div className="text-xs text-slate-500">2023</div>
                      <div className="text-xs text-slate-500">2024</div>
                      <div className="text-xs text-slate-500">2025</div>
                    </div>
                  </div>

                  {/* Graph Summary */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="text-sm text-blue-700 mb-1">Highest Growth</div>
                      <div className="text-lg font-bold text-blue-800">Palm Jumeirah</div>
                      <div className="text-sm text-blue-600">+92% over 4 years</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="text-sm text-green-700 mb-1">Average Growth</div>
                      <div className="text-lg font-bold text-green-800">+87%</div>
                      <div className="text-sm text-green-600">Across all prime areas</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <div className="text-sm text-purple-700 mb-1">Best Value</div>
                      <div className="text-lg font-bold text-purple-800">JVC</div>
                      <div className="text-sm text-purple-600">+100% growth at lower entry</div>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="my-8 border-t border-slate-300"></div>

                {/* Market Segments */}
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-6">Market Segments Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-sm text-slate-600 mb-2">Luxury Properties</div>
                      <div className="text-2xl font-bold text-slate-900 mb-2">32.5% Growth</div>
                      <div className="text-slate-500 text-sm">1,850 transactions</div>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-sm text-slate-600 mb-2">Mid-Market Properties</div>
                      <div className="text-2xl font-bold text-slate-900 mb-2">18.2% Growth</div>
                      <div className="text-slate-500 text-sm">3,200 transactions</div>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-sm text-slate-600 mb-2">Affordable Housing</div>
                      <div className="text-2xl font-bold text-slate-900 mb-2">12.8% Growth</div>
                      <div className="text-slate-500 text-sm">4,150 transactions</div>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-sm text-slate-600 mb-2">Commercial Properties</div>
                      <div className="text-2xl font-bold text-slate-900 mb-2">25.6% Growth</div>
                      <div className="text-slate-500 text-sm">980 transactions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">AED 450B</div>
                <div className="text-slate-600">Total Market Value</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">42%</div>
                <div className="text-slate-600">Year-over-Year Growth</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">68%</div>
                <div className="text-slate-600">Foreign Investment Share</div>
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">2024 Market Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Drivers</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3"></div>
                      <span className="text-slate-700">Strong government policies supporting real estate</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3"></div>
                      <span className="text-slate-700">Increased foreign direct investment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3"></div>
                      <span className="text-slate-700">Growing population and tourism sector</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3"></div>
                      <span className="text-slate-700">Infrastructure development projects</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Market Outlook 2025</h4>
                  <p className="text-slate-700 mb-4">
                    The positive momentum is expected to continue into 2025, with projected 
                    growth of 15-20% across major market segments.
                  </p>
                  <div className="bg-white border border-slate-200 rounded p-4">
                    <div className="text-sm text-slate-600 mb-1">Projected Growth 2025</div>
                    <div className="text-2xl font-bold text-primary">18.5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market-data' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12 tracking-tight">
              Dubai Property Market Performance
            </h2>

            {/* Market Chart Simulation */}
            <div className="mb-12 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-secondary mb-6 text-center">
                Property Price & Rental Index (2020-2025)
              </h3>
              <div className="space-y-6">
                {marketData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="w-16 font-semibold text-secondary">{data.year}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="text-xs mb-1 text-slate-600">Property Price</div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${(data.price / 225) * 100}%`,
                                backgroundColor: '#c5a059'
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-semibold w-12 text-right text-primary">
                          {data.price}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex-1">
                          <div className="text-xs mb-1 text-slate-600">Rental Index</div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${(data.rental / 165) * 100}%`,
                                backgroundColor: '#1e293b'
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-semibold w-12 text-right text-secondary">
                          {data.rental}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-primary mb-3">Price Growth</h3>
                <p className="text-2xl font-black text-secondary mb-2">125%</p>
                <p className="text-slate-600">Average increase over 5 years</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-primary mb-3">Rental Yield</h3>
                <p className="text-2xl font-black text-secondary mb-2">7.2%</p>
                <p className="text-slate-600">Average gross rental yield</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-primary mb-3">Occupancy Rate</h3>
                <p className="text-2xl font-black text-secondary mb-2">92%</p>
                <p className="text-slate-600">Average property occupancy</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12 tracking-tight">
              Success Stories from Dubai Investors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4">
                    <div className="text-lg font-bold text-primary mb-1">
                      {testimonial.returns}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonial.investment}
                    </div>
                  </div>
                  <blockquote className="mb-4 italic text-secondary leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-secondary">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.country}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12 tracking-tight">
              Complete Investment Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CheckCircleIcon className="h-6 w-6 mr-3 flex-shrink-0 text-primary" />
                  <span className="text-secondary font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-secondary mb-4 tracking-tight">
            Ready to Start Your Dubai Investment Journey?
          </h2>
          <p className="text-lg mb-8 text-slate-600">
            Join thousands of successful investors who have discovered Dubai's unparalleled investment potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Get Investment Consultation
            </button>
            <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
              Schedule Property Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}