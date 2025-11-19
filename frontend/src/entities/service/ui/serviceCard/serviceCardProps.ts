import type { ServiceApiGetType } from '@/shared/api/service/types.ts'

export type CardProps = ServiceApiGetType & { type: 'profile' | 'noneProfile' }
