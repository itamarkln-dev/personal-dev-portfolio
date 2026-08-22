import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import he from './locales/he.json'

export type Lang = 'en' | 'he'
export const LANG_KEY = 'lang'

export function initialLang(): Lang {
  return localStorage.getItem(LANG_KEY) === 'he' ? 'he' : 'en'
}

// keep <html lang/dir> in sync — logical CSS properties do the rest of the RTL work
export function applyLangAttrs(lang: Lang) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
}

const lng = initialLang()
applyLangAttrs(lng)

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, he: { translation: he } },
  lng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
