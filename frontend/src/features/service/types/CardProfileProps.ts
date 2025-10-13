import type { ServiceApiGetType } from '@/shared/types/serviceTypes.ts'

export type CardProps = ServiceApiGetType & {type: 'profile' | 'noneProfile'}
