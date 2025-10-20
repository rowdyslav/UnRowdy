import type { UseFormRegister } from 'react-hook-form'

export type CategoryFilterProps = {
  register: UseFormRegister<{ searchQuery: string }>
}
