import type { RoutePath } from '@/shared/const/routes.ts'

export type NavButtonProps =
  | {
      label: string
      to: 'back'
      className: string
    }
  | {
      label: string
      to: RoutePath
      params?: string
      className: string
    }
