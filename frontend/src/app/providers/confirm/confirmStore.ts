import { create } from 'zustand'
import type { ConfirmState } from '@/app/providers/confirm/types.ts'

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  isOpen: false,
  message: '',
  onConfirm: null,

  confirm: (message: string, onConfirm: () => void) => {
    set({ isOpen: true, message, onConfirm })
  },

  handleConfirm: () => {
    const { onConfirm } = get()
    if (onConfirm) onConfirm()

    set({ isOpen: false, message: '', onConfirm: null })
  },

  handleCancel: () => {
    set({ isOpen: false, message: '', onConfirm: null })
  },
}))
