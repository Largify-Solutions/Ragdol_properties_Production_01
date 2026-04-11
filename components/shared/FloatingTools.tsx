'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Cog6ToothIcon, XMarkIcon, GlobeAltIcon, CurrencyDollarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import {
  clearSavedLanguageCode,
  getSavedLanguageCode,
  normalizeLanguageCode,
  persistLanguageCode,
  type SupportedLanguage
} from '@/lib/i18n'

const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script'
const GOOGLE_TRANSLATE_ELEMENT_ID = 'google_translate_element'
const GOOGLE_TRANSLATE_MAX_ATTEMPTS = 20
const GOOGLE_TRANSLATE_RETRY_DELAY_MS = 150
const GOOGLE_TRANSLATE_REFRESH_DELAYS_MS = [900, 2400]
const GOOGLE_TRANSLATE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            autoDisplay: boolean
          },
          elementId: string
        ) => unknown
      }
    }
  }
}

function ensureGoogleTranslateContainer() {
  if (typeof window === 'undefined') return

  if (!document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID)) {
    const hiddenContainer = document.createElement('div')
    hiddenContainer.id = GOOGLE_TRANSLATE_ELEMENT_ID
    hiddenContainer.className = 'notranslate'
    hiddenContainer.setAttribute('aria-hidden', 'true')
    document.body.appendChild(hiddenContainer)
  }
}

function getRootDomain(hostname: string): string | null {
  if (!hostname || hostname === 'localhost' || /^\d+(\.\d+){3}$/.test(hostname)) {
    return null
  }

  const parts = hostname.split('.')
  if (parts.length < 2) return null

  return `.${parts.slice(-2).join('.')}`
}

function getGoogleTranslateCookieLanguage(): SupportedLanguage | null {
  if (typeof window === 'undefined') return null

  const cookieMatch = document.cookie.match(/(?:^|; )googtrans=([^;]+)/)
  if (!cookieMatch?.[1]) return null

  const cookieValue = decodeURIComponent(cookieMatch[1])
  const targetLanguage = cookieValue.split('/').pop()
  if (!targetLanguage) return null

  return normalizeLanguageCode(targetLanguage)
}

function setGoogleTranslateCookie(languageCode: SupportedLanguage) {
  if (typeof window === 'undefined') return

  const cookieValue = `/en/${languageCode}`
  const cookieBase = `googtrans=${cookieValue};path=/;max-age=${GOOGLE_TRANSLATE_COOKIE_MAX_AGE_SECONDS};samesite=lax`
  document.cookie = cookieBase

  const rootDomain = getRootDomain(window.location.hostname)
  if (rootDomain) {
    document.cookie = `${cookieBase};domain=${rootDomain}`
  }
}

function clearGoogleTranslateCookie() {
  if (typeof window === 'undefined') return

  const expiredCookie = 'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;samesite=lax'
  document.cookie = expiredCookie

  const rootDomain = getRootDomain(window.location.hostname)
  if (rootDomain) {
    document.cookie = `${expiredCookie};domain=${rootDomain}`
  }
}

function resetGoogleTranslateToEnglish() {
  if (typeof window === 'undefined') return

  const languageSelector = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (!languageSelector) return

  if (languageSelector.value !== 'en') {
    languageSelector.value = 'en'
    languageSelector.dispatchEvent(new Event('change'))
  }
}

function applyGoogleTranslateLanguage(languageCode: SupportedLanguage, attempt = 0, forceRefresh = false) {
  if (typeof window === 'undefined') return

  setGoogleTranslateCookie(languageCode)

  const languageSelector = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (!languageSelector) {
    if (attempt < GOOGLE_TRANSLATE_MAX_ATTEMPTS) {
      window.setTimeout(() => applyGoogleTranslateLanguage(languageCode, attempt + 1, forceRefresh), GOOGLE_TRANSLATE_RETRY_DELAY_MS)
    }
    return
  }

  const shouldSwitchLanguage = languageSelector.value !== languageCode

  if (shouldSwitchLanguage) {
    languageSelector.value = languageCode
  }

  if (shouldSwitchLanguage || forceRefresh) {
    languageSelector.dispatchEvent(new Event('change'))
  }
}

function scheduleGoogleTranslateRefresh(languageCode: SupportedLanguage) {
  if (typeof window === 'undefined') return () => {}

  const timers = GOOGLE_TRANSLATE_REFRESH_DELAYS_MS.map((delayMs) =>
    window.setTimeout(() => {
      applyGoogleTranslateLanguage(languageCode, 0, true)
    }, delayMs)
  )

  return () => {
    timers.forEach((timerId) => window.clearTimeout(timerId))
  }
}
function initGoogleTranslateWidget() {
  if (typeof window === 'undefined') return
  if (!window.google?.translate?.TranslateElement) return

  ensureGoogleTranslateContainer()

  // Avoid duplicate widget initialization across route transitions.
  if (!document.querySelector('.goog-te-combo')) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,fr,ar',
        autoDisplay: false
      },
      GOOGLE_TRANSLATE_ELEMENT_ID
    )
  }
}

function loadGoogleTranslateScript() {
  if (typeof window === 'undefined') return

  ensureGoogleTranslateContainer()

  if (window.google?.translate?.TranslateElement) {
    initGoogleTranslateWidget()
    return
  }

  const existingScript = document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID) as HTMLScriptElement | null
  if (existingScript) return

  window.googleTranslateElementInit = () => {
    initGoogleTranslateWidget()
  }

  const script = document.createElement('script')
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.body.appendChild(script)
}

export default function FloatingTools() {
  const { t, i18n } = useTranslation()
  const pathname = usePathname()
  const [hasHydrated, setHasHydrated] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState('All Areas')
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en')
  const [selectedCurrency, setSelectedCurrency] = useState('AED')

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedArea = localStorage.getItem('selectedArea')
    const savedLanguage = getSavedLanguageCode()
    const cookieLanguage = getGoogleTranslateCookieLanguage()
    const initialLanguage = cookieLanguage ?? savedLanguage
    const savedCurrency = localStorage.getItem('selectedCurrency')

    if (savedArea) setSelectedArea(savedArea)
    setSelectedLanguage(initialLanguage)

    // Set initial language
    if (normalizeLanguageCode(i18n.language) !== initialLanguage) {
      i18n.changeLanguage(initialLanguage)
    }

    persistLanguageCode(initialLanguage)
    if (initialLanguage === 'en') {
      clearGoogleTranslateCookie()
    } else {
      setGoogleTranslateCookie(initialLanguage)
    }

    if (savedCurrency) setSelectedCurrency(savedCurrency)
  }, []) // Remove i18n dependency to prevent re-running

  useEffect(() => {
    if (!hasHydrated) return
    if (!pathname) return

    if (selectedLanguage === 'en') {
      clearGoogleTranslateCookie()
      resetGoogleTranslateToEnglish()
      return
    }

    let clearRefreshTimers = () => {}
    let bootTimer: number | null = null
    let isCancelled = false

    const startTranslator = () => {
      if (isCancelled) return

      loadGoogleTranslateScript()
      applyGoogleTranslateLanguage(selectedLanguage)
      clearRefreshTimers = scheduleGoogleTranslateRefresh(selectedLanguage)
    }

    if (document.readyState === 'complete') {
      bootTimer = window.setTimeout(startTranslator, 350)
    } else {
      window.addEventListener('load', startTranslator, { once: true })
    }

    // Re-apply website translation after client-side route transitions.
    return () => {
      isCancelled = true
      if (bootTimer !== null) {
        window.clearTimeout(bootTimer)
      }
      window.removeEventListener('load', startTranslator)
      clearRefreshTimers()
    }
  }, [hasHydrated, pathname, selectedLanguage])

  const areas = [
    'All Areas',
    'Dubai Marina',
    'Palm Jumeirah',
    'Jumeirah Beach Residence',
    'Dubai Hills Estate',
    'Emirates Hills',
    'Business Bay',
    'Downtown Dubai',
    'Dubai Silicon Oasis',
    'Dubai Festival City'
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪' }
  ]

  const currencies = [
    { code: 'AED', name: 'AED', symbol: 'د.إ' },
    { code: 'USD', name: 'USD', symbol: '$' },
    { code: 'PKR', name: 'PKR', symbol: '₨' },
    { code: 'EUR', name: 'EUR', symbol: '€' },
    { code: 'GBP', name: 'GBP', symbol: '£' },
    { code: 'INR', name: 'INR', symbol: '₹' }
  ]

  const handleAreaChange = (area: string) => {
    setSelectedArea(area)
    // Here you would typically update the global state or context
    // For now, we'll just store it locally
    localStorage.setItem('selectedArea', area)
  }

  const handleLanguageChange = (languageCode: SupportedLanguage) => {
    setSelectedLanguage(languageCode)
    i18n.changeLanguage(languageCode)
    persistLanguageCode(languageCode)

    if (languageCode === 'en') {
      clearGoogleTranslateCookie()
      resetGoogleTranslateToEnglish()
      return
    }

    setGoogleTranslateCookie(languageCode)
    loadGoogleTranslateScript()
    applyGoogleTranslateLanguage(languageCode)
    // Note: HTML lang and dir attributes are handled by DynamicHtml component
  }

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency)
    // Here you would typically update the global currency state
    localStorage.setItem('selectedCurrency', currency)
  }

  return (
    <>
      {/* Floating Tools Button */}
      <div className="fixed top-1/2 right-4 z-50 transform -translate-y-1/2">
        <button
          onClick={() => setIsToolsOpen(true)}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group relative"
          aria-label="Open tools and settings"
        >
          <Cog6ToothIcon className="w-5 h-5" />
          {/* Tooltip */}
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Tools
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-3 border-b-3 border-r-3 border-transparent border-r-gray-800"></div>
          </div>
        </button>
      </div>

      {/* Tools Modal */}
      {isToolsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Cog6ToothIcon className="w-5 h-5" />
                {t('tools.title')}
              </h3>
              <button
                onClick={() => setIsToolsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Area Selector */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPinIcon className="w-4 h-4" />
                  <h4 className="text-base font-semibold">{t('tools.areaFilter')}</h4>
                </div>
                <select
                  value={selectedArea}
                  onChange={(e) => handleAreaChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Switcher */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <GlobeAltIcon className="w-4 h-4" />
                  <h4 className="text-base font-semibold">{t('tools.language')}</h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as SupportedLanguage)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                        selectedLanguage === lang.code
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                      {selectedLanguage === lang.code && (
                        <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency Switcher */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  <h4 className="text-base font-semibold">{t('tools.currency')}</h4>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencyChange(currency.code)}
                      className={`flex items-center gap-1 px-2 py-2 rounded-lg border text-xs transition-all ${
                        selectedCurrency === currency.code
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-medium">{currency.symbol}</span>
                      <span>{currency.name}</span>
                      {selectedCurrency === currency.code && (
                        <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Reset to defaults
                    setSelectedArea('All Areas')
                    setSelectedLanguage('en')
                    setSelectedCurrency('AED')
                    i18n.changeLanguage('en')
                    clearGoogleTranslateCookie()
                    resetGoogleTranslateToEnglish()
                    document.documentElement.lang = 'en'
                    document.documentElement.dir = 'ltr'
                    localStorage.removeItem('selectedArea')
                    clearSavedLanguageCode()
                    localStorage.removeItem('selectedCurrency')
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {t('tools.reset')}
                </button>
                <button
                  onClick={() => setIsToolsOpen(false)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {t('tools.apply')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}