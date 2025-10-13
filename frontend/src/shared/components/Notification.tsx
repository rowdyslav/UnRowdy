import type { NotificationState } from '@/app/providers/Notification/types.ts'

const colors = {
  success: 'text-green-600',
  error: 'text-red-600',
}

export const Notification = ({ type, message }: NotificationState) => {
  if (!type) return null

  return (
    <div
      className={`fixed top-6 z-20 left-1/2  px-6 py-3 card-element text-blue-500 
      transition-all duration-300 ease-out animate-slide-in ${colors[type]}`}
    >
      {message}
    </div>
  )
}
