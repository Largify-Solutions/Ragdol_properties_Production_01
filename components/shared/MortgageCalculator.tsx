'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CalculatorIcon, CurrencyDollarIcon, PercentBadgeIcon } from '@heroicons/react/24/outline'

interface MortgageCalculatorProps {
  defaultPrice?: number
}

const ARABIC_INDIC_DIGIT_MAP: Record<string, string> = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
}

function parseLocaleNumber(value: string | number): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0
  }

  const normalizedDigits = String(value)
    .trim()
    .split('')
    .map((char) => ARABIC_INDIC_DIGIT_MAP[char] ?? char)
    .join('')
    .replace(/[\u066B]/g, '.')
    .replace(/[\u066C,\s]/g, '')

  const parsed = Number(normalizedDigits)
  return Number.isFinite(parsed) ? parsed : 0
}

function toPositiveNumber(value: string | number, fallback: number): number {
  const parsed = parseLocaleNumber(value)
  return parsed > 0 ? parsed : fallback
}

export default function MortgageCalculator({ defaultPrice = 1000000 }: MortgageCalculatorProps) {
  const initialPrice = toPositiveNumber(defaultPrice, 1000000)
  const [price, setPrice] = useState(initialPrice)
  const [downPayment, setDownPayment] = useState(initialPrice * 0.2)
  const [interestRate, setInterestRate] = useState(4.5)
  const [loanTerm, setLoanTerm] = useState(25)
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  useEffect(() => {
    const safeDefaultPrice = toPositiveNumber(defaultPrice, 1000000)
    setPrice(safeDefaultPrice)
    setDownPayment((prev) => {
      const nextDownPayment = prev > 0 ? prev : safeDefaultPrice * 0.2
      return Math.min(nextDownPayment, safeDefaultPrice)
    })
  }, [defaultPrice])

  useEffect(() => {
    const safePrice = toPositiveNumber(price, 1000000)
    const safeDownPayment = Math.min(parseLocaleNumber(downPayment), safePrice)
    const loanAmount = Math.max(0, safePrice - safeDownPayment)
    const monthlyRate = parseLocaleNumber(interestRate) / 100 / 12
    const numberOfPayments = Math.max(1, parseLocaleNumber(loanTerm) * 12)

    if (loanAmount <= 0) {
      setMonthlyPayment(0)
      return
    }
    
    if (monthlyRate === 0) {
      setMonthlyPayment(loanAmount / numberOfPayments)
    } else {
      const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      setMonthlyPayment(Number.isFinite(payment) ? payment : 0)
    }
  }, [price, downPayment, interestRate, loanTerm])

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
      <div className="bg-secondary p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <CalculatorIcon className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-black tracking-tight">Mortgage <span className="text-primary">Calculator</span></h3>
        </div>
        <p className="text-slate-400 text-sm font-medium">Estimate your monthly mortgage payments</p>
      </div>
      
      <div className="p-8 space-y-6">
        {/* Property Price */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between">
            Property Price
            <span className="text-secondary">AED {price.toLocaleString()}</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                const nextPrice = toPositiveNumber(e.target.value, 1000000)
                setPrice(nextPrice)
                setDownPayment((prev) => Math.min(prev, nextPrice))
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-secondary font-bold focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <input
            type="range"
            min={100000}
            max={50000000}
            step={100000}
            value={price}
            onChange={(e) => {
              const nextPrice = toPositiveNumber(e.target.value, 1000000)
              setPrice(nextPrice)
              setDownPayment((prev) => Math.min(prev, nextPrice))
            }}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between">
            Down Payment ({( (downPayment / price) * 100 ).toFixed(0)}%)
            <span className="text-secondary">AED {downPayment.toLocaleString()}</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <PercentBadgeIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => {
                const nextDownPayment = Math.max(0, parseLocaleNumber(e.target.value))
                setDownPayment(Math.min(nextDownPayment, price))
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-secondary font-bold focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <input
            type="range"
            min={0}
            max={price}
            step={10000}
            value={downPayment}
            onChange={(e) => setDownPayment(Math.min(parseLocaleNumber(e.target.value), price))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Interest Rate */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Interest Rate (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseLocaleNumber(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-secondary font-bold focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Loan Term (Years)</label>
            <div className="relative">
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Math.max(1, parseLocaleNumber(e.target.value)))}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-secondary font-bold focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                {[5, 10, 15, 20, 25, 30].map((year) => (
                  <option key={year} value={year}>{year} Years</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="pt-6 border-t border-slate-100">
          <div className="bg-primary/5 rounded-2xl p-6 text-center">
            <div className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">Estimated Monthly Payment</div>
            <div className="text-4xl font-black text-secondary tracking-tight">
              AED {Math.round(monthlyPayment).toLocaleString()}
            </div>
          </div>
        </div>

        <Link
          href="/contact?subject=mortgage"
          className="block w-full py-4 bg-secondary text-white font-bold rounded-xl hover:bg-primary hover:text-secondary transition-all shadow-lg shadow-secondary/10 text-center"
        >
          Get Pre-Approved Now
        </Link>
      </div>
    </div>
  )
}
