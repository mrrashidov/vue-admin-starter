/* eslint-disable @typescript-eslint/ban-ts-comment */
export const isDefined = (value: unknown) => {
  const falsyValues = [null, undefined, NaN, '']
  return typeof value !== 'undefined' && !falsyValues.some((i) => i === value)
}

export const isObject = (value: unknown) => {
  return value != null && typeof value === 'object' && Array.isArray(value) === false
}

export const isValidURL = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return pattern.test(str)
}

export const stripTags = (input?: string) => {
  if (!input) return ''
  return input.replace(/<(?:.|\n)*?>/gm, '')
}

export const wait = <T>(time: number) => {
  return new Promise<T>((resolve) => setTimeout(resolve, time))
}

export const dateDiffInDays = (a: Date, b: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

export const addMonths = (date: Date, months: number) => {
  const d = date.getDate()
  date.setMonth(date.getMonth() + months)
  if (date.getDate() !== d) {
    date.setDate(0)
  }
  return date
}

export const getFullName = (data: string) => {
  return data
    .split(' ')
    .reduce(
      (prev, curr, index, arr) => prev + curr.charAt(0) + (arr.length - 1 !== index ? '.' : ''),
      ''
    )
}

export const createUUID = () => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const isNumeric = (val: any) => {
  return /^\d*$/.test(val)
}

export const isAppleDevice = () => {
  //@ts-expect-error
  const platform = navigator.userAgentData?.platform || navigator.platform || 'unknown'
  return /(Mac|iPhone|iPod|iPad)/i.test(platform)
}

export const generatePassword = (len = 12) => {
  const length = len
  const string = 'abcdefghijklmnopqrstuvwxyz'
  const numeric = '0123456789'
  const punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-='
  let password = ''
  let character = ''
  while (password.length < length) {
    const entityString = Math.ceil(string.length * Math.random() * Math.random())
    const entityNumber = Math.ceil(numeric.length * Math.random() * Math.random())
    const entityPunc = Math.ceil(punctuation.length * Math.random() * Math.random())
    let hold = string.charAt(entityString)
    hold = password.length % 2 == 0 ? hold.toUpperCase() : hold
    character += hold
    character += numeric.charAt(entityNumber)
    character += punctuation.charAt(entityPunc)
    password = character
  }
  password = password
    .split('')
    .sort(function () {
      return 0.5 - Math.random()
    })
    .join('')
  return password.substr(0, len)
}
