'use client'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { UsersIcon, ArrowTrendingUpIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function DubaiPopulationPage() {
  const populationData = [
    { year: 2015, total: 2.4, expats: 1.9, uae: 0.5 },
    { year: 2016, total: 2.58, expats: 2.1, uae: 0.48 },
    { year: 2017, total: 2.72, expats: 2.2, uae: 0.52 },
    { year: 2018, total: 2.87, expats: 2.32, uae: 0.55 },
    { year: 2019, total: 3.01, expats: 2.45, uae: 0.56 },
    { year: 2020, total: 3.16, expats: 2.58, uae: 0.58 },
    { year: 2021, total: 3.33, expats: 2.72, uae: 0.61 },
    { year: 2022, total: 3.48, expats: 2.85, uae: 0.63 },
    { year: 2023, total: 3.62, expats: 2.96, uae: 0.66 },
    { year: 2024, total: 3.7, expats: 3.02, uae: 0.68 }
  ]

  const demographicsData = [
    { name: 'Indian', percentage: 28 },
    { name: 'Pakistani', percentage: 16 },
    { name: 'Bangladeshi', percentage: 12 },
    { name: 'Filipino', percentage: 10 },
    { name: 'Other Expats', percentage: 22 },
    { name: 'UAE Nationals', percentage: 12 }
  ]

  const ageGroupData = [
    { group: '0-14', population: 18 },
    { group: '15-24', population: 24 },
    { group: '25-34', population: 28 },
    { group: '35-44', population: 18 },
    { group: '45-54', population: 8 },
    { group: '55+', population: 4 }
  ]

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899']

  const populationImpact = [
    {
      title: 'Housing Demand',
      description: 'Growing population drives continuous demand for residential properties and rental units',
      impact: 'High',
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      title: 'Commercial Growth',
      description: 'Increased workforce demands office space, retail, and commercial development',
      impact: 'High',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Infrastructure',
      description: 'Population growth necessitates continuous infrastructure and transportation improvements',
      impact: 'Medium-High',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      title: 'Investment Appeal',
      description: 'Growing population base makes Dubai increasingly attractive to real estate investors',
      impact: 'High',
      color: 'bg-amber-100 text-amber-700'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold">
            <UsersIcon className="w-5 h-5" />
            Population & Demographics
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Dubai <span className="text-emerald-600">Population</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Understanding Dubai's population growth, demographics, and its impact on real estate market dynamics
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-2">CURRENT POPULATION</p>
            <p className="text-3xl font-bold text-slate-900">3.7M+</p>
            <p className="text-xs text-emerald-600 font-semibold mt-2">+5.2% yearly growth</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-2">EXPAT PERCENTAGE</p>
            <p className="text-3xl font-bold text-slate-900">82%</p>
            <p className="text-xs text-blue-600 font-semibold mt-2">Diverse international community</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-2">DOUBLING TIME</p>
            <p className="text-3xl font-bold text-slate-900">14-15 yrs</p>
            <p className="text-xs text-purple-600 font-semibold mt-2">Population doubling period</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-2">MEDIAN AGE</p>
            <p className="text-3xl font-bold text-slate-900">32 yrs</p>
            <p className="text-xs text-amber-600 font-semibold mt-2">Working-age demographics</p>
          </div>
        </div>

        {/* Population Trend Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Population Growth Trend (2015-2024)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}M`} />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} name="Total Population" />
              <Line type="monotone" dataKey="expats" stroke="#3b82f6" strokeWidth={2} name="Expat Population" />
              <Line type="monotone" dataKey="uae" stroke="#f59e0b" strokeWidth={2} name="UAE Nationals" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Demographics Pie Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Population by Nationality</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2 text-sm">
              {demographicsData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                  <span className="text-slate-700">{item.name}: {item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Age Group Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="population" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Population Impact on Real Estate */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Impact on Real Estate Market</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {populationImpact.map((item, idx) => (
              <div key={idx} className={`rounded-2xl border border-slate-200 p-8 shadow-sm ${item.color.split(' ')[0]}`}>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-700 mb-4">{item.description}</p>
                <div className={`inline-block px-4 py-2 rounded-full font-bold text-sm ${item.color}`}>
                  {item.impact} Impact
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-6">Population Growth Opportunities for Investors</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Short-term (1-3 years)</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Increased rental demand in affordable segments</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Rising commercial property prices</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Strong residential market fundamentals</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Long-term (5+ years)</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Sustained appreciation across all segments</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Infrastructure development in emerging areas</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-300">✓</span>
                  <span>Diversification into new communities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Markets */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Market Data</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/trends/market-performance', title: 'Market Performance', icon: '📈' },
              { href: '/trends/transactions-supply', title: 'Transactions & Supply', icon: '📊' },
              { href: '/trends/monthly-updates', title: 'Monthly Updates', icon: '📅' }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center"
              >
                <div className="text-4xl mb-3">{link.icon}</div>
                <p className="font-bold text-slate-900">{link.title}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
