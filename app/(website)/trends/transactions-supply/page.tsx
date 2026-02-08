'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { ChartBarIcon } from '@heroicons/react/24/outline'

export default function TransactionSupplyPage() {
  const transactionData = [
    { month: 'Jan', sales: 15200, rentals: 22400 },
    { month: 'Feb', sales: 16800, rentals: 24100 },
    { month: 'Mar', sales: 18500, rentals: 25800 },
    { month: 'Apr', sales: 19200, rentals: 26900 },
    { month: 'May', sales: 17900, rentals: 24500 },
    { month: 'Jun', sales: 16400, rentals: 23200 },
    { month: 'Jul', sales: 15800, rentals: 22100 },
    { month: 'Aug', sales: 17200, rentals: 24800 },
    { month: 'Sep', sales: 19100, rentals: 26400 },
    { month: 'Oct', sales: 20300, rentals: 28100 },
    { month: 'Nov', sales: 21800, rentals: 29900 },
    { month: 'Dec', sales: 22900, rentals: 31200 }
  ]

  const supplyData = [
    { quarter: 'Q1', supply: 12000, absorption: 11200, remaining: 800 },
    { quarter: 'Q2', supply: 14500, absorption: 13800, remaining: 700 },
    { quarter: 'Q3', supply: 16200, absorption: 15100, remaining: 1100 },
    { quarter: 'Q4', supply: 18900, absorption: 17600, remaining: 1300 }
  ]

  const typeBreakdown = [
    { type: 'Apartments', percentage: 62, trend: '+8.2%' },
    { type: 'Villas', percentage: 18, trend: '+12.1%' },
    { type: 'Townhouses', percentage: 12, trend: '+9.5%' },
    { type: 'Commercial', percentage: 8, trend: '+7.3%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Transactions & <span className="text-emerald-600">Supply</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Market transaction volumes, inventory levels, and supply-demand analysis for Dubai real estate
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-2">ANNUAL SALES</p>
            <p className="text-3xl font-bold text-slate-900">185.5K</p>
            <p className="text-xs text-emerald-600 font-semibold mt-2">+12.5% YoY</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-2">ANNUAL RENTALS</p>
            <p className="text-3xl font-bold text-slate-900">245.3K</p>
            <p className="text-xs text-blue-600 font-semibold mt-2">+8.3% YoY</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-2">MARKET VOLUME</p>
            <p className="text-3xl font-bold text-slate-900">AED 680B</p>
            <p className="text-xs text-purple-600 font-semibold mt-2">+15.3% YoY</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-2">LISTED UNITS</p>
            <p className="text-3xl font-bold text-slate-900">185K+</p>
            <p className="text-xs text-amber-600 font-semibold mt-2">Active inventory</p>
          </div>
        </div>

        {/* Transaction Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Monthly Transactions (2024)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="sales" fill="#10b981" name="Sales Transactions" />
              <Bar dataKey="rentals" fill="#3b82f6" name="Rental Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Supply Data */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Supply & Absorption Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={supplyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Line type="monotone" dataKey="supply" stroke="#f59e0b" strokeWidth={2} name="New Supply" />
              <Line type="monotone" dataKey="absorption" stroke="#10b981" strokeWidth={2} name="Absorption" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Property Type Breakdown */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Transaction Breakdown by Type</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {typeBreakdown.map((type, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{type.type}</h3>
                  <span className="text-emerald-600 font-bold text-lg">{type.trend}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full"
                    style={{width: `${type.percentage}%`}}
                  ></div>
                </div>
                <p className="text-sm text-slate-600 mt-3">{type.percentage}% of transactions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Health */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-8">Market Health Indicators</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Supply Status</h3>
              <p className="text-5xl font-bold mb-2">Healthy</p>
              <p className="opacity-90">New supply meets market demand with absorption rates above 90%</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Demand Trend</h3>
              <p className="text-5xl font-bold mb-2">Strong</p>
              <p className="opacity-90">Increasing transaction volumes and investor interest across all segments</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Price Outlook</h3>
              <p className="text-5xl font-bold mb-2">Positive</p>
              <p className="opacity-90">Continued appreciation expected with limited supply in premium areas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
