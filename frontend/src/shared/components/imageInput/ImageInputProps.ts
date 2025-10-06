import type { FieldError, UseFormRegister } from 'react-hook-form'
import type { ServiceFormType } from '@/features/service/types/ServiceForm.schema.ts'

export type ImageInputProps = {
  register: UseFormRegister<ServiceFormType>
  file?: string
  error?: FieldError
}
