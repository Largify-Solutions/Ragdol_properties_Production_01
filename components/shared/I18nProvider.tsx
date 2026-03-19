'use client'

import { useEffect } from 'react'
import i18n, {
  getLanguageDirection,
  getSavedLanguageCode,
  normalizeLanguageCode,
  persistLanguageCode
} from '../../lib/i18n'

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initialLanguage = getSavedLanguageCode()
    const applyDocumentDirection = (language: string) => {
      const normalizedLanguage = normalizeLanguageCode(language)
      document.documentElement.lang = normalizedLanguage
      document.documentElement.dir = getLanguageDirection(normalizedLanguage)
      persistLanguageCode(normalizedLanguage)
    }

    // Ensure i18n uses the persisted language on first load.
    if (normalizeLanguageCode(i18n.language) !== initialLanguage) {
      i18n.changeLanguage(initialLanguage)
    }

    applyDocumentDirection(i18n.language)

    const onLanguageChanged = (language: string) => {
      applyDocumentDirection(language)
    }

    i18n.on('languageChanged', onLanguageChanged)

    return () => {
      i18n.off('languageChanged', onLanguageChanged)
    }
  }, [])

  return <>{children}</>
}