import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import fr from './locales/fr.json'
import ar from './locales/ar.json'

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

const LANGUAGE_KEY = 'selectedLanguageCode'
const LEGACY_LANGUAGE_KEY = 'selectedLanguage'

const LANGUAGE_NAME_TO_CODE: Record<string, SupportedLanguage> = {
  english: 'en',
  en: 'en',
  francais: 'fr',
  français: 'fr',
  french: 'fr',
  fr: 'fr',
  arabic: 'ar',
  arab: 'ar',
  العربية: 'ar',
  ar: 'ar'
}

export function normalizeLanguageCode(input?: string | null): SupportedLanguage {
  if (!input) return 'en'

  const normalized = input.trim().toLowerCase()
  if (normalized in LANGUAGE_NAME_TO_CODE) {
    return LANGUAGE_NAME_TO_CODE[normalized]
  }

  const baseCode = normalized.split('-')[0]
  if (baseCode in LANGUAGE_NAME_TO_CODE) {
    return LANGUAGE_NAME_TO_CODE[baseCode]
  }

  return 'en'
}

export function getLanguageDirection(language: string): 'ltr' | 'rtl' {
  return normalizeLanguageCode(language) === 'ar' ? 'rtl' : 'ltr'
}

export function getSavedLanguageCode(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'

  const savedCode = localStorage.getItem(LANGUAGE_KEY)
  if (savedCode) return normalizeLanguageCode(savedCode)

  // Backward compatibility for previously saved language names.
  const legacyValue = localStorage.getItem(LEGACY_LANGUAGE_KEY)
  return normalizeLanguageCode(legacyValue)
}

export function persistLanguageCode(language: string) {
  if (typeof window === 'undefined') return

  const code = normalizeLanguageCode(language)
  const languageName = code === 'fr' ? 'Français' : code === 'ar' ? 'العربية' : 'English'

  localStorage.setItem(LANGUAGE_KEY, code)
  localStorage.setItem(LEGACY_LANGUAGE_KEY, languageName)
}

export function clearSavedLanguageCode() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(LANGUAGE_KEY)
  localStorage.removeItem(LEGACY_LANGUAGE_KEY)
}

const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  },
  ar: {
    translation: ar
  }
}

i18n
  // Remove LanguageDetector to prevent automatic detection
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set default language explicitly
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  })

export default i18n