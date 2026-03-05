'use client'

import { useState } from 'react'
import { CalculatorIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

export default function CalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(1500000)
  const [downPayment, setDownPayment] = useState(30)
  const [loanTerm, setLoanTerm] = useState(20)
  const [interestRate, setInterestRate] = useState(3.5)
  const [rentalIncome, setRentalIncome] = useState(6000)
  const [annualExpenses, setAnnualExpenses] = useState(25000)
  const [appreciationRate, setAppreciationRate] = useState(8)

  const downPaymentAmount = (purchasePrice * downPayment) / 100
  const loanAmount = purchasePrice - downPaymentAmount
  const monthlyRate = interestRate / 100 / 12
  const monthlyPayment = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm * 12))) / 
    (Math.pow(1 + monthlyRate, loanTerm * 12) - 1)
  const annualRentalIncome = rentalIncome * 12
  const monthlyExpenses = annualExpenses / 12
  const monthlyNetIncome = rentalIncome - monthlyExpenses - monthlyPayment
  const annualNetIncome = monthlyNetIncome * 12
  const rentalYield = (annualNetIncome / purchasePrice) * 100
  
  // 5-year projection
  let futureValue = purchasePrice
  for (let i = 0; i < 5; i++) {
    futureValue = futureValue * (1 + appreciationRate / 100)
  }
  const appreciationGain = futureValue - purchasePrice
  const totalEquity = downPaymentAmount + (monthlyPayment * 60 - monthlyExpenses * 60) + appreciationGain

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-4 font-semibold">
            <CalculatorIcon className="w-5 h-5" />
            ROI Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Investment <span className="text-[#c5a059]">Calculator</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Calculate your investment returns, mortgage payments, rental yields, and property appreciation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Investment Parameters</h2>

            <div className="space-y-6">
              {/* Purchase Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Purchase Price: <span className="text-[#c5a059]">AED {purchasePrice.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="100000"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full"
                />
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Down Payment: {downPayment}% (AED {downPaymentAmount.toLocaleString()})
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Loan Term: {loanTerm} years
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Monthly Rental Income */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Monthly Rental Income: <span className="text-[#c5a059]">AED {rentalIncome.toLocaleString()}</span>
                </label>
                <input
                  type="number"
                  value={rentalIncome}
                  onChange={(e) => setRentalIncome(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              {/* Annual Expenses */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual Expenses: <span className="text-red-600">AED {annualExpenses.toLocaleString()}</span>
                </label>
                <input
                  type="number"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              {/* Appreciation Rate */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual Appreciation: {appreciationRate}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={appreciationRate}
                  onChange={(e) => setAppreciationRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Monthly Metrics */}
            <div className="bg-gradient-to-br from-[#b8941f] to-[#996515] rounded-2xl p-8 text-white shadow-sm">
              <h3 className="text-xl font-bold mb-6">Monthly Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a059]/30">
                  <span className="opacity-90">Mortgage Payment</span>
                  <span className="text-2xl font-bold">AED {Math.round(monthlyPayment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a059]/30">
                  <span className="opacity-90">Monthly Expenses</span>
                  <span className="text-xl font-bold">AED {Math.round(monthlyExpenses).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a059]/30">
                  <span className="opacity-90">Rental Income</span>
                  <span className="text-xl font-bold text-[#f0d090]">+AED {rentalIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="font-semibold text-lg">Net Monthly</span>
                  <span className={`text-3xl font-bold ${monthlyNetIncome >= 0 ? 'text-[#f0d090]' : 'text-red-300'}`}>
                    {monthlyNetIncome >= 0 ? '+' : ''}AED {Math.round(monthlyNetIncome).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Annual Metrics */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 text-white shadow-sm">
              <h3 className="text-xl font-bold mb-6">Annual Returns</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a059]/30">
                  <span className="opacity-90">Annual Rental Income</span>
                  <span className="text-2xl font-bold">AED {Math.round(annualRentalIncome).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a059]/30">
                  <span className="opacity-90">Rental Yield</span>
                  <span className="text-xl font-bold text-[#f0d090]">{rentalYield.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Annual Net</span>
                  <span className={`text-3xl font-bold ${annualNetIncome >= 0 ? 'text-[#f0d090]' : 'text-red-300'}`}>
                    {annualNetIncome >= 0 ? '+' : ''}AED {Math.round(annualNetIncome).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* 5-Year Projection */}
            <div className="bg-gradient-to-br from-[#4a3728] to-[#3d2e20] rounded-2xl p-8 text-white shadow-sm">
              <h3 className="text-xl font-bold mb-6">5-Year Projection</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a059]/30">
                  <span className="opacity-90">Property Value</span>
                  <span className="text-2xl font-bold">AED {Math.round(futureValue).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a059]/30">
                  <span className="opacity-90">Appreciation Gain</span>
                  <span className="text-xl font-bold text-[#f0d090]">+AED {Math.round(appreciationGain).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total Equity Built</span>
                  <span className="text-3xl font-bold text-[#f0d090]">AED {Math.round(totalEquity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Calculator Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">💡 Down Payment</h3>
              <p className="text-slate-700 text-sm">Typical UAE mortgages range from 50-80% of property value. Higher down payment reduces monthly payments.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">📊 Rental Yield</h3>
              <p className="text-slate-700 text-sm">Dubai's average rental yield is 4-5%. Higher yields indicate better cash flow but may indicate higher risk.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">📈 Appreciation</h3>
              <p className="text-slate-700 text-sm">Historical Dubai appreciation ranges from 5-12% annually. Conservative 8% is standard for projections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
