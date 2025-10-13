import type { ServiceApiGetType } from '@/shared/types/serviceTypes.ts'

export type ServiceListProps = {
  servicesData: ServiceApiGetType[] | undefined
  isLoading: boolean
}
