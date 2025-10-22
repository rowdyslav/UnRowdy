import type { RoutePath } from '@/shared/const/routes.ts'

type headerDataType = {
  label: string
  href: RoutePath
}

export const headerData: headerDataType[] = [
  {
    label: 'Услуги',
    href: '/categories',
  },
]
