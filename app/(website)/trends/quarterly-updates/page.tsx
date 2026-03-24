'use client'

import Link from 'next/link'
import { ChartBarIcon } from '@heroicons/react/24/outline'

export default function QuarterlyUpdatesPage() {
  const quarterlyReports = [
    {
      quarter: 'Q4 2024',
      growth: '+10.5%',
      transactions: '64000+',
      investment: 'AED 210B',
      summary: 'Strong year-end performance with record transactions and investment activity',
      details: ['Holiday season boost', 'Investor confidence', 'New project launches', 'Luxury segment surge'],
      reportUrl: '/trends/market-insights?report=q4-2024'
    },
    {
      quarter: 'Q3 2024',
      growth: '+7.8%',
      transactions: '52300+',
      investment: 'AED 165B',
      summary: 'Summer recovery with back-to-school and expatriate activity',
      details: ['Back-to-school demand', 'Expatriate influx', 'Commercial growth', 'JVC expansion'],
      reportUrl: '/trends/market-insights?report=q3-2024'
    },
    {
      quarter: 'Q2 2024',
      growth: '+6.5%',
      transactions: '50100+',
      investment: 'AED 155B',
      summary: 'Steady growth with balanced buyer and investor activity',
      details: ['Summer planning', 'Affordable segment', 'New developments', 'Rental demand'],
      reportUrl: '/trends/market-insights?report=q2-2024'
    },
    {
      quarter: 'Q1 2024',
      growth: '+8.2%',
      transactions: '49500+',
      investment: 'AED 158B',
      summary: 'Strong start to the year with New Year buying activity',
      details: ['New Year momentum', 'Resolution buying', 'Investment interest', 'Market confidence'],
      reportUrl: '/trends/market-insights?report=q1-2024'
    }
  ]

  const reportButtonClasses = 'inline-flex items-center px-6 py-2 bg-[#8A6508] text-white font-semibold rounded-lg hover:bg-[#6E4F05] active:bg-[#5C4204] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6508]/40 transition-colors text-sm'

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-[#EEF2FA] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Quarterly Market <span className="text-[#8A6508]">Updates</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            In-depth quarterly analysis covering market trends, investment opportunities, and forecasts
          </p>
        </div>

        {/* Quarterly Reports */}
        <div className="space-y-6 mb-16">
          {quarterlyReports.map((report, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#8A6508]/30 transition-all p-8">
              <div className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{report.quarter}</h3>
                  <p className="text-slate-700 mb-4">{report.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {report.details.map((detail, i) => (
                      <span key={i} className="px-3 py-1 bg-[#8A6508]/10 text-[#6E4F05] text-xs font-medium rounded-full">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 grid grid-cols-3 gap-4">
                  <div className="bg-linear-to-br from-[#8A6508]/10 to-[#5C4204]/15 rounded-xl p-4">
                    <p className="text-xs text-[#8A6508] font-semibold mb-1">GROWTH</p>
                    <p className="text-3xl font-bold text-[#6E4F05]">{report.growth}</p>
                  </div>
                  <div className="bg-linear-to-br from-[#8A6508]/8 to-[#5C4204]/12 rounded-xl p-4">
                    <p className="text-xs text-[#8A6508] font-semibold mb-1">TRANSACTIONS</p>
                    <p className="text-lg font-bold text-[#6E4F05]">{report.transactions}</p>
                  </div>
                  <div className="bg-linear-to-br from-[#8A6508]/12 to-[#5C4204]/20 rounded-xl p-4">
                    <p className="text-xs text-[#8A6508] font-semibold mb-1">INVESTMENT</p>
                    <p className="text-lg font-bold text-[#6E4F05]">{report.investment}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <Link href={report.reportUrl} className={reportButtonClasses}>
                  Read Full Report
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Related Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/trends/monthly-updates" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ChartBarIcon className="w-8 h-8 mx-auto mb-3 text-[#8A6508]" />
            <p className="font-bold text-slate-900">Monthly Updates</p>
            <p className="text-sm text-slate-600 mt-1">Recent monthly reports</p>
          </Link>
          <Link href="/trends/yearly-updates" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ChartBarIcon className="w-8 h-8 mx-auto mb-3 text-[#8A6508]" />
            <p className="font-bold text-slate-900">Yearly Reports</p>
            <p className="text-sm text-slate-600 mt-1">Annual analysis</p>
          </Link>
          <Link href="/trends/market-insights" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all text-center">
            <ChartBarIcon className="w-8 h-8 mx-auto mb-3 text-[#8A6508]" />
            <p className="font-bold text-slate-900">Market Insights</p>
            <p className="text-sm text-slate-600 mt-1">Current overview</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
