import { defaultLocale, localeOptions } from './constants'

export const getCurrentLocale = () => {
  let locale: string | undefined = defaultLocale
  try {
    if (
      localStorage.getItem('locale') &&
      localeOptions.filter((x) => x.id === localStorage.getItem('locale')).length > 0
    ) {
      locale = localStorage.getItem('locale') || undefined
    }
  } catch (error) {
    console.error(error)
    locale = defaultLocale
  }
  return locale
}

export const setCurrentLocale = (locale: string) => {
  try {
    localStorage.setItem('locale', locale)
  } catch (error) {
    console.error(error)
  }
}
