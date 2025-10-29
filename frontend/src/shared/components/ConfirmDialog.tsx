import { useConfirmStore } from '@/app/providers/confirm/confirmStore.ts'
import { useEffect } from 'react'

export const ConfirmDialog = () => {
  const { isOpen, message, handleConfirm, handleCancel } = useConfirmStore()

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') handleCancel()
      if (e.key === 'Tab') e.preventDefault()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleCancel])

  if (isOpen)
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='absolute inset-0 bg-black opacity-50' />

        <div className='relative card-element p-6 text-center min-w-[300px]'>
          <p className='mb-4 color-font text-xl'>{message}</p>
          <div className='flex justify-center space-x-3'>
            <button onClick={handleCancel} className='button'>
              Отменить
            </button>
            <button onClick={handleConfirm} className='button-blue'>
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    )
}
