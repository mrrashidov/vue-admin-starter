import type icons from '@/shared/utils/icons'

export type ButtonVariant = 'primary' | 'secondary' | 'error' | 'light' | 'gray-light' | 'none'

export interface Icon {
  name: keyof typeof icons
  position?: 'left' | 'right'
  className?: string
  viewBox?: string
}
