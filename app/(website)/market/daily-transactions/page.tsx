'use client';

import { useState } from 'react';
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  HomeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface DailyTransaction {
  date: string;
  properties: number;
  value: string;
  type: string;
  topArea: string;
}

const dailyTransactions: DailyTransaction[] = [
  { date: 'Today', properties: 487, value: 'AED 2.8B', type: 'Sales & Rentals', topArea: 'Dubai Marina' },
  { date: 'Yesterday', properties: 462, value: 'AED 2.6B', type: 'Sales & Rentals', topArea: 'Business Bay' },
  { date: '2 Days Ago', properties: 501, value: 'AED 2.9B', type: 'Sales & Rentals', topArea: 'Downtown Dubai' },
  { date: '3 Days Ago', properties: 445, value: 'AED 2.5B', type: 'Sales & Rentals', topArea: 'JVC' },
  { date: '4 Days Ago', properties: 512, value: 'AED 3.1B', type: 'Sales & Rentals', topArea: 'Dubai Hills' },
  { date: '5 Days Ago', properties: 478, value: 'AED 2.7B', type: 'Sales & Rentals', topArea: 'Emirates Hills' },
];

const transactionTypes = [
  { type: 'Property Sales', percentage: 55, value: 'AED 1.5B' },
  { type: 'Rental Agreements', percentage: 35, value: 'AED 1.0B' },
  { type: 'Mortgage Deals', percentage: 10, value: 'AED 300M' },
];

export default function DailyTransactionsPage() {
  const goldColor = '#c5a059';
  const lightGold = '#f5f3f0';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ background: `linear-gradient(to right, ${goldColor}, #a88549)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BanknotesIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Daily Transactions</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-3xl">
            Monitor real-time property transaction volumes and values across Dubai
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: `4px solid ${goldColor}` }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Market Activity</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Monitor real-time property transaction volumes and values. Track daily sales, rental agreements, and mortgage transactions to understand market momentum and investor activity. Daily transaction data provides crucial insights into market sentiment and investment trends.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Daily Transactions</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>500+</p>
                </div>
                <HomeIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Average per day</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Daily Value</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>AED 2.8B</p>
                </div>
                <BanknotesIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Transaction value</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderTop: `4px solid ${goldColor}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Monthly Volume</p>
                  <p className="text-4xl font-bold mt-2" style={{ color: goldColor }}>15K+</p>
                </div>
                <ArrowTrendingUpIcon className="w-12 h-12" style={{ color: goldColor, opacity: 0.2 }} />
              </div>
              <p className="text-xs text-gray-500">Transactions</p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Transaction Activity</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${goldColor}` }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: lightGold, borderBottom: `2px solid ${goldColor}` }}>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>DATE</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>PROPERTIES</th>
                    <th className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>TRANSACTION VALUE</th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>TYPE</th>
                    <th className="text-left py-4 px-6 font-bold" style={{ color: goldColor }}>TOP AREA</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyTransactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: lightGold }}
                    >
                      <td className="py-4 px-6 text-gray-900 font-semibold">{transaction.date}</td>
                      <td className="text-right py-4 px-6 text-gray-700">{transaction.properties}</td>
                      <td className="text-right py-4 px-6 font-bold" style={{ color: goldColor }}>
                        {transaction.value}
                      </td>
                      <td className="py-4 px-6 text-gray-700">{transaction.type}</td>
                      <td className="py-4 px-6 text-gray-700">{transaction.topArea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Transaction Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Transaction Types Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transactionTypes.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderTop: `4px solid ${goldColor}` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.type}</h3>
                <p className="text-gray-600 mb-4">Daily average value</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold" style={{ color: goldColor }}>
                      {item.percentage}%
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{item.value}</p>
                  </div>
                  <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="w-full rounded-lg"
                      style={{
                        height: `${item.percentage}%`,
                        backgroundColor: goldColor,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Indicators */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Market Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Market Momentum',
                status: 'Strong',
                description: 'Daily transaction volumes up 8.5% month-over-month',
              },
              {
                title: 'Price Stability',
                status: 'Stable',
                description: 'Average transaction values consistent with 0% variance',
              },
              {
                title: 'Sales vs Rentals',
                status: '55:35',
                description: 'Sales dominate with 55% of daily transactions',
              },
              {
                title: 'Investor Activity',
                status: 'Active',
                description: 'Continued strong interest from international investors',
              },
            ].map((indicator, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                style={{ borderLeft: `4px solid ${goldColor}` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{indicator.title}</h3>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: lightGold, color: goldColor }}
                  >
                    {indicator.status}
                  </span>
                </div>
                <p className="text-gray-600">{indicator.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-xl shadow-lg p-12 text-center" style={{ borderTop: `4px solid ${goldColor}` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated on Market Activity</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to daily transaction reports and real-time market updates to track investment opportunities.
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors"
            style={{ backgroundColor: goldColor }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a88549')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = goldColor)}
          >
            Subscribe to Reports
          </button>
        </section>
      </div>
    </div>
  );
}
