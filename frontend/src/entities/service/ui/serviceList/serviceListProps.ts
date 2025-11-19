import type { ReactNode } from 'react'

import type { ServiceApiGetType } from '@/shared/api/service/types.ts'

export type ServiceListProps = {
  servicesData: ServiceApiGetType[]
  children?: ReactNode
  type: 'profile' | 'noneProfile'
}
