import { isObject } from '@/shared/utils'
import { getItem } from './local_storage'

export const Can = (scopes?: string | string[]): boolean => {
  if (typeof scopes !== 'string' && !scopes) return true
  const user = getItem('user') ? JSON.parse(getItem('user')) : {}
  if (!user || (isObject(user) && Object.keys(user).length === 0)) return false
  const permissions: string[] = user.role.permissions
  return Array.isArray(scopes)
    ? scopes.some((scope) => permissions.includes(scope))
    : permissions.includes(scopes)
}
