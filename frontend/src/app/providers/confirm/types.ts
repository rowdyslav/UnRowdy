export interface ConfirmState {
  isOpen: boolean
  message: string
  onConfirm: (() => void) | null
  confirm: (message: string, onConfirm: () => void) => void
  handleConfirm: () => void
  handleCancel: () => void
}
