'use client'

import { useEffect, useState } from 'react'
import i18n, { getLanguageDirection, getSavedLanguageCode, normalizeLanguageCode } from '../../lib/i18n'

interface DynamicHtmlProps {
  children: React.ReactNode
}

export default function DynamicHtml({ children }: DynamicHtmlProps) {
  const [lang, setLang] = useState<'en' | 'fr' | 'ar'>('en')
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')

  useEffect(() => {
    const savedLanguageCode = getSavedLanguageCode()

    // Set initial language and direction
    setLang(savedLanguageCode)
    setDir(getLanguageDirection(savedLanguageCode))

    // Update document attributes
    document.documentElement.lang = savedLanguageCode
    document.documentElement.dir = getLanguageDirection(savedLanguageCode)

    // Change i18n language if different
    if (normalizeLanguageCode(i18n.language) !== savedLanguageCode) {
      i18n.changeLanguage(savedLanguageCode)
    }

    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      const normalizedLanguage = normalizeLanguageCode(lng)
      setLang(normalizedLanguage)
      setDir(getLanguageDirection(normalizedLanguage))
      document.documentElement.lang = normalizedLanguage
      document.documentElement.dir = getLanguageDirection(normalizedLanguage)
    }

    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  return (
    <html lang={lang} dir={dir}>
      {children}
    </html>
  )
}