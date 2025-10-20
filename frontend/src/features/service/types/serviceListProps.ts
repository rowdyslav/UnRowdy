import type { ServiceApiGetType } from '@/shared/types/serviceTypes.ts'
import type { ReactNode } from 'react'

export type ServiceListProps = {
  servicesData: ServiceApiGetType[]
  isLoading: boolean
  children?: ReactNode
  type: 'profile' | 'noneProfile'
}
